import { LucideIcon, Inbox, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  /** Icon to display (defaults to Inbox) */
  icon?: LucideIcon;
  /** Title text */
  title?: string;
  /** Description text */
  description?: string;
  /** Primary action label */
  actionLabel?: string;
  /** Primary action callback */
  onAction?: () => void;
  /** Secondary action label */
  secondaryActionLabel?: string;
  /** Secondary action callback */
  onSecondaryAction?: () => void;
  /** Compact mode (smaller, inline) */
  compact?: boolean;
  /** Additional classes */
  className?: string;
}

/**
 * EmptyState Component
 * 
 * Standardized empty state display with call-to-action.
 * Shows when lists, tables, or dashboards have no data.
 * 
 * @param icon - Icon component to display
 * @param title - Empty state title
 * @param description - Helpful description
 * @param actionLabel - Primary CTA label
 * @param onAction - Primary CTA callback
 * @param secondaryActionLabel - Secondary action label
 * @param onSecondaryAction - Secondary action callback
 * @param compact - Smaller inline version
 * @param className - Optional additional classes
 */
export function EmptyState({
  icon: Icon = Inbox,
  title = "No items yet",
  description = "Get started by creating your first item.",
  actionLabel = "Create New",
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  compact = false,
  className = ""
}: EmptyStateProps) {
  
  if (compact) {
    return (
      <div className={`flex items-center gap-3 p-4 bg-gray-50 border border-gray-200 rounded-lg ${className}`}>
        <Icon className="h-5 w-5 text-gray-400 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">{title}</p>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
        {onAction && (
          <Button size="sm" onClick={onAction} className="flex-shrink-0">
            <Plus className="h-3 w-3 mr-1" />
            {actionLabel}
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center py-16 px-4 ${className}`}>
      <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <Icon className="h-10 w-10 text-gray-400" />
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      
      <p className="text-sm text-gray-600 text-center max-w-md mb-6">
        {description}
      </p>

      <div className="flex gap-3">
        {onAction && (
          <Button onClick={onAction} variant="default">
            <Plus className="h-4 w-4 mr-2" />
            {actionLabel}
          </Button>
        )}
        
        {onSecondaryAction && secondaryActionLabel && (
          <Button onClick={onSecondaryAction} variant="outline">
            {secondaryActionLabel}
          </Button>
        )}
      </div>
    </div>
  );
}

/**
 * Predefined Empty States for Common Scenarios
 */

export function EmptyEventsList({ onCreate }: { onCreate?: () => void }) {
  return (
    <EmptyState
      icon={Inbox}
      title="No events yet"
      description="Create your first luxury fashion event to get started with FashionOS."
      actionLabel="Create Event"
      onAction={onCreate}
    />
  );
}

export function EmptyTasksList({ onCreate }: { onCreate?: () => void }) {
  return (
    <EmptyState
      icon={Inbox}
      title="No tasks yet"
      description="Tasks will appear here when you create an event or manually add tasks."
      actionLabel="Add Task"
      onAction={onCreate}
    />
  );
}

export function EmptySponsorsList({ onCreate }: { onCreate?: () => void }) {
  return (
    <EmptyState
      icon={Inbox}
      title="No sponsors yet"
      description="Add sponsors to track your outreach and manage sponsorship opportunities."
      actionLabel="Add Sponsor"
      onAction={onCreate}
    />
  );
}

export function EmptySearchResults({ onClear }: { onClear?: () => void }) {
  return (
    <EmptyState
      icon={Inbox}
      title="No results found"
      description="Try adjusting your search or filters to find what you're looking for."
      actionLabel="Clear Filters"
      onAction={onClear}
    />
  );
}
