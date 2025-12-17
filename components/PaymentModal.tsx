"use client";

import React, { useState } from "react";
import { X, Loader2, CheckCircle, Smartphone, Zap } from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  discoName: string;
}

export default function PaymentModal({ isOpen, onClose, discoName }: PaymentModalProps) {
  const [meterNo, setMeterNo] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // ---------------------------------------------------------
    // INTEGRATION NOTE:
    // Replace this setTimeout with your actual API fetch call.
    // Example:
    // const res = await fetch('/api/pay', { method: 'POST', body: ... })
    // ---------------------------------------------------------
    
    setTimeout(() => {
      // Simulate success and generate a random token
      const fakeToken = Math.floor(1000 + Math.random() * 9000) + "-" + 
                        Math.floor(1000 + Math.random() * 9000) + "-" + 
                        Math.floor(1000 + Math.random() * 9000) + "-" + 
                        Math.floor(1000 + Math.random() * 9000);
      
      setSuccess(fakeToken);
      setLoading(false);
    }, 2000);
  };

  const reset = () => {
    setSuccess(null);
    setMeterNo("");
    setAmount("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden relative">
        
        {/* Close Button */}
        <button onClick={reset} className="absolute top-4 right-4 text-gray-400 hover:text-white transition">
          <X size={24} />
        </button>

        <div className="p-8">
          {success ? (
            <div className="text-center space-y-4">
              <div className="flex justify-center text-green-500 mb-4">
                <CheckCircle size={64} />
              </div>
              <h3 className="text-2xl font-bold text-white">Payment Successful!</h3>
              <p className="text-gray-400">Here is your electricity token:</p>
              <div className="bg-gray-800 p-4 rounded-lg border border-green-500/30">
                <p className="text-2xl font-mono text-green-400 tracking-widest font-bold">
                  {success}
                </p>
              </div>
              <p className="text-sm text-gray-500">A receipt has been sent to your history.</p>
              <button
                onClick={reset}
                className="w-full mt-6 bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-xl transition"
              >
                Done
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6 flex items-center gap-3">
                <div className="p-3 bg-blue-600/20 rounded-lg text-blue-400">
                  <Zap size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Pay {discoName}</h3>
                  <p className="text-sm text-gray-400">Instant Token Delivery</p>
                </div>
              </div>

              <form onSubmit={handlePay} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Meter Number</label>
                  <div className="relative">
                    <Smartphone className="absolute left-3 top-3 text-gray-500" size={18} />
                    <input
                      type="text"
                      required
                      placeholder="e.g. 45020493821"
                      value={meterNo}
                      onChange={(e) => setMeterNo(e.target.value)}
                      className="w-full bg-gray-800 border border-gray-700 text-white pl-10 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Amount (₦)</label>
                  <input
                    type="number"
                    required
                    placeholder="Min. 1000"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition flex justify-center items-center gap-2 mt-4"
                >
                  {loading ? <Loader2 className="animate-spin" /> : "Pay Now"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}