/**
 * FashionOS Library Index
 * 
 * Central export point for all library modules.
 * Import from here for clean, organized imports.
 */

// ============================================================================
// SUPABASE
// ============================================================================
export * from './supabase/client';
export * from './supabase/queries';
export * from './supabase/queries/campaigns';
export * from './supabase/queries/users';
export * from './supabase/queries/organizations';
export * from './supabase/queries/analytics';
export * from './supabase/storage';
export * from './supabase/fileQueries';
export type { Database } from './supabase/types';

// ============================================================================
// AUTHENTICATION
// ============================================================================
export { AuthProvider, useAuth, useRequireAuth, usePermissions } from './auth/AuthContext';

// ============================================================================
// AI SERVICES
// ============================================================================
export * from './ai/services/contract-analyzer';
export * from './ai/services/task-generator';
export * from './ai/gemini';

// ============================================================================
// VALIDATION
// ============================================================================
export * from './validation/schemas';

// ============================================================================
// UTILITIES
// ============================================================================
export * from './utils/business-logic';
export { cn } from './utils';

// ============================================================================
// HOOKS
// ============================================================================
export * from './hooks';

// ============================================================================
// TYPES
// ============================================================================
export * from './types';
