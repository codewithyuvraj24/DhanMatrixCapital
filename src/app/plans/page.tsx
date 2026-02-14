"use client"
import { useState } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/Animations'
import { Check, AlertTriangle, TrendingUp, Shield, Zap, Crown, Lock } from 'lucide-react'
import Link from 'next/link'
import { InvestmentProductSchema } from '@/components/seo/StructuredData'

const plans = [
  {
    id: 1,
    name: 'Silver Plan',
    minInvestment: '₹25,000 - ₹75,000',
    annualReturn: '5%',
    term: 'Flexible',
    description: 'Perfect for getting started. A balanced approach for steady growth with complete flexibility.',
    features: [
      "Withdraw money anytime",
      "Process within 24 hours",
      "100% Tax-free returns",
      "Real-time tracking",
      "Smart risk management",
      "Standard support"
    ],
    icon: Shield,
    iconColor: "text-slate-400",
    popular: false
  },
  {
    id: 2,
    name: 'Gold Plan',
    minInvestment: '₹75,000 - ₹1,25,000',
    annualReturn: '5.7%',
    term: 'Flexible',
    description: 'Our most popular choice. Enhanced returns for serious investors looking for optimal growth.',
    features: [
      "Withdraw money anytime",
      "Process within 24 hours",
      "100% Tax-free returns",
      "Real-time tracking",
      "Priority risk management",
      "Priority help & support"
    ],
    icon: Zap,
    iconColor: "text-amber-500",
    popular: true
  },
  {
    id: 3,
    name: 'Platinum Plan',
    minInvestment: '₹1,25,000 - ₹2,50,000',
    annualReturn: '6.2%',
    term: 'Flexible',
    description: 'Maximum returns for high-value investments. Premium service and exclusive benefits.',
    features: [
      "Withdraw money anytime",
      "Instant processing",
      "100% Tax-free returns",
      "Real-time tracking",
      "Advanced risk strategies",
      "Dedicated Relationship Manager"
    ],
    icon: Crown,
    iconColor: "text-blue-500",
    popular: false,
    premium: true
  }
]

export default function Plans() {
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null)

  return (
    <div className="min-h-screen pt-20 lg:pt-24 pb-12 bg-slate-50 dark:bg-[#050505] transition-colors duration-500">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16 lg:mb-32">
          <FadeIn>
            <div className="text-left max-w-4xl">
              <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-black mb-3 text-slate-900 dark:text-white leading-[1.1] tracking-tighter">
                Choose Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Investment Plan</span>
              </h1>
              <p className="text-sm sm:text-xl text-slate-500 dark:text-slate-400 font-medium mb-6 max-w-2xl leading-relaxed">
                Flexible plans based on your investment amount. Higher commitment, better returns.
              </p>

              {/* Trust Strip */}
              {/* Trust Strip - Horizontal Scroll on Mobile */}
              <div className="flex overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap gap-3 pb-2 sm:pb-0">
                {[
                  { icon: Shield, text: "SEBI Compliant" },
                  { icon: TrendingUp, text: "Transparent Returns" },
                  { icon: Check, text: "Expert Managed" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 px-2.5 py-1 bg-white dark:bg-white/5 rounded-full border border-slate-200 dark:border-white/10 shadow-sm shrink-0">
                    <item.icon size={11} className="text-blue-600 dark:text-blue-400" strokeWidth={3} />
                    <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest whitespace-nowrap">{item.text}</span>
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
          <div className="max-w-7xl mx-auto mb-16 grid grid-cols-1 lg:grid-cols-3 gap-6 relative px-4 sm:px-0">
            {/* Security Badge Absolute */}
            {/* Removed absolute center badge for cleaner grid layout, replaced with inline Trust Strip above */}

            {plans.map((plan, idx) => (
              <StaggerItem key={plan.id}>
                <m.div
                  className={`h-full border rounded-2xl p-4 sm:p-10 cursor-pointer transition-all duration-300 relative overflow-hidden group shadow-lg hover:shadow-2xl hover:-translate-y-2 ${selectedPlan === plan.id
                    ? 'border-blue-600 bg-white dark:bg-white/10 ring-2 ring-blue-600 ring-offset-2 dark:ring-offset-black'
                    : plan.premium
                      ? 'border-indigo-500/30 bg-gradient-to-b from-white/80 to-indigo-50/50 dark:from-white/5 dark:to-indigo-500/10 backdrop-blur-md hover:border-indigo-500/50 hover:shadow-indigo-500/20'
                      : 'border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-md hover:border-blue-500/50'
                    }`}
                  onClick={() => setSelectedPlan(selectedPlan === plan.id ? null : plan.id)}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 px-6 py-2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-bl-2xl z-10">
                      Most Popular
                    </div>
                  )}

                  <div className="flex justify-between items-start mb-6 mt-2">
                    <div className={`p-3.5 rounded-2xl shadow-xl shadow-black/5 group-hover:scale-110 transition-transform duration-500 ${plan.popular ? 'bg-blue-50 dark:bg-blue-900/20' : plan.premium ? 'bg-indigo-50 dark:bg-indigo-900/20' : 'bg-slate-50 dark:bg-slate-800'}`}>
                      <plan.icon size={24} className={plan.iconColor} />
                    </div>
                  </div>

                  <h3 className="font-heading text-lg font-black mb-3 dark:text-white tracking-tight">{plan.name}</h3>
                  <div className="mb-4 p-3 bg-slate-50/50 dark:bg-black/20 rounded-2xl border border-slate-100 dark:border-white/5">
                    <div className="flex items-baseline gap-2 mb-1.5">
                      <span className="text-4xl sm:text-5xl font-black text-blue-600 dark:text-blue-500 tracking-tighter">{plan.annualReturn}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight opacity-70">Returns / Mo</span>
                    </div>
                    <div className="text-[8px] font-bold text-slate-400/60 uppercase tracking-widest flex items-center gap-1">
                      <AlertTriangle size={8} /> Returns are indicative
                    </div>
                  </div>

                  <div className="space-y-1 mb-5">
                    <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-white/5">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Invested Amount</span>
                      <span className="font-bold text-sm text-slate-900 dark:text-white">{plan.minInvestment}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-white/5">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Lock-in Period</span>
                      <span className="font-bold text-sm text-slate-900 dark:text-white">{plan.term}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button
                      className={`w-full py-3.5 sm:py-4 rounded-xl font-black text-sm sm:text-base flex items-center justify-center gap-2 transition-all duration-300 ${selectedPlan === plan.id
                        ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/30'
                        : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white dark:hover:text-white hover:shadow-lg'}`}
                    >
                      {selectedPlan === plan.id ? 'Plan Selected' : 'Invest Now'}
                      {selectedPlan !== plan.id && <TrendingUp size={14} />}
                    </button>
                    <p className="text-[9px] font-bold text-slate-400/60 text-center uppercase tracking-widest leading-none">No hidden charges • Secure</p>
                  </div>
                </m.div>
              </StaggerItem>
            ))}
          </div>

          <div className="text-center mt-12 mb-16 px-4">
            <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest">
              Returns are indicative and subject to market conditions.
            </p>
          </div>
        </StaggerContainer>

        <AnimatePresence>
          {selectedPlan && (
            <m.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 32 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="overflow-hidden px-4 sm:px-0"
            >
              <div className="bg-white/60 dark:bg-white/5 backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-3xl p-6 lg:p-16 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] pointer-events-none"></div>
                <div className="flex flex-col lg:flex-row gap-16 items-start relative z-10">
                  <div className="flex-1">
                    <div className="flex items-center gap-6 mb-10">
                      <div className="bg-blue-600 dark:bg-blue-600/90 rounded-2xl p-4 shadow-xl shadow-blue-500/10 text-white">
                        {(() => {
                          const PlanIcon = plans.find(p => p.id === selectedPlan)?.icon
                          return PlanIcon ? <PlanIcon size={32} className="text-white" /> : null
                        })()}
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-1">Selected Plan</div>
                        <h2 className="font-heading text-4xl sm:text-5xl font-black dark:text-white tracking-tighter">
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
                        <m.li
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
                        </m.li>
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
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
