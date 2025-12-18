import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

interface BrandShootStartProps {
  onNavigate: (screen: string) => void;
}

export function BrandShootStart({ onNavigate }: BrandShootStartProps) {
  return (
    <div className="min-h-screen bg-[#FDFBF9] flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 animate-in fade-in zoom-in duration-500">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="font-serif text-3xl font-medium text-gray-900 tracking-tight">
            Plan Your Campaign
          </h1>
          <p className="text-gray-500 font-sans text-sm">
            Choose how you'd like to build your production strategy.
          </p>
        </div>

        {/* Primary AI Card */}
        <Card className="relative overflow-hidden border-0 shadow-xl shadow-black/5 bg-white p-6 sm:p-8 hover:shadow-2xl hover:shadow-black/10 transition-all duration-300 group">
          
          {/* Badge */}
          <div className="absolute top-6 right-6">
            <Badge className="bg-black/5 text-black hover:bg-black/10 border-0 font-medium px-3 py-1 font-sans text-xs uppercase tracking-wider">
              Recommended
            </Badge>
          </div>

          <div className="space-y-6">
            {/* Icon */}
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-indigo-600" />
            </div>

            <div className="space-y-3">
              <h2 className="font-serif text-2xl text-gray-900">
                AI Creative Partner
              </h2>
              <p className="text-gray-500 leading-relaxed text-sm font-sans">
                We analyze your brand, products, and channels to generate a sales-focused content plan tailored to your audience.
              </p>
            </div>

            <Button 
              onClick={() => onNavigate('brand-signal-capture')}
              className="w-full h-12 bg-gray-900 hover:bg-black text-white rounded-full font-medium flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-300 shadow-lg shadow-gray-900/20"
            >
              Continue with AI
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>

        {/* Secondary Manual Option */}
        <div className="text-center">
          <button 
            onClick={() => onNavigate('wizard')} // Routes to existing manual wizard
            className="text-gray-400 text-sm hover:text-gray-600 transition-colors underline-offset-4 hover:underline font-sans"
          >
            Use manual setup
          </button>
        </div>

      </div>
    </div>
  );
}
