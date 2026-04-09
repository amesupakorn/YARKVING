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

    // ดึงตามจำนวน limit (ค่าเริ่มต้น 15 ลำดับแรก)
    const nearestTracks = tracksWithDistance.slice(0, limit);

    return NextResponse.json(nearestTracks);
  } catch (error) {
    console.error('Error fetching tracks:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
