/**
 * Event Planner Agent — AI-Powered Task Generation
 * 
 * Purpose: Generate comprehensive task lists for fashion events
 * Model: Gemini 3 Pro (structured output)
 * Latency: 8-12 seconds (120+ tasks)
 * Cost: ~$0.05 per generation
 * 
 * Capabilities:
 * - Analyzes event data (type, date, budget, capacity)
 * - Generates 120-150 tasks across 14 phases
 * - Calculates deadlines working backwards from event date
 * - Identifies task dependencies and critical path
 * - Validates AI output before database write
 * - Logs all actions for audit trail
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai@0.1.3";

// Types
interface EventData {
  id: string;
  name: string;
  event_type: "runway_show" | "gallery_show" | "popup_store" | "brand_activation";
  event_date: string;
  budget: number;
  expected_attendance: number;
  venue?: string;
  organization_id: string;
}

interface GeneratedTask {
  title: string;
  description: string;
  phase_name: string;
  priority: "critical" | "high" | "medium" | "low";
  estimated_hours: number;
  deadline_days_before: number; // Days before event
  dependencies?: string[]; // Task titles this depends on
}

interface TaskGenerationResponse {
  tasks: GeneratedTask[];
  total_count: number;
  critical_path: string[];
  estimated_total_hours: number;
}

// Environment variables
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const GEMINI_API_KEY = Deno.env.get("GOOGLE_GENERATIVE_AI_API_KEY")!;

// Initialize clients
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

/**
 * Main handler
 */
serve(async (req) => {
  // CORS headers
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "authorization, content-type",
      },
    });
  }

  try {
    // 1. Validate request
    const { event_id } = await req.json();
    
    if (!event_id) {
      return new Response(
        JSON.stringify({ error: "event_id is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // 2. Get auth user
    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // 3. Load event data with permission check
    const { data: event, error: eventError } = await supabase
      .from("events")
      .select("*")
      .eq("id", event_id)
      .single();

    if (eventError || !event) {
      return new Response(
        JSON.stringify({ error: "Event not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // 4. Verify user has access to event's organization
    const { data: userProfile } = await supabase
      .from("users")
      .select("organization_id")
      .eq("id", user.id)
      .single();

    if (userProfile?.organization_id !== event.organization_id) {
      return new Response(
        JSON.stringify({ error: "Forbidden: Not in event's organization" }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }

    // 5. Generate tasks with AI
    console.log(`Generating tasks for event: ${event.name}`);
    const startTime = Date.now();
    
    const aiResponse = await generateTasks(event);
    
    const latencyMs = Date.now() - startTime;
    console.log(`AI generation completed in ${latencyMs}ms`);

    // 6. Validate AI output
    const validationErrors = validateTaskList(aiResponse);
    if (validationErrors.length > 0) {
      console.error("AI output validation failed:", validationErrors);
      return new Response(
        JSON.stringify({
          error: "AI_VALIDATION_FAILED",
          details: validationErrors,
        }),
        { status: 503, headers: { "Content-Type": "application/json" } }
      );
    }

    // 7. Calculate actual deadlines (working backwards from event date)
    const tasksWithDeadlines = calculateDeadlines(aiResponse.tasks, event.event_date);

    // 8. Get event phases (should exist from event creation trigger)
    const { data: phases } = await supabase
      .from("event_phases")
      .select("id, phase_name")
      .eq("event_id", event_id);

    if (!phases || phases.length === 0) {
      return new Response(
        JSON.stringify({ error: "Event phases not found. Create event first." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // 9. Map phase names to IDs
    const phaseMap = new Map(phases.map(p => [p.phase_name, p.id]));

    // 10. Prepare task records for database
    const taskRecords = tasksWithDeadlines.map(task => ({
      event_id: event.id,
      phase_id: phaseMap.get(task.phase_name),
      title: task.title,
      description: task.description,
      status: "pending" as const,
      priority: task.priority,
      deadline: task.deadline,
      estimated_hours: task.estimated_hours,
      created_by: user.id,
      organization_id: event.organization_id,
    }));

    // 11. Bulk insert tasks
    const { data: createdTasks, error: insertError } = await supabase
      .from("tasks")
      .insert(taskRecords)
      .select("id, title");

    if (insertError) {
      console.error("Task insertion failed:", insertError);
      return new Response(
        JSON.stringify({ error: "Failed to create tasks", details: insertError.message }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // 12. Create task dependencies (if any)
    const dependencies = await createTaskDependencies(
      aiResponse.tasks,
      createdTasks || [],
      event.id
    );

    // 13. Log AI action for audit trail
    await logAIAction({
      user_id: user.id,
      event_id: event.id,
      agent: "event_planner",
      model: "gemini-3-pro",
      input: { event_type: event.event_type, event_date: event.event_date, budget: event.budget },
      output: { tasks_generated: createdTasks?.length || 0, critical_path: aiResponse.critical_path },
      latency_ms: latencyMs,
      cost_usd: estimateCost(aiResponse),
      success: true,
    });

    // 14. Return success
    return new Response(
      JSON.stringify({
        success: true,
        data: {
          tasks_created: createdTasks?.length || 0,
          critical_path: aiResponse.critical_path,
          estimated_total_hours: aiResponse.estimated_total_hours,
          dependencies_created: dependencies.length,
        },
        meta: {
          latency_ms: latencyMs,
          cost_usd: estimateCost(aiResponse),
        },
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );

  } catch (error) {
    console.error("Event Planner Agent error:", error);
    
    return new Response(
      JSON.stringify({
        error: "AGENT_ERROR",
        message: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
});

/**
 * Generate tasks using Gemini 3 Pro
 */
async function generateTasks(event: EventData): Promise<TaskGenerationResponse> {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
    generationConfig: {
      temperature: 0.7, // Balanced creativity/consistency
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
    },
  });

  // Calculate days until event
  const daysUntilEvent = Math.floor(
    (new Date(event.event_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  const prompt = `You are an expert luxury fashion event planner. Generate a comprehensive task list for the following event:

**Event Details:**
- Name: ${event.name}
- Type: ${event.event_type}
- Date: ${event.event_date} (${daysUntilEvent} days from now)
- Budget: $${event.budget.toLocaleString()}
- Expected Attendance: ${event.expected_attendance}
- Venue: ${event.venue || "TBD"}

**Requirements:**
- Generate 120-150 tasks across all 14 event phases
- Tasks must be realistic and actionable
- Include deadlines (days before event)
- Assign priority (critical, high, medium, low)
- Estimate hours per task
- Identify dependencies between tasks
- Calculate critical path (sequence of must-do tasks)

**14 Event Phases:**
1. Concept & Strategy (90-120 days before)
2. Venue & Logistics (75-90 days before)
3. Designer & Talent (60-75 days before)
4. Sponsor Outreach (60-90 days before)
5. Marketing & PR (45-90 days before)
6. Ticketing & RSVPs (30-60 days before)
7. Production Design (30-45 days before)
8. Casting & Fittings (21-30 days before)
9. Rehearsals (7-14 days before)
10. Final Prep (3-7 days before)
11. Event Day Setup (Day 0)
12. Event Execution (Day 0)
13. Post-Event (Day +1 to +7)
14. Debrief & Reporting (Day +7 to +14)

**Output Format (JSON):**
{
  "tasks": [
    {
      "title": "Secure venue deposit",
      "description": "Wire 50% deposit to venue account",
      "phase_name": "Venue & Logistics",
      "priority": "critical",
      "estimated_hours": 2,
      "deadline_days_before": 75,
      "dependencies": ["Venue contract signed"]
    }
  ],
  "total_count": 120,
  "critical_path": ["Task 1", "Task 2", "Task 3"],
  "estimated_total_hours": 850
}

Generate the complete task list now:`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();

  // Parse JSON from response (handle markdown code blocks)
  let jsonText = text;
  if (text.includes("```json")) {
    jsonText = text.split("```json")[1].split("```")[0].trim();
  } else if (text.includes("```")) {
    jsonText = text.split("```")[1].split("```")[0].trim();
  }

  try {
    return JSON.parse(jsonText);
  } catch (parseError) {
    console.error("Failed to parse AI response:", text);
    throw new Error("AI returned invalid JSON");
  }
}

/**
 * Validate AI-generated task list
 */
function validateTaskList(response: TaskGenerationResponse): string[] {
  const errors: string[] = [];

  // Check required fields
  if (!response.tasks || !Array.isArray(response.tasks)) {
    errors.push("Missing 'tasks' array");
    return errors;
  }

  if (typeof response.total_count !== "number") {
    errors.push("Missing 'total_count'");
  }

  if (!Array.isArray(response.critical_path)) {
    errors.push("Missing 'critical_path' array");
  }

  // Validate each task
  response.tasks.forEach((task, index) => {
    if (!task.title || task.title.length < 3) {
      errors.push(`Task ${index}: Invalid title`);
    }

    if (!task.phase_name) {
      errors.push(`Task ${index}: Missing phase_name`);
    }

    if (!["critical", "high", "medium", "low"].includes(task.priority)) {
      errors.push(`Task ${index}: Invalid priority`);
    }

    if (typeof task.estimated_hours !== "number" || task.estimated_hours <= 0) {
      errors.push(`Task ${index}: Invalid estimated_hours`);
    }

    if (typeof task.deadline_days_before !== "number" || task.deadline_days_before < 0) {
      errors.push(`Task ${index}: Invalid deadline_days_before`);
    }
  });

  // Validate count
  if (response.tasks.length < 50) {
    errors.push("Too few tasks generated (minimum 50)");
  }

  if (response.tasks.length > 200) {
    errors.push("Too many tasks generated (maximum 200)");
  }

  return errors;
}

/**
 * Calculate actual deadline dates
 */
function calculateDeadlines(
  tasks: GeneratedTask[],
  eventDate: string
): Array<GeneratedTask & { deadline: string }> {
  const eventTimestamp = new Date(eventDate).getTime();

  return tasks.map(task => {
    const deadlineTimestamp = eventTimestamp - (task.deadline_days_before * 24 * 60 * 60 * 1000);
    const deadline = new Date(deadlineTimestamp).toISOString().split("T")[0]; // YYYY-MM-DD

    return {
      ...task,
      deadline,
    };
  });
}

/**
 * Create task dependencies
 */
async function createTaskDependencies(
  aiTasks: GeneratedTask[],
  createdTasks: Array<{ id: string; title: string }>,
  eventId: string
): Promise<Array<{ task_id: string; depends_on_task_id: string }>> {
  const taskTitleToId = new Map(createdTasks.map(t => [t.title, t.id]));
  const dependencies: Array<{ task_id: string; depends_on_task_id: string }> = [];

  aiTasks.forEach(task => {
    if (task.dependencies && task.dependencies.length > 0) {
      const taskId = taskTitleToId.get(task.title);
      if (!taskId) return;

      task.dependencies.forEach(depTitle => {
        const depId = taskTitleToId.get(depTitle);
        if (depId) {
          dependencies.push({
            task_id: taskId,
            depends_on_task_id: depId,
          });
        }
      });
    }
  });

  if (dependencies.length > 0) {
    const { error } = await supabase
      .from("task_dependencies")
      .insert(dependencies);

    if (error) {
      console.error("Failed to create dependencies:", error);
    }
  }

  return dependencies;
}

/**
 * Log AI action for audit trail
 */
async function logAIAction(log: {
  user_id: string;
  event_id: string;
  agent: string;
  model: string;
  input: Record<string, any>;
  output: Record<string, any>;
  latency_ms: number;
  cost_usd: number;
  success: boolean;
}) {
  const { error } = await supabase.from("ai_actions").insert({
    user_id: log.user_id,
    event_id: log.event_id,
    agent: log.agent,
    model: log.model,
    input: log.input,
    output: log.output,
    latency_ms: log.latency_ms,
    cost_usd: log.cost_usd,
    success: log.success,
    timestamp: new Date().toISOString(),
  });

  if (error) {
    console.error("Failed to log AI action:", error);
  }
}

/**
 * Estimate AI cost (rough calculation)
 */
function estimateCost(response: TaskGenerationResponse): number {
  // Gemini Pro pricing (approximate):
  // Input: $0.00025 / 1K tokens
  // Output: $0.0005 / 1K tokens
  
  // Rough estimate: 2K input tokens + 6K output tokens
  const inputTokens = 2000;
  const outputTokens = response.tasks.length * 50; // ~50 tokens per task
  
  const inputCost = (inputTokens / 1000) * 0.00025;
  const outputCost = (outputTokens / 1000) * 0.0005;
  
  return inputCost + outputCost;
}
