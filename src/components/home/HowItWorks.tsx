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
                            <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">Where DMC invest your Dhan?</h2>
                            <p className="text-xl text-blue-200 font-medium tracking-wide">DMC Working Structure</p>
                        </div>
                    </FadeIn>

                    <StaggerContainer>
                        <div className="grid grid-cols-2 gap-4 md:gap-6">
                            {/* Large Cap - 40% */}
                            <div className="col-span-2 p-10 md:p-14 border border-white/10 rounded-[2rem] bg-gradient-to-b from-blue-600/20 to-blue-900/20 backdrop-blur-md text-center hover:border-blue-500/30 transition-all group shadow-2xl">
                                <div className="text-7xl md:text-9xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 group-hover:scale-105 transition-transform duration-500">40%</div>
                                <div className="text-2xl md:text-3xl font-bold text-blue-100 tracking-wide">Large-Cap</div>
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
                                <div className="text-base md:text-lg font-bold text-slate-400">IPO</div>
                            </div>

                            <div className="col-span-1 p-6 md:p-8 border border-white/10 rounded-[2rem] bg-white/5 backdrop-blur-md text-center hover:bg-white/10 transition-all flex flex-col justify-center items-center min-h-[180px] group">
                                <div className="text-4xl md:text-6xl font-black mb-2 text-white/90 group-hover:scale-105 transition-transform duration-300">10%</div>
                                <div className="text-base md:text-lg font-bold text-slate-400">Gold/Silver</div>
                            </div>
                        </div>
                    </StaggerContainer>
                </div>
            </section>

            <section id="how-it-works" className="py-24 bg-slate-50 dark:bg-black/20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-black mb-6 text-slate-900 dark:text-white">Start Earning in 4 Simple Steps</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
                        {/* Connecting lines for desktop */}
                        <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-slate-200 dark:bg-white/10 -translate-y-1/2 z-0"></div>

                        {[
                            { step: "01", title: "Create Account", desc: "Sign up in seconds with Google or Email." },
                            { step: "02", title: "Choose a Plan", desc: "Select a strategy that fits your budget." },
                            { step: "03", title: "Deposit Funds", desc: "Add capital securely via your dashboard." },
                            { step: "04", title: "Track Growth", desc: "Watch your wealth grow with real-time insights." }
                        ].map((item, idx) => (
                            <FadeIn key={idx} delay={idx * 0.1}>
                                <div className="relative z-10 text-center lg:text-left">
                                    <div className="w-16 h-16 rounded-full bg-blue-600 text-white text-2xl font-black flex items-center justify-center mb-6 mx-auto lg:mx-0 shadow-xl shadow-blue-500/40">
                                        {item.step}
                                    </div>
                                    <h3 className="text-2xl font-black mb-3 dark:text-white">{item.title}</h3>
                                    <p className="text-slate-600 dark:text-slate-300 font-medium">{item.desc}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
