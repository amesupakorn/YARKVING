"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Leaf, Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/context/LanguageContext";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  const toggleLanguage = () => {
    setLang(lang === "th" ? "en" : "th");
  };

  return (
    <nav className="fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl rounded-[1.5rem] md:rounded-full bg-surface-container-lowest/70 backdrop-blur-2xl shadow-ambient px-6 py-4 flex flex-col md:flex-row md:items-center justify-between border border-outline-variant/20 transition-all duration-300">
      <div className="flex items-center justify-between w-full md:w-auto">
        <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
          <Leaf className="w-6 h-6 text-primary" strokeWidth={1.5} />
          <span className="font-display font-semibold text-xl tracking-tight text-primary">YARKVING</span>
        </Link>
        <div className="flex items-center gap-2">
          {/* Mobile Language Switcher */}
          <button 
            onClick={toggleLanguage}
            className="md:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-high text-on-surface text-xs font-bold border border-outline-variant/10 shadow-sm"
          >
            <Globe className="w-3.5 h-3.5 text-primary" />
            {lang === "th" ? "EN" : "TH"}
          </button>
          
          <button
            className="md:hidden text-primary focus:outline-none p-1"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex flex-1 items-center justify-center gap-8 text-sm font-medium">
        <Link href="/explore" className="hover:text-primary transition-colors">{t('navbar', 'explore')}</Link>
        
        {/* Desktop Language Switcher */}
        <button 
          onClick={toggleLanguage}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-high hover:bg-surface-variant text-on-surface text-xs font-bold border border-outline-variant/10 shadow-sm transition-all active:scale-95 group"
        >
          <Globe className="w-4 h-4 text-primary group-hover:rotate-12 transition-transform" />
          <span className={lang === 'th' ? 'text-primary' : 'text-on-surface-variant'}>TH</span>
          <span className="text-outline-variant">|</span>
          <span className={lang === 'en' ? 'text-primary' : 'text-on-surface-variant'}>EN</span>
        </button>
      </div>

      {/* Desktop Button */}
      <div className="hidden md:block">
        <Link href="/about">
          <Button variant="primary" className="py-2 px-6 rounded-full text-[13px] font-bold">
            {t('navbar', 'about')}
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
            {t('navbar', 'searchNew')}
          </Link>
          <Link
            href="/about"
            className="hover:text-primary text-base font-semibold transition-colors py-2 px-2 rounded-lg hover:bg-surface-container-low"
            onClick={() => setIsOpen(false)}
          >
            {t('navbar', 'about')}
          </Link>
        </div>
      )}
    </nav>
  );
}
