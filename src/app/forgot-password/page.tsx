"use client"

import { useState } from 'react'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { motion } from 'framer-motion'
import { Mail, ArrowLeft, CheckCircle2, ShieldCheck } from 'lucide-react'
import Link from 'next/link'

export default function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    async function handleResetPassword(e: React.FormEvent) {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            await sendPasswordResetEmail(auth, email, {
                url: `${window.location.origin}/login`,
                handleCodeInApp: false,
            })
            setSuccess(true)
        } catch (err: any) {
            console.error('Password reset error:', err.code, err.message)
            switch (err.code) {
                case 'auth/user-not-found':
                    setError('No account found with this email address.')
                    break
                case 'auth/invalid-email':
                    setError('Please enter a valid email address.')
                    break
                case 'auth/too-many-requests':
                    setError('Too many requests. Please try again later.')
                    break
                default:
                    setError('Failed to send reset email. Please try again.')
            }
        } finally {
            setLoading(false)
        }
    }

    if (success) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md bg-white rounded-2xl shadow-sm p-8 text-center"
                >
                    <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="text-emerald-600" size={32} />
                    </div>

                    <h1 className="font-heading text-2xl font-semibold text-slate-900 mb-3">
                        Check Your Email
                    </h1>

                    <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                        We've sent a password reset link to <strong>{email}</strong>.
                        Click the link in the email to reset your password.
                    </p>

                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 text-left">
                        <p className="text-xs text-blue-800 font-medium">
                            <strong>Didn't receive the email?</strong>
                        </p>
                        <ul className="text-xs text-blue-700 mt-2 space-y-1 ml-4 list-disc">
                            <li>Check your spam or junk folder</li>
                            <li>Make sure you entered the correct email</li>
                            <li>Wait a few minutes for the email to arrive</li>
                        </ul>
                    </div>

                    <Link
                        href="/login"
                        className="inline-flex items-center gap-2 text-brand-primary font-semibold text-sm hover:underline"
                    >
                        <ArrowLeft size={16} />
                        Back to Login
                    </Link>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm p-6">

                {/* Back Button */}
                <Link
                    href="/login"
                    className="inline-flex items-center gap-2 text-slate-600 text-sm font-medium mb-6 hover:text-slate-900 transition"
                >
                    <ArrowLeft size={16} />
                    Back to Login
                </Link>

                {/* Header */}
                <div className="text-center mb-6">
                    <h1 className="font-heading text-2xl font-semibold text-slate-900">
                        Reset Password
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Enter your email to receive a reset link
                    </p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 text-red-600 text-xs font-medium rounded-xl border border-red-100 text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleResetPassword}>
                    <div className="space-y-4">
                        <div>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                placeholder="Email address"
                                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:ring-2 focus:ring-brand-primary outline-none text-slate-900"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-xl bg-brand-primary py-3 text-white font-semibold active:scale-[0.98] transition shadow-lg shadow-brand-primary/20 hover:bg-brand-secondary disabled:opacity-70 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <Mail size={18} />
                                    Send Reset Link
                                </>
                            )}
                        </button>
                    </div>
                </form>

                {/* Footer */}
                <div className="mt-8 text-center text-xs text-slate-400">
                    <p className="flex items-center justify-center gap-1.5 opacity-80">
                        <ShieldCheck size={12} className="text-emerald-500" />
                        Secure password reset via email
                    </p>
                </div>
            </div>
        </div>
    )
}
