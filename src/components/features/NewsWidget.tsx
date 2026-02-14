"use client"
import { useEffect, useState } from 'react'
import { getMarketNews, NewsItem } from '@/lib/newsApi'
import { Newspaper, ExternalLink, RefreshCw, Clock } from 'lucide-react'
import { m, AnimatePresence } from 'framer-motion'
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
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 sm:p-6 shadow-sm h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Market Pulse</h3>
                <button
                    onClick={fetchNews}
                    disabled={loading}
                    aria-label="Refresh Market News"
                    className={`p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors ${loading ? 'animate-spin' : ''}`}
                >
                    <RefreshCw size={14} className="text-slate-600 dark:text-slate-400" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar">
                <AnimatePresence>
                    {loading && news.length === 0 ? (
                        <m.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-3"
                        >
                            {[1, 2, 3].map(i => (
                                <div key={i} className="animate-pulse">
                                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-2"></div>
                                    <div className="h-3 bg-slate-100 dark:bg-slate-600 rounded w-full"></div>
                                </div>
                            ))}
                        </m.div>
                    ) : news.length > 0 ? (
                        news.slice(0, 5).map((item, idx) => (
                            <m.div
                                key={item.guid || idx}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="group p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 transition-all"
                            >
                                <div className="flex justify-between items-start gap-2 mb-2">
                                    <span className="text-[10px] font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded">
                                        {item.source}
                                    </span>
                                    <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                        <Clock size={10} />
                                        {new Date(item.pubDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                                <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                    <Link href={item.link} target="_blank" className="hover:underline">
                                        {item.title}
                                    </Link>
                                </h4>
                                <Link
                                    href={item.link}
                                    target="_blank"
                                    className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
                                >
                                    Read more <ExternalLink size={10} />
                                </Link>
                            </m.div>
                        ))
                    ) : (
                        <m.div
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center py-10 text-slate-500 dark:text-slate-400 text-sm"
                        >
                            No news available at the moment.
                        </m.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
