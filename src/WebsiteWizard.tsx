import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Camera,
  Upload,
  X,
  Home,
  User,
  ShoppingBag,
  FileText,
  Grid,
  Briefcase,
  Star,
  Image as ImageIcon,
  Mail,
  Megaphone,
  Send,
  Calendar as CalendarIcon,
  Users,
  Instagram,
  MessageCircle,
  BarChart,
  Search,
  Save,
  Download,
  Globe,
  Palette,
  Zap,
  ChevronDown,
  Plus,
  AlertCircle,
  Sparkles,
  CreditCard,
  Package,
  Truck,
  Tag,
  Ticket,
  Heart,
  RefreshCw,
  ShoppingCart,
  Clock,
  DollarSign,
  Layout,
  FileCheck,
  Share,
  Printer
} from "lucide-react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";

import { WebsiteBriefDashboard } from "./components/wizards/WebsiteBriefDashboard";

// --- Types ---

export type WizardStep = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type WebsiteType = "portfolio" | "ecommerce" | "landing" | "creator";
export type VisualStyle = "minimalist" | "luxury" | "bold" | "dark";
export type BudgetTier = "starter" | "growth" | "pro" | "enterprise";

export interface PageConfig {
  id: string;
  name: string;
  selected: boolean;
  hasContent: boolean;
  needsAI: boolean;
  description: string;
  icon: any;
  contentNeeded: string[];
  image: string;
}

export interface WebsiteWizardState {
  // Step 1
  websiteType: WebsiteType | null;
  goals: string[];
  audience: string;
  results: string;

  // Step 2
  logo: File | null;
  brandGuidelines: File | null;
  colorPalette: string[];
  visualStyle: VisualStyle | null;
  inspirationImages: File[];
  brandWords: string;
  emotions: string;

  // Step 3
  pages: PageConfig[];

  // Step 4
  textContent: string;
  contentFiles: File[];
  productImages: File[];
  moodboardImages: File[];
  aiCopywriting: boolean;

  // Step 5 (E-Commerce)
  numProducts: number;
  productCategories: string[];
  needPhotography: boolean;
  variants: boolean;
  inventoryTracking: boolean;
  discountCodes: boolean;
  customerLogin: boolean;
  wishlist: boolean;
  subscriptions: boolean;
  digitalProducts: boolean;
  abandonedCart: boolean;
  paymentGateways: string[];
  currencies: string[];
  shippingRules: string;
  freeShippingThreshold: string;
  flatRateShipping: string;
  realTimeRates: boolean;

  // Step 6
  features: string[];

  // Step 7
  timeline: string;
  customDate: Date | null;
  budget: number;
  budgetTier: BudgetTier | null;
  finalNotes: string;
}

// --- Data ---

const WEBSITE_TYPES = [
  {
    id: "portfolio" as WebsiteType,
    label: "Business / Portfolio",
    description: "Showcase your work and build your professional presence",
    image: "https://images.unsplash.com/photo-1695634621375-0b66a9d5d1bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwcG9ydGZvbGlvJTIwd2Vic2l0ZSUyMGRlc2lnbnxlbnwxfHx8fDE3NjUyNzIwNjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    icon: Briefcase
  },
  {
    id: "ecommerce" as WebsiteType,
    label: "E-Commerce Store",
    description: "Sell products online with a complete shopping experience",
    image: "https://images.unsplash.com/photo-1461559289991-233af43c1ea6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBzaG9wJTIwZ3JpZCUyMGludGVyZmFjZXxlbnwxfHx8fDE3NjUyNzIwNjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    icon: ShoppingBag
  },
  {
    id: "landing" as WebsiteType,
    label: "Landing Page",
    description: "Convert visitors with a focused single-page experience",
    image: "https://images.unsplash.com/photo-1761523127604-abd851d84c30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYW5kaW5nJTIwcGFnZSUyMGhlcm8lMjBkZXNpZ258ZW58MXx8fHwxNzY1MjcyMDcxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    icon: Zap
  },
  {
    id: "creator" as WebsiteType,
    label: "Personal Brand / Creator",
    description: "Build your personal brand and connect with your audience",
    image: "https://images.unsplash.com/photo-1721864428830-7417b93831b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdG9yJTIwcGVyc29uYWwlMjBicmFuZCUyMHdlYnNpdGV8ZW58MXx8fHwxNzY1MjcyMDc0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    icon: User
  }
];

const GOAL_OPTIONS = [
  "Increase Sales",
  "Build Brand Awareness",
  "Generate Leads",
  "Showcase Portfolio",
  "Educate Audience",
  "Launch Product",
  "Build Community",
  "Sell Services"
];

const VISUAL_STYLES = [
  {
    id: "minimalist" as VisualStyle,
    label: "Minimalist",
    description: "Clean, spacious, neutral colors",
    image: "https://images.unsplash.com/photo-1567978575885-e1c8f4fda634?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwd2Vic2l0ZSUyMGNsZWFuJTIwd2hpdGV8ZW58MXx8fHwxNzY1MjcyMDc3fDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: "luxury" as VisualStyle,
    label: "Luxury Editorial",
    description: "Dark backgrounds, gold accents, serif fonts",
    image: "https://images.unsplash.com/photo-1718670013988-c6e3edb92345?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBlZGl0b3JpYWwlMjBkYXJrJTIwd2Vic2l0ZXxlbnwxfHx8fDE3NjUyNzIwODB8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: "bold" as VisualStyle,
    label: "Bold & Colorful",
    description: "Bright colors, large type, energetic",
    image: "https://images.unsplash.com/photo-1608699565448-9492aaf3c708?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib2xkJTIwY29sb3JmdWwlMjBicmlnaHQlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzY1MjcyMDgzfDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: "dark" as VisualStyle,
    label: "Dark / High Contrast",
    description: "Dark mode, high contrast, modern",
    image: "https://images.unsplash.com/photo-1762340276397-db7ca4ee6ab6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwbW9kZSUyMG1vZGVybiUyMGludGVyZmFjZXxlbnwxfHx8fDE3NjUyNzIwODV8MA&ixlib=rb-4.1.0&q=80&w=1080"
  }
];

const PAGE_TYPES: PageConfig[] = [
  {
    id: "home",
    name: "Home",
    selected: true,
    hasContent: false,
    needsAI: false,
    description: "Your main landing page with hero section, features, and calls-to-action",
    icon: Home,
    contentNeeded: ["Hero headline & copy", "Featured images", "Call-to-action text"],
    image: "https://images.unsplash.com/photo-1695062007675-d00074494439?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWJzaXRlJTIwaG9tZSUyMHBhZ2UlMjBkZXNpZ24lMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzY1Mjc0MDU4fDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: "about",
    name: "About",
    selected: false,
    hasContent: false,
    needsAI: false,
    description: "Tell your brand story and showcase your team",
    icon: User,
    contentNeeded: ["Brand story", "Team photos", "Company values"],
    image: "https://images.unsplash.com/photo-1517309561013-16f6e4020305?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWJzaXRlJTIwYWJvdXQlMjB1cyUyMHBhZ2UlMjB0ZWFtJTIwZGVzaWdufGVufDF8fHx8MTc2NTI3NDA1OHww&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: "services",
    name: "Services",
    selected: false,
    hasContent: false,
    needsAI: false,
    description: "Detail your service offerings and pricing",
    icon: Briefcase,
    contentNeeded: ["Service descriptions", "Pricing", "Process details"],
    image: "https://images.unsplash.com/photo-1605606722649-39761c5a3397?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXJ2aWNlcyUyMGxpc3QlMjB3ZWJzaXRlJTIwcGFnZSUyMGRlc2lnbnxlbnwxfHx8fDE3NjUyNzQwNTh8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: "portfolio",
    name: "Portfolio",
    selected: false,
    hasContent: false,
    needsAI: false,
    description: "Showcase your work with case studies and project galleries",
    icon: Grid,
    contentNeeded: ["Project images", "Case studies", "Client testimonials"],
    image: "https://images.unsplash.com/photo-1502945015378-0e284ca1a5be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0Zm9saW8lMjBjYXNlJTIwc3R1ZHklMjBncmlkJTIwd2Vic2l0ZXxlbnwxfHx8fDE3NjUyNzQwNTh8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: "shop",
    name: "Shop",
    selected: false,
    hasContent: false,
    needsAI: false,
    description: "Product catalog with filtering and shopping features",
    icon: ShoppingBag,
    contentNeeded: ["Product images", "Product descriptions", "Categories"],
    image: "https://images.unsplash.com/photo-1541415534056-fad380cd68a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBzaG9wJTIwZ3JpZCUyMHBhZ2UlMjBkZXNpZ258ZW58MXx8fHwxNzY1Mjc0MDU4fDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: "product",
    name: "Product Page",
    selected: false,
    hasContent: false,
    needsAI: false,
    description: "Individual product detail page with images, specs, and purchase options",
    icon: Package,
    contentNeeded: ["Product photos", "Specifications", "Pricing"],
    image: "https://images.unsplash.com/photo-1579642984094-5be053d579b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBwcm9kdWN0JTIwZGV0YWlsJTIwcGFnZSUyMGRlc2lnbnxlbnwxfHx8fDE3NjUyNzQwNTh8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: "testimonials",
    name: "Testimonials",
    selected: false,
    hasContent: false,
    needsAI: false,
    description: "Display customer reviews and success stories",
    icon: Star,
    contentNeeded: ["Customer quotes", "Photos", "Company names"],
    image: "https://images.unsplash.com/photo-1620287341056-49a2f1ab2fdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWJzaXRlJTIwdGVzdGltb25pYWxzJTIwcmV2aWV3JTIwc2VjdGlvbiUyMGRlc2lnbnxlbnwxfHx8fDE3NjUyNzQwNTh8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: "contact",
    name: "Contact",
    selected: false,
    hasContent: false,
    needsAI: false,
    description: "Contact form, location, and business hours",
    icon: Mail,
    contentNeeded: ["Contact details", "Office address", "Business hours"],
    image: "https://images.unsplash.com/photo-1762330475080-fb8363563b5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250YWN0JTIwcGFnZSUyMHdlYnNpdGUlMjBkZXNpZ258ZW58MXx8fHwxNzY1Mjc0MDY1fDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: "blog",
    name: "Blog",
    selected: false,
    hasContent: false,
    needsAI: false,
    description: "Share articles, news, and thought leadership content",
    icon: FileText,
    contentNeeded: ["Blog posts", "Author bios", "Featured images"],
    image: "https://images.unsplash.com/photo-1759267134700-c2b34528c852?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9nJTIwYXJ0aWNsZSUyMGxpc3QlMjBwYWdlJTIwZGVzaWdufGVufDF8fHx8MTc2NTI3NDA1OHww&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: "lookbook",
    name: "Lookbook",
    selected: false,
    hasContent: false,
    needsAI: false,
    description: "Seasonal collection or product showcase gallery",
    icon: ImageIcon,
    contentNeeded: ["Collection photos", "Season theme", "Product names"],
    image: "https://images.unsplash.com/photo-1641877852762-df7d253e6c45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbG9va2Jvb2slMjBnYWxsZXJ5JTIwd2Vic2l0ZXxlbnwxfHx8fDE3NjUyNzQwNTh8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: "campaign",
    name: "Campaign",
    selected: false,
    hasContent: false,
    needsAI: false,
    description: "Special event or promotional landing page",
    icon: Megaphone,
    contentNeeded: ["Campaign assets", "Promotion details", "CTA copy"],
    image: "https://images.unsplash.com/photo-1760008486593-a85315610136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJrZXRpbmclMjBjYW1wYWlnbiUyMGxhbmRpbmclMjBwYWdlJTIwZGVzaWdufGVufDF8fHx8MTc2NTI3NDA1OHww&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: "custom",
    name: "Custom Page",
    selected: false,
    hasContent: false,
    needsAI: false,
    description: "Specify your unique page requirements",
    icon: Plus,
    contentNeeded: ["Custom requirements"],
    image: "https://images.unsplash.com/photo-1765238334613-4ba260e0c976?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGRlc2lnbiUyMHByb2Nlc3MlMjBjcmVhdGl2ZXxlbnwxfHx8fDE3NjUyNzQwODh8MA&ixlib=rb-4.1.0&q=80&w=1080"
  }
];

const FEATURE_OPTIONS = [
  {
    id: "contact-form",
    name: "Contact Forms",
    description: "Custom contact and inquiry forms with email notifications",
    icon: Mail,
    config: ["Form fields", "Email recipient", "Thank you message"]
  },
  {
    id: "newsletter",
    name: "Newsletter",
    description: "Email signup and integration with marketing platforms",
    icon: Send,
    config: ["Platform: Mailchimp / Supabase / ConvertKit", "Popup / Inline form", "Welcome automation"]
  },
  {
    id: "booking",
    name: "Booking Calendar",
    description: "Appointment scheduling and calendar integration",
    icon: CalendarIcon,
    config: ["Service types", "Availability", "Payment integration"]
  },
  {
    id: "crm",
    name: "CRM Integration",
    description: "Customer relationship management system connection",
    icon: Users,
    config: ["Platform: HubSpot / Salesforce / Zoho", "Lead capture", "Contact sync"]
  },
  {
    id: "instagram",
    name: "Instagram Feed",
    description: "Live Instagram feed displayed on your website",
    icon: Instagram,
    config: ["Account connection", "Number of posts", "Layout style"]
  },
  {
    id: "tiktok",
    name: "TikTok Feed",
    description: "Embed TikTok videos with autoplay",
    icon: Sparkles,
    config: ["Account connection", "Video selection", "Autoplay settings"]
  },
  {
    id: "blog-cms",
    name: "Blog CMS",
    description: "Content management system for blog posts",
    icon: FileText,
    config: ["Categories", "Tags", "Author management"]
  },
  {
    id: "chatbot",
    name: "Chatbot",
    description: "AI-powered customer support chat",
    icon: MessageCircle,
    config: ["Platform: Intercom / Drift / Custom", "Auto-responses", "Human handoff"]
  },
  {
    id: "analytics",
    name: "Analytics",
    description: "Google Analytics 4 and Meta Pixel tracking",
    icon: BarChart,
    config: ["Google Analytics 4", "Meta Pixel", "Custom events"]
  },
  {
    id: "seo",
    name: "SEO Tools",
    description: "Search engine optimization and metadata",
    icon: Search,
    config: ["Meta titles & descriptions", "Schema markup", "XML sitemap"]
  }
];

const BUDGET_TIERS = [
  {
    id: "starter" as BudgetTier,
    name: "Starter",
    range: "$5k - $15k",
    min: 5000,
    max: 15000,
    description: "Perfect for simple websites and landing pages",
    includes: ["Up to 5 pages", "Basic features", "Mobile responsive", "2 weeks - 1 month"]
  },
  {
    id: "growth" as BudgetTier,
    name: "Growth",
    range: "$15k - $35k",
    min: 15000,
    max: 35000,
    description: "Ideal for growing businesses and e-commerce",
    includes: ["Up to 15 pages", "Advanced features", "CMS integration", "1 - 2 months"]
  },
  {
    id: "pro" as BudgetTier,
    name: "Pro",
    range: "$35k - $75k",
    min: 35000,
    max: 75000,
    description: "For complex sites with custom functionality",
    includes: ["Unlimited pages", "Custom features", "API integrations", "2 - 3 months"]
  },
  {
    id: "enterprise" as BudgetTier,
    name: "Enterprise",
    range: "$75k+",
    min: 75000,
    max: 150000,
    description: "Full-scale platforms with dedicated support",
    includes: ["Enterprise features", "Dedicated team", "Ongoing support", "3+ months"]
  }
];

// --- Main Component ---

export default function WebsiteWizard({ initialStep = 1 }: { initialStep?: WizardStep }) {
  const [currentStep, setCurrentStep] = useState<WizardStep>(initialStep);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedPageDetail, setSelectedPageDetail] = useState<PageConfig | null>(null);
  const [selectedFeatureDetail, setSelectedFeatureDetail] = useState<any>(null);
  const [aiBriefLoading, setAiBriefLoading] = useState(false);
  const [generatedBrief, setGeneratedBrief] = useState("");
  const [activeAssetTab, setActiveAssetTab] = useState<"brand" | "product" | "moodboard" | "ui">("brand");

  const [state, setState] = useState<WebsiteWizardState>({
    websiteType: null,
    goals: [],
    audience: "",
    results: "",
    logo: null,
    brandGuidelines: null,
    colorPalette: [],
    visualStyle: null,
    inspirationImages: [],
    brandWords: "",
    emotions: "",
    pages: PAGE_TYPES,
    textContent: "",
    contentFiles: [],
    productImages: [],
    moodboardImages: [],
    aiCopywriting: false,
    numProducts: 0,
    productCategories: [],
    needPhotography: false,
    variants: false,
    inventoryTracking: false,
    discountCodes: false,
    customerLogin: false,
    wishlist: false,
    subscriptions: false,
    digitalProducts: false,
    abandonedCart: false,
    paymentGateways: [],
    currencies: [],
    shippingRules: "",
    freeShippingThreshold: "",
    flatRateShipping: "",
    realTimeRates: false,
    features: [],
    timeline: "",
    customDate: null,
    budget: 25000,
    budgetTier: null,
    finalNotes: ""
  });

  // Conditional logic for e-commerce
  const shouldShowEcommerce = state.websiteType === "ecommerce";

  const getNextStep = (current: WizardStep): WizardStep => {
    if (current === 4 && !shouldShowEcommerce) return 6 as WizardStep;
    if (current < 9) return (current + 1) as WizardStep;
    return current;
  };

  const getPrevStep = (current: WizardStep): WizardStep => {
    if (current === 6 && !shouldShowEcommerce) return 4 as WizardStep;
    if (current > 1) return (current - 1) as WizardStep;
    return current;
  };

  const handleNext = () => {
    if (!canProceed(currentStep)) return;
    const nextStep = getNextStep(currentStep);
    setCurrentStep(nextStep);
    if (nextStep === 8) {
      generateBrief();
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setCurrentStep(getPrevStep(currentStep));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const canProceed = (step: WizardStep): boolean => {
    switch (step) {
      case 1:
        return state.websiteType !== null;
      case 2:
        return state.visualStyle !== null;
      case 3:
        return state.pages.some(p => p.selected);
      case 4:
        return true;
      case 5:
        return !shouldShowEcommerce || state.numProducts > 0;
      case 6:
        return true;
      case 7:
        return state.timeline !== "" && state.budget > 0;
      default:
        return true;
    }
  };

  const saveDraft = () => {
    const draft = {
      state,
      currentStep,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem("website-wizard-draft", JSON.stringify(draft));
    alert("Draft saved successfully!");
  };

  const generateBrief = async () => {
    setAiBriefLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    const selectedPages = state.pages.filter(p => p.selected).map(p => p.name).join(", ");
    const selectedFeatures = FEATURE_OPTIONS.filter(f => state.features.includes(f.id)).map(f => f.name).join(", ");

    const brief = `
# Website Design Brief

**Generated:** ${new Date().toLocaleDateString()}

## PROJECT OVERVIEW

**Website Type:** ${state.websiteType ? WEBSITE_TYPES.find(t => t.id === state.websiteType)?.label : "Not specified"}

**Primary Goals:**
${state.goals.map(g => `• ${g}`).join("\n") || "• Not specified"}

**Target Audience:** ${state.audience || "Not specified"}

**Desired Results:** ${state.results || "Not specified"}

---

## BRAND DIRECTION

**Visual Style:** ${state.visualStyle ? VISUAL_STYLES.find(s => s.id === state.visualStyle)?.label : "Not specified"}

**Brand Descriptors:** ${state.brandWords || "Not specified"}

**Brand Emotions:** ${state.emotions || "Not specified"}

**Color Palette:** ${state.colorPalette.length > 0 ? state.colorPalette.join(", ") : "To be defined"}

**Assets Provided:**
${state.logo ? "• Logo uploaded ✓" : "• Logo needed"}
${state.brandGuidelines ? "• Brand guidelines uploaded ✓" : "• Brand guidelines needed"}
${state.inspirationImages.length > 0 ? `• ${state.inspirationImages.length} inspiration images uploaded ✓` : "• Inspiration images needed"}

---

## PAGES & STRUCTURE

**Pages Required:**
${selectedPages || "No pages selected"}

**Content Status:**
${state.textContent ? "• Text content provided ✓" : "• Text content needed"}
${state.contentFiles.length > 0 ? `• ${state.contentFiles.length} content files uploaded ✓` : ""}
${state.aiCopywriting ? "• AI copywriting requested ✓" : ""}

${state.websiteType === "ecommerce" ? `
---

## E-COMMERCE CONFIGURATION

**Products:** ${state.numProducts} products
**Categories:** ${state.productCategories.join(", ") || "Not specified"}
**Product Photography:** ${state.needPhotography ? "Required" : "Not required"}

**Store Features:**
${state.variants ? "• Product variants (size/color) ✓" : ""}
${state.inventoryTracking ? "• Inventory tracking ✓" : ""}
${state.discountCodes ? "• Discount codes ✓" : ""}
${state.customerLogin ? "• Customer login ✓" : ""}
${state.wishlist ? "• Wishlist functionality ✓" : ""}
${state.subscriptions ? "• Subscription products ✓" : ""}
${state.digitalProducts ? "• Digital products ✓" : ""}

**Payment Gateways:** ${state.paymentGateways.join(", ") || "To be configured"}
**Currencies:** ${state.currencies.join(", ") || "USD"}
**Shipping:** ${state.shippingRules || "To be configured"}
` : ""}

---

## FEATURES & INTEGRATIONS

${selectedFeatures || "No additional features selected"}

---

## PROJECT TIMELINE & BUDGET

**Timeline:** ${state.timeline || "Not specified"}
${state.customDate ? `**Launch Date:** ${state.customDate.toLocaleDateString()}` : ""}

**Budget:** $${state.budget.toLocaleString()}
**Recommended Tier:** ${getRecommendedTier(state).toUpperCase()}

**Additional Notes:**
${state.finalNotes || "None"}

---

## ESTIMATED SCOPE

**Timeline Estimate:** ${getTimelineEstimate(state)}
**Team Size:** ${getTeamSize(state)}
**Complexity:** ${getComplexityLevel(state)}

---

**Next Steps:**
1. Review and approve this brief
2. Sign contract and make deposit
3. Kick-off call to review requirements
4. Begin design phase
    `;

    setGeneratedBrief(brief);
    setAiBriefLoading(false);
  };

  const getRecommendedTier = (state: WebsiteWizardState): string => {
    let score = 0;
    if (state.websiteType === "ecommerce") score += 2;
    score += state.pages.filter(p => p.selected).length * 0.5;
    score += state.features.length * 0.5;
    if (state.variants) score += 1;
    if (state.subscriptions) score += 2;

    if (score <= 5) return "Starter";
    if (score <= 10) return "Growth";
    if (score <= 15) return "Pro";
    return "Enterprise";
  };

  const getTimelineEstimate = (state: WebsiteWizardState): string => {
    const tier = getRecommendedTier(state);
    switch (tier) {
      case "Starter": return "2-4 weeks";
      case "Growth": return "4-8 weeks";
      case "Pro": return "8-12 weeks";
      case "Enterprise": return "12-16 weeks";
      default: return "4-8 weeks";
    }
  };

  const getTeamSize = (state: WebsiteWizardState): string => {
    const tier = getRecommendedTier(state);
    switch (tier) {
      case "Starter": return "2-3 people";
      case "Growth": return "3-4 people";
      case "Pro": return "4-6 people";
      case "Enterprise": return "6-8 people";
      default: return "3-4 people";
    }
  };

  const getComplexityLevel = (state: WebsiteWizardState): string => {
    const tier = getRecommendedTier(state);
    switch (tier) {
      case "Starter": return "Low to Medium";
      case "Growth": return "Medium";
      case "Pro": return "Medium to High";
      case "Enterprise": return "High";
      default: return "Medium";
    }
  };

  const toggleGoal = (goal: string) => {
    setState(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const togglePage = (pageId: string) => {
    setState(prev => ({
      ...prev,
      pages: prev.pages.map(p =>
        p.id === pageId ? { ...p, selected: !p.selected } : p
      )
    }));
  };

  const toggleFeature = (featureId: string) => {
    setState(prev => ({
      ...prev,
      features: prev.features.includes(featureId)
        ? prev.features.filter(f => f !== featureId)
        : [...prev.features, featureId]
    }));
  };

  const openFeatureDrawer = (feature: any) => {
    setSelectedFeatureDetail(feature);
    setSelectedPageDetail(null);
    setDrawerOpen(true);
  };

  const addColor = () => {
    const color = prompt("Enter hex color code (e.g., #FF5733):");
    if (color && /^#[0-9A-F]{6}$/i.test(color)) {
      setState(prev => ({ ...prev, colorPalette: [...prev.colorPalette, color] }));
    }
  };

  const removeColor = (index: number) => {
    setState(prev => ({
      ...prev,
      colorPalette: prev.colorPalette.filter((_, i) => i !== index)
    }));
  };

  const addProductCategory = () => {
    const category = prompt("Enter product category:");
    if (category) {
      setState(prev => ({
        ...prev,
        productCategories: [...prev.productCategories, category]
      }));
    }
  };

  const totalSteps = shouldShowEcommerce ? 7 : 6;
  const actualStep = currentStep > 4 && !shouldShowEcommerce ? currentStep - 1 : currentStep;

  // --- Render Functions ---

  const renderWizardHeader = () => (
    <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`flex items-center gap-2 text-sm ${
              currentStep === 1
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-700 hover:text-black transition-colors"
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <span className="text-sm text-gray-500">
            Step {actualStep} of {totalSteps}
          </span>
          <button
            onClick={saveDraft}
            className="flex items-center gap-2 text-sm text-gray-700 hover:text-black transition-colors"
          >
            <Save className="w-4 h-4" />
            Save Draft
          </button>
        </div>
        <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-black rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(actualStep / totalSteps) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </div>
  );

  const renderStep1 = () => (
    <motion.div
      key="step1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-16"
    >
      <div className="text-center mb-10 md:mb-16">
        <h1 className="text-3xl md:text-5xl font-serif text-gray-900 mb-3 tracking-tight">
          What type of website do you want to create?
        </h1>
        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
          Choose the option that best matches your project
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
        {WEBSITE_TYPES.map((type, index) => (
          <motion.div
            key={type.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setState(prev => ({ ...prev, websiteType: type.id }))}
            className={`relative cursor-pointer rounded-2xl overflow-hidden aspect-[3/4] transition-all duration-300 ${
              state.websiteType === type.id
                ? "ring-2 ring-black shadow-2xl scale-[1.02]"
                : "shadow-md hover:shadow-xl hover:scale-[1.01]"
            }`}
          >
            <ImageWithFallback
              src={type.image}
              alt={type.label}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 text-white">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 flex-shrink-0">
                  <type.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-serif mb-1 leading-tight">{type.label}</h3>
                  <p className="text-xs text-white/80 line-clamp-2">{type.description}</p>
                </div>
              </div>
            </div>
            {state.websiteType === type.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-6 right-6 w-10 h-10 bg-white text-black rounded-full flex items-center justify-center shadow-lg"
              >
                <Check className="w-5 h-5 stroke-[3]" />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="space-y-8">
        <div>
          <label className="block text-lg mb-4 text-gray-900">
            What is the main goal of your website? <span className="text-sm text-gray-500">(Select all that apply)</span>
          </label>
          <div className="flex flex-wrap gap-3">
            {GOAL_OPTIONS.map(goal => (
              <button
                key={goal}
                onClick={() => toggleGoal(goal)}
                className={`px-6 py-3 rounded-full text-sm transition-all ${
                  state.goals.includes(goal)
                    ? "bg-black text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {state.goals.includes(goal) && <Check className="w-4 h-4 inline mr-2" />}
                {goal}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-lg mb-3 text-gray-900">
            Who is your primary audience?
          </label>
          <input
            type="text"
            value={state.audience}
            onChange={e => setState(prev => ({ ...prev, audience: e.target.value }))}
            placeholder="e.g., Fashion-conscious millennials, B2B decision makers..."
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-black focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-lg mb-3 text-gray-900">
            What results should the website achieve?
          </label>
          <textarea
            value={state.results}
            onChange={e => setState(prev => ({ ...prev, results: e.target.value }))}
            placeholder="e.g., 100 leads per month, $50k in monthly revenue, 10,000 email subscribers..."
            rows={4}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-black focus:outline-none transition-colors resize-none"
          />
        </div>
      </div>

      <div className="flex justify-end mt-12">
        <button
          onClick={handleNext}
          disabled={!canProceed(1)}
          className={`flex items-center gap-2 px-8 py-4 rounded-xl text-white transition-all ${
            canProceed(1)
              ? "bg-black hover:scale-105 shadow-lg"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Next: Branding
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      key="step2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-16"
    >
      <div className="text-center mb-10 md:mb-16">
        <h1 className="text-3xl md:text-5xl font-serif text-gray-900 mb-3 tracking-tight">
          Let's define your brand style
        </h1>
        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
          Upload your brand assets and choose a visual direction
        </p>
      </div>

      <div className="space-y-12">
        {/* Brand Upload Section */}
        <div>
          <h2 className="text-xl mb-6 text-gray-900">Brand Upload</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-gray-400 transition-colors cursor-pointer">
              <Upload className="w-10 h-10 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-700 mb-2">Upload Logo</p>
              <p className="text-sm text-gray-500">PNG, SVG, or PDF</p>
              <input type="file" className="hidden" accept=".png,.svg,.pdf" />
            </div>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-gray-400 transition-colors cursor-pointer">
              <Upload className="w-10 h-10 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-700 mb-2">Brand Guidelines</p>
              <p className="text-sm text-gray-500">PDF or document file</p>
              <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
            </div>
          </div>
        </div>

        {/* Color Palette */}
        <div>
          <h2 className="text-xl mb-6 text-gray-900">Color Palette</h2>
          <div className="flex flex-wrap gap-4">
            {state.colorPalette.map((color, index) => (
              <div key={index} className="relative group">
                <div
                  className="w-20 h-20 rounded-xl shadow-md cursor-pointer"
                  style={{ backgroundColor: color }}
                />
                <button
                  onClick={() => removeColor(index)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-black text-white rounded-full items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hidden group-hover:flex"
                >
                  <X className="w-4 h-4" />
                </button>
                <p className="text-xs text-center mt-2 text-gray-600">{color}</p>
              </div>
            ))}
            <button
              onClick={addColor}
              className="w-20 h-20 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors"
            >
              <Plus className="w-6 h-6 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Visual Style Selection */}
        <div>
          <h2 className="text-xl mb-6 text-gray-900">Visual Style</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VISUAL_STYLES.map((style, index) => (
              <motion.div
                key={style.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setState(prev => ({ ...prev, visualStyle: style.id }))}
                className={`relative cursor-pointer rounded-xl overflow-hidden aspect-[3/4] transition-all duration-300 ${
                  state.visualStyle === style.id
                    ? "ring-2 ring-black shadow-xl scale-105"
                    : "shadow-md hover:shadow-lg hover:scale-102"
                }`}
              >
                <ImageWithFallback
                  src={style.image}
                  alt={style.label}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-serif text-lg mb-1">{style.label}</h3>
                  <p className="text-xs text-white/80">{style.description}</p>
                </div>
                {state.visualStyle === style.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-3 right-3 w-8 h-8 bg-white text-black rounded-full flex items-center justify-center shadow-lg"
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Inspiration Images */}
        <div>
          <h2 className="text-xl mb-6 text-gray-900">Inspiration Images</h2>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-gray-400 transition-colors cursor-pointer">
            <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-700 mb-2">Upload 3-6 inspiration images</p>
            <p className="text-sm text-gray-500">JPG, PNG (max 5MB each)</p>
            <input type="file" className="hidden" accept="image/*" multiple />
          </div>
        </div>

        {/* Brand Descriptors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-lg mb-3 text-gray-900">
              Describe your brand in 3-5 words
            </label>
            <input
              type="text"
              value={state.brandWords}
              onChange={e => setState(prev => ({ ...prev, brandWords: e.target.value }))}
              placeholder="e.g., Modern, Sustainable, Accessible"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-black focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-lg mb-3 text-gray-900">
              What emotions should it convey?
            </label>
            <input
              type="text"
              value={state.emotions}
              onChange={e => setState(prev => ({ ...prev, emotions: e.target.value }))}
              placeholder="e.g., Confidence, Trust, Inspiration"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-black focus:outline-none transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-12">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-gray-300 text-gray-700 hover:border-black hover:text-black transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={!canProceed(2)}
          className={`flex items-center gap-2 px-8 py-4 rounded-xl text-white transition-all ${
            canProceed(2)
              ? "bg-black hover:scale-105 shadow-lg"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Next: Pages
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div
      key="step3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16"
    >
      <div className="text-center mb-10 md:mb-16">
        <h1 className="text-3xl md:text-5xl font-serif text-gray-900 mb-3 tracking-tight">
          Which pages do you need on your website?
        </h1>
        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
          Select all pages you want to include. Add custom sections as needed.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {state.pages.map((page, index) => (
          <motion.div
            key={page.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => {
              togglePage(page.id);
              if (page.id === "custom" && !page.selected) {
                // In a real app, this would open a modal for custom page details
                // For now, we'll just select it
              }
            }}
            className={`group relative cursor-pointer rounded-3xl overflow-hidden aspect-[4/3] transition-all duration-300 ${
              page.selected
                ? "ring-2 ring-black shadow-xl"
                : "shadow-md hover:shadow-xl hover:-translate-y-1"
            }`}
          >
            <ImageWithFallback
              src={page.image}
              alt={page.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className={`absolute inset-0 transition-opacity duration-300 ${
              page.selected ? "bg-black/40" : "bg-black/20 group-hover:bg-black/30"
            }`} />
            
            <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                      <page.icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-xl font-medium">{page.name}</h3>
                  </div>
                  <p className="text-sm text-white/80 line-clamp-2 max-w-[90%]">
                    {page.description}
                  </p>
                </div>
                {page.selected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center shadow-lg"
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {state.pages.some(p => p.selected) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8"
        >
          <h3 className="text-xl font-medium mb-6">Do you already have content for these pages?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {state.pages.filter(p => p.selected).map(page => (
              <div key={page.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm text-gray-500">
                    <page.icon className="w-4 h-4" />
                  </div>
                  <span className="font-medium">{page.name}</span>
                </div>
                <div className="flex bg-white rounded-lg p-1 shadow-sm border border-gray-100">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setState(prev => ({
                        ...prev,
                        pages: prev.pages.map(p => p.id === page.id ? { ...p, hasContent: true, needsAI: false } : p)
                      }));
                    }}
                    className={`px-3 py-1 text-xs rounded-md transition-colors ${
                      page.hasContent ? "bg-black text-white" : "text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setState(prev => ({
                        ...prev,
                        pages: prev.pages.map(p => p.id === page.id ? { ...p, hasContent: false } : p)
                      }));
                    }}
                    className={`px-3 py-1 text-xs rounded-md transition-colors ${
                      !page.hasContent ? "bg-gray-200 text-gray-800" : "text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-100 flex justify-end">
            <button
              onClick={() => {
                setState(prev => ({
                  ...prev,
                  pages: prev.pages.map(p => p.selected && !p.hasContent ? { ...p, needsAI: true } : p)
                }));
              }}
              className="flex items-center gap-2 text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              Generate missing content with AI
            </button>
          </div>
        </motion.div>
      )}

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-12">
        <label className="block text-lg font-medium mb-3">Any special components or sections needed?</label>
        <input
          type="text"
          placeholder="e.g., A pricing calculator, interactive map, or custom login area..."
          className="w-full px-4 py-4 rounded-xl border-2 border-gray-100 focus:border-black focus:outline-none transition-colors"
        />
      </div>

      <div className="flex justify-between">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-gray-300 text-gray-700 hover:border-black hover:text-black transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={!canProceed(3)}
          className={`flex items-center gap-2 px-8 py-4 rounded-xl text-white transition-all ${
            canProceed(3)
              ? "bg-black hover:scale-105 shadow-lg"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Next: Content & Images
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );

  const renderStep4 = () => (
    <motion.div
      key="step4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16"
    >
      <div className="text-center mb-10 md:mb-16">
        <h1 className="text-3xl md:text-5xl font-serif text-gray-900 mb-3 tracking-tight">
          Upload your content & images
        </h1>
        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
          Add your text, brand assets, product photos, and inspiration.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Left Column - Text Content */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-medium mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-gray-400" />
              Text Content
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-gray-400 transition-colors cursor-pointer bg-gray-50/50">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                <p className="font-medium text-gray-900 mb-1">Upload Documents</p>
                <p className="text-xs text-gray-500">PDF, DOCX, TXT</p>
              </div>
              
              <div className="relative">
                <textarea
                  className="w-full h-full min-h-[140px] p-4 rounded-xl border border-gray-200 focus:border-black focus:outline-none resize-none text-sm"
                  placeholder="Or paste your content here..."
                  value={state.textContent}
                  onChange={(e) => setState(prev => ({ ...prev, textContent: e.target.value }))}
                />
              </div>
            </div>

            <button
              onClick={() => setState(prev => ({ ...prev, aiCopywriting: !prev.aiCopywriting }))}
              className={`w-full py-3 rounded-xl border transition-all flex items-center justify-center gap-2 ${
                state.aiCopywriting
                  ? "bg-purple-50 border-purple-200 text-purple-700"
                  : "border-gray-200 text-gray-600 hover:border-purple-300 hover:text-purple-600"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              {state.aiCopywriting ? "AI Copywriting Requested" : "Generate Content with AI"}
            </button>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-medium">Brand & Visual Assets</h2>
              <div className="flex p-1 bg-gray-100 rounded-lg">
                {(["brand", "product", "moodboard", "ui"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveAssetTab(tab)}
                    className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                      activeAssetTab === tab
                        ? "bg-white shadow-sm text-black"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="min-h-[300px] bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center p-8 transition-colors hover:bg-gray-50/80">
              <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4">
                {activeAssetTab === "brand" && <Upload className="w-6 h-6 text-gray-400" />}
                {activeAssetTab === "product" && <ShoppingBag className="w-6 h-6 text-gray-400" />}
                {activeAssetTab === "moodboard" && <Palette className="w-6 h-6 text-gray-400" />}
                {activeAssetTab === "ui" && <Grid className="w-6 h-6 text-gray-400" />}
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Upload {activeAssetTab === "ui" ? "UI Inspiration" : activeAssetTab} Images
              </h3>
              <p className="text-gray-500 text-sm max-w-xs mb-6">
                Drag and drop your files here, or click to browse. Supported: JPG, PNG, SVG.
              </p>
              <button className="px-6 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                Select Files
              </button>
            </div>
            
            {activeAssetTab === "moodboard" && (
               <div className="mt-6">
                 <h4 className="text-sm font-medium text-gray-900 mb-3">Inspiration Board</h4>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                   {[1, 2, 3, 4].map((i) => (
                     <div key={i} className="aspect-[4/5] bg-gray-100 rounded-lg animate-pulse" />
                   ))}
                   <div className="aspect-[4/5] border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors">
                     <Plus className="w-6 h-6 text-gray-400" />
                   </div>
                 </div>
               </div>
            )}
          </div>
        </div>

        {/* Right Column - Illustration & Missing Content */}
        <div className="space-y-8">
          <div className="bg-[#EAE8E4] rounded-3xl p-8 aspect-[4/5] relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 opacity-10 pattern-dots" />
            <div className="relative z-10 text-center">
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-32 h-40 bg-white rounded-xl shadow-xl mx-auto mb-6 rotate-[-6deg] flex items-center justify-center"
              >
                <div className="w-20 h-2 bg-gray-100 rounded-full mb-2" />
                <div className="w-16 h-2 bg-gray-100 rounded-full" />
              </motion.div>
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="w-32 h-40 bg-white rounded-xl shadow-xl mx-auto -mt-24 rotate-[6deg] relative z-20 flex items-center justify-center"
              >
                <ImageIcon className="w-8 h-8 text-gray-200" />
              </motion.div>
              
              <h3 className="text-xl font-serif text-gray-900 mt-8 mb-2">Organize Your Vision</h3>
              <p className="text-sm text-gray-600">We'll help you structure your content for maximum impact.</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-500" />
              Missing Content
            </h3>
            <div className="space-y-3">
              {state.pages.filter(p => p.selected && !p.hasContent).slice(0, 3).map(page => (
                <div key={page.id} className="p-3 bg-amber-50 rounded-xl border border-amber-100 flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-amber-900">Missing content for {page.name}</p>
                    <p className="text-xs text-amber-700 mt-0.5">Upload text or request AI generation</p>
                  </div>
                </div>
              ))}
              {!state.logo && (
                <div className="p-3 bg-red-50 rounded-xl border border-red-100 flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-red-900">Logo missing</p>
                    <p className="text-xs text-red-700 mt-0.5">Please upload your brand logo</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-gray-300 text-gray-700 hover:border-black hover:text-black transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-8 py-4 rounded-xl bg-black text-white hover:scale-105 shadow-lg transition-all"
        >
          Next: {shouldShowEcommerce ? "E-Commerce Setup" : "Features"}
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );

  const renderStep5 = () => (
    <motion.div
      key="step5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16"
    >
      <div className="text-center mb-10 md:mb-16">
        <h1 className="text-3xl md:text-5xl font-serif text-gray-900 mb-3 tracking-tight">
          Set up your online store
        </h1>
        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
          Configure products, variations, checkout, and store requirements.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        {/* Product Information */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-medium mb-6">Product Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Number of products</label>
                <select 
                  value={state.numProducts}
                  onChange={(e) => setState(prev => ({ ...prev, numProducts: parseInt(e.target.value) }))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:outline-none bg-white"
                >
                  <option value={0}>Select quantity...</option>
                  <option value={10}>1 - 10 products</option>
                  <option value={50}>10 - 50 products</option>
                  <option value={100}>50 - 100 products</option>
                  <option value={500}>100+ products</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Number of categories</label>
                <select 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:outline-none bg-white"
                >
                  <option>Select quantity...</option>
                  <option>1 - 5 categories</option>
                  <option>5 - 10 categories</option>
                  <option>10+ categories</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <Camera className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-900">Need photography?</span>
                </div>
                <div 
                  className={`w-12 h-6 rounded-full p-1 transition-colors ${state.needPhotography ? "bg-black" : "bg-gray-300"}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setState(prev => ({ ...prev, needPhotography: !prev.needPhotography }));
                  }}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${state.needPhotography ? "translate-x-6" : ""}`} />
                </div>
              </label>

              <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-900">Need product descriptions?</span>
                </div>
                <div className="w-12 h-6 rounded-full bg-gray-300 p-1">
                  <div className="w-4 h-4 rounded-full bg-white" />
                </div>
              </label>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-medium mb-6">Payment & Shipping</h2>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-4">Payment Providers</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {["Stripe", "PayPal", "Shopify Payments", "MercadoPago"].map((provider) => (
                  <label 
                    key={provider}
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      state.paymentGateways.includes(provider)
                        ? "border-black bg-black/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input 
                      type="checkbox"
                      className="w-4 h-4 accent-black"
                      checked={state.paymentGateways.includes(provider)}
                      onChange={() => {
                        setState(prev => ({
                          ...prev,
                          paymentGateways: prev.paymentGateways.includes(provider)
                            ? prev.paymentGateways.filter(p => p !== provider)
                            : [...prev.paymentGateways, provider]
                        }));
                      }}
                    />
                    <span className="font-medium text-sm">{provider}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Free Shipping Over</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input 
                      type="text"
                      className="w-full pl-7 pr-4 py-2 rounded-lg border border-gray-200 focus:border-black focus:outline-none text-sm"
                      placeholder="0.00"
                      value={state.freeShippingThreshold}
                      onChange={e => setState(prev => ({ ...prev, freeShippingThreshold: e.target.value }))}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Flat Rate</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input 
                      type="text"
                      className="w-full pl-7 pr-4 py-2 rounded-lg border border-gray-200 focus:border-black focus:outline-none text-sm"
                      placeholder="10.00"
                      value={state.flatRateShipping}
                      onChange={e => setState(prev => ({ ...prev, flatRateShipping: e.target.value }))}
                    />
                  </div>
                </div>
              </div>
              
              <label className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Calculate real-time carrier rates</span>
                <div 
                  className={`w-10 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${state.realTimeRates ? "bg-black" : "bg-gray-300"}`}
                  onClick={() => setState(prev => ({ ...prev, realTimeRates: !prev.realTimeRates }))}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${state.realTimeRates ? "translate-x-5" : ""}`} />
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column - Illustration & Features */}
        <div className="space-y-8">
          <div className="bg-gray-50 rounded-3xl overflow-hidden shadow-sm aspect-[16/9] relative group">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1698935958560-2891be2d84c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMHBhc3RlbCUyMGVjb21tZXJjZSUyMHByb2R1Y3QlMjBncmlkJTIwbWluaW1hbGlzdHxlbnwxfHx8fDE3NjUyNzQ0NDN8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="E-commerce store preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-medium mb-6">Store Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { id: 'variants', label: 'Product Variants', desc: 'Size, Color, Material', icon: Tag, stateKey: 'variants' },
                { id: 'inventory', label: 'Inventory Tracking', desc: 'Auto-track stock levels', icon: Package, stateKey: 'inventoryTracking' },
                { id: 'discounts', label: 'Discount Codes', desc: 'Promotions & coupons', icon: Ticket, stateKey: 'discountCodes' },
                { id: 'login', label: 'Customer Login', desc: 'Order history & profile', icon: User, stateKey: 'customerLogin' },
                { id: 'wishlist', label: 'Wishlist', desc: 'Save for later', icon: Heart, stateKey: 'wishlist' },
                { id: 'subscriptions', label: 'Subscriptions', desc: 'Recurring payments', icon: RefreshCw, stateKey: 'subscriptions' },
                { id: 'digital', label: 'Digital Downloads', desc: 'PDFs, files, assets', icon: Download, stateKey: 'digitalProducts' },
                { id: 'cart', label: 'Abandoned Cart', desc: 'Recovery emails', icon: ShoppingCart, stateKey: 'abandonedCart' },
              ].map((feature) => (
                <div 
                  key={feature.id}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    state[feature.stateKey as keyof WebsiteWizardState]
                      ? "border-black bg-black text-white"
                      : "border-gray-100 hover:border-gray-200 bg-gray-50"
                  }`}
                  onClick={() => setState(prev => ({
                    ...prev,
                    [feature.stateKey]: !prev[feature.stateKey as keyof WebsiteWizardState]
                  }))}
                >
                  <div className="flex items-start justify-between mb-2">
                    <feature.icon className={`w-5 h-5 ${state[feature.stateKey as keyof WebsiteWizardState] ? "text-white" : "text-gray-500"}`} />
                    <div className={`w-10 h-5 rounded-full p-0.5 transition-colors ${
                      state[feature.stateKey as keyof WebsiteWizardState] ? "bg-white/20" : "bg-gray-300"
                    }`}>
                      <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                        state[feature.stateKey as keyof WebsiteWizardState] ? "translate-x-5" : ""
                      }`} />
                    </div>
                  </div>
                  <h3 className="font-medium text-sm mb-0.5">{feature.label}</h3>
                  <p className={`text-xs ${state[feature.stateKey as keyof WebsiteWizardState] ? "text-white/70" : "text-gray-500"}`}>
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-gray-300 text-gray-700 hover:border-black hover:text-black transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-8 py-4 rounded-xl bg-black text-white hover:scale-105 shadow-lg transition-all"
        >
          Next: Features & Integrations
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );

  const renderStep6 = () => (
    <motion.div
      key="step6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16"
    >
      <div className="text-center mb-10 md:mb-16">
        <h1 className="text-3xl md:text-5xl font-serif text-gray-900 mb-3 tracking-tight">
          Add features and integrations
        </h1>
        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
          Enhance your website with tools that improve conversions, engagement, and automation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {FEATURE_OPTIONS.map((feature, index) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => openFeatureDrawer(feature)}
            className={`group relative p-6 rounded-3xl cursor-pointer transition-all duration-300 overflow-hidden ${
              state.features.includes(feature.id)
                ? "ring-2 ring-black shadow-lg bg-white"
                : "bg-white hover:shadow-xl hover:-translate-y-1 shadow-sm border border-gray-100"
            }`}
          >
            {/* Soft Gradient Background */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100`} />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                  state.features.includes(feature.id) ? "bg-black text-white" : "bg-gray-50 text-gray-600 group-hover:bg-white group-hover:shadow-sm"
                }`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                {state.features.includes(feature.id) && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center"
                  >
                    <Check className="w-3 h-3 stroke-[3]" />
                  </motion.div>
                )}
              </div>
              
              <h3 className="text-xl font-medium mb-2">{feature.name}</h3>
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">{feature.description}</p>
              
              <div className="mt-auto flex items-center gap-2 text-xs font-medium text-gray-400 group-hover:text-black transition-colors">
                Configure
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.div>
        ))}
        
        {/* Additional placeholder cards to make up 12 if needed, or stick to FEATURE_OPTIONS */}
      </div>

      <div className="flex justify-between">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-gray-300 text-gray-700 hover:border-black hover:text-black transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-8 py-4 rounded-xl bg-black text-white hover:scale-105 shadow-lg transition-all"
        >
          Next: Timeline & Budget
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );

  const renderStep7 = () => (
    <motion.div
      key="step7"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16"
    >
      <div className="text-center mb-10 md:mb-16">
        <h1 className="text-3xl md:text-5xl font-serif text-gray-900 mb-3 tracking-tight">
          Timeline & Budget
        </h1>
        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
          Help us understand your project scope and constraints.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-medium mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-400" />
              Project Timeline
            </h2>
            <div className="space-y-4">
              {[
                { id: "urgent", label: "Urgent (1-2 Weeks)", desc: "Rush delivery for tight deadlines" },
                { id: "standard", label: "Standard (3-4 Weeks)", desc: "Recommended for most projects" },
                { id: "relaxed", label: "Flexible (6+ Weeks)", desc: "Take more time for iteration" }
              ].map((option) => (
                <div
                  key={option.id}
                  onClick={() => setState(prev => ({ ...prev, timeline: option.id }))}
                  className={`p-5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    state.timeline === option.id
                      ? "border-black bg-black/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div>
                    <h3 className="font-medium text-gray-900">{option.label}</h3>
                    <p className="text-sm text-gray-500">{option.desc}</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    state.timeline === option.id ? "border-black bg-black" : "border-gray-300"
                  }`}>
                    {state.timeline === option.id && <Check className="w-3 h-3 text-white" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-medium mb-6 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-gray-400" />
              Budget Range
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { val: 2500, label: "$2k - $5k", tier: "starter" },
                { val: 5000, label: "$5k - $10k", tier: "growth" },
                { val: 10000, label: "$10k - $20k", tier: "pro" },
                { val: 20000, label: "$20k+", tier: "enterprise" }
              ].map((option) => (
                <div
                  key={option.val}
                  onClick={() => setState(prev => ({ ...prev, budget: option.val, budgetTier: option.tier as BudgetTier }))}
                  className={`p-4 rounded-xl border transition-all cursor-pointer text-center ${
                    state.budget === option.val
                      ? "border-black bg-black text-white"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <span className="block font-medium">{option.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-3xl overflow-hidden shadow-sm aspect-[4/3] relative group">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1605025732402-8a251944c8eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWxlbmRhciUyMHRpbWVsaW5lJTIwcGxhbm5pbmclMjBhYnN0cmFjdHxlbnwxfHx8fDE3NjUyNzQ3MzV8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Timeline planning"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent p-8 flex flex-col justify-end text-white">
            <h3 className="text-2xl font-serif mb-2">Almost There</h3>
            <p className="text-white/80">We're assembling your custom project brief based on your selections.</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-gray-300 text-gray-700 hover:border-black hover:text-black transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={!canProceed(7)}
          className={`flex items-center gap-2 px-8 py-4 rounded-xl text-white transition-all ${
            canProceed(7)
              ? "bg-black hover:scale-105 shadow-lg"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Generate Brief
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );

  const renderStep8 = () => (
    <motion.div
      key="step8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16"
    >
      <div className="text-center mb-10 md:mb-16">
        <div className="inline-flex items-center justify-center p-3 bg-green-100 text-green-700 rounded-full mb-6">
          <Check className="w-6 h-6" />
        </div>
        <h1 className="text-3xl md:text-5xl font-serif text-gray-900 mb-3 tracking-tight">
          Your Website Plan is Ready
        </h1>
        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
          Review all details before generating your final website brief.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-12">
        {/* Left: Summary Grid */}
        <div className="xl:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Website Type */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                <Globe className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Website Type</h3>
                <p className="font-medium text-lg capitalize">{state.websiteType}</p>
                <p className="text-sm text-gray-500 mt-1">{WEBSITE_TYPES.find(t => t.id === state.websiteType)?.label}</p>
              </div>
            </div>

            {/* Branding */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                <Palette className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Branding Style</h3>
                <p className="font-medium text-lg capitalize">{state.visualStyle}</p>
                <p className="text-sm text-gray-500 mt-1">{state.brandWords || "No keywords"}</p>
              </div>
            </div>

            {/* Pages */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                <Layout className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Selected Pages</h3>
                <p className="font-medium text-lg">{state.pages.filter(p => p.selected).length} Pages</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {state.pages.filter(p => p.selected).slice(0, 3).map(p => (
                    <span key={p.id} className="text-xs px-2 py-0.5 bg-gray-100 rounded-md text-gray-600">{p.name}</span>
                  ))}
                  {state.pages.filter(p => p.selected).length > 3 && (
                    <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-md text-gray-600">+{state.pages.filter(p => p.selected).length - 3}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Store (Conditional) */}
            {shouldShowEcommerce && (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                  <ShoppingBag className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">E-Commerce</h3>
                  <p className="font-medium text-lg">{state.numProducts} Products</p>
                  <p className="text-sm text-gray-500 mt-1">{state.paymentGateways.length} Payment Gateways</p>
                </div>
              </div>
            )}

            {/* Features */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Features</h3>
                <p className="font-medium text-lg">{state.features.length} Integrations</p>
                <p className="text-sm text-gray-500 mt-1">Analytics, CRM, Social...</p>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                <CalendarIcon className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">Timeline & Budget</h3>
                <p className="font-medium text-lg capitalize">{state.timeline}</p>
                <p className="text-sm text-gray-500 mt-1">{state.budgetTier ? `~ $${state.budget.toLocaleString()}` : "Not set"}</p>
              </div>
            </div>
          </div>

          {/* Visual Flow Diagram */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 overflow-x-auto">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-6">Project Flow</h3>
            <div className="flex items-center min-w-max">
              {[
                { icon: Globe, label: "Type" },
                { icon: Palette, label: "Style" },
                { icon: Layout, label: "Pages" },
                { icon: FileText, label: "Content" },
                { icon: ShoppingBag, label: "Store", hidden: !shouldShowEcommerce },
                { icon: Zap, label: "Features" },
                { icon: Check, label: "Brief" }
              ].filter(s => !s.hidden).map((step, i, arr) => (
                <React.Fragment key={step.label}>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shadow-md">
                      <step.icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-medium text-gray-600">{step.label}</span>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="h-[2px] w-16 bg-gray-200 mx-2 -mt-6" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Right: AI Brief Panel */}
        <div className="xl:col-span-1">
          <div className="bg-[#1A1A1A] text-white rounded-3xl p-8 h-full shadow-2xl relative overflow-hidden flex flex-col">
             {/* Background decoration */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-blue-500/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
             
             <div className="relative z-10">
               <div className="flex items-center gap-3 mb-8">
                 <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center">
                   <Sparkles className="w-5 h-5 text-purple-400" />
                 </div>
                 <div>
                   <h2 className="text-xl font-medium">AI Brief Generated</h2>
                   <p className="text-white/50 text-xs">Based on your {state.websiteType} selection</p>
                 </div>
               </div>

               <div className="space-y-6 flex-1 overflow-y-auto max-h-[60vh] pr-2 custom-scrollbar">
                 <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                   <h3 className="text-xs font-semibold text-white/40 uppercase mb-2">Project Overview</h3>
                   <p className="text-sm text-white/80 leading-relaxed">
                     A premium <span className="text-white font-medium">{state.visualStyle}</span> {state.websiteType} website designed to convey {state.emotions || "professionalism"}. 
                     The platform will feature {state.pages.filter(p => p.selected).length} core pages and integrate robust {shouldShowEcommerce ? "e-commerce" : "content"} capabilities.
                   </p>
                 </div>

                 <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                   <h3 className="text-xs font-semibold text-white/40 uppercase mb-2">Scope Estimate</h3>
                   <div className="space-y-2">
                     <div className="flex justify-between text-sm">
                       <span className="text-white/60">Design Phase</span>
                       <span>1-2 Weeks</span>
                     </div>
                     <div className="flex justify-between text-sm">
                       <span className="text-white/60">Development</span>
                       <span>{state.timeline === "urgent" ? "1 Week" : "2-3 Weeks"}</span>
                     </div>
                     <div className="pt-2 border-t border-white/10 flex justify-between text-sm font-medium">
                       <span>Total Time</span>
                       <span>{state.timeline === "urgent" ? "2-3 Weeks" : "4-6 Weeks"}</span>
                     </div>
                   </div>
                 </div>

                 <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <h3 className="text-xs font-semibold text-white/40 uppercase mb-2">Next Steps</h3>
                    <ul className="space-y-2 text-sm text-white/80">
                      <li className="flex items-start gap-2">
                        <span className="text-purple-400">1.</span>
                        Review and approve this brief
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-400">2.</span>
                        Connect with your designer
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-400">3.</span>
                        Begin content gathering
                      </li>
                    </ul>
                 </div>
               </div>
               
               <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 gap-3">
                 <button className="flex items-center justify-center gap-2 py-3 rounded-lg bg-white text-black text-sm font-medium hover:bg-gray-200 transition-colors">
                   <Download className="w-4 h-4" />
                   Download PDF
                 </button>
                 <button className="flex items-center justify-center gap-2 py-3 rounded-lg bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition-colors">
                   <Share className="w-4 h-4" />
                   Share
                 </button>
               </div>
             </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-gray-300 text-gray-700 hover:border-black hover:text-black transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-8 py-4 rounded-xl bg-black text-white hover:scale-105 shadow-lg transition-all"
        >
          View Dashboard
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      case 5:
        return renderStep5();
      case 6:
        return renderStep6();
      case 7:
        return renderStep7();
      case 8:
        return renderStep8();
      case 9:
        return (
          <WebsiteBriefDashboard
            state={state}
            setState={setState}
            onDownload={() => alert("Downloading PDF brief...")}
            onShare={() => alert("Sharing brief link...")}
            onRegenerate={() => generateBrief()}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F5]">
      {currentStep < 9 && renderWizardHeader()}
      <AnimatePresence mode="wait">
        {renderCurrentStep()}
      </AnimatePresence>

      {/* Drawer Panel */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 bg-black z-40"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full md:w-[480px] bg-white shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-6">
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                {selectedPageDetail && (
                  <div className="pt-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-black/5 flex items-center justify-center">
                        <selectedPageDetail.icon className="w-6 h-6" />
                      </div>
                      <h2 className="text-2xl font-serif">{selectedPageDetail.name}</h2>
                    </div>
                    <p className="text-gray-600 mb-6">{selectedPageDetail.description}</p>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-2">Content Needed:</h3>
                        <ul className="space-y-2">
                          {selectedPageDetail.contentNeeded.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-700">
                              <span className="text-black">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-3 pt-4 border-t">
                        <label className="flex items-center justify-between">
                          <span className="text-gray-700">I have content</span>
                          <input
                            type="checkbox"
                            checked={selectedPageDetail.hasContent}
                            onChange={() => {
                              setState(prev => ({
                                ...prev,
                                pages: prev.pages.map(p =>
                                  p.id === selectedPageDetail.id ? { ...p, hasContent: !p.hasContent } : p
                                )
                              }));
                            }}
                            className="w-5 h-5"
                          />
                        </label>
                        <label className="flex items-center justify-between">
                          <span className="text-gray-700">Generate with AI</span>
                          <input
                            type="checkbox"
                            checked={selectedPageDetail.needsAI}
                            onChange={() => {
                              setState(prev => ({
                                ...prev,
                                pages: prev.pages.map(p =>
                                  p.id === selectedPageDetail.id ? { ...p, needsAI: !p.needsAI } : p
                                )
                              }));
                            }}
                            className="w-5 h-5"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {selectedFeatureDetail && (
                  <div className="pt-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                        <selectedFeatureDetail.icon className="w-6 h-6" />
                      </div>
                      <h2 className="text-2xl font-serif">{selectedFeatureDetail.name}</h2>
                    </div>
                    <p className="text-gray-600 mb-6">{selectedFeatureDetail.description}</p>
                    
                    <div className="p-4 bg-gray-50 rounded-xl mb-6">
                       <label className="flex items-center justify-between cursor-pointer">
                          <span className="font-medium text-gray-900">Enable Feature</span>
                          <div 
                            className={`w-12 h-6 rounded-full p-1 transition-colors ${state.features.includes(selectedFeatureDetail.id) ? "bg-black" : "bg-gray-300"}`}
                            onClick={() => toggleFeature(selectedFeatureDetail.id)}
                          >
                            <div className={`w-4 h-4 rounded-full bg-white transition-transform ${state.features.includes(selectedFeatureDetail.id) ? "translate-x-6" : ""}`} />
                          </div>
                       </label>
                    </div>

                    <div>
                      <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-4">Configuration:</h3>
                      <div className="space-y-4">
                        {selectedFeatureDetail.config && selectedFeatureDetail.config.map((item: string, i: number) => (
                          <div key={i} className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg">
                            <div className="w-2 h-2 rounded-full bg-gray-300" />
                            <span className="text-gray-700 text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-gray-100">
                      <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm">
                        Preview / Settings Placeholder
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}