import { motion } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface ClothingFlatsProps {
  flatImages: string[];
}

export function ClothingFlats({ flatImages }: ClothingFlatsProps) {
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
            <h3 className="mb-6">Clothing Flats.</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Studio-made flat-lay photography delivers perfectly consistent imagery ideal for e-commerce catalogs. Every garment is meticulously styled, steamed, and photographed from directly above with precise lighting.
            </p>
            <p className="text-gray-600 leading-relaxed">
              This approach ensures uniform sizing, accurate color representation, and a clean, professional aesthetic across your entire product line. Perfect for high-volume shoots and maintaining brand consistency.
            </p>
          </motion.div>

          {/* Right Images */}
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {flatImages.map((image, index) => (
              <motion.div
                key={index}
                className="aspect-square overflow-hidden rounded-lg bg-gray-50"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <ImageWithFallback
                  src={image}
                  alt={`Flat ${index + 1}`}
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
