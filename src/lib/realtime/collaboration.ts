/**
 * Realtime Collaboration Utilities
 * 
 * Provides realtime features for team collaboration:
 * - Live presence (who's online)
 * - Live cursors/typing indicators
 * - Activity feed
 * - Notification system
 * - Conflict resolution
 * 
 * Built on Supabase Realtime.
 * 
 * Usage:
 * ```typescript
 * const presence = usePresence('event-123');
 * const activity = useActivityFeed('event-123');
 * ```
 */

import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../supabase/client';
import type { RealtimeChannel } from '@supabase/supabase-js';

// ============================================================================
// TYPES
// ============================================================================

export interface UserPresence {
  user_id: string;
  user_name: string;
  avatar_url?: string;
  status: 'online' | 'away' | 'busy';
  last_seen: string;
  current_page?: string;
}

export interface ActivityEvent {
  id: string;
  event_id: string;
  user_id: string;
  user_name: string;
  action: string; // e.g., "created", "updated", "deleted", "commented"
  resource_type: string; // e.g., "task", "sponsor", "budget_item"
  resource_id: string;
  resource_name: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface TypeIndicator {
  user_id: string;
  user_name: string;
  resource_type: string;
  resource_id: string;
}

// ============================================================================
// PRESENCE HOOKS
// ============================================================================

/**
 * Track and display who's currently viewing an event/resource
 */
export function usePresence(eventId: string) {
  const [users, setUsers] = useState<UserPresence[]>([]);
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);

  useEffect(() => {
    if (!eventId) return;

    // Create presence channel
    const presenceChannel = supabase.channel(`presence:event:${eventId}`, {
      config: {
        presence: {
          key: eventId,
        },
      },
    });

    // Track presence changes
    presenceChannel
      .on('presence', { event: 'sync' }, () => {
        const state = presenceChannel.presenceState();
        const presentUsers = Object.values(state).flat() as UserPresence[];
        setUsers(presentUsers);
      })
      .on('presence', { event: 'join' }, ({ newPresences }) => {
        console.log('[Presence] User joined:', newPresences);
      })
      .on('presence', { event: 'leave' }, ({ leftPresences }) => {
        console.log('[Presence] User left:', leftPresences);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          // Track current user
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            await presenceChannel.track({
              user_id: user.id,
              user_name: user.email?.split('@')[0] || 'Anonymous',
              status: 'online',
              last_seen: new Date().toISOString(),
              current_page: window.location.pathname,
            });
          }
        }
      });

    setChannel(presenceChannel);

    // Cleanup
    return () => {
      presenceChannel.unsubscribe();
    };
  }, [eventId]);

  // Update presence when user changes page
  const updatePresence = useCallback(async (updates: Partial<UserPresence>) => {
    if (channel) {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await channel.track({
          user_id: user.id,
          user_name: user.email?.split('@')[0] || 'Anonymous',
          status: 'online',
          last_seen: new Date().toISOString(),
          ...updates,
        });
      }
    }
  }, [channel]);

  return {
    users,
    online_count: users.length,
    updatePresence,
  };
}

// ============================================================================
// ACTIVITY FEED
// ============================================================================

/**
 * Track and display live activity feed for an event
 */
export function useActivityFeed(eventId: string, limit: number = 50) {
  const [activities, setActivities] = useState<ActivityEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!eventId) return;

    // Load initial activities (from database if you have an activities table)
    // For now, we'll just track live changes
    setLoading(false);

    // Subscribe to realtime changes
    const channel = supabase
      .channel(`activity:event:${eventId}`)
      .on('broadcast', { event: 'activity' }, (payload) => {
        const activity = payload.payload as ActivityEvent;
        setActivities((prev) => [activity, ...prev].slice(0, limit));
      })
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [eventId, limit]);

  // Log activity
  const logActivity = useCallback(async (
    action: string,
    resourceType: string,
    resourceId: string,
    resourceName: string,
    metadata?: Record<string, any>
  ) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const activity: ActivityEvent = {
      id: `${Date.now()}-${Math.random()}`,
      event_id: eventId,
      user_id: user.id,
      user_name: user.email?.split('@')[0] || 'Anonymous',
      action,
      resource_type: resourceType,
      resource_id: resourceId,
      resource_name: resourceName,
      timestamp: new Date().toISOString(),
      metadata,
    };

    // Broadcast to all subscribers
    const channel = supabase.channel(`activity:event:${eventId}`);
    await channel.send({
      type: 'broadcast',
      event: 'activity',
      payload: activity,
    });
  }, [eventId]);

  return {
    activities,
    loading,
    logActivity,
  };
}

// ============================================================================
// TYPING INDICATORS
// ============================================================================

/**
 * Show who's currently editing/typing
 */
export function useTypingIndicator(resourceId: string) {
  const [typing, setTyping] = useState<TypeIndicator[]>([]);
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);

  useEffect(() => {
    if (!resourceId) return;

    const typingChannel = supabase.channel(`typing:${resourceId}`);

    typingChannel
      .on('broadcast', { event: 'typing' }, (payload) => {
        const indicator = payload.payload as TypeIndicator & { is_typing: boolean };
        
        setTyping((prev) => {
          if (indicator.is_typing) {
            // Add or update typing indicator
            const exists = prev.find(t => t.user_id === indicator.user_id);
            if (exists) return prev;
            return [...prev, indicator];
          } else {
            // Remove typing indicator
            return prev.filter(t => t.user_id !== indicator.user_id);
          }
        });
      })
      .subscribe();

    setChannel(typingChannel);

    return () => {
      typingChannel.unsubscribe();
    };
  }, [resourceId]);

  // Start typing
  const startTyping = useCallback(async (resourceType: string) => {
    if (!channel) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await channel.send({
      type: 'broadcast',
      event: 'typing',
      payload: {
        user_id: user.id,
        user_name: user.email?.split('@')[0] || 'Anonymous',
        resource_type: resourceType,
        resource_id: resourceId,
        is_typing: true,
      },
    });
  }, [channel, resourceId]);

  // Stop typing
  const stopTyping = useCallback(async () => {
    if (!channel) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await channel.send({
      type: 'broadcast',
      event: 'typing',
      payload: {
        user_id: user.id,
        is_typing: false,
      },
    });
  }, [channel]);

  return {
    typing_users: typing,
    startTyping,
    stopTyping,
  };
}

// ============================================================================
// NOTIFICATIONS
// ============================================================================

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  action_url?: string;
  action_label?: string;
  read: boolean;
  created_at: string;
}

/**
 * Realtime notifications
 */
export function useNotifications(userId: string) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unread_count, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!userId) return;

    // Subscribe to user's notifications channel
    const channel = supabase
      .channel(`notifications:${userId}`)
      .on('broadcast', { event: 'notification' }, (payload) => {
        const notification = payload.payload as Notification;
        setNotifications((prev) => [notification, ...prev]);
        setUnreadCount((prev) => prev + 1);
      })
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [userId]);

  // Mark as read
  const markAsRead = useCallback((notificationId: string) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === notificationId ? { ...n, read: true } : n
      )
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
  }, []);

  // Mark all as read
  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnreadCount(0);
  }, []);

  return {
    notifications,
    unread_count,
    markAsRead,
    markAllAsRead,
  };
}

// ============================================================================
// CONFLICT RESOLUTION
// ============================================================================

export interface ConflictData {
  resource_type: string;
  resource_id: string;
  field: string;
  local_value: any;
  remote_value: any;
  local_timestamp: string;
  remote_timestamp: string;
  conflicting_user: string;
}

/**
 * Detect and handle edit conflicts
 */
export function useConflictDetection(resourceId: string) {
  const [conflicts, setConflicts] = useState<ConflictData[]>([]);

  // Detect conflict
  const checkConflict = useCallback(async (
    field: string,
    localValue: any,
    localTimestamp: string
  ): Promise<ConflictData | null> => {
    // In a real implementation, you would:
    // 1. Fetch the latest version from the database
    // 2. Compare timestamps
    // 3. Compare values
    // 4. Return conflict if they don't match

    // Mock implementation
    return null;
  }, [resourceId]);

  // Resolve conflict
  const resolveConflict = useCallback((
    conflictId: string,
    resolution: 'keep_local' | 'keep_remote' | 'merge'
  ) => {
    setConflicts((prev) => prev.filter((c) => c.resource_id !== conflictId));
    
    // In a real implementation:
    // - Apply the resolution strategy
    // - Update the database
    // - Notify other users
  }, []);

  return {
    conflicts,
    checkConflict,
    resolveConflict,
  };
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Format activity message
 */
export function formatActivityMessage(activity: ActivityEvent): string {
  const { user_name, action, resource_type, resource_name } = activity;
  
  const actionVerbs: Record<string, string> = {
    created: 'created',
    updated: 'updated',
    deleted: 'deleted',
    commented: 'commented on',
    assigned: 'assigned',
    completed: 'completed',
    approved: 'approved',
    rejected: 'rejected',
  };

  const verb = actionVerbs[action] || action;
  const resourceLabel = resource_type.replace('_', ' ');

  return `${user_name} ${verb} ${resourceLabel} "${resource_name}"`;
}

/**
 * Get relative time string
 */
export function getRelativeTime(timestamp: string): string {
  const now = new Date();
  const then = new Date(timestamp);
  const seconds = Math.floor((now.getTime() - then.getTime()) / 1000);

  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  
  return then.toLocaleDateString();
}
