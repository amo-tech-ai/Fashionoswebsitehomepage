import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// --- Types ---

export interface BrandSignals {
  website: string;
  instagram: string;
  commerce: string;
  files?: Array<{ name: string; type: string; url: string }>;
}

export type Channel = 'Instagram' | 'TikTok' | 'YouTube' | 'Facebook' | 'Pinterest' | 'Shopify' | 'Amazon' | 'Website';

export interface ChannelPack {
  channel: Channel;
  outputCount: number;
  formats: string[]; // e.g. ["Feed 4:5", "Reels 9:16"]
  usage: ('Organic' | 'Paid' | 'PDP')[];
  rationale: string;
}

export interface AssetRecipe {
  id: string;
  title: string; // e.g. "PDP Conversion Set"
  outputs: Partial<Record<Channel, number>>; // e.g. { Instagram: 1, Shopify: 8 }
  requirements: string[]; // e.g. ["White Background", "Macro Texture"]
  rationale: string;
  confidence: number;
}

export interface AdCreative {
  id: string;
  platform: Channel;
  format: string;
  hook: string;
  cta: string;
  funnelStage: 'Awareness' | 'Consideration' | 'Conversion';
}

// Deprecated Shot interface maintained for backward compatibility with old wizard if needed,
// but we will primarily use AssetRecipe now.
export interface Shot {
  id: string;
  type: 'photo' | 'video';
  title: string;
  description: string;
  qty: number;
  channel: string[];
  rationale: string;
}

export interface CampaignPlan {
  strategy: {
    title: string;
    goal: string;
    tone: string;
    channels: Channel[];
  };
  assets: {
    source: string;
    url: string; // Placeholder for image URL
    usage?: string;
  }[];
  // We keep 'shots' for compatibility but introduce new fields
  shots: Shot[];
  
  // New Fields
  channelPacks: ChannelPack[];
  recipes: AssetRecipe[];
  ads: AdCreative[];

  roi: {
    conversion: 'high' | 'medium' | 'low';
    awareness: 'high' | 'medium' | 'low';
  };
  pricing: {
    total: number;
    deposit: number;
  };
}

export interface Project {
  id: number | string;
  name: string;
  client: string;
  status: string;
  date: string;
  deliverables: string;
  progress: number;
  image: string;
}

interface BrandShootContextType {
  signals: BrandSignals;
  setSignals: (signals: BrandSignals) => void;
  campaignPlan: CampaignPlan | null;
  setCampaignPlan: (plan: CampaignPlan) => void;
  isAdjustMode: boolean;
  setAdjustMode: (isAdjust: boolean) => void;
  updatePackCount: (channelIndex: number, increment: boolean) => void;
  generateMockPlan: () => void;
  launchCampaign: () => void;
  activeProjects: Project[];
}

// --- Default State ---

const defaultContext: BrandShootContextType = {
  signals: { website: '', instagram: '', commerce: '', files: [] },
  setSignals: () => {},
  campaignPlan: null,
  setCampaignPlan: () => {},
  isAdjustMode: false,
  setAdjustMode: () => {},
  updatePackCount: () => {},
  generateMockPlan: () => {},
  launchCampaign: () => {},
  activeProjects: [],
};

// --- Context & Provider ---

const BrandShootContext = createContext<BrandShootContextType>(defaultContext);

export const useBrandShoot = () => useContext(BrandShootContext);

// --- Constants ---
const BASE_PRICE = 1500; // Base campaign fee
const PRICE_PER_ASSET = 120; // Cost per asset in a pack

export const BrandShootProvider = ({ children }: { children: ReactNode }) => {
  // Load initial state from localStorage
  const [signals, setSignals] = useState<BrandSignals>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('brandShoot_signals');
        return saved ? JSON.parse(saved) : { website: '', instagram: '', commerce: '', files: [] };
      } catch (e) {
        console.error("Failed to load signals from localStorage", e);
        return { website: '', instagram: '', commerce: '', files: [] };
      }
    }
    return { website: '', instagram: '', commerce: '', files: [] };
  });

  const [campaignPlan, setCampaignPlan] = useState<CampaignPlan | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('brandShoot_campaignPlan');
        return saved ? JSON.parse(saved) : null;
      } catch (e) {
        console.error("Failed to load campaign plan from localStorage", e);
        return null;
      }
    }
    return null;
  });

  const [isAdjustMode, setAdjustMode] = useState(false);
  
  // Persist signals to localStorage
  useEffect(() => {
    localStorage.setItem('brandShoot_signals', JSON.stringify(signals));
  }, [signals]);

  // Persist campaign plan to localStorage
  useEffect(() => {
    if (campaignPlan) {
      localStorage.setItem('brandShoot_campaignPlan', JSON.stringify(campaignPlan));
    }
  }, [campaignPlan]);

  // Hardcoded initial projects
  const [activeProjects, setActiveProjects] = useState<Project[]>([
    {
      id: 1,
      name: "Summer 2025 Campaign",
      client: "Acme Fashion",
      status: "Pre-Production",
      date: "Oct 24, 2025",
      deliverables: "45 SKU, 3 Videos",
      progress: 15,
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=300&h=200"
    },
    {
      id: 2,
      name: "Holiday Lookbook",
      client: "Velvet & Silk",
      status: "Editing",
      date: "Oct 20, 2025",
      deliverables: "45 Photos",
      progress: 80,
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=300&h=200"
    },
    {
      id: 3,
      name: "Minimalist Essentials",
      client: "Basis",
      status: "Scheduled",
      date: "Nov 02, 2025",
      deliverables: "12 Photos",
      progress: 15,
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=300&h=200"
    }
  ]);

  // Update pack quantity and recalculate price
  const updatePackCount = (channelIndex: number, increment: boolean) => {
    if (!campaignPlan) return;
    
    const newPlan = { ...campaignPlan };
    const currentCount = newPlan.channelPacks[channelIndex].outputCount;
    
    // Safety check: Don't go below 0
    if (!increment && currentCount <= 0) return;

    // Update count
    newPlan.channelPacks[channelIndex].outputCount = increment ? currentCount + 1 : currentCount - 1;
    
    // Recalculate Total Price
    // Logic: Base Fee + (Total Assets * Price Per Asset)
    const totalAssets = newPlan.channelPacks.reduce((acc, pack) => acc + pack.outputCount, 0);
    const newTotal = BASE_PRICE + (totalAssets * PRICE_PER_ASSET);
    
    newPlan.pricing.total = newTotal;
    newPlan.pricing.deposit = Math.round(newTotal / 2);

    setCampaignPlan(newPlan);
  };

  // Mock AI Generation Logic
  const generateMockPlan = () => {
    // In a real app, this would call an API with the 'signals'
    
    // Initial Counts
    const initialPacks: ChannelPack[] = [
      {
        channel: 'Instagram',
        outputCount: 12,
        formats: ['Feed', 'Stories', 'Reels'],
        usage: ['Organic', 'Paid'],
        rationale: 'Short-form and feed content designed to drive discovery and engagement.'
      },
      {
        channel: 'Shopify',
        outputCount: 8,
        formats: ['Hero Banner', 'Product Cards'],
        usage: ['PDP'],
        rationale: 'High-fidelity product imagery to boost conversion.'
      },
      {
        channel: 'Amazon',
        outputCount: 6,
        formats: ['White Background', 'Infographic'],
        usage: ['PDP'],
        rationale: 'Clean, compliant visuals that build trust.'
      }
    ];

    const totalAssets = initialPacks.reduce((acc, p) => acc + p.outputCount, 0);
    const totalPrice = BASE_PRICE + (totalAssets * PRICE_PER_ASSET);

    const newPlan: CampaignPlan = {
      strategy: {
        title: "Summer '25 Editorial",
        goal: "Product Sales Campaign", // Updated for Step 1
        tone: "Effortless, Warm, High Contrast", // Updated for Step 1
        channels: ["Instagram", "Shopify", "Amazon"],
      },
      assets: [
        { source: "Instagram", url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&auto=format&fit=crop", usage: "Reel Cover" },
        { source: "Website", url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&auto=format&fit=crop", usage: "Hero Banner" },
        { source: "Product", url: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=300&auto=format&fit=crop", usage: "PDP Detail" },
        { source: "Ad", url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=300&auto=format&fit=crop", usage: "Ad Creative" },
      ],
      // Legacy shots
      shots: [], 
      
      // New Channel Packs
      channelPacks: initialPacks,
      
      // New Asset Recipes
      recipes: [
        {
          id: '1',
          title: 'PDP Conversion Set',
          outputs: { Shopify: 8, Amazon: 7 },
          requirements: ['White Background', 'Macro Texture', 'On-Model Toggle'],
          rationale: 'Improves product understanding and reduces hesitation.',
          confidence: 98
        },
        {
          id: '2',
          title: 'Lifestyle & Social Set',
          outputs: { Instagram: 4, TikTok: 2, Website: 1 },
          requirements: ['Natural Light', 'Street Style', 'Motion Blur'],
          rationale: 'Builds brand aspiration and context.',
          confidence: 92
        }
      ],

      // New Ads Creative
      ads: [
        {
          id: 'ad1',
          platform: 'Instagram',
          format: 'Reels 9:16',
          hook: '3 Ways to Style',
          cta: 'Shop Now',
          funnelStage: 'Awareness'
        },
        {
          id: 'ad2',
          platform: 'Facebook',
          format: 'Carousel',
          hook: 'Best Sellers Restocked',
          cta: 'Learn More',
          funnelStage: 'Retargeting'
        }
      ],

      roi: {
        conversion: 'high',
        awareness: 'medium'
      },
      pricing: {
        total: totalPrice,
        deposit: Math.round(totalPrice / 2)
      }
    };
    setCampaignPlan(newPlan);
  };

  const launchCampaign = () => {
    if (!campaignPlan) return;
    
    // Calculate total assets from packs
    const totalAssets = campaignPlan.channelPacks.reduce((acc, pack) => acc + pack.outputCount, 0);

    const newProject: Project = {
      id: Date.now(),
      name: campaignPlan.strategy.title,
      client: "New Client", 
      status: "AI Generated",
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      deliverables: `${totalAssets} Assets`,
      progress: 0,
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=300&h=200"
    };

    setActiveProjects((prev) => [newProject, ...prev]);
  };

  return (
    <BrandShootContext.Provider 
      value={{ 
        signals, 
        setSignals, 
        campaignPlan, 
        setCampaignPlan, 
        isAdjustMode, 
        setAdjustMode,
        updatePackCount,
        generateMockPlan,
        launchCampaign,
        activeProjects
      }}
    >
      {children}
    </BrandShootContext.Provider>
  );
};
