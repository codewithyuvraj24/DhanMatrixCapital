"use client"

import { useState } from 'react'
import { sendEmailVerification } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { Mail, AlertCircle, CheckCircle2, RefreshCw } from 'lucide-react'
import { m, AnimatePresence } from 'framer-motion'

interface EmailVerificationBannerProps {
    isVerified: boolean
    userEmail?: string | null
}

export default function EmailVerificationBanner({ isVerified, userEmail }: EmailVerificationBannerProps) {
    const [sending, setSending] = useState(false)
    const [message, setMessage] = useState('')
    const [dismissed, setDismissed] = useState(false)

    // Don't show banner if email is verified or user dismissed it
    if (isVerified || dismissed) return null

    async function handleResendVerification() {
        if (!auth.currentUser) return

        setSending(true)
        setMessage('')

        try {
            await sendEmailVerification(auth.currentUser, {
                url: `${window.location.origin}/login`,
                handleCodeInApp: false,
            })
            setMessage('Verification email sent! Check your inbox.')
            setTimeout(() => setMessage(''), 5000)
        } catch (err: any) {
            console.error('Resend verification error:', err)
            if (err.code === 'auth/too-many-requests') {
                setMessage('Too many requests. Please try again later.')
            } else {
                setMessage('Failed to send email. Please try again.')
            }
            setTimeout(() => setMessage(''), 5000)
        } finally {
            setSending(false)
        }
    }

    return (
        <AnimatePresence>
            <m.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl"
            >
                <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                        <AlertCircle className="text-amber-600 dark:text-amber-400" size={20} />
                    </div>

                    <div className="flex-1">
                        <h3 className="font-bold text-sm text-amber-900 dark:text-amber-100 mb-1">
                            Email Not Verified
                        </h3>
                        <p className="text-xs text-amber-700 dark:text-amber-300 mb-3">
                            Please verify your email address <strong>{userEmail}</strong> to unlock all features.
                            Check your inbox for the verification link.
                        </p>

                        {message && (
                            <m.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="mb-3 p-2 bg-white dark:bg-black/20 rounded-lg text-xs font-medium text-amber-800 dark:text-amber-200 flex items-center gap-2"
                            >
                                <CheckCircle2 size={14} />
                                {message}
                            </m.div>
                        )}

                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={handleResendVerification}
                                disabled={sending}
                                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold text-xs transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2 disabled:opacity-50 active:scale-95"
                            >
                                {sending ? (
                                    <>
                                        <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <RefreshCw size={14} />
                                        Resend Verification Email
                                    </>
                                )}
                            </button>

                            <button
                                onClick={() => setDismissed(true)}
                                className="px-4 py-2 bg-white dark:bg-white/10 hover:bg-slate-50 dark:hover:bg-white/20 text-amber-800 dark:text-amber-200 rounded-lg font-bold text-xs transition-all border border-amber-200 dark:border-amber-700"
                            >
                                Dismiss
                            </button>
                        </div>
                    </div>
                </div>
            </m.div>
        </AnimatePresence>
    )
}
