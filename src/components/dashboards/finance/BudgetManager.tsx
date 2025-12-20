import { useState, useEffect } from "react";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle2, 
  PieChart, 
  ArrowRight,
  Sparkles,
  Plus,
  MoreHorizontal
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "../../ui/card";
import { Progress } from "../../ui/progress";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { useAgentContext } from "../../../lib/ai/AgentContext";
import { cn } from "../../ui/utils";

// --- Types ---

interface BudgetCategory {
  id: string;
  name: string;
  allocated: number;
  actual: number;
  status: 'under' | 'over' | 'on-track';
  riskLevel: 'low' | 'medium' | 'high';
}

// --- Mock Data ---

const initialCategories: BudgetCategory[] = [
  { id: 'venue', name: 'Venue & Logistics', allocated: 50000, actual: 48500, status: 'on-track', riskLevel: 'low' },
  { id: 'production', name: 'Production & AV', allocated: 35000, actual: 38200, status: 'over', riskLevel: 'high' },
  { id: 'talent', name: 'Talent & Casting', allocated: 45000, actual: 42000, status: 'on-track', riskLevel: 'low' },
  { id: 'catering', name: 'Catering & Hospitality', allocated: 15000, actual: 12000, status: 'under', riskLevel: 'low' },
  { id: 'marketing', name: 'Marketing & PR', allocated: 25000, actual: 26500, status: 'over', riskLevel: 'medium' },
];

export function BudgetManager() {
  const { runAnalysis, isAnalyzing, executiveInsight } = useAgentContext();
  const [categories, setCategories] = useState<BudgetCategory[]>(initialCategories);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Derived Metrics
  const totalAllocated = categories.reduce((acc, c) => acc + c.allocated, 0);
  const totalActual = categories.reduce((acc, c) => acc + c.actual, 0);
  const percentUsed = (totalActual / totalAllocated) * 100;

  // Simulate AI Analysis on Mount
  useEffect(() => {
    // In a real app, we would pass the real budget data here
    runAnalysis({
      event: { id: 'evt-1', name: 'NYFW SS25' } as any,
      tasks: [],
      phases: [],
      sponsors: [],
      budget: [], // Map categories here
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-6 lg:p-8 font-sans text-gray-900">
      
      {/* Header & AI Status */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
              <span>Finance</span>
              <span className="text-gray-300">/</span>
              <span className="text-gray-900">Budget Manager</span>
            </div>
            <h1 className="text-3xl font-serif font-medium text-gray-900">Event Budget</h1>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" className="bg-white">
              <DownloadIcon className="w-4 h-4 mr-2" /> Export
            </Button>
            <Button className="bg-gray-900 text-white">
              <Plus className="w-4 h-4 mr-2" /> Add Expense
            </Button>
          </div>
        </div>

        {/* AI Insight Banner */}
        <AnimatePresence>
          {executiveInsight && executiveInsight.type === 'alert' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white border border-amber-100 rounded-xl p-6 shadow-sm mb-8 flex items-start gap-4 relative overflow-hidden"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500" />
              <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center shrink-0 text-amber-600">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-medium text-lg text-gray-900 mb-1">
                  Budget Guardian Alert
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {executiveInsight.executive_summary}. {executiveInsight.why_now}
                </p>
                <Button size="sm" variant="outline" className="text-amber-700 border-amber-200 hover:bg-amber-50">
                  View Recommendations <ArrowRight className="w-3 h-3 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <MetricCard 
            title="Total Budget" 
            value={formatCurrency(totalAllocated)} 
            icon={DollarSign}
            trend="Fixed"
          />
          <MetricCard 
            title="Actual Spend" 
            value={formatCurrency(totalActual)} 
            icon={TrendingUp}
            trend={`${percentUsed.toFixed(1)}% used`}
            trendColor={percentUsed > 100 ? 'text-red-600' : 'text-emerald-600'}
          />
          <MetricCard 
            title="Remaining" 
            value={formatCurrency(totalAllocated - totalActual)} 
            icon={PieChart}
            trend="Available"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main List */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-gray-100 shadow-sm">
              <CardHeader>
                <CardTitle className="font-serif text-xl">Budget Categories</CardTitle>
                <CardDescription>Breakdown of expenses by department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {categories.map((cat) => (
                    <div 
                      key={cat.id} 
                      className={cn(
                        "group p-4 rounded-xl border border-transparent hover:border-gray-100 hover:bg-gray-50 transition-all cursor-pointer",
                        selectedCategory === cat.id ? "bg-gray-50 border-gray-200" : ""
                      )}
                      onClick={() => setSelectedCategory(cat.id)}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-2 h-2 rounded-full",
                            cat.status === 'over' ? "bg-red-500" :
                            cat.status === 'under' ? "bg-emerald-500" : "bg-gray-300"
                          )} />
                          <span className="font-medium text-gray-900">{cat.name}</span>
                        </div>
                        <span className="font-mono text-sm text-gray-600">{formatCurrency(cat.actual)}</span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="relative h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={cn(
                            "absolute top-0 left-0 h-full rounded-full transition-all duration-500",
                            cat.status === 'over' ? "bg-red-500" : "bg-gray-900"
                          )}
                          style={{ width: `${Math.min((cat.actual / cat.allocated) * 100, 100)}%` }}
                        />
                      </div>
                      
                      <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
                        <span>{((cat.actual / cat.allocated) * 100).toFixed(0)}% used</span>
                        <span>{formatCurrency(cat.allocated)} budget</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar / Detail View */}
          <div className="space-y-6">
            <Card className="border-gray-100 shadow-sm bg-gradient-to-b from-white to-gray-50/50">
               <CardHeader>
                 <div className="flex items-center gap-2">
                   <Sparkles className="w-4 h-4 text-indigo-500" />
                   <CardTitle className="font-serif text-lg">AI Analysis</CardTitle>
                 </div>
               </CardHeader>
               <CardContent className="space-y-4">
                 {isAnalyzing ? (
                   <div className="flex items-center gap-2 text-sm text-gray-500 animate-pulse">
                     <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                     Analyzing spend patterns...
                   </div>
                 ) : (
                   <>
                     <div className="p-3 bg-white rounded-lg border border-gray-100 shadow-sm text-sm">
                       <p className="text-gray-600 mb-2">
                         <strong className="text-gray-900">Observation:</strong> Production costs are trending 10% higher than projected due to last-minute AV changes.
                       </p>
                       <p className="text-gray-600">
                         <strong className="text-gray-900">Recommendation:</strong> Reallocate $2,500 from the Catering buffer to cover the difference without impacting the bottom line.
                       </p>
                     </div>

                     <Button className="w-full bg-white border border-gray-200 text-gray-900 hover:bg-gray-50">
                        Apply Reallocation
                     </Button>
                   </>
                 )}
               </CardContent>
            </Card>
            
            <Card className="border-gray-100 shadow-sm">
              <CardHeader>
                <CardTitle className="font-serif text-lg">Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1,2,3].map(i => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                          <DollarSign className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">Vendor Payment</div>
                          <div className="text-xs text-gray-400">Oct 24 • Wire</div>
                        </div>
                      </div>
                      <div className="font-medium text-gray-900">-$1,250</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon: Icon, trend, trendColor = 'text-gray-500' }: any) {
  return (
    <Card className="border-gray-100 shadow-sm relative overflow-hidden">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
            <h3 className="text-3xl font-serif font-medium text-gray-900">{value}</h3>
          </div>
          <div className="p-2 bg-gray-50 rounded-lg text-gray-900">
            <Icon className="w-5 h-5" />
          </div>
        </div>
        <div className={cn("text-xs font-medium flex items-center gap-1", trendColor)}>
          {trend}
        </div>
      </CardContent>
    </Card>
  );
}

function DownloadIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  )
}

function formatCurrency(val: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(val);
}
