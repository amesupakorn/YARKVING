import tracksData from './staticTracks.json';

export interface Review {
  id: string;
  authorName: string;
  authorPhotoUrl: string | null;
  rating: number;
  text: string;
  timeDescription: string | null;
  trackId: string;
}

export interface Track {
  id: string;
  name: string;
  imageUrl: string;
  rating: number;
  distance: number | null;
  surface: string | null;
  elevation: string | null;
  difficulty: string | null;
  description: string | null;
  bestTime: string | null;
  hasRestrooms: boolean;
  hasWater: boolean;
  hasParking: boolean;
  hasLockers: boolean;
  latitude: number;
  longitude: number;
  googlePlaceId: string | null;
  imageCredit: string | null;
  district: string | null;
  address: string | null;
  category: string | null;
  reviews: Review[];
}

const tracks = tracksData as Track[];

export const trackService = {
  getAll: () => tracks,
  
  getById: (id: string) => tracks.find(t => t.id === id) || null,
  
  count: () => tracks.length,
  
  getTopRated: (limit: number = 8) => 
    [...tracks].sort((a, b) => b.rating - a.rating).slice(0, limit),
  
  search: (query: string, limit: number = 8) => {
    const q = query.toLowerCase();
    return tracks.filter(t => 
      t.name.toLowerCase().includes(q) || 
      (t.district && t.district.toLowerCase().includes(q)) ||
      (t.address && t.address.toLowerCase().includes(q))
    ).slice(0, limit);
  },
  
  getUniqueDistricts: () => {
    // Filter to only Bangkok districts logic
    const bkkTracks = tracks.filter(t => 
      t.address && (t.address.includes('Bangkok') || t.address.includes('Krung Thep Maha Nakhon'))
    );
    const districts = new Set(bkkTracks.map(t => t.district).filter(Boolean));
    return Array.from(districts).sort() as string[];
  },
  
  getNearby: (params: {
    lat: number;
    lng: number;
    radiusKm?: number | null;
    query?: string;
    district?: string;
    category?: string;
    minRating?: number;
    restrooms?: boolean;
    water?: boolean;
    parking?: boolean;
    lockers?: boolean;
  }) => {
    const { lat, lng, radiusKm, query, district, category, minRating, restrooms, water, parking, lockers } = params;
    
    let filtered = [...tracks];
    
    // Filter by Bangkok only for now as requested
    filtered = filtered.filter(t => 
      t.address && (t.address.includes('Bangkok') || t.address.includes('Krung Thep Maha Nakhon'))
    );

    if (query) {
      const q = query.toLowerCase();
      filtered = filtered.filter(t => 
        t.name.toLowerCase().includes(q) || 
        (t.description && t.description.toLowerCase().includes(q)) ||
        (t.district && t.district.toLowerCase().includes(q))
      );
    }
    
    if (district) {
      filtered = filtered.filter(t => t.district === district);
    }

    if (category && category !== 'all' && category !== 'nearby') {
      filtered = filtered.filter(track => {
        const name = track.name.toLowerCase();
        if (category === "parks") return name.includes("สวน") || name.includes("park");
        if (category === "nature") return name.includes("ธรรมชาติ") || name.includes("เขา") || name.includes("nature") || name.includes("trail");
        if (category === "stadium") return name.includes("สนาม") || name.includes("stadium") || name.includes("กีฬา");
        return true;
      });
    }

    if (minRating && minRating > 0) {
      filtered = filtered.filter(t => t.rating >= minRating);
    }

    if (restrooms) filtered = filtered.filter(t => t.hasRestrooms);
    if (water) filtered = filtered.filter(t => t.hasWater);
    if (parking) filtered = filtered.filter(t => t.hasParking);
    if (lockers) filtered = filtered.filter(t => t.hasLockers);

    const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
      const R = 6371; // Earth radius in km
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      return R * c;
    };

    const results = filtered.map(t => ({
      ...t,
      distance: calculateDistance(lat, lng, t.latitude, t.longitude)
    }));

    let finalResults = results;
    if (radiusKm) {
      finalResults = results.filter(r => r.distance <= radiusKm);
    }
    
    return finalResults.sort((a, b) => a.distance - b.distance);
  }
};
