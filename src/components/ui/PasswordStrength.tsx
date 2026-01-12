"use client"

import { useMemo } from 'react'
import { Check, X } from 'lucide-react'

interface PasswordStrengthProps {
    password: string
    showRequirements?: boolean
}

interface PasswordRequirement {
    label: string
    test: (password: string) => boolean
}

export default function PasswordStrength({ password, showRequirements = true }: PasswordStrengthProps) {
    const requirements: PasswordRequirement[] = [
        { label: 'At least 8 characters', test: (p) => p.length >= 8 },
        { label: 'Contains uppercase letter', test: (p) => /[A-Z]/.test(p) },
        { label: 'Contains lowercase letter', test: (p) => /[a-z]/.test(p) },
        { label: 'Contains number', test: (p) => /[0-9]/.test(p) },
        { label: 'Contains special character', test: (p) => /[^A-Za-z0-9]/.test(p) },
    ]

    const strength = useMemo(() => {
        if (!password) return { score: 0, label: '', color: '' }

        const passed = requirements.filter(req => req.test(password)).length
        const percentage = (passed / requirements.length) * 100

        if (percentage < 40) {
            return { score: percentage, label: 'Weak', color: 'bg-red-500' }
        } else if (percentage < 80) {
            return { score: percentage, label: 'Medium', color: 'bg-yellow-500' }
        } else {
            return { score: percentage, label: 'Strong', color: 'bg-emerald-500' }
        }
    }, [password])

    if (!password) return null

    return (
        <div className="space-y-3">
            {/* Strength Bar */}
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-600">Password Strength</span>
                    <span className={`text-xs font-bold ${strength.label === 'Weak' ? 'text-red-600' :
                            strength.label === 'Medium' ? 'text-yellow-600' :
                                'text-emerald-600'
                        }`}>
                        {strength.label}
                    </span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                        className={`h-full transition-all duration-300 ${strength.color}`}
                        style={{ width: `${strength.score}%` }}
                    />
                </div>
            </div>

            {/* Requirements Checklist */}
            {showRequirements && (
                <div className="bg-slate-50 rounded-xl p-3 space-y-2">
                    <p className="text-xs font-bold text-slate-600 mb-2">Requirements:</p>
                    {requirements.map((req, idx) => {
                        const passed = req.test(password)
                        return (
                            <div key={idx} className="flex items-center gap-2">
                                <div className={`w-4 h-4 rounded-full flex items-center justify-center ${passed ? 'bg-emerald-500' : 'bg-slate-200'
                                    }`}>
                                    {passed ? (
                                        <Check size={12} className="text-white" strokeWidth={3} />
                                    ) : (
                                        <X size={12} className="text-slate-400" strokeWidth={3} />
                                    )}
                                </div>
                                <span className={`text-xs font-medium ${passed ? 'text-emerald-700' : 'text-slate-500'
                                    }`}>
                                    {req.label}
                                </span>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
