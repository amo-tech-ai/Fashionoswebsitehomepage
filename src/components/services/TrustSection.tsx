import { motion } from "motion/react";

export function TrustSection() {
  const brands = [
    "ZARA",
    "GUCCI",
    "VERSACE",
    "PRADA",
    "DIOR",
    "CHANEL",
    "BURBERRY",
    "VALENTINO"
  ];

  return (
    <section className="py-16 lg:py-24 bg-white border-y border-gray-200">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm uppercase tracking-wider text-gray-500">
            Trusted by Leading Fashion Brands
          </p>
        </motion.div>

        {/* Logo Bar */}
        <div className="overflow-x-auto">
          <div className="flex items-center justify-center gap-12 lg:gap-16 min-w-max lg:min-w-0">
            {brands.map((brand, index) => (
              <motion.div
                key={brand}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-2xl tracking-wide text-gray-400 hover:text-gray-600 transition-colors duration-300 cursor-pointer grayscale hover:grayscale-0"
              >
                {brand}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
