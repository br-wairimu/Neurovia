import React, { useState } from 'react';
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

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside 
        className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-indigo-600 font-bold text-xl">
              <Brain className="w-8 h-8" />
              <span>Neurovia</span>
            </div>
            <button onClick={toggleSidebar} className="lg:hidden text-slate-500 hover:text-slate-700">
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 px-4 space-y-2 py-4">
            <NavItem icon={<Brain size={20} />} label="Home (Neural Map)" active={currentView === 'dashboard'} onClick={() => { setCurrentView('dashboard'); setIsSidebarOpen(false); }} />
            <NavItem icon={<Users size={20} />} label="Connect (Therapy)" active={currentView === 'therapists'} onClick={() => { setCurrentView('therapists'); setIsSidebarOpen(false); }} />
            <NavItem icon={<Sparkles size={20} />} label="Regulate (Tools)" active={currentView === 'coping'} onClick={() => { setCurrentView('coping'); setIsSidebarOpen(false); }} />
            <NavItem icon={<Zap size={20} />} label="Release (Outlets)" active={currentView === 'outlets'} onClick={() => { setCurrentView('outlets'); setIsSidebarOpen(false); }} />
            <NavItem icon={<Map size={20} />} label="Path (Progress)" active={currentView === 'progress'} onClick={() => { setCurrentView('progress'); setIsSidebarOpen(false); }} />
            <NavItem icon={<BookOpen size={20} />} label="Learn" active={currentView === 'learning'} onClick={() => { setCurrentView('learning'); setIsSidebarOpen(false); }} />
          </nav>

          <div className="p-4 border-t border-slate-200">
            <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
              <img src="https://images.unsplash.com/photo-1583525225141-1adb30017fd0?auto=format&fit=crop&q=80&w=100&h=100" alt="User" className="w-10 h-10 rounded-full object-cover" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">Alex Morgan</p>
                <p className="text-xs text-slate-500 truncate">Premium Member</p>
              </div>
              <Settings size={18} className="text-slate-400" />
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden w-full relative">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8">
          <button onClick={toggleSidebar} className="lg:hidden text-slate-500 p-2 hover:bg-slate-100 rounded-lg">
            <Menu size={24} />
          </button>
          
          <div className="hidden md:flex items-center space-x-4 bg-slate-100 rounded-full px-4 py-2 w-96">
            <Search size={18} className="text-slate-400" />
            <input 
              type="text" 
              placeholder="Type to search..." 
              className="bg-transparent border-none outline-none text-sm w-full placeholder-slate-500"
            />
          </div>

          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 bg-slate-50 scroll-smooth">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentView}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {renderView()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
        ${active 
          ? 'bg-indigo-50 text-indigo-700' 
          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
        }`}
    >
      <span className={active ? 'text-indigo-600' : 'text-slate-400'}>{icon}</span>
      <span>{label}</span>
    </button>
  );
}
