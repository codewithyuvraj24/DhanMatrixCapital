"use client"
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import confetti from 'canvas-confetti'
import {
    ArrowRight,
    Target,
    ShieldAlert,
    TrendingUp,
    CheckCircle,
    Rocket,
    IndianRupee,
    PieChart,
    User
} from 'lucide-react'

type OnboardingData = {
    goal: string
    amount: string
    risk: 'low' | 'medium' | 'high'
    plan: string
}

const steps = [
    { id: 'welcome', title: 'Welcome' },
    { id: 'goals', title: 'Goals' },
    { id: 'risk', title: 'Risk' },
    { id: 'plan', title: 'Plan' },
    { id: 'finish', title: 'Ready' }
]

export default function OnboardingWizard() {
    const { user } = useAuth()
    const router = useRouter()
    const [currentStep, setCurrentStep] = useState(0)
    const [data, setData] = useState<OnboardingData>({
        goal: 'Retirement',
        amount: '100000',
        risk: 'medium',
        plan: 'growth'
    })

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(c => c + 1)
        } else {
            completeOnboarding()
        }
    }

    const completeOnboarding = () => {
        // Trigger confetti
        const duration = 3000
        const end = Date.now() + duration

        const frame = () => {
            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#2563eb', '#10b981', '#f59e0b']
            })
            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#2563eb', '#10b981', '#f59e0b']
            })

            if (Date.now() < end) {
                requestAnimationFrame(frame)
            } else {
                // Navigate after celebration
                setTimeout(() => router.push('/dashboard'), 1000)
            }
        }
        frame()
    }

    return (
        <div className="w-full max-w-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden relative">

            {/* Progress Bar */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-slate-100 dark:bg-white/5">
                <motion.div
                    className="h-full bg-gradient-to-r from-blue-600 to-indigo-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                />
            </div>

            <div className="p-8 md:p-12">
                <AnimatePresence mode='wait'>

                    {/* Step 1: Welcome */}
                    {currentStep === 0 && (
                        <motion.div
                            key="welcome"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="text-center"
                        >
                            <div className="w-20 h-20 bg-blue-100 dark:bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600 dark:text-blue-400">
                                <Rocket size={40} />
                            </div>
                            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">
                                Welcome to Dhanmatrix, <br /> {user?.displayName || 'Investor'}!
                            </h2>
                            <p className="text-slate-600 dark:text-slate-300 text-lg mb-8 leading-relaxed">
                                Let's customize your investment journey. This will only take about 60 seconds and helps our AI tailor the best strategies for you.
                            </p>
                            <button
                                onClick={nextStep}
                                className="px-8 py-4 bg-blue-600 text-white rounded-xl font-black text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/30 w-full sm:w-auto"
                            >
                                Let's Get Started
                            </button>
                        </motion.div>
                    )}

                    {/* Step 2: Goals */}
                    {currentStep === 1 && (
                        <motion.div
                            key="goals"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                    <Target size={24} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">Investment Goals</h2>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 font-bold">What are you aiming for?</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3">Primary Goal</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {['Wealth Creation', 'Steady Income', 'Retirement', 'Quick Gains'].map(g => (
                                            <button
                                                key={g}
                                                onClick={() => setData({ ...data, goal: g })}
                                                className={`p-4 rounded-xl border-2 font-bold text-sm transition-all ${data.goal === g
                                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300'
                                                    : 'border-slate-200 dark:border-white/10 hover:border-blue-300 dark:hover:border-white/20 text-slate-600 dark:text-slate-300'
                                                    }`}
                                            >
                                                {g}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3">Target Amount (₹)</label>
                                    <div className="relative">
                                        <IndianRupee size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input
                                            type="number"
                                            value={data.amount}
                                            onChange={e => setData({ ...data, amount: e.target.value })}
                                            className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-4 pl-12 pr-4 text-xl font-bold focus:outline-none focus:border-blue-500 text-slate-900 dark:text-white"
                                        />
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <button
                                        onClick={nextStep}
                                        className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-black text-lg hover:opacity-90 transition-all"
                                    >
                                        Continue
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 3: Risk */}
                    {currentStep === 2 && (
                        <motion.div
                            key="risk"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400">
                                    <ShieldAlert size={24} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">Risk Tolerance</h2>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 font-bold">How do you handle volatility?</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {[
                                    { id: 'low', label: 'Conservative', desc: 'Secure, stable growth. Minimal fluctuations.', color: 'emerald' },
                                    { id: 'medium', label: 'Balanced', desc: 'Moderate growth with controlled risk.', color: 'blue' },
                                    { id: 'high', label: 'Aggressive', desc: 'Maximum returns, higher volatility.', color: 'purple' }
                                ].map(r => (
                                    <button
                                        key={r.id}
                                        onClick={() => setData({ ...data, risk: r.id as any })}
                                        className={`w-full p-5 rounded-2xl border-2 text-left transition-all ${data.risk === r.id
                                            ? `border-${r.color}-500 bg-${r.color}-50 dark:bg-${r.color}-500/10`
                                            : 'border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5'
                                            }`}
                                    >
                                        <div className="flex justify-between items-center mb-1">
                                            <span className={`font-black text-lg ${data.risk === r.id ? `text-${r.color}-700 dark:text-${r.color}-400` : 'text-slate-900 dark:text-white'
                                                }`}>
                                                {r.label}
                                            </span>
                                            {data.risk === r.id && <CheckCircle size={20} className={`text-${r.color}-600`} />}
                                        </div>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">{r.desc}</p>
                                    </button>
                                ))}

                                <div className="pt-4">
                                    <button
                                        onClick={nextStep}
                                        className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-black text-lg hover:opacity-90 transition-all"
                                    >
                                        Next Step
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 4: Plan Selection */}
                    {currentStep === 3 && (
                        <motion.div
                            key="plan"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
                                    <PieChart size={24} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">Recommended Strategy</h2>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 font-bold">Based on your risk profile</p>
                                </div>
                            </div>

                            <div className="p-6 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl text-white mb-8 shadow-xl shadow-blue-500/30 relative overflow-hidden">
                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest">Best Match</span>
                                            <h3 className="text-3xl font-black mt-2">Growth Plan</h3>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-3xl font-bold">15%</p>
                                            <p className="text-xs opacity-80 uppercase font-bold">Exp. ROI</p>
                                        </div>
                                    </div>
                                    <ul className="space-y-2 mb-6 text-sm font-medium opacity-90">
                                        <li className="flex items-center gap-2"><CheckCircle size={14} className="text-emerald-300" /> Capital Protection</li>
                                        <li className="flex items-center gap-2"><CheckCircle size={14} className="text-emerald-300" /> Monthly Withdrawals</li>
                                        <li className="flex items-center gap-2"><CheckCircle size={14} className="text-emerald-300" /> Tax Free Returns</li>
                                    </ul>
                                    <p className="text-xs opacity-70 italic border-t border-white/10 pt-4">
                                        "This plan fits your balanced risk profile and long-term wealth creation goal."
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={nextStep}
                                className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-black text-lg hover:opacity-90 transition-all"
                            >
                                Confirm Selection
                            </button>
                        </motion.div>
                    )}

                    {/* Step 5: Completion */}
                    {currentStep === 4 && (
                        <motion.div
                            key="finish"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-8"
                        >
                            <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600 dark:text-emerald-400">
                                <CheckCircle size={48} />
                            </div>
                            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">
                                You're All Set!
                            </h2>
                            <p className="text-slate-600 dark:text-slate-300 text-lg mb-8 leading-relaxed">
                                Your profile has been optimized. We are redirecting you to your personalized dashboard now.
                            </p>
                            <div className="inline-flex items-center gap-2 text-sm text-slate-400 font-bold uppercase tracking-widest animate-pulse">
                                Redirecting <ArrowRight size={14} />
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    )
}
