'use client'

import { Suspense, lazy } from 'react'

const InvestmentTrendChart = lazy(() => import('@/components/features/Charts').then(m => ({ default: m.InvestmentTrendChart })))
const GoalTracker = lazy(() => import('@/components/features/GoalTracker'))
const ROICalculator = lazy(() => import('@/components/features/ROICalculator'))
const PortfolioHealth = lazy(() => import('@/components/features/PortfolioHealth'))

interface DashboardChartsProps {
    totalInvested: number
    activeInvestments: number
    totalInvestments: number
    initialGoal?: number
}

export function DashboardCharts({ totalInvested, activeInvestments, totalInvestments, initialGoal }: DashboardChartsProps) {
    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Main Chart */}
            <Suspense fallback={<div className="bg-white dark:bg-slate-800 rounded-lg p-4 sm:p-6 h-64 sm:h-80 animate-pulse border border-slate-200 dark:border-slate-700" />}>
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 sm:p-6">
                    <InvestmentTrendChart />
                </div>
            </Suspense>

            {/* Secondary Widgets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <Suspense fallback={<div className="bg-white dark:bg-slate-800 rounded-lg p-4 sm:p-6 h-48 animate-pulse border border-slate-200 dark:border-slate-700" />}>
                    <GoalTracker currentAmount={totalInvested} initialGoal={initialGoal} />
                </Suspense>

                <Suspense fallback={<div className="bg-white dark:bg-slate-800 rounded-lg p-4 sm:p-6 h-48 animate-pulse border border-slate-200 dark:border-slate-700" />}>
                    <PortfolioHealth
                        activeInvestments={activeInvestments}
                        totalInvestments={totalInvestments}
                    />
                </Suspense>
            </div>

            {/* ROI Calculator */}
            <Suspense fallback={<div className="bg-white dark:bg-slate-800 rounded-lg p-4 sm:p-6 h-64 sm:h-96 animate-pulse border border-slate-200 dark:border-slate-700" />}>
                <ROICalculator />
            </Suspense>
        </div>
    )
}
