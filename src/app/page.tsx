import React from "react";
import { trackService } from "@/lib/trackService";
import { HomeContent } from "@/components/ui/HomeContent";

export default function HomePage() {
  // Fetch dynamic data from the static trackService
  const trackCount = trackService.count();
  const formattedTrackCount = trackCount > 0 ? `${trackCount}` : "120+";

  const topTracks = trackService.getTopRated(3).map(t => ({
    id: t.id,
    name: t.name,
    imageUrl: t.imageUrl,
    rating: t.rating,
    imageCredit: t.imageCredit,
  }));

  return <HomeContent trackCount={formattedTrackCount} topTracks={topTracks} />;
}
