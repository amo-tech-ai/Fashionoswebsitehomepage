import { motion } from "motion/react";
import { Zap } from "lucide-react";

export function PricingStrip() {
  const pricingOptions = [
    {
      label: "Crazy Prices!",
      price: "$90",
      period: "/hr",
      detail: "Hourly booking available",
      featured: true
    },
    {
      label: "Full Day",
      price: "$300",
      period: "/day",
      detail: "8 hours studio access",
      featured: false
    },
    {
      label: "Half Day",
      price: "$175",
      period: "/half day",
      detail: "4 hours studio access",
      featured: false
    }
  ];

  return (
    <section className="bg-gray-50 py-16 lg:py-24">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pricingOptions.map((option, index) => (
            <motion.div
              key={index}
              className={`rounded-xl p-8 text-center ${
                option.featured
                  ? 'bg-black text-white'
                  : 'bg-white border border-gray-200'
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              {option.featured && (
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Zap className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm uppercase tracking-wider">Special Offer</span>
                </div>
              )}
              <h3 className={`mb-4 ${option.featured ? 'text-white' : 'text-gray-900'}`}>
                {option.label}
              </h3>
              <div className="mb-2">
                <span className="text-4xl lg:text-5xl">{option.price}</span>
                <span className={`text-lg ${option.featured ? 'text-gray-300' : 'text-gray-500'}`}>
                  {option.period}
                </span>
              </div>
              <p className={`mb-6 text-sm ${option.featured ? 'text-gray-300' : 'text-gray-600'}`}>
                {option.detail}
              </p>
              <motion.button
                className={`w-full py-3 px-6 rounded-full transition-all duration-300 ${
                  option.featured
                    ? 'bg-white text-black hover:bg-gray-100'
                    : 'border-2 border-black text-black hover:bg-black hover:text-white'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Book Now
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
