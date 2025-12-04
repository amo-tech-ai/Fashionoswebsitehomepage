import { motion } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface ApparelStillLifeProps {
  stillLifeImages: string[];
}

export function ApparelStillLife({ stillLifeImages }: ApparelStillLifeProps) {
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
            <h3 className="mb-6">Apparel Still Life.</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Stylized, set-designed product scenes that tell a story. Our still life photography transforms apparel into art, using carefully curated props, backdrops, and lighting to create compelling visual narratives.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Perfect for editorial content, social media, and brand campaigns that demand creative distinction and emotional resonance.
            </p>
          </motion.div>

          {/* Right Image Strip */}
          <motion.div
            className="flex gap-4 overflow-x-auto pb-4"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {stillLifeImages.map((image, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 w-64 aspect-[3/4] overflow-hidden rounded-lg bg-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <ImageWithFallback
                  src={image}
                  alt={`Still Life ${index + 1}`}
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
