"use client"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/context/AuthContext"
import { useTheme } from "@/context/ThemeContext"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Sun, Moon, LogOut, Layout, User as UserIcon, PlusCircle, LineChart, Menu, X } from "lucide-react"

export default function Header() {
  const { user, role } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  async function handleLogout() {
    setLoading(true)
    try {
      await signOut(auth)
      router.push('/')
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      setLoading(false)
    }
  }

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/70 dark:bg-black/40 backdrop-blur-xl border-b border-gray-200/50 dark:border-white/10 shadow-sm">
      <div className="max-w-[1920px] mx-auto px-4 lg:px-12 2xl:px-16 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-10 h-10 rounded-lg overflow-hidden shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
            <Image src="/dmc-logo.png" alt="DMC Logo" fill className="object-cover" sizes="40px" />
          </div>
          <span className="text-lg sm:text-xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent tracking-tight">
            Dhanmatrixcapital
          </span>
        </Link>

        {/* Desktop & Navigation Controls */}
        <nav className="flex items-center space-x-2 md:space-x-4">
          <div className="hidden md:flex items-center space-x-1">
            {['Home', 'About', 'Plans', 'Contact'].map((item) => (
              <Link
                key={item}
                href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className="px-4 py-2 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-all"
              >
                {item}
              </Link>
            ))}
          </div>

          <div className="hidden md:block w-px h-6 bg-gray-200 dark:bg-white/10 mx-2"></div>

          <button
            onClick={toggleTheme}
            className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-all flex items-center justify-center w-10 h-10"
            aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {/* Show nothing on server, or default icon. Better to show nothing to avoid flicker if mismatch */}
            {!mounted ? null : (theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />)}
          </button>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <>
                {role === 'admin' && (
                  <Link href="/admin" className="px-3 py-1.5 bg-red-100/50 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-lg text-xs font-bold hover:bg-red-100 dark:hover:bg-red-500/20 transition border border-red-200/50 dark:border-red-500/20">
                    Admin
                  </Link>
                )}
                <Link href="/dashboard" className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-black rounded-lg text-sm font-bold hover:opacity-90 transition shadow-lg shadow-gray-400/20 dark:shadow-white/5">
                  <Layout size={16} />
                  <span>Dashboard</span>
                </Link>
                <Link href="/profile" className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition" aria-label="View Profile">
                  <UserIcon size={20} />
                </Link>
                <button onClick={handleLogout} disabled={loading} className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-full transition" aria-label="Sign Out">
                  <LogOut size={20} />
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2 ml-2">
                <Link href="/login" className="px-4 py-2 text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
                  Sign In
                </Link>
                <Link href="/register" className="px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-500/30">
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-all"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-white/10 px-4 py-6 space-y-4 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col space-y-2">
            {['Home', 'About', 'Plans', 'Contact'].map((item) => (
              <Link
                key={item}
                href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3 text-base font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl transition-all"
              >
                {item}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-gray-100 dark:border-white/10">
            {user ? (
              <div className="flex flex-col gap-3">
                <Link
                  href="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center gap-2 px-4 py-4 bg-blue-600 text-white rounded-xl font-bold text-base shadow-lg shadow-blue-500/20"
                >
                  <Layout size={18} />
                  Dashboard
                </Link>
                <div className="flex items-center justify-between px-2 pt-2">
                  <Link href="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 font-bold">
                    <UserIcon size={20} />
                    Profile
                  </Link>
                  <button onClick={handleLogout} className="flex items-center gap-2 text-red-500 font-bold">
                    <LogOut size={20} />
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full py-4 text-center font-bold text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-white/5 rounded-xl transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full py-4 text-center font-bold text-white bg-blue-600 rounded-xl shadow-lg shadow-blue-500/20 transition"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
