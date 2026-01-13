"use client"
import { m } from 'framer-motion'
import { Activity, TrendingUp, AlertTriangle } from 'lucide-react'

interface PortfolioHealthProps {
    activeInvestments: number
    totalInvestments: number
    diversificationScore?: number
}

export default function PortfolioHealth({
    activeInvestments,
    totalInvestments,
    diversificationScore
}: PortfolioHealthProps) {
    // Calculate health score (0-100)
    // Simple heuristic: based on active ratio and diversification
    const activeRatio = totalInvestments > 0 ? (activeInvestments / totalInvestments) * 100 : 0
    const diversity = diversificationScore || Math.min(activeInvestments * 10, 100)
    const healthScore = Math.round((activeRatio * 0.6) + (diversity * 0.4))

    // Determine status
    const getStatus = (score: number) => {
        if (score >= 80) return { label: 'Excellent', color: 'emerald', icon: TrendingUp }
        if (score >= 60) return { label: 'Good', color: 'blue', icon: Activity }
        if (score >= 40) return { label: 'Fair', color: 'amber', icon: AlertTriangle }
        return { label: 'Needs Attention', color: 'red', icon: AlertTriangle }
    }

    const status = getStatus(healthScore)
    const StatusIcon = status.icon

    // Gauge arc calculation
    const radius = 80
    const circumference = Math.PI * radius // Half circle
    const strokeDashoffset = circumference - (healthScore / 100) * circumference

    return (
        <div className="bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-white dark:border-white/10 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-xl bg-${status.color}-500/10 flex items-center justify-center`}>
                    <StatusIcon className={`text-${status.color}-600 dark:text-${status.color}-400`} size={20} />
                </div>
                <h2 className="text-lg font-black text-slate-900 dark:text-white">Portfolio Health</h2>
            </div>

            {/* Gauge */}
            <div className="flex flex-col items-center">
                <div className="relative w-48 h-24 mb-6">
                    <svg className="w-48 h-24" viewBox="0 0 200 100">
                        {/* Background arc */}
                        <path
                            d="M 20 90 A 80 80 0 0 1 180 90"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="12"
                            className="text-slate-100 dark:text-white/5"
                        />
                        {/* Progress arc */}
                        <m.path
                            d="M 20 90 A 80 80 0 0 1 180 90"
                            fill="none"
                            stroke={`url(#health-gradient-${status.color})`}
                            strokeWidth="12"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            initial={{ strokeDashoffset: circumference }}
                            animate={{ strokeDashoffset }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                        <defs>
                            <linearGradient id={`health-gradient-${status.color}`} x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor={status.color === 'emerald' ? '#10B981' : status.color === 'blue' ? '#3B82F6' : status.color === 'amber' ? '#F59E0B' : '#EF4444'} />
                                <stop offset="100%" stopColor={status.color === 'emerald' ? '#059669' : status.color === 'blue' ? '#2563EB' : status.color === 'amber' ? '#D97706' : '#DC2626'} />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Center score */}
                    <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
                        <p className={`text-4xl font-black text-${status.color}-600 dark:text-${status.color}-400`}>
                            {healthScore}
                        </p>
                        <p className="text-xs text-slate-600 dark:text-slate-300 font-bold uppercase tracking-widest">Score</p>
                    </div>
                </div>

                {/* Status Badge */}
                <div className={`px-4 py-2 rounded-full bg-${status.color}-500/10 border border-${status.color}-500/20 mb-6`}>
                    <p className={`text-sm font-black text-${status.color}-600 dark:text-${status.color}-400 uppercase tracking-widest`}>
                        {status.label}
                    </p>
                </div>

                {/* Metrics */}
                <div className="w-full space-y-3">
                    <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-white/5 rounded-xl">
                        <span className="text-[10px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest">Active Ratio</span>
                        <span className="text-xs font-black text-slate-900 dark:text-white">
                            {Math.round(activeRatio)}%
                        </span>
                    </div>
                    <div className="flex justify-between items-center p-2.5 bg-slate-50 dark:bg-white/5 rounded-xl">
                        <span className="text-[10px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest">Diversification</span>
                        <span className="text-xs font-black text-slate-900 dark:text-white">
                            {Math.round(diversity)}%
                        </span>
                    </div>
                    <div className="flex justify-between items-center p-2.5 bg-slate-50 dark:bg-white/5 rounded-xl">
                        <span className="text-[10px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest">Total Positions</span>
                        <span className="text-xs font-black text-slate-900 dark:text-white">
                            {totalInvestments}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
