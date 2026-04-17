"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, MapPin, Star, Filter, Navigation, ArrowRight, X, Droplets, Car, Lock, User, Check } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
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
    const [searchRadius, setSearchRadius] = useState(5); // Default 5 km
    const [activeFilter, setActiveFilter] = useState("nearby");
    const [isBroadening, setIsBroadening] = useState(false);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [totalTracks, setTotalTracks] = useState(0);
    const ITEMS_PER_PAGE = 9;

    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filters, setFilters] = useState({
        minRating: 0,
        restrooms: false,
        water: false,
        parking: false,
        lockers: false
    });

    // Debounce search query
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Data fetching logic is handled in the effect below


    useEffect(() => {
        let isCancelled = false;

        const fetchData = async (currentRadius: number) => {
            if (currentRadius === 5) setIsLoadingTracks(true);
            else setIsBroadening(true);

            try {
                // Determine if we should use radius filter (Nearby uses it, All doesn't)
                const useRadius = activeFilter === "nearby" ? currentRadius : "null";

                // Build filter query string
                const filterParams = new URLSearchParams({
                    lat: location.lat.toString(),
                    lng: location.lng.toString(),
                    radius: useRadius.toString(),
                    limit: ITEMS_PER_PAGE.toString(),
                    offset: "0",
                    category: activeFilter,
                    q: debouncedQuery,
                    minRating: filters.minRating.toString(),
                    restrooms: filters.restrooms.toString(),
                    water: filters.water.toString(),
                    parking: filters.parking.toString(),
                    lockers: filters.lockers.toString()
                }).toString();

                const res = await fetch(`/api/tracks/nearby?${filterParams}`);
                if (res.ok && !isCancelled) {
                    const result = await res.json();
                    const { tracks, total } = result;

                    if (tracks.length === 0 && currentRadius < 50 && activeFilter === "nearby" && !debouncedQuery) {
                        // ไม่พบในระยะนี้ ให้ขยายรัศมีเพิ่มกอีก 5 km (เฉพาะกรณีไม่ได้ค้นหาคำค้น)
                        console.log(`No tracks found within ${currentRadius}km, broadening to ${currentRadius + 5}km...`);
                        setSearchRadius(currentRadius + 5);
                        fetchData(currentRadius + 5);
                    } else {
                        setNearbyTracks(tracks);
                        setTotalTracks(total);
                        setIsLoadingTracks(false);
                        setIsBroadening(false);
                    }
                }
            } catch (error) {
                if (!isCancelled) {
                    console.error('Error fetching tracks:', error);
                    setIsLoadingTracks(false);
                    setIsBroadening(false);
                }
            }
        };

        // Reset search to 5km when filters/location change
        setSearchRadius(5);
        fetchData(5);

        return () => {
            isCancelled = true;
        };
    }, [location.lat, location.lng, activeFilter, debouncedQuery, filters]);

    const handleLoadMore = async () => {
        if (isFetchingMore) return;
        setIsFetchingMore(true);

        try {
            const offset = nearbyTracks.length;
            const useRadius = activeFilter === "nearby" ? searchRadius : "null";

            const filterParams = new URLSearchParams({
                lat: location.lat.toString(),
                lng: location.lng.toString(),
                radius: useRadius.toString(),
                limit: ITEMS_PER_PAGE.toString(),
                offset: offset.toString(),
                category: activeFilter,
                q: debouncedQuery,
                minRating: filters.minRating.toString(),
                restrooms: filters.restrooms.toString(),
                water: filters.water.toString(),
                parking: filters.parking.toString(),
                lockers: filters.lockers.toString()
            }).toString();

            const res = await fetch(`/api/tracks/nearby?${filterParams}`);
            if (res.ok) {
                const result = await res.json();
                const { tracks } = result;
                setNearbyTracks(prev => [...prev, ...tracks]);
            }
        } catch (error) {
            console.error('Error fetching more tracks:', error);
        } finally {
            setIsFetchingMore(false);
        }
    };

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

    // We now use server-side filtering for groups, so filteredTracks is just nearbyTracks
    const filteredTracks = nearbyTracks;

    return (
        <main className="w-full pb-24">
            {/* Hero Section: Real Interactive Map */}
            <section className="relative w-full h-[60vh] bg-surface-container-high overflow-hidden">
                {!hasLocation && (
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-surface-container-high/80 backdrop-blur-sm animate-pulse">
                        <Navigation className="w-10 h-10 text-primary mb-4 animate-bounce" />
                        <p className="text-on-surface-variant font-medium">{t('explore', 'nearbyTitle')}</p>
                    </div>
                )}

                <div className="absolute inset-0 z-10">
                    <MapWrapper
                        key={hasLocation ? 'user-location' : 'default-location'}
                        tracks={filteredTracks}
                        userLocation={location}
                    />
                </div>

                {/* Map UI Overlay (HUD) */}
                <div className="absolute inset-0 pt-32 pb-8 px-8 flex flex-col justify-between pointer-events-none z-10">
                    <div className="flex justify-end max-w-7xl mx-auto w-full pointer-events-auto">
                        <button onClick={handleGetLocation} className="bg-surface-container-lowest p-3 rounded-full shadow-lg border border-outline-variant/10 hover:bg-surface-bright hover:shadow-xl transition-all mr-2 mt-4 tooltip relative group inline-block focus:outline-none">
                            <Navigation className={`w-6 h-6 ${hasLocation ? 'text-primary' : 'text-outline'}`} fill={hasLocation ? "currentColor" : "none"} />
                            <div className="absolute hidden group-hover:block -bottom-10 right-0 bg-surface-container-lowest text-sm px-3 py-1 rounded shadow text-on-surface whitespace-nowrap">{t('explore', 'nearbyTitle')}</div>
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
                            {isLoadingTracks && debouncedQuery !== searchQuery ? (
                                <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                            ) : (
                                <Search className="w-6 h-6 text-outline" strokeWidth={1.5} />
                            )}
                        </div>
                        <input
                            className="w-full h-[68px] pl-16 pr-16 bg-surface-container-lowest border border-outline-variant/10 rounded-[2rem] text-lg focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-outline-variant outline-none font-sans shadow-inside"
                            placeholder={t('explore', 'searchPlaceholder')}
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute inset-y-0 right-6 flex items-center text-outline hover:text-primary transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        )}
                    </div>
                    <button
                        onClick={() => setIsFilterOpen(true)}
                        className={cn(
                            "bg-surface-container-lowest border border-outline-variant/10 px-8 py-4 rounded-[2rem] font-bold flex items-center justify-center gap-3 hover:bg-surface-variant transition-colors whitespace-nowrap shadow-sm text-on-surface",
                            (filters.minRating > 0 || filters.restrooms || filters.water || filters.parking || filters.lockers) && "border-primary/50 bg-primary/5 text-primary"
                        )}
                    >
                        <Filter className="w-5 h-5" />
                        <span className="font-display">{t('explore', 'filters')}</span>
                        {(filters.minRating > 0 || filters.restrooms || filters.water || filters.parking || filters.lockers) && (
                            <span className="w-2 h-2 bg-primary rounded-full" />
                        )}
                    </button>
                </div>

                {/* Filter Chips */}
                <div className="flex overflow-x-auto gap-4 py-2 scrollbar-none font-medium text-sm md:text-base px-2">
                    <button
                        onClick={() => setActiveFilter("all")}
                        className={cn(
                            "px-8 py-2.5 rounded-full whitespace-nowrap shadow-sm transition-all",
                            activeFilter === "all" ? "bg-primary text-white border border-primary" : "bg-surface-container-lowest hover:bg-surface-container-high border border-outline-variant/30 text-on-surface-variant hover:text-on-surface"
                        )}
                    >
                        {t('explore', 'filterAll')}
                    </button>
                    <button
                        onClick={() => setActiveFilter("nearby")}
                        className={cn(
                            "px-8 py-2.5 rounded-full whitespace-nowrap shadow-sm transition-all",
                            activeFilter === "nearby" ? "bg-primary text-white border border-primary" : "bg-surface-container-lowest hover:bg-surface-container-high border border-outline-variant/30 text-on-surface-variant hover:text-on-surface"
                        )}
                    >
                        {t('explore', 'filterNearby')}
                    </button>
                    <button
                        onClick={() => setActiveFilter("parks")}
                        className={cn(
                            "px-8 py-2.5 rounded-full whitespace-nowrap shadow-sm transition-all",
                            activeFilter === "parks" ? "bg-primary text-white border border-primary" : "bg-surface-container-lowest hover:bg-surface-container-high border border-outline-variant/30 text-on-surface-variant hover:text-on-surface"
                        )}
                    >
                        {t('explore', 'filterParks')}
                    </button>
                    <button
                        onClick={() => setActiveFilter("nature")}
                        className={cn(
                            "px-8 py-2.5 rounded-full whitespace-nowrap shadow-sm transition-all",
                            activeFilter === "nature" ? "bg-primary text-white border border-primary" : "bg-surface-container-lowest hover:bg-surface-container-high border border-outline-variant/30 text-on-surface-variant hover:text-on-surface"
                        )}
                    >
                        {t('explore', 'filterNature')}
                    </button>
                    <button
                        onClick={() => setActiveFilter("stadium")}
                        className={cn(
                            "px-8 py-2.5 rounded-full whitespace-nowrap shadow-sm transition-all",
                            activeFilter === "stadium" ? "bg-primary text-white border border-primary" : "bg-surface-container-lowest hover:bg-surface-container-high border border-outline-variant/30 text-on-surface-variant hover:text-on-surface"
                        )}
                    >
                        {t('explore', 'filterStadium')}
                    </button>
                </div>
            </section>

            {/* Content Section: Track List */}
            <section className="py-16 px-8 max-w-6xl mx-auto">
                <div className="mb-12">
                    <h2 className="text-4xl font-bold font-display mb-3 text-on-surface flex items-center gap-3">
                        {t('explore', 'nearbyTitle')}
                    </h2>
                    <p className="text-on-surface-variant text-lg">
                        {activeFilter === "nearby" ? (
                            isBroadening ? (
                                <span className="flex items-center gap-2 animate-pulse text-primary font-medium">
                                    <Navigation className="w-4 h-4 animate-spin" /> {t('explore', 'btnLoading')} ({searchRadius} {t('common', 'km')})
                                </span>
                            ) : (
                                <>{t('explore', 'radiusInfo').replace('{radius}', searchRadius.toString())}</>
                            )
                        ) : activeFilter === "all" ? (
                            t('explore', 'allTracksInfo')
                        ) : activeFilter === "parks" ? (
                            lang === 'th' ? "สำรวจสวนสาธารณะและพื้นที่สีเขียวยอดนิยม" : "Explore popular parks and green spaces"
                        ) : activeFilter === "nature" ? (
                            lang === 'th' ? "สำรวจเส้นทางวิ่งธรรมชาติและเทรล" : "Explore nature trails and forest paths"
                        ) : activeFilter === "stadium" ? (
                            lang === 'th' ? "สำรวจสนามกีฬามาร์ตและศูนย์กีฬามาตรฐาน" : "Explore stadiums and standard sports centers"
                        ) : (
                            t('explore', 'nearbyTitle')
                        )}
                    </p>
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
                        filteredTracks.map((track) => (
                            <Link key={track.id} href={`/track/${track.id}`} className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl">
                                <div className="relative rounded-xl overflow-hidden aspect-[4/3] mb-6 bg-surface-container-high translate-y-0 group-hover:-translate-y-1 transition-transform duration-300">
                                    <img
                                        alt={track.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        src={track.imageUrl}
                                    />
                                    <div className="absolute top-4 left-4">
                                        <div className="bg-surface-container-lowest/90 backdrop-blur text-primary text-xs font-bold px-4 py-2 rounded-full tracking-wide font-mono flex items-center gap-1.5 shadow-sm">
                                            <Navigation className="w-3 h-3" /> {track.distance < 1 ? '< 1' : track.distance.toFixed(1)} {t('common', 'km')}
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-2xl font-bold font-display group-hover:text-primary transition-colors">{track.name}</h3>
                                    </div>
                                    <div className="flex items-center text-on-surface-variant gap-2 font-medium">
                                        <MapPin className="w-5 h-5 text-outline" strokeWidth={1} /> {lang === 'th' ? 'กรุงเทพฯ' : 'Bangkok'}
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

                {nearbyTracks.length === 0 && !isLoadingTracks && (
                    <div className="bg-surface-container-lowest p-20 rounded-[3rem] text-center max-w-2xl mx-auto border border-outline-variant/10 shadow-ambient">
                        <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-8">
                            <Search className="w-12 h-12 text-primary opacity-20" />
                        </div>
                        <h3 className="text-3xl font-bold font-display text-primary mb-4">{t('explore', 'noTracksTitle')}</h3>
                        <p className="text-on-surface-variant text-lg mb-10">{t('explore', 'noTracksDesc')}</p>
                        <button
                            onClick={() => {
                                setSearchQuery("");
                                setFilters({ minRating: 0, restrooms: false, water: false, parking: false, lockers: false });
                                setActiveFilter("all");
                            }}
                            className="bg-primary text-white px-10 py-4 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg active:scale-95"
                        >
                            {t('explore', 'btnReset')}
                        </button>
                    </div>
                )}

                {/* Load More Button */}
                {!isLoadingTracks && nearbyTracks.length < totalTracks && (
                    <div className="mt-20 flex justify-center">
                        <button
                            onClick={handleLoadMore}
                            disabled={isFetchingMore}
                            className={cn(
                                "group relative px-12 py-5 rounded-[2rem] font-bold text-lg transition-all duration-300 shadow-ambient hover:shadow-xl active:scale-95 flex items-center gap-3 overflow-hidden",
                                isFetchingMore ? "bg-surface-container text-outline cursor-not-allowed" : "bg-primary text-white hover:bg-primary-container"
                            )}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:animate-shimmer" />
                            {isFetchingMore ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    {t('explore', 'btnLoading')}
                                </>
                            ) : (
                                <>
                                    {t('explore', 'btnLoadMore')}
                                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                </>
                            )}
                        </button>
                    </div>
                )}

                {/* End of Results Message */}
                {!isLoadingTracks && nearbyTracks.length > 0 && nearbyTracks.length >= totalTracks && (
                    <div className="mt-20 text-center">
                        <p className="text-on-surface-variant font-medium opacity-60">
                            {t('explore', 'endOfResults')}
                        </p>
                    </div>
                )}
            </section>

            {/* Filter Overlay (Glassmorphism Drawer) */}
            <div className={cn(
                "fixed inset-0 z-[100] transition-all duration-500 flex justify-end",
                isFilterOpen ? "visible" : "invisible"
            )}>
                {/* Backdrop */}
                <div
                    className={cn(
                        "absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500",
                        isFilterOpen ? "opacity-100" : "opacity-0"
                    )}
                    onClick={() => setIsFilterOpen(false)}
                />

                {/* Drawer Body */}
                <div className={cn(
                    "relative w-full max-w-md h-full bg-white/90 backdrop-blur-2xl shadow-2xl transition-transform duration-500 p-10 flex flex-col",
                    isFilterOpen ? "translate-x-0" : "translate-x-full"
                )}>
                    <div className="flex justify-between items-center mb-12">
                        <h2 className="text-4xl font-bold font-display text-primary">{t('explore', 'drawerTitle')}</h2>
                        <button
                            onClick={() => setIsFilterOpen(false)}
                            className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center hover:bg-surface-variant transition-colors"
                        >
                            <X className="w-6 h-6 text-on-surface" />
                        </button>
                    </div>

                    <div className="flex-1 space-y-12 overflow-y-auto pr-2 scrollbar-none">
                        {/* Rating Filter */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold font-display text-on-surface">{t('explore', 'ratingLabel')}</h3>
                            <div className="flex flex-wrap gap-3">
                                {[4, 3, 2, 1].map((rating) => (
                                    <button
                                        key={rating}
                                        onClick={() => setFilters(prev => ({ ...prev, minRating: prev.minRating === rating ? 0 : rating }))}
                                        className={cn(
                                            "flex items-center gap-2 px-6 py-3 rounded-2xl border transition-all font-medium",
                                            filters.minRating === rating
                                                ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                                                : "bg-surface-container-lowest border-outline-variant/30 text-on-surface-variant hover:border-primary/50"
                                        )}
                                    >
                                        <Star className={cn("w-4 h-4", filters.minRating === rating ? "fill-current" : "")} />
                                        <span>{rating}+ {t('explore', 'ratingUp')}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Facilities Filter */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold font-display text-on-surface">{t('explore', 'facilitiesLabel')}</h3>
                            <div className="grid grid-cols-1 gap-4">
                                {[
                                    { key: "restrooms", label: t('explore', 'facilityRestrooms'), icon: User },
                                    { key: "water", label: t('explore', 'facilityWater'), icon: Droplets },
                                    { key: "parking", label: t('explore', 'facilityParking'), icon: Car },
                                    { key: "lockers", label: t('explore', 'facilityLockers'), icon: Lock }
                                ].map((item) => (
                                    <button
                                        key={item.key}
                                        onClick={() => setFilters(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof prev] }))}
                                        className={cn(
                                            "flex items-center justify-between p-5 rounded-2xl border transition-all duration-300",
                                            filters[item.key as keyof typeof filters]
                                                ? "bg-primary/5 border-primary text-primary"
                                                : "bg-surface-container-lowest border-outline-variant/30 text-on-surface-variant hover:border-primary/30"
                                        )}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={cn(
                                                "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                                                filters[item.key as keyof typeof filters] ? "bg-primary text-white" : "bg-surface-container-high"
                                            )}>
                                                <item.icon className="w-5 h-5" />
                                            </div>
                                            <span className="font-bold text-lg">{item.label}</span>
                                        </div>
                                        {filters[item.key as keyof typeof filters] && (
                                            <Check className="w-6 h-6" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-10 mt-auto border-t border-outline-variant/20 grid grid-cols-2 gap-4">
                        <button
                            onClick={() => {
                                setFilters({ minRating: 0, restrooms: false, water: false, parking: false, lockers: false });
                                setIsFilterOpen(false);
                            }}
                            className="py-5 rounded-2xl font-bold text-on-surface-variant hover:bg-surface-container-high transition-colors"
                        >
                            {t('explore', 'btnClearAll')}
                        </button>
                        <button
                            onClick={() => setIsFilterOpen(false)}
                            className="py-5 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-container transition-all active:scale-95"
                        >
                            แสดงผลได้เลย
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
