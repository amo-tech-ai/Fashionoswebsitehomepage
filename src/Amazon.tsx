import React from "react";
import { Footer } from "./components/Footer";
import { AmazonHero } from "./components/amazon/components/AmazonHero";
import { WhyAmazonImages } from "./components/amazon/components/WhyAmazonImages";
import { PhotoServices } from "./components/amazon/components/PhotoServices";
import { VideoServices } from "./components/amazon/components/VideoServices";
import { APlusContent } from "./components/amazon/components/APlusContent";
import { ComplianceGuarantee } from "./components/amazon/components/ComplianceGuarantee";
import { PricingPackages } from "./components/amazon/components/PricingPackages";
import { RecentWorkGallery } from "./components/amazon/components/RecentWorkGallery";
import { SupportedPlatforms } from "./components/amazon/components/SupportedPlatforms";
import { Testimonials } from "./components/amazon/components/Testimonials";
import { ContactForm } from "./components/amazon/components/ContactForm";

export default function AmazonServices() {
  return (
    <div className="min-h-screen bg-[#F8F6F4]">
      {/* 1. HERO SECTION */}
      <AmazonHero />

      {/* 2. WHY AMAZON IMAGES MATTER */}
      <WhyAmazonImages />

      {/* 3. PHOTOGRAPHY SERVICES */}
      <PhotoServices />

      {/* 4. VIDEO SERVICES */}
      <VideoServices />

      {/* 5. A+ CONTENT */}
      <APlusContent />

      {/* 6. COMPLIANCE GUARANTEE */}
      <ComplianceGuarantee />

      {/* 7. PRICING PACKAGES */}
      <PricingPackages />

      {/* 8. RECENT WORK GALLERY */}
      <RecentWorkGallery />

      {/* 9. CHANNELS WE SUPPORT */}
      <SupportedPlatforms />

      {/* 10. TESTIMONIALS */}
      <Testimonials />

      {/* 11. CONTACT FORM */}
      <ContactForm />

      <Footer />
    </div>
  );
}
