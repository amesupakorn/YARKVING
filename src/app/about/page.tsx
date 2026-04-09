import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "เกี่ยวกับเรา - YARKVING | แอปวิ่ง แนะนำเส้นทางวิ่งและชุมชนคนรักสุขภาพ",
  description:
    "YARKVING คือแพลตฟอร์มสำหรับคนรักการวิ่งและสุขภาพ ที่รวบรวมเส้นทางวิ่งยอดนิยมจากผู้ใช้งานจริง พร้อมสร้าง community สำหรับการออกกำลังกายอย่างยั่งยืน",
};

export default function AboutUsPage() {
  return (
    <main className="w-full pb-24">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] overflow-hidden bg-surface-container-low flex flex-col justify-center px-8 pt-40 pb-20">
        <div className="absolute top-0 left-0 w-full h-full bg-primary/5 blur-3xl rounded-full scale-150 transform -translate-y-1/2"></div>

        <div className="max-w-4xl mx-auto w-full relative z-10 text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold font-display leading-[1.2] text-on-surface">
            YARKVING: ค้นพบเส้นทางวิ่งที่ใช่<br />
            <span className="text-primary italic">
              ผ่านประสบการณ์จากผู้ใช้จริง
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            แพลตฟอร์มสำหรับคนรักการวิ่งและสุขภาพ ที่ช่วยให้คุณค้นหาเส้นทางวิ่ง
            สถานที่ออกกำลังกาย และประสบการณ์จริงจากผู้ใช้งาน
            เพื่อให้ทุกการวิ่งเป็นช่วงเวลาที่ดีต่อทั้งร่างกายและจิตใจ
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 px-8 max-w-4xl mx-auto space-y-24">

        {/* Mission */}
        <div className="space-y-8 text-center">
          <h2 className="text-4xl font-bold font-display text-on-surface">
            พันธกิจของเรา
          </h2>

          <div className="space-y-6 text-xl text-on-surface-variant leading-relaxed max-w-3xl mx-auto">
            <p>
              YARKVING มีเป้าหมายเพื่อช่วยให้ทุกคนค้นพบ “สถานที่วิ่งที่เหมาะกับตัวเอง”
              ไม่ว่าจะเป็นสวนสาธารณะ เส้นทางวิ่งยอดนิยม หรือพื้นที่ออกกำลังกายที่สงบและปลอดภัย
            </p>

            <p>
              เราเชื่อว่าประสบการณ์จากผู้ใช้งานจริง คือข้อมูลที่มีคุณค่ามากที่สุด
              จึงเปิดโอกาสให้ผู้คนสามารถแบ่งปัน รีวิว และแนะนำเส้นทางวิ่ง
              เพื่อสร้างฐานข้อมูลด้านการวิ่งที่เติบโตไปพร้อมกับชุมชน
            </p>

            <p>
              มากกว่าการเป็นแอปวิ่ง YARKVING คือพื้นที่ที่ช่วยให้การออกกำลังกาย
              กลายเป็นเรื่องง่าย สนุก และเป็นส่วนหนึ่งของชีวิตประจำวัน
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="space-y-12">
          <h2 className="text-4xl font-bold font-display text-on-surface text-center">
            สิ่งที่เราให้ความสำคัญ
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 1 */}
            <div className="bg-surface-container-lowest py-10 px-8 rounded-[2rem] shadow-ambient border border-outline-variant/10 space-y-6 text-center hover:-translate-y-2 transition duration-300">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl font-bold font-mono">
                1
              </div>

              <h3 className="text-2xl font-bold font-display text-primary">
                ข้อมูลจากผู้ใช้จริง
              </h3>

              <p className="text-on-surface-variant leading-relaxed">
                เราให้ความสำคัญกับประสบการณ์จริงของนักวิ่ง
                เพื่อให้คุณได้ข้อมูลที่เชื่อถือได้ และเลือกเส้นทางที่เหมาะกับตัวเอง
              </p>
            </div>

            {/* 2 */}
            <div className="bg-surface-container-lowest py-10 px-8 rounded-[2rem] shadow-ambient border border-outline-variant/10 space-y-6 text-center hover:-translate-y-2 transition duration-300">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl font-bold font-mono">
                2
              </div>

              <h3 className="text-2xl font-bold font-display text-primary">
                การวิ่งที่เข้ากับชีวิต
              </h3>

              <p className="text-on-surface-variant leading-relaxed">
                ไม่ว่าคุณจะวิ่งเพื่อสุขภาพ ผ่อนคลาย หรือออกกำลังกายเบาๆ
                เราช่วยให้คุณค้นพบรูปแบบการวิ่งที่เหมาะกับตัวเอง
              </p>
            </div>

            {/* 3 */}
            <div className="bg-surface-container-lowest py-10 px-8 rounded-[2rem] shadow-ambient border border-outline-variant/10 space-y-6 text-center hover:-translate-y-2 transition duration-300">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl font-bold font-mono">
                3
              </div>

              <h3 className="text-2xl font-bold font-display text-primary">
                เติบโตเป็นชุมชน
              </h3>

              <p className="text-on-surface-variant leading-relaxed">
                เรากำลังสร้างพื้นที่สำหรับคนรักสุขภาพ
                ที่สามารถแบ่งปัน แนะนำ และเติบโตไปด้วยกันในระยะยาว
              </p>
            </div>
          </div>
        </div>

        {/* Story */}
        <div className="space-y-8">
          <h2 className="text-4xl font-bold font-display text-on-surface text-center">
            จุดเริ่มต้นของ YARKVING
          </h2>

          <div className="space-y-6 text-lg text-on-surface-variant leading-relaxed p-10 md:p-14 bg-surface-container-low rounded-[3rem] shadow-inner">
            <p>
              YARKVING เริ่มต้นจากคำถามง่ายๆ ว่า
              “ถ้าเราอยากหาที่วิ่งดีๆ ใกล้ตัว เราควรไปหาข้อมูลจากที่ไหน?”
            </p>

            <p>
              แม้จะมีแอปวิ่งมากมาย แต่กลับไม่มีแพลตฟอร์มที่รวบรวม
              ทั้ง “สถานที่วิ่ง” และ “ประสบการณ์จริงจากผู้ใช้งาน”
              ไว้ในที่เดียว
            </p>

            <p>
              เราจึงสร้าง YARKVING ขึ้นมา เพื่อให้ผู้คนสามารถค้นหา
              บันทึก และแบ่งปันเส้นทางวิ่งในโลกจริง
              พร้อมต่อยอดไปสู่การเป็น community ของคนรักสุขภาพในอนาคต
            </p>
          </div>
        </div>

        {/* Vision */}
        <div className="space-y-8 text-center">
          <h2 className="text-4xl font-bold font-display text-on-surface">
            วิสัยทัศน์ของเรา
          </h2>

          <p className="text-xl text-on-surface-variant max-w-3xl mx-auto leading-relaxed">
            เราต้องการสร้างแพลตฟอร์มที่เชื่อมโยงผู้คนผ่านการวิ่งและการออกกำลังกาย
            จากการค้นหาสถานที่ ไปสู่การแบ่งปันประสบการณ์
            และเติบโตเป็นชุมชนสุขภาพที่แข็งแรงและยั่งยืน
          </p>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="px-8 max-w-5xl mx-auto mb-16">
        <div className="bg-primary rounded-[3rem] p-12 lg:p-20 text-center space-y-8 relative overflow-hidden shadow-ambient">
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-container opacity-50 blur-3xl rounded-full scale-150 transform translate-y-1/2"></div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold font-display text-white leading-[1.3]">
              เริ่มต้นวิ่งและดูแลสุขภาพ<br />
              ไปกับ YARKVING
            </h2>

            <p className="text-lg md:text-xl text-primary-fixed mt-6 mb-10 max-w-2xl mx-auto">
              ค้นหาเส้นทางวิ่งใหม่ๆ จากผู้ใช้งานจริง
              และเป็นส่วนหนึ่งของชุมชนคนรักสุขภาพที่กำลังเติบโต
            </p>

            <button className="bg-surface text-primary px-10 py-5 rounded-xl font-bold text-lg hover:bg-surface-dim transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 duration-300">
              เริ่มต้นใช้งาน YARKVING
            </button>
          </div>
        </div>
      </section> */}
    </main>
  );
}