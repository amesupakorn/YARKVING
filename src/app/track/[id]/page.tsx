import React from "react";
import { trackService } from "@/lib/trackService";
import { notFound } from "next/navigation";
import { TrackDetailsContent } from "@/components/ui/TrackDetailsContent";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function TrackDetailsPage({ params }: Props) {
  const { id } = await params;
  const track = trackService.getById(id);

  if (!track) {
    notFound();
  }

  // Handle review sorting (static data already has reviews)
  const sortedReviews = [...(track.reviews || [])]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  // Ensure types match what TrackDetailsContent expects
  const serializedTrack = {
    ...track,
    rating: track.rating || 0,
    distance: track.distance ? parseFloat(track.distance.toString()) : null,
    reviews: sortedReviews.map(review => ({
      ...review,
      rating: review.rating || 0
    }))
  };

  return <TrackDetailsContent track={serializedTrack as any} />;
}
