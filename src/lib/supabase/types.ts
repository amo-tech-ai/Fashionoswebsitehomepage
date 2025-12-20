/**
 * Supabase Database Type Definitions
 * 
 * Auto-generated types for type-safe database queries.
 * These match the database schema defined in migrations.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      // Organizations
      organizations: {
        Row: {
          id: string
          name: string
          slug: string
          logo_url: string | null
          plan: 'free' | 'pro' | 'enterprise'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          logo_url?: string | null
          plan?: 'free' | 'pro' | 'enterprise'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          logo_url?: string | null
          plan?: 'free' | 'pro' | 'enterprise'
          updated_at?: string
        }
      }
      
      // Users
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          role: 'owner' | 'admin' | 'organizer' | 'viewer'
          organization_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'owner' | 'admin' | 'organizer' | 'viewer'
          organization_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'owner' | 'admin' | 'organizer' | 'viewer'
          organization_id?: string
          updated_at?: string
        }
      }

      // Events
      events: {
        Row: {
          id: string
          name: string
          description: string | null
          type: 'runway_show' | 'photoshoot' | 'activation' | 'popup' | 'campaign'
          status: 'planning' | 'active' | 'completed' | 'cancelled'
          start_date: string
          end_date: string | null
          venue_name: string | null
          venue_address: string | null
          budget_total: number
          budget_actual: number
          attendee_target: number | null
          attendee_registered: number | null
          progress_percentage: number
          organization_id: string
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          type?: 'runway_show' | 'photoshoot' | 'activation' | 'popup' | 'campaign'
          status?: 'planning' | 'active' | 'completed' | 'cancelled'
          start_date: string
          end_date?: string | null
          venue_name?: string | null
          venue_address?: string | null
          budget_total?: number
          budget_actual?: number
          attendee_target?: number | null
          attendee_registered?: number | null
          progress_percentage?: number
          organization_id: string
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          description?: string | null
          type?: 'runway_show' | 'photoshoot' | 'activation' | 'popup' | 'campaign'
          status?: 'planning' | 'active' | 'completed' | 'cancelled'
          start_date?: string
          end_date?: string | null
          venue_name?: string | null
          venue_address?: string | null
          budget_total?: number
          budget_actual?: number
          attendee_target?: number | null
          attendee_registered?: number | null
          progress_percentage?: number
          updated_at?: string
        }
      }

      // Tasks
      tasks: {
        Row: {
          id: string
          event_id: string
          title: string
          description: string | null
          status: 'to_do' | 'in_progress' | 'done' | 'blocked'
          priority: 'critical' | 'high' | 'medium' | 'low'
          workflow_phase: 'pre_production' | 'venue_logistics' | 'creative_design' | 'on_site' | 'post_event'
          workflow_category: 'event_planning' | 'sponsorship' | 'marketing' | 'operations' | 'media'
          is_critical_path: boolean
          deadline: string | null
          assigned_to: string | null
          dependency_task_ids: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          event_id: string
          title: string
          description?: string | null
          status?: 'to_do' | 'in_progress' | 'done' | 'blocked'
          priority?: 'critical' | 'high' | 'medium' | 'low'
          workflow_phase?: 'pre_production' | 'venue_logistics' | 'creative_design' | 'on_site' | 'post_event'
          workflow_category?: 'event_planning' | 'sponsorship' | 'marketing' | 'operations' | 'media'
          is_critical_path?: boolean
          deadline?: string | null
          assigned_to?: string | null
          dependency_task_ids?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          title?: string
          description?: string | null
          status?: 'to_do' | 'in_progress' | 'done' | 'blocked'
          priority?: 'critical' | 'high' | 'medium' | 'low'
          workflow_phase?: 'pre_production' | 'venue_logistics' | 'creative_design' | 'on_site' | 'post_event'
          workflow_category?: 'event_planning' | 'sponsorship' | 'marketing' | 'operations' | 'media'
          is_critical_path?: boolean
          deadline?: string | null
          assigned_to?: string | null
          dependency_task_ids?: string[]
          updated_at?: string
        }
      }

      // Sponsors
      sponsors: {
        Row: {
          id: string
          event_id: string
          company_name: string
          contact_name: string | null
          contact_email: string | null
          contact_phone: string | null
          tier: 'platinum' | 'gold' | 'silver' | 'bronze' | 'partner'
          status: 'lead' | 'contacted' | 'negotiating' | 'committed' | 'confirmed' | 'declined'
          value: number
          fit_score: number | null
          notes: string | null
          logo_url: string | null
          website: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          event_id: string
          company_name: string
          contact_name?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          tier?: 'platinum' | 'gold' | 'silver' | 'bronze' | 'partner'
          status?: 'lead' | 'contacted' | 'negotiating' | 'committed' | 'confirmed' | 'declined'
          value?: number
          fit_score?: number | null
          notes?: string | null
          logo_url?: string | null
          website?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          company_name?: string
          contact_name?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          tier?: 'platinum' | 'gold' | 'silver' | 'bronze' | 'partner'
          status?: 'lead' | 'contacted' | 'negotiating' | 'committed' | 'confirmed' | 'declined'
          value?: number
          fit_score?: number | null
          notes?: string | null
          logo_url?: string | null
          website?: string | null
          updated_at?: string
        }
      }

      // Budget Items
      budget_items: {
        Row: {
          id: string
          event_id: string
          category: string
          item_name: string
          budgeted_amount: number
          actual_amount: number
          status: 'planned' | 'committed' | 'paid' | 'overdue'
          vendor: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          event_id: string
          category: string
          item_name: string
          budgeted_amount: number
          actual_amount?: number
          status?: 'planned' | 'committed' | 'paid' | 'overdue'
          vendor?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          category?: string
          item_name?: string
          budgeted_amount?: number
          actual_amount?: number
          status?: 'planned' | 'committed' | 'paid' | 'overdue'
          vendor?: string | null
          notes?: string | null
          updated_at?: string
        }
      }

      // Assets (Gallery)
      assets: {
        Row: {
          id: string
          event_id: string
          name: string
          type: 'image' | 'video'
          status: 'pending' | 'approved' | 'rejected'
          file_url: string
          thumbnail_url: string | null
          ai_score: number | null
          ai_feedback: string | null
          uploaded_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          event_id: string
          name: string
          type: 'image' | 'video'
          status?: 'pending' | 'approved' | 'rejected'
          file_url: string
          thumbnail_url?: string | null
          ai_score?: number | null
          ai_feedback?: string | null
          uploaded_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          status?: 'pending' | 'approved' | 'rejected'
          ai_score?: number | null
          ai_feedback?: string | null
          updated_at?: string
        }
      }

      // Campaigns (Brand Shoot)
      campaigns: {
        Row: {
          id: string
          organization_id: string
          name: string
          brand_signals: Json
          strategy: Json
          assets: Json
          channel_packs: Json
          pricing: Json
          status: 'draft' | 'proposed' | 'approved' | 'in_production' | 'completed'
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          organization_id: string
          name: string
          brand_signals?: Json
          strategy?: Json
          assets?: Json
          channel_packs?: Json
          pricing?: Json
          status?: 'draft' | 'proposed' | 'approved' | 'in_production' | 'completed'
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          brand_signals?: Json
          strategy?: Json
          assets?: Json
          channel_packs?: Json
          pricing?: Json
          status?: 'draft' | 'proposed' | 'approved' | 'in_production' | 'completed'
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
