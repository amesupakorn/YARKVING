import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeft, MapPin, Map, Star, Clock, User, Droplets, Car, Lock } from "lucide-react";

export default function TrackDetailsPage() {
  return (
    <main className="w-full pb-24 md:pb-0">
      {/* Hero Section */}
      <section className="relative h-[614px] min-h-[400px] w-full overflow-hidden">
        <img
          className="w-full h-full object-cover"
          alt="Lumpini Park"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUJyIuz1iXVMFVlMI8aDT3rBv17Gpmf5Av97nFxYru_jbz13v03N15yaIV851WE-yZgKCjd-Stn--yWwKtXhdsCRgai-4u9mFxGDzcHG_f6HPu_7hSdcspjAqJm_cqAwYrYvqGHdh804h35pObUtzq8n3ARCtd7MjBMVTO-bFgutKDVobVW_WrjqTzthfAPUfFIACf0b-Or70Y96KmMW7nBwIDdvukDfnRuUT7ERqUZsWvi62jXq8g4JvRcM4aeh_WohjeKCmzXo0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1d1c11]/60 to-transparent"></div>
        <div className="absolute top-32 left-8 z-10">
          <Link href="/" className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-full hover:bg-white/30 transition-all active:scale-95 border border-white/20 shadow-sm">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium text-sm">Back to Tracks</span>
          </Link>
        </div>
        <div className="absolute bottom-12 left-8 md:left-16 z-10 w-full pr-8">
          <div className="flex items-center gap-3 mb-4">
            <Badge pulsing>Popular Now</Badge>
            <div className="flex items-center text-white gap-1 bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
              <Star className="w-4 h-4 fill-current text-white" />
              <span className="text-sm font-medium">4.8 (1.2k reviews)</span>
            </div>
          </div>
          <h1 className="text-white text-5xl md:text-7xl font-bold font-display mb-2 tracking-tight drop-shadow-md">สวนลุมพินี</h1>
          <p className="text-white/90 text-2xl font-medium drop-shadow-sm">Lumpini Park</p>
        </div>
      </section>

      {/* Bento Grid Info Section */}
      <section className="max-w-7xl mx-auto px-8 -mt-16 relative z-20 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Track Info */}
        <div className="md:col-span-2 bg-surface-container-lowest rounded-xl p-8 shadow-ambient border border-outline-variant/10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            <div className="flex flex-col gap-1">
              <span className="text-secondary font-semibold text-[13px] uppercase tracking-widest">Distance</span>
              <span className="text-3xl font-bold text-primary">2.5 km</span>
              <span className="text-on-surface-variant text-sm">Full Loop</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-secondary font-semibold text-[13px] uppercase tracking-widest">Surface</span>
              <span className="text-3xl font-bold text-primary">Asphalt</span>
              <span className="text-on-surface-variant text-sm">Smooth Path</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-secondary font-semibold text-[13px] uppercase tracking-widest">Elevation</span>
              <span className="text-3xl font-bold text-primary">Flat</span>
              <span className="text-on-surface-variant text-sm">0m Gain</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-secondary font-semibold text-[13px] uppercase tracking-widest">Difficulty</span>
              <span className="text-3xl font-bold text-primary">Easy</span>
              <span className="text-on-surface-variant text-sm">Beginner</span>
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-bold font-display text-primary">Description</h3>
            <p className="text-lg text-on-surface-variant leading-relaxed font-light">
              สวนลุมพินีเป็นสวนสาธารณะแห่งแรกของประเทศไทย ก่อตั้งขึ้นในสมัยรัชกาลที่ 6 ตั้งอยู่ใจกลางกรุงเทพมหานคร เป็นสถานที่ยอดนิยมสำหรับนักวิ่งทุกระดับ ด้วยเส้นทางวิ่งที่ร่มรื่นและวิวทะเลสาบที่สวยงาม
            </p>
            <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/5">
              <p className="font-semibold text-primary mb-2 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" strokeWidth={1.5} />
                Best Times to Run
              </p>
              <p className="text-on-surface-variant">05:00 - 08:00 (Morning vitality) or 17:00 - 20:00 (Sunset breeze). The park is well-lit and safe during these hours.</p>
            </div>
          </div>
        </div>

        {/* Facilities Sidebar */}
        <div className="bg-surface-container-low rounded-xl p-8 flex flex-col gap-8 border border-outline-variant/10">
          <h3 className="text-2xl font-bold font-display text-primary">Facilities</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/5">
              <User className="w-5 h-5 text-primary" strokeWidth={1.5} />
              <span className="font-medium text-sm">Restrooms</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/5">
              <Droplets className="w-5 h-5 text-primary" strokeWidth={1.5} />
              <span className="font-medium text-sm">Water</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/5">
              <Car className="w-5 h-5 text-primary" strokeWidth={1.5} />
              <span className="font-medium text-sm">Parking</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/5">
              <Lock className="w-5 h-5 text-primary" strokeWidth={1.5} />
              <span className="font-medium text-sm">Lockers</span>
            </div>
          </div>
          <div className="mt-auto space-y-4 pt-4">
            <button className="w-full bg-gradient-to-br from-primary to-primary-container text-on-primary py-4 rounded-xl font-bold text-base hover:opacity-90 active:scale-95 transition-all shadow-sm">
              Join a Run
            </button>
            <button className="w-full bg-secondary-container text-on-secondary-container py-4 rounded-xl font-bold text-base hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2">
              Mark as Favorite
            </button>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="max-w-7xl mx-auto px-8 py-16">
        <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[16/7] md:aspect-[21/9]">
          <img
            className="w-full h-full object-cover"
            alt="Map Render"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6tcNcspwPw1fIJvULxFhZR_MhLOlUX9OezJa5_Dv5t9YGG14sEtdhsVT9dtIDP3H9xbU6LoEfKEtmbrcBcIWCtNC7wM3j6y2wjIM-h4KAVYndA_0Omk00F66Z8TI_vUdStKGIvtkKJreJkWLkXEHTFehT8mv6ZtTiHaypWQeF-Ju_X14QSjtFHGXrohgie4Oxcl-EG-z38-uFqrnNN7sL4Basi2Ghd7lI6Sl8JBX-Oae4A5db6LhHcVOOqZ7CHhr0cGK-TSyPSns"
          />
          <div className="absolute inset-0 bg-primary/10 pointer-events-none"></div>
          <div className="absolute top-6 left-6 bg-white/60 backdrop-blur-3xl px-6 py-4 rounded-2xl border border-white/50 shadow-ambient">
            <h4 className="font-bold font-display text-primary mb-1">Track Topology</h4>
            <p className="text-sm text-on-surface-variant">3D Path Visualization • 2.5 km Loop</p>
          </div>
        </div>
      </section>
    </main>
  );
}
