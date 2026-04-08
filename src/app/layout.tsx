import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Be_Vietnam_Pro } from "next/font/google";
import Link from "next/link";
import { Leaf } from "lucide-react";
import { Button } from "@/components/ui/Button";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-vietnam",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YARKVING - The Digital Park",
  description: "A serene digital park experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${beVietnamPro.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-on-surface">
        {/* Global Floating Frosted Navigation */}
        <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl rounded-full bg-surface-container-lowest/60 backdrop-blur-2xl shadow-ambient px-8 py-4 flex items-center justify-between border border-outline-variant/20">
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="w-6 h-6 text-primary" strokeWidth={1.5} />
            <span className="font-display font-semibold text-xl tracking-tight text-primary">YARKVING</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/" className="hover:text-primary transition-colors">Explore</Link>
            <Link href="#" className="hover:text-primary transition-colors">My Runs</Link>
            <Link href="#" className="hover:text-primary transition-colors">Community</Link>
          </div>
          <Button variant="primary" className="py-2 px-6 rounded-full text-[13px] font-bold">
            Join Now
          </Button>
        </nav>

        {/* Since the nav is fixed and transparent, components need top padding if they want to sit below it, but we handle that per page */}
        {children}
      </body>
    </html>
  );
}
