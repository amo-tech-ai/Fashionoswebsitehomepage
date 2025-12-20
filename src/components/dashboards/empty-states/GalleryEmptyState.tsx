import React from 'react';
import { EmptyState, EmptyStateIllustration } from '../shared/EmptyState';

interface GalleryEmptyStateProps {
  onUploadAssets: () => void;
  onLearnMore?: () => void;
}

/**
 * Empty State for Gallery Dashboard
 * 
 * Shown when user has no assets uploaded yet.
 * Encourages them to upload photos and videos for review.
 */
export function GalleryEmptyState({ onUploadAssets, onLearnMore }: GalleryEmptyStateProps) {
  return (
    <EmptyState
      illustration={
        <EmptyStateIllustration>
          {/* Image grid illustration */}
          {/* 3x2 grid of image placeholders */}
          {[0, 1, 2].map((col) =>
            [0, 1].map((row) => (
              <g key={`${col}-${row}`}>
                <rect
                  x={50 + col * 35}
                  y={60 + row * 40}
                  width="30"
                  height="35"
                  rx="4"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                {/* Mountain icon inside */}
                <path
                  d={`M ${55 + col * 35} ${85 + row * 40} L ${62 + col * 35} ${75 + row * 40} L ${69 + col * 35} ${80 + row * 40} L ${75 + col * 35} ${72 + row * 40} L ${75 + col * 35} ${90 + row * 40} L ${55 + col * 35} ${90 + row * 40} Z`}
                  fill="currentColor"
                  fillOpacity="0.2"
                />
                {/* Sun circle */}
                <circle
                  cx={70 + col * 35}
                  cy={67 + row * 40}
                  r="3"
                  fill="currentColor"
                  fillOpacity="0.3"
                />
              </g>
            ))
          )}
          {/* Plus icon overlay in center */}
          <circle cx="100" cy="100" r="20" fill="white" stroke="currentColor" strokeWidth="2" />
          <line x1="100" y1="90" x2="100" y2="110" stroke="currentColor" strokeWidth="2" />
          <line x1="90" y1="100" x2="110" y2="100" stroke="currentColor" strokeWidth="2" />
        </EmptyStateIllustration>
      }
      headline="No Assets Uploaded"
      subtext="Upload photos and videos for review and approval with AI-powered quality scoring"
      ctaText="Upload Assets"
      onCtaClick={onUploadAssets}
      secondaryText={onLearnMore ? "Learn More" : undefined}
      onSecondaryClick={onLearnMore}
    />
  );
}
