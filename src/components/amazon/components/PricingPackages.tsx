import React from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { pricingPackages } from "../data";

export function PricingPackages() {
  return (
    <section className="py-24 bg-[#F8F6F4]">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">Simple Packages</h2>
          <p className="text-lg text-gray-600">Transparent pricing for every stage of growth.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPackages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`relative bg-white rounded-2xl p-8 shadow-sm flex flex-col ${pkg.highlight ? 'border-2 border-gray-900 shadow-xl scale-105 z-10' : 'border border-gray-200'}`}
            >
              {pkg.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                <p className="text-gray-600 text-sm">{pkg.description}</p>
              </div>
              <div className="flex-1 mb-8">
                <ul className="space-y-4">
                  {pkg.includes.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-gray-700">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${pkg.highlight ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'}`}>
                        <Check className="w-3 h-3" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <button className={`w-full py-4 rounded-xl font-medium transition-all ${pkg.highlight ? 'bg-gray-900 text-white hover:bg-gray-800' : 'bg-gray-50 text-gray-900 hover:bg-gray-100'}`}>
                Book This Package
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
