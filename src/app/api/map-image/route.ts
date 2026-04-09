import { NextRequest, NextResponse } from 'next/server';

/**
 * API Route: GET /api/map-image
 * Proxies requests to Google Static Maps API and caches results for 30 days.
 */
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    const zoom = searchParams.get('zoom') || '16';
    const width = searchParams.get('width') || '800';
    const height = searchParams.get('height') || '600';

    if (!lat || !lng) {
        return NextResponse.json({ error: 'Missing coordinates' }, { status: 400 });
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey || apiKey.includes('your_google')) {
        return NextResponse.json({ error: 'Google Maps API Key not configured' }, { status: 500 });
    }

    // Google Static Maps API URL with Minimalist Satellite Styling
    // maptype=satellite: Use satellite imagery
    // style=feature:all|element:labels|visibility:off: Hides ALL labels (roads, POIs, city names, etc.)
    const baseUrl = 'https://maps.googleapis.com/maps/api/staticmap';
    const styles = [
        'feature:all|element:labels|visibility:off',
        'feature:poi|visibility:off',
        'feature:road|visibility:off',
        'feature:administrative|visibility:off'
    ];
    
    // Construct styles string
    const styleParams = styles.map(s => `style=${encodeURIComponent(s)}`).join('&');
    
    const googleUrl = `${baseUrl}?center=${lat},${lng}&zoom=${zoom}&size=${width}x${height}&maptype=satellite&${styleParams}&key=${apiKey}`;

    try {
        const response = await fetch(googleUrl, {
            // Next.js Cache settings
            next: { revalidate: 2592000 } // 30 days in seconds
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Google API responded with ${response.status}: ${errorText}`);
        }

        const buffer = await response.arrayBuffer();

        return new NextResponse(buffer, {
            headers: {
                'Content-Type': 'image/png',
                // Browser/CDN Caching: 30 days
                'Cache-Control': 'public, s-maxage=2592000, stale-while-revalidate=86400',
            },
        });
    } catch (error) {
        console.error('Error proxying Google map image:', error);
        return NextResponse.json({ error: 'Failed to fetch map image' }, { status: 500 });
    }
}
