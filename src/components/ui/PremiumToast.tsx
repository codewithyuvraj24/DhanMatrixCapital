"use client"
import { createContext, useContext, useState, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react'

type ToastType = 'success' | 'error' | 'info'

interface Toast {
    id: string
    message: string
    type: ToastType
}

interface ToastContextType {
    showToast: (message: string, type: ToastType) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([])

    const showToast = (message: string, type: ToastType = 'info') => {
        const id = Math.random().toString(36).substring(7)
        setToasts(prev => [...prev, { id, message, type }])

        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id))
        }, 4000)
    }

    const removeToast = (id: string) => {
        setToasts(prev => prev.filter(t => t.id !== id))
    }

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
                <AnimatePresence>
                    {toasts.map(toast => (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 100, scale: 0.8 }}
                            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                            className={`
                pointer-events-auto
                min-w-[320px] max-w-md
                p-4 pr-12
                bg-white/90 dark:bg-black/80
                backdrop-blur-2xl
                border
                ${toast.type === 'success' ? 'border-emerald-500/30' : ''}
                ${toast.type === 'error' ? 'border-red-500/30' : ''}
                ${toast.type === 'info' ? 'border-blue-500/30' : ''}
                rounded-2xl
                shadow-2xl shadow-black/10
                flex items-start gap-3
                relative
              `}
                        >
                            <div className={`
                w-10 h-10 rounded-xl flex items-center justify-center shrink-0
                ${toast.type === 'success' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : ''}
                ${toast.type === 'error' ? 'bg-red-500/10 text-red-600 dark:text-red-400' : ''}
                ${toast.type === 'info' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' : ''}
              `}>
                                {toast.type === 'success' && <CheckCircle2 size={20} />}
                                {toast.type === 'error' && <AlertCircle size={20} />}
                                {toast.type === 'info' && <Info size={20} />}
                            </div>

                            <div className="flex-1 pt-1">
                                <p className="text-sm font-bold text-slate-900 dark:text-white leading-relaxed">
                                    {toast.message}
                                </p>
                            </div>

                            <button
                                onClick={() => removeToast(toast.id)}
                                className="absolute top-3 right-3 w-6 h-6 rounded-lg bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
                            >
                                <X size={14} />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    )
}

export function useToast() {
    const context = useContext(ToastContext)
    if (!context) {
        throw new Error('useToast must be used within ToastProvider')
    }
    return context
}
