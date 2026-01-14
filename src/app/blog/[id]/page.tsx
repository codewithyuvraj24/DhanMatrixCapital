"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { m } from 'framer-motion'
import { ArrowLeft, Clock, Share2, Tag, Calendar, User, ChevronRight } from 'lucide-react'

// Dummy Data to match the list page
const allPosts = [
    {
        id: 1,
        title: "The Power of Compounding: How to Turn ₹10k into ₹1 Crore",
        excerpt: "Albert Einstein called compound interest the 'eighth wonder of the world'. Learn how starting early and staying consistent can exponentially grow your wealth over time.",
        category: "Investing 101",
        readTime: "8 min read",
        date: "Jan 08, 2026",
        image: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?q=80&w=2070&auto=format&fit=crop",
        author: "DMC Research Team",
        content: `
            <p class="mb-6">Compound interest is often referred to as the eighth wonder of the world, and for good reason. It is the principle that allows your money to grow exponentially over time, not just on your principal investment, but on the accumulated interest as well.</p>
            
            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4 mt-8">Why Starting Early Matters</h3>
            <p class="mb-6">The single most important factor in compounding is time. The earlier you start, the more time your money has to grow. For example, investing ₹10,000 monthly at age 25 yields significantly more at retirement than starting the same amount at age 35, even if the total amount invested is the same.</p>
            
            <div class="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-6 my-8 rounded-r-xl">
                <p class="font-bold text-blue-800 dark:text-blue-300 italic">"Compound interest is the eighth wonder of the world. He who understands it, earns it... he who doesn't... pays it." — Albert Einstein</p>
            </div>

            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4 mt-8">The Rule of 72</h3>
            <p class="mb-6">A simple way to estimate how long it takes to double your money is the Rule of 72. Divide 72 by your annual rate of return to get the number of years. At a 12% return, your money doubles every 6 years!</p>
            
            <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4 mt-8">Key Takeaways</h3>
            <ul class="list-disc pl-6 space-y-2 mb-8 marker:text-blue-600">
                <li>Start investing as early as possible to maximize time.</li>
                <li>Be consistent with your contributions.</li>
                <li>Reinvest your returns to fuel the compounding engine.</li>
                <li>Patience is key; the biggest growth happens in later years.</li>
            </ul>
        `
    },
    {
        id: 2,
        title: "Understanding Risk: Large Cap vs. Mid Cap vs. Small Cap",
        excerpt: "Confused by stock market jargon? We break down the risk-reward ratio of different market categorizations to help you choose the right plan.",
        category: "Market Education",
        readTime: "5 min read",
        date: "Jan 05, 2026",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
        author: "DMC Research Team",
        content: `<p>Detailed content for Understanding Risk would go here...</p>`
    },
    {
        id: 3,
        title: "Why SEBI Regulation Matters for Your Money",
        excerpt: "Security should be your top priority. Discover how SEBI guidelines protect your investments from fraud and malpractice.",
        category: "Safety & Regulation",
        readTime: "4 min read",
        date: "Jan 02, 2026",
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop",
        author: "DMC Research Team",
        content: `<p>Detailed content for SEBI Regulation would go here...</p>`
    },
    {
        id: 4,
        title: "2026 Market Outlook: Sectors to Watch",
        excerpt: "Our financial analysts predict which Indian sectors are poised for breakout growth in the coming fiscal year.",
        category: "Market Trends",
        readTime: "6 min read",
        date: "Dec 28, 2025",
        image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=2070&auto=format&fit=crop",
        author: "DMC Research Team",
        content: `<p>Detailed content for Market Outlook would go here...</p>`
    }
]

export default function BlogPostPage({ params }: { params: { id: string } }) {
    const post = allPosts.find(p => p.id === parseInt(params.id))

    if (!post) {
        notFound()
        return null
    }

    return (
        <div className="min-h-screen bg-white dark:bg-black font-sans selection:bg-blue-500/30">
            {/* Progress Bar (Optional, could be added later) */}

            {/* Hero Section */}
            <div className="relative h-[60vh] w-full overflow-hidden">
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                <div className="absolute bottom-0 left-0 w-full p-4 md:p-12 lg:p-16">
                    <div className="max-w-4xl mx-auto">
                        <m.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Link href="/blog" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors group">
                                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                                <span className="text-sm font-bold uppercase tracking-widest">Back to Blog</span>
                            </Link>

                            <div className="flex flex-wrap items-center gap-3 mb-6">
                                <span className="px-4 py-1.5 bg-blue-600 text-white text-xs font-black uppercase tracking-widest rounded-full">
                                    {post.category}
                                </span>
                                <span className="flex items-center gap-1.5 text-white/80 text-xs font-bold uppercase tracking-wider bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full">
                                    <Clock size={14} /> {post.readTime}
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                                {post.title}
                            </h1>

                            <div className="flex items-center gap-4 text-white/90">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white">
                                        {post.author.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold">{post.author}</p>
                                        <p className="text-xs text-white/60 font-medium">Published on {post.date}</p>
                                    </div>
                                </div>
                            </div>
                        </m.div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-12">
                    {/* Main Article */}
                    <m.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="prose prose-lg dark:prose-invert prose-headings:font-black prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-a:text-blue-600 max-w-none"
                    >
                        <div dangerouslySetInnerHTML={{ __html: post.content }} />
                    </m.div>

                    {/* Sidebar / Actions */}
                    <div className="space-y-8">
                        <div className="sticky top-32">
                            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Share Article</p>
                                <div className="flex flex-col gap-3">
                                    <button className="flex items-center gap-3 w-full p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 hover:border-blue-500 hover:text-blue-600 transition-all text-sm font-bold text-slate-600 dark:text-slate-300 group">
                                        <Share2 size={16} />
                                        Share Link
                                    </button>
                                    <button className="flex items-center gap-3 w-full p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 hover:border-blue-500 hover:text-blue-600 transition-all text-sm font-bold text-slate-600 dark:text-slate-300 group">
                                        <Tag size={16} />
                                        Twitter
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Read Next */}
            <div className="bg-slate-50 dark:bg-white/5 py-20">
                <div className="max-w-[1920px] mx-auto px-4 lg:px-12 2xl:px-16">
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-8">Continue Reading</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        {allPosts.filter(p => p.id !== post.id).slice(0, 3).map(related => (
                            <Link href={`/blog/${related.id}`} key={related.id} className="group cursor-pointer">
                                <div className="h-48 relative rounded-2xl overflow-hidden mb-4">
                                    <Image src={related.image} alt={related.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <p className="text-xs font-bold text-blue-600 mb-2 uppercase tracking-wider">{related.category}</p>
                                <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors line-clamp-2">{related.title}</h4>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
