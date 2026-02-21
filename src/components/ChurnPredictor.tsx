import React, { useState } from 'react';
import { HeartPulse, AlertCircle, CheckCircle2, UserCircle2, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ChurnPredictor: React.FC<{ onSave?: () => void }> = ({ onSave }) => {
  const [formData, setFormData] = useState({
    name: 'Customer #' + Math.floor(Math.random() * 1000),
    tenure: 12,
    monthlyCharges: 50,
    contract: 'Month-to-month',
    internetService: 'DSL',
    paymentMethod: 'Credit card',
    techSupport: 'Yes'
  });

  const [prediction, setPrediction] = useState<{
    score: number;
    health: 'Healthy' | 'Warning' | 'Critical';
    advice: string[];
  } | null>(null);

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handlePredict = async () => {
    setIsAnalyzing(true);
    
    // Simulated ML Logic for score calculation
    let score = 0;
    const advice = [];

    if (formData.contract === 'Month-to-month') {
      score += 35;
      advice.push("Consider offering a small discount for a 1-year commitment.");
    }
    if (formData.internetService === 'Fiber optic') {
      score += 10;
      advice.push("Fiber optic users have higher expectations. Check in on their speed satisfaction.");
    }
    if (formData.paymentMethod === 'Electronic check') {
      score += 10;
      advice.push("Suggest switching to Auto-pay via Credit Card for better reliability.");
    }
    if (formData.techSupport === 'No') {
      score += 15;
      advice.push("Offer a free 'Setup Guide' or check-in call to ensure they feel supported.");
    }
    if (formData.tenure < 6) {
      score += 20;
      advice.push("New customer! Send a 'Welcome' gift or discount to build loyalty.");
    }

    const health = score > 65 ? 'Critical' : score > 35 ? 'Warning' : 'Healthy';
    const finalScore = Math.min(score, 99);

    // Save to LocalStorage (Simulated Persistence)
    try {
      const existingData = localStorage.getItem('customer_list') || '[]';
      const customerList = JSON.parse(existingData);
      customerList.push({
        name: formData.name,
        tenure: formData.tenure,
        monthly_charges: formData.monthlyCharges,
        contract: formData.contract,
        tech_support: formData.techSupport,
        health_score: finalScore,
        status: health,
        date: new Date().toISOString()
      });
      localStorage.setItem('customer_list', JSON.stringify(customerList));
      if (onSave) onSave();
    } catch (e) {
      console.error("Failed to save customer data locally");
    }

    setTimeout(() => {
      setPrediction({
        score: finalScore,
        health,
        advice
      });
      setIsAnalyzing(false);
    }, 1200);
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-[2rem] border border-orange-100 shadow-xl shadow-orange-500/5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-orange-500 rounded-2xl text-white shadow-lg shadow-orange-200">
            <HeartPulse size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Customer Health Check</h2>
            <p className="text-slate-500 text-sm">See how likely a customer is to stay with you</p>
          </div>
        </div>
        <button className="flex items-center gap-2 text-sm font-bold text-orange-600 bg-orange-50 px-4 py-2 rounded-full hover:bg-orange-100 transition-colors">
          <HelpCircle size={16} />
          How it works
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-600">Customer Name / ID</label>
            <input 
              type="text" 
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-600">How long have they been with you?</label>
              <div className="relative">
                <input 
                  type="number" 
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all pr-12"
                  value={formData.tenure}
                  onChange={(e) => setFormData({...formData, tenure: parseInt(e.target.value)})}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">Months</span>
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-600">Average Monthly Spend</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                <input 
                  type="number" 
                  className="w-full p-4 pl-8 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all"
                  value={formData.monthlyCharges}
                  onChange={(e) => setFormData({...formData, monthlyCharges: parseInt(e.target.value)})}
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-600">What kind of plan are they on?</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {['Month-to-month', 'One year', 'Two year'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFormData({...formData, contract: type})}
                  className={`p-3 rounded-xl text-sm font-bold border transition-all ${
                    formData.contract === type 
                    ? 'bg-orange-500 border-orange-500 text-white shadow-md' 
                    : 'bg-white border-slate-200 text-slate-600 hover:border-orange-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-600">Do they have Tech Support?</label>
            <div className="flex gap-4">
              {['Yes', 'No'].map((choice) => (
                <button
                  key={choice}
                  onClick={() => setFormData({...formData, techSupport: choice})}
                  className={`flex-1 p-3 rounded-xl text-sm font-bold border transition-all ${
                    formData.techSupport === choice 
                    ? 'bg-orange-500 border-orange-500 text-white shadow-md' 
                    : 'bg-white border-slate-200 text-slate-600 hover:border-orange-200'
                  }`}
                >
                  {choice}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={handlePredict}
            disabled={isAnalyzing}
            className="w-full py-5 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all disabled:opacity-50 flex items-center justify-center gap-3 shadow-xl shadow-slate-200"
          >
            {isAnalyzing ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Checking Health...
              </>
            ) : "Run Health Check"}
          </button>
        </div>

        <div className="relative min-h-[400px] flex flex-col items-center justify-center bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200 p-8 overflow-hidden">
          <AnimatePresence mode="wait">
            {!prediction && !isAnalyzing && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-center space-y-6"
              >
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto text-slate-200 shadow-inner">
                  <UserCircle2 size={56} />
                </div>
                <div className="space-y-2">
                  <p className="text-slate-800 font-bold text-lg">Ready to Analyze</p>
                  <p className="text-slate-400 text-sm max-w-[200px] mx-auto">Fill in the details to see if this customer needs your attention.</p>
                </div>
              </motion.div>
            )}

            {isAnalyzing && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-center space-y-6"
              >
                <div className="relative w-32 h-32 mx-auto">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-4 border-orange-500 border-t-transparent rounded-full"
                  />
                  <div className="absolute inset-4 border-4 border-slate-200 border-b-transparent rounded-full animate-spin-slow" />
                  <div className="absolute inset-0 flex items-center justify-center text-orange-500">
                    <HeartPulse size={40} className="animate-pulse" />
                  </div>
                </div>
                <p className="text-slate-800 font-bold animate-pulse">Analyzing Patterns...</p>
              </motion.div>
            )}

            {prediction && !isAnalyzing && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="w-full space-y-8"
              >
                <div className="text-center space-y-2">
                  <div className={`text-7xl font-black ${
                    prediction.health === 'Critical' ? 'text-red-500' : 
                    prediction.health === 'Warning' ? 'text-orange-500' : 'text-emerald-500'
                  }`}>
                    {prediction.score}%
                  </div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Risk Score</p>
                  <div className={`inline-flex items-center gap-2 px-6 py-2 rounded-full text-sm font-black uppercase tracking-widest mt-4 ${
                    prediction.health === 'Critical' ? 'bg-red-500 text-white' : 
                    prediction.health === 'Warning' ? 'bg-orange-500 text-white' : 'bg-emerald-500 text-white'
                  }`}>
                    {prediction.health} Status
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-orange-500" />
                    Recommended Actions
                  </h4>
                  <div className="space-y-3">
                    {prediction.advice.map((item, i) => (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={i} 
                        className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm flex gap-3 items-start"
                      >
                        <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 shrink-0" />
                        <p className="text-sm text-slate-600 font-medium">{item}</p>
                      </motion.div>
                    ))}
                    {prediction.advice.length === 0 && (
                      <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex gap-3 items-start">
                        <CheckCircle2 size={18} className="text-emerald-500 mt-0.5 shrink-0" />
                        <p className="text-sm text-emerald-700 font-medium">This customer is very happy! Keep doing what you're doing.</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
