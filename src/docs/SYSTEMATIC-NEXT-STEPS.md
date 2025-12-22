# FashionOS Systematic Implementation Roadmap
## Sequential Task Breakdown with Copy-Paste Ready Code

**Created:** December 20, 2024  
**Goal:** Take FashionOS from 85% → 100% Production Ready  
**Timeline:** 6 weeks (126 hours)  
**Approach:** Sequential, no parallel work, verify each step

---

## 🎯 OVERVIEW

This document provides **step-by-step instructions** with **copy-paste ready code** for every remaining task.

**Completion Strategy:**
1. ✅ Do tasks in exact order listed
2. ✅ Verify each step before moving to next
3. ✅ No skipping (dependencies matter)
4. ✅ Test after each major milestone

---

## 📅 WEEK 1: FOUNDATION (22 hours)

### Goal: Database operational, no more mock data

---

## DAY 1: DATABASE SETUP (4 hours)

### ✅ TASK 1.1: Create Supabase Project (1 hour)

**Steps:**
1. Go to https://supabase.com
2. Click "New Project"
3. Fill in details:
   - **Name:** FashionOS
   - **Database Password:** (save this securely!)
   - **Region:** Choose closest to users
   - **Plan:** Free tier OK for dev
4. Wait ~2 minutes for project creation
5. Copy these values:
   - **Project URL:** `https://[project-id].supabase.co`
   - **API Keys → anon public:** `eyJhbGc...`

**Verification:**
```bash
✅ Can access Supabase Dashboard
✅ Project status shows "Active"
```

---

### ✅ TASK 1.2: Run Database Schema (1 hour)

**Steps:**
1. In Supabase Dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy entire contents of `/lib/supabase/schema/complete-schema.sql`
4. Paste into SQL Editor
5. Click **Run**
6. Wait ~30 seconds
7. Check output for errors

**Verification:**
```sql
-- Run this in SQL Editor to verify 8 tables created:
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Expected output:
assets
budget_items
campaigns
events
organizations
sponsors
tasks
users
```

---

### ✅ TASK 1.3: Configure Storage Buckets (30 minutes)

**Steps:**
1. In Supabase Dashboard, go to **Storage**
2. Click **New Bucket**
3. Create bucket:
   - **Name:** `event-assets`
   - **Public:** No (private)
   - **File size limit:** 50MB
   - **Allowed MIME types:** `image/*, video/*`
4. Click **Create Bucket**
5. Go to **Policies** tab
6. Click **New Policy**
7. Add RLS policies (see code below)

**Storage RLS Policies:**
```sql
-- Run in SQL Editor:

-- Allow authenticated users to upload to their org's events
create policy "Users can upload event assets"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'event-assets' AND
  (storage.foldername(name))[1] IN (
    select id::text from events
    where organization_id in (
      select organization_id from users
      where id = auth.uid()
    )
  )
);

-- Allow authenticated users to view their org's event assets
create policy "Users can view event assets"
on storage.objects for select
to authenticated
using (
  bucket_id = 'event-assets' AND
  (storage.foldername(name))[1] IN (
    select id::text from events
    where organization_id in (
      select organization_id from users
      where id = auth.uid()
    )
  )
);
```

**Verification:**
```sql
-- Check bucket exists:
SELECT * FROM storage.buckets WHERE name = 'event-assets';

-- Should return 1 row
```

---

### ✅ TASK 1.4: Configure Environment Variables (30 minutes)

**Steps:**
1. Create `.env.local` file in project root:

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://[your-project-id].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your-anon-key...

# Optional (for AI features - get later):
GOOGLE_GENERATIVE_AI_API_KEY=
```

2. Add to `.gitignore` (if not already):
```bash
.env.local
.env*.local
```

3. Restart dev server:
```bash
npm run dev
```

**Verification:**
```typescript
// Open browser console, should see:
// ✅ Supabase client initialized
// ✅ Connected to: https://[project-id].supabase.co

// Go to http://localhost:3000
// Find <SupabaseStatus /> component
// Should show GREEN connection status
```

---

### ✅ TASK 1.5: Test Connection (1 hour)

**Create test file:** `/test-connection.ts`

```typescript
import { supabase } from './lib/supabase/client';

async function testConnection() {
  console.log('🧪 Testing Supabase connection...');

  // Test 1: Can we connect?
  const { data: testData, error: testError } = await supabase
    .from('organizations')
    .select('*')
    .limit(1);

  if (testError) {
    console.error('❌ Connection failed:', testError);
    return;
  }

  console.log('✅ Connection successful!');
  console.log('📊 Organizations table accessible');

  // Test 2: Can we create data?
  const { data: org, error: createError } = await supabase
    .from('organizations')
    .insert({
      name: 'Test Organization',
      slug: 'test-org-' + Date.now(),
      plan: 'free'
    })
    .select()
    .single();

  if (createError) {
    console.error('❌ Create failed:', createError);
    return;
  }

  console.log('✅ Create successful!', org);

  // Test 3: Clean up
  await supabase
    .from('organizations')
    .delete()
    .eq('id', org.id);

  console.log('✅ All tests passed! Database is ready.');
}

testConnection();
```

**Run test:**
```bash
npx tsx test-connection.ts
```

**Expected output:**
```
🧪 Testing Supabase connection...
✅ Connection successful!
📊 Organizations table accessible
✅ Create successful! { id: '...', name: 'Test Organization', ... }
✅ All tests passed! Database is ready.
```

---

## DAY 2-3: CONTEXT REWRITES (10 hours)

### ✅ TASK 2.1: Rewrite EventContext (4 hours)

**Current file:** `/context/EventContext.tsx`

**Replace entire file with:**

```typescript
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import type { Database } from '@/lib/supabase/types';

type Event = Database['public']['Tables']['events']['Row'];
type EventInsert = Database['public']['Tables']['events']['Insert'];
type EventUpdate = Database['public']['Tables']['events']['Update'];

interface EventContextType {
  events: Event[];
  loading: boolean;
  error: string | null;
  createEvent: (event: EventInsert) => Promise<Event | null>;
  updateEvent: (id: string, updates: EventUpdate) => Promise<Event | null>;
  deleteEvent: (id: string) => Promise<boolean>;
  getEvent: (id: string) => Event | undefined;
  refreshEvents: () => Promise<void>;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export function EventProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch events on mount
  useEffect(() => {
    fetchEvents();
    subscribeToEvents();
  }, []);

  async function fetchEvents() {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('events')
        .select(`
          *,
          organization:organizations(name, slug),
          creator:users!events_created_by_fkey(full_name, email)
        `)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      setEvents(data || []);
    } catch (err: any) {
      console.error('Error fetching events:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function subscribeToEvents() {
    const subscription = supabase
      .channel('events-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'events'
        },
        (payload) => {
          console.log('Event change detected:', payload);
          
          if (payload.eventType === 'INSERT') {
            setEvents(prev => [payload.new as Event, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setEvents(prev =>
              prev.map(e => e.id === payload.new.id ? payload.new as Event : e)
            );
          } else if (payload.eventType === 'DELETE') {
            setEvents(prev =>
              prev.filter(e => e.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }

  async function createEvent(eventData: EventInsert): Promise<Event | null> {
    try {
      setError(null);

      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Get user's organization
      const { data: userData } = await supabase
        .from('users')
        .select('organization_id')
        .eq('id', user.id)
        .single();

      if (!userData) throw new Error('User not found');

      const { data, error: insertError } = await supabase
        .from('events')
        .insert({
          ...eventData,
          organization_id: userData.organization_id,
          created_by: user.id
        })
        .select()
        .single();

      if (insertError) throw insertError;

      // Optimistic update (real-time will confirm)
      setEvents(prev => [data, ...prev]);

      return data;
    } catch (err: any) {
      console.error('Error creating event:', err);
      setError(err.message);
      return null;
    }
  }

  async function updateEvent(id: string, updates: EventUpdate): Promise<Event | null> {
    try {
      setError(null);

      const { data, error: updateError } = await supabase
        .from('events')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (updateError) throw updateError;

      // Optimistic update
      setEvents(prev =>
        prev.map(e => e.id === id ? data : e)
      );

      return data;
    } catch (err: any) {
      console.error('Error updating event:', err);
      setError(err.message);
      return null;
    }
  }

  async function deleteEvent(id: string): Promise<boolean> {
    try {
      setError(null);

      const { error: deleteError } = await supabase
        .from('events')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;

      // Optimistic update
      setEvents(prev => prev.filter(e => e.id !== id));

      return true;
    } catch (err: any) {
      console.error('Error deleting event:', err);
      setError(err.message);
      return false;
    }
  }

  function getEvent(id: string): Event | undefined {
    return events.find(e => e.id === id);
  }

  async function refreshEvents() {
    await fetchEvents();
  }

  const value: EventContextType = {
    events,
    loading,
    error,
    createEvent,
    updateEvent,
    deleteEvent,
    getEvent,
    refreshEvents
  };

  return (
    <EventContext.Provider value={value}>
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents must be used within EventProvider');
  }
  return context;
}
```

**Verification:**
1. Wrap App in EventProvider (should already be done)
2. Go to Events page
3. Try creating an event
4. Check Supabase Dashboard → Table Editor → events
5. Should see new row

---

### ✅ TASK 2.2: Rewrite SponsorContext (3 hours)

**Similar pattern to EventContext, file:** `/context/SponsorContext.tsx`

```typescript
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import type { Database } from '@/lib/supabase/types';

type Sponsor = Database['public']['Tables']['sponsors']['Row'];
type SponsorInsert = Database['public']['Tables']['sponsors']['Insert'];
type SponsorUpdate = Database['public']['Tables']['sponsors']['Update'];

interface SponsorContextType {
  sponsors: Sponsor[];
  loading: boolean;
  error: string | null;
  createSponsor: (sponsor: SponsorInsert) => Promise<Sponsor | null>;
  updateSponsor: (id: string, updates: SponsorUpdate) => Promise<Sponsor | null>;
  deleteSponsor: (id: string) => Promise<boolean>;
  getSponsorsByEvent: (eventId: string) => Sponsor[];
  refreshSponsors: () => Promise<void>;
}

const SponsorContext = createContext<SponsorContextType | undefined>(undefined);

export function SponsorProvider({ children }: { children: React.ReactNode }) {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSponsors();
    subscribeToSponsors();
  }, []);

  async function fetchSponsors() {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('sponsors')
        .select(`
          *,
          event:events(name, type, start_date)
        `)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      setSponsors(data || []);
    } catch (err: any) {
      console.error('Error fetching sponsors:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function subscribeToSponsors() {
    const subscription = supabase
      .channel('sponsors-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'sponsors'
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setSponsors(prev => [payload.new as Sponsor, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setSponsors(prev =>
              prev.map(s => s.id === payload.new.id ? payload.new as Sponsor : s)
            );
          } else if (payload.eventType === 'DELETE') {
            setSponsors(prev =>
              prev.filter(s => s.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }

  async function createSponsor(sponsorData: SponsorInsert): Promise<Sponsor | null> {
    try {
      setError(null);

      const { data, error: insertError } = await supabase
        .from('sponsors')
        .insert(sponsorData)
        .select()
        .single();

      if (insertError) throw insertError;

      setSponsors(prev => [data, ...prev]);

      return data;
    } catch (err: any) {
      console.error('Error creating sponsor:', err);
      setError(err.message);
      return null;
    }
  }

  async function updateSponsor(id: string, updates: SponsorUpdate): Promise<Sponsor | null> {
    try {
      setError(null);

      const { data, error: updateError } = await supabase
        .from('sponsors')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (updateError) throw updateError;

      setSponsors(prev =>
        prev.map(s => s.id === id ? data : s)
      );

      return data;
    } catch (err: any) {
      console.error('Error updating sponsor:', err);
      setError(err.message);
      return null;
    }
  }

  async function deleteSponsor(id: string): Promise<boolean> {
    try {
      setError(null);

      const { error: deleteError } = await supabase
        .from('sponsors')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;

      setSponsors(prev => prev.filter(s => s.id !== id));

      return true;
    } catch (err: any) {
      console.error('Error deleting sponsor:', err);
      setError(err.message);
      return false;
    }
  }

  function getSponsorsByEvent(eventId: string): Sponsor[] {
    return sponsors.filter(s => s.event_id === eventId);
  }

  async function refreshSponsors() {
    await fetchSponsors();
  }

  const value: SponsorContextType = {
    sponsors,
    loading,
    error,
    createSponsor,
    updateSponsor,
    deleteSponsor,
    getSponsorsByEvent,
    refreshSponsors
  };

  return (
    <SponsorContext.Provider value={value}>
      {children}
    </SponsorContext.Provider>
  );
}

export function useSponsors() {
  const context = useContext(SponsorContext);
  if (!context) {
    throw new Error('useSponsors must be used within SponsorProvider');
  }
  return context;
}
```

---

### ✅ TASK 2.3: Rewrite BrandShootContext (3 hours)

**File:** `/context/BrandShootContext.tsx`

```typescript
import React, { createContext, useContext, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase/client';
import type { Database } from '@/lib/supabase/types';

type Campaign = Database['public']['Tables']['campaigns']['Row'];
type CampaignInsert = Database['public']['Tables']['campaigns']['Insert'];

export interface WizardData {
  brandSignals?: {
    website?: string;
    instagram?: string;
    brandColors?: string[];
    uploadedLogo?: string;
  };
  strategy?: {
    targetAudience?: string;
    keyMessage?: string;
    channels?: string[];
  };
  assets?: Array<{
    type: string;
    specs: string;
    quantity: number;
  }>;
  channelPacks?: Array<{
    channel: string;
    posts: number;
    stories?: number;
  }>;
  pricing?: {
    baseShoot: number;
    assets: number;
    editing: number;
    total: number;
  };
}

interface BrandShootContextType {
  wizardData: WizardData;
  currentStep: number;
  campaignId: string | null;
  setWizardData: (data: WizardData) => void;
  setCurrentStep: (step: number) => void;
  saveCampaign: () => Promise<Campaign | null>;
  loadCampaign: (id: string) => Promise<void>;
  resetWizard: () => void;
}

const BrandShootContext = createContext<BrandShootContextType | undefined>(undefined);

export function BrandShootProvider({ children }: { children: React.ReactNode }) {
  const [wizardData, setWizardDataState] = useState<WizardData>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [campaignId, setCampaignId] = useState<string | null>(null);

  const setWizardData = useCallback((data: WizardData) => {
    setWizardDataState(prev => ({ ...prev, ...data }));
  }, []);

  const saveCampaign = useCallback(async (): Promise<Campaign | null> => {
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Get user's organization
      const { data: userData } = await supabase
        .from('users')
        .select('organization_id')
        .eq('id', user.id)
        .single();

      if (!userData) throw new Error('User not found');

      const campaignData: CampaignInsert = {
        name: `Campaign ${new Date().toISOString().split('T')[0]}`,
        organization_id: userData.organization_id,
        created_by: user.id,
        brand_signals: wizardData.brandSignals || {},
        strategy: wizardData.strategy || {},
        assets: wizardData.assets || [],
        channel_packs: wizardData.channelPacks || [],
        pricing: wizardData.pricing || {},
        status: 'draft'
      };

      let result;

      if (campaignId) {
        // Update existing
        const { data, error } = await supabase
          .from('campaigns')
          .update(campaignData)
          .eq('id', campaignId)
          .select()
          .single();

        if (error) throw error;
        result = data;
      } else {
        // Create new
        const { data, error } = await supabase
          .from('campaigns')
          .insert(campaignData)
          .select()
          .single();

        if (error) throw error;
        result = data;
        setCampaignId(data.id);
      }

      return result;
    } catch (err: any) {
      console.error('Error saving campaign:', err);
      return null;
    }
  }, [wizardData, campaignId]);

  const loadCampaign = useCallback(async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      setWizardDataState({
        brandSignals: data.brand_signals as any,
        strategy: data.strategy as any,
        assets: data.assets as any,
        channelPacks: data.channel_packs as any,
        pricing: data.pricing as any
      });
      setCampaignId(id);
    } catch (err: any) {
      console.error('Error loading campaign:', err);
    }
  }, []);

  const resetWizard = useCallback(() => {
    setWizardDataState({});
    setCurrentStep(0);
    setCampaignId(null);
  }, []);

  const value: BrandShootContextType = {
    wizardData,
    currentStep,
    campaignId,
    setWizardData,
    setCurrentStep,
    saveCampaign,
    loadCampaign,
    resetWizard
  };

  return (
    <BrandShootContext.Provider value={value}>
      {children}
    </BrandShootContext.Provider>
  );
}

export function useBrandShoot() {
  const context = useContext(BrandShootContext);
  if (!context) {
    throw new Error('useBrandShoot must be used within BrandShootProvider');
  }
  return context;
}
```

**Verification for all 3 contexts:**
```typescript
// Test in browser console:
// 1. Create an event
// 2. Create a sponsor
// 3. Start brand shoot wizard
// 4. Check Supabase Dashboard → Table Editor
// 5. Should see data in respective tables
```

---

## DAY 4-5: FORM INTEGRATION (8 hours)

*(Continues in next message due to length...)*

---

**NEXT STEPS:**
Would you like me to continue with:
1. ✅ Days 4-7 (Form Integration + Auth)
2. ✅ Week 2-6 detailed breakdowns
3. ✅ Specific code examples for each dashboard
4. ✅ Mobile responsive fixes
5. ✅ AI integration guide

Let me know which section you want next!
