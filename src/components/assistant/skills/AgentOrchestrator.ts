/**
 * AgentOrchestrator - Routes user messages to the correct AI skill
 * 
 * Core responsibilities:
 * 1. Intent Detection: Classify user message intent
 * 2. Skill Routing: Direct to appropriate skill (Logistics, Events, Media, Services, Navigator)
 * 3. Context Awareness: Use current page/kit to improve routing
 * 4. Response Generation: Return formatted AI response
 */

import { analyzeReadiness, identifyBlockers, generateBatchingPlan, answerQuestion as answerLogisticsQuestion } from './LogisticsSkill';
import { analyzeCriticalPath, identifyStaffingGaps, suggestNextActions, generateEventInsights } from './EventsSkill';
import { handleMediaQuery } from './MediaSkill';
import { handleServicesQuery } from './ServicesSkill';
import { handleNavigationQuery } from './NavigatorSkill';
import type { SampleItem } from './LogisticsSkill';
import type { Event } from './EventsSkill';
import type { Asset } from '../types/media.types';
import type { UserActivity } from '../types/navigation.types';

export type MessageIntent =
  | 'logistics'
  | 'events'
  | 'media'
  | 'services'
  | 'navigation'
  | 'general';

export interface OrchestratorContext {
  currentKit: string; // 'logistics' | 'events' | 'media' | 'services' | 'marketing'
  currentRoute: string;
  samples?: SampleItem[];
  event?: Event;
  assets?: Asset[];
  userActivity?: UserActivity;
}

export interface OrchestratorResponse {
  intent: MessageIntent;
  content: string; // Changed from 'response' to match usage
  confidence: number; // 0-1
  actions?: { // Changed from 'suggestedActions'
    label: string;
    actionId: string;
  }[];
}

// ============================================================================
// INTENT DETECTION KEYWORDS
// ============================================================================

const INTENT_KEYWORDS = {
  logistics: [
    'sample', 'inventory', 'ready', 'readiness', 'missing', 'delayed', 'blocker',
    'batch', 'batching', 'organize', 'prep', 'checklist', 'studio', 'on set',
    'in transit', 'shipped', 'delayed', 'location'
  ],
  events: [
    'event', 'show', 'campaign', 'timeline', 'task', 'deadline', 'critical path',
    'blocker', 'dependency', 'staffing', 'team', 'run of show', 'schedule',
    'planning', 'production', 'shoot day'
  ],
  media: [
    'asset', 'photo', 'image', 'quality', 'delivery', 'upload', 'select',
    'shot list', 'missing shot', 'tag', 'edit', 'retouch', 'client',
    'deadline', 'export', 'download'
  ],
  services: [
    'package', 'pricing', 'quote', 'cost', 'budget', 'service', 'booking',
    'consultation', 'recommend', 'tier', 'timeline estimate', 'rush',
    'essential', 'premium', 'luxury'
  ],
  navigation: [
    'help', 'how to', 'where', 'find', 'navigate', 'feature', 'what can',
    'tutorial', 'guide', 'onboarding', 'getting started', 'new', 'update'
  ],
};

// ============================================================================
// ALGORITHM 1: INTENT DETECTION
// ============================================================================

export function detectIntent(
  message: string,
  context: OrchestratorContext
): { intent: MessageIntent; confidence: number } {
  const lower = message.toLowerCase();
  const scores: Record<MessageIntent, number> = {
    logistics: 0,
    events: 0,
    media: 0,
    services: 0,
    navigation: 0,
    general: 0,
  };

  // Score based on keyword matches
  for (const [intent, keywords] of Object.entries(INTENT_KEYWORDS)) {
    for (const keyword of keywords) {
      if (lower.includes(keyword)) {
        scores[intent as MessageIntent] += 1;
      }
    }
  }

  // Boost score based on current kit (context-aware)
  const kitBoost = 3; // Strong context signal
  if (context.currentKit === 'logistics') scores.logistics += kitBoost;
  if (context.currentKit === 'events') scores.events += kitBoost;
  if (context.currentKit === 'media') scores.media += kitBoost;
  if (context.currentKit === 'services') scores.services += kitBoost;
  if (context.currentKit === 'marketing') scores.navigation += kitBoost;

  // Find highest scoring intent
  let maxScore = 0;
  let detectedIntent: MessageIntent = 'general';

  for (const [intent, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      detectedIntent = intent as MessageIntent;
    }
  }

  // Calculate confidence (0-1)
  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
  const confidence = totalScore > 0 ? maxScore / totalScore : 0.5;

  // If no clear intent, default to navigation
  if (maxScore === 0) {
    detectedIntent = 'navigation';
  }

  return { intent: detectedIntent, confidence };
}

// ============================================================================
// ALGORITHM 2: SKILL ROUTING & RESPONSE GENERATION
// ============================================================================

export function orchestrateResponse(
  message: string,
  context: OrchestratorContext
): OrchestratorResponse {
  const { intent, confidence } = detectIntent(message, context);

  let response = '';
  const suggestedActions: { label: string; actionId: string }[] = [];

  // Route to appropriate skill based on intent
  switch (intent) {
    case 'logistics':
      if (context.samples && context.samples.length > 0) {
        response = answerLogisticsQuestion(message, context.samples).answer;
        
        // Add suggested actions based on response
        if (message.toLowerCase().includes('ready') || message.toLowerCase().includes('readiness')) {
          suggestedActions.push({ label: 'View Prep Checklist', actionId: 'prep-checklist' });
        }
        if (message.toLowerCase().includes('batch') || message.toLowerCase().includes('organize')) {
          suggestedActions.push({ label: 'Generate Batching Plan', actionId: 'batching-plan' });
        }
        if (message.toLowerCase().includes('missing') || message.toLowerCase().includes('delayed')) {
          suggestedActions.push({ label: 'Show Missing Items', actionId: 'show-missing' });
        }
      } else {
        response = "I can help with logistics! Add some samples to the tracker first, then I can analyze readiness, detect blockers, and optimize batching.";
      }
      break;

    case 'events':
      if (context.event) {
        // Route to appropriate event skill based on question
        const lower = message.toLowerCase();
        
        if (lower.includes('critical') || lower.includes('blocker') || lower.includes('path')) {
          const criticalPath = analyzeCriticalPath(context.event);
          response = `Critical path analysis: ${criticalPath.blockers.length} blocker${criticalPath.blockers.length !== 1 ? 's' : ''} detected. ${criticalPath.criticalPathLength} tasks on critical path.`;
          suggestedActions.push({ label: 'View Critical Path', actionId: 'view-critical-path' });
        } else if (lower.includes('staff') || lower.includes('team')) {
          const staffingGaps = identifyStaffingGaps(context.event, {});
          response = `Staffing analysis: ${staffingGaps.gaps.length} gap${staffingGaps.gaps.length !== 1 ? 's' : ''} identified. Current team: ${staffingGaps.currentStaffing} people.`;
          suggestedActions.push({ label: 'View Staffing', actionId: 'staffing-check' });
        } else if (lower.includes('run of show') || lower.includes('schedule')) {
          response = "I can generate a run of show with timing, responsibilities, and key moments.";
          suggestedActions.push({ label: 'Generate Run of Show', actionId: 'generate-run-of-show' });
        } else {
          const insights = generateEventInsights(context.event);
          response = `Event overview: ${insights.length} key insight${insights.length !== 1 ? 's' : ''}. ${context.event.name} is ${context.event.status}.`;
          suggestedActions.push({ label: 'View Details', actionId: 'view-details' });
        }
      } else {
        response = "I can help with event planning! Create an event first, then I can analyze critical paths, detect blockers, and suggest next actions.";
        suggestedActions.push({ label: 'Create Event', actionId: 'create-event' });
      }
      break;

    case 'media':
      if (context.assets && context.assets.length > 0) {
        response = handleMediaQuery(message, context.assets);
        
        // Add suggested actions
        if (message.toLowerCase().includes('quality')) {
          suggestedActions.push({ label: 'Review Quality', actionId: 'review-quality' });
        }
        if (message.toLowerCase().includes('missing')) {
          suggestedActions.push({ label: 'View Shot List', actionId: 'view-shot-list' });
        }
        if (message.toLowerCase().includes('select')) {
          suggestedActions.push({ label: 'Generate Selects', actionId: 'generate-selects' });
        }
      } else {
        response = "I can help with asset management! Upload some assets first, then I can analyze quality, track delivery, and generate selects.";
        suggestedActions.push({ label: 'Upload Assets', actionId: 'upload-assets' });
      }
      break;

    case 'services':
      response = handleServicesQuery(message);
      
      // Add suggested actions
      if (message.toLowerCase().includes('recommend') || message.toLowerCase().includes('package')) {
        suggestedActions.push({ label: 'Compare Packages', actionId: 'compare-packages' });
      }
      if (message.toLowerCase().includes('price') || message.toLowerCase().includes('quote')) {
        suggestedActions.push({ label: 'Get Custom Quote', actionId: 'get-quote' });
      }
      suggestedActions.push({ label: 'Book Consultation', actionId: 'book-consultation' });
      break;

    case 'navigation':
      if (context.userActivity) {
        response = handleNavigationQuery(message, context.userActivity, context.currentRoute);
        
        // Add suggested actions based on user activity
        if (context.userActivity.createdProjects === 0) {
          suggestedActions.push({ label: 'Create First Event', actionId: 'create-event' });
        }
        suggestedActions.push({ label: 'Explore Platform', actionId: 'explore-platform' });
      } else {
        response = "I can help you navigate FashionOS! Ask me about features, getting started, or quick wins.";
        suggestedActions.push({ label: 'Get Started Guide', actionId: 'get-started-guide' });
      }
      break;

    case 'general':
    default:
      response = `I'm Cura, your AI assistant! I can help with:\n\n• Logistics & sample tracking\n• Event planning & critical paths\n• Asset quality & delivery\n• Service packages & pricing\n• Platform navigation\n\nWhat would you like help with?`;
      suggestedActions.push(
        { label: 'Explore Features', actionId: 'explore-platform' },
        { label: 'View Services', actionId: 'view-services' }
      );
      break;
  }

  return {
    intent,
    content: response, // Changed from 'response' to 'content'
    confidence,
    actions: suggestedActions.length > 0 ? suggestedActions : undefined, // Changed from 'suggestedActions'
  };
}

// ============================================================================
// HELPER: FORMAT RESPONSE FOR UI
// ============================================================================

export function formatResponse(orchResponse: OrchestratorResponse): {
  text: string;
  actions?: { label: string; actionId: string }[];
} {
  return {
    text: orchResponse.content, // Changed from 'response' to match usage
    actions: orchResponse.actions,
  };
}