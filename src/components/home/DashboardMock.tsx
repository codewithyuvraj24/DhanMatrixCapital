

import { ArrowUpRight, TrendingUp } from "lucide-react"

export default function DashboardMock() {
    return (
        <div className="relative w-full max-w-[600px] mx-auto lg:ml-auto select-none p-4">
            {/* Main Application Window */}
            <div className="bg-white dark:bg-[#0B1220] rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-slate-100 dark:border-slate-800 p-6 sm:p-8 relative z-10">

                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start gap-8 mb-8">
                    <div>
                        <p className="text-[10px] sms:text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Total Balance</p>
                        <h3 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-4">₹14,20,500</h3>

                        {/* Fake Bar Chart */}
                        <div className="flex items-end gap-1.5 h-12 sm:h-16">
                            <div className="w-8 sm:w-10 bg-slate-100 dark:bg-slate-800 rounded-t-md h-[40%]"></div>
                            <div className="w-8 sm:w-10 bg-slate-100 dark:bg-slate-800 rounded-t-md h-[70%]"></div>
                            <div className="w-8 sm:w-10 bg-slate-100 dark:bg-slate-800 rounded-t-md h-[50%]"></div>
                            <div className="w-8 sm:w-10 bg-slate-100 dark:bg-slate-800 rounded-t-md h-[85%]"></div>
                            <div className="w-8 sm:w-10 bg-slate-100 dark:bg-slate-800 rounded-t-md h-[60%]"></div>
                            <div className="w-8 sm:w-10 bg-slate-100 dark:bg-slate-800 rounded-t-md h-[90%]"></div>
                        </div>
                    </div>

                    <div className="flex flex-col items-end">
                        <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full text-xs font-bold mb-6">
                            <ArrowUpRight size={14} strokeWidth={3} />
                            +12.4%
                        </div>

                        {/* Donut Chart Mock */}
                        <div className="relative w-24 h-24 flex items-center justify-center">
                            <div className="absolute inset-0 rounded-full border-[6px] border-slate-100 dark:border-slate-800"></div>
                            <div className="absolute inset-0 rounded-full border-[6px] border-blue-600 border-t-transparent border-l-transparent rotate-45"></div>
                            <div className="text-center">
                                <div className="text-[9px] font-bold text-slate-400 uppercase">Assets</div>
                                <div className="text-xl font-black text-slate-900 dark:text-white">5</div>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-3 text-[9px] font-bold text-slate-400">
                            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-600"></div>Stocks</div>
                            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-purple-500"></div>Crypto</div>
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Recent Activity</h4>
                        <ArrowUpRight size={14} className="text-slate-400" />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-500 font-bold">B</div>
                            <div>
                                <p className="text-sm font-bold text-slate-900 dark:text-white">Bitcoin Purchase</p>
                                <p className="text-[10px] font-medium text-slate-400">Today, 10:23 AM</p>
                            </div>
                        </div>
                        <span className="text-sm font-bold text-slate-900 dark:text-white">-₹25,000</span>
                    </div>
                    <div className="flex items-center justify-between mt-4 opacity-50">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 font-bold">S</div>
                            <div>
                                <p className="text-sm font-bold text-slate-900">Stock Dividend</p>
                            </div>
                        </div>
                        <span className="text-sm font-bold text-emerald-600">+₹10,000</span>
                    </div>
                    <div className="flex items-center justify-between mt-4 opacity-30">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 font-bold">D</div>
                            <div>
                                <p className="text-sm font-bold text-slate-900">Deposit</p>
                            </div>
                        </div>
                        <span className="text-sm font-bold text-emerald-600">+₹5,400</span>
                    </div>
                </div>
            </div>

            {/* Floating Growth Card */}
            <div className="absolute bottom-8 -left-4 sm:-left-12 bg-white dark:bg-[#0B1220] p-5 rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] border border-slate-100 dark:border-slate-800 z-20 w-48 animate-bounce-slow">
                <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-500">
                        <TrendingUp size={20} strokeWidth={3} />
                    </div>
                    <div className="text-right">
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Growth</p>
                        <p className="text-xl font-black text-slate-900 dark:text-white">+24.5%</p>
                    </div>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 w-[75%] h-full rounded-full"></div>
                </div>
            </div>

            {/* Top Dots */}
            <div className="absolute -top-6 left-8 flex gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
            </div>
        </div>
    )
}
