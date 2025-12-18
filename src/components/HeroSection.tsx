import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HeroSectionProps {
  images: {
    hero1: string;
    hero2: string;
    hero3: string;
    hero4: string;
  };
}

export function HeroSection({ images }: HeroSectionProps) {
  // Use a high-impact B&W runway image
  const heroBg = "https://images.unsplash.com/photo-1537832816519-0439d612e726?q=80&w=2000&auto=format&fit=crop"; 

  const handleNavigation = (href: string) => {
    window.history.pushState({}, "", href);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return (
    <section className="relative h-screen w-full bg-black overflow-hidden flex items-center justify-center">
      {/* Background Image (Simulating Video) */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback 
          src={heroBg} 
          className="w-full h-full object-cover opacity-60 grayscale"
          alt="Runway Background"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl px-6 space-y-8">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-tight tracking-tight"
        >
          The Operating System <br/> for Modern Luxury.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-gray-200 font-light max-w-2xl mx-auto"
        >
          Intelligent production, event management, and network.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <button 
            onClick={() => handleNavigation("/wizard")}
            className="px-8 py-4 bg-white text-black text-sm font-medium tracking-widest uppercase hover:bg-gray-100 transition-colors w-full sm:w-auto min-w-[200px]"
          >
            Start New Project
          </button>
          <button 
            onClick={() => handleNavigation("/services")}
            className="px-8 py-4 border border-white text-white text-sm font-medium tracking-widest uppercase hover:bg-white/10 transition-colors w-full sm:w-auto min-w-[200px]"
          >
            Explore Services
          </button>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-widest uppercase"
      >
        Scroll to Explore
      </motion.div>
    </section>
  );
}
