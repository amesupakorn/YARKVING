import axios from 'axios';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const OVERPASS_URL = 'https://overpass-api.de/api/interpreter';

const query = `
[out:json][timeout:25];
(
  node["leisure"="park"](13.5,100.3,13.9,100.9);
  way["leisure"="park"](13.5,100.3,13.9,100.9);
  relation["leisure"="park"](13.5,100.3,13.9,100.9);
);
out center;
`;

async function main() {
    console.log('Fetching park data from Overpass API (Bangkok)...');
    try {
        const response = await axios.post(OVERPASS_URL, `data=${encodeURIComponent(query)}`);
        const elements = response.data.elements;

        console.log(`Received ${elements.length} raw elements from Overpass.`);

        const parks = [];

        // กรองเอาเฉพาะข้อมูลที่มีชื่อเป็นหลัก 
        for (const element of elements) {
            const tags = element.tags;
            if (!tags) continue;

            const name = tags['name:th'] || tags['name'] || tags['name:en'];
            if (!name) continue;

            let lat = null;
            let lon = null;

            if (element.type === 'node') {
                lat = element.lat;
                lon = element.lon;
            } else if (element.center) {
                // way หรือ relation ที่ดึงด้วย "out center;"
                lat = element.center.lat;
                lon = element.center.lon;
            }

            if (lat && lon) {
                parks.push({ name, lat, lon });
            }
        }

        console.log(`Found ${parks.length} valid parks with names. Inserting to database...`);

        // รูปประกอบจำลองสำหรับให้หน้าตามินิมอลเข้ากับ YARKVING
        const fallbackImageUrl = 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9eAWu_a2sgOpM3Awa9fgkcT4IWFn4IkhD6nuOPXv9a9plyZAnNnO9bwQN7Dn_mjYN3o75Luo1W8UzS9qVmfJv0EMzseHUnRdkd71lezJoJnwzC95gmoZqpRdztdrtnxvqlvZPJ_VB-EMKPUajtBoNKyB3n3SLwB1dvcCQp0vs-R_w2P5qgBvSbB3NAP5jFAlY3GTjyXBhhfrUs11CIOa3bczR8rRCzEzbRvCCmLK-ftibILaoesxOmrs-rmxwvdD6DaN6jgE7EtA';
        
        // Loop Insert / Upsert ทีละอัน (ถ้า field ไม่ได้ @unique ให้ findFirst เช็คก่อน)
        let insertedCount = 0;
        let updatedCount = 0;

        for (const park of parks) {
            // ค้นหาสวนสาธารณะด้วยชื่อ
            const existingPark = await prisma.track.findFirst({
                where: { name: park.name }
            });

            if (existingPark) {
                // อัปเดตละติจูด/ลองจิจูด เผื่อข้อมูลคลาดเคลื่อนแต่อย่าทับอันอื่น
                await prisma.track.update({
                    where: { id: existingPark.id },
                    data: {
                        latitude: park.lat,
                        longitude: park.lon
                    }
                });
                updatedCount++;
            } else {
                // สร้างใหม่ถ้ายังไม่มี
                await prisma.track.create({
                    data: {
                        name: park.name,
                        latitude: park.lat,
                        longitude: park.lon,
                        rating: 4.5, // เรตติ้งดีฟอลต์
                        imageUrl: fallbackImageUrl 
                    }
                });
                insertedCount++;
            }
        }

        console.log(`\nImport Summary:`);
        console.log(`- New Parks Inserted: ${insertedCount}`);
        console.log(`- Existing Parks Updated: ${updatedCount}`);
        console.log(`Total Parks in Search Scope: ${insertedCount + updatedCount}`);

    } catch (error) {
        console.error('Error fetching or processing OpenStreetMap data:', error?.message || error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
