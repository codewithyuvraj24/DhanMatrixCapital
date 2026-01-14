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
                <div className="text-center mb-10 sm:mb-20 px-4">
                    <h2 className="font-heading text-2xl sm:text-5xl font-black mb-4 dark:text-white leading-[1.1]">Common <br className="sm:hidden" /><span className="text-blue-600">Questions</span></h2>
                </div>

                <div className="space-y-3">
                    {faqData.map((faq, idx) => (
                        <div
                            key={idx}
                            className={`rounded-xl border transition-all duration-200 overflow-hidden cursor-pointer ${activeFaq === idx
                                ? 'bg-white dark:bg-white/10 border-blue-500/50 shadow-lg shadow-blue-500/5'
                                : 'bg-transparent border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5'}`}
                            onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                        >
                            <div className="p-4 sm:p-6 flex justify-between items-center font-bold text-sm sm:text-lg dark:text-white">
                                <span className="pr-4">{faq.question}</span>
                                <div className={`shrink-0 transition-transform duration-200 ${activeFaq === idx ? 'rotate-180 text-blue-600' : 'text-slate-400'}`}>
                                    <HelpCircle size={18} />
                                </div>
                            </div>
                            {activeFaq === idx && (
                                <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-slate-500 dark:text-slate-400 font-medium text-xs sm:text-base leading-relaxed animate-in fade-in slide-in-from-top-1 duration-200">
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
