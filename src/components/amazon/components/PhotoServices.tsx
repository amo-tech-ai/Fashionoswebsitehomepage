import React from "react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../../figma/ImageWithFallback";
import { photoServices } from "../data";

export function PhotoServices() {
  return (
    <section className="py-24 bg-[#F8F6F4]">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">Photography Services</h2>
          <p className="text-lg text-gray-600">Comprehensive visual solutions for every part of your listing.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {photoServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -6 }}
              >
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <ImageWithFallback
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    {Icon && <Icon className="w-5 h-5 text-gray-900" />}
                    <h3 className="font-bold text-gray-900">{service.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{service.description}</p>
                  <span className="text-xs font-semibold text-gray-900 border-b border-gray-200 group-hover:border-gray-900 transition-colors inline-block pb-0.5">
                    Learn More
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
