import { FadeIn } from '@/components/ui/Animations'
import { ShieldCheck, Lock, Eye, FileText, Server, AlertTriangle } from 'lucide-react'

export const metadata = {
    title: 'Privacy Protocols | Dhanmatrixcapital',
    description: 'Privacy Policy for Dhanmatrixcapital - How we handle your data.',
}

export default function PrivacyPage() {
    return (
        <div className="relative min-h-screen pt-32 pb-20 px-4 overflow-hidden">
            {/* Background FX */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 pointer-events-none"></div>

            <FadeIn>
                <div className="max-w-4xl mx-auto relative z-10">

                    {/* Header Section */}
                    <div className="text-center mb-16 space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-black text-[10px] uppercase tracking-[0.2em] backdrop-blur-sm">
                            <ShieldCheck size={14} />
                            <span>Protocol: Matrix_Encryption_v9.0</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter">
                            Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-lime-500">Core</span>
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400 font-medium max-w-2xl mx-auto">
                            Institutional-grade integrity. Your data is secured within our encrypted neural network.
                        </p>
                    </div>

                    {/* Main Document Container */}
                    <div className="relative group">
                        {/* Glowing border effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-lime-600 rounded-[2.5rem] opacity-20 blur-xl group-hover:opacity-40 transition duration-1000"></div>

                        <div className="relative bg-white/80 dark:bg-black/80 backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-[2rem] p-8 md:p-12 overflow-hidden shadow-2xl">

                            {/* Document Header Line */}
                            <div className="flex justify-between items-start border-b border-slate-200 dark:border-white/10 pb-8 mb-12">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500">
                                        <Lock size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-black text-slate-900 dark:text-white">DMC Data Fortress</h3>
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Status: Active & Encrypted</p>
                                    </div>
                                </div>
                                <div className="hidden md:block text-right">
                                    <p className="text-xs font-mono text-slate-400">DOC_ID: 884-21-X</p>
                                    <p className="text-xs font-mono text-slate-400">LAST_AUDIT: JAN 2025</p>
                                </div>
                            </div>

                            {/* Content Grid */}
                            <div className="grid gap-12">

                                {/* Section 1 */}
                                <section className="flex gap-6">
                                    <div className="shrink-0 mt-1">
                                        <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 font-black text-xs">01</div>
                                    </div>
                                    <div className="space-y-4">
                                        <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                                            Data Collection Principles
                                            <FileText size={18} className="text-slate-400" />
                                        </h2>
                                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                            We adhere to a strict <span className="font-bold text-slate-900 dark:text-white">"Need-to-Know"</span> architecture. We only collect data essential for:
                                        </p>
                                        <ul className="grid sm:grid-cols-2 gap-3">
                                            {['Regulatory Compliance (SEBI)', 'Account Security & Auth', 'Portfolio Analytics', 'Transaction Processing'].map(item => (
                                                <li key={item} className="flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-white/5 p-3 rounded-lg">
                                                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </section>

                                {/* Section 2 */}
                                <section className="flex gap-6">
                                    <div className="shrink-0 mt-1">
                                        <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400 font-black text-xs">02</div>
                                    </div>
                                    <div className="space-y-4">
                                        <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                                            Zero-Knowledge Sharing
                                            <Eye size={18} className="text-slate-400" />
                                        </h2>
                                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                            Your financialDNA is yours alone. We do <span className="font-bold text-red-500">NOT</span> sell, rent, or monetize your personal data to third-party advertisers. Data is shared strictly for:
                                        </p>
                                        <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-xl border-l-4 border-purple-500 text-sm font-medium text-slate-600 dark:text-slate-400 italic">
                                            "Legal Compliance orders, secure payment gateway processing, and essential operational services."
                                        </div>
                                    </div>
                                </section>

                                {/* Section 3 */}
                                <section className="flex gap-6">
                                    <div className="shrink-0 mt-1">
                                        <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-black text-xs">03</div>
                                    </div>
                                    <div className="space-y-4">
                                        <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                                            Bank-Grade Encryption
                                            <Server size={18} className="text-slate-400" />
                                        </h2>
                                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                            All data in transit and at rest is secured using **AES-256 bit encryption**. Our infrastructure is continuously monitored for integrity breaches.
                                        </p>
                                        <div className="flex flex-wrap gap-4 mt-4">
                                            <span className="px-4 py-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase tracking-wider rounded-lg border border-emerald-500/20 flex items-center gap-2">
                                                <ShieldCheck size={14} /> ISO 27001 Certified
                                            </span>
                                            <span className="px-4 py-2 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-wider rounded-lg border border-blue-500/20 flex items-center gap-2">
                                                <Lock size={14} /> TLS 1.3 Protocol
                                            </span>
                                        </div>
                                    </div>
                                </section>

                            </div>

                            {/* Footer Stamp */}
                            <div className="mt-16 pt-8 border-t border-slate-200 dark:border-white/10 flex items-center justify-between opacity-50">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">System Secure</span>
                                </div>
                                <AlertTriangle className="text-slate-300 dark:text-slate-600" size={24} />
                            </div>

                        </div>
                    </div>

                </div>
            </FadeIn>
        </div>
    )
}
