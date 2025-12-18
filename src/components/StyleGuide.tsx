import { motion } from "motion/react";
import { 
  Type, 
  Palette, 
  Layout, 
  Component, 
  MessageSquare, 
  Sparkles, 
  ArrowRight,
  Monitor,
  Smartphone,
  Tablet,
  MousePointer2,
  Layers
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

export default function StyleGuide() {
  const sections = [
    { id: "colors", label: "Color Palette", icon: Palette },
    { id: "typography", label: "Typography", icon: Type },
    { id: "spacing", label: "Spacing & Layout", icon: Layout },
    { id: "components", label: "Core Components", icon: Component },
    { id: "chat", label: "Chat Interface", icon: MessageSquare },
    { id: "motion", label: "AI Motion", icon: Sparkles },
    { id: "sitemap", label: "Sitemap", icon: Layers },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-black selection:text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white font-serif text-lg">F</div>
            <span className="font-serif text-xl tracking-tight">FashionOS Design System</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="text-sm font-medium text-gray-500 hover:text-black transition-colors"
              >
                {section.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-6 pt-32 pb-24 space-y-32">
        
        {/* Hero */}
        <section className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="mb-6 px-4 py-1 border-black text-black rounded-full">v2.0.0 (Beta)</Badge>
            <h1 className="font-serif text-6xl md:text-7xl leading-[1.1] mb-8">
              A premium, intelligent design language for high-end AI interfaces.
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl leading-relaxed">
              FashionOS Design System focuses on clarity, subtle interactions, and deep luxury aesthetics. 
              It avoids standard SaaS patterns like gradients or shadows in favor of high-impact imagery and minimal copy.
            </p>
          </motion.div>
        </section>

        <Separator />

        {/* Color Palette */}
        <section id="colors" className="space-y-12">
          <div>
            <h2 className="font-serif text-4xl mb-4">Color Palette</h2>
            <p className="text-gray-500">A strict monochrome base with purposeful semantic accents.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ColorCard 
              name="Obsidian" 
              hex="#000000" 
              tailwind="bg-black" 
              text="text-white"
              usage="Primary Brand / Text / Strong Actions"
            />
            <ColorCard 
              name="Marble" 
              hex="#FFFFFF" 
              tailwind="bg-white border border-gray-200" 
              text="text-black"
              usage="Backgrounds / Cards"
            />
            <ColorCard 
              name="Concrete" 
              hex="#F9FAFB" 
              tailwind="bg-gray-50 border border-gray-100" 
              text="text-gray-900"
              usage="Secondary Backgrounds / Hovers"
            />
            <ColorCard 
              name="Charcoal" 
              hex="#4B5563" 
              tailwind="bg-gray-600" 
              text="text-white"
              usage="Secondary Text / Icons"
            />
          </div>
        </section>

        {/* Typography */}
        <section id="typography" className="space-y-12">
           <div>
            <h2 className="font-serif text-4xl mb-4">Typography</h2>
            <p className="text-gray-500">Contrasting the elegance of serif with the utility of sans-serif.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div className="border-b border-gray-100 pb-4 mb-4">
                <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">Headings (Serif)</span>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-2">Display 4XL / Playfair Display</p>
                <h1 className="font-serif text-6xl">Luxury Redefined</h1>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-2">Display 2XL / Playfair Display</p>
                <h2 className="font-serif text-4xl">Concierge Experience</h2>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-2">Heading L / Playfair Display</p>
                <h3 className="font-serif text-2xl">The collection</h3>
              </div>
            </div>

            <div className="space-y-8">
               <div className="border-b border-gray-100 pb-4 mb-4">
                <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">Body (Sans)</span>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-2">Body Large / Inter</p>
                <p className="text-lg text-gray-900">
                  Used for introductions and lead paragraphs. The quick brown fox jumps over the lazy dog.
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-2">Body Default / Inter</p>
                <p className="text-base text-gray-600">
                  This is the standard text size for most content blocks. It is optimized for readability at small sizes and works well for UI elements.
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-2">Caption / Inter</p>
                <p className="text-sm text-gray-500">
                  Copyright © 2025 FashionOS. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Spacing & Layout */}
        <section id="spacing" className="space-y-12">
           <div>
            <h2 className="font-serif text-4xl mb-4">Spacing & Layout</h2>
            <p className="text-gray-500">An 8pt grid system ensures rhythm and consistency.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[4, 8, 16, 24, 32, 48, 64, 80].map((size) => (
              <div key={size} className="space-y-2">
                <div className={`bg-black/10 h-12 w-${size === 4 ? '1' : size/4} rounded`} style={{ width: size * 2 }} />
                <p className="text-xs text-gray-400">{size}px ({size/4} tw)</p>
              </div>
            ))}
          </div>
        </section>

        {/* Core Components */}
        <section id="components" className="space-y-12">
          <div>
            <h2 className="font-serif text-4xl mb-4">Core Components</h2>
            <p className="text-gray-500">Minimalist interactive elements designed for utility.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Buttons */}
            <div className="space-y-6 p-8 border border-gray-100 rounded-xl">
              <h3 className="font-medium text-gray-900 mb-4">Buttons</h3>
              <div className="space-y-4">
                <Button className="w-full bg-black text-white hover:bg-gray-800">Primary Action</Button>
                <Button variant="outline" className="w-full border-gray-200 hover:bg-gray-50">Secondary Action</Button>
                <Button variant="ghost" className="w-full hover:bg-gray-50">Ghost Action</Button>
              </div>
            </div>

            {/* Inputs */}
            <div className="space-y-6 p-8 border border-gray-100 rounded-xl">
              <h3 className="font-medium text-gray-900 mb-4">Inputs</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email Address</label>
                  <input type="text" placeholder="name@example.com" className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Select Option</label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black bg-white">
                    <option>Option 1</option>
                    <option>Option 2</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Cards */}
            <div className="space-y-6 p-8 border border-gray-100 rounded-xl bg-gray-50">
              <h3 className="font-medium text-gray-900 mb-4">Cards</h3>
              <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                <div className="h-24 bg-gray-100 rounded mb-3 flex items-center justify-center text-gray-400">Image Area</div>
                <h4 className="font-medium text-gray-900">Product Card</h4>
                <p className="text-sm text-gray-500 mt-1">Minimal description of the item.</p>
              </div>
            </div>

          </div>
        </section>

        {/* Chat Interface */}
        <section id="chat" className="space-y-12">
          <div>
            <h2 className="font-serif text-4xl mb-4">Chat Interface</h2>
            <p className="text-gray-500">A conversational UI that feels personal and intelligent.</p>
          </div>

          <div className="max-w-2xl mx-auto border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-white p-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white text-xs">AI</div>
                <span className="font-medium text-sm">FashionOS Assistant</span>
              </div>
              <Sparkles className="w-4 h-4 text-gray-400" />
            </div>
            <div className="bg-gray-50 p-6 space-y-6 h-80 overflow-y-auto">
              {/* AI Message */}
              <div className="flex gap-4 max-w-[90%]">
                <div className="w-8 h-8 rounded-full bg-black flex-shrink-0 flex items-center justify-center text-white text-xs mt-1">AI</div>
                <div className="space-y-2">
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 text-sm leading-relaxed">
                    <p>I've analyzed your upcoming Spring Collection. Would you like me to generate a preliminary shot list based on the "Urban Garden" theme?</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs hover:border-black transition-colors">Yes, generate list</button>
                    <button className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs hover:border-black transition-colors">Show moodboard first</button>
                  </div>
                </div>
              </div>

              {/* User Message */}
              <div className="flex gap-4 max-w-[90%] ml-auto flex-row-reverse">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center text-gray-600 text-xs mt-1">AC</div>
                <div className="bg-black text-white p-4 rounded-2xl rounded-tr-none text-sm leading-relaxed">
                  <p>Yes, please generate the shot list. Focus on outdoor lighting.</p>
                </div>
              </div>
               {/* AI Typing */}
               <div className="flex gap-4 max-w-[90%]">
                <div className="w-8 h-8 rounded-full bg-black flex-shrink-0 flex items-center justify-center text-white text-xs mt-1">AI</div>
                 <div className="flex gap-1 items-center h-10 px-4 bg-white rounded-2xl rounded-tl-none border border-gray-100">
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Motion */}
        <section id="motion" className="space-y-12">
          <div>
            <h2 className="font-serif text-4xl mb-4">AI Motion & Interaction</h2>
            <p className="text-gray-500">Subtle, fluid movements that guide the user's attention.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <MotionCard title="Hover Lift">
              <motion.div 
                whileHover={{ y: -5 }}
                className="w-24 h-24 bg-black rounded-xl shadow-lg cursor-pointer"
              />
            </MotionCard>
            <MotionCard title="Pulse Attention">
              <div className="relative">
                <div className="w-24 h-24 bg-gray-100 rounded-xl border border-gray-200 flex items-center justify-center">
                  <span className="text-xs text-gray-400">Content</span>
                </div>
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full"
                />
              </div>
            </MotionCard>
             <MotionCard title="Staggered Reveal">
              <div className="flex gap-2">
                 {[1, 2, 3].map((i) => (
                   <motion.div
                      key={i}
                      initial={{ opacity: 0.5, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false }}
                      transition={{ delay: i * 0.2 }}
                      className="w-6 h-24 bg-black rounded-full"
                   />
                 ))}
              </div>
            </MotionCard>
          </div>
        </section>

        <Separator />

        {/* Sitemap / Links */}
        <section id="sitemap" className="space-y-12 pb-24">
          <div>
            <h2 className="font-serif text-4xl mb-4">System Map</h2>
            <p className="text-gray-500">Direct access to all platform surfaces.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            
            <LinkColumn 
              title="Marketing Pages" 
              icon={Monitor}
              links={[
                { label: "Home V1 (Original)", href: "/" },
                { label: "Home V2 (Minimal)", href: "/home-v2" },
                { label: "Home V3 (Editorial)", href: "/home-v3" },
                { label: "Services Hub", href: "/services" },
                { label: "Pricing / Studios", href: "/studios" },
              ]}
            />

            <LinkColumn 
              title="Dashboards" 
              icon={Layout}
              links={[
                { label: "Project Overview", href: "/overview" },
                { label: "Command Center", href: "/command-center" },
                { label: "Shot Lists", href: "/shotlist" },
                { label: "Inventory & Products", href: "/products" },
                { label: "Finance & Billing", href: "/billing" },
                { label: "Analytics", href: "/analytics" },
              ]}
            />

            <LinkColumn 
              title="Wizards & AI" 
              icon={Sparkles}
              links={[
                { label: "New Shoot Wizard", href: "/wizard" },
                { label: "Website Builder Wizard", href: "/website-wizard" },
                { label: "Brand Profile Wizard", href: "/designer-wizard" },
                { label: "Event Creator", href: "/event-wizard" },
              ]}
            />

            <LinkColumn 
              title="Platform Views" 
              icon={Smartphone}
              links={[
                { label: "Desktop View", href: "#" },
                { label: "Tablet View", href: "#" },
                { label: "Mobile View", href: "#" },
                { label: "Footer Component", href: "#footer" },
              ]}
            />

          </div>
        </section>

      </main>

      {/* Footer Preview */}
      <footer className="bg-gray-50 py-12 border-t border-gray-200">
        <div className="container mx-auto px-6 text-center text-gray-400 text-sm">
          <p>FashionOS Design System v2.0 • 2025</p>
        </div>
      </footer>
    </div>
  );
}

// Subcomponents for cleaner code
function ColorCard({ name, hex, tailwind, text, usage }: { name: string, hex: string, tailwind: string, text: string, usage: string }) {
  return (
    <div className="group cursor-pointer">
      <div className={`h-32 w-full rounded-xl shadow-sm mb-4 flex items-end p-4 ${tailwind} ${text} transition-transform group-hover:scale-[1.02]`}>
        <div className="font-mono text-xs opacity-80">{hex}</div>
      </div>
      <h3 className="font-medium text-gray-900">{name}</h3>
      <p className="text-sm text-gray-500 mt-1">{usage}</p>
    </div>
  );
}

function MotionCard({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="h-64 border border-gray-100 rounded-xl bg-gray-50 flex flex-col items-center justify-center relative overflow-hidden group">
      <div className="absolute top-4 left-4 text-sm font-medium text-gray-500">{title}</div>
      {children}
    </div>
  );
}

function LinkColumn({ title, links, icon: Icon }: { title: string, links: { label: string, href: string }[], icon: any }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-black font-medium pb-2 border-b border-gray-100">
        <Icon className="w-4 h-4" />
        <h3>{title}</h3>
      </div>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <a 
              href={link.href} 
              className="flex items-center gap-2 text-gray-500 hover:text-black hover:translate-x-1 transition-all text-sm group"
            >
              <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}