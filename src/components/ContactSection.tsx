import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export function ContactSection() {
  return (
    <section className="py-24 lg:py-32 bg-[rgb(var(--color-soft-gray))]">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto bg-white rounded-sm p-12 lg:p-16 text-center space-y-10"
        >
          <div className="space-y-6">
            <h2>
              Need something a little more creative?
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Let's collaborate on a custom project tailored to your brand's unique vision and requirements.
            </p>
          </div>

          <motion.button
            className="bg-black text-white px-12 py-5 rounded-full hover:bg-gray-800 transition-all duration-300 inline-flex items-center gap-3 group"
            whileHover={{ scale: 1.02, gap: "1rem" }}
            whileTap={{ scale: 0.98 }}
          >
            Start a Custom Brief
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </motion.button>

          <div className="pt-6 flex flex-wrap justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
              <span>No commitment required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
              <span>Free consultation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
              <span>Quick response</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
