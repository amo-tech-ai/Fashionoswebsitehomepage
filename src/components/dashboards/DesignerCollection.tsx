import { motion } from "motion/react";
import { Sparkles, Image, CheckSquare, Tag } from "lucide-react";

export function DesignerCollection() {
  const designers = [
    { name: "Designer A - Metallic Dreams", brand: "Avant Garde Studio", status: "approved", looks: 12 },
    { name: "Designer B - Minimalist", brand: "Modern Lines Co", status: "approved", looks: 8 },
    { name: "Designer C - Street Couture", brand: "Urban Edge", status: "approved", looks: 10 },
    { name: "Designer D - Evening Elegance", brand: "Noir Atelier", status: "in-review", looks: 15 }
  ];

  const outfits = [
    { id: 1, name: "Metallic Evening Gown", tags: ["Metallic", "Evening", "Elegant"], designer: "Designer A" },
    { id: 2, name: "Minimalist Suit", tags: ["Minimalist", "Structured", "Neutral"], designer: "Designer B" },
    { id: 3, name: "Street Couture Jacket", tags: ["Street", "Edgy", "Bold"], designer: "Designer C" },
    { id: 4, name: "Avant-Garde Dress", tags: ["Avant-Garde", "Sculptural"], designer: "Designer D" },
    { id: 5, name: "Silver Sequin Gown", tags: ["Metallic", "Glamorous"], designer: "Designer A" },
    { id: 6, name: "Beige Trench Coat", tags: ["Minimalist", "Classic"], designer: "Designer B" },
    { id: 7, name: "Deconstructed Denim", tags: ["Street", "Casual"], designer: "Designer C" },
    { id: 8, name: "Black Evening Dress", tags: ["Evening", "Elegant"], designer: "Designer D" }
  ];

  const runwaySegments = [
    { segment: "Opening", designer: "Designer A", looks: 3, duration: "4 min" },
    { segment: "Act I", designer: "Designer B", looks: 4, duration: "6 min" },
    { segment: "Act II", designer: "Designer C", looks: 4, duration: "6 min" },
    { segment: "Act III", designer: "Designer D", looks: 5, duration: "8 min" },
    { segment: "Finale", designer: "All Designers", looks: 8, duration: "5 min" }
  ];

  const backstageChecklist = [
    { task: "Outfits organized by designer", status: true },
    { task: "Quick-change stations set up", status: true },
    { task: "Accessories labeled and sorted", status: true },
    { task: "Emergency repair kit prepared", status: false },
    { task: "Steamers and irons ready", status: true },
    { task: "Designer final approval", status: false }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="max-w-[1920px] mx-auto px-6 py-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl text-gray-900 mb-2">Designer & Collection Management</h1>
            <p className="text-sm text-gray-600">AI-powered style analysis and sequence optimization</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm">Cohesion Score: 94/100</span>
          </div>
        </div>

        {/* Designer Cards */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-6">Designer Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {designers.map((designer, index) => (
              <motion.div
                key={index}
                className="border border-gray-200 rounded-lg p-5 hover:border-gray-400 cursor-pointer transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-gray-600" />
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    designer.status === "approved"
                      ? "bg-green-50 text-green-700"
                      : "bg-amber-50 text-amber-700"
                  }`}>
                    {designer.status}
                  </span>
                </div>
                <div className="text-sm text-gray-900 mb-1">{designer.name}</div>
                <div className="text-xs text-gray-600 mb-3">{designer.brand}</div>
                <div className="text-xs text-gray-600">{designer.looks} looks</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Outfits Grid with AI Tags */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-gray-900">Collection Outfits</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Tag className="w-4 h-4" />
              <span>AI Auto-Tagged</span>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {outfits.map((outfit, index) => (
              <motion.div
                key={outfit.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-gray-400 cursor-pointer transition-colors"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                whileHover={{ scale: 1.03 }}
              >
                {/* Image placeholder */}
                <div className="w-full aspect-[3/4] bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                  <Image className="w-8 h-8 text-gray-400" />
                </div>
                <div className="text-sm text-gray-900 mb-2">{outfit.name}</div>
                <div className="text-xs text-gray-500 mb-2">{outfit.designer}</div>
                <div className="flex flex-wrap gap-1">
                  {outfit.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Runway Segment Manager + Sequence Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Runway Segments */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-6">Runway Segment Manager</h3>
            <div className="space-y-3">
              {runwaySegments.map((segment, index) => (
                <motion.div
                  key={index}
                  className="p-4 bg-gray-50 border border-gray-200 rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-gray-900">{segment.segment}</div>
                    <div className="text-xs px-2 py-1 bg-gray-200 rounded-full text-gray-700">
                      {segment.duration}
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 mb-1">{segment.designer}</div>
                  <div className="text-xs text-gray-500">{segment.looks} looks</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sequence Timeline */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-gray-700" />
              <h3 className="text-gray-900">AI-Optimized Sequence</h3>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-lg">
                <div className="text-xs mb-2">AI Recommendation</div>
                <div className="text-sm">
                  Current sequence maximizes visual impact and minimizes backstage conflicts. Change time optimized to 90 seconds average.
                </div>
              </div>
              
              {/* Visual Timeline */}
              <div className="space-y-2">
                {runwaySegments.map((segment, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-12 text-xs text-gray-600">{index * 6}min</div>
                    <div 
                      className="flex-1 h-8 bg-gray-200 rounded flex items-center px-3 text-xs text-gray-700"
                      style={{ 
                        background: index === 2 ? '#1f2937' : '#e5e7eb',
                        color: index === 2 ? 'white' : '#374151'
                      }}
                    >
                      {segment.segment}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Backstage Prep Checklist */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-6">Backstage Prep Checklist</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {backstageChecklist.map((item, index) => (
              <motion.div
                key={index}
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  item.status
                    ? "bg-green-50 border-green-200"
                    : "bg-gray-50 border-gray-200 hover:border-gray-300"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.05 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded flex items-center justify-center border-2 ${
                    item.status
                      ? "bg-green-600 border-green-600"
                      : "border-gray-300"
                  }`}>
                    {item.status && <CheckSquare className="w-4 h-4 text-white" />}
                  </div>
                  <span className={`text-sm ${
                    item.status ? "text-green-900" : "text-gray-700"
                  }`}>
                    {item.task}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
