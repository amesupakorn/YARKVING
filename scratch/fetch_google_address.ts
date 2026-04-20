import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  if (!API_KEY) {
    console.error("GOOGLE_MAPS_API_KEY environment variable is not set.");
    return;
  }

  const tracks = await prisma.track.findMany();
  console.log(`Found ${tracks.length} tracks to process.`);

  for (const track of tracks) {
    try {
      let placeId = track.googlePlaceId;

      // 1. Fetch Place ID if not available
      if (!placeId) {
        const findPlaceUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(track.name)}&inputtype=textquery&fields=place_id&key=${API_KEY}`;
        const findRes = await fetch(findPlaceUrl);
        const findData = await findRes.json();
        
        if (findData.status === 'OK' && findData.candidates && findData.candidates.length > 0) {
          placeId = findData.candidates[0].place_id;
          console.log(`Found Place ID for ${track.name}: ${placeId}`);
        } else {
          console.log(`Could not find Place ID for ${track.name}`);
          continue; // Skip if no place ID found
        }
      }

      // 2. Fetch Place Details
      if (placeId) {
        const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=address_components,formatted_address&key=${API_KEY}`;
        const detailsRes = await fetch(detailsUrl);
        const detailsData = await detailsRes.json();

        if (detailsData.status === 'OK' && detailsData.result) {
          const result = detailsData.result;
          
          // Store both formatted_address and address_components as a JSON string
          const addressData = {
            formatted_address: result.formatted_address,
            address_components: result.address_components
          };

          const addressString = JSON.stringify(addressData);

          await prisma.track.update({
            where: { id: track.id },
            data: { 
              address: addressString,
              // Update googlePlaceId if we just found it
              ...(track.googlePlaceId ? {} : { googlePlaceId: placeId })
            }
          });

          console.log(`Updated address for ${track.name}`);
        } else {
          console.log(`Could not fetch details for ${track.name}`);
        }
      }
    } catch (error) {
      console.error(`Error processing ${track.name}:`, error);
    }

    // Rate limiting precaution
    await sleep(200); 
  }

  console.log('Finished updating addresses.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
