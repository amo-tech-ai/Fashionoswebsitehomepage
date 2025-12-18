import { useState } from "react";
import { motion } from "motion/react";
import { 
  CreditCard, 
  Calendar as CalendarIcon, 
  CheckCircle2, 
  ArrowRight, 
  Lock,
  ChevronLeft,
  Clock
} from "lucide-react";

export function BookingFlow({ onNavigate }: { onNavigate: (screen: string) => void }) {
  const [step, setStep] = useState<'calendar' | 'payment' | 'confirmation'>('calendar');
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('confirmation');
    }, 2000);
  };

  const today = new Date();
  const daysInMonth = 30; // Simplified for demo

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-12 px-6">
      <div className="max-w-2xl mx-auto">
        
        {/* Progress Header */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => {
              if (step === 'payment') setStep('calendar');
              else onNavigate('proposal');
            }}
            className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
          <div className="flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full ${step === 'calendar' ? 'bg-gray-900' : 'bg-gray-300'}`} />
            <div className={`h-2 w-2 rounded-full ${step === 'payment' ? 'bg-gray-900' : 'bg-gray-300'}`} />
            <div className={`h-2 w-2 rounded-full ${step === 'confirmation' ? 'bg-gray-900' : 'bg-gray-300'}`} />
          </div>
        </div>

        {/* Content */}
        <motion.div 
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
        >
          
          {step === 'calendar' && (
            <div>
              <h1 className="font-serif text-2xl font-bold text-gray-900 mb-2">Select a Production Date</h1>
              <p className="text-gray-500 mb-8">Choose a date for your shoot. We need 48 hours for prep.</p>
              
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8">
                <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                  <span className="font-medium text-gray-900">October 2024</span>
                  <div className="flex gap-2">
                    <button className="p-1 hover:bg-gray-200 rounded"><ChevronLeft className="w-4 h-4" /></button>
                    <button className="p-1 hover:bg-gray-200 rounded"><ArrowRight className="w-4 h-4" /></button>
                  </div>
                </div>
                <div className="p-4 grid grid-cols-7 gap-2 text-center text-sm">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                    <div key={d} className="text-gray-400 font-medium py-2">{d}</div>
                  ))}
                  {Array.from({ length: 30 }).map((_, i) => {
                    const day = i + 1;
                    const isAvailable = day > 5 && day % 7 !== 0; // Fake availability logic
                    const isSelected = selectedDate === day;
                    
                    return (
                      <button
                        key={i}
                        disabled={!isAvailable}
                        onClick={() => setSelectedDate(day)}
                        className={`
                          py-3 rounded-lg font-medium transition-all relative
                          ${isSelected 
                            ? 'bg-gray-900 text-white shadow-lg scale-105 z-10' 
                            : isAvailable 
                              ? 'text-gray-700 hover:bg-gray-100' 
                              : 'text-gray-300 cursor-not-allowed'
                          }
                        `}
                      >
                        {day}
                        {isSelected && (
                          <motion.div 
                            layoutId="check"
                            className="absolute -top-1 -right-1 bg-green-500 rounded-full p-0.5"
                          >
                            <CheckCircle2 className="w-2 h-2 text-white" />
                          </motion.div>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="flex justify-end">
                <button 
                  disabled={!selectedDate}
                  onClick={() => setStep('payment')}
                  className="px-8 py-3 bg-gray-900 text-white rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black transition-colors flex items-center gap-2"
                >
                  Continue to Payment <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 'payment' && (
            <div>
              <h1 className="font-serif text-2xl font-bold text-gray-900 mb-2">Secure Your Booking</h1>
              <p className="text-gray-500 mb-8">Complete payment to reserve your selected date.</p>

              <div className="bg-gray-50 p-4 rounded-xl mb-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg border border-gray-200">
                    <CalendarIcon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">October {selectedDate}, 2024</div>
                    <div className="text-xs text-gray-500">9:00 AM - 6:00 PM</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-gray-900">$8,450.00</div>
                  <div className="text-xs text-gray-500">Total</div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Cardholder Name</label>
                  <input type="text" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900" placeholder="Jane Doe" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Card Number</label>
                  <div className="relative">
                    <input type="text" className="w-full bg-white border border-gray-200 rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900" placeholder="0000 0000 0000 0000" />
                    <CreditCard className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Expiry</label>
                    <input type="text" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900" placeholder="MM/YY" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">CVC</label>
                    <input type="text" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900" placeholder="123" />
                  </div>
                </div>
              </div>

              <button 
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-colors flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>Processing...</>
                ) : (
                  <>
                    <Lock className="w-4 h-4" /> Pay $8,450.00
                  </>
                )}
              </button>
              
              <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
                <Lock className="w-3 h-3" /> Payments secured by Stripe
              </p>
            </div>
          )}

          {step === 'confirmation' && (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h1 className="font-serif text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                Your shoot is scheduled for October {selectedDate}, 2024. A confirmation email has been sent to your inbox.
              </p>
              
              <div className="space-y-3">
                <button 
                  onClick={() => onNavigate('dashboard')}
                  className="w-full py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-black transition-colors"
                >
                  Go to Project Dashboard
                </button>
                <button 
                  onClick={() => onNavigate('home')}
                  className="w-full py-3 text-gray-500 hover:text-gray-900 font-medium transition-colors"
                >
                  Return Home
                </button>
              </div>
            </div>
          )}

        </motion.div>
      </div>
    </div>
  );
}
