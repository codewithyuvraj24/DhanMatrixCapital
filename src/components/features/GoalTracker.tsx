"use client"
import { useState } from 'react'
import { m } from 'framer-motion'
import { Target, Edit3, Check, X } from 'lucide-react'

interface GoalTrackerProps {
    currentAmount: number
    initialGoal?: number
}

export default function GoalTracker({ currentAmount, initialGoal }: GoalTrackerProps) {
    const [goalAmount, setGoalAmount] = useState(initialGoal || 100000)
    const [isEditing, setIsEditing] = useState(false)
    const [tempGoal, setTempGoal] = useState(goalAmount.toString())

    const progress = Math.min((currentAmount / goalAmount) * 100, 100)
    const circumference = 2 * Math.PI * 90 // radius = 90
    const strokeDashoffset = circumference - (progress / 100) * circumference

    const handleSave = () => {
        const newGoal = parseFloat(tempGoal)
        if (newGoal > 0) {
            setGoalAmount(newGoal)
            setIsEditing(false)
        }
    }

    return (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">Investment Goal</h3>
                {!isEditing && (
                    <button
                        onClick={() => {
                            setIsEditing(true)
                            setTempGoal(goalAmount.toString())
                        }}
                        className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
                    >
                        <Edit3 size={14} className="text-slate-600 dark:text-slate-300" />
                    </button>
                )}
            </div>

            {/* Circular Progress */}
            <div className="flex flex-col items-center mb-4 sm:mb-6">
                <div className="relative w-32 h-32 sm:w-36 sm:h-36">
                    <svg className="transform -rotate-90 w-32 h-32 sm:w-36 sm:h-36">
                        {/* Background circle */}
                        <circle
                            cx="64"
                            cy="64"
                            r="58"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="none"
                            className="text-slate-100 dark:text-slate-700 sm:hidden"
                        />
                        <circle
                            cx="72"
                            cy="72"
                            r="64"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="none"
                            className="text-slate-100 dark:text-slate-700 hidden sm:block"
                        />
                        {/* Progress circle */}
                        <m.circle
                            cx="64"
                            cy="64"
                            r="58"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="none"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            initial={{ strokeDashoffset: circumference }}
                            animate={{ strokeDashoffset }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="text-emerald-500 dark:text-emerald-400 sm:hidden"
                        />
                        <m.circle
                            cx="72"
                            cy="72"
                            r="64"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="none"
                            strokeLinecap="round"
                            strokeDasharray={circumference * 1.1}
                            initial={{ strokeDashoffset: circumference * 1.1 }}
                            animate={{ strokeDashoffset: strokeDashoffset * 1.1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="text-emerald-500 dark:text-emerald-400 hidden sm:block"
                        />
                    </svg>

                    {/* Center content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <p className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white">
                            {Math.round(progress)}%
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Complete</p>
                    </div>
                </div>
            </div>

            {/* Amounts */}
            <div className="space-y-2 sm:space-y-3">
                <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-600 dark:text-slate-400">Current</span>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                        ₹{currentAmount.toLocaleString('en-IN')}
                    </span>
                </div>

                {isEditing ? (
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-600 dark:text-slate-400">Target</span>
                        <div className="flex-1 flex items-center gap-2">
                            <input
                                type="number"
                                value={tempGoal}
                                onChange={e => setTempGoal(e.target.value)}
                                className="flex-1 px-2 py-1 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                autoFocus
                            />
                            <button
                                onClick={handleSave}
                                className="p-1 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition-colors"
                            >
                                <Check size={14} />
                            </button>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="p-1 bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-white rounded hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-600 dark:text-slate-400">Target</span>
                        <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                            ₹{goalAmount.toLocaleString('en-IN')}
                        </span>
                    </div>
                )}

                <div className="pt-2 sm:pt-3 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-600 dark:text-slate-400">Remaining</span>
                        <span className="text-sm font-medium text-slate-900 dark:text-white">
                            ₹{Math.max(0, goalAmount - currentAmount).toLocaleString('en-IN')}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
