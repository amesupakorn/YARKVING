"use client";

import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeft, MapPin, Map, Star, Clock, User, Droplets, Car, Lock, Navigation } from "lucide-react";
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
      {/* Hero Section */}
      <section className="relative h-[614px] min-h-[400px] w-full overflow-hidden">
        <img
          className="w-full h-full object-cover"
          alt={track.name}
          src={track.imageUrl.startsWith('http') || track.imageUrl.startsWith('/') ? track.imageUrl : `/${track.imageUrl}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1d1c11]/60 to-transparent"></div>
        <div className="absolute top-32 left-8 z-10">
          <Link href="/explore" className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-full hover:bg-white/30 transition-all active:scale-95 border border-white/20 shadow-sm">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium text-sm">{t('trackDetails', 'backToTracks')}</span>
          </Link>
        </div>
        <div className="absolute bottom-12 left-8 md:left-16 z-10 w-full pr-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center text-white gap-1 bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
              <Star className="w-4 h-4 fill-current text-white" />
              <span className="text-sm font-medium">
                {track.rating.toFixed(1)} ({track.reviews.length} {t('trackDetails', 'reviews')})
              </span>
            </div>
            {track.district && (
              <div className="flex items-center text-white gap-2 bg-primary/30 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                <MapPin className="w-3.5 h-3.5" />
                <span className="text-sm font-bold uppercase tracking-wider">{track.district}</span>
              </div>
            )}
          </div>
          <h1 className="text-white text-5xl md:text-7xl font-bold font-display mb-2 tracking-tight drop-shadow-md">{track.name}</h1>
        </div>

        {track.imageCredit && (
          <div className="absolute bottom-4 right-6 z-10">
            <span className="text-white/50 text-xs font-mono drop-shadow-md bg-black/20 px-2 py-1 rounded-md backdrop-blur-sm border border-white/5">
              {t('trackDetails', 'photoCredit')}: {track.imageCredit}
            </span>
          </div>
        )}
      </section>

      {/* Bento Grid Info Section */}
      <section className="max-w-7xl mx-auto px-8 -mt-8 relative z-20 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Track Info */}
        <div className="md:col-span-2 bg-surface-container-lowest rounded-xl p-8 shadow-ambient border border-outline-variant/10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            <div className="flex flex-col gap-1">
              <span className="text-secondary font-semibold text-[13px] uppercase tracking-widest">{t('trackDetails', 'distance')}</span>
              <span className="text-3xl font-bold text-primary">{track.distance ? `${track.distance} ${t('common', 'km')}` : `2.5 ${t('common', 'km')}`}</span>
              <span className="text-on-surface-variant text-sm">Full Loop</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-secondary font-semibold text-[13px] uppercase tracking-widest">{t('trackDetails', 'surface')}</span>
              <span className="text-3xl font-bold text-primary">{track.surface || (lang === 'th' ? "ยาง/คอนกรีต" : "Asphalt")}</span>
              <span className="text-on-surface-variant text-sm">Smooth Path</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-secondary font-semibold text-[13px] uppercase tracking-widest">{t('trackDetails', 'elevation')}</span>
              <span className="text-3xl font-bold text-primary">{track.elevation || (lang === 'th' ? "ทางราบ" : "Flat")}</span>
              <span className="text-on-surface-variant text-sm">0m Gain</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-secondary font-semibold text-[13px] uppercase tracking-widest">{t('trackDetails', 'difficulty')}</span>
              <span className="text-3xl font-bold text-primary">{track.difficulty || (lang === 'th' ? "ง่าย" : "Easy")}</span>
              <span className="text-on-surface-variant text-sm">Beginner</span>
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-bold font-display text-primary">{t('trackDetails', 'description')}</h3>
            <p className="text-lg text-on-surface-variant leading-relaxed font-light">
              {track.description || (lang === 'th' ? `${track.name} เป็นสถานที่ยอดนิยมสำหรับนักวิ่งทุกระดับ ด้วยเส้นทางวิ่งที่ร่มรื่นและบรรยากาศที่สวยงาม` : `${track.name} is a popular spot for runners of all levels, featuring shaded paths and beautiful surroundings.`)}
            </p>
            <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/5">
              <p className="font-semibold text-primary mb-2 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" strokeWidth={1.5} />
                {t('trackDetails', 'bestTimes')}
              </p>
              <p className="text-on-surface-variant">
                {track.bestTime || (lang === 'th' ? "05:00 - 08:00 (เช้าตรู่) หรือ 17:00 - 20:00 (ตอนเย็น)." : "05:00 - 08:00 (Morning vitality) or 17:00 - 20:00 (Sunset breeze).")}
              </p>
            </div>
          </div>
        </div>

        {/* Facilities Sidebar */}
        <div className="bg-surface-container-low rounded-xl p-8 flex flex-col gap-8 border border-outline-variant/10">
          <h3 className="text-2xl font-bold font-display text-primary">{t('trackDetails', 'facilities')}</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className={`flex items-center gap-3 p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/5 transition-opacity ${track.hasRestrooms ? "opacity-100" : "opacity-40"}`}>
              <User className="w-5 h-5 text-primary" strokeWidth={1.5} />
              <span className="font-medium text-sm">{t('explore', 'facilityRestrooms')}</span>
            </div>
            <div className={`flex items-center gap-3 p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/5 transition-opacity ${track.hasWater ? "opacity-100" : "opacity-40"}`}>
              <Droplets className="w-5 h-5 text-primary" strokeWidth={1.5} />
              <span className="font-medium text-sm">{t('explore', 'facilityWater')}</span>
            </div>
            <div className={`flex items-center gap-3 p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/5 transition-opacity ${track.hasParking ? "opacity-100" : "opacity-40"}`}>
              <Car className="w-5 h-5 text-primary" strokeWidth={1.5} />
              <span className="font-medium text-sm">{t('explore', 'facilityParking')}</span>
            </div>
            <div className={`flex items-center gap-3 p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/5 transition-opacity ${track.hasLockers ? "opacity-100" : "opacity-40"}`}>
              <Lock className="w-5 h-5 text-primary" strokeWidth={1.5} />
              <span className="font-medium text-sm">{t('explore', 'facilityLockers')}</span>
            </div>
          </div>
          <div className="mt-auto space-y-4 pt-4">
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
      <section className="max-w-7xl mx-auto px-8 py-16">
        <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[16/7] md:aspect-[21/9]">
          <iframe
            className="w-full h-full border-0 absolute inset-0 z-0"
            loading="lazy"
            allowFullScreen
            src={`https://maps.google.com/maps?q=${track.latitude},${track.longitude}&z=15&output=embed`}
            title={`Map location of ${track.name}`}
          ></iframe>
          <div className="absolute inset-0 bg-primary/10 pointer-events-none z-10"></div>
          <div className="absolute top-6 left-6 bg-white/60 backdrop-blur-3xl px-6 py-4 rounded-2xl border border-white/50 shadow-ambient z-20">
            <h4 className="font-bold font-display text-primary mb-1">{t('trackDetails', 'trackTopology')}</h4>
            <p className="text-sm text-on-surface-variant">{t('trackDetails', 'locationMap')}</p>
          </div>
        </div>
      </section>

      {/* Reviews Section from Google Maps */}
      <section className="bg-surface-container-low py-20 px-8 border-t border-outline-variant/10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <h2 className="text-4xl font-bold font-display text-primary mb-2">{t('trackDetails', 'userReviews')}</h2>
              <div className="flex items-center gap-4">
                <div className="flex text-tertiary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-6 h-6 ${i < Math.floor(track.rating) ? "fill-current" : "text-tertiary/20 fill-current"}`} 
                    />
                  ))}
                </div>
                <span className="text-2xl font-bold text-on-surface">
                  {track.rating.toFixed(1)} <span className="text-base font-medium text-on-surface-variant">{t('trackDetails', 'outOfFive')}</span>
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full border border-outline-variant/20 shadow-sm">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold text-primary">{t('trackDetails', 'reviewsPoweredBy')}</span>
            </div>
          </div>

          {track.reviews && track.reviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {track.reviews.map((review) => (
                <div key={review.id} className="bg-surface-container-lowest p-8 rounded-2xl shadow-ambient border border-outline-variant/10 transition-colors hover:bg-surface-bright flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      {review.authorPhotoUrl ? (
                        <img src={review.authorPhotoUrl} alt={review.authorName} className="w-12 h-12 rounded-full object-cover" />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-primary font-bold text-lg">
                          {review.authorName.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h4 className="font-bold text-on-surface line-clamp-1">{review.authorName}</h4>
                        <p className="text-sm text-on-surface-variant line-clamp-1">{review.timeDescription}</p>
                      </div>
                    </div>
                    <div className="flex text-tertiary-container shrink-0">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? "fill-current" : "text-tertiary-container/30 fill-current"}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-on-surface-variant leading-relaxed font-body flex-grow">
                    {review.text}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-surface-container-lowest p-16 rounded-[2.5rem] shadow-ambient border border-outline-variant/10 text-center flex flex-col items-center justify-center max-w-2xl mx-auto">
              <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mb-8">
                <Star className="w-10 h-10 text-primary opacity-20" />
              </div>
              <h3 className="text-2xl font-bold font-display text-primary mb-4">{lang === 'th' ? 'ยังไม่มีความประทับใจแชร์ที่นี่' : 'No reviews shared here yet'}</h3>
              <p className="text-on-surface-variant text-lg leading-relaxed mb-10">
                {lang === 'th' ? `สวน ${track.name} รอให้คุณมาบอกเล่าประสบการณ์การวิ่งคนแรก เพื่อเป็นแรงบันดาลใจให้กับนักวิ่งคนอื่นๆ ในคอมมูนิตี้` : `${track.name} is waiting for you to tell your first running experience, to inspire other runners in the community.`}
              </p>
              <button className="bg-primary text-white px-10 py-4 rounded-xl font-bold hover:bg-primary-container transition-all shadow-sm active:scale-95">
                {lang === 'th' ? 'เขียนรีวิวครั้งแรก' : 'Write the first review'}
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
