"use client"
import { useTheme } from '@/context/ThemeContext'

export default function BackgroundOrbs() {
    const { theme } = useTheme()

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {/* Orb 1 */}
            <div
                className={`absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] opacity-40 orb-1 will-change-transform ${theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-200/50'
                    }`}
            />
            {/* Orb 2 */}
            <div
                className={`absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] rounded-full blur-[120px] opacity-30 orb-2 will-change-transform ${theme === 'dark' ? 'bg-emerald-900/30' : 'bg-emerald-200/40'
                    }`}
            />
            {/* Orb 3 - subtle accent */}
            <div
                className={`absolute top-[40%] right-[10%] w-[30%] h-[30%] rounded-full blur-[100px] opacity-20 orb-3 will-change-transform ${theme === 'dark' ? 'bg-indigo-900/20' : 'bg-indigo-100/30'
                    }`}
            />
        </div>
    )
}
