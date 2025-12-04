import { motion } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Download } from "lucide-react";

interface EcommerceHighlightProps {
  ecommerceImage: string;
}

export function EcommerceHighlight({ ecommerceImage }: EcommerceHighlightProps) {
  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
          {/* Card 1: Product Image */}
          <motion.div
            className="bg-gray-50 rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="aspect-square p-8 lg:p-12 flex items-center justify-center">
              <ImageWithFallback
                src={ecommerceImage}
                alt="Ecommerce Product"
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>

          {/* Card 2: Content */}
          <motion.div
            className="bg-[#f8f6f3] rounded-lg p-8 lg:p-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="mb-4">Ecommerce Product Photography.</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Optimized product photography designed specifically for online retail. Clean backgrounds, perfect lighting, and consistent styling that showcases your products and increases conversion rates.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Our ecommerce packages include high-resolution images, white background options, lifestyle shots, and detailed close-ups—everything you need to launch or refresh your online store.
            </p>
            <motion.button
              className="bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 transition-all duration-300 flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download className="w-5 h-5" />
              <span>Download Photography Pack</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
