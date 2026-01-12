"use client"

import { useState, useMemo, useEffect, useRef } from 'react'
import { Search, Filter, Download, X } from 'lucide-react'

interface SearchFilterProps {
    data: any[]
    onFilteredDataChange: (filtered: any[]) => void
    searchFields: string[]
    filterOptions?: {
        field: string
        label: string
        options: { value: string; label: string }[]
    }[]
}

export default function SearchFilter({
    data,
    onFilteredDataChange,
    searchFields,
    filterOptions = []
}: SearchFilterProps) {
    const [searchTerm, setSearchTerm] = useState('')
    const [activeFilters, setActiveFilters] = useState<Record<string, string>>({})

    const filteredData = useMemo(() => {
        let filtered = [...data]

        // Apply search
        if (searchTerm) {
            filtered = filtered.filter(item => {
                return searchFields.some(field => {
                    const value = field.split('.').reduce((obj, key) => obj?.[key], item)
                    return value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
                })
            })
        }

        // Apply filters
        Object.entries(activeFilters).forEach(([field, value]) => {
            if (value) {
                filtered = filtered.filter(item => {
                    const itemValue = field.split('.').reduce((obj, key) => obj?.[key], item)
                    return itemValue === value
                })
            }
        })

        return filtered
    }, [data, searchTerm, activeFilters, searchFields])

    // Sync filtered data to parent via useEffect to avoid useMemo side effects
    // Use a ref to track the last JSON stringified version of the data to break any potential loops
    const lastFilteredDataRef = useRef<string>('')

    useEffect(() => {
        const currentDataString = JSON.stringify(filteredData)
        if (currentDataString !== lastFilteredDataRef.current) {
            lastFilteredDataRef.current = currentDataString
            onFilteredDataChange(filteredData)
        }
    }, [filteredData, onFilteredDataChange])

    const handleFilterChange = (field: string, value: string) => {
        setActiveFilters(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const clearFilters = () => {
        setSearchTerm('')
        setActiveFilters({})
    }

    const exportToCSV = () => {
        if (filteredData.length === 0) return

        // Get all unique keys from the data
        const keys = Array.from(
            new Set(filteredData.flatMap(item => Object.keys(item)))
        )

        // Create CSV header
        const header = keys.join(',')

        // Create CSV rows
        const rows = filteredData.map(item =>
            keys.map(key => {
                const value = item[key]
                // Escape commas and quotes
                if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
                    return `"${value.replace(/"/g, '""')}"`
                }
                return value ?? ''
            }).join(',')
        )

        // Combine header and rows
        const csv = [header, ...rows].join('\n')

        // Create download link
        const blob = new Blob([csv], { type: 'text/csv' })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `export_${new Date().toISOString().split('T')[0]}.csv`
        a.click()
        window.URL.revokeObjectURL(url)
    }

    const hasActiveFilters = searchTerm || Object.values(activeFilters).some(v => v)

    return (
        <div className="space-y-4 mb-6">
            {/* Search and Export Row */}
            <div className="flex flex-col sm:flex-row gap-3">
                {/* Search Input */}
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        placeholder={`Search ${searchFields.join(', ')}...`}
                        className="w-full pl-12 pr-4 py-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-white"
                    />
                </div>

                {/* Export Button */}
                <button
                    onClick={exportToCSV}
                    disabled={filteredData.length === 0}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Download size={18} />
                    <span className="hidden sm:inline">Export CSV</span>
                </button>
            </div>

            {/* Filter Options */}
            {filterOptions.length > 0 && (
                <div className="flex flex-wrap gap-3">
                    {filterOptions.map(filter => (
                        <div key={filter.field} className="flex-1 min-w-[200px]">
                            <select
                                value={activeFilters[filter.field] || ''}
                                onChange={e => handleFilterChange(filter.field, e.target.value)}
                                className="w-full px-4 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-white cursor-pointer"
                            >
                                <option value="">All {filter.label}</option>
                                {filter.options.map(opt => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))}

                    {/* Clear Filters Button */}
                    {hasActiveFilters && (
                        <button
                            onClick={clearFilters}
                            className="px-4 py-2 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 rounded-xl font-bold text-sm transition-all flex items-center gap-2"
                        >
                            <X size={16} />
                            Clear
                        </button>
                    )}
                </div>
            )}

            {/* Results Count */}
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
                Showing {filteredData.length} of {data.length} results
                {hasActiveFilters && ' (filtered)'}
            </div>
        </div>
    )
}
