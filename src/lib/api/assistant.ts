/**
 * FashionOS AI Assistant - API Client
 * 
 * Abstracts all backend communication for the AI assistant.
 * Provides clean interface for:
 * - Chat interactions
 * - Automation workflows
 * - Data persistence
 * - Real-time subscriptions
 * 
 * Architecture:
 * - Frontend calls these functions
 * - Functions call Supabase Edge Functions
 * - Edge Functions process and return data
 * - Real-time updates via WebSocket subscriptions
 */

// ============================================================================
// TYPES
// ============================================================================

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  actions?: {
    label: string;
    actionId: string;
  }[];
  metadata?: {
    intent?: string;
    confidence?: number;
    skill?: string;
  };
}

export interface ChatRequest {
  message: string;
  context: {
    currentRoute: string;
    currentKit: string;
    userActivity?: any;
    samples?: any[];
    events?: any[];
    assets?: any[];
  };
}

export interface ChatResponse {
  message: ChatMessage;
  success: boolean;
  error?: string;
}

export interface AutomationResult {
  workflowName: string;
  success: boolean;
  output: any;
  actions: string[];
  executionTime: number;
}

// ============================================================================
// CONFIGURATION
// ============================================================================

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const API_BASE_URL = `${SUPABASE_URL}/functions/v1`;

// Mock mode for development (before backend is ready)
const MOCK_MODE = !SUPABASE_URL || SUPABASE_URL === '';

// ============================================================================
// HELPER: HTTP CLIENT
// ============================================================================

async function fetchAPI(
  endpoint: string,
  options: RequestInit = {}
): Promise<any> {
  if (MOCK_MODE) {
    console.warn('🧪 API MOCK MODE: Backend not configured');
    return mockAPICall(endpoint, options);
  }

  const url = `${API_BASE_URL}/${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `API error: ${response.status}`);
  }

  return response.json();
}

// ============================================================================
// MOCK API (FOR DEVELOPMENT)
// ============================================================================

async function mockAPICall(endpoint: string, options: RequestInit): Promise<any> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Mock responses based on endpoint
  if (endpoint === 'chat-orchestrator') {
    const body = JSON.parse(options.body as string);
    return {
      message: {
        id: Date.now().toString(),
        role: 'assistant',
        content: `Mock response to: "${body.message}". The real backend will provide intelligent responses based on your context.`,
        timestamp: new Date(),
        actions: [
          { label: 'Mock Action 1', actionId: 'mock-1' },
          { label: 'Mock Action 2', actionId: 'mock-2' },
        ],
        metadata: {
          intent: 'general',
          confidence: 0.8,
          skill: 'navigator',
        },
      },
      success: true,
    };
  }

  if (endpoint === 'run-automation') {
    return {
      workflowName: 'Mock Workflow',
      success: true,
      output: { message: 'Mock automation executed successfully' },
      actions: ['Mock action completed'],
      executionTime: 123,
    };
  }

  return { success: true, message: 'Mock API response' };
}

// ============================================================================
// CHAT API
// ============================================================================

/**
 * Send a chat message and get AI response
 */
export async function sendChatMessage(
  request: ChatRequest
): Promise<ChatResponse> {
  try {
    const result = await fetchAPI('chat-orchestrator', {
      method: 'POST',
      body: JSON.stringify({
        message: request.message,
        context: request.context,
        timestamp: new Date().toISOString(),
      }),
    });

    return {
      message: {
        ...result.message,
        timestamp: new Date(result.message.timestamp),
      },
      success: true,
    };
  } catch (error) {
    console.error('Chat API error:', error);
    return {
      message: {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      },
      success: false,
      error: (error as Error).message,
    };
  }
}

/**
 * Get chat history for current user
 */
export async function getChatHistory(
  limit: number = 50
): Promise<ChatMessage[]> {
  try {
    const result = await fetchAPI(`chat-history?limit=${limit}`);
    return result.messages.map((msg: any) => ({
      ...msg,
      timestamp: new Date(msg.timestamp),
    }));
  } catch (error) {
    console.error('Chat history error:', error);
    return [];
  }
}

// ============================================================================
// AUTOMATION API
// ============================================================================

/**
 * Trigger an automation workflow manually
 */
export async function runAutomation(
  workflowName: string,
  context: any
): Promise<AutomationResult> {
  try {
    const result = await fetchAPI('run-automation', {
      method: 'POST',
      body: JSON.stringify({
        workflow: workflowName,
        context,
        timestamp: new Date().toISOString(),
      }),
    });

    return result;
  } catch (error) {
    console.error('Automation API error:', error);
    return {
      workflowName,
      success: false,
      output: { error: (error as Error).message },
      actions: [],
      executionTime: 0,
    };
  }
}

/**
 * Get automation execution history
 */
export async function getAutomationHistory(
  limit: number = 20
): Promise<AutomationResult[]> {
  try {
    const result = await fetchAPI(`automation-history?limit=${limit}`);
    return result.executions;
  } catch (error) {
    console.error('Automation history error:', error);
    return [];
  }
}

/**
 * Schedule a daily risk scan
 */
export async function scheduleDailyRiskScan(
  time: string = '08:00'
): Promise<{ success: boolean; message: string }> {
  try {
    const result = await fetchAPI('schedule-risk-scan', {
      method: 'POST',
      body: JSON.stringify({ time }),
    });
    return result;
  } catch (error) {
    console.error('Schedule risk scan error:', error);
    return {
      success: false,
      message: (error as Error).message,
    };
  }
}

// ============================================================================
// ANALYTICS API
// ============================================================================

/**
 * Track user interaction for analytics
 */
export async function trackInteraction(
  eventName: string,
  properties: Record<string, any>
): Promise<void> {
  try {
    await fetchAPI('track-event', {
      method: 'POST',
      body: JSON.stringify({
        event: eventName,
        properties,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch (error) {
    // Don't block user flow on analytics errors
    console.warn('Analytics tracking failed:', error);
  }
}

/**
 * Get usage statistics
 */
export async function getUsageStats(): Promise<{
  messagesCount: number;
  automationsCount: number;
  avgResponseTime: number;
  topFeatures: string[];
}> {
  try {
    const result = await fetchAPI('usage-stats');
    return result.stats;
  } catch (error) {
    console.error('Usage stats error:', error);
    return {
      messagesCount: 0,
      automationsCount: 0,
      avgResponseTime: 0,
      topFeatures: [],
    };
  }
}

// ============================================================================
// REAL-TIME SUBSCRIPTIONS
// ============================================================================

/**
 * Subscribe to real-time updates (WebSocket)
 * 
 * Note: This requires Supabase Realtime to be enabled.
 * Will be implemented when backend is ready.
 */
export function subscribeToUpdates(
  channel: string,
  callback: (update: any) => void
): () => void {
  if (MOCK_MODE) {
    console.log('🧪 MOCK MODE: Real-time subscription skipped');
    return () => {}; // No-op unsubscribe
  }

  // TODO: Implement Supabase Realtime subscription
  // const subscription = supabase
  //   .channel(channel)
  //   .on('*', (payload) => callback(payload))
  //   .subscribe();
  
  // return () => subscription.unsubscribe();
  
  return () => {}; // Placeholder
}

// ============================================================================
// HEALTH CHECK
// ============================================================================

/**
 * Check if backend is available
 */
export async function healthCheck(): Promise<{
  healthy: boolean;
  mode: 'production' | 'mock';
  latency?: number;
}> {
  if (MOCK_MODE) {
    return {
      healthy: true,
      mode: 'mock',
    };
  }

  try {
    const start = Date.now();
    await fetchAPI('health');
    const latency = Date.now() - start;
    
    return {
      healthy: true,
      mode: 'production',
      latency,
    };
  } catch (error) {
    return {
      healthy: false,
      mode: 'production',
    };
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

export const assistantAPI = {
  // Chat
  sendMessage: sendChatMessage,
  getChatHistory,
  
  // Automation
  runAutomation,
  getAutomationHistory,
  scheduleDailyRiskScan,
  
  // Analytics
  trackInteraction,
  getUsageStats,
  
  // Real-time
  subscribeToUpdates,
  
  // Health
  healthCheck,
};

export default assistantAPI;
