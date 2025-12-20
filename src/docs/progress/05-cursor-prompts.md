# 05B — Cursor/Claude Execution Prompts

**Generated:** December 20, 2024  
**Purpose:** Copy-paste ready prompts for Cursor AI + Claude  
**Total Tasks:** 46 engineering tasks  
**Estimated Time:** 6-8 weeks

---

## 📋 HOW TO USE THIS DOCUMENT

1. Complete Figma designs first (see 05-figma-prompts.md)
2. Copy each prompt into Cursor AI
3. Review generated code, test thoroughly
4. Check off when passing tests
5. Deploy to staging → production

---

## WEEK 1: FOUNDATION (Database + Contexts)

### TASK 29: Supabase Database Schema
**Time:** 4 hours  
**Priority:** CRITICAL (BLOCKS EVERYTHING)

```
Create a complete Supabase database schema for FashionOS with the following tables and relationships.

TABLES TO CREATE:

1. **users** (extends Supabase auth.users)
   - id (uuid, primary key, references auth.users)
   - email (text)
   - full_name (text)
   - role (text) — 'organizer' | 'designer' | 'sponsor' | 'admin'
   - organization_id (uuid, references organizations)
   - avatar_url (text)
   - created_at (timestamp)
   - updated_at (timestamp)

2. **organizations**
   - id (uuid, primary key)
   - name (text, not null)
   - slug (text, unique)
   - plan (text) — 'free' | 'pro' | 'enterprise'
   - created_at (timestamp)

3. **events**
   - id (uuid, primary key)
   - name (text, not null)
   - description (text)
   - start_date (date, not null)
   - end_date (date)
   - status (text) — 'planning' | 'active' | 'complete' | 'cancelled'
   - organization_id (uuid, references organizations)
   - created_by (uuid, references users)
   - created_at (timestamp)
   - updated_at (timestamp)

4. **tasks**
   - id (uuid, primary key)
   - title (text, not null)
   - description (text)
   - status (text) — 'todo' | 'in_progress' | 'review' | 'done'
   - priority (text) — 'low' | 'medium' | 'high' | 'critical'
   - due_date (date)
   - assigned_to (uuid, references users)
   - event_id (uuid, references events)
   - workflow_phase (text)
   - created_at (timestamp)
   - updated_at (timestamp)

5. **phases**
   - id (uuid, primary key)
   - name (text, not null)
   - status (text) — 'upcoming' | 'active' | 'complete'
   - progress (integer, 0-100)
   - event_id (uuid, references events)
   - order (integer)

6. **sponsors**
   - id (uuid, primary key)
   - name (text, not null)
   - company (text)
   - email (text)
   - phone (text)
   - status (text) — 'lead' | 'contacted' | 'proposal' | 'negotiation' | 'confirmed' | 'fulfilled'
   - amount (decimal)
   - fit_score (integer, 0-100)
   - event_id (uuid, references events)
   - created_at (timestamp)

7. **campaigns** (Brand Shoot Wizard)
   - id (uuid, primary key)
   - brand_name (text, not null)
   - campaign_type (text)
   - budget (decimal)
   - ai_analysis (jsonb)
   - status (text) — 'draft' | 'analyzing' | 'ready' | 'approved'
   - created_by (uuid, references users)
   - created_at (timestamp)

8. **website_projects** (Website Wizard)
   - id (uuid, primary key)
   - project_name (text, not null)
   - industry (text)
   - pages (jsonb)
   - ai_generated_copy (jsonb)
   - created_by (uuid, references users)
   - created_at (timestamp)

9. **designer_profiles** (Designer Wizard)
   - id (uuid, primary key)
   - user_id (uuid, references users)
   - portfolio_url (text)
   - instagram_handle (text)
   - brand_score (integer)
   - ai_analysis (jsonb)
   - created_at (timestamp)

10. **assets** (Gallery Dashboard)
    - id (uuid, primary key)
    - file_name (text, not null)
    - file_path (text, not null)
    - file_type (text) — 'image' | 'video'
    - status (text) — 'pending' | 'approved' | 'rejected'
    - event_id (uuid, references events)
    - uploaded_by (uuid, references users)
    - created_at (timestamp)

11. **budgets**
    - id (uuid, primary key)
    - category (text)
    - amount (decimal)
    - actual (decimal)
    - event_id (uuid, references events)

12. **contracts**
    - id (uuid, primary key)
    - title (text, not null)
    - file_path (text, not null)
    - ai_analysis (jsonb)
    - sponsor_id (uuid, references sponsors)
    - created_at (timestamp)

13. **newsletter_subscribers**
    - id (uuid, primary key)
    - email (text, unique, not null)
    - subscribed_at (timestamp)
    - unsubscribed_at (timestamp)

14. **contact_submissions**
    - id (uuid, primary key)
    - name (text, not null)
    - email (text, not null)
    - message (text, not null)
    - created_at (timestamp)

RLS POLICIES:

For each table, create policies:
- Users can read their own organization's data
- Users can update their own records
- Admins can do everything
- Public read for marketing tables (newsletter, contact)

INDEXES:

- events.organization_id
- tasks.event_id
- tasks.assigned_to
- sponsors.event_id
- assets.event_id

TRIGGERS:

- updated_at auto-update on all tables
- Set default organization_id from user context

MIGRATIONS:

Create migration file: `supabase/migrations/001_initial_schema.sql`

Include rollback script: `supabase/migrations/001_initial_schema_rollback.sql`

TEST DATA (seed.sql):

- 1 test organization
- 2 test users
- 1 test event with tasks
- 2 test sponsors

Run: `supabase db reset` to test
```

**Acceptance Criteria:**
- [ ] All 14 tables created
- [ ] RLS policies applied and tested
- [ ] Indexes created
- [ ] Migrations run successfully
- [ ] Seed data loads
- [ ] Can query from client

---

### TASK 30: Supabase Storage Buckets
**Time:** 1 hour  
**Priority:** CRITICAL

```
Create Supabase Storage buckets for FashionOS file uploads with proper security policies.

CREATE BUCKETS:

1. **brand-uploads**
   - Purpose: Brand Shoot Wizard uploads (logos, images)
   - Max file size: 10MB
   - Allowed types: image/png, image/jpeg, image/svg+xml
   - Public: false (authenticated users only)

2. **assets**
   - Purpose: Gallery Dashboard (photos/videos)
   - Max file size: 100MB
   - Allowed types: image/*, video/mp4, video/mov
   - Public: false

3. **contracts**
   - Purpose: Contract Analyzer uploads
   - Max file size: 20MB
   - Allowed types: application/pdf
   - Public: false

4. **designer-portfolios**
   - Purpose: Designer Wizard portfolio images
   - Max file size: 10MB
   - Allowed types: image/*
   - Public: true (read-only)

STORAGE POLICIES:

For each bucket:
- Users can upload to their organization's folder
- Users can read their organization's files
- Users can delete their own uploads
- Admins can do everything

FOLDER STRUCTURE:

```
{bucket}/
  {organization_id}/
    {user_id}/
      {file_name}
```

HELPER FUNCTIONS:

Create TypeScript helpers:
- `uploadFile(bucket, file, path)` — Upload with progress
- `getFileUrl(bucket, path)` — Get signed URL
- `deleteFile(bucket, path)` — Delete file

FILE VALIDATION:

- Check file size before upload
- Check MIME type
- Generate unique filename (uuid + extension)
- Create thumbnails for images (use Supabase Edge Function)

IMPLEMENTATION:

File: `/lib/supabase/storage.ts`

```typescript
import { supabase } from './client';

export async function uploadFile(
  bucket: string,
  file: File,
  path: string,
  onProgress?: (progress: number) => void
) {
  // Validate file size
  if (file.size > getMaxSize(bucket)) {
    throw new Error('File too large');
  }

  // Upload
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) throw error;
  return data;
}

export async function getFileUrl(bucket: string, path: string) {
  const { data } = await supabase.storage
    .from(bucket)
    .createSignedUrl(path, 3600); // 1 hour expiry
  return data?.signedUrl;
}

function getMaxSize(bucket: string): number {
  const sizes = {
    'brand-uploads': 10 * 1024 * 1024,
    'assets': 100 * 1024 * 1024,
    'contracts': 20 * 1024 * 1024,
    'designer-portfolios': 10 * 1024 * 1024
  };
  return sizes[bucket] || 10 * 1024 * 1024;
}
```

TEST:

- Upload file to each bucket
- Verify policies (try uploading as different users)
- Test file size limits
- Test signed URLs
```

**Acceptance Criteria:**
- [ ] All 4 buckets created
- [ ] Policies tested and working
- [ ] Helper functions work
- [ ] File size validation works
- [ ] Thumbnails generated (if applicable)

---

### TASK 34: Context Implementations (EventContext, SponsorContext, BrandShootContext)
**Time:** 6 hours  
**Priority:** CRITICAL

```
Implement React contexts with Supabase integration for FashionOS.

CONTEXT 1: EventContext

File: `/context/EventContext.tsx`

```typescript
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase/client';

interface Event {
  id: string;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  status: 'planning' | 'active' | 'complete' | 'cancelled';
  organization_id: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'critical';
  due_date: string;
  assigned_to: string;
  event_id: string;
  workflow_phase: string;
}

interface Phase {
  id: string;
  name: string;
  status: 'upcoming' | 'active' | 'complete';
  progress: number;
  event_id: string;
  order: number;
}

interface EventContextType {
  currentEvent: Event | null;
  tasks: Task[];
  phases: Phase[];
  isLoading: boolean;
  error: Error | null;
  createEvent: (event: Partial<Event>) => Promise<Event>;
  updateEvent: (id: string, updates: Partial<Event>) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  createTask: (task: Partial<Task>) => Promise<Task>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  setCurrentEvent: (eventId: string) => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export function EventProvider({ children }: { children: React.ReactNode }) {
  const [currentEvent, setCurrentEventState] = useState<Event | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [phases, setPhases] = useState<Phase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch current event
  const setCurrentEvent = async (eventId: string) => {
    setIsLoading(true);
    try {
      const { data: event, error: eventError } = await supabase
        .from('events')
        .select('*')
        .eq('id', eventId)
        .single();

      if (eventError) throw eventError;

      // Fetch tasks
      const { data: tasksData } = await supabase
        .from('tasks')
        .select('*')
        .eq('event_id', eventId)
        .order('due_date', { ascending: true });

      // Fetch phases
      const { data: phasesData } = await supabase
        .from('phases')
        .select('*')
        .eq('event_id', eventId)
        .order('order', { ascending: true });

      setCurrentEventState(event);
      setTasks(tasksData || []);
      setPhases(phasesData || []);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  // Create event
  const createEvent = async (eventData: Partial<Event>): Promise<Event> => {
    const { data, error } = await supabase
      .from('events')
      .insert([eventData])
      .select()
      .single();

    if (error) throw error;
    return data;
  };

  // Update event
  const updateEvent = async (id: string, updates: Partial<Event>) => {
    const { error } = await supabase
      .from('events')
      .update(updates)
      .eq('id', id);

    if (error) throw error;

    // Refresh
    if (currentEvent?.id === id) {
      setCurrentEvent(id);
    }
  };

  // Delete event
  const deleteEvent = async (id: string) => {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);

    if (error) throw error;
  };

  // Create task
  const createTask = async (taskData: Partial<Task>): Promise<Task> => {
    const { data, error } = await supabase
      .from('tasks')
      .insert([{ ...taskData, event_id: currentEvent?.id }])
      .select()
      .single();

    if (error) throw error;

    // Update local state
    setTasks([...tasks, data]);
    return data;
  };

  // Update task
  const updateTask = async (id: string, updates: Partial<Task>) => {
    const { error } = await supabase
      .from('tasks')
      .update(updates)
      .eq('id', id);

    if (error) throw error;

    // Update local state
    setTasks(tasks.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  // Delete task
  const deleteTask = async (id: string) => {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);

    if (error) throw error;

    // Update local state
    setTasks(tasks.filter(t => t.id !== id));
  };

  // Realtime subscriptions
  useEffect(() => {
    if (!currentEvent) return;

    const tasksSubscription = supabase
      .channel('tasks_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'tasks', filter: `event_id=eq.${currentEvent.id}` },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setTasks(prev => [...prev, payload.new as Task]);
          } else if (payload.eventType === 'UPDATE') {
            setTasks(prev => prev.map(t => t.id === payload.new.id ? payload.new as Task : t));
          } else if (payload.eventType === 'DELETE') {
            setTasks(prev => prev.filter(t => t.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      tasksSubscription.unsubscribe();
    };
  }, [currentEvent]);

  const value = {
    currentEvent,
    tasks,
    phases,
    isLoading,
    error,
    createEvent,
    updateEvent,
    deleteEvent,
    createTask,
    updateTask,
    deleteTask,
    setCurrentEvent
  };

  return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
}

export function useEvent() {
  const context = useContext(EventContext);
  if (!context) throw new Error('useEvent must be used within EventProvider');
  return context;
}
```

CONTEXT 2: SponsorContext (similar structure)
CONTEXT 3: BrandShootContext (add Supabase to existing)

TEST:

- Create event via context
- Update event, verify UI updates
- Create task, verify realtime update
- Delete task, verify removal

Add error handling:
- Network errors → show toast
- Permission errors → show permission denied state
- Validation errors → show inline errors
```

**Acceptance Criteria:**
- [ ] EventContext fully implemented with Supabase
- [ ] SponsorContext fully implemented
- [ ] BrandShootContext has Supabase queries
- [ ] Realtime subscriptions working
- [ ] Error handling complete
- [ ] All CRUD operations tested

---

## WEEK 2-3: AI FEATURES

### TASK 35-40: AI Integrations (See 04-progress-tasks.md section C)

**Quick Summary:**
- Brand Shoot AI (Campaign Generator)
- Designer Wizard AI (Brand Analyzer)
- Command Center AI (Executive Insights)
- Contract Analyzer AI
- Casting Matchmaker AI
- Website Wizard AI (Copywriting)

*Detailed prompts available in extended documentation.*

---

## WEEK 3-4: FORM HANDLING & VALIDATION

### TASK 41: Zod Schemas (All Wizards + Dashboards)
**Time:** 4 hours  
**Priority:** HIGH

```
Create Zod validation schemas for all 6 wizards and key dashboard forms.

INSTALL:

```bash
npm install zod react-hook-form@7.55.0 @hookform/resolvers
```

SCHEMAS:

File: `/lib/validation/schemas.ts`

```typescript
import { z } from 'zod';

// Brand Shoot Wizard
export const brandShootSchema = z.object({
  brandName: z.string().min(2, 'Brand name must be at least 2 characters'),
  industry: z.string().min(1, 'Industry is required'),
  instagram: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  website: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  campaignType: z.enum(['product', 'lifestyle', 'editorial', 'ecommerce']),
  budget: z.number().min(1000, 'Minimum budget is $1,000').max(1000000),
  deliverables: z.array(z.string()).min(1, 'Select at least one deliverable'),
  timeline: z.string().min(1, 'Timeline is required'),
});

// Designer Wizard
export const designerProfileSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  portfolioUrl: z.string().url('Must be a valid portfolio URL'),
  instagramHandle: z.string()
    .regex(/^@?[a-zA-Z0-9._]{1,30}$/, 'Invalid Instagram handle')
    .transform(val => val.startsWith('@') ? val : `@${val}`),
  bio: z.string().min(50, 'Bio must be at least 50 characters').max(500),
  specialties: z.array(z.string()).min(1, 'Select at least one specialty'),
  experience: z.enum(['junior', 'mid', 'senior', 'lead']),
});

// Website Wizard
export const websiteProjectSchema = z.object({
  projectName: z.string().min(2, 'Project name is required'),
  industry: z.string().min(1, 'Industry is required'),
  pages: z.array(z.enum(['home', 'about', 'services', 'portfolio', 'contact'])).min(1),
  primaryColor: z.string().regex(/^#[0-9A-F]{6}$/i, 'Must be a valid hex color'),
  tone: z.enum(['professional', 'friendly', 'luxury', 'minimalist']),
  aiCopywriting: z.boolean().default(true),
});

// Event Creation Wizard
export const eventSchema = z.object({
  name: z.string().min(3, 'Event name must be at least 3 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters').optional(),
  startDate: z.string().refine(
    (date) => new Date(date) > new Date(),
    'Start date must be in the future'
  ),
  endDate: z.string().optional(),
  eventType: z.enum(['show', 'activation', 'photoshoot', 'campaign']),
}).refine(
  (data) => !data.endDate || new Date(data.endDate) >= new Date(data.startDate),
  {
    message: 'End date must be after start date',
    path: ['endDate'],
  }
);

// Task Creation (Dashboard)
export const taskSchema = z.object({
  title: z.string().min(3, 'Task title is required'),
  description: z.string().optional(),
  status: z.enum(['todo', 'in_progress', 'review', 'done']).default('todo'),
  priority: z.enum(['low', 'medium', 'high', 'critical']).default('medium'),
  dueDate: z.string().optional(),
  assignedTo: z.string().uuid('Invalid user ID').optional(),
  workflowPhase: z.string().optional(),
});

// Sponsor Creation (CRM)
export const sponsorSchema = z.object({
  name: z.string().min(2, 'Sponsor name is required'),
  company: z.string().min(2, 'Company name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number (use international format)')
    .optional(),
  amount: z.number().min(0, 'Amount must be positive').optional(),
  status: z.enum(['lead', 'contacted', 'proposal', 'negotiation', 'confirmed', 'fulfilled']).default('lead'),
});

// Contact Form (Marketing)
export const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000),
});

// Newsletter Signup (Marketing)
export const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
});

// File Upload Validation
export const fileSchema = z.object({
  file: z.instanceof(File)
    .refine((file) => file.size <= 10 * 1024 * 1024, 'File must be less than 10MB')
    .refine(
      (file) => ['image/jpeg', 'image/png', 'image/svg+xml', 'application/pdf'].includes(file.type),
      'File must be JPG, PNG, SVG, or PDF'
    ),
});
```

USAGE WITH REACT HOOK FORM:

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { brandShootSchema } from '../lib/validation/schemas';

function BrandShootForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(brandShootSchema),
  });

  const onSubmit = (data) => {
    console.log('Valid data:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('brandName')} />
      {errors.brandName && <p className="text-red-600 text-sm">{errors.brandName.message}</p>}
      {/* ... more fields */}
    </form>
  );
}
```

TEST:

- Submit form with invalid data → see errors
- Fix errors → form submits
- Verify all error messages match Figma designs
```

**Acceptance Criteria:**
- [ ] All 8+ schemas created
- [ ] Integrated with React Hook Form
- [ ] Error messages match Figma copy
- [ ] Custom refinements work (date comparison, etc.)
- [ ] File validation works

---

## WEEK 4-6: DASHBOARD LOGIC, INTEGRATIONS, TESTING

### TASK 42-74: Remaining Engineering Tasks

**Quick Reference:**
- Form submission handlers (#42)
- Draft save (#43)
- File uploads (#44-45)
- Integrations: Stripe, Email, Analytics, SEO, PDF (#46-50)
- Search/filter/sort (#51-53)
- Dashboard-specific logic (#54-60)
- Auth & security (#61-63)
- Error handling (#64-66)
- Performance (#67-69)
- Testing (#70-72)
- DevOps (#73-74)

*Detailed prompts available in 04-progress-tasks.md sections D-M.*

---

## QUICK DEPLOYMENT CHECKLIST

### Pre-Deploy:
- [ ] All Supabase migrations run
- [ ] RLS policies tested
- [ ] Environment variables set
- [ ] Build passes (`npm run build`)
- [ ] Tests pass (`npm test`)
- [ ] No console errors

### Deploy to Staging:
- [ ] Deploy to Vercel/Netlify staging
- [ ] Test all wizards end-to-end
- [ ] Test all dashboards with real data
- [ ] Test on mobile devices
- [ ] Run Lighthouse audit (target: 90+)

### Deploy to Production:
- [ ] Final smoke tests
- [ ] Enable error monitoring (Sentry)
- [ ] Enable analytics (PostHog)
- [ ] Monitor logs for errors
- [ ] Set up uptime monitoring

---

**END OF CURSOR PROMPTS**

*For Figma design tasks, see 05-figma-prompts.md*
