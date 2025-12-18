import { motion } from "motion/react";
import { 
  Home, 
  Briefcase, 
  Sparkles, 
  FileText, 
  CreditCard, 
  LayoutDashboard, 
  ArrowRight, 
  GitBranch, 
  Users, 
  Camera, 
  Calendar, 
  Globe,
  Zap,
  CheckCircle2,
  Share2,
  MessageSquare
} from "lucide-react";

export function SiteArchitecture() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const CoreRouteCard = ({ icon: Icon, route, title, desc, primaryCTA, secondaryCTA }: any) => (
    <motion.div 
      variants={itemVariants}
      className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-gray-900 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-gray-900 group-hover:text-white transition-colors">
          <Icon className="w-6 h-6" />
        </div>
        <div className="font-mono text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded">{route}</div>
      </div>
      
      <h3 className="text-lg font-serif font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 mb-6 h-10">{desc}</p>
      
      <div className="space-y-3 pt-6 border-t border-gray-50">
        <div className="flex items-center justify-between text-xs group/cta cursor-pointer">
          <span className="font-bold text-gray-400 uppercase tracking-wider">Primary</span>
          <span className="font-medium text-orange-500 flex items-center gap-1 group-hover/cta:translate-x-1 transition-transform">
            {primaryCTA} <ArrowRight className="w-3 h-3" />
          </span>
        </div>
        <div className="flex items-center justify-between text-xs cursor-pointer">
          <span className="font-bold text-gray-400 uppercase tracking-wider">Secondary</span>
          <span className="font-medium text-gray-500 hover:text-gray-900 transition-colors">
            {secondaryCTA}
          </span>
        </div>
      </div>
    </motion.div>
  );

  const WorkflowNode = ({ title, type = "step", ai = false }: any) => (
    <div className={`
      relative px-4 py-3 rounded-lg border text-sm font-medium flex items-center gap-2
      ${type === 'start' ? 'bg-gray-900 text-white border-gray-900' : ''}
      ${type === 'step' ? 'bg-white text-gray-900 border-gray-200' : ''}
      ${type === 'end' ? 'bg-green-50 text-green-700 border-green-200' : ''}
    `}>
      {ai && <Sparkles className="w-3 h-3 text-purple-500" />}
      {title}
    </div>
  );

  const Connector = () => (
    <div className="w-8 h-px bg-gray-300 mx-2" />
  );

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans pb-24">
      {/* 1. Header */}
      <div className="bg-white border-b border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">Site Architecture & Routing</h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light">
              Visual map of the application flow, ensuring no dead ends and clear conversion paths.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-20">

        {/* 2. CORE ROUTE CARDS */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <CoreRouteCard 
            icon={Home}
            route="/"
            title="Home"
            desc="Storytelling & Conversion Entrance"
            primaryCTA="Start AI Brief (To Wizard)"
            secondaryCTA="Talk to Expert (To WhatsApp)"
          />
          <CoreRouteCard 
            icon={Briefcase}
            route="/services"
            title="Services"
            desc="Bento Grid of Capabilities"
            primaryCTA="Start AI Brief (Pre-selected)"
            secondaryCTA="View Details"
          />
          <CoreRouteCard 
            icon={Sparkles}
            route="/wizard"
            title="AI Brief Wizard"
            desc="5-Step Interactive Intake"
            primaryCTA="Generate Proposal"
            secondaryCTA="Save for Later"
          />
          <CoreRouteCard 
            icon={FileText}
            route="/proposal"
            title="Proposal Preview"
            desc="Roadmap & Pricing Output"
            primaryCTA="Secure Slot (To Booking)"
            secondaryCTA="Download PDF"
          />
          <CoreRouteCard 
            icon={CreditCard}
            route="/booking"
            title="Booking & Payment"
            desc="Stripe & Calendar Integration"
            primaryCTA="Pay & Confirm"
            secondaryCTA="Reschedule"
          />
          <CoreRouteCard 
            icon={LayoutDashboard}
            route="/dashboard"
            title="Dashboard"
            desc="Client View of Progress"
            primaryCTA="View Active Project"
            secondaryCTA="Message Team"
          />
        </motion.section>

        {/* 3. CONVERSION FLOW */}
        <section className="bg-white rounded-3xl border border-gray-200 p-10 relative overflow-hidden shadow-sm">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-200 via-gray-400 to-gray-900" />
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-10 text-center">Conversion Flow</h2>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gray-900 text-white flex items-center justify-center shadow-lg">
                <Home className="w-6 h-6" />
              </div>
              <div>
                <div className="font-bold text-gray-900">Interest</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Home / Services</div>
              </div>
            </div>

            <ArrowRight className="w-6 h-6 text-gray-300 hidden md:block" />

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 text-white flex items-center justify-center shadow-lg relative">
                <Sparkles className="w-6 h-6" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center border border-orange-100 shadow-sm">
                  <span className="text-[10px] font-bold text-orange-600">AI</span>
                </div>
              </div>
              <div>
                <div className="font-bold text-gray-900">Qualification</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">AI Wizard</div>
              </div>
            </div>

            <ArrowRight className="w-6 h-6 text-gray-300 hidden md:block" />

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center shadow-sm">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <div className="font-bold text-gray-900">Value</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Proposal</div>
              </div>
            </div>

            <ArrowRight className="w-6 h-6 text-gray-300 hidden md:block" />

            {/* Step 4 */}
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white border-2 border-green-100 text-green-600 flex items-center justify-center shadow-sm">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <div className="font-bold text-green-700">Conversion</div>
                <div className="text-xs text-green-600 uppercase tracking-wide">Booking</div>
              </div>
            </div>

             <ArrowRight className="w-6 h-6 text-gray-300 hidden md:block" />

            {/* Step 5 */}
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gray-100 text-gray-900 flex items-center justify-center shadow-inner">
                <LayoutDashboard className="w-6 h-6" />
              </div>
              <div>
                <div className="font-bold text-gray-900">Execution</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Dashboard</div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. WORKFLOW EXPANSIONS */}
        <section className="grid lg:grid-cols-3 gap-8">
          
          {/* Shoot Workflow */}
          <div className="bg-white p-8 rounded-3xl border border-gray-200">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-gray-100 rounded-lg"><Camera className="w-5 h-5" /></div>
              <h3 className="font-serif font-bold text-lg">Shoot Workflow</h3>
            </div>
            <div className="flex flex-col gap-4 relative">
              <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-gray-100" />
              
              <div className="flex items-center gap-4 relative z-10">
                <WorkflowNode title="AI Brief" type="start" ai />
              </div>
              <div className="flex items-center gap-4 relative z-10 pl-12">
                 <div className="w-6 h-px bg-gray-300 absolute left-6 top-1/2" />
                 <WorkflowNode title="Shoot Wizard" />
              </div>
              <div className="flex items-center gap-4 relative z-10 pl-12">
                 <div className="w-6 h-px bg-gray-300 absolute left-6 top-1/2" />
                 <WorkflowNode title="Shot List" ai />
              </div>
              <div className="flex items-center gap-4 relative z-10 pl-12">
                 <div className="w-6 h-px bg-gray-300 absolute left-6 top-1/2" />
                 <WorkflowNode title="Gallery" />
              </div>
              <div className="flex items-center gap-4 relative z-10 pl-12">
                 <div className="w-6 h-px bg-gray-300 absolute left-6 top-1/2" />
                 <WorkflowNode title="Delivery" type="end" />
              </div>
            </div>
          </div>

          {/* Event Workflow */}
          <div className="bg-white p-8 rounded-3xl border border-gray-200">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-gray-100 rounded-lg"><Calendar className="w-5 h-5" /></div>
              <h3 className="font-serif font-bold text-lg">Event Workflow</h3>
            </div>
            <div className="flex flex-col gap-4 relative">
              <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-gray-100" />
              
              <div className="flex items-center gap-4 relative z-10">
                <WorkflowNode title="Event Wizard" type="start" ai />
              </div>
              <div className="flex items-center gap-4 relative z-10 pl-12">
                 <div className="w-6 h-px bg-gray-300 absolute left-6 top-1/2" />
                 <WorkflowNode title="Sponsors CRM" ai />
              </div>
              <div className="flex items-center gap-4 relative z-10 pl-12">
                 <div className="w-6 h-px bg-gray-300 absolute left-6 top-1/2" />
                 <WorkflowNode title="Venues" />
              </div>
              <div className="flex items-center gap-4 relative z-10 pl-12">
                 <div className="w-6 h-px bg-gray-300 absolute left-6 top-1/2" />
                 <WorkflowNode title="Command Center" ai />
              </div>
              <div className="flex items-center gap-4 relative z-10 pl-12">
                 <div className="w-6 h-px bg-gray-300 absolute left-6 top-1/2" />
                 <WorkflowNode title="Live Ops" type="end" />
              </div>
            </div>
          </div>

          {/* Website Workflow */}
          <div className="bg-white p-8 rounded-3xl border border-gray-200">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-gray-100 rounded-lg"><Globe className="w-5 h-5" /></div>
              <h3 className="font-serif font-bold text-lg">Website Workflow</h3>
            </div>
            <div className="flex flex-col gap-4 relative">
              <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-gray-100" />
              
              <div className="flex items-center gap-4 relative z-10">
                <WorkflowNode title="Website Wizard" type="start" ai />
              </div>
              <div className="flex items-center gap-4 relative z-10 pl-12">
                 <div className="w-6 h-px bg-gray-300 absolute left-6 top-1/2" />
                 <WorkflowNode title="Sitemap Gen" ai />
              </div>
              <div className="flex items-center gap-4 relative z-10 pl-12">
                 <div className="w-6 h-px bg-gray-300 absolute left-6 top-1/2" />
                 <WorkflowNode title="Design" />
              </div>
              <div className="flex items-center gap-4 relative z-10 pl-12">
                 <div className="w-6 h-px bg-gray-300 absolute left-6 top-1/2" />
                 <WorkflowNode title="Launch" />
              </div>
              <div className="flex items-center gap-4 relative z-10 pl-12">
                 <div className="w-6 h-px bg-gray-300 absolute left-6 top-1/2" />
                 <WorkflowNode title="Analytics" type="end" />
              </div>
            </div>
          </div>
        </section>

        {/* 5. USER JOURNEYS & LEGEND */}
        <section className="bg-gray-900 rounded-3xl p-10 text-white">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-serif mb-6">User Journeys</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-blue-200 text-sm uppercase tracking-wide mb-1">First-Time Brand</div>
                    <div className="text-white/80 flex items-center gap-2 text-sm">
                      Marketing <ArrowRight className="w-3 h-3 text-gray-500" />
                      AI Brief <ArrowRight className="w-3 h-3 text-gray-500" />
                      Proposal <ArrowRight className="w-3 h-3 text-gray-500" />
                      Booking
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-emerald-200 text-sm uppercase tracking-wide mb-1">Returning Client</div>
                    <div className="text-white/80 flex items-center gap-2 text-sm">
                      Dashboard <ArrowRight className="w-3 h-3 text-gray-500" />
                      AI Assistant <ArrowRight className="w-3 h-3 text-gray-500" />
                      New Project
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/30">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-purple-200 text-sm uppercase tracking-wide mb-1">Producer / Power User</div>
                    <div className="text-white/80 flex items-center gap-2 text-sm">
                      Dashboard <ArrowRight className="w-3 h-3 text-gray-500" />
                      Command Center <ArrowRight className="w-3 h-3 text-gray-500" />
                      Live Adjustments
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
              <h3 className="text-lg font-serif mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" /> AI Touchpoints
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-purple-500" /> Brief Generation
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-purple-500" /> Proposal Writing
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-purple-500" /> Cost Estimation
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-purple-500" /> Shot List Creation
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-purple-500" /> Sponsor Matching
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-purple-500" /> Risk Analysis
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-white/10 text-xs text-gray-500 italic">
                "AI assists, user approves."
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}