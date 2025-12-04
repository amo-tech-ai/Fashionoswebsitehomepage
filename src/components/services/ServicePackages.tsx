import { useState } from "react";
import { motion } from "motion/react";
import { Check, X, ChevronDown, ChevronUp } from "lucide-react";

interface PackageDetail {
  name: string;
  price: string;
  included: string[];
  notIncluded: string[];
  recommended?: boolean;
}

interface ServicePackagesProps {
  packages: PackageDetail[];
}

export function ServicePackages({ packages }: ServicePackagesProps) {
  const [expandedPackage, setExpandedPackage] = useState<number | null>(null);

  return (
    <section className="py-24 lg:py-32 bg-[rgb(var(--color-soft-gray))]">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2>Service Packages</h2>
          <p className="text-xl text-gray-600 mt-6 max-w-2xl mx-auto">
            Choose the perfect package for your brand's needs. All packages include professional editing and delivery.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -8, boxShadow: "0 20px 50px rgba(0,0,0,0.12)" }}
              className={`bg-white rounded-sm p-8 lg:p-10 space-y-8 transition-all duration-300 ${
                pkg.recommended ? 'border-2 border-black' : ''
              }`}
            >
              {pkg.recommended && (
                <div className="inline-block bg-black text-white px-4 py-1.5 text-xs uppercase tracking-wider rounded-full">
                  Most Popular
                </div>
              )}

              <div className="space-y-3">
                <h3>{pkg.name}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl">{pkg.price}</span>
                  <span className="text-gray-500 text-sm">per shoot</span>
                </div>
              </div>

              {/* What's Included */}
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-wider text-gray-500">What's Included</p>
                <ul className="space-y-3">
                  {pkg.included.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={2} />
                      <span className="text-gray-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What's Not Included - Collapsible */}
              {pkg.notIncluded.length > 0 && (
                <div className="space-y-3">
                  <button
                    onClick={() => setExpandedPackage(expandedPackage === index ? null : index)}
                    className="flex items-center justify-between w-full text-sm uppercase tracking-wider text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <span>What's Not Included</span>
                    {expandedPackage === index ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  
                  <motion.ul
                    initial={false}
                    animate={{
                      height: expandedPackage === index ? "auto" : 0,
                      opacity: expandedPackage === index ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3 overflow-hidden"
                  >
                    {pkg.notIncluded.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <X className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" strokeWidth={2} />
                        <span className="text-gray-500 text-sm">{item}</span>
                      </li>
                    ))}
                  </motion.ul>
                </div>
              )}

              <motion.button
                className={`w-full py-4 rounded-full transition-all duration-300 ${
                  pkg.recommended
                    ? 'bg-black text-white hover:bg-gray-800'
                    : 'bg-gray-100 text-black hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Book This Package
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
