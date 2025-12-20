/**
 * Form Validation Hooks
 * 
 * Custom hooks for integrating Zod validation with React Hook Form.
 * Provides type-safe form handling with automatic error messages.
 * 
 * Usage:
 * ```typescript
 * import { useEventForm } from '@/lib/hooks/useFormValidation';
 * 
 * function EventForm() {
 *   const { form, onSubmit, isSubmitting } = useEventForm({
 *     onSuccess: (data) => console.log('Event created:', data),
 *   });
 * 
 *   return (
 *     <Form {...form}>
 *       <form onSubmit={form.handleSubmit(onSubmit)}>
 *         {/* Form fields... *\/}
 *       </form>
 *     </Form>
 *   );
 * }
 * ```
 */

import { useForm } from 'react-hook-form@7.55.0';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import {
  eventSchema,
  taskSchema,
  sponsorSchema,
  budgetItemSchema,
  campaignSchema,
  contactFormSchema,
  newsletterSchema,
  type EventFormData,
  type TaskFormData,
  type SponsorFormData,
  type BudgetItemFormData,
  type CampaignFormData,
  type ContactFormData,
  type NewsletterFormData,
} from '../validation/schemas';

// ============================================================================
// EVENT FORM
// ============================================================================

export function useEventForm(options: {
  defaultValues?: Partial<EventFormData>;
  onSuccess: (data: EventFormData) => Promise<void> | void;
  onError?: (error: Error) => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: options.defaultValues || {
      name: '',
      type: 'runway_show',
      status: 'planning',
      budget_total: 0,
    },
  });

  const onSubmit = async (data: EventFormData) => {
    setIsSubmitting(true);
    try {
      await options.onSuccess(data);
    } catch (error) {
      options.onError?.(error as Error);
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    onSubmit,
    isSubmitting,
    errors: form.formState.errors,
    isDirty: form.formState.isDirty,
    isValid: form.formState.isValid,
  };
}

// ============================================================================
// TASK FORM
// ============================================================================

export function useTaskForm(options: {
  defaultValues?: Partial<TaskFormData>;
  onSuccess: (data: TaskFormData) => Promise<void> | void;
  onError?: (error: Error) => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: options.defaultValues || {
      title: '',
      status: 'to_do',
      priority: 'medium',
      workflow_phase: 'pre_production',
      workflow_category: 'event_planning',
      is_critical_path: false,
      dependency_task_ids: [],
    },
  });

  const onSubmit = async (data: TaskFormData) => {
    setIsSubmitting(true);
    try {
      await options.onSuccess(data);
    } catch (error) {
      options.onError?.(error as Error);
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    onSubmit,
    isSubmitting,
    errors: form.formState.errors,
    isDirty: form.formState.isDirty,
    isValid: form.formState.isValid,
  };
}

// ============================================================================
// SPONSOR FORM
// ============================================================================

export function useSponsorForm(options: {
  defaultValues?: Partial<SponsorFormData>;
  onSuccess: (data: SponsorFormData) => Promise<void> | void;
  onError?: (error: Error) => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SponsorFormData>({
    resolver: zodResolver(sponsorSchema),
    defaultValues: options.defaultValues || {
      company_name: '',
      tier: 'partner',
      status: 'lead',
      value: 0,
    },
  });

  const onSubmit = async (data: SponsorFormData) => {
    setIsSubmitting(true);
    try {
      await options.onSuccess(data);
    } catch (error) {
      options.onError?.(error as Error);
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    onSubmit,
    isSubmitting,
    errors: form.formState.errors,
    isDirty: form.formState.isDirty,
    isValid: form.formState.isValid,
  };
}

// ============================================================================
// BUDGET ITEM FORM
// ============================================================================

export function useBudgetItemForm(options: {
  defaultValues?: Partial<BudgetItemFormData>;
  onSuccess: (data: BudgetItemFormData) => Promise<void> | void;
  onError?: (error: Error) => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<BudgetItemFormData>({
    resolver: zodResolver(budgetItemSchema),
    defaultValues: options.defaultValues || {
      category: '',
      item_name: '',
      budgeted_amount: 0,
      actual_amount: 0,
      status: 'planned',
    },
  });

  const onSubmit = async (data: BudgetItemFormData) => {
    setIsSubmitting(true);
    try {
      await options.onSuccess(data);
    } catch (error) {
      options.onError?.(error as Error);
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    onSubmit,
    isSubmitting,
    errors: form.formState.errors,
    isDirty: form.formState.isDirty,
    isValid: form.formState.isValid,
  };
}

// ============================================================================
// CAMPAIGN FORM
// ============================================================================

export function useCampaignForm(options: {
  defaultValues?: Partial<CampaignFormData>;
  onSuccess: (data: CampaignFormData) => Promise<void> | void;
  onError?: (error: Error) => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CampaignFormData>({
    resolver: zodResolver(campaignSchema),
    defaultValues: options.defaultValues || {
      name: '',
      status: 'draft',
    },
  });

  const onSubmit = async (data: CampaignFormData) => {
    setIsSubmitting(true);
    try {
      await options.onSuccess(data);
    } catch (error) {
      options.onError?.(error as Error);
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    onSubmit,
    isSubmitting,
    errors: form.formState.errors,
    isDirty: form.formState.isDirty,
    isValid: form.formState.isValid,
  };
}

// ============================================================================
// CONTACT FORM
// ============================================================================

export function useContactForm(options: {
  defaultValues?: Partial<ContactFormData>;
  onSuccess: (data: ContactFormData) => Promise<void> | void;
  onError?: (error: Error) => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: options.defaultValues || {
      name: '',
      email: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      await options.onSuccess(data);
    } catch (error) {
      options.onError?.(error as Error);
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    onSubmit,
    isSubmitting,
    errors: form.formState.errors,
    isDirty: form.formState.isDirty,
    isValid: form.formState.isValid,
  };
}

// ============================================================================
// NEWSLETTER FORM
// ============================================================================

export function useNewsletterForm(options: {
  onSuccess: (data: NewsletterFormData) => Promise<void> | void;
  onError?: (error: Error) => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: '',
      consent: false,
    },
  });

  const onSubmit = async (data: NewsletterFormData) => {
    setIsSubmitting(true);
    try {
      await options.onSuccess(data);
      form.reset(); // Reset form after successful submission
    } catch (error) {
      options.onError?.(error as Error);
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    onSubmit,
    isSubmitting,
    errors: form.formState.errors,
    isDirty: form.formState.isDirty,
    isValid: form.formState.isValid,
  };
}

// ============================================================================
// GENERIC FORM HOOK
// ============================================================================

export function useValidatedForm<T>(options: {
  schema: any; // Zod schema
  defaultValues?: Partial<T>;
  onSuccess: (data: T) => Promise<void> | void;
  onError?: (error: Error) => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<T>({
    resolver: zodResolver(options.schema),
    defaultValues: options.defaultValues,
  });

  const onSubmit = async (data: T) => {
    setIsSubmitting(true);
    try {
      await options.onSuccess(data);
    } catch (error) {
      options.onError?.(error as Error);
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    onSubmit,
    isSubmitting,
    errors: form.formState.errors,
    isDirty: form.formState.isDirty,
    isValid: form.formState.isValid,
  };
}

// ============================================================================
// BRAND SHOOT FORM
// ============================================================================

export function useBrandShootForm(options: {
  defaultValues?: Partial<CampaignFormData>;
  onSuccess: (data: CampaignFormData) => Promise<void> | void;
  onError?: (error: Error) => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CampaignFormData>({
    resolver: zodResolver(campaignSchema),
    defaultValues: options.defaultValues || {
      name: '',
      website: '',
      instagram: '',
      commerce: '',
      budget: 0,
    },
  });

  const onSubmit = async (data: CampaignFormData) => {
    setIsSubmitting(true);
    try {
      await options.onSuccess(data);
    } catch (error) {
      options.onError?.(error as Error);
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    onSubmit,
    isSubmitting,
    errors: form.formState.errors,
    isDirty: form.formState.isDirty,
    isValid: form.formState.isValid,
  };
}