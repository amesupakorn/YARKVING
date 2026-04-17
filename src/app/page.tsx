import React from "react";
import prisma from "@/lib/prisma";
import { HomeContent } from "@/components/ui/HomeContent";

export default async function HomePage() {
  // Fetch dynamic data from DB
  const trackCount = await prisma.track.count();
  const formattedTrackCount = trackCount > 0 ? `${trackCount}` : "120+";

  const topTracks = await prisma.track.findMany({
    orderBy: {
      rating: "desc",
    },
    take: 3,
    select: {
      id: true,
      name: true,
      imageUrl: true,
      rating: true,
      imageCredit: true,
    }
  });

  return <HomeContent trackCount={formattedTrackCount} topTracks={topTracks} />;
}
