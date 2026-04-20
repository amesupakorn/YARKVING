import { MetadataRoute } from 'next';
import { trackService } from '@/lib/trackService';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://yarkving.com';

  // Get all tracks for dynamic routes
  const tracks = trackService.getAll();
  const trackEntries = tracks.map((track) => ({
    url: `${baseUrl}/track/${track.id}`,
    lastModified: new Date().toISOString(), // In a real app, this would be track.updatedAt
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/explore`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  return [...staticRoutes, ...trackEntries];
}
