"use client"

import { useAuth } from "@/context/AuthContext"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import DashboardMock from "./DashboardMock"

export default function Hero() {
    const { user } = useAuth()

    return (
        <section className="w-full bg-white dark:bg-[#050505] pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
            <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left Content */}
                    <div className="flex flex-col items-start text-left max-w-xl">

                        <h1 className="font-sans font-bold text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.1] tracking-tight text-[#0B1220] dark:text-white mb-6">
                            Smart investing, built for Indian markets.
                        </h1>

                        <p className="font-sans font-normal text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-8 sm:mb-10">
                            We use real market data, disciplined strategies, and full transparency to help you grow wealth without guesswork. SEBI-regulated, security-first, and designed for long-term investors.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-8">
                            <Link
                                href={user ? "/dashboard" : "/register"}
                                className="w-full sm:w-auto px-8 py-4 bg-[#2563EB] hover:bg-blue-700 text-white rounded-lg font-semibold text-base transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                            >
                                Start investing
                            </Link>
                            <Link
                                href="/how-it-works"
                                className="w-full sm:w-auto px-8 py-4 bg-transparent text-[#0B1220] dark:text-white border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg font-medium text-base transition-colors flex items-center justify-center gap-2"
                            >
                                See how it works
                            </Link>
                        </div>

                        {/* Trust Line */}
                        <div className="text-xs sm:text-sm font-medium text-slate-500 flex items-center gap-2">
                            <span>SEBI regulated</span>
                            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                            <span>ISO 27001 compliant</span>
                            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                            <span>Real-time portfolio tracking</span>
                        </div>

                    </div>

                    {/* Right Visuals (Dashboard Mock) */}
                    <div className="w-full relative mt-8 lg:mt-0 order-first lg:order-last">
                        <DashboardMock />
                    </div>

                </div>
            </div>
        </section>
    )
}
