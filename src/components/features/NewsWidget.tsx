"use client"
import { useEffect, useState } from 'react'
import { getMarketNews, NewsItem } from '@/lib/newsApi'
import { Newspaper, ExternalLink, RefreshCw, Clock } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export default function NewsWidget() {
    const [news, setNews] = useState<NewsItem[]>([])
    const [loading, setLoading] = useState(true)

    const fetchNews = async () => {
        setLoading(true)
        const data = await getMarketNews()
        setNews(data)
        setLoading(false)
    }

    useEffect(() => {
        fetchNews()
        const interval = setInterval(fetchNews, 300000) // Refresh every 5 mins
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-white dark:border-white/10 p-6 rounded-[2rem] h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                        <Newspaper className="text-orange-600 dark:text-orange-400" size={20} />
                    </div>
                    <h2 className="text-lg font-black text-slate-900 dark:text-white">Market Pulse</h2>
                </div>
                <button
                    onClick={fetchNews}
                    disabled={loading}
                    className={`p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-colors ${loading ? 'animate-spin' : ''}`}
                >
                    <RefreshCw size={16} className="text-slate-400" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                <AnimatePresence mode='wait'>
                    {loading && news.length === 0 ? (
                        <div className="space-y-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="animate-pulse">
                                    <div className="h-4 bg-slate-200 dark:bg-white/5 rounded-md w-3/4 mb-2"></div>
                                    <div className="h-3 bg-slate-100 dark:bg-white/5 rounded-md w-full"></div>
                                </div>
                            ))}
                        </div>
                    ) : news.length > 0 ? (
                        news.map((item, idx) => (
                            <motion.div
                                key={item.guid || idx}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="group p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 hover:border-orange-500/30 transition-all"
                            >
                                <div className="flex justify-between items-start gap-3 mb-2">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-orange-600 dark:text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-full">
                                        {item.source}
                                    </span>
                                    <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                                        <Clock size={10} />
                                        {new Date(item.pubDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                                    <Link href={item.link} target="_blank" className="hover:underline decoration-orange-500/50">
                                        {item.title}
                                    </Link>
                                </h3>
                                <Link
                                    href={item.link}
                                    target="_blank"
                                    className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                                >
                                    Read full story <ExternalLink size={10} />
                                </Link>
                            </motion.div>
                        ))
                    ) : (
                        <div className="text-center py-10 text-slate-400 text-sm font-medium">
                            No news available at the moment.
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
