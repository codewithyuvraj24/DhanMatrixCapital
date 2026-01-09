"use client"
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Clock, Tag, Search, TrendingUp, Shield, PieChart } from 'lucide-react'
// Dummy Data for Blog Posts
const featuredPost = {
    id: 1,
    title: "The Power of Compounding: How to Turn ₹10k into ₹1 Crore",
    excerpt: "Albert Einstein called compound interest the 'eighth wonder of the world'. Learn how starting early and staying consistent can exponentially grow your wealth over time.",
    category: "Investing 101",
    readTime: "8 min read",
    date: "Jan 08, 2026",
    image: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?q=80&w=2070&auto=format&fit=crop",
    author: "DMC Research Team"
}

const recentPosts = [
    {
        id: 2,
        title: "Understanding Risk: Large Cap vs. Mid Cap vs. Small Cap",
        excerpt: "Confused by stock market jargon? We break down the risk-reward ratio of different market categorizations to help you choose the right plan.",
        category: "Market Education",
        readTime: "5 min read",
        date: "Jan 05, 2026",
        icon: <PieChart />
    },
    {
        id: 3,
        title: "Why SEBI Regulation Matters for Your Money",
        excerpt: "Security should be your top priority. Discover how SEBI guidelines protect your investments from fraud and malpractice.",
        category: "Safety & Regulation",
        readTime: "4 min read",
        date: "Jan 02, 2026",
        icon: <Shield />
    },
    {
        id: 4,
        title: "2026 Market Outlook: Sectors to Watch",
        excerpt: "Our financial analysts predict which Indian sectors are poised for breakout growth in the coming fiscal year.",
        category: "Market Trends",
        readTime: "6 min read",
        date: "Dec 28, 2025",
        icon: <TrendingUp />
    }
]

export default function BlogPage() {
    return (
        <div className="min-h-screen font-sans selection:bg-blue-500/30">
            <div className="pt-32 pb-20 max-w-[1920px] mx-auto px-4 lg:px-12 2xl:px-16">
                {/* Header Section */}
                <div className="mb-16 text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-3xl"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-widest mb-6">
                            <BookOpen size={14} />
                            Wealth Academy
                        </div>
                        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                            Smart Investing <br />
                            <span className="text-blue-600">Made Simple.</span>
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400 font-medium max-w-2xl leading-relaxed">
                            Master the art of wealth creation with our expert guides, market insights, and financial education resources.
                        </p>

                        {/* Search Bar */}
                        <div className="mt-8 relative max-w-md">
                            <div className="relative group">
                                <input
                                    type="text"
                                    id="search-articles"
                                    name="search"
                                    placeholder="Search for articles..."
                                    className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-900 dark:text-white placeholder-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 focus:outline-none transition-all font-bold"
                                />
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                            </div>
                            <p className="text-xs font-bold text-slate-400 mt-3 pl-4">
                                Popular: <span className="text-slate-600 dark:text-slate-300 cursor-pointer hover:text-blue-500 transition-colors">Investing 101</span>, <span className="text-slate-600 dark:text-slate-300 cursor-pointer hover:text-blue-500 transition-colors">Market Trends</span>
                            </p>
                        </div>
                    </motion.div>
                </div>

                <div>
                    {/* Featured Post */}
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                        <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
                        Featured Insight
                    </h2>

                    <Link href={`/blog/${featuredPost.id}`} className="block mb-20">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="group relative rounded-[2.5rem] overflow-hidden bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 shadow-2xl shadow-blue-500/5 hover:shadow-blue-500/20 transition-all duration-500"
                        >
                            <div className="grid md:grid-cols-2 gap-0">
                                <div className="relative h-48 md:h-auto overflow-hidden">
                                    <Image
                                        src={featuredPost.image}
                                        alt={featuredPost.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    <div className="absolute top-6 left-6">
                                        <span className="px-4 py-2 bg-blue-600 text-white text-xs font-black uppercase tracking-widest rounded-xl">
                                            {featuredPost.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6 md:p-12 flex flex-col justify-center">
                                    <div className="flex items-center gap-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">
                                        <span className="flex items-center gap-1"><Clock size={14} /> {featuredPost.readTime}</span>
                                        <span>•</span>
                                        <span>{featuredPost.date}</span>
                                    </div>
                                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-4 leading-tight group-hover:text-blue-600 transition-colors">
                                        {featuredPost.title}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-300 font-medium mb-8 leading-relaxed line-clamp-3 md:line-clamp-none">
                                        {featuredPost.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between mt-auto">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-white/10 hidden sm:block"></div>
                                            <div>
                                                <p className="text-sm font-black text-slate-900 dark:text-white">{featuredPost.author}</p>
                                                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 hidden sm:block">Financial Analyst</p>
                                            </div>
                                        </div>
                                        <div className="px-6 py-3 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white font-bold text-sm group-hover:bg-blue-600 group-hover:text-white transition-all flex items-center gap-2">
                                            Read Article <ArrowRight size={16} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </Link>

                    {/* Recent Posts Grid */}
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                            <span className="w-2 h-8 bg-indigo-600 rounded-full"></span>
                            Latest Articles
                        </h2>
                        <Link href="#" className='text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1'>
                            View all <ArrowRight size={16} />
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recentPosts.map((post, idx) => (
                            <Link href={`/blog/${post.id}`} key={post.id}>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    className="group h-full bg-white dark:bg-slate-900/40 rounded-[2rem] p-5 border border-slate-100 dark:border-white/5 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 flex flex-col"
                                >
                                    <div className="mb-5 flex justify-between items-start">
                                        <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 text-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                            {post.icon}
                                        </div>
                                        <span className="px-3 py-1 bg-slate-100 dark:bg-white/5 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 dark:group-hover:bg-blue-900/30 dark:group-hover:text-blue-300 transition-colors">
                                            {post.category}
                                        </span>
                                    </div>

                                    <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-3 leading-snug group-hover:text-blue-600 transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-6 leading-relaxed line-clamp-2">
                                        {post.excerpt}
                                    </p>

                                    <div className="mt-auto pt-4 border-t border-slate-50 dark:border-white/5 flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                                        <span className="flex items-center gap-1"><Clock size={14} /> {post.readTime}</span>
                                        <span>{post.date}</span>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>

                    {/* Disclaimer */}
                    <div className="mt-20 pt-10 border-t border-slate-200 dark:border-white/10 text-center">
                        <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-2">Financial Disclaimer</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-4xl mx-auto leading-relaxed">
                            Content provided on this blog is for educational and informational purposes only and should not be construed as professional financial advice.
                            Past performance is not indicative of future results. Investments in securities market are subject to market risks, read all the related documents carefully before investing.
                            Dhanmatrixcapital does not guarantee any specific returns. Please consult with a certified financial advisor before making any investment decisions.
                        </p>
                    </div>
                </div>
            </div>

        </div>
    )
}
