'use client'

import { Suspense, lazy } from 'react'
import { ChartSkeleton } from '@/components/ui/Skeleton'

const InvestmentTrendChart = lazy(() => import('@/components/features/Charts').then(m => ({ default: m.InvestmentTrendChart })))
const PortfolioBreakdownChart = lazy(() => import('@/components/features/Charts').then(m => ({ default: m.PortfolioBreakdownChart })))
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
        <>
            {/* Analytics Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <Suspense fallback={<ChartSkeleton />}>
                    <div className="lg:col-span-2">
                        <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-1.5 rounded-2xl overflow-hidden min-h-[300px] shadow-sm">
                            <InvestmentTrendChart />
                        </div>
                    </div>
                </Suspense>

                <Suspense fallback={<ChartSkeleton />}>
                    <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-1.5 rounded-2xl overflow-hidden h-full min-h-[300px] shadow-sm">
                        <PortfolioBreakdownChart />
                    </div>
                </Suspense>
            </div>

            {/* Wealth Tracking Tools */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
                <Suspense fallback={<div className="h-64 bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-white dark:border-white/10 rounded-2xl animate-pulse" />}>
                    <GoalTracker currentAmount={totalInvested} initialGoal={initialGoal} />
                </Suspense>

                <Suspense fallback={<div className="h-64 bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-white dark:border-white/10 rounded-2xl animate-pulse" />}>
                    <PortfolioHealth
                        activeInvestments={activeInvestments}
                        totalInvestments={totalInvestments}
                    />
                </Suspense>

                <Suspense fallback={<div className="h-64 lg:col-span-3 bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-white dark:border-white/10 rounded-2xl animate-pulse" />}>
                    <div className="lg:col-span-3">
                        <ROICalculator />
                    </div>
                </Suspense>
            </div>
        </>
    )
}
