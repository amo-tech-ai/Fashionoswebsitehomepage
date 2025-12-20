import React from 'react';
import { motion } from 'motion/react';
import {
  AlertCircle,
  WifiOff,
  ShieldAlert,
  ServerCrash,
  RefreshCw,
} from 'lucide-react';
import { Button } from '../ui/button';

/**
 * Error State Component Props
 */
interface ErrorStateProps {
  /** Error type determines icon and color */
  type: 'failed' | 'offline' | 'permission' | 'server';
  /** Custom error message (optional) */
  message?: string;
  /** Error code to display (optional) */
  errorCode?: string;
  /** Retry callback */
  onRetry?: () => void;
  /** Secondary action (optional) */
  onSecondaryAction?: () => void;
  /** Secondary action label */
  secondaryActionLabel?: string;
  /** Custom className */
  className?: string;
}

/**
 * Error configuration by type
 */
const ERROR_CONFIG = {
  failed: {
    icon: AlertCircle,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    headline: 'Failed to Load Data',
    defaultMessage: 'We couldn\'t load this content. Please try again.',
  },
  offline: {
    icon: WifiOff,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    headline: 'No Internet Connection',
    defaultMessage: 'Check your connection and try again.',
  },
  permission: {
    icon: ShieldAlert,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    headline: 'Permission Denied',
    defaultMessage: 'You don\'t have access to view this content.',
  },
  server: {
    icon: ServerCrash,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    headline: 'Something Went Wrong',
    defaultMessage: 'An unexpected error occurred. Our team has been notified.',
  },
};

/**
 * Generic Error State Component
 * 
 * Displays different error states with appropriate icons, colors, and actions.
 * Follows the "Calm Luxury" design philosophy with understated error messaging.
 * 
 * @example
 * ```tsx
 * <ErrorState
 *   type="failed"
 *   message="Unable to load events"
 *   onRetry={() => refetch()}
 * />
 * ```
 */
export function ErrorState({
  type,
  message,
  errorCode,
  onRetry,
  onSecondaryAction,
  secondaryActionLabel = 'Contact Support',
  className = '',
}: ErrorStateProps) {
  const config = ERROR_CONFIG[type];
  const Icon = config.icon;
  const displayMessage = message || config.defaultMessage;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`flex flex-col items-center justify-center text-center p-8 ${className}`}
    >
      {/* Error Card */}
      <div
        className={`
          max-w-md w-full p-8 rounded-lg border
          ${config.bgColor} ${config.borderColor}
          shadow-sm
        `}
      >
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className={`p-3 rounded-full ${config.bgColor}`}>
            <Icon className={`w-12 h-12 ${config.color}`} />
          </div>
        </div>

        {/* Headline */}
        <h2 className="font-serif text-2xl text-[#111111] mb-2">
          {config.headline}
        </h2>

        {/* Message */}
        <p className="text-base text-gray-600 mb-6">
          {displayMessage}
        </p>

        {/* Error Code (if provided) */}
        {errorCode && (
          <p className="text-sm text-gray-400 mb-6 font-mono">
            Error Code: {errorCode}
          </p>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-3">
          {/* Primary Action (Retry) */}
          {onRetry && type !== 'permission' && (
            <Button
              onClick={onRetry}
              className="bg-[#111111] text-white hover:bg-black h-10 rounded-lg font-medium transition-colors"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </Button>
          )}

          {/* Permission: Request Access */}
          {type === 'permission' && onSecondaryAction && (
            <Button
              onClick={onSecondaryAction}
              className="bg-[#111111] text-white hover:bg-black h-10 rounded-lg font-medium transition-colors"
            >
              Request Access
            </Button>
          )}

          {/* Secondary Action */}
          {onSecondaryAction && type !== 'permission' && (
            <button
              onClick={onSecondaryAction}
              className="text-sm text-gray-500 hover:text-[#111111] transition-colors underline underline-offset-4"
            >
              {secondaryActionLabel}
            </button>
          )}
        </div>

        {/* Additional Note for Permission Denied */}
        {type === 'permission' && (
          <p className="text-xs text-gray-400 mt-4">
            Contact your administrator if you believe this is an error.
          </p>
        )}
      </div>
    </motion.div>
  );
}

/**
 * Specific Error State Components
 * Pre-configured for common error scenarios
 */

export function FailedToLoadError({
  message,
  onRetry,
}: {
  message?: string;
  onRetry: () => void;
}) {
  return (
    <ErrorState
      type="failed"
      message={message}
      onRetry={onRetry}
      onSecondaryAction={() => window.open('mailto:support@fashionos.com')}
    />
  );
}

export function OfflineError({ onRetry }: { onRetry: () => void }) {
  return <ErrorState type="offline" onRetry={onRetry} />;
}

export function PermissionDeniedError({
  onRequestAccess,
}: {
  onRequestAccess?: () => void;
}) {
  return (
    <ErrorState
      type="permission"
      onSecondaryAction={onRequestAccess}
    />
  );
}

export function ServerError({
  errorCode,
  onRetry,
  onGoBack,
}: {
  errorCode?: string;
  onRetry?: () => void;
  onGoBack?: () => void;
}) {
  return (
    <ErrorState
      type="server"
      errorCode={errorCode || '500'}
      onRetry={onRetry}
      onSecondaryAction={onGoBack}
      secondaryActionLabel="Go Back"
    />
  );
}
