"use client"

import { ArrowUpRight, ArrowDownRight, Info, MoreHorizontal } from "lucide-react"

export default function DashboardMock() {
    return (
        <div className="relative w-full max-w-[500px] mx-auto lg:ml-auto select-none">
            {/* Main Container - Realistic Product Feel */}
            <div className="bg-white dark:bg-[#0B1220] rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">

                {/* Header / Nav */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800/50">
                    <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                        <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wide">Portfolio Overview</span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">Today • 10:42 AM IST</div>
                </div>

                {/* Main Content Area */}
                <div className="p-5 space-y-6">

                    {/* Top Metric Section */}
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-xs text-slate-500 font-medium mb-1">Total invested value</p>
                            <h3 className="text-2xl font-bold text-[#0B1220] dark:text-white tracking-tight">₹14,18,740</h3>

                            <div className="flex items-center gap-3 mt-2">
                                <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-1.5 py-0.5 rounded">
                                    <ArrowUpRight size={12} strokeWidth={2.5} />
                                    <span>18.7%</span>
                                </div>
                                <span className="text-xs text-slate-400 font-medium">1Y Return</span>
                            </div>
                        </div>

                        <div className="text-right">
                            <p className="text-xs text-slate-500 font-medium mb-1 flex items-center justify-end gap-1">
                                Today's P&L
                                <Info size={10} className="text-slate-300" />
                            </p>
                            <p className="text-sm font-semibold text-rose-500 flex items-center justify-end gap-0.5">
                                <ArrowDownRight size={14} strokeWidth={2.5} />
                                ₹820
                            </p>
                        </div>
                    </div>

                    {/* Holdings List (Scrollable feel) */}
                    <div className="space-y-3">
                        <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Active Holdings</h4>

                        {/* Holding Item 1 */}
                        <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-slate-800 hover:border-slate-200 transition-colors cursor-default">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-blue-600 text-white flex items-center justify-center text-xs font-bold">H</div>
                                <div>
                                    <p className="text-sm font-semibold text-[#0B1220] dark:text-gray-100">HDFC Bank</p>
                                    <p className="text-[10px] text-slate-400">Avg. 1450.20</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-bold text-[#0B1220] dark:text-gray-100">₹4,25,000</p>
                                <p className="text-[10px] text-emerald-600 font-medium">+12.4%</p>
                            </div>
                        </div>

                        {/* Holding Item 2 */}
                        <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-slate-800 hover:border-slate-200 transition-colors cursor-default">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">I</div>
                                <div>
                                    <p className="text-sm font-semibold text-[#0B1220] dark:text-gray-100">Infosys</p>
                                    <p className="text-[10px] text-slate-400">Avg. 1380.50</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-bold text-[#0B1220] dark:text-gray-100">₹2,10,500</p>
                                <p className="text-[10px] text-emerald-600 font-medium">+8.2%</p>
                            </div>
                        </div>

                        {/* Holding Item 3 (Cut off to imply scroll) */}
                        <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-slate-800 opacity-50">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-orange-500 text-white flex items-center justify-center text-xs font-bold">R</div>
                                <div>
                                    <p className="text-sm font-semibold text-[#0B1220] dark:text-gray-100">Reliance Ind.</p>
                                    <p className="text-[10px] text-slate-400">Avg. 2400.00</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-bold text-[#0B1220] dark:text-gray-100">₹5,40,000</p>
                                <p className="text-[10px] text-emerald-600 font-medium">+24.1%</p>
                            </div>
                        </div>

                    </div>

                    {/* Orders Section */}
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800/50">
                        <div className="flex items-center justify-between text-slate-400 mb-2">
                            <h4 className="text-[11px] font-bold uppercase tracking-widest">Orders & Adjustments</h4>
                            <MoreHorizontal size={14} />
                        </div>
                        <div className="flex items-center justify-between py-2">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                <span className="text-xs text-slate-600 dark:text-slate-300">SIP Executed (Nifty 50)</span>
                            </div>
                            <span className="text-[10px] text-slate-400">10:00 AM</span>
                        </div>
                    </div>

                </div>

                {/* Footer info/disclaimer */}
                <div className="bg-slate-50 dark:bg-slate-900/50 px-4 py-2 border-t border-slate-100 dark:border-slate-800/50">
                    <p className="text-[9px] text-slate-400 text-center">Returns exclude taxes and brokerage</p>
                </div>

            </div>

            {/* Decorative Blur behind (Subtle) */}
            <div className="absolute -z-10 top-10 left-10 right-10 bottom-10 bg-blue-500/5 blur-3xl rounded-full"></div>
        </div>
    )
}
