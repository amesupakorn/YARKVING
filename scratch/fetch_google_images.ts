import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import https from 'https';

const prisma = new PrismaClient();
const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

if (!API_KEY || API_KEY.includes('your_google')) {
  console.error("❌ Invalid or missing GOOGLE_MAPS_API_KEY in .env");
  process.exit(1);
}

const IMAGE_DIR = path.join(process.cwd(), 'public', 'image', 'parks');

// ตรวจสอบและสร้างโฟลเดอร์ถ้ายังไม่มี
if (!fs.existsSync(IMAGE_DIR)) {
  fs.mkdirSync(IMAGE_DIR, { recursive: true });
}

// ฟังก์ชันสำหรับ Sleep เพื่อป้องกันการโดนแบน (Rate Limit)
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper function to download an image using https (handles redirects)
function downloadImage(url: string, filepath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      // Handle redirects (Google Places Photo API redirects to the actual image URL)
      if (response.statusCode === 301 || response.statusCode === 302) {
        if (!response.headers.location) {
          reject(new Error("Redirect location missing"));
          return;
        }
        return downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
      }

      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download image: ${response.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(filepath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });

      fileStream.on('error', (err) => {
        fs.unlink(filepath, () => {}); // Delete temp file
        reject(err);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Helper function to strip HTML tags
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>?/gm, '');
}

// Function to get photo reference via Place Details (Cheaper than Text Search)
async function getPhotoReferenceViaDetails(placeId: string): Promise<{ref: string, credit: string} | null> {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photos&key=${API_KEY}`;
  
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.status !== 'OK' || !json.result) {
            console.error(`[Google API Error/Info (Details)] Status: ${json.status}, Message: ${json.error_message || "None"}`);
            resolve(null);
            return;
          }
          
          if (json.result.photos && json.result.photos.length > 0) {
            const photo = json.result.photos[0];
            const rawCredit = photo.html_attributions && photo.html_attributions.length > 0 
                ? photo.html_attributions[0] 
                : "Google Maps";
            
            resolve({ 
                ref: photo.photo_reference, 
                credit: stripHtml(rawCredit) 
            });
          } else {
            resolve(null);
          }
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

// Function to search for a place via Text Search (Fallback)
async function getPhotoReference(query: string): Promise<{ref: string, credit: string} | null> {
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${API_KEY}`;
  
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.status !== 'OK' || !json.results || json.results.length === 0) {
            console.error(`[Google API Error/Info (Search)] Status: ${json.status}, Message: ${json.error_message || "None"}`);
            resolve(null);
            return;
          }
          
          const place = json.results[0];
          if (place.photos && place.photos.length > 0) {
            const photo = place.photos[0];
            const rawCredit = photo.html_attributions && photo.html_attributions.length > 0 
                ? photo.html_attributions[0] 
                : "Google Maps";

            resolve({ 
                ref: photo.photo_reference, 
                credit: stripHtml(rawCredit) 
            });
          } else {
            resolve(null); // No photos for this place
          }
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function main() {
  console.log("🚀 Starting Google Maps Image Fetcher...");
  
  const tracks = await prisma.track.findMany();
  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const track of tracks) {
    const filename = `${track.id}.jpg`;
    const filepath = path.join(IMAGE_DIR, filename);

    // เช็คว่าเคยเซฟรูปนี้ไว้หรือยัง จะได้ไม่ต้องเสียโควต้า API ซ้ำ
    if (fs.existsSync(filepath)) {
      console.log(`⏩ Skipping ${track.name} - Image already exists locally.`);
      skipCount++;
      continue;
    }

    try {
      let photoRef = null;

      if (track.googlePlaceId) {
        console.log(`🔍 Fetching details using existing google_place_id for: ${track.name}...`);
        photoRef = await getPhotoReferenceViaDetails(track.googlePlaceId);
      } 
      
      // Fallback: If no place_id or no photo from place_id, do Text Search
      if (!photoRef) {
        console.log(`🔍 Searching via Text Search for: ${track.name}...`);
        photoRef = await getPhotoReference(track.name);
      }

      if (!photoRef) {
        console.log(`⚠️ No photos found for ${track.name}`);
        errorCount++;
      } else {
        // ดาวน์โหลดรูปมาเซฟ
        console.log(`📸 Downloading photo via ${track.name}... (Credit: ${photoRef.credit})`);
        const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${photoRef.ref}&key=${API_KEY}`;
        await downloadImage(photoUrl, filepath);

        // อัปเดตฐานข้อมูลให้ชี้มาที่รูปในโฟลเดอร์ของเรา พร้อมใส่ Credit
        await prisma.track.update({
          where: { id: track.id },
          data: {
            imageUrl: `/image/parks/${filename}`,
            imageCredit: photoRef.credit // ใช้ชื่อคนถ่าย
          }
        });

        console.log(`✅ Success for ${track.name}`);
        successCount++;
      }

    } catch (error) {
      console.error(`❌ Error processing ${track.name}:`, error);
      errorCount++;
    }

    // เว้นระยะห่าง 300ms ป้องกันโดนแบน (Rate limiting)
    await sleep(300);
  }

  console.log("\n--- 🎉 Fetching Complete ---");
  console.log(`✅ Successfully downloaded: ${successCount}`);
  console.log(`⏩ Skipped (Already exist): ${skipCount}`);
  console.log(`❌ Failed or no photo:     ${errorCount}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
