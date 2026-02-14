"use client"
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import { useEffect, useState, Suspense, lazy } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { AnimatePresence } from 'framer-motion'
import { formatCurrency } from '@/lib/validators'
import {
  TrendingUp,
  Wallet,
  Plus,
  Download,
  Target,
  ArrowUpRight
} from 'lucide-react'
import { useToast } from '@/components/ui/PremiumToast'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'

// Refactored Components
import { useInvestments } from '@/hooks/useInvestments'
import AddInvestmentModal from '@/components/dashboard/AddInvestmentModal'
import InvestmentsTable from '@/components/dashboard/InvestmentsTable'

const AIPredictionWidget = lazy(() => import('@/components/features/AIPredictionWidget'))
const NewsWidget = lazy(() => import('@/components/features/NewsWidget'))
const DashboardCharts = lazy(() => import('@/components/features/DashboardCharts').then(m => ({ default: m.DashboardCharts })))

export default function DashboardPage() {
  return (
    <ErrorBoundary>
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    </ErrorBoundary>
  )
}

function Dashboard() {
  const { user, profile, isImpersonating, exitImpersonation } = useAuth()
  const router = useRouter()
  const { showToast } = useToast()

  const { investments, loading, submitting, createInvestment } = useInvestments()
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (user && profile && !profile.onboardingComplete) {
      router.push('/onboarding')
    }
  }, [user, profile, router])

  const totalInvested = investments.reduce((sum, inv) => sum + (Number(inv.depositAmount) || 0), 0)
  const activeInvestments = investments.filter(inv => inv.status === 'active').length
  const averageReturn = 15

  const handleExportCSV = () => {
    const csvContent = [
      ['Position ID', 'Amount', 'Status', 'Maturity Date', 'Created'],
      ...investments.map(inv => [
        inv.id.slice(0, 8),
        inv.depositAmount,
        inv.status,
        inv.withdrawalDate,
        new Date(inv.createdAt).toLocaleDateString()
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `portfolio-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
    showToast('Portfolio exported successfully', 'success')
  }

  return (
    <>
      {isImpersonating && (
        <div className="fixed top-16 left-0 right-0 z-50 bg-emerald-600 text-white py-2 px-4">
          <div className="max-w-5xl mx-auto flex items-center justify-between text-sm">
            <span>Viewing as {profile?.displayName || profile?.email}</span>
            <button
              onClick={exitImpersonation}
              className="text-xs font-medium bg-white text-emerald-600 px-3 py-1 rounded hover:bg-emerald-50 transition-colors"
            >
              Exit
            </button>
          </div>
        </div>
      )}

      {/* Main Container - Mobile-first with proper constraints */}
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-12 sm:pb-16">

          {/* Header - Reduced sizes, better spacing */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-white mb-1">
              Welcome back, {user?.displayName?.split(' ')[0] || 'Investor'}
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Portfolio overview
            </p>
          </div>

          {/* Stats Cards - Simplified, consistent spacing */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">

            {/* Total Value */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-md bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center">
                  <Wallet className="w-4 h-4 text-emerald-600 dark:text-emerald-400" strokeWidth={2} />
                </div>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">+12.4%</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Total Value</p>
              <p className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-white">
                {loading ? '...' : formatCurrency(totalInvested)}
              </p>
            </div>

            {/* Active Positions */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
              <div className="w-8 h-8 rounded-md bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-2">
                <Target className="w-4 h-4 text-blue-600 dark:text-blue-400" strokeWidth={2} />
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Active Positions</p>
              <p className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-white">
                {loading ? '...' : activeInvestments}
              </p>
            </div>

            {/* Average Return */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-md bg-violet-50 dark:bg-violet-900/20 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-violet-600 dark:text-violet-400" strokeWidth={2} />
                </div>
                <ArrowUpRight className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Avg. Return</p>
              <p className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-white">
                {averageReturn}%
              </p>
            </div>
          </div>

          {/* Action Buttons - Better mobile sizing */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-6 sm:mb-8">
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg text-sm font-medium hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
            >
              <Plus className="w-4 h-4" strokeWidth={2.5} />
              New Investment
            </button>
            <button
              onClick={handleExportCSV}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              <Download className="w-4 h-4" strokeWidth={2.5} />
              Export
            </button>
          </div>

          {/* Charts Section - Better grid, consistent gaps */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="lg:col-span-2">
              <Suspense fallback={<div className="bg-white dark:bg-slate-800 rounded-lg p-6 h-96 animate-pulse border border-slate-200 dark:border-slate-700" />}>
                <DashboardCharts
                  totalInvested={totalInvested}
                  activeInvestments={activeInvestments}
                  totalInvestments={investments.length}
                  initialGoal={profile?.onboarding?.amount ? parseFloat(profile.onboarding.amount) : undefined}
                />
              </Suspense>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <Suspense fallback={<div className="bg-white dark:bg-slate-800 rounded-lg p-6 h-64 animate-pulse border border-slate-200 dark:border-slate-700" />}>
                <AIPredictionWidget totalInvested={totalInvested} />
              </Suspense>
              <Suspense fallback={<div className="bg-white dark:bg-slate-800 rounded-lg p-6 h-64 animate-pulse border border-slate-200 dark:border-slate-700" />}>
                <NewsWidget />
              </Suspense>
            </div>
          </div>

          {/* Investments Table */}
          <InvestmentsTable
            investments={investments}
            loading={loading}
            onAddInvestment={() => setShowModal(true)}
          />

          {/* Footer Note - Subtle, not distracting */}
          <div className="mt-6 sm:mt-8 p-3 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <span className="font-medium text-slate-900 dark:text-white">Note:</span> Values update in real-time. Past performance doesn't guarantee future results.
            </p>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <AddInvestmentModal
            onClose={() => setShowModal(false)}
            onCreate={createInvestment}
            isSubmitting={submitting}
          />
        )}
      </AnimatePresence>
    </>
  )
}
