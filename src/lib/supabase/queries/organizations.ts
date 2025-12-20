/**
 * Organizations Query Module
 * 
 * Type-safe queries for organization management.
 * Handles CRUD operations, settings, and billing.
 */

import { supabase } from '../client';
import type { Database } from '../types';

type Organization = Database['public']['Tables']['organizations']['Row'];
type OrganizationInsert = Database['public']['Tables']['organizations']['Insert'];
type OrganizationUpdate = Database['public']['Tables']['organizations']['Update'];

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Get all organizations (admin only)
 */
export async function getOrganizations() {
  const { data, error } = await supabase
    .from('organizations')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[Supabase] Get organizations error:', error);
    throw error;
  }

  return data as Organization[];
}

/**
 * Get single organization by ID
 */
export async function getOrganization(id: string) {
  const { data, error } = await supabase
    .from('organizations')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('[Supabase] Get organization error:', error);
    throw error;
  }

  return data as Organization;
}

/**
 * Get organization by slug
 */
export async function getOrganizationBySlug(slug: string) {
  const { data, error } = await supabase
    .from('organizations')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('[Supabase] Get organization by slug error:', error);
    throw error;
  }

  return data as Organization;
}

/**
 * Get current user's organization
 */
export async function getCurrentOrganization() {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('No authenticated user');
  }

  // Get user's organization_id from users table
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('organization_id')
    .eq('id', user.id)
    .single();

  if (userError) {
    console.error('[Supabase] Get user organization error:', userError);
    throw userError;
  }

  return getOrganization(userData.organization_id);
}

/**
 * Create new organization
 */
export async function createOrganization(organization: OrganizationInsert) {
  const { data, error } = await supabase
    .from('organizations')
    .insert(organization)
    .select()
    .single();

  if (error) {
    console.error('[Supabase] Create organization error:', error);
    throw error;
  }

  return data as Organization;
}

/**
 * Update organization
 */
export async function updateOrganization(id: string, updates: OrganizationUpdate) {
  const { data, error } = await supabase
    .from('organizations')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('[Supabase] Update organization error:', error);
    throw error;
  }

  return data as Organization;
}

/**
 * Delete organization (owner only)
 */
export async function deleteOrganization(id: string) {
  const { error } = await supabase
    .from('organizations')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('[Supabase] Delete organization error:', error);
    throw error;
  }
}

// ============================================================================
// SETTINGS & CONFIGURATION
// ============================================================================

/**
 * Update organization logo
 */
export async function updateOrganizationLogo(
  organizationId: string,
  logoUrl: string
) {
  return updateOrganization(organizationId, { logo_url: logoUrl });
}

/**
 * Update organization plan
 */
export async function updateOrganizationPlan(
  organizationId: string,
  plan: Organization['plan']
) {
  return updateOrganization(organizationId, { plan });
}

/**
 * Check if slug is available
 */
export async function isSlugAvailable(slug: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('organizations')
    .select('id')
    .eq('slug', slug)
    .maybeSingle();

  if (error) {
    console.error('[Supabase] Check slug availability error:', error);
    return false;
  }

  return data === null;
}

/**
 * Generate unique slug from name
 */
export async function generateUniqueSlug(name: string): Promise<string> {
  let slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  let isAvailable = await isSlugAvailable(slug);
  let counter = 1;

  while (!isAvailable) {
    const newSlug = `${slug}-${counter}`;
    isAvailable = await isSlugAvailable(newSlug);
    if (isAvailable) {
      slug = newSlug;
    }
    counter++;
  }

  return slug;
}

// ============================================================================
// ORGANIZATION STATISTICS
// ============================================================================

/**
 * Get organization dashboard statistics
 */
export async function getOrganizationStats(organizationId: string) {
  // Get events count
  const { count: eventsCount, error: eventsError } = await supabase
    .from('events')
    .select('*', { count: 'exact', head: true })
    .eq('organization_id', organizationId);

  if (eventsError) {
    console.error('[Supabase] Get events count error:', eventsError);
  }

  // Get users count
  const { count: usersCount, error: usersError } = await supabase
    .from('users')
    .select('*', { count: 'exact', head: true })
    .eq('organization_id', organizationId);

  if (usersError) {
    console.error('[Supabase] Get users count error:', usersError);
  }

  // Get campaigns count
  const { count: campaignsCount, error: campaignsError } = await supabase
    .from('campaigns')
    .select('*', { count: 'exact', head: true })
    .eq('organization_id', organizationId);

  if (campaignsError) {
    console.error('[Supabase] Get campaigns count error:', campaignsError);
  }

  // Get active events
  const { count: activeEventsCount, error: activeEventsError } = await supabase
    .from('events')
    .select('*', { count: 'exact', head: true })
    .eq('organization_id', organizationId)
    .eq('status', 'active');

  if (activeEventsError) {
    console.error('[Supabase] Get active events count error:', activeEventsError);
  }

  return {
    totalEvents: eventsCount || 0,
    activeEvents: activeEventsCount || 0,
    totalUsers: usersCount || 0,
    totalCampaigns: campaignsCount || 0,
  };
}

/**
 * Get organization activity summary
 */
export async function getOrganizationActivity(
  organizationId: string,
  days: number = 30
) {
  const since = new Date();
  since.setDate(since.getDate() - days);
  const sinceIso = since.toISOString();

  // Recent events
  const { data: recentEvents, error: eventsError } = await supabase
    .from('events')
    .select('id, name, type, created_at')
    .eq('organization_id', organizationId)
    .gte('created_at', sinceIso)
    .order('created_at', { ascending: false })
    .limit(5);

  if (eventsError) {
    console.error('[Supabase] Get recent events error:', eventsError);
  }

  // Recent campaigns
  const { data: recentCampaigns, error: campaignsError } = await supabase
    .from('campaigns')
    .select('id, name, status, created_at')
    .eq('organization_id', organizationId)
    .gte('created_at', sinceIso)
    .order('created_at', { ascending: false })
    .limit(5);

  if (campaignsError) {
    console.error('[Supabase] Get recent campaigns error:', campaignsError);
  }

  return {
    recentEvents: recentEvents || [],
    recentCampaigns: recentCampaigns || [],
  };
}

// ============================================================================
// PLAN & BILLING
// ============================================================================

/**
 * Check if organization has feature access
 */
export async function hasFeatureAccess(
  organizationId: string,
  feature: string
): Promise<boolean> {
  const org = await getOrganization(organizationId);

  const planFeatures: Record<Organization['plan'], string[]> = {
    free: ['basic_events', 'basic_tasks', 'basic_sponsors'],
    pro: [
      'basic_events',
      'basic_tasks',
      'basic_sponsors',
      'advanced_analytics',
      'campaigns',
      'ai_features',
      'team_collaboration',
    ],
    enterprise: [
      'basic_events',
      'basic_tasks',
      'basic_sponsors',
      'advanced_analytics',
      'campaigns',
      'ai_features',
      'team_collaboration',
      'custom_branding',
      'priority_support',
      'sso',
      'advanced_security',
    ],
  };

  return planFeatures[org.plan]?.includes(feature) || false;
}

/**
 * Get plan limits
 */
export async function getPlanLimits(organizationId: string) {
  const org = await getOrganization(organizationId);

  const limits: Record<Organization['plan'], any> = {
    free: {
      maxEvents: 3,
      maxUsers: 2,
      maxCampaigns: 1,
      maxStorageGB: 1,
    },
    pro: {
      maxEvents: 25,
      maxUsers: 10,
      maxCampaigns: 10,
      maxStorageGB: 50,
    },
    enterprise: {
      maxEvents: Infinity,
      maxUsers: Infinity,
      maxCampaigns: Infinity,
      maxStorageGB: 500,
    },
  };

  return limits[org.plan];
}

/**
 * Check if organization is within limits
 */
export async function checkUsageLimits(organizationId: string) {
  const [stats, limits] = await Promise.all([
    getOrganizationStats(organizationId),
    getPlanLimits(organizationId),
  ]);

  return {
    events: {
      current: stats.totalEvents,
      limit: limits.maxEvents,
      withinLimit: stats.totalEvents < limits.maxEvents,
    },
    users: {
      current: stats.totalUsers,
      limit: limits.maxUsers,
      withinLimit: stats.totalUsers < limits.maxUsers,
    },
    campaigns: {
      current: stats.totalCampaigns,
      limit: limits.maxCampaigns,
      withinLimit: stats.totalCampaigns < limits.maxCampaigns,
    },
  };
}

// ============================================================================
// REALTIME SUBSCRIPTIONS
// ============================================================================

/**
 * Subscribe to organization updates
 */
export function subscribeToOrganization(
  organizationId: string,
  callback: (organization: Organization) => void
) {
  const channel = supabase
    .channel(`organization:${organizationId}`)
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'organizations',
        filter: `id=eq.${organizationId}`,
      },
      (payload) => {
        callback(payload.new as Organization);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
