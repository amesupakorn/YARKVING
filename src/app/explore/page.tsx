"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, MapPin, Star, Filter, Navigation } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import MapWrapper from "@/components/ui/MapWrapper";

interface Track {
    id: string;
    name: string;
    imageUrl: string;
    rating: number;
    latitude: number;
    longitude: number;
    distance: number;
}

export default function ExplorePage() {
    const [location, setLocation] = useState({ lat: 13.736717, lng: 100.523186 }); // Default: Lumpini Park
    const [hasLocation, setHasLocation] = useState(false);
    const [nearbyTracks, setNearbyTracks] = useState<Track[]>([]);
    const [isLoadingTracks, setIsLoadingTracks] = useState(true);

    const fetchNearbyTracks = async (lat: number, lng: number) => {
        setIsLoadingTracks(true);
        try {
            const res = await fetch(`/api/tracks/nearby?lat=${lat}&lng=${lng}&limit=30`);
            if (res.ok) {
                const data = await res.json();
                setNearbyTracks(data);
            }
        } catch (error) {
            console.error('Error fetching tracks:', error);
        } finally {
            setIsLoadingTracks(false);
        }
    };

    useEffect(() => {
        // Fetch tracks once location is obtained (or on initial default location)
        fetchNearbyTracks(location.lat, location.lng);
    }, [location.lat, location.lng]);

    useEffect(() => {
        // ขอตำแหน่ง GPS เมื่อโหลดหน้าเว็บเสร็จ
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                    setHasLocation(true);
                },
                (error) => {
                    console.error("Error getting location:", error);
                }
            );
        }
    }, []);

    const handleGetLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                setLocation({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                });
                setHasLocation(true);
            });
        }
    };

    return (
        <main className="w-full pb-24">
            {/* Hero Section: Real Interactive Map */}
            <section className="relative w-full h-[60vh] bg-surface-container-high overflow-hidden">
                {!hasLocation && (
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-surface-container-high/80 backdrop-blur-sm animate-pulse">
                        <Navigation className="w-10 h-10 text-primary mb-4 animate-bounce" />
                        <p className="text-on-surface-variant font-medium">กำลังค้นหาตำแหน่งของคุณ...</p>
                    </div>
                )}
                
                <div className="absolute inset-0 z-10">
                    <MapWrapper tracks={nearbyTracks} userLocation={location} />
                </div>

                {/* Map UI Overlay (HUD) */}
                <div className="absolute inset-0 pt-32 pb-8 px-8 flex flex-col justify-between pointer-events-none z-10">
                    <div className="flex justify-end max-w-7xl mx-auto w-full pointer-events-auto">
                        <button onClick={handleGetLocation} className="bg-surface-container-lowest p-3 rounded-full shadow-lg border border-outline-variant/10 hover:bg-surface-bright hover:shadow-xl transition-all mr-2 mt-4 tooltip relative group inline-block focus:outline-none">
                            <Navigation className={`w-6 h-6 ${hasLocation ? 'text-primary' : 'text-outline'}`} fill={hasLocation ? "currentColor" : "none"} />
                            <div className="absolute hidden group-hover:block -bottom-10 right-0 bg-surface-container-lowest text-sm px-3 py-1 rounded shadow text-on-surface whitespace-nowrap">รีเซ็ตตำแหน่งของคุณ</div>
                        </button>
                    </div>
                </div>
                
                {/* Gradient Fade to Bottom to transition perfectly into content */}
                <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-background to-transparent pointer-events-none z-20"></div>
            </section>

            {/* Search & Filter Section */}
            <section className="px-8 max-w-6xl mx-auto -mt-10 relative z-30 space-y-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1 group shadow-ambient rounded-[2rem]">
                        <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                            <Search className="w-6 h-6 text-outline" strokeWidth={1.5} />
                        </div>
                        <input
                            className="w-full h-[68px] pl-16 pr-8 bg-surface-container-lowest border border-outline-variant/10 rounded-[2rem] text-lg focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-outline-variant outline-none font-sans shadow-inside"
                            placeholder="ค้นหาสวนสาธารณะ, เส้นทางวิ่ง หรือสนามกีฬา..."
                            type="text"
                        />
                    </div>
                    <button className="bg-surface-container-lowest border border-outline-variant/10 px-8 py-4 rounded-[2rem] font-bold flex items-center justify-center gap-3 hover:bg-surface-variant transition-colors whitespace-nowrap shadow-sm text-on-surface">
                        <Filter className="w-5 h-5 text-primary" /> <span className="font-display">ตัวกรอง</span>
                    </button>
                </div>

                {/* Filter Chips */}
                <div className="flex overflow-x-auto gap-4 py-2 scrollbar-none font-medium text-sm md:text-base px-2">
                    <button className="bg-primary text-white border border-primary px-8 py-2.5 rounded-full whitespace-nowrap shadow-sm transition-all hover:bg-opacity-90">ทั้งหมด (All)</button>
                    <button className="bg-surface-container-lowest hover:bg-surface-container-high border border-outline-variant/30 px-8 py-2.5 rounded-full whitespace-nowrap transition-all shadow-sm text-on-surface-variant hover:text-on-surface">ใกล้ตัว (Nearby)</button>
                    <button className="bg-surface-container-lowest hover:bg-surface-container-high border border-outline-variant/30 px-8 py-2.5 rounded-full whitespace-nowrap transition-all shadow-sm text-on-surface-variant hover:text-on-surface">สวนสาธารณะ (Parks)</button>
                    <button className="bg-surface-container-lowest hover:bg-surface-container-high border border-outline-variant/30 px-8 py-2.5 rounded-full whitespace-nowrap transition-all shadow-sm text-on-surface-variant hover:text-on-surface">เส้นทางธรรมชาติ (Nature)</button>
                    <button className="bg-surface-container-lowest hover:bg-surface-container-high border border-outline-variant/30 px-8 py-2.5 rounded-full whitespace-nowrap transition-all shadow-sm text-on-surface-variant hover:text-on-surface">สเตเดียม (Stadium)</button>
                </div>
            </section>

            {/* Content Section: Track List */}
            <section className="py-16 px-8 max-w-6xl mx-auto">
                <div className="mb-12">
                    <h2 className="text-4xl font-bold font-display mb-3 text-on-surface flex items-center gap-3">
                        สถานที่วิ่งใกล้เรา
                        <span className="flex h-3 w-3 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                        </span>
                    </h2>
                    <p className="text-on-surface-variant text-lg">สำรวจเส้นทางยอดนิยมในระยะ <span className="font-mono text-on-surface font-semibold">10</span> กิโลเมตร</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {isLoadingTracks ? (
                        /* Skeleton Loading Cards */
                        Array.from({ length: 3 }).map((_, idx) => (
                            <div key={idx} className="animate-pulse">
                                <div className="relative rounded-xl overflow-hidden aspect-[4/3] mb-6 bg-surface-container"></div>
                                <div className="space-y-3">
                                    <div className="h-6 bg-surface-container rounded w-3/4"></div>
                                    <div className="h-4 bg-surface-container rounded w-1/2"></div>
                                    <div className="pt-4 border-t border-outline-variant/20 mt-4 flex justify-between">
                                        <div className="h-4 bg-surface-container rounded w-1/4"></div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        nearbyTracks.map((track) => (
                            <Link key={track.id} href={`/track/${track.id}`} className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl">
                                <div className="relative rounded-xl overflow-hidden aspect-[4/3] mb-6 bg-surface-container-high translate-y-0 group-hover:-translate-y-1 transition-transform duration-300">
                                    <img
                                        alt={track.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        src={track.imageUrl}
                                    />
                                    <div className="absolute top-4 left-4">
                                        <div className="bg-surface-container-lowest/90 backdrop-blur text-primary text-xs font-bold px-4 py-2 rounded-full tracking-wide font-mono flex items-center gap-1.5 shadow-sm">
                                            <Navigation className="w-3 h-3" /> {track.distance < 1 ? '< 1' : track.distance.toFixed(1)} km
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-2xl font-bold font-display group-hover:text-primary transition-colors">{track.name}</h3>
                                    </div>
                                    <div className="flex items-center text-on-surface-variant gap-2 font-medium">
                                        <MapPin className="w-5 h-5 text-outline" strokeWidth={1} /> กรุงเทพฯ
                                    </div>
                                    <div className="pt-4 flex items-center justify-between border-t border-outline-variant/20">
                                        <div className="flex items-center gap-1 text-tertiary">
                                            <Star className="w-4 h-4 fill-current" />
                                            <span className="ml-2 text-on-surface font-mono font-semibold text-sm">{track.rating.toFixed(1)}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </section>
        </main>
    );
}
