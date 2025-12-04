import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

export function CalloutBox() {
  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          className="max-w-3xl mx-auto bg-gradient-to-br from-gray-900 to-black text-white rounded-2xl p-12 lg:p-16 text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
          </div>

          <div className="relative z-10">
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Sparkles className="w-8 h-8" />
            </motion.div>

            <h2 className="text-white mb-4">Want to really stand out?</h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              Our specialized custom photography services go beyond the ordinary. Let's create something extraordinary together that perfectly captures your brand's unique story.
            </p>

            <motion.button
              className="bg-white text-black px-10 py-4 rounded-full hover:bg-gray-100 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start a Custom Brief
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
