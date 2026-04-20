import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const tracks = await prisma.track.findMany();
  let updatedCount = 0;
  
  for (const track of tracks) {
    if (track.address) {
      try {
        const addressObj = JSON.parse(track.address);
        const sublocality = addressObj.address_components?.find((c: any) => 
          c.types.includes('sublocality_level_1') || 
          c.types.includes('administrative_area_level_2') // Sometimes district falls here
        );

        if (sublocality) {
          // Clean up "Khet " or "เขต"
          let cleanDistrictName = sublocality.long_name;
          cleanDistrictName = cleanDistrictName.replace(/^Khet\s+/i, '');
          cleanDistrictName = cleanDistrictName.replace(/^เขต/i, '');
          
          await prisma.track.update({
            where: { id: track.id },
            data: { district: cleanDistrictName }
          });
          updatedCount++;
        }
      } catch (e) {
        console.error(`Error parsing address for ${track.name}`, e);
      }
    }
  }
  
  console.log(`Updated ${updatedCount} tracks with extracted districts from address!`);
  
  const updatedTracks = await prisma.track.findMany({ select: { district: true }});
  const uniqueDistricts = Array.from(new Set(updatedTracks.map(t => t.district).filter(Boolean)));
  console.log("Unique available districts:", uniqueDistricts.sort());
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
