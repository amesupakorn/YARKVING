"use client";

import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeft, MapPin, Map, Star, Clock, Droplets, Lock, Navigation, Activity, LineChart, Zap, UtensilsCrossed, Leaf, Wind, Sun } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface Review {
  id: string;
  authorName: string;
  authorPhotoUrl: string | null;
  rating: number;
  text: string;
  timeDescription: string | null;
}

interface Track {
  id: string;
  name: string;
  imageUrl: string;
  rating: number;
  distance: number | null;
  surface: string | null;
  elevation: string | null;
  difficulty: string | null;
  description: string | null;
  bestTime: string | null;
  hasRestrooms: boolean;
  hasWater: boolean;
  hasParking: boolean;
  hasLockers: boolean;
  latitude: number;
  longitude: number;
  googlePlaceId: string | null;
  imageCredit: string | null;
  district: string | null;
  reviews: Review[];
}

interface TrackDetailsContentProps {
  track: Track;
}

export function TrackDetailsContent({ track }: TrackDetailsContentProps) {
  const { t, lang } = useLanguage();

  return (
    <main className="w-full pb-24 md:pb-0">
      {/* Hero Section: Editorial Cover Design */}
      <section className="relative min-h-[50vh] md:min-h-[700px] flex flex-col justify-end px-5 md:px-8 pb-12 md:pb-20 pt-32 overflow-hidden">
        {/* Cinematic Map/Satellite Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src={`/api/map-image?lat=${track.latitude}&lng=${track.longitude}&zoom=16&width=1920&height=1080`}
            alt={`Location of ${track.name}`}
            className="w-full h-full object-cover scale-105 active:scale-100 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-primary/5 mix-blend-overlay z-10"></div>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 text-white text-xs font-bold uppercase tracking-widest mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            {track.district || (lang === 'th' ? 'กรุงเทพฯ' : 'Bangkok')}
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold font-display text-primary leading-[0.9] tracking-tighter mb-8 max-w-4xl animate-in fade-in slide-in-from-bottom-6 duration-700">
            {track.name}
          </h1>
        </div>
      </section>

      {/* Details & Action Grid */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-16">
        {/* Left Column: Data Bento */}
        <div className="lg:col-span-2 space-y-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <div className="p-6 md:p-8 rounded-[2rem] bg-surface-container-lowest border border-outline-variant/10 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/5 rounded-2xl flex items-center justify-center">
                  <Navigation className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <h4 className="font-bold text-on-surface-variant uppercase text-xs tracking-widest">{t('trackDetails', 'distance')}</h4>
              </div>
              <div className="text-3xl md:text-4xl font-bold text-on-surface font-mono">{track.distance || "--"} {t('common', 'km')}</div>
            </div>
            
            <div className="p-6 md:p-8 rounded-[2rem] bg-surface-container-lowest border border-outline-variant/10 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-secondary/5 rounded-2xl flex items-center justify-center">
                  <Activity className="w-5 h-5 md:w-6 md:h-6 text-secondary" />
                </div>
                <h4 className="font-bold text-on-surface-variant uppercase text-xs tracking-widest">{t('trackDetails', 'surface')}</h4>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-on-surface">{track.surface || "--"}</div>
            </div>

            <div className="p-6 md:p-8 rounded-[2rem] bg-surface-container-lowest border border-outline-variant/10 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-tertiary/5 rounded-2xl flex items-center justify-center">
                  <LineChart className="w-5 h-5 md:w-6 md:h-6 text-tertiary" />
                </div>
                <h4 className="font-bold text-on-surface-variant uppercase text-xs tracking-widest">{t('trackDetails', 'elevation')}</h4>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-on-surface">{track.elevation || "--"}</div>
            </div>

            <div className="p-6 md:p-8 rounded-[2rem] bg-surface-container-lowest border border-outline-variant/10 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/5 rounded-2xl flex items-center justify-center">
                  <Zap className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <h4 className="font-bold text-on-surface-variant uppercase text-xs tracking-widest">{t('trackDetails', 'difficulty')}</h4>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-on-surface">{track.difficulty || "--"}</div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-3xl md:text-4xl font-bold font-display text-primary">{t('trackDetails', 'aboutTrack')}</h3>
            <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed font-body">
              {track.description}
            </p>
          </div>
        </div>

        {/* Right Column: Facilities & Action */}
        <div className="lg:col-span-1 bg-surface-bright border border-outline-variant/20 rounded-[3rem] p-6 md:p-8 shadow-ambient sticky top-32 flex flex-col gap-8 h-fit">
          <div className="space-y-4">
            <h4 className="font-bold font-display text-xl text-on-surface">{t('trackDetails', 'facilities')}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 md:gap-4">
              <div className={`flex items-center gap-3 p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/5 transition-opacity ${track.hasRestrooms ? "opacity-100" : "opacity-40"}`}>
                <Droplets className="w-5 h-5 text-primary" strokeWidth={1.5} />
                <span className="font-medium text-sm">{t('explore', 'facilityRestrooms')}</span>
              </div>
              <div className={`flex items-center gap-3 p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/5 transition-opacity ${track.hasWater ? "opacity-100" : "opacity-40"}`}>
                <UtensilsCrossed className="w-5 h-5 text-primary" strokeWidth={1.5} />
                <span className="font-medium text-sm">{t('explore', 'facilityWater')}</span>
              </div>
              <div className={`flex items-center gap-3 p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/5 transition-opacity ${track.hasParking ? "opacity-100" : "opacity-40"}`}>
                <Clock className="w-5 h-5 text-primary" strokeWidth={1.5} />
                <span className="font-medium text-sm">{t('explore', 'facilityParking')}</span>
              </div>
              <div className={`flex items-center gap-3 p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/5 transition-opacity ${track.hasLockers ? "opacity-100" : "opacity-40"}`}>
                <Lock className="w-5 h-5 text-primary" strokeWidth={1.5} />
                <span className="font-medium text-sm">{t('explore', 'facilityLockers')}</span>
              </div>
            </div>
          </div>
          <div className="mt-auto space-y-4 md:pt-4">
            <a 
              href={`https://www.google.com/maps/search/?api=1&query=${track.latitude},${track.longitude}${track.googlePlaceId ? `&query_place_id=${track.googlePlaceId}` : ""}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-gradient-to-br from-primary to-primary-container text-on-primary py-4 rounded-xl font-bold text-base hover:opacity-90 active:scale-95 transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <Navigation className="w-5 h-5" />
              {t('trackDetails', 'openInMaps')}
            </a>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-12 md:py-16">
        <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] md:aspect-[21/9]">
          <iframe
            className="w-full h-full border-0 absolute inset-0 z-0"
            loading="lazy"
            allowFullScreen
            src={`https://maps.google.com/maps?q=${track.latitude},${track.longitude}&z=15&output=embed`}
            title={`Map location of ${track.name}`}
          ></iframe>
          <div className="absolute inset-0 bg-primary/10 pointer-events-none z-10"></div>
          <div className="absolute top-4 md:top-6 left-4 md:left-6 bg-white/60 backdrop-blur-3xl px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl border border-white/50 shadow-ambient z-20">
            <h4 className="font-bold font-display text-primary text-sm md:text-base mb-1">{t('trackDetails', 'trackTopology')}</h4>
            <p className="text-xs md:text-sm text-on-surface-variant font-medium">{t('trackDetails', 'locationMap')}</p>
          </div>
        </div>
      </section>

      {/* Reviews Section from Google Maps */}
      {/* Reviews Section from Google Maps */}
      <section className="bg-surface-container-low py-16 md:py-20 px-5 sm:px-8 border-t border-outline-variant/10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-display text-primary mb-3">{t('trackDetails', 'userReviews')}</h2>
              <div className="flex items-center gap-4">
                <div className="flex text-tertiary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 md:w-6 md:h-6 ${i < Math.floor(track.rating) ? "fill-current" : "text-tertiary/20 fill-current"}`}
                    />
                  ))}
                </div>
                <span className="text-xl md:text-2xl font-bold text-on-surface">
                  {track.rating.toFixed(1)} <span className="text-sm md:text-base font-medium text-on-surface-variant">{t('trackDetails', 'outOfFive')}</span>
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full border border-outline-variant/20 shadow-sm self-start md:self-auto">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-xs md:text-sm font-bold text-primary">{t('trackDetails', 'reviewsPoweredBy')}</span>
            </div>
          </div>

          {track.reviews && track.reviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {track.reviews.map((review, index) => {
                // Alternating icons for reviewers
                const ReviewIcons = [Leaf, Wind, Sun];
                const Icon = ReviewIcons[index % ReviewIcons.length];

                return (
                  <div key={review.id} className="bg-surface-container-lowest p-6 md:p-8 rounded-2xl shadow-ambient border border-outline-variant/10 transition-colors hover:bg-surface-bright flex flex-col h-full">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                          <Icon className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-bold text-on-surface truncate">{review.authorName}</h4>
                          <p className="text-xs md:text-sm text-on-surface-variant truncate font-medium">{review.timeDescription}</p>
                        </div>
                      </div>
                      <div className="flex text-tertiary-container shrink-0">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-3.5 h-3.5 md:w-4 md:h-4 ${i < review.rating ? "fill-current" : "text-tertiary-container/30 fill-current"}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm md:text-base text-on-surface-variant leading-relaxed font-body flex-grow">
                      {review.text}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-surface-container-lowest p-10 md:p-16 rounded-[2.5rem] shadow-ambient border border-outline-variant/10 text-center flex flex-col items-center justify-center max-w-2xl mx-auto">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/5 rounded-full flex items-center justify-center mb-6 md:mb-8">
                <Star className="w-8 h-8 md:w-10 md:h-10 text-primary opacity-20" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold font-display text-primary mb-4">{lang === 'th' ? 'ยังไม่มีความประทับใจแชร์ที่นี่' : 'No reviews shared here yet'}</h3>
              <p className="text-base md:text-lg text-on-surface-variant leading-relaxed mb-8 md:mb-10">
                {lang === 'th' ? `สวน ${track.name} รอให้คุณมาบอกเล่าประสบการณ์การวิ่งคนแรก เพื่อเป็นแรงบันดาลใจให้กับนักวิ่งคนอื่นๆ ในคอมมูนิตี้` : `${track.name} is waiting for you to tell your first running experience, to inspire other runners in the community.`}
              </p>
              <button className="bg-primary text-white px-8 md:px-10 py-3 md:py-4 rounded-xl font-bold hover:bg-primary-container transition-all shadow-sm active:scale-95 text-sm md:text-base">
                {lang === 'th' ? 'เขียนรีวิวครั้งแรก' : 'Write the first review'}
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
