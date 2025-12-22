# 🚀 NEXT STEPS — IMMEDIATE ACTIONS

**Status:** Event Creation Wizard ✅ Complete | Database ❌ Not Connected  
**Blocker:** Database setup required before any features can work

---

## ⚡ CRITICAL PATH (DO THESE FIRST)

### 1️⃣ CREATE SUPABASE PROJECT (30 minutes)

**Action:** Go to [supabase.com](https://supabase.com)

1. Click "New Project"
2. Name: "fashionos-production"
3. Database Password: (save this securely)
4. Region: Choose closest to users
5. Click "Create Project"
6. Wait 2-3 minutes for provisioning

**Output:** Project URL + API Keys

---

### 2️⃣ UPDATE CREDENTIALS (5 minutes)

**File:** `/lib/supabase/client.ts`

**Find lines 29-30:**
```typescript
const supabaseUrl = 'YOUR_SUPABASE_URL_HERE';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY_HERE';
```

**Replace with:**
```typescript
const supabaseUrl = 'https://YOUR-PROJECT.supabase.co';
const supabaseAnonKey = 'eyJhbGc...your-actual-key';
```

**Get credentials from:** Project Settings → API

---

### 3️⃣ CREATE DATABASE SCHEMA (30 minutes)

**Go to:** Supabase Dashboard → SQL Editor

**Run this SQL:**

```sql
-- EVENTS TABLE
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL,
  name TEXT NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('runway_show', 'gallery_show', 'popup_store', 'brand_activation', 'trunk_show', 'press_preview')),
  event_date DATE NOT NULL,
  venue TEXT,
  expected_attendance INTEGER NOT NULL CHECK (expected_attendance > 0),
  budget DECIMAL(12,2) NOT NULL CHECK (budget > 0),
  number_of_models INTEGER DEFAULT 0,
  description TEXT NOT NULL,
  status TEXT DEFAULT 'planning' CHECK (status IN ('planning', 'confirmed', 'in_progress', 'completed', 'cancelled')),
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- EVENT PHASES TABLE
CREATE TABLE event_phases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  phase_name TEXT NOT NULL,
  phase_order INTEGER NOT NULL,
  start_date DATE,
  end_date DATE,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TASKS TABLE
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  phase_id UUID REFERENCES event_phases(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'blocked')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('critical', 'high', 'medium', 'low')),
  deadline DATE,
  estimated_hours DECIMAL(6,2),
  assigned_to UUID,
  created_by UUID NOT NULL,
  organization_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI ACTIONS TABLE (for logging)
CREATE TABLE ai_actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  agent TEXT NOT NULL,
  model TEXT NOT NULL,
  input JSONB,
  output JSONB,
  latency_ms INTEGER,
  cost_usd DECIMAL(10,4),
  success BOOLEAN NOT NULL,
  error TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- INDEXES for performance
CREATE INDEX idx_events_org ON events(organization_id);
CREATE INDEX idx_events_date ON events(event_date);
CREATE INDEX idx_tasks_event ON tasks(event_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_ai_actions_user ON ai_actions(user_id);
```

**Verify:** Check Tables in Table Editor

---

### 4️⃣ ENABLE ROW LEVEL SECURITY (15 minutes)

**Run this SQL:**

```sql
-- Enable RLS on all tables
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_phases ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_actions ENABLE ROW LEVEL SECURITY;

-- EVENTS POLICIES
CREATE POLICY "Users can view events in their org"
  ON events FOR SELECT
  USING (organization_id = (SELECT organization_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Users can create events in their org"
  ON events FOR INSERT
  WITH CHECK (organization_id = (SELECT organization_id FROM users WHERE id = auth.uid()));

-- TASKS POLICIES
CREATE POLICY "Users can view tasks in their org"
  ON tasks FOR SELECT
  USING (organization_id = (SELECT organization_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Users can create tasks in their org"
  ON tasks FOR INSERT
  WITH CHECK (organization_id = (SELECT organization_id FROM users WHERE id = auth.uid()));

-- AI ACTIONS POLICIES
CREATE POLICY "Users can view their AI actions"
  ON ai_actions FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can create AI actions"
  ON ai_actions FOR INSERT
  WITH CHECK (user_id = auth.uid());
```

---

### 5️⃣ TEST CONNECTION (10 minutes)

**Create test component:**

```tsx
// /components/test/SupabaseTest.tsx
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export function SupabaseTest() {
  const [status, setStatus] = useState<"testing" | "success" | "error">("testing");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function testConnection() {
      try {
        const { data, error } = await supabase.from("events").select("id").limit(1);
        
        if (error) {
          setStatus("error");
          setMessage(error.message);
        } else {
          setStatus("success");
          setMessage("Connected to Supabase!");
        }
      } catch (err) {
        setStatus("error");
        setMessage(err instanceof Error ? err.message : "Unknown error");
      }
    }

    testConnection();
  }, []);

  return (
    <div className="p-4 rounded border-2" style={{
      borderColor: status === "success" ? "green" : status === "error" ? "red" : "gray"
    }}>
      <h3 className="font-bold">Supabase Connection</h3>
      <p>Status: {status}</p>
      <p>Message: {message}</p>
    </div>
  );
}
```

**Add to App.tsx temporarily:**
```tsx
import { SupabaseTest } from "./components/test/SupabaseTest";

// Add inside App component
<SupabaseTest />
```

**Expected:** Green box with "Connected to Supabase!"

---

## 📋 AFTER DATABASE IS WORKING

### 6️⃣ Create Events List Page (4 hours)

**File:** `/app/events/page.tsx`

```tsx
"use client";
import { useState } from "react";
import { EventCreationWizard } from "@/components/wizards/EventCreationWizard";
import { Button } from "@/components/ui/button";

export default function EventsPage() {
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Events</h1>
        <Button onClick={() => setIsWizardOpen(true)}>
          Create Event
        </Button>
      </div>

      <EventCreationWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onSuccess={(eventId) => {
          setIsWizardOpen(false);
          // TODO: Redirect to event detail or refresh list
        }}
      />

      {/* TODO: Add events list here */}
    </div>
  );
}
```

---

### 7️⃣ Create Event Card Component (2 hours)

**File:** `/components/events/EventCard.tsx`

```tsx
interface EventCardProps {
  event: {
    id: string;
    name: string;
    event_date: string;
    event_type: string;
    venue?: string;
    budget: number;
  };
}

export function EventCard({ event }: EventCardProps) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer">
      <h3 className="font-bold text-lg">{event.name}</h3>
      <p className="text-sm text-gray-500">{event.event_date}</p>
      <p className="text-sm">{event.venue}</p>
      <p className="text-sm font-medium">${event.budget.toLocaleString()}</p>
    </div>
  );
}
```

---

### 8️⃣ Implement fetchEvents in List Page (2 hours)

**Update EventsPage:**

```tsx
import { useEffect, useState } from "react";
import { fetchEvents } from "@/lib/api/events";
import { EventCard } from "@/components/events/EventCard";
import { LoadingSkeleton } from "@/components/shared/LoadingSkeleton";
import { ErrorState } from "@/components/shared/ErrorState";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadEvents() {
      setIsLoading(true);
      const result = await fetchEvents();
      
      if (result.success) {
        setEvents(result.data);
      } else {
        setError(result.error.message);
      }
      setIsLoading(false);
    }

    loadEvents();
  }, []);

  if (isLoading) return <LoadingSkeleton type="list" />;
  if (error) return <ErrorState error={error} onRetry={loadEvents} />;

  return (
    <div className="grid gap-4">
      {events.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
```

---

## ✅ VALIDATION CHECKLIST

After completing steps 1-5:
- [ ] Supabase project exists
- [ ] Credentials updated in code
- [ ] Database schema created
- [ ] RLS policies enabled
- [ ] Test connection shows green

After completing steps 6-8:
- [ ] Events list page loads
- [ ] Create Event button opens wizard
- [ ] Wizard can be completed
- [ ] Event appears in list after creation
- [ ] Click event card shows detail (TODO next)

---

## 🚫 BLOCKERS TO RESOLVE

1. **No users table** → Create manually or skip auth for now
2. **No organization_id** → Use placeholder UUID for testing
3. **No auth working** → Test with RLS disabled initially

---

## 🎯 SUCCESS CRITERIA

You know database is working when:
- ✅ Supabase test component shows "Connected"
- ✅ Can create event from wizard
- ✅ Event appears in Supabase Table Editor
- ✅ Event appears in Events List page
- ✅ No console errors

**Time Estimate:** 2-3 hours for database setup + 8 hours for events list

**Next Session:** Complete steps 1-5, then test wizard end-to-end
