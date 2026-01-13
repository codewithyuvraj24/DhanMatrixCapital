"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Globe, ShieldCheck, Mail, MapPin, Facebook, Instagram, MessageCircle, ChevronRight, ArrowUpRight, ChevronDown } from "lucide-react"

export default function Footer() {
  const [isDisclaimerExpanded, setIsDisclaimerExpanded] = useState(false)

  return (
    <footer className="bg-slate-50 dark:bg-black/40 border-t border-slate-200 dark:border-white/10 pt-12 pb-8 transition-colors duration-500">
      <div className="max-w-[1920px] mx-auto px-4 lg:px-12 2xl:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-12 mb-12 sm:mb-16">
          <div className="space-y-4 mb-4 sm:mb-0">
            <Link href="/" className="inline-block" aria-label="DhanMatrixCapital home">
              <span className="font-heading text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tighter">
                DhanMatrixCapital
              </span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-sm">
              Data-driven investment solutions for the modern Indian retail investor.
            </p>
          </div>

          <div className="bg-white dark:bg-white/2 sm:bg-transparent border border-slate-100 dark:border-white/5 sm:border-0 rounded-2xl p-4 sm:p-0 shadow-sm sm:shadow-none">
            <h4 className="font-heading font-black text-slate-900 dark:text-white mb-4 uppercase tracking-[0.2em] text-[10px]">Platform & Tools</h4>
            <ul className="space-y-1 sm:space-y-4 text-sm font-bold text-slate-600 dark:text-slate-300">
              {[
                { label: "Home", href: "/" },
                { label: "Client Dashboard", href: "/dashboard" },
                { label: "Investment Plans", href: "/plans" },
                { label: "ROI Calculator", href: "/plans#calculator" }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="flex items-center justify-between py-2.5 sm:py-0 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group">
                    {link.label}
                    <ChevronRight size={14} className="sm:hidden text-slate-300 group-hover:text-blue-600" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white dark:bg-white/2 sm:bg-transparent border border-slate-100 dark:border-white/5 sm:border-0 rounded-2xl p-4 sm:p-0 shadow-sm sm:shadow-none">
            <h4 className="font-heading font-black text-slate-900 dark:text-white mb-4 uppercase tracking-[0.2em] text-[10px]">Company & Support</h4>
            <ul className="space-y-1 sm:space-y-4 text-sm font-bold text-slate-600 dark:text-slate-400">
              {[
                { label: "About DhanMatrixCapital", href: "/about" },
                { label: "Help Center", href: "/contact" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="flex items-center justify-between py-2.5 sm:py-0 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group">
                    {link.label}
                    <ChevronRight size={14} className="sm:hidden text-slate-300 group-hover:text-blue-600" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <div className="bg-blue-600 dark:bg-blue-600/90 rounded-2xl p-4 shadow-xl shadow-blue-500/10 text-white">
              <h4 className="font-heading font-black mb-3 uppercase tracking-[0.2em] text-[10px]">Security & Trust</h4>
              <ul className="space-y-3 font-bold">
                <li>
                  <a href="https://www.sebi.gov.in" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center"><ShieldCheck size={18} /></div>
                      <span className="text-xs uppercase tracking-wider">SEBI Regulated</span>
                    </div>
                    <ArrowUpRight size={14} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              </ul>
            </div>

            <a
              href="mailto:dhanmatrixcap@gmail.com"
              className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4 flex items-center justify-between group hover:border-blue-500 transition-all shadow-sm"
            >
              <div className="flex items-center gap-4 text-xs">
                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600">
                  <Mail size={16} />
                </div>
                <div>
                  <p className="font-black uppercase tracking-widest text-[9px] text-slate-400 mb-0.5">Quick Support</p>
                  <p className="font-bold text-slate-900 dark:text-white">dhanmatrixcap@gmail.com</p>
                </div>
              </div>
              <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-600 transition-all group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-white/10 block">
          {/* Collapsible Disclaimer */}
          <div className="bg-transparent border-t border-slate-100 dark:border-white/5 pt-6 mb-8">
            <button
              onClick={() => setIsDisclaimerExpanded(!isDisclaimerExpanded)}
              className="w-full flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-600 transition-colors mb-2"
            >
              <span className="flex items-center gap-2">
                <ShieldCheck size={12} className="text-amber-500/50" />
                Legal Disclaimer
              </span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-300 ${isDisclaimerExpanded ? 'rotate-180' : ''}`}
              />
            </button>
            <div className={`overflow-hidden transition-all duration-500 ${isDisclaimerExpanded ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
              <p className="text-[10px] text-slate-500 dark:text-slate-500 leading-relaxed font-medium pb-4">
                Investment in securities market are subject to market risks, read all the related documents carefully before investing. The information provided is for educational and illustrative purposes only and does not constitute investment advice. Past performance is not indicative of future results. The analytics and strategic insights provided by DhanMatrixCapital are tools to assist investors and do not guarantee specific returns.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <p>&copy; 2025 DhanMatrixCapital</p>
              <Link href="/cookies" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Cookies</Link>
              <Link href="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms</Link>
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 dark:border-white/5 pt-6">
              <div className="flex gap-6">
                {[
                  { icon: <Facebook size={16} />, href: "https://facebook.com" },
                  { icon: <Instagram size={16} />, href: "https://instagram.com" },
                  { icon: <MessageCircle size={16} />, href: "https://wa.me" }
                ].map((social, idx) => (
                  <a key={idx} href={social.href} className="text-slate-400 hover:text-blue-600 transition-colors">
                    {social.icon}
                  </a>
                ))}
              </div>
              <p className="opacity-30 hidden sm:block">Handcrafted for Excellence</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
