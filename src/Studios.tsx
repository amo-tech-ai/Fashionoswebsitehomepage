import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { StudioHero } from "./components/studios/StudioHero";
import { PricingStrip } from "./components/studios/PricingStrip";
import { BigStudioSmallPrice } from "./components/studios/BigStudioSmallPrice";
import { StudioGalleryRow } from "./components/studios/StudioGalleryRow";
import { OurGoal } from "./components/studios/OurGoal";
import { StudioOneSpecs } from "./components/studios/StudioOneSpecs";
import { ThreeFeatureCards } from "./components/studios/ThreeFeatureCards";
import { FacilitiesOverview } from "./components/studios/FacilitiesOverview";
import { BookingIncludes } from "./components/studios/BookingIncludes";
import { PreviousVisitors } from "./components/studios/PreviousVisitors";
import { ShotInStudios } from "./components/studios/ShotInStudios";
import { StudioTestimonials } from "./components/studios/StudioTestimonials";
import { StudioFAQ } from "./components/studios/StudioFAQ";
import { StudioOverview } from "./components/studios/StudioOverview";
import { BuiltByCreatives } from "./components/studios/BuiltByCreatives";
import { StudioInAction } from "./components/studios/StudioInAction";

export default function Studios() {
  // Hero Images
  const heroImage = "https://images.unsplash.com/photo-1627917932033-74123f070958?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG90byUyMHN0dWRpbyUyMGludGVyaW9yfGVufDF8fHx8MTc2NDc4NzcxMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
  
  const accentImages = [
    "https://images.unsplash.com/photo-1762028895381-e479626a4fa6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxtJTIwc3R1ZGlvJTIwbGlnaHRpbmd8ZW58MXx8fHwxNzY0Nzg3NzEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1584696364735-c52b479e69bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG90b2dyYXBoeSUyMHN0dWRpbyUyMHNwYWNlfGVufDF8fHx8MTc2NDc2NTQ4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  ];

  // Big Studio Small Price
  const studioOverviewImage = "https://images.unsplash.com/photo-1584696364735-c52b479e69bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG90b2dyYXBoeSUyMHN0dWRpbyUyMHNwYWNlfGVufDF8fHx8MTc2NDc2NTQ4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

  // Gallery Row Images
  const galleryImages = [
    "https://images.unsplash.com/photo-1627917932033-74123f070958?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG90byUyMHN0dWRpbyUyMGludGVyaW9yfGVufDF8fHx8MTc2NDc4NzcxMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1620942617746-7784b7a1526f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG90b2dyYXBoeSUyMGJhY2tkcm9wJTIwc3R1ZGlvfGVufDF8fHx8MTc2NDc4NzcxMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1762028895381-e479626a4fa6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxtJTIwc3R1ZGlvJTIwbGlnaHRpbmd8ZW58MXx8fHwxNzY0Nzg3NzEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  ];

  // Floorplan
  const floorplanImage = "https://images.unsplash.com/photo-1606521749413-ab3553630e5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkaW8lMjBmbG9vciUyMHBsYW58ZW58MXx8fHwxNzY0Nzg3NzEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

  // Makeup Station
  const makeupStationImage = "https://images.unsplash.com/photo-1764269719546-afc8567db7c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWtldXAlMjBzdGF0aW9uJTIwc3R1ZGlvfGVufDF8fHx8MTc2NDc4NzcxMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

  // Shot in Studios Showcase
  const showcaseImages = [
    "https://images.unsplash.com/photo-1739945533087-1f80850e7d86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwcGhvdG8lMjBzaG9vdHxlbnwxfHx8fDE3NjQ3ODc3MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1762028895381-e479626a4fa6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxtJTIwc3R1ZGlvJTIwbGlnaHRpbmd8ZW58MXx8fHwxNzY0Nzg3NzEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  ];

  // Testimonials
  const testimonials = [
    {
      rating: 5,
      quote: "The best studio space we've ever worked in. Professional equipment, great natural light, and the team was incredibly helpful.",
      author: "Sarah Chen",
      brand: "Chen Photography"
    },
    {
      rating: 5,
      quote: "Unbeatable value. The studio has everything we needed for our campaign shoot, and the pricing is extremely competitive.",
      author: "Marcus Williams",
      brand: "Urban Collective"
    },
    {
      rating: 5,
      quote: "From booking to wrap, the entire experience was seamless. The space is beautiful and the equipment is top-tier.",
      author: "Emma Rodriguez",
      brand: "Rodriguez Studios"
    }
  ];

  // FAQs
  const faqs = [
    {
      question: "What equipment is included in the studio rental?",
      answer: "Every booking includes professional Profoto lighting kit, C-stands, seamless backdrops (white, black, gray), tethering station with monitor, garment steamer, clothing racks, makeup area, and WiFi. Additional equipment can be rented separately."
    },
    {
      question: "Do you allow external photographers and crews?",
      answer: "Absolutely! You can bring your own photographer, crew, and equipment. Our studio is designed to accommodate professional teams of all sizes."
    },
    {
      question: "How do I secure a booking?",
      answer: "Bookings can be made through our website or by contacting our studio team. A deposit is required to confirm your reservation, with the balance due 48 hours before your shoot date."
    },
    {
      question: "What's your cancellation policy?",
      answer: "Cancellations made 48+ hours before your booking receive a full refund. Cancellations within 48 hours receive a 50% refund. Same-day cancellations are non-refundable."
    },
    {
      question: "Is there parking available?",
      answer: "Yes, we offer complimentary parking for up to 4 vehicles. Additional parking is available on the street and in nearby lots."
    },
    {
      question: "Can we bring our own props and set materials?",
      answer: "Yes! We have easy load-in access with a freight elevator. You're welcome to bring whatever you need for your shoot."
    },
    {
      question: "Do you offer multi-day discounts?",
      answer: "Yes, we offer discounted rates for bookings of 3+ consecutive days. Contact us for custom pricing on extended shoots."
    },
    {
      question: "Is there a studio assistant available?",
      answer: "Every booking includes an on-site studio assistant to help with equipment setup, lighting adjustments, and general support during your shoot."
    },
    {
      question: "What are the studio hours?",
      answer: "The studio is available 7 days a week from 8am to 10pm. Early morning or late night shoots can be arranged with advance notice."
    },
    {
      question: "Can we use the studio for video production?",
      answer: "Yes! Our studio is perfect for both photo and video shoots. The high ceilings and professional lighting make it ideal for any type of production."
    },
    {
      question: "Do you have a makeup and hair station?",
      answer: "Yes, we have a dedicated makeup area with professional lighting, mirrors, and comfortable seating for your styling team."
    },
    {
      question: "What's the maximum capacity for the studio?",
      answer: "The studio can comfortably accommodate up to 20 people including crew, talent, and clients. For larger productions, please contact us to discuss options."
    }
  ];

  // BTS Images
  const btsImages = [
    "https://images.unsplash.com/photo-1691491918178-8a2e68b44919?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkaW8lMjBiZWhpbmQlMjBzY2VuZXN8ZW58MXx8fHwxNzY0Nzg3NzEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1762028895381-e479626a4fa6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxtJTIwc3R1ZGlvJTIwbGlnaHRpbmd8ZW58MXx8fHwxNzY0Nzg3NzEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1627917932033-74123f070958?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG90byUyMHN0dWRpbyUyMGludGVyaW9yfGVufDF8fHx8MTc2NDc4NzcxMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1620942617746-7784b7a1526f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG90b2dyYXBoeSUyMGJhY2tkcm9wJTIwc3R1ZGlvfGVufDF8fHx8MTc2NDc4NzcxMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1691491918178-8a2e68b44919?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkaW8lMjBiZWhpbmQlMjBzY2VuZXN8ZW58MXx8fHwxNzY0Nzg3NzEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1745848038063-bbb6fc8c8867?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkaW8lMjBlcXVpcG1lbnQlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzY0Nzg3NzExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1584696364735-c52b479e69bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG90b2dyYXBoeSUyMHN0dWRpbyUyMHNwYWNlfGVufDF8fHx8MTc2NDc2NTQ4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1739945533087-1f80850e7d86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwcGhvdG8lMjBzaG9vdHxlbnwxfHx8fDE3NjQ3ODc3MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="pt-20">
        {/* 1. Hero */}
        <StudioHero heroImage={heroImage} accentImages={accentImages} />

        {/* 2. Pricing Strip */}
        <PricingStrip />

        {/* 3. Big Studio Small Price */}
        <BigStudioSmallPrice studioImage={studioOverviewImage} />

        {/* 4. Studio Gallery Row */}
        <StudioGalleryRow galleryImages={galleryImages} />

        {/* 5. Our Goal */}
        <OurGoal />

        {/* 6. Studio One Specs */}
        <StudioOneSpecs floorplanImage={floorplanImage} />

        {/* 7. Three Feature Cards */}
        <ThreeFeatureCards />

        {/* 8. Facilities Overview */}
        <FacilitiesOverview />

        {/* 9. Booking Includes */}
        <BookingIncludes makeupStationImage={makeupStationImage} />

        {/* 10. Previous Visitors */}
        <PreviousVisitors />

        {/* 11. Shot in Studios */}
        <ShotInStudios showcaseImages={showcaseImages} />

        {/* 12. Testimonials */}
        <StudioTestimonials testimonials={testimonials} />

        {/* 13. FAQ */}
        <StudioFAQ faqs={faqs} />

        {/* 14. Studio Overview */}
        <StudioOverview />

        {/* 15. Built by Creatives */}
        <BuiltByCreatives floorplanImage={floorplanImage} />

        {/* 16. Studio in Action */}
        <StudioInAction btsImages={btsImages} />

        {/* 17. Footer */}
        <Footer />
      </div>
    </div>
  );
}
