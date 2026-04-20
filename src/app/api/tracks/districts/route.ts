import { NextResponse } from 'next/server';
import { trackService } from '@/lib/trackService';

export async function GET() {
  try {
    const uniqueDistricts = trackService.getUniqueDistricts();
    return NextResponse.json({ districts: uniqueDistricts });
  } catch (error) {
    console.error('Error fetching districts:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
