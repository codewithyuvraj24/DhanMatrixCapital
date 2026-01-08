"use client"

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth, db } from '@/lib/firebase'
import { setDoc, doc, getDoc } from 'firebase/firestore'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeIn } from '@/components/ui/Animations'
import { Mail, Lock, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import PhoneAuth from '@/components/auth/PhoneAuth'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('phone')
  const { user, profile, role } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user && role) {
      if (role === 'admin') router.push('/admin')
      else if (profile?.onboardingComplete) router.push('/dashboard')
      else router.push('/onboarding')
    }
  }, [user, profile, role, router])

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match')
      }
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters')
      }

      const cred = await createUserWithEmailAndPassword(auth, email, password)
      const u = cred.user

      await setDoc(doc(db, 'users', u.uid), {
        uid: u.uid,
        email: email,
        role: 'user',
        onboardingComplete: false,
        createdAt: new Date().toISOString()
      }, { merge: true })

      router.push('/onboarding')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogleSignIn() {
    setError('')
    setLoading(true)
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
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
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-900 flex items-center justify-center px-4 py-10">
      <FadeIn className="w-full max-w-sm relative z-10">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-1 shadow-2xl">
          <div className="bg-white rounded-[1.2rem] p-8 pb-10 shadow-inner">

            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-4 shadow-sm text-blue-600">
                <UserCheck size={32} />
              </div>
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Create Account</h1>
              <p className="text-slate-500 text-sm mt-2">Join the future of wealth management</p>
            </div>

            {error && (
              <div className="mb-6 mx-auto max-w-[90%] p-3 bg-red-50 text-center text-red-600 text-xs font-bold rounded-xl border border-red-100">
                {error}
              </div>
            )}

            <AnimatePresence mode="wait">
              {authMethod === 'email' ? (
                <motion.form
                  key="email-form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleRegister}
                  className="space-y-4"
                >
                  <div className="relative group">
                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-blue-600 transition-colors">
                      <Mail size={20} />
                    </span>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      className="w-full pl-11 pr-5 py-3.5 bg-slate-50 border border-slate-200 rounded-full text-slate-900 text-sm font-medium focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400"
                      placeholder="Email Address"
                    />
                  </div>

                  <div className="relative group">
                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-blue-600 transition-colors">
                      <Lock size={20} />
                    </span>
                    <input
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      className="w-full pl-11 pr-5 py-3.5 bg-slate-50 border border-slate-200 rounded-full text-slate-900 text-sm font-medium focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400"
                      placeholder="Create Password"
                    />
                  </div>

                  <div className="relative group">
                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-blue-600 transition-colors">
                      <Lock size={20} />
                    </span>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      required
                      className="w-full pl-11 pr-5 py-3.5 bg-slate-50 border border-slate-200 rounded-full text-slate-900 text-sm font-medium focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400"
                      placeholder="Confirm Password"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center gap-2 mt-2 uppercase tracking-wide"
                  >
                    {loading ? (
                      <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      'CREATE ACCOUNT'
                    )}
                  </button>

                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={() => setAuthMethod('phone')}
                      className="text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors"
                    >
                      Or sign up with Mobile OTP
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="phone-form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <PhoneAuth />
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setAuthMethod('email')}
                      className="text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors uppercase tracking-wider"
                    >
                      Back to Email Usage
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center gap-4 my-8 px-2">
              <div className="h-px flex-1 bg-slate-200"></div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Or Join With</span>
              <div className="h-px flex-1 bg-slate-200"></div>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={handleGoogleSignIn}
                className="w-12 h-12 flex items-center justify-center rounded-full border border-slate-200 hover:border-blue-100 hover:bg-blue-50 transition-all shadow-sm hover:shadow-md active:scale-95 bg-white"
                title="Google"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              </button>
            </div>

            <div className="mt-10 text-center">
              <p className="text-sm font-medium text-slate-500">
                Already have an account? <Link href="/login" className="text-blue-600 font-bold hover:underline">Log In</Link>
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-white/60 text-[10px] font-medium tracking-wider uppercase flex items-center justify-center gap-2">
            <ShieldCheck size={14} className="text-emerald-400" />
            Secured by Dhanmatrix Capital
          </p>
        </div>
      </FadeIn>
    </div>
  )
}
