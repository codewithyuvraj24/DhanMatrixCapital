"use client"

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendEmailVerification } from 'firebase/auth'
import { auth, db } from '@/lib/firebase'
import { setDoc, doc, getDoc } from 'firebase/firestore'
import { motion } from 'framer-motion'
import { FadeIn } from '@/components/ui/Animations'
import { Mail, Lock, ArrowRight, ShieldCheck, UserCheck, CheckCircle2, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import PasswordStrength from '@/components/ui/PasswordStrength'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmError, setConfirmError] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const { user, profile, role } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user && role) {
      if (role === 'admin') router.push('/admin')
      else if (profile?.onboardingComplete) router.push('/dashboard')
      else router.push('/onboarding')
    }
  }, [user, profile, role, router])

  // Real-time validation
  useEffect(() => {
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Invalid email format')
    } else {
      setEmailError('')
    }
  }, [email])

  useEffect(() => {
    if (confirmPassword && password !== confirmPassword) {
      setConfirmError('Passwords do not match')
    } else {
      setConfirmError('')
    }
  }, [password, confirmPassword])

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match')
      }
      if (password.length < 8) {
        throw new Error('Password must be at least 8 characters')
      }

      const cred = await createUserWithEmailAndPassword(auth, email, password)
      const u = cred.user

      // Send email verification
      try {
        await sendEmailVerification(u, {
          url: `${window.location.origin}/login`,
          handleCodeInApp: false,
        })
      } catch (verifyErr) {
        console.warn('Email verification send failed:', verifyErr)
        // Don't block registration if email fails
      }

      // Check if document exists despite being a new auth user (safety check for uniqueness)
      const userDoc = await getDoc(doc(db, 'users', u.uid))

      if (!userDoc.exists()) {
        await setDoc(doc(db, 'users', u.uid), {
          uid: u.uid,
          email: email,
          displayName: email.split('@')[0], // Default name from email
          role: 'user',
          onboardingComplete: false,
          createdAt: new Date().toISOString(),
          emailVerified: false
        })
      }

      router.push('/onboarding')
    } catch (err: any) {
      console.error('Registration error:', err.code, err.message)
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('This email is already registered. Please sign in instead.')
          break
        case 'auth/invalid-email':
          setError('Please enter a valid email address.')
          break
        case 'auth/weak-password':
          setError('Password should be at least 8 characters long.')
          break
        default:
          setError(err.message || 'Failed to create account. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogleSignIn() {
    setError('')
    try {
      const provider = new GoogleAuthProvider()
      // Trigger popup immediately to preserve user gesture context
      const result = await signInWithPopup(auth, provider)

      setGoogleLoading(true)
      const u = result.user
      const userDoc = await getDoc(doc(db, 'users', u.uid))

      if (userDoc.exists() && userDoc.data().onboardingComplete) {
        const isSuperAdmin = u.email === 'yuvraj.basutkar24@gmail.com'
        const adminDoc = !isSuperAdmin ? await getDoc(doc(db, 'admins', u.uid)) : null
        router.push(isSuperAdmin || (adminDoc && adminDoc.exists()) ? '/admin' : '/dashboard')
      } else {
        if (!userDoc.exists()) {
          await setDoc(doc(db, 'users', u.uid), {
            uid: u.uid,
            email: u.email,
            displayName: u.displayName,
            role: 'user',
            onboardingComplete: false,
            createdAt: new Date().toISOString()
          })
        }
        router.push('/onboarding')
      }
    } catch (err: any) {
      console.error('Google Sign-In error:', err.code, err.message)
      if (err.code === 'auth/popup-closed-by-user') {
        // Just clear loading
      } else {
        setError('Failed to sign in with Google. Please try again.')
      }
    } finally {
      setGoogleLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-sm p-5">

        {/* Header */}
        <div className="text-center mb-5 pt-1">
          <h1 className="font-heading text-xl font-semibold text-slate-900">
            Create Account
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Join the future of wealth management
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-xs font-medium rounded-xl border border-red-100 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister}>
          <div className="space-y-5">
            <div>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="Email address"
                  className={`w-full rounded-xl border px-4 py-3 text-sm focus:ring-2 outline-none transition-all ${emailError
                    ? 'border-red-200 focus:ring-red-100'
                    : email && !emailError
                      ? 'border-emerald-200 focus:ring-emerald-100'
                      : 'border-slate-200 focus:ring-brand-primary'
                    } text-slate-900`}
                />
                {email && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    {emailError ? (
                      <AlertCircle size={16} className="text-red-500" />
                    ) : (
                      <CheckCircle2 size={16} className="text-emerald-500" />
                    )}
                  </div>
                )}
              </div>
              {emailError && <p className="text-[10px] text-red-500 mt-1.5 ml-1 font-bold">{emailError}</p>}
            </div>

            <div>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="Create Password"
                  className={`w-full rounded-xl border px-4 py-3 text-sm focus:ring-2 outline-none transition-all ${password && password.length < 8
                    ? 'border-red-200 focus:ring-red-100'
                    : password && password.length >= 8
                      ? 'border-emerald-200 focus:ring-emerald-100'
                      : 'border-slate-200 focus:ring-brand-primary'
                    } text-slate-900`}
                />
                {password && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    {password.length < 8 ? (
                      <AlertCircle size={16} className="text-red-500" />
                    ) : (
                      <CheckCircle2 size={16} className="text-emerald-500" />
                    )}
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="relative">
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Confirm Password"
                  className={`w-full rounded-xl border px-4 py-3 text-sm focus:ring-2 outline-none transition-all ${confirmError
                    ? 'border-red-200 focus:ring-red-100'
                    : confirmPassword && !confirmError
                      ? 'border-emerald-200 focus:ring-emerald-100'
                      : 'border-slate-200 focus:ring-brand-primary'
                    } text-slate-900`}
                />
                {confirmPassword && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    {confirmError ? (
                      <AlertCircle size={16} className="text-red-500" />
                    ) : (
                      <CheckCircle2 size={16} className="text-emerald-500" />
                    )}
                  </div>
                )}
              </div>
              {confirmError && <p className="text-[10px] text-red-500 mt-1.5 ml-1 font-bold">{confirmError}</p>}
            </div>

            {/* Password Strength Indicator */}
            {password && (
              <PasswordStrength password={password} showRequirements={true} />
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-brand-primary py-2.5 text-white font-semibold text-sm active:scale-[0.98] transition shadow-lg shadow-brand-primary/20 hover:bg-brand-secondary disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {loading ? <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Create Account'}
            </button>
          </div>
        </form>


        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px bg-slate-200 flex-1" />
          <span className="text-xs text-slate-400 font-medium">OR</span>
          <div className="h-px bg-slate-200 flex-1" />
        </div>

        {/* Google */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading || googleLoading}
          className="w-full flex items-center justify-center gap-3 rounded-xl border border-slate-200 py-3 text-sm font-medium hover:bg-slate-50 transition active:scale-[0.98] text-slate-700 disabled:opacity-50"
        >
          {googleLoading ? (
            <div className="h-5 w-5 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
          ) : (
            <>
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </>
          )}
        </button>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-slate-400">
          <Link href="/login" className="mb-4 block text-brand-primary font-semibold text-sm hover:underline">
            Already have an account? Login
          </Link>
          <p className="flex items-center justify-center gap-1.5 opacity-80">
            <ShieldCheck size={12} className="text-emerald-500" />
            Bank-grade 256-bit encryption
          </p>
        </div>
      </div>
    </div>
  )
}
