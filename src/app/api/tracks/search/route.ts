import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ tracks: [] });
  }

  try {
    const tracks = await prisma.track.findMany({
      where: {
        AND: [
          {
            OR: [
              { name: { contains: query } },
              { description: { contains: query } },
              { district: { contains: query } },
              { address: { contains: query } }
            ]
          },
          {
            OR: [
              { address: { contains: 'Bangkok' } },
              { address: { contains: 'Krung Thep Maha Nakhon' } }
            ]
          }
        ]
      },
      take: 8,
      select: {
        id: true,
        name: true,
        imageUrl: true,
        rating: true,
      }
    });

    return NextResponse.json({ tracks });
  } catch (error) {
    console.error('Error searching tracks:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
