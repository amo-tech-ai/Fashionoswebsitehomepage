import { motion } from "motion/react";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section className="py-24 lg:py-32 bg-[rgb(var(--color-beige))]">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2>Client Voices</h2>
          <p className="text-xl text-gray-600 mt-6">
            Hear from brands who trust us with their visual identity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-white rounded-sm p-8 lg:p-10 space-y-6"
            >
              <div className="text-4xl text-gray-300">"</div>
              <p className="text-lg text-gray-700 leading-relaxed italic">
                {testimonial.quote}
              </p>
              <div className="pt-4 border-t border-gray-200">
                <p className="text-gray-900">{testimonial.author}</p>
                <p className="text-sm text-gray-500 mt-1">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
