"use client"
import { useState, useEffect } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

const data = [
    { name: 'Travel', value: 35, color: '#a78bfa' },
    { name: 'Food', value: 25, color: '#fb7185' },
    { name: 'Fashion', value: 20, color: '#60a5fa' },
    { name: 'Electronics', value: 12, color: '#34d399' },
    { name: 'Education', value: 8, color: '#fbbf24' },
]

export default function CategoriesWidget() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return <div className="h-[300px] bg-slate-100 dark:bg-slate-700 rounded-xl animate-pulse" />

    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
            <h3 className="text-slate-600 dark:text-slate-400 text-sm font-semibold mb-1">Categories</h3>
            <p className="text-xs text-slate-400 mb-6">*Click to see more details</p>

            <div className="flex items-center gap-8">
                {/* Pie Chart */}
                <div className="relative w-40 h-40">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={50}
                                outerRadius={70}
                                paddingAngle={2}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-3xl font-bold text-slate-900 dark:text-white">35%</p>
                    </div>
                </div>

                {/* Legend */}
                <div className="flex-1 space-y-3">
                    {data.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <div
                                className={`w-3 h-3 rounded-full ${item.color === '#a78bfa' ? 'bg-purple-400' :
                                        item.color === '#fb7185' ? 'bg-rose-400' :
                                            item.color === '#60a5fa' ? 'bg-blue-400' :
                                                item.color === '#34d399' ? 'bg-emerald-400' :
                                                    'bg-amber-400'
                                    }`}
                            ></div>
                            <span className="text-sm text-slate-600 dark:text-slate-400">{item.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Stats */}
            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-700">
                <div>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mb-1">Travel</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">$1345</p>
                    <p className="text-xs text-slate-400 mt-1">Fairly spend last month</p>
                    <p className="text-xs text-slate-400">Last update yesterday</p>
                </div>
            </div>
        </div>
    )
}
