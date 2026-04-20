import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const tracks = await prisma.track.findMany({
      where: {
        OR: [
          { address: { contains: 'Bangkok' } },
          { address: { contains: 'Krung Thep Maha Nakhon' } }
        ]
      },
      select: {
        district: true
      }
    });

    // Extract unique districts and sort alphabetically
    const uniqueDistricts = Array.from(
      new Set(tracks.map(t => t.district).filter(Boolean))
    ).sort() as string[];

    return NextResponse.json({ districts: uniqueDistricts });
  } catch (error) {
    console.error('Error fetching districts:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
