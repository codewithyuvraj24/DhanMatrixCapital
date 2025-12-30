// Google Analytics 4 Integration
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || ''

// Track page views
export const pageview = (url: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('config', GA_TRACKING_ID, {
            page_path: url,
        })
    }
}

// Track custom events
interface GtagEvent {
    action: string
    category: string
    label?: string
    value?: number
}

export const event = ({ action, category, label, value }: GtagEvent) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value,
        })
    }
}

// Investment-specific events
export const trackInvestment = (amount: number, plan: string) => {
    event({
        action: 'investment_created',
        category: 'Investment',
        label: plan,
        value: amount,
    })
}

export const trackGoalSet = (goalAmount: number) => {
    event({
        action: 'goal_set',
        category: 'Goals',
        value: goalAmount,
    })
}

export const trackROICalculation = (investment: number, returns: number) => {
    event({
        action: 'roi_calculated',
        category: 'Tools',
        label: 'ROI Calculator',
        value: returns,
    })
}

export const trackExport = (type: 'csv' | 'pdf') => {
    event({
        action: 'data_exported',
        category: 'Export',
        label: type.toUpperCase(),
    })
}

export const trackSignup = (method: 'email' | 'google') => {
    event({
        action: 'sign_up',
        category: 'Auth',
        label: method,
    })
}

export const trackLogin = (method: 'email' | 'google') => {
    event({
        action: 'login',
        category: 'Auth',
        label: method,
    })
}

// Type definitions for gtag
declare global {
    interface Window {
        gtag: (
            command: 'config' | 'event',
            targetId: string,
            config?: Record<string, any>
        ) => void
    }
}
