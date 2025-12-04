import { motion } from "motion/react";
import { Sparkles, MapPin, Users, Zap, Wifi, Volume2, Shield, AlertTriangle, User, Lightbulb } from "lucide-react";

export function VenueProduction() {
  const venueZones = [
    { zone: "VIP Seating", capacity: 200, status: "ready" },
    { zone: "General Seating", capacity: 800, status: "ready" },
    { zone: "Standing Area", capacity: 200, status: "setup" },
    { zone: "Press Section", capacity: 100, status: "ready" },
    { zone: "Backstage", capacity: 150, status: "setup" }
  ];

  const crewAssignments = [
    { role: "Lighting Technicians", assigned: 8, needed: 8, status: "complete" },
    { role: "Sound Engineers", assigned: 6, needed: 6, status: "complete" },
    { role: "Stage Managers", assigned: 4, needed: 5, status: "partial" },
    { role: "Security", assigned: 12, needed: 15, status: "partial" },
    { role: "Wardrobe Assistants", assigned: 10, needed: 10, status: "complete" },
    { role: "Makeup Artists", assigned: 8, needed: 8, status: "complete" }
  ];

  const technicalSpecs = [
    { system: "Power Grid", capacity: "500 kW", current: "340 kW", status: "optimal" },
    { system: "Lighting Grid", fixtures: 120, active: 120, status: "optimal" },
    { system: "Audio/SFX", speakers: 32, active: 32, status: "optimal" },
    { system: "Internet", bandwidth: "10 Gbps", usage: "3.2 Gbps", status: "optimal" }
  ];

  const safetyWarnings = [
    { warning: "Fire exits clear and marked", level: "safe" },
    { warning: "Emergency lighting tested", level: "safe" },
    { warning: "First aid station requires restocking", level: "caution" },
    { warning: "Backstage crowd density high", level: "caution" }
  ];

  const productionTimeline = [
    { phase: "Setup", start: "Day -2", duration: "2 days", status: "in-progress" },
    { phase: "Rehearsal", start: "Day -1", duration: "8 hours", status: "pending" },
    { phase: "Show Day", start: "Day 0", duration: "12 hours", status: "pending" },
    { phase: "Breakdown", start: "Day +1", duration: "1 day", status: "pending" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="max-w-[1920px] mx-auto px-6 py-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl text-gray-900 mb-2">Venue & Production Management</h1>
            <p className="text-sm text-gray-600">AI-powered logistics and crew optimization</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm">Production Score: 89/100</span>
          </div>
        </div>

        {/* Venue Map + Seating Zones */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Venue Map */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <MapPin className="w-5 h-5 text-gray-700" />
              <h3 className="text-gray-900">Venue Layout Map</h3>
            </div>
            <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden">
              {/* Simplified venue layout */}
              <div className="absolute inset-0 p-8">
                <div className="w-full h-full border-2 border-gray-400 rounded-lg relative">
                  {/* Stage */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-16 bg-gray-800 rounded flex items-center justify-center text-white text-xs">
                    Stage
                  </div>
                  {/* Runway */}
                  <div className="absolute top-20 left-1/2 -translate-x-1/2 w-12 h-32 bg-gray-700 rounded flex items-center justify-center text-white text-xs">
                    Runway
                  </div>
                  {/* VIP Left */}
                  <div className="absolute top-24 left-8 w-24 h-24 bg-amber-500 bg-opacity-40 rounded flex items-center justify-center text-xs text-gray-700">
                    VIP
                  </div>
                  {/* VIP Right */}
                  <div className="absolute top-24 right-8 w-24 h-24 bg-amber-500 bg-opacity-40 rounded flex items-center justify-center text-xs text-gray-700">
                    VIP
                  </div>
                  {/* General Seating */}
                  <div className="absolute bottom-8 left-8 right-8 h-16 bg-blue-500 bg-opacity-30 rounded flex items-center justify-center text-xs text-gray-700">
                    General Seating
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-center gap-6 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-amber-500 bg-opacity-40 rounded" />
                <span className="text-gray-600">VIP Section</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 bg-opacity-30 rounded" />
                <span className="text-gray-600">General</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-700 rounded" />
                <span className="text-gray-600">Stage/Runway</span>
              </div>
            </div>
          </div>

          {/* Seating Zones */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-6">Seating Zones</h3>
            <div className="space-y-3">
              {venueZones.map((zone, index) => (
                <motion.div
                  key={index}
                  className="p-3 bg-gray-50 border border-gray-200 rounded-lg"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-gray-900">{zone.zone}</div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      zone.status === "ready"
                        ? "bg-green-50 text-green-700"
                        : "bg-amber-50 text-amber-700"
                    }`}>
                      {zone.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3 h-3 text-gray-500" />
                    <span className="text-xs text-gray-600">{zone.capacity} capacity</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Crew Assignment */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-6">Crew Assignment & Load Balancing</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {crewAssignments.map((crew, index) => (
              <motion.div
                key={index}
                className="p-4 border border-gray-200 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-600" />
                    <div className="text-sm text-gray-900">{crew.role}</div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    crew.status === "complete"
                      ? "bg-green-50 text-green-700"
                      : "bg-amber-50 text-amber-700"
                  }`}>
                    {crew.status}
                  </span>
                </div>
                <div className="text-xs text-gray-600 mb-2">
                  {crew.assigned} / {crew.needed} assigned
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      crew.status === "complete" ? "bg-green-600" : "bg-amber-500"
                    }`}
                    style={{ width: `${(crew.assigned / crew.needed) * 100}%` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Technical Specs Panels */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-gray-900 mb-6">Technical Specifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {technicalSpecs.map((spec, index) => {
              const icons = [Zap, Lightbulb, Volume2, Wifi];
              const Icon = icons[index] || Zap;
              
              return (
                <motion.div
                  key={index}
                  className="p-5 bg-gray-50 border border-gray-200 rounded-lg"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Icon className="w-5 h-5 text-gray-700" />
                    <div className="text-sm text-gray-900">{spec.system}</div>
                  </div>
                  {spec.capacity && (
                    <>
                      <div className="text-xs text-gray-600 mb-1">
                        Capacity: {spec.capacity}
                      </div>
                      <div className="text-xs text-gray-600">
                        Current: {spec.current}
                      </div>
                    </>
                  )}
                  {spec.fixtures && (
                    <div className="text-xs text-gray-600">
                      {spec.active} / {spec.fixtures} active
                    </div>
                  )}
                  {spec.speakers && (
                    <div className="text-xs text-gray-600">
                      {spec.active} / {spec.speakers} speakers
                    </div>
                  )}
                  {spec.bandwidth && (
                    <>
                      <div className="text-xs text-gray-600 mb-1">
                        Bandwidth: {spec.bandwidth}
                      </div>
                      <div className="text-xs text-gray-600">
                        Usage: {spec.usage}
                      </div>
                    </>
                  )}
                  <div className="mt-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-xs text-green-700">{spec.status}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Production Timeline + Safety Warnings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Production Timeline */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-6">Production Timeline</h3>
            <div className="space-y-4">
              {productionTimeline.map((phase, index) => (
                <motion.div
                  key={index}
                  className={`p-4 rounded-lg border-2 ${
                    phase.status === "in-progress"
                      ? "bg-gray-900 border-gray-900 text-white"
                      : "bg-gray-50 border-gray-200"
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm">{phase.phase}</div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      phase.status === "in-progress"
                        ? "bg-white bg-opacity-20"
                        : "bg-gray-200 text-gray-700"
                    }`}>
                      {phase.status}
                    </span>
                  </div>
                  <div className={`text-xs ${
                    phase.status === "in-progress" ? "text-gray-300" : "text-gray-600"
                  }`}>
                    Start: {phase.start} • Duration: {phase.duration}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Safety Warning Cards */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="w-5 h-5 text-gray-700" />
              <h3 className="text-gray-900">Safety Status</h3>
            </div>
            <div className="space-y-3">
              {safetyWarnings.map((item, index) => (
                <motion.div
                  key={index}
                  className={`p-4 rounded-lg border ${
                    item.level === "safe"
                      ? "bg-green-50 border-green-200"
                      : "bg-amber-50 border-amber-200"
                  }`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                >
                  <div className="flex items-start gap-3">
                    {item.level === "safe" ? (
                      <Shield className="w-4 h-4 text-green-600 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <div className={`text-sm ${
                        item.level === "safe" ? "text-green-900" : "text-amber-900"
                      }`}>
                        {item.warning}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Crowd Flow Simulation */}
        <motion.div
          className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-white bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">AI Crowd Flow Analysis</div>
              <div className="text-sm text-white mb-3">
                Current venue configuration supports 1,450 attendees with optimal flow. Backstage density at 78% capacity during peak moments. Recommend adding 2 additional quick-change stations.
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="p-3 bg-white bg-opacity-10 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">Entry Flow</div>
                  <div className="text-lg text-white">12 min</div>
                </div>
                <div className="p-3 bg-white bg-opacity-10 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">Exit Flow</div>
                  <div className="text-lg text-white">8 min</div>
                </div>
                <div className="p-3 bg-white bg-opacity-10 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">Backstage Peak</div>
                  <div className="text-lg text-white">78%</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}