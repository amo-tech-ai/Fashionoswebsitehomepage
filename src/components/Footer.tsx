import { motion } from "motion/react";
import { Instagram, Twitter, Linkedin } from "lucide-react";

interface FooterProps {
  onNavigate?: (screen: string) => void;
  activeScreen?: string;
}

export function Footer({ onNavigate, activeScreen }: FooterProps) {
  const handleNavigation = (href: string) => {
    if (href === "#") return;
    
    // Extract route from href (remove leading slash)
    const route = href.startsWith("/") ? href.slice(1) : href;
    
    // If onNavigate is provided, use it (for app pages)
    if (onNavigate) {
      onNavigate(route);
    } else {
      // Fallback for marketing pages
      window.history.pushState({}, "", href);
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
  };

  const footerSections = [
    {
      title: "Platform",
      links: [
        { text: "Overview", href: "/overview", id: "overview" },
        { text: "Command Center", href: "/command-center", id: "command-center" },
        { text: "Task Execution Engine", href: "/tasks", id: "tasks" },
        { text: "Shot List Builder", href: "/shotlist", id: "shotlist" },
        { text: "Cura Casting Agent", href: "/casting", id: "casting" },
        { text: "Sponsorship V1", href: "/sponsorship", id: "sponsorship" },
        { text: "Sponsorship V2", href: "/sponsorship-v2", id: "sponsorship-v2" },
        { text: "Sponsorship V3", href: "/sponsorship-v3", id: "sponsorship-v3" },
        { text: "Sponsorship V5", href: "/sponsorship-v5", id: "sponsorship-v5" },
        { text: "Cosmetics Sponsor", href: "/sponsors/cosmetics", id: "sponsors-cosmetics" },
        { text: "Electronics Sponsor", href: "/sponsors/electronics", id: "sponsors-electronics" },
        { text: "Electronics V2", href: "/sponsors/electronics-v2", id: "sponsors-electronics-v2" },
        { text: "Beauty Sponsor", href: "/sponsors/beauty", id: "sponsors-beauty" },
        { text: "Automotive Sponsor", href: "/sponsors/automotive", id: "sponsors-automotive" },
        { text: "Real Estate Sponsor", href: "/sponsors/real-estate", id: "sponsors-real-estate" },
        { text: "Sponsor CRM", href: "/sponsors", id: "sponsors" },
        { text: "Inventory", href: "/products", id: "products" },
        { text: "Schedule", href: "/events-list", id: "events-list" },
        { text: "Finance", href: "/billing", id: "billing" },
        { text: "Analytics", href: "/analytics", id: "analytics" },
      ]
    },
    {
      title: "Create",
      links: [
        { text: "Brand Shoot (AI)", href: "/brand-shoot-start" },
        { text: "Classic Shoot Wizard", href: "/wizard" },
        { text: "Event Creation Wizard", href: "/event-wizard" },
        { text: "Website Wizard", href: "/website-wizard" },
        { text: "Designer Profile", href: "/directory-wizard" }
      ]
    },
    {
      title: "Services",
      links: [
        { text: "Ecommerce Photography", href: "/ecommerce-photography" },
        { text: "Website Design", href: "/webdesign" },
        { text: "Video Production", href: "/video" },
        { text: "Studios", href: "/studio" },
        { text: "Social Media", href: "/instagram" },
        { text: "Amazon Content", href: "/amazon" }
      ]
    },
    {
      title: "Explore",
      links: [
        { text: "Home V3 (Latest)", href: "/home-v3" },
        { text: "Home V2", href: "/home-v2" },
        { text: "Home V1", href: "/" },
        { text: "Directory", href: "/directory" },
        { text: "Design System", href: "/style-guide" },
        { text: "Architecture", href: "/architecture" }
      ]
    },
    {
      title: "Company",
      links: [
        { text: "About Us", href: "#" },
        { text: "Contact", href: "#" },
        { text: "Careers", href: "#" },
        { text: "Press", href: "#" }
      ]
    }
  ];

  const socialLinks = [
    { icon: Instagram, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Linkedin, href: "#" }
  ];

  return (
    <footer className="bg-[rgb(var(--color-soft-gray))] border-t border-gray-200">
      <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 mb-16">
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="space-y-6"
            >
              <h4 className="text-gray-900">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => {
                  const isLinkActive = activeScreen && typeof link !== 'string' && (link.id === activeScreen || (link.href && link.href.slice(1) === activeScreen));
                  
                  return (
                    <li key={typeof link === 'string' ? link : link.text}>
                      <a
                        href={typeof link === 'string' ? "#" : link.href}
                        className={`transition-colors duration-200 text-sm ${
                          isLinkActive 
                            ? "text-black font-semibold" 
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavigation(typeof link === 'string' ? "#" : link.href);
                        }}
                      >
                        {typeof link === 'string' ? link : link.text}
                        {isLinkActive && (
                          <span className="ml-2 inline-block w-1.5 h-1.5 rounded-full bg-black align-middle" />
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-gray-200"
        >
          <div className="flex items-center gap-8">
            <div className="text-2xl tracking-tight">FashionOS</div>
            <p className="text-sm text-gray-500">
              © 2025 FashionOS. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-6">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                whileHover={{ scale: 1.1, y: -2 }}
                transition={{ duration: 0.2 }}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-black hover:border-black hover:text-white transition-all duration-300"
              >
                <social.icon className="w-4 h-4" strokeWidth={1.5} />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}