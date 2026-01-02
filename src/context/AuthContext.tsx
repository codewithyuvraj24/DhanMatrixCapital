"use client"
import React, { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth, db } from '@/lib/firebase'
import { doc, onSnapshot } from 'firebase/firestore'

type AuthContextType = {
  user: User | null
  profile: any | null
  role: 'admin' | 'user' | null
  loading: boolean     // Overall loading (waits for role & profile)
  userLoading: boolean // Only waits for auth state
}

const AuthContext = createContext<AuthContextType>({ user: null, profile: null, role: null, loading: true, userLoading: true })

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<any | null>(null)
  const [role, setRole] = useState<'admin' | 'user' | null>(null)
  const [loading, setLoading] = useState(true)
  const [userLoading, setUserLoading] = useState(true)

  useEffect(() => {
    // Check for auth hint on mount to speed up protected routes
    if (typeof window !== 'undefined' && localStorage.getItem('dmc_auth_hint')) {
      setUserLoading(false)
    }
  }, [])

  useEffect(() => {
    let profileUnsub: () => void = () => { }
    let adminUnsub: () => void = () => { }

    const unsub = onAuthStateChanged(auth, (u) => {
      console.log('Auth State Changed:', u?.uid || 'None')

      if (u) {
        localStorage.setItem('dmc_auth_hint', 'true')
        setUser(u)
        setUserLoading(false)

        // 1. Listen to Profile (Users Collection)
        profileUnsub = onSnapshot(doc(db, 'users', u.uid), (snap) => {
          if (snap.exists()) {
            setProfile(snap.data())
          } else {
            setProfile(null)
          }
        })

        // 2. Listen to Admin Status (Admins Collection or Super Email)
        if (u.email === 'yuvraj.basutkar24@gmail.com') {
          setRole('admin')
          setLoading(false)
        } else {
          adminUnsub = onSnapshot(doc(db, 'admins', u.uid), (snap) => {
            if (snap.exists()) setRole('admin')
            else setRole('user')
            setLoading(false)
          }, (err) => {
            console.warn('Admin check failed:', err)
            setRole('user')
            setLoading(false)
          })
        }
      } else {
        localStorage.removeItem('dmc_auth_hint')
        setUser(null)
        setProfile(null)
        setRole(null)
        setUserLoading(false)
        setLoading(false)
        profileUnsub()
        adminUnsub()
      }
    })

    return () => {
      unsub()
      profileUnsub()
      adminUnsub()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, profile, role, loading, userLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
