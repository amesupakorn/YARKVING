import React from "react";
import { Metadata } from "next";
import { AboutContent } from "@/components/ui/AboutContent";

export const metadata: Metadata = {
  title: "เกี่ยวกับเรา - YARKVING | แอปวิ่ง แนะนำเส้นทางวิ่งและชุมชนคนรักสุขภาพ",
  description:
    "YARKVING คือแพลตฟอร์มสำหรับคนรักการวิ่งและสุขภาพ ที่รวบรวมเส้นทางวิ่งยอดนิยมจากผู้ใช้งานจริง พร้อมสร้าง community สำหรับการออกกำลังกายอย่างยั่งยืน",
};

export default function AboutUsPage() {
  return <AboutContent />;
}