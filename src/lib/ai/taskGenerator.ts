/**
 * AI Task Generator
 * Uses Gemini to generate comprehensive task lists for events
 */

import { callGemini } from './gemini';
import { EventTask } from '../types/events.types';

export interface TaskGenerationParams {
  eventType: string;
  startDate: string;
  budget: number;
  attendeeTarget: number;
}

/**
 * Generate 80-150 tasks for an event using Gemini AI
 */
export async function generateEventTasks(
  params: TaskGenerationParams
): Promise<Partial<EventTask>[]> {
  const daysUntilEvent = calculateDaysUntil(params.startDate);

  const prompt = `
You are an expert event planner. Generate a comprehensive task list for this event:

EVENT DETAILS:
- Type: ${params.eventType}
- Start Date: ${params.startDate} (${daysUntilEvent} days from now)
- Budget: $${params.budget.toLocaleString()}
- Expected Attendees: ${params.attendeeTarget}

REQUIREMENTS:
1. Generate 80-150 tasks total
2. Cover all aspects of event planning

ORGANIZE INTO 5 WORKFLOW PHASES:
- pre_production: 60-90 days before event (30-35% of tasks)
  - Venue booking, contracts, team assembly, concept development
- venue_logistics: 30-60 days before (25-30% of tasks)
  - Floor plans, catering, AV setup, transportation
- creative_design: 15-30 days before (20-25% of tasks)
  - Branding, invitations, designer lineup, lighting design
- on_site: 1-7 days + event day (15-20% of tasks)
  - Load-in, setup, rehearsals, day-of execution
- post_event: After completion (5-10% of tasks)
  - Cleanup, media collection, thank-yous, debrief

ORGANIZE INTO 5 WORKFLOW CATEGORIES:
- event_planning: Core logistics, scheduling, coordination
- sponsorship: Sponsor outreach, contracts, fulfillment
- marketing: Promotion, PR, social media, invitations
- operations: Venue, catering, AV, transportation, staff
- media: Photography, videography, content creation

ASSIGN PRIORITIES:
- critical: Tasks that block the event (15-20% of tasks)
- high: Important but can be delegated (30-35%)
- medium: Standard tasks (35-40%)
- low: Nice-to-haves (10-15%)

SET REALISTIC DEADLINES:
- Work backward from event date
- Account for dependencies
- Add buffer time for critical tasks

IDENTIFY CRITICAL PATH:
- Mark tasks that MUST complete before event can happen
- These are typically: venue, contracts, core team, key suppliers

CALCULATE DEPENDENCIES:
- Some tasks must complete before others can start
- Example: "Book venue" must finish before "Create floor plan"
- Use dependency_task_ids array

Return ONLY valid JSON array with this exact structure:
[
  {
    "title": "Task title (clear, action-oriented)",
    "description": "Detailed description of what needs to be done",
    "priority": "critical" | "high" | "medium" | "low",
    "workflow_category": "event_planning" | "sponsorship" | "marketing" | "operations" | "media",
    "workflow_phase": "pre_production" | "venue_logistics" | "creative_design" | "on_site" | "post_event",
    "deadline": "YYYY-MM-DD",
    "is_critical_path": true | false,
    "dependency_task_ids": []
  }
]

Generate tasks now:
`;

  try {
    const response = await callGemini(prompt, {
      features: ['text_generation', 'code_execution', 'structured_output'],
      model: 'gemini-3-pro',
      temperature: 0.8,
      maxTokens: 4096
    });

    if (!response.structuredData?.tasks && !response.text) {
      throw new Error('Gemini returned no tasks');
    }

    // Try to parse structured data first, fallback to text
    let tasks: any[];
    if (response.structuredData?.tasks) {
      tasks = response.structuredData.tasks;
    } else {
      // Try to extract JSON from text response
      const jsonMatch = response.text.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        throw new Error('Could not parse task JSON from response');
      }
      tasks = JSON.parse(jsonMatch[0]);
    }

    // Validate and clean tasks
    const validatedTasks: Partial<EventTask>[] = tasks
      .filter(task => task.title && task.priority && task.workflow_category)
      .map(task => ({
        title: task.title,
        description: task.description || '',
        priority: validatePriority(task.priority),
        workflow_category: validateCategory(task.workflow_category),
        workflow_phase: validatePhase(task.workflow_phase),
        deadline: task.deadline || calculateDeadline(params.startDate, task.workflow_phase),
        is_critical_path: Boolean(task.is_critical_path),
        dependency_task_ids: Array.isArray(task.dependency_task_ids) ? task.dependency_task_ids : [],
        status: 'to_do' as const
      }));

    console.log(`[AI] Generated ${validatedTasks.length} tasks`);
    return validatedTasks;
  } catch (error) {
    console.error('[AI] Task generation failed:', error);
    throw new Error('Failed to generate tasks with AI');
  }
}

// Validation functions
function validatePriority(priority: string): EventTask['priority'] {
  const valid: EventTask['priority'][] = ['critical', 'high', 'medium', 'low'];
  return valid.includes(priority as any) ? (priority as EventTask['priority']) : 'medium';
}

function validateCategory(category: string): EventTask['workflow_category'] {
  const valid: EventTask['workflow_category'][] = [
    'event_planning',
    'sponsorship',
    'marketing',
    'operations',
    'media'
  ];
  return valid.includes(category as any) ? (category as EventTask['workflow_category']) : 'event_planning';
}

function validatePhase(phase: string): EventTask['workflow_phase'] {
  const valid: EventTask['workflow_phase'][] = [
    'pre_production',
    'venue_logistics',
    'creative_design',
    'on_site',
    'post_event'
  ];
  return valid.includes(phase as any) ? (phase as EventTask['workflow_phase']) : 'pre_production';
}

// Helper: Calculate days until event
function calculateDaysUntil(dateString: string): number {
  const eventDate = new Date(dateString);
  const today = new Date();
  const diffTime = eventDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

// Helper: Calculate deadline based on phase
function calculateDeadline(eventDate: string, phase: EventTask['workflow_phase']): string {
  const event = new Date(eventDate);
  const today = new Date();
  
  let daysBeforeEvent: number;
  switch (phase) {
    case 'pre_production':
      daysBeforeEvent = 75; // 60-90 days
      break;
    case 'venue_logistics':
      daysBeforeEvent = 45; // 30-60 days
      break;
    case 'creative_design':
      daysBeforeEvent = 22; // 15-30 days
      break;
    case 'on_site':
      daysBeforeEvent = 4; // 1-7 days
      break;
    case 'post_event':
      daysBeforeEvent = -7; // After event
      break;
    default:
      daysBeforeEvent = 30;
  }
  
  const deadline = new Date(event);
  deadline.setDate(deadline.getDate() - daysBeforeEvent);
  
  // Don't set deadlines in the past
  if (deadline < today) {
    deadline.setDate(today.getDate() + 3); // 3 days from now
  }
  
  return deadline.toISOString().split('T')[0];
}
