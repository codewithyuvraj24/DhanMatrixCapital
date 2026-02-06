"use client"
import { m } from 'framer-motion'
import { FadeIn } from "@/components/ui/Animations"
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle, HelpCircle, ChevronDown } from "lucide-react"
import { useForm, ValidationError } from '@formspree/react';
import { memo } from 'react';

// Memoized Contact Options List to prevent re-renders
const ContactOptions = memo(() => {
  const options = [
    {
      icon: <Mail size={20} strokeWidth={2.5} className="text-blue-600 dark:text-blue-400" />,
      title: "Email Support",
      info: "dhanmatrixcap@gmail.com",
      sub: "Response within 24 hours",
      link: "mailto:dhanmatrixcap@gmail.com"
    },
    {
      icon: <Phone size={20} strokeWidth={2.5} className="text-indigo-600 dark:text-indigo-400" />,
      title: "Call Us",
      info: "+91 8446285154",
      sub: "Mon-Fri, 9am-6pm IST",
      link: "tel:+918446285154"
    },
    {
      icon: <MapPin size={20} strokeWidth={2.5} className="text-slate-600 dark:text-slate-400" />,
      title: "Office",
      info: "Solapur, MH, India",
      sub: "Visit us by appointment",
      link: "#"
    }
  ]

  return (
    <div className="flex flex-col gap-3 mb-12 sm:mb-24">
      {options.map((item, idx) => (
        <m.div
          key={idx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="group flex items-center gap-4 p-4 bg-white/40 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-2xl hover:border-blue-500/50 transition-all duration-300 shadow-sm active:scale-[0.98]"
        >
          <div className="w-10 h-10 shrink-0 bg-white dark:bg-slate-900 rounded-xl shadow-sm flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
            {item.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-0.5">
              <h3 className="font-bold text-sm dark:text-white truncate">{item.title}</h3>
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider hidden sm:block">{item.sub}</span>
            </div>
            <a href={item.link} className="text-blue-600 dark:text-blue-400 font-bold text-sm sm:text-base hover:underline block truncate">
              {item.info}
            </a>
          </div>
        </m.div>
      ))}
    </div>
  )
})
ContactOptions.displayName = 'ContactOptions'

// Memoized FAQ Section
const FAQSection = memo(() => (
  <div className="max-w-2xl mx-auto">
    <FadeIn delay={0.4}>
      <div className="flex items-center gap-3 mb-8 px-2">
        <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-indigo-600 dark:text-indigo-400">
          <HelpCircle size={20} />
        </div>
        <h3 className="text-2xl font-black dark:text-white tracking-tight leading-none">Common <br className="sm:hidden" /><span className="text-indigo-600">Questions.</span></h3>
      </div>
      <div className="space-y-3">
        {[
          { q: "How do I get started?", a: "It's simple. Sign up, choose your preferred investment plan, and follow the steps to start growing your wealth." },
          { q: "Minimum investment?", a: "You can start your investment journey with as little as ₹25,000." },
          { q: "Is my data secure?", a: "We use 256-bit encryption and follow SEBI-aligned practices to ensure your data and investments are always safe." },
          { q: "When can I withdraw?", a: "We offer flexible withdrawals. Most plans allow you to request money back with a 24-hour processing cycle." }
        ].map((faq, idx) => (
          <div key={idx} className="p-5 bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl">
            <h4 className="font-bold text-sm mb-2 dark:text-white text-slate-900">{faq.q}</h4>
            <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed font-medium">
              {faq.a}
            </p>
          </div>
        ))}
      </div>
    </FadeIn>
  </div>
))
FAQSection.displayName = 'FAQSection'

export default function Contact() {
  return (
    <div className="min-h-screen pt-20 lg:pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#050505] transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-0">
        <FadeIn>
          <div className="text-center mb-12 sm:mb-24 pt-8 sm:pt-0">
            <h1 className="text-4xl sm:text-5xl font-black mb-6 text-slate-900 dark:text-white leading-[1.1] tracking-tighter">
              Let's <span className="text-blue-600">Connect.</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
              Have questions about your investment journey? We're here to help you every step of the way.
            </p>
          </div>
        </FadeIn>

        <ContactOptions />

        <div className="max-w-5xl mx-auto mb-16 sm:mb-24 px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
            {/* Header - Left on Desktop, Top on Mobile */}
            <div className="relative">
              <FadeIn delay={0.2} className="sticky top-24">
                <div className="flex flex-col gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <MessageSquare size={28} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight leading-tight">Send us a <br /><span className="text-blue-600">Message.</span></h3>
                    <p className="text-slate-500 dark:text-slate-400 font-medium text-lg max-w-sm">
                      We usually respond within a few hours during business days.
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Form - Right on Desktop, Bottom on Mobile */}
            <FadeIn delay={0.3} className="w-full">
              <ContactForm />
            </FadeIn>
          </div>
        </div>

        <FAQSection />
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
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-wider text-slate-500 ml-1">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Name"
          className="w-full h-12 px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 dark:text-white text-sm font-medium placeholder:text-slate-400 transition-all"
          required
        />
        <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-500 text-[9px] font-bold ml-1" />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-wider text-slate-500 ml-1">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          className="w-full h-12 px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 dark:text-white text-sm font-medium placeholder:text-slate-400 transition-all"
          required
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-[9px] font-bold ml-1" />
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="phone" className="text-[10px] font-bold uppercase tracking-wider text-slate-500 ml-1">Phone</label>
        <input
          id="phone"
          type="tel"
          name="phone"
          placeholder="+91..."
          className="w-full h-12 px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 dark:text-white text-sm font-medium placeholder:text-slate-400 transition-all"
          required
        />
        <ValidationError prefix="Phone" field="phone" errors={state.errors} className="text-red-500 text-[9px] font-bold ml-1" />
      </div>

      {/* Topic */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="subject" className="text-[10px] font-bold uppercase tracking-wider text-slate-500 ml-1">Topic</label>
        <div className="relative">
          <select
            id="subject"
            name="subject"
            className="w-full h-12 px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 dark:text-white text-sm font-medium appearance-none"
          >
            <option value="Investment">Investment Inquiry</option>
            <option value="Account">Account Support</option>
            <option value="Technical">Technical Issue</option>
            <option value="Other">Other</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40 text-slate-500">
            <ChevronDown size={16} />
          </div>
        </div>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5 md:col-span-2">
        <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-wider text-slate-500 ml-1">Message</label>
        <textarea
          id="message"
          name="message"
          placeholder="How can we help?"
          rows={3}
          className="w-full px-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 dark:text-white text-sm font-medium placeholder:text-slate-400 resize-none transition-all focus:h-32"
          required
        />
        <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-[9px] font-bold ml-1" />
      </div>

      {/* Submit Button */}
      <div className="md:col-span-2 mt-2">
        <button
          type="submit"
          disabled={state.submitting}
          className="w-full px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-2xl transition-all flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {state.submitting ? (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
          ) : (
            <>
              Send Message <Send size={16} className="-mt-0.5 ml-0.5" />
            </>
          )}
        </button>
      </div>
    </form>
  )
}
