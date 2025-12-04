import { motion } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface CaseStudyHeroProps {
  caseStudyImage: string;
}

export function CaseStudyHero({ caseStudyImage }: CaseStudyHeroProps) {
  return (
    <section className="py-20 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm uppercase tracking-wider text-gray-500 mb-2">Highlight Project</p>
          <h2>Featured Work</h2>
        </motion.div>

        <motion.div
          className="max-w-5xl mx-auto overflow-hidden rounded-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="aspect-[16/9] overflow-hidden">
            <ImageWithFallback
              src={caseStudyImage}
              alt="Case Study Highlight"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
