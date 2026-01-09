"use client"
import Link from "next/link"
import { Check } from "lucide-react"
import { memo } from "react"

function PlansPreview() {
    return (
        <section className="py-20 sm:py-32 relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-blue-600/5 blur-[120px] pointer-events-none"></div>
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16 sm:mb-24">
                    <h2 className="text-3xl sm:text-6xl font-black mb-6 text-slate-900 dark:text-white leading-tight">Investment <span className="text-blue-600">Plans</span></h2>
                    <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 font-medium max-w-2xl mx-auto">Simple, transparent plans designed for consistent growth.</p>
                </div>

                <div className="flex justify-center max-w-md mx-auto">
                    {[
                        {
                            name: "Growth Plan",
                            returns: "5-15% per month",
                            min: "₹25,000",
                            features: [
                                "Withdraw money anytime",
                                "Process within 24 hours",
                                "100% Tax-free returns",
                                "Real-time tracking",
                                "Smart risk management"
                            ],
                            popular: true
                        }
                    ].map((plan, idx) => (
                        <div key={idx} className={`relative p-8 sm:p-12 rounded-[2.5rem] border transition-all duration-700 ${plan.popular
                            ? 'bg-blue-600 border-blue-500 text-white shadow-[0_32px_64px_-12px_rgba(37,99,235,0.4)] lg:scale-110 z-10'
                            : 'bg-white/40 dark:bg-white/5 backdrop-blur-md border-slate-200 dark:border-white/10 text-slate-900 dark:text-white hover:border-blue-500/50 hover:shadow-xl hover:shadow-black/5'
                            }`}>
                            {plan.popular && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-400 text-black px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-xl">
                                    Highly Recommended
                                </div>
                            )}
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="text-2xl sm:text-3xl font-black">{plan.name}</h3>
                                {plan.popular && <div className="p-2 rounded-lg bg-white/20 backdrop-blur-sm"><Check size={20} /></div>}
                            </div>
                            <div className="flex items-baseline gap-1 mb-8">
                                <span className="text-4xl sm:text-5xl font-black tracking-tighter">{plan.returns}</span>
                            </div>
                            <div className="space-y-4 sm:space-y-5 mb-10 sm:mb-12">
                                <div className="flex justify-between text-xs sm:text-sm font-bold uppercase tracking-widest opacity-70">
                                    <span>Min Investment</span>
                                    <span>{plan.min}</span>
                                </div>
                                <div className="h-px bg-current opacity-10"></div>
                                {plan.features.map((f, i) => (
                                    <div key={i} className="flex items-center gap-4 font-semibold text-sm sm:text-base">
                                        <div className={`p-1 rounded-full ${plan.popular ? "bg-blue-400/30" : "bg-blue-500/10"}`}>
                                            <Check className={plan.popular ? "text-blue-100" : "text-blue-600 dark:text-blue-400"} size={14} />
                                        </div>
                                        <span>{f}</span>
                                    </div>
                                ))}
                            </div>
                            <Link
                                href="/register"
                                className={`block w-full py-5 rounded-2xl text-center font-black transition-all text-base sm:text-lg shadow-xl hover:-translate-y-1 active:scale-95 ${plan.popular
                                    ? 'bg-white text-blue-600 hover:bg-slate-50 hover:shadow-white/20'
                                    : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-500/20'
                                    }`}
                            >
                                Get Started
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default memo(PlansPreview)
