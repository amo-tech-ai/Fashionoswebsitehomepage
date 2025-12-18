import { 
  Camera, 
  ShoppingBag, 
  Layers, 
  Star, 
  Box, 
  RotateCw, 
  PenTool, 
  Smartphone 
} from "lucide-react";
import { ServiceItem, PricingPackage } from "./types";

export const categories = [
  "Apparel", 
  "Beauty", 
  "Jewelry", 
  "Home & Kitchen", 
  "Electronics", 
  "Health & Personal Care", 
  "Other"
];

export const photoServices: ServiceItem[] = [
  {
    icon: Camera,
    title: "White Background",
    description: "Amazon-compliant pure white images (RGB 255,255,255), high resolution, flawless lighting.",
    image: "https://images.unsplash.com/photo-1626897885636-dd68020cc52a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwcGhvdG9ncmFwaHklMjB3aGl0ZSUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzY0ODMyMjQ4fDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    icon: ShoppingBag,
    title: "Lifestyle Photography",
    description: "Show your product in real-world environments to enhance buyer confidence.",
    image: "https://images.unsplash.com/photo-1624521793559-136bfe16fc86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWZlc3R5bGUlMjBwcm9kdWN0JTIwcGhvdG9ncmFwaHklMjBhbWF6b258ZW58MXx8fHwxNzY0ODg3NDk5fDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    icon: Layers,
    title: "Infographics",
    description: "Clean, easy-to-read graphics that highlight features, dimensions, and key benefits.",
    image: "https://images.unsplash.com/photo-1758297679787-12524226e30f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwbWFjcm8lMjBkZXRhaWwlMjBzaG90fGVufDF8fHx8MTc2NDg4NzQ5OXww&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    icon: Star,
    title: "Model Photography",
    description: "Professional styled shoots following Amazon apparel guidelines for fashion & beauty.",
    image: "https://images.unsplash.com/photo-1742540676438-722880414f33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBzdHVkaW8lMjBzaG9vdHxlbnwxfHx8fDE3NjQ4ODc0OTl8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    icon: Box,
    title: "Detail & Macro",
    description: "Texture, materials, craftsmanship — captured in crystal-clear detail.",
    image: "https://images.unsplash.com/photo-1762522903557-891c8dc11f4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBwb3J0cmFpdCUyMHJldG91Y2hpbmd8ZW58MXx8fHwxNzY0ODgzODQxfDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    icon: RotateCw,
    title: "360° Photography",
    description: "Interactive full-angle views for a richer shopping experience.",
    image: "https://images.unsplash.com/photo-1754923780529-f98eb8f05df3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwdmlkZW9ncmFwaHklMjBzdHVkaW98ZW58MXx8fHwxNzY0ODg1OTk2fDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    icon: PenTool,
    title: "Editing & Retouching",
    description: "Expert color correction, dust removal, sharpening, and listing-ready export.",
    image: "https://images.unsplash.com/photo-1636293875796-1cbaf6585779?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRvdWNoaW5nJTIwd29ya3NwYWNlJTIwc3R1ZGlvfGVufDF8fHx8MTc2NDg4Mzg0NHww&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    icon: Smartphone,
    title: "Mobile to Amazon",
    description: "Send us phone shots — we transform them into polished, compliant listing images.",
    image: "https://images.unsplash.com/photo-1567570671138-76c7e06caa3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBwYWNrYWdpbmclMjB1bmJveGluZ3xlbnwxfHx8fDE3NjQ4ODc0OTl8MA&ixlib=rb-4.1.0&q=80&w=1080"
  }
];

export const videoServices: ServiceItem[] = [
  {
    title: "Product Overview",
    description: "Simple, polished overview that highlights features.",
    image: "https://images.unsplash.com/photo-1618139731872-ccc79e73c123?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwdmlkZW8lMjBmaWxtaW5nfGVufDF8fHx8MTc2NDg4NTk5NHww&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    title: "Explainer Video",
    description: "Problem → solution format that drives engagement.",
    image: "https://images.unsplash.com/photo-1660286118182-11cdf887a9ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBwcm9kdWN0JTIwY29tbWVyY2lhbHxlbnwxfHx8fDE3NjQ4ODU5OTh8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    title: "Unboxing Video",
    description: "Authentic first-impression experience.",
    image: "https://images.unsplash.com/photo-1759563876826-30481c505545?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bmJveGluZyUyMGx1eHVyeSUyMHByb2R1Y3R8ZW58MXx8fHwxNzY0ODg1OTk1fDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    title: "How-To Guide",
    description: "Step-by-step guide to reduce returns.",
    image: "https://images.unsplash.com/photo-1575320854760-bfffc3550640?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMGVkaXRpbmclMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzY0ODU1MTk5fDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    title: "Lifestyle Video",
    description: "Real-life scenes for emotional storytelling.",
    image: "https://images.unsplash.com/photo-1643432398338-623fbd492894?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWZlc3R5bGUlMjBmYXNoaW9uJTIwc2hvb3R8ZW58MXx8fHwxNzY0ODg1OTk1fDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    title: "Comparison",
    description: "Side-by-side to show your advantage.",
    image: "https://images.unsplash.com/photo-1698581075105-924b6c70b5d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBwcm9kdWN0JTIwc2hvd2Nhc2V8ZW58MXx8fHwxNzY0ODg1OTk3fDA&ixlib=rb-4.1.0&q=80&w=1080"
  }
];

export const pricingPackages: PricingPackage[] = [
  {
    name: "Starter",
    description: "White background essentials.",
    includes: ["3 High-Res Photos", "Pure White Background", "Basic Retouching", "Amazon Compliant"],
    highlight: false
  },
  {
    name: "Growth",
    description: "Best for new product launches.",
    includes: ["7 High-Res Photos", "1 Lifestyle Shot", "1 Infographic", "Advanced Retouching", "A+ Content Module"],
    highlight: true
  },
  {
    name: "Premium",
    description: "Full Amazon optimization.",
    includes: ["10 High-Res Photos", "3 Lifestyle Shots", "2 Infographics", "Product Video (15s)", "Full A+ Content Design"],
    highlight: false
  }
];

export const platforms = ["Amazon", "Shopify", "Instagram", "Facebook", "TikTok", "YouTube"];

export const recentWorkImages = [
  "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBwcm9kdWN0fGVufDF8fHx8MTc2NDg4Nzk4NXww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcHBsZSUyMHdhdGNoJTIwcHJvZHVjdHxlbnwxfHx8fDE3NjQ4ODc5ODV8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFkcGhvbmVzJTIwcHJvZHVjdHxlbnwxfHx8fDE3NjQ4ODc5ODV8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWtlJTIwc2hvZSUyMHByb2R1Y3R8ZW58MXx8fHwxNzY0ODg3OTg1fDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwcG9sYXJvaWR8ZW58MXx8fHwxNzY0ODg3OTg1fDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1572635196237-14b3f281503f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5nbGFzc2VzJTIwcHJvZHVjdHxlbnwxfHx8fDE3NjQ4ODc5ODV8MA&ixlib=rb-4.1.0&q=80&w=1080"
];
