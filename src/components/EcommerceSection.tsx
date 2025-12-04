import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface EcommerceSectionProps {
  productImages: string[];
}

export function EcommerceSection({ productImages }: EcommerceSectionProps) {
  const benefits = [
    "High-resolution product photography",
    "Consistent lighting and styling",
    "Fast turnaround for large catalogs",
    "Lifestyle and flat-lay options",
    "Optimized for online retail"
  ];

  return (
    <section className="py-24 lg:py-32 bg-[rgb(var(--color-charcoal))] text-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <div className="space-y-6">
              <h2 className="text-white">
                Ecommerce Product Photography
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                Elevate your online store with stunning product imagery that converts browsers into buyers.
              </p>
            </div>

            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  <p className="text-gray-200">
                    {benefit}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.button
              className="bg-white text-black px-10 py-4 rounded-full hover:bg-gray-100 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Get a Quote
            </motion.button>
          </motion.div>

          {/* Right - Product Images */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex gap-6 justify-center items-center"
          >
            {productImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
                whileHover={{ scale: 1.05, y: -8 }}
                className="w-1/3 aspect-square overflow-hidden rounded-sm"
                style={{
                  boxShadow: "0 20px 60px rgba(255, 255, 255, 0.1)"
                }}
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
