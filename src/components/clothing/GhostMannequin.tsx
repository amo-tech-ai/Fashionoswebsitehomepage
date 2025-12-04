import { motion } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface GhostMannequinProps {
  ghostImages: string[];
}

export function GhostMannequin({ ghostImages }: GhostMannequinProps) {
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
            <h3 className="mb-6">Ghost Mannequin.</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Ghost mannequin photography creates the illusion of an invisible form inside your garments, providing a three-dimensional view that helps customers understand fit and shape without distraction.
            </p>
            <p className="text-gray-600 leading-relaxed">
              This technique is perfect for e-commerce, combining the professional look of on-model photography with the consistency and speed of flat-lay shots. Our expert retouching ensures seamless, natural results.
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
            {ghostImages.map((image, index) => (
              <motion.div
                key={index}
                className="aspect-[3/4] overflow-hidden rounded-lg bg-white"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <ImageWithFallback
                  src={image}
                  alt={`Ghost Mannequin ${index + 1}`}
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
