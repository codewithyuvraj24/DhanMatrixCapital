import Link from "next/link"
import { ArrowRight, Shield, Activity, Globe } from "lucide-react"
import { FadeIn } from "@/components/ui/Animations"

interface HeroLayoutProps {
    user: any
    visuals: React.ReactNode
}

export default function HeroLayout({ user, visuals }: HeroLayoutProps) {
    return (
        <section className="relative min-h-screen flex items-center pt-24 pb-12 sm:pt-32 sm:pb-20 overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-500">
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
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400 font-bold text-[9px] sm:text-xs uppercase tracking-widest mb-4 border border-slate-200 dark:border-white/10">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                SEBI Regulated & ISO 27001 Secure
                            </div>

                            <h1 className="font-heading text-3xl sm:text-6xl xl:text-7xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight mb-4">
                                Grow your wealth with <br className="hidden sm:block" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                                    data-driven strategies
                                </span> <br className="hidden sm:block" />
                                designed for Indian investors.
                            </h1>

                            <p className="text-base sm:text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-2xl lg:mx-0 mb-8">
                                Experience institutional-grade wealth management with absolute transparency. SEBI regulated, 100% secure, and built for your financial freedom.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center gap-3 justify-start pt-2">
                                <Link href={user ? "/dashboard" : "/register"} className="w-full sm:w-auto px-6 py-3.5 bg-blue-600 dark:bg-blue-600 text-white rounded-xl font-black text-base sm:text-lg hover:bg-blue-700 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 transition-all flex items-center justify-center gap-3">
                                    {user ? 'Launch Terminal' : 'Start Growing Wealth'}
                                    <ArrowRight size={18} strokeWidth={3} />
                                </Link>
                                <Link href="/plans" className="w-full sm:w-auto px-6 py-3.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-white rounded-xl font-bold text-base sm:text-lg hover:bg-slate-50 dark:hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                                    See Plans
                                </Link>
                            </div>

                            <p className="text-[10px] text-slate-400 mt-4 max-w-lg lg:mx-0 font-medium">
                                * Investments are subject to market risks. Read all scheme related documents carefully before investing.
                            </p>

                            <div className="pt-8 flex flex-wrap items-center justify-start gap-x-6 gap-y-3 opacity-80">
                                <div className="flex items-center gap-2 text-[9px] sm:text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                                    <Shield size={14} className="text-emerald-500" /> SEBI Regulated
                                </div>
                                <div className="flex items-center gap-2 text-[9px] sm:text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                                    <Activity size={14} className="text-blue-500" /> Real-time Analytics
                                </div>
                                <div className="flex items-center gap-2 text-[9px] sm:text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                                    <Globe size={14} className="text-indigo-500" /> ISO Certified
                                </div>
                            </div>
                        </FadeIn>
                    </div>

                    {/* Right Visuals Wrapper */}
                    <div className="relative hidden lg:block h-[600px]">
                        {visuals}
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </section>
    )
}
