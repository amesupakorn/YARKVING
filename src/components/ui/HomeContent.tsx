"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Search, MapPin, Star, CheckCircle2, ArrowRight, LayoutGrid } from "lucide-react";
import HomeMap from "@/components/ui/HomeMap";
import { useLanguage } from "@/context/LanguageContext";

interface Track {
  id: string;
  name: string;
  imageUrl: string | null;
  rating: number | null;
  imageCredit: string | null;
  district?: string | null;
}

interface HomeContentProps {
  trackCount: string;
  topTracks: Track[];
}

export function HomeContent({ trackCount, topTracks }: HomeContentProps) {
  const { t, lang } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Debounce search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/tracks/search?q=${encodeURIComponent(searchQuery)}`);
        if (res.ok) {
          const data = await res.json();
          setSearchResults(data.tracks);
        }
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Click outside handling
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <main className="w-full pb-24 bg-surface">
      {/* Hero Section: Editorial Dashboard Design */}
      <section className="relative min-h-[100svh] lg:min-h-[850px] flex flex-col justify-center px-5 sm:px-8 pt-28 md:pt-20">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left Column: Focused Copy & Search */}
          <div className="space-y-8 md:space-y-12">
            <div className="space-y-4 md:space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-display leading-[1.1] text-primary">
                {t('home', 'heroTitle')}<br />
                <span className="text-secondary opacity-90">{t('home', 'heroSubtitle')}</span>
              </h1>

              <p className="text-lg md:text-xl text-on-surface-variant max-w-lg leading-relaxed font-medium">
                {t('home', 'heroDesc')}
              </p>
            </div>

            {/* Custom Styled Search Bar */}
            <div className="relative max-w-xl group" ref={searchRef}>
              <div className="absolute inset-y-0 left-6 md:left-8 flex items-center pointer-events-none z-10">
                {isLoading ? (
                  <div className="w-5 h-5 md:w-6 md:h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                ) : (
                  <Search className="w-5 h-5 md:w-6 md:h-6 text-outline" strokeWidth={1.5} />
                )}
              </div>
              <input
                className="w-full h-16 md:h-20 pl-14 md:pl-20 pr-6 md:pr-10 bg-white border-none rounded-[2rem] text-lg md:text-xl shadow-ambient focus:ring-8 focus:ring-primary/5 transition-all placeholder:text-outline-variant outline-none font-sans"
                placeholder={t('home', 'searchPlaceholder')}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
              />

              {/* Search Results Dropdown */}
              {isFocused && (searchQuery || isLoading) && (
                <div className="absolute top-full left-0 right-0 mt-4 bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-ambient-heavy border border-white/50 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="max-h-[400px] overflow-y-auto p-4 scrollbar-none">
                    {isLoading ? (
                      <div className="py-8 text-center text-on-surface-variant font-medium flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                        {t('common', 'loading')}
                      </div>
                    ) : searchResults.length > 0 ? (
                      <div className="space-y-2">
                        <div className="px-4 py-2 text-xs font-bold text-outline uppercase tracking-wider">
                          {t('home', 'popularTracks')}
                        </div>
                        {searchResults.map((track) => (
                          <Link
                            key={track.id}
                            href={`/track/${track.id}`}
                            className="flex items-center gap-5 p-4 rounded-2xl hover:bg-primary/5 transition-colors group/item"
                          >
                            <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-surface-container shadow-sm group-hover/item:shadow-md transition-shadow">
                              <img
                                src={track.imageUrl || "/image/default-track.png"}
                                alt={track.name}
                                className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-on-surface text-lg truncate group-hover/item:text-primary transition-colors">
                                {track.name}
                              </h4>
                              <div className="flex items-center gap-2 text-sm text-on-surface-variant font-medium">
                                <Star className="w-3.5 h-3.5 fill-tertiary text-tertiary" />
                                <span>{track.rating?.toFixed(1) || "0.0"}</span>
                                <span className="text-outline-variant">•</span>
                                <span>{track.district || (lang === 'th' ? 'กรุงเทพฯ' : 'Bangkok')}</span>
                              </div>
                            </div>
                            <ArrowRight className="w-5 h-5 text-outline opacity-0 group-hover/item:opacity-100 -translate-x-2 group-hover/item:translate-x-0 transition-all text-primary" />
                          </Link>
                        ))}
                      </div>
                    ) : searchQuery ? (
                      <div className="py-12 text-center text-on-surface-variant flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center">
                          <Search className="w-8 h-8 opacity-20" />
                        </div>
                        <div>
                          <p className="font-bold text-lg text-on-surface">ไม่พบผลการค้นหา</p>
                          <p className="text-sm">ลองเปลี่ยนชื่อสถานที่ หรือเขตที่คุณสนใจ</p>
                        </div>
                      </div>
                    ) : null}
                  </div>
                  {searchResults.length > 0 && (
                    <Link
                      href="/explore"
                      className="block p-5 bg-surface/50 border-t border-outline-variant/10 text-center font-bold text-primary hover:bg-primary/5 transition-colors"
                    >
                      {t('home', 'btnExploreAll')}
                    </Link>
                  )}
                </div>
              )}
            </div>

            {/* Feature Highlights */}
            <div className="flex flex-wrap gap-8 pt-4">
              <div className="flex items-center gap-3 text-secondary font-bold">
                <CheckCircle2 className="w-6 h-6 text-primary fill-primary/10" />
                <span>{trackCount}+ {t('home', 'statsTracks')}</span>
              </div>
              <div className="flex items-center gap-3 text-secondary font-bold">
                <CheckCircle2 className="w-6 h-6 text-primary fill-primary/10" />
                <span>{t('home', 'statsDistricts')}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Network Card - Minimalist Scale */}
          <div className="relative hidden lg:block">
            <div className="bg-white rounded-[2rem] p-4 shadow-ambient-heavy border border-white/50 relative overflow-hidden group">
              {/* Visual Accent Decoration inside Card */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

              {/* Map Container - Ultra Compact */}
              <div className="relative h-[350px] rounded-[1.5rem] overflow-hidden bg-surface-container mb-3 shadow-inner-ambient">
                <HomeMap />

                {/* Live Indicator Overlay */}
                <div className="absolute top-3 left-3 z-30">
                  <div className="bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-primary/10 flex items-center gap-2 shadow-sm">
                    <div className="relative flex h-1 w-1">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1 w-1 bg-primary"></span>
                    </div>
                    <span className="text-[8px] font-bold uppercase tracking-widest text-primary font-mono">Live</span>
                  </div>
                </div>

                {/* Popular Areas Overlay - Minimalist */}
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-xl px-3 py-2 rounded-xl shadow-ambient-heavy z-30 flex items-center gap-3 border border-white/50">
                  <div className="w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center shrink-0">
                    <LayoutGrid className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[7px] font-bold text-outline uppercase tracking-wider mb-0">{t('home', 'popularAreas')}</div>
                    <div className="font-bold text-on-surface text-xs truncate">{t('home', 'bangkok')}</div>
                  </div>
                </div>
              </div>

              {/* Bento Stats Grid - Ultra Compact */}
              <div className="grid grid-cols-2 gap-2.5 mb-3">
                <div className="bg-surface-container-low p-3.5 rounded-xl border border-outline-variant/5">
                  <div className="text-xl font-bold text-primary mb-0 font-display leading-none">{trackCount}+</div>
                  <div className="text-[9px] text-on-surface-variant font-medium tracking-tight italic">{t('home', 'verifiedTracks')}</div>
                </div>
                <div className="bg-secondary/5 p-3.5 rounded-xl border border-outline-variant/5">
                  <div className="text-xl font-bold text-secondary mb-0 font-display leading-none">4.8</div>
                  <div className="text-[9px] text-on-surface-variant font-medium tracking-tight italic">Rating</div>
                </div>
              </div>

              {/* Action Button - Balanced for small scale */}
              <Link href="/explore" className="w-full bg-primary text-white h-12 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-secondary transition-all shadow-lg shadow-primary/20 group/btn">
                <span>{t('home', 'btnExploreAll')}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </div>
            {/* Visual Flare Decoration (External) */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/5 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </section>

      {/* Content Section: Grid Layout */}
      <section className="py-16 md:py-24 px-5 sm:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-3 md:mb-4">{t('home', 'popularTracks')}</h2>
            <p className="text-on-surface-variant text-base md:text-lg">{t('home', 'popularDesc')}</p>
          </div>
          <Link href="/explore" className="bg-secondary-container text-on-secondary-container px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold transition-all hover:opacity-90 inline-flex self-stretch justify-center md:self-end text-sm text-center">
            {t('home', 'btnSeeMore')}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {topTracks.map((track) => (
            <Link key={track.id} href={`/track/${track.id}`} className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl">
              <div className="relative rounded-xl overflow-hidden aspect-[4/3] mb-6 bg-surface-container-high translate-y-0 group-hover:-translate-y-1 transition-transform duration-300">
                <img
                  alt={track.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={track.imageUrl || "/image/default-track.png"}
                />
                {track.rating && track.rating >= 4.5 && (
                  <div className="absolute top-4 left-4">
                    <Badge pulsing>{lang === 'th' ? 'ยอดนิยม' : 'Popular Now'}</Badge>
                  </div>
                )}
                {track.imageCredit && (
                  <div className="absolute bottom-2 right-2">
                    <span className="text-white/50 text-[10px] font-mono bg-black/20 px-1.5 py-0.5 rounded backdrop-blur-sm pointer-events-none">
                      © {track.imageCredit}
                    </span>
                  </div>
                )}
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <h3 className="text-2xl font-bold font-display group-hover:text-primary transition-colors">{track.name}</h3>
                </div>
                <div className="flex items-center text-on-surface-variant gap-2 font-medium">
                  <MapPin className="w-5 h-5 text-outline" strokeWidth={1} /> {track.district || (lang === 'th' ? 'กรุงเทพฯ' : 'Bangkok')}
                </div>
                <div className="pt-4 flex items-center justify-between border-t border-outline-variant/20">
                  <div className="flex items-center gap-1 text-tertiary">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(track.rating || 0) ? "fill-current" : ""}`}
                      />
                    ))}
                    <span className="ml-2 text-on-surface font-mono font-semibold text-sm">{track.rating?.toFixed(1) || "0.0"}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
