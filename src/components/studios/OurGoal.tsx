import { motion } from "motion/react";

export function OurGoal() {
  return (
    <section className="py-20 lg:py-32 bg-[#f8f6f3]">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-6">Our goal is to empower creatives.</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            With over 15 years in the industry, we understand what photographers, videographers, and creative professionals need. Our studio was designed from the ground up to provide an inspiring, functional space where vision becomes reality—without the premium price tag.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
