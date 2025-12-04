import { motion } from "motion/react";
import { Check } from "lucide-react";

export function FacilitiesOverview() {
  const facilitiesLeft = [
    "Professional Lighting Equipment",
    "Seamless Backdrops (White, Black, Gray)",
    "Makeup & Hair Stations",
    "Changing Rooms",
    "Clothing Racks & Steamers",
    "WiFi & Bluetooth Audio"
  ];

  const facilitiesRight = [
    "Climate Control (AC/Heating)",
    "Kitchenette & Lounge Area",
    "Client Viewing Area",
    "Tethering Stations",
    "Props & Set Design Items",
    "Free Parking Available"
  ];

  return (
    <section className="py-20 lg:py-32 bg-[#f8f6f3]">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.h2
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Facilities Overview
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 max-w-5xl mx-auto">
          {/* Left Column */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {facilitiesLeft.map((facility, index) => (
              <div key={index} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{facility}</span>
              </div>
            ))}
          </motion.div>

          {/* Right Column */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {facilitiesRight.map((facility, index) => (
              <div key={index} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{facility}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
