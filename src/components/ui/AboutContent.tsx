"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export function AboutContent() {
  const { t } = useLanguage();

  return (
    <main className="w-full pb-24">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] overflow-hidden bg-surface-container-low flex flex-col justify-center px-5 sm:px-8 pt-32 md:pt-40 pb-16 md:pb-20">
        <div className="absolute top-0 left-0 w-full h-full bg-primary/5 blur-3xl rounded-full scale-150 transform -translate-y-1/2"></div>

        <div className="max-w-4xl mx-auto w-full relative z-10 text-center space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display leading-[1.2] text-on-surface">
            {t('about', 'heroTitle')}<br />
            <span className="text-primary italic">
              {t('about', 'heroSubtitle')}
            </span>
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            {t('about', 'heroDesc')}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 px-8 max-w-4xl mx-auto space-y-24">

        {/* Mission */}
        <div className="space-y-8 text-center">
          <h2 className="text-4xl font-bold font-display text-on-surface">
            {t('about', 'missionTitle')}
          </h2>

          <div className="space-y-6 text-xl text-on-surface-variant leading-relaxed max-w-3xl mx-auto">
            <p>{t('about', 'mission1')}</p>
            <p>{t('about', 'mission2')}</p>
            <p>{t('about', 'mission3')}</p>
          </div>
        </div>

        {/* Core Values */}
        <div className="space-y-12">
          <h2 className="text-4xl font-bold font-display text-on-surface text-center">
            {t('about', 'valuesTitle')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 1 */}
            <div className="bg-surface-container-lowest py-10 px-8 rounded-[2rem] shadow-ambient border border-outline-variant/10 space-y-6 text-center hover:-translate-y-2 transition duration-300">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl font-bold font-mono">
                1
              </div>
              <h3 className="text-2xl font-bold font-display text-primary">
                {t('about', 'value1Title')}
              </h3>
              <p className="text-on-surface-variant leading-relaxed">
                {t('about', 'value1Desc')}
              </p>
            </div>

            {/* 2 */}
            <div className="bg-surface-container-lowest py-10 px-8 rounded-[2rem] shadow-ambient border border-outline-variant/10 space-y-6 text-center hover:-translate-y-2 transition duration-300">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl font-bold font-mono">
                2
              </div>
              <h3 className="text-2xl font-bold font-display text-primary">
                {t('about', 'value2Title')}
              </h3>
              <p className="text-on-surface-variant leading-relaxed">
                {t('about', 'value2Desc')}
              </p>
            </div>

            {/* 3 */}
            <div className="bg-surface-container-lowest py-10 px-8 rounded-[2rem] shadow-ambient border border-outline-variant/10 space-y-6 text-center hover:-translate-y-2 transition duration-300">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl font-bold font-mono">
                3
              </div>
              <h3 className="text-2xl font-bold font-display text-primary">
                {t('about', 'value3Title')}
              </h3>
              <p className="text-on-surface-variant leading-relaxed">
                {t('about', 'value3Desc')}
              </p>
            </div>
          </div>
        </div>

        {/* Story */}
        <div className="space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-on-surface text-center">
            {t('about', 'storyTitle')}
          </h2>

          <div className="space-y-6 text-base md:text-lg text-on-surface-variant leading-relaxed p-6 sm:p-10 md:p-14 bg-surface-container-low rounded-[2rem] md:rounded-[3rem] shadow-inner">
            <p>{t('about', 'story1')}</p>
            <p>{t('about', 'story2')}</p>
            <p>{t('about', 'story3')}</p>
          </div>
        </div>

        {/* Vision */}
        <div className="space-y-8 text-center">
          <h2 className="text-4xl font-bold font-display text-on-surface">
            {t('about', 'visionTitle')}
          </h2>

          <p className="text-xl text-on-surface-variant max-w-3xl mx-auto leading-relaxed">
            {t('about', 'visionDesc')}
          </p>
        </div>
      </section>
    </main>
  );
}
