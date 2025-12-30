import type { Metadata } from 'next'
import NotificationPrompt from '@/components/features/NotificationPrompt'

export const metadata: Metadata = {
    title: 'Dashboard',
    description: 'View your investment portfolio and track your wealth growth',
}

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            {children}
            <NotificationPrompt />
        </>
    )
}
