import { LucideIcon } from "lucide-react";

export interface ServiceItem {
  icon?: LucideIcon;
  title: string;
  description: string;
  image: string;
}

export interface PricingPackage {
  name: string;
  description: string;
  includes: string[];
  highlight: boolean;
}

export interface FormData {
  name: string;
  email: string;
  storeLink: string;
  category: string;
  message: string;
}
