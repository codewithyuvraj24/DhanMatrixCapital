
import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

export function Card({ children, className = "" }: CardProps) {
    return (
        <div className={`bg-slate-50 dark:bg-white/5 rounded-2xl p-5 overflow-hidden ${className}`}>
            {children}
        </div>
    );
}

export function CardHeader({ children, className = "" }: CardProps) {
    return (
        <div className={`flex justify-between items-start mb-4 ${className}`}>
            {children}
        </div>
    )
}

export function CardTitle({ children, className = "" }: CardProps) {
    return (
        <p className={`text-xs font-bold text-slate-400 uppercase tracking-wider ${className}`}>
            {children}
        </p>
    )
}

export function CardValue({ children, className = "" }: CardProps) {
    return (
        <h3 className={`text-2xl font-black text-slate-900 dark:text-white mt-1 ${className}`}>
            {children}
        </h3>
    )
}
