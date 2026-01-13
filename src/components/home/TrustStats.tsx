"use client"
import { m } from "framer-motion"
import Image from "next/image"
import trustVisual from "../../../public/trust-visual.png"
import { Users, TrendingUp, Target } from "lucide-react"
import { memo } from "react"

function TrustStats() {
    return (
        <section className="py-12 sm:py-32 relative overflow-hidden bg-slate-50 dark:bg-white/5 transition-colors duration-500">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/5 blur-[120px] -z-10"></div>
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    <div>
                        <h2 className="font-heading text-2xl sm:text-7xl font-black mb-10 sm:mb-16 leading-[1.1] text-slate-900 dark:text-white tracking-tighter">
                            Institutional <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Secure Protocol.</span>
                        </h2>
                        <div className="space-y-12 sm:space-y-16">
                            {[
                                {
                                    icon: <Users className="text-blue-600 dark:text-blue-400" size={28} />,
                                    label: "Active Investors",
                                    value: "14",
                                    color: "bg-blue-600/10"
                                },
                                {
                                    icon: <TrendingUp className="text-indigo-600 dark:text-indigo-400" size={28} />,
                                    label: "Total Asset Value",
                                    value: "1.3 Million",
                                    color: "bg-indigo-600/10"
                                },
                                {
                                    icon: <Target className="text-emerald-600 dark:text-emerald-400" size={28} />,
                                    label: "Market Success Rate",
                                    value: "99.9%",
                                    color: "bg-emerald-600/10"
                                }
                            ].map((stat, idx) => (
                                <m.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex items-center gap-6 group"
                                >
                                    <div className={`w-14 h-14 sm:w-20 sm:h-20 rounded-[1.2rem] ${stat.color} flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-xl shadow-black/5 shrink-0`}>
                                        <div className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center">
                                            {stat.icon}
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-1.5">{stat.value}</p>
                                        <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-[0.3em] text-[9px] sm:text-xs">{stat.label}</p>
                                    </div>
                                </m.div>
                            ))}
                        </div>
                    </div>
                    <div className="relative">
                        <div className="aspect-square bg-blue-600/20 rounded-full blur-[100px] absolute inset-0 -z-10 animate-pulse"></div>
                        <m.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative z-10 p-2 bg-white/70 dark:bg-white/5 border border-white dark:border-white/10 rounded-[2.5rem] backdrop-blur-3xl shadow-2xl overflow-hidden"
                        >
                            <Image
                                src={trustVisual}
                                alt="Financial Security"
                                placeholder="blur"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="w-full h-auto rounded-[2rem] object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent pointer-events-none"></div>
                        </m.div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default memo(TrustStats)
