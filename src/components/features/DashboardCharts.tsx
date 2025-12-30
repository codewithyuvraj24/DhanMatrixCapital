'use client'

import { Suspense, lazy } from 'react'
import { ChartSkeleton } from '@/components/ui/Skeleton'

// Lazy load heavy chart components
const InvestmentTrendChart = lazy(() =>
    import('@/components/features/Charts').then(mod => ({ default: mod.InvestmentTrendChart }))
)

const PortfolioBreakdownChart = lazy(() =>
    import('@/components/features/Charts').then(mod => ({ default: mod.PortfolioBreakdownChart }))
)

const GoalTracker = lazy(() => import('@/components/features/GoalTracker'))
const ROICalculator = lazy(() => import('@/components/features/ROICalculator'))
const PortfolioHealth = lazy(() => import('@/components/features/PortfolioHealth'))

interface DashboardChartsProps {
    totalInvested: number
    activeInvestments: number
    totalInvestments: number
}

export function DashboardCharts({ totalInvested, activeInvestments, totalInvestments }: DashboardChartsProps) {
    return (
        <>
            {/* Analytics Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                <Suspense fallback={<ChartSkeleton />}>
                    <div className="lg:col-span-2">
                        <div className="bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-white dark:border-white/10 p-2 rounded-[2.5rem] overflow-hidden">
                            <InvestmentTrendChart />
                        </div>
                    </div>
                </Suspense>

                <Suspense fallback={<ChartSkeleton />}>
                    <div className="bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-white dark:border-white/10 p-2 rounded-[2.5rem] overflow-hidden h-full">
                        <PortfolioBreakdownChart />
                    </div>
                </Suspense>
            </div>

            {/* Wealth Tracking Tools */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                <Suspense fallback={<div className="h-64 bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-white dark:border-white/10 rounded-[2.5rem] animate-pulse" />}>
                    <GoalTracker currentAmount={totalInvested} />
                </Suspense>

                <Suspense fallback={<div className="h-64 bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-white dark:border-white/10 rounded-[2.5rem] animate-pulse" />}>
                    <PortfolioHealth
                        activeInvestments={activeInvestments}
                        totalInvestments={totalInvestments}
                    />
                </Suspense>

                <Suspense fallback={<div className="h-64 lg:col-span-3 bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-white dark:border-white/10 rounded-[2.5rem] animate-pulse" />}>
                    <div className="lg:col-span-3">
                        <ROICalculator />
                    </div>
                </Suspense>
            </div>
        </>
    )
}
