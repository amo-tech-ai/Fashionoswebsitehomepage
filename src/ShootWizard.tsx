import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Camera, 
  Video, 
  ShoppingBag, 
  Star, 
  Calendar as CalendarIcon, 
  Clock,
  MapPin,
  User,
  Plus,
  X,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  Twitter,
  Globe,
  Sparkles
} from "lucide-react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { Sidebar } from "./components/shared/Sidebar";
import { ShootSummarySidebar } from "./components/wizard/ShootSummarySidebar";

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

interface WizardState {
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

// --- Main Component ---

export default function ShootWizard() {
  const [step, setStep] = useState<WizardStep>("service");
  const [direction, setDirection] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              <div className="absolute bottom-0 inset-x-0 p-6 text-white text-center font-medium text-lg">
                {s.label}
              </div>
              {state.scenes.includes(s.id) && (
                <div className="absolute top-4 right-4 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center shadow-lg animate-in fade-in zoom-in duration-200">
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
              className={`relative group cursor-pointer rounded-2xl overflow-hidden aspect-square shadow-sm transition-all duration-500 ${
                state.scenes.includes(s.id) ? 'ring-4 ring-black' : 'hover:shadow-xl hover:-translate-y-2'
              }`}
            >
              <ImageWithFallback src={s.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt={s.label} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              <div className="absolute bottom-0 inset-x-0 p-6 text-white text-center font-medium text-lg">
                {s.label}
              </div>
              {state.scenes.includes(s.id) && (
                <div className="absolute top-4 right-4 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center shadow-lg animate-in fade-in zoom-in duration-200">
                  <Check className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTalent = () => {
    const isModelRequired = state.talent && state.talent !== 'none';
    
    return (
        <div className="w-full pt-6 md:pt-12">
            <div className="max-w-3xl mx-auto text-center mb-10 md:mb-16">
                <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4 tracking-tight">Talent Selection</h1>
                <p className="text-gray-500 text-lg">Do you require models for this shoot?</p>
            </div>
            
            <div className="max-w-3xl mx-auto px-4 md:px-8 space-y-8">
                {/* Binary Choice */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                        onClick={() => setState({...state, talent: 'none'})}
                        className={`p-6 rounded-2xl border text-left transition-all ${
                            state.talent === 'none'
                                ? 'border-black bg-gray-900 text-white ring-1 ring-black shadow-lg'
                                : 'border-gray-200 bg-white hover:border-gray-300 text-gray-900 hover:bg-gray-50'
                        }`}
                    >
                        <div className="flex justify-between items-start mb-4">
                             <div className={`w-10 h-10 rounded-full flex items-center justify-center ${state.talent === 'none' ? 'bg-white/20' : 'bg-gray-100'}`}>
                                <X className={`w-5 h-5 ${state.talent === 'none' ? 'text-white' : 'text-gray-600'}`} />
                             </div>
                             {state.talent === 'none' && <Check className="w-5 h-5" />}
                        </div>
                        <h3 className="text-xl font-serif mb-1">Product Only</h3>
                        <p className={`text-sm ${state.talent === 'none' ? 'text-gray-300' : 'text-gray-500'}`}>
                           Focus purely on the merchandise. No models needed.
                        </p>
                    </button>
                    
                    <button
                        onClick={() => {
                             if (!isModelRequired) setState({...state, talent: 'fullbody'});
                        }}
                        className={`p-6 rounded-2xl border text-left transition-all ${
                            isModelRequired
                                ? 'border-black bg-gray-900 text-white ring-1 ring-black shadow-lg'
                                : 'border-gray-200 bg-white hover:border-gray-300 text-gray-900 hover:bg-gray-50'
                        }`}
                    >
                        <div className="flex justify-between items-start mb-4">
                             <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isModelRequired ? 'bg-white/20' : 'bg-gray-100'}`}>
                                <User className={`w-5 h-5 ${isModelRequired ? 'text-white' : 'text-gray-600'}`} />
                             </div>
                             {isModelRequired && <Check className="w-5 h-5" />}
                        </div>
                        <h3 className="text-xl font-serif mb-1">Models Required</h3>
                        <p className={`text-sm ${isModelRequired ? 'text-gray-300' : 'text-gray-500'}`}>
                           Select specific model types for your campaign.
                        </p>
                    </button>
                </div>
                
                {/* Expanded Selection */}
                <AnimatePresence>
                    {isModelRequired && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="pt-4 pb-2">
                                <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6 text-center">Select Model Type</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {TALENT.filter(t => t.id !== 'none').map(t => (
                                        <div 
                                            key={t.id}
                                            onClick={() => setState({...state, talent: t.id})}
                                            className={`relative cursor-pointer rounded-xl overflow-hidden aspect-[3/4] group ${
                                                state.talent === t.id ? 'ring-2 ring-black' : ''
                                            }`}
                                        >
                                            <ImageWithFallback src={t.image || ''} className="w-full h-full object-cover" alt={t.label} />
                                            <div className={`absolute inset-0 transition-colors ${state.talent === t.id ? 'bg-black/40' : 'bg-black/20 group-hover:bg-black/10'}`} />
                                            <div className="absolute bottom-0 inset-x-0 p-4">
                                                <p className="text-white font-medium text-center">{t.label}</p>
                                            </div>
                                            {state.talent === t.id && (
                                                <div className="absolute top-3 right-3 w-6 h-6 bg-white text-black rounded-full flex items-center justify-center shadow-sm">
                                                    <Check className="w-3 h-3" />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
  };

  const renderAddOns = () => (
    <div className="w-full pt-6 md:pt-12">
      <div className="max-w-3xl mx-auto text-center mb-10 md:mb-16">
        <h1 className="text-4xl md:text-6xl font-serif text-gray-900 mb-4 tracking-tight">Optional Upgrades</h1>
        <p className="text-gray-500 text-lg md:text-xl">Enhance your shoot with these extras.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-8 max-w-7xl mx-auto">
        {ADD_ONS.map((a) => (
          <div 
            key={a.id}
            onClick={() => {
              const exists = state.addOns.includes(a.id);
              if (exists) setState({...state, addOns: state.addOns.filter(i => i !== a.id)});
              else setState({...state, addOns: [...state.addOns, a.id]});
            }}
            className={`relative group cursor-pointer rounded-2xl overflow-hidden aspect-[4/5] transition-all duration-500 shadow-sm hover:shadow-2xl ${
              state.addOns.includes(a.id) ? 'ring-2 ring-black scale-[1.02] z-10' : 'hover:-translate-y-2 hover:z-10 z-0'
            }`}
          >
            <ImageWithFallback src={a.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt={a.label} />
            <div className={`absolute inset-0 transition-all duration-500 ${state.addOns.includes(a.id) ? 'bg-black/40' : 'bg-black/20 group-hover:bg-black/10'}`} />
            
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black/90 via-transparent to-transparent">
              <div className="flex flex-col justify-end text-white h-full">
                <h3 className="text-2xl font-serif mb-1 tracking-tight">{a.label}</h3>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-sm opacity-80">Add to package</p>
                  <div className="text-sm font-bold bg-white/20 backdrop-blur px-3 py-1 rounded-full border border-white/10">
                    +${a.price}
                  </div>
                </div>
              </div>
            </div>
            
            {state.addOns.includes(a.id) && (
              <div className="absolute top-4 right-4 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center shadow-lg animate-in fade-in zoom-in duration-300">
                 <Check className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderChannels = () => (
    <div className="w-full pt-6 md:pt-12">
      <div className="max-w-3xl mx-auto text-center mb-10 md:mb-16">
        <h1 className="text-4xl md:text-6xl font-serif text-gray-900 mb-4 tracking-tight">Channels</h1>
        <p className="text-gray-500 text-lg md:text-xl">Where will you be posting this content?</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8 px-4 md:px-8 max-w-7xl mx-auto">
        {CHANNELS.map((c) => (
          <div 
            key={c.id}
            onClick={() => {
              const exists = state.channels.includes(c.id);
              if (exists) setState({...state, channels: state.channels.filter(i => i !== c.id)});
              else setState({...state, channels: [...state.channels, c.id]});
            }}
            className={`flex flex-col items-center justify-center p-6 md:p-8 rounded-2xl border cursor-pointer transition-all duration-300 aspect-square shadow-sm ${
              state.channels.includes(c.id) ? 'border-black bg-gray-50 shadow-md ring-1 ring-black scale-[1.02]' : 'border-gray-200 hover:border-gray-300 hover:shadow-lg hover:-translate-y-1'
            }`}
          >
            {c.image ? (
              <div className="w-16 h-16 mb-6 relative flex items-center justify-center">
                 <ImageWithFallback 
                   src={c.image} 
                   className="w-full h-full object-contain drop-shadow-sm" 
                   alt={c.label}
                 />
              </div>
            ) : (
              <c.icon className={`w-12 h-12 mb-6 ${state.channels.includes(c.id) ? 'text-black' : 'text-gray-400'}`} />
            )}
            <span className={`font-medium text-center text-base md:text-lg ${state.channels.includes(c.id) ? 'text-black font-bold' : 'text-gray-600'}`}>{c.label}</span>
            
            {state.channels.includes(c.id) && (
               <div className="mt-4">
                 <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center animate-in fade-in zoom-in duration-200">
                   <Check className="w-4 h-4" />
                 </div>
               </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderDateTime = () => {
    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
    const startDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
    
    const nextMonth = () => {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };
    
    const prevMonth = () => {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    return (
      <div className="w-full pt-6 md:pt-12">
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-16">
          <h1 className="text-4xl md:text-6xl font-serif text-gray-900 mb-4 tracking-tight">When to Shoot?</h1>
          <p className="text-gray-500 text-lg md:text-xl">Select a preferred date and time.</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 bg-white rounded-[2rem] shadow-sm border border-gray-100 p-6 md:p-10 max-w-7xl mx-auto">
          {/* Calendar */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold text-gray-900 flex items-center gap-3 text-xl font-serif tracking-tight">
                <CalendarIcon className="w-6 h-6" /> 
                {currentMonth.toLocaleDateString('default', { month: 'long', year: 'numeric' })}
              </h3>
              <div className="flex gap-2">
                <button onClick={prevMonth} className="p-3 hover:bg-gray-100 rounded-full transition-colors border border-gray-100 hover:border-gray-200">
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button onClick={nextMonth} className="p-3 hover:bg-gray-100 rounded-full transition-colors border border-gray-100 hover:border-gray-200">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-2 text-center mb-4">
              {["S","M","T","W","T","F","S"].map((d, i) => <div key={i} className="text-xs font-bold text-gray-400 uppercase tracking-widest">{d}</div>)}
            </div>
            
            <div className="grid grid-cols-7 gap-2 sm:gap-3">
              {Array.from({ length: startDay }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(d => {
                const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), d);
                const isSelected = state.date?.toDateString() === date.toDateString();
                const isToday = new Date().toDateString() === date.toDateString();
                
                return (
                  <button
                    key={d}
                    onClick={() => setState({...state, date})}
                    className={`aspect-square rounded-xl flex items-center justify-center text-sm font-medium transition-all duration-300 relative overflow-hidden ${
                      isSelected
                        ? 'bg-black text-white shadow-lg scale-105' 
                        : isToday 
                          ? 'bg-gray-50 text-black font-bold ring-1 ring-gray-200'
                          : 'hover:bg-gray-50 text-gray-700 hover:scale-105'
                    }`}
                  >
                    {isSelected && (
                      <motion.div 
                        layoutId="selectedDate"
                        className="absolute inset-0 bg-black -z-10"
                      />
                    )}
                    {d}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Slots */}
          <div className="space-y-10 border-t lg:border-t-0 lg:border-l border-gray-100 pt-10 lg:pt-0 lg:pl-12">
            {Object.entries(TIME_SLOTS).map(([period, slots]) => (
              <div key={period}>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-5 flex items-center gap-2">
                  <Clock className="w-4 h-4" /> {period}
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                  {slots.map(time => (
                    <button
                      key={time}
                      onClick={() => setState({...state, timeSlot: time})}
                      className={`py-4 px-4 rounded-2xl text-sm font-medium border transition-all duration-300 ${
                        state.timeSlot === time
                          ? 'border-black bg-black text-white shadow-md transform scale-[1.02]'
                          : 'border-gray-200 hover:border-gray-400 text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderSummary = () => (
    <div className="w-full pt-6 md:pt-12">
      <div className="max-w-3xl mx-auto text-center mb-10 md:mb-16">
        <h1 className="text-4xl md:text-6xl font-serif text-gray-900 mb-4 tracking-tight">Review Your Shoot</h1>
        <p className="text-gray-500 text-lg md:text-xl">Here is your personalized plan.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 md:gap-12 max-w-7xl mx-auto px-4">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8 transition-all hover:shadow-lg duration-500">
            <div className="flex items-start justify-between pb-8 border-b border-gray-100">
              <div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Service</div>
                <div className="text-3xl md:text-5xl font-serif text-gray-900 capitalize tracking-tight">{state.service} Production</div>
              </div>
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-900 border border-gray-100">
                {state.service === 'photography' ? <Camera className="w-8 h-8" /> : <Video className="w-8 h-8" />}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-8 md:gap-12">
              <div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Category</div>
                <div className="font-medium text-xl capitalize text-gray-900">{state.category || "-"}</div>
              </div>
              <div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Type</div>
                <div className="font-medium text-xl capitalize text-gray-900">{state.subType || "-"}</div>
              </div>
              <div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Style</div>
                <div className="font-medium text-xl capitalize text-gray-900">{state.style || "-"}</div>
              </div>
              <div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Talent</div>
                <div className="font-medium text-xl capitalize text-gray-900">{state.talent || "-"}</div>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-100">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Scenes</div>
              <div className="flex flex-wrap gap-3">
                {state.scenes.length > 0 ? state.scenes.map(s => (
                  <span key={s} className="px-6 py-3 bg-gray-50 border border-gray-200 rounded-full text-sm font-medium capitalize text-gray-800">{s}</span>
                )) : <span className="text-gray-400 italic text-lg">None selected</span>}
              </div>
            </div>

            <div className="pt-8 border-t border-gray-100">
               <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Date & Time</div>
               <div className="font-medium text-xl flex flex-wrap items-center gap-3 text-gray-900">
                 <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg">
                   <CalendarIcon className="w-5 h-5 text-gray-500" />
                   {state.date ? state.date.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' }) : "Date not selected"} 
                 </div>
                 {state.timeSlot && (
                   <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg">
                     <Clock className="w-5 h-5 text-gray-500" />
                     {state.timeSlot}
                   </div>
                 )}
               </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-900 text-white p-8 md:p-10 rounded-[2.5rem] shadow-xl sticky top-8">
            <h3 className="font-serif text-3xl mb-8 tracking-tight">Estimated Total</h3>
            <div className="space-y-5 mb-10">
              <div className="flex justify-between text-gray-400 text-lg">
                <span>Base Package</span>
                <span>$1,500</span>
              </div>
              {state.addOns.map(id => {
                const addon = ADD_ONS.find(a => a.id === id);
                return addon ? (
                  <div key={id} className="flex justify-between text-gray-300 text-lg">
                    <span>{addon.label}</span>
                    <span>+${addon.price}</span>
                  </div>
                ) : null;
              })}
              <div className="pt-8 mt-8 border-t border-gray-700 flex justify-between text-3xl font-serif font-medium">
                <span>Total</span>
                <span>
                  ${1500 + state.addOns.reduce((sum, id) => sum + (ADD_ONS.find(a => a.id === id)?.price || 0), 0)}
                </span>
              </div>
            </div>
            <button className="w-full py-5 bg-white text-black rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all hover:scale-[1.02] active:scale-95 mb-4 shadow-lg">
              Confirm Booking
            </button>
            <button className="w-full py-5 border border-gray-600 text-white rounded-2xl font-medium text-lg hover:bg-gray-800 transition-colors hover:border-gray-500">
              Save Draft
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const serviceData = {
    services: SERVICES,
    categories: CATEGORIES,
    subTypes: SUB_TYPES,
    styles: STYLES,
    scenes: SCENES,
    talent: TALENT,
    addOns: ADD_ONS
  };

  return (
    <div className="h-screen bg-[#F8F5F1] flex flex-col overflow-hidden">
      {/* Top Navigation Bar */}
      <div className="h-16 border-b border-gray-200 bg-white/80 backdrop-blur flex-shrink-0 z-50 flex items-center justify-between px-4 md:px-6 lg:px-12">
        <div className="flex items-center gap-4">
          <div className="text-xl font-serif font-bold tracking-tight">FashionOS</div>
          {/* Mobile Step Indicator */}
          <div className="md:hidden text-[10px] font-bold uppercase tracking-widest text-gray-400 border-l border-gray-300 pl-4 ml-2">
             Step {currentStepIndex + 1}/{totalSteps}
          </div>
        </div>
        
        {/* Desktop Progress */}
        <div className="hidden md:flex items-center gap-4">
           <div className="text-xs font-bold uppercase tracking-widest text-gray-400">
             Step {currentStepIndex + 1} of {totalSteps}
           </div>
           <div className="w-32 h-1 bg-gray-100 rounded-full overflow-hidden">
             <motion.div 
               className="h-full bg-black"
               initial={{ width: 0 }}
               animate={{ width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }}
             />
           </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="xl:hidden p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors relative"
          >
            <ShoppingBag className="w-5 h-5" />
            {state.service && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            )}
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Flex Container for Main + Sidebar */}
      <div className="flex flex-1 overflow-hidden relative">
          
          {/* Left Column (Content + Footer) */}
          <div className="flex-1 flex flex-col relative overflow-hidden">
              {/* Main Content */}
              <main className="flex-1 px-4 md:px-8 lg:px-12 pt-8 pb-24 overflow-y-auto scroll-smooth">
                <div className="max-w-7xl mx-auto h-full">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: direction * 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: direction * -20 }}
                      transition={{ duration: 0.3 }}
                      className="h-full"
                    >
                      {step === "service" && renderService()}
                      {step === "category" && renderCategory()}
                      {step === "subType" && renderSubType()}
                      {step === "style" && renderStyle()}
                      {step === "scenes" && renderScenes()}
                      {step === "talent" && renderTalent()}
                      {step === "addOns" && renderAddOns()}
                      {step === "channels" && renderChannels()}
                      {step === "dateTime" && renderDateTime()}
                      {step === "summary" && renderSummary()}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </main>

              {/* Sticky Footer */}
              <div className="bg-white border-t border-gray-200 p-4 md:p-6 z-30">
                <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-4">
                  <button 
                    onClick={handleBack}
                    disabled={currentStepIndex === 0}
                    className={`w-full md:w-auto flex items-center justify-center gap-2 text-sm font-medium px-8 py-4 rounded-xl transition-colors ${
                      currentStepIndex === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>

                  {step !== "summary" && (
                    <button 
                      onClick={handleNext}
                      className="w-full md:w-auto flex items-center justify-center gap-2 bg-black text-white px-10 py-4 rounded-xl font-medium hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl active:scale-95"
                    >
                      Next <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
          </div>

          {/* Right Sidebar */}
          <ShootSummarySidebar 
             state={state} 
             onUpdateState={(updates) => setState({...state, ...updates})}
             serviceData={serviceData}
             mobileOpen={isSidebarOpen}
             onMobileClose={() => setIsSidebarOpen(false)}
          />

      </div>
    </div>
  );
}
