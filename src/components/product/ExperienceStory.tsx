import { motion } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Camera, Sparkles, Zap } from "lucide-react";

interface ExperienceStoryProps {
  experienceImage: string;
}

export function ExperienceStory({ experienceImage }: ExperienceStoryProps) {
  const features = [
    {
      icon: Camera,
      title: "Technical Precision",
      description: "State-of-the-art equipment and lighting"
    },
    {
      icon: Sparkles,
      title: "Photography Direction",
      description: "Expert creative direction for every shot"
    },
    {
      icon: Zap,
      title: "Premium Finishing",
      description: "Professional retouching and optimization"
    }
  ];

  return (
    <section className="bg-gray-50 py-20 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-6">20+ years in the industry.</h2>
            <p className="text-gray-600 mb-10 leading-relaxed">
              Our expertise spans over two decades of product photography excellence. We've partnered with leading brands across fashion, beauty, technology, and lifestyle sectors to create imagery that converts.
            </p>

            {/* Features */}
            <div className="space-y-6 mb-10">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    className="flex gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="mb-1">{feature.title}</h3>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.button
              className="border-2 border-black text-black px-10 py-4 rounded-full hover:bg-black hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Learn More
            </motion.button>
          </motion.div>

          {/* Right Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="aspect-[3/4] overflow-hidden rounded-lg">
              <ImageWithFallback
                src={experienceImage}
                alt="Product Detail"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
