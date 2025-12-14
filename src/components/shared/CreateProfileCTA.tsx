import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";

export function CreateProfileCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"]
  });
  
  // Parallax effect: Image moves vertically 8-12px (Desktop Only)
  // We calculate the transform always, but conditionally apply it
  const yParallax = useTransform(scrollYProgress, [0, 1], [-12, 12]);
  const y = isDesktop ? yParallax : 0;

  const handleNavigation = (href: string) => {
    window.history.pushState({}, "", href);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  const benefits = [
    "Get discovered through events, sponsors, and collaborations",
    "Understand your brand with AI-powered audits",
    "Manage everything from one professional dashboard"
  ];

  return (
    <section ref={containerRef} className="py-24 lg:py-32 bg-[#F9F9F7] overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                
                {/* LEFT COLUMN - Editorial Content */}
                <div className="space-y-10 order-2 lg:order-1">
                    <div className="space-y-6">
                        <motion.h2 
                            initial={{ opacity: 0, y: 6 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="text-4xl lg:text-6xl font-serif text-gray-900 leading-[1.1] tracking-tight"
                        >
                            Create Your <br/>FashionOS Profile
                        </motion.h2>

                        {/* Subheadline Group */}
                        <motion.div 
                            initial={{ opacity: 0, y: 6 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                            className="space-y-4"
                        >
                             <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-gray-200 shadow-sm w-fit">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                <span className="text-[10px] font-bold tracking-widest uppercase text-gray-500">Free to Join</span>
                            </div>
                            
                            <h3 className="text-2xl font-serif text-gray-900">Get Started in Minutes</h3>
                            <p className="text-lg text-gray-600 font-light leading-relaxed max-w-md">
                                Create a professional fashion profile in under 5 minutes. A modern platform where fashion meets AI.
                            </p>
                        </motion.div>
                    </div>

                    <motion.div 
                        initial={{ opacity: 0, y: 6 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                        className="space-y-5"
                    >
                        {benefits.map((benefit, i) => (
                            <div key={i} className="flex items-start gap-4 group">
                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 group-hover:bg-black transition-colors duration-300 flex-shrink-0" />
                                <span className="text-gray-700 leading-relaxed font-normal">{benefit}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* RIGHT COLUMN - Image + CTA Stack */}
                <div className="flex flex-col gap-8 order-1 lg:order-2">
                    
                    {/* IMAGE BLOCK - Parallax Wrapper */}
                    <div ref={imageRef} className="relative rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-[16/10] shadow-sm">
                        <motion.div 
                            style={{ y }} 
                            className="absolute inset-0 w-full h-[120%] -top-[10%]"
                        >
                            <img 
                                src="https://images.unsplash.com/photo-1734169466862-bbbe5c93de72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWdoJTIwZmFzaGlvbiUyMG1vZGVsJTIwZmFjZSUyMHBvcnRyYWl0JTIwbHV4dXJ5JTIwZnV0dXJpc3RpYyUyMGxpZ2h0aW5nJTIwZGlnaXRhbCUyMGFydCUyMGFlc3RoZXRpY3xlbnwxfHx8fDE3NjU3MDE2Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                                alt="High fashion model portrait with futuristic lighting"
                                className="w-full h-full object-cover"
                            />
                            {/* Artistic Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 mix-blend-overlay" />
                        </motion.div>
                    </div>

                    {/* CTA BLOCK - Entry Animation */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                        className="bg-white rounded-2xl p-8 lg:p-10 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] text-center border border-gray-100"
                    >
                        <div className="space-y-4 max-w-sm mx-auto pt-2">
                            {/* Primary Button - Micro-interaction */}
                            <motion.button 
                                onClick={() => handleNavigation("/designer-wizard")}
                                className="w-full bg-[#1A1A1A] text-white h-14 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-black transition-all duration-300 group relative overflow-hidden"
                                whileTap={{ scale: 0.98 }}
                                whileHover={{ 
                                    boxShadow: "0 10px 30px -10px rgba(0,0,0,0.3)" 
                                }}
                            >
                                <span>Create Profile</span>
                                <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-1" />
                            </motion.button>
                            
                            {/* Secondary Link */}
                            <button 
                                onClick={() => handleNavigation("/directory")}
                                className="text-sm text-gray-500 hover:text-gray-900 transition-colors relative group"
                            >
                                <span>View Example Profile</span>
                                <span className="absolute -bottom-0.5 left-0 w-full h-px bg-gray-900 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                            </button>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-50">
                            <p className="text-xs text-gray-400 font-medium">Trusted by fashion designers, brands & organizers</p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    </section>
  );
}
