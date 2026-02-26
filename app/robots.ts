// app/robots.ts
// CREATE NEW FILE

import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin/', '/api/', '/login/'],
        },
        sitemap: 'https://www.portbspace.com/sitemap.xml',
    }
}