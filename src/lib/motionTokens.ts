/**
 * FashionOS Motion Design System
 * V5 Sponsorship Page - Calm Luxury Motion Tokens
 * Philosophy: Motion must explain cause → effect (never decorative)
 */

export const motion = {
  micro: 100,        // Instant feedback (hover, press)
  fast: 250,         // UI state changes
  standard: 400,     // Content reveals
  slow: 600,         // Hero moments
  cinematic: 800     // Section transitions
} as const;

export const easing = {
  calmLuxury: [0.22, 1, 0.36, 1] as const,      // Primary (ease-out)
  quickExit: [0.32, 0, 0.67, 0] as const,        // Dismissals
  subtle: [0.25, 0.46, 0.45, 0.94] as const      // Gentle bounce
} as const;

export const parallax = {
  background: 0.3,    // Slowest (runway images)
  midground: 0.5,     // Connecting lines/vectors
  foreground: 0.7,    // Text content
  fixed: 1.0          // CTAs, metrics (no parallax)
} as const;

export const transforms = {
  lift: { y: -4, shadow: '0 8px 24px rgba(0,0,0,0.08)' },
  fadeIn: { y: 16, opacity: 0 },
  scaleInactive: 0.98,
  scaleActive: 1.0,
  forwardMotion: { x: 12 }  // Active card emphasis
} as const;

// Preset animations for common use cases
export const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10%" },
  transition: { duration: 0.4, ease: easing.calmLuxury }
} as const;

export const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-10%" },
  transition: { duration: 0.6, ease: easing.calmLuxury }
} as const;

export const scaleIn = {
  initial: { opacity: 0, scale: 0.98 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: "-10%" },
  transition: { duration: 0.6, ease: easing.calmLuxury }
} as const;

// Stagger children
export const stagger = {
  container: {
    initial: {},
    whileInView: {
      transition: {
        staggerChildren: 0.12
      }
    },
    viewport: { once: true, margin: "-10%" }
  },
  item: fadeUp
} as const;
