'use client'

import { Suspense, lazy } from 'react'
import { ChartSkeleton } from '@/components/ui/Skeleton'

import { InvestmentTrendChart, PortfolioBreakdownChart } from '@/components/features/Charts'

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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                <Suspense fallback={<ChartSkeleton />}>
                    <div className="lg:col-span-2">
                        <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-2 rounded-3xl overflow-hidden min-h-[350px] shadow-sm">
                            <InvestmentTrendChart />
                        </div>
                    </div>
                </Suspense>

                <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-2 rounded-3xl overflow-hidden h-full min-h-[350px] shadow-sm">
                    <PortfolioBreakdownChart />
                </div>
            </div>

            {/* Wealth Tracking Tools */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                <Suspense fallback={<div className="h-64 bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-white dark:border-white/10 rounded-[2.5rem] animate-pulse" />}>
                    <GoalTracker currentAmount={totalInvested} initialGoal={initialGoal} />
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
