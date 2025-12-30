"use client"
import { StaggerContainer, StaggerItem } from "@/components/ui/Animations"
import { Cpu, BarChart3, ShieldCheck, Users } from "lucide-react"

export default function ValueProps() {
    return (
        <section className="py-24 relative">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-black mb-6 text-slate-900 dark:text-white">Why Choose Dhanmatrixcapital?</h2>
                    <p className="text-xl text-slate-600 dark:text-slate-300">Revolutionizing investing through technology and transparency.</p>
                </div>

                <StaggerContainer>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: <Cpu className="text-blue-600 dark:text-blue-400" size={32} />,
                                title: "Smart Strategies",
                                desc: "Proprietary algorithms that scan markets 24/7 to find high-yield entries with minimal risk."
                            },
                            {
                                icon: <BarChart3 className="text-emerald-600 dark:text-emerald-400" size={32} />,
                                title: "Full Transparency",
                                desc: "Zero hidden fees. Real-time logging of every trade and growth milestone on your dashboard."
                            },
                            {
                                icon: <ShieldCheck className="text-indigo-600 dark:text-indigo-400" size={32} />,
                                title: "Bank-Grade Security",
                                desc: "Multi-layer encryption and rigorous auditing ensure your capital is always safe."
                            },
                            {
                                icon: <Users className="text-purple-600 dark:text-purple-400" size={32} />,
                                title: "Investor-First",
                                desc: "Tools designed specifically for retail investors. Complex data made simple for you."
                            }
                        ].map((prop, idx) => (
                            <StaggerItem key={idx}>
                                <div className="h-full p-8 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-blue-500/50 transition-all group">
                                    <div className="mb-6 p-4 rounded-2xl bg-white dark:bg-black/40 shadow-sm w-fit group-hover:scale-110 transition-transform">
                                        {prop.icon}
                                    </div>
                                    <h3 className="text-xl font-black mb-4 dark:text-white">{prop.title}</h3>
                                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium">{prop.desc}</p>
                                </div>
                            </StaggerItem>
                        ))}
                    </div>
                </StaggerContainer>
            </div>
        </section>
    )
}
