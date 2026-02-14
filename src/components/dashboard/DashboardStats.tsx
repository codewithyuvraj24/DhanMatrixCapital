import { TrendingUp, TrendingDown } from 'lucide-react'
import { formatCurrency } from '@/lib/validators'

interface DashboardStatsProps {
    totalInvested: number
    totalExpenses: number
}

export default function DashboardStats({ totalInvested, totalExpenses }: DashboardStatsProps) {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
            <h3 className="text-slate-600 dark:text-slate-400 text-sm font-semibold mb-6">Card balance</h3>

            <div className="grid grid-cols-2 gap-6">
                {/* Income */}
                <div>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mb-2">Income</p>
                    <p className="text-emerald-500 text-2xl font-bold flex items-center gap-2">
                        {formatCurrency(totalInvested)}
                    </p>
                </div>

                {/* Expenses */}
                <div>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mb-2">Expenses</p>
                    <p className="text-rose-500 text-2xl font-bold flex items-center gap-2">
                        {formatCurrency(totalExpenses)}
                    </p>
                </div>
            </div>

            {/* Note */}
            <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">NOTE</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                    You spent {formatCurrency(totalExpenses)} this month. Let's try to make it lower
                </p>
            </div>
        </div>
    )
}
