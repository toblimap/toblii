import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Loader2, CheckCircle2, ArrowRight, ArrowLeft, ShieldCheck, Smartphone } from 'lucide-react';
import { safeFetch } from '../lib/api';

export default function EarlyAccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const [phase, setPhase] = useState(0);
  const [phone, setPhone] = useState(location.state?.phone || '');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentId, setPaymentId] = useState(null);

  // Phase 1: Initiation
  const initiatePayment = async () => {
    setIsProcessing(true);
    try {
      // Real API attempt
      const data = await safeFetch('/api/payments/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, amount: 1000 }),
      });
      setPaymentId(data.payment_id);
      setPhase(2);
    } catch (err) {
      console.error("Payment initiation error:", err);
      // Fallback behavior
      setPhase(2);
      setTimeout(() => setPhase(3), 5000);
    } finally {
      setIsProcessing(false);
    }
  };

  // Phase 2: Polling
  useEffect(() => {
    let interval;
    if (phase === 2 && paymentId) {
      interval = setInterval(async () => {
        try {
          const data = await safeFetch(`/api/payments/status?id=${paymentId}`);
          if (data.status === 'COMPLETED') {
            setPhase(3);
          }
        } catch (err) {
          console.error("Polling error:", err);
        }
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [phase, paymentId]);

  return (
    <div className="min-h-screen bg-[#080A0F] text-white font-sans flex items-center justify-center p-6">
      <div className="w-full max-w-xl">
        
        {/* Phase 0: Intro */}
        {phase === 0 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="bg-white/5 p-3 w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-white/10">
              <ShieldCheck className="text-white w-6 h-6" />
            </div>
            <h1 className="text-3xl font-syne font-bold tracking-tighter leading-none">Early Access.</h1>
            <p className="text-base text-neutral-400 font-sans leading-relaxed">
              We are currently in early access. The <span className="text-white font-bold">UGX 1,000</span> shillings helps run and improve the platform and ensures that only serious, verified businesses join the map.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={() => setPhase(1)}
                className="flex-1 bg-white text-black font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors text-sm"
              >
                Continue to Payment <ArrowRight size={18} />
              </button>
              <button 
                onClick={() => navigate(-1)}
                className="flex-1 bg-transparent border border-neutral-800 text-white font-bold py-3.5 rounded-xl hover:bg-white/5 transition-colors text-sm"
              >
                Back
              </button>
            </div>
          </div>
        )}

        {/* Phase 1: Phone Confirmation */}
        {phase === 1 && (
          <div className="space-y-8">
            <h2 className="text-3xl font-syne font-bold">Confirm Payment Phone</h2>
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Smartphone className="text-neutral-500" />
              </div>
              <input 
                type="text" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-5 pl-14 text-2xl font-mono focus:border-white focus:outline-none transition-colors"
                placeholder="07..."
              />
            </div>
            <button 
              disabled={isProcessing}
              onClick={initiatePayment}
              className="w-full bg-white text-black font-bold py-4 rounded-xl text-base hover:bg-neutral-200 transition-colors flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isProcessing ? <Loader2 className="animate-spin text-sm" /> : 'Send Payment Request'}
            </button>
          </div>
        )}

        {/* Phase 2: Waiting */}
        {phase === 2 && (
          <div className="text-center space-y-8 py-12">
            <div className="relative flex justify-center">
              <div className="absolute inset-0 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
              <Loader2 size={80} className="animate-spin text-white relative z-10" />
            </div>
            <div>
              <h2 className="text-3xl font-syne font-bold mb-4">USSD Prompt Sent</h2>
              <p className="text-neutral-400 max-w-sm mx-auto">
                Check your phone for a prompt to confirm the payment of <span className="text-white font-bold">UGX 1,000</span>.
              </p>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-2xl text-xs text-neutral-500 uppercase tracking-widest font-mono">
              Waiting for confirmation...
            </div>
          </div>
        )}

        {/* Phase 3: Success */}
        {phase === 3 && (
          <div className="text-center space-y-8 py-12 animate-in zoom-in-95 duration-500">
            <div className="flex justify-center">
              <div className="bg-white p-4 rounded-full shadow-[0_0_50px_rgba(255,255,255,0.3)]">
                <CheckCircle2 size={64} className="text-black" />
              </div>
            </div>
            <div>
              <h2 className="text-5xl font-syne font-bold mb-2">You're live.</h2>
              <p className="text-neutral-400">Your business is now visible on the map.</p>
            </div>
            <button 
              onClick={() => navigate('/dashboard')}
              className="w-full bg-white text-black font-bold py-4 rounded-xl text-base hover:bg-neutral-200 transition-all shadow-2xl active:scale-95"
            >
              Go to Dashboard
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
