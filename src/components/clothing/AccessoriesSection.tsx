import { motion } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface AccessoriesSectionProps {
  accessoryImages: string[];
}

export function AccessoriesSection({ accessoryImages }: AccessoriesSectionProps) {
  return (
    <section className="bg-[#f8f6f3] py-20 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="mb-6">Accessories.</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Specialized photography for bags, belts, hats, jewelry, and footwear. Our accessory photography combines technical precision with creative styling to showcase the unique character of each piece.
            </p>
            <p className="text-gray-600 leading-relaxed">
              From luxury handbags to statement jewelry, we understand how to highlight materials, construction, and design details that make accessories essential to a complete look.
            </p>
          </motion.div>

          {/* Right Accessory Images */}
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {accessoryImages.map((image, index) => (
              <motion.div
                key={index}
                className="aspect-square overflow-hidden rounded-lg bg-white"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <ImageWithFallback
                  src={image}
                  alt={`Accessory ${index + 1}`}
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
