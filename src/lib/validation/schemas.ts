/**
 * Validation Schemas (Zod)
 * 
 * Type-safe validation for all forms in FashionOS.
 * Used with React Hook Form for client-side validation.
 * 
 * Usage:
 * ```typescript
 * import { eventSchema } from '@/lib/validation/schemas';
 * import { zodResolver } from '@hookform/resolvers/zod';
 * import { useForm } from 'react-hook-form';
 * 
 * const form = useForm({
 *   resolver: zodResolver(eventSchema),
 * });
 * ```
 */

import { z } from 'zod';

// ============================================================================
// EVENT SCHEMAS
// ============================================================================

export const eventSchema = z.object({
  name: z.string()
    .min(3, 'Event name must be at least 3 characters')
    .max(100, 'Event name must be less than 100 characters'),
  
  description: z.string()
    .max(500, 'Description must be less than 500 characters')
    .optional()
    .nullable(),
  
  type: z.enum(['runway_show', 'photoshoot', 'activation', 'popup', 'campaign'], {
    errorMap: () => ({ message: 'Please select a valid event type' }),
  }),
  
  status: z.enum(['planning', 'active', 'completed', 'cancelled'])
    .default('planning'),
  
  start_date: z.string()
    .min(1, 'Start date is required'),
  
  end_date: z.string()
    .optional()
    .nullable(),
  
  venue_name: z.string()
    .max(200, 'Venue name must be less than 200 characters')
    .optional()
    .nullable(),
  
  venue_address: z.string()
    .max(300, 'Venue address must be less than 300 characters')
    .optional()
    .nullable(),
  
  budget_total: z.number()
    .min(0, 'Budget must be positive')
    .default(0),
  
  attendee_target: z.number()
    .min(0, 'Attendee target must be positive')
    .optional()
    .nullable(),
});

export type EventFormData = z.infer<typeof eventSchema>;

// ============================================================================
// TASK SCHEMAS
// ============================================================================

export const taskSchema = z.object({
  title: z.string()
    .min(3, 'Task title must be at least 3 characters')
    .max(200, 'Task title must be less than 200 characters'),
  
  description: z.string()
    .max(1000, 'Description must be less than 1000 characters')
    .optional()
    .nullable(),
  
  status: z.enum(['to_do', 'in_progress', 'done', 'blocked'])
    .default('to_do'),
  
  priority: z.enum(['critical', 'high', 'medium', 'low'])
    .default('medium'),
  
  workflow_phase: z.enum([
    'pre_production',
    'venue_logistics',
    'creative_design',
    'on_site',
    'post_event',
  ]).default('pre_production'),
  
  workflow_category: z.enum([
    'event_planning',
    'sponsorship',
    'marketing',
    'operations',
    'media',
  ]).default('event_planning'),
  
  is_critical_path: z.boolean().default(false),
  
  deadline: z.string()
    .optional()
    .nullable(),
  
  assigned_to: z.string()
    .optional()
    .nullable(),
  
  dependency_task_ids: z.array(z.string())
    .default([]),
});

export type TaskFormData = z.infer<typeof taskSchema>;

// ============================================================================
// SPONSOR SCHEMAS
// ============================================================================

export const sponsorSchema = z.object({
  company_name: z.string()
    .min(2, 'Company name must be at least 2 characters')
    .max(200, 'Company name must be less than 200 characters'),
  
  contact_name: z.string()
    .max(200, 'Contact name must be less than 200 characters')
    .optional()
    .nullable(),
  
  contact_email: z.string()
    .email('Invalid email address')
    .optional()
    .nullable(),
  
  contact_phone: z.string()
    .max(50, 'Phone must be less than 50 characters')
    .optional()
    .nullable(),
  
  tier: z.enum(['platinum', 'gold', 'silver', 'bronze', 'partner'])
    .default('partner'),
  
  status: z.enum([
    'lead',
    'contacted',
    'negotiating',
    'committed',
    'confirmed',
    'declined',
  ]).default('lead'),
  
  value: z.number()
    .min(0, 'Sponsorship value must be positive')
    .default(0),
  
  fit_score: z.number()
    .min(0, 'Fit score must be between 0-100')
    .max(100, 'Fit score must be between 0-100')
    .optional()
    .nullable(),
  
  notes: z.string()
    .max(1000, 'Notes must be less than 1000 characters')
    .optional()
    .nullable(),
  
  website: z.string()
    .url('Invalid website URL')
    .optional()
    .nullable()
    .or(z.literal('')),
});

export type SponsorFormData = z.infer<typeof sponsorSchema>;

// ============================================================================
// BUDGET SCHEMAS
// ============================================================================

export const budgetItemSchema = z.object({
  category: z.string()
    .min(2, 'Category must be at least 2 characters')
    .max(100, 'Category must be less than 100 characters'),
  
  item_name: z.string()
    .min(2, 'Item name must be at least 2 characters')
    .max(200, 'Item name must be less than 200 characters'),
  
  budgeted_amount: z.number()
    .min(0, 'Amount must be positive'),
  
  actual_amount: z.number()
    .min(0, 'Amount must be positive')
    .default(0),
  
  status: z.enum(['planned', 'committed', 'paid', 'overdue'])
    .default('planned'),
  
  vendor: z.string()
    .max(200, 'Vendor name must be less than 200 characters')
    .optional()
    .nullable(),
  
  notes: z.string()
    .max(500, 'Notes must be less than 500 characters')
    .optional()
    .nullable(),
});

export type BudgetItemFormData = z.infer<typeof budgetItemSchema>;

// ============================================================================
// BRAND SHOOT / CAMPAIGN SCHEMAS
// ============================================================================

export const brandSignalsSchema = z.object({
  website: z.string()
    .url('Invalid website URL')
    .or(z.literal('')),
  
  instagram: z.string()
    .max(100, 'Instagram handle must be less than 100 characters'),
  
  commerce: z.string()
    .url('Invalid commerce URL')
    .or(z.literal('')),
  
  files: z.array(z.object({
    name: z.string(),
    type: z.string(),
    url: z.string(),
  })).optional(),
});

export const campaignSchema = z.object({
  name: z.string()
    .min(3, 'Campaign name must be at least 3 characters')
    .max(100, 'Campaign name must be less than 100 characters'),
  
  brand_signals: brandSignalsSchema.optional(),
  
  strategy: z.object({
    title: z.string(),
    goal: z.string(),
    tone: z.string(),
    channels: z.array(z.string()),
  }).optional(),
  
  status: z.enum([
    'draft',
    'proposed',
    'approved',
    'in_production',
    'completed',
  ]).default('draft'),
});

export type CampaignFormData = z.infer<typeof campaignSchema>;

// ============================================================================
// CONTACT FORM SCHEMAS
// ============================================================================

export const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  
  email: z.string()
    .email('Invalid email address'),
  
  company: z.string()
    .max(200, 'Company name must be less than 200 characters')
    .optional(),
  
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
  
  phone: z.string()
    .max(50, 'Phone must be less than 50 characters')
    .optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// ============================================================================
// NEWSLETTER SCHEMAS
// ============================================================================

export const newsletterSchema = z.object({
  email: z.string()
    .email('Invalid email address'),
  
  consent: z.boolean()
    .refine(val => val === true, {
      message: 'You must agree to receive our newsletter',
    }),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;

// ============================================================================
// FILE UPLOAD SCHEMAS
// ============================================================================

export const fileUploadSchema = z.object({
  file: z.instanceof(File)
    .refine(file => file.size <= 10 * 1024 * 1024, {
      message: 'File must be less than 10MB',
    })
    .refine(
      file => ['image/jpeg', 'image/png', 'image/webp', 'video/mp4'].includes(file.type),
      {
        message: 'File must be JPEG, PNG, WebP, or MP4',
      }
    ),
  
  name: z.string()
    .min(1, 'File name is required')
    .max(200, 'File name must be less than 200 characters'),
  
  type: z.enum(['image', 'video']),
});

export type FileUploadData = z.infer<typeof fileUploadSchema>;

// ============================================================================
// ASSET SCHEMAS (Gallery)
// ============================================================================

export const assetSchema = z.object({
  name: z.string()
    .min(1, 'Asset name is required')
    .max(200, 'Asset name must be less than 200 characters'),
  
  type: z.enum(['image', 'video']),
  
  status: z.enum(['pending', 'approved', 'rejected'])
    .default('pending'),
  
  file_url: z.string()
    .url('Invalid file URL'),
});

export type AssetFormData = z.infer<typeof assetSchema>;

// ============================================================================
// DESIGNER PROFILE SCHEMAS
// ============================================================================

export const designerProfileSchema = z.object({
  name: z.string()
    .min(2, 'Designer name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  
  brand_name: z.string()
    .min(2, 'Brand name must be at least 2 characters')
    .max(100, 'Brand name must be less than 100 characters'),
  
  instagram: z.string()
    .max(100, 'Instagram handle must be less than 100 characters')
    .optional(),
  
  website: z.string()
    .url('Invalid website URL')
    .optional()
    .or(z.literal('')),
  
  bio: z.string()
    .max(500, 'Bio must be less than 500 characters')
    .optional(),
  
  specialty: z.string()
    .max(100, 'Specialty must be less than 100 characters')
    .optional(),
  
  portfolio_url: z.string()
    .url('Invalid portfolio URL')
    .optional()
    .or(z.literal('')),
});

export type DesignerProfileFormData = z.infer<typeof designerProfileSchema>;

// ============================================================================
// WEBSITE PROJECT SCHEMAS
// ============================================================================

export const websiteProjectSchema = z.object({
  project_name: z.string()
    .min(3, 'Project name must be at least 3 characters')
    .max(100, 'Project name must be less than 100 characters'),
  
  domain: z.string()
    .max(200, 'Domain must be less than 200 characters')
    .optional(),
  
  pages: z.array(z.object({
    name: z.string(),
    slug: z.string(),
    template: z.string().optional(),
  })).default([]),
  
  design_preferences: z.object({
    style: z.string().optional(),
    color_scheme: z.string().optional(),
    typography: z.string().optional(),
  }).optional(),
  
  status: z.enum(['planning', 'design', 'development', 'review', 'live'])
    .default('planning'),
});

export type WebsiteProjectFormData = z.infer<typeof websiteProjectSchema>;
