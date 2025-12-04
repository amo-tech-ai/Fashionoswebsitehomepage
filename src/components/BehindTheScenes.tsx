import { motion } from "motion/react";
import { Play } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface BehindTheScenesProps {
  videoThumbnail: string;
}

export function BehindTheScenes({ videoThumbnail }: BehindTheScenesProps) {
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
          {/* Background Image with Parallax Effect */}
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${videoThumbnail})`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="absolute inset-0 bg-black/50"></div>
          </motion.div>

          {/* Content Overlay */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center space-y-8">
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30"
            >
              <Play className="w-8 h-8 text-white ml-1" fill="white" />
            </motion.div>

            <div className="space-y-4">
              <h2 className="text-white">Behind the scenes.</h2>
              <p className="text-xl text-gray-200 max-w-2xl">
                Watch how we bring creative visions to life through meticulous planning and execution.
              </p>
            </div>

            <motion.button
              className="bg-white text-black px-10 py-4 rounded-full hover:bg-gray-100 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Watch Video
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
