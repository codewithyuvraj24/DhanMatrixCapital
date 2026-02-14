import { ArrowRight } from 'lucide-react'
import { Investment } from '@/types/investment'
import { formatCurrency } from '@/lib/validators'

interface InvestmentsTableProps {
    investments: Investment[]
    loading: boolean
    onAddInvestment: () => void
}

export default function InvestmentsTable({ investments, loading, onAddInvestment }: InvestmentsTableProps) {
    if (loading) {
        return (
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 sm:p-6 border border-slate-200 dark:border-slate-700">
                <div className="h-48 animate-pulse bg-slate-100 dark:bg-slate-700 rounded" />
            </div>
        )
    }

    return (
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 sm:p-6 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white">Recent Positions</h2>
                {investments.length > 0 && (
                    <button className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                        View all
                    </button>
                )}
            </div>

            {investments.length === 0 ? (
                <div className="text-center py-8 sm:py-12">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                        <ArrowRight className="w-5 h-5 text-slate-400" />
                    </div>
                    <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-1">No investments yet</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 max-w-xs mx-auto">
                        Start by creating your first position
                    </p>
                    <button
                        onClick={onAddInvestment}
                        className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg text-sm font-medium hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
                    >
                        Create Investment
                    </button>
                </div>
            ) : (
                <div className="overflow-x-auto -mx-4 sm:-mx-6">
                    <div className="inline-block min-w-full align-middle px-4 sm:px-6">
                        <table className="min-w-full">
                            <thead>
                                <tr className="border-b border-slate-200 dark:border-slate-700">
                                    <th className="pb-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400">
                                        Position
                                    </th>
                                    <th className="pb-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400">
                                        Amount
                                    </th>
                                    <th className="pb-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 hidden sm:table-cell">
                                        Status
                                    </th>
                                    <th className="pb-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 hidden md:table-cell">
                                        Maturity
                                    </th>
                                    <th className="pb-3 text-right text-xs font-medium text-slate-600 dark:text-slate-400">
                                        Return
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                                {investments.slice(0, 5).map(inv => (
                                    <tr key={inv.id} className="group hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                        <td className="py-3 text-sm">
                                            <p className="font-medium text-slate-900 dark:text-white">#{inv.id.slice(0, 8)}</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 sm:hidden mt-0.5">
                                                {inv.status}
                                            </p>
                                        </td>
                                        <td className="py-3 text-sm font-medium text-slate-900 dark:text-white">
                                            {formatCurrency(inv.depositAmount)}
                                        </td>
                                        <td className="py-3 text-sm hidden sm:table-cell">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${inv.status === 'active'
                                                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400'
                                                    : 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400'
                                                }`}>
                                                {inv.status}
                                            </span>
                                        </td>
                                        <td className="py-3 text-sm text-slate-600 dark:text-slate-400 hidden md:table-cell">
                                            {new Date(inv.withdrawalDate).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </td>
                                        <td className="py-3 text-sm text-right">
                                            <p className="font-medium text-emerald-600 dark:text-emerald-400">
                                                +{formatCurrency(inv.depositAmount * 0.15)}
                                            </p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">15%</p>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}
