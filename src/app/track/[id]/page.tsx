import React from "react";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { TrackDetailsContent } from "@/components/ui/TrackDetailsContent";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function TrackDetailsPage({ params }: Props) {
  const { id } = await params;
  const track = await prisma.track.findUnique({
    where: { id },
    include: {
      reviews: {
        orderBy: { rating: 'desc' },
        take: 4
      }
    }
  });

  if (!track) {
    notFound();
  }

  // Ensure types match what TrackDetailsContent expects
  const serializedTrack = {
    ...track,
    rating: track.rating || 0,
    distance: track.distance ? parseFloat(track.distance.toString()) : null,
    reviews: track.reviews.map(review => ({
      ...review,
      rating: review.rating || 0
    }))
  };

  return <TrackDetailsContent track={serializedTrack as any} />;
}
