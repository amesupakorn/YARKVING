import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log("Starting batch processing of all tracks...");
  
  const allTracks = await prisma.track.findMany();
  let updatedCount = 0;

  for (const track of allTracks) {
    // ข้ามสถานที่ที่เราเคยตั้งใจอัปเดตข้อมูลแบบเฉพาะเจาะจงไปแล้ว (เพราะมี bestTime เต็มๆ)
    if (track.distance && track.bestTime && track.bestTime.includes("05:00")) {
      continue; 
    }

    const name = track.name;
    let description = "";
    let distance = "";
    let surface = "";
    let elevation = "Flat";
    let difficulty = "Beginner";
    let bestTime = "06:00 - 08:30 หรือ 17:00 - 19:30";
    let hasRestrooms = true;
    let hasWater = false;
    let hasParking = true;
    let hasLockers = false;

    // วิเคราะห์จากชื่อ
    if (name.includes("สนามกีฬา") || name.includes("ศูนย์เยาวชน") || name.includes("ศูนย์กีฬา")) {
      description = `${name} เป็นสนามกีฬาที่ได้รับความนิยมในพื้นที่ เหมาะสำหรับการซ้อมวิ่งแบบความเร็ว ทำ Interval หรือลงคอร์ส มีลู่วิ่งที่ได้มาตรฐาน`;
      distance = "400 m (ลู่วิ่ง)";
      surface = "Synthetic Track / ยางสังเคราะห์";
      hasWater = true;
      hasLockers = true;
    } else if (name.includes("อุทยาน") || name.includes("พุทธมณฑล") || name.includes("วนอุทยาน")) {
      description = `${name} เป็นพื้นที่สีเขียวขนาดกว้างใหญ่มาก มีต้นไม้หนาแน่นและเส้นทางที่ซับซ้อน เหมาะแก่การวิ่งยาว (Long Run) สัมผัสธรรมชาติ`;
      distance = "3.0 km - 5.0 km";
      surface = "Asphalt / Dirt / Concrete";
      difficulty = "Intermediate";
      hasWater = true;
    } else if (name.includes("มหาวิทยาลัย") || name.match(/ม\.[ก-ฮ]/)) {
      description = `${name} มักมีนักศึกษาและบุคลากรมาออกกำลังกายในช่วงเย็น เส้นทางวิ่งร่มรื่นและปลอดภัยภายในรั้วสถาบัน`;
      distance = "1.5 km - 3.0 km";
      surface = "Concrete / Pavement";
      hasWater = true;
    } else if (name.includes("บึง") || name.includes("หนอง") || name.includes("เลียบคลอง")) {
      description = `เส้นทางวิ่งรอบ${name} ให้คุณได้วิ่งชมวิวริมน้ำ อากาศถ่ายเทเย็นสบาย โดยเฉพาะในช่วงเช้าตรู่และใกล้ค่ำ`;
      distance = "1.0 km - 2.5 km";
      surface = "Concrete / Pavement";
    } else {
      // สวนสาธารณะทั่วไป
      description = `${name} เป็นสถานที่ยอดนิยมสำหรับนักวิ่งและคนในพื้นที่ ร่มรื่นด้วยพรรณไม้ เหมาะสำหรับการออกกำลังกายและพักผ่อนหย่อนใจในทุกๆ วัน`;
      distance = "1.0 km - 2.0 km";
      surface = "Concrete / Asphalt";
    }

    await prisma.track.update({
      where: { id: track.id },
      data: {
        description,
        distance,
        surface,
        elevation,
        difficulty,
        bestTime,
        hasRestrooms,
        hasWater,
        hasParking,
        hasLockers
      }
    });
    
    updatedCount++;
  }

  console.log(`Successfully generated and populated realistic info for ${updatedCount} tracks!`);
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  });
