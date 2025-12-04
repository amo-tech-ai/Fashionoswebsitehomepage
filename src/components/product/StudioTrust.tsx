import { motion } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { CheckCircle } from "lucide-react";

interface StudioTrustProps {
  studioImage: string;
}

export function StudioTrust({ studioImage }: StudioTrustProps) {
  const benefits = [
    "Professional studio lighting",
    "Consistent quality across all shots",
    "Fast turnaround times",
    "Experienced photography team"
  ];

  return (
    <section className="py-20 lg:py-32 bg-[#f8f6f3]">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-6">A studio you can trust.</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              With decades of experience in product photography, we understand what it takes to create images that sell. Our proven process ensures reliability, consistency, and exceptional results every time.
            </p>
            <div className="space-y-3 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <CheckCircle className="w-5 h-5 text-black flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="aspect-[4/5] overflow-hidden rounded-lg bg-black">
              <ImageWithFallback
                src={studioImage}
                alt="Studio Product Photography"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
