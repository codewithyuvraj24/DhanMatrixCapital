"use client"
import { useState } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { FadeIn } from "@/components/ui/Animations"
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle, HelpCircle } from "lucide-react"
import { useForm, ValidationError } from '@formspree/react';

export default function Contact() {
  return (
    <div className="min-h-screen pt-20 lg:pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#050505] transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-0">
        <FadeIn>
          <div className="text-center mb-12 sm:mb-24 pt-8 sm:pt-0">
            <h1 className="text-3xl sm:text-5xl font-black mb-6 text-slate-900 dark:text-white leading-[1.1] tracking-tighter">
              Let's <span className="text-blue-600">Connect.</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
              Have questions about your investment journey? We're here to help you every step of the way.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-24">
          {[
            {
              icon: <Mail size={32} strokeWidth={2.5} className="text-blue-600 dark:text-blue-400" />,
              title: "Email Support",
              info: "dhanmatrixcap@gmail.com",
              sub: "Response within 24 hours",
              link: "mailto:dhanmatrixcap@gmail.com"
            },
            {
              icon: <Phone size={32} strokeWidth={2.5} className="text-indigo-600 dark:text-indigo-400" />,
              title: "Call Us",
              info: "+91 8446285154",
              sub: "Mon-Fri, 9am-6pm IST",
              link: "tel:+918446285154"
            },
            {
              icon: <MapPin size={32} strokeWidth={2.5} className="text-slate-600 dark:text-slate-400" />,
              title: "Office",
              info: "Solapur, MH, India",
              sub: "Visit us by appointment",
              link: "#"
            }
          ].map((item, idx) => (
            <m.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 sm:p-8 bg-white/40 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-[2rem] hover:border-blue-500/50 transition-all duration-500 text-center group shadow-xl hover:-translate-y-2"
            >
              <div className="w-16 h-16 mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-black/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                {item.icon}
              </div>
              <h3 className="font-black text-xl mb-3 dark:text-white tracking-tight">{item.title}</h3>
              <a href={item.link} className="text-blue-600 dark:text-blue-400 font-extrabold text-lg sm:text-xl hover:underline block mb-2 break-all sm:break-normal">
                {item.info}
              </a>
              <p className="text-[10px] sm:text-xs text-slate-500 font-black uppercase tracking-widest">{item.sub}</p>
            </m.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 sm:gap-24 items-start">
          <FadeIn delay={0.2}>
            <div className="px-2 sm:px-0">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400 shadow-lg">
                  <MessageSquare size={28} />
                </div>
                <h3 className="text-3xl font-black dark:text-white tracking-tighter">Send us a <span className="text-blue-600">Message.</span></h3>
              </div>
              <div className="bg-white/40 dark:bg-white/5 backdrop-blur-xl p-6 sm:p-10 rounded-[2.5rem] border border-slate-200 dark:border-white/10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-[60px] pointer-events-none"></div>
                <ContactForm />
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="px-2 sm:px-0 pt-8 sm:pt-0">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400 shadow-lg">
                  <HelpCircle size={28} />
                </div>
                <h3 className="text-3xl font-black dark:text-white tracking-tighter">Common <span className="text-indigo-600">Questions.</span></h3>
              </div>
              <div className="space-y-4">
                {[
                  { q: "How do I get started?", a: "It's simple. Sign up, choose your preferred investment plan, and follow the steps to start growing your wealth." },
                  { q: "Minimum investment?", a: "You can start your investment journey with as little as ₹25,000." },
                  { q: "Is my data secure?", a: "We use 256-bit encryption and follow SEBI-aligned practices to ensure your data and investments are always safe." },
                  { q: "When can I withdraw?", a: "We offer flexible withdrawals. Most plans allow you to request money back with a 24-hour processing cycle." }
                ].map((faq, idx) => (
                  <div key={idx} className="p-6 bg-white/40 dark:bg-white/5 backdrop-blur-md border border-slate-100 dark:border-white/10 rounded-[2rem] hover:border-blue-500/50 transition-all duration-300 shadow-xl shadow-black/5 group">
                    <h4 className="font-black text-lg mb-3 dark:text-white tracking-tight group-hover:text-blue-600 transition-colors">{faq.q}</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  )
}

function ContactForm() {
  const [state, handleSubmit] = useForm("xlgeezwr");

  if (state.succeeded) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center animate-fadeIn">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4 text-green-600 dark:text-green-400">
          <CheckCircle size={32} />
        </div>
        <h3 className="text-2xl font-black dark:text-white mb-2">Message Sent!</h3>
        <p className="text-slate-600 dark:text-slate-400">
          Thanks for reaching out. We'll get back to you shortly at dhanmatrixcap@gmail.com.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-xs font-black uppercase tracking-widest mb-3 text-slate-500">Full Name</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Your Name"
            className="w-full px-4 py-3 bg-slate-100 dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 dark:text-white transition-all font-medium placeholder:text-slate-400"
            required
          />
          <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-500 text-[10px] font-black uppercase mt-2 tracking-widest" />
        </div>
        <div>
          <label htmlFor="email" className="block text-xs font-black uppercase tracking-widest mb-3 text-slate-500">Email Address</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="hello@example.com"
            className="w-full px-4 py-3 bg-slate-100 dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 dark:text-white transition-all font-medium placeholder:text-slate-400"
            required
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-[10px] font-black uppercase mt-2 tracking-widest" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="block text-xs font-black uppercase tracking-widest mb-3 text-slate-500">Phone Number</label>
          <input
            id="phone"
            type="tel"
            name="phone"
            placeholder="+91 00000 00000"
            className="w-full px-4 py-3 bg-slate-100 dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 dark:text-white transition-all font-medium placeholder:text-slate-400"
            required
          />
          <ValidationError prefix="Phone" field="phone" errors={state.errors} className="text-red-500 text-[10px] font-black uppercase mt-2 tracking-widest" />
        </div>

        <div>
          <label htmlFor="subject" className="block text-xs font-black uppercase tracking-widest mb-3 text-slate-500">How can we help?</label>
          <div className="relative">
            <select
              id="subject"
              name="subject"
              className="w-full px-4 py-3 bg-slate-100 dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 dark:text-white transition-all appearance-none font-bold text-sm pr-12"
            >
              <option value="Investment Inquiry">Investment Inquiry</option>
              <option value="Account Support">Account Support</option>
              <option value="Technical Issue">Technical Issue</option>
              <option value="General Inquiry">General Inquiry</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
              <HelpCircle size={16} />
            </div>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-black uppercase tracking-widest mb-3 text-slate-500">Your Message</label>
        <textarea
          id="message"
          name="message"
          placeholder="How can we help you today?"
          rows={5}
          className="w-full px-4 py-3 bg-slate-100 dark:bg-black/30 border border-slate-200 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 dark:text-white transition-all resize-none font-medium placeholder:text-slate-400"
          required
        />
        <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-[10px] font-black uppercase mt-2 tracking-widest" />
      </div>

      <button
        type="submit"
        disabled={state.submitting}
        className="w-full px-6 py-4 bg-blue-600 text-white font-black text-lg rounded-2xl hover:bg-blue-700 transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
      >
        {state.submitting ? (
          <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
        ) : (
          <>
            Send Message <Send size={20} />
          </>
        )}
      </button>
    </form>
  )
}
