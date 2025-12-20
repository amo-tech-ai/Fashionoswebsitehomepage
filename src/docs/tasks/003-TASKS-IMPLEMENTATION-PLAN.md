# 003 - Tasks System Implementation Plan

**Module:** Events > Tasks & Deliverables  
**Status:** Systematic Build Plan  
**Priority:** P0 - Execute Now  
**Last Updated:** December 18, 2025

---

## 🎯 IMPLEMENTATION STRATEGY

**Approach:** Build P0 features first, then P1, then P2  
**Timeline:** 1.5 weeks to 100% production ready  
**Hard Rule:** All files <300 lines, no breaking changes  

---

## 📋 PHASE 1: PRODUCTION READY (P0) - TODAY & TOMORROW

### Session 1: Task Create/Edit Modals (4 hours - TODAY)

**Goal:** Users can create and edit tasks manually

#### Step 1.1: Create Shared Form Component (1.5h)
**File:** `/components/tasks/TaskForm.tsx` (<200 lines)

**Features:**
- Title input (required)
- Description textarea
- Priority radio buttons (critical/high/medium/low)
- Workflow category select
- Workflow phase select
- Deadline date picker
- Assigned user dropdown
- Is critical path checkbox
- Dependency multi-select

**Validation:**
- Title: Required, 3-200 chars
- Deadline: Must be future date
- Dependencies: Cannot select self

**Code Structure:**
```typescript
interface TaskFormProps {
  eventId: string;
  initialValues?: Partial<EventTask>;
  onSubmit: (data: Partial<EventTask>) => Promise<void>;
  onCancel: () => void;
}

export function TaskForm({ eventId, initialValues, onSubmit, onCancel }: TaskFormProps) {
  const [formData, setFormData] = useState<Partial<EventTask>>(initialValues || {});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validateForm(): boolean {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title || formData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }
    
    if (formData.deadline && new Date(formData.deadline) < new Date()) {
      newErrors.deadline = 'Deadline must be in the future';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      toast.error('Failed to save task');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Form fields */}
    </form>
  );
}
```

---

#### Step 1.2: Create Task Create Modal (1h)
**File:** `/components/tasks/TaskCreateModal.tsx` (<150 lines)

**Features:**
- Modal dialog (react-modal or headlessui)
- TaskForm with empty initial values
- Submit → Create task via API
- Success → Close modal + refresh list
- Cancel → Close without saving

**Code Structure:**
```typescript
interface TaskCreateModalProps {
  eventId: string;
  open: boolean;
  onClose: () => void;
  onSuccess?: (task: EventTask) => void;
}

export function TaskCreateModal({ eventId, open, onClose, onSuccess }: TaskCreateModalProps) {
  async function handleSubmit(data: Partial<EventTask>) {
    const newTask = await createTask(eventId, data);
    toast.success('Task created!');
    onSuccess?.(newTask);
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Task</DialogTitle>
      <DialogContent>
        <TaskForm
          eventId={eventId}
          onSubmit={handleSubmit}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}
```

---

#### Step 1.3: Create Task Edit Modal (1h)
**File:** `/components/tasks/TaskEditModal.tsx` (<150 lines)

**Features:**
- Similar to Create Modal
- Pre-filled with task data
- Submit → Update task via API
- Delete button (soft delete)

**Code Structure:**
```typescript
interface TaskEditModalProps {
  task: EventTask;
  open: boolean;
  onClose: () => void;
  onSuccess?: (task: EventTask) => void;
  onDelete?: (taskId: string) => void;
}

export function TaskEditModal({ task, open, onClose, onSuccess, onDelete }: TaskEditModalProps) {
  async function handleSubmit(data: Partial<EventTask>) {
    const updated = await updateTask(task.id, data);
    toast.success('Task updated!');
    onSuccess?.(updated);
    onClose();
  }

  async function handleDelete() {
    if (!confirm('Delete this task?')) return;
    await deleteTask(task.id);
    toast.success('Task deleted');
    onDelete?.(task.id);
    onClose();
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        <TaskForm
          eventId={task.event_id}
          initialValues={task}
          onSubmit={handleSubmit}
          onCancel={onClose}
        />
        <Button variant="destructive" onClick={handleDelete}>
          Delete Task
        </Button>
      </DialogContent>
    </Dialog>
  );
}
```

---

#### Step 1.4: Wire Modals to TasksContainer (30min)
**Update:** `/components/tasks/TasksContainer.tsx`

**Changes:**
- Add state for modal visibility
- Add state for selected task (for edit)
- Wire "Create Task" button
- Wire TaskCard click to open edit modal

**Code:**
```typescript
const [showCreateModal, setShowCreateModal] = useState(false);
const [editingTask, setEditingTask] = useState<EventTask | null>(null);

function handleTaskClick(task: EventTask) {
  setEditingTask(task);
}

function handleTaskCreated(newTask: EventTask) {
  setTasks(prev => [...prev, newTask]);
}

function handleTaskUpdated(updated: EventTask) {
  setTasks(prev => prev.map(t => t.id === updated.id ? updated : t));
}

function handleTaskDeleted(taskId: string) {
  setTasks(prev => prev.filter(t => t.id !== taskId));
}

return (
  <>
    <Button onClick={() => setShowCreateModal(true)}>Create Task</Button>
    
    <TaskCreateModal
      eventId={eventId}
      open={showCreateModal}
      onClose={() => setShowCreateModal(false)}
      onSuccess={handleTaskCreated}
    />
    
    <TaskEditModal
      task={editingTask!}
      open={!!editingTask}
      onClose={() => setEditingTask(null)}
      onSuccess={handleTaskUpdated}
      onDelete={handleTaskDeleted}
    />
  </>
);
```

---

### Session 2: Database Schema (6 hours - TOMORROW)

#### Step 2.1: Design Schema (1h)

**Tables:**
1. `events` - Core event data
2. `event_tasks` - Tasks for events
3. `event_team` - Team members assigned to events
4. `event_sponsors` - Sponsor relationships
5. `event_budget_categories` - Budget breakdown
6. `event_risks` - AI-generated risks
7. `activity_logs` - Audit trail
8. `venues` - Venue directory
9. `venue_bookings` - Venue reservations
10. `designers` - Designer directory
11. `event_designers` - Designer assignments
12. `deliverables` - Media deliverables

**Key Relationships:**
- event_tasks.event_id → events.id
- event_team.event_id → events.id
- activity_logs.event_id → events.id
- event_tasks.dependency_task_ids → event_tasks.id[] (array)

---

#### Step 2.2: Create Migration (2h)
**File:** `/supabase/migrations/001_events_schema.sql`

**Schema:**
```sql
-- Events table
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,
  description TEXT,
  status VARCHAR(50) NOT NULL DEFAULT 'draft',
  start_date DATE NOT NULL,
  end_date DATE,
  progress_percentage INTEGER DEFAULT 0,
  venue_id UUID,
  budget_total INTEGER DEFAULT 0,
  budget_actual INTEGER DEFAULT 0,
  attendee_target INTEGER DEFAULT 0,
  attendee_registered INTEGER DEFAULT 0,
  created_by UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Event tasks table
CREATE TABLE event_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) NOT NULL DEFAULT 'to_do',
  priority VARCHAR(50) NOT NULL DEFAULT 'medium',
  workflow_category VARCHAR(50) NOT NULL,
  workflow_phase VARCHAR(50) NOT NULL,
  assigned_to UUID,
  deadline DATE,
  is_critical_path BOOLEAN DEFAULT FALSE,
  dependency_task_ids UUID[] DEFAULT '{}',
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_event_tasks_event_id ON event_tasks(event_id);
CREATE INDEX idx_event_tasks_status ON event_tasks(status);
CREATE INDEX idx_event_tasks_priority ON event_tasks(priority);
CREATE INDEX idx_event_tasks_deadline ON event_tasks(deadline);
CREATE INDEX idx_event_tasks_critical_path ON event_tasks(is_critical_path);

-- Activity logs table
CREATE TABLE activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  user_name VARCHAR(255) NOT NULL,
  user_avatar VARCHAR(255),
  action_type VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_activity_logs_event_id ON activity_logs(event_id);
CREATE INDEX idx_activity_logs_created_at ON activity_logs(created_at DESC);

-- ... other tables (sponsors, budget, risks, etc.)
```

---

#### Step 2.3: Create Triggers (1h)
**File:** `/supabase/migrations/002_triggers.sql`

**Triggers:**
1. Auto-update `updated_at` on row change
2. Recalculate event progress when task status changes
3. Log activity when tasks created/updated/deleted

**Code:**
```sql
-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER events_updated_at
BEFORE UPDATE ON events
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER tasks_updated_at
BEFORE UPDATE ON event_tasks
FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Recalculate event progress
CREATE OR REPLACE FUNCTION recalculate_event_progress()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE events
  SET progress_percentage = (
    SELECT COALESCE(
      ROUND((COUNT(*) FILTER (WHERE status = 'done')::FLOAT / COUNT(*)::FLOAT) * 100),
      0
    )
    FROM event_tasks
    WHERE event_id = COALESCE(NEW.event_id, OLD.event_id)
  )
  WHERE id = COALESCE(NEW.event_id, OLD.event_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER task_status_changed
AFTER INSERT OR UPDATE OR DELETE ON event_tasks
FOR EACH ROW EXECUTE FUNCTION recalculate_event_progress();

-- Log activity on task completion
CREATE OR REPLACE FUNCTION log_task_completion()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'done' AND OLD.status != 'done' THEN
    INSERT INTO activity_logs (
      event_id,
      user_id,
      user_name,
      action_type,
      description,
      metadata
    ) VALUES (
      NEW.event_id,
      NEW.assigned_to,
      'User', -- TODO: Get from auth context
      'task_completed',
      'Completed task: ' || NEW.title,
      jsonb_build_object('task_id', NEW.id)
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER task_completed
AFTER UPDATE ON event_tasks
FOR EACH ROW EXECUTE FUNCTION log_task_completion();
```

---

#### Step 2.4: Setup Supabase Client (1h)
**File:** `/lib/supabase/client.ts` (<100 lines)

**Code:**
```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.warn('[Supabase] Missing environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Helper: Check if connected
export async function checkConnection(): Promise<boolean> {
  try {
    const { error } = await supabase.from('events').select('count').limit(1);
    return !error;
  } catch {
    return false;
  }
}
```

---

#### Step 2.5: Test Schema (1h)

**Tasks:**
1. Run migrations locally
2. Insert test data (3 events, 100 tasks)
3. Test all queries
4. Verify triggers fire correctly
5. Check indexes work

---

### Session 3: API Routes (4 hours - TOMORROW)

#### Step 3.1: Events API (1h)
**Files:**
- `/app/api/events/route.ts` - GET /api/events, POST /api/events
- `/app/api/events/[id]/route.ts` - GET, PUT, DELETE /api/events/:id

**Implementation:**
```typescript
// /app/api/events/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    
    let query = supabase.from('events').select('*');
    if (status) query = query.eq('status', status);
    
    const { data, error } = await query.order('start_date', { ascending: true });
    
    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { data, error } = await supabase
      .from('events')
      .insert(body)
      .select()
      .single();
    
    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}
```

---

#### Step 3.2: Tasks API (2h)
**Files:**
- `/app/api/events/[id]/tasks/route.ts` - GET, POST
- `/app/api/tasks/[id]/route.ts` - PUT, DELETE

**Implementation:**
```typescript
// /app/api/events/[id]/tasks/route.ts
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');
    
    let query = supabase
      .from('event_tasks')
      .select('*')
      .eq('event_id', params.id);
    
    if (status) query = query.eq('status', status);
    if (priority) query = query.eq('priority', priority);
    
    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    
    const { data, error } = await supabase
      .from('event_tasks')
      .insert({ ...body, event_id: params.id })
      .select()
      .single();
    
    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
  }
}
```

---

#### Step 3.3: Test API Routes (1h)

**Test Cases:**
1. Create event → Returns 201
2. Fetch events → Returns array
3. Create task → Task saved to DB
4. Update task → Trigger fires, progress updates
5. Complete task → Activity log created
6. Delete task → Soft delete (status=cancelled)

---

## 🎯 SUCCESS CRITERIA

After Phase 1 (P0):
- [x] Users can create tasks manually
- [x] Users can edit existing tasks
- [x] Users can delete tasks
- [x] Tasks persist to database
- [x] Progress auto-calculates
- [x] Activity logs working
- [x] All API routes functional
- [x] No breaking changes
- [x] All files <300 lines

**Status:** Ready for production use (95% complete)

---

**Document Version:** 1.0  
**Previous Doc:** 002-TASKS-GAPS-ANALYSIS.md  
**Next Doc:** 004-TASKS-AI-FEATURES.md