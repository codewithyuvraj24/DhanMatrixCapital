"use client"
import Link from "next/link"
import { Check, Shield, Zap, Crown, ArrowRight, TrendingUp } from "lucide-react"
import { memo } from "react"

const plans = [
    {
        id: 1,
        name: 'Silver Plan',
        minInvestment: '₹25,000 - ₹75,000',
        annualReturn: '5%',
        term: 'Flexible',
        features: [
            "Withdraw money anytime",
            "Process within 24 hours",
            "Real-time tracking",
        ],
        icon: Shield,
        iconColor: "text-slate-400",
        popular: false
    },
    {
        id: 2,
        name: 'Gold Plan',
        minInvestment: '₹75,000 - ₹1,25,000',
        annualReturn: '5.7%',
        term: 'Flexible',
        features: [
            "Withdraw money anytime",
            "Process within 24 hours",
            "Priority support",
        ],
        icon: Zap,
        iconColor: "text-amber-500",
        popular: true
    },
    {
        id: 3,
        name: 'Platinum Plan',
        minInvestment: '₹1,25,000 - ₹2,50,000',
        annualReturn: '6.2%',
        term: 'Flexible',
        features: [
            "Instant processing",
            "Real-time tracking",
            "Dedicated Manager",
        ],
        icon: Crown,
        iconColor: "text-blue-500",
        popular: false,
        premium: true
    }
]

function PlansPreview() {
    return (
        <section className="py-20 sm:py-32 relative overflow-hidden bg-slate-50 dark:bg-[#0B1220]/50">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-600/5 blur-[120px] pointer-events-none rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-indigo-600/5 blur-[120px] pointer-events-none rounded-full"></div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16 px-4">
                    <h2 className="font-heading text-3xl sm:text-5xl font-black mb-6 text-slate-900 dark:text-white leading-tight">
                        Investment <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Plans</span>
                    </h2>
                    <p className="text-base sm:text-xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">
                        Simple, transparent plans designed for consistent growth. Choose the one that fits your goals.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
                    {plans.map((plan, idx) => (
                        <div key={idx} className={`relative p-6 sm:p-8 rounded-3xl border transition-all duration-300 group ${plan.popular
                            ? 'bg-white dark:bg-white/5 border-blue-500/30 shadow-xl shadow-blue-500/10 scale-105 z-10'
                            : 'bg-white/40 dark:bg-white/5 border-slate-200 dark:border-white/10 hover:border-blue-500/30 hover:shadow-lg'
                            }`}>

                            {plan.popular && (
                                <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1.5 rounded-bl-2xl rounded-tr-2xl text-[10px] font-black uppercase tracking-widest shadow-lg">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-6">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${plan.popular ? 'bg-amber-50 dark:bg-amber-900/20' : plan.premium ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-slate-100 dark:bg-slate-800'}`}>
                                    <plan.icon size={24} className={plan.iconColor} />
                                </div>
                                <h3 className="font-heading text-xl font-bold text-slate-900 dark:text-white">{plan.name}</h3>
                            </div>

                            <div className="mb-8 p-4 bg-slate-50 dark:bg-black/20 rounded-2xl border border-slate-100 dark:border-white/5">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Monthly Returns</p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-black text-slate-900 dark:text-white">{plan.annualReturn}</span>
                                    <span className="text-xs font-bold text-emerald-500 flex items-center gap-0.5">
                                        <TrendingUp size={12} /> Consistent
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-3 mb-8">
                                <div className="flex justify-between text-xs font-bold border-b border-slate-100 dark:border-white/5 pb-2">
                                    <span className="text-slate-400">Invested Amount</span>
                                    <span className="text-slate-900 dark:text-white">{plan.minInvestment}</span>
                                </div>
                                {plan.features.map((f, i) => (
                                    <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300">
                                        <div className="shrink-0 text-blue-500">
                                            <Check size={14} strokeWidth={3} />
                                        </div>
                                        <span>{f}</span>
                                    </div>
                                ))}
                            </div>

                            <Link
                                href="/plans"
                                className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold text-sm transition-all ${plan.popular
                                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20'
                                    : 'bg-white dark:bg-white/5 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10'
                                    }`}
                            >
                                View Details <ArrowRight size={16} />
                            </Link>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Link href="/plans" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 font-bold text-sm transition-colors">
                        Compare all plan features <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default memo(PlansPreview)
