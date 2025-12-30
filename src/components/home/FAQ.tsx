"use client"
import { HelpCircle } from "lucide-react"
import { useState } from "react"

export default function FAQ() {
    const [activeFaq, setActiveFaq] = useState<number | null>(null)

    return (
        <section className="py-24">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black mb-6 dark:text-white">Common Questions</h2>
                </div>

                <div className="space-y-4">
                    {[
                        { q: "Is my capital safe?", a: "Yes, we use bank-grade encryption and secure institutional custody. However, please note that all market investments carry some inherent risk." },
                        { q: "How long is the lock-in period?", a: "Lock-in periods vary by plan, typically ranging from 30 days to 1 year. You can view specific terms in your dashboard." },
                        { q: "Can I withdraw anytime?", a: "Withdrawals can be initiated once the maturity period is reached. Emergency withdrawals are available with a small processing fee." },
                        { q: "How does the AI strategy work?", a: "Our AI analyzes live market trends, volume, and volatility to execute trades across diversified asset classes automatically." }
                    ].map((faq, idx) => (
                        <div
                            key={idx}
                            className="rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden cursor-pointer hover:border-blue-500/50 transition-all"
                            onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                        >
                            <div className="p-6 flex justify-between items-center font-bold text-lg dark:text-white">
                                <span>{faq.q}</span>
                                <HelpCircle className={`transition-transform duration-300 ${activeFaq === idx ? 'rotate-180 text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
                            </div>
                            {activeFaq === idx && (
                                <div className="px-6 pb-6 text-slate-600 dark:text-slate-300 font-medium leading-relaxed animate-fadeIn">
                                    {faq.a}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
