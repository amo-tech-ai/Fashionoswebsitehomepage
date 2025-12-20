/**
 * Users Query Module
 * 
 * Type-safe queries for user management.
 * Handles CRUD operations, team management, and permissions.
 */

import { supabase } from '../client';
import type { Database } from '../types';

type User = Database['public']['Tables']['users']['Row'];
type UserInsert = Database['public']['Tables']['users']['Insert'];
type UserUpdate = Database['public']['Tables']['users']['Update'];

// ============================================================================
// CRUD OPERATIONS
// ============================================================================

/**
 * Get all users in an organization
 */
export async function getUsers(organizationId: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('organization_id', organizationId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[Supabase] Get users error:', error);
    throw error;
  }

  return data as User[];
}

/**
 * Get single user by ID
 */
export async function getUser(id: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('[Supabase] Get user error:', error);
    throw error;
  }

  return data as User;
}

/**
 * Get user by email
 */
export async function getUserByEmail(email: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error) {
    console.error('[Supabase] Get user by email error:', error);
    throw error;
  }

  return data as User;
}

/**
 * Get current authenticated user's profile
 */
export async function getCurrentUserProfile() {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('No authenticated user');
  }

  return getUser(user.id);
}

/**
 * Create new user (called after auth signup)
 */
export async function createUser(user: UserInsert) {
  const { data, error } = await supabase
    .from('users')
    .insert(user)
    .select()
    .single();

  if (error) {
    console.error('[Supabase] Create user error:', error);
    throw error;
  }

  return data as User;
}

/**
 * Update user profile
 */
export async function updateUser(id: string, updates: UserUpdate) {
  const { data, error } = await supabase
    .from('users')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('[Supabase] Update user error:', error);
    throw error;
  }

  return data as User;
}

/**
 * Delete user
 */
export async function deleteUser(id: string) {
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('[Supabase] Delete user error:', error);
    throw error;
  }
}

// ============================================================================
// TEAM MANAGEMENT
// ============================================================================

/**
 * Get users by role
 */
export async function getUsersByRole(
  organizationId: string,
  role: User['role']
) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('organization_id', organizationId)
    .eq('role', role)
    .order('full_name', { ascending: true });

  if (error) {
    console.error('[Supabase] Get users by role error:', error);
    throw error;
  }

  return data as User[];
}

/**
 * Get team members (non-viewers)
 */
export async function getTeamMembers(organizationId: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('organization_id', organizationId)
    .neq('role', 'viewer')
    .order('full_name', { ascending: true });

  if (error) {
    console.error('[Supabase] Get team members error:', error);
    throw error;
  }

  return data as User[];
}

/**
 * Update user role (admin only)
 */
export async function updateUserRole(
  userId: string,
  role: User['role']
) {
  const { data, error } = await supabase
    .from('users')
    .update({ role, updated_at: new Date().toISOString() })
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    console.error('[Supabase] Update user role error:', error);
    throw error;
  }

  return data as User;
}

/**
 * Invite user to organization (creates pending invitation)
 */
export async function inviteUser(
  email: string,
  organizationId: string,
  role: User['role'] = 'viewer'
) {
  // Note: This is a placeholder. In production, you'd:
  // 1. Create invitation record in separate invitations table
  // 2. Send invitation email via edge function
  // 3. User accepts and completes signup
  
  console.log('[Supabase] Invite user:', { email, organizationId, role });
  
  // For now, return invitation data structure
  return {
    email,
    organizationId,
    role,
    status: 'pending',
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  };
}

// ============================================================================
// PERMISSIONS & AUTHORIZATION
// ============================================================================

/**
 * Check if user has permission
 */
export async function userHasPermission(
  userId: string,
  requiredRole: User['role'][]
): Promise<boolean> {
  const user = await getUser(userId);
  return requiredRole.includes(user.role);
}

/**
 * Check if user is admin
 */
export async function userIsAdmin(userId: string): Promise<boolean> {
  return userHasPermission(userId, ['owner', 'admin']);
}

/**
 * Check if user can manage events
 */
export async function userCanManageEvents(userId: string): Promise<boolean> {
  return userHasPermission(userId, ['owner', 'admin', 'organizer']);
}

// ============================================================================
// STATISTICS
// ============================================================================

/**
 * Get organization user statistics
 */
export async function getUserStats(organizationId: string) {
  const { data, error } = await supabase
    .from('users')
    .select('role')
    .eq('organization_id', organizationId);

  if (error) {
    console.error('[Supabase] Get user stats error:', error);
    throw error;
  }

  const stats = {
    total: data.length,
    owners: data.filter(u => u.role === 'owner').length,
    admins: data.filter(u => u.role === 'admin').length,
    organizers: data.filter(u => u.role === 'organizer').length,
    viewers: data.filter(u => u.role === 'viewer').length,
  };

  return stats;
}

/**
 * Search users by name or email
 */
export async function searchUsers(organizationId: string, query: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('organization_id', organizationId)
    .or(`full_name.ilike.%${query}%,email.ilike.%${query}%`)
    .order('full_name', { ascending: true });

  if (error) {
    console.error('[Supabase] Search users error:', error);
    throw error;
  }

  return data as User[];
}

// ============================================================================
// REALTIME SUBSCRIPTIONS
// ============================================================================

/**
 * Subscribe to user updates
 */
export function subscribeToUser(
  userId: string,
  callback: (user: User) => void
) {
  const channel = supabase
    .channel(`user:${userId}`)
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'users',
        filter: `id=eq.${userId}`,
      },
      (payload) => {
        callback(payload.new as User);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

/**
 * Subscribe to organization users
 */
export function subscribeToOrganizationUsers(
  organizationId: string,
  callback: (payload: any) => void
) {
  const channel = supabase
    .channel(`users:org=${organizationId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'users',
        filter: `organization_id=eq.${organizationId}`,
      },
      callback
    )
    .subscribe();

  return channel;
}
