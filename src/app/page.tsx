import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Search, MapPin, Star } from "lucide-react";

export default function ExplorePage() {
  return (
    <main className="w-full pb-24">
      {/* Hero Section: Topographic Map */}
      <section className="relative min-h-[600px] overflow-hidden bg-surface-container-low flex flex-col justify-center px-8 pt-32">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-6xl font-bold font-display leading-[1.2] text-on-surface">
              เส้นทางวิ่งที่<br />
              <span className="text-primary italic font-light">สงบและงดงาม</span>
            </h1>
            <p className="text-xl text-on-surface-variant max-w-lg leading-relaxed">
              ค้นพบสนามวิ่งที่คุณรัก ตั้งแต่สวนสาธารณะใจกลางเมืองไปจนถึงเส้นทางศึกษาธรรมชาติที่เงียบสงบ สำหรับนักวิ่งทุกวัย
            </p>
            {/* Search Bar */}
            <div className="relative max-w-md group">
              <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                <Search className="w-6 h-6 text-outline" strokeWidth={1.5} />
              </div>
              <input
                className="w-full h-16 pl-16 pr-8 bg-surface-container-lowest border-none rounded-xl text-lg shadow-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-outline-variant outline-none"
                placeholder="ค้นหาสนามวิ่ง..."
                type="text"
              />
            </div>
          </div>
          
          <div className="relative hidden lg:block">
            {/* Stylized 3D Topographic Map Placeholder */}
            <div className="relative w-full aspect-square scale-110">
              <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl"></div>
              <img
                alt="3D map visual"
                className="w-full h-full object-contain mix-blend-multiply opacity-90"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBg3e4F3pJ11nDfmJbqsaMltQvCAIONZn8boSG0nCM6lH9Lzkap9slyodKviz6A9LjpSKHSGu71hSmcCa0td1pgkBitWRmHsXL4VmiMSszom7y7D5YgLmuYMM7zQr7N7TcOKuRwctDPgMs_4vZetpyAVdu4GRcGn-sDQhQv3QF_hGME8KNX6VRZgLeM6lPH8UihG-duhb94gxfb9k71KpPg7BNYdbdOJ7zcZ72ZLPJbGsLtTNDtejxtqItPHIMs1mpP_OWPbxSitoA"
              />
              <div className="absolute top-1/4 right-1/4 bg-surface-container-lowest p-3 rounded-xl shadow-lg border border-outline-variant/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-tertiary-container rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold">Lumpini Park</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section: Grid Layout */}
      <section className="py-24 px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-16 gap-6">
          <div>
            <h2 className="text-4xl font-bold font-display mb-4">สนามวิ่งยอดนิยม</h2>
            <p className="text-on-surface-variant text-lg">คัดสรรจากรีวิวและความนิยมในสัปดาห์นี้</p>
          </div>
          <button className="bg-secondary-container text-on-secondary-container px-8 py-4 rounded-xl font-semibold transition-all hover:opacity-90 inline-flex self-start md:self-end text-sm">
            ดูทั้งหมด
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Track Card 1 (Clickable) */}
          <Link href="/track/lumpini" className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl">
            <div className="relative rounded-xl overflow-hidden aspect-[4/3] mb-6 bg-surface-container-high translate-y-0 group-hover:-translate-y-1 transition-transform duration-300">
              <img
                alt="Lumpini Park"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9eAWu_a2sgOpM3Awa9fgkcT4IWFn4IkhD6nuOPXv9a9plyZAnNnO9bwQN7Dn_mjYN3o75Luo1W8UzS9qVmfJv0EMzseHUnRdkd71lezJoJnwzC95gmoZqpRdztdrtnxvqlvZPJ_VB-EMKPUajtBoNKyB3n3SLwB1dvcCQp0vs-R_w2P5qgBvSbB3NAP5jFAlY3GTjyXBhhfrUs11CIOa3bczR8rRCzEzbRvCCmLK-ftibILaoesxOmrs-rmxwvdD6DaN6jgE7EtA"
              />
              <div className="absolute top-4 left-4">
                <Badge pulsing>Popular Now</Badge>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <h3 className="text-2xl font-bold font-display group-hover:text-primary transition-colors">สวนลุมพินี (Lumpini Park)</h3>
              </div>
              <div className="flex items-center text-on-surface-variant gap-2 font-medium">
                <MapPin className="w-5 h-5 text-outline" strokeWidth={1} /> ปทุมวัน, กรุงเทพฯ
              </div>
              <div className="pt-4 flex items-center justify-between border-t border-outline-variant/20">
                <div className="flex items-center gap-1 text-tertiary">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4" />
                  <span className="ml-2 text-on-surface font-semibold text-sm">4.8</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Track Card 2 (Clickable) */}
          <Link href="/track/benjakitti" className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl">
            <div className="relative rounded-xl overflow-hidden aspect-[4/3] mb-6 bg-surface-container-high translate-y-0 group-hover:-translate-y-1 transition-transform duration-300">
              <img
                alt="Benjakitti Park"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKe7E16_qQSgi04J9x3vcvZ1w64qs_4hbdjfnrPdU3XIGxClUSu2tm387ESGFhoKT7mOO1n6byA7ut7R36ZXyQoVgNXfYaBI_xI1A2Nt91y36xh95xEloMV57auN6jcki6FBvBBOQBvL3clDzb3z8fe8U08JL8Asw5SshhryvHGBVVTLxpaRy-eaNpra6LQKrFMEr5mXO7IJUpYK4Fc0xPOZ5yIhIU08Bt41hQh82giuU4HjC80jRJ_2LYcLlGcjnlaLhI2dWxmrg"
              />
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-bold font-display group-hover:text-primary transition-colors">สวนเบญจกิติ (Benjakitti)</h3>
              <div className="flex items-center text-on-surface-variant gap-2 font-medium">
                <MapPin className="w-5 h-5 text-outline" strokeWidth={1} /> คลองเตย, กรุงเทพฯ
              </div>
              <div className="pt-4 flex items-center justify-between border-t border-outline-variant/20">
                <div className="flex items-center gap-1 text-tertiary">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <span className="ml-2 text-on-surface font-semibold text-sm">5.0</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Track Card 3 (Clickable) */}
          <Link href="/track/national-stadium" className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl">
            <div className="relative rounded-xl overflow-hidden aspect-[4/3] mb-6 bg-surface-container-high translate-y-0 group-hover:-translate-y-1 transition-transform duration-300">
              <img
                alt="Track Stadium"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_60c55mPA7yW7aZxQQkQCsL9R_ivvWT81ukeJg2eFQyfcAdkL3ke__JwY5-C2kgPCW4EmMqW0gReXj3tWiaTEiSBO-aVfHMtRrN1xv9idATMPmcB9aBzStmYuBHjj1TywqBEO6mMNY6GfXmKk4DzUJfenbn_V2CPp67E06_4twvhyPZuXjFrwe4_7oiWJdMi0Qdpd-F9i_0Weilpj5ry7ZRYGn6C6zmxjiZNPttAEyN8wHaH6b8nO64w5avuvuz1sN6CL7EA7kRI"
              />
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-bold font-display group-hover:text-primary transition-colors">สนามกีฬาแห่งชาติ</h3>
              <div className="flex items-center text-on-surface-variant gap-2 font-medium">
                <MapPin className="w-5 h-5 text-outline" strokeWidth={1} /> ปทุมวัน, กรุงเทพฯ
              </div>
              <div className="pt-4 flex items-center justify-between border-t border-outline-variant/20">
                <div className="flex items-center gap-1 text-tertiary">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4" />
                  <span className="ml-2 text-on-surface font-semibold text-sm">4.5</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Community Section */}
      <section className="mb-24 px-8 max-w-7xl mx-auto">
        <div className="bg-primary rounded-[2.5rem] p-12 lg:p-20 flex flex-col lg:flex-row items-center gap-16 overflow-hidden relative shadow-ambient">
          {/* Asymmetric Decor */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 transform origin-top-right"></div>
          
          <div className="flex-1 space-y-8 relative z-10 text-white">
            <h2 className="text-4xl lg:text-5xl font-bold font-display leading-[1.2]">
              เข้าร่วมคอมมูนิตี้<br/>นักวิ่งกับเราวันนี้
            </h2>
            <p className="text-lg text-primary-fixed opacity-90 leading-relaxed max-w-md">
              แชร์เส้นทางใหม่ๆ ติดตามผลงานของคุณ และเชื่อมต่อกับเพื่อนนักวิ่งที่มีใจรักเดียวกัน
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="bg-surface text-primary px-10 py-4 rounded-xl font-bold text-lg hover:bg-surface-dim transition-colors shadow-sm">
                สมัครสมาชิกฟรี
              </button>
              <button className="border-2 border-white/30 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-colors">
                ดูวิธีใช้งาน
              </button>
            </div>
          </div>
          <div className="flex-1 relative z-10 hidden md:block">
            <img
              alt="Runners"
              className="rounded-3xl shadow-xl w-full max-w-md aspect-square object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMa34gA-m--PV9yrg-twThWCRKCTYuL7JzIaM9xtWxqHTyPmcwBoZViyt57QzG5ydKZQI5JqzXPqGGdHyy8XYRqCyB77mT4zVikAf0sv9aSvhMHCXOjxj5G71iomhxbKjN1JPK-dXXzFm48FpSIDLuSiRpR-s81pGGKVzblkF8vlm9kSa9hAHc7-TikwxrxlWRVODLCiqxb3iqi0gokA7T7C7uQduVqJdr2sEiNe1L7jON7in86YbqzI_j53ufvfvEuwOFc6d72k4"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
