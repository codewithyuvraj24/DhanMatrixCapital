"use client"

import dynamic from 'next/dynamic'
import Hero from '@/components/home/Hero'
import { FAQSchema } from '@/components/seo/StructuredData'
import { faqData } from '@/components/home/faqData'

// Dynamically import below-the-fold components
const ValueProps = dynamic(() => import('@/components/home/ValueProps'), {
  loading: () => <div className="h-96 w-full animate-pulse bg-slate-100 dark:bg-white/5" />
})
const HowItWorks = dynamic(() => import('@/components/home/HowItWorks'))
const PlansPreview = dynamic(() => import('@/components/home/PlansPreview'))
const TrustStats = dynamic(() => import('@/components/home/TrustStats'))
const FAQ = dynamic(() => import('@/components/home/FAQ'))
const CallToAction = dynamic(() => import('@/components/home/CallToAction'))

export default function Home() {
  return (
    <div className="w-full bg-white dark:bg-[#050505] text-slate-900 dark:text-slate-100 transition-colors duration-500">
      <Hero />
      <ValueProps />
      <HowItWorks />
      <PlansPreview />
      <TrustStats />
      <FAQ />
      <FAQSchema faqs={faqData} />
      <CallToAction />
    </div>
  )
}
