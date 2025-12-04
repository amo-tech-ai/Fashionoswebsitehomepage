import { motion } from "motion/react";
import { Play } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface BTSHeroProps {
  btsImage: string;
}

export function BTSHero({ btsImage }: BTSHeroProps) {
  return (
    <section className="py-24 lg:py-32 bg-[rgb(var(--color-charcoal))] text-white">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative aspect-[21/9] rounded-sm overflow-hidden group cursor-pointer"
        >
          {/* BTS Image with Dark Overlay */}
          <div className="absolute inset-0">
            <ImageWithFallback
              src={btsImage}
              alt="Behind the scenes"
              className="w-full h-full object-cover grayscale"
            />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>

          {/* Content Overlay */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center space-y-8 px-6">
            {/* Play Button */}
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/40 group-hover:bg-white/30 transition-all duration-300"
            >
              <Play className="w-10 h-10 text-white ml-2" fill="white" />
            </motion.div>

            <div className="space-y-4 max-w-3xl">
              <h2 className="text-white">Behind the scenes.</h2>
              <p className="text-xl text-gray-200">
                Step inside our studio and witness the creative process. 
                From concept to capture, see how we bring your vision to life.
              </p>
            </div>

            <motion.button
              className="bg-white text-black px-12 py-5 rounded-full hover:bg-gray-100 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Watch the Studio Reel
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
