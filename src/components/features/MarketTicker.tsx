"use client"

import { useEffect, useState } from 'react'
import { TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

type MarketItem = {
    symbol: string
    name: string
    price: number
    change: number
    isUp: boolean
}

const INITIAL_DATA: MarketItem[] = [
    { symbol: 'NIFTY', name: 'NIFTY 50', price: 21745.50, change: 0.45, isUp: true },
    { symbol: 'SENSEX', name: 'SENSEX', price: 72038.15, change: 0.38, isUp: true },
    { symbol: 'BANKNIFTY', name: 'BANK NIFTY', price: 47820.25, change: -0.12, isUp: false },
    { symbol: 'USDINR', name: 'USD/INR', price: 83.12, change: 0.05, isUp: true },
    { symbol: 'GOLD', name: 'Gold (10g)', price: 62550.00, change: -0.25, isUp: false },
    { symbol: 'BTC', name: 'Bitcoin', price: 43500.20, change: 1.25, isUp: true },
    { symbol: 'ETH', name: 'Ethereum', price: 2350.80, change: 0.95, isUp: true },
    { symbol: 'RELIANCE', name: 'Reliance', price: 2650.45, change: 0.85, isUp: true },
    { symbol: 'HDFCBANK', name: 'HDFC Bank', price: 1680.15, change: -0.45, isUp: false },
    { symbol: 'TCS', name: 'TCS', price: 3820.60, change: 0.25, isUp: true },
]

export default function MarketTicker() {
    const [data, setData] = useState<MarketItem[]>(INITIAL_DATA)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        const interval = setInterval(() => {
            setData(prev => prev.map(item => {
                const volatility = item.price * 0.0005 // 0.05% fluctuation
                const change = (Math.random() - 0.5) * volatility
                const newPrice = item.price + change
                const percentChange = ((newPrice - item.price) / item.price) * 100

                // Keep trend mostly consistent but allow flips
                const isStillUp = Math.random() > 0.3 ? item.isUp : !item.isUp

                return {
                    ...item,
                    price: newPrice,
                    change: Math.abs(item.change + percentChange), // Cumulative change effect simulation
                    isUp: isStillUp
                }
            }))
        }, 3000)

        return () => clearInterval(interval)
    }, [])

    if (!mounted) return null

    return (
        <div className="hidden md:flex w-full bg-slate-50/80 dark:bg-black/80 backdrop-blur-md border-b border-slate-200 dark:border-white/10 overflow-hidden h-8 items-center relative z-40">
            <div className="flex absolute left-0 top-0 h-full items-center animate-ticker hover:pause-animation will-change-transform">
                {/* Double the list for seamless infinite scroll */}
                {[...data, ...data].map((item, idx) => (
                    <div key={`${item.symbol}-${idx}`} className="flex items-center gap-3 px-6 border-r border-slate-200/50 dark:border-white/5 min-w-fit">
                        <span className="font-bold text-[10px] text-slate-500 dark:text-slate-400 whitespace-nowrap uppercase tracking-wider">{item.name}</span>
                        <div className={`flex items-center gap-1.5 font-black text-[10px] tabular-nums ${item.isUp ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                            <span>{item.price.toFixed(2)}</span>
                            <span className="flex items-center">
                                {item.isUp ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                                {Math.abs(item.change).toFixed(2)}%
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Gradient Masks for Fade Effect */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-50 dark:from-slate-950 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-50 dark:from-slate-950 to-transparent z-10 pointer-events-none"></div>

            <style jsx global>{`
                @keyframes ticker {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-ticker {
                    animation: ticker 40s linear infinite;
                    width: max-content;
                }
                .hover\\:pause-animation:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </div>
    )
}
