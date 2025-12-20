import React from 'react';
import { EmptyState, EmptyStateIllustration } from '../shared/EmptyState';

interface SearchEmptyStateProps {
  onClearFilters: () => void;
  searchQuery?: string;
}

/**
 * Empty State for Search Results (No Results Found)
 * 
 * Shown when search or filters return no results.
 * Encourages users to adjust their search criteria.
 */
export function SearchEmptyState({ onClearFilters, searchQuery }: SearchEmptyStateProps) {
  const message = searchQuery
    ? `No results found for "${searchQuery}"`
    : "No results found";

  return (
    <EmptyState
      illustration={
        <EmptyStateIllustration>
          {/* Magnifying glass illustration */}
          {/* Glass circle */}
          <circle cx="85" cy="85" r="35" stroke="currentColor" strokeWidth="2" fill="none" />
          <circle cx="85" cy="85" r="28" stroke="currentColor" strokeWidth="1" fill="none" strokeOpacity="0.3" />
          
          {/* Handle */}
          <line x1="112" y1="112" x2="135" y2="135" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          
          {/* X mark inside glass (no results) */}
          <line x1="75" y1="75" x2="95" y2="95" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="95" y1="75" x2="75" y2="95" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </EmptyStateIllustration>
      }
      headline="No Results Found"
      subtext="Try adjusting your search or filters to find what you're looking for"
      ctaText="Clear Filters"
      onCtaClick={onClearFilters}
    />
  );
}
