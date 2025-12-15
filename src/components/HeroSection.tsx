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
  // Use specific images for the new design
  const editorialImage = "https://images.unsplash.com/photo-1761429944147-d79101284789?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsdXh1cnklMjBmYXNoaW9uJTIwZWRpdG9yaWFsJTIwc3R1ZGlvJTIwcGhvdG9ncmFwaHl8ZW58MXx8fHwxNzY1NzI0ODE5fDA&ixlib=rb-4.1.0&q=80&w=1080";
  const bwPortrait = "https://images.unsplash.com/photo-1601926299866-6a5c9bfa6be0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGFuZCUyMHdoaXRlJTIwbWluaW1hbGlzdCUyMGZhc2hpb24lMjBwb3J0cmFpdCUyMGhpZ2glMjBjb250cmFzdHxlbnwxfHx8fDE3NjU3MjQ4MjN8MA&ixlib=rb-4.1.0&q=80&w=1080";
  const lifestyleImage = "https://images.unsplash.com/photo-1577432984150-535460124bb5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0JTIwb3V0ZG9vciUyMGxpZmVzdHlsZSUyMGZhc2hpb24lMjBmbG9yYWwlMjBkcmVzcyUyMHN1bmxpZ2h0fGVufDF8fHx8MTc2NTcyNDgyN3ww&ixlib=rb-4.1.0&q=80&w=1080";

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax transforms
  const yBackground = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const yMain = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const yForeground = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const handleNavigation = (href: string) => {
    window.history.pushState({}, "", href);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return (
    <section ref={containerRef} className="min-h-screen bg-white overflow-hidden relative">
      <div className="container mx-auto px-6 lg:px-12 py-20 lg:py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div 
            className="lg:col-span-5 space-y-8"
            {...fadeIn}
          >
            <div className="space-y-6">
              <span className="text-xs md:text-sm tracking-[0.2em] text-gray-500 font-sans uppercase">FashionOS</span>
              <h1 className="text-5xl lg:text-7xl font-serif text-gray-900 leading-[1.1]">
                The Operating System for <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">Fashion Intelligence</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-lg leading-relaxed font-light">
                Runway to Retail • Creative to Commerce • AI-Driven features
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <motion.button
                onClick={() => handleNavigation("/signup")}
                className="bg-black text-white px-8 py-4 rounded-sm hover:bg-gray-800 transition-all duration-300 font-medium text-sm tracking-wide uppercase"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Sign Up
              </motion.button>
            </div>

            <div className="space-y-3 pt-8 border-t border-gray-100 mt-8">
              <div className="flex flex-col gap-1">
                <span className="text-gray-900 font-semibold font-serif text-lg">Events & Runway</span>
                <span className="text-gray-500 text-sm leading-relaxed">Seamless orchestration for global fashion weeks and private showings.</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Image Collage with Parallax */}
          <div className="lg:col-span-7 relative h-[600px] lg:h-[800px] w-full hidden lg:block">
            
            {/* Layer 1: Background Anchor (B&W Portrait) */}
            <motion.div 
              style={{ y: yBackground }}
              className="absolute left-0 top-10 w-[60%] h-[70%] z-0 grayscale opacity-80"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 0.8, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
               <ImageWithFallback
                 src={bwPortrait}
                 alt="Fashion portrait background"
                 className="w-full h-full object-cover"
               />
            </motion.div>

            {/* Layer 2: Main Focus (Color Editorial) */}
            <motion.div 
              style={{ y: yMain }}
              className="absolute right-0 top-0 w-[65%] h-[85%] z-10 shadow-2xl"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
               <ImageWithFallback
                 src={editorialImage}
                 alt="Fashion editorial main"
                 className="w-full h-full object-cover"
               />
            </motion.div>

            {/* Layer 3: Foreground Detail (Lifestyle) */}
            <motion.div 
              style={{ y: yForeground }}
              className="absolute left-[15%] bottom-10 w-[40%] aspect-[4/5] z-20 shadow-xl border-8 border-white"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
               <ImageWithFallback
                 src={lifestyleImage}
                 alt="Fashion lifestyle detail"
                 className="w-full h-full object-cover"
               />
            </motion.div>

          </div>
          
          {/* Mobile Collage Fallback */}
          <div className="lg:hidden mt-8 grid grid-cols-2 gap-4">
             <div className="aspect-[3/4] rounded-lg overflow-hidden">
                <ImageWithFallback src={editorialImage} className="w-full h-full object-cover" alt="Fashion editorial" />
             </div>
             <div className="aspect-[3/4] rounded-lg overflow-hidden mt-8">
                <ImageWithFallback src={bwPortrait} className="w-full h-full object-cover" alt="Fashion portrait" />
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
