import { motion } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { TrendingUp, RefreshCw, Video } from "lucide-react";

interface BenefitsFeaturesProps {
  phoneImage: string;
}

export function BenefitsFeatures({ phoneImage }: BenefitsFeaturesProps) {
  const benefits = [
    {
      icon: RefreshCw,
      title: "Consistency",
      description: "Uniform lighting, angles, and styling across all product shots ensure brand cohesion and professional appearance."
    },
    {
      icon: TrendingUp,
      title: "Improve Sales",
      description: "High-quality product images increase customer confidence and drive conversion rates by up to 30%."
    },
    {
      icon: Video,
      title: "Enhance Media Content",
      description: "Professional imagery elevates your entire marketing presence across social media, website, and advertising."
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          {/* Benefit 1 */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
              <RefreshCw className="w-7 h-7 text-black" />
            </div>
            <h3>{benefits[0].title}</h3>
            <p className="text-gray-600 leading-relaxed">
              {benefits[0].description}
            </p>
          </motion.div>

          {/* Center Phone Mockup */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative max-w-[280px] w-full">
              <div className="aspect-[9/19] bg-black rounded-[3rem] p-3 shadow-2xl">
                <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                  <ImageWithFallback
                    src={phoneImage}
                    alt="Mobile Product Display"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Benefits 2 & 3 */}
          <div className="space-y-12">
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-7 h-7 text-black" />
              </div>
              <h3>{benefits[1].title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {benefits[1].description}
              </p>
            </motion.div>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
                <Video className="w-7 h-7 text-black" />
              </div>
              <h3>{benefits[2].title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {benefits[2].description}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
