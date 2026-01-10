
"use client"
import Link from "next/link"

import { useAuth } from "@/context/AuthContext"
import { FadeIn } from "@/components/ui/Animations"
import { Card } from "@/components/ui/Card"
import { ArrowRight, TrendingUp, Shield, Activity, Globe } from "lucide-react"
import { motion } from "framer-motion"

export default function Hero() {
    const { user } = useAuth()

    return (
        <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-500">

            {/* Abstract Background Gradient Mesh */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-100 dark:bg-blue-900/20 rounded-full blur-[100px] opacity-60 animate-blob"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-100 dark:bg-purple-900/20 rounded-full blur-[100px] opacity-60 animate-blob animation-delay-2000"></div>
                <div className="absolute top-[20%] left-[20%] w-[400px] h-[400px] bg-emerald-50 dark:bg-emerald-900/10 rounded-full blur-[80px] opacity-40 animate-blob animation-delay-4000"></div>
            </div>

            <div className="max-w-[1920px] mx-auto px-4 lg:px-12 2xl:px-16 w-full relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Content */}
                    <div className="space-y-8 text-left">
                        <FadeIn>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 font-bold text-xs uppercase tracking-widest mb-6 border border-slate-200 dark:border-white/10">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                SEBI Regulated & ISO 27001 Secure
                            </div>

                            <h1 className="font-heading text-4xl sm:text-6xl xl:text-7xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight mb-6">
                                Grow your wealth with <br className="hidden sm:block" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                                    data-driven strategies
                                </span> <br className="hidden sm:block" />
                                designed for Indian investors.
                            </h1>

                            <p className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-2xl lg:mx-0 mb-8">
                                Experience institutional-grade wealth management with absolute transparency. SEBI regulated, 100% secure, and built for your financial freedom.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center gap-4 justify-start pt-2">
                                <Link href={user ? "/dashboard" : "/register"} className="px-8 py-4 bg-blue-600 dark:bg-blue-600 text-white rounded-2xl font-black text-lg hover:bg-blue-700 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 transition-all flex items-center justify-center gap-3">
                                    {user ? 'Launch Terminal' : 'Start Growing Wealth'}
                                    <ArrowRight size={20} strokeWidth={3} />
                                </Link>
                                <Link href="/plans" className="px-8 py-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white rounded-2xl font-bold text-lg hover:bg-slate-50 dark:hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                                    See Plans That Fit You
                                </Link>
                            </div>

                            <p className="text-[10px] text-slate-400 mt-4 max-w-lg lg:mx-0 font-medium">
                                * Investments are subject to market risks. Read all scheme related documents carefully before investing.
                            </p>

                            <div className="pt-10 flex items-center justify-start gap-6 sm:gap-8 opacity-80">
                                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                                    <Shield size={18} className="text-emerald-500" /> SEBI Regulated
                                </div>
                                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                                    <Activity size={18} className="text-blue-500" /> Real-time Analytics
                                </div>
                                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                                    <Globe size={18} className="text-indigo-500" /> ISO Certified
                                </div>
                            </div>
                        </FadeIn>
                    </div>

                    {/* Right Visual - Floating UI Mockup */}
                    <div className="relative hidden lg:block h-[600px]">
                        <motion.div
                            initial={{ opacity: 0, x: 100, rotateY: -20 }}
                            animate={{ opacity: 1, x: 0, rotateY: -12 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="relative w-full h-full perspective-1000"
                            style={{ transformStyle: 'preserve-3d', transform: 'rotateY(-12deg) rotateX(5deg)' }}
                        >
                            {/* Glass Card 1: Main Dashboard Mockup */}
                            <div className="absolute top-10 right-10 w-[90%] h-[500px] bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/50 dark:border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden p-6 hover:rotate-0 transition-transform duration-700 ease-out">
                                {/* Window Controls */}
                                <div className="absolute top-0 left-0 right-0 h-16 border-b border-slate-100 dark:border-white/5 flex items-center justify-between px-8">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                                    </div>
                                    <div className="h-2 w-20 bg-slate-100 dark:bg-white/10 rounded-full"></div>
                                </div>

                                <div className="mt-16 space-y-4">
                                    <div className="flex gap-4">
                                        {/* Card A: Total Balance with Graph */}
                                        <Card className="w-2/3 h-40 relative group">
                                            <div className="flex justify-between items-start z-10 relative">
                                                <div>
                                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Balance</p>
                                                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">₹14,20,500</h3>
                                                </div>
                                                <div className="bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                                                    <TrendingUp size={12} /> +12.4%
                                                </div>
                                            </div>
                                            {/* Simulated Graph Line */}
                                            <div className="absolute bottom-0 left-0 right-0 h-16 flex items-end justify-between px-2 gap-1 opacity-50">
                                                {[40, 60, 45, 70, 50, 80, 65, 90, 75, 100].map((h, i) => (
                                                    <div key={i} style={{ height: `${h}%` }} className="w-full bg-blue-500/20 rounded-t-sm group-hover:bg-blue-500/40 transition-colors"></div>
                                                ))}
                                            </div>
                                        </Card>

                                        {/* Card B: Asset Allocation */}
                                        <Card className="w-1/3 h-40 relative p-4 flex flex-col items-center justify-center">
                                            <div className="relative w-20 h-20 rounded-full border-8 border-slate-200 dark:border-white/10 border-t-purple-500 border-r-blue-500 rotate-45"></div>
                                            <div className="absolute inset-0 flex items-center justify-center flex-col">
                                                <span className="text-xs font-bold text-slate-400">Assets</span>
                                                <span className="text-sm font-black text-slate-900 dark:text-white">5</span>
                                            </div>
                                            <div className="mt-2 text-[10px] font-bold text-slate-400 flex gap-2">
                                                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Stocks</span>
                                                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-purple-500"></div> Crypto</span>
                                            </div>
                                        </Card>
                                    </div>

                                    {/* Bottom List: Recent Activity */}
                                    <Card className="h-44">
                                        <div className="flex justify-between items-center mb-4">
                                            <h4 className="text-xs font-bold text-slate-400 uppercase">Recent Activity</h4>
                                            <ArrowRight size={14} className="text-slate-400" />
                                        </div>
                                        <div className="space-y-3">
                                            {[
                                                { name: 'Bitcoin Purchase', date: 'Today, 10:23 AM', amount: '-₹25,000', icon: 'B', color: 'bg-orange-100 text-orange-600' },
                                                { name: 'SIP Deposit', date: 'Yesterday', amount: '+₹10,000', icon: '₹', color: 'bg-green-100 text-green-600' },
                                                { name: 'Apple Stock', date: 'Jan 2, 2024', amount: '+₹5,400', icon: 'A', color: 'bg-slate-200 text-slate-600' },
                                            ].map((item, i) => (
                                                <div key={i} className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-8 h-8 rounded-full ${item.color} flex items-center justify-center font-bold text-xs`}>
                                                            {item.icon}
                                                        </div>
                                                        <div>
                                                            <p className="text-xs font-bold text-slate-900 dark:text-white">{item.name}</p>
                                                            <p className="text-[10px] text-slate-400">{item.date}</p>
                                                        </div>
                                                    </div>
                                                    <span className={`text-xs font-bold ${item.amount.startsWith('+') ? 'text-green-600' : 'text-slate-900 dark:text-white'}`}>
                                                        {item.amount}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </Card>
                                </div>
                            </div>

                            {/* Floating Stats Card */}
                            <motion.div
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute bottom-20 -left-10 w-64 bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-100 dark:border-white/5 z-20"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 font-bold">
                                        <TrendingUp size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase">Growth</p>
                                        <p className="text-xl font-black text-slate-900 dark:text-white">+24.5%</p>
                                    </div>
                                </div>
                                <div className="w-full bg-slate-100 dark:bg-white/10 h-2 rounded-full overflow-hidden">
                                    <div className="bg-emerald-500 w-[75%] h-full rounded-full"></div>
                                </div>
                            </motion.div>

                        </motion.div>
                    </div>

                </div>
            </div>

            <style jsx>{`
@keyframes blob {
    0 % { transform: translate(0px, 0px) scale(1); }
    33 % { transform: translate(30px, -50px) scale(1.1); }
    66 % { transform: translate(-20px, 20px) scale(0.9); }
    100 % { transform: translate(0px, 0px) scale(1); }
}
                .animate - blob {
    animation: blob 7s infinite;
}
                .animation - delay - 2000 {
    animation - delay: 2s;
}
                .animation - delay - 4000 {
    animation - delay: 4s;
}
`}</style>

        </section>
    )
}

