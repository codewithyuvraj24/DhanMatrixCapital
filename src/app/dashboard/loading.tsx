import { StatsSkeleton, ChartSkeleton, TableSkeleton } from '@/components/ui/Skeleton'

export default function DashboardLoading() {
    return (
        <div className="max-w-7xl mx-auto px-4 pt-32 pb-12">
            <div className="mb-12">
                <div className="h-10 w-64 bg-slate-200 dark:bg-white/5 animate-pulse rounded-2xl mb-4"></div>
                <div className="h-4 w-48 bg-slate-100 dark:bg-white/5 animate-pulse rounded-lg"></div>
            </div>
            <StatsSkeleton />
            <div className="mt-12"><ChartSkeleton /></div>
            <div className="mt-12"><TableSkeleton /></div>
        </div>
    )
}
