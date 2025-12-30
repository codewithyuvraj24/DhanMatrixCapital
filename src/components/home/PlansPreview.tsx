"use client"
import Link from "next/link"
import { Check } from "lucide-react"

export default function PlansPreview() {
    return (
        <section className="py-24">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-black mb-6 text-slate-900 dark:text-white">Investment Plans</h2>
                    <p className="text-xl text-slate-600 dark:text-slate-300">Scale your wealth with our adaptive portfolios.</p>
                </div>

                <div className="flex justify-center max-w-md mx-auto">
                    {[
                        {
                            name: "Growth",
                            returns: "5-15% per month",
                            min: "₹25k",
                            features: [
                                "Withdraw Payments Anytime",
                                "Withdrawals Credit in 24h",
                                "100% Tax Free Return",
                                "Real-time Tracking",
                                "Risk Management"
                            ],
                            popular: true
                        }
                    ].map((plan, idx) => (
                        <div key={idx} className={`relative p-6 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] border transition-all duration-500 ${plan.popular
                            ? 'bg-blue-600 border-blue-500 text-white shadow-2xl shadow-blue-500/30 lg:scale-105 z-10'
                            : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white hover:border-blue-500/50'
                            }`}>
                            {plan.popular && (
                                <div className="absolute top-0 right-6 sm:right-10 -translate-y-1/2 bg-amber-400 text-black px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                                    Most Popular
                                </div>
                            )}
                            <h3 className="text-xl sm:text-2xl font-black mb-2">{plan.name}</h3>
                            <div className="flex items-baseline gap-1 mb-6 sm:mb-8">
                                <span className="text-3xl sm:text-4xl font-black">{plan.returns}</span>
                            </div>
                            <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
                                <div className="flex justify-between text-[10px] sm:text-sm font-bold opacity-70">
                                    <span>Minimum Investment</span>
                                    <span>{plan.min}</span>
                                </div>
                                <div className="h-px bg-current opacity-10"></div>
                                {plan.features.map((f, i) => (
                                    <div key={i} className="flex items-center gap-3 font-medium">
                                        <Check className={plan.popular ? "text-blue-200" : "text-blue-600 dark:text-blue-400"} size={16} />
                                        <span className="text-xs sm:text-sm">{f}</span>
                                    </div>
                                ))}
                            </div>
                            <Link
                                href="/register"
                                className={`block w-full py-4 rounded-xl sm:rounded-2xl text-center font-black transition-all text-sm sm:text-base ${plan.popular
                                    ? 'bg-white text-blue-600 hover:bg-slate-100'
                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                                    }`}
                            >
                                Get Started
                            </Link>

                            <div className="mt-8 text-center">
                                <Link
                                    href="/compare"
                                    className={`text-xs font-black uppercase tracking-widest hover:underline ${plan.popular ? 'text-blue-100' : 'text-blue-600'}`}
                                >
                                    Compare with other strategies
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
