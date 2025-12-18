import React from "react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../../figma/ImageWithFallback";
import { recentWorkImages } from "../data";

export function RecentWorkGallery() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-4xl font-serif text-gray-900 mb-12 text-center">Recent Amazon Projects</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {recentWorkImages.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="aspect-square rounded-lg overflow-hidden group relative cursor-pointer"
            >
              <ImageWithFallback
                src={src}
                alt={`Work sample ${index}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-sm font-medium border-b border-white pb-0.5">View Project</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
