/**
 * Designer Matching AI Agent
 * 
 * Intelligent matching system that connects designers with relevant events
 * based on style alignment, portfolio analysis, and event requirements.
 * 
 * Features:
 * - Style compatibility analysis
 * - Portfolio quality scoring
 * - Event-designer fit calculation
 * - Personalized recommendations
 * - Opportunity ranking
 * 
 * Usage:
 * ```typescript
 * const matches = await findMatchingEvents(designerProfile, allEvents);
 * const score = await calculateFitScore(designer, event);
 * ```
 */

import { callGemini } from '../gemini';

export interface DesignerProfile {
  name: string;
  brand_name: string;
  specialty?: string; // e.g., "Womenswear", "Accessories", "Sustainable Fashion"
  style_keywords: string[]; // e.g., ["minimalist", "sustainable", "avant-garde"]
  instagram?: string;
  website?: string;
  portfolio_url?: string;
  years_experience?: number;
  price_range?: string; // e.g., "$500-$2000"
  past_shows?: string[]; // Previous events/shows
  bio?: string;
}

export interface EventOpportunity {
  id: string;
  name: string;
  type: string; // e.g., "runway_show", "popup", "photoshoot"
  theme?: string;
  style_preferences?: string[];
  venue?: string;
  date: string;
  budget?: number;
  attendee_target?: number;
  looking_for?: string[]; // e.g., ["Emerging designers", "Sustainable brands"]
}

export interface DesignerEventMatch {
  event: EventOpportunity;
  fit_score: number; // 0-100
  match_reasons: string[];
  concerns: string[];
  recommendation: 'excellent' | 'good' | 'fair' | 'not_recommended';
  estimated_opportunity_value: number;
  next_steps: string[];
}

/**
 * Find matching events for a designer
 */
export async function findMatchingEvents(
  designer: DesignerProfile,
  events: EventOpportunity[]
): Promise<DesignerEventMatch[]> {
  
  // Filter events by basic criteria
  const relevantEvents = events.filter(event => {
    // Must be future events
    const eventDate = new Date(event.date);
    if (eventDate < new Date()) return false;
    
    return true;
  });

  // Calculate fit score for each event
  const matches = await Promise.all(
    relevantEvents.map(async (event) => {
      const fitScore = await calculateFitScore(designer, event);
      const analysis = await analyzeMatch(designer, event, fitScore);
      
      return {
        event,
        fit_score: fitScore,
        match_reasons: analysis.match_reasons,
        concerns: analysis.concerns,
        recommendation: getRecommendation(fitScore),
        estimated_opportunity_value: estimateOpportunityValue(event, fitScore),
        next_steps: analysis.next_steps,
      };
    })
  );

  // Sort by fit score (highest first)
  return matches.sort((a, b) => b.fit_score - a.fit_score);
}

/**
 * Calculate fit score between designer and event
 */
export async function calculateFitScore(
  designer: DesignerProfile,
  event: EventOpportunity
): Promise<number> {
  
  const prompt = `
Analyze how well this designer fits this event opportunity.

DESIGNER PROFILE:
- Name: ${designer.name}
- Brand: ${designer.brand_name}
- Specialty: ${designer.specialty || 'General fashion'}
- Style: ${designer.style_keywords.join(', ')}
- Experience: ${designer.years_experience || 'Not specified'} years
- Price Range: ${designer.price_range || 'Not specified'}
${designer.bio ? `- Bio: ${designer.bio}` : ''}

EVENT OPPORTUNITY:
- Name: ${event.name}
- Type: ${event.type}
- Theme: ${event.theme || 'Not specified'}
- Looking for: ${event.looking_for?.join(', ') || 'All designers'}
- Style preferences: ${event.style_preferences?.join(', ') || 'Open'}
- Date: ${event.date}
- Budget: ${event.budget ? '$' + event.budget.toLocaleString() : 'Not specified'}

Calculate a fit score (0-100) based on:
1. Style alignment (40 points)
2. Experience level match (20 points)
3. Event type suitability (20 points)
4. Brand positioning fit (10 points)
5. Logistics compatibility (10 points)

Return ONLY a number between 0-100.
`;

  const response = await callGemini(prompt, {
    features: ['gemini_thinking'],
    temperature: 0.3, // Low temp for consistent scoring
  });

  // Extract number from response
  const scoreMatch = response.text.match(/\d+/);
  const score = scoreMatch ? parseInt(scoreMatch[0]) : 50;
  
  return Math.min(100, Math.max(0, score));
}

/**
 * Analyze match and provide reasons
 */
async function analyzeMatch(
  designer: DesignerProfile,
  event: EventOpportunity,
  fitScore: number
): Promise<{
  match_reasons: string[];
  concerns: string[];
  next_steps: string[];
}> {
  
  const prompt = `
Provide detailed analysis of this designer-event match (Fit Score: ${fitScore}/100).

DESIGNER: ${designer.brand_name}
- Style: ${designer.style_keywords.join(', ')}
- Specialty: ${designer.specialty || 'General'}

EVENT: ${event.name}
- Type: ${event.type}
- Theme: ${event.theme || 'Not specified'}

Provide:
1. 3-5 specific match reasons (why this is a good fit)
2. 2-3 potential concerns or challenges
3. 3-4 recommended next steps for the designer

Return as structured JSON with arrays: match_reasons, concerns, next_steps
`;

  const response = await callGemini(prompt, {
    features: ['structured_output', 'gemini_thinking'],
    temperature: 0.5,
  });

  return response.structuredData || {
    match_reasons: [
      'Style alignment with event theme',
      'Appropriate experience level',
      'Good brand positioning',
    ],
    concerns: [
      'Verify availability on event date',
      'Confirm budget alignment',
    ],
    next_steps: [
      'Review full event details',
      'Contact event organizer',
      'Prepare portfolio presentation',
      'Confirm participation terms',
    ],
  };
}

/**
 * Get recommendation level based on fit score
 */
function getRecommendation(fitScore: number): 'excellent' | 'good' | 'fair' | 'not_recommended' {
  if (fitScore >= 85) return 'excellent';
  if (fitScore >= 70) return 'good';
  if (fitScore >= 55) return 'fair';
  return 'not_recommended';
}

/**
 * Estimate opportunity value for designer
 */
function estimateOpportunityValue(
  event: EventOpportunity,
  fitScore: number
): number {
  
  // Base value on event type
  const typeMultipliers: Record<string, number> = {
    runway_show: 5000,
    photoshoot: 2000,
    popup: 1500,
    activation: 1000,
    campaign: 3000,
  };

  const baseValue = typeMultipliers[event.type] || 1000;
  
  // Adjust by fit score
  const fitMultiplier = fitScore / 100;
  
  // Adjust by event budget (if available)
  let budgetMultiplier = 1;
  if (event.budget) {
    if (event.budget > 100000) budgetMultiplier = 1.5;
    else if (event.budget > 50000) budgetMultiplier = 1.3;
    else if (event.budget > 20000) budgetMultiplier = 1.1;
  }

  // Adjust by attendee count (if available)
  let attendeeMultiplier = 1;
  if (event.attendee_target) {
    if (event.attendee_target > 500) attendeeMultiplier = 1.3;
    else if (event.attendee_target > 200) attendeeMultiplier = 1.15;
  }

  const estimatedValue = baseValue * fitMultiplier * budgetMultiplier * attendeeMultiplier;
  
  return Math.round(estimatedValue);
}

/**
 * Generate personalized outreach message
 */
export async function generateOutreachMessage(
  designer: DesignerProfile,
  event: EventOpportunity,
  match: DesignerEventMatch
): Promise<string> {
  
  const prompt = `
Write a personalized outreach message from the event organizer to the designer.

EVENT: ${event.name}
DESIGNER: ${designer.brand_name}
FIT SCORE: ${match.fit_score}/100
MATCH REASONS: ${match.match_reasons.join(', ')}

The message should:
- Be warm and professional
- Explain why they're a great fit
- Highlight specific match reasons
- Include clear next steps
- Be 150-200 words
- Sign off as "The ${event.name} Team"

Return just the message text.
`;

  const response = await callGemini(prompt, {
    temperature: 0.7,
  });

  return response.text;
}

/**
 * Analyze designer portfolio quality
 */
export async function analyzePortfolio(
  designer: DesignerProfile
): Promise<{
  quality_score: number; // 0-100
  strengths: string[];
  improvements: string[];
  standout_pieces: string[];
  overall_assessment: string;
}> {
  
  const prompt = `
Analyze this designer's portfolio and brand presence.

DESIGNER: ${designer.brand_name}
${designer.instagram ? `Instagram: ${designer.instagram}` : ''}
${designer.website ? `Website: ${designer.website}` : ''}
${designer.portfolio_url ? `Portfolio: ${designer.portfolio_url}` : ''}
Style: ${designer.style_keywords.join(', ')}
Specialty: ${designer.specialty || 'General fashion'}

Provide:
1. Quality score (0-100)
2. 3-5 key strengths
3. 2-4 areas for improvement
4. Standout pieces or collections
5. Overall assessment (2-3 sentences)

Return as structured JSON.
`;

  const response = await callGemini(prompt, {
    features: ['grounding_search', 'structured_output', 'gemini_thinking'],
    temperature: 0.5,
  });

  return response.structuredData || {
    quality_score: 75,
    strengths: [
      'Cohesive aesthetic across portfolio',
      'Strong brand identity',
      'Quality photography',
    ],
    improvements: [
      'Add more behind-the-scenes content',
      'Expand social media presence',
    ],
    standout_pieces: [
      'Signature collection pieces',
      'Unique design elements',
    ],
    overall_assessment: 'Strong portfolio with clear brand identity. Professional presentation with room for digital expansion.',
  };
}

/**
 * Recommend portfolio improvements
 */
export async function recommendPortfolioImprovements(
  designer: DesignerProfile,
  targetEvents: EventOpportunity[]
): Promise<{
  priority_improvements: Array<{
    action: string;
    reason: string;
    impact: 'high' | 'medium' | 'low';
    effort: 'high' | 'medium' | 'low';
  }>;
  content_gaps: string[];
  quick_wins: string[];
}> {
  
  const eventTypes = [...new Set(targetEvents.map(e => e.type))];
  const eventThemes = targetEvents
    .map(e => e.theme)
    .filter(Boolean);

  const prompt = `
Recommend portfolio improvements for a designer targeting these types of events:
- Event types: ${eventTypes.join(', ')}
- Common themes: ${eventThemes.join(', ')}

Current portfolio:
- Style: ${designer.style_keywords.join(', ')}
- Specialty: ${designer.specialty}
${designer.instagram ? `- Instagram: ${designer.instagram}` : ''}
${designer.website ? `- Website: ${designer.website}` : ''}

Provide:
1. Priority improvements (action, reason, impact level, effort level)
2. Content gaps to fill
3. Quick wins (easy, high-impact actions)

Return as structured JSON.
`;

  const response = await callGemini(prompt, {
    features: ['structured_output'],
    temperature: 0.6,
  });

  return response.structuredData || {
    priority_improvements: [
      {
        action: 'Add lookbook PDF to website',
        reason: 'Professional presentation for event organizers',
        impact: 'high' as const,
        effort: 'medium' as const,
      },
      {
        action: 'Create Instagram Reels showing design process',
        reason: 'Increases engagement and shows authenticity',
        impact: 'medium' as const,
        effort: 'low' as const,
      },
    ],
    content_gaps: [
      'Behind-the-scenes content',
      'Customer testimonials',
      'Press mentions or features',
    ],
    quick_wins: [
      'Update bio with current focus',
      'Add "Featured in" section to website',
      'Create Instagram Story Highlights for past shows',
    ],
  };
}

/**
 * Calculate designer's market positioning
 */
export function calculateMarketPositioning(
  designer: DesignerProfile
): {
  tier: 'emerging' | 'established' | 'premium' | 'luxury';
  ideal_event_types: string[];
  price_positioning: string;
  growth_stage: string;
} {
  
  const yearsExp = designer.years_experience || 0;
  
  // Determine tier
  let tier: 'emerging' | 'established' | 'premium' | 'luxury';
  if (yearsExp < 3) {
    tier = 'emerging';
  } else if (yearsExp < 7) {
    tier = 'established';
  } else if (yearsExp < 12) {
    tier = 'premium';
  } else {
    tier = 'luxury';
  }

  // Ideal event types by tier
  const idealEventsByTier = {
    emerging: ['popup', 'photoshoot', 'activation'],
    established: ['runway_show', 'popup', 'photoshoot', 'campaign'],
    premium: ['runway_show', 'campaign', 'activation'],
    luxury: ['runway_show', 'campaign'],
  };

  // Price positioning
  const pricePositioning = designer.price_range || 
    (tier === 'emerging' ? 'Entry-level ($500-$1500)' :
     tier === 'established' ? 'Mid-range ($1500-$5000)' :
     tier === 'premium' ? 'Premium ($5000-$15000)' :
     'Luxury ($15000+)');

  // Growth stage
  const growthStage = tier === 'emerging' ? 'Building brand awareness' :
                      tier === 'established' ? 'Expanding market reach' :
                      tier === 'premium' ? 'Solidifying position' :
                      'Maintaining prestige';

  return {
    tier,
    ideal_event_types: idealEventsByTier[tier],
    price_positioning: pricePositioning,
    growth_stage: growthStage,
  };
}
