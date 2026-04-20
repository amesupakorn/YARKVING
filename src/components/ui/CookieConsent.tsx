"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Cookie, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("yarkving-cookie-consent");
    if (!consent) {
      // Small delay for better UX entrance
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("yarkving-cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("yarkving-cookie-consent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 sm:bottom-6 sm:right-6 sm:left-auto z-[100] sm:max-w-[400px]",
        "animate-in fade-in slide-in-from-bottom-10 duration-700 ease-out"
      )}
    >
      <div
        className={cn(
          "bg-surface-container-lowest/90 backdrop-blur-xl border-t sm:border border-outline-variant/20 sm:rounded-2xl p-6 sm:p-8 shadow-ambient",
          "flex flex-col gap-5 sm:gap-6"
        )}
      >
        <div className="flex justify-between items-start gap-4">
          <div className="bg-primary/10 p-3 rounded-xl text-primary">
            <Cookie className="w-6 h-6" strokeWidth={1.5} />
          </div>
          <button
            onClick={handleDecline}
            className="text-outline-variant hover:text-on-surface transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold font-display text-on-surface">
            {t('cookie', 'title')}
          </h3>
          <p className="text-on-surface-variant text-sm leading-relaxed">
            {t('cookie', 'desc')}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={handleAccept}
            className={cn(
              "flex-1 bg-primary text-on-primary h-14 py-2.5 rounded-xl font-bold text-sm",
              "hover:bg-primary-container transition-all active:scale-[0.98] shadow-sm"
            )}
          >
            {t('cookie', 'accept')}
          </button>
          <button
            onClick={handleDecline}
            className={cn(
              "flex-1 bg-secondary-container text-on-secondary-container h-14 py-2.5 rounded-xl font-semibold text-sm",
              "hover:bg-secondary-container/80 transition-all active:scale-[0.98]"
            )}
          >
            {t('cookie', 'decline')}
          </button>
        </div>
      </div>
    </div>
  );
}
