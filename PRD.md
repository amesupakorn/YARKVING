Project Overview: Yarkวิ่ง (Yark-Ving)
1. Vision & Objective (วิสัยทัศน์และวัตถุประสงค์)
Yarkวิ่ง คือแพลตฟอร์มยุคใหม่สำหรับคอมมูนิตี้การออกกำลังกาย ที่เน้นการส่งมอบ User Experience (UX) ที่ดีที่สุดในการค้นหาและบันทึกประสบการณ์การวิ่ง โดยมีวัตถุประสงค์หลักดังนี้:
Real-world Track Discovery: ระบุตำแหน่งและเส้นทางวิ่งที่ "คนนิยมวิ่งจริงๆ" โดยอ้างอิงจากข้อมูลผู้ใช้งานจริง ไม่ใช่เพียงแค่ข้อมูลจากแผนที่ทั่วไป
Immersive Map Experience: นำเสนอสนามวิ่งในรูปแบบ 3D Model/Minimalist Map เพื่อให้ผู้ใช้เห็นภาพรวมของสถานที่ รีวิว และบรรยากาศก่อนไปจริง
Simplified Tracking: ระบบจับตำแหน่งการวิ่ง (GPS Tracking) ที่เน้นความเรียบง่าย (Minimalist) แต่แม่นยำสูง
Community-Driven: สร้างพื้นที่สำหรับการรีวิวสนามวิ่งและแบ่งปันเส้นทางใหม่ๆ เพื่อขยายตัวสู่ Social Community สำหรับนักวิ่งในอนาคต
2. Core Features (ฟีเจอร์หลัก)
Phase 1: Exploration & Visualization (Focus)
3D Track Viewer: หน้าจอแสดงแผนที่สนามวิ่งยอดนิยมในรูปแบบโมเดล 3D มินิมอล พร้อมแสดงจุดสำคัญ (Amenities) เช่น ห้องน้ำ, จุดฝากของ, หรือโซนที่มีร่มไม้
User Location Insights: ระบบระบุความนิยมของสนามวิ่ง (Heatmap) โดยอิงจากจำนวนผู้ไปใช้งานจริง
Minimalist Thai UI: ส่วนต่อประสานผู้ใช้ที่ออกแบบมาเพื่อคนไทย ใช้ฟอนต์ที่อ่านง่าย และลดความซับซ้อนของเมนู (Less is More)
Phase 2: Running & Tracking
Simplified GPS Tracker: ระบบบันทึกพิกัดการวิ่งที่ทำงานได้ลื่นไหล แสดงผลเฉพาะค่าที่จำเป็น (Pace, Distance, Time)
Park Review System: ระบบให้คะแนนและรีวิวสนามวิ่ง (เช่น พื้นผิวทางวิ่ง, แสงสว่าง, ความปลอดภัย)
3. Key Design Principles (หลักการออกแบบ)
Minimalism: ทุกอย่างต้องดูคลีน มี White Space เยอะๆ ไม่รกเหมือน Strava แบบดั้งเดิม
Thai-Centric UX: การจัดวาง Typography และคำสั่งต่างๆ ต้องเข้ากับบริบทและการใช้งานของคนไทย
High Performance: การโหลดแผนที่และข้อมูลพิกัดต้องทำได้อย่างรวดเร็ว (Low Latency)
4. Technical Constraints (ข้อกำหนดทางเทคนิค)
Architecture: แยกส่วน Frontend (Next.js) และ Backend (Node.js/Go) เพื่อประสิทธิภาพสูงสุด
Geospatial Data: ใช้ PostgreSQL + PostGIS ในการคำนวณและจัดเก็บพิกัดเชิงภูมิศาสตร์
Real-time: รองรับการส่งข้อมูลพิกัดแบบต่อเนื่องผ่าน WebSockets หรือ High-frequency API
Map Engine: ใช้ Mapbox GL JS หรือ Three.js สำหรับการเรนเดอร์โมเดลสถานที่
5. Future Roadmap (แผนงานในอนาคต)
Full Social Networking: ระบบติดตามเพื่อน (Followers), กิจกรรมกลุ่ม (Group Runs), และกระดานผู้นำ (Leaderboard) ตามสนามต่างๆ
Mobile Native App: การพัฒนาแอปพลิเคชันบนมือถือเต็มรูปแบบเพื่อความสะดวกในการพกพาขณะวิ่ง