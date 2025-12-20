import { useState } from "react";
import { 
  FileText, 
  Search, 
  Filter, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  MoreHorizontal,
  Sparkles,
  Upload,
  ArrowRight,
  Download,
  Eye,
  Trash2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Badge } from "../../ui/badge";
import { Card } from "../../ui/card";
import { useAgentContext } from "../../../lib/ai/AgentContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../../ui/dialog";
import { FileUpload } from "../../shared/UploadStates";
import { toast } from "sonner";

interface ContractDoc {
  id: string;
  title: string;
  party: string;
  type: string;
  status: 'Draft' | 'Review' | 'Signed';
  riskScore: number; // 0-100
  lastModified: string;
}

const mockDocs: ContractDoc[] = [
  { id: '1', title: 'Sponsorship Agreement - Chanel', party: 'Chanel Inc.', type: 'Sponsorship', status: 'Review', riskScore: 65, lastModified: '2 hours ago' },
  { id: '2', title: 'Venue Rental - The Shed', party: 'Hudson Yards', type: 'Venue', status: 'Draft', riskScore: 82, lastModified: '1 day ago' },
  { id: '3', title: 'Model Agency Master Service', party: 'Elite Models', type: 'Talent', status: 'Signed', riskScore: 12, lastModified: '3 days ago' },
];

export function ContractAnalyzer() {
  const [analyzingId, setAnalyzingId] = useState<string | null>(null);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [contracts, setContracts] = useState<ContractDoc[]>(mockDocs);
  const [selectedContract, setSelectedContract] = useState<ContractDoc | null>(null);
  
  const handleAnalyze = (id: string) => {
    setAnalyzingId(id);
    
    // Simulate AI analysis with Gemini
    setTimeout(() => {
      const contract = contracts.find(c => c.id === id);
      if (contract) {
        setSelectedContract(contract);
        toast.success(`AI Analysis complete for ${contract.title}`);
      }
      setAnalyzingId(null);
    }, 2500);
  };

  const handleUploadComplete = (results: Array<{ file: File; url: string | null; path: string }>) => {
    // Convert uploaded contracts to ContractDoc format
    const newContracts: ContractDoc[] = results
      .filter(r => r.url)
      .map((r, index) => ({
        id: `uploaded-${Date.now()}-${index}`,
        title: r.file.name.replace(/\.(pdf|docx)$/i, ''),
        party: 'To Be Determined',
        type: 'Pending Classification',
        status: 'Draft' as const,
        riskScore: 0,
        lastModified: 'Just now',
      }));

    setContracts(prev => [...newContracts, ...prev]);
    setIsUploadDialogOpen(false);
    
    toast.success(`${newContracts.length} contract(s) uploaded successfully`);
    
    // Auto-analyze first uploaded contract
    if (newContracts.length > 0) {
      setTimeout(() => handleAnalyze(newContracts[0].id), 500);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-6 lg:p-8 font-sans text-gray-900">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
              <span>Finance</span>
              <span className="text-gray-300">/</span>
              <span className="text-gray-900">Contracts</span>
            </div>
            <h1 className="text-3xl font-serif font-medium text-gray-900">Contract Intelligence</h1>
          </div>
          <div className="flex gap-3">
             <Button className="bg-gray-900 text-white" onClick={() => setIsUploadDialogOpen(true)}>
               <Upload className="w-4 h-4 mr-2" /> Upload Contract
             </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Document List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-4 bg-white p-2 rounded-xl border border-gray-200 shadow-sm mb-4">
            <Search className="w-4 h-4 text-gray-400 ml-2" />
            <Input className="border-none shadow-none focus-visible:ring-0" placeholder="Search contracts..." />
            <Button variant="ghost" size="sm"><Filter className="w-4 h-4" /></Button>
          </div>

          {contracts.map((doc) => (
            <div key={doc.id} className="bg-white p-5 rounded-xl border border-gray-100 hover:border-gray-300 transition-all shadow-sm flex items-center justify-between group">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-50 rounded-lg text-gray-500 group-hover:bg-gray-900 group-hover:text-white transition-colors">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{doc.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <span>{doc.party}</span>
                    <span className="text-gray-300">•</span>
                    <span>{doc.type}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                   <Badge variant={doc.status === 'Signed' ? 'default' : 'outline'} className={doc.status === 'Signed' ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-emerald-200' : ''}>
                     {doc.status}
                   </Badge>
                   <div className="text-xs text-gray-400 mt-1">{doc.lastModified}</div>
                </div>
                
                <Button 
                  size="sm" 
                  variant={analyzingId === doc.id ? "secondary" : "outline"}
                  onClick={() => handleAnalyze(doc.id)}
                  disabled={analyzingId === doc.id}
                  className="w-32"
                >
                  {analyzingId === doc.id ? (
                    <><Sparkles className="w-3 h-3 mr-2 animate-spin" /> Analyzing</>
                  ) : (
                    "Analyze Risk"
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* AI Insight Panel (Sticky) */}
        <div className="space-y-6">
          <Card className="border-indigo-100 bg-gradient-to-br from-white to-indigo-50/30 sticky top-8">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4 text-indigo-900 font-medium font-serif">
                <Sparkles className="w-5 h-5 text-indigo-500" />
                Latest Risk Analysis
              </div>
              
              <div className="bg-white/60 p-4 rounded-xl border border-indigo-100 mb-4">
                 <div className="flex items-center justify-between mb-2">
                   <span className="text-sm font-medium text-gray-600">Venue Rental - The Shed</span>
                   <Badge variant="destructive" className="bg-red-50 text-red-700 border-red-100">High Risk (82)</Badge>
                 </div>
                 <p className="text-sm text-gray-600 leading-relaxed">
                   Force Majeure clause is missing standard pandemic coverage. Cancellation penalty (100%) triggers 90 days out, which conflicts with our sponsorship liquidity timeline.
                 </p>
              </div>

              <Button className="w-full bg-indigo-900 text-white hover:bg-indigo-800">
                View Full Report <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>
        </div>

      </div>

      {/* Upload Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Upload Contracts for AI Analysis</DialogTitle>
            <DialogDescription>
              Upload PDF or DOCX contracts. Our AI will automatically analyze them for risks, missing clauses, and compliance issues.
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-4">
            <FileUpload
              onUpload={async (files: File[]) => {
                // Required handler
              }}
              onUploadComplete={handleUploadComplete}
              bucket="contracts"
              folder="legal-documents"
              acceptedTypes={['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']}
              maxSize={20 * 1024 * 1024} // 20MB
              multiple={true}
              maxFiles={10}
              mode="list"
              autoCompress={false}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}