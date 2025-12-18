import React from "react";
import { motion } from "motion/react";
import { Star } from "lucide-react";
import { ImageWithFallback } from "../../figma/ImageWithFallback";

export function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8 flex justify-center gap-1">
            {[1,2,3,4,5].map(star => <Star key={star} className="w-6 h-6 text-yellow-400 fill-yellow-400" />)}
          </div>
          <blockquote className="text-3xl md:text-4xl text-gray-900 mb-8 leading-relaxed font-serif">
            "The images helped us increase our Amazon conversions by 38% in just 30 days. Absolutely game-changing."
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
              <ImageWithFallback src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHdvbWFufGVufDF8fHx8MTc2NDg4ODIxM3ww&ixlib=rb-4.1.0&q=80&w=200" className="w-full h-full object-cover" alt="Sarah J." />
            </div>
            <div className="text-left">
              <div className="font-bold text-gray-900">Sarah Jenkins</div>
              <div className="text-sm text-gray-500">Founder, Glow Beauty</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
