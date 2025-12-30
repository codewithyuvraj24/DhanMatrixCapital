"use client"
import Link from "next/link"

export default function CallToAction() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-600"></div>
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
            <div className="max-w-5xl mx-auto px-4 relative z-10 text-center text-white">
                <h2 className="text-4xl md:text-6xl font-black mb-10 leading-tight">Ready to Take Control of Your <br />Wealth Journey?</h2>
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <Link href="/register" className="px-12 py-5 bg-white text-blue-600 rounded-2xl font-black text-xl hover:bg-slate-100 transition-all shadow-2xl active:scale-95">
                        Create Free Account
                    </Link>
                    <Link href="/plans" className="px-12 py-5 bg-blue-700 text-white border border-blue-500 rounded-2xl font-black text-xl hover:bg-blue-800 transition-all active:scale-95 text-center">
                        Compare Plans
                    </Link>
                </div>
                <p className="mt-12 text-blue-200 font-medium italic">"Join 14+ smart investors today."</p>
            </div>
        </section>
    )
}
