import { motion } from "motion/react";
import { Instagram, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  const handleNavigation = (href: string) => {
    if (href === "#") return;
    
    // Update URL and trigger routing
    window.history.pushState({}, "", href);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  const footerSections = [
    {
      title: "About",
      links: [
        "Our Story", 
        "Team", 
        "Careers", 
        "Press"
      ]
    },
    {
      title: "Review Versions",
      links: [
        { text: "Home V1 (Original)", href: "/" },
        { text: "Home V2 (Previous)", href: "/home-v2" },
        { text: "Home V3 (Latest)", href: "/home-v3" }
      ]
    },
    {
      title: "Services",
      links: [
        { text: "All Services", href: "/services" },
        { text: "Social Media Services", href: "/instagram" },
        { text: "Website Design", href: "/web-design" },
        { text: "Photography Services", href: "/photography" },
        { text: "Clothing Photography", href: "/clothing" },
        { text: "Product Photography", href: "/product" },
        { text: "Video Production", href: "/video" },
        { text: "Amazon Content", href: "/amazon" },
        { text: "Start New Shoot", href: "/wizard" },
        { text: "Studio Hire", href: "/studios" }
      ]
    },
    {
      title: "Directory",
      links: ["Models", "Photographers", "Designers", "Stylists"]
    },
    {
      title: "Contact",
      links: ["hello@fashionos.com", "+1 (555) 123-4567", "New York, NY", "Book a Call"]
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
                {section.links.map((link) => (
                  <li key={typeof link === 'string' ? link : link.text}>
                    <a
                      href={typeof link === 'string' ? "#" : link.href}
                      className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavigation(typeof link === 'string' ? "#" : link.href);
                      }}
                    >
                      {typeof link === 'string' ? link : link.text}
                    </a>
                  </li>
                ))}
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