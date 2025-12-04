import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ServicesHero } from "./components/services/ServicesHero";
import { HighlightedServices } from "./components/services/HighlightedServices";
import { ServicePackages } from "./components/services/ServicePackages";
import { BrandStatement } from "./components/services/BrandStatement";
import { ServicesOverview } from "./components/services/ServicesOverview";
import { CreativeShowcase } from "./components/services/CreativeShowcase";
import { BTSHero } from "./components/services/BTSHero";
import { TrustSection } from "./components/services/TrustSection";
import { FAQSection } from "./components/services/FAQSection";
import { TestimonialsSection } from "./components/services/TestimonialsSection";
import { AdditionalServices } from "./components/services/AdditionalServices";
import { FinalCTA } from "./components/services/FinalCTA";

export default function Services() {
  // Hero Images
  const heroImage = "https://images.unsplash.com/photo-1758613654186-6ce234bf94ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwcGhvdG9ncmFwaHklMjBzdHVkaW98ZW58MXx8fHwxNzY0NjU1MTA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
  
  const collageImages = [
    "https://images.unsplash.com/photo-1609681780612-7cc8459b4120?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBwcm9kdWN0JTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzY0NzczODYwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1691096675075-de995918f3ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBwcm9kdWN0JTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzY0Njk0NTg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  ];

  // Highlighted Services
  const highlightedServices = [
    {
      id: "1",
      title: "Studio & On-Model Photography",
      description: "Professional on-model photography in our state-of-the-art studio. Capture your garments in motion with experienced models and expert styling.",
      image: "https://images.unsplash.com/photo-1609681780612-7cc8459b4120?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBwcm9kdWN0JTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzY0NzczODYwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: "2",
      title: "Stocking + Commercial Production",
      description: "Large-scale commercial photography for catalogs and seasonal collections. Fast turnaround with consistent quality across hundreds of products.",
      image: "https://images.unsplash.com/photo-1691096675075-de995918f3ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBwcm9kdWN0JTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzY0Njk0NTg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: "3",
      title: "Runway & Fashion Week Coverage",
      description: "Fast-paced runway photography capturing every detail from fashion shows and events. Same-day delivery for time-sensitive launches.",
      image: "https://images.unsplash.com/photo-1762430815620-fcca603c240c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydW53YXklMjBmYXNoaW9uJTIwc2hvd3xlbnwxfHx8fDE3NjQ3MTkxNzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  // Service Packages
  const packages = [
    {
      name: "Ecommerce Product Package",
      price: "$899",
      included: [
        "Up to 20 product shots",
        "Professional retouching",
        "White background or lifestyle",
        "High-resolution files",
        "3-day turnaround",
        "Basic ghost mannequin editing"
      ],
      notIncluded: [
        "Model hiring",
        "Styling services",
        "Rush delivery (24hr)"
      ]
    },
    {
      name: "Photography + Video Package",
      price: "$1,899",
      recommended: true,
      included: [
        "Full-day studio session",
        "30+ product photographs",
        "3 short-form videos (15-30s)",
        "On-model or lifestyle styling",
        "Professional editing & grading",
        "Social media optimization",
        "5-day delivery"
      ],
      notIncluded: [
        "Location fees",
        "Additional model costs",
        "Expedited delivery"
      ]
    },
    {
      name: "Full Production Service",
      price: "$4,999",
      included: [
        "Creative direction & concept",
        "Full-day production",
        "Unlimited shots & angles",
        "Professional models & stylists",
        "Video + photography",
        "Complete post-production",
        "Usage rights included",
        "7-day delivery"
      ],
      notIncluded: [
        "International travel",
        "Premium location rentals"
      ]
    }
  ];

  // Brand Statement Portrait
  const portraitImage = "https://images.unsplash.com/photo-1653640869615-e9878a2c8344?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwcG9ydHJhaXQlMjBzdHVkaW98ZW58MXx8fHwxNzY0Njc5NjM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

  // Services Overview
  const servicesOverview = [
    {
      id: "1",
      title: "On-Model",
      description: "Bring your designs to life with professional models. Studio or on-location shoots with expert styling and direction.",
      image: "https://images.unsplash.com/photo-1664891419647-5dfe3d310226?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjQ3MzA1MzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: "2",
      title: "Lookbook / Editorial",
      description: "High-fashion editorial photography for seasonal lookbooks and brand campaigns with creative storytelling.",
      image: "https://images.unsplash.com/photo-1700575306937-0855d570110d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbG9va2Jvb2slMjBlZGl0b3JpYWx8ZW58MXx8fHwxNzY0NzI5OTk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: "3",
      title: "Studio Ecommerce",
      description: "Clean, consistent product photography optimized for online retail. Fast turnaround for large catalogs.",
      image: "https://images.unsplash.com/photo-1621198059871-0d5f9b449233?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG90aGluZyUyMGZsYXQlMjBsYXklMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3NjQ3NzM4NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: "4",
      title: "On-Location Shoots",
      description: "Lifestyle and environmental photography on location. Perfect for brand storytelling and authentic moments.",
      image: "https://images.unsplash.com/photo-1758613653231-bae4e1131dde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbG9jYXRpb24lMjBzaG9vdHxlbnwxfHx8fDE3NjQ3NzM4NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  // Creative Showcase Images
  const videoImage = "https://images.unsplash.com/photo-1640888092372-d323d3f8354a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwdmlkZW8lMjBwcm9kdWN0aW9ufGVufDF8fHx8MTc2NDc3Mzg2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
  const productImage = "https://images.unsplash.com/photo-1758813531001-3af022b8f449?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcHBhcmVsJTIwcHJvZHVjdCUyMGRldGFpbHxlbnwxfHx8fDE3NjQ3NzM4NjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

  // BTS Image
  const btsImage = "https://images.unsplash.com/photo-1758613656677-012ee6263745?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwYmVoaW5kJTIwc2NlbmVzJTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzY0NzczODYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

  // FAQs
  const faqs = [
    {
      question: "What is included in your on-model shoots?",
      answer: "Our on-model shoots include professional model casting, studio time, lighting setup, photography direction, and basic retouching. We provide high-resolution images optimized for both web and print use."
    },
    {
      question: "Do you offer same-day delivery?",
      answer: "Yes! For rush projects and runway coverage, we offer same-day delivery with our expedited service. Standard packages include 3-7 day turnaround, while our premium rush service delivers edited images within 24 hours for an additional fee."
    },
    {
      question: "Can you shoot on-location or only in studio?",
      answer: "We offer both studio and on-location photography services. Our team can travel to your preferred location or we can help source the perfect setting for your brand's aesthetic. Location fees may apply depending on the shoot requirements."
    },
    {
      question: "How many outfit changes are included?",
      answer: "The number of outfit changes varies by package. Our Ecommerce Package includes up to 20 products, the Photography + Video Package allows for 30+ products, and our Full Production Service offers unlimited outfit changes during your session."
    },
    {
      question: "Do you provide models and stylists?",
      answer: "Yes, we have relationships with top modeling agencies and professional stylists. Model and stylist costs are included in our Full Production Service package, and can be added to other packages for an additional fee."
    },
    {
      question: "What file formats do you deliver?",
      answer: "We deliver high-resolution JPG files optimized for web and print. Raw files and additional formats (PNG, TIFF) are available upon request. All images include basic retouching and color correction."
    },
    {
      question: "Can you match our brand's existing aesthetic?",
      answer: "Absolutely! We begin every project with a creative consultation to understand your brand guidelines, aesthetic preferences, and target audience. We'll provide mood boards and samples to ensure alignment before the shoot."
    },
    {
      question: "What's your cancellation policy?",
      answer: "We require 48 hours notice for cancellations to receive a full refund of your deposit. Cancellations within 24 hours of the scheduled shoot are subject to a 50% cancellation fee. Weather-related cancellations for outdoor shoots can be rescheduled at no charge."
    },
    {
      question: "Do you offer video production services?",
      answer: "Yes! Our Photography + Video Package and Full Production Service both include professional video production. We create short-form content optimized for social media, product reveals, and brand campaigns."
    },
    {
      question: "How far in advance should I book?",
      answer: "We recommend booking 2-4 weeks in advance to ensure availability, especially during peak seasons (fashion weeks and holiday campaigns). However, we can often accommodate last-minute requests depending on our schedule."
    }
  ];

  // Testimonials
  const testimonials = [
    {
      quote: "FashionOS elevated our entire brand presence. Their attention to detail and ability to capture our vision is unmatched.",
      author: "Alexandra Chen",
      role: "Creative Director, NOUVEAU"
    },
    {
      quote: "The turnaround time was incredible without sacrificing quality. They understood exactly what we needed for our launch.",
      author: "Marcus Williams",
      role: "Founder, URBAN THREAD"
    },
    {
      quote: "Working with FashionOS feels like having an in-house creative team. They're responsive, professional, and consistently deliver stunning work.",
      author: "Sofia Rodriguez",
      role: "Marketing Lead, ATELIER BLANC"
    }
  ];

  // Additional Services
  const additionalServices = [
    {
      title: "Campaign Photography Service",
      description: "End-to-end creative direction and execution for seasonal campaigns and brand launches. From concept development to final delivery, we bring your vision to life with editorial excellence.",
      image: "https://images.unsplash.com/photo-1630948688037-aa88dc433a57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwY2FtcGFpZ24lMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3NjQ3NzI0MTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      buttonText: "Explore Campaigns"
    },
    {
      title: "Runway / Event Photography Service",
      description: "Fast-paced fashion show and event coverage with same-day delivery. Our experienced team captures every detail from the runway, backstage moments, and celebrity attendees.",
      image: "https://images.unsplash.com/photo-1652377219838-352b60ade1f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwc3R1ZGlvJTIwbGlnaHRpbmd8ZW58MXx8fHwxNzY0NzczODY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      buttonText: "View Event Coverage"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="pt-20">
        {/* 1. Hero Section */}
        <ServicesHero heroImage={heroImage} collageImages={collageImages} />

        {/* 2. Highlighted Service Banner */}
        <HighlightedServices services={highlightedServices} />

        {/* 3. Service Packages */}
        <ServicePackages packages={packages} />

        {/* 4. Brand Statement + Portrait */}
        <BrandStatement portraitImage={portraitImage} />

        {/* 5. Services Overview Grid */}
        <ServicesOverview services={servicesOverview} />

        {/* 6. Creative Showcase */}
        <CreativeShowcase videoImage={videoImage} productImage={productImage} />

        {/* 7. Behind-the-Scenes Hero */}
        <BTSHero btsImage={btsImage} />

        {/* 8. Trust Section */}
        <TrustSection />

        {/* 9. FAQ Section */}
        <FAQSection faqs={faqs} />

        {/* 10. Testimonials */}
        <TestimonialsSection testimonials={testimonials} />

        {/* 11. Additional Service Highlights */}
        <AdditionalServices services={additionalServices} />

        {/* 12. Final CTA */}
        <FinalCTA />

        {/* 13. Footer */}
        <Footer />
      </div>
    </div>
  );
}
