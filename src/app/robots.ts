import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin/', '/dashboard/', '/profile/'],
            },
        ],
        sitemap: 'https://dhanmatrixcapital.vercel.app/sitemap.xml',
    }
}
