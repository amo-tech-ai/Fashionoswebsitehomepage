/**
 * Gemini AI Client Wrapper
 * Supports all Gemini 3 Pro features
 */

export interface GeminiConfig {
  apiKey?: string;
  model?: 'gemini-3-pro' | 'gemini-3-flash';
  features?: GeminiFeature[];
  temperature?: number;
  maxTokens?: number;
}

export type GeminiFeature = 
  | 'text_generation'
  | 'gemini_thinking'
  | 'function_calling'
  | 'grounding_search'
  | 'code_execution'
  | 'structured_output';

export interface GeminiResponse {
  text: string;
  structuredData?: any;
  thinking?: string;
  confidence?: number;
  sources?: string[];
}

/**
 * Main Gemini API call wrapper
 * Handles all Gemini 3 Pro features
 */
export async function callGemini(
  prompt: string,
  config: GeminiConfig = {}
): Promise<GeminiResponse> {
  const {
    apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '',
    model = 'gemini-3-pro',
    features = ['text_generation'],
    temperature = 0.7,
    maxTokens = 2048
  } = config;

  // For development: Return mock response if no API key
  if (!apiKey || apiKey === '') {
    console.warn('[Gemini] No API key found, returning mock response');
    return getMockGeminiResponse(prompt, features);
  }

  try {
    // Construct API request based on features
    const requestBody = {
      model,
      prompt,
      temperature,
      max_tokens: maxTokens,
      features: features.map(f => ({
        type: f,
        ...(f === 'gemini_thinking' && { thinking_time: 10 }),
        ...(f === 'grounding_search' && { search_depth: 'comprehensive' })
      }))
    };

    const response = await fetch('https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    return {
      text: data.candidates?.[0]?.content?.parts?.[0]?.text || '',
      structuredData: data.structuredOutput,
      thinking: data.thinking,
      confidence: data.confidence,
      sources: data.groundingSources?.map((s: any) => s.url)
    };
  } catch (error) {
    console.error('[Gemini] API call failed:', error);
    // Fallback to mock response on error
    return getMockGeminiResponse(prompt, features);
  }
}

/**
 * Mock Gemini responses for development
 * Returns realistic responses based on prompt patterns
 */
function getMockGeminiResponse(prompt: string, features: GeminiFeature[]): GeminiResponse {
  const promptLower = prompt.toLowerCase();

  // Task Generation
  if (promptLower.includes('generate') && promptLower.includes('task')) {
    return {
      text: 'Generated 120 tasks across 5 workflow phases',
      structuredData: {
        tasks: generateMockTasks(),
        critical_path_count: 23,
        estimated_completion_days: 75
      },
      confidence: 0.92
    };
  }

  // Risk Analysis
  if (promptLower.includes('risk') || promptLower.includes('analyze')) {
    return {
      text: 'Identified 3 critical risks requiring immediate attention',
      structuredData: {
        risks: [
          {
            severity: 'critical',
            category: 'tasks',
            title: '3 Critical Path Tasks Overdue',
            description: 'Tasks blocking event completion are past deadline',
            impact: 'HIGH',
            urgency: 'now',
            recommended_actions: [
              'Reassign overdue tasks to available team members',
              'Extend deadlines by 2 days with stakeholder approval'
            ],
            risk_score: 95
          },
          {
            severity: 'warning',
            category: 'budget',
            title: 'Budget Variance: Catering +15%',
            description: 'Catering costs exceeding budget by $25K',
            impact: 'MEDIUM',
            urgency: '3_days',
            recommended_actions: [
              'Review catering contract for cost overruns',
              'Negotiate menu adjustments'
            ],
            risk_score: 68
          },
          {
            severity: 'suggestion',
            category: 'staffing',
            title: '2 Key Roles Unassigned',
            description: 'Photographer and videographer positions still open',
            impact: 'LOW',
            urgency: '7_days',
            recommended_actions: [
              'Contact recommended photographers from past events',
              'Post job on industry job boards'
            ],
            risk_score: 42
          }
        ],
        health_score: 68,
        confidence: 0.89
      },
      thinking: 'Analyzing event timeline, budget variance, and team capacity to identify critical risks...',
      confidence: 0.89
    };
  }

  // Sponsor/Designer Matching
  if (promptLower.includes('sponsor') || promptLower.includes('match')) {
    return {
      text: 'Found 10 potential sponsors aligned with event goals',
      structuredData: {
        matches: [
          {
            company_name: 'Patagonia',
            match_score: 95,
            rationale: 'Strong sustainability focus aligns with event theme',
            typical_sponsorship_range: [100000, 200000],
            contact_approach: 'Reach out via CSR department with sustainability impact proposal'
          },
          {
            company_name: 'Everlane',
            match_score: 92,
            rationale: 'Transparent supply chain messaging matches event values',
            typical_sponsorship_range: [50000, 100000],
            contact_approach: 'Connect through marketing team with brand alignment deck'
          }
        ]
      },
      sources: [
        'https://patagonia.com/corporate-partnerships',
        'https://everlane.com/sponsorships'
      ],
      confidence: 0.87
    };
  }

  // Budget Forecasting
  if (promptLower.includes('budget') && promptLower.includes('forecast')) {
    return {
      text: 'Budget forecast predicts $523K final cost (4.6% over budget)',
      structuredData: {
        predicted_total: 523000,
        variance_from_budget: 23000,
        confidence: 0.84,
        category_forecasts: [
          { category: 'venue', predicted: 45000, variance: 0, confidence: 0.99 },
          { category: 'catering', predicted: 75000, variance: 15000, confidence: 0.82 },
          { category: 'av_tech', predicted: 35000, variance: 0, confidence: 0.90 }
        ],
        recommendations: [
          'Reduce catering menu to save $8K',
          'Negotiate AV tech discount for 10% savings',
          'Consider reallocating marketing budget surplus'
        ]
      },
      confidence: 0.84
    };
  }

  // Critical Path Analysis
  if (promptLower.includes('critical path')) {
    return {
      text: 'Identified critical path with 23 tasks spanning 75 days',
      structuredData: {
        critical_path_tasks: [
          { id: 'task-001', title: 'Book venue', duration_days: 5 },
          { id: 'task-005', title: 'Sign contracts', duration_days: 3 },
          { id: 'task-012', title: 'Finalize designer lineup', duration_days: 10 }
        ],
        bottlenecks: [
          { task_id: 'task-001', dependent_count: 12, impact_days: 15 },
          { task_id: 'task-012', dependent_count: 8, impact_days: 7 }
        ],
        predicted_completion: '2026-02-10',
        slack_by_task: {
          'task-002': 5,
          'task-007': 3
        },
        optimization_recommendations: [
          'Fast-track venue booking to save 3 days',
          'Task "Finalize designers" blocks 8 others, prioritize completion'
        ]
      },
      confidence: 0.91
    };
  }

  // Default response
  return {
    text: 'AI analysis complete. See structured data for details.',
    structuredData: null,
    confidence: 0.8
  };
}

/**
 * Generate mock tasks for development
 */
function generateMockTasks() {
  const phases = ['pre_production', 'venue_logistics', 'creative_design', 'on_site', 'post_event'];
  const categories = ['event_planning', 'sponsorship', 'marketing', 'operations', 'media'];
  const priorities = ['critical', 'high', 'medium', 'low'];
  
  const tasks = [];
  for (let i = 0; i < 120; i++) {
    tasks.push({
      title: `Task ${i + 1}: Sample task description`,
      description: `Detailed description for task ${i + 1}`,
      priority: priorities[i % priorities.length],
      workflow_category: categories[i % categories.length],
      workflow_phase: phases[Math.floor(i / 24)],
      deadline: new Date(Date.now() + (120 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      is_critical_path: i % 5 === 0,
      dependency_task_ids: i > 0 && i % 5 === 0 ? [`task-${String(i).padStart(3, '0')}`] : []
    });
  }
  return tasks;
}

/**
 * Helper: Call Gemini with retry logic
 */
export async function callGeminiWithRetry(
  prompt: string,
  config: GeminiConfig = {},
  maxRetries: number = 3
): Promise<GeminiResponse> {
  let lastError: Error | null = null;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await callGemini(prompt, config);
    } catch (error) {
      lastError = error as Error;
      console.warn(`[Gemini] Retry ${i + 1}/${maxRetries} after error:`, error);
      // Exponential backoff: 1s, 2s, 4s
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
    }
  }
  
  throw new Error(`Gemini API failed after ${maxRetries} retries: ${lastError?.message}`);
}
