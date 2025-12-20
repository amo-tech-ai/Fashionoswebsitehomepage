/**
 * Campaigns Query Module
 * 
 * Type-safe queries for Brand Shoot campaigns.
 * Handles CRUD operations and real-time subscriptions.
 */

import { supabase } from '../client';
import type { Database } from '../types';

type Campaign = Database['public']['Tables']['campaigns']['Row'];
type CampaignInsert = Database['public']['Tables']['campaigns']['Insert'];
type CampaignUpdate = Database['public']['Tables']['campaigns']['Update'];

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Get all campaigns for an organization
 */
export async function getCampaigns(organizationId: string) {
  const { data, error } = await supabase
    .from('campaigns')
    .select('*')
    .eq('organization_id', organizationId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[Supabase] Get campaigns error:', error);
    throw error;
  }

  return data as Campaign[];
}

/**
 * Get campaigns by status
 */
export async function getCampaignsByStatus(
  organizationId: string, 
  status: Campaign['status']
) {
  const { data, error } = await supabase
    .from('campaigns')
    .select('*')
    .eq('organization_id', organizationId)
    .eq('status', status)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[Supabase] Get campaigns by status error:', error);
    throw error;
  }

  return data as Campaign[];
}

/**
 * Get single campaign by ID
 */
export async function getCampaign(id: string) {
  const { data, error } = await supabase
    .from('campaigns')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('[Supabase] Get campaign error:', error);
    throw error;
  }

  return data as Campaign;
}

/**
 * Create new campaign
 */
export async function createCampaign(campaign: CampaignInsert) {
  const { data, error } = await supabase
    .from('campaigns')
    .insert(campaign)
    .select()
    .single();

  if (error) {
    console.error('[Supabase] Create campaign error:', error);
    throw error;
  }

  return data as Campaign;
}

/**
 * Update campaign
 */
export async function updateCampaign(id: string, updates: CampaignUpdate) {
  const { data, error } = await supabase
    .from('campaigns')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('[Supabase] Update campaign error:', error);
    throw error;
  }

  return data as Campaign;
}

/**
 * Delete campaign
 */
export async function deleteCampaign(id: string) {
  const { error } = await supabase
    .from('campaigns')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('[Supabase] Delete campaign error:', error);
    throw error;
  }
}

// ============================================================================
// ADVANCED QUERIES
// ============================================================================

/**
 * Get campaign statistics for an organization
 */
export async function getCampaignStats(organizationId: string) {
  const { data, error } = await supabase
    .from('campaigns')
    .select('status')
    .eq('organization_id', organizationId);

  if (error) {
    console.error('[Supabase] Get campaign stats error:', error);
    throw error;
  }

  const stats = {
    total: data.length,
    draft: data.filter(c => c.status === 'draft').length,
    proposed: data.filter(c => c.status === 'proposed').length,
    approved: data.filter(c => c.status === 'approved').length,
    in_production: data.filter(c => c.status === 'in_production').length,
    completed: data.filter(c => c.status === 'completed').length,
  };

  return stats;
}

/**
 * Get recent campaigns (last 30 days)
 */
export async function getRecentCampaigns(organizationId: string, limit: number = 10) {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const { data, error } = await supabase
    .from('campaigns')
    .select('*')
    .eq('organization_id', organizationId)
    .gte('created_at', thirtyDaysAgo.toISOString())
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('[Supabase] Get recent campaigns error:', error);
    throw error;
  }

  return data as Campaign[];
}

/**
 * Search campaigns by name
 */
export async function searchCampaigns(organizationId: string, query: string) {
  const { data, error } = await supabase
    .from('campaigns')
    .select('*')
    .eq('organization_id', organizationId)
    .ilike('name', `%${query}%`)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[Supabase] Search campaigns error:', error);
    throw error;
  }

  return data as Campaign[];
}

// ============================================================================
// REALTIME SUBSCRIPTIONS
// ============================================================================

/**
 * Subscribe to campaign updates
 */
export function subscribeToCampaign(
  campaignId: string,
  callback: (campaign: Campaign) => void
) {
  const channel = supabase
    .channel(`campaign:${campaignId}`)
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'campaigns',
        filter: `id=eq.${campaignId}`,
      },
      (payload) => {
        callback(payload.new as Campaign);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

/**
 * Subscribe to organization campaigns
 */
export function subscribeToOrganizationCampaigns(
  organizationId: string,
  callback: (payload: any) => void
) {
  const channel = supabase
    .channel(`campaigns:org=${organizationId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'campaigns',
        filter: `organization_id=eq.${organizationId}`,
      },
      callback
    )
    .subscribe();

  return channel;
}
