import React from "react";
import { Metadata } from "next";
import { KnowledgeHero } from "@/components/ui/KnowledgeHero";
import { KnowledgeListing } from "@/components/ui/KnowledgeListing";

export const metadata: Metadata = {
  title: "สาระน่ารู้สำหรับการวิ่ง | YARKVING - เคล็ดลับและเทคนิคสำหรับนักวิ่ง",
  description: "แหล่งรวมบทความความรู้เกี่ยวกับเรื่องวิ่ง โภชนาการ และอุปกรณ์วิ่ง เพื่อให้นักวิ่งทุกคนพัฒนาศักยภาพและวิ่งได้อย่างปลอดภัย",
};

export default function KnowledgePage() {
  return (
    <main className="min-h-screen bg-background">
      <KnowledgeHero />
      <KnowledgeListing />
    </main>
  );
}
