import { Skeleton } from "@/components/ui/skeleton";

interface LoadingSkeletonProps {
  /** Type of skeleton to render */
  type?: "card" | "list" | "table" | "dashboard" | "form";
  /** Number of items to show (for list/table types) */
  count?: number;
  /** Additional classes */
  className?: string;
}

/**
 * LoadingSkeleton Component
 * 
 * Reusable loading state skeleton for consistent UX.
 * Shows while data is being fetched from Supabase.
 * 
 * @param type - Layout type (card, list, table, dashboard, form)
 * @param count - Number of skeleton items (for list/table)
 * @param className - Optional additional classes
 */
export function LoadingSkeleton({ 
  type = "card", 
  count = 3,
  className = "" 
}: LoadingSkeletonProps) {
  
  if (type === "card") {
    return (
      <div className={`space-y-4 ${className}`}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="rounded-xl border border-gray-200 p-6 space-y-3">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <div className="flex gap-2 mt-4">
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-24" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "list") {
    return (
      <div className={`space-y-3 ${className}`}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-3 w-1/2" />
            </div>
            <Skeleton className="h-8 w-20" />
          </div>
        ))}
      </div>
    );
  }

  if (type === "table") {
    return (
      <div className={`space-y-2 ${className}`}>
        {/* Table Header */}
        <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 rounded-t-lg">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>
        {/* Table Rows */}
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="grid grid-cols-4 gap-4 p-4 border-b border-gray-200">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (type === "dashboard") {
    return (
      <div className={`space-y-6 ${className}`}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-gray-200 p-6 space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-3 w-32" />
            </div>
          ))}
        </div>
        {/* Content */}
        <div className="rounded-xl border border-gray-200 p-6 space-y-4">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </div>
    );
  }

  if (type === "form") {
    return (
      <div className={`space-y-6 ${className}`}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-3 w-48" />
          </div>
        ))}
      </div>
    );
  }

  // Default fallback
  return (
    <div className={`space-y-4 ${className}`}>
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-8 w-5/6" />
    </div>
  );
}
