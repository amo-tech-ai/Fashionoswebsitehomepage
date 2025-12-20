import React from 'react';
import { HandshakeIcon } from 'lucide-react';
import { EmptyState, EmptyStateIllustration } from '../shared/EmptyState';

interface SponsorsEmptyStateProps {
  onAddSponsor: () => void;
  onLearnMore?: () => void;
}

/**
 * Empty State for Sponsor CRM Dashboard
 * 
 * Shown when user has no sponsors added yet.
 * Encourages them to start building their sponsorship pipeline.
 */
export function SponsorsEmptyState({ onAddSponsor, onLearnMore }: SponsorsEmptyStateProps) {
  return (
    <EmptyState
      illustration={
        <EmptyStateIllustration>
          {/* Two hands shaking */}
          {/* Left hand */}
          <path
            d="M 40 110 L 60 110 L 70 90 L 75 100 L 80 95 L 85 105 L 90 100 L 100 120"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Right hand */}
          <path
            d="M 160 110 L 140 110 L 130 90 L 125 100 L 120 95 L 115 105 L 110 100 L 100 120"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Partnership circle in center */}
          <circle cx="100" cy="100" r="20" stroke="currentColor" strokeWidth="2" fill="white" />
          <text x="100" y="107" fontSize="20" textAnchor="middle" fill="currentColor">🤝</text>
        </EmptyStateIllustration>
      }
      headline="No Sponsors Added"
      subtext="Add sponsors to track your partnership pipeline and manage relationships"
      ctaText="Add Sponsor"
      onCtaClick={onAddSponsor}
      secondaryText={onLearnMore ? "Learn More" : undefined}
      onSecondaryClick={onLearnMore}
    />
  );
}
