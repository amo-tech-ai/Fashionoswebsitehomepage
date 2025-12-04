import { motion } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Check } from "lucide-react";

interface BookingIncludesProps {
  makeupStationImage: string;
}

export function BookingIncludes({ makeupStationImage }: BookingIncludesProps) {
  const inclusions = [
    "Professional Lighting Kit (Profoto)",
    "Tethering Station with Monitor",
    "Garment Steamer & Iron",
    "200+ Clothing Hangers",
    "Professional Makeup Area",
    "Fast WiFi & Bluetooth Audio",
    "On-Site Studio Assistant",
    "Complimentary Coffee & Tea"
  ];

  return (
    <section className="py-20 lg:py-32 bg-gray-900 text-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Inclusions List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-8 text-white">Studio Booking Includes</h2>
            <div className="space-y-4">
              {inclusions.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-gray-200">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Makeup Station Image */}
          <motion.div
            className="overflow-hidden rounded-lg"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="aspect-[4/3]">
              <ImageWithFallback
                src={makeupStationImage}
                alt="Makeup Station"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
