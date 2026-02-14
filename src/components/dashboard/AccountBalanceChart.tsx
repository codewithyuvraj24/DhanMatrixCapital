"use client"
import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const data = [
    { month: 'Jan', income: 400, outcome: 240 },
    { month: 'Feb', income: 300, outcome: 380 },
    { month: 'Mar', income: 600, outcome: 500 },
    { month: 'Apr', income: 800, outcome: 400 },
    { month: 'May', income: 700, outcome: 600 },
    { month: 'Jun', income: 900, outcome: 700 },
]

export default function AccountBalanceChart() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return <div className="h-[300px] bg-slate-100 dark:bg-slate-700 rounded-xl animate-pulse" />

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-slate-600 dark:text-slate-400 text-sm font-semibold mb-1">Account balance</h3>
                    <p className="text-xs text-slate-400">*hover the mouse to see more details</p>
                </div>
                <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                        <span className="text-slate-600 dark:text-slate-400">Income</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                        <span className="text-slate-600 dark:text-slate-400">Outcome</span>
                    </div>
                </div>
            </div>

            <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
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
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'white',
                                border: '1px solid #e2e8f0',
                                borderRadius: '12px',
                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="income"
                            stroke="#10b981"
                            strokeWidth={3}
                            dot={{ fill: '#10b981', r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="outcome"
                            stroke="#f43f5e"
                            strokeWidth={3}
                            dot={{ fill: '#f43f5e', r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Latest Value Display */}
            <div className="mt-4 flex items-center justify-end">
                <div className="text-right">
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">$27,632</p>
                    <p className="text-xs text-slate-400">27 May</p>
                </div>
            </div>
        </div>
    )
}
