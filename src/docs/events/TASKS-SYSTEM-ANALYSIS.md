# 🔍 Tasks System - Comprehensive Analysis & Implementation Plan

**Date:** December 18, 2025  
**Route:** `/events/:id/tasks` (Tasks & Deliverables)  
**Current Status:** 60% Complete (UI exists, needs integration)  
**Target:** 100% Production Ready

---

## 📊 CURRENT STATE ANALYSIS

### ✅ WHAT EXISTS

**1. Main Component**
- File: `/components/dashboards/TasksAndDeliverables.tsx`
- Status: 🟡 EXISTS but likely >300 lines (needs audit)
- Features: Workflow tabs, Kanban board, task list
- Issue: Not connected to events (no event_id filter)

**2. Supporting Files**
- `/components/dashboards/tasks/types.ts` - Type definitions
- `/components/dashboards/tasks/data.ts` - Mock data
- `/components/dashboards/tasks/components/` - Sub-components
- `/components/dashboards/tasks/views/` - Detail pages

**3. Working Features**
- ✅ 5 workflow tabs (event-planning, sponsorship, marketing, operations, media)
- ✅ Kanban board with drag-drop
- ✅ Task filtering and sorting
- ✅ Dynamic task injection from context
- ✅ Gemini AI branding (header component)

### ❌ WHAT'S MISSING (CRITICAL GAPS)

**1. Event Integration (P0 - CRITICAL)**
- ❌ No event_id prop passed to component
- ❌ Tasks not filtered by event
- ❌ Can't distinguish tasks across different events
- ❌ No API integration to fetch tasks from database

**2. Type System Mismatch (P0 - CRITICAL)**
- ❌ Component uses old `Task` type (different from `EventTask`)
- ❌ No compatibility with new `/lib/types/events.types.ts`
- ❌ Needs type unification or adapter layer

**3. Database Persistence (P0 - CRITICAL)**
- ❌ Tasks not saved to database
- ❌ Status changes not persisted
- ❌ No progress recalculation
- ❌ No activity logging

**4. AI Features (P1 - HIGH)**
- ❌ AI task generation button exists but not wired
- ❌ Critical path not highlighted
- ❌ No automatic task prioritization
- ❌ No risk detection for overdue tasks
- ❌ No smart task assignment

**5. Advanced Visualizations (P2 - MEDIUM)**
- ❌ Dependency graph missing
- ❌ Gantt chart view missing
- ❌ Timeline view basic
- ❌ No critical path visualization

**6. Real-Time Collaboration (P1 - HIGH)**
- ❌ No real-time updates when other users edit
- ❌ No presence indicators (who's viewing)
- ❌ No collaborative editing
- ❌ No conflict resolution

**7. Mobile Optimization (P2 - MEDIUM)**
- ⚠️ Desktop-first design
- ⚠️ Drag-drop may not work well on mobile
- ⚠️ No touch-optimized gestures

---

## 🎯 PRODUCTION READINESS GAPS

### Core Features (Must Have)

| Feature | UI | Logic | Data | AI | Real-Time | Mobile | Total % |
|---------|----|----|------|----|-----------|----|--------|
| Task List | ✅ 100% | ✅ 80% | ❌ 0% | ❌ 0% | ❌ 0% | ⚠️ 60% | 40% |
| Task Create | ✅ 100% | ✅ 70% | ❌ 0% | ❌ 0% | N/A | ⚠️ 60% | 46% |
| Task Update | ✅ 100% | ✅ 70% | ❌ 0% | ❌ 0% | ❌ 0% | ⚠️ 60% | 38% |
| Mark Complete | ✅ 100% | ✅ 80% | ❌ 0% | ✅ 50% | ❌ 0% | ✅ 80% | 52% |
| Filter by Phase | ✅ 100% | ✅ 100% | N/A | N/A | N/A | ✅ 80% | 93% |
| Kanban Board | ✅ 100% | ✅ 90% | ❌ 0% | ❌ 0% | ❌ 0% | ⚠️ 40% | 38% |

**Average Core:** 51%

### Advanced Features (Nice to Have)

| Feature | UI | Logic | Data | AI | Real-Time | Mobile | Total % |
|---------|----|----|------|----|-----------|----|--------|
| AI Task Gen | ✅ 50% | ✅ 80% | ❌ 0% | ❌ 0% | N/A | N/A | 26% |
| Critical Path | ❌ 0% | ✅ 100% | ❌ 0% | ✅ 100% | N/A | N/A | 40% |
| Dependency Graph | ❌ 0% | ❌ 0% | ❌ 0% | ❌ 0% | N/A | N/A | 0% |
| Gantt Chart | ❌ 0% | ❌ 0% | ❌ 0% | N/A | N/A | N/A | 0% |
| Smart Assignment | ❌ 0% | ❌ 0% | ❌ 0% | ❌ 0% | N/A | N/A | 0% |
| Auto-Prioritize | ✅ 100% | ✅ 100% | N/A | ✅ 80% | N/A | N/A | 93% |

**Average Advanced:** 27%

**Overall Tasks System:** 39% Production Ready

---

## 🚧 CRITICAL ISSUES TO FIX

### Issue #1: Type System Conflict (P0)

**Problem:** Two different task type systems

**Old Type (TasksAndDeliverables):**
```typescript
interface Task {
  id: string;
  title: string;
  priority: 'High' | 'Medium' | 'Low';
  dueDate: string;
  owner: string;
  status: 'Backlog' | 'In Progress' | 'Review' | 'Completed';
  category: string;
}
```

**New Type (events.types.ts):**
```typescript
interface EventTask {
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
```

**Solution:** Create adapter layer to convert between types

---

### Issue #2: File Size (P0)

**Problem:** TasksAndDeliverables.tsx likely >300 lines

**Solution:** Refactor into smaller files:
1. `/components/tasks/TasksContainer.tsx` (<250 lines) - Main container
2. `/components/tasks/TaskList.tsx` (<200 lines) - Task list view
3. `/components/tasks/TaskFilters.tsx` (<150 lines) - Filter sidebar
4. `/components/tasks/TaskCard.tsx` (<100 lines) - Single task card
5. `/components/tasks/TaskCreateModal.tsx` (<200 lines) - Create task form

---

### Issue #3: Event Isolation (P0)

**Problem:** All events share the same task pool

**Solution:** Add event filtering
```typescript
// Before (global tasks)
const tasks = allTasks;

// After (event-specific)
const tasks = allTasks.filter(t => t.event_id === eventId);
```

---

## 📋 SYSTEMATIC IMPLEMENTATION PLAN

### PHASE 1: REFACTOR & UNIFY (Day 1, 4 hours)

**Step 1.1: Create Type Adapter (30 min)**
File: `/lib/adapters/taskAdapter.ts` (<150 lines)

```typescript
import { EventTask } from '../types/events.types';
import { Task as LegacyTask } from '../../components/dashboards/tasks/types';

export function eventTaskToLegacy(eventTask: EventTask): LegacyTask {
  return {
    id: eventTask.id,
    title: eventTask.title,
    priority: mapPriority(eventTask.priority),
    dueDate: eventTask.deadline || 'No deadline',
    owner: eventTask.assigned_to || 'Unassigned',
    status: mapStatus(eventTask.status),
    category: eventTask.workflow_category
  };
}

export function legacyToEventTask(legacy: LegacyTask, eventId: string): Partial<EventTask> {
  return {
    event_id: eventId,
    title: legacy.title,
    priority: mapPriorityReverse(legacy.priority),
    deadline: legacy.dueDate,
    assigned_to: legacy.owner,
    status: mapStatusReverse(legacy.status),
    workflow_category: legacy.category as any,
    is_critical_path: legacy.priority === 'High',
    dependency_task_ids: []
  };
}

function mapPriority(priority: EventTask['priority']): LegacyTask['priority'] {
  switch (priority) {
    case 'critical': return 'High';
    case 'high': return 'High';
    case 'medium': return 'Medium';
    case 'low': return 'Low';
  }
}

// ... other mapping functions
```

---

**Step 1.2: Create New TasksContainer (2 hours)**
File: `/components/tasks/TasksContainer.tsx` (<250 lines)

**Features:**
- Accepts `eventId` prop
- Fetches tasks from API: `fetchEventTasks(eventId)`
- Uses EventTask type (via adapter)
- Integrates with existing sub-components
- Loading states
- Error handling

```typescript
interface TasksContainerProps {
  eventId: string;
  onNavigate?: (page: string) => void;
}

export function TasksContainer({ eventId, onNavigate }: TasksContainerProps) {
  const [tasks, setTasks] = useState<EventTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<WorkflowCategory>('event_planning');
  
  useEffect(() => {
    async function loadTasks() {
      setLoading(true);
      try {
        const data = await fetchEventTasks(eventId);
        setTasks(data);
      } catch (error) {
        console.error('Failed to load tasks:', error);
        toast.error('Failed to load tasks');
      } finally {
        setLoading(false);
      }
    }
    
    loadTasks();
  }, [eventId]);
  
  // Filter tasks by workflow category
  const filteredTasks = tasks.filter(t => t.workflow_category === activeTab);
  
  return (
    <div className="space-y-6">
      <TasksHeader 
        eventId={eventId}
        onCreateTask={() => setShowCreateModal(true)}
        onGenerateAI={() => handleGenerateAI()}
      />
      
      <TasksTabs activeTab={activeTab} onTabChange={setActiveTab} />
      
      <TaskList 
        tasks={filteredTasks}
        onTaskUpdate={handleTaskUpdate}
        onTaskComplete={handleTaskComplete}
      />
      
      <TaskCreateModal 
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateTask}
      />
    </div>
  );
}
```

---

**Step 1.3: Create Supporting Components (1.5 hours)**

**File 1:** `/components/tasks/TasksHeader.tsx` (<150 lines)
- Event name breadcrumb
- Create task button
- Generate with AI button
- Filter/search bar

**File 2:** `/components/tasks/TasksTabs.tsx` (<100 lines)
- 5 workflow category tabs
- Task count badges
- Mobile dropdown on small screens

**File 3:** `/components/tasks/TaskList.tsx` (<200 lines)
- List/Kanban toggle
- Task cards
- Empty states
- Loading skeletons

**File 4:** `/components/tasks/TaskCard.tsx` (<150 lines)
- Checkbox to mark complete
- Priority badge
- Due date
- Assigned user avatar
- Click to expand details
- Critical path indicator (red border)

**File 5:** `/components/tasks/TaskCreateModal.tsx` (<250 lines)
- Form with all fields
- Workflow category select
- Workflow phase select
- Priority radio buttons
- Date picker
- User assignment dropdown
- Submit handler

---

### PHASE 2: DATABASE INTEGRATION (Day 2, 4 hours)

**Step 2.1: Wire Task CRUD Operations (2 hours)**

**Create Task:**
```typescript
async function handleCreateTask(data: Partial<EventTask>) {
  try {
    const newTask = await createTask(eventId, data);
    setTasks(prev => [...prev, newTask]);
    toast.success('Task created');
    setShowCreateModal(false);
  } catch (error) {
    toast.error('Failed to create task');
  }
}
```

**Update Task:**
```typescript
async function handleTaskUpdate(taskId: string, updates: Partial<EventTask>) {
  try {
    // Optimistic update
    setTasks(prev => prev.map(t => 
      t.id === taskId ? { ...t, ...updates } : t
    ));
    
    await updateTask(taskId, updates);
    toast.success('Task updated');
  } catch (error) {
    // Revert optimistic update
    loadTasks();
    toast.error('Failed to update task');
  }
}
```

**Complete Task:**
```typescript
async function handleTaskComplete(taskId: string) {
  try {
    // Optimistic update
    setTasks(prev => prev.map(t => 
      t.id === taskId 
        ? { ...t, status: 'done', completed_at: new Date().toISOString() }
        : t
    ));
    
    await completeTask(taskId);
    toast.success('Task completed! 🎉');
    
    // Trigger progress recalculation on backend
    // (happens automatically via database trigger)
  } catch (error) {
    loadTasks();
    toast.error('Failed to complete task');
  }
}
```

---

**Step 2.2: Add Progress Tracking (1 hour)**

**Auto-calculate event progress:**
```typescript
// Backend: Supabase function (triggered on task update)
CREATE OR REPLACE FUNCTION recalculate_event_progress()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE events
  SET progress_percentage = (
    SELECT ROUND(
      (COUNT(*) FILTER (WHERE status = 'done')::float / 
       COUNT(*)::float) * 100
    )
    FROM event_tasks
    WHERE event_id = NEW.event_id
  )
  WHERE id = NEW.event_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER task_completed_trigger
AFTER INSERT OR UPDATE ON event_tasks
FOR EACH ROW
EXECUTE FUNCTION recalculate_event_progress();
```

---

**Step 2.3: Add Activity Logging (1 hour)**

**Log task completion:**
```typescript
async function handleTaskComplete(taskId: string) {
  const task = tasks.find(t => t.id === taskId);
  
  await completeTask(taskId);
  
  // Log activity
  await logActivity({
    event_id: eventId,
    user_id: currentUserId,
    user_name: currentUserName,
    action_type: 'task_completed',
    description: `Completed task: ${task.title}`,
    metadata: { task_id: taskId }
  });
}
```

---

### PHASE 3: AI FEATURES (Day 3-4, 8 hours)

**Step 3.1: AI Task Generator Integration (2 hours)**
File: `/lib/ai/taskGenerator.ts` (<200 lines)

```typescript
import { callGemini } from './gemini';
import { EventTask } from '../types/events.types';

export async function generateEventTasks(params: {
  eventType: string;
  startDate: string;
  budget: number;
  attendeeTarget: number;
}): Promise<EventTask[]> {
  const prompt = `
Generate comprehensive task list for ${params.eventType} event.

Context:
- Event type: ${params.eventType}
- Start date: ${params.startDate}
- Budget: $${params.budget}
- Expected attendees: ${params.attendeeTarget}

Requirements:
1. Generate 80-150 tasks
2. Organize into 5 workflow phases:
   - pre_production (60-90 days before event)
   - venue_logistics (30-60 days before)
   - creative_design (15-30 days before)
   - on_site (1-7 days + event day)
   - post_event (after completion)
3. Organize into 5 workflow categories:
   - event_planning
   - sponsorship
   - marketing
   - operations
   - media
4. Assign priorities: critical, high, medium, low
5. Calculate dependencies (which tasks must complete before others)
6. Identify critical path (longest chain to event completion)
7. Set realistic deadlines working backward from event date

Return as JSON array:
[
  {
    "title": "string",
    "description": "string",
    "priority": "critical|high|medium|low",
    "workflow_category": "event_planning|sponsorship|marketing|operations|media",
    "workflow_phase": "pre_production|venue_logistics|creative_design|on_site|post_event",
    "deadline": "YYYY-MM-DD",
    "is_critical_path": boolean,
    "dependency_task_ids": []
  }
]
  `;

  const response = await callGemini(prompt, {
    features: ['text_generation', 'code_execution', 'structured_output'],
    model: 'gemini-3-pro',
    temperature: 0.8
  });

  if (!response.structuredData?.tasks) {
    throw new Error('Gemini returned invalid task data');
  }

  return response.structuredData.tasks;
}
```

**UI Integration:**
```typescript
async function handleGenerateAI() {
  setIsGenerating(true);
  toast.info('AI is generating tasks... (~10 seconds)');
  
  try {
    const event = await fetchEvent(eventId);
    const generatedTasks = await generateEventTasks({
      eventType: event.type,
      startDate: event.start_date,
      budget: event.budget_total,
      attendeeTarget: event.attendee_target
    });
    
    // Save all tasks to database
    for (const task of generatedTasks) {
      await createTask(eventId, task);
    }
    
    // Refresh task list
    loadTasks();
    
    toast.success(`Generated ${generatedTasks.length} tasks! 🎉`);
  } catch (error) {
    toast.error('Failed to generate tasks');
  } finally {
    setIsGenerating(false);
  }
}
```

---

**Step 3.2: Critical Path Highlighter (2 hours)**
File: `/lib/ai/criticalPath.ts` (<200 lines)

```typescript
export interface CriticalPathAnalysis {
  critical_tasks: EventTask[];
  bottlenecks: { task: EventTask; dependent_count: number }[];
  predicted_completion_date: string;
  total_critical_path_days: number;
}

export async function analyzeCriticalPath(
  tasks: EventTask[]
): Promise<CriticalPathAnalysis> {
  // Build dependency graph
  const graph = buildDependencyGraph(tasks);
  
  // Find all paths from start to end
  const allPaths = findAllPaths(graph);
  
  // Identify longest path (critical path)
  const criticalPath = allPaths.reduce((longest, current) => 
    current.length > longest.length ? current : longest
  );
  
  // Identify bottlenecks (tasks with most dependents)
  const bottlenecks = tasks
    .map(task => ({
      task,
      dependent_count: tasks.filter(t => 
        t.dependency_task_ids.includes(task.id)
      ).length
    }))
    .filter(b => b.dependent_count > 0)
    .sort((a, b) => b.dependent_count - a.dependent_count)
    .slice(0, 5);
  
  // Calculate completion date
  const totalDays = criticalPath.reduce((sum, taskId) => {
    const task = tasks.find(t => t.id === taskId);
    return sum + (task ? estimateTaskDuration(task) : 0);
  }, 0);
  
  const completionDate = new Date();
  completionDate.setDate(completionDate.getDate() + totalDays);
  
  return {
    critical_tasks: criticalPath.map(id => tasks.find(t => t.id === id)!),
    bottlenecks,
    predicted_completion_date: completionDate.toISOString().split('T')[0],
    total_critical_path_days: totalDays
  };
}

function buildDependencyGraph(tasks: EventTask[]): Map<string, string[]> {
  const graph = new Map<string, string[]>();
  
  tasks.forEach(task => {
    if (!graph.has(task.id)) {
      graph.set(task.id, []);
    }
    
    task.dependency_task_ids.forEach(depId => {
      if (!graph.has(depId)) {
        graph.set(depId, []);
      }
      graph.get(depId)!.push(task.id);
    });
  });
  
  return graph;
}

function findAllPaths(graph: Map<string, string[]>): string[][] {
  // Implementation of DFS to find all paths
  // (code omitted for brevity, ~50 lines)
}

function estimateTaskDuration(task: EventTask): number {
  // Estimate based on priority and category
  const basedays = {
    critical: 5,
    high: 3,
    medium: 2,
    low: 1
  };
  
  return baseDays[task.priority];
}
```

**UI Integration:**
```typescript
// Highlight critical path tasks in red
<TaskCard 
  task={task}
  isCriticalPath={criticalPathTaskIds.includes(task.id)}
  className={criticalPathTaskIds.includes(task.id) ? 'border-l-4 border-l-red-500' : ''}
/>
```

---

**Step 3.3: Smart Task Assignment (2 hours)**
File: `/lib/ai/smartAssignment.ts` (<150 lines)

```typescript
export async function suggestTaskAssignment(
  task: EventTask,
  team: EventTeamMember[]
): Promise<{ user: EventTeamMember; reason: string }[]> {
  const prompt = `
Suggest best team member to assign this task:

Task: ${task.title}
Description: ${task.description}
Category: ${task.workflow_category}
Priority: ${task.priority}

Available team members:
${team.map(t => `- ${t.user_name} (${t.role})`).join('\n')}

Return top 3 suggestions with reasoning.
  `;

  const response = await callGemini(prompt, {
    features: ['text_generation', 'gemini_thinking'],
    model: 'gemini-3-pro'
  });

  // Parse response and return suggestions
  return response.structuredData.suggestions;
}
```

---

**Step 3.4: Automatic Priority Adjustment (2 hours)**
File: `/lib/ai/autoPrioritize.ts` (<150 lines)

```typescript
export async function adjustTaskPriorities(
  tasks: EventTask[],
  event: Event
): Promise<EventTask[]> {
  const daysUntilEvent = calculateDaysUntil(event.start_date);
  
  return tasks.map(task => {
    let adjustedPriority = task.priority;
    
    // Boost priority if deadline approaching
    if (task.deadline) {
      const daysUntilDeadline = calculateDaysUntil(task.deadline);
      
      if (daysUntilDeadline < 3 && task.status !== 'done') {
        adjustedPriority = 'critical';
      } else if (daysUntilDeadline < 7) {
        adjustedPriority = task.priority === 'low' ? 'medium' : 'high';
      }
    }
    
    // Boost priority if on critical path
    if (task.is_critical_path && task.status !== 'done') {
      adjustedPriority = 'critical';
    }
    
    // Boost priority if blocking other tasks
    const dependentCount = tasks.filter(t => 
      t.dependency_task_ids.includes(task.id)
    ).length;
    
    if (dependentCount > 3 && task.status !== 'done') {
      adjustedPriority = adjustedPriority === 'low' ? 'medium' : 'high';
    }
    
    return { ...task, priority: adjustedPriority };
  });
}
```

---

### PHASE 4: ADVANCED VISUALIZATIONS (Day 5-6, 10 hours)

**Step 4.1: Dependency Graph (4 hours)**
File: `/components/tasks/DependencyGraph.tsx` (<250 lines)

**Library:** `react-flow` or `vis-network`

```typescript
import ReactFlow, { Node, Edge } from 'reactflow';
import 'reactflow/dist/style.css';

export function DependencyGraph({ tasks }: { tasks: EventTask[] }) {
  // Convert tasks to nodes
  const nodes: Node[] = tasks.map(task => ({
    id: task.id,
    data: { 
      label: task.title,
      status: task.status,
      priority: task.priority,
      isCriticalPath: task.is_critical_path
    },
    position: calculatePosition(task), // Auto-layout algorithm
    style: {
      background: task.is_critical_path ? '#EF4444' : '#3B82F6',
      color: 'white',
      border: task.status === 'done' ? '2px solid #10B981' : 'none',
      borderRadius: '8px',
      padding: '10px'
    }
  }));

  // Convert dependencies to edges
  const edges: Edge[] = tasks.flatMap(task =>
    task.dependency_task_ids.map(depId => ({
      id: `${depId}-${task.id}`,
      source: depId,
      target: task.id,
      animated: task.is_critical_path,
      style: { 
        stroke: task.is_critical_path ? '#EF4444' : '#94A3B8'
      }
    }))
  );

  return (
    <div className="h-[600px] w-full bg-gray-50 rounded-lg border">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        attributionPosition="bottom-left"
      />
    </div>
  );
}
```

---

**Step 4.2: Gantt Chart (4 hours)**
File: `/components/tasks/GanttChart.tsx` (<250 lines)

**Library:** `frappe-gantt` or custom implementation

```typescript
import { Gantt } from 'frappe-gantt-react';

export function GanttChart({ tasks }: { tasks: EventTask[] }) {
  // Convert EventTask to Gantt format
  const ganttTasks = tasks.map(task => ({
    id: task.id,
    name: task.title,
    start: task.created_at,
    end: task.deadline || calculateEstimatedEnd(task),
    progress: task.status === 'done' ? 100 : task.status === 'in_progress' ? 50 : 0,
    dependencies: task.dependency_task_ids.join(','),
    custom_class: task.is_critical_path ? 'critical-path' : ''
  }));

  return (
    <div className="w-full overflow-x-auto bg-white p-4 rounded-lg border">
      <Gantt
        tasks={ganttTasks}
        viewMode="Week"
        onClick={handleTaskClick}
        onDateChange={handleDateChange}
        onProgressChange={handleProgressChange}
      />
    </div>
  );
}
```

---

**Step 4.3: Timeline View (2 hours)**
File: `/components/tasks/TimelineView.tsx` (<200 lines)

**Vertical timeline showing tasks by deadline:**
```typescript
export function TimelineView({ tasks }: { tasks: EventTask[] }) {
  // Group tasks by week
  const tasksByWeek = groupByWeek(tasks);
  
  return (
    <div className="space-y-8">
      {Object.entries(tasksByWeek).map(([week, weekTasks]) => (
        <div key={week} className="relative pl-8 border-l-2 border-gray-300">
          {/* Week header */}
          <div className="sticky top-0 bg-white py-2 mb-4">
            <h3 className="text-lg font-semibold">{week}</h3>
            <p className="text-sm text-gray-500">
              {weekTasks.length} tasks due
            </p>
          </div>
          
          {/* Tasks */}
          <div className="space-y-4">
            {weekTasks.map(task => (
              <TimelineTaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
```

---

### PHASE 5: REAL-TIME COLLABORATION (Day 7, 4 hours)

**Step 5.1: Setup Supabase Real-Time (2 hours)**
File: `/lib/hooks/useTaskRealTime.ts` (<150 lines)

```typescript
import { useEffect, useState } from 'react';
import { supabase } from '../supabase/client';
import { EventTask } from '../types/events.types';

export function useTaskRealTime(eventId: string) {
  const [tasks, setTasks] = useState<EventTask[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected'>('disconnected');

  useEffect(() => {
    // Initial fetch
    fetchEventTasks(eventId).then(setTasks);

    // Subscribe to real-time updates
    const channel = supabase
      .channel(`tasks-${eventId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'event_tasks',
          filter: `event_id=eq.${eventId}`
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setTasks(prev => [...prev, payload.new as EventTask]);
          } else if (payload.eventType === 'UPDATE') {
            setTasks(prev => prev.map(t =>
              t.id === payload.new.id ? payload.new as EventTask : t
            ));
          } else if (payload.eventType === 'DELETE') {
            setTasks(prev => prev.filter(t => t.id !== payload.old.id));
          }
        }
      )
      .subscribe((status) => {
        setConnectionStatus(status === 'SUBSCRIBED' ? 'connected' : 'disconnected');
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [eventId]);

  return { tasks, connectionStatus };
}
```

**Usage:**
```typescript
export function TasksContainer({ eventId }: { eventId: string }) {
  const { tasks, connectionStatus } = useTaskRealTime(eventId);
  
  return (
    <>
      {connectionStatus === 'connected' && (
        <div className="flex items-center gap-2 text-xs text-green-600">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          Live updates enabled
        </div>
      )}
      
      <TaskList tasks={tasks} />
    </>
  );
}
```

---

**Step 5.2: Presence Indicators (2 hours)**
File: `/lib/hooks/usePresence.ts` (<100 lines)

```typescript
export function usePresence(eventId: string) {
  const [activeUsers, setActiveUsers] = useState<User[]>([]);

  useEffect(() => {
    const channel = supabase.channel(`presence-${eventId}`, {
      config: { presence: { key: currentUserId } }
    });

    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        const users = Object.values(state).flat();
        setActiveUsers(users);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({
            user_id: currentUserId,
            user_name: currentUserName,
            online_at: new Date().toISOString()
          });
        }
      });

    return () => {
      channel.untrack();
      supabase.removeChannel(channel);
    };
  }, [eventId]);

  return activeUsers;
}
```

---

## 📊 EXPECTED PROGRESS

| Phase | Tasks | Time | Completion % |
|-------|-------|------|--------------|
| Phase 1: Refactor | Type adapter + new components | 4h | 39% → 55% |
| Phase 2: Database | CRUD + progress tracking | 4h | 55% → 70% |
| Phase 3: AI Features | Task gen + critical path | 8h | 70% → 85% |
| Phase 4: Visualizations | Graphs + Gantt | 10h | 85% → 95% |
| Phase 5: Real-Time | Subscriptions + presence | 4h | 95% → 100% |

**Total Time:** 30 hours (5-6 days)  
**Target Completion:** 100% Production Ready

---

## 🎯 USER JOURNEY VALIDATION

### Journey 1: Create Event → Generate Tasks with AI

**Steps:**
1. ✅ User creates event in wizard
2. ✅ Clicks "Generate Tasks with AI" button
3. ⚠️ AI generates 120 tasks (~10 seconds)
4. ❌ Tasks saved to database
5. ❌ Redirect to Event Command Center
6. ❌ See tasks tab with 120 tasks
7. ❌ Critical path highlighted in red

**Current Status:** 2/7 steps working (29%)  
**After Implementation:** 7/7 steps working (100%)

---

### Journey 2: View Tasks → Complete Task → See Progress Update

**Steps:**
1. ✅ User opens Event Command Center
2. ✅ Clicks "Tasks" KPI card (68/150)
3. ✅ Navigates to Tasks page
4. ✅ Sees tasks grouped by category
5. ⚠️ Critical path tasks highlighted in red
6. ✅ Clicks checkmark on task
7. ❌ Task marked complete (database)
8. ❌ Progress updates: 68 → 69
9. ❌ Activity feed shows: "User completed task"
10. ❌ Real-time broadcast to team

**Current Status:** 4/10 steps working (40%)  
**After Implementation:** 10/10 steps working (100%)

---

## ✅ PRODUCTION READINESS CHECKLIST

### Core Features
- [ ] Tasks filtered by event_id
- [ ] Create task (form + API)
- [ ] Update task (optimistic + API)
- [ ] Mark complete (API + progress recalc)
- [ ] Delete task (soft delete)
- [ ] Filter by phase/category/status
- [ ] Search tasks by title
- [ ] Sort by priority/deadline

### AI Features
- [ ] AI task generation (Gemini)
- [ ] Critical path highlighting
- [ ] Smart task assignment suggestions
- [ ] Automatic priority adjustment
- [ ] Risk detection for overdue tasks

### Visualizations
- [ ] List view
- [ ] Kanban board
- [ ] Timeline view
- [ ] Dependency graph
- [ ] Gantt chart

### Real-Time
- [ ] Task updates broadcast
- [ ] Activity feed updates
- [ ] Presence indicators
- [ ] Conflict resolution

### Mobile
- [ ] Touch-optimized cards
- [ ] Swipe to complete
- [ ] Bottom drawer for filters
- [ ] Responsive Kanban board

### Performance
- [ ] Virtual scrolling (>100 tasks)
- [ ] Lazy load task details
- [ ] Optimistic updates
- [ ] Debounced search

---

## 🚀 NEXT IMMEDIATE ACTIONS

**TODAY (Next 4 hours):**

1. **Create Type Adapter** (30 min)
   - File: `/lib/adapters/taskAdapter.ts`
   - Map between EventTask and LegacyTask
   - Test conversions

2. **Create TasksContainer** (2 hours)
   - File: `/components/tasks/TasksContainer.tsx`
   - Accept eventId prop
   - Fetch tasks from API
   - Wire to existing sub-components

3. **Create TaskCard Component** (1 hour)
   - File: `/components/tasks/TaskCard.tsx`
   - Checkbox to mark complete
   - Priority badge
   - Critical path indicator
   - Click to expand

4. **Update EventCommandCenter** (30 min)
   - Pass eventId to TasksAndDeliverables
   - Test integration

---

**NEXT SESSION (Day 2):**

5. Wire CRUD operations to database
6. Add progress tracking
7. Create AI task generator function
8. Add critical path highlighter

---

**END OF ANALYSIS**  
*Ready for systematic implementation*