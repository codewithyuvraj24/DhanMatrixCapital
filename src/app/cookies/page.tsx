"use client"

import { FadeIn } from "@/components/ui/Animations"
import Link from "next/link"
import { ShieldCheck, Info, ArrowLeft, Cookie } from "lucide-react"

export default function CookiesPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-20 px-4 transition-colors duration-500">
            <div className="max-w-3xl mx-auto">
                <FadeIn>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors mb-12 font-bold text-sm uppercase tracking-widest"
                    >
                        <ArrowLeft size={16} /> Back to Home
                    </Link>

                    <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 dark:shadow-none relative overflow-hidden">
                        {/* Background Accent */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>

                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                                <Cookie size={32} />
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">Cookie Policy</h1>
                                <p className="text-slate-500 dark:text-slate-400 font-medium italic">Last updated: January 9, 2026</p>
                            </div>
                        </div>

                        <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
                            <section className="space-y-4">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <Info size={20} className="text-blue-600" />
                                    What are Cookies?
                                </h2>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                    Cookies are small text files that are placed on your computer or mobile device by websites that you visit. They are widely used in order to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
                                </p>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <ShieldCheck size={20} className="text-blue-600" />
                                    How We Use Cookies
                                </h2>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                    Dhanmatrixcapital uses cookies for several reasons:
                                </p>
                                <ul className="list-none space-y-3 pl-0">
                                    {[
                                        "Essential: Required for secure login and account management.",
                                        "Analytics: To understand how our platform is being used and improve performance.",
                                        "Personalization: To remember your theme preferences and investment goals.",
                                        "Security: To monitor and prevent fraudulent activities."
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-400 font-medium">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0"></div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            <section className="space-y-4">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Your Choices</h2>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                    Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set, visit <a href="https://www.aboutcookies.org" target="_blank" className="text-blue-600 hover:underline">www.aboutcookies.org</a>.
                                </p>
                            </section>

                            <div className="pt-8 border-t border-slate-100 dark:border-white/10">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center">
                                    © 2026 Dhanmatrixcapital Platform Inc.
                                </p>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </div>
    )
}
