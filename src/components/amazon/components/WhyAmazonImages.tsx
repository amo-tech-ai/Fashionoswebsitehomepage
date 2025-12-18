import React from "react";
import { motion } from "motion/react";
import { Check, Star } from "lucide-react";
import { ImageWithFallback } from "../../figma/ImageWithFallback";

export function WhyAmazonImages() {
  return (
    <section className="py-24 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl mb-6 text-gray-900 font-serif">
              Why visual quality is your #1 asset.
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              85% of buyers say product images influence their purchase decision. On a marketplace as crowded as Amazon, high-quality visuals are the difference between a scroll and a sale.
            </p>
            <ul className="space-y-4">
              {[
                "Increase click-through rates (CTR)",
                "Boost conversion rates instantly",
                "Reduce return rates with accurate detail",
                "Build brand trust and perceived value"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white p-4 rounded-2xl shadow-2xl transform rotate-2 hover:rotate-0 transition-all duration-500">
              <div className="aspect-[4/3] rounded-lg overflow-hidden relative">
                 <ImageWithFallback
                   src="https://images.unsplash.com/photo-1601057836844-a8a336439a27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqZXdlbHJ5JTIwcGhvdG9ncmFwaHklMjBtYWNyb3xlbnwxfHx8fDE3NjQ4ODM4NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                   alt="High quality product shot"
                   className="w-full h-full object-cover"
                 />
                 <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-md text-xs font-bold shadow-sm">
                   FashionOS Quality
                 </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                 <div className="text-sm font-medium text-gray-900">Amazon Standards • Improved Conversions</div>
                 <div className="flex gap-1">
                    {[1,2,3,4,5].map(star => <Star key={star} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
                 </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
