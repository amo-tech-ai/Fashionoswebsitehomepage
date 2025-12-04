import { motion } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface BuiltByCreativesProps {
  floorplanImage: string;
}

export function BuiltByCreatives({ floorplanImage }: BuiltByCreativesProps) {
  return (
    <section className="py-20 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="mb-6">Built by Creatives for Creatives.</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Every detail of our studio was designed by working photographers and producers who understand the demands of professional shoots. From the placement of power outlets to the height of our makeup mirrors—nothing was left to chance.
            </p>
            <p className="text-gray-600 leading-relaxed">
              The result is a space that flows naturally, supports efficient workflows, and provides everything you need without unnecessary complexity or compromise.
            </p>
          </motion.div>

          {/* Right Floorplan */}
          <motion.div
            className="overflow-hidden rounded-lg bg-white p-8"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="aspect-square">
              <ImageWithFallback
                src={floorplanImage}
                alt="Studio Floorplan"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-center text-sm text-gray-500 mt-4">Studio Layout & Dimensions</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
