import { MetadataRoute } from 'next';
import { projects } from '@/data/projects';

export default function sitemap(): MetadataRoute.Sitemap {
    // Note: Update this if you ever buy a custom domain like randilfernando.com!
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://randil-fernando-website-portfolio.vercel.app';

    // Static Routes
    const staticRoutes = ['', '/canvas', '/cv'].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1.0 : 0.8,
    }));

    // Dynamic Project Routes
    const dynamicProjectRoutes = projects.map((project) => ({
        url: `${baseUrl}/works/${project.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    return [...staticRoutes, ...dynamicProjectRoutes];
}
