import { motion } from "motion/react";

export function PreviousVisitors() {
  const brands = [
    "VOGUE",
    "NIKE",
    "ADIDAS",
    "ZARA",
    "GUCCI",
    "PRADA"
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.p
          className="text-center text-gray-500 text-sm uppercase tracking-wider mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Some of Our Previous Visitors
        </motion.p>

        <div className="flex flex-wrap items-center justify-center gap-12 lg:gap-16">
          {brands.map((brand, index) => (
            <motion.div
              key={index}
              className="text-2xl lg:text-3xl tracking-wider text-gray-400 hover:text-gray-600 transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              {brand}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
