import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ClothingHero } from "./components/clothing/ClothingHero";
import { TrustSection } from "./components/clothing/TrustSection";
import { ClothingGallery } from "./components/clothing/ClothingGallery";
import { GhostMannequin } from "./components/clothing/GhostMannequin";
import { ClothingFlats } from "./components/clothing/ClothingFlats";
import { ApparelStillLife } from "./components/clothing/ApparelStillLife";
import { DetailsSection } from "./components/clothing/DetailsSection";
import { AccessoriesSection } from "./components/clothing/AccessoriesSection";
import { WhyChooseUs } from "./components/clothing/WhyChooseUs";
import { CaseStudyHero } from "./components/clothing/CaseStudyHero";
import { ClothingTestimonials } from "./components/clothing/ClothingTestimonials";
import { ClothingFAQ } from "./components/clothing/ClothingFAQ";
import { ClothingContact } from "./components/clothing/ClothingContact";
import { BrandLogosSection } from "./components/clothing/BrandLogosSection";
import { InvisibleMannequinProcess } from "./components/clothing/InvisibleMannequinProcess";
import { BehindScenesGallery } from "./components/clothing/BehindScenesGallery";

export default function Clothing() {
  // Hero Images
  const heroImage = "https://images.unsplash.com/photo-1693580847464-ffdd57670827?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwY2xvdGhpbmclMjBzdHVkaW98ZW58MXx8fHwxNzY0Nzg2MDMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
  
  const accentImages = [
    "https://images.unsplash.com/photo-1621198059871-0d5f9b449233?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG90aGluZyUyMGZsYXQlMjBsYXl8ZW58MXx8fHwxNzY0Nzg2MDMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1763770472234-644c786014ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwamFja2V0JTIwcHJvZHVjdHxlbnwxfHx8fDE3NjQ3NTIyNTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  ];

  // Trust Section Images
  const trustImages = [
    "https://images.unsplash.com/photo-1622760807301-4d2351a5a942?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbmVha2VycyUyMHByb2R1Y3QlMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3NjQ2NzkzNTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1763770472234-644c786014ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwamFja2V0JTIwcHJvZHVjdHxlbnwxfHx8fDE3NjQ3NTIyNTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1691689761290-2641cf0fc59a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXR3ZWFyJTIwY2xvdGhpbmd8ZW58MXx8fHwxNzY0NzM3NDE3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1621198059871-0d5f9b449233?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG90aGluZyUyMGZsYXQlMjBsYXl8ZW58MXx8fHwxNzY0Nzg2MDMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1693580847464-ffdd57670827?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwY2xvdGhpbmclMjBzdHVkaW98ZW58MXx8fHwxNzY0Nzg2MDMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1761549924624-6a00e5dfabb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcHBhcmVsJTIwcGhvdG9ncmFwaHklMjBtYW5uZXF1aW58ZW58MXx8fHwxNzY0Nzg2MDMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  ];

  // Gallery Images
  const galleryImages = [
    "https://images.unsplash.com/photo-1622760807301-4d2351a5a942?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbmVha2VycyUyMHByb2R1Y3QlMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3NjQ2NzkzNTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1763770472234-644c786014ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwamFja2V0JTIwcHJvZHVjdHxlbnwxfHx8fDE3NjQ3NTIyNTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1691689761290-2641cf0fc59a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXR3ZWFyJTIwY2xvdGhpbmd8ZW58MXx8fHwxNzY0NzM3NDE3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1621198059871-0d5f9b449233?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG90aGluZyUyMGZsYXQlMjBsYXl8ZW58MXx8fHwxNzY0Nzg2MDMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1693580847464-ffdd57670827?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwY2xvdGhpbmclMjBzdHVkaW98ZW58MXx8fHwxNzY0Nzg2MDMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1575201046471-082b5c1a1e79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwYWNjZXNzb3JpZXMlMjBoYW5kYmFnfGVufDF8fHx8MTc2NDcxNzc1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1631856952902-261e177603ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG90aGluZyUyMGRldGFpbCUyMHRleHR1cmV8ZW58MXx8fHwxNzY0NzU0MjE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1761549924624-6a00e5dfabb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcHBhcmVsJTIwcGhvdG9ncmFwaHklMjBtYW5uZXF1aW58ZW58MXx8fHwxNzY0Nzg2MDMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  ];

  // Ghost Mannequin Images
  const ghostImages = [
    "https://images.unsplash.com/photo-1709169755089-acdb1d7a506b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaG9zdCUyMG1hbm5lcXVpbiUyMGFwcGFyZWx8ZW58MXx8fHwxNzY0Nzg2MDQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1761549924624-6a00e5dfabb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcHBhcmVsJTIwcGhvdG9ncmFwaHklMjBtYW5uZXF1aW58ZW58MXx8fHwxNzY0Nzg2MDMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  ];

  // Flats Images
  const flatImages = [
    "https://images.unsplash.com/photo-1621198059871-0d5f9b449233?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG90aGluZyUyMGZsYXQlMjBsYXl8ZW58MXx8fHwxNzY0Nzg2MDMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1693580847464-ffdd57670827?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwY2xvdGhpbmclMjBzdHVkaW98ZW58MXx8fHwxNzY0Nzg2MDMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1763770472234-644c786014ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwamFja2V0JTIwcHJvZHVjdHxlbnwxfHx8fDE3NjQ3NTIyNTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1691689761290-2641cf0fc59a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXR3ZWFyJTIwY2xvdGhpbmd8ZW58MXx8fHwxNzY0NzM3NDE3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  ];

  // Still Life Images
  const stillLifeImages = [
    "https://images.unsplash.com/photo-1693580847464-ffdd57670827?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwY2xvdGhpbmclMjBzdHVkaW98ZW58MXx8fHwxNzY0Nzg2MDMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1763770472234-644c786014ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwamFja2V0JTIwcHJvZHVjdHxlbnwxfHx8fDE3NjQ3NTIyNTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1691689761290-2641cf0fc59a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXR3ZWFyJTIwY2xvdGhpbmd8ZW58MXx8fHwxNzY0NzM3NDE3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1622760807301-4d2351a5a942?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbmVha2VycyUyMHByb2R1Y3QlMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3NjQ2NzkzNTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  ];

  // Detail Images
  const detailImages = [
    "https://images.unsplash.com/photo-1631856952902-261e177603ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG90aGluZyUyMGRldGFpbCUyMHRleHR1cmV8ZW58MXx8fHwxNzY0NzU0MjE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1763770472234-644c786014ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwamFja2V0JTIwcHJvZHVjdHxlbnwxfHx8fDE3NjQ3NTIyNTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1693580847464-ffdd57670827?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwY2xvdGhpbmclMjBzdHVkaW98ZW58MXx8fHwxNzY0Nzg2MDMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  ];

  // Accessory Images
  const accessoryImages = [
    "https://images.unsplash.com/photo-1575201046471-082b5c1a1e79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwYWNjZXNzb3JpZXMlMjBoYW5kYmFnfGVufDF8fHx8MTc2NDcxNzc1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1622760807301-4d2351a5a942?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbmVha2VycyUyMHByb2R1Y3QlMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3NjQ2NzkzNTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1631856952902-261e177603ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG90aGluZyUyMGRldGFpbCUyMHRleHR1cmV8ZW58MXx8fHwxNzY0NzU0MjE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1575201046471-082b5c1a1e79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwYWNjZXNzb3JpZXMlMjBoYW5kYmFnfGVufDF8fHx8MTc2NDcxNzc1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  ];

  // Case Study Image
  const caseStudyImage = "https://images.unsplash.com/photo-1691689761290-2641cf0fc59a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXR3ZWFyJTIwY2xvdGhpbmd8ZW58MXx8fHwxNzY0NzM3NDE3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

  // Testimonials
  const testimonials = [
    {
      quote: "FashionOS transformed our entire product catalog. Their ghost mannequin technique is flawless, and the turnaround time was incredible.",
      author: "Jennifer Lee",
      brand: "Modern Thread Co."
    },
    {
      quote: "The attention to detail in their clothing photography is unmatched. Every fabric texture and stitch is captured perfectly.",
      author: "Michael Santos",
      brand: "Artisan Apparel"
    }
  ];

  // FAQs
  const faqs = [
    {
      question: "What is ghost mannequin photography?",
      answer: "Ghost mannequin photography creates a 3D hollow effect that shows the shape and fit of garments without a visible mannequin or model. It's achieved through multiple shots and expert photo editing, perfect for e-commerce."
    },
    {
      question: "Can you shoot complex garments like dresses and outerwear?",
      answer: "Absolutely. We specialize in photographing all types of apparel including dresses, coats, jackets, and multi-layered garments. Our team has the expertise to handle even the most intricate designs."
    },
    {
      question: "What are your turnaround times?",
      answer: "Standard turnaround is 5-7 business days for edited images. We also offer expedited 48-hour service for rush projects. Large catalog shoots are scheduled based on volume."
    },
    {
      question: "Do you provide styling services?",
      answer: "Yes, our team includes professional stylists who can steam, prep, and style garments to ensure they look their absolute best in every shot."
    },
    {
      question: "What's included in clothing flat photography?",
      answer: "Our flat-lay service includes professional steaming, precise styling, overhead photography with consistent lighting, and basic retouching. Perfect for creating uniform product catalogs."
    },
    {
      question: "Can you match our existing photography style?",
      answer: "Yes. We'll review your current imagery and brand guidelines to ensure consistency across your entire catalog, whether you're adding new products or refreshing existing ones."
    },
    {
      question: "Do you shoot on models as well?",
      answer: "Yes, we offer on-model photography in addition to ghost mannequin and flat-lay services. We can help with model casting and full production if needed."
    },
    {
      question: "What file formats do you deliver?",
      answer: "We deliver high-resolution JPG files optimized for web and print. Raw files and other formats (PNG, TIFF) are available upon request."
    },
    {
      question: "How many garments can you photograph per day?",
      answer: "For ghost mannequin and flat-lay photography, we typically shoot 30-50 garments per day depending on complexity. On-model shoots vary based on styling requirements."
    },
    {
      question: "Do you offer color correction services?",
      answer: "Yes, accurate color representation is crucial for e-commerce. All our packages include professional color correction to ensure your products look true to life."
    }
  ];

  // Process Image
  const processImage = "https://images.unsplash.com/photo-1709169755089-acdb1d7a506b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaG9zdCUyMG1hbm5lcXVpbiUyMGFwcGFyZWx8ZW58MXx8fHwxNzY0Nzg2MDQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

  // Behind the Scenes Images
  const btsImages = [
    "https://images.unsplash.com/photo-1758613656677-012ee6263745?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwc3R1ZGlvJTIwYmVoaW5kJTIwc2NlbmVzfGVufDF8fHx8MTc2NDc4NjAzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1693580847464-ffdd57670827?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwY2xvdGhpbmclMjBzdHVkaW98ZW58MXx8fHwxNzY0Nzg2MDMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1758613656677-012ee6263745?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwc3R1ZGlvJTIwYmVoaW5kJTIwc2NlbmVzfGVufDF8fHx8MTc2NDc4NjAzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1693580847464-ffdd57670827?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwY2xvdGhpbmclMjBzdHVkaW98ZW58MXx8fHwxNzY0Nzg2MDMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1758613656677-012ee6263745?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwc3R1ZGlvJTIwYmVoaW5kJTIwc2NlbmVzfGVufDF8fHx8MTc2NDc4NjAzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1693580847464-ffdd57670827?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwY2xvdGhpbmclMjBzdHVkaW98ZW58MXx8fHwxNzY0Nzg2MDMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1758613656677-012ee6263745?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwc3R1ZGlvJTIwYmVoaW5kJTIwc2NlbmVzfGVufDF8fHx8MTc2NDc4NjAzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1693580847464-ffdd57670827?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwY2xvdGhpbmclMjBzdHVkaW98ZW58MXx8fHwxNzY0Nzg2MDMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="pt-20">
        {/* 1. Hero */}
        <ClothingHero heroImage={heroImage} accentImages={accentImages} />

        {/* 2. About the Service - Trust Section */}
        <TrustSection trustImages={trustImages} />

        {/* 3. Clothing Image Gallery */}
        <ClothingGallery galleryImages={galleryImages} />

        {/* 4. Ghost Mannequin */}
        <GhostMannequin ghostImages={ghostImages} />

        {/* 5. Clothing Flats */}
        <ClothingFlats flatImages={flatImages} />

        {/* 6. Apparel Still Life */}
        <ApparelStillLife stillLifeImages={stillLifeImages} />

        {/* 7. Details */}
        <DetailsSection detailImages={detailImages} />

        {/* 8. Accessories */}
        <AccessoriesSection accessoryImages={accessoryImages} />

        {/* 9. Why Choose Us */}
        <WhyChooseUs />

        {/* 10. Large Case Study */}
        <CaseStudyHero caseStudyImage={caseStudyImage} />

        {/* 11. Testimonials */}
        <ClothingTestimonials testimonials={testimonials} />

        {/* 12. FAQ Section */}
        <ClothingFAQ faqs={faqs} />

        {/* 13. Contact Section */}
        <ClothingContact />

        {/* 14. Brand Logos Section */}
        <BrandLogosSection />

        {/* 15. Invisible Mannequin Process */}
        <InvisibleMannequinProcess processImage={processImage} />

        {/* 16. Behind the Scenes */}
        <BehindScenesGallery btsImages={btsImages} />

        {/* 17. Footer */}
        <Footer />
      </div>
    </div>
  );
}
