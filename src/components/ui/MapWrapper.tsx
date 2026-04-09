"use client";
import React from 'react';
import dynamic from 'next/dynamic';

const ExploreMapComponent = dynamic(
    () => import('./ExploreMap'),
    { ssr: false }
);

interface Track {
    id: string;
    name: string;
    imageUrl: string;
    rating: number;
    latitude: number;
    longitude: number;
    distance: number;
}

interface MapWrapperProps {
    tracks: Track[];
    userLocation: { lat: number; lng: number };
}

export default function MapWrapper({ tracks, userLocation }: MapWrapperProps) {
    return <ExploreMapComponent tracks={tracks} userLocation={userLocation} />;
}
