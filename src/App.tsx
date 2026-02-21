/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  HeartPulse, 
  BookOpen, 
  ChevronRight, 
  Menu, 
  X, 
  ArrowRight,
  ShieldCheck,
  Users,
  TrendingUp,
  User as UserIcon,
  Building,
  Briefcase,
  CheckCircle2
} from 'lucide-react';
import Markdown from 'react-markdown';
import { BUSINESS_GUIDES, BUSINESS_STATS } from './constants/projectData';
import { VisualDashboard } from './components/VisualDashboard';
import { ChurnPredictor } from './components/ChurnPredictor';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function MainApp() {
  const [activeTab, setActiveTab] = useState<'overview' | 'check' | 'guides'>('overview');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasData, setHasData] = useState(false);
  const [businessInfo, setBusinessInfo] = useState<{ name: string; type: string } | null>(null);
  const [setupData, setSetupData] = useState({ name: '', type: 'Retail' });

  // Load business info from local storage if it exists
  useEffect(() => {
    const saved = localStorage.getItem('business_info');
    if (saved) {
      setBusinessInfo(JSON.parse(saved));
    }
    
    // Check if we have any customer data (simulated for this version)
    const customers = localStorage.getItem('customer_data');
    if (customers) {
      setHasData(true);
    }
  }, []);

  const handleSetup = (e: React.FormEvent) => {
    e.preventDefault();
    const info = { name: setupData.name, type: setupData.type };
    setBusinessInfo(info);
    localStorage.setItem('business_info', JSON.stringify(info));
  };

  if (!businessInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFCFB] p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md space-y-8 bg-white p-10 rounded-[2.5rem] border border-orange-100 shadow-xl shadow-orange-500/5"
        >
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center text-white mx-auto shadow-lg shadow-orange-200 mb-4">
              <HeartPulse size={32} />
            </div>
            <h2 className="text-3xl font-black text-slate-900">Welcome!</h2>
            <p className="text-slate-500">Tell us about your business to get started</p>
          </div>

          <form onSubmit={handleSetup} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Business Name</label>
              <div className="relative">
                <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  type="text" 
                  required
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all"
                  placeholder="e.g. Sunny Day Cafe"
                  value={setupData.name}
                  onChange={(e) => setSetupData({...setupData, name: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Business Type</label>
              <div className="relative">
                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <select 
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all appearance-none"
                  value={setupData.type}
                  onChange={(e) => setSetupData({...setupData, type: e.target.value})}
                >
                  <option>Retail</option>
                  <option>SaaS</option>
                  <option>Service</option>
                  <option>E-commerce</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-xl shadow-slate-200"
            >
              Get Started
              <ArrowRight size={20} />
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-slate-800 font-sans selection:bg-orange-100 selection:text-orange-900">
      {/* Simple Top Nav */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-orange-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-200">
              <HeartPulse size={24} />
            </div>
            <span className="font-black text-xl tracking-tight text-slate-900">CustomerHealth</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'check', label: 'Health Check', icon: HeartPulse },
              { id: 'guides', label: 'Helpful Guides', icon: BookOpen },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "flex items-center gap-2 text-sm font-bold transition-all relative py-2",
                  activeTab === tab.id 
                    ? "text-orange-600" 
                    : "text-slate-400 hover:text-slate-600"
                )}
              >
                <tab.icon size={18} />
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute -bottom-4 left-0 right-0 h-1 bg-orange-500 rounded-full"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="h-8 w-px bg-slate-100 mx-2" />
            <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
              <Building size={16} className="text-orange-500" />
              {businessInfo.name}
            </div>
          </div>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-slate-600"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {[
                { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
                { id: 'check', label: 'Health Check', icon: HeartPulse },
                { id: 'guides', label: 'Helpful Guides', icon: BookOpen },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-4 text-2xl font-black text-slate-800"
                >
                  <tab.icon size={28} className="text-orange-500" />
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              {/* Hero Section */}
              <div className="bg-slate-900 rounded-[3rem] p-8 md:p-12 text-white overflow-hidden relative">
                <div className="relative z-10 max-w-2xl">
                  <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                    Welcome to {businessInfo.name} Dashboard
                  </h2>
                  <p className="text-slate-400 text-lg mb-8">
                    Identify at-risk customers and keep your business growing. Start by running a health check on your customers.
                  </p>
                  <button 
                    onClick={() => setActiveTab('check')}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 transition-all shadow-xl shadow-orange-500/20"
                  >
                    Start a Health Check
                    <ArrowRight size={20} />
                  </button>
                </div>
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-orange-500/10 to-transparent hidden lg:block" />
                <HeartPulse size={300} className="absolute -bottom-20 -right-20 text-white/5 rotate-12" />
              </div>

              {/* Conditional Dashboard */}
              {hasData ? (
                <div className="space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {BUSINESS_STATS.map((stat, i) => (
                      <div key={i} className="bg-white p-8 rounded-[2rem] border border-orange-100 shadow-sm">
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">{stat.label}</p>
                        <h3 className="text-5xl font-black" style={{ color: stat.color }}>{stat.value}</h3>
                        <div className="mt-4 flex items-center gap-2 text-xs font-bold text-slate-500">
                          <TrendingUp size={14} className="text-emerald-500" />
                          Improved 2% this month
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-black text-slate-900">Business Health Overview</h3>
                      <button className="text-sm font-bold text-orange-600 hover:underline">Download Detailed Report</button>
                    </div>
                    <VisualDashboard />
                  </div>
                </div>
              ) : (
                <div className="bg-white p-12 rounded-[3rem] border-2 border-dashed border-orange-100 text-center space-y-6">
                  <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center text-orange-500 mx-auto">
                    <Users size={40} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-slate-900">No Customer Data Yet</h3>
                    <p className="text-slate-500 max-w-md mx-auto">Once you start running health checks, your business dashboard will come to life with insights and trends.</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('check')}
                    className="inline-flex items-center gap-2 text-orange-600 font-bold hover:underline"
                  >
                    Run your first health check <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'check' && (
            <motion.div
              key="check"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl font-black text-slate-900 mb-4">Customer Health Check</h2>
                <p className="text-slate-500 max-w-lg mx-auto">Answer a few simple questions about your customer to see their health score and get advice on how to keep them.</p>
              </div>
              <ChurnPredictor onSave={() => {
                setHasData(true);
                localStorage.setItem('customer_data', 'true');
              }} />
            </motion.div>
          )}

          {activeTab === 'guides' && (
            <motion.div
              key="guides"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-4xl mx-auto space-y-12"
            >
              <div className="text-center">
                <h2 className="text-4xl font-black text-slate-900 mb-4">Helpful Guides</h2>
                <p className="text-slate-500">Learn how to grow your business by keeping your customers happy.</p>
              </div>

              <div className="grid grid-cols-1 gap-8">
                {BUSINESS_GUIDES.map((guide) => (
                  <div key={guide.id} className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-orange-100 shadow-sm">
                    <h3 className="text-3xl font-black text-slate-900 mb-6">{guide.title}</h3>
                    <div className="markdown-body prose prose-orange max-w-none text-slate-600">
                      <Markdown>{guide.content}</Markdown>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust Badge */}
              <div className="bg-orange-50 p-8 rounded-[2rem] flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-orange-500 shadow-sm">
                  <ShieldCheck size={32} />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-xl">Your data is safe with us</h4>
                  <p className="text-slate-500 text-sm">We use industry-standard encryption to ensure your customer data is never shared or sold.</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-orange-100 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-500 rounded-xl flex items-center justify-center text-white">
                <HeartPulse size={18} />
              </div>
              <span className="font-black text-lg tracking-tight text-slate-900">CustomerHealth</span>
            </div>
            <p className="text-slate-400 text-sm max-w-xs">Helping small businesses thrive by putting customer happiness first. Simple tools for big growth.</p>
          </div>
          <div className="space-y-4">
            <h5 className="font-black text-slate-900 uppercase tracking-widest text-xs">Product</h5>
            <ul className="space-y-2 text-sm text-slate-500 font-bold">
              <li><button onClick={() => setActiveTab('overview')} className="hover:text-orange-500">Dashboard</button></li>
              <li><button onClick={() => setActiveTab('check')} className="hover:text-orange-500">Health Check</button></li>
              <li><button onClick={() => setActiveTab('guides')} className="hover:text-orange-500">Guides</button></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h5 className="font-black text-slate-900 uppercase tracking-widest text-xs">Community</h5>
            <ul className="space-y-2 text-sm text-slate-500 font-bold">
              <li><a href="#" className="hover:text-orange-500">Twitter</a></li>
              <li><a href="#" className="hover:text-orange-500">LinkedIn</a></li>
              <li><a href="#" className="hover:text-orange-500">Support</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-orange-50 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-300">
          <span>© 2024 CustomerHealth AI. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </footer>

      <style>{`
        .markdown-body h3 {
          font-size: 1.5rem;
          font-weight: 900;
          color: #0F172A;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .markdown-body p {
          margin-bottom: 1rem;
          line-height: 1.8;
        }
        .markdown-body strong {
          color: #F97316;
          font-weight: 900;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default function App() {
  return (
    <MainApp />
  );
}
