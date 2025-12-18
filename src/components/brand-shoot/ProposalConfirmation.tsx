import React from 'react';
import { CheckCircle2, Calendar, FileText, ArrowRight, Camera } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Separator } from '../ui/separator';
import { useBrandShoot } from '../../context/BrandShootContext';

interface ProposalConfirmationProps {
  onNavigate: (screen: string) => void;
}

export function ProposalConfirmation({ onNavigate }: ProposalConfirmationProps) {
  const { campaignPlan, launchCampaign } = useBrandShoot();

  if (!campaignPlan) return <div>Loading...</div>;
  const { strategy, pricing, channelPacks, shots } = campaignPlan;
  
  // Calculate total assets from channel packs if available, otherwise fallback to legacy shots
  const totalAssets = channelPacks && channelPacks.length > 0 
    ? channelPacks.reduce((acc, pack) => acc + pack.outputCount, 0)
    : shots.reduce((acc, shot) => acc + shot.qty, 0);

  const handleConfirm = () => {
    launchCampaign();
    onNavigate('overview');
  };

  return (
    <div className="min-h-screen bg-[#FDFBF9] flex flex-col items-center justify-center p-6">
      
      <div className="max-w-lg w-full space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="font-serif text-3xl font-medium text-gray-900">Proposal Ready</h1>
          <p className="text-gray-500 font-sans">
            Your campaign strategy has been finalized and is ready for launch.
          </p>
        </div>

        <Card className="border-0 shadow-xl shadow-black/5 overflow-hidden">
          <CardContent className="p-0">
            {/* Summary Header */}
            <div className="bg-gray-50 p-6 border-b border-gray-100">
               <div className="flex justify-between items-center mb-1">
                 <h3 className="font-medium text-gray-900">{strategy.title}</h3>
                 <span className="text-sm font-bold text-gray-900">${pricing.total.toLocaleString()}</span>
               </div>
               <p className="text-xs text-gray-500">Includes {totalAssets} Assets • Full Production</p>
            </div>

            {/* Line Items */}
            <div className="p-6 space-y-4">
              <div className="flex items-start gap-4">
                 <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
                 <div>
                   <p className="text-sm font-medium text-gray-900">Creative Strategy</p>
                   <p className="text-xs text-gray-500">AI-generated moodboards & shot list</p>
                 </div>
              </div>
              <div className="flex items-start gap-4">
                 <Camera className="w-5 h-5 text-gray-400 mt-0.5" />
                 <div>
                   <p className="text-sm font-medium text-gray-900">Photography & Video</p>
                   <p className="text-xs text-gray-500">1 Day Studio • 1 Model • 2 Stylists</p>
                 </div>
              </div>
              <div className="flex items-start gap-4">
                 <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                 <div>
                   <p className="text-sm font-medium text-gray-900">Timeline</p>
                   <p className="text-xs text-gray-500">Kickoff: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} • Final Delivery: {new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                 </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="p-6 bg-gray-50/50">
               <div className="flex justify-between items-center text-sm">
                 <span className="text-gray-500">Estimated Deposit</span>
                 <span className="font-medium text-gray-900">${pricing.deposit.toLocaleString()} (50%)</span>
               </div>
            </div>

          </CardContent>
        </Card>

        <div className="space-y-3">
          <Button 
            onClick={handleConfirm}
            className="w-full h-12 bg-gray-900 hover:bg-black text-white rounded-xl font-medium shadow-lg shadow-gray-900/20"
          >
            Confirm & Launch Campaign
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button 
            onClick={() => onNavigate('campaign-summary')}
            variant="ghost" 
            className="w-full text-gray-500 hover:text-gray-900"
          >
            Edit Plan
          </Button>
        </div>

      </div>
    </div>
  );
}
