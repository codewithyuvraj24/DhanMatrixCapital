import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { collection, query, where, getDocsFromCache, getDocsFromServer, addDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Investment } from '@/types/investment'
import { validateInvestmentAmount, validateWithdrawalDate, getAmountErrorMessage } from '@/lib/validators'
import { useToast } from '@/components/ui/PremiumToast'

export function useInvestments() {
    const { user } = useAuth()
    const { showToast } = useToast()

    const [investments, setInvestments] = useState<Investment[]>([])
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)

    // Data Fetching
    useEffect(() => {
        if (!user) {
            setLoading(false)
            return
        }

        const fetchInvestments = async () => {
            try {
                const q = query(collection(db, 'investments'), where('userId', '==', user.uid))

                // 1. Try cache first for instant load (silently fail if cache miss)
                try {
                    const cachedSnap = await getDocsFromCache(q)
                    if (!cachedSnap.empty) {
                        setInvestments(cachedSnap.docs.map(d => ({ id: d.id, ...d.data() } as Investment)))
                        setLoading(false)
                    }
                } catch (cacheError) {
                    // Cache miss is expected on first load, don't log
                }

                // 2. Fetch from server with timeout
                const serverPromise = getDocsFromServer(q)
                const timeoutPromise = new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('Network Timeout')), 15000)
                )

                const snap = await Promise.race([serverPromise, timeoutPromise]) as any
                const items = snap.docs.map((d: any) => ({ id: d.id, ...d.data() } as Investment))
                setInvestments(items)
            } catch (err: any) {
                // Only log unexpected errors
                if (!err.message?.includes('Failed to get documents from server')) {
                    console.warn('Investment fetch issue:', err.message)
                }

                // Show user-friendly messages for specific errors
                if (err.message?.includes('failed-precondition') || err.message?.includes('network-error')) {
                    showToast('Please check your internet connection', 'error')
                } else if (err.message?.includes('Network Timeout')) {
                    showToast('Loading is taking longer than usual...', 'info')
                }
            } finally {
                setLoading(false)
            }
        }

        fetchInvestments()
    }, [user, showToast])

    // Actions
    const createInvestment = async (formData: { depositAmount: string, withdrawalDate: string, status: string }): Promise<boolean> => {
        if (!user) {
            showToast('You must be logged in', 'error')
            return false
        }

        // Validation
        if (!formData.depositAmount) {
            showToast('Amount required', 'error'); return false
        }
        if (!validateInvestmentAmount(formData.depositAmount)) {
            showToast(getAmountErrorMessage(formData.depositAmount), 'error'); return false
        }
        if (!formData.withdrawalDate) {
            showToast('Date required', 'error'); return false
        }
        if (!validateWithdrawalDate(formData.withdrawalDate)) {
            showToast('Date must be in future', 'error'); return false
        }

        setSubmitting(true)
        try {
            const docRef = await addDoc(collection(db, 'investments'), {
                userId: user.uid,
                depositAmount: parseFloat(formData.depositAmount),
                withdrawalDate: formData.withdrawalDate,
                status: formData.status,
                createdAt: new Date().toISOString()
            })

            const newInvestment: Investment = {
                id: docRef.id,
                userId: user.uid,
                depositAmount: parseFloat(formData.depositAmount),
                withdrawalDate: formData.withdrawalDate,
                status: formData.status as any,
                createdAt: new Date().toISOString()
            }

            setInvestments(prev => [newInvestment, ...prev])
            showToast('Investment created successfully!', 'success')
            return true
        } catch (err) {
            console.error(err)
            showToast('Failed to create investment', 'error')
            return false
        } finally {
            setSubmitting(false)
        }
    }

    // Derived stats could also be here or in the component. 
    // For now we just return the raw data and let component derive.

    return {
        investments,
        loading,
        submitting,
        createInvestment
    }
}
