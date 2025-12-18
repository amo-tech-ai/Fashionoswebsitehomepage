import React from "react";
import { motion } from "motion/react";
import { Video } from "lucide-react";
import { ImageWithFallback } from "../../figma/ImageWithFallback";
import { videoServices } from "../data";

export function VideoServices() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">Video Production</h2>
          <p className="text-lg text-gray-600">Engage shoppers and reduce returns with high-clarity video.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videoServices.map((video, index) => (
            <motion.div
              key={index}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="aspect-video rounded-xl overflow-hidden bg-gray-900 relative shadow-md group-hover:shadow-lg transition-all mb-4">
                <ImageWithFallback
                  src={video.image}
                  alt={video.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-300"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/40 group-hover:scale-110 transition-transform duration-300">
                    <Video className="w-6 h-6 text-white fill-current" />
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-serif text-gray-900 mb-2">{video.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{video.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
