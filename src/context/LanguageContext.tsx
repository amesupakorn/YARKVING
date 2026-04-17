"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations, TranslationKey, TranslationCategory } from "@/translations";

type Language = "th" | "en";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (category: TranslationCategory, key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("th");

  // Load preferred language from localStorage on mount
  useEffect(() => {
    const savedLang = localStorage.getItem("yarkving-lang") as Language;
    if (savedLang && (savedLang === "th" || savedLang === "en")) {
      setLangState(savedLang);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("yarkving-lang", newLang);
  };

  const t = (category: TranslationCategory, key: string): string => {
    const dict = (translations[lang] as any)?.[category];
    if (!dict) return key;
    return dict[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
