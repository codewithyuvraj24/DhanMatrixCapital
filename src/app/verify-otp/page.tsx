"use client"

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export default function VerifyOtpPage() {
    const [otp, setOtp] = useState(['', '', '', '', '', ''])
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])
    const router = useRouter()
    // In a real app, you'd access the confirmationResult here usually via Context or a global store
    // const { confirmOTP } = useAuth() 

    const handleChange = (index: number, value: string) => {
        if (isNaN(Number(value))) return

        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)

        // Auto-focus next
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus()
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }

    const handleVerify = async () => {
        const code = otp.join('')
        console.log("Verifying code:", code)
        // Add verification logic here using window.confirmationResult or Context
        // await window.confirmationResult.confirm(code)
        // router.push('/dashboard')
    }

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm p-6">

                <h1 className="text-2xl font-semibold text-slate-900 mb-1">
                    Verify OTP
                </h1>
                <p className="text-sm text-slate-500 mb-6">
                    Enter the 6-digit code sent to your mobile
                </p>

                {/* OTP Inputs */}
                <div className="flex justify-between gap-2 mb-6">
                    {[...Array(6)].map((_, i) => (
                        <input
                            key={i}
                            ref={el => { inputRefs.current[i] = el }}
                            type="text"
                            maxLength={1}
                            value={otp[i]}
                            onChange={(e) => handleChange(i, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(i, e)}
                            className="w-12 h-12 text-center text-lg font-semibold rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-primary outline-none text-slate-900"
                        />
                    ))}
                </div>

                <button
                    onClick={handleVerify}
                    className="w-full rounded-xl bg-brand-primary py-3 text-white font-semibold hover:bg-brand-secondary transition active:scale-[0.98]"
                >
                    Verify & Continue
                </button>

                <div className="mt-4 text-center text-sm text-slate-500">
                    Didn&apos;t receive OTP?
                    <button className="ml-1 text-brand-primary font-medium hover:underline">
                        Resend
                    </button>
                </div>
            </div>
        </div>
    )
}
