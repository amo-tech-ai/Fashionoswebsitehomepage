/**
 * Brand Shoot AI Agent
 * 
 * Analyzes brand signals (website, Instagram, e-commerce) to generate
 * intelligent campaign strategies, asset recommendations, and pricing.
 * 
 * Features:
 * - Brand voice/aesthetic analysis
 * - Campaign strategy generation
 * - Asset type recommendations
 * - Channel-specific content packs
 * - Pricing calculations
 * - Competitive analysis
 * 
 * Usage:
 * ```typescript
 * const analysis = await analyzeBrandSignals({
 *   website: 'https://example.com',
 *   instagram: '@brand',
 *   commerce: 'https://shop.example.com',
 * });
 * ```
 */

import { callGemini } from '../gemini';

export interface BrandSignals {
  website?: string;
  instagram?: string;
  commerce?: string;
  uploadedFiles?: Array<{
    name: string;
    type: string;
    url: string;
  }>;
}

export interface BrandAnalysis {
  // Core brand attributes
  voice: string; // e.g., "Modern, minimalist, sustainable"
  aesthetic: string; // e.g., "Clean lines, neutral palette, organic textures"
  values: string[]; // e.g., ["Sustainability", "Craftsmanship", "Transparency"]
  target_audience: string; // e.g., "Conscious consumers, 25-45, urban professionals"
  
  // Campaign strategy
  strategy: {
    title: string;
    goal: string;
    tone: string;
    key_messages: string[];
    channels: string[];
  };
  
  // Asset recommendations
  recommended_assets: Array<{
    type: 'product_photo' | 'lifestyle_shot' | 'detail_closeup' | 'video_snippet' | 'testimonial';
    count: number;
    rationale: string;
    priority: 'high' | 'medium' | 'low';
  }>;
  
  // Channel-specific packs
  channel_packs: {
    instagram: {
      posts: number;
      stories: number;
      reels: number;
      suggested_themes: string[];
    };
    website: {
      hero_images: number;
      product_shots: number;
      lifestyle_images: number;
    };
    email: {
      campaign_visuals: number;
      banner_variants: number;
    };
  };
  
  // Pricing
  pricing: {
    base_package: number;
    per_asset_cost: number;
    recommended_total: number;
    breakdown: Array<{
      item: string;
      cost: number;
    }>;
  };
  
  confidence: number;
}

/**
 * Analyze brand signals and generate campaign strategy
 */
export async function analyzeBrandSignals(
  signals: BrandSignals
): Promise<BrandAnalysis> {
  
  const prompt = buildBrandAnalysisPrompt(signals);
  
  const response = await callGemini(prompt, {
    features: ['text_generation', 'gemini_thinking', 'grounding_search', 'structured_output'],
    temperature: 0.7, // Creative but consistent
  });

  // Parse structured data or return defaults
  const data = response.structuredData || getDefaultBrandAnalysis();

  return {
    voice: data.voice || 'Modern and authentic',
    aesthetic: data.aesthetic || 'Clean and contemporary',
    values: data.values || ['Quality', 'Authenticity', 'Style'],
    target_audience: data.target_audience || 'Style-conscious consumers, 25-45',
    strategy: data.strategy || {
      title: 'Seasonal Brand Campaign',
      goal: 'Increase brand awareness and drive engagement',
      tone: 'Authentic and aspirational',
      key_messages: ['Quality craftsmanship', 'Timeless style', 'Conscious choices'],
      channels: ['Instagram', 'Website', 'Email'],
    },
    recommended_assets: data.recommended_assets || getDefaultAssetRecommendations(),
    channel_packs: data.channel_packs || getDefaultChannelPacks(),
    pricing: data.pricing || getDefaultPricing(),
    confidence: response.confidence || 0.85,
  };
}

/**
 * Build comprehensive brand analysis prompt
 */
function buildBrandAnalysisPrompt(signals: BrandSignals): string {
  const parts = [];

  parts.push(`
You are a brand strategist and creative director analyzing a fashion/lifestyle brand to create a photo shoot campaign.

BRAND SIGNALS PROVIDED:
${signals.website ? `- Website: ${signals.website}` : ''}
${signals.instagram ? `- Instagram: ${signals.instagram}` : ''}
${signals.commerce ? `- E-commerce: ${signals.commerce}` : ''}
${signals.uploadedFiles?.length ? `- Uploaded files: ${signals.uploadedFiles.length} brand assets` : ''}

ANALYSIS REQUIRED:
1. **Brand Voice & Aesthetic**
   - Analyze visual language, color palette, typography
   - Identify brand personality and tone
   - Determine core values and positioning

2. **Target Audience**
   - Demographics (age, location, lifestyle)
   - Psychographics (values, interests, behaviors)
   - Purchase motivations

3. **Campaign Strategy**
   - Recommended campaign theme/title
   - Primary goal (awareness, conversion, engagement)
   - Tone of voice for content
   - Key messages to communicate
   - Best channels for distribution

4. **Asset Recommendations**
   - What types of photos/videos needed
   - How many of each type
   - Why each asset type matters
   - Priority level (high/medium/low)

5. **Channel-Specific Content Packs**
   - Instagram: Posts, Stories, Reels (with counts and themes)
   - Website: Hero images, product shots, lifestyle images
   - Email: Campaign visuals, banner variants

6. **Pricing Estimate**
   - Base package cost
   - Per-asset pricing
   - Total recommended investment
   - Detailed breakdown by line item

IMPORTANT GUIDELINES:
- Be specific and actionable
- Consider brand's current aesthetic and expand on it
- Recommend 20-40 total assets for a complete campaign
- Price competitively ($5K-$20K range typical)
- Focus on ROI and strategic value
`);

  if (signals.website) {
    parts.push(`\nVisit and analyze: ${signals.website}`);
  }

  if (signals.instagram) {
    parts.push(`\nAnalyze Instagram account: ${signals.instagram}`);
  }

  parts.push(`\n\nReturn detailed structured JSON matching the BrandAnalysis interface.`);

  return parts.join('\n').trim();
}

/**
 * Generate asset recommendations based on brand analysis
 */
export async function generateAssetRecommendations(
  brandAnalysis: BrandAnalysis,
  budget: number
): Promise<Array<{
  type: string;
  count: number;
  description: string;
  estimated_cost: number;
}>> {
  
  const prompt = `
Given this brand analysis:
- Voice: ${brandAnalysis.voice}
- Aesthetic: ${brandAnalysis.aesthetic}
- Budget: $${budget.toLocaleString()}

Generate a detailed shot list for a photo shoot campaign.
Include:
- Asset type (e.g., "Product on white background", "Lifestyle in urban setting")
- Count needed
- Detailed description
- Estimated cost per asset

Return as structured JSON array.
`;

  const response = await callGemini(prompt, {
    features: ['structured_output'],
    temperature: 0.6,
  });

  return response.structuredData?.assets || [];
}

/**
 * Calculate dynamic pricing based on requirements
 */
export function calculateCampaignPricing(
  assetCount: number,
  channels: string[],
  complexity: 'basic' | 'standard' | 'premium' = 'standard'
): {
  base_cost: number;
  per_asset_cost: number;
  channel_multiplier: number;
  total: number;
  breakdown: Array<{ item: string; cost: number }>;
} {
  
  // Base costs by complexity
  const baseCosts = {
    basic: 3000,
    standard: 6000,
    premium: 12000,
  };

  // Per-asset costs
  const perAssetCosts = {
    basic: 150,
    standard: 250,
    premium: 400,
  };

  const baseCost = baseCosts[complexity];
  const perAssetCost = perAssetCosts[complexity];
  const channelMultiplier = 1 + (channels.length - 1) * 0.15; // 15% per additional channel

  const assetsCost = assetCount * perAssetCost;
  const subtotal = baseCost + assetsCost;
  const total = Math.round(subtotal * channelMultiplier);

  const breakdown = [
    { item: 'Creative Direction & Strategy', cost: Math.round(baseCost * 0.3) },
    { item: 'Photography & Videography', cost: Math.round(baseCost * 0.4) },
    { item: 'Styling & Production', cost: Math.round(baseCost * 0.2) },
    { item: 'Post-Production & Editing', cost: Math.round(baseCost * 0.1) },
    { item: `${assetCount} Assets x $${perAssetCost}`, cost: assetsCost },
    { item: 'Multi-Channel Optimization', cost: Math.round(total - subtotal) },
  ];

  return {
    base_cost: baseCost,
    per_asset_cost: perAssetCost,
    channel_multiplier: channelMultiplier,
    total,
    breakdown,
  };
}

/**
 * Default brand analysis (fallback)
 */
function getDefaultBrandAnalysis(): Partial<BrandAnalysis> {
  return {
    voice: 'Modern, authentic, and aspirational',
    aesthetic: 'Clean lines, natural light, contemporary styling',
    values: ['Quality', 'Authenticity', 'Sustainability'],
    target_audience: 'Style-conscious professionals, 25-45, urban markets',
    strategy: {
      title: 'Seasonal Brand Story Campaign',
      goal: 'Increase brand awareness and drive online engagement',
      tone: 'Authentic, warm, and inspiring',
      key_messages: [
        'Timeless design meets modern lifestyle',
        'Quality that lasts, style that matters',
        'Conscious choices, confident style',
      ],
      channels: ['Instagram', 'Website', 'Email Marketing'],
    },
  };
}

/**
 * Default asset recommendations
 */
function getDefaultAssetRecommendations() {
  return [
    {
      type: 'product_photo' as const,
      count: 15,
      rationale: 'Clean product shots for e-commerce and catalog',
      priority: 'high' as const,
    },
    {
      type: 'lifestyle_shot' as const,
      count: 12,
      rationale: 'Contextual imagery showing products in real-world settings',
      priority: 'high' as const,
    },
    {
      type: 'detail_closeup' as const,
      count: 8,
      rationale: 'Highlight craftsmanship, textures, and quality details',
      priority: 'medium' as const,
    },
    {
      type: 'video_snippet' as const,
      count: 5,
      rationale: 'Short-form video for social media (Reels, Stories)',
      priority: 'high' as const,
    },
    {
      type: 'testimonial' as const,
      count: 3,
      rationale: 'Customer stories and brand advocates',
      priority: 'low' as const,
    },
  ];
}

/**
 * Default channel packs
 */
function getDefaultChannelPacks() {
  return {
    instagram: {
      posts: 15,
      stories: 20,
      reels: 5,
      suggested_themes: [
        'Behind the scenes',
        'Product features',
        'Lifestyle moments',
        'Customer stories',
      ],
    },
    website: {
      hero_images: 3,
      product_shots: 15,
      lifestyle_images: 8,
    },
    email: {
      campaign_visuals: 6,
      banner_variants: 4,
    },
  };
}

/**
 * Default pricing
 */
function getDefaultPricing() {
  return calculateCampaignPricing(43, ['Instagram', 'Website', 'Email'], 'standard');
}

/**
 * Compare brand to competitors
 */
export async function compareToCompetitors(
  brandAnalysis: BrandAnalysis,
  competitorNames: string[]
): Promise<{
  positioning: string;
  differentiators: string[];
  opportunities: string[];
  threats: string[];
}> {
  
  const prompt = `
Analyze competitive positioning:

OUR BRAND:
- Voice: ${brandAnalysis.voice}
- Aesthetic: ${brandAnalysis.aesthetic}
- Values: ${brandAnalysis.values.join(', ')}
- Target: ${brandAnalysis.target_audience}

COMPETITORS:
${competitorNames.map(name => `- ${name}`).join('\n')}

Provide:
1. Positioning statement (how we're different)
2. Key differentiators (what makes us unique)
3. Opportunities (where we can win)
4. Threats (competitive risks)

Return as structured JSON.
`;

  const response = await callGemini(prompt, {
    features: ['grounding_search', 'structured_output'],
  });

  return response.structuredData || {
    positioning: 'Premium quality with authentic storytelling',
    differentiators: ['Sustainable materials', 'Timeless design', 'Transparent supply chain'],
    opportunities: ['Digital-first marketing', 'Community engagement', 'Educational content'],
    threats: ['Price competition', 'Fast fashion', 'Market saturation'],
  };
}
