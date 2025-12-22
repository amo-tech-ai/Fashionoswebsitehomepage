/**
 * Logging Layer — Comprehensive Audit Trail for All Actions
 * 
 * Purpose: Track all AI actions, user actions, and system events
 * Strategy: Structured logging + audit database + external monitoring
 * Principle: Every action is traceable, every error is debuggable
 */

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Environment variables
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

/**
 * AI Action Log Entry
 */
export interface AIActionLog {
  user_id: string;
  event_id?: string;
  agent: string; // "event_planner" | "budget_guardian" | etc.
  model: string; // "gemini-3-pro" | "gemini-3-flash" | etc.
  intent: string; // What user wanted to accomplish
  input: Record<string, any>; // Sanitized input data
  output: Record<string, any>; // Structured output
  tokens_used?: number;
  latency_ms: number;
  cost_usd: number;
  success: boolean;
  error?: string;
  timestamp?: string;
}

/**
 * User Action Log Entry
 */
export interface UserActionLog {
  user_id: string;
  action: string; // "create_event" | "update_task" | "delete_sponsor"
  resource_type: string; // "event" | "task" | "sponsor"
  resource_id?: string;
  input: Record<string, any>;
  output?: Record<string, any>;
  success: boolean;
  error?: string;
  ip_address?: string;
  user_agent?: string;
  duration_ms?: number;
  timestamp?: string;
}

/**
 * System Event Log Entry
 */
export interface SystemEventLog {
  event_type: string; // "edge_function_timeout" | "database_error" | "rate_limit_hit"
  severity: "info" | "warning" | "error" | "critical";
  message: string;
  context: Record<string, any>;
  stack_trace?: string;
  timestamp?: string;
}

/**
 * Log AI action to database
 */
export async function logAIAction(log: AIActionLog): Promise<void> {
  try {
    const { error } = await supabase.from("ai_actions").insert({
      user_id: log.user_id,
      event_id: log.event_id,
      agent: log.agent,
      model: log.model,
      intent: log.intent,
      input: sanitizeForLog(log.input),
      output: sanitizeForLog(log.output),
      tokens_used: log.tokens_used,
      latency_ms: log.latency_ms,
      cost_usd: log.cost_usd,
      success: log.success,
      error: log.error,
      timestamp: log.timestamp || new Date().toISOString(),
    });

    if (error) {
      console.error("Failed to log AI action to database:", error);
      // Don't throw - logging failure shouldn't break main flow
    }

    // Also log to console for CloudWatch/monitoring
    console.log({
      type: "ai_action",
      agent: log.agent,
      model: log.model,
      success: log.success,
      latency_ms: log.latency_ms,
      cost_usd: log.cost_usd,
      timestamp: log.timestamp || new Date().toISOString(),
    });

  } catch (error) {
    console.error("Critical error in logAIAction:", error);
  }
}

/**
 * Log user action to database
 */
export async function logUserAction(log: UserActionLog): Promise<void> {
  try {
    const { error } = await supabase.from("user_actions").insert({
      user_id: log.user_id,
      action: log.action,
      resource_type: log.resource_type,
      resource_id: log.resource_id,
      input: sanitizeForLog(log.input),
      output: sanitizeForLog(log.output),
      success: log.success,
      error: log.error,
      ip_address: log.ip_address,
      user_agent: log.user_agent,
      duration_ms: log.duration_ms,
      timestamp: log.timestamp || new Date().toISOString(),
    });

    if (error) {
      console.error("Failed to log user action to database:", error);
    }

    console.log({
      type: "user_action",
      action: log.action,
      resource_type: log.resource_type,
      success: log.success,
      duration_ms: log.duration_ms,
      timestamp: log.timestamp || new Date().toISOString(),
    });

  } catch (error) {
    console.error("Critical error in logUserAction:", error);
  }
}

/**
 * Log system event to database
 */
export async function logSystemEvent(log: SystemEventLog): Promise<void> {
  try {
    const { error } = await supabase.from("system_events").insert({
      event_type: log.event_type,
      severity: log.severity,
      message: log.message,
      context: sanitizeForLog(log.context),
      stack_trace: log.stack_trace,
      timestamp: log.timestamp || new Date().toISOString(),
    });

    if (error) {
      console.error("Failed to log system event to database:", error);
    }

    // Console logging with appropriate level
    const logLevel = log.severity === "critical" || log.severity === "error" ? "error" : "log";
    console[logLevel]({
      type: "system_event",
      event_type: log.event_type,
      severity: log.severity,
      message: log.message,
      timestamp: log.timestamp || new Date().toISOString(),
    });

    // Alert on critical events (integrate with PagerDuty, Slack, etc.)
    if (log.severity === "critical") {
      await alertOncall({
        title: `Critical System Event: ${log.event_type}`,
        message: log.message,
        context: log.context,
      });
    }

  } catch (error) {
    console.error("Critical error in logSystemEvent:", error);
  }
}

/**
 * Sanitize data for logging (remove sensitive info)
 */
function sanitizeForLog(data: Record<string, any>): Record<string, any> {
  const sensitiveKeys = [
    "password",
    "token",
    "api_key",
    "secret",
    "credit_card",
    "ssn",
    "access_token",
    "refresh_token",
  ];

  const sanitized: Record<string, any> = {};

  for (const [key, value] of Object.entries(data)) {
    const lowerKey = key.toLowerCase();
    
    if (sensitiveKeys.some(sensitive => lowerKey.includes(sensitive))) {
      sanitized[key] = "[REDACTED]";
    } else if (typeof value === "object" && value !== null) {
      sanitized[key] = sanitizeForLog(value);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
}

/**
 * Alert on-call engineer (critical issues)
 */
async function alertOncall(alert: {
  title: string;
  message: string;
  context: Record<string, any>;
}): Promise<void> {
  // TODO: Integrate with alerting service (PagerDuty, Slack, email)
  console.error("🚨 CRITICAL ALERT:", {
    title: alert.title,
    message: alert.message,
    context: alert.context,
    timestamp: new Date().toISOString(),
  });

  // Example: Send to Slack webhook
  // const webhookUrl = Deno.env.get("SLACK_ALERT_WEBHOOK");
  // if (webhookUrl) {
  //   await fetch(webhookUrl, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       text: `🚨 ${alert.title}`,
  //       blocks: [
  //         { type: "section", text: { type: "mrkdwn", text: `*${alert.title}*\n${alert.message}` } },
  //         { type: "section", fields: Object.entries(alert.context).map(([k, v]) => ({ type: "mrkdwn", text: `*${k}:*\n${v}` })) },
  //       ],
  //     }),
  //   });
  // }
}

/**
 * Performance monitoring helper
 */
export class PerformanceMonitor {
  private startTime: number;
  private checkpoints: Map<string, number>;

  constructor() {
    this.startTime = performance.now();
    this.checkpoints = new Map();
  }

  /**
   * Mark checkpoint
   */
  checkpoint(name: string): void {
    this.checkpoints.set(name, performance.now() - this.startTime);
  }

  /**
   * Get elapsed time since start (ms)
   */
  elapsed(): number {
    return performance.now() - this.startTime;
  }

  /**
   * Get checkpoint durations
   */
  getCheckpoints(): Record<string, number> {
    return Object.fromEntries(this.checkpoints);
  }

  /**
   * Log performance summary
   */
  logSummary(operation: string): void {
    const total = this.elapsed();
    const checkpoints = this.getCheckpoints();

    console.log({
      type: "performance",
      operation,
      total_ms: Math.round(total),
      checkpoints: Object.fromEntries(
        Object.entries(checkpoints).map(([k, v]) => [k, Math.round(v)])
      ),
      timestamp: new Date().toISOString(),
    });
  }
}

/**
 * Error logging with context
 */
export function logError(error: Error, context: {
  operation: string;
  user_id?: string;
  event_id?: string;
  [key: string]: any;
}): void {
  console.error({
    type: "error",
    error: {
      name: error.name,
      message: error.message,
      stack: error.stack,
    },
    context,
    timestamp: new Date().toISOString(),
  });

  // Log to system events table
  logSystemEvent({
    event_type: "error",
    severity: "error",
    message: `${context.operation}: ${error.message}`,
    context,
    stack_trace: error.stack,
  });
}

/**
 * Request/Response logging middleware
 */
export function logRequest(req: Request, context: {
  user_id?: string;
  operation: string;
}): void {
  console.log({
    type: "request",
    method: req.method,
    url: req.url,
    operation: context.operation,
    user_id: context.user_id,
    headers: {
      origin: req.headers.get("origin"),
      user_agent: req.headers.get("user-agent"),
      content_type: req.headers.get("content-type"),
    },
    timestamp: new Date().toISOString(),
  });
}

export function logResponse(status: number, context: {
  user_id?: string;
  operation: string;
  duration_ms: number;
}): void {
  console.log({
    type: "response",
    status,
    operation: context.operation,
    user_id: context.user_id,
    duration_ms: Math.round(context.duration_ms),
    timestamp: new Date().toISOString(),
  });
}

/**
 * Cost tracking for AI operations
 */
export interface CostTracker {
  addCost(amount: number, operation: string): void;
  getTotal(): number;
  getBreakdown(): Record<string, number>;
}

class CostTrackerImpl implements CostTracker {
  private costs: Map<string, number>;

  constructor() {
    this.costs = new Map();
  }

  addCost(amount: number, operation: string): void {
    const current = this.costs.get(operation) || 0;
    this.costs.set(operation, current + amount);
  }

  getTotal(): number {
    return Array.from(this.costs.values()).reduce((sum, cost) => sum + cost, 0);
  }

  getBreakdown(): Record<string, number> {
    return Object.fromEntries(this.costs);
  }
}

export function createCostTracker(): CostTracker {
  return new CostTrackerImpl();
}

/**
 * Query logging for database operations
 */
export function logQuery(query: {
  table: string;
  operation: "SELECT" | "INSERT" | "UPDATE" | "DELETE";
  duration_ms: number;
  rows_affected?: number;
}): void {
  console.log({
    type: "database_query",
    table: query.table,
    operation: query.operation,
    duration_ms: Math.round(query.duration_ms),
    rows_affected: query.rows_affected,
    timestamp: new Date().toISOString(),
  });

  // Alert on slow queries
  if (query.duration_ms > 1000) {
    console.warn({
      type: "slow_query",
      table: query.table,
      operation: query.operation,
      duration_ms: Math.round(query.duration_ms),
      message: "Query exceeded 1 second. Consider optimization.",
      timestamp: new Date().toISOString(),
    });
  }
}

/**
 * Rate limit logging
 */
export function logRateLimitHit(context: {
  user_id?: string;
  ip_address?: string;
  endpoint: string;
  limit: number;
}): void {
  console.warn({
    type: "rate_limit_hit",
    user_id: context.user_id,
    ip_address: context.ip_address,
    endpoint: context.endpoint,
    limit: context.limit,
    message: "Rate limit exceeded",
    timestamp: new Date().toISOString(),
  });

  logSystemEvent({
    event_type: "rate_limit_hit",
    severity: "warning",
    message: `Rate limit hit: ${context.endpoint}`,
    context,
  });
}

/**
 * Export all logging functions
 */
export default {
  ai: logAIAction,
  user: logUserAction,
  system: logSystemEvent,
  error: logError,
  request: logRequest,
  response: logResponse,
  query: logQuery,
  rateLimit: logRateLimitHit,
  PerformanceMonitor,
  createCostTracker,
};
