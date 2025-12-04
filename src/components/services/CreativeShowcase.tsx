import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface CreativeShowcaseProps {
  videoImage: string;
  productImage: string;
}

export function CreativeShowcase({ videoImage, productImage }: CreativeShowcaseProps) {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-6 lg:px-12 space-y-24">
        {/* Ecommerce Fashion Video */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h2>Ecommerce Fashion Video</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Bring your products to life with high-quality fashion video content. 
                From product reveals to styled lookbooks, our video production services 
                help your brand stand out in today's visual-first marketplace.
              </p>
            </div>

            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-black rounded-full mt-2.5"></div>
                <span className="text-gray-700">Dynamic product showcases and 360° views</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-black rounded-full mt-2.5"></div>
                <span className="text-gray-700">Social media-optimized vertical and square formats</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-black rounded-full mt-2.5"></div>
                <span className="text-gray-700">Professional color grading and post-production</span>
              </li>
            </ul>

            <motion.button
              className="inline-flex items-center gap-3 bg-black text-white px-10 py-4 rounded-full hover:bg-gray-800 transition-all duration-300 group"
              whileHover={{ scale: 1.02, gap: "1rem" }}
              whileTap={{ scale: 0.98 }}
            >
              View Examples
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="aspect-[3/4] overflow-hidden rounded-sm"
          >
            <ImageWithFallback
              src={videoImage}
              alt="Fashion video production"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Apparel Product Photography */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="aspect-[3/4] overflow-hidden rounded-sm order-2 lg:order-1"
          >
            <ImageWithFallback
              src={productImage}
              alt="Apparel product photography"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8 order-1 lg:order-2"
          >
            <div className="space-y-6">
              <h2>Apparel Product Photography</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Crisp, clean product photography that highlights every detail. 
                Our apparel shoots combine technical precision with creative styling 
                to showcase your garments in the most appealing way.
              </p>
            </div>

            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-black rounded-full mt-2.5"></div>
                <span className="text-gray-700">Ghost mannequin and flat-lay techniques</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-black rounded-full mt-2.5"></div>
                <span className="text-gray-700">Detailed texture and fabric photography</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-black rounded-full mt-2.5"></div>
                <span className="text-gray-700">Consistent white background or lifestyle settings</span>
              </li>
            </ul>

            <motion.button
              className="inline-flex items-center gap-3 bg-black text-white px-10 py-4 rounded-full hover:bg-gray-800 transition-all duration-300 group"
              whileHover={{ scale: 1.02, gap: "1rem" }}
              whileTap={{ scale: 0.98 }}
            >
              See Our Work
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
