"use client"
import { FadeIn, StaggerContainer } from "@/components/ui/Animations"

export default function HowItWorks() {
    return (
        <>
            <section className="py-24 bg-[#0a192f] text-white relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                    <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500 rounded-full blur-[100px]"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-600 rounded-full blur-[120px]"></div>
                </div>

                <div className="max-w-4xl mx-auto px-4 relative z-10">
                    <FadeIn>
                        <div className="text-center mb-16">
                            <h2 className="text-4xl sm:text-6xl font-black mb-4 leading-tight">Investment <span className="text-blue-400">Strategy</span></h2>
                            <p className="text-lg sm:text-xl text-blue-200 font-bold tracking-widest uppercase mb-6">Our Diversified Portfolio</p>
                            <p className="text-blue-200/60 max-w-2xl mx-auto leading-relaxed">
                                We intentionally spread capital across multiple asset classes—Large Caps for stability, Mid/Small Caps for growth, and Gold for hedging—to maximize returns while minimizing risk.
                            </p>
                        </div>
                    </FadeIn>

                    <StaggerContainer>
                        <div className="grid grid-cols-2 gap-4 md:gap-6">
                            {/* Large Cap - 40% */}
                            <div className="col-span-2 p-10 md:p-14 border border-white/10 rounded-[2rem] bg-gradient-to-b from-blue-600/20 to-blue-900/20 backdrop-blur-md text-center hover:border-blue-500/30 transition-all group shadow-2xl">
                                <div className="text-7xl md:text-9xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 group-hover:scale-105 transition-transform duration-500">40%</div>
                                <div className="text-2xl md:text-3xl font-bold text-blue-100 tracking-wide">Large-Cap Stocks</div>
                            </div>

                            {/* Mid Cap - 25% & Small Cap - 15% */}
                            <div className="col-span-1 p-8 md:p-10 border border-white/10 rounded-[2rem] bg-white/5 backdrop-blur-md text-center hover:bg-white/10 transition-all flex flex-col justify-center items-center min-h-[220px] group">
                                <div className="text-5xl md:text-7xl font-black mb-3 text-white group-hover:scale-105 transition-transform duration-300">25%</div>
                                <div className="text-lg md:text-xl font-bold text-slate-300">Mid-Cap</div>
                            </div>

                            <div className="col-span-1 p-8 md:p-10 border border-white/10 rounded-[2rem] bg-white/5 backdrop-blur-md text-center hover:bg-white/10 transition-all flex flex-col justify-center items-center min-h-[220px] group">
                                <div className="text-5xl md:text-7xl font-black mb-3 text-white group-hover:scale-105 transition-transform duration-300">15%</div>
                                <div className="text-lg md:text-xl font-bold text-slate-300">Small-Cap</div>
                            </div>

                            {/* IPO - 10% & Gold/Silver - 10% */}
                            <div className="col-span-1 p-6 md:p-8 border border-white/10 rounded-[2rem] bg-white/5 backdrop-blur-md text-center hover:bg-white/10 transition-all flex flex-col justify-center items-center min-h-[180px] group">
                                <div className="text-4xl md:text-6xl font-black mb-2 text-white/90 group-hover:scale-105 transition-transform duration-300">10%</div>
                                <div className="text-base md:text-lg font-bold text-slate-400">IPO Opportunities</div>
                            </div>

                            <div className="col-span-1 p-6 md:p-8 border border-white/10 rounded-[2rem] bg-white/5 backdrop-blur-md text-center hover:bg-white/10 transition-all flex flex-col justify-center items-center min-h-[180px] group">
                                <div className="text-4xl md:text-6xl font-black mb-2 text-white/90 group-hover:scale-105 transition-transform duration-300">10%</div>
                                <div className="text-base md:text-lg font-bold text-slate-400">Gold & Silver</div>
                            </div>
                        </div>
                    </StaggerContainer>
                </div>
            </section>

            <section id="how-it-works" className="py-20 sm:py-32 bg-slate-50 dark:bg-black/20 overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-20 sm:mb-28">
                        <h2 className="text-4xl sm:text-6xl font-black mb-6 text-slate-900 dark:text-white leading-tight">Start Growing in <br className="sm:hidden" /> <span className="text-blue-600">4 Simple Steps</span></h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
                        {/* Connecting lines for desktop */}
                        <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-slate-200 dark:bg-white/10 -translate-y-1/2 z-0"></div>

                        {[
                            { step: "01", title: "Create Account", desc: "Sign up in seconds with your Mobile or Google account." },
                            { step: "02", title: "Choose a Plan", desc: "Select an investment plan that fits your goals." },
                            { step: "03", title: "Deposit Funds", desc: "Add money securely through your dashboard." },
                            { step: "04", title: "Track Growth", desc: "Watch your wealth grow with real-time updates." }
                        ].map((item, idx) => (
                            <FadeIn key={idx} delay={idx * 0.1}>
                                <div className="relative z-10 text-center lg:text-left group">
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-[1.5rem] bg-gradient-to-br from-blue-600 to-indigo-700 text-white text-2xl sm:text-3xl font-black flex items-center justify-center mb-8 mx-auto lg:mx-0 shadow-2xl shadow-blue-500/40 group-hover:scale-110 transition-transform duration-500">
                                        {item.step}
                                    </div>
                                    <h3 className="text-2xl sm:text-3xl font-black mb-4 dark:text-white group-hover:text-blue-600 transition-colors">{item.title}</h3>
                                    <p className="text-slate-600 dark:text-slate-300 font-medium text-base sm:text-lg leading-relaxed">{item.desc}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
