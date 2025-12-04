import { motion } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface StudioGalleryRowProps {
  galleryImages: string[];
}

export function StudioGalleryRow({ galleryImages }: StudioGalleryRowProps) {
  return (
    <section className="bg-gray-50 py-20 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              className="overflow-hidden rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="aspect-[4/3]">
                <ImageWithFallback
                  src={image}
                  alt={`Studio angle ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
