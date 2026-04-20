import { NextResponse } from 'next/server';
import { trackService } from '@/lib/trackService';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ tracks: [] });
  }

  try {
    const tracks = trackService.search(query, 8);
    // Mimic the previous select structure
    const mappedTracks = tracks.map(t => ({
      id: t.id,
      name: t.name,
      imageUrl: t.imageUrl,
      rating: t.rating,
    }));

    return NextResponse.json({ tracks: mappedTracks });
  } catch (error) {
    console.error('Error searching tracks:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
