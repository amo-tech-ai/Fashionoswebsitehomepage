/**
 * Deep Linking Utility
 * 
 * Enables AI assistant to navigate users to specific sections of the app
 * with filters, states, and parameters applied.
 * 
 * Format: "route:action:params"
 * Examples:
 * - "sample-tracker:delayed" → Open sample tracker filtered to delayed items
 * - "shotlist:batch-accessories" → Open shot list grouped by accessories
 * - "events:create" → Open event creation wizard
 */

export interface DeepLinkTarget {
  route: string;
  action?: string;
  params?: Record<string, any>;
}

export interface DeepLinkHandler {
  onNavigate: (route: string) => void;
  onFilterChange?: (filters: Record<string, any>) => void;
  onStateUpdate?: (state: Record<string, any>) => void;
}

/**
 * Parse a deep link string into structured target
 * 
 * @param deepLink - String in format "route:action:param1=value1,param2=value2"
 * @returns Structured DeepLinkTarget object
 */
export function parseDeepLink(deepLink: string): DeepLinkTarget {
  const [route, action, paramsStr] = deepLink.split(':');
  
  const params: Record<string, any> = {};
  if (paramsStr) {
    paramsStr.split(',').forEach(pair => {
      const [key, value] = pair.split('=');
      if (key && value) {
        params[key] = value;
      }
    });
  }

  return {
    route,
    action,
    params: Object.keys(params).length > 0 ? params : undefined
  };
}

/**
 * Execute a deep link navigation
 * 
 * This function:
 * 1. Parses the deep link
 * 2. Navigates to the target route
 * 3. Applies filters/state via localStorage (read by target component)
 * 4. Triggers any special actions
 * 
 * @param deepLink - Deep link string
 * @param handler - Navigation and state handlers
 */
export function executeDeepLink(deepLink: string, handler: DeepLinkHandler): void {
  const target = parseDeepLink(deepLink);
  
  console.log('🔗 Deep Link:', deepLink, '→', target);

  // Store deep link state in localStorage for target component to read
  const deepLinkState = {
    action: target.action,
    params: target.params,
    timestamp: Date.now()
  };
  
  if (typeof window !== 'undefined') {
    localStorage.setItem(`deepLink_${target.route}`, JSON.stringify(deepLinkState));
    
    // Clear after 5 seconds (prevent stale state)
    setTimeout(() => {
      localStorage.removeItem(`deepLink_${target.route}`);
    }, 5000);
  }

  // Navigate to route
  handler.onNavigate(target.route);

  // Execute action-specific logic
  handleDeepLinkAction(target, handler);
}

/**
 * Handle action-specific deep link logic
 */
function handleDeepLinkAction(target: DeepLinkTarget, handler: DeepLinkHandler): void {
  const { route, action, params } = target;

  // Sample Tracker Actions
  if (route === 'sample-tracker') {
    if (action === 'delayed') {
      handler.onFilterChange?.({ status: 'awaiting' });
    } else if (action === 'blockers') {
      handler.onFilterChange?.({ showBlockersOnly: true });
    } else if (action === 'batching') {
      handler.onStateUpdate?.({ view: 'batching' });
    } else if (action === 'missing') {
      handler.onFilterChange?.({ status: 'awaiting', priority: 'high' });
    }
  }

  // Shot List Actions
  else if (route === 'shotlist') {
    if (action === 'batch-accessories') {
      handler.onStateUpdate?.({ groupBy: 'accessories' });
    } else if (action === 'reorder') {
      handler.onStateUpdate?.({ mode: 'reorder' });
    }
  }

  // Events Actions
  else if (route === 'events') {
    if (action === 'create') {
      handler.onStateUpdate?.({ showWizard: true });
    } else if (action === 'upcoming') {
      handler.onFilterChange?.({ timeframe: 'upcoming' });
    }
  }

  // Gallery Actions
  else if (route === 'gallery') {
    if (action === 'missing-shots') {
      handler.onFilterChange?.({ showMissing: true });
    } else if (action === 'selects') {
      handler.onStateUpdate?.({ view: 'selects' });
    }
  }

  // Event Detail Actions
  else if (route === 'eventdetail') {
    if (action === 'critical-path') {
      handler.onStateUpdate?.({ view: 'criticalPath' });
    } else if (action === 'run-of-show') {
      handler.onStateUpdate?.({ showRunOfShow: true });
    }
  }
}

/**
 * Read deep link state from localStorage (called by target component)
 * 
 * @param route - Route name to check for deep link state
 * @returns Deep link state if exists and not expired, null otherwise
 */
export function readDeepLinkState(route: string): {
  action?: string;
  params?: Record<string, any>;
} | null {
  if (typeof window === 'undefined') return null;

  const stored = localStorage.getItem(`deepLink_${route}`);
  if (!stored) return null;

  try {
    const state = JSON.parse(stored);
    
    // Check if expired (older than 5 seconds)
    const age = Date.now() - state.timestamp;
    if (age > 5000) {
      localStorage.removeItem(`deepLink_${route}`);
      return null;
    }

    return {
      action: state.action,
      params: state.params
    };
  } catch (e) {
    return null;
  }
}

/**
 * Clear deep link state (called after target component processes it)
 * 
 * @param route - Route name to clear state for
 */
export function clearDeepLinkState(route: string): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(`deepLink_${route}`);
}

/**
 * Common deep link presets for quick access
 */
export const DEEP_LINKS = {
  // Sample Tracker
  SAMPLE_TRACKER_DELAYED: 'sample-tracker:delayed',
  SAMPLE_TRACKER_BLOCKERS: 'sample-tracker:blockers',
  SAMPLE_TRACKER_BATCHING: 'sample-tracker:batching',
  SAMPLE_TRACKER_MISSING: 'sample-tracker:missing',
  
  // Shot List
  SHOTLIST_BATCH: 'shotlist:batch-accessories',
  SHOTLIST_REORDER: 'shotlist:reorder',
  
  // Events
  EVENTS_CREATE: 'events:create',
  EVENTS_UPCOMING: 'events:upcoming',
  EVENT_CRITICAL_PATH: 'eventdetail:critical-path',
  EVENT_RUN_OF_SHOW: 'eventdetail:run-of-show',
  
  // Gallery
  GALLERY_MISSING: 'gallery:missing-shots',
  GALLERY_SELECTS: 'gallery:selects',
  
  // Services
  SERVICES_PHOTOGRAPHY: 'photography',
  SERVICES_VIDEO: 'video',
  
  // Overview
  OVERVIEW_DASHBOARD: 'overview'
} as const;

export type DeepLinkPreset = typeof DEEP_LINKS[keyof typeof DEEP_LINKS];
