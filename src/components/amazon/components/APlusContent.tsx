import React from "react";
import { motion } from "motion/react";
import { LayoutTemplate } from "lucide-react";

export function APlusContent() {
  return (
    <section className="py-24 bg-gray-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-medium mb-6">
              <LayoutTemplate className="w-3 h-3" />
              <span>Brand Registry Enhanced</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif mb-8">
              A+ Content Designed to Maximize Conversion.
            </h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Custom modules, lifestyle blocks, infographics, comparison tables, and storytelling layouts — optimized for mobile and Amazon Brand Registry. We turn your product page into a landing page.
            </p>
            <button className="px-8 py-3 bg-white text-gray-900 rounded-xl hover:bg-gray-100 transition-all font-medium">
              View A+ Examples
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-4 translate-y-8">
              <div className="bg-white/5 p-2 rounded-lg backdrop-blur border border-white/10">
                <div className="h-32 bg-gray-800 rounded mb-2 w-full animate-pulse opacity-50"></div>
                <div className="h-4 bg-gray-800 rounded w-3/4 opacity-50"></div>
              </div>
              <div className="bg-white/5 p-2 rounded-lg backdrop-blur border border-white/10">
                <div className="h-48 bg-gray-800 rounded mb-2 w-full animate-pulse opacity-50"></div>
                <div className="h-4 bg-gray-800 rounded w-1/2 opacity-50"></div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white/5 p-2 rounded-lg backdrop-blur border border-white/10">
                <div className="h-40 bg-gray-800 rounded mb-2 w-full animate-pulse opacity-50"></div>
                <div className="h-4 bg-gray-800 rounded w-2/3 opacity-50"></div>
              </div>
              <div className="bg-white/5 p-2 rounded-lg backdrop-blur border border-white/10">
                <div className="h-32 bg-gray-800 rounded mb-2 w-full animate-pulse opacity-50"></div>
                <div className="h-4 bg-gray-800 rounded w-3/4 opacity-50"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
