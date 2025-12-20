import React from 'react';
import { EmptyState, EmptyStateIllustration } from '../shared/EmptyState';

interface BudgetEmptyStateProps {
  onAddBudgetItem: () => void;
  onLearnMore?: () => void;
}

/**
 * Empty State for Budget Manager Dashboard
 * 
 * Shown when user has no budget items added yet.
 * Encourages them to start tracking expenses.
 */
export function BudgetEmptyState({ onAddBudgetItem, onLearnMore }: BudgetEmptyStateProps) {
  return (
    <EmptyState
      illustration={
        <EmptyStateIllustration>
          {/* Calculator/Chart illustration */}
          {/* Bar chart */}
          <line x1="40" y1="140" x2="160" y2="140" stroke="currentColor" strokeWidth="2" />
          <line x1="40" y1="40" x2="40" y2="140" stroke="currentColor" strokeWidth="2" />
          
          {/* Empty bars */}
          {[0, 1, 2, 3].map((i) => (
            <rect
              key={i}
              x={50 + i * 30}
              y={90}
              width="20"
              height="50"
              rx="2"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeDasharray="4 4"
            />
          ))}
          
          {/* Dollar sign in circle */}
          <circle cx="100" cy="70" r="18" fill="white" stroke="currentColor" strokeWidth="2" />
          <text x="100" y="78" fontSize="24" fontWeight="bold" textAnchor="middle" fill="currentColor">$</text>
        </EmptyStateIllustration>
      }
      headline="No Budget Items"
      subtext="Add line items to track expenses and manage your event budget with real-time alerts"
      ctaText="Add Budget Item"
      onCtaClick={onAddBudgetItem}
      secondaryText={onLearnMore ? "Learn More" : undefined}
      onSecondaryClick={onLearnMore}
    />
  );
}
