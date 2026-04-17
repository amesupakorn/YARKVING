import { PrismaClient } from '@prisma/client';
import https from 'https';

const prisma = new PrismaClient();
const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

if (!API_KEY || API_KEY.includes('your_google')) {
  console.error("❌ Invalid or missing GOOGLE_MAPS_API_KEY in .env");
  process.exit(1);
}

// Helper: Sleep to prevent rate limit
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface GoogleReview {
  author_name: string;
  profile_photo_url: string;
  rating: number;
  text: string;
  relative_time_description: string;
}

// Helper: Make an HTTPS GET request and parse JSON
function fetchJson(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', reject);
    });
}

// Function to get Place ID via Text Search
async function getPlaceIdViaSearch(query: string): Promise<string | null> {
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${API_KEY}`;
    const data = await fetchJson(url);
    if (data.status === 'OK' && data.results && data.results.length > 0) {
        return data.results[0].place_id;
    }
    return null;
}

// Function to fetch Reviews via Place Details API
async function fetchReviewsByPlaceId(placeId: string): Promise<GoogleReview[]> {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${API_KEY}`;
    const data = await fetchJson(url);
    
    if (data.status === 'OK' && data.result && data.result.reviews) {
        return data.result.reviews;
    }
    return [];
}

async function main() {
  console.log("🚀 Starting Google Maps Reviews Fetcher...");
  
  const tracks = await prisma.track.findMany();
  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const track of tracks) {
    try {
      // 1. Check if reviews already exist
      const existingReviewsCount = await prisma.review.count({
        where: { trackId: track.id }
      });

      if (existingReviewsCount > 0) {
        console.log(`⏩ Skipping ${track.name} - Reviews already exist (${existingReviewsCount}).`);
        skipCount++;
        continue;
      }

      console.log(`🔍 Getting Place ID for: ${track.name}...`);
      
      let placeId = track.googlePlaceId;

      // 2. Fallback to Text Search if we don't have place_id
      if (!placeId) {
        placeId = await getPlaceIdViaSearch(track.name);
        
        // Optimistically update the track with the found Place ID to save future costs
        if (placeId) {
            await prisma.track.update({
                where: { id: track.id },
                data: { googlePlaceId: placeId }
            });
            console.log(`💾 Saved newly found Place ID for ${track.name}`);
        }
      }

      if (!placeId) {
        console.log(`⚠️ Could not find Place ID for ${track.name}`);
        errorCount++;
        continue;
      }

      // 3. Fetch Reviews using Place ID
      console.log(`💬 Fetching reviews for ${track.name}...`);
      const reviews = await fetchReviewsByPlaceId(placeId);

      if (reviews.length === 0) {
        console.log(`ℹ️ No reviews found for ${track.name}`);
        // Consider this a success since the API responded correctly.
        successCount++;
      } else {
        // 4. Save Reviews to Database (up to 5)
        const reviewsToSave = reviews.slice(0, 5);
        for (const r of reviewsToSave) {
            await prisma.review.create({
                data: {
                    authorName: r.author_name,
                    authorPhotoUrl: r.profile_photo_url,
                    rating: r.rating,
                    // Handle cases where the text might be completely empty
                    text: r.text || "No written review.",  
                    timeDescription: r.relative_time_description,
                    trackId: track.id
                }
            });
        }
        console.log(`✅ Saved ${reviewsToSave.length} reviews for ${track.name}`);
        successCount++;
      }

    } catch (error: any) {
      console.error(`❌ Error processing ${track.name}:`, error.message || error);
      errorCount++;
    }

    // Delay 300ms to prevent Rate Limiting
    await sleep(300);
  }

  console.log("\n--- 🎉 Reviews Fetching Complete ---");
  console.log(`✅ Successfully processed: ${successCount}`);
  console.log(`⏩ Skipped (Already have data): ${skipCount}`);
  console.log(`❌ Failed or no Place ID:       ${errorCount}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
