import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { useRef, useState } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import { 
  Check, 
  Plus, 
  Minus,
} from "lucide-react";
import videoServiceImage from "figma:asset/06c0ee38a6ff7cb128d4964a9745e41cf3749691.png";

// --- ANIMATION VARIANTS ---
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// --- SUB-COMPONENTS ---

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-6 text-left hover:text-gray-600 transition-colors"
      >
        <span className="text-lg font-medium">{question}</span>
        {isOpen ? <Minus size={20} /> : <Plus size={20} />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-500 leading-relaxed font-light">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PackageCard({ 
  title, 
  price, 
  desc, 
  image 
}: { 
  title: string, 
  price: string, 
  desc: string, 
  image: string 
}) {
  return (
    <motion.div 
      variants={fadeIn}
      className="group cursor-pointer"
    >
      <div className="aspect-[3/4] overflow-hidden mb-6 bg-gray-100 relative">
        <ImageWithFallback 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-serif">{title}</h3>
        <p className="text-sm text-gray-500 font-light">{desc}</p>
        <div className="flex items-end justify-between pt-2">
          <span className="text-2xl font-medium">{price}</span>
          <span className="text-xs uppercase tracking-widest border-b border-black pb-1 group-hover:border-gray-500 group-hover:text-gray-500 transition-all">
            View Details
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function UseCaseRow({ 
  title, 
  desc, 
  image, 
  reversed = false 
}: { 
  title: string, 
  desc: string, 
  image: string, 
  reversed?: boolean 
}) {
  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
      className={`flex flex-col ${reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-24 py-16`}
    >
      <motion.div variants={fadeIn} className="w-full lg:w-1/2 aspect-[4/3] bg-gray-100 overflow-hidden">
        <ImageWithFallback src={image} className="w-full h-full object-cover" alt={title} />
      </motion.div>
      <motion.div variants={fadeIn} className="w-full lg:w-1/2 space-y-6">
        <h3 className="text-3xl font-serif">{title}</h3>
        <p className="text-gray-500 font-light text-lg leading-relaxed max-w-md">{desc}</p>
        <div className="w-12 h-[1px] bg-black"></div>
      </motion.div>
    </motion.div>
  );
}

function GridImage({ src, alt }: { src: string, alt: string }) {
  return (
    <div className="relative aspect-square overflow-hidden bg-gray-100">
      <ImageWithFallback 
        src={src} 
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
      />
    </div>
  );
}

export default function EcommercePhotography() {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 50]);

  // Horizontal Scroll Setup
  const horizontalRef = useRef(null);
  const { scrollYProgress: scrollXProgress } = useScroll({
    target: horizontalRef,
    offset: ["start start", "end end"] // Start scrolling when top hits top, end when bottom hits bottom
  });
  
  // Map vertical scroll to horizontal movement
  // We want to move from 0 to negative width of content minus screen width
  const x = useTransform(scrollXProgress, [0, 1], ["0%", "-65%"]);

  const handleNavigation = (href: string) => {
    window.history.pushState({}, "", href);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  const galleryImages = [
    "https://images.unsplash.com/photo-1641380140345-a8b91e58d4e0?q=80&w=1080", // White Studio Full Body
    "https://images.unsplash.com/photo-1592347093417-0e95eb5851aa?q=80&w=1080", // Beige Minimalist
    "https://images.unsplash.com/photo-1732551146857-6e12616efb27?q=80&w=1080", // Clean Denim
    "https://images.unsplash.com/photo-1746730921682-06b7a8f9a30c?q=80&w=1080", // High End Dress
    "https://images.unsplash.com/photo-1752074211295-332a3cde530d?q=80&w=1080", // Grey Studio Minimal
    "https://images.unsplash.com/photo-1712425718085-cdd2b2298669?q=80&w=1080", // Male Studio White
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-gray-900 selection:text-white">
      <Header />

      {/* 1. HERO SECTION */}
      <section ref={containerRef} className="relative pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Text Content - Spans 5 cols */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="lg:col-span-5 space-y-8 relative z-10"
            >
              <motion.h1 variants={fadeIn} className="text-6xl lg:text-7xl font-serif leading-[1.1] tracking-tight">
                Ecommerce <br/>
                Fashion <br/>
                Photography <br/>
                <span className="italic text-gray-400">& Video</span>
              </motion.h1>

              <motion.p variants={fadeIn} className="text-xl font-light text-gray-600 max-w-md leading-relaxed">
                High-impact visuals built to convert online shoppers. Editorial quality, optimized for the digital shelf.
              </motion.p>

              <motion.div variants={fadeIn} className="flex gap-6 pt-4">
                <button 
                  onClick={() => handleNavigation("/packages")}
                  className="bg-black text-white px-8 py-4 uppercase tracking-widest text-xs hover:bg-gray-800 transition-all hover:px-10"
                >
                  View Packages
                </button>
                <button className="text-gray-500 border-b border-gray-300 pb-1 hover:text-black hover:border-black transition-all uppercase tracking-widest text-xs">
                  How It Works
                </button>
              </motion.div>
            </motion.div>

            {/* Asymmetrical Image Grid - Spans 7 cols */}
            <div className="lg:col-span-7 relative h-[600px] hidden lg:block">
              <motion.div 
                style={{ y: yParallax }}
                className="absolute right-0 top-0 w-[60%] h-[90%] bg-gray-100 z-0"
              >
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1631467375913-2cc3d64c5ad2?q=80&w=1080&auto=format&fit=crop"
                  alt="Studio Model"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className="absolute left-10 bottom-10 w-[45%] h-[60%] bg-white p-4 shadow-2xl z-10">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1654806389957-f8ca19bb7b1a?q=80&w=1080&auto=format&fit=crop"
                  alt="Detail Shot"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. EDITORIAL STATEMENT + IMAGE GRID */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            
            {/* Left Column: Text */}
            <div className="space-y-8 order-1 lg:order-1">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl lg:text-5xl font-serif tracking-tight leading-tight"
              >
                Shooting Commercial <br/> Fashion
              </motion.h2>

              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="space-y-6 text-gray-600 font-light text-lg leading-relaxed max-w-md"
              >
                <p>
                  With a proven track record in ecommerce fashion photography and video, we create high-quality visual content built for modern brands and digital storefronts.
                </p>
                <p>
                  Our in-house production facilities support end-to-end shoots — from model direction to post-production — ensuring consistency, accuracy, and speed.
                </p>
                <p>
                  We focus on creating fashion imagery that performs across ecommerce, campaigns, and social channels, while maintaining a “right-first-time” production culture.
                </p>
              </motion.div>

              <motion.button 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="bg-black text-white px-10 py-4 text-xs uppercase tracking-[0.2em] font-medium hover:bg-gray-800 transition-colors"
                onClick={() => handleNavigation('/wizard')}
              >
                Request a Quote
              </motion.button>
            </div>

            {/* Right Column: 3x3 Grid */}
            <div className="order-2 lg:order-2">
              <div className="grid grid-cols-3 gap-0 bg-white">
                <GridImage src="https://images.unsplash.com/photo-1685571310105-73020ae623cd?q=80&w=400" alt="Red Portrait" />
                <GridImage src="https://images.unsplash.com/photo-1617726341407-e61fff6868fc?q=80&w=400" alt="Blue Studio" />
                <GridImage src="https://images.unsplash.com/photo-1666717292307-aebb0d85df63?q=80&w=400" alt="Male Trench" />
                
                <GridImage src="https://images.unsplash.com/photo-1758726064228-c669ce0966a9?q=80&w=400" alt="Handbag" />
                <GridImage src="https://images.unsplash.com/photo-1761882114165-e1616d042341?q=80&w=400" alt="BW Portrait" />
                <GridImage src="https://images.unsplash.com/photo-1711188054453-77f645f71401?q=80&w=400" alt="Yellow Pose" />
                
                <GridImage src="https://images.unsplash.com/photo-1619473716214-31a1c42daedc?q=80&w=400" alt="Silver Jacket" />
                <GridImage src="https://images.unsplash.com/photo-1632161679976-2dab4a57642f?q=80&w=400" alt="Beauty Makeup" />
                <GridImage src="https://images.unsplash.com/photo-1758613654834-f2d50f729929?q=80&w=400" alt="White Dynamic" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. HORIZONTAL SCROLLING GALLERY */}
      <section ref={horizontalRef} className="relative h-[300vh] bg-white">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <motion.div 
            style={{ x }}
            className="flex gap-4 md:gap-8 px-8"
          >
            {galleryImages.map((src, i) => (
              <div key={i} className="w-[70vw] md:w-[40vw] lg:w-[30vw] h-[60vh] md:h-[70vh] flex-shrink-0 relative overflow-hidden">
                <ImageWithFallback 
                  src={src} 
                  alt={`Gallery Image ${i + 1}`}
                  className="w-full h-full object-cover grayscale-0 hover:grayscale transition-all duration-700"
                />
              </div>
            ))}
            {/* Add a final buffer block to ensure the last image clears the center if needed */}
            <div className="w-[10vw] h-[60vh] md:h-[70vh] flex-shrink-0" />
          </motion.div>
        </div>
      </section>

      {/* 4. VIDEO EDITORIAL SECTION */}
      <section className="bg-[#F9F9F9] py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
            
            {/* Left Column: Text */}
            <div className="space-y-10 pt-0 lg:pt-4">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight text-black">
                  E-commerce Fashion <br/>
                  Video
                </h2>
                <div className="space-y-6 text-gray-600 leading-relaxed font-normal text-base md:text-[1.05rem]">
                  <p>
                    Our e-commerce fashion video service is designed to help your clothing stand out online—whether it's clean, crisp model walk-throughs, detailed close-ups that highlight fit and fabric or something a little more creative, we have it covered.
                  </p>
                  <p>
                    We make it easy for you to create consistent, high-quality video content that works seamlessly alongside your product photography. Perfect for your website or social media. 
                  </p>
                  <p>
                    All shot and handled by our in-house team.
                  </p>
                </div>
              </div>

              <div className="space-y-8 pt-4">
                <h3 className="text-xl font-bold text-black">What we offer:</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-black text-lg">Catwalk-style videos</h4>
                    <p className="text-black text-base mt-1">Full-length model walk-throughs</p>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-black text-lg">Close-up detail shots</h4>
                    <p className="text-black text-base mt-1">Show texture, fit, and features clearly</p>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-black text-lg">Short-form video content</h4>
                    <p className="text-black text-base mt-1">Ideal for social media and advertising</p>
                  </div>
                </div>

                <div className="pt-6 space-y-6">
                  <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
                    If you'd like to discuss adding video to your next shoot, just get in touch.
                  </p>
                  
                  <button 
                    onClick={() => handleNavigation('/contact')}
                    className="bg-black text-white px-8 py-3 text-[11px] font-bold uppercase tracking-[0.2em] rounded-[2px] hover:bg-gray-800 transition-colors"
                  >
                    Let's Chat
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Image */}
            <div className="relative">
              <div className="w-full">
                <ImageWithFallback 
                  src={videoServiceImage}
                  alt="Fashion Video Model" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. COMPREHENSIVE SERVICES GRID */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card 1: Featured Black */}
            <div className="bg-black text-white p-10 rounded-[2rem] flex flex-col justify-between min-h-[500px] hover:-translate-y-1 transition-transform duration-500">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold leading-tight tracking-tight">
                  E-commerce <br/>
                  On-Model <br/>
                  Fashion <br/>
                  Packages
                </h3>
                <p className="text-gray-300 leading-relaxed text-sm">
                  Whether you need a few hours or a full day of shooting, we have a package that fits your needs. Our comprehensive services include both still images and video content, providing your brand with cohesive, on-brand visuals.
                </p>
              </div>
              
              <div className="pt-12">
                <button className="border border-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
                  Let's Chat
                </button>
              </div>
            </div>

            {/* Card 2: Photography & Video */}
            <div className="bg-[#F5F5F0] text-black p-10 rounded-[2rem] flex flex-col min-h-[500px] hover:-translate-y-1 transition-transform duration-500">
              <h3 className="text-3xl font-bold leading-tight tracking-tight mb-8">
                Photography <br/>
                & Video
              </h3>
              
              <div className="space-y-6 text-sm">
                <div>
                  <h4 className="font-bold text-lg mb-2">Half-Day Session</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Up to 4 hours of shooting <br/>
                    Minimum of 40 selected still images and/or video files.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-bold text-lg mb-2">Full-Day Session</h4>
                  <p className="text-gray-600 leading-relaxed">
                    From 9:00 AM to 5:00 PM <br/>
                    Minimum of 70 selected still images and/or video files.
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-gray-500 text-xs leading-relaxed">
                    Photography and retouching are bundled as a package. If post-production isn't needed, there will be an additional charge for digital file export and handling. Minimums apply.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3: Post-Production */}
            <div className="bg-[#F5F5F0] text-black p-10 rounded-[2rem] flex flex-col min-h-[500px] hover:-translate-y-1 transition-transform duration-500">
              <h3 className="text-3xl font-bold leading-tight tracking-tight mb-8">
                E-commerce <br/>
                Post- <br/>
                Production <br/>
                Services
              </h3>
              
              <div className="space-y-6 text-sm">
                <p className="text-gray-600 leading-relaxed">
                  Our post-production services ensure your visuals are polished and ready for your e-commerce platform. Choose from basic editing or advanced retouching to give your photos and videos the professional touch they deserve.
                </p>
                
                <div>
                  <h4 className="font-bold text-lg mb-2">Basic Editing</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Stills per image <br/>
                    Simple Video Edits per video file
                  </p>
                </div>
                
                <div>
                  <h4 className="font-bold text-lg mb-2">Advanced Retouching</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Detailed retouching for a refined, professional finish.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 4: What's Included */}
            <div className="bg-[#F5F5F0] text-black p-10 rounded-[2rem] flex flex-col min-h-[500px] hover:-translate-y-1 transition-transform duration-500">
              <h3 className="text-3xl font-bold leading-tight tracking-tight mb-8">
                What's <br/>
                Included
              </h3>
              
              <div className="space-y-6 text-sm text-gray-600 leading-relaxed">
                <p>
                  When you book our services, you receive a comprehensive package that covers the essentials to get the job done. We streamline the process to ensure efficiency, quality, and consistency across all your content.
                </p>
                
                <ul className="space-y-4 list-disc pl-4 marker:text-black">
                  <li>
                    <strong className="text-black">Photographer and/or Videographer</strong><br/>
                    We will find the most cost-effective way to shoot your video, whether as a standalone service or alongside your stills.
                  </li>
                  <li>
                    <strong className="text-black">Studio Rental & Lighting</strong><br/>
                    We provide a fully equipped, professional studio complete with all necessary lighting to ensure your products shine.
                  </li>
                </ul>
              </div>
            </div>

            {/* Card 5: What's Not Included */}
            <div className="bg-[#F5F5F0] text-black p-10 rounded-[2rem] flex flex-col min-h-[500px] hover:-translate-y-1 transition-transform duration-500">
              <h3 className="text-3xl font-bold leading-tight tracking-tight mb-8">
                What's Not <br/>
                Included
              </h3>
              
              <div className="space-y-6 text-sm text-gray-600 leading-relaxed">
                <p>
                  Some elements may require additional costs depending on your needs. While we provide a streamlined process, you may need to consider the following extras:
                </p>
                
                <ul className="space-y-2 list-disc pl-4 marker:text-black">
                  <li>Props</li>
                  <li>Coloured backgrounds</li>
                  <li>Set build</li>
                  <li>Complex styling and art direction</li>
                  <li>Model fees (including licensing, if applicable)</li>
                  <li>Hair and make-up artist</li>
                  <li>Clothing stylist</li>
                </ul>
              </div>
            </div>

            {/* Card 6: How It Works */}
            <div className="bg-[#F5F5F0] text-black p-10 rounded-[2rem] flex flex-col min-h-[500px] hover:-translate-y-1 transition-transform duration-500">
              <h3 className="text-3xl font-bold leading-tight tracking-tight mb-8">
                How It Works
              </h3>
              
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                <div>
                  <strong className="text-black block mb-1">Step 1:</strong>
                  Contact Us for an Initial Consultation
                </div>
                <div>
                  <strong className="text-black block mb-1">Step 2:</strong>
                  Plan Your Shoot – Choose your package, additional services, and set your date.
                </div>
                <div>
                  <strong className="text-black block mb-1">Step 3:</strong>
                  Shoot Day – Our team captures your vision.
                </div>
                <div>
                  <strong className="text-black block mb-1">Step 4:</strong>
                  Post-Production – We'll polish your images and videos to perfection.
                </div>
                <div>
                  <strong className="text-black block mb-1">Step 5:</strong>
                  Delivery – Receive your high-quality visuals, ready to boost your brand.
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. QUOTE SECTION */}
      <section className="py-32 bg-gray-900 text-white overflow-hidden relative">
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
           <div className="flex flex-col md:flex-row gap-12 items-center">
             <div className="w-full md:w-1/3 aspect-[3/4] bg-gray-800 relative">
               <ImageWithFallback 
                 src="https://images.unsplash.com/photo-1601926299866-6a5c9bfa6be0?q=80&w=1080" 
                 alt="Creative Director"
                 className="w-full h-full object-cover opacity-80"
               />
             </div>
             <div className="w-full md:w-2/3">
               <motion.blockquote 
                 initial={{ opacity: 0, x: 20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 1 }}
                 className="text-4xl lg:text-5xl font-serif leading-tight mb-8"
               >
                 "We help fashion brands create visuals that sell — not just look good."
               </motion.blockquote>
               <cite className="not-italic text-sm tracking-widest uppercase text-gray-400">
                 — Sarah Jenkins, Creative Director
               </cite>
             </div>
           </div>
        </div>
      </section>

      {/* 7. USE CASES */}
      <section className="bg-white">
         <div className="container mx-auto px-6 lg:px-12">
            <UseCaseRow 
              title="Product Detail Pages"
              desc="High-fidelity shots that show texture, fit, and movement. Reduce returns by showing the customer exactly what they're buying."
              image="https://images.unsplash.com/photo-1654806389957-f8ca19bb7b1a?q=80&w=1080"
            />
            <UseCaseRow 
              title="Collection Launches"
              desc="Campaign imagery that sets the tone for your entire season. Cohesive, storytelling visuals that build brand equity."
              image="https://images.unsplash.com/photo-1740128041185-b2afa550f7cc?q=80&w=1080"
              reversed={true}
            />
            <UseCaseRow 
              title="Social Campaigns"
              desc="Video and stills optimized for Instagram and TikTok. Stop the scroll with visuals that demand attention."
              image="https://images.unsplash.com/photo-1601926299866-6a5c9bfa6be0?q=80&w=1080"
            />
         </div>
      </section>

      {/* 4. PROCESS OVERVIEW REMOVED (Redundant) */}

      {/* 9. FAQ */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12 max-w-3xl">
          <h2 className="text-4xl font-serif mb-12 text-center">Common Questions</h2>
          <div className="space-y-2">
            <FAQItem 
              question="What is the turnaround time?" 
              answer="Standard turnaround is 5-7 business days from the shoot date. Expedited 48-hour delivery is available for an additional fee." 
            />
            <FAQItem 
              question="Can I attend the shoot?" 
              answer="Absolutely. We encourage clients to be present either on-set or virtually via our live-stream remote approval system." 
            />
            <FAQItem 
              question="Do you handle model casting?" 
              answer="Yes, we have a direct integration with top agencies in NY, London, and Paris. We can handle the entire casting process based on your brief." 
            />
            <FAQItem 
              question="What formats do you deliver?" 
              answer="We deliver high-resolution TIFFs for print and optimized WEBPs/JPGs for ecommerce, along with raw video files if requested." 
            />
          </div>
        </div>
      </section>

      {/* 10. FINAL CONVERSION */}
      <section className="py-32 bg-white text-center">
        <div className="container mx-auto px-6 lg:px-12">
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="max-w-2xl mx-auto space-y-8"
           >
             <h2 className="text-5xl font-serif leading-tight">Ready to elevate your <br/> ecommerce visuals?</h2>
             <p className="text-gray-500 text-lg">Book your shoot today or schedule a consultation with our creative team.</p>
             <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
               <button 
                 onClick={() => handleNavigation("/wizard")}
                 className="bg-black text-white px-12 py-5 uppercase tracking-widest text-xs font-semibold hover:bg-gray-800 transition-colors"
               >
                 Book This Service
               </button>
               <button className="bg-white text-black border border-gray-200 px-12 py-5 uppercase tracking-widest text-xs font-semibold hover:border-black transition-colors">
                 Contact Us
               </button>
             </div>
           </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
