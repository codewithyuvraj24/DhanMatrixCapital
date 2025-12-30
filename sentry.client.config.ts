import * as Sentry from '@sentry/nextjs'

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN

Sentry.init({
    dsn: SENTRY_DSN,

    // Performance Monitoring
    tracesSampleRate: 1.0,

    // Session Replay
    replaysOnErrorSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,

    // Environment
    environment: process.env.NODE_ENV,

    // Only enable in production
    enabled: process.env.NODE_ENV === 'production',

    // Ignore specific errors
    ignoreErrors: [
        'ResizeObserver loop limit exceeded',
        'Non-Error promise rejection captured',
    ],

    // Filter sensitive data
    beforeSend(event) {
        // Remove sensitive data from events
        if (event.request) {
            delete event.request.cookies
            delete event.request.headers
        }
        return event
    },
})
