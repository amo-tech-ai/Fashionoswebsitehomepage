import { motion } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface StudioInActionProps {
  btsImages: string[];
}

export function StudioInAction({ btsImages }: StudioInActionProps) {
  return (
    <section className="py-20 lg:py-32 bg-black">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.h2
          className="text-center mb-12 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          The Studio in Action.
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {btsImages.map((image, index) => (
            <motion.div
              key={index}
              className="aspect-square overflow-hidden rounded-lg group"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <ImageWithFallback
                src={image}
                alt={`Studio in action ${index + 1}`}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
