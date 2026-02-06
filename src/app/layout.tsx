import '@/styles/globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { AuthProvider } from '@/context/AuthContext'
import { ThemeProvider } from '@/context/ThemeContext'
// import BackgroundOrbs from '@/components/layout/BackgroundOrbs' // Replaced with dynamic import
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ToastProvider } from '@/components/ui/PremiumToast'
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from 'react'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { OrganizationSchema } from '@/components/seo/StructuredData'
import dynamic from 'next/dynamic'

// Lazy load background animations so initial paint is faster
const BackgroundOrbs = dynamic(() => import('@/components/layout/BackgroundOrbs'), {
  ssr: false,
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus-jakarta',
})

export const metadata = {
  title: {
    default: 'DhanMatrixCapital - SEBI Regulated Wealth Management',
    template: '%s | DhanMatrixCapital'
  },
  description: 'Premium SEBI-regulated wealth management platform. Start investing from just \u20B9500/month with professional portfolio management and guaranteed returns.',
  keywords: ['wealth management', 'investment', 'SEBI regulated', 'portfolio management', 'mutual funds', 'India', 'financial planning'],
  authors: [{ name: 'DhanMatrixCapital Team' }],
  creator: 'DhanMatrixCapital',
  publisher: 'DhanMatrixCapital',
  icons: {
    icon: '/icon-192.png',
    shortcut: '/icon-192.png',
    apple: '/icon-192.png',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://dhanmatrixcapital.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'DhanMatrixCapital - SEBI Regulated Wealth Management',
    description: 'Institutional-grade wealth management platform. SEBI regulated high-performance investment models.',
    url: 'https://dhanmatrixcapital.vercel.app',
    siteName: 'DhanMatrixCapital',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DhanMatrixCapital - Wealth Management Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DhanMatrixCapital - SEBI Regulated Wealth Management',
    description: 'Premium wealth management platform. Start investing from just \u20B9500/month.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'DhanMatrixCapital',
  },
}




import { FramerMotionProvider } from '@/components/providers/FramerMotionProvider'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta name="theme-color" content="#3B82F6" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="apple-touch-icon" href="/icon-192.png" />

        {/* Performance Resource Hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://firebasestorage.googleapis.com" />
      </head>
      <body
        className={`${inter.className} min-h-screen transition-colors duration-300`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <AuthProvider>
            <ToastProvider>
              <FramerMotionProvider>
                <BackgroundOrbs />
                <div className="relative z-10 flex flex-col min-h-screen">
                  <Header />
                  <main className="flex-grow">{children}</main>
                  <Footer />
                </div>
              </FramerMotionProvider>
            </ToastProvider>
          </AuthProvider>
        </ThemeProvider>

        {/* Structured Data */}
        <OrganizationSchema />

        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
        <SpeedInsights />
      </body>
    </html>
  )
}
