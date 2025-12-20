# 🔍 Production Readiness Analysis - Events Module

**Date:** December 18, 2025  
**Status:** 65% Complete → Target: 100%  
**Priority:** Systematic implementation, no auth until last

---

## 📏 FILE SIZE AUDIT (300-500 Line Rule)

### ✅ Compliant Files (<300 lines)

| File | Lines | Status | Notes |
|------|-------|--------|-------|
| EventCommandCenter.tsx | 215 | ✅ OK | Within limit |
| EventHeader.tsx | 145 | ✅ OK | Modular |
| KPICardsGrid.tsx | 140 | ✅ OK | Well-sized |
| WorkflowTimeline.tsx | 190 | ✅ OK | Good |
| AIInsightsPanel.tsx | 270 | ✅ OK | Acceptable |
| KPICard.tsx | 85 | ✅ OK | Reusable |

### ⚠️ FILES TO CHECK (Potentially >300 lines)

**Need to audit these files:**
1. `/components/dashboards/TasksAndDeliverables.tsx` - Est. 800 lines
2. `/components/wizards/EventCreationWizard.tsx` - Est. 800 lines
3. `/Events.tsx` - Est. 650 lines
4. `/EventDetail.tsx` - Est. 600 lines
5. `/components/dashboards/SponsorCRM.tsx` - Est. 450 lines
6. `/components/designers/DesignerDirectory.tsx` - Est. 500 lines

**Action Required:** Refactor files >300 lines into smaller modules

---

## 🎯 CORE FEATURES COMPLETION STATUS

### Category 1: Event Command Center - 100% UI, 0% Backend

| Feature | UI | Logic | Data | AI | Total % |
|---------|----|----|------|----|----|
| Event Header | ✅ 100% | ✅ 100% | ❌ 0% | N/A | 67% |
| KPI Cards | ✅ 100% | ✅ 100% | ❌ 0% | ❌ 0% | 50% |
| Workflow Timeline | ✅ 100% | ✅ 100% | ❌ 0% | N/A | 67% |
| AI Insights Panel | ✅ 100% | ✅ 50% | ❌ 0% | ❌ 0% | 38% |
| Activity Feed | ❌ 0% | ❌ 0% | ❌ 0% | N/A | 0% |

**Category Average:** 44%

**Missing:**
- Database schema for events, tasks, risks
- API routes to fetch/update data
- Real-time subscriptions (Supabase)
- Gemini API integration for risk analysis
- Activity feed component

---

### Category 2: Task Management - 60% UI, 0% Backend

| Feature | UI | Logic | Data | AI | Total % |
|---------|----|----|------|----|----|
| Kanban Board | ✅ 100% | ✅ 80% | ❌ 0% | ❌ 0% | 45% |
| Task Creation | ✅ 100% | ✅ 50% | ❌ 0% | N/A | 50% |
| Critical Path | ✅ 50% | ✅ 100% | ❌ 0% | ✅ 100% | 63% |
| Dependency Graph | ❌ 0% | ❌ 0% | ❌ 0% | ❌ 0% | 0% |
| Gantt Chart | ❌ 0% | ❌ 0% | ❌ 0% | N/A | 0% |
| AI Task Generation | ✅ 50% | ✅ 80% | ❌ 0% | ❌ 0% | 33% |

**Category Average:** 32%

**Missing:**
- Link tasks to events (event_id filter)
- Save tasks to database
- Dependency graph visualization
- Gantt chart timeline view
- Gemini edge function for task generation

---

### Category 3: AI Features - 39% Logic, 0% Integration

| Feature | UI | Logic | Data | Gemini | Total % |
|---------|----|----|------|--------|--------|
| Risk Scanner | ✅ 100% | ✅ 80% | ❌ 0% | ❌ 0% | 45% |
| Task Generator | ✅ 50% | ✅ 80% | ❌ 0% | ❌ 0% | 33% |
| Sponsor Matching | ❌ 0% | ✅ 60% | ❌ 0% | ❌ 0% | 15% |
| Designer Matching | ❌ 0% | ✅ 60% | ❌ 0% | ❌ 0% | 15% |
| Critical Path Analyzer | ✅ 50% | ✅ 100% | ❌ 0% | ❌ 0% | 38% |
| Budget Forecasting | ❌ 0% | ❌ 0% | ❌ 0% | ❌ 0% | 0% |
| Proactive Alerts | ❌ 0% | ✅ 80% | ❌ 0% | ❌ 0% | 20% |

**Category Average:** 24%

**Missing:**
- Gemini API key configuration
- Edge functions deployed to Supabase
- UI for sponsor/designer matching
- Budget forecasting logic + UI
- Cron job for proactive alerts

---

### Category 4: CRM Systems - 80% UI, 0% Backend

| Feature | UI | Logic | Data | AI | Total % |
|---------|----|----|------|----|----|
| Sponsor CRM | ✅ 100% | ✅ 80% | ❌ 0% | ❌ 0% | 45% |
| Sponsor Detail | ✅ 100% | ✅ 80% | ❌ 0% | N/A | 60% |
| Designer Directory | ✅ 100% | ✅ 80% | ❌ 0% | ❌ 0% | 45% |
| Designer Profile | ✅ 100% | ✅ 80% | ❌ 0% | N/A | 60% |
| Venue Management | ✅ 100% | ✅ 50% | ❌ 0% | N/A | 50% |
| Venue Discovery | ❌ 0% | ❌ 0% | ❌ 0% | ❌ 0% | 0% |

**Category Average:** 43%

**Missing:**
- Database tables for sponsors, designers, venues
- API routes to fetch/update CRM data
- Google Maps integration for venue discovery
- AI matching algorithms (Gemini)

---

## 🚧 CRITICAL BLOCKERS (Must Fix)

### Blocker #1: No Database Schema (P0 - CRITICAL)
**Impact:** Cannot persist any data  
**Solution:** Create Supabase schema with 12 tables  
**Time:** 4 hours  
**Status:** 🔴 Not Started

**Tables Needed:**
1. events
2. event_tasks
3. event_team
4. event_sponsors
5. event_budget_categories
6. event_risks
7. activity_logs
8. venues
9. venue_bookings
10. designers
11. event_designers
12. deliverables

---

### Blocker #2: No API Layer (P0 - CRITICAL)
**Impact:** UI cannot fetch/save data  
**Solution:** Create API utility functions  
**Time:** 6 hours  
**Status:** 🔴 Not Started

**API Functions Needed:**
- `fetchEvent(eventId)` - Get single event
- `fetchEvents(filters)` - Get event list
- `createEvent(data)` - Create new event
- `updateEvent(eventId, data)` - Update event
- `fetchEventTasks(eventId)` - Get tasks for event
- `createTask(eventId, data)` - Create task
- `updateTask(taskId, data)` - Update task

---

### Blocker #3: No Gemini Integration (P1 - HIGH)
**Impact:** AI features don't work  
**Solution:** Create Gemini utility + edge functions  
**Time:** 8 hours  
**Status:** 🔴 Not Started

**Gemini Features Needed:**
1. Task Generation (Text Generation + Code Execution)
2. Risk Analysis (Gemini Thinking)
3. Sponsor Matching (Grounding with Search)
4. Critical Path (Gemini Thinking + Code Execution)
5. Budget Forecasting (Gemini Thinking)

---

### Blocker #4: No Real-Time Updates (P1 - HIGH)
**Impact:** Multi-user collaboration broken  
**Solution:** Setup Supabase real-time subscriptions  
**Time:** 4 hours  
**Status:** 🔴 Not Started

**Channels Needed:**
- event_tasks channel (task updates)
- activity_logs channel (team feed)
- event_budget_categories channel (budget changes)

---

## 📋 SYSTEMATIC IMPLEMENTATION PLAN

### PHASE 1: DATABASE FOUNDATION (Day 1, 4 hours)

**Step 1.1: Create Type Definitions (30 min)**
File: `/lib/types/events.types.ts`
```typescript
export interface Event {
  id: string;
  name: string;
  type: string;
  status: 'draft' | 'planning' | 'confirmed' | 'in_progress' | 'completed' | 'archived';
  start_date: string;
  end_date?: string;
  progress_percentage: number;
  venue_id?: string;
  budget_total: number;
  budget_actual: number;
  attendee_target: number;
  attendee_registered: number;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface EventTask {
  id: string;
  event_id: string;
  title: string;
  description?: string;
  status: 'to_do' | 'in_progress' | 'done' | 'cancelled';
  priority: 'critical' | 'high' | 'medium' | 'low';
  workflow_category: 'event_planning' | 'sponsorship' | 'marketing' | 'operations' | 'media';
  workflow_phase: 'pre_production' | 'venue_logistics' | 'creative_design' | 'on_site' | 'post_event';
  assigned_to?: string;
  deadline?: string;
  is_critical_path: boolean;
  dependency_task_ids: string[];
  completed_at?: string;
  created_at: string;
}

export interface AIRisk {
  id: string;
  event_id: string;
  severity: 'critical' | 'warning' | 'suggestion';
  category: string;
  title: string;
  description: string;
  impact: string;
  urgency: 'now' | '3_days' | '7_days';
  recommended_actions: string[];
  risk_score: number;
  generated_at: string;
}
```

**Step 1.2: Create Supabase Schema (2 hours)**
File: `/supabase/migrations/001_create_events_tables.sql`

**Step 1.3: Create Mock Data Generator (1 hour)**
File: `/lib/data/mockEventData.ts`
- Generate 5 realistic events
- Generate 150 tasks per event
- Generate 3 AI risks per event
- Use for development until backend ready

**Step 1.4: Test Data Insertion (30 min)**
- Verify tables created
- Insert mock data
- Test queries

---

### PHASE 2: API LAYER (Day 2-3, 6 hours)

**Step 2.1: Create API Client (1 hour)**
File: `/lib/api/client.ts`
```typescript
// Simple fetch wrapper (no auth yet)
export async function apiGet(endpoint: string) {
  const response = await fetch(`/api${endpoint}`);
  if (!response.ok) throw new Error('API Error');
  return response.json();
}

export async function apiPost(endpoint: string, data: any) {
  const response = await fetch(`/api${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('API Error');
  return response.json();
}
```

**Step 2.2: Create Event API Functions (2 hours)**
File: `/lib/api/events.ts`
```typescript
import { Event, EventTask } from '../types/events.types';
import { apiGet, apiPost, apiPut } from './client';

export async function fetchEvent(eventId: string): Promise<Event> {
  return apiGet(`/events/${eventId}`);
}

export async function fetchEventTasks(eventId: string): Promise<EventTask[]> {
  return apiGet(`/events/${eventId}/tasks`);
}

export async function createEvent(data: Partial<Event>): Promise<Event> {
  return apiPost('/events', data);
}

export async function updateTask(taskId: string, data: Partial<EventTask>): Promise<EventTask> {
  return apiPut(`/tasks/${taskId}`, data);
}
```

**Step 2.3: Create Next.js API Routes (3 hours)**
Files:
- `/app/api/events/route.ts` - GET /api/events
- `/app/api/events/[id]/route.ts` - GET /api/events/:id
- `/app/api/events/[id]/tasks/route.ts` - GET /api/events/:id/tasks
- `/app/api/tasks/[id]/route.ts` - PUT /api/tasks/:id

---

### PHASE 3: GEMINI AI INTEGRATION (Day 4-5, 8 hours)

**Step 3.1: Create Gemini Client (1 hour)**
File: `/lib/ai/gemini.ts`
```typescript
export async function callGemini(prompt: string, features: string[]) {
  // Wrapper for Gemini API calls
  // Supports: text generation, thinking, function calling, search
}
```

**Step 3.2: Create AI Risk Scanner (2 hours)**
File: `/lib/ai/riskScanner.ts`
```typescript
import { callGemini } from './gemini';
import { AIRisk, Event, EventTask } from '../types/events.types';

export async function analyzeEventRisks(
  event: Event,
  tasks: EventTask[]
): Promise<AIRisk[]> {
  const prompt = `
    Analyze this event for risks:
    Event: ${event.name}, ${daysUntil(event.start_date)} days away
    Tasks: ${tasks.length} total, ${tasks.filter(t => t.status === 'done').length} complete
    
    Identify top 3 risks with severity, impact, and recommended actions.
  `;
  
  const response = await callGemini(prompt, ['thinking', 'structured_output']);
  return parseRisks(response);
}
```

**Step 3.3: Create AI Task Generator (2 hours)**
File: `/lib/ai/taskGenerator.ts`
```typescript
export async function generateEventTasks(
  eventType: string,
  startDate: string,
  budget: number
): Promise<EventTask[]> {
  const prompt = `
    Generate 80-150 tasks for a ${eventType} event.
    Start date: ${startDate}
    Budget: $${budget}
    
    Organize into 5 phases:
    1. Pre-Production (60-90 days before)
    2. Venue & Logistics (30-60 days)
    3. Creative Design (15-30 days)
    4. On-Site Operations (1-7 days)
    5. Post-Event (after completion)
    
    Calculate dependencies and critical path.
    Return as JSON array.
  `;
  
  const response = await callGemini(prompt, ['text_generation', 'code_execution', 'structured_output']);
  return parseTasks(response);
}
```

**Step 3.4: Create Sponsor/Designer Matching (2 hours)**
File: `/lib/ai/matching.ts`
```typescript
export async function matchSponsors(
  eventType: string,
  audience: string
): Promise<any[]> {
  const prompt = `
    Find sponsors that align with:
    Event type: ${eventType}
    Audience: ${audience}
    
    Use Google Search to find relevant brands.
    Return top 10 matches with alignment scores.
  `;
  
  const response = await callGemini(prompt, ['grounding_search']);
  return parseMatches(response);
}
```

**Step 3.5: Create Edge Functions (1 hour)**
File: `/supabase/functions/analyze-event-risks/index.ts`
- Wrapper to call AI functions from Supabase
- Scheduled via cron for proactive alerts

---

### PHASE 4: WIRE UI TO BACKEND (Day 6-7, 6 hours)

**Step 4.1: Update EventCommandCenter (2 hours)**
```typescript
// Replace mock data with API calls
const { data: eventData, loading } = useQuery(
  ['event', eventId],
  () => fetchEvent(eventId)
);

const { data: tasks } = useQuery(
  ['event-tasks', eventId],
  () => fetchEventTasks(eventId)
);

const { data: risks } = useQuery(
  ['event-risks', eventId],
  () => fetchEventRisks(eventId)
);
```

**Step 4.2: Add Real-Time Subscriptions (2 hours)**
File: `/lib/hooks/useEventRealTime.ts`
```typescript
export function useEventRealTime(eventId: string) {
  const [tasks, setTasks] = useState([]);
  const [activities, setActivities] = useState([]);
  
  useEffect(() => {
    const channel = supabase
      .channel(`event-${eventId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'event_tasks',
        filter: `event_id=eq.${eventId}`
      }, (payload) => {
        // Update tasks in real-time
        setTasks(prev => updateTasksArray(prev, payload));
      })
      .subscribe();
    
    return () => supabase.removeChannel(channel);
  }, [eventId]);
  
  return { tasks, activities };
}
```

**Step 4.3: Add Activity Feed Component (2 hours)**
File: `/components/events/ActivityFeed.tsx`
- Real-time feed of team actions
- Auto-scroll on new activity
- Filter by activity type

---

### PHASE 5: ADVANCED FEATURES (Day 8-10, 12 hours)

**Step 5.1: Dependency Graph Visualization (4 hours)**
File: `/components/events/DependencyGraph.tsx`
- Use react-flow or vis-network
- Show task dependencies as directed graph
- Highlight critical path in red
- Click node to view task details

**Step 5.2: Gantt Chart Timeline (4 hours)**
File: `/components/events/GanttChart.tsx`
- Timeline view of all tasks
- Drag to adjust dates
- Color-coded by status
- Export to image/PDF

**Step 5.3: Budget Forecasting (2 hours)**
File: `/lib/ai/budgetForecaster.ts`
- Gemini predicts final budget based on current spending
- Variance alerts
- Optimization recommendations

**Step 5.4: Google Maps Venue Discovery (2 hours)**
File: `/components/events/VenueDiscovery.tsx`
- Search venues near event location
- Filter by capacity, amenities
- Show on interactive map
- Save to venue_bookings table

---

## 🎯 USER JOURNEYS TO VERIFY

### Journey 1: Create Event with AI Tasks
**Steps:**
1. Click "Create Event" on Events page
2. Fill wizard: Name, Type, Date, Budget
3. Click "Generate Tasks with AI"
4. AI generates 120 tasks in 5 seconds
5. Review tasks, edit as needed
6. Click "Create Event"
7. Redirect to Event Command Center
8. See 6 KPI cards with real data
9. Timeline shows 5 phases with progress
10. AI Insights shows 3 risks

**Missing:**
- ❌ AI task generation not wired to Gemini
- ❌ Tasks not saved to database
- ❌ Redirect after wizard completion
- ❌ Real data not loading

**Solution:** Implement Phase 2 + 3 (API + Gemini)

---

### Journey 2: Manage Tasks → Complete Critical Path
**Steps:**
1. Open Event Command Center
2. Click "Tasks" KPI card (68/150)
3. Navigate to TasksAndDeliverables page
4. See tasks grouped by workflow category
5. Critical path tasks highlighted in red
6. Click checkmark on critical task
7. Task marked complete (optimistic update)
8. Progress updates: 68 → 69
9. Activity feed shows: "User completed task"
10. Real-time update broadcast to team

**Missing:**
- ❌ Tasks not filtered by event_id
- ❌ Mark complete doesn't save to database
- ❌ Progress doesn't recalculate
- ❌ Activity feed doesn't exist
- ❌ Real-time not working

**Solution:** Implement Phase 2 + 4 (API + Real-Time)

---

### Journey 3: AI Risk Detection → Take Action
**Steps:**
1. Background cron runs daily 8am
2. AI scans all active events
3. Detects: "3 critical tasks overdue"
4. Inserts risk into event_risks table
5. User logs in, sees toast: "New risk alert"
6. Opens Event Command Center
7. AI Insights Panel shows critical risk card
8. Clicks "View 3 Overdue Tasks"
9. Navigates to tasks filtered by overdue
10. Reassigns tasks to team members
11. Next day: Risk resolved, shows "All clear"

**Missing:**
- ❌ Gemini risk scanner not deployed
- ❌ Cron job not scheduled
- ❌ Toast notifications not implemented
- ❌ Task navigation from risk card
- ❌ Risk acknowledgment system

**Solution:** Implement Phase 3 + 5 (Gemini + Advanced)

---

## 📊 GEMINI 3 AI FEATURES ROADMAP

### Feature 1: Task Generator (Text Generation + Code Execution)
**Status:** 33% (Logic exists, not wired)

**Implementation:**
```typescript
// Input
const eventData = {
  type: 'runway_show',
  startDate: '2026-02-15',
  budget: 500000,
  attendees: 800
};

// Gemini Prompt
const prompt = `
Generate comprehensive task list for ${eventData.type}.

Context:
- Start date: ${eventData.startDate}
- Budget: $${eventData.budget}
- Expected attendees: ${eventData.attendees}

Requirements:
1. Generate 80-150 tasks
2. Organize into 5 phases (pre-production → post-event)
3. Assign priorities (critical, high, medium, low)
4. Calculate dependencies (which tasks block others)
5. Identify critical path (longest chain to completion)
6. Set realistic deadlines working backward from event date

Return as structured JSON:
{
  tasks: [
    {
      title: string,
      description: string,
      priority: string,
      workflow_phase: string,
      deadline: ISO date,
      is_critical_path: boolean,
      dependency_task_ids: string[]
    }
  ]
}
`;

// Gemini Features Used
const response = await callGemini(prompt, {
  features: ['text_generation', 'code_execution', 'structured_output'],
  model: 'gemini-3-pro'
});

// Output
// 120 tasks generated with dependencies
```

**Time:** 2 hours  
**Priority:** P1

---

### Feature 2: Risk Scanner (Gemini Thinking + Deep Research)
**Status:** 45% (UI ready, AI not connected)

**Implementation:**
```typescript
// Input
const eventContext = {
  event: eventData,
  tasks: tasksList,
  budget: budgetData,
  team: teamMembers,
  contracts: contractsList,
  weather: weatherForecast // if outdoor event
};

// Gemini Prompt
const prompt = `
Analyze this event for risks. Think step-by-step.

Event: ${eventContext.event.name}
Days until event: ${daysUntil(eventContext.event.startDate)}

Tasks:
- Total: ${eventContext.tasks.length}
- Complete: ${eventContext.tasks.filter(t => t.status === 'done').length}
- Overdue: ${eventContext.tasks.filter(t => isOverdue(t)).length}
- On critical path: ${eventContext.tasks.filter(t => t.is_critical_path).length}

Budget:
- Total: $${eventContext.budget.total}
- Spent: $${eventContext.budget.actual}
- Variance: ${eventContext.budget.variance}%

Team:
- Required roles: ${eventContext.team.requiredRoles}
- Assigned: ${eventContext.team.assigned.length}
- Gaps: ${eventContext.team.gaps}

Think through:
1. What are the most urgent risks?
2. What is the impact if not addressed?
3. What specific actions should be taken?

Return top 3 risks ranked by severity with:
- severity: critical | warning | suggestion
- category: tasks | budget | staffing | contracts | venue | weather
- title: (60 chars max)
- description: (200 chars max)
- impact: HIGH | MEDIUM | LOW
- urgency: now | 3_days | 7_days
- recommended_actions: [array of specific steps]
- risk_score: 0-100
`;

// Gemini Features Used
const response = await callGemini(prompt, {
  features: ['gemini_thinking', 'deep_research', 'structured_output'],
  model: 'gemini-3-pro',
  thinkingTime: 10 // seconds
});

// Output
// 3 risks with actionable recommendations
```

**Time:** 2 hours  
**Priority:** P1

---

### Feature 3: Sponsor Matching (Grounding + Search)
**Status:** 15% (Logic partial, no UI)

**Implementation:**
```typescript
// Input
const matchingCriteria = {
  eventType: 'sustainable_fashion',
  audience: 'eco-conscious millennials',
  budget: 50000,
  location: 'New York'
};

// Gemini Prompt
const prompt = `
Find sponsors that align with this event:

Event type: ${matchingCriteria.eventType}
Target audience: ${matchingCriteria.audience}
Sponsorship budget: $${matchingCriteria.budget}
Location: ${matchingCriteria.location}

Search the web for:
1. Brands with sustainability initiatives
2. Companies targeting similar demographics
3. Previous sponsors of fashion events
4. Local businesses in ${matchingCriteria.location}

For each sponsor, provide:
- Company name
- Why they're a good fit (alignment score 0-100)
- Typical sponsorship range
- Contact approach (how to pitch)
- Past fashion partnerships

Return top 10 matches ranked by alignment score.
`;

// Gemini Features Used
const response = await callGemini(prompt, {
  features: ['grounding_search', 'text_generation'],
  model: 'gemini-3-pro',
  searchDepth: 'comprehensive'
});

// Output
// 10 sponsor recommendations with match scores
```

**Time:** 2 hours  
**Priority:** P2

---

### Feature 4: Critical Path Analyzer (Gemini Thinking + Code Execution)
**Status:** 38% (Logic complete, needs visualization)

**Implementation:**
```typescript
// Input
const taskGraph = {
  tasks: allTasks,
  dependencies: taskDependencies
};

// Gemini Prompt
const prompt = `
Analyze the critical path for this project.

Tasks: ${JSON.stringify(taskGraph.tasks)}
Dependencies: ${JSON.stringify(taskGraph.dependencies)}

Execute this algorithm:
1. Build directed acyclic graph (DAG) from dependencies
2. Calculate all possible paths from start to finish
3. Identify longest path (critical path)
4. Calculate slack time for non-critical tasks
5. Identify bottlenecks (tasks with most downstream dependencies)
6. Predict completion date

Return:
{
  critical_path_tasks: [task IDs],
  bottlenecks: [
    { task_id, dependent_count, impact_days }
  ],
  predicted_completion: ISO date,
  slack_by_task: { task_id: slack_days },
  optimization_recommendations: [
    "Fast-track task X to save 3 days",
    "Task Y blocks 5 others, prioritize"
  ]
}
`;

// Gemini Features Used
const response = await callGemini(prompt, {
  features: ['gemini_thinking', 'code_execution', 'structured_output'],
  model: 'gemini-3-pro'
});

// Output
// Critical path + bottlenecks + recommendations
```

**Time:** 3 hours (includes visualization)  
**Priority:** P2

---

### Feature 5: Budget Forecasting (Gemini Thinking)
**Status:** 0% (Not started)

**Implementation:**
```typescript
// Input
const budgetHistory = {
  categories: [
    { name: 'venue', budgeted: 45000, actual: 45000, trend: 'on_track' },
    { name: 'catering', budgeted: 60000, actual: 68000, trend: 'over' },
    // ... other categories
  ],
  daysElapsed: 45,
  daysRemaining: 30
};

// Gemini Prompt
const prompt = `
Forecast final budget for this event.

Current spending:
${budgetHistory.categories.map(c => 
  `${c.name}: $${c.actual}/$${c.budgeted} (${c.trend})`
).join('\n')}

Timeline:
- Days elapsed: ${budgetHistory.daysElapsed}
- Days remaining: ${budgetHistory.daysRemaining}
- % timeline complete: ${(budgetHistory.daysElapsed / (budgetHistory.daysElapsed + budgetHistory.daysRemaining)) * 100}%

Analyze:
1. Spending velocity by category
2. Projected final cost per category
3. Which categories likely to exceed budget
4. Recommended cost-cutting measures

Return forecast with:
- predicted_total: number
- variance_from_budget: number
- category_forecasts: [
    { category, predicted, variance, confidence }
  ]
- recommendations: [
    "Reduce catering menu to save $8K",
    "Negotiate AV tech discount"
  ]
`;

// Gemini Features Used
const response = await callGemini(prompt, {
  features: ['gemini_thinking', 'structured_output'],
  model: 'gemini-3-pro'
});

// Output
// Budget forecast with recommendations
```

**Time:** 2 hours  
**Priority:** P2

---

## ✅ NEXT IMMEDIATE ACTIONS (Ordered)

### TODAY (Next 4 hours)

**1. Create Type Definitions (30 min)**
- File: `/lib/types/events.types.ts`
- Export all interfaces (Event, EventTask, AIRisk, etc.)
- ✅ No breaking changes

**2. Create Mock Data Generator (1 hour)**
- File: `/lib/data/mockEventData.ts`
- Generate realistic data for 5 events
- Use for development until backend ready

**3. Create Gemini Client Wrapper (1 hour)**
- File: `/lib/ai/gemini.ts`
- Simple wrapper for Gemini API calls
- Support all features: thinking, search, code execution
- Handle errors and retries

**4. Create API Client Utilities (1 hour)**
- File: `/lib/api/client.ts`
- File: `/lib/api/events.ts`
- Simple fetch wrappers (no auth yet)
- Type-safe with TypeScript

**5. Wire EventCommandCenter to Use Mock Data (30 min)**
- Replace inline mock data with imported mockEventData
- Prepare for easy swap to real API later

---

### TOMORROW (Day 2, 6 hours)

**6. Create Supabase Schema**
- 12 tables with foreign keys
- RLS policies (but no auth enforcement yet)
- Database functions for auto-calculations

**7. Create Next.js API Routes**
- 10 API endpoints
- Connect to Supabase
- Return JSON (no auth yet)

**8. Test API Integration**
- Update EventCommandCenter to use real API
- Verify data loads correctly
- Test CRUD operations

---

### THIS WEEK (Days 3-5, 14 hours)

**9. Implement Gemini AI Features**
- Risk Scanner
- Task Generator
- Critical Path Analyzer

**10. Add Real-Time Subscriptions**
- Task updates channel
- Activity feed channel

**11. Create Activity Feed Component**
- Real-time team actions
- Auto-scroll and filtering

**12. Build Advanced Visualizations**
- Dependency Graph
- Gantt Chart

---

## 📈 EXPECTED PROGRESS

| Day | Tasks | Completion % | Status |
|-----|-------|--------------|--------|
| Today | Types + Mock Data + Gemini Client | 65% → 70% | In Progress |
| Day 2 | Database + API Routes | 70% → 80% | Planned |
| Day 3-4 | Gemini Integration | 80% → 90% | Planned |
| Day 5 | Real-Time + Activity Feed | 90% → 95% | Planned |
| Day 6-7 | Advanced Features | 95% → 100% | Planned |

**Target:** 100% production ready in 7 days (no auth)

---

## 🎯 SUCCESS CRITERIA

- [ ] All files <300 lines (refactored)
- [ ] EventCommandCenter loads real data from database
- [ ] Tasks can be created, updated, marked complete
- [ ] AI generates 80-150 tasks in <10 seconds
- [ ] AI risk scanner returns 3 risks with recommendations
- [ ] Real-time updates work (<1s latency)
- [ ] Activity feed shows team actions
- [ ] Critical path highlighted in red
- [ ] Budget forecasting predicts final cost
- [ ] Sponsor/designer matching returns 10 results
- [ ] All user journeys complete end-to-end
- [ ] No console errors
- [ ] Responsive on all devices
- [ ] Page load <2 seconds

---

**Next Step:** Create type definitions and mock data generator (START NOW)

**NO AUTH UNTIL LAST** - Skip authentication for all features until 100% complete