import { 
  ArrowLeft, 
  ShoppingBag, 
  Plus 
} from 'lucide-react';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';

interface ShotListHeaderProps {
  onBack?: () => void;
  totalShots: number;
  totalPrice: number;
  onAddProduct: () => void;
  onAddShot: () => void;
}

export function ShotListHeader({ 
  onBack, 
  totalShots, 
  totalPrice, 
  onAddProduct, 
  onAddShot 
}: ShotListHeaderProps) {
  return (
    <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100/50">
      <div className="max-w-[1600px] mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
         
         <div className="flex items-center gap-4">
            {onBack && (
                <Button variant="ghost" size="icon" onClick={onBack} className="-ml-2 hover:bg-black/5 rounded-full">
                   <ArrowLeft className="w-5 h-5 text-gray-500" />
                </Button>
            )}
            <div>
               <div className="flex items-center gap-3 mb-0.5">
                  <h1 className="font-serif text-xl text-[#111111]">Shot List Builder</h1>
                  <Badge variant="secondary" className="bg-[#F4F4F5] text-[#111111] font-medium tracking-wide text-[10px] uppercase px-2.5 py-0.5 rounded-full border-0">
                      Drafting
                  </Badge>
               </div>
               <p className="text-xs text-gray-500 font-medium">Production Control • {totalShots} Shots Planned</p>
            </div>
         </div>

         <div className="flex items-center gap-3">
            <div className="hidden md:flex flex-col items-end mr-4">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Est. Budget</span>
                <span className="text-sm font-serif font-medium text-[#111111]">${totalPrice.toLocaleString()}</span>
            </div>
            <div className="h-8 w-px bg-gray-200 hidden md:block mr-2" />
            
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-white border-gray-200 text-[#111111] hover:bg-gray-50 rounded-xl px-4 h-10 text-xs font-bold gap-2"
              onClick={onAddProduct}
            >
               <ShoppingBag className="w-4 h-4" />
               Add Product
            </Button>
            
            <Button 
              className="bg-[#111111] text-white hover:bg-black rounded-xl px-5 h-10 text-xs font-bold shadow-lg shadow-black/10 gap-2"
              onClick={onAddShot}
            >
               <Plus className="w-4 h-4" />
               Add Custom Shot
            </Button>
         </div>
      </div>
    </div>
  );
}
