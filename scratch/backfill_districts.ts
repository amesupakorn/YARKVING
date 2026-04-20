import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const tracks = await prisma.track.findMany();
  
  const mappings: Record<string, string> = {
    'สวนลุมพินี': 'ปทุมวัน',
    'Lumpini Park': 'Pathum Wan',
    'สวนจตุจักร': 'จตุจักร',
    'Chatuchak': 'Chatuchak',
    'สวนวชิรเบญจทัศ': 'จตุจักร',
    'สวนรถไฟ': 'จตุจักร',
    'สวนเบญจกิติ': 'คลองเตย',
    'Benjakitti': 'Khlong Toei',
    'สะพานเขียว': 'ปทุมวัน',
    'อุทยาน 100 ปี จุฬาฯ': 'ปทุมวัน',
    'สวนบึงหนองบอน': 'ประเวศ',
    'สวนหลวง ร.9': 'ประเวศ',
    'สวนนวมินทร์ภิรมย์': 'บึงกุ่ม',
    'สวนสาธารณะคลองสามวา': 'คลองสามวา',
    'สวนเฉลิมพระเกียรติ 80 พรรษา': 'บางกอกน้อย',
    'สวนรมณีนาถ': 'พระนคร',
    'สวนสราญรมย์': 'พระนคร',
    'สวนสันติชัยปราการ': 'พระนคร',
    'สวนธนบุรีรมย์': 'ทุ่งครุ',
    'สวนวารีภิรมย์': 'คลองสามวา',
    'สวนทวีวนารมย์': 'ทวีวัฒนา',
    'สวนเสรีไทย': 'บึงกุ่ม',
    'สวน 60 พรรษา': 'ลาดกระบัง',
  };

  console.log(`Checking ${tracks.length} tracks...`);

  for (const track of tracks) {
    let district = 'กรุงเทพฯ'; // Default fallback
    
    for (const [key, val] of Object.entries(mappings)) {
      if (track.name.includes(key)) {
        district = val;
        break;
      }
    }

    // Try to guess from text if no mapping found
    if (district === 'กรุงเทพฯ') {
      if (track.name.includes('จตุจักร')) district = 'จตุจักร';
      else if (track.name.includes('ลาดกระบัง')) district = 'ลาดกระบัง';
      else if (track.name.includes('หนองจอก')) district = 'หนองจอก';
      else if (track.name.includes('บางบอน')) district = 'บางบอน';
      else if (track.name.includes('ยานนาวา')) district = 'ยานนาวา';
      else if (track.name.includes('ร่มเกล้า')) district = 'ลาดกระบัง';
      else if (track.name.includes('สาย 2')) district = 'ทวีวัฒนา';
      else if (track.name.includes('พระราม 7')) district = 'บางซื่อ';
      else if (track.name.includes('พระราม 9')) district = 'ห้วยขวาง';
    }

    await prisma.track.update({
      where: { id: track.id },
      data: { district }
    });
    
    console.log(`Updated [${track.name}] -> ${district}`);
  }

  console.log('Backfill completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
