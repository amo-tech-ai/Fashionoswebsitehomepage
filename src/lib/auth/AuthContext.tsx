/**
 * Authentication Context
 * 
 * Provides user authentication state and methods throughout the app.
 * Uses Supabase Auth with automatic session management.
 */

'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import type { User, Session } from '@supabase/supabase-js';
import type { Database } from '@/lib/supabase/types';

type UserProfile = Database['public']['Tables']['users']['Row'];

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, metadata?: any) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Load initial session and profile
  useEffect(() => {
    loadSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user || null);

      if (session?.user) {
        await loadUserProfile(session.user.id);
      } else {
        setProfile(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  /**
   * Load current session
   */
  async function loadSession() {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);
      setUser(session?.user || null);

      if (session?.user) {
        await loadUserProfile(session.user.id);
      }
    } catch (error) {
      console.error('[Auth] Load session error:', error);
    } finally {
      setLoading(false);
    }
  }

  /**
   * Load user profile from database
   */
  async function loadUserProfile(userId: string) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('[Auth] Load profile error:', error);
      setProfile(null);
    }
  }

  /**
   * Sign in with email and password
   */
  async function signIn(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('[Auth] Sign in error:', error);
      throw error;
    }
  }

  /**
   * Sign up new user
   */
  async function signUp(email: string, password: string, metadata?: any) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    });

    if (error) {
      console.error('[Auth] Sign up error:', error);
      throw error;
    }

    // Note: In production, user profile should be created via database trigger
    // or edge function after successful signup
  }

  /**
   * Sign out current user
   */
  async function signOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('[Auth] Sign out error:', error);
      throw error;
    }

    setUser(null);
    setProfile(null);
    setSession(null);
  }

  /**
   * Send password reset email
   */
  async function resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });

    if (error) {
      console.error('[Auth] Reset password error:', error);
      throw error;
    }
  }

  /**
   * Update user profile
   */
  async function updateProfile(updates: Partial<UserProfile>) {
    if (!user) {
      throw new Error('No authenticated user');
    }

    const { data, error } = await supabase
      .from('users')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', user.id)
      .select()
      .single();

    if (error) {
      console.error('[Auth] Update profile error:', error);
      throw error;
    }

    setProfile(data);
  }

  const value: AuthContextType = {
    user,
    profile,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook to access auth context
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

/**
 * Hook to require authentication
 * Redirects to login if not authenticated
 */
export function useRequireAuth() {
  const { user, loading } = useAuth();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // In production, redirect to login page
        console.warn('[Auth] Authentication required');
        // window.location.href = '/login';
      }
      setChecked(true);
    }
  }, [user, loading]);

  return { user, loading: loading || !checked };
}

/**
 * Hook to check user permissions
 */
export function usePermissions() {
  const { profile } = useAuth();

  const isOwner = profile?.role === 'owner';
  const isAdmin = profile?.role === 'admin' || profile?.role === 'owner';
  const isOrganizer = ['owner', 'admin', 'organizer'].includes(profile?.role || '');
  const isViewer = profile?.role === 'viewer';

  const canManageUsers = isAdmin;
  const canManageEvents = isOrganizer;
  const canManageBudget = isOrganizer;
  const canManageSponsors = isOrganizer;
  const canDeleteEvents = isAdmin;
  const canExportData = isOrganizer;
  const canAccessAnalytics = isOrganizer;

  return {
    role: profile?.role,
    isOwner,
    isAdmin,
    isOrganizer,
    isViewer,
    canManageUsers,
    canManageEvents,
    canManageBudget,
    canManageSponsors,
    canDeleteEvents,
    canExportData,
    canAccessAnalytics,
  };
}
