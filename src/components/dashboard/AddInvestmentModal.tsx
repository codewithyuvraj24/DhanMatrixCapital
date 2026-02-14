import { m } from 'framer-motion'
import { X, TrendingUp } from 'lucide-react'
import { useState } from 'react'
import MagneticButton from '@/components/ui/MagneticButton'
import { formatCurrency } from '@/lib/validators'

interface AddInvestmentModalProps {
    onClose: () => void
    onCreate: (data: { depositAmount: string; withdrawalDate: string; status: string }) => Promise<boolean>
    isSubmitting: boolean
}

export default function AddInvestmentModal({ onClose, onCreate, isSubmitting }: AddInvestmentModalProps) {
    const [formData, setFormData] = useState({ depositAmount: '', withdrawalDate: '', status: 'active' })

    const handleSubmit = async () => {
        const success = await onCreate(formData)
        if (success) {
            setFormData({ depositAmount: '', withdrawalDate: '', status: 'active' })
            onClose()
        }
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <m.div
                className="absolute inset-0 bg-black/60 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            />
            <m.div
                className="bg-white dark:bg-slate-900 rounded-[3rem] border border-white/20 shadow-2xl w-full max-w-xl p-10 relative z-10"
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
            >
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h3 className="font-heading text-3xl font-black text-slate-900 dark:text-white">New Position</h3>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">Configure your AI-driven investment logic.</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-500 dark:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
                        aria-label="Close modal"
                    >
                        <X size={24} aria-hidden="true" />
                    </button>
                </div>

                <div className="space-y-8">
                    <div className="relative group">
                        <label htmlFor="depositAmount" className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3 ml-2">Initial Capital (INR)</label>
                        <div className="relative">
                            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                            <input
                                id="depositAmount"
                                type="number"
                                value={formData.depositAmount}
                                onChange={e => setFormData({ ...formData, depositAmount: e.target.value })}
                                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-4 pl-10 pr-6 text-xl font-black text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 transition-all placeholder:text-slate-400"
                                placeholder="0.00"
                            />
                        </div>
                    </div>

                    <div className="relative">
                        <label htmlFor="withdrawalDate" className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3 ml-2">Maturity Horizon</label>
                        <input
                            id="withdrawalDate"
                            title="Select maturity date"
                            type="date"
                            value={formData.withdrawalDate}
                            onChange={e => setFormData({ ...formData, withdrawalDate: e.target.value })}
                            className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-4 px-6 text-lg font-bold text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 transition-all"
                        />
                    </div>

                    <div className="p-6 bg-blue-600/10 border border-blue-600/20 rounded-[2rem] flex items-center justify-between">
                        <div>
                            <p className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">Est. Return (15%)</p>
                            <p className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">
                                {formData.depositAmount ? formatCurrency(parseFloat(formData.depositAmount) * 0.15) : '₹0.00'}
                            </p>
                        </div>
                        <TrendingUp className="text-blue-600/30" size={40} />
                    </div>
                </div>

                <div className="mt-12 flex gap-4">
                    <MagneticButton
                        onClick={onClose}
                        className="flex-1 py-5 rounded-2xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 font-black hover:bg-slate-50 dark:hover:bg-white/5 transition-all active:scale-95"
                    >
                        ABORT
                    </MagneticButton>
                    <MagneticButton
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="flex-1 py-5 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-700 transition disabled:opacity-50 active:scale-95 shadow-2xl shadow-blue-500/20"
                    >
                        {isSubmitting ? 'EXECUTING...' : 'CONFIRM POSITION'}
                    </MagneticButton>
                </div>
            </m.div>
        </div>
    )
}
