import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { categories } from "../data";
import { FormData } from "../types";

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    storeLink: "",
    category: "Apparel",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Amazon Form submitted:", formData);
  };

  return (
    <section className="py-24 bg-[#F8F6F4]">
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-serif text-gray-900 mb-4">Start Your Amazon Project</h2>
            <p className="text-gray-600">Tell us about your product. Average turnaround: 3–5 business days.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Full Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-gray-900 focus:ring-0 transition-all outline-none"
                  placeholder="Jane Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Work Email</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-gray-900 focus:ring-0 transition-all outline-none"
                  placeholder="jane@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Amazon Storefront Link (Optional)</label>
                <input
                  type="url"
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-gray-900 focus:ring-0 transition-all outline-none"
                  placeholder="amazon.com/shops/..."
                  value={formData.storeLink}
                  onChange={(e) => setFormData({...formData, storeLink: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Product Category</label>
                <div className="relative">
                  <select
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-gray-900 focus:ring-0 transition-all outline-none appearance-none"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Project Details</label>
              <textarea
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-gray-900 focus:ring-0 transition-all outline-none"
                placeholder="What products do you need shot? Do you have specific requirements?"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              Request Quote
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-center text-xs text-gray-500 mt-4">
              By submitting, you agree to our Terms of Service. We usually reply within 2 hours.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
