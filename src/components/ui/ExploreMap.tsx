"use client";
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Link from 'next/link';
import { Star } from 'lucide-react';
import ParkCoverImage from './ParkCoverImage';

interface Track {
    id: string;
    name: string;
    imageUrl: string;
    rating: number;
    latitude: number;
    longitude: number;
    distance: number;
}

interface ExploreMapProps {
    tracks: Track[];
    userLocation: { lat: number; lng: number };
}

// Function to center map dynamically when location changes
function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();
  React.useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

const userIcon = L.divIcon({
    className: 'bg-transparent border-0',
    html: `<div class="relative flex items-center justify-center w-8 h-8">
             <div class="absolute w-8 h-8 rounded-full bg-primary/30 animate-ping"></div>
             <div class="relative w-4 h-4 rounded-full bg-primary shadow-lg border-2 border-white"></div>
           </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
});

const getTrackIcon = (track: Track) => L.divIcon({
    className: 'bg-transparent border-0',
    html: `<div class="relative group cursor-pointer flex flex-col items-center">
             <div class="w-8 h-8 bg-white rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.1)] flex items-center justify-center border-2 border-white group-hover:border-primary transition-colors text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none" class="lucide lucide-map-pin"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3" fill="white"/></svg>
             </div>
             <div class="absolute -bottom-[2px] w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-white drop-shadow-sm"></div>
           </div>`,
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -32],
});

export default function ExploreMap({ tracks, userLocation }: ExploreMapProps) {
    const position: [number, number] = [userLocation.lat, userLocation.lng];

    return (
        <MapContainer center={position} zoom={13} scrollWheelZoom={true} className="w-full h-full rounded-3xl z-0" zoomControl={false}>
            <ChangeView center={position} />
            <TileLayer
                attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
            {/* User Location */}
            <Marker position={position} icon={userIcon}>
                <Popup className="user-popup">
                   <div className="font-display font-medium text-sm text-center">คุณอยู่ที่นี่</div>
                </Popup>
            </Marker>

            {/* Track Locations */}
            {tracks.map(track => (
                <Marker 
                    key={track.id} 
                    position={[track.latitude, track.longitude]} 
                    icon={getTrackIcon(track)}
                >
                    <Popup className="track-popup">
                        <Link href={`/track/${track.id}`} className="block group w-full h-full no-underline hover:no-underline text-on-surface">
                        <div className="relative w-full h-32 overflow-hidden rounded-t-xl bg-surface-container-high">
                            <ParkCoverImage 
                                name={track.name} 
                                latitude={track.latitude} 
                                longitude={track.longitude}
                                imageUrl={track.imageUrl}
                                className="w-full h-full"
                            />
                            <div className="absolute top-2 left-2 bg-white/90 backdrop-blur text-primary text-[10px] font-bold px-2 py-1 rounded-full font-mono flex items-center shadow-sm z-30">
                                {track.distance < 1 ? '< 1' : track.distance.toFixed(1)} km
                            </div>
                        </div>
                            <div className="p-3 bg-white rounded-b-xl border border-t-0 border-outline-variant/20">
                                <h4 className="font-display font-bold text-[15px] mb-0.5 mt-0 leading-tight line-clamp-1">{track.name}</h4>
                                <div className="flex items-center justify-between mt-2 text-[11px]">
                                    <div className="flex items-center text-tertiary gap-1.5">
                                        <Star className="w-[14px] h-[14px] fill-current" />
                                        <span className="font-mono font-semibold">{track.rating.toFixed(1)}</span>
                                    </div>
                                    <div className="text-primary font-medium flex items-center text-xs">
                                        ดูรายละเอียด <span className="ml-1 group-hover:translate-x-0.5 transition-transform">&rarr;</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
