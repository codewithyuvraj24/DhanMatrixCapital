"use client"
import Link from "next/link"
import { Lock } from "lucide-react"
import { memo } from "react"

function CallToAction() {
    return (
        <section className="py-24 sm:py-32 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-indigo-900"></div>
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
            <div className="max-w-5xl mx-auto px-4 relative z-10 text-center text-white">
                <h2 className="font-heading text-4xl sm:text-7xl font-black mb-12 leading-[1] tracking-tighter">Ready to Start Your <br /> Wealth Journey?</h2>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
                    <Link href="/register" className="w-full sm:w-auto px-12 py-5 bg-white text-blue-600 rounded-2xl font-black text-lg sm:text-xl hover:bg-slate-50 transition-all shadow-[0_20px_50px_rgba(255,255,255,0.2)] active:scale-95 flex items-center justify-center">
                        Create Free Account
                    </Link>
                    <Link href="/plans" className="w-full sm:w-auto px-12 py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-2xl font-black text-lg sm:text-xl hover:bg-white/20 transition-all active:scale-95 text-center flex items-center justify-center">
                        View Models
                    </Link>
                </div>

                <div className="mt-12 flex flex-col items-center gap-3">
                    <div className="flex items-center gap-2 text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] text-blue-200">
                        <Lock size={12} strokeWidth={3} />
                        <span>Secure login • Your data stays private</span>
                    </div>
                    <p className="text-blue-100/60 font-medium italic text-sm">Join 14+ high-net-worth investors.</p>
                </div>
            </div>
        </section>
    )
}

export default memo(CallToAction)
