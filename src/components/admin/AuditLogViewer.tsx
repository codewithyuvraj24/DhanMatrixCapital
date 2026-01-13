"use client"
import { useState, useEffect } from 'react'
import { collection, query, orderBy, limit, getDocs, where } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { m, AnimatePresence } from 'framer-motion'
import { FileText, User, DollarSign, Shield, Eye, Ban, Unlock, Edit, Trash2, RefreshCw } from 'lucide-react'
import type { AuditLogEntry } from '@/lib/audit'

interface AuditLogWithId extends AuditLogEntry {
    id: string
}

export default function AuditLogViewer() {
    const [logs, setLogs] = useState<AuditLogWithId[]>([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState<string>('all')

    useEffect(() => {
        fetchLogs()
    }, [filter])

    async function fetchLogs() {
        setLoading(true)
        try {
            const logsRef = collection(db, 'audit_logs')
            let q = query(logsRef, orderBy('timestamp', 'desc'), limit(100))

            if (filter !== 'all') {
                q = query(logsRef, where('action', '==', filter), orderBy('timestamp', 'desc'), limit(100))
            }

            const snapshot = await getDocs(q)
            const fetchedLogs = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as AuditLogWithId))

            setLogs(fetchedLogs)
        } catch (error) {
            console.error('Failed to fetch audit logs:', error)
        } finally {
            setLoading(false)
        }
    }

    function getActionIcon(action: string) {
        switch (action) {
            case 'UPDATE_INVESTMENT':
                return <Edit size={16} className="text-blue-600" />
            case 'DELETE_INVESTMENT':
                return <Trash2 size={16} className="text-red-600" />
            case 'CHANGE_USER_ROLE':
                return <Shield size={16} className="text-purple-600" />
            case 'SUSPEND_USER':
                return <Ban size={16} className="text-red-600" />
            case 'UNSUSPEND_USER':
                return <Unlock size={16} className="text-emerald-600" />
            case 'IMPERSONATE_USER':
                return <Eye size={16} className="text-orange-600" />
            default:
                return <FileText size={16} className="text-slate-600" />
        }
    }

    function getActionColor(action: string) {
        switch (action) {
            case 'UPDATE_INVESTMENT':
                return 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
            case 'DELETE_INVESTMENT':
                return 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
            case 'CHANGE_USER_ROLE':
                return 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400'
            case 'SUSPEND_USER':
                return 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
            case 'UNSUSPEND_USER':
                return 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400'
            case 'IMPERSONATE_USER':
                return 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400'
            default:
                return 'bg-slate-50 dark:bg-slate-900/20 text-slate-700 dark:text-slate-400'
        }
    }

    function formatActionName(action: string): string {
        return action.split('_').map(word =>
            word.charAt(0) + word.slice(1).toLowerCase()
        ).join(' ')
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="font-heading text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                        <FileText className="text-red-600 w-5 h-5 sm:w-6 sm:h-6" strokeWidth={3} />
                        Audit Trail
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">Complete log of all administrative actions</p>
                </div>
                <button
                    onClick={fetchLogs}
                    disabled={loading}
                    className="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-all disabled:opacity-50"
                    title="Refresh logs"
                >
                    <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                </button>
            </div>

            {/* Filters */}
            <div className="flex gap-2 flex-wrap">
                {[
                    { value: 'all', label: 'All Actions' },
                    { value: 'UPDATE_INVESTMENT', label: 'Investment Updates' },
                    { value: 'DELETE_INVESTMENT', label: 'Investment Deletions' },
                    { value: 'CHANGE_USER_ROLE', label: 'Role Changes' },
                    { value: 'SUSPEND_USER', label: 'Suspensions' },
                    { value: 'UNSUSPEND_USER', label: 'Unsuspensions' },
                    { value: 'IMPERSONATE_USER', label: 'Impersonations' }
                ].map(({ value, label }) => (
                    <button
                        key={value}
                        onClick={() => setFilter(value)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${filter === value
                            ? 'bg-red-600 text-white shadow-lg shadow-red-500/20'
                            : 'bg-white/50 dark:bg-white/5 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/10 hover:border-red-500/30'
                            }`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {/* Logs Table */}
            {loading ? (
                <div className="bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-white dark:border-white/10 p-12 rounded-3xl text-center">
                    <div className="inline-block h-8 w-8 border-4 border-slate-200 dark:border-white/10 border-t-red-600 rounded-full animate-spin" />
                    <p className="mt-4 text-sm text-slate-500">Loading audit logs...</p>
                </div>
            ) : logs.length === 0 ? (
                <div className="bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-white dark:border-white/10 p-12 rounded-3xl text-center">
                    <FileText size={48} className="mx-auto text-slate-300 dark:text-white/10 mb-4" />
                    <p className="text-slate-500">No audit logs found</p>
                </div>
            ) : (
                <div className="bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-white dark:border-white/10 rounded-3xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-slate-100 dark:border-white/10 bg-slate-50/50 dark:bg-white/5">
                                    <th className="px-6 py-4 font-black text-[10px] uppercase tracking-widest text-slate-400">Timestamp</th>
                                    <th className="px-6 py-4 font-black text-[10px] uppercase tracking-widest text-slate-400">Action</th>
                                    <th className="px-6 py-4 font-black text-[10px] uppercase tracking-widest text-slate-400">Admin</th>
                                    <th className="px-6 py-4 font-black text-[10px] uppercase tracking-widest text-slate-400">Target</th>
                                    <th className="px-6 py-4 font-black text-[10px] uppercase tracking-widest text-slate-400">Details</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 dark:divide-white/5">
                                {logs.map((log) => (
                                    <m.tr
                                        key={log.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                                    >
                                        <td className="px-6 py-4 text-xs text-slate-500 font-mono">
                                            {new Date(log.timestamp).toLocaleString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${getActionColor(log.action)}`}>
                                                {getActionIcon(log.action)}
                                                {formatActionName(log.action)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-xs">
                                                <p className="font-bold text-slate-900 dark:text-white">{log.adminEmail || 'Unknown'}</p>
                                                <p className="text-slate-400 font-mono text-[10px]">{log.adminId.slice(0, 8)}...</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                {log.targetType === 'user' && <User size={14} className="text-slate-400" />}
                                                {log.targetType === 'investment' && <DollarSign size={14} className="text-slate-400" />}
                                                <span className="text-xs font-mono text-slate-600 dark:text-slate-400">
                                                    {log.targetId?.slice(0, 8)}...
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {log.details && (
                                                <div className="text-xs text-slate-500 max-w-xs truncate">
                                                    {JSON.stringify(log.details)}
                                                </div>
                                            )}
                                        </td>
                                    </m.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Footer Info */}
            <div className="text-center text-xs text-slate-400">
                Showing {logs.length} most recent {filter !== 'all' ? 'filtered ' : ''}audit log{logs.length !== 1 ? 's' : ''}
            </div>
        </div>
    )
}
