import React, { useState, useEffect } from 'react';
import { Globe, Instagram, ShoppingBag, ArrowRight, Link, Upload, X, FileImage, Image as ImageIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import { useBrandShoot } from '../../context/BrandShootContext';
import { motion, AnimatePresence } from 'motion/react';

interface BrandSignalCaptureProps {
  onNavigate: (screen: string) => void;
}

export function BrandSignalCapture({ onNavigate }: BrandSignalCaptureProps) {
  const { signals, setSignals } = useBrandShoot();
  const [website, setWebsite] = useState(signals.website);
  const [instagram, setInstagram] = useState(signals.instagram);
  const [commerce, setCommerce] = useState(signals.commerce);
  const [files, setFiles] = useState<{ name: string; type: string; url: string }[]>(signals.files || []);
  const [isDragging, setIsDragging] = useState(false);

  // Sync local state back to global if user navigates back
  useEffect(() => {
    setWebsite(signals.website);
    setInstagram(signals.instagram);
    setCommerce(signals.commerce);
    if (signals.files) setFiles(signals.files);
  }, []);

  const handleAnalysisStart = () => {
    setSignals({ website, instagram, commerce, files });
    onNavigate('ai-thinking');
  };

  // Helper: Resize and convert to Base64
  const processFile = (file: File): Promise<{ name: string; type: string; url: string }> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          // Max dimension 800px to save localStorage space
          const MAX_SIZE = 800;
          if (width > height) {
            if (width > MAX_SIZE) {
              height *= MAX_SIZE / width;
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width *= MAX_SIZE / height;
              height = MAX_SIZE;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          
          // Compress to JPEG 0.7
          const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
          resolve({
            name: file.name,
            type: 'image/jpeg',
            url: dataUrl
          });
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
       const processedFiles = await Promise.all(
         Array.from(e.target.files).map(processFile)
       );
       setFiles(prev => [...prev, ...processedFiles]);
    }
  };

  const removeFile = (index: number) => {
      setFiles(files.filter((_, i) => i !== index));
  };

  const handlePaste = async (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    const imageFiles: File[] = [];
    
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        if (file) imageFiles.push(file);
      }
    }

    if (imageFiles.length > 0) {
      const processedFiles = await Promise.all(imageFiles.map(processFile));
      setFiles(prev => [...prev, ...processedFiles]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const imageFiles = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
      const processedFiles = await Promise.all(imageFiles.map(processFile));
      setFiles(prev => [...prev, ...processedFiles]);
    }
  };

  return (
    <div 
      className="min-h-screen bg-[#FDFBF9] flex flex-col items-center justify-center p-4"
      onPaste={handlePaste}
    >
      <div className="max-w-2xl w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 my-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="font-serif text-3xl md:text-4xl text-gray-900 tracking-tight">
            Connect Brand Signals
          </h1>
          <p className="text-gray-500 font-sans text-sm md:text-base max-w-sm mx-auto">
            We extract color palettes, font pairings, and product details automatically.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
            {/* Signal Sources Card */}
            <Card className="bg-white border-0 shadow-xl shadow-black/5 p-6 rounded-3xl space-y-5 h-full">
              <h3 className="font-serif text-lg text-gray-900">Digital Touchpoints</h3>
              
              {/* Website Signal */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider pl-1">
                  Website
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Globe className="h-4 w-4 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                  </div>
                  <Input
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://yourbrand.com"
                    className="pl-10 h-12 bg-gray-50 border-gray-100 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-sans text-sm"
                  />
                </div>
              </div>

              {/* Social Signal */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider pl-1">
                  Social Media
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Instagram className="h-4 w-4 text-gray-400 group-focus-within:text-pink-600 transition-colors" />
                  </div>
                  <Input
                    type="text"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    placeholder="@instagram_handle"
                    className="pl-10 h-12 bg-gray-50 border-gray-100 rounded-xl focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all font-sans text-sm"
                  />
                </div>
              </div>

              {/* Commerce Signal */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider pl-1">
                  Commerce
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <ShoppingBag className="h-4 w-4 text-gray-400 group-focus-within:text-emerald-600 transition-colors" />
                  </div>
                  <Input
                    type="text"
                    value={commerce}
                    onChange={(e) => setCommerce(e.target.value)}
                    placeholder="Shopify URL"
                    className="pl-10 h-12 bg-gray-50 border-gray-100 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-sans text-sm"
                  />
                </div>
              </div>
            </Card>

            {/* Visual Assets Upload */}
            <Card className="bg-white border-0 shadow-xl shadow-black/5 p-6 rounded-3xl h-full flex flex-col">
                 <div className="flex justify-between items-center mb-4">
                    <h3 className="font-serif text-lg text-gray-900">Visual Assets</h3>
                    <span className="text-xs text-gray-400">{files.length} uploaded</span>
                 </div>
                 
                 {files.length > 0 ? (
                    <div className="flex-1 overflow-y-auto max-h-[300px] mb-4 space-y-2 pr-2 scrollbar-thin scrollbar-thumb-gray-200">
                        <AnimatePresence>
                            {files.map((file, i) => (
                                <motion.div 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    key={i} 
                                    className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg group"
                                >
                                    <div className="w-10 h-10 rounded-md overflow-hidden bg-white shrink-0 border border-gray-100">
                                        <img src={file.url} alt="Preview" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-medium text-gray-900 truncate">{file.name}</p>
                                        <p className="text-[10px] text-gray-400 uppercase">{file.type.split('/')[1]}</p>
                                    </div>
                                    <button 
                                        onClick={() => removeFile(i)}
                                        className="p-1 hover:bg-gray-200 rounded-full text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                 ) : (
                    <div 
                        className={`flex-1 border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-6 text-center transition-all ${
                            isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                        }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-3 text-gray-400">
                            <ImageIcon className="w-5 h-5" />
                        </div>
                        <p className="text-sm font-medium text-gray-900">Drop moodboard images</p>
                        <p className="text-xs text-gray-400 mt-1">or click to browse</p>
                    </div>
                 )}

                 <div className="mt-auto pt-4 relative">
                    <input 
                        type="file" 
                        accept="image/*" 
                        multiple 
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <Button variant="outline" className="w-full bg-white border-gray-200 text-gray-700 hover:bg-gray-50">
                        <Upload className="w-4 h-4 mr-2" />
                        {files.length > 0 ? 'Add More Images' : 'Upload Files'}
                    </Button>
                 </div>
            </Card>
        </div>

        {/* Action Area */}
        <div className="space-y-4 pt-4">
          <Button 
            onClick={handleAnalysisStart}
            disabled={!website && !instagram && !commerce && files.length === 0}
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
