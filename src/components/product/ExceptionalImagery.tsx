import { motion } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface ExceptionalImageryProps {
  productImages: string[];
}

export function ExceptionalImagery({ productImages }: ExceptionalImageryProps) {
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
            <h2 className="mb-6">Exceptional imagery. Every time.</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Our product photography process combines technical precision with creative vision. Each image is meticulously crafted to showcase your products in their best light, with consistent quality that builds trust and drives conversions.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              From initial concept to final delivery, we maintain the highest standards of excellence. Our studio is equipped with state-of-the-art lighting and equipment to capture every detail with stunning clarity.
            </p>
            <motion.button
              className="border-2 border-black text-black px-10 py-4 rounded-full hover:bg-black hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              See Portfolio
            </motion.button>
          </motion.div>

          {/* Right Image Grid */}
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {productImages.slice(0, 8).map((image, index) => (
              <motion.div
                key={index}
                className="aspect-square overflow-hidden rounded-lg bg-white"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                <ImageWithFallback
                  src={image}
                  alt={`Product ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
