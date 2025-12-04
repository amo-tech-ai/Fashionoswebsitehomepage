import { motion } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface StudioOneSpecsProps {
  floorplanImage: string;
}

export function StudioOneSpecs({ floorplanImage }: StudioOneSpecsProps) {
  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="mb-6">Studio One.</h3>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <span className="text-gray-900 min-w-32">Size:</span>
                <span className="text-gray-600">2,500 sq ft</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gray-900 min-w-32">Ceiling Height:</span>
                <span className="text-gray-600">14 feet</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gray-900 min-w-32">Equipment:</span>
                <span className="text-gray-600">Profoto lighting kit, C-stands, backdrops</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gray-900 min-w-32">Capacity:</span>
                <span className="text-gray-600">Up to 20 people comfortably</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gray-900 min-w-32">Natural Light:</span>
                <span className="text-gray-600">North-facing windows with blackout curtains</span>
              </div>
            </div>
            <motion.button
              className="border-2 border-black text-black px-8 py-3 rounded-full hover:bg-black hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View Full Specs
            </motion.button>
          </motion.div>

          {/* Right Floorplan */}
          <motion.div
            className="overflow-hidden rounded-lg bg-gray-100"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="aspect-square">
              <ImageWithFallback
                src={floorplanImage}
                alt="Studio One Floor Plan"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
