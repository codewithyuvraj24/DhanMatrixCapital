"use client"
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronDown, 
  Layers, 
  Zap, 
  RefreshCw, 
  Globe,
  Settings
} from 'lucide-react'

const recommendations = [
  {
    title: "Build Multiple Deployments Simultaneously",
    description: "Never wait for a queued build.",
    icon: <Layers size={20} className="text-blue-500" />
  },
  {
    title: "Get builds up to 40% faster",
    description: "Switch to a bigger build machine.",
    icon: <Zap size={20} className="text-orange-500" />
  },
  {
    title: "Prevent Frontend-Backend Mismatches",
    description: "Automatically sync client and server versions to avoid deployment conflicts.",
    icon: <RefreshCw size={20} className="text-emerald-500" />
  },
  {
    title: "Find a Custom Domain",
    description: "Purchase a domain. Fast, at-cost & private.",
    icon: <Globe size={20} className="text-purple-500" />
  }
]

export default function DeploymentSettings() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="w-full bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-white dark:border-white/10 rounded-3xl overflow-hidden shadow-sm">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Settings className="text-slate-400" size={20} />
          <h2 className="font-heading text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">Deployment Settings</h2>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 0 : -90 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="text-slate-400" size={20} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-8 pb-8 pt-2">
              <div className="mb-6">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Recommendations</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recommendations.map((rec, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -2 }}
                      className="p-6 bg-white dark:bg-black/20 border border-slate-100 dark:border-white/5 rounded-2xl hover:border-red-500/20 dark:hover:border-red-500/20 transition-all cursor-pointer group"
                    >
                      <div className="mb-4 p-3 bg-slate-50 dark:bg-white/5 rounded-xl w-fit group-hover:bg-red-500/10 transition-colors">
                        {rec.icon}
                      </div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-2 leading-snug">
                        {rec.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                        {rec.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
