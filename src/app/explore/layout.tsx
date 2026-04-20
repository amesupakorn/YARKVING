import { Metadata } from "next";

export const metadata: Metadata = {
  title: "สำรวจเส้นทางวิ่ง | YARKVING - ค้นหาสวนสาธารณะและสถานที่วิ่งใกล้คุณ",
  description: "สำรวจและค้นหาเส้นทางวิ่ง สวนสาธารณะ และสถานที่ออกกำลังกายในกรุงเทพฯ กรองตามระยะทาง สิ่งอำนวยความสะดวก และคะแนนรีวิว",
};

export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
