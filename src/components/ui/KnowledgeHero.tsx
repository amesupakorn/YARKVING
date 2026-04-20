"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export function KnowledgeHero() {
  const { t } = useLanguage();

  return (
    <section className="pt-32 pb-16 md:pt-48 md:pb-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in-up">
            <span className="inline-block px-5 py-1.5 rounded-full bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-widest mb-6 border border-primary/10">
              KNOWLEDGE HUB
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-on-surface leading-[1.1] mb-8 tracking-tight">
              {t('knowledge', 'title')}
            </h1>
            <p className="text-xl md:text-2xl text-on-surface/70 leading-relaxed max-w-2xl mx-auto font-medium">
              {t('knowledge', 'subtitle')}
            </p>
          </div>
        </div>
      </div>
      
      {/* Decorative vertical lines like an editorial layout */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-outline-variant/5 hidden lg:block" />
      <div className="absolute top-0 right-1/4 w-px h-full bg-outline-variant/5 hidden lg:block" />
    </section>
  );
}
