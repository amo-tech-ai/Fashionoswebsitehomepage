import { motion } from "motion/react";
import { ArrowRight, Mail, Phone, Calendar } from "lucide-react";

export function FinalCTA() {
  const contactMethods = [
    { icon: Mail, text: "Email us directly" },
    { icon: Phone, text: "Schedule a call" },
    { icon: Calendar, text: "Book a consultation" }
  ];

  return (
    <section className="py-24 lg:py-32 bg-[rgb(var(--color-beige))]">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center space-y-12"
        >
          <div className="space-y-6">
            <h2>
              Let's Create Something Extraordinary.
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Ready to elevate your brand with stunning fashion photography? 
              We're here to bring your vision to life with precision and creativity.
            </p>
          </div>

          <motion.button
            className="bg-black text-white px-14 py-6 rounded-full hover:bg-gray-800 transition-all duration-300 inline-flex items-center gap-3 group text-lg"
            whileHover={{ scale: 1.02, gap: "1rem" }}
            whileTap={{ scale: 0.98 }}
          >
            Start Your Brief
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
          </motion.button>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 pt-8">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors duration-200 cursor-pointer"
              >
                <method.icon className="w-5 h-5" strokeWidth={1.5} />
                <span className="text-sm">{method.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
