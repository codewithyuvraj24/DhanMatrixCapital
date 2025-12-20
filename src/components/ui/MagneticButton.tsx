"use client"
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ReactNode, useRef } from 'react'

interface MagneticButtonProps {
    children: ReactNode
    className?: string
    onClick?: () => void
    disabled?: boolean
}

export default function MagneticButton({ children, className = '', onClick, disabled = false }: MagneticButtonProps) {
    const ref = useRef<HTMLButtonElement>(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const springConfig = { damping: 15, stiffness: 150 }
    const springX = useSpring(x, springConfig)
    const springY = useSpring(y, springConfig)

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled) return
        const rect = ref.current?.getBoundingClientRect()
        if (!rect) return

        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        const distanceX = e.clientX - centerX
        const distanceY = e.clientY - centerY

        // Magnetic effect: pull button slightly toward cursor
        x.set(distanceX * 0.15)
        y.set(distanceY * 0.15)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            disabled={disabled}
            style={{ x: springX, y: springY }}
            whileTap={{ scale: disabled ? 1 : 0.95 }}
            className={`${className} ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
        >
            {children}
        </motion.button>
    )
}
