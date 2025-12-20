/**
 * Supabase Query Helpers
 * 
 * Type-safe query builders for common database operations.
 * Handles error logging and data transformation.
 */

import { supabase } from './client';
import type { Database } from './types';

// Re-export supabase client for contexts
export { supabase };

// Re-export all query modules
export * from './queries/campaigns';
export * from './queries/users';
export * from './queries/organizations';
export * from './queries/analytics';

type Event = Database['public']['Tables']['events']['Row'];
type EventInsert = Database['public']['Tables']['events']['Insert'];
type EventUpdate = Database['public']['Tables']['events']['Update'];

type Task = Database['public']['Tables']['tasks']['Row'];
type TaskInsert = Database['public']['Tables']['tasks']['Insert'];
type TaskUpdate = Database['public']['Tables']['tasks']['Update'];

type Sponsor = Database['public']['Tables']['sponsors']['Row'];
type SponsorInsert = Database['public']['Tables']['sponsors']['Insert'];
type SponsorUpdate = Database['public']['Tables']['sponsors']['Update'];

type BudgetItem = Database['public']['Tables']['budget_items']['Row'];
type Asset = Database['public']['Tables']['assets']['Row'];

// ============================================================================
// EVENTS
// ============================================================================

export async function getEvents(organizationId: string) {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('organization_id', organizationId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[Supabase] Get events error:', error);
    throw error;
  }

  return data;
}

export async function getEvent(id: string) {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('[Supabase] Get event error:', error);
    throw error;
  }

  return data;
}

export async function createEvent(event: EventInsert) {
  const { data, error } = await supabase
    .from('events')
    .insert(event)
    .select()
    .single();

  if (error) {
    console.error('[Supabase] Create event error:', error);
    throw error;
  }

  return data;
}

export async function updateEvent(id: string, updates: EventUpdate) {
  const { data, error } = await supabase
    .from('events')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('[Supabase] Update event error:', error);
    throw error;
  }

  return data;
}

export async function deleteEvent(id: string) {
  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('[Supabase] Delete event error:', error);
    throw error;
  }
}

// ============================================================================
// TASKS
// ============================================================================

export async function getTasks(eventId: string) {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('event_id', eventId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[Supabase] Get tasks error:', error);
    throw error;
  }

  return data;
}

export async function getTask(id: string) {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('[Supabase] Get task error:', error);
    throw error;
  }

  return data;
}

export async function createTask(task: TaskInsert) {
  const { data, error } = await supabase
    .from('tasks')
    .insert(task)
    .select()
    .single();

  if (error) {
    console.error('[Supabase] Create task error:', error);
    throw error;
  }

  return data;
}

export async function updateTask(id: string, updates: TaskUpdate) {
  const { data, error } = await supabase
    .from('tasks')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('[Supabase] Update task error:', error);
    throw error;
  }

  return data;
}

export async function deleteTask(id: string) {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('[Supabase] Delete task error:', error);
    throw error;
  }
}

// ============================================================================
// SPONSORS
// ============================================================================

export async function getSponsors(eventId: string) {
  const { data, error } = await supabase
    .from('sponsors')
    .select('*')
    .eq('event_id', eventId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[Supabase] Get sponsors error:', error);
    throw error;
  }

  return data;
}

export async function getSponsor(id: string) {
  const { data, error } = await supabase
    .from('sponsors')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('[Supabase] Get sponsor error:', error);
    throw error;
  }

  return data;
}

export async function createSponsor(sponsor: SponsorInsert) {
  const { data, error } = await supabase
    .from('sponsors')
    .insert(sponsor)
    .select()
    .single();

  if (error) {
    console.error('[Supabase] Create sponsor error:', error);
    throw error;
  }

  return data;
}

export async function updateSponsor(id: string, updates: SponsorUpdate) {
  const { data, error } = await supabase
    .from('sponsors')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('[Supabase] Update sponsor error:', error);
    throw error;
  }

  return data;
}

export async function deleteSponsor(id: string) {
  const { error } = await supabase
    .from('sponsors')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('[Supabase] Delete sponsor error:', error);
    throw error;
  }
}

// ============================================================================
// BUDGET
// ============================================================================

export async function getBudgetItems(eventId: string) {
  const { data, error } = await supabase
    .from('budget_items')
    .select('*')
    .eq('event_id', eventId)
    .order('category', { ascending: true });

  if (error) {
    console.error('[Supabase] Get budget items error:', error);
    throw error;
  }

  return data;
}

export async function createBudgetItem(item: Database['public']['Tables']['budget_items']['Insert']) {
  const { data, error } = await supabase
    .from('budget_items')
    .insert(item)
    .select()
    .single();

  if (error) {
    console.error('[Supabase] Create budget item error:', error);
    throw error;
  }

  return data;
}

// ============================================================================
// ASSETS (Gallery)
// ============================================================================

export async function getAssets(eventId: string) {
  const { data, error } = await supabase
    .from('assets')
    .select('*')
    .eq('event_id', eventId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[Supabase] Get assets error:', error);
    throw error;
  }

  return data;
}

export async function updateAssetStatus(
  id: string,
  status: 'pending' | 'approved' | 'rejected'
) {
  const { data, error } = await supabase
    .from('assets')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('[Supabase] Update asset status error:', error);
    throw error;
  }

  return data;
}

// ============================================================================
// REALTIME SUBSCRIPTIONS
// ============================================================================

/**
 * Subscribe to event updates
 */
export function subscribeToEvent(
  eventId: string,
  callback: (event: Event) => void
) {
  const channel = supabase
    .channel(`event:${eventId}`)
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'events',
        filter: `id=eq.${eventId}`,
      },
      (payload) => {
        callback(payload.new as Event);
      }
    )
    .subscribe();

  // Return unsubscribe function
  return () => {
    supabase.removeChannel(channel);
  };
}

/**
 * Subscribe to event tasks updates
 */
export function subscribeToEventTasks(
  eventId: string,
  callback: (tasks: Task[]) => void
) {
  const channel = supabase
    .channel(`event_tasks:${eventId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'tasks',
        filter: `event_id=eq.${eventId}`,
      },
      async () => {
        // Refetch all tasks when any change occurs
        const { data } = await supabase
          .from('tasks')
          .select('*')
          .eq('event_id', eventId)
          .order('created_at', { ascending: false });
        
        if (data) {
          callback(data as Task[]);
        }
      }
    )
    .subscribe();

  // Return unsubscribe function
  return () => {
    supabase.removeChannel(channel);
  };
}

export function subscribeToTasks(
  eventId: string,
  callback: (payload: any) => void
) {
  const channel = supabase
    .channel(`tasks:event_id=eq.${eventId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'tasks',
        filter: `event_id=eq.${eventId}`,
      },
      callback
    )
    .subscribe();

  return channel;
}

export function subscribeToSponsors(
  eventId: string,
  callback: (payload: any) => void
) {
  const channel = supabase
    .channel(`sponsors:event_id=eq.${eventId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'sponsors',
        filter: `event_id=eq.${eventId}`,
      },
      callback
    )
    .subscribe();

  return channel;
}

export function subscribeToAssets(
  eventId: string,
  callback: (payload: any) => void
) {
  const channel = supabase
    .channel(`assets:event_id=eq.${eventId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'assets',
        filter: `event_id=eq.${eventId}`,
      },
      callback
    )
    .subscribe();

  return channel;
}