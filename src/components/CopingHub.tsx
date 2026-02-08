import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Wind, PenTool, Music, Play, Pause, RefreshCw } from 'lucide-react';

export function CopingHub() {
  const [activeTab, setActiveTab] = useState<'breathe' | 'journal' | 'sound'>('breathe');

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-slate-900">Coping Mechanisms</h2>
        <p className="text-slate-500">Interactive tools to help you ground yourself and find calm.</p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center p-1 bg-white rounded-xl shadow-sm border border-slate-200 w-fit mx-auto">
        <TabButton 
          active={activeTab === 'breathe'} 
          onClick={() => setActiveTab('breathe')} 
          icon={<Wind size={18} />} 
          label="Breathing" 
        />
        <TabButton 
          active={activeTab === 'journal'} 
          onClick={() => setActiveTab('journal')} 
          icon={<PenTool size={18} />} 
          label="Journaling" 
        />
        <TabButton 
          active={activeTab === 'sound'} 
          onClick={() => setActiveTab('sound')} 
          icon={<Music size={18} />} 
          label="Soundscapes" 
        />
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 min-h-[400px] p-8 flex items-center justify-center relative overflow-hidden">
        {activeTab === 'breathe' && <BreathingExercise />}
        {activeTab === 'journal' && <QuickJournal />}
        {activeTab === 'sound' && <SoundscapePlayer />}
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
        active ? 'bg-emerald-100 text-emerald-800 shadow-sm' : 'text-slate-500 hover:text-slate-900'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function BreathingExercise() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [text, setText] = useState("Ready?");

  React.useEffect(() => {
    if (!isPlaying) {
      setText("Ready?");
      return;
    }
    
    const cycle = async () => {
      while (isPlaying) {
        setText("Breathe In...");
        await new Promise(r => setTimeout(r, 4000));
        if (!isPlaying) break;
        setText("Hold...");
        await new Promise(r => setTimeout(r, 4000));
        if (!isPlaying) break;
        setText("Breathe Out...");
        await new Promise(r => setTimeout(r, 4000));
      }
    };
    cycle();
  }, [isPlaying]);

  return (
    <div className="text-center w-full max-w-md">
      <div className="relative h-64 w-64 mx-auto mb-8 flex items-center justify-center">
        <motion.div
          animate={isPlaying ? {
            scale: [1, 1.5, 1.5, 1],
            opacity: [0.6, 0.8, 0.8, 0.6]
          } : { scale: 1, opacity: 0.6 }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.33, 0.66, 1]
          }}
          className="absolute inset-0 bg-emerald-300 rounded-full blur-xl"
        />
        <motion.div
          animate={isPlaying ? {
            scale: [1, 1.2, 1.2, 1]
          } : { scale: 1 }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.33, 0.66, 1]
          }}
          className="relative z-10 w-48 h-48 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg"
        >
          {text}
        </motion.div>
      </div>
      
      <button 
        onClick={() => setIsPlaying(!isPlaying)}
        className="px-8 py-3 bg-slate-900 text-white rounded-full font-medium hover:bg-slate-800 transition-colors flex items-center gap-2 mx-auto"
      >
        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        {isPlaying ? "Pause Exercise" : "Start Breathing"}
      </button>
    </div>
  );
}

function QuickJournal() {
  return (
    <div className="w-full h-full flex flex-col">
      <h3 className="text-xl font-bold text-slate-800 mb-4">What's on your mind?</h3>
      <textarea 
        className="flex-1 w-full p-4 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none mb-4"
        placeholder="Write freely... your entries are private."
      ></textarea>
      <div className="flex justify-between items-center">
        <p className="text-sm text-slate-400">Autosaved just now</p>
        <button className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
          Save Entry
        </button>
      </div>
    </div>
  );
}

function SoundscapePlayer() {
  const sounds = [
    { name: "Rain", icon: "🌧️" },
    { name: "Forest", icon: "🌲" },
    { name: "Ocean", icon: "🌊" },
    { name: "White Noise", icon: "📻" }
  ];

  return (
    <div className="w-full max-w-lg">
      <h3 className="text-xl font-bold text-center text-slate-800 mb-8">Ambient Sounds</h3>
      <div className="grid grid-cols-2 gap-4">
        {sounds.map((sound) => (
          <button 
            key={sound.name}
            className="p-6 rounded-xl border border-slate-200 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-200 transition-all group text-left"
          >
            <span className="text-3xl mb-2 block">{sound.icon}</span>
            <span className="font-semibold text-slate-700 group-hover:text-emerald-700">{sound.name}</span>
            <div className="flex items-center gap-2 mt-2 text-xs text-slate-400">
              <Play size={12} /> Click to play
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
