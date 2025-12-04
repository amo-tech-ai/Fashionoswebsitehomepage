import { motion } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface DetailsSectionProps {
  detailImages: string[];
}

export function DetailsSection({ detailImages }: DetailsSectionProps) {
  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="mb-6">Details.</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Highlighting craftsmanship through macro photography. We capture the intricate details that make your garments exceptional—from delicate stitching and unique textures to premium materials and hardware.
            </p>
            <p className="text-gray-600 leading-relaxed">
              These close-up shots communicate quality, build trust with discerning customers, and showcase the artistry behind your designs.
            </p>
          </motion.div>

          {/* Right Detail Images */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {detailImages.slice(0, 3).map((image, index) => (
              <motion.div
                key={index}
                className={`aspect-square overflow-hidden rounded-lg bg-gray-100 ${
                  index === 2 ? 'md:col-span-2' : ''
                }`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <ImageWithFallback
                  src={image}
                  alt={`Detail ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
