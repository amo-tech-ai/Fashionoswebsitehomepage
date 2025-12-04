import { motion } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface TrustSectionProps {
  trustImages: string[];
}

export function TrustSection({ trustImages }: TrustSectionProps) {
  return (
    <section className="bg-gray-50 py-20 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-6">20+ Years of Clothing Photography, Trusted by Leading Fashion Brands.</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Our expertise in apparel photography spans over two decades, working with fashion brands from emerging designers to global luxury labels. We understand the nuances of fabric, fit, and presentation that make clothing imagery truly exceptional.
            </p>
            <p className="text-gray-600 leading-relaxed">
              From e-commerce product shots to editorial campaigns, our team delivers consistent quality, technical precision, and creative excellence. Every garment is treated with the care and attention it deserves.
            </p>
          </motion.div>

          {/* Right Mini Grid */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {trustImages.map((image, index) => (
              <motion.div
                key={index}
                className="aspect-square overflow-hidden rounded-lg bg-white"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -4 }}
              >
                <ImageWithFallback
                  src={image}
                  alt={`Trust ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
