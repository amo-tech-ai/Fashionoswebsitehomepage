import React, { useState, useEffect } from 'react';
import { Globe, Instagram, ShoppingBag, ArrowRight, Link } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import { useBrandShoot } from '../../context/BrandShootContext';

interface BrandSignalCaptureProps {
  onNavigate: (screen: string) => void;
}

export function BrandSignalCapture({ onNavigate }: BrandSignalCaptureProps) {
  const { signals, setSignals } = useBrandShoot();
  const [website, setWebsite] = useState(signals.website);
  const [instagram, setInstagram] = useState(signals.instagram);
  const [commerce, setCommerce] = useState(signals.commerce);

  // Sync local state back to global if user navigates back
  useEffect(() => {
    setWebsite(signals.website);
    setInstagram(signals.instagram);
    setCommerce(signals.commerce);
  }, []);

  const handleAnalysisStart = () => {
    setSignals({ website, instagram, commerce });
    onNavigate('ai-thinking');
  };

  return (
    <div className="min-h-screen bg-[#FDFBF9] flex flex-col items-center justify-center p-4">
      <div className="max-w-xl w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="font-serif text-3xl md:text-4xl text-gray-900 tracking-tight">
            Connect Brand Signals
          </h1>
          <p className="text-gray-500 font-sans text-sm md:text-base max-w-sm mx-auto">
            We extract color palettes, font pairings, and product details automatically.
          </p>
        </div>

        {/* Signal Sources Card */}
        <Card className="bg-white border-0 shadow-xl shadow-black/5 p-8 rounded-3xl space-y-6">
          
          {/* Website Signal */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider pl-1">
              Website Structure
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Globe className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
              </div>
              <Input
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://yourbrand.com"
                className="pl-12 h-14 bg-gray-50 border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-sans text-base"
              />
            </div>
          </div>

          {/* Social Signal */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider pl-1">
              Visual Analysis
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Instagram className="h-5 w-5 text-gray-400 group-focus-within:text-pink-600 transition-colors" />
              </div>
              <Input
                type="text"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                placeholder="@instagram_handle"
                className="pl-12 h-14 bg-gray-50 border-gray-100 rounded-xl focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all font-sans text-base"
              />
            </div>
          </div>

          {/* Commerce Signal */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider pl-1">
              Product Parsing
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <ShoppingBag className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-600 transition-colors" />
              </div>
              <Input
                type="text"
                value={commerce}
                onChange={(e) => setCommerce(e.target.value)}
                placeholder="Shopify or Amazon URL"
                className="pl-12 h-14 bg-gray-50 border-gray-100 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-sans text-base"
              />
            </div>
          </div>

        </Card>

        {/* Action Area */}
        <div className="space-y-4">
          <Button 
            onClick={handleAnalysisStart}
            disabled={!website && !instagram && !commerce}
            className="w-full h-14 bg-gray-900 hover:bg-black text-white rounded-full font-medium text-lg shadow-xl shadow-gray-900/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-[1.01]"
          >
            Start Signal Analysis
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          
          <div className="flex items-center justify-center gap-2 text-xs text-gray-400 font-sans">
            <Link className="w-3 h-3" />
            <span>Secure connection via Gemini 3 Pro</span>
          </div>
        </div>

      </div>
    </div>
  );
}
