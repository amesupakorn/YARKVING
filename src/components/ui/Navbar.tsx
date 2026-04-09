"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Leaf, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl rounded-[1.5rem] md:rounded-full bg-surface-container-lowest/70 backdrop-blur-2xl shadow-ambient px-6 py-4 flex flex-col md:flex-row md:items-center justify-between border border-outline-variant/20 transition-all duration-300">
      <div className="flex items-center justify-between w-full md:w-auto">
        <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
          <Leaf className="w-6 h-6 text-primary" strokeWidth={1.5} />
          <span className="font-display font-semibold text-xl tracking-tight text-primary">YARKVING</span>
        </Link>
        <button
          className="md:hidden text-primary focus:outline-none p-1"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex flex-1 items-center justify-center gap-8 text-sm font-medium">
        <Link href="/explore" className="hover:text-primary transition-colors">ค้นหาเส้นทางวิ่งใหม่ๆ</Link>
      </div>

      {/* Desktop Button */}
      <div className="hidden md:block">
        <Link href="/about">
          <Button variant="primary" className="py-2 px-6 rounded-full text-[13px] font-bold">
            เกี่ยวกับเรา
          </Button>
        </Link>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col gap-4 mt-6 pb-2 border-t border-outline-variant/10 pt-4 animate-in fade-in duration-200">
          <Link
            href="/"
            className="hover:text-primary text-base font-semibold transition-colors py-2 px-2 rounded-lg hover:bg-surface-container-low"
            onClick={() => setIsOpen(false)}
          >
            ค้นหาเส้นทางวิ่งใหม่ๆ
          </Link>
          <Link
            href="/about"
            className="hover:text-primary text-base font-semibold transition-colors py-2 px-2 rounded-lg hover:bg-surface-container-low"
            onClick={() => setIsOpen(false)}
          >
            เกี่ยวกับเรา
          </Link>
        </div>
      )}
    </nav>
  );
}
