"use client"

import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth, db } from '@/lib/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import { m, AnimatePresence } from 'framer-motion'
import { FadeIn } from '@/components/ui/Animations'
import { Lock, Mail, ArrowRight, ShieldCheck, UserCheck, AlertCircle, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { checkRateLimit, recordFailedAttempt, clearLoginAttempts } from '@/lib/security'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const { user: currentUser, profile, role } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (currentUser && role) {
      if (role === 'admin') router.push('/admin')
      else if (profile?.onboardingComplete) router.push('/dashboard')
      else router.push('/onboarding')
    }
  }, [currentUser, profile, role, router])

  // Real-time email validation
  useEffect(() => {
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Invalid email format')
    } else {
      setEmailError('')
    }
  }, [email])

  const shakeVariants = {
    shake: {
      x: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.4 }
    }
  }

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Check rate limit first
      const rateLimitCheck = await checkRateLimit(email)
      if (!rateLimitCheck.allowed) {
        const minutesLeft = rateLimitCheck.lockedUntil
          ? Math.ceil((rateLimitCheck.lockedUntil.getTime() - Date.now()) / 60000)
          : 15
        setError(`Too many failed attempts. Please try again in ${minutesLeft} minute${minutesLeft !== 1 ? 's' : ''}.`)
        setLoading(false)
        return
      }

      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      // Clear login attempts on successful login
      await clearLoginAttempts(email)

      const isSuperAdmin = user.email === 'yuvraj.basutkar24@gmail.com'
      const adminDoc = !isSuperAdmin ? await getDoc(doc(db, 'admins', user.uid)) : null

      if (isSuperAdmin || (adminDoc && adminDoc.exists())) {
        router.push('/admin')
      } else {
        const userDoc = await getDoc(doc(db, 'users', user.uid))
        if (userDoc.exists() && userDoc.data().onboardingComplete) {
          router.push('/dashboard')
        } else {
          if (!userDoc.exists()) {
            await setDoc(doc(db, 'users', user.uid), {
              uid: user.uid,
              email: user.email,
              role: 'user',
              createdAt: new Date().toISOString()
            })
          }
          router.push('/onboarding')
        }
      }
    } catch (err: any) {
      console.error('Login error:', err.code, err.message)

      // Record failed attempt for rate limiting
      if (err.code !== 'auth/network-request-failed') {
        await recordFailedAttempt(email)
      }

      switch (err.code) {
        case 'auth/user-not-found':
          setError('No account found with this email.')
          break
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          setError('Invalid email or password.')
          break
        case 'auth/too-many-requests':
          setError('Too many failed attempts. Please try again later.')
          break
        default:
          setError('Failed to sign in. Please check your credentials.')
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
      const user = result.user
      const userDoc = await getDoc(doc(db, 'users', user.uid))

      if (userDoc.exists() && userDoc.data().onboardingComplete) {
        const isSuperAdmin = user.email === 'yuvraj.basutkar24@gmail.com'
        const adminDoc = !isSuperAdmin ? await getDoc(doc(db, 'admins', user.uid)) : null
        if (isSuperAdmin || (adminDoc && adminDoc.exists())) {
          router.push('/admin')
        } else {
          router.push('/dashboard')
        }
      } else {
        // Only create the user document if it doesn't exist to ensure uniqueness
        if (!userDoc.exists()) {
          await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            role: 'user', // Default role for new signups
            createdAt: new Date().toISOString(),
            onboardingComplete: false
          })
        }
        router.push('/onboarding')
      }
    } catch (err: any) {
      console.error('Google Sign-In error:', err.code, err.message)
      if (err.code === 'auth/popup-closed-by-user') {
        // Just clear loading, don't necessarily show error as user chose to close it
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
          <h1 className="font-heading text-2xl font-semibold text-slate-900">
            Sign in to DhanMatrixCapital
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Secure access to your investments
          </p>
        </div>

        {error && (
          <m.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-red-50 text-red-600 text-xs font-medium rounded-xl border border-red-100 text-center"
          >
            {error}
          </m.div>
        )}

        <m.form
          onSubmit={handleLogin}
          animate={error ? "shake" : ""}
          variants={shakeVariants}
        >
          <div className="space-y-4">
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
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="Password"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:ring-2 focus:ring-brand-primary outline-none text-slate-900"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-brand-primary py-2.5 text-white font-semibold text-sm active:scale-[0.98] transition shadow-lg shadow-brand-primary/20 hover:bg-brand-secondary disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {loading ? <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Sign In'}
            </button>

            <div className="text-center">
              <Link href="/forgot-password" className="text-xs font-medium text-brand-primary hover:underline">
                Forgot Password?
              </Link>
            </div>
          </div>
        </m.form>


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
          <Link href="/register" className="mb-4 block text-brand-primary font-semibold text-sm hover:underline">
            Don&apos;t have an account? Sign Up
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
