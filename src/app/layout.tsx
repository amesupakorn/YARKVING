import type { Metadata } from "next";
import { IBM_Plex_Sans_Thai, Inter } from "next/font/google";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";


const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  variable: "--font-ibm-plex-sans-thai",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["thai", "latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yarkving.com"),
  title: {
    default: "YARKVING - The Digital Park | แอปวิ่ง แนะนำเส้นทางวิ่งและชุมชนคนรักสุขภาพ",
    template: "%s | YARKVING"
  },
  description: "YARKVING คือแพลตฟอร์มสำหรับคนรักการวิ่งและสุขภาพ ที่รวบรวมเส้นทางวิ่งยอดนิยมจากผู้ใช้งานจริง พร้อมสร้าง community สำหรับการออกกำลังกายอย่างยั่งยืน รวบรวมสวนสาธารณะและสถานที่วิ่งทั่วกรุงเทพฯ",
  keywords: ["วิ่ง", "ออกกำลังกาย", "สวนสาธารณะ", "กรุงเทพ", "เส้นทางวิ่ง", "running", "park", "bangkok", "fitness", "yarkving"],
  authors: [{ name: "YARKVING Team" }],
  creator: "YARKVING",
  publisher: "YARKVING",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "th_TH",
    url: "https://yarkving.com",
    siteName: "YARKVING",
    title: "YARKVING - The Digital Park",
    description: "แอปวิ่ง แนะนำเส้นทางวิ่งและชุมชนคนรักสุขภาพ รวบรวมสวนสาธารณะและสถานที่วิ่งทั่วกรุงเทพฯ",
    images: [
      {
        url: "/icon.png",
        width: 1200,
        height: 630,
        alt: "YARKVING - The Digital Park",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YARKVING - The Digital Park",
    description: "แอปวิ่ง แนะนำเส้นทางวิ่งและชุมชนคนรักสุขภาพ รวบรวมสวนสาธารณะและสถานที่วิ่งทั่วกรุงเทพฯ",
    images: ["/icon.png"],
    creator: "@yarkving",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ibmPlexSansThai.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-on-surface">
        <LanguageProvider>
          {/* Global Floating Frosted Navigation */}
          <Navbar />

          {/* Since the nav is fixed and transparent, components need top padding if they want to sit below it, but we handle that per page */}
          <div className="flex-1 flex flex-col">
            {children}
          </div>
          
          <Footer />
          <CookieConsent />
        </LanguageProvider>
      </body>
    </html>
  );
}
