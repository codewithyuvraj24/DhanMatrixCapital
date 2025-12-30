'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'
import { pageview, GA_TRACKING_ID } from '@/lib/analytics'

export default function Analytics() {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        if (pathname) {
            const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
            pageview(url)
        }
    }, [pathname, searchParams])

    // Load analytics if GA_TRACKING_ID is set
    if (!GA_TRACKING_ID) {
        console.log('Analytics: GA_TRACKING_ID not found')
        return null
    }

    console.log('Analytics: Loading with ID:', GA_TRACKING_ID)

    return (
        <>
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
                onLoad={() => console.log('Analytics: gtag.js loaded')}
            />
            <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
              send_page_view: false
            });
            console.log('Analytics: gtag configured');
          `,
                }}
            />
        </>
    )
}
