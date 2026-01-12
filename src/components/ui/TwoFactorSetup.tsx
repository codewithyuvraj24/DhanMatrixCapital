"use client"

import { useState, useEffect } from 'react'
import * as OTPAuth from 'otpauth'
import QRCode from 'qrcode'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useAuth } from '@/context/AuthContext'
import { Shield, Copy, CheckCircle2, AlertTriangle, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface TwoFactorSetupProps {
    onClose: () => void
    onEnable: () => void
}

export default function TwoFactorSetup({ onClose, onEnable }: TwoFactorSetupProps) {
    const { user } = useAuth()
    const [step, setStep] = useState<1 | 2 | 3>(1)
    const [secret, setSecret] = useState('')
    const [qrCodeUrl, setQrCodeUrl] = useState('')
    const [verificationCode, setVerificationCode] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    // Generate Secret and QR Code on mount
    useEffect(() => {
        if (!user) return

        const generateSetup = async () => {
            // 1. Generate Secret
            const newSecret = new OTPAuth.Secret({ size: 20 })
            const secretStr = newSecret.base32
            setSecret(secretStr)

            // 2. Create TOTP Object
            const totp = new OTPAuth.TOTP({
                issuer: 'DhanMatrixCapital',
                label: user.email || 'User',
                algorithm: 'SHA1',
                digits: 6,
                period: 30,
                secret: newSecret,
            })

            // 3. Generate QR Code
            const uri = totp.toString()
            try {
                const url = await QRCode.toDataURL(uri)
                setQrCodeUrl(url)
            } catch (err) {
                console.error('QR Gen Error:', err)
                setError('Failed to generate QR code')
            }
        }

        generateSetup()
    }, [user])

    const verifyAndEnable = async () => {
        if (!user || !secret) return
        setError('')
        setLoading(true)

        try {
            // Validate Code
            const totp = new OTPAuth.TOTP({
                issuer: 'DhanMatrixCapital',
                label: user.email || 'User',
                algorithm: 'SHA1',
                digits: 6,
                period: 30,
                secret: OTPAuth.Secret.fromBase32(secret),
            })

            const delta = totp.validate({ token: verificationCode, window: 1 })

            if (delta === null) {
                throw new Error('Invalid verification code. Please try again.')
            }

            // Code is valid! Save to Firestore
            // In a real app, you might encrypt this secret.
            await updateDoc(doc(db, 'users', user.uid), {
                twoFactorEnabled: true,
                twoFactorSecret: secret
            })

            setStep(3) // Success step
            setTimeout(() => {
                onEnable()
                onClose()
            }, 2000)

        } catch (err: any) {
            setError(err.message || 'Verification failed')
        } finally {
            setLoading(false)
        }
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(secret)
        alert('Secret copied to clipboard!')
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl p-8 relative z-10 shadow-2xl border border-white/20"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-600 dark:text-blue-400">
                        <Shield size={32} />
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">Secure Your Account</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">Enable Two-Factor Authentication (2FA)</p>
                </div>

                {step === 1 && (
                    <div className="space-y-6">
                        <div className="bg-slate-50 dark:bg-white/5 p-6 rounded-2xl flex flex-col items-center">
                            {qrCodeUrl ? (
                                <img src={qrCodeUrl} alt="2FA QR Code" className="w-48 h-48 rounded-xl border-4 border-white dark:border-white/10 shadow-sm" />
                            ) : (
                                <div className="w-48 h-48 bg-slate-200 dark:bg-white/10 rounded-xl animate-pulse" />
                            )}
                            <p className="text-xs text-slate-400 mt-4 font-medium uppercase tracking-wider">Scan with Authenticator App</p>
                        </div>

                        <div className="text-center">
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Can't scan the code?</p>
                            <button
                                onClick={copyToClipboard}
                                className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 bg-slate-100 dark:bg-white/10 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/20 transition-colors"
                            >
                                <Copy size={12} />
                                {secret.slice(0, 4)}...{secret.slice(-4)} (Click to Copy)
                            </button>
                        </div>

                        <button
                            onClick={() => setStep(2)}
                            className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-500/20 text-sm"
                        >
                            Continue
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3 text-center">Enter Verification Code</label>
                            <input
                                type="text"
                                maxLength={6}
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                                className="w-full text-center text-3xl font-black tracking-[0.5em] py-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl focus:outline-none focus:border-blue-500 transition-all placeholder:text-slate-300"
                                placeholder="000000"
                                autoFocus
                            />
                            {error && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-red-500 text-xs font-bold text-center mt-3 flex items-center justify-center gap-1.5"
                                >
                                    <AlertTriangle size={12} />
                                    {error}
                                </motion.p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => setStep(1)}
                                className="w-full py-4 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-white/10 transition text-sm"
                            >
                                Back
                            </button>
                            <button
                                onClick={verifyAndEnable}
                                disabled={loading || verificationCode.length !== 6}
                                className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-500/20 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Verifying...' : 'Enable 2FA'}
                            </button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="text-center py-8">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring" }}
                            className="w-20 h-20 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6"
                        >
                            <CheckCircle2 size={40} strokeWidth={3} />
                        </motion.div>
                        <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">2FA Enabled!</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">Your account is now more secure.</p>
                    </div>
                )}
            </motion.div>
        </div>
    )
}
