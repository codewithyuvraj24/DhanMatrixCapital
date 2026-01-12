"use client"
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import { useAuth } from '@/context/AuthContext'
import { useState } from 'react'
import { updateProfile, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeIn, Stagger, ScaleIn } from '@/components/ui/Animations'
import { User, Shield, Activity, Save, Mail, CreditCard, Calendar, LogOut, CheckCircle2 } from 'lucide-react'
import ProfilePictureUpload from '@/components/ui/ProfilePictureUpload'
import EmailVerificationBanner from '@/components/ui/EmailVerificationBanner'
import TwoFactorSetup from '@/components/ui/TwoFactorSetup'

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6">
        <ProfileContent />
      </div>
    </ProtectedRoute>
  )
}

function ProfileContent() {
  const { user, profile } = useAuth() // Get profile from context for 2FA status
  const [displayName, setDisplayName] = useState(user?.displayName || '')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('profile')

  // Password Change State
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')

  // 2FA State
  const [showTwoFactorSetup, setShowTwoFactorSetup] = useState(false)

  async function handleUpdateProfile() {
    if (!user) return
    setLoading(true)
    setMessage('')
    setError('')
    try {
      await updateProfile(user, { displayName })
      setMessage('Profile updated successfully!')
      setTimeout(() => setMessage(''), 3000)
    } catch (err: any) {
      setError('Error updating profile: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleChangePassword() {
    if (!user || !user.email) return
    if (newPassword !== confirmNewPassword) {
      setError('New passwords do not match')
      return
    }
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    setLoading(true)
    setError('')
    setMessage('')

    try {
      // Re-authenticate first
      const credential = EmailAuthProvider.credential(user.email, currentPassword)
      await reauthenticateWithCredential(user, credential)

      // Update password
      await updatePassword(user, newPassword)

      setMessage('Password updated successfully!')
      setShowPasswordForm(false)
      setCurrentPassword('')
      setNewPassword('')
      setConfirmNewPassword('')
      setTimeout(() => setMessage(''), 3000)
    } catch (err: any) {
      console.error(err)
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
        setError('Incorrect current password')
      } else {
        setError('Failed to update password: ' + err.message)
      }
    } finally {
      setLoading(false)
    }
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'activity', label: 'Activity', icon: Activity },
  ]

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header Section */}
      <FadeIn className="mb-10 text-center sm:text-left">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
          My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">Profile</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 font-medium text-lg">
          Manage your personal matrix configuration
        </p>
      </FadeIn>

      {/* Email Verification Banner */}
      <EmailVerificationBanner
        isVerified={user?.emailVerified || false}
        userEmail={user?.email}
      />

      {/* Main Content Card */}
      <div className="flex flex-col lg:flex-row gap-8">

        {/* Sidebar / Tabs */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <Stagger className="space-y-2 bg-white/50 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10 p-2 rounded-2xl">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all relative overflow-hidden ${isActive
                    ? 'text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'
                    }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500"
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-3">
                    <Icon size={20} />
                    {tab.label}
                  </span>
                </motion.button>
              )
            })}
          </Stagger>

          {/* User Quick Stats Sidebar */}
          <FadeIn delay={0.2} className="mt-6 p-6 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <User size={100} />
            </div>
            <div className="relative z-10">
              <div className="mb-4">
                <ProfilePictureUpload
                  currentPhotoURL={user?.photoURL}
                  displayName={displayName || user?.email || 'User'}
                  onUploadComplete={() => {
                    setMessage('Profile picture updated successfully!')
                    setTimeout(() => setMessage(''), 3000)
                  }}
                />
              </div>
              <h3 className="font-bold text-lg text-center">{displayName}</h3>
              <p className="text-blue-200 text-sm mb-4 text-center">{user?.email}</p>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest bg-emerald-500/20 text-emerald-300 py-1 px-3 rounded-full w-fit mx-auto">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Active
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Tab Content Area */}
        <div className="flex-1 min-h-[400px]">
          <AnimatePresence mode='wait'>

            {/* PROFILE TAB */}
            {activeTab === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="bg-white/80 dark:bg-black/40 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl p-8 shadow-sm">
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                    <User className="text-blue-500" size={24} />
                    Personal Information
                  </h3>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Display Name</label>
                      <input
                        type="text"
                        value={displayName}
                        onChange={e => setDisplayName(e.target.value)}
                        className="w-full px-5 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors font-medium"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email Identity</label>
                      <div className="relative">
                        <input
                          type="email"
                          value={user?.email || ''}
                          disabled
                          className="w-full px-5 py-3 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-xl text-slate-500 dark:text-slate-400 font-medium cursor-not-allowed pl-12"
                        />
                        <Mail className="absolute left-4 top-3.5 text-slate-400" size={18} />
                        {user?.emailVerified ? (
                          <div className="absolute right-4 top-3.5 flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                            <CheckCircle2 size={16} strokeWidth={2.5} />
                            <span className="text-xs font-bold">Verified</span>
                          </div>
                        ) : (
                          <div className="absolute right-4 top-3.5 flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
                            <Mail size={16} strokeWidth={2.5} />
                            <span className="text-xs font-bold">Not Verified</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {message && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-3 text-emerald-600 dark:text-emerald-400 font-bold text-sm"
                      >
                        <CheckCircle2 size={18} />
                        {message}
                      </motion.div>
                    )}

                    <div className="pt-4">
                      <button
                        onClick={handleUpdateProfile}
                        disabled={loading}
                        className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95"
                      >
                        {loading ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            <Save size={18} />
                            Save Changes
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-white/80 dark:bg-black/40 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl">
                    <div className="flex items-center gap-3 mb-4 text-purple-600 dark:text-purple-400">
                      <CreditCard size={24} />
                      <span className="font-bold">Subscription</span>
                    </div>
                    <p className="text-2xl font-black text-slate-900 dark:text-white">Free Matrix Plan</p>
                    <p className="text-sm text-slate-500 mt-1">Upgrade for advanced analytics</p>
                    <Link href="/plans" className="inline-block mt-4 text-sm font-bold text-purple-600 hover:text-purple-500 hover:underline">
                      View Plans &rarr;
                    </Link>
                  </div>

                  <div className="p-6 bg-white/80 dark:bg-black/40 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl">
                    <div className="flex items-center gap-3 mb-4 text-blue-600 dark:text-blue-400">
                      <Calendar size={24} />
                      <span className="font-bold">Joined</span>
                    </div>
                    <p className="text-2xl font-black text-slate-900 dark:text-white">
                      {user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'Recent'}
                    </p>
                    <p className="text-sm text-slate-500 mt-1">Matrix Initialization Date</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* SECURITY TAB */}
            {activeTab === 'security' && (
              <motion.div
                key="security"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="bg-white/80 dark:bg-black/40 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl p-8">
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                    <Shield className="text-emerald-500" size={24} />
                    Security Settings
                  </h3>

                  <div className="space-y-6">
                    {error && (
                      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-600 dark:text-red-400 text-sm font-bold">
                        {error}
                      </div>
                    )}

                    {message && (
                      <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-600 dark:text-emerald-400 text-sm font-bold">
                        {message}
                      </div>
                    )}

                    {/* Password Change Section */}
                    <div className="p-6 border border-slate-100 dark:border-white/5 rounded-2xl bg-white/50 dark:bg-white/5">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-bold text-slate-900 dark:text-white">Password</h4>
                          <p className="text-sm text-slate-500">Ensure your account is using a strong password</p>
                        </div>
                        <button
                          onClick={() => setShowPasswordForm(!showPasswordForm)}
                          className="text-sm font-bold text-blue-600 hover:text-blue-500 px-4 py-2 bg-blue-50 dark:bg-blue-500/10 rounded-lg transition-colors"
                        >
                          {showPasswordForm ? 'Cancel' : 'Update Password'}
                        </button>
                      </div>

                      <AnimatePresence>
                        {showPasswordForm && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-4 space-y-4 border-t border-slate-100 dark:border-white/5 mt-4">
                              <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Current Password</label>
                                <input
                                  type="password"
                                  value={currentPassword}
                                  onChange={(e) => setCurrentPassword(e.target.value)}
                                  className="w-full px-4 py-3 bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl"
                                  placeholder="Enter current password to verify"
                                />
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">New Password</label>
                                  <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full px-4 py-3 bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl"
                                    placeholder="Min 8 chars"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Confirm New</label>
                                  <input
                                    type="password"
                                    value={confirmNewPassword}
                                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                                    className="w-full px-4 py-3 bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl"
                                    placeholder="Re-enter new password"
                                  />
                                </div>
                              </div>
                              <button
                                onClick={handleChangePassword}
                                disabled={loading || !currentPassword || !newPassword}
                                className="w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold hover:opacity-90 transition disabled:opacity-50"
                              >
                                {loading ? 'Updating...' : 'Save New Password'}
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* 2FA Section */}
                    <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-slate-900 dark:text-white">Two-Factor Authentication</p>
                          {profile?.twoFactorEnabled && (
                            <span className="text-[10px] font-black uppercase tracking-widest bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full">Active</span>
                          )}
                        </div>
                        <p className="text-sm text-slate-500">{profile?.twoFactorEnabled ? 'Your account is secured with 2FA' : 'Add an extra layer of security'}</p>
                      </div>
                      {profile?.twoFactorEnabled ? (
                        <button
                          disabled
                          className="text-sm font-bold text-slate-400 cursor-not-allowed px-4 py-2 bg-slate-100 dark:bg-white/5 rounded-lg border border-slate-200 dark:border-white/5"
                        >
                          Enabled
                        </button>
                      ) : (
                        <button
                          onClick={() => setShowTwoFactorSetup(true)}
                          className="text-sm font-bold text-emerald-600 hover:text-emerald-500 px-4 py-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg transition-colors"
                        >
                          Enable
                        </button>
                      )}
                    </div>

                    <AnimatePresence>
                      {showTwoFactorSetup && (
                        <TwoFactorSetup
                          onClose={() => setShowTwoFactorSetup(false)}
                          onEnable={() => {
                            setMessage('Two-Factor Authentication enabled successfully!')
                            setTimeout(() => setMessage(''), 3000)
                          }}
                        />
                      )}
                    </AnimatePresence>

                    {/* Notifications Placeholder */}
                    <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">Login Notifications</p>
                        <p className="text-sm text-slate-500">Email alerts on new device</p>
                      </div>
                      <button className="text-sm font-bold text-slate-600 hover:text-slate-500 px-4 py-2 bg-slate-100 dark:bg-white/5 rounded-lg">
                        Manage
                      </button>
                    </div>

                  </div>
                </div>

                <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded-3xl p-8">
                  <h3 className="text-lg font-bold text-red-600 dark:text-red-400 mb-2 flex items-center gap-2">
                    <LogOut size={20} />
                    Danger Zone
                  </h3>
                  <p className="text-sm text-red-600/70 dark:text-red-400/70 mb-4">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <button className="px-5 py-2 bg-red-600 text-white text-sm font-bold rounded-xl hover:bg-red-700 transition">
                    Delete Account
                  </button>
                </div>
              </motion.div>
            )}

            {/* ACTIVITY TAB */}
            {activeTab === 'activity' && (
              <motion.div
                key="activity"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="bg-white/80 dark:bg-black/40 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl p-8"
              >
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <Activity className="text-orange-500" size={24} />
                  Recent Activity
                </h3>

                <div className="space-y-0">
                  {[
                    { action: 'Session Started', time: 'Just now', device: 'Chrome on Windows' },
                    { action: 'Profile Viewed', time: '2 minutes ago', device: 'Chrome on Windows' },
                    { action: 'Dashboard Access', time: '1 hour ago', device: 'Chrome on Windows' },
                    { action: 'System Login', time: 'Yesterday', device: 'Safari on iPhone' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4 p-4 border-b border-slate-100 dark:border-white/5 last:border-0">
                      <div className="flex flex-col items-center">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />
                        <div className="w-px h-full bg-slate-200 dark:bg-white/10 mt-2" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">{item.action}</p>
                        <p className="text-xs text-slate-500 mt-1">{item.device} • {item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
