import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Send, 
  X, 
  ChevronRight, 
  Command,
  Maximize2,
  Minimize2,
  ArrowRight,
  Copy,
  Check,
  FileText,
  Calendar
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface AIAssistantProps {
  onNavigate: (screen: string) => void;
  currentScreen: string;
}

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  type?: "text" | "action" | "navigation" | "generated-content";
  actionLabel?: string;
  actionTarget?: string;
  timestamp: Date;
  metadata?: {
    contentType?: "email" | "plan" | "list";
    title?: string;
  };
}

export function AIAssistant({ onNavigate, currentScreen }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeAgent, setActiveAgent] = useState<"Navigator" | "Planner" | "Writer" | "Analyst">("Navigator");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "ai",
      content: "I am FashionOS Intelligence. How can I assist with your production today?",
      type: "text",
      timestamp: new Date()
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isTyping]);

  // --- Mock Content Generators ---

  const generateEmail = async (topic: string) => {
    const subject = `Subject: Regarding ${topic}`;
    const body = `Dear Team,\n\nI wanted to touch base regarding the upcoming ${topic}. We have successfully secured the initial requirements and are moving into the execution phase.\n\nPlease review the attached documentation and let me know if there are any immediate concerns regarding the timeline or budget.\n\nBest regards,\n[Your Name]`;
    return { subject, body };
  };

  const generatePlan = async (topic: string) => {
    return `**Run of Show: ${topic}**\n\n09:00 AM - Call Time (Crew)\n10:00 AM - Model Arrival & H/M\n11:30 AM - Lighting Check\n12:00 PM - Lunch Break\n01:00 PM - First Look (Runway)\n03:00 PM - Content Capture\n05:00 PM - Wrap`;
  };

  const simulateStreaming = async (fullText: string, msgId: string) => {
    const words = fullText.split(" ");
    let currentText = "";
    
    // Update message iteratively
    for (let i = 0; i < words.length; i++) {
      currentText += words[i] + " ";
      setMessages(prev => prev.map(m => 
        m.id === msgId ? { ...m, content: currentText } : m
      ));
      // Random delay for typing effect
      await new Promise(r => setTimeout(r, Math.random() * 50 + 30));
    }
  };

  // --- Intent Logic ---

  const handleCommand = async (text: string) => {
    const input = text.toLowerCase();
    setIsTyping(true);
    
    // Artificial delay for "Thinking"
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const msgId = Date.now().toString();
    let response: Message = {
      id: msgId,
      role: "ai",
      content: "",
      type: "text",
      timestamp: new Date()
    };

    // 1. GENERATION INTENT (Write, Draft, Email, Plan)
    if (input.includes("write") || input.includes("draft") || input.includes("email") || input.includes("plan") || input.includes("create")) {
      
      if (input.includes("email")) {
        setActiveAgent("Writer");
        const { subject, body } = await generateEmail("Production Update");
        response = {
          ...response,
          type: "generated-content",
          metadata: { contentType: "email", title: subject },
          content: "" // Start empty for streaming
        };
        setIsTyping(false);
        setMessages(prev => [...prev, response]);
        await simulateStreaming(body, msgId);
        return;
      } 
      
      else if (input.includes("plan") || input.includes("schedule") || input.includes("run of show")) {
        setActiveAgent("Planner");
        const plan = await generatePlan("SS25 Show");
        response = {
          ...response,
          type: "generated-content",
          metadata: { contentType: "plan", title: "Proposed Schedule" },
          content: ""
        };
        setIsTyping(false);
        setMessages(prev => [...prev, response]);
        await simulateStreaming(plan, msgId);
        return;
      }
    }

    // 2. NAVIGATION INTENT
    setActiveAgent("Navigator");
    
    if (input.includes("event") || input.includes("show")) {
      if (input.includes("new") || input.includes("create")) {
        response.content = "I can help you plan a new event. Opening the Event Wizard now.";
        response.type = "navigation";
        response.actionLabel = "Go to Event Wizard";
        response.actionTarget = "event-wizard";
      } else {
        response.content = "Here is your current Event Schedule.";
        response.type = "navigation";
        response.actionLabel = "View Schedule";
        response.actionTarget = "events-list";
      }
    } 
    else if (input.includes("shoot") || input.includes("photo")) {
      if (input.includes("new")) {
        response.content = "Starting a new photoshoot project. Let's define the parameters.";
        response.type = "navigation";
        response.actionLabel = "Open Shoot Wizard";
        response.actionTarget = "wizard";
      } else {
        response.content = "Navigating to your Shot Lists.";
        response.type = "navigation";
        response.actionLabel = "View Shot Lists";
        response.actionTarget = "shotlist";
      }
    }
    else if (input.includes("budget") || input.includes("finance") || input.includes("cost")) {
      response.content = "Pulling up the latest financial reports.";
      response.type = "navigation";
      response.actionLabel = "View Billing";
      response.actionTarget = "billing";
    }
    else if (input.includes("dashboard") || input.includes("home") || input.includes("overview")) {
      response.content = "Returning to the Command Center.";
      response.type = "navigation";
      response.actionLabel = "Go to Overview";
      response.actionTarget = "command-center";
    }
    else if (input.includes("sponsor")) {
      response.content = "Opening the Sponsor CRM.";
      response.type = "navigation";
      response.actionLabel = "View Sponsors";
      response.actionTarget = "sponsors";
    }
    else if (input.includes("proposal") || input.includes("quote") || input.includes("estimate")) {
      response.content = "Opening the latest Proposal Preview.";
      response.type = "navigation";
      response.actionLabel = "View Proposal";
      response.actionTarget = "proposal";
    }
    else if (input.includes("booking") || input.includes("payment") || input.includes("book")) {
      response.content = "Navigating to Booking & Payment.";
      response.type = "navigation";
      response.actionLabel = "Go to Booking";
      response.actionTarget = "booking";
    }
    else if (input.includes("architecture") || input.includes("workflow") || input.includes("map")) {
      response.content = "Opening the Site Architecture & Workflow map.";
      response.type = "navigation";
      response.actionLabel = "View Architecture";
      response.actionTarget = "architecture";
    }
    else {
      // Default fallback
      response.content = `I can help you navigate to tools or generate content. Try "Draft an email to the team" or "Go to shot lists".`;
    }

    setIsTyping(false);
    setMessages(prev => [...prev, response]);

    // Auto-navigate if it's a navigation intent
    if (response.type === "navigation" && response.actionTarget) {
      setTimeout(() => {
        onNavigate(response.actionTarget!);
      }, 1000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newUserMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMsg]);
    handleCommand(inputValue);
    setInputValue("");
  };

  // Keyboard shortcut (Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {/* Trigger Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-black text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-gray-900 transition-colors"
          >
            <Sparkles className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              width: isExpanded ? "600px" : "400px",
              height: isExpanded ? "80vh" : "600px"
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`fixed bottom-6 right-6 z-50 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-w-[calc(100vw-48px)] max-h-[calc(100vh-48px)] font-sans`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white transition-colors ${
                  activeAgent === "Writer" ? "bg-purple-600" :
                  activeAgent === "Planner" ? "bg-blue-600" :
                  "bg-black"
                }`}>
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif font-medium text-gray-900">FashionOS Intelligence</h3>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                       activeAgent === "Writer" ? "bg-purple-500" :
                       activeAgent === "Planner" ? "bg-blue-500" :
                       "bg-green-500"
                    }`} />
                    <span className="text-xs text-gray-500">{activeAgent} Agent Active</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                >
                  {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-gray-50/30">
              {messages.map((msg) => (
                <motion.div 
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <Avatar className="w-8 h-8 border border-gray-200 bg-white shrink-0">
                    {msg.role === "ai" ? (
                      <div className="w-full h-full bg-black flex items-center justify-center text-white">
                        <Sparkles className="w-4 h-4" />
                      </div>
                    ) : (
                      <AvatarImage src="https://github.com/shadcn.png" />
                    )}
                    <AvatarFallback>{msg.role === "ai" ? "AI" : "ME"}</AvatarFallback>
                  </Avatar>
                  
                  <div className={`space-y-2 max-w-[85%]`}>
                    
                    {/* Content Box */}
                    <div 
                      className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-wrap ${
                        msg.role === "user" 
                          ? "bg-black text-white rounded-tr-none" 
                          : "bg-white border border-gray-100 text-gray-800 rounded-tl-none"
                      }`}
                    >
                      {msg.metadata?.title && (
                        <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-100 opacity-80">
                          {msg.metadata.contentType === 'email' ? <FileText className="w-3 h-3" /> : <Calendar className="w-3 h-3" />}
                          <span className="font-bold text-xs uppercase tracking-wide">{msg.metadata.title}</span>
                        </div>
                      )}
                      {msg.content}
                    </div>
                    
                    {/* Actions (Navigation) */}
                    {msg.type === "navigation" && msg.actionTarget && (
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={() => onNavigate(msg.actionTarget!)}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-900 rounded-full text-xs font-medium hover:border-black hover:bg-gray-50 transition-all group"
                      >
                        {msg.actionLabel}
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </motion.button>
                    )}

                    {/* Actions (Generated Content) */}
                    {msg.type === "generated-content" && (
                      <div className="flex gap-2">
                        <motion.button
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          onClick={() => navigator.clipboard.writeText(msg.content)}
                          className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 text-gray-600 rounded-lg text-xs font-medium hover:text-black hover:border-black transition-all"
                        >
                          <Copy className="w-3 h-3" /> Copy
                        </motion.button>
                        <motion.button
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 text-gray-600 rounded-lg text-xs font-medium hover:text-black hover:border-black transition-all"
                        >
                          <Check className="w-3 h-3" /> Save to Docs
                        </motion.button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3">
                   <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none border border-gray-100 flex items-center gap-1 w-16">
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                    <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100">
              <form onSubmit={handleSubmit} className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask FashionOS to plan, draft, or navigate..."
                  className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-black focus:bg-white transition-all placeholder:text-gray-400 text-gray-900"
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="absolute right-2 top-2 p-1.5 text-gray-400 hover:text-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <div className="w-7 h-7 bg-black text-white rounded-lg flex items-center justify-center hover:bg-gray-800">
                     <ArrowRight className="w-4 h-4" />
                  </div>
                </button>
              </form>
              <div className="mt-2 flex items-center justify-between text-[10px] text-gray-400 px-1">
                <div className="flex gap-2">
                  <span>Cmd + K to toggle</span>
                </div>
                <div>Powered by FashionOS Neural Engine</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}