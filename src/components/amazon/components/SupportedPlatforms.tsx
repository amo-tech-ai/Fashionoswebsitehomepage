import React from "react";
import { platforms } from "../data";

export function SupportedPlatforms() {
  return (
    <section className="py-16 bg-stone-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
        <p className="text-gray-500 mb-8 uppercase tracking-widest text-xs">Content optimized for every major ecommerce platform</p>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center opacity-60 hover:opacity-100 transition-opacity duration-500">
          {platforms.map((platform, index) => (
            <span key={index} className="text-2xl md:text-3xl font-serif text-gray-900">{platform}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
