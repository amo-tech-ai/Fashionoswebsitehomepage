/**
 * Supabase Client Configuration
 * 
 * Provides type-safe Supabase client for database operations.
 * Automatically handles authentication and connection pooling.
 * 
 * Usage:
 * ```typescript
 * import { supabase } from '@/lib/supabase/client';
 * 
 * const { data, error } = await supabase
 *   .from('events')
 *   .select('*');
 * ```
 */

import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// ============================================================================
// ENVIRONMENT CONFIGURATION
// ============================================================================
// TODO: Replace these placeholder values with your actual Supabase credentials
// 1. Create a Supabase project at https://supabase.com
// 2. Go to Project Settings > API
// 3. Copy your Project URL and anon/public key
// 4. Replace the values below

const supabaseUrl = 'YOUR_SUPABASE_URL_HERE';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY_HERE';

// ============================================================================
// CLIENT SETUP
// ============================================================================

// Check if credentials are configured
const isConfigured = 
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'YOUR_SUPABASE_URL_HERE' &&
  supabaseAnonKey !== 'YOUR_SUPABASE_ANON_KEY_HERE' &&
  supabaseUrl.startsWith('http');

// Silent fallback to mock mode if not configured
// To enable database persistence, see /docs/SUPABASE-SETUP-GUIDE.md

// Create Supabase client with type safety (or use placeholder for development)
export const supabase = createClient<Database>(
  isConfigured ? supabaseUrl : 'https://placeholder.supabase.co',
  isConfigured ? supabaseAnonKey : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTI4MDAsImV4cCI6MTk2MDc2ODgwMH0.placeholder',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
    realtime: {
      params: {
        eventsPerSecond: 10,
      },
    },
    global: {
      headers: {
        'X-Client-Info': 'fashionos-web',
      },
    },
  }
);

/**
 * Check if Supabase is configured
 */
export function isSupabaseConfigured(): boolean {
  return isConfigured;
}

/**
 * Test Supabase connection
 */
export async function testConnection(): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    return {
      success: false,
      error: 'Supabase credentials not configured',
    };
  }

  try {
    const { error } = await supabase.from('events').select('id').limit(1);
    
    if (error) {
      return {
        success: false,
        error: `Database query failed: ${error.message}`,
      };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Get current user session
 */
export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error) {
    return null;
  }
  
  return user;
}

/**
 * Sign out current user
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    throw error;
  }
}

/**
 * Get Supabase client instance
 * Use this if you need the client directly instead of the singleton
 */
export function getSupabaseClient() {
  return supabase;
}

/**
 * Create a new Supabase client (for compatibility)
 * Returns the singleton instance
 */
export function createSupabaseClient() {
  return supabase;
}