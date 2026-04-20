import { NextResponse } from 'next/server';
import { trackService } from '@/lib/trackService';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const latParam = searchParams.get('lat');
  const lngParam = searchParams.get('lng');

  if (!latParam || !lngParam) {
    return NextResponse.json({ error: 'Missing lat or lng parameters' }, { status: 400 });
  }

  const userLat = parseFloat(latParam);
  const userLng = parseFloat(lngParam);

  if (isNaN(userLat) || isNaN(userLng)) {
    return NextResponse.json({ error: 'Invalid coordinates' }, { status: 400 });
  }

  try {
    const limit = parseInt(searchParams.get('limit') || '15', 10);
    const radius = searchParams.get('radius') && searchParams.get('radius') !== 'null' 
      ? parseFloat(searchParams.get('radius')!) 
      : null;

    const filteredTracks = trackService.getNearby({
      lat: userLat,
      lng: userLng,
      radiusKm: radius,
      query: searchParams.get('q') || undefined,
      district: searchParams.get('district') || undefined,
      category: searchParams.get('category') || undefined,
      minRating: parseFloat(searchParams.get('minRating') || '0'),
      restrooms: searchParams.get('restrooms') === 'true',
      water: searchParams.get('water') === 'true',
      parking: searchParams.get('parking') === 'true',
      lockers: searchParams.get('lockers') === 'true',
    });

    const total = filteredTracks.length;
    const offset = parseInt(searchParams.get('offset') || '0', 10);
    const results = filteredTracks.slice(offset, offset + limit);

    return NextResponse.json({
      tracks: results,
      total
    });
  } catch (error) {
    console.error('Error fetching tracks:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
