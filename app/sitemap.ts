// app/sitemap.ts
// CREATE NEW FILE

import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.portbspace.com'

    return [
        // Homepage
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        // Coworking Space
        {
            url: `${baseUrl}/coworking-space`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        // Business Address
        {
            url: `${baseUrl}/business-address`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        // Amenities
        {
            url: `${baseUrl}/amenities`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        // Contact
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        // Program
        {
            url: `${baseUrl}/program`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        // Gallery
        {
            url: `${baseUrl}/gallery`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.6,
        },
        // Community
        {
            url: `${baseUrl}/community`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.6,
        },
        // Upcoming Events
        {
            url: `${baseUrl}/upcoming-events`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.7,
        },
        // Previous Events
        {
            url: `${baseUrl}/previous-events`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
    ]
}