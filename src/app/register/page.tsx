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
    <div className="min-h-screen bg-white p-4 lg:p-6 pt-24 lg:pt-32 flex items-stretch">
      <div className="w-full max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 rounded-3xl overflow-hidden min-h-[calc(100vh-8rem)]">

        {/* Left Side - Register Form */}
        <div className="flex flex-col justify-center items-center p-4 sm:p-12 lg:p-20 bg-white order-2 lg:order-1 relative">
          <div className="w-full max-w-sm space-y-6">
            <div className="space-y-1.5 mt-8 lg:mt-0 text-center lg:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Create Account
              </h1>
              <p className="text-slate-500 text-sm font-medium">
                Join now to start your wealth creation journey.
              </p>
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-600 text-xs font-bold rounded-xl border border-red-100 flex items-center gap-2">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-4">

                {/* Email */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 ml-1">Email</label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      placeholder="name@company.com"
                      className={`w-full h-11 px-4 bg-slate-50 border ${emailError ? 'border-red-300 ring-2 ring-red-100' : 'border-slate-200 focus:border-slate-400 focus:ring-4 focus:ring-slate-100'} rounded-lg outline-none text-sm font-medium text-slate-900 transition-all placeholder:text-slate-400`}
                    />
                    {email && !emailError && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500">
                        <CheckCircle2 size={16} />
                      </div>
                    )}
                  </div>
                  {emailError && <p className="text-[10px] text-red-500 ml-1 font-bold">{emailError}</p>}
                </div>

                {/* Password Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 ml-1">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      placeholder="Create Password"
                      className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100 text-sm font-medium text-slate-900 transition-all placeholder:text-slate-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 ml-1">Confirm</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      required
                      placeholder="Confirm Password"
                      className={`w-full h-11 px-4 bg-slate-50 border ${confirmError ? 'border-red-300 ring-2 ring-red-100' : 'border-slate-200 focus:border-slate-400 focus:ring-4 focus:ring-slate-100'} rounded-lg outline-none text-sm font-medium text-slate-900 transition-all placeholder:text-slate-400`}
                    />
                  </div>
                </div>

                {/* Password Strength */}
                {password && (
                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <PasswordStrength password={password} showRequirements={false} />
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-lg transition-all shadow-sm active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Create Account'}
              </button>
            </form>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase">
                <span className="bg-white px-2 text-slate-400 font-bold tracking-widest">Or</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading || googleLoading}
              className="w-full flex items-center justify-center gap-2 h-11 border border-slate-200 rounded-lg font-bold text-sm text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {googleLoading ? (
                <div className="h-4 w-4 border-2 border-slate-400 border-t-slate-700 rounded-full animate-spin" />
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              )}
              Continue with Google
            </button>

            <p className="text-center text-xs font-medium text-slate-400">
              Already have an account?{' '}
              <Link href="/login" className="text-slate-900 font-bold hover:underline">
                Sign In
              </Link>
            </p>
          </div>

          <div className="absolute bottom-6 text-center w-full">
            <p className="text-[10px] text-slate-300 font-medium">
              © 2026 DhanMatrix Capital. <Link href="/privacy" className="hover:text-slate-500">Privacy</Link> & <Link href="/terms" className="hover:text-slate-500">Terms</Link>
            </p>
          </div>
        </div>

        {/* Right Side - Visuals - Premium Dark Navy */}
        <div className="hidden lg:flex flex-col justify-center items-center p-12 bg-slate-900 rounded-[2rem] relative overflow-hidden order-1 lg:order-2 shadow-2xl">
          <div className="w-full max-w-md relative z-10 text-center mb-10">
            <h2 className="text-3xl font-bold text-white leading-tight mb-3">
              Start your journey <br /> <span className="text-blue-400">today.</span>
            </h2>
            <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-xs mx-auto">
              Join thousands of investors using DhanMatrix to secure their financial future.
            </p>
          </div>

          {/* Minimal Dashboard Abstraction - Dark Mode Optimized */}
          <div className="relative w-full max-w-sm rounded-2xl bg-slate-800 shadow-2xl shadow-black/50 overflow-hidden border border-slate-700/50">
            {/* Header */}
            <div className="h-10 border-b border-slate-700/50 flex items-center px-4 gap-3 bg-slate-800">
              <div className="w-2 h-2 rounded-full bg-slate-600"></div>
              <div className="w-2 h-2 rounded-full bg-slate-600"></div>
              <div className="ml-auto w-16 h-2 rounded-full bg-slate-700"></div>
            </div>
            {/* Body */}
            <div className="p-5 grid grid-cols-2 gap-4 bg-slate-900/50">
              {/* Chart */}
              <div className="col-span-2 bg-slate-800 p-4 rounded-xl border border-slate-700/50 shadow-sm h-32 flex items-end gap-2 px-6 pb-2 relative overflow-hidden">
                {/* Gradient Graph */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-emerald-500/10 to-transparent"></div>
                <div className="flex-1 h-3/4 bg-emerald-500 rounded-t-sm opacity-60"></div>
                <div className="flex-1 h-1/2 bg-emerald-500 rounded-t-sm opacity-40"></div>
                <div className="flex-1 h-full bg-emerald-500 rounded-t-sm"></div>
                <div className="flex-1 h-2/3 bg-emerald-500 rounded-t-sm opacity-50"></div>
              </div>
              {/* Stats */}
              <div className="bg-slate-800 p-3 rounded-xl border border-slate-700/50 shadow-sm h-20">
                <div className="w-6 h-6 rounded-full bg-slate-700 mb-2"></div>
                <div className="w-12 h-2 rounded-full bg-slate-700"></div>
              </div>
              <div className="bg-indigo-600 p-3 rounded-xl shadow-sm h-20 flex flex-col justify-end">
                <div className="w-10 h-2 rounded-full bg-white/30"></div>
              </div>
            </div>
          </div>

          {/* Subtle texture - Deep & Mysterious */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-900/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>
        </div>

      </div>
    </div>
  )
}
