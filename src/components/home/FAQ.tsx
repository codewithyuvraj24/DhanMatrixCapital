"use client"
import { HelpCircle } from "lucide-react"
import { useState, memo } from "react"
import { faqData } from "./faqData"

function FAQ() {
    const [activeFaq, setActiveFaq] = useState<number | null>(null)

    return (
        <section className="py-20 sm:py-32 relative overflow-hidden">
            <div className="absolute top-1/2 left-0 w-full h-1/2 bg-blue-500/5 blur-[120px] pointer-events-none"></div>
            <div className="max-w-4xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16 sm:mb-24">
                    <h2 className="font-heading text-4xl sm:text-6xl font-black mb-6 dark:text-white leading-tight">Common <span className="text-blue-600">Questions</span></h2>
                    <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 font-medium">Everything you need to know about starting your wealth journey.</p>
                </div>

                <div className="space-y-4">
                    {faqData.map((faq, idx) => (
                        <div
                            key={idx}
                            className={`rounded-2xl sm:rounded-3xl border transition-all duration-300 overflow-hidden cursor-pointer ${activeFaq === idx
                                ? 'bg-white dark:bg-white/10 border-blue-500/50 shadow-xl shadow-blue-500/5'
                                : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 hover:border-blue-500/30'}`}
                            onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                        >
                            <div className="p-6 sm:p-8 flex justify-between items-center font-black text-lg sm:text-xl dark:text-white tracking-tight">
                                <span>{faq.question}</span>
                                <div className={`p-2 rounded-full transition-all duration-300 ${activeFaq === idx ? 'bg-blue-600 text-white rotate-180' : 'bg-slate-200 dark:bg-white/10 text-slate-500'}`}>
                                    <HelpCircle size={20} />
                                </div>
                            </div>
                            {activeFaq === idx && (
                                <div className="px-6 sm:px-8 pb-6 sm:pb-8 text-slate-600 dark:text-slate-300 font-medium text-base sm:text-lg leading-relaxed animate-in fade-in slide-in-from-top-2 duration-300">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default memo(FAQ)
