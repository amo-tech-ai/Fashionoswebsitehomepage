import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Camera, 
  Video, 
  ShoppingBag, 
  Globe,
  Sparkles,
  Instagram,
  Youtube,
  Menu,
  X
} from "lucide-react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { Sidebar } from "./components/shared/Sidebar";
import { WizardModeSelection } from "./components/wizard/WizardModeSelection";
import { WizardAIIntake } from "./components/wizard/WizardAIIntake";
import { WizardAISidebar } from "./components/wizard/WizardAISidebar";

import amazonImg from "figma:asset/41ffa841e5b6ae969b626aecc0e3cd3404a96df5.png";
import instagramImg from "figma:asset/a7f7eb0fdd0513adec473287236c1cf6c46c0ee0.png";
import shopifyImg from "figma:asset/913aa4514d5b9ede463cca8fe16946e2925b7529.png";
import tiktokImg from "figma:asset/e321847ee0a5ae9908a1ee7278c6d8bd0bd1dd91.png";
import youtubeImg from "figma:asset/0a9f32b1e109ada5e50d105fafc5cb56151db100.png";

// --- Types ---

type WizardStep = 
  | "service" 
  | "category" 
  | "subType" 
  | "style" 
  | "scenes" 
  | "talent" 
  | "addOns" 
  | "channels" 
  | "dateTime" 
  | "summary";

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

// --- Data ---

const SERVICES = [
  { 
    id: "photography", 
    label: "Photography", 
    subtitle: "",
    image: "https://images.unsplash.com/photo-1637536701369-f815af927b59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHdoaXRlJTIwZWRpdG9yaWFsJTIwZmFzaGlvbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NTI3MTE1NHww&ixlib=rb-4.1.0&q=80&w=1080",
    icon: Camera
  },
  { 
    id: "video", 
    label: "Video Production", 
    subtitle: "",
    image: "https://images.unsplash.com/photo-1762028892567-6ebfbb894992?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkaW8lMjBsaWdodGluZyUyMGZpbG1tYWtpbmclMjBwcm9kdWN0aW9ufGVufDF8fHx8MTc2NTI3MTE1OXww&ixlib=rb-4.1.0&q=80&w=1080",
    icon: Video
  },
  { 
    id: "webdesign", 
    label: "Website Design", 
    subtitle: "Landing pages, product portfolios, digital brand kits",
    image: "https://images.unsplash.com/photo-1741119482290-bf0566a6d404?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjB3ZWJzaXRlJTIwZGVzaWduJTIwbW9ja3VwfGVufDF8fHx8MTc2NTI3MTE2Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    icon: Globe
  },
  { 
    id: "socialmedia", 
    label: "Social Media Marketing", 
    subtitle: "Instagram Reels, TikTok videos, campaign content",
    image: "https://images.unsplash.com/photo-1694878982074-d8d4bc4581b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW50JTIwY3JlYXRpb24lMjBwaG9uZSUyMHZlcnRpY2FsJTIwdmlkZW98ZW58MXx8fHwxNzY1MjcxMTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    icon: Sparkles
  }
];

const CATEGORIES = [
  { id: "fashion", label: "Fashion Apparel", image: "https://images.unsplash.com/photo-1730075427603-311a7f95fbd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwd29tZW5zd2VhcnxlbnwxfHx8fDE3NjQ4OTIxNTF8MA&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: "beauty", label: "Beauty", image: "https://images.unsplash.com/photo-1595051665600-afd01ea7c446?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBjb3NtZXRpY3MlMjBza2luY2FyZXxlbnwxfHx8fDE3NjQ4OTIxNTF8MA&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: "jewelry", label: "Jewelry", image: "https://images.unsplash.com/photo-1763256614634-7feb3ff79ff3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBqZXdlbHJ5JTIwcmluZ3xlbnwxfHx8fDE3NjQ4OTIxNTF8MA&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: "footwear", label: "Footwear", image: "https://images.unsplash.com/photo-1650320079970-b4ee8f0dae33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbmVha2VycyUyMGZvb3R3ZWFyJTIwZmFzaGlvbnxlbnwxfHx8fDE3NjQ4OTIxNTF8MA&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: "eyewear", label: "Eyewear", image: "https://images.unsplash.com/photo-1662091131946-338d213f4a39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5nbGFzc2VzJTIwZXlld2VhciUyMGZhc2hpb258ZW58MXx8fHwxNzY0ODkyMTUxfDA&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: "food", label: "Food & Beverage", image: "https://images.unsplash.com/photo-1757358957218-67e771ec07bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwZm9vZCUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc2NDgxNTAwMXww&ixlib=rb-4.1.0&q=80&w=1080" },
];

const SUB_TYPES: Record<string, any[]> = {
  fashion: [
    { id: "womenswear", label: "Womenswear", image: "https://images.unsplash.com/photo-1730075427603-311a7f95fbd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwd29tZW5zd2VhcnxlbnwxfHx8fDE3NjQ4OTIxNTF8MA&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: "swimwear", label: "Swimwear", image: "https://images.unsplash.com/photo-1719548982643-0e3e0adec2ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwc3dpbXdlYXIlMjBtb2RlbHxlbnwxfHx8fDE3NjQ4OTIxNTF8MA&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: "athleisure", label: "Athleisure", image: "https://images.unsplash.com/photo-1609138273459-0c945e28fdbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwYXRobGVpc3VyZSUyMGFjdGl2ZXdlYXJ8ZW58MXx8fHwxNzY0ODkyMTUxfDA&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: "jackets", label: "Jackets", image: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbGVhdGhlciUyMGphY2tldHxlbnwxfHx8fDE3NjQ4OTIxNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: "formal", label: "Formalwear", image: "https://images.unsplash.com/photo-1756483510820-4b9302a27556?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwZm9ybWFsJTIwd2VhciUyMGRyZXNzfGVufDF8fHx8MTc2NDg5MjE1Mnww&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: "lingerie", label: "Lingerie", image: "https://images.unsplash.com/photo-1762843353166-e0542bba1a66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbGluZ2VyaWUlMjBtb2RlbHxlbnwxfHx8fDE3NjQ4OTIxNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080" },
  ],
  beauty: [
    { id: "cosmetics", label: "Cosmetics", image: "https://images.unsplash.com/photo-1718972771654-47be8f36e0fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBtYWtldXAlMjBjb3NtZXRpY3N8ZW58MXx8fHwxNzY0ODQ1NTMxfDA&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: "skincare", label: "Skincare", image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMGJvdHRsZSUyMG1pbmltYWx8ZW58MXx8fHwxNzY0ODkyMTUyfDA&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: "fragrances", label: "Fragrances", image: "https://images.unsplash.com/photo-1719175936556-dbd05e415913?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJmdW1lJTIwYm90dGxlJTIwbHV4dXJ5fGVufDF8fHx8MTc2NDgzNDczOXww&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: "haircare", label: "Haircare", image: "https://images.unsplash.com/photo-1647462742033-f4e39fa481b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyY2FyZSUyMHByb2R1Y3RzJTIwc2Fsb258ZW58MXx8fHwxNzY0ODkyMTUyfDA&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: "lipstick", label: "Lipstick", image: "https://images.unsplash.com/photo-1643949476021-cf19232e2b26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXBzdGljayUyMGNsb3NlJTIwdXB8ZW58MXx8fHwxNzY0ODkyMTUzfDA&ixlib=rb-4.1.0&q=80&w=1080" },
  ],
  jewelry: [
    { id: "rings", label: "Rings", image: "https://images.unsplash.com/photo-1763256614634-7feb3ff79ff3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBqZXdlbHJ5JTIwcmluZ3xlbnwxfHx8fDE3NjQ4OTIxNTF8MA&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: "earrings", label: "Earrings", image: "https://images.unsplash.com/photo-1590156118368-607652ab307a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWFtb25kJTIwZWFycmluZ3MlMjBsdXh1cnl8ZW58MXx8fHwxNzY0Nzg4OTA0fDA&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: "necklaces", label: "Necklaces", image: "https://images.unsplash.com/photo-1611012756377-05e2e4269fa3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwbmVja2xhY2UlMjBqZXdlbHJ5fGVufDF8fHx8MTc2NDgyMTE5Mnww&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: "watches", label: "Watches", image: "https://images.unsplash.com/photo-1639564879163-a2a85682410e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3YXRjaCUyMHdyaXN0fGVufDF8fHx8MTc2NDg5MjE1M3ww&ixlib=rb-4.1.0&q=80&w=1080" },
  ],
  video: [
    { id: "overview", label: "Product Overview", image: "https://images.unsplash.com/photo-1758521540376-23c1b2f592d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWZlc3R5bGUlMjB2aWRlbyUyMGZpbG1pbmd8ZW58MXx8fHwxNzY0ODkyMTUzfDA&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: "unboxing", label: "Unboxing", image: "https://images.unsplash.com/photo-1695712551810-6a9604ff0e45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwdW5ib3hpbmclMjBoYW5kc3xlbnwxfHx8fDE3NjQ4OTIxNTN8MA&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: "howto", label: "How-To / Setup", image: "https://images.unsplash.com/photo-1639701386739-449a0e789367?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMHByb2R1Y3Rpb24lMjBjYW1lcmElMjBzZXR8ZW58MXx8fHwxNzY0ODkyMTUwfDA&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: "lifestyle", label: "Lifestyle Video", image: "https://images.unsplash.com/photo-1758521540376-23c1b2f592d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWZlc3R5bGUlMjB2aWRlbyUyMGZpbG1pbmd8ZW58MXx8fHwxNzY0ODkyMTUzfDA&ixlib=rb-4.1.0&q=80&w=1080" },
  ],
  default: [
    { id: "packshot", label: "Packshot", image: "https://images.unsplash.com/photo-1544489603-348771b16566?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwcHJvZHVjdCUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc2NDc3ODAxMHww&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: "onmodel", label: "On-Model", image: "https://images.unsplash.com/photo-1700150595270-499a1ce07804?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBlZGl0b3JpYWx8ZW58MXx8fHwxNzY0Nzg5MzcyfDA&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: "flatlay", label: "Flat Lay", image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMGJvdHRsZSUyMG1pbmltYWx8ZW58MXx8fHwxNzY0ODkyMTUyfDA&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: "creative", label: "Creative Concept", image: "https://images.unsplash.com/photo-1758613654186-6ce234bf94ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwcGhvdG9ncmFwaHklMjBzdHVkaW98ZW58MXx8fHwxNzY0Nzk3MTc5fDA&ixlib=rb-4.1.0&q=80&w=1080" },
  ]
};

const STYLES = [
  { id: "editorial", label: "Editorial Fashion", image: "https://images.unsplash.com/photo-1700150595270-499a1ce07804?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBlZGl0b3JpYWx8ZW58MXx8fHwxNzY0Nzg5MzcyfDA&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: "street", label: "Street Style", image: "https://images.unsplash.com/photo-1676808325981-3aa9a37347c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwc3RyZWV0JTIwc3R5bGV8ZW58MXx8fHwxNzY0ODkyMTU0fDA&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: "minimal", label: "Minimal Clean", image: "https://images.unsplash.com/photo-1544489603-348771b16566?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwcHJvZHVjdCUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc2NDc3ODAxMHww&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: "catalog", label: "Catalog / E-comm", image: "https://images.unsplash.com/photo-1730075427603-311a7f95fbd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwd29tZW5zd2VhcnxlbnwxfHx8fDE3NjQ4OTIxNTF8MA&ixlib=rb-4.1.0&q=80&w=1080" },
];

const SCENES = {
  backdrops: [
    { id: "white", label: "White Seamless", image: "https://images.unsplash.com/photo-1647427854253-b92bb40c9330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG90byUyMHN0dWRpbyUyMGJhY2tkcm9wfGVufDF8fHx8MTc2NDg5MjE1NHww&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: "color", label: "Colored", image: "https://images.unsplash.com/photo-1758613654186-6ce234bf94ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwcGhvdG9ncmFwaHklMjBzdHVkaW98ZW58MXx8fHwxNzY0Nzk3MTc5fDA&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: "textured", label: "Textured", image: "https://images.unsplash.com/photo-1557860855-159a8c0d18f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXh0dXJlZCUyMHBob3RvJTIwc3R1ZGlvJTIwYmFja2Ryb3B8ZW58MXx8fHwxNzY0ODk5Mzc2fDA&ixlib=rb-4.1.0&q=80&w=1080" },
  ],
  lifestyle: [
    { id: "living", label: "Living Room", image: "https://images.unsplash.com/photo-1667584523543-d1d9cc828a15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsaXZpbmclMjByb29tJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY0ODkyMTU0fDA&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: "kitchen", label: "Kitchen", image: "https://images.unsplash.com/photo-1610177534644-34d881503b83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBraXRjaGVuJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY0ODU0MzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: "bedroom", label: "Bedroom", image: "https://images.unsplash.com/photo-1640109414028-4c7f29f39ad4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsdXh1cnklMjBiZWRyb29tJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY0ODk5Mzc2fDA&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: "bathroom", label: "Bathroom", image: "https://images.unsplash.com/photo-1638799869566-b17fa794c4de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsdXh1cnklMjBiYXRocm9vbSUyMGludGVyaW9yfGVufDF8fHx8MTc2NDg5OTM3Nnww&ixlib=rb-4.1.0&q=80&w=1080" },
  ]
};

const TALENT = [
  { id: "fullbody", label: "Full Body Model", image: "https://images.unsplash.com/photo-1679419930974-e8171969aea0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBmdWxsJTIwYm9keSUyMGVkaXRvcmlhbHxlbnwxfHx8fDE3NjQ4OTM3MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: "hand", label: "Hand Model", image: "https://images.unsplash.com/photo-1662500142975-1ff156e2b4ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kJTIwbW9kZWwlMjBqZXdlbHJ5JTIwcmluZ3xlbnwxfHx8fDE3NjQ4OTM3MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: "foot", label: "Foot Model", image: "https://images.unsplash.com/photo-1721917113592-05ad210bfb73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290JTIwbW9kZWwlMjBzaG9lcyUyMGhlZWxzfGVufDF8fHx8MTc2NDg5MzcyMnww&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: "none", label: "No Talent Needed", image: "https://images.unsplash.com/photo-1607425313763-9b59fce01668?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbXB0eSUyMHBob3RvJTIwc3R1ZGlvJTIwY3ljbG9yYW1hfGVufDF8fHx8MTc2NDg5MzczMXww&ixlib=rb-4.1.0&q=80&w=1080" },
];

const ADD_ONS = [
  { id: "styling", label: "Professional Styling", price: 300, image: "https://images.unsplash.com/photo-1562505208-0b9bad881640?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwc3R5bGlzdCUyMGNsb3RoZXMlMjByYWNrfGVufDF8fHx8MTc2NDg5MzcyMnww&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: "makeup", label: "Hair & Makeup", price: 400, image: "https://images.unsplash.com/photo-1759013834681-0923afc4420e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWtldXAlMjBhcnRpc3QlMjBhcHBseWluZyUyMG1ha2V1cCUyMGZhc2hpb258ZW58MXx8fHwxNzY0ODkzNzIzfDA&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: "props", label: "Prop Sourcing", price: 200, image: "https://images.unsplash.com/photo-1662122233749-ec7e970e61c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9wJTIwc3R5bGlzdCUyMHNldCUyMGRlc2lnbnxlbnwxfHx8fDE3NjQ4OTM3MjN8MA&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: "retouch", label: "High-End Retouching", price: 150, image: "https://images.unsplash.com/photo-1560346783-0999e8eed190?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG90byUyMHJldG91Y2hpbmclMjBwaG90b3Nob3AlMjBzY3JlZW58ZW58MXx8fHwxNzY0ODkzNzI1fDA&ixlib=rb-4.1.0&q=80&w=1080" },
];

const CHANNELS = [
  { id: "instagram", label: "Instagram", icon: Instagram, image: instagramImg },
  { id: "tiktok", label: "TikTok", icon: Video, image: tiktokImg },
  { id: "youtube", label: "YouTube", icon: Youtube, image: youtubeImg },
  { id: "website", label: "Website / Shopify", icon: ShoppingBag, image: shopifyImg },
  { id: "amazon", label: "Amazon", icon: ShoppingBag, image: amazonImg },
];

const TIME_SLOTS = {
  Morning: ["09:00 AM", "10:00 AM", "11:00 AM"],
  Afternoon: ["01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"],
  Evening: ["06:00 PM", "07:00 PM"]
};

// --- Mock AI Logic ---

const getGeminiRecommendation = (step: WizardStep, context: any) => {
  switch (step) {
    case 'service':
      return {
        id: 'photo_rec',
        title: 'Start with Photography',
        reason: 'Your Shopify store needs high-res catalog images to improve conversion rates.',
        confidence: 0.95
      };
    case 'category':
      return {
        id: 'fashion_rec',
        title: 'Fashion Apparel',
        reason: 'Detected "luxury streetwear" keywords and apparel products on your site.',
        confidence: 0.98
      };
    case 'subType':
      return {
        id: 'onmodel_rec',
        title: 'On-Model Photography',
        reason: 'Competitors like Kith and Fear of God are using on-model shots. This drives higher engagement.',
        confidence: 0.92
      };
    case 'talent':
      return {
        id: 'talent_rec',
        title: 'Full Body Model',
        reason: 'Essential for showing fit and drape. Increases click-through rate by ~22%.',
        confidence: 0.88
      };
    default:
      return null;
  }
};

// --- Main Component ---

export default function ShootWizard({ onComplete }: { onComplete?: (data: WizardState) => void }) {
  const [workflowStage, setWorkflowStage] = useState<'mode' | 'intake' | 'wizard'>('mode');
  const [isAIEnabled, setIsAIEnabled] = useState(false);
  const [aiContext, setAiContext] = useState<any>(null);
  
  const [step, setStep] = useState<WizardStep>("service");
  const [direction, setDirection] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar toggle
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const [state, setState] = useState<WizardState>({
    service: null,
    category: null,
    subType: null,
    style: null,
    scenes: [],
    talent: null,
    addOns: [],
    channels: [],
    date: null,
    timeSlot: null
  });

  const stepOrder: WizardStep[] = [
    "service", 
    "category", 
    "subType", 
    "style", 
    "scenes", 
    "talent", 
    "addOns", 
    "channels", 
    "dateTime", 
    "summary"
  ];

  const currentStepIndex = stepOrder.indexOf(step);
  const totalSteps = stepOrder.length;

  const handleNext = () => {
    if (currentStepIndex < totalSteps - 1) {
      setDirection(1);
      setStep(stepOrder[currentStepIndex + 1]);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setDirection(-1);
      setStep(stepOrder[currentStepIndex - 1]);
    }
  };

  const handleModeSelect = (mode: 'manual' | 'ai') => {
    setIsAIEnabled(mode === 'ai');
    setWorkflowStage(mode === 'ai' ? 'intake' : 'wizard');
  };

  const handleAIAnalyze = (data: any) => {
    setAiContext(data);
    // Pre-fill state based on AI data (mock logic)
    setState(prev => ({
      ...prev,
      category: data.detectedCategory || prev.category,
      style: data.detectedStyle || prev.style
    }));
    setWorkflowStage('wizard');
  };

  // --- Render Steps ---

  const renderService = () => (
    <div className="w-full pt-6 md:pt-12">
      <div className="max-w-3xl mx-auto text-center mb-10 md:mb-16">
        <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4 tracking-tight">Choose your shoot type</h1>
        <p className="text-gray-500 text-lg">Select the core service to begin your creative brief.</p>
      </div>
      <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-4">
        {SERVICES.map((s, index) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            onClick={() => setState({...state, service: s.id as any})}
            className={`flex items-center gap-6 p-4 rounded-2xl border transition-all cursor-pointer group bg-white ${
              state.service === s.id 
                ? 'border-black shadow-lg ring-1 ring-black' 
                : 'border-gray-100 hover:border-gray-200 hover:shadow-md'
            }`}
          >
            {/* Small Square Image */}
            <div className="w-24 h-24 md:w-28 md:h-28 shrink-0 rounded-xl overflow-hidden bg-gray-50 relative">
               <ImageWithFallback 
                 src={s.image} 
                 className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                 alt={s.label}
               />
               {/* Icon Overlay */}
               <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-transparent transition-colors">
                  <div className="w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-sm">
                    <s.icon className="w-4 h-4 text-black" />
                  </div>
               </div>
            </div>

            {/* Content Text-First */}
            <div className="flex-1 min-w-0 py-2">
               <div className="flex items-center justify-between mb-1">
                 <h3 className="text-xl md:text-2xl font-serif text-gray-900">{s.label}</h3>
                 {state.service === s.id && (
                    <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center animate-in fade-in zoom-in">
                      <Check className="w-3 h-3" />
                    </div>
                 )}
               </div>
               <p className="text-sm md:text-base text-gray-500 leading-relaxed max-w-lg">
                 {s.subtitle || "Professional production tailored to your brand needs."}
               </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderCategory = () => (
    <div className="w-full pt-6 md:pt-12">
      <div className="max-w-3xl mx-auto text-center mb-10 md:mb-16">
        <h1 className="text-4xl md:text-6xl font-serif text-gray-900 mb-4 tracking-tight">What Are We Shooting?</h1>
        <p className="text-gray-500 text-lg md:text-xl">Select the category that best fits your product.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 px-4 md:px-8 max-w-7xl mx-auto">
        {CATEGORIES.map((c) => (
          <div 
            key={c.id}
            onClick={() => setState({...state, category: c.id})}
            className={`relative group cursor-pointer rounded-2xl overflow-hidden aspect-[4/5] transition-all duration-500 shadow-sm hover:shadow-2xl ${
              state.category === c.id ? 'ring-2 ring-black' : 'hover:-translate-y-2'
            }`}
          >
            <ImageWithFallback src={c.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt={c.label} />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-500" />
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
              <span className="text-3xl font-serif text-white tracking-tight">{c.label}</span>
            </div>
            {state.category === c.id && (
              <div className="absolute top-5 right-5 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center shadow-lg animate-in fade-in zoom-in duration-300">
                <Check className="w-5 h-5" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderSubType = () => {
    const list = state.service === "video" ? SUB_TYPES.video : (SUB_TYPES[state.category || ""] || SUB_TYPES.default);
    return (
      <div className="w-full pt-6 md:pt-12">
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-16">
          <h1 className="text-4xl md:text-6xl font-serif text-gray-900 mb-4 tracking-tight">
            {state.service === "video" ? "Video Types" : "Photography Types"}
          </h1>
          <p className="text-gray-500 text-lg md:text-xl">Select the specific type of content you need.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 px-4 md:px-8 max-w-7xl mx-auto">
          {list.map((t) => (
            <div 
              key={t.id}
              onClick={() => setState({...state, subType: t.id})}
              className={`relative group cursor-pointer rounded-2xl overflow-hidden aspect-[4/3] transition-all duration-500 shadow-sm hover:shadow-2xl ${
                state.subType === t.id ? 'ring-2 ring-black' : 'hover:-translate-y-2'
              }`}
            >
              <ImageWithFallback src={t.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt={t.label} />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-500" />
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <span className="text-3xl md:text-4xl font-serif text-white text-center drop-shadow-lg transform transition-transform duration-500 group-hover:scale-110">{t.label}</span>
              </div>
              {state.subType === t.id && (
                <div className="absolute top-5 right-5 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center shadow-lg animate-in fade-in zoom-in duration-300">
                  <Check className="w-5 h-5" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderStyle = () => (
    <div className="w-full pt-6 md:pt-12">
      <div className="max-w-3xl mx-auto text-center mb-10 md:mb-16">
        <h1 className="text-4xl md:text-6xl font-serif text-gray-900 mb-4 tracking-tight">Visual Style</h1>
        <p className="text-gray-500 text-lg md:text-xl">Choose the aesthetic direction for your shoot.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 px-4 md:px-8 max-w-7xl mx-auto">
        {STYLES.map((s) => (
          <div 
            key={s.id}
            onClick={() => setState({...state, style: s.id})}
            className={`relative group cursor-pointer rounded-2xl overflow-hidden aspect-[4/5] transition-all duration-500 shadow-sm hover:shadow-2xl ${
              state.style === s.id ? 'ring-2 ring-black scale-[1.02] z-10' : 'hover:-translate-y-2 hover:z-10 z-0'
            }`}
          >
            <ImageWithFallback src={s.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt={s.label} />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500" />
            <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full bg-gradient-to-t from-black/80 via-black/20 to-transparent">
              <h3 className="text-3xl md:text-4xl font-serif text-white mb-1 tracking-tight">{s.label}</h3>
            </div>
            {state.style === s.id && (
              <div className="absolute top-4 right-4 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center shadow-lg animate-in fade-in zoom-in duration-300">
                <Check className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderScenes = () => (
    <div className="w-full pt-6 md:pt-12">
      <div className="max-w-3xl mx-auto text-center mb-10 md:mb-16">
        <h1 className="text-4xl md:text-6xl font-serif text-gray-900 mb-4 tracking-tight">Choose Scenes</h1>
        <p className="text-gray-500 text-lg md:text-xl">Select up to 2 scenes or backdrops.</p>
      </div>
      
      <div className="mb-16 max-w-7xl mx-auto px-4 md:px-8">
        <h3 className="text-xl font-bold text-gray-900 mb-8 uppercase tracking-widest text-center md:text-left pl-1">Backdrops</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {SCENES.backdrops.map((s) => (
            <div 
              key={s.id}
              onClick={() => {
                const exists = state.scenes.includes(s.id);
                if (exists) setState({...state, scenes: state.scenes.filter(i => i !== s.id)});
                else if (state.scenes.length < 2) setState({...state, scenes: [...state.scenes, s.id]});
              }}
              className={`relative group cursor-pointer rounded-2xl overflow-hidden aspect-square shadow-sm transition-all duration-500 ${
                state.scenes.includes(s.id) ? 'ring-4 ring-black' : 'hover:shadow-xl hover:-translate-y-2'
              }`}
            >
              <ImageWithFallback src={s.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt={s.label} />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                <span className="text-lg font-serif text-white">{s.label}</span>
              </div>
              {state.scenes.includes(s.id) && (
                <div className="absolute top-3 right-3 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center shadow-lg">
                  <Check className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h3 className="text-xl font-bold text-gray-900 mb-8 uppercase tracking-widest text-center md:text-left pl-1">Lifestyle Sets</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {SCENES.lifestyle.map((s) => (
            <div 
              key={s.id}
              onClick={() => {
                const exists = state.scenes.includes(s.id);
                if (exists) setState({...state, scenes: state.scenes.filter(i => i !== s.id)});
                else if (state.scenes.length < 2) setState({...state, scenes: [...state.scenes, s.id]});
              }}
              className={`relative group cursor-pointer rounded-2xl overflow-hidden aspect-[4/5] shadow-sm transition-all duration-500 ${
                state.scenes.includes(s.id) ? 'ring-4 ring-black' : 'hover:shadow-xl hover:-translate-y-2'
              }`}
            >
              <ImageWithFallback src={s.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt={s.label} />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                <span className="text-xl font-serif text-white">{s.label}</span>
              </div>
              {state.scenes.includes(s.id) && (
                <div className="absolute top-3 right-3 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center shadow-lg">
                  <Check className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTalent = () => (
    <div className="w-full pt-6 md:pt-12">
      <div className="max-w-3xl mx-auto text-center mb-10 md:mb-16">
        <h1 className="text-4xl md:text-6xl font-serif text-gray-900 mb-4 tracking-tight">Talent Selection</h1>
        <p className="text-gray-500 text-lg md:text-xl">Do you need models for this campaign?</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-8 max-w-7xl mx-auto">
        {TALENT.map((t) => (
          <div 
            key={t.id}
            onClick={() => setState({...state, talent: t.id})}
            className={`relative group cursor-pointer rounded-2xl overflow-hidden aspect-[3/4] transition-all duration-500 shadow-sm ${
              state.talent === t.id ? 'ring-2 ring-black scale-[1.02]' : 'hover:-translate-y-2 hover:shadow-xl'
            }`}
          >
            <ImageWithFallback src={t.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt={t.label} />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500" />
            <div className="absolute bottom-0 left-0 p-6 w-full bg-gradient-to-t from-black/80 to-transparent">
              <span className="text-2xl font-serif text-white">{t.label}</span>
            </div>
            {state.talent === t.id && (
              <div className="absolute top-4 right-4 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center shadow-lg">
                <Check className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderAddOns = () => (
    <div className="w-full pt-6 md:pt-12">
      <div className="max-w-3xl mx-auto text-center mb-10 md:mb-16">
        <h1 className="text-4xl md:text-6xl font-serif text-gray-900 mb-4 tracking-tight">Upgrades</h1>
        <p className="text-gray-500 text-lg md:text-xl">Enhance your production value.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 px-4 md:px-8 max-w-5xl mx-auto">
        {ADD_ONS.map((a) => (
          <div 
            key={a.id}
            onClick={() => {
              const exists = state.addOns.includes(a.id);
              if (exists) setState({...state, addOns: state.addOns.filter(i => i !== a.id)});
              else setState({...state, addOns: [...state.addOns, a.id]});
            }}
            className={`flex gap-6 p-4 rounded-2xl border transition-all cursor-pointer group bg-white ${
              state.addOns.includes(a.id) 
                ? 'border-black bg-gray-50 ring-1 ring-black' 
                : 'border-gray-200 hover:border-gray-400 hover:shadow-lg'
            }`}
          >
            <div className="w-24 h-24 shrink-0 rounded-xl overflow-hidden">
               <ImageWithFallback src={a.image} className="w-full h-full object-cover" alt={a.label} />
            </div>
            <div className="flex-1 py-1">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-serif text-gray-900">{a.label}</h3>
                {state.addOns.includes(a.id) && (
                  <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3" />
                  </div>
                )}
              </div>
              <p className="text-lg font-medium text-gray-900 mb-1">+${a.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderChannels = () => (
    <div className="w-full pt-6 md:pt-12">
      <div className="max-w-3xl mx-auto text-center mb-10 md:mb-16">
        <h1 className="text-4xl md:text-6xl font-serif text-gray-900 mb-4 tracking-tight">Distribution</h1>
        <p className="text-gray-500 text-lg md:text-xl">Where will this content live? We'll optimize formats.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 px-4 md:px-8 max-w-7xl mx-auto">
        {CHANNELS.map((c) => (
          <div 
            key={c.id}
            onClick={() => {
              const exists = state.channels.includes(c.id);
              if (exists) setState({...state, channels: state.channels.filter(i => i !== c.id)});
              else setState({...state, channels: [...state.channels, c.id]});
            }}
            className={`flex flex-col items-center justify-center p-8 rounded-2xl border transition-all cursor-pointer aspect-square ${
              state.channels.includes(c.id) 
                ? 'border-black bg-gray-900 text-white' 
                : 'border-gray-200 bg-white hover:border-gray-400 hover:shadow-xl'
            }`}
          >
            {c.image ? (
                <div className="w-12 h-12 mb-4">
                     <ImageWithFallback src={c.image} alt={c.label} className="w-full h-full object-contain" />
                </div>
            ) : (
                <c.icon className={`w-10 h-10 mb-4 ${state.channels.includes(c.id) ? 'text-white' : 'text-gray-900'}`} />
            )}
            
            <span className="font-medium text-lg text-center">{c.label}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDateTime = () => (
    <div className="w-full pt-6 md:pt-12">
      <div className="max-w-3xl mx-auto text-center mb-10 md:mb-16">
        <h1 className="text-4xl md:text-6xl font-serif text-gray-900 mb-4 tracking-tight">Production Date</h1>
        <p className="text-gray-500 text-lg md:text-xl">Select your preferred shoot day.</p>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12">
         {/* Calendar */}
         <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-8">
               <h3 className="text-xl font-bold font-serif">{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>
               <div className="flex gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-full"><ArrowLeft className="w-5 h-5" /></button>
                  <button className="p-2 hover:bg-gray-100 rounded-full"><ArrowRight className="w-5 h-5" /></button>
               </div>
            </div>
            <div className="grid grid-cols-7 gap-4 mb-4">
               {['S','M','T','W','T','F','S'].map(d => (
                  <div key={d} className="text-center text-xs font-bold text-gray-400 uppercase">{d}</div>
               ))}
            </div>
            <div className="grid grid-cols-7 gap-4">
               {Array.from({length: 31}, (_, i) => i + 1).map(day => (
                  <button 
                     key={day}
                     onClick={() => setState({...state, date: new Date(2025, 5, day)})}
                     className={`aspect-square rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                        state.date?.getDate() === day
                           ? 'bg-black text-white shadow-lg'
                           : 'hover:bg-gray-100 text-gray-700'
                     }`}
                  >
                     {day}
                  </button>
               ))}
            </div>
         </div>

         {/* Time Slots */}
         <div className="space-y-8">
            {Object.entries(TIME_SLOTS).map(([period, slots]) => (
               <div key={period}>
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">{period}</h4>
                  <div className="grid grid-cols-2 gap-4">
                     {slots.map(slot => (
                        <button
                           key={slot}
                           onClick={() => setState({...state, timeSlot: slot})}
                           className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all text-center ${
                              state.timeSlot === slot
                                 ? 'border-black bg-black text-white'
                                 : 'border-gray-200 hover:border-black text-gray-900'
                           }`}
                        >
                           {slot}
                        </button>
                     ))}
                  </div>
               </div>
            ))}
         </div>
      </div>
    </div>
  );

  const renderSummary = () => (
    <div className="w-full pt-6 md:pt-12">
      <div className="max-w-2xl mx-auto text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">Review Brief</h1>
        <p className="text-gray-500 text-lg">Verify your details before we generate the proposal.</p>
      </div>

      <div className="max-w-3xl mx-auto px-6 mb-12">
        <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
               <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Service</h3>
                  <div className="text-lg font-medium capitalize">{state.service}</div>
               </div>
               <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Category</h3>
                  <div className="text-lg font-medium capitalize">{state.category}</div>
               </div>
               <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Style</h3>
                  <div className="text-lg font-medium capitalize">{state.style}</div>
               </div>
               <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Talent</h3>
                  <div className="text-lg font-medium capitalize">{state.talent}</div>
               </div>
               <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Scenes</h3>
                  <div className="text-lg font-medium capitalize">{state.scenes.join(", ")}</div>
               </div>
               <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Date</h3>
                  <div className="text-lg font-medium capitalize">{state.date?.toLocaleDateString()}</div>
               </div>
            </div>

            <button 
              onClick={() => onComplete?.(state)}
              className="w-full py-5 bg-black text-white rounded-2xl font-bold text-lg hover:bg-gray-800 transition-all hover:scale-[1.02] active:scale-95 mb-4 shadow-lg"
            >
              Generate Proposal
            </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (step) {
      case "service": return renderService();
      case "category": return renderCategory();
      case "subType": return renderSubType();
      case "style": return renderStyle();
      case "scenes": return renderScenes();
      case "talent": return renderTalent();
      case "addOns": return renderAddOns();
      case "channels": return renderChannels();
      case "dateTime": return renderDateTime();
      case "summary": return renderSummary();
      default: return renderService();
    }
  };

  // --- Main Render Flow ---

  // 1. Mode Selection
  if (workflowStage === 'mode') {
    return <WizardModeSelection onSelectMode={handleModeSelect} />;
  }

  // 2. AI Intake
  if (workflowStage === 'intake') {
    return (
      <WizardAIIntake 
        onAnalyze={handleAIAnalyze}
        onSkip={() => {
          setIsAIEnabled(false);
          setWorkflowStage('wizard');
        }} 
      />
    );
  }

  // 3. Main Wizard (Standard + AI Sidebar)
  return (
    <div className="min-h-screen bg-white text-gray-900 pb-20 relative font-sans selection:bg-black selection:text-white flex flex-col md:flex-row">
      
      {/* Optional: Standard Nav Sidebar (Left) */}
      <Sidebar 
          activeScreen="wizard" 
          onNavigate={() => {}} // Handle navigation if needed
          isMobileOpen={isMobileMenuOpen}
          onMobileClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 min-h-screen flex flex-col transition-all duration-300 md:ml-64">
        
        {/* Top Progress Bar */}
        <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100">
           <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
              {/* Back Button */}
              {currentStepIndex > 0 ? (
                <button 
                   onClick={handleBack}
                   className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black transition-colors"
                >
                   <ArrowLeft className="w-4 h-4" /> Back
                </button>
              ) : (
                <div />
              )}
              
              {/* Progress Dots */}
              <div className="flex gap-3">
                 {stepOrder.map((s, i) => (
                    <div 
                       key={s} 
                       className={`h-1 rounded-full transition-all duration-500 ${
                          i === currentStepIndex ? 'w-8 bg-black' : 
                          i < currentStepIndex ? 'w-2 bg-black' : 
                          'w-2 bg-gray-200'
                       }`} 
                    />
                 ))}
              </div>

              {/* Next Button */}
              {currentStepIndex < totalSteps - 1 ? (
                <button 
                   onClick={handleNext}
                   className="flex items-center gap-2 px-6 py-2 bg-black text-white rounded-full text-sm font-bold hover:bg-gray-800 transition-all hover:scale-105 shadow-sm"
                >
                   Next <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                 <div />
              )}
           </div>
        </div>
        
        {/* Content Wrapper */}
        <div className="flex-1 relative flex">
          {/* Main Wizard Content */}
          <main className={`flex-1 transition-all duration-500 ${isAIEnabled && isSidebarOpen ? 'md:mr-80' : ''}`}>
             <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                   key={step}
                   custom={direction}
                   initial={{ opacity: 0, x: direction * 50 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: direction * -50 }}
                   transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                   className="w-full"
                >
                   {renderContent()}
                </motion.div>
             </AnimatePresence>
          </main>

          {/* AI Sidebar (Right) */}
          {isAIEnabled && (
            <WizardAISidebar 
              step={step}
              recommendation={getGeminiRecommendation(step, aiContext) || undefined}
              onApply={() => {
                // Mock apply logic
                const rec = getGeminiRecommendation(step, aiContext);
                if (rec) {
                  // Example: apply 'fashion' category
                  if (step === 'category' && rec.id === 'fashion_rec') {
                    setState({...state, category: 'fashion'});
                  }
                  // In real app, this would be dynamic based on rec
                }
              }}
              onIgnore={() => {}}
              isOpen={isSidebarOpen}
              onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
            />
          )}
        </div>
      </div>

    </div>
  );
}
