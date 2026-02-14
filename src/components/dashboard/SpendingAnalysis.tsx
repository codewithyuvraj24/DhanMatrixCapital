"use client"
import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'

const data = [
    { month: 'Jan', amount: 400 },
    { month: 'Feb', amount: 700 },
    { month: 'Mar', amount: 600 },
    { month: 'Apr', amount: 850 },
    { month: 'May', amount: 900 },
    { month: 'Jun', amount: 650 },
]

export default function SpendingAnalysis() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return <div className="h-[300px] bg-slate-100 dark:bg-slate-700 rounded-xl animate-pulse" />

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-slate-600 dark:text-slate-400 text-sm font-semibold">Spending analyist</h3>
                <div className="flex items-center gap-2 text-xs">
                    <span className="text-emerald-500 font-semibold">Views 53%</span>
                    <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                </div>
            </div>

            <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 12 }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 12 }}
                        />
                        <Bar
                            dataKey="amount"
                            fill="#8b5cf6"
                            radius={[8, 8, 0, 0]}
                            barSize={40}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
