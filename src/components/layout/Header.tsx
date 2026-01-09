"use client"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/context/AuthContext"
import { useTheme } from "@/context/ThemeContext"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useRouter, usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Sun, Moon, LogOut, Layout, User as UserIcon, Menu, X, MessageSquare, ChevronRight } from "lucide-react"

export default function Header() {
  const { user, role } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
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

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Investment Plans', href: '/plans' },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' }
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMenuOpen
        ? 'bg-white/95 dark:bg-slate-950/95 backdrop-blur-md shadow-sm border-b border-slate-200/50 dark:border-white/5 py-2.5'
        : 'bg-white/80 dark:bg-transparent backdrop-blur-sm py-3 border-b border-transparent dark:border-white/5'
        }`}
    >
      <div className="max-w-[1920px] mx-auto px-4 lg:px-12 2xl:px-16 flex justify-between items-center h-12">

        {/* Left: Branding */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white tracking-tight">
            Dhanmatrix<span className="font-black text-blue-600 dark:text-blue-500">Capital</span>
          </span>
        </Link>

        {/* Center: Navigation */}
        <nav className="hidden md:flex items-center bg-slate-100/50 dark:bg-white/5 px-1.5 py-1 rounded-full border border-slate-200/50 dark:border-white/5 backdrop-blur-md">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 ${isActive
                  ? 'bg-white dark:bg-white/10 text-blue-600 dark:text-white shadow-sm font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5'
                  }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Right: Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="w-9 h-9 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-all"
            aria-label="Toggle Theme"
          >
            {!mounted ? null : (theme === 'dark' ? <Sun size={18} strokeWidth={2} /> : <Moon size={18} strokeWidth={2} />)}
          </button>

          <div className="w-px h-6 bg-slate-200 dark:bg-white/10" />

          {user ? (
            <div className="flex items-center gap-3">
              {role === 'admin' && (
                <Link href="/admin" className="px-4 py-2 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-sm font-bold rounded-xl hover:bg-red-100 dark:hover:bg-red-500/20 transition-all">
                  Admin
                </Link>
              )}

              <Link
                href="/dashboard"
                className="group flex items-center gap-2 px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-sm shadow-xl shadow-slate-900/10 dark:shadow-white/5 hover:scale-105 hover:shadow-slate-900/20 hover:-translate-y-0.5 transition-all duration-300"
              >
                Go to Dashboard
                <Layout size={16} className="text-slate-400 dark:text-slate-500 group-hover:text-white dark:group-hover:text-slate-900 transition-colors" />
              </Link>

              <div className="flex items-center gap-1">
                <Link href="/profile" className="w-10 h-10 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-full transition-all" aria-label="View profile">
                  <UserIcon size={20} aria-hidden="true" />
                </Link>
                <button onClick={handleLogout} className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-full transition-all" aria-label="Logout">
                  <LogOut size={20} aria-hidden="true" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white transition-colors">
                Log In
              </Link>
              <Link
                href="/register"
                className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 hover:-translate-y-0.5 transition-all duration-300"
              >
                Start Investing
                <ChevronRight size={16} strokeWidth={3} />
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden w-10 h-10 flex items-center justify-center text-slate-900 dark:text-white bg-slate-100 dark:bg-white/10 rounded-xl"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-white/10 shadow-2xl animate-in slide-in-from-top-5 duration-200">
          <div className="p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base font-bold transition-all ${pathname === item.href
                  ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'
                  }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="h-px bg-slate-100 dark:bg-white/5 my-4" />

            {user ? (
              <div className="space-y-3">
                <Link href="/dashboard" onClick={() => setIsMenuOpen(false)} className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-xl font-bold">
                  Go to Dashboard <Layout size={18} />
                </Link>
                <div className="grid grid-cols-2 gap-3">
                  <Link href="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center gap-2 py-3 bg-slate-50 dark:bg-white/5 rounded-xl font-bold text-slate-700 dark:text-slate-300" aria-label="View profile">
                    <UserIcon size={18} aria-hidden="true" /> Profile
                  </Link>
                  <button onClick={handleLogout} className="flex items-center justify-center gap-2 py-3 bg-red-50 dark:bg-red-500/10 text-red-600 rounded-xl font-bold" aria-label="Logout">
                    <LogOut size={18} aria-hidden="true" /> Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link href="/login" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center py-3 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white rounded-xl font-bold">
                  Log In
                </Link>
                <Link href="/register" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20">
                  Start Investing
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
