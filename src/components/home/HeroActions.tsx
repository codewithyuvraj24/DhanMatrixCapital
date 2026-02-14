"use client"

import { useAuth } from "@/context/AuthContext"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function HeroActions() {
    const { user } = useAuth()

    return (
        <div className="flex flex-col sm:flex-row items-center gap-3 justify-start pt-2">
            <Link href={user ? "/dashboard" : "/register"} className="w-full sm:w-auto px-6 py-3.5 bg-blue-600 dark:bg-blue-600 text-white rounded-xl font-black text-base sm:text-lg hover:bg-blue-700 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 transition-all flex items-center justify-center gap-3">
                {user ? 'Launch Terminal' : 'Start Growing Wealth'}
                <ArrowRight size={18} strokeWidth={3} />
            </Link>
            <Link href="/plans" className="w-full sm:w-auto px-6 py-3.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-white rounded-xl font-bold text-base sm:text-lg hover:bg-slate-50 dark:hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                See Plans
            </Link>
        </div>
    )
}
