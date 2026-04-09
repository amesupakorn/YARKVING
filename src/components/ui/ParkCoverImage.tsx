"use client";
import React from 'react';
import { cn } from '@/lib/utils';

interface ParkCoverImageProps {
    name: string;
    latitude: number;
    longitude: number;
    zoom?: number;
    width?: number;
    height?: number;
    className?: string;
}

/**
 * ParkCoverImage Component - Google Satellite Edition
 * Uses the internal /api/map-image proxy for clean satellite imagery
 * with a premium minimalist glassmorphism overlay.
 */
export default function ParkCoverImage({
    name,
    latitude,
    longitude,
    zoom = 16,
    width = 600,
    height = 400,
    className
}: ParkCoverImageProps) {
    // We use our internal API proxy which handles Google Maps + Caching
    const imageUrl = `/api/map-image?lat=${latitude}&lng=${longitude}&zoom=${zoom}&width=${width}&height=${height}`;

    return (
        <div className={cn(
            "relative group overflow-hidden bg-stone-900 transition-all duration-500",
            className
        )}>
            {/* Clean Satellite Background (Labels hidden via Proxy) */}
            <img 
                src={imageUrl} 
                alt={`Satellite view of ${name}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                    // Fallback to error state if image fails
                    e.currentTarget.style.display = 'none';
                }}
            />

            {/* Premium Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-90"></div>

            {/* Glassmorphism Title Card (IBM Plex Sans Thai) */}
            <div className="absolute inset-x-0 bottom-0 p-3 z-20">
                <div className={cn(
                    "backdrop-blur-md bg-white/10 border border-white/5 rounded-2xl p-3 shadow-xl",
                    "transition-all duration-500 group-hover:bg-white/20 group-hover:border-white/10",
                    "flex flex-col gap-0 select-none"
                )}>
                    <span className="text-white/40 text-[9px] font-mono tracking-[0.25em] uppercase mb-0.5">
                        Satellite Overview
                    </span>
                    <h3 className="text-white font-display font-bold text-base md:text-lg leading-tight tracking-tight drop-shadow-sm">
                        {name}
                    </h3>
                </div>
            </div>

            {/* Subtle Border Interaction */}
            <div className="absolute inset-0 border border-white/5 group-hover:border-white/10 transition-colors duration-500 pointer-events-none z-30"></div>
        </div>
    );
}
