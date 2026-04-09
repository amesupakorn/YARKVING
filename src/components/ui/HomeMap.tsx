"use client";
import React, { useState, useEffect } from 'react';
import MapWrapper from './MapWrapper';
import { Navigation } from 'lucide-react';

interface Track {
    id: string;
    name: string;
    imageUrl: string;
    rating: number;
    latitude: number;
    longitude: number;
    distance: number;
}

export default function HomeMap() {
    const [tracks, setTracks] = useState<Track[]>([]);
    
    // ศูนย์กลางกรุงเทพมหานคร (อนุสาวรีย์ชัยสมรภูมิ หรือใกล้เคียง)
    const center = { lat: 13.7649, lng: 100.5383 };

    useEffect(() => {
        // ดึงข้อมูลสนามที่มี limit สูง เพื่อให้คลุมกรุงเทพ
        fetch(`/api/tracks/nearby?lat=${center.lat}&lng=${center.lng}&limit=100`)
            .then(r => r.json())
            .then(data => setTracks(data))
            .catch(e => console.error(e));
    }, []);

    return (
        <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-white/50 bg-surface-container-high">
            {tracks.length === 0 && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-surface-container-high/80 backdrop-blur-sm animate-pulse">
                    <Navigation className="w-8 h-8 text-primary mb-4 animate-bounce" />
                    <p className="text-on-surface-variant text-sm font-medium">กำลังโหลดแผนที่กรุงเทพฯ...</p>
                </div>
            )}
            <div className="absolute inset-0 z-10">
                <MapWrapper tracks={tracks} userLocation={center} />
            </div>
            
            {/* Overlay Gradient to give a soft edge feeling */}
            <div className="absolute inset-0 z-[15] pointer-events-none rounded-[2.5rem] shadow-[inset_0_0_40px_rgba(0,0,0,0.03)]"></div>
        </div>
    );
}
