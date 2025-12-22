import { AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  /** Error message to display */
  message?: string;
  /** Detailed error for debugging (shown in console) */
  error?: Error | unknown;
  /** Optional retry callback */
  onRetry?: () => void;
  /** Optional action button label */
  actionLabel?: string;
  /** Optional action callback */
  onAction?: () => void;
  /** Compact mode (smaller, inline) */
  compact?: boolean;
  /** Additional classes */
  className?: string;
}

/**
 * ErrorState Component
 * 
 * Standardized error display with user-friendly messaging.
 * Shows when data fetch fails or validation errors occur.
 * 
 * @param message - User-friendly error message
 * @param error - Technical error (logged to console)
 * @param onRetry - Optional retry function
 * @param actionLabel - Label for custom action button
 * @param onAction - Custom action callback
 * @param compact - Smaller inline version
 * @param className - Optional additional classes
 */
export function ErrorState({
  message = "Something went wrong",
  error,
  onRetry,
  actionLabel,
  onAction,
  compact = false,
  className = ""
}: ErrorStateProps) {
  
  // Log detailed error to console for debugging
  if (error) {
    console.error("ErrorState:", error);
  }

  if (compact) {
    return (
      <div className={`flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg ${className}`}>
        <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
        <p className="text-sm text-red-800 flex-1">{message}</p>
        {onRetry && (
          <Button 
            size="sm" 
            variant="outline" 
            onClick={onRetry}
            className="flex-shrink-0"
          >
            <RefreshCcw className="h-3 w-3 mr-1" />
            Retry
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 ${className}`}>
      <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
        <AlertCircle className="h-8 w-8 text-red-600" />
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {message}
      </h3>
      
      <p className="text-sm text-gray-600 text-center max-w-md mb-6">
        {error instanceof Error 
          ? `Error: ${error.message}` 
          : "An unexpected error occurred. Please try again."}
      </p>

      <div className="flex gap-3">
        {onRetry && (
          <Button onClick={onRetry} variant="default">
            <RefreshCcw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        )}
        
        {onAction && actionLabel && (
          <Button onClick={onAction} variant="outline">
            {actionLabel}
          </Button>
        )}
      </div>

      {/* Debug info (only in development) */}
      {process.env.NODE_ENV === 'development' && error instanceof Error && (
        <details className="mt-6 w-full max-w-2xl">
          <summary className="text-sm text-gray-500 cursor-pointer hover:text-gray-700">
            Technical Details (Dev Only)
          </summary>
          <pre className="mt-2 p-4 bg-gray-100 rounded-lg text-xs overflow-auto">
            {error.stack || error.message}
          </pre>
        </details>
      )}
    </div>
  );
}
