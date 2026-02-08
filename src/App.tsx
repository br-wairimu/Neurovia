import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  Users, 
  Sparkles, 
  Zap, 
  Map, 
  BookOpen, 
  Menu, 
  X,
  Bell,
  Search,
  Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Dashboard } from './components/Dashboard';
import { TherapistList } from './components/TherapistList';
import { CopingHub } from './components/CopingHub';
import { Outlets } from './components/Outlets';
import { ProgressTracker } from './components/ProgressTracker';
import { Learning } from './components/Learning';
import { View } from './types';

// Noise texture overlay
const NoiseOverlay = () => (
  <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.04] mix-blend-overlay"
       style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
  />
);

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard onChangeView={setCurrentView} />;
      case 'therapists': return <TherapistList />;
      case 'coping': return <CopingHub />;
      case 'outlets': return <Outlets />;
      case 'progress': return <ProgressTracker />;
      case 'learning': return <Learning />;
      default: return <Dashboard onChangeView={setCurrentView} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#FDFBF7] text-slate-800 font-sans overflow-hidden selection:bg-teal-100 selection:text-teal-900">
      <NoiseOverlay />
      
      <AnimatePresence mode="wait">
        {showWelcome ? (
          <WelcomeScreen onEnter={() => setShowWelcome(false)} />
        ) : (
          <motion.div 
            key="app-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="flex h-full w-full"
          >
            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
              {isSidebarOpen && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  onClick={() => setIsSidebarOpen(false)}
                  className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-20 lg:hidden"
                />
              )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.aside 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className={`fixed lg:static inset-y-0 left-0 z-30 w-20 lg:w-72 bg-[#0F172A] text-slate-300 border-r border-slate-800 transform transition-transform duration-700 ease-[0.2,0,0,1] ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
            >
              <div className="flex flex-col h-full py-8">
                <div className="px-6 flex items-center justify-between lg:justify-start lg:space-x-4 mb-16">
                  <motion.div 
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="text-amber-200/80"
                  >
                    <Brain className="w-8 h-8" />
                  </motion.div>
                  <span className="hidden lg:block font-serif text-2xl tracking-wide text-slate-100">Neurovia</span>
                  <button onClick={toggleSidebar} className="lg:hidden text-slate-400 hover:text-white transition-colors">
                    <X size={24} />
                  </button>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                  <NavItem icon={<Brain size={22} />} label="Neural Map" active={currentView === 'dashboard'} onClick={() => { setCurrentView('dashboard'); setIsSidebarOpen(false); }} />
                  <NavItem icon={<Users size={22} />} label="Connect" active={currentView === 'therapists'} onClick={() => { setCurrentView('therapists'); setIsSidebarOpen(false); }} />
                  <NavItem icon={<Sparkles size={22} />} label="Regulate" active={currentView === 'coping'} onClick={() => { setCurrentView('coping'); setIsSidebarOpen(false); }} />
                  <NavItem icon={<Zap size={22} />} label="Release" active={currentView === 'outlets'} onClick={() => { setCurrentView('outlets'); setIsSidebarOpen(false); }} />
                  <NavItem icon={<Map size={22} />} label="Path" active={currentView === 'progress'} onClick={() => { setCurrentView('progress'); setIsSidebarOpen(false); }} />
                  <NavItem icon={<BookOpen size={22} />} label="Learn" active={currentView === 'learning'} onClick={() => { setCurrentView('learning'); setIsSidebarOpen(false); }} />
                </nav>

                <div className="p-6 mt-auto">
                  <button className="flex items-center justify-center lg:justify-start space-x-3 text-slate-500 hover:text-amber-200 transition-colors duration-500">
                    <Settings size={20} />
                    <span className="hidden lg:inline text-sm font-light">Settings</span>
                  </button>
                </div>
              </div>
            </motion.aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-full overflow-hidden w-full relative bg-[#FDFBF7]">
              {/* Minimal Header */}
              <header className="h-24 flex items-center justify-between px-6 lg:px-12 bg-transparent z-10">
                <button onClick={toggleSidebar} className="lg:hidden text-slate-800 p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <Menu size={24} />
                </button>
                
                <div className="flex-1"></div>

                <div className="flex items-center space-x-6">
                  <button className="text-slate-400 hover:text-slate-800 transition-colors duration-500">
                    <Search size={20} />
                  </button>
                  <button className="relative text-slate-400 hover:text-slate-800 transition-colors duration-500">
                    <Bell size={20} />
                  </button>
                  <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden ring-2 ring-white ring-offset-2 ring-offset-[#FDFBF7] shadow-sm">
                     <img src="https://images.unsplash.com/photo-1583525225141-1adb30017fd0?auto=format&fit=crop&q=80&w=100&h=100" alt="User" className="w-full h-full object-cover" />
                  </div>
                </div>
              </header>

              {/* Scrollable Content Area */}
              <div className="flex-1 overflow-y-auto px-6 lg:px-12 pb-12 scroll-smooth no-scrollbar">
                <div className="max-w-6xl mx-auto h-full">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentView}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
                      className="h-full"
                    >
                      {renderView()}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function WelcomeScreen({ onEnter }: { onEnter: () => void }) {
  const [canEnter, setCanEnter] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setCanEnter(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0F172A] text-white"
    >
      <div className="absolute inset-0 opacity-30">
         <BackgroundNeurons />
      </div>
      
      <div className="relative z-10 text-center space-y-8 p-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-6xl font-serif tracking-tight mb-4 text-slate-50">Neurovia</h1>
          <p className="text-slate-400 font-light tracking-wide text-lg font-serif italic">A place for your brain to rest.</p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: canEnter ? 1 : 0 }}
          transition={{ duration: 1.5 }}
          onClick={onEnter}
          disabled={!canEnter}
          className="mt-16 px-10 py-3 rounded-full border border-amber-500/30 text-amber-100 hover:bg-amber-500/10 hover:border-amber-400/50 transition-all duration-700 tracking-widest text-xs uppercase"
        >
          Enter
        </motion.button>
      </div>
    </motion.div>
  );
}

function BackgroundNeurons() {
  return (
    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.path
          key={i}
          d={`M ${Math.random() * 100} ${Math.random() * 100} C ${Math.random() * 100} ${Math.random() * 100}, ${Math.random() * 100} ${Math.random() * 100}, ${Math.random() * 100} ${Math.random() * 100}`}
          stroke="url(#gradient)"
          strokeWidth="0.1"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 0.3, 0] }}
          transition={{ 
            duration: 15 + Math.random() * 10, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: Math.random() * 5 
          }}
        />
      ))}
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#94A3B8" stopOpacity="0" />
          <stop offset="50%" stopColor="#FCD34D" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#94A3B8" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`group w-full flex items-center lg:space-x-4 p-3 rounded-xl transition-all duration-700
        ${active 
          ? 'bg-slate-800 text-amber-100 shadow-inner' 
          : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
        }`}
    >
      <span className={`transition-transform duration-700 ${active ? 'scale-110 text-amber-200' : 'group-hover:scale-105'}`}>
        {icon}
      </span>
      <span className="hidden lg:block font-light tracking-wide text-sm">{label}</span>
    </button>
  );
}
