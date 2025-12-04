import { motion } from "motion/react";

export function StudioOverview() {
  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-8">About the Studio</h2>
            
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p>
                FashionOS Studios was created to fill a gap in the market—providing high-end studio facilities at accessible rates. We believe that premium creative space shouldn't be reserved for only the largest productions.
              </p>
              
              <p>
                Our 2,500 sq ft studio features everything you need for professional photography and video production: industry-standard lighting equipment, multiple backdrop options, makeup and styling areas, and comfortable client spaces.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-8 my-8">
                <h3 className="mb-4 text-gray-900">Benefits</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-gray-900">•</span>
                    <span>All equipment included—no hidden fees or additional rental charges</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gray-900">•</span>
                    <span>Flexible booking options from hourly to multi-day sessions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gray-900">•</span>
                    <span>Professional on-site support to ensure smooth productions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gray-900">•</span>
                    <span>Easy load-in access with nearby parking and freight elevator</span>
                  </li>
                </ul>
              </div>
              
              <div className="border-l-4 border-black pl-6">
                <h3 className="mb-3 text-gray-900">Studio Policies</h3>
                <p className="text-sm">
                  Bookings are confirmed upon payment. Cancellations made 48+ hours in advance receive full refund. We maintain a respectful, professional environment and ask all visitors to treat the space and equipment with care. Smoking is not permitted inside the studio.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
