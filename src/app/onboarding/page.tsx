"use client"
import OnboardingWizard from '@/components/features/Onboarding'
import ProtectedRoute from '@/components/auth/ProtectedRoute'

export default function OnboardingPage() {
    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-slate-50 dark:bg-[#050505] transition-colors duration-500 flex items-center justify-center p-4">
                <OnboardingWizard />
            </div>
        </ProtectedRoute>
    )
}
