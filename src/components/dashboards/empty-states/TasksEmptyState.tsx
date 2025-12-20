import React from 'react';
import { EmptyState, EmptyStateIllustration } from '../shared/EmptyState';

interface TasksEmptyStateProps {
  onCreateTask: () => void;
  onLearnMore?: () => void;
}

/**
 * Empty State for Tasks Dashboard
 * 
 * Shown when user has no tasks created yet.
 * Encourages them to start organizing their workflow.
 */
export function TasksEmptyState({ onCreateTask, onLearnMore }: TasksEmptyStateProps) {
  return (
    <EmptyState
      illustration={
        <EmptyStateIllustration>
          {/* Checklist illustration */}
          {/* Clipboard background */}
          <rect x="60" y="30" width="80" height="140" rx="6" stroke="currentColor" strokeWidth="2" fill="white" />
          {/* Clipboard clip */}
          <rect x="85" y="20" width="30" height="20" rx="4" fill="currentColor" />
          
          {/* Empty checkboxes with lines */}
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              {/* Checkbox */}
              <rect
                x="70"
                y={50 + i * 30}
                width="16"
                height="16"
                rx="3"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
              {/* Line (task text placeholder) */}
              <line
                x1="92"
                y1={58 + i * 30}
                x2="125"
                y2={58 + i * 30}
                stroke="currentColor"
                strokeWidth="2"
                strokeOpacity="0.3"
                strokeLinecap="round"
              />
            </g>
          ))}
        </EmptyStateIllustration>
      }
      headline="No Tasks Created"
      subtext="Start organizing your workflow with tasks and track progress across your events"
      ctaText="Create Task"
      onCtaClick={onCreateTask}
      secondaryText={onLearnMore ? "Learn More" : undefined}
      onSecondaryClick={onLearnMore}
    />
  );
}
