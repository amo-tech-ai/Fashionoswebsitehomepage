/**
 * Validation Layer — Validate AI Outputs Before Database Writes
 * 
 * Purpose: Prevent invalid AI data from corrupting database
 * Strategy: Schema validation + business rules + safety checks
 * Principle: Backend is authoritative, AI is advisory
 */

import { z } from "https://esm.sh/zod@3.22.4";

/**
 * Task Schema (for AI-generated tasks)
 */
export const TaskSchema = z.object({
  title: z.string().min(3).max(200),
  description: z.string().min(10).max(1000),
  phase_name: z.string(),
  priority: z.enum(["critical", "high", "medium", "low"]),
  estimated_hours: z.number().positive().max(100),
  deadline_days_before: z.number().nonnegative().max(365),
  dependencies: z.array(z.string()).optional(),
});

export type ValidatedTask = z.infer<typeof TaskSchema>;

/**
 * Sponsor Score Schema (for AI-generated sponsor scores)
 */
export const SponsorScoreSchema = z.object({
  sponsor_id: z.string().uuid(),
  fit_score: z.number().min(0).max(100),
  rationale: z.string().min(20).max(500),
  predicted_roi: z.object({
    min: z.number().nonnegative(),
    max: z.number().nonnegative(),
  }),
  recommended_actions: z.array(z.string()).max(5),
});

export type ValidatedSponsorScore = z.infer<typeof SponsorScoreSchema>;

/**
 * Brand Analysis Schema (for AI-generated brand insights)
 */
export const BrandAnalysisSchema = z.object({
  visual_style: z.enum(["minimalist", "maximalist", "vintage", "modern", "eclectic"]),
  color_palette: z.object({
    primary: z.string().regex(/^#[0-9A-F]{6}$/i),
    secondary: z.string().regex(/^#[0-9A-F]{6}$/i),
    accent: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
  }),
  brand_tone: z.enum(["luxury", "casual", "edgy", "professional", "playful"]),
  target_audience: z.string().min(20).max(300),
  recommended_shot_types: z.array(z.string()).min(5).max(20),
});

export type ValidatedBrandAnalysis = z.infer<typeof BrandAnalysisSchema>;

/**
 * Budget Recommendation Schema (for AI budget suggestions)
 */
export const BudgetRecommendationSchema = z.object({
  category: z.string(),
  current_allocated: z.number().nonnegative(),
  recommended_amount: z.number().nonnegative(),
  difference: z.number(),
  rationale: z.string().min(20).max(300),
  priority: z.enum(["essential", "recommended", "optional"]),
});

export type ValidatedBudgetRecommendation = z.infer<typeof BudgetRecommendationSchema>;

/**
 * Risk Assessment Schema (for AI risk detection)
 */
export const RiskAssessmentSchema = z.object({
  risk_type: z.enum(["timeline", "budget", "resource", "dependency", "external"]),
  severity: z.enum(["critical", "high", "medium", "low"]),
  description: z.string().min(20).max(500),
  impact: z.string().min(20).max(300),
  probability: z.number().min(0).max(1), // 0.0 to 1.0
  mitigation_strategies: z.array(z.string()).min(1).max(5),
  estimated_cost_to_fix: z.number().nonnegative().optional(),
});

export type ValidatedRiskAssessment = z.infer<typeof RiskAssessmentSchema>;

/**
 * Validation Result Type
 */
export interface ValidationResult<T> {
  valid: boolean;
  data?: T;
  errors?: string[];
}

/**
 * Validate AI-generated task list
 */
export function validateTaskList(tasks: unknown[]): ValidationResult<ValidatedTask[]> {
  const errors: string[] = [];
  const validatedTasks: ValidatedTask[] = [];

  tasks.forEach((task, index) => {
    const result = TaskSchema.safeParse(task);
    
    if (!result.success) {
      result.error.errors.forEach(err => {
        errors.push(`Task ${index}: ${err.path.join(".")} - ${err.message}`);
      });
    } else {
      // Additional business rule validation
      const businessRuleErrors = validateTaskBusinessRules(result.data);
      if (businessRuleErrors.length > 0) {
        errors.push(...businessRuleErrors.map(e => `Task ${index}: ${e}`));
      } else {
        validatedTasks.push(result.data);
      }
    }
  });

  return {
    valid: errors.length === 0,
    data: errors.length === 0 ? validatedTasks : undefined,
    errors: errors.length > 0 ? errors : undefined,
  };
}

/**
 * Validate task business rules
 */
function validateTaskBusinessRules(task: ValidatedTask): string[] {
  const errors: string[] = [];

  // Rule 1: Critical tasks must have reasonable deadlines
  if (task.priority === "critical" && task.deadline_days_before < 7) {
    errors.push("Critical tasks should be assigned at least 7 days before event");
  }

  // Rule 2: High-hour tasks should be critical or high priority
  if (task.estimated_hours > 20 && !["critical", "high"].includes(task.priority)) {
    errors.push("Tasks requiring >20 hours should be critical or high priority");
  }

  // Rule 3: Phase names must match known phases
  const validPhases = [
    "Concept & Strategy",
    "Venue & Logistics",
    "Designer & Talent",
    "Sponsor Outreach",
    "Marketing & PR",
    "Ticketing & RSVPs",
    "Production Design",
    "Casting & Fittings",
    "Rehearsals",
    "Final Prep",
    "Event Day Setup",
    "Event Execution",
    "Post-Event",
    "Debrief & Reporting",
  ];
  
  if (!validPhases.includes(task.phase_name)) {
    errors.push(`Invalid phase_name: "${task.phase_name}". Must be one of 14 standard phases.`);
  }

  // Rule 4: Dependencies must be realistic (not self-referential)
  if (task.dependencies && task.dependencies.includes(task.title)) {
    errors.push("Task cannot depend on itself");
  }

  return errors;
}

/**
 * Validate sponsor score
 */
export function validateSponsorScore(score: unknown): ValidationResult<ValidatedSponsorScore> {
  const result = SponsorScoreSchema.safeParse(score);
  
  if (!result.success) {
    return {
      valid: false,
      errors: result.error.errors.map(err => `${err.path.join(".")}: ${err.message}`),
    };
  }

  // Business rule: ROI min must be <= max
  if (result.data.predicted_roi.min > result.data.predicted_roi.max) {
    return {
      valid: false,
      errors: ["predicted_roi.min must be <= predicted_roi.max"],
    };
  }

  return {
    valid: true,
    data: result.data,
  };
}

/**
 * Validate brand analysis
 */
export function validateBrandAnalysis(analysis: unknown): ValidationResult<ValidatedBrandAnalysis> {
  const result = BrandAnalysisSchema.safeParse(analysis);
  
  if (!result.success) {
    return {
      valid: false,
      errors: result.error.errors.map(err => `${err.path.join(".")}: ${err.message}`);
    };
  }

  return {
    valid: true,
    data: result.data,
  };
}

/**
 * Validate budget recommendation
 */
export function validateBudgetRecommendation(
  recommendation: unknown
): ValidationResult<ValidatedBudgetRecommendation> {
  const result = BudgetRecommendationSchema.safeParse(recommendation);
  
  if (!result.success) {
    return {
      valid: false,
      errors: result.error.errors.map(err => `${err.path.join(".")}: ${err.message}`),
    };
  }

  // Business rule: Difference should match calculation
  const calculatedDiff = result.data.recommended_amount - result.data.current_allocated;
  if (Math.abs(result.data.difference - calculatedDiff) > 0.01) {
    return {
      valid: false,
      errors: ["difference field doesn't match recommended_amount - current_allocated"],
    };
  }

  return {
    valid: true,
    data: result.data,
  };
}

/**
 * Validate risk assessment
 */
export function validateRiskAssessment(
  assessment: unknown
): ValidationResult<ValidatedRiskAssessment> {
  const result = RiskAssessmentSchema.safeParse(assessment);
  
  if (!result.success) {
    return {
      valid: false,
      errors: result.error.errors.map(err => `${err.path.join(".")}: ${err.message}`),
    };
  }

  return {
    valid: true,
    data: result.data,
  };
}

/**
 * Sanitize AI output (remove potential XSS, SQL injection attempts)
 */
export function sanitizeText(text: string): string {
  return text
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "") // Remove script tags
    .replace(/javascript:/gi, "") // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, "") // Remove event handlers
    .replace(/['"`;]/g, "") // Remove quotes and semicolons (SQL injection prevention)
    .trim();
}

/**
 * Validate date is in future
 */
export function validateFutureDate(dateString: string): ValidationResult<Date> {
  const date = new Date(dateString);
  const now = new Date();

  if (isNaN(date.getTime())) {
    return {
      valid: false,
      errors: ["Invalid date format"],
    };
  }

  if (date < now) {
    return {
      valid: false,
      errors: ["Date must be in the future"],
    };
  }

  return {
    valid: true,
    data: date,
  };
}

/**
 * Validate budget amount (positive, within reasonable range)
 */
export function validateBudget(amount: number): ValidationResult<number> {
  if (typeof amount !== "number" || isNaN(amount)) {
    return {
      valid: false,
      errors: ["Budget must be a valid number"],
    };
  }

  if (amount <= 0) {
    return {
      valid: false,
      errors: ["Budget must be positive"],
    };
  }

  if (amount > 10_000_000) {
    return {
      valid: false,
      errors: ["Budget exceeds maximum allowed ($10M). Contact support for higher limits."],
    };
  }

  return {
    valid: true,
    data: amount,
  };
}

/**
 * Validate email address
 */
export function validateEmail(email: string): ValidationResult<string> {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email)) {
    return {
      valid: false,
      errors: ["Invalid email format"],
    };
  }

  return {
    valid: true,
    data: email.toLowerCase().trim(),
  };
}

/**
 * Validate UUID
 */
export function validateUUID(uuid: string): ValidationResult<string> {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  
  if (!uuidRegex.test(uuid)) {
    return {
      valid: false,
      errors: ["Invalid UUID format"],
    };
  }

  return {
    valid: true,
    data: uuid.toLowerCase(),
  };
}

/**
 * Rate limit check (prevent abuse)
 */
export interface RateLimitConfig {
  key: string; // User ID or IP
  maxRequests: number;
  windowMs: number; // Time window in milliseconds
}

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(config: RateLimitConfig): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const existing = rateLimitStore.get(config.key);

  // Clean up expired entries
  if (existing && existing.resetAt < now) {
    rateLimitStore.delete(config.key);
  }

  const current = rateLimitStore.get(config.key);

  if (!current) {
    // First request in window
    rateLimitStore.set(config.key, {
      count: 1,
      resetAt: now + config.windowMs,
    });
    return { allowed: true };
  }

  if (current.count >= config.maxRequests) {
    // Rate limit exceeded
    const retryAfter = Math.ceil((current.resetAt - now) / 1000); // Seconds
    return { allowed: false, retryAfter };
  }

  // Increment count
  current.count++;
  return { allowed: true };
}
