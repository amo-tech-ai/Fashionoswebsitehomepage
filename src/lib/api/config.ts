/**
 * API Configuration
 * 
 * Centralized configuration for all API calls.
 * Handles environment variables and feature flags.
 */

// ============================================================================
// ENVIRONMENT CONFIGURATION
// ============================================================================

export const API_CONFIG = {
  // Supabase
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  
  // Feature Flags
  enableBackend: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
  enableRealtime: Boolean(process.env.NEXT_PUBLIC_ENABLE_REALTIME),
  enableAnalytics: Boolean(process.env.NEXT_PUBLIC_ENABLE_ANALYTICS),
  
  // API Settings
  apiTimeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '30000', 10),
  retryAttempts: parseInt(process.env.NEXT_PUBLIC_API_RETRY || '3', 10),
  
  // Mock Mode
  mockMode: !Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
  mockDelay: parseInt(process.env.NEXT_PUBLIC_MOCK_DELAY || '500', 10),
};

// ============================================================================
// API ENDPOINTS
// ============================================================================

export const API_ENDPOINTS = {
  // Chat
  chatOrchestrator: 'chat-orchestrator',
  chatHistory: 'chat-history',
  
  // Automation
  runAutomation: 'run-automation',
  automationHistory: 'automation-history',
  scheduleRiskScan: 'schedule-risk-scan',
  
  // Analytics
  trackEvent: 'track-event',
  usageStats: 'usage-stats',
  
  // Health
  health: 'health',
};

// ============================================================================
// ERROR MESSAGES
// ============================================================================

export const API_ERRORS = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  TIMEOUT: 'Request timed out. Please try again.',
  UNAUTHORIZED: 'Authentication required. Please sign in.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  NOT_FOUND: 'Resource not found.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNKNOWN: 'An unexpected error occurred.',
};

// ============================================================================
// HELPERS
// ============================================================================

export function getAPIUrl(endpoint: string): string {
  if (API_CONFIG.mockMode) {
    return `/api/mock/${endpoint}`; // Local mock API
  }
  return `${API_CONFIG.supabaseUrl}/functions/v1/${endpoint}`;
}

export function getAuthHeaders(): HeadersInit {
  if (API_CONFIG.mockMode) {
    return {
      'Content-Type': 'application/json',
    };
  }
  
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_CONFIG.supabaseAnonKey}`,
  };
}

export function handleAPIError(error: any): string {
  if (error.name === 'AbortError') {
    return API_ERRORS.TIMEOUT;
  }
  
  if (!navigator.onLine) {
    return API_ERRORS.NETWORK_ERROR;
  }
  
  if (error.status === 401) {
    return API_ERRORS.UNAUTHORIZED;
  }
  
  if (error.status === 403) {
    return API_ERRORS.FORBIDDEN;
  }
  
  if (error.status === 404) {
    return API_ERRORS.NOT_FOUND;
  }
  
  if (error.status >= 500) {
    return API_ERRORS.SERVER_ERROR;
  }
  
  return error.message || API_ERRORS.UNKNOWN;
}

// ============================================================================
// RETRY LOGIC
// ============================================================================

export async function withRetry<T>(
  fn: () => Promise<T>,
  attempts: number = API_CONFIG.retryAttempts
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (attempts <= 1) {
      throw error;
    }
    
    // Exponential backoff
    await new Promise(resolve => setTimeout(resolve, (4 - attempts) * 1000));
    return withRetry(fn, attempts - 1);
  }
}

// ============================================================================
// LOGGING
// ============================================================================

export function logAPICall(
  endpoint: string,
  method: string,
  duration: number,
  success: boolean
): void {
  if (process.env.NODE_ENV === 'development') {
    const emoji = success ? '✅' : '❌';
    console.log(
      `${emoji} API ${method} ${endpoint} - ${duration}ms ${success ? '' : 'FAILED'}`
    );
  }
}
