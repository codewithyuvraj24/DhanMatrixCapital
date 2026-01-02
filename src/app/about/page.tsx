"use client"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/Animations"
import { Target, Users, Shield, TrendingUp, Award, Check, Briefcase, Zap, Lock, Landmark } from "lucide-react"
import Link from "next/link"

export default function About() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#050505] transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="text-center max-w-4xl mx-auto mb-20 sm:mb-32">
            <h1 className="text-4xl sm:text-7xl font-black mb-8 text-slate-900 dark:text-white leading-[1.1] tracking-tighter">
              Simple, Smart <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Wealth Management.</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
              We help you grow your wealth with professional strategies and easy-to-use tools.
            </p>
          </div>
        </FadeIn>

        <section className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn delay={0.2}>
              <div className="relative group">
                <div className="absolute inset-0 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
                <div className="relative z-10 bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 p-8 sm:p-12 rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] hover:border-blue-500/50 transition-all duration-500">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6">
                    <Lock size={12} strokeWidth={3} />
                    Your Security
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-black mb-6 dark:text-white tracking-tight">
                    Our Mission
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-8 text-lg font-medium">
                    To build a transparent and easy-to-use platform where your money works harder for you. We simplify complex market data into clear opportunities for growth.
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {['Complete Safety', 'No Hidden Fees', 'Automatic Execution', '24/7 Support'].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-400 font-bold text-sm">
                        <div className="p-1 rounded-full bg-emerald-500/10 text-emerald-500">
                          <Check size={14} strokeWidth={4} />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="space-y-12">
                <div>
                  <h3 className="text-3xl sm:text-5xl font-black mb-6 text-slate-900 dark:text-white tracking-tight">Built for <br />You.</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-medium">
                    Dhanmatrixcapital started with a simple goal: making professional-level wealth management tools available to everyone. We've built a team of experts dedicated to your financial success.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 sm:gap-8">
                  <div className="p-8 bg-white/40 dark:bg-white/5 backdrop-blur-md rounded-[2rem] border border-slate-100 dark:border-white/10 shadow-xl shadow-black/5 group hover:border-blue-500/50 transition-all duration-500">
                    <Users className="text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform" size={40} />
                    <div className="font-black text-3xl sm:text-4xl dark:text-white mb-1">112+</div>
                    <div className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-widest">Happy Investors</div>
                  </div>
                  <div className="p-8 bg-white/40 dark:bg-white/5 backdrop-blur-md rounded-[2rem] border border-slate-100 dark:border-white/10 shadow-xl shadow-black/5 group hover:border-blue-500/50 transition-all duration-500">
                    <Briefcase className="text-indigo-600 dark:text-indigo-400 mb-4 group-hover:scale-110 transition-transform" size={40} />
                    <div className="font-black text-3xl sm:text-4xl dark:text-white mb-1">1.3M+</div>
                    <div className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-widest">Assets Managed</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        <section className="mb-24 sm:mb-32">
          <div className="text-center mb-16 sm:mb-24">
            <h2 className="text-4xl sm:text-6xl font-black mb-6 dark:text-white tracking-tighter">Our <span className="text-blue-600">Values.</span></h2>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 font-medium">The principles that guide every decision we make.</p>
          </div>
          <StaggerContainer>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
              {[
                { icon: <Shield className="text-blue-600 dark:text-blue-400" />, title: "Transparency", desc: "Clearly showing you where your money goes and how it grows." },
                { icon: <Zap className="text-amber-500" />, title: "Innovation", desc: "Using smart technology to stay ahead of market trends." },
                { icon: <Users className="text-indigo-600 dark:text-indigo-400" />, title: "Personal Focus", desc: "Your financial growth is our only measure of success." },
                { icon: <Award className="text-emerald-500" />, title: "Excellence", desc: "Aiming for consistent returns with smart risk management." }
              ].map((val, idx) => (
                <StaggerItem key={idx}>
                  <div className="h-full p-8 sm:p-10 bg-white/40 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[2rem] hover:border-blue-500/50 transition-all duration-500 group relative overflow-hidden shadow-xl hover:-translate-y-2">
                    <div className="mb-6 p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-black/5 w-fit group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                      {val.icon}
                    </div>
                    <h4 className="text-2xl font-black mb-3 dark:text-white">{val.title}</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed font-medium">{val.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </section>

        <section className="mb-24 sm:mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-blue-600/5 dark:bg-blue-600/10 rounded-[3rem] p-8 sm:p-16 border border-blue-500/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] pointer-events-none"></div>
            <div>
              <h2 className="text-4xl sm:text-5xl font-black mb-8 dark:text-white tracking-tight leading-tight">Safety & <br />Compliance.</h2>
              <div className="space-y-6">
                {[
                  { icon: <Landmark className="text-blue-600" />, title: "SEBI Regulated", desc: "Operating within India's strict financial guidelines." },
                  { icon: <Lock className="text-indigo-600" />, title: "Highly Secure", desc: "Your data is protected by the same security standards used by banks." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 items-start">
                    <div className="p-3 bg-white dark:bg-white/10 rounded-2xl shadow-lg">{item.icon}</div>
                    <div>
                      <h4 className="font-black text-xl dark:text-white mb-1">{item.title}</h4>
                      <p className="text-slate-600 dark:text-slate-400 font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative group">
              <div className="p-4 bg-white/80 dark:bg-white/5 backdrop-blur-2xl border border-white dark:border-white/10 rounded-[2.5rem] shadow-2xl">
                <div className="aspect-video bg-gradient-to-br from-slate-900 to-slate-800 rounded-[1.5rem] relative overflow-hidden flex items-center justify-center">
                  <Shield className="text-blue-600 animate-pulse" size={64} />
                  <div className="absolute bottom-6 left-6 text-white font-black uppercase tracking-[0.3em] text-[10px]">Secure & Verified</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <FadeIn delay={0.6}>
          <div className="bg-gradient-to-br from-blue-700 to-indigo-900 rounded-[3rem] p-10 md:p-24 text-center text-white relative overflow-hidden shadow-[0_40px_80px_-15px_rgba(37,99,235,0.4)]">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl sm:text-6xl font-black mb-8 leading-tight tracking-tighter">Ready to Start Your <br /> Wealth Journey?</h2>
              <p className="text-blue-100 mb-12 text-lg sm:text-xl font-medium opacity-80">
                Join our network of smart investors today.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
                <Link href="/register" className="w-full sm:w-auto px-12 py-5 bg-white text-blue-600 rounded-2xl font-black text-lg sm:text-xl hover:bg-slate-50 transition-all shadow-2xl active:scale-95 flex items-center justify-center">
                  Create Free Account
                </Link>
                <Link href="/plans" className="w-full sm:w-auto px-12 py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-2xl font-black text-lg sm:text-xl hover:bg-white/20 transition-all active:scale-95 text-center flex items-center justify-center">
                  View Models
                </Link>
              </div>
              <div className="mt-12 flex items-center justify-center gap-2 text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] text-blue-200">
                <Lock size={12} strokeWidth={3} />
                <span>Secure login • Your data stays private</span>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}
