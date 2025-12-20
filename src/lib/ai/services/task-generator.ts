/**
 * Task Generator AI Service
 * 
 * Uses Gemini AI to generate comprehensive task lists for events.
 * Includes workflow phases, dependencies, and critical path analysis.
 */

import { callGemini, type GeminiConfig } from '../gemini';
import type { Database } from '@/lib/supabase/types';

type TaskInsert = Database['public']['Tables']['tasks']['Insert'];

export interface TaskGenerationResult {
  tasks: TaskInsert[];
  summary: {
    totalTasks: number;
    criticalPathTasks: number;
    estimatedDays: number;
    workflowPhases: Record<string, number>;
  };
  dependencies: Array<{
    taskId: string;
    dependsOn: string[];
    reason: string;
  }>;
  criticalPath: string[];
  recommendations: string[];
}

/**
 * Generate comprehensive task list for an event
 */
export async function generateEventTasks(
  eventDetails: {
    name: string;
    type: string;
    description?: string;
    startDate: string;
    endDate?: string;
    budget?: number;
    attendeeCount?: number;
  }
): Promise<TaskGenerationResult> {
  const prompt = `
Generate a comprehensive task list for this event:

EVENT DETAILS:
- Name: ${eventDetails.name}
- Type: ${eventDetails.type}
- Description: ${eventDetails.description || 'Not provided'}
- Start Date: ${eventDetails.startDate}
- End Date: ${eventDetails.endDate || 'TBD'}
- Budget: ${eventDetails.budget ? `$${eventDetails.budget.toLocaleString()}` : 'Not set'}
- Expected Attendees: ${eventDetails.attendeeCount || 'TBD'}

GENERATE TASKS FOR:
1. Pre-Production Phase (venue, contracts, planning)
2. Venue & Logistics Phase (setup, equipment, catering)
3. Creative & Design Phase (branding, content, styling)
4. On-Site Execution Phase (day-of coordination)
5. Post-Event Phase (breakdown, reporting, follow-up)

FOR EACH TASK PROVIDE:
- Clear, actionable title
- Brief description
- Priority (critical/high/medium/low)
- Workflow phase and category
- Estimated deadline (relative to event date)
- Whether it's on the critical path
- Dependencies on other tasks

Also identify:
- Critical path tasks
- Task dependencies
- Potential bottlenecks
- Timeline recommendations

Respond with structured JSON matching this schema:
{
  "tasks": [...],
  "dependencies": [...],
  "criticalPath": [...],
  "recommendations": [...]
}
  `.trim();

  const config: GeminiConfig = {
    features: ['text_generation', 'structured_output', 'gemini_thinking'],
    temperature: 0.6,
    maxTokens: 8192,
  };

  const response = await callGemini(prompt, config);

  if (response.structuredData) {
    return processTaskGenerationResult(response.structuredData);
  }

  // Fallback: Return empty structure
  return {
    tasks: [],
    summary: {
      totalTasks: 0,
      criticalPathTasks: 0,
      estimatedDays: 0,
      workflowPhases: {},
    },
    dependencies: [],
    criticalPath: [],
    recommendations: [],
  };
}

/**
 * Process and validate task generation result
 */
function processTaskGenerationResult(data: any): TaskGenerationResult {
  const tasks: TaskInsert[] = (data.tasks || []).map((task: any, index: number) => ({
    title: task.title || `Task ${index + 1}`,
    description: task.description || null,
    status: 'to_do' as const,
    priority: task.priority || 'medium' as const,
    workflow_phase: task.workflow_phase || 'pre_production' as const,
    workflow_category: task.workflow_category || 'event_planning' as const,
    is_critical_path: task.is_critical_path || false,
    deadline: task.deadline || null,
    assigned_to: null,
    dependency_task_ids: task.dependency_task_ids || [],
  }));

  // Calculate summary
  const workflowPhases: Record<string, number> = {};
  tasks.forEach(task => {
    const phase = task.workflow_phase || 'pre_production';
    workflowPhases[phase] = (workflowPhases[phase] || 0) + 1;
  });

  const summary = {
    totalTasks: tasks.length,
    criticalPathTasks: tasks.filter(t => t.is_critical_path).length,
    estimatedDays: data.summary?.estimatedDays || 75,
    workflowPhases,
  };

  return {
    tasks,
    summary,
    dependencies: data.dependencies || [],
    criticalPath: data.criticalPath || [],
    recommendations: data.recommendations || [],
  };
}

/**
 * Generate tasks for specific workflow phase
 */
export async function generatePhase Tasks(
  eventId: string,
  phase: 'pre_production' | 'venue_logistics' | 'creative_design' | 'on_site' | 'post_event',
  eventContext: {
    name: string;
    type: string;
    budget?: number;
  }
): Promise<TaskInsert[]> {
  const phaseDescriptions = {
    pre_production: 'Initial planning, venue booking, contract negotiations, team assembly',
    venue_logistics: 'Venue setup, equipment rental, catering, transportation, accommodations',
    creative_design: 'Branding, marketing materials, content creation, styling, photography',
    on_site: 'Day-of coordination, setup, guest management, real-time troubleshooting',
    post_event: 'Breakdown, cleanup, reporting, analytics, follow-up communications',
  };

  const prompt = `
Generate detailed tasks for the ${phase.replace('_', ' ')} phase of this event:

EVENT: ${eventContext.name} (${eventContext.type})
BUDGET: ${eventContext.budget ? `$${eventContext.budget.toLocaleString()}` : 'Not set'}

PHASE FOCUS: ${phaseDescriptions[phase]}

Generate 15-25 specific, actionable tasks for this phase.
Each task should have:
- Clear title
- Detailed description
- Priority level
- Estimated deadline
- Whether it's critical path

Respond with structured JSON array of tasks.
  `.trim();

  const config: GeminiConfig = {
    features: ['text_generation', 'structured_output'],
    temperature: 0.6,
    maxTokens: 4096,
  };

  const response = await callGemini(prompt, config);

  const tasksData = response.structuredData?.tasks || [];
  return tasksData.map((task: any, index: number) => ({
    title: task.title || `${phase} Task ${index + 1}`,
    description: task.description || null,
    status: 'to_do' as const,
    priority: task.priority || 'medium' as const,
    workflow_phase: phase,
    workflow_category: task.workflow_category || 'event_planning' as const,
    is_critical_path: task.is_critical_path || false,
    deadline: task.deadline || null,
    assigned_to: null,
    dependency_task_ids: [],
  }));
}

/**
 * Analyze existing tasks and suggest additions
 */
export async function suggestAdditionalTasks(
  eventDetails: {
    name: string;
    type: string;
  },
  existingTasks: Array<{
    title: string;
    workflow_phase: string;
    workflow_category: string;
  }>
): Promise<{
  suggestions: TaskInsert[];
  gaps: string[];
  reasoning: string;
}> {
  const prompt = `
Analyze this event's existing tasks and suggest additions to ensure comprehensive coverage:

EVENT: ${eventDetails.name} (${eventDetails.type})

EXISTING TASKS (${existingTasks.length}):
${existingTasks.map(t => `- ${t.title} [${t.workflow_phase}/${t.workflow_category}]`).join('\n')}

IDENTIFY:
- Missing critical tasks
- Underrepresented workflow phases
- Important categories with low coverage
- Tasks that would improve event success

Suggest 5-15 additional tasks that would strengthen this event plan.

Respond with structured JSON:
{
  "suggestions": [...tasks...],
  "gaps": [...identified gaps...],
  "reasoning": "explanation"
}
  `.trim();

  const config: GeminiConfig = {
    features: ['text_generation', 'structured_output', 'gemini_thinking'],
    temperature: 0.5,
    maxTokens: 4096,
  };

  const response = await callGemini(prompt, config);

  if (response.structuredData) {
    return {
      suggestions: (response.structuredData.suggestions || []).map((task: any) => ({
        title: task.title,
        description: task.description || null,
        status: 'to_do' as const,
        priority: task.priority || 'medium' as const,
        workflow_phase: task.workflow_phase || 'pre_production' as const,
        workflow_category: task.workflow_category || 'event_planning' as const,
        is_critical_path: task.is_critical_path || false,
        deadline: task.deadline || null,
        assigned_to: null,
        dependency_task_ids: [],
      })),
      gaps: response.structuredData.gaps || [],
      reasoning: response.structuredData.reasoning || response.text,
    };
  }

  return {
    suggestions: [],
    gaps: [],
    reasoning: response.text,
  };
}

/**
 * Optimize task timeline and dependencies
 */
export async function optimizeTaskTimeline(
  tasks: Array<{
    id: string;
    title: string;
    deadline: string | null;
    is_critical_path: boolean;
    dependency_task_ids: string[];
  }>
): Promise<{
  optimizedDeadlines: Record<string, string>;
  criticalPath: string[];
  bottlenecks: Array<{
    taskId: string;
    reason: string;
    impact: string;
  }>;
  recommendations: string[];
}> {
  const prompt = `
Analyze and optimize this task timeline:

TASKS:
${tasks.map(t => `
ID: ${t.id}
Title: ${t.title}
Deadline: ${t.deadline || 'Not set'}
Critical Path: ${t.is_critical_path}
Dependencies: ${t.dependency_task_ids.join(', ') || 'None'}
`).join('\n')}

ANALYZE:
- Critical path (longest dependent chain)
- Bottleneck tasks (blocking many others)
- Timeline conflicts
- Optimization opportunities

PROVIDE:
- Optimized deadlines for all tasks
- Identified critical path
- Bottleneck analysis
- Recommendations for timeline improvement

Respond with structured JSON.
  `.trim();

  const config: GeminiConfig = {
    features: ['text_generation', 'structured_output', 'gemini_thinking'],
    temperature: 0.3,
    maxTokens: 4096,
  };

  const response = await callGemini(prompt, config);

  return response.structuredData || {
    optimizedDeadlines: {},
    criticalPath: [],
    bottlenecks: [],
    recommendations: [],
  };
}

/**
 * Generate task dependencies based on event workflow
 */
export async function generateTaskDependencies(
  tasks: Array<{
    id: string;
    title: string;
    workflow_phase: string;
  }>
): Promise<Array<{
  taskId: string;
  dependsOn: string[];
  reason: string;
}>> {
  const prompt = `
Analyze these tasks and determine logical dependencies:

TASKS:
${tasks.map(t => `ID: ${t.id} | ${t.title} [${t.workflow_phase}]`).join('\n')}

Identify which tasks should depend on others based on:
- Logical workflow order
- Phase requirements
- Industry best practices
- Risk mitigation

Respond with structured JSON array of dependencies.
  `.trim();

  const config: GeminiConfig = {
    features: ['text_generation', 'structured_output'],
    temperature: 0.4,
    maxTokens: 4096,
  };

  const response = await callGemini(prompt, config);

  return response.structuredData?.dependencies || [];
}
