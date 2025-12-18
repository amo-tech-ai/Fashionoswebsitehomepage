import React from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { ImageWithFallback } from "../../figma/ImageWithFallback";

export function AmazonHero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-white">
      <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-3 gap-1 opacity-20 pointer-events-none">
        <ImageWithFallback src="https://images.unsplash.com/photo-1626897885636-dd68020cc52a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwcGhvdG9ncmFwaHklMjB3aGl0ZSUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzY0ODMyMjQ4fDA&ixlib=rb-4.1.0&q=80&w=1080" className="h-full w-full object-cover" alt="" />
        <ImageWithFallback src="https://images.unsplash.com/photo-1624521793559-136bfe16fc86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWZlc3R5bGUlMjBwcm9kdWN0JTIwcGhvdG9ncmFwaHklMjBhbWF6b258ZW58MXx8fHwxNzY0ODg3NDk5fDA&ixlib=rb-4.1.0&q=80&w=1080" className="h-full w-full object-cover hidden lg:block" alt="" />
        <ImageWithFallback src="https://images.unsplash.com/photo-1567570671138-76c7e06caa3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBwYWNrYWdpbmclMjB1bmJveGluZ3xlbnwxfHx8fDE3NjQ4ODc0OTl8MA&ixlib=rb-4.1.0&q=80&w=1080" className="h-full w-full object-cover hidden lg:block" alt="" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#F8F6F4] via-white/80 to-white/60" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-serif text-gray-900 mb-6 tracking-tight">
            Amazon-Ready Images<br />& Videos That Convert.
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Professional photography, editing, and videos engineered to meet Amazon’s strict requirements and boost your listing performance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all shadow-lg inline-flex items-center justify-center gap-2 text-lg font-medium">
              Get a Quote
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-10 py-4 bg-white text-gray-900 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all inline-flex items-center justify-center gap-2 text-lg font-medium shadow-sm">
              See Sample Work
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
