import React from 'react';
import { Calendar, Plus } from 'lucide-react';
import { EmptyState, EmptyStateIllustration } from '../shared/EmptyState';

interface EventsEmptyStateProps {
  onCreateEvent: () => void;
  onLearnMore?: () => void;
}

/**
 * Empty State for Events Dashboard
 * 
 * Shown when user has no events created yet.
 * Encourages them to create their first event.
 */
export function EventsEmptyState({ onCreateEvent, onLearnMore }: EventsEmptyStateProps) {
  return (
    <EmptyState
      illustration={
        <EmptyStateIllustration>
          {/* Calendar with Plus Icon */}
          <rect x="40" y="30" width="120" height="140" rx="8" stroke="currentColor" strokeWidth="2" fill="none" />
          {/* Calendar header */}
          <rect x="40" y="30" width="120" height="30" rx="8" fill="currentColor" fillOpacity="0.1" />
          {/* Calendar grid dots */}
          {[0, 1, 2, 3, 4, 5].map((row) =>
            [0, 1, 2, 3, 4, 5, 6].map((col) => (
              <circle
                key={`${row}-${col}`}
                cx={55 + col * 15}
                cy={75 + row * 15}
                r="2"
                fill="currentColor"
                fillOpacity="0.3"
              />
            ))
          )}
          {/* Plus icon in circle */}
          <circle cx="140" cy="140" r="24" fill="white" stroke="currentColor" strokeWidth="2" />
          <line x1="140" y1="128" x2="140" y2="152" stroke="currentColor" strokeWidth="2" />
          <line x1="128" y1="140" x2="152" y2="140" stroke="currentColor" strokeWidth="2" />
        </EmptyStateIllustration>
      }
      headline="No Events Yet"
      subtext="Create your first event to start planning your next fashion show, activation, or photoshoot"
      ctaText="Create Event"
      onCtaClick={onCreateEvent}
      secondaryText={onLearnMore ? "Learn More" : undefined}
      onSecondaryClick={onLearnMore}
    />
  );
}
