/**
 * NavigatorSkill - General navigation, onboarding, and platform discovery
 * 
 * Algorithms:
 * 1. Feature Discovery: Suggest features based on user behavior
 * 2. Quick Win Detection: Identify easy high-value actions
 * 3. Next Best Action: Recommend next logical step in workflow
 */

import type {
  UserActivity,
  FeatureRecommendation,
  QuickWin,
  NextAction,
} from '../types/navigation.types';

// Re-export types for backward compatibility
export type {
  UserActivity,
  FeatureRecommendation,
  QuickWin,
  NextAction,
};

// ============================================================================
// PLATFORM FEATURES DATABASE
// ============================================================================

export const PLATFORM_FEATURES: FeatureRecommendation[] = [
  {
    featureId: 'sample-tracker',
    name: 'Sample Tracker',
    description: 'Track inventory, readiness, and logistics',
    category: 'core',
    benefit: 'Never miss a sample deadline again',
    timeSaved: '30 min/day',
    priority: 1,
    route: '/sample-tracker',
  },
  {
    featureId: 'event-planning',
    name: 'Event Planning',
    description: 'Manage shoots, shows, and campaigns',
    category: 'core',
    benefit: 'Keep entire team synchronized',
    timeSaved: '45 min/week',
    priority: 1,
    route: '/events',
  },
  {
    featureId: 'asset-gallery',
    name: 'Asset Gallery',
    description: 'Store, tag, and deliver final assets',
    category: 'core',
    benefit: 'Professional client delivery',
    timeSaved: '1 hour/project',
    priority: 2,
    route: '/gallery',
  },
  {
    featureId: 'ai-batching',
    name: 'AI Batching',
    description: 'Auto-optimize shoot sequences',
    category: 'automation',
    benefit: 'Save 30+ min on shoot days',
    timeSaved: '30 min/shoot',
    priority: 3,
    route: '/sample-tracker',
  },
  {
    featureId: 'critical-path',
    name: 'Critical Path Analysis',
    description: 'Detect blockers before they cascade',
    category: 'automation',
    benefit: 'Prevent $20K+ delays',
    timeSaved: '15 min/day',
    priority: 2,
    route: '/eventdetail',
  },
  {
    featureId: 'quality-scoring',
    name: 'Asset Quality Scoring',
    description: 'AI rates every asset 0-100',
    category: 'automation',
    benefit: 'Catch issues before client sees them',
    timeSaved: '45 min/delivery',
    priority: 3,
    route: '/gallery',
  },
  {
    featureId: 'collaboration',
    name: 'Team Collaboration',
    description: 'Share projects, assign tasks, track progress',
    category: 'productivity',
    benefit: 'Everyone knows what to do next',
    timeSaved: '20 min/day',
    priority: 4,
    route: '/settings',
  },
  {
    featureId: 'reporting',
    name: 'Analytics & Reporting',
    description: 'Track performance, costs, and timelines',
    category: 'advanced',
    benefit: 'Data-driven decision making',
    timeSaved: '2 hours/month',
    priority: 5,
    route: '/analytics',
  },
];

// ============================================================================
// ALGORITHM 1: FEATURE DISCOVERY
// ============================================================================

export function discoverFeatures(
  userActivity: UserActivity
): FeatureRecommendation[] {
  const recommendations: FeatureRecommendation[] = [];

  // New users (< 7 days): Recommend core features they haven't visited
  if (userActivity.accountAge < 7) {
    const coreFeatures = PLATFORM_FEATURES.filter(
      f => f.category === 'core' && !userActivity.visitedPages.includes(f.route)
    );
    recommendations.push(...coreFeatures);
  }

  // Active users (7-30 days): Recommend productivity features
  if (userActivity.accountAge >= 7 && userActivity.accountAge < 30) {
    const productivityFeatures = PLATFORM_FEATURES.filter(
      f => f.category === 'productivity' && !userActivity.visitedPages.includes(f.route)
    );
    recommendations.push(...productivityFeatures);
  }

  // Power users (30+ days): Recommend automation & advanced
  if (userActivity.accountAge >= 30) {
    const advancedFeatures = PLATFORM_FEATURES.filter(
      f => (f.category === 'automation' || f.category === 'advanced') &&
           !userActivity.visitedPages.includes(f.route)
    );
    recommendations.push(...advancedFeatures);
  }

  // If user has created projects, recommend related features
  if (userActivity.createdProjects > 0 && !userActivity.visitedPages.includes('/gallery')) {
    const galleryFeature = PLATFORM_FEATURES.find(f => f.featureId === 'asset-gallery');
    if (galleryFeature) recommendations.unshift(galleryFeature);
  }

  // Sort by priority
  recommendations.sort((a, b) => a.priority - b.priority);

  return recommendations.slice(0, 5); // Return top 5
}

// ============================================================================
// ALGORITHM 2: QUICK WIN DETECTION
// ============================================================================

export function detectQuickWins(
  userActivity: UserActivity
): QuickWin[] {
  const quickWins: QuickWin[] = [];

  // Haven't created first project
  if (userActivity.createdProjects === 0) {
    quickWins.push({
      id: 'create-first-event',
      title: 'Create Your First Event',
      description: 'Set up your first shoot or campaign in under 2 minutes',
      estimatedTime: '2 min',
      impact: 'high',
      action: {
        label: 'Create Event',
        route: '/event-wizard',
      },
    });
  }

  // Haven't visited sample tracker
  if (!userActivity.visitedPages.includes('/sample-tracker')) {
    quickWins.push({
      id: 'explore-sample-tracker',
      title: 'Try Sample Tracker',
      description: 'Track inventory and never miss a sample again',
      estimatedTime: '3 min',
      impact: 'high',
      action: {
        label: 'Explore Tracker',
        route: '/sample-tracker',
      },
    });
  }

  // Created projects but not using AI features
  if (userActivity.createdProjects > 0 && !userActivity.completedActions.includes('ai-batching')) {
    quickWins.push({
      id: 'try-ai-batching',
      title: 'Save 30 Min with AI Batching',
      description: 'Let AI optimize your shoot sequence automatically',
      estimatedTime: '1 min',
      impact: 'high',
      action: {
        label: 'Try AI Batching',
        route: '/sample-tracker',
      },
    });
  }

  // Haven't invited team
  if (!userActivity.completedActions.includes('invite-team')) {
    quickWins.push({
      id: 'invite-team',
      title: 'Invite Your Team',
      description: 'Collaborate in real-time with your crew',
      estimatedTime: '2 min',
      impact: 'medium',
      action: {
        label: 'Invite Team',
        route: '/settings',
      },
    });
  }

  // Inactive user (last visit > 7 days ago)
  const daysSinceLastVisit = Math.ceil(
    (new Date().getTime() - userActivity.lastVisit.getTime()) / (1000 * 60 * 60 * 24)
  );
  if (daysSinceLastVisit > 7) {
    quickWins.push({
      id: 'whats-new',
      title: "See What's New",
      description: 'New features and improvements while you were away',
      estimatedTime: '1 min',
      impact: 'low',
      action: {
        label: 'View Updates',
        route: '/changelog',
      },
    });
  }

  return quickWins;
}

// ============================================================================
// ALGORITHM 3: NEXT BEST ACTION
// ============================================================================

export function suggestNextAction(
  userActivity: UserActivity,
  currentRoute: string
): NextAction | null {
  
  // On homepage → suggest creating first event
  if (currentRoute === '/' && userActivity.createdProjects === 0) {
    return {
      title: 'Create Your First Event',
      description: 'Start planning your first shoot or campaign',
      reason: 'Get started with FashionOS in under 2 minutes',
      route: '/event-wizard',
      priority: 'critical',
    };
  }

  // On sample tracker with samples → suggest AI batching
  if (currentRoute === '/sample-tracker' && !userActivity.completedActions.includes('ai-batching')) {
    return {
      title: 'Try AI Batching',
      description: 'Optimize your shoot sequence automatically',
      reason: 'Save 30+ minutes on shoot day with smarter sequencing',
      route: '/sample-tracker',
      priority: 'high',
    };
  }

  // On events page → suggest critical path analysis
  if (currentRoute === '/events' && !userActivity.completedActions.includes('critical-path')) {
    return {
      title: 'Enable Critical Path Analysis',
      description: 'Detect blockers before they cascade',
      reason: 'Prevent delays that cost $20K+ to fix later',
      route: '/eventdetail',
      priority: 'high',
    };
  }

  // On gallery → suggest quality scoring
  if (currentRoute === '/gallery' && !userActivity.completedActions.includes('quality-scoring')) {
    return {
      title: 'Try Asset Quality Scoring',
      description: 'AI rates every asset 0-100 for quality',
      reason: 'Catch issues before client sees them',
      route: '/gallery',
      priority: 'medium',
    };
  }

  // New user exploring → suggest core features tour
  if (userActivity.accountAge < 3 && userActivity.visitedPages.length < 3) {
    return {
      title: 'Take the Platform Tour',
      description: 'Quick 5-minute overview of key features',
      reason: 'Get productive faster with guided onboarding',
      route: '/tour',
      priority: 'high',
    };
  }

  return null;
}

// ============================================================================
// NATURAL LANGUAGE Q&A
// ============================================================================

export function handleNavigationQuery(
  message: string,
  userActivity: UserActivity,
  currentRoute: string
): string {
  const lower = message.toLowerCase();

  // Query: What can I do?
  if (lower.includes('what can') || lower.includes('features') || lower.includes('help')) {
    const topFeatures = PLATFORM_FEATURES.filter(f => f.category === 'core').slice(0, 3);
    return `FashionOS helps you:\n\n` +
           topFeatures.map(f => `• ${f.name}: ${f.benefit}`).join('\n') +
           `\n\nWhat would you like to try first?`;
  }

  // Query: Getting started
  if (lower.includes('start') || lower.includes('begin') || lower.includes('how to')) {
    if (userActivity.createdProjects === 0) {
      return `Let's get you started! 🚀\n\n1. Create your first event (2 min)\n2. Add samples to track (1 min)\n3. Invite your team (2 min)\n\nClick "Create First Event" to begin!`;
    } else {
      return `You're already rolling! Try these next:\n\n• AI Batching (save 30 min/shoot)\n• Critical Path Analysis (prevent delays)\n• Quality Scoring (catch issues early)`;
    }
  }

  // Query: Quick wins
  if (lower.includes('quick') || lower.includes('fast') || lower.includes('save time')) {
    const wins = detectQuickWins(userActivity);
    if (wins.length > 0) {
      return `Quick wins for you:\n\n` +
             wins.slice(0, 2).map(w => `✨ ${w.title} (${w.estimatedTime}): ${w.description}`).join('\n\n');
    }
  }

  // Query: What's new
  if (lower.includes('new') || lower.includes('update') || lower.includes('changelog')) {
    return `Latest updates:\n\n• AI Assistant (you're using it now!)\n• Critical Path Analysis for events\n• Real-time quality scoring\n• Enhanced mobile experience\n\nSee full changelog in settings.`;
  }

  // Default
  return `I can help you navigate FashionOS! Try asking:\n\n• "What can I do?"\n• "How do I get started?"\n• "What are some quick wins?"\n• "What's new?"`;
}