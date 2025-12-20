import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

import { EventTask } from '../lib/types/events.types';

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

export interface CustomizationOption {
  id: string;
  label: string;
  price: number;
  selected: boolean;
  description: string;
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
  
  // Customizations
  customizations: CustomizationOption[];

  roi: {
    conversion: 'high' | 'medium' | 'low';
    awareness: 'high' | 'medium' | 'low';
  };
  pricing: {
    total: number;
    deposit: number;
  };
}

export interface WizardState {
  service: "photography" | "video" | "webdesign" | "socialmedia" | null;
  category: string | null;
  subType: string | null;
  style: string | null;
  scenes: string[];
  talent: string | null;
  addOns: string[];
  channels: string[];
  date: Date | null;
  timeSlot: string | null;
}

export interface ProposalState {
  service: string;
  category: string;
  date?: string;
  timeSlot?: string;
  scenes: string[];
  activeAddOns: string[];
  totalCost: number;
}

export interface WizardState {
  service: "photography" | "video" | "webdesign" | "socialmedia" | null;
  category: string | null;
  subType: string | null;
  style: string | null;
  scenes: string[];
  talent: string | null;
  addOns: string[];
  channels: string[];
  date: Date | null;
  timeSlot: string | null;
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
  updateAsset: (index: number, newUrl: string) => void;
  toggleCustomization: (id: string) => void;
  generateMockPlan: () => void;
  launchCampaign: () => void;
  activeProjects: Project[];
  setActiveProjects: React.Dispatch<React.SetStateAction<Project[]>>; // Expose setter
  bookedTalent: (number | string)[]; // Allow both for compatibility
  setBookedTalent: (ids: (number | string)[]) => void;
  shortlistedLocations: string[];
  setShortlistedLocations: (ids: string[]) => void;
  confirmedLocation: string | null;
  setConfirmedLocation: (id: string | null) => void;
  proposal: ProposalState | null;
  setProposal: (proposal: ProposalState | null) => void;
  
  // New Global Wizard State
  wizardData: WizardState | null;
  setWizardData: (data: WizardState | null) => void;

  // --- New Operational State ---
  shotList: ShotItem[];
  setShotList: (shots: ShotItem[]) => void;
  
  sampleList: SampleItem[];
  setSampleList: (samples: SampleItem[]) => void;
  
  callSheetSchedule: ScheduleBlock[];
  setCallSheetSchedule: (schedule: ScheduleBlock[]) => void;

  galleryAssets: GalleryAsset[];
  setGalleryAssets: (assets: GalleryAsset[]) => void;

  productionChecklist: {
    shotListLocked: boolean;
    talentConfirmed: boolean;
    stylingBreakdown: boolean;
    callSheetIssued: boolean;
  };
  updateChecklist: (key: keyof BrandShootContextType['productionChecklist'], value: boolean) => void;
}

// --- New Operational Interfaces ---

export interface GalleryAsset {
  id: number | string;
  name: string;
  type: 'image' | 'video';
  status: 'Pending' | 'Approved' | 'Rejected';
  aiScore: number;
  aiReason: string;
  url: string;
  date: string;
  linkedShotId?: number | string; // Link to Shot List
}

export interface ShotItem {
  id: number | string;
  name: string;
  type: 'Photo' | 'Video';
  notes: string;
  scene: string;
  talent: string;
  status: 'Planned' | 'Shooting' | 'Completed';
  price: number;
  image: string | null;
}

export interface SampleItem {
  id: string;
  name: string;
  sku: string;
  variant: string;
  image: string;
  status: 'awaiting' | 'on_set' | 'shot' | 'returned';
  isHero: boolean;
  priority: number;
}

export interface ScheduleBlock {
  id: string;
  time: string;
  endTime: string;
  title: string;
  location: string;
  talent: string;
  type: 'indoor' | 'outdoor' | 'break' | 'admin';
  description?: string;
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
  updateAsset: () => {},
  toggleCustomization: () => {},
  generateMockPlan: () => {},
  launchCampaign: () => {},
  activeProjects: [],
  setActiveProjects: () => {},
  bookedTalent: [],
  setBookedTalent: () => {},
  shortlistedLocations: [],
  setShortlistedLocations: () => {},
  confirmedLocation: null,
  setConfirmedLocation: () => {},
  proposal: null,
  setProposal: () => {},
  
  wizardData: null,
  setWizardData: () => {},
  
  // New Defaults
  shotList: [],
  setShotList: () => {},
  sampleList: [],
  setSampleList: () => {},
  callSheetSchedule: [],
  setCallSheetSchedule: () => {},
  galleryAssets: [],
  setGalleryAssets: () => {},
  productionChecklist: {
    shotListLocked: true,
    talentConfirmed: true,
    stylingBreakdown: false,
    callSheetIssued: false
  },
  updateChecklist: () => {}
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

  const [bookedTalent, setBookedTalent] = useState<(number | string)[]>([]);
  const [shortlistedLocations, setShortlistedLocations] = useState<string[]>([]);
  const [confirmedLocation, setConfirmedLocation] = useState<string | null>(null);

  const [wizardData, setWizardData] = useState<WizardState | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('brandShoot_wizardData');
        return saved ? JSON.parse(saved) : null;
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    if (wizardData) {
      localStorage.setItem('brandShoot_wizardData', JSON.stringify(wizardData));
    }
  }, [wizardData]);

  // Proposal State for Persistence
  const [proposal, setProposal] = useState<ProposalState | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('brandShoot_proposal');
        return saved ? JSON.parse(saved) : null;
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  // --- Operational State Implementation ---
  
  const [shotList, setShotList] = useState<ShotItem[]>([
    {
      id: 1,
      name: "Hero Shot - Front",
      type: "Photo",
      notes: "Clean white background, soft shadows to highlight texture.",
      scene: "White Seamless",
      talent: "None",
      status: "Completed",
      price: 250,
      image: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=300&h=200"
    },
    {
      id: 2,
      name: "Lifestyle - Application",
      type: "Video",
      notes: "Model applying serum to cheek, slow motion.",
      scene: "Bathroom Set",
      talent: "Sarah K.",
      status: "Planned",
      price: 450,
      image: null
    },
    {
      id: 3,
      name: "Texture Macro",
      type: "Photo",
      notes: "Extreme close-up of the serum drop.",
      scene: "Macro Table",
      talent: "None",
      status: "Shooting",
      price: 250,
      image: null
    }
  ]);

  const [sampleList, setSampleList] = useState<SampleItem[]>([
    {
      id: '1',
      name: 'Cashmere Oversized Coat',
      sku: 'CO-24-BK',
      variant: 'Midnight Black / M',
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80',
      status: 'shot',
      isHero: true,
      priority: 1
    },
    {
      id: '2',
      name: 'Silk Pleated Trousers',
      sku: 'TR-24-CR',
      variant: 'Cream / 38',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&q=80',
      status: 'on_set',
      isHero: true,
      priority: 2
    },
    {
      id: '3',
      name: 'Structured Wool Blazer',
      sku: 'BL-24-GR',
      variant: 'Charcoal / 40',
      image: 'https://images.unsplash.com/photo-1591369822096-35c938988a29?w=400&q=80',
      status: 'awaiting',
      isHero: false,
      priority: 3
    },
    {
      id: '4',
      name: 'Leather Ankle Boots',
      sku: 'BT-24-BK',
      variant: 'Black / 39',
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&q=80',
      status: 'awaiting',
      isHero: false,
      priority: 4
    },
    {
      id: '5',
      name: 'Signature Silk Scarf',
      sku: 'SC-24-PR',
      variant: 'Print / One Size',
      image: 'https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?w=400&q=80',
      status: 'returned',
      isHero: false,
      priority: 5
    }
  ]);

  const [callSheetSchedule, setCallSheetSchedule] = useState<ScheduleBlock[]>([
    {
      id: '1',
      time: '08:00 AM',
      endTime: '09:00 AM',
      title: 'Crew Call & Breakfast',
      location: 'Base Camp',
      talent: 'All Crew',
      type: 'admin',
      description: 'Coffee, gear check, safety briefing'
    },
    {
      id: '2',
      time: '09:00 AM',
      endTime: '12:00 PM',
      title: 'Scene 1: Studio Portraits',
      location: 'Studio A (Indoor)',
      talent: 'Sarah, David',
      type: 'indoor',
      description: 'White cyc wall, high contrast lighting'
    },
    {
      id: '3',
      time: '12:00 PM',
      endTime: '01:00 PM',
      title: 'Lunch Break',
      location: 'Catering Tent',
      talent: 'All',
      type: 'break'
    },
    {
      id: '4',
      time: '01:00 PM',
      endTime: '04:00 PM',
      title: 'Scene 2: Urban Street Style',
      location: 'Rooftop Garden (Outdoor)',
      talent: 'Sarah, David',
      type: 'outdoor',
      description: 'Natural light, city backdrop'
    },
    {
      id: '5',
      time: '04:00 PM',
      endTime: '05:00 PM',
      title: 'Wrap & Breakdown',
      location: 'Base Camp',
      talent: 'All Crew',
      type: 'admin'
    }
  ]);

  const [galleryAssets, setGalleryAssets] = useState<GalleryAsset[]>([]);

  const [productionChecklist, setProductionChecklist] = useState({
    shotListLocked: true,
    talentConfirmed: true,
    stylingBreakdown: false,
    callSheetIssued: false
  });

  const updateChecklist = (key: keyof typeof productionChecklist, value: boolean) => {
    setProductionChecklist(prev => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    if (proposal) {
      localStorage.setItem('brandShoot_proposal', JSON.stringify(proposal));
    }
  }, [proposal]);

  // Helper to calculate total price
  const calculateTotal = (plan: CampaignPlan) => {
    const totalAssets = plan.channelPacks.reduce((acc, pack) => acc + pack.outputCount, 0);
    const assetCost = totalAssets * PRICE_PER_ASSET;
    const customizationCost = plan.customizations?.reduce((acc, item) => item.selected ? acc + item.price : acc, 0) || 0;
    return BASE_PRICE + assetCost + customizationCost;
  };

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
    const newTotal = calculateTotal(newPlan);
    
    newPlan.pricing.total = newTotal;
    newPlan.pricing.deposit = Math.round(newTotal / 2);

    setCampaignPlan(newPlan);
  };

  const updateAsset = (index: number, newUrl: string) => {
    if (!campaignPlan) return;
    const newPlan = { ...campaignPlan };
    if (newPlan.assets[index]) {
        newPlan.assets[index].url = newUrl;
        setCampaignPlan(newPlan);
    }
  };

  const toggleCustomization = (id: string) => {
    if (!campaignPlan) return;
    const newPlan = { ...campaignPlan };
    const item = newPlan.customizations?.find(c => c.id === id);
    if (item) {
        item.selected = !item.selected;
        
        // Recalculate price
        const newTotal = calculateTotal(newPlan);
        newPlan.pricing.total = newTotal;
        newPlan.pricing.deposit = Math.round(newTotal / 2);
        
        setCampaignPlan(newPlan);
    }
  };

  // Mock AI Generation Logic
  const generateMockPlan = () => {
    // Determine Brand Name
    let brandName = "Brand";
    if (signals.website) {
      try {
        const hostname = new URL(signals.website.startsWith('http') ? signals.website : `https://${signals.website}`).hostname;
        brandName = hostname.replace('www.', '').split('.')[0];
        brandName = brandName.charAt(0).toUpperCase() + brandName.slice(1);
      } catch (e) {
        brandName = "Brand";
      }
    } else if (signals.instagram) {
      brandName = signals.instagram.replace('@', '');
    }

    // Determine Base Assets (Use uploaded if available, else Unsplash)
    const userImages = signals.files?.map(f => f.url) || [];
    const getAsset = (idx: number, fallback: string) => userImages[idx] || fallback;

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
        title: `${brandName} Summer '25`,
        goal: "Product Sales Campaign",
        tone: "Effortless, Warm, High Contrast",
        channels: ["Instagram", "Shopify", "Amazon"],
      },
      assets: [
        { source: "Instagram", url: getAsset(0, "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&auto=format&fit=crop"), usage: "Reel Cover" },
        { source: "Website", url: getAsset(1, "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&auto=format&fit=crop"), usage: "Hero Banner" },
        { source: "Product", url: getAsset(2, "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=300&auto=format&fit=crop"), usage: "PDP Detail" },
        { source: "Ad", url: getAsset(3, "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=300&auto=format&fit=crop"), usage: "Ad Creative" },
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
      
      // Default Customizations
      customizations: [
        { id: 'c1', label: 'Senior Art Director', price: 1200, selected: true, description: 'On-set creative direction and oversight' },
        { id: 'c2', label: 'Hair & Makeup Artist', price: 850, selected: true, description: 'Full day beauty services' },
        { id: 'c3', label: 'Wardrobe Stylist', price: 950, selected: true, description: 'Sourcing and on-set styling' },
        { id: 'c4', label: 'Social Cuts (3x)', price: 600, selected: false, description: 'Extra short-form edits for TikTok/Reels' },
        { id: 'c5', label: 'Rush Delivery (48h)', price: 500, selected: false, description: 'Expedited post-production' }
      ],

      roi: {
        conversion: 'high',
        awareness: 'medium'
      },
      pricing: {
        total: totalPrice + 1200 + 850 + 950, // Base + Assets + Default Selected Customizations
        deposit: Math.round((totalPrice + 1200 + 850 + 950) / 2)
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
      status: "Pre-Production",
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
        updateAsset,
        toggleCustomization,
        generateMockPlan,
        launchCampaign,
        activeProjects,
        setActiveProjects,
        bookedTalent,
        setBookedTalent,
        shortlistedLocations,
        setShortlistedLocations,
        confirmedLocation,
        setConfirmedLocation,
        proposal,
        setProposal,
        wizardData,
        setWizardData,
        shotList,
        setShotList,
        sampleList,
        setSampleList,
        callSheetSchedule,
        setCallSheetSchedule,
        galleryAssets,
        setGalleryAssets,
        productionChecklist,
        updateChecklist
      }}
    >
      {children}
    </BrandShootContext.Provider>
  );
};
