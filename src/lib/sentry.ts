// Sentry Configuration
// Get your DSN from: https://sentry.io/
export const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN || ''

// Only enable Sentry in production
export const SENTRY_ENABLED = process.env.NODE_ENV === 'production' && !!SENTRY_DSN

// Sentry configuration options
export const SENTRY_CONFIG = {
    dsn: SENTRY_DSN,
    environment: process.env.NODE_ENV,
    tracesSampleRate: 1.0,
    debug: false,
    replaysOnErrorSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
}

// Initialize Sentry (call this in your app)
export function initSentry() {
    if (!SENTRY_ENABLED) {
        console.log('Sentry: Disabled (development mode or missing DSN)')
        return
    }

    // Sentry will be initialized via sentry.client.config.ts
    console.log('Sentry: Initialized')
}

// Custom error tracking
export function trackError(error: Error, context?: Record<string, any>) {
    if (SENTRY_ENABLED && typeof window !== 'undefined') {
        // @ts-ignore - Sentry will be available
        window.Sentry?.captureException(error, { extra: context })
    } else {
        console.error('Error:', error, context)
    }
}

// Track custom events
export function trackEvent(eventName: string, data?: Record<string, any>) {
    if (SENTRY_ENABLED && typeof window !== 'undefined') {
        // @ts-ignore
        window.Sentry?.captureMessage(eventName, {
            level: 'info',
            extra: data,
        })
    }
}
