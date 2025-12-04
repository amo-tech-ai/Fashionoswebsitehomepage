import { motion } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface ShotInStudiosProps {
  showcaseImages: string[];
}

export function ShotInStudios({ showcaseImages }: ShotInStudiosProps) {
  return (
    <section className="bg-gray-50 py-20 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.h2
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Shot in Our Studios
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {showcaseImages.map((image, index) => (
            <motion.div
              key={index}
              className="overflow-hidden rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="aspect-[3/4]">
                <ImageWithFallback
                  src={image}
                  alt={`Studio shoot ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
