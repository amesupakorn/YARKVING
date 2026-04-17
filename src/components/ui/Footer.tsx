"use client";

import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="w-full py-10 mt-auto border-t border-outline-variant/20 bg-surface-container-low text-on-surface-variant font-sans">
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        <p className="font-medium">
          {t('footer', 'copyright').replace('{year}', new Date().getFullYear().toString())}
        </p>
        <p className="flex items-center gap-2">
          {t('footer', 'contact')} 
          <a
            href="mailto:supakorn642@gmail.com" 
            className="text-primary font-bold hover:underline transition-all"
          >
            supakorn642@gmail.com
          </a>
        </p>
      </div>
    </footer>
  );
}
