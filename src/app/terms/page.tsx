import { FadeIn } from '@/components/ui/Animations'
import { Scale, FileSignature, AlertCircle, Gavel, CheckCircle2 } from 'lucide-react'

export const metadata = {
    title: 'Terms of Engagement | Dhanmatrixcapital',
    description: 'Terms of Service for Dhanmatrixcapital Platform.',
}

export default function TermsPage() {
    return (
        <div className="relative min-h-screen pt-32 pb-20 px-4 overflow-hidden">
            {/* Background FX - Amber/Gold tint for legal */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 pointer-events-none"></div>

            <FadeIn>
                <div className="max-w-4xl mx-auto relative z-10">

                    {/* Header Section */}
                    <div className="text-center mb-16 space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-200 dark:bg-white/10 border border-slate-300 dark:border-white/20 text-slate-700 dark:text-slate-300 font-black text-[10px] uppercase tracking-[0.2em] backdrop-blur-sm">
                            <Scale size={14} />
                            <span>Legal Document: TOS_Contract_v3</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter">
                            Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600">Engagement</span>
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400 font-medium max-w-2xl mx-auto">
                            This digital agreement governs your access. Please review your obligations carefully.
                        </p>
                    </div>
                    {/* Main Contract Container */}
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-[2.5rem] opacity-20 blur-xl group-hover:opacity-40 transition duration-1000"></div>

                        <div className="relative bg-white/80 dark:bg-black/40 backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-[2rem] p-8 md:p-12 overflow-hidden shadow-2xl">

                            {/* Contract Header */}
                            <div className="flex justify-between items-start border-b border-slate-200 dark:border-white/10 pb-8 mb-12">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-slate-900 dark:bg-white/10 rounded-2xl flex items-center justify-center text-slate-900 dark:text-white">
                                        <Gavel size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-black text-slate-900 dark:text-white">Master Service Agreement</h3>
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Effective Date: Jan 1, 2025</p>
                                    </div>
                                </div>
                            </div>

                            {/* Clauses Grid */}
                            <div className="space-y-12">

                                {/* Clause 1: Risk */}
                                <div className="p-6 rounded-2xl bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-500/10">
                                    <h3 className="text-lg font-black text-amber-900 dark:text-amber-400 mb-4 flex items-center gap-2 uppercase tracking-wide">
                                        <AlertCircle size={20} />
                                        01. Risk Disclosure
                                    </h3>
                                    <p className="text-amber-800/80 dark:text-amber-200/60 leading-relaxed font-medium">
                                        Investment in securities market are subject to market risks. Read all scheme related documents carefully. Past performance is not indicative of future returns. By using this platform, you acknowledge that capital is at risk and returns are not guaranteed.
                                    </p>
                                </div>

                                {/* Clause 2: Account Security */}
                                <div className="pl-6 border-l-2 border-slate-200 dark:border-slate-800">
                                    <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4">02. Account Liability</h3>
                                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                                        You are the sole custodian of your access credentials. Dhanmatrixcapital is not liable for unauthorized access resulting from your failure to secure your device or credentials.
                                    </p>
                                    <ul className="space-y-2">
                                        <li className="flex items-center gap-2 text-sm font-bold text-slate-500">
                                            <CheckCircle2 size={16} className="text-green-500" />
                                            <span>Two-Factor Authentication Encouraged</span>
                                        </li>
                                        <li className="flex items-center gap-2 text-sm font-bold text-slate-500">
                                            <CheckCircle2 size={16} className="text-green-500" />
                                            <span>Immediate Breach Reporting Required</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Clause 3: Termination */}
                                <div className="pl-6 border-l-2 border-slate-200 dark:border-slate-800">
                                    <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4">03. Termination of Service</h3>
                                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                        We reserve the right to suspend or terminate accounts found to be engaging in fraudulent activity, money laundering, or violation of SEBI regulations, without prior notice.
                                    </p>
                                </div>

                            </div>

                            {/* Digital Signature Footer */}
                            <div className="mt-16 bg-slate-50 dark:bg-white/5 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-100 dark:border-white/5">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-white dark:bg-black rounded-lg border border-slate-200 dark:border-white/10">
                                        <FileSignature className="text-blue-600" size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black uppercase text-slate-400 tracking-widest">Digital Acceptance</p>
                                        <p className="text-sm font-bold text-slate-700 dark:text-slate-300">By continuing, you agree to these terms.</p>
                                    </div>
                                </div>
                                <div className="px-6 py-2 bg-slate-200 dark:bg-white/10 rounded text-xs font-mono text-slate-500 dark:text-slate-400">
                                    SIGNATURE_HASH: 0x7F...3A
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </FadeIn>
        </div>
    )
}
