import { db } from './firebase'
import { collection, doc, getDoc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore'

const MAX_ATTEMPTS = 5
const LOCKOUT_DURATION_MS = 15 * 60 * 1000 // 15 minutes

export interface RateLimitResult {
    allowed: boolean
    remainingAttempts?: number
    lockedUntil?: Date
}

/**
 * Check if a user is rate-limited based on their email
 */
export async function checkRateLimit(email: string): Promise<RateLimitResult> {
    const attemptDocRef = doc(db, 'login_attempts', email)
    const attemptDoc = await getDoc(attemptDocRef)

    if (!attemptDoc.exists()) {
        return { allowed: true, remainingAttempts: MAX_ATTEMPTS }
    }

    const data = attemptDoc.data()
    const { attempts, lockedUntil } = data

    // Check if still locked
    if (lockedUntil && new Date(lockedUntil) > new Date()) {
        return {
            allowed: false,
            lockedUntil: new Date(lockedUntil)
        }
    }

    // If lock expired, clear it
    if (lockedUntil && new Date(lockedUntil) <= new Date()) {
        await deleteDoc(attemptDocRef)
        return { allowed: true, remainingAttempts: MAX_ATTEMPTS }
    }

    // Check attempts
    if (attempts >= MAX_ATTEMPTS) {
        const lockUntil = new Date(Date.now() + LOCKOUT_DURATION_MS)
        await updateDoc(attemptDocRef, { lockedUntil: lockUntil.toISOString() })
        return {
            allowed: false,
            lockedUntil: lockUntil
        }
    }

    return {
        allowed: true,
        remainingAttempts: MAX_ATTEMPTS - attempts
    }
}

/**
 * Record a failed login attempt
 */
export async function recordFailedAttempt(email: string): Promise<void> {
    const attemptDocRef = doc(db, 'login_attempts', email)
    const attemptDoc = await getDoc(attemptDocRef)

    if (!attemptDoc.exists()) {
        await setDoc(attemptDocRef, {
            attempts: 1,
            lastAttempt: new Date().toISOString()
        })
    } else {
        const data = attemptDoc.data()
        await updateDoc(attemptDocRef, {
            attempts: (data.attempts || 0) + 1,
            lastAttempt: new Date().toISOString()
        })
    }
}

/**
 * Clear login attempts on successful login
 */
export async function clearLoginAttempts(email: string): Promise<void> {
    const attemptDocRef = doc(db, 'login_attempts', email)
    const attemptDoc = await getDoc(attemptDocRef)

    if (attemptDoc.exists()) {
        await deleteDoc(attemptDocRef)
    }
}
