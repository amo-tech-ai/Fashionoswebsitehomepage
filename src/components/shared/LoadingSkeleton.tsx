import React from 'react';
import { motion } from 'motion/react';

/**
 * Skeleton Animation Variants
 * Consistent pulse animation across all skeleton types
 */
const skeletonAnimation = {
  initial: { opacity: 0.4 },
  animate: {
    opacity: [0.4, 1, 0.4],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

/**
 * Base Skeleton Component
 * Reusable skeleton with pulse animation
 */
interface SkeletonProps {
  className?: string;
  children?: React.ReactNode;
}

function Skeleton({ className = '', children }: SkeletonProps) {
  return (
    <motion.div
      variants={skeletonAnimation}
      initial="initial"
      animate="animate"
      className={`bg-gray-200 rounded-lg ${className}`}
    >
      {children}
    </motion.div>
  );
}

/**
 * Card Skeleton
 * 
 * Used for dashboard cards with header, content, and footer
 * Overall height: 320px
 */
export function CardSkeleton() {
  return (
    <div className="border border-gray-200 rounded-xl p-6 bg-white">
      {/* Header */}
      <div className="mb-6">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2" />
      </div>

      {/* Content - 3 text lines */}
      <div className="space-y-3 mb-6">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-3/5" />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <Skeleton className="h-8 w-24 rounded-md" />
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>
    </div>
  );
}

/**
 * Table Skeleton
 * 
 * Used for data tables with header row and 5 data rows
 */
export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      {/* Header Row */}
      <div className="h-12 px-6 bg-gray-50 flex items-center gap-4 border-b border-gray-200">
        {[100, 150, 120, 100, 80].map((width, i) => (
          <Skeleton key={i} className="h-4" style={{ width: `${width}px` }} />
        ))}
      </div>

      {/* Data Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="h-14 px-6 flex items-center gap-4 border-b border-gray-100 last:border-0">
          {[100, 150, 120, 100, 80].map((width, i) => (
            <Skeleton key={i} className="h-4" style={{ width: `${width * 0.9}px` }} />
          ))}
        </div>
      ))}
    </div>
  );
}

/**
 * List Item Skeleton
 * 
 * Used for list views with avatar, text, and action button
 * Overall height: 72px per item
 */
export function ListItemSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg bg-white">
          {/* Avatar */}
          <Skeleton className="w-12 h-12 rounded-full flex-shrink-0" />

          {/* Text Content */}
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-3 w-1/2" />
          </div>

          {/* Action Button */}
          <Skeleton className="w-20 h-8 rounded-md flex-shrink-0" />
        </div>
      ))}
    </div>
  );
}

/**
 * Chart Skeleton
 * 
 * Used for chart/graph placeholders
 * Dimensions: 400px × 300px
 */
export function ChartSkeleton() {
  return (
    <div className="border border-gray-200 rounded-xl p-6 bg-white">
      {/* Chart Title */}
      <div className="mb-6">
        <Skeleton className="h-6 w-1/3 mb-2" />
        <Skeleton className="h-4 w-1/4" />
      </div>

      {/* Chart Area */}
      <div className="relative h-[300px]">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between py-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-3 w-8" />
          ))}
        </div>

        {/* Bar placeholders */}
        <div className="ml-14 h-full flex items-end justify-around gap-4">
          {[60, 80, 45, 90, 70].map((height, i) => (
            <Skeleton key={i} className="flex-1" style={{ height: `${height}%` }} />
          ))}
        </div>

        {/* X-axis labels */}
        <div className="ml-14 mt-2 flex justify-around gap-4">
          {[0, 1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-3 flex-1" />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Header Skeleton
 * 
 * Used for page headers with title, subtitle, and action button
 */
export function HeaderSkeleton() {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="space-y-2 flex-1">
        <Skeleton className="h-10 w-80" />
        <Skeleton className="h-5 w-48" />
      </div>
      <Skeleton className="h-10 w-32 rounded-md" />
    </div>
  );
}

/**
 * Full Page Skeleton
 * 
 * Complete dashboard loading state with all skeleton variants
 */
export function DashboardSkeleton() {
  return (
    <div className="p-8 space-y-8 bg-[#F9F9F9] min-h-screen">
      <HeaderSkeleton />

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartSkeleton />
        <div className="space-y-4">
          <ListItemSkeleton count={4} />
        </div>
      </div>

      {/* Table */}
      <TableSkeleton rows={5} />
    </div>
  );
}

/**
 * Export all skeleton components
 */
export {
  Skeleton,
  CardSkeleton as Card,
  TableSkeleton as Table,
  ListItemSkeleton as ListItem,
  ChartSkeleton as Chart,
  HeaderSkeleton as Header,
  DashboardSkeleton as Dashboard,
};

/**
 * Main LoadingSkeleton Component with Variant Support
 * 
 * Unified component that renders different skeleton types based on variant prop.
 * This is useful for dynamic loading states where the skeleton type is determined at runtime.
 * 
 * @example
 * ```tsx
 * <LoadingSkeleton variant="card" count={3} />
 * <LoadingSkeleton variant="table" rows={5} />
 * <LoadingSkeleton variant="list" count={4} />
 * ```
 */
export interface LoadingSkeletonProps {
  variant: 'card' | 'table' | 'list' | 'chart' | 'header' | 'dashboard';
  count?: number;
  rows?: number;
}

export function LoadingSkeleton({ 
  variant, 
  count = 1, 
  rows = 5 
}: LoadingSkeletonProps) {
  switch (variant) {
    case 'card':
      return (
        <>
          {Array.from({ length: count }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </>
      );
    
    case 'table':
      return <TableSkeleton rows={rows} />;
    
    case 'list':
      return <ListItemSkeleton count={count} />;
    
    case 'chart':
      return <ChartSkeleton />;
    
    case 'header':
      return <HeaderSkeleton />;
    
    case 'dashboard':
      return <DashboardSkeleton />;
    
    default:
      return <CardSkeleton />;
  }
}