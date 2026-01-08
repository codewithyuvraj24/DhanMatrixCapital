"use client"
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { collection, query, where, getDocs, getDocsFromCache, getDocsFromServer } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/Animations'
import { validateInvestmentAmount, validateWithdrawalDate, formatCurrency, getAmountErrorMessage } from '@/lib/validators'
import { addDoc } from 'firebase/firestore'
import {
  TrendingUp,
  Wallet,
  CheckCircle,
  Clock,
  AlertTriangle,
  Plus,
  LayoutDashboard,
  ArrowRight,
  X,
  Target,
  Download,
  Info
} from 'lucide-react'
import { StatsSkeleton, ChartSkeleton, TableSkeleton } from '@/components/ui/Skeleton'
import { useToast } from '@/components/ui/PremiumToast'
import MagneticButton from '@/components/ui/MagneticButton'
import { DashboardCharts } from '@/components/features/DashboardCharts'
import NewsWidget from '@/components/features/NewsWidget'
import AIPredictionWidget from '@/components/features/AIPredictionWidget'

type Investment = {
  id: string
  userId: string
  depositAmount: number
  withdrawalDate: string
  status: 'active' | 'pending' | 'withdrawn'
  createdAt: string
}

import { ErrorBoundary } from '@/components/ui/ErrorBoundary'
import MarketTicker from '@/components/features/MarketTicker'

export default function DashboardPage() {
  return (
    <ErrorBoundary>
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    </ErrorBoundary>
  )
}

function Dashboard() {
  const { user, profile } = useAuth()
  const router = useRouter()
  const { showToast } = useToast()
  const [investments, setInvestments] = useState<Investment[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({ depositAmount: '', withdrawalDate: '', status: 'active' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (user && profile && !profile.onboardingComplete) {
      router.push('/onboarding')
    }
  }, [user, profile, router])

  useEffect(() => {
    if (!user) return
      ; (async () => {
        try {
          const q = query(collection(db, 'investments'), where('userId', '==', user.uid))

          // 1. Try cache first for instant load
          try {
            const cachedSnap = await getDocsFromCache(q)
            if (!cachedSnap.empty) {
              setInvestments(cachedSnap.docs.map(d => ({ id: d.id, ...d.data() } as Investment)))
              setLoading(false)
            }
          } catch (e) { /* ignore cache miss */ }

          // 2. Race server call with timeout
          const serverPromise = getDocsFromServer(q)
          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Network Timeout')), 15000)
          )

          const snap = await Promise.race([serverPromise, timeoutPromise]) as any
          const items = snap.docs.map((d: any) => ({ id: d.id, ...d.data() } as Investment))
          setInvestments(items)
        } catch (err: any) {
          console.error('Dashboard Data Fetch Issue:', err)
          if (err.message?.includes('failed-precondition') || err.message?.includes('network-error') || err.name === 'FirebaseError') {
            showToast('Database connection blocked! Please disable AdBlockers/VPN.', 'error')
          } else if (investments.length === 0) {
            showToast('Syncing with server taking longer than usual...', 'info')
          }
        } finally {
          setLoading(false)
        }
      })()
  }, [user])

  async function handleCreateInvestment() {
    setError('')
    if (!user) { setError('You must be logged in'); return }
    if (!formData.depositAmount) { setError('Amount required'); return }
    if (!validateInvestmentAmount(formData.depositAmount)) { setError(getAmountErrorMessage(formData.depositAmount)); return }
    if (!formData.withdrawalDate) { setError('Date required'); return }
    if (!validateWithdrawalDate(formData.withdrawalDate)) { setError('Date must be in future'); return }

    setSubmitting(true)
    try {
      const docRef = await addDoc(collection(db, 'investments'), {
        userId: user.uid,
        depositAmount: parseFloat(formData.depositAmount),
        withdrawalDate: formData.withdrawalDate,
        status: formData.status,
        createdAt: new Date().toISOString()
      })

      const newInvestment: Investment = {
        id: docRef.id,
        userId: user.uid,
        depositAmount: parseFloat(formData.depositAmount),
        withdrawalDate: formData.withdrawalDate,
        status: formData.status as any,
        createdAt: new Date().toISOString()
      }

      setInvestments(prev => [newInvestment, ...prev])
      setShowModal(false)
      setFormData({ depositAmount: '', withdrawalDate: '', status: 'active' })
      showToast('Investment created successfully!', 'success')
    } catch (err) {
      setError('Failed to create investment')
      showToast('Failed to create investment', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  // Calculate derived stats
  const totalInvested = investments.reduce((sum, inv) => sum + (Number(inv.depositAmount) || 0), 0)
  const totalValue = totalInvested * 1.124 // Mocking +12.4% gain for UI demo purposes as per design
  const activeInvestments = investments.filter(inv => inv.status === 'active').length
  const withdrawnInvestments = investments.filter(inv => inv.status === 'withdrawn').length
  const averageReturn = 15

  // Export functionality
  const handleExportCSV = () => {
    const csvContent = [
      ['Position ID', 'Amount', 'Status', 'Maturity Date', 'Created'],
      ...investments.map(inv => [
        inv.id.slice(0, 8),
        inv.depositAmount,
        inv.status,
        inv.withdrawalDate,
        new Date(inv.createdAt).toLocaleDateString()
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `portfolio-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
    showToast('Portfolio exported successfully', 'success')
  }

  // No more blocking loading check. The UI will render immediately.
  // Skeletons are handled by the component internal states or via optimistic rendering.

  return (
    <>
      <div className="pt-20 pb-0 max-w-[1920px] mx-auto">
        <MarketTicker />
      </div>
      <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16 pb-16 sm:pb-20 relative z-10 w-full pt-8">
        <FadeIn>
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div className="space-y-1">
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                Welcome back, {user?.displayName?.split(' ')[0] || user?.email?.split('@')[0] || 'Operative'}
              </h1>
              <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">Here's your financial overview for today.</p>
            </div>
            <div className="flex gap-3">
              <MagneticButton
                onClick={handleExportCSV}
                className="px-5 py-2.5 border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 text-slate-600 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-white/10 transition-all flex items-center gap-2 text-sm"
                aria-label="Export portfolio data as CSV"
              >
                <Download size={16} aria-hidden="true" />
                <span className="hidden sm:inline">Export</span>
              </MagneticButton>
              <MagneticButton
                onClick={() => setShowModal(true)}
                className="flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-500/20 text-sm hover:-translate-y-0.5"
                aria-label="Schedule a new investment"
              >
                <Plus size={18} strokeWidth={3} aria-hidden="true" />
                <span>New Investment</span>
              </MagneticButton>
            </div>
          </div>
        </FadeIn>

        {/* Stats Grid - Visual Hierarchy Applied */}
        <StaggerContainer>
          {loading ? (
            <StatsSkeleton />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {/* Primary Card */}
              <StaggerItem>
                <div className="bg-white dark:bg-white/5 border-l-4 border-l-blue-600 border-y border-r border-slate-200 dark:border-white/10 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
                  <div className="absolute right-0 top-0 p-4 opacity-10">
                    <Wallet size={80} />
                  </div>
                  <p className="text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-widest mb-2">Total Portfolio Value</p>
                  <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-1 tracking-tight">{formatCurrency(totalInvested)}</h3>
                  <p className="text-slate-400 dark:text-slate-500 text-xs font-medium">Updated in real-time</p>
                </div>
              </StaggerItem>

              {/* Secondary Cards */}
              {[
                { label: "Active Capital", value: formatCurrency(totalInvested), icon: <Target size={18} />, sub: "Allocated Funds" },
                { label: "Net Growth", value: `+${averageReturn}%`, icon: <TrendingUp size={18} />, sub: "Performance Yield" }
              ].map((stat, idx) => (
                <StaggerItem key={idx}>
                  <div className="h-full bg-slate-50/50 dark:bg-white/5 border border-slate-200 dark:border-white/5 p-6 rounded-2xl hover:bg-white dark:hover:bg-white/10 transition-all group">
                    <div className="flex justify-between items-start mb-3">
                      <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">{stat.label}</p>
                      <div className="text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-white transition-colors">
                        {stat.icon}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-200 mb-1 tracking-tight">{stat.value}</h3>
                    <p className="text-slate-400 dark:text-slate-500 text-[10px] font-medium">{stat.sub}</p>
                  </div>
                </StaggerItem>
              ))}
            </div>
          )}
        </StaggerContainer>

        {/* Analytics & Wealth Tools */}
        <FadeIn delay={0.2}>
          {loading ? (
            <ChartSkeleton />
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 gap-6 mb-10 items-start">
              <div className="xl:col-span-2 lg:col-span-2 space-y-6">
                {/* Container created via DashboardCharts modification or added here if needed. 
                     Checking DashboardCharts.tsx, it has 'grid grid-cols-1...'. 
                     I should probably wrap it here or rely on its internal structure. 
                     The user asked to 'Wrap charts in clean containers'. 
                     I will rely on DashboardCharts inner refactor but ensure padding here is clean.
                  */}
                <DashboardCharts
                  totalInvested={totalInvested}
                  activeInvestments={activeInvestments}
                  totalInvestments={investments.length}
                  initialGoal={profile?.onboarding?.amount ? parseFloat(profile.onboarding.amount) : undefined}
                />
              </div>

              <div className="min-h-screen bg-slate-50 pt-20 pb-20">
                <FadeIn>
                  <div className="max-w-md mx-auto w-full">

                    {/* Top Bar (Mobile Greeting) */}
                    <div className="px-5 mb-6 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-slate-500 font-medium">Welcome back,</p>
                        <h2 className="text-xl font-bold text-slate-900">
                          {user?.displayName?.split(' ')[0] || 'Investor'} 👋
                        </h2>
                      </div>
                      <div className="relative h-10 w-10">
                        {user?.photoURL ? (
                          <Image
                            src={user.photoURL}
                            alt="Profile"
                            fill
                            className="rounded-full object-cover border-2 border-white shadow-sm"
                          />
                        ) : (
                          <div className="h-full w-full rounded-full bg-slate-200 flex items-center justify-center text-slate-500 text-xs font-bold border-2 border-white shadow-sm">
                            {user?.displayName?.[0] || 'U'}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Portfolio Card */}
                    <div className="px-4">
                      <div className="rounded-2xl bg-gradient-to-r from-brand-primary to-brand-secondary p-6 text-white shadow-lg shadow-brand-primary/20 relative overflow-hidden">
                        {/* Background Pattern */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>

                        <p className="text-sm font-medium opacity-80 mb-1">Total Portfolio Value</p>
                        <h1 className="text-3xl font-bold tracking-tight">
                          {loading ? (
                            <div className="h-9 w-32 bg-white/20 animate-pulse rounded-lg"></div>
                          ) : (
                            formatCurrency(totalValue || 0)
                          )}
                        </h1>
                        <div className="flex items-center gap-2 mt-3">
                          <span className="bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded text-xs font-medium flex items-center">
                            +12.4%
                          </span>
                          <p className="text-xs text-blue-100/80 font-medium">overall returns</p>
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="px-4 mt-8">
                      <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider opacity-80 px-1">Quick Actions</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { label: "Invest", icon: ArrowUpRight, color: "text-brand-primary" },
                          { label: "Withdraw", icon: ArrowDownRight, color: "text-slate-700" },
                          { label: "Plans", icon: Activity, color: "text-slate-700" },
                          { label: "Support", icon: Info, color: "text-slate-700" }
                        ].map((action) => (
                          <button
                            key={action.label}
                            className="bg-white rounded-2xl p-4 text-center shadow-sm border border-slate-100 hover:shadow-md transition active:scale-[0.98] flex flex-col items-center justify-center gap-3 h-28"
                          >
                            <div className={`p-2.5 rounded-full bg-slate-50 ${action.color}`}>
                              <action.icon size={20} />
                            </div>
                            <span className="font-semibold text-slate-900 text-sm">{action.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="px-4 mt-8">
                      <div className="flex items-center justify-between mb-4 px-1">
                        <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider opacity-80">Recent Activity</h3>
                        <button className="text-xs font-bold text-brand-primary hover:underline">View All</button>
                      </div>

                      <div className="bg-white rounded-2xl p-1 shadow-sm border border-slate-100">
                        {/* Placeholder for "No recent transactions" styled nicely */}
                        {investments.length === 0 ? (
                          <div className="py-8 text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-50 mb-3 text-slate-300">
                              <Activity size={20} />
                            </div>
                            <p className="text-sm font-medium text-slate-900">No recent transactions</p>
                            <p className="text-xs text-slate-500 mt-1">Start investing to see activity here</p>
                          </div>
                        ) : (
                          <div className="divide-y divide-slate-50">
                            {investments.slice(0, 3).map((inv) => (
                              <div key={inv.id} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-3">
                                  <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                    <Wallet size={18} />
                                  </div>
                                  <div>
                                    <p className="text-sm font-bold text-slate-900">Investment</p>
                                    <p className="text-xs text-slate-500">{new Date(inv.createdAt).toLocaleDateString()}</p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm font-bold text-slate-900">{formatCurrency(inv.depositAmount)}</p>
                                  <p className="text-xs font-medium text-emerald-600">Active</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                </FadeIn>
              </div>
            </div>
          )}
        </FadeIn>

        {/* Positions Table */}
        <FadeIn delay={0.4}>
          {loading ? (
            <TableSkeleton />
          ) : (
            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-6 rounded-2xl shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  Active Positions
                </h2>
                <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                  View All
                </button>
              </div>

              {investments.length === 0 ? (
                <div className="text-center py-12 px-4">
                  <div className="max-w-sm mx-auto bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl p-8 mb-6">
                    <div className="w-12 h-12 bg-slate-200 dark:bg-white/10 text-slate-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Plus size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No positions yet</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
                      Add your first investment to start tracking.
                    </p>
                    <button
                      onClick={() => setShowModal(true)}
                      className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all text-sm shadow-lg shadow-blue-500/20"
                    >
                      Add Investment
                    </button>
                  </div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-slate-100 dark:border-white/10">
                        <th className="pb-4 font-bold text-xs text-slate-400 uppercase tracking-wider pl-4">ID</th>
                        <th className="pb-4 font-bold text-xs text-slate-400 uppercase tracking-wider">Capital</th>
                        <th className="pb-4 font-bold text-xs text-slate-400 uppercase tracking-wider">Est. Return</th>
                        <th className="pb-4 font-bold text-xs text-slate-400 uppercase tracking-wider">Status</th>
                        <th className="pb-4 font-bold text-xs text-slate-400 uppercase tracking-wider">Maturity</th>
                        <th className="pb-4"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 dark:divide-white/5">
                      {investments.map(inv => (
                        <tr key={inv.id} className="group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                          <td className="py-4 pl-4 font-medium text-slate-600 dark:text-slate-300 text-sm">#{inv.id.slice(0, 8)}</td>
                          <td className="py-4 font-bold text-slate-900 dark:text-white">{formatCurrency(inv.depositAmount)}</td>
                          <td className="py-4 font-medium text-emerald-600 dark:text-emerald-400">{formatCurrency(inv.depositAmount * 0.15)}</td>
                          <td className="py-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold capitalize ${inv.status === 'active'
                              ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400'
                              : 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400'
                              }`}>
                              {inv.status}
                            </span>
                          </td>
                          <td className="py-4 text-slate-500 dark:text-slate-400 text-sm">{inv.withdrawalDate}</td>
                          <td className="py-4 text-right pr-4">
                            <button className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                              <ArrowRight size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </FadeIn>

        {/* Risk Alert */}
        <FadeIn delay={0.6}>
          <div className="mt-8 p-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl flex items-start sm:items-center gap-3">
            <Info size={20} className="text-slate-400 shrink-0 mt-0.5 sm:mt-0" />
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
              <span className="font-bold text-slate-700 dark:text-slate-300">Market Reminder:</span> Short-term volatility is normal. Stay focused on your long-term strategy and daily portfolio tracking.
            </p>
          </div>
        </FadeIn>

        {/* Modal Overlays */}
        <AnimatePresence>
          {showModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div
                className="absolute inset-0 bg-black/60 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowModal(false)}
              />
              <motion.div
                className="bg-white dark:bg-slate-900 rounded-[3rem] border border-white/20 shadow-2xl w-full max-w-xl p-10 relative z-10"
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
              >
                <div className="flex justify-between items-center mb-10">
                  <div>
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white">New Position</h3>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Configure your AI-driven investment logic.</p>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-500 dark:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
                    aria-label="Close modal"
                  >
                    <X size={24} aria-hidden="true" />
                  </button>
                </div>

                {error && (
                  <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-xs font-black text-red-600 dark:text-red-400 uppercase tracking-widest text-center">
                    {error}
                  </div>
                )}

                <div className="space-y-8">
                  <div className="relative group">
                    <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3 ml-2">Initial Capital (INR)</label>
                    <div className="relative">
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                      <input
                        type="number"
                        value={formData.depositAmount}
                        onChange={e => setFormData({ ...formData, depositAmount: e.target.value })}
                        className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-4 pl-10 pr-6 text-xl font-black text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 transition-all placeholder:text-slate-400"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3 ml-2">Maturity Horizon</label>
                    <input
                      type="date"
                      value={formData.withdrawalDate}
                      onChange={e => setFormData({ ...formData, withdrawalDate: e.target.value })}
                      className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-4 px-6 text-lg font-bold text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 transition-all"
                    />
                  </div>

                  <div className="p-6 bg-blue-600/10 border border-blue-600/20 rounded-[2rem] flex items-center justify-between">
                    <div>
                      <p className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">Est. Return (15%)</p>
                      <p className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">
                        {formData.depositAmount ? formatCurrency(parseFloat(formData.depositAmount) * 0.15) : '₹0.00'}
                      </p>
                    </div>
                    <TrendingUp className="text-blue-600/30" size={40} />
                  </div>
                </div>

                <div className="mt-12 flex gap-4">
                  <MagneticButton
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-5 rounded-2xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 font-black hover:bg-slate-50 dark:hover:bg-white/5 transition-all active:scale-95"
                  >
                    ABORT
                  </MagneticButton>
                  <MagneticButton
                    onClick={handleCreateInvestment}
                    disabled={submitting}
                    className="flex-1 py-5 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-700 transition disabled:opacity-50 active:scale-95 shadow-2xl shadow-blue-500/20"
                  >
                    {submitting ? 'EXECUTING...' : 'CONFIRM POSITION'}
                  </MagneticButton>
                </div>
              </motion.div>
            </div>
          )
          }
        </AnimatePresence >
      </div >
    </>
  )
}
