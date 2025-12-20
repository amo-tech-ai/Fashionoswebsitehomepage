import { useState } from "react";
import { 
  Search, 
  Sparkles, 
  User, 
  Linkedin, 
  Globe, 
  Check, 
  X,
  Loader2,
  Building2,
  Briefcase
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Card } from "../../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Badge } from "../../ui/badge";

interface EnrichedContact {
  name: string;
  title: string;
  company: string;
  bio: string;
  image: string;
  role: string;
  social: {
    linkedin?: string;
    website?: string;
  };
  tags: string[];
}

export function SmartContactInput() {
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<EnrichedContact | null>(null);

  const handleAnalyze = async () => {
    if (!url) return;
    
    setIsAnalyzing(true);
    setResult(null);

    // Mock AI Analysis Delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock Result
    setResult({
      name: "Victoria Beckham",
      title: "Creative Director",
      company: "Victoria Beckham Label",
      bio: "Fashion designer and singer. Known for her eponymous label focusing on modern luxury and refined silhouettes. Recently expanded into beauty and skincare.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
      role: "Designer / VIP",
      social: {
        linkedin: "linkedin.com/in/victoriabeckham",
        website: "victoriabeckham.com"
      },
      tags: ["Luxury", "British Fashion", "Sustainability Focus"]
    });

    setIsAnalyzing(false);
  };

  const handleSave = () => {
    // In a real app, this would save to the DB
    setUrl("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Input Card */}
      <Card className="p-1 relative overflow-hidden border-zinc-200 shadow-sm bg-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-2 p-1">
          <div className="w-10 h-10 rounded-full bg-zinc-50 flex items-center justify-center shrink-0">
             {isAnalyzing ? (
               <Loader2 className="w-5 h-5 text-zinc-400 animate-spin" />
             ) : (
               <Search className="w-5 h-5 text-zinc-400" />
             )}
          </div>
          
          <Input 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste LinkedIn URL, Website, or Email to enrich..." 
            className="border-none shadow-none focus-visible:ring-0 text-base h-12 bg-transparent"
            onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
          />

          <Button 
            onClick={handleAnalyze}
            disabled={!url || isAnalyzing}
            className="bg-zinc-900 text-white hover:bg-zinc-800 rounded-full px-6"
          >
            {isAnalyzing ? "Researching..." : "Enrich"}
            {!isAnalyzing && <Sparkles className="w-4 h-4 ml-2" />}
          </Button>
        </div>
        
        {/* Progress Bar for Analysis */}
        {isAnalyzing && (
          <motion.div 
            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-emerald-400 to-blue-500"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2 }}
          />
        )}
      </Card>

      {/* Result Preview - The "Ghost Card" */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Card className="overflow-hidden border-zinc-200 shadow-lg">
              {/* Header with Cover Image Mock */}
              <div className="h-32 bg-zinc-100 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
              </div>

              <div className="px-6 pb-6 relative">
                {/* Avatar */}
                <div className="absolute -top-12 left-6">
                  <Avatar className="w-24 h-24 border-4 border-white shadow-sm">
                    <AvatarImage src={result.image} />
                    <AvatarFallback>{result.name[0]}</AvatarFallback>
                  </Avatar>
                </div>

                {/* Actions */}
                <div className="flex justify-end pt-4 gap-2">
                   <Button variant="outline" size="sm" onClick={() => setResult(null)}>
                     Edit Manually
                   </Button>
                   <Button size="sm" onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                     <Check className="w-4 h-4 mr-2" />
                     Confirm & Save
                   </Button>
                </div>

                {/* Profile Info */}
                <div className="mt-4 space-y-4">
                  <div>
                    <h3 className="text-2xl font-serif font-medium">{result.name}</h3>
                    <div className="flex items-center gap-2 text-zinc-500 mt-1">
                      <Briefcase className="w-4 h-4" />
                      <span>{result.title}</span>
                      <span className="text-zinc-300">•</span>
                      <Building2 className="w-4 h-4" />
                      <span>{result.company}</span>
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="bg-zinc-50 p-4 rounded-lg text-sm text-zinc-600 leading-relaxed border border-zinc-100">
                    <div className="flex items-center gap-2 mb-2 text-zinc-900 font-medium">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      AI Summary
                    </div>
                    {result.bio}
                  </div>

                  {/* Tags & Links */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex gap-2">
                      {result.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="bg-zinc-100 text-zinc-600 hover:bg-zinc-200">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex gap-3 text-zinc-400">
                      {result.social.linkedin && <Linkedin className="w-5 h-5 hover:text-[#0077b5] cursor-pointer transition-colors" />}
                      {result.social.website && <Globe className="w-5 h-5 hover:text-black cursor-pointer transition-colors" />}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
