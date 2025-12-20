import { 
  Search, 
  Plus 
} from 'lucide-react';
import { Badge } from '../../ui/badge';
import { ImageWithFallback } from '../../figma/ImageWithFallback';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '../../ui/sheet';

interface ProductPickerSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  products: any[];
  onSelectProduct: (product: any) => void;
}

export function ProductPickerSheet({ 
  isOpen, 
  onOpenChange, 
  products, 
  onSelectProduct 
}: ProductPickerSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
       <SheetContent side="right" className="w-full sm:max-w-md p-0 border-l border-gray-100">
           <div className="h-full flex flex-col bg-[#FAFAFA]">
               <SheetHeader className="p-8 pb-4 bg-white border-b border-gray-100">
                   <SheetTitle className="font-serif text-2xl">Select Product</SheetTitle>
                   <SheetDescription>Choose a product to create a hero shot.</SheetDescription>
                   <div className="relative mt-4">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                          type="text" 
                          placeholder="Search catalog..." 
                          className="w-full pl-10 pr-4 py-3 bg-[#F8F5F1] rounded-xl text-sm border-transparent focus:bg-white focus:ring-2 focus:ring-[#111111]/10 transition-all outline-none"
                      />
                   </div>
               </SheetHeader>
               
               <div className="flex-1 overflow-y-auto p-6 space-y-4">
                   {products.map(product => (
                       <div 
                          key={product.id}
                          onClick={() => onSelectProduct(product)}
                          className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:border-gray-300 cursor-pointer group flex items-center gap-4 transition-all"
                       >
                          <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden shrink-0">
                              <ImageWithFallback src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                          </div>
                          <div className="flex-1">
                              <div className="flex justify-between items-start">
                                  <h4 className="font-medium text-[#111111]">{product.name}</h4>
                                  <Badge variant="secondary" className="text-[10px] bg-gray-50 text-gray-500">{product.category}</Badge>
                              </div>
                              <p className="text-xs text-gray-400 mt-1">Available for shoot</p>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#111111] group-hover:text-white transition-colors">
                              <Plus className="w-4 h-4" />
                          </div>
                       </div>
                   ))}
               </div>
           </div>
       </SheetContent>
    </Sheet>
  );
}
