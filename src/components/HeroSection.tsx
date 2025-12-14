import { motion } from "motion/react";
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
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const handleNavigation = (href: string) => {
    // Update URL and trigger routing event for App.tsx
    window.history.pushState({}, "", href);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return (
    <section className="min-h-screen bg-white">
      <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div 
            className="lg:col-span-5 space-y-8"
            {...fadeIn}
          >
            <div className="space-y-4">
              <h1>
                Exceptional fashion imagery.<br />Every time.
              </h1>
              <p className="text-xl text-gray-600 max-w-lg">
                Premium photography services for luxury brands and creative visionaries.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <motion.button
                className="bg-black text-white px-10 py-4 rounded-full hover:bg-gray-800 transition-all duration-300 font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Book a Campaign
              </motion.button>
              
              <motion.button
                onClick={() => handleNavigation("/designer-wizard")}
                className="bg-white border border-gray-200 text-gray-900 px-10 py-4 rounded-full hover:bg-gray-50 transition-all duration-300 font-medium flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Create Your Profile
              </motion.button>
            </div>

            <div className="space-y-3 pt-6">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                <span className="text-gray-700">Creative direction</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                <span className="text-gray-700">Premium quality</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                <span className="text-gray-700">Consistent results</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Image Collage */}
          <motion.div 
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="grid grid-cols-2 gap-4 lg:gap-6">
              <motion.div 
                className="col-span-1 aspect-[3/4] overflow-hidden rounded-sm"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <ImageWithFallback
                  src={images.hero1}
                  alt="Fashion editorial"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div 
                className="col-span-1 aspect-[3/4] overflow-hidden rounded-sm mt-12"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <ImageWithFallback
                  src={images.hero2}
                  alt="Fashion portrait"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div 
                className="col-span-1 aspect-[4/3] overflow-hidden rounded-sm -mt-8"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <ImageWithFallback
                  src={images.hero3}
                  alt="Fashion detail"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div 
                className="col-span-1 aspect-[4/3] overflow-hidden rounded-sm"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <ImageWithFallback
                  src={images.hero4}
                  alt="Fashion minimalist"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
