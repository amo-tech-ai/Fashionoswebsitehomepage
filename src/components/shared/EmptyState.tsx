import React from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';
import { Button } from '../ui/button';

interface EmptyStateProps {
  /** Icon component from lucide-react (e.g., Calendar, Users, FileText) */
  icon?: LucideIcon;
  /** Custom illustration element (200x200px) */
  illustration?: React.ReactNode;
  /** Main headline text */
  headline: string;
  /** Descriptive subtext */
  subtext: string;
  /** Primary action button text */
  ctaText: string;
  /** Primary action button click handler */
  onCtaClick: () => void;
  /** Optional secondary link text */
  secondaryText?: string;
  /** Optional secondary link click handler */
  onSecondaryClick?: () => void;
  /** Optional className for custom styling */
  className?: string;
}

/**
 * Generic Empty State Component
 * 
 * Reusable empty state following FashionOS "Calm Luxury" design philosophy
 * with ivory background and charcoal text.
 * 
 * @example
 * ```tsx
 * <EmptyState
 *   icon={Calendar}
 *   headline="No Events Yet"
 *   subtext="Create your first event to start planning"
 *   ctaText="Create Event"
 *   onCtaClick={() => navigate('/events/new')}
 *   secondaryText="Learn More"
 *   onSecondaryClick={() => navigate('/docs/events')}
 * />
 * ```
 */
export function EmptyState({
  icon: Icon,
  illustration,
  headline,
  subtext,
  ctaText,
  onCtaClick,
  secondaryText,
  onSecondaryClick,
  className = '',
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`flex flex-col items-center justify-center text-center px-4 py-16 ${className}`}
    >
      {/* Illustration or Icon */}
      <div className="mb-8">
        {illustration ? (
          <div className="w-[200px] h-[200px] flex items-center justify-center">
            {illustration}
          </div>
        ) : Icon ? (
          <div className="w-[200px] h-[200px] flex items-center justify-center">
            <Icon 
              className="w-24 h-24 text-gray-300" 
              strokeWidth={2}
            />
          </div>
        ) : (
          // Default placeholder if neither provided
          <div className="w-[200px] h-[200px] rounded-lg bg-gray-100 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full border-4 border-dashed border-gray-300" />
          </div>
        )}
      </div>

      {/* Headline */}
      <h2 className="font-serif text-3xl md:text-4xl text-[#111111] mb-4">
        {headline}
      </h2>

      {/* Subtext */}
      <p className="text-base md:text-lg text-gray-600 mb-8 max-w-md">
        {subtext}
      </p>

      {/* Primary CTA */}
      <Button
        onClick={onCtaClick}
        className="bg-[#111111] text-white hover:bg-black h-10 px-6 rounded-lg font-medium transition-colors"
      >
        {ctaText}
      </Button>

      {/* Secondary Link (Optional) */}
      {secondaryText && onSecondaryClick && (
        <button
          onClick={onSecondaryClick}
          className="mt-4 text-sm text-gray-500 hover:text-[#111111] transition-colors underline underline-offset-4"
        >
          {secondaryText}
        </button>
      )}
    </motion.div>
  );
}

/**
 * Illustration wrapper component for custom SVG illustrations
 * Ensures consistent sizing and styling
 */
export function EmptyStateIllustration({ children }: { children: React.ReactNode }) {
  return (
    <svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-gray-300"
    >
      {children}
    </svg>
  );
}
