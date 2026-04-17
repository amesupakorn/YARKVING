import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Haversine formula to calculate distance in km
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; 
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const latParam = searchParams.get('lat');
  const lngParam = searchParams.get('lng');

  if (!latParam || !lngParam) {
    return NextResponse.json({ error: 'Missing lat or lng parameters' }, { status: 400 });
  }

  const limitParam = searchParams.get('limit');
  const limit = limitParam ? parseInt(limitParam, 10) : 15;

  const userLat = parseFloat(latParam);
  const userLng = parseFloat(lngParam);

  if (isNaN(userLat) || isNaN(userLng)) {
    return NextResponse.json({ error: 'Invalid coordinates' }, { status: 400 });
  }

  try {
    const tracks = await prisma.track.findMany();
    
    // คำนวณระยะทางสำหรับแต่ละสถานที่
    const tracksWithDistance = tracks.map((track) => {
      const distance = calculateDistance(userLat, userLng, track.latitude, track.longitude);
      return {
        ...track,
        distance
      };
    });

    // เรียงจากใกล้ที่สุดไปไกลที่สุด
    tracksWithDistance.sort((a, b) => a.distance - b.distance);

    const radiusParam = searchParams.get('radius');
    let filteredTracks = tracksWithDistance;
    
    // Only apply radius filter if radiusParam is present and not 'null'
    if (radiusParam && radiusParam !== 'null') {
      const radius = parseFloat(radiusParam);
      if (!isNaN(radius) && radius > 0) {
        filteredTracks = tracksWithDistance.filter(t => t.distance <= radius);
      }
    }

    // Server-side category filtering
    const category = searchParams.get('category');
    if (category && category !== 'all' && category !== 'nearby') {
      filteredTracks = filteredTracks.filter(track => {
        const name = track.name.toLowerCase();
        if (category === "parks") return name.includes("สวน") || name.includes("park");
        if (category === "nature") return name.includes("ธรรมชาติ") || name.includes("เขา") || name.includes("nature") || name.includes("trail");
        if (category === "stadium") return name.includes("สนาม") || name.includes("stadium") || name.includes("กีฬา");
        return true;
      });
    }

    // New: Advanced Filtering
    const query = searchParams.get('q')?.toLowerCase();
    if (query) {
      filteredTracks = filteredTracks.filter(track => 
        track.name.toLowerCase().includes(query) || 
        track.description?.toLowerCase().includes(query)
      );
    }

    const minRating = parseFloat(searchParams.get('minRating') || '0');
    if (minRating > 0) {
      filteredTracks = filteredTracks.filter(track => track.rating >= minRating);
    }

    if (searchParams.get('restrooms') === 'true') {
      filteredTracks = filteredTracks.filter(track => track.hasRestrooms);
    }
    if (searchParams.get('water') === 'true') {
      filteredTracks = filteredTracks.filter(track => track.hasWater);
    }
    if (searchParams.get('parking') === 'true') {
      filteredTracks = filteredTracks.filter(track => track.hasParking);
    }
    if (searchParams.get('lockers') === 'true') {
      filteredTracks = filteredTracks.filter(track => track.hasLockers);
    }

    const total = filteredTracks.length;
    const offsetParam = searchParams.get('offset');
    const offset = offsetParam ? parseInt(offsetParam, 10) : 0;

    // ดึงตามจำนวน limit และ offset
    const nearestTracks = filteredTracks.slice(offset, offset + limit);

    return NextResponse.json({
      tracks: nearestTracks,
      total
    });
  } catch (error) {
    console.error('Error fetching tracks:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
