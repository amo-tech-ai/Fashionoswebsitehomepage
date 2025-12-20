import React from 'react';
import { EmptyState, EmptyStateIllustration } from '../shared/EmptyState';

interface ContractsEmptyStateProps {
  onUploadContract: () => void;
  onLearnMore?: () => void;
}

/**
 * Empty State for Contract Analyzer Dashboard
 * 
 * Shown when user has no contracts uploaded yet.
 * Encourages them to upload contracts for AI analysis.
 */
export function ContractsEmptyState({ onUploadContract, onLearnMore }: ContractsEmptyStateProps) {
  return (
    <EmptyState
      illustration={
        <EmptyStateIllustration>
          {/* Document illustration */}
          {/* Main document */}
          <rect x="60" y="40" width="80" height="120" rx="4" stroke="currentColor" strokeWidth="2" fill="white" />
          
          {/* Document lines (text) */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <line
              key={i}
              x1="70"
              y1={55 + i * 18}
              x2="130"
              y2={55 + i * 18}
              stroke="currentColor"
              strokeWidth="2"
              strokeOpacity="0.2"
              strokeLinecap="round"
            />
          ))}
          
          {/* Folded corner */}
          <path
            d="M 140 40 L 140 55 L 125 55 Z"
            fill="currentColor"
            fillOpacity="0.1"
            stroke="currentColor"
            strokeWidth="2"
          />
          
          {/* AI sparkle icon overlay */}
          <circle cx="100" cy="130" r="16" fill="white" stroke="currentColor" strokeWidth="2" />
          <path
            d="M 100 118 L 101 125 L 108 126 L 101 127 L 100 134 L 99 127 L 92 126 L 99 125 Z"
            fill="currentColor"
          />
        </EmptyStateIllustration>
      }
      headline="No Contracts"
      subtext="Upload contracts for AI-powered analysis, risk detection, and deliverable tracking"
      ctaText="Upload Contract"
      onCtaClick={onUploadContract}
      secondaryText={onLearnMore ? "Learn More" : undefined}
      onSecondaryClick={onLearnMore}
    />
  );
}
