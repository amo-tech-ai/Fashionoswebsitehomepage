import { motion } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface InvisibleMannequinProcessProps {
  processImage: string;
}

export function InvisibleMannequinProcess({ processImage }: InvisibleMannequinProcessProps) {
  return (
    <section className="py-20 lg:py-32 bg-gray-900 text-white">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-white">Invisible Mannequin — The Process</h2>
          <div className="w-20 h-1 bg-white mx-auto"></div>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="aspect-[16/9] overflow-hidden rounded-2xl">
            <ImageWithFallback
              src={processImage}
              alt="Invisible Mannequin Process"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-gray-300 leading-relaxed">
            Our invisible mannequin technique combines multiple images with expert retouching to create the perfect 3D appearance. This method showcases garment shape, fit, and construction while maintaining a clean, professional look ideal for e-commerce.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
