"use client"
import { memo } from "react"
import { StaggerContainer, StaggerItem } from "@/components/ui/Animations"
import { Cpu, BarChart3, ShieldCheck, Users } from "lucide-react"

function ValueProps() {
    return (
        <section className="py-12 sm:py-32 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-blue-500/5 blur-[120px] pointer-events-none"></div>
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-left sm:text-center mb-8 sm:mb-16 px-4 sm:px-0">
                    <h2 className="font-heading text-2xl sm:text-5xl font-black mb-3 text-slate-900 dark:text-white leading-tight tracking-tight">
                        Why Choose <span className="text-blue-600 dark:text-blue-400">DMC?</span>
                    </h2>
                    <p className="text-sm sm:text-lg text-slate-500 dark:text-slate-300 font-medium max-w-2xl sm:mx-auto">
                        We make growing your wealth simple, safe, and transparent.
                    </p>
                </div>

                <StaggerContainer>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: <Cpu className="text-blue-600 dark:text-blue-400" size={32} />,
                                title: "Smart Tools",
                                desc: "Advanced technology that scans the market 24/7 to find the best growth opportunities for you."
                            },
                            {
                                icon: <BarChart3 className="text-emerald-600 dark:text-emerald-400" size={32} />,
                                title: "Total Transparency",
                                desc: "No hidden fees. Track every trade and growth milestone live from your dashboard."
                            },
                            {
                                icon: <ShieldCheck className="text-indigo-600 dark:text-indigo-400" size={32} />,
                                title: "Bank-Grade Safety",
                                desc: "Top-level encryption and regular audits ensure your money stays safe and secure."
                            },
                            {
                                icon: <Users className="text-purple-600 dark:text-purple-400" size={32} />,
                                title: "Easy for Everyone",
                                desc: "Designed for everyday investors. We turn complex data into simple, actionable insights."
                            }
                        ].map((prop, idx) => (
                            <StaggerItem key={idx}>
                                <div className="h-full p-6 sm:p-12 rounded-3xl bg-white/40 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 hover:border-blue-500/50 transition-all duration-500 group relative overflow-hidden shadow-xl hover:shadow-blue-500/10 hover:-translate-y-2">
                                    <div className="mb-6 p-3 rounded-2xl bg-white dark:bg-slate-900 shadow-xl shadow-black/5 w-fit group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                                        <div className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center">
                                            {prop.icon}
                                        </div>
                                    </div>
                                    <h3 className="font-heading text-lg font-black mb-3 dark:text-white tracking-tight">{prop.title}</h3>
                                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium text-xs sm:text-base">{prop.desc}</p>
                                </div>
                            </StaggerItem>
                        ))}
                    </div>
                </StaggerContainer>
            </div>
        </section>
    )


}

export default memo(ValueProps)
