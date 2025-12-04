import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { LatestCampaigns } from "./components/LatestCampaigns";
import { AboutStudio } from "./components/AboutStudio";
import { SignatureProject } from "./components/SignatureProject";
import { EcommerceSection } from "./components/EcommerceSection";
import { TestimonialSection } from "./components/TestimonialSection";
import { CreativeServices } from "./components/CreativeServices";
import { FashionDirectory } from "./components/FashionDirectory";
import { FashionMarketplace } from "./components/FashionMarketplace";
import { BehindTheScenes } from "./components/BehindTheScenes";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";

export default function AppHome() {
  // Hero Section Images
  const heroImages = {
    hero1: "https://images.unsplash.com/photo-1764158302194-54b208aa7f2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmYXNoaW9uJTIwcnVud2F5JTIwbW9kZWx8ZW58MXx8fHwxNzY0NzcyNDA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    hero2: "https://images.unsplash.com/photo-1706099347777-002ab5e8190c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZGl0b3JpYWwlMjBmYXNoaW9uJTIwcG9ydHJhaXQlMjB3b21hbnxlbnwxfHx8fDE3NjQ3NzI0MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    hero3: "https://images.unsplash.com/photo-1671696564980-02ac81b3f629?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXV0ZSUyMGNvdXR1cmUlMjBkZXRhaWx8ZW58MXx8fHwxNzY0NzE4MzcyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    hero4: "https://images.unsplash.com/photo-1614019781947-9d09ffb740d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZmFzaGlvbiUyMHBob3RvfGVufDF8fHx8MTc2NDc3MjQxMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  };

  // Latest Campaigns Data
  const campaigns = [
    {
      id: "1",
      title: "Spring Awakening",
      label: "Editorial '25",
      image: "https://images.unsplash.com/photo-1764158302194-54b208aa7f2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmYXNoaW9uJTIwcnVud2F5JTIwbW9kZWx8ZW58MXx8fHwxNzY0NzcyNDA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: "2",
      title: "Urban Elegance",
      label: "Milan Fashion Week",
      image: "https://images.unsplash.com/photo-1630948688037-aa88dc433a57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwY2FtcGFpZ24lMjBwaG90b2dyYXBoeXxlbnwxfHx8fDE3NjQ3NzI0MTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: "3",
      title: "Minimal Mood",
      label: "Urban Capsule",
      image: "https://images.unsplash.com/photo-1614019781947-9d09ffb740d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZmFzaGlvbiUyMHBob3RvfGVufDF8fHx8MTc2NDc3MjQxMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  // Studio Image
  const studioImage = "https://images.unsplash.com/photo-1758613654186-6ce234bf94ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwcGhvdG9ncmFwaHklMjBzdHVkaW98ZW58MXx8fHwxNzY0NjU1MTA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

  // Signature Project Portrait
  const portraitImage = "https://images.unsplash.com/photo-1676971751942-ce73a01d613d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBibGFjayUyMHdoaXRlfGVufDF8fHx8MTc2NDc3MjQxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

  // Ecommerce Product Images
  const productImages = [
    "https://images.unsplash.com/photo-1680503504076-e5c61901c36d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwcm9kdWN0JTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzY0NzE0NTYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1671696564980-02ac81b3f629?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXV0ZSUyMGNvdXR1cmUlMjBkZXRhaWx8ZW58MXx8fHwxNzY0NzE4MzcyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1758887953059-ca6f8e454207?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwYWNjZXNzb3JpZXMlMjBzdHlsZWR8ZW58MXx8fHwxNzY0NzcyNDE1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  ];

  // Testimonial Data
  const testimonial = {
    quote: "FashionOS transformed our brand imagery with their exceptional attention to detail and creative vision. Every shoot exceeds expectations.",
    author: "Sophie Martinez",
    role: "Creative Director, Maison Lumière",
    avatar: "https://images.unsplash.com/photo-1706099347777-002ab5e8190c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZGl0b3JpYWwlMjBmYXNoaW9uJTIwcG9ydHJhaXQlMjB3b21hbnxlbnwxfHx8fDE3NjQ3NzI0MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  };

  // Fashion Directory Profiles
  const directoryProfiles = [
    {
      id: "1",
      name: "Elena Rousseau",
      category: "Model",
      image: "https://images.unsplash.com/photo-1706099347777-002ab5e8190c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZGl0b3JpYWwlMjBmYXNoaW9uJTIwcG9ydHJhaXQlMjB3b21hbnxlbnwxfHx8fDE3NjQ3NzI0MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: "2",
      name: "Marcus Chen",
      category: "Photographer",
      image: "https://images.unsplash.com/photo-1652335543434-69331d29a41b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZGl0b3JpYWwlMjBmYXNoaW9uJTIwbWFsZSUyMG1vZGVsfGVufDF8fHx8MTc2NDc3MjQxNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: "3",
      name: "Isabella Durant",
      category: "Designer",
      image: "https://images.unsplash.com/photo-1674729446905-1cfcd533d90e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwZGVzaWduZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjQ3NDY1OTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: "4",
      name: "Julien Baptiste",
      category: "Stylist",
      image: "https://images.unsplash.com/photo-1676971751942-ce73a01d613d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBibGFjayUyMHdoaXRlfGVufDF8fHx8MTc2NDc3MjQxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  // Marketplace Categories
  const marketplaceCategories = [
    {
      id: "1",
      title: "Wardrobe",
      image: "https://images.unsplash.com/photo-1618236444721-4a8dba415c15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3YXJkcm9iZSUyMGNsb3NldHxlbnwxfHx8fDE3NjQ2ODE3NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: "2",
      title: "Locations",
      image: "https://images.unsplash.com/photo-1756276900419-868625adff43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbG9jYXRpb24lMjB1cmJhbnxlbnwxfHx8fDE3NjQ3NzI0MTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      id: "3",
      title: "Equipment",
      image: "https://images.unsplash.com/photo-1758613656229-d7434bf4b7ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwcGhvdG9ncmFwaHklMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzY0NzcyNDE1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  // Behind the Scenes Video Thumbnail
  const videoThumbnail = "https://images.unsplash.com/photo-1623544763064-912c002d8353?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwYmVoaW5kJTIwc2NlbmVzfGVufDF8fHx8MTc2NDc3MjQxNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Add padding to account for fixed header */}
      <div className="pt-20">
        {/* 1. Hero Section */}
        <HeroSection images={heroImages} />

        {/* 2. Latest Campaigns */}
        <LatestCampaigns campaigns={campaigns} />

        {/* 3. About/Studio Section */}
        <AboutStudio studioImage={studioImage} />

        {/* 4. Signature Project/Story Section */}
        <SignatureProject portraitImage={portraitImage} />

        {/* 5. Ecommerce Product Photography */}
        <EcommerceSection productImages={productImages} />

        {/* 6. Testimonial Section */}
        <TestimonialSection testimonial={testimonial} />

        {/* 7. Creative Services Grid */}
        <CreativeServices />

        {/* 8. Fashion Directory */}
        <FashionDirectory profiles={directoryProfiles} />

        {/* 9. Fashion Marketplace */}
        <FashionMarketplace categories={marketplaceCategories} />

        {/* 10. Behind the Scenes */}
        <BehindTheScenes videoThumbnail={videoThumbnail} />

        {/* 11. Contact/CTA Section */}
        <ContactSection />

        {/* 12. Footer */}
        <Footer />
      </div>
    </div>
  );
}
