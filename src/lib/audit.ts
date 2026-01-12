import { db } from './firebase'
import { collection, addDoc } from 'firebase/firestore'

export interface AuditLogEntry {
    adminId: string
    adminEmail?: string
    action: string
    targetId?: string
    targetType?: 'user' | 'investment' | 'system'
    details?: Record<string, any>
    timestamp: string
}

/**
 * Log an admin action to the audit_logs collection
 */
export async function logAdminAction(entry: Omit<AuditLogEntry, 'timestamp'>): Promise<void> {
    try {
        await addDoc(collection(db, 'audit_logs'), {
            ...entry,
            timestamp: new Date().toISOString()
        })
    } catch (error) {
        console.error('Failed to log admin action:', error)
        // Don't throw - audit logging should not break the main flow
    }
}
