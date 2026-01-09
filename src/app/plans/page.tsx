"use client"
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/Animations'
import { Check, AlertTriangle, TrendingUp, Shield, Zap, Crown, Lock } from 'lucide-react'
import Link from 'next/link'
import { InvestmentProductSchema } from '@/components/seo/StructuredData'

const plans = [
  {
    id: 1,
    name: 'Growth Plan',
    minInvestment: '₹25,000',
    annualReturn: '5-9%',
    term: 'Flexible',
    description: 'A balanced approach for steady growth with the flexibility to withdraw your money whenever you need it.',
    features: [
      "Withdraw money anytime",
      "Process within 24 hours",
      "100% Tax-free returns",
      "Real-time tracking",
      "Smart risk management",
      "Priority help & support"
    ],
    icon: <TrendingUp className="text-blue-500" size={32} />,
    popular: true
  }
]

export default function Plans() {
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null)

  return (
    <div className="min-h-screen pt-24 pb-20 bg-slate-50 dark:bg-[#050505] transition-colors duration-500">
      <div className="max-w-[1920px] mx-auto px-4 lg:px-12 2xl:px-16">
        {plans.map(plan => (
          <InvestmentProductSchema
            key={plan.id}
            name={plan.name}
            description={plan.description}
            minInvestment={plan.minInvestment}
            expectedReturn={plan.annualReturn}
          />
        ))}

        {/* Hero Section with Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20 lg:mb-32">
          <FadeIn>
            <div className="text-left max-w-4xl">
              <h1 className="text-4xl sm:text-7xl font-black mb-8 text-slate-900 dark:text-white leading-[1.1] tracking-tighter">
                Investment <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Growth Plans.</span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 font-medium mb-10 max-w-2xl leading-relaxed">
                Choose the right plan to grow your wealth with crystal clear transparency and proven results.
              </p>

              {/* Trust Strip */}
              <div className="flex flex-wrap gap-4 sm:gap-8">
                {[
                  { icon: Shield, text: "SEBI Compliant" },
                  { icon: TrendingUp, text: "Transparent Returns" },
                  { icon: Check, text: "Expert Managed" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-white/5 rounded-full border border-slate-200 dark:border-white/10 shadow-sm">
                    <item.icon size={16} className="text-blue-600 dark:text-blue-400" strokeWidth={3} />
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Visual Element (Right Side) */}
          <FadeIn delay={0.2} className="hidden lg:block relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-blue-600/5 blur-[100px] rounded-full pointer-events-none"></div>
            <div className="relative z-10 grid grid-cols-2 gap-6 opacity-80">
              <div className="space-y-6 mt-12">
                <div className="p-6 bg-white dark:bg-white/5 backdrop-blur-md rounded-3xl border border-slate-100 dark:border-white/10 shadow-xl">
                  <div className="h-2 w-12 bg-blue-600 rounded-full mb-4"></div>
                  <div className="h-20 w-full bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-900/20 rounded-xl relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-blue-600/10 dark:bg-blue-400/10 skew-y-6 origin-bottom-left"></div>
                  </div>
                </div>
                <div className="p-6 bg-white dark:bg-white/5 backdrop-blur-md rounded-3xl border border-slate-100 dark:border-white/10 shadow-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500"><TrendingUp size={16} /></div>
                    <div className="text-sm font-bold dark:text-white">+14.2%</div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="p-6 bg-white dark:bg-white/5 backdrop-blur-md rounded-3xl border border-slate-100 dark:border-white/10 shadow-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500"><Shield size={16} /></div>
                    <div className="text-sm font-bold dark:text-white">Secure</div>
                  </div>
                  <div className="h-2 w-20 bg-slate-100 dark:bg-white/10 rounded-full"></div>
                </div>
                <div className="p-6 bg-white dark:bg-white/5 backdrop-blur-md rounded-3xl border border-slate-100 dark:border-white/10 shadow-xl h-48">
                  <div className="flex flex-col justify-between h-full">
                    <div className="h-2 w-12 bg-indigo-500 rounded-full"></div>
                    <div className="flex gap-1 items-end h-24">
                      <div className="flex-1 bg-indigo-500/20 rounded-t-lg h-[40%]"></div>
                      <div className="flex-1 bg-indigo-500/40 rounded-t-lg h-[60%]"></div>
                      <div className="flex-1 bg-indigo-500/60 rounded-t-lg h-[80%]"></div>
                      <div className="flex-1 bg-indigo-500 rounded-t-lg h-[100%] shadow-[0_0_15px_rgba(99,102,241,0.5)]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        <StaggerContainer>
          <div className="max-w-xl mx-auto mb-16 relative">
            {/* Security Badge Absolute */}
            {/* Removed absolute center badge for cleaner grid layout, replaced with inline Trust Strip above */}

            {plans.map((plan, idx) => (
              <StaggerItem key={plan.id}>
                <motion.div
                  className={`h-full border rounded-[2.5rem] p-8 sm:p-10 cursor-pointer transition-all duration-300 relative overflow-hidden group shadow-lg hover:shadow-2xl hover:-translate-y-2 ${selectedPlan === plan.id
                    ? 'border-blue-600 bg-white dark:bg-white/10 ring-2 ring-blue-600 ring-offset-4 dark:ring-offset-black'
                    : 'border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-md hover:border-blue-500/50'
                    }`}
                  onClick={() => setSelectedPlan(selectedPlan === plan.id ? null : plan.id)}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 px-6 py-2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-bl-2xl">
                      Most Popular
                    </div>
                  )}

                  <div className="flex justify-between items-start mb-8 mt-2">
                    <div className={`p-4 rounded-2xl shadow-xl shadow-black/5 group-hover:scale-110 transition-transform duration-500 ${plan.popular ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-slate-50 dark:bg-slate-800'}`}>
                      {plan.icon}
                    </div>
                  </div>

                  <h3 className="text-2xl font-black mb-6 dark:text-white tracking-tight">{plan.name}</h3>
                  <div className="mb-8 p-6 bg-slate-50 dark:bg-black/20 rounded-2xl border border-slate-100 dark:border-white/5">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-5xl sm:text-6xl font-black text-blue-600 dark:text-blue-500 tracking-tighter">{plan.annualReturn}</span>
                      <span className="text-lg font-bold text-slate-400 uppercase tracking-tight">Returns</span>
                    </div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                      <AlertTriangle size={10} /> Historical Range • Past perf. not guaranteed
                    </div>
                  </div>

                  <div className="space-y-5 mb-10">
                    <div className="flex justify-between items-center py-3 border-b border-slate-100 dark:border-white/5">
                      <span className="text-xs font-black uppercase tracking-wider text-slate-500">Min Investment</span>
                      <span className="font-bold text-xl text-slate-900 dark:text-white">{plan.minInvestment}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-slate-100 dark:border-white/5">
                      <span className="text-xs font-black uppercase tracking-wider text-slate-500">Lock-in Period</span>
                      <span className="font-bold text-xl text-slate-900 dark:text-white">{plan.term}</span>
                    </div>
                  </div>

                  <button
                    className={`w-full py-4 rounded-xl font-black text-base flex items-center justify-center gap-2 transition-all duration-300 ${selectedPlan === plan.id
                      ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/30'
                      : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-white hover:shadow-lg'}`}
                  >
                    {selectedPlan === plan.id ? 'Plan Selected' : 'Start Investing'}
                    {selectedPlan !== plan.id && <TrendingUp size={16} />}
                  </button>
                </motion.div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>

        <AnimatePresence>
          {selectedPlan && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 48 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="overflow-hidden px-4 sm:px-0"
            >
              <div className="bg-white/60 dark:bg-white/5 backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-[2.5rem] p-8 lg:p-16 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] pointer-events-none"></div>
                <div className="flex flex-col lg:flex-row gap-16 items-start relative z-10">
                  <div className="flex-1">
                    <div className="flex items-center gap-6 mb-10">
                      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-xl text-blue-600 dark:text-blue-400">
                        {plans.find(p => p.id === selectedPlan)?.icon}
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-1">Selected Plan</div>
                        <h2 className="text-4xl sm:text-5xl font-black dark:text-white tracking-tighter">
                          {plans.find(p => p.id === selectedPlan)?.name}
                        </h2>
                      </div>
                    </div>
                    <p className="text-xl text-slate-600 dark:text-slate-300 font-medium leading-relaxed mb-12 max-w-2xl">
                      {plans.find(p => p.id === selectedPlan)?.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                      <Link href="/register" className="w-full sm:w-auto px-12 py-5 bg-blue-600 text-white rounded-2xl font-black text-lg hover:bg-blue-700 transition shadow-xl shadow-blue-500/30 active:scale-95 flex items-center justify-center">
                        Confirm & Invest
                      </Link>
                      <Link href="/contact" className="w-full sm:w-auto px-12 py-5 bg-white dark:bg-white/10 text-slate-700 dark:text-white border border-slate-200 dark:border-white/10 rounded-2xl font-black text-lg hover:bg-slate-50 dark:hover:bg-white/20 transition active:scale-95 flex items-center justify-center">
                        Talk to Advisor
                      </Link>
                    </div>
                  </div>

                  <div className="w-full lg:w-2/5 bg-slate-900/5 dark:bg-black/20 rounded-[2rem] p-8 sm:p-12 border border-slate-100 dark:border-white/5">
                    <h3 className="font-black text-xl mb-8 dark:text-white flex items-center gap-3 tracking-tight">
                      <Zap size={24} className="text-amber-500" /> Plan Benefits
                    </h3>
                    <ul className="space-y-5">
                      {plans.find(p => p.id === selectedPlan)?.features.map((feature, idx) => (
                        <motion.li
                          key={idx}
                          className="flex items-center gap-4"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                        >
                          <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                            <Check className="text-emerald-500" size={14} strokeWidth={4} />
                          </div>
                          <span className="text-slate-700 dark:text-slate-300 font-bold text-base">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    <div className="mt-12 pt-8 border-t border-slate-200 dark:border-white/10">
                      <div className="flex items-center gap-2 text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] text-blue-600/60 dark:text-blue-400/60">
                        <Lock size={12} strokeWidth={3} />
                        <span>Highly Secure • SEBI Regulated</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-16 pt-8 border-t border-slate-200 dark:border-white/10">
                  <div className="flex gap-4 p-6 bg-amber-500/5 dark:bg-amber-500/10 rounded-2xl border border-amber-500/20">
                    <AlertTriangle size={24} className="text-amber-500 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm font-black text-amber-700 dark:text-amber-500 uppercase tracking-widest mb-1">Risk Disclosure</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                        Past performance does not guarantee future results. Investments are subject to market conditions. Please read all scheme related documents carefully.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
