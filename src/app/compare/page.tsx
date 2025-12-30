"use client"
import PlanComparison from '@/components/features/PlanComparison'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function ComparePage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#050505] transition-colors duration-500 pt-32 pb-20">
            <div className="max-w-[1600px] mx-auto px-4 lg:px-12">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors mb-8 font-bold text-sm uppercase tracking-widest">
                        <ArrowLeft size={16} /> Back to Home
                    </Link>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6">
                        Compare Investment <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Strategies</span>
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400">
                        Find the perfect wealth building engine for your financial goals. All plans include 24/7 AI monitoring and zero hidden fees.
                    </p>
                </motion.div>

                {/* Comparison Tool */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <PlanComparison />
                </motion.div>

            </div>
        </div>
    )
}
