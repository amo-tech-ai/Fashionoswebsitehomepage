import { motion } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface StudioHeroProps {
  heroImage: string;
  accentImages: string[];
}

export function StudioHero({ heroImage, accentImages }: StudioHeroProps) {
  return (
    <section className="container mx-auto px-6 lg:px-12 py-20 lg:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="mb-6">FashionOS Studios.</h1>
          <p className="text-xl text-gray-800 mb-4">Film & Photo Studio Hire</p>
          <p className="text-gray-600 mb-8 max-w-lg leading-relaxed">
            Premium studio space designed for fashion photography, video production, and creative projects. Professional equipment, natural light, and modern amenities.
          </p>
          <motion.button
            className="bg-black text-white px-10 py-4 rounded-full hover:bg-gray-800 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Book the Studio
          </motion.button>
        </motion.div>

        {/* Right Image Collage */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid grid-cols-2 gap-4">
            {/* Main Hero Image */}
            <div className="col-span-2">
              <div className="aspect-[4/3] overflow-hidden rounded-lg">
                <ImageWithFallback
                  src={heroImage}
                  alt="Studio Interior"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
            {/* Accent Images */}
            {accentImages.slice(0, 2).map((image, index) => (
              <motion.div
                key={index}
                className="aspect-square overflow-hidden rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                <ImageWithFallback
                  src={image}
                  alt={`Studio detail ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
