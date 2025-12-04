import { motion } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface BigStudioSmallPriceProps {
  studioImage: string;
}

export function BigStudioSmallPrice({ studioImage }: BigStudioSmallPriceProps) {
  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-6">Big Studio. Small Price.</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Over 2,500 sq ft of professional studio space equipped with industry-leading gear, natural light options, and modern amenities—all at unbeatable rates.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Our mission is to make premium studio access affordable for creatives at every level. From independent photographers to established brands, we provide the space and tools you need to create exceptional work.
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.button
                className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Book Studio
              </motion.button>
              <motion.button
                className="border-2 border-black text-black px-8 py-3 rounded-full hover:bg-black hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View Facilities
              </motion.button>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            className="overflow-hidden rounded-lg"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="aspect-[4/3]">
              <ImageWithFallback
                src={studioImage}
                alt="Studio Overview"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
