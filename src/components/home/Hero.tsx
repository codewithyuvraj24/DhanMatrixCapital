"use client"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/context/AuthContext"
import { FadeIn } from "@/components/ui/Animations"
import { ArrowRight, ShieldCheck, Zap, Lock, TrendingUp } from "lucide-react"

export default function Hero() {
    const { user } = useAuth()

    return (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-32 pb-20">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-white/90 dark:bg-[#050505]/90 z-10"></div>
                <Image
                    src="/hero-bg.png"
                    alt="Background"
                    fill
                    priority
                    className="object-cover"
                    quality={90}
                />
            </div>
            <div className="max-w-7xl mx-auto px-4 relative z-10 w-full">
                <div className="text-center max-w-4xl mx-auto">
                    <FadeIn>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-bold mb-8">
                            <ShieldCheck size={16} />
                            <span>SEBI Regulated Advisory</span>
                        </div>
                        <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black mb-6 sm:mb-8 leading-[1.1] tracking-tight text-slate-900 dark:text-white">
                            Smart Investing & <br className="hidden sm:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                                Structured Growth.
                            </span>
                        </h1>

                        <div className="max-w-3xl mx-auto mb-10 space-y-8">
                            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed px-4">
                                Dhan Matrix Capital provides all advice strictly in accordance with SEBI regulations and is based on client suitability. Join us for the best investment opportunities.
                            </p>

                            <div className="mx-auto max-w-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-white/5 dark:to-white/10 border border-slate-200 dark:border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <TrendingUp size={64} className="text-slate-900 dark:text-white" />
                                </div>
                                <div className="relative z-10 text-left">
                                    <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-3">
                                        "Investment does not need Lakhs, you can start with just 25k"
                                    </div>
                                    <p className="text-sm sm:text-base font-medium text-slate-500 dark:text-slate-300">
                                        Join us to separate your wealth and unlock opportunities in every market cycle.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            {user ? (
                                <Link href="/dashboard" className="w-full sm:w-auto px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-2xl shadow-blue-500/25 flex items-center justify-center gap-3 active:scale-95">
                                    Enter Portal
                                    <ArrowRight size={20} />
                                </Link>
                            ) : (
                                <>
                                    <Link href="/register" className="w-full sm:w-auto px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-2xl shadow-blue-500/25 flex items-center justify-center gap-3 active:scale-95">
                                        Start Investing Now
                                        <ArrowRight size={20} />
                                    </Link>
                                    <Link href="#how-it-works" className="w-full sm:w-auto px-10 py-5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl font-black text-lg hover:bg-slate-200 dark:hover:bg-white/10 transition-all flex items-center justify-center gap-3 active:scale-95">
                                        See How It Works
                                    </Link>
                                </>
                            )}
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.4}>
                        <div className="mt-12 sm:mt-16 flex flex-wrap justify-center items-center gap-6 sm:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
                            <span className="font-bold text-lg sm:text-xl flex items-center gap-2"><Lock size={20} /> SECURE</span>
                            <span className="font-bold text-lg sm:text-xl flex items-center gap-2"><ShieldCheck size={20} /> VERIFIED</span>
                            <span className="font-bold text-lg sm:text-xl flex items-center gap-2"><Zap size={20} /> INSTANT</span>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    )
}
