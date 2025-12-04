import { motion } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface BrandStatementProps {
  portraitImage: string;
}

export function BrandStatement({ portraitImage }: BrandStatementProps) {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h2>
                Brand-elevating, conversion-driven photography
              </h2>
              <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                <p>
                  We create brand-elevating, conversion-driven fashion photography that captures 
                  attention and drives results.
                </p>
                <p>
                  Every image is meticulously crafted to showcase your products in their best light, 
                  combining technical excellence with creative vision to deliver imagery that resonates 
                  with your audience and elevates your brand presence.
                </p>
                <p>
                  From concept to final delivery, our team ensures every detail aligns with your 
                  brand's aesthetic and marketing objectives.
                </p>
              </div>
            </div>

            <div className="flex gap-6 pt-4">
              <div className="space-y-2">
                <div className="text-4xl">500+</div>
                <p className="text-sm text-gray-600">Brands Served</p>
              </div>
              <div className="w-px bg-gray-200"></div>
              <div className="space-y-2">
                <div className="text-4xl">10K+</div>
                <p className="text-sm text-gray-600">Products Shot</p>
              </div>
              <div className="w-px bg-gray-200"></div>
              <div className="space-y-2">
                <div className="text-4xl">98%</div>
                <p className="text-sm text-gray-600">Client Satisfaction</p>
              </div>
            </div>
          </motion.div>

          {/* Right - Portrait Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="aspect-[3/4] overflow-hidden rounded-sm">
              <ImageWithFallback
                src={portraitImage}
                alt="Fashion portrait"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
