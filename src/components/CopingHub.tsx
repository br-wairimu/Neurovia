import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wind, Focus, Music, X } from 'lucide-react';

export function CopingHub() {
  const [activeActivity, setActiveActivity] = useState<'calm' | 'focus' | 'soothe' | null>(null);

  return (
    <div className="h-full w-full flex flex-col">
      <AnimatePresence mode="wait">
        {!activeActivity ? (
          <motion.div 
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center space-y-12 py-12"
          >
            <div className="text-center space-y-4 max-w-xl mx-auto">
              <h2 className="text-4xl font-serif text-slate-800 tracking-tight">Regulate</h2>
              <p className="text-slate-500 text-lg font-light">
                This helps your nervous system regulate. Zero scores. Zero pressure.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl px-4">
              <ActivityCard 
                icon={<Wind size={32} />}
                title="Calm"
                desc="Breathing & Grounding"
                onClick={() => setActiveActivity('calm')}
                color="bg-emerald-50 text-emerald-700/60"
              />
              <ActivityCard 
                icon={<Focus size={32} />}
                title="Focus"
                desc="Reset Attention"
                onClick={() => setActiveActivity('focus')}
                color="bg-slate-100 text-slate-600"
              />
              <ActivityCard 
                icon={<Music size={32} />}
                title="Soothe"
                desc="Audio & Tactile"
                onClick={() => setActiveActivity('soothe')}
                color="bg-amber-50 text-amber-700/60"
              />
            </div>
          </motion.div>
        ) : (
          <ActivityView type={activeActivity} onExit={() => setActiveActivity(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function ActivityCard({ icon, title, desc, onClick, color }: any) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`group relative overflow-hidden rounded-3xl p-8 text-left transition-all duration-700 border border-transparent hover:border-slate-100 hover:shadow-xl ${color} bg-opacity-40`}
    >
      <div className="relative z-10 flex flex-col h-64 justify-between">
        <div className="opacity-80 group-hover:scale-110 transition-transform duration-1000 origin-top-left">{icon}</div>
        <div>
          <h3 className="text-2xl font-serif tracking-wide mb-2">{title}</h3>
          <p className="opacity-70 font-light font-sans">{desc}</p>
        </div>
      </div>
    </motion.button>
  );
}

function ActivityView({ type, onExit }: { type: string, onExit: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
      className="fixed inset-0 z-50 bg-[#0F172A] flex flex-col text-slate-300"
    >
      <div className="absolute top-6 right-6 z-50">
        <button 
          onClick={onExit}
          className="p-4 rounded-full bg-white/5 backdrop-blur-md hover:bg-white/10 transition-colors shadow-sm text-slate-400 hover:text-white"
        >
          <X size={24} />
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center">
        {type === 'calm' && <BreathingExercise />}
        {type === 'focus' && <FocusActivity />}
        {type === 'soothe' && <SootheHub />}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5, duration: 2 }}
        className="absolute bottom-12 w-full text-center text-slate-500 font-serif italic text-sm"
      >
        You can stay here as long as you like.
      </motion.div>
    </motion.div>
  );
}

function BreathingExercise() {
  const [phase, setPhase] = useState("Breathe In");
  
  useEffect(() => {
    const cycle = [
      { text: "Breathe In", duration: 4000 },
      { text: "Hold", duration: 4000 },
      { text: "Breathe Out", duration: 4000 },
      { text: "Hold", duration: 4000 }
    ];
    
    let currentIndex = 0;
    
    const runCycle = async () => {
      while (true) {
        setPhase(cycle[currentIndex].text);
        await new Promise(r => setTimeout(r, cycle[currentIndex].duration));
        currentIndex = (currentIndex + 1) % cycle.length;
      }
    };
    
    runCycle();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <motion.div
        animate={{ 
          scale: [1, 1.5, 1.5, 1, 1],
          opacity: [0.2, 0.4, 0.4, 0.2, 0.2],
        }}
        transition={{ 
          duration: 16, 
          repeat: Infinity, 
          ease: "easeInOut",
          times: [0, 0.25, 0.5, 0.75, 1]
        }}
        className="w-64 h-64 rounded-full bg-emerald-500 blur-3xl absolute"
      />
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1.2, 1, 1],
          opacity: [0.6, 1, 1, 0.6, 0.6]
        }}
        transition={{ 
          duration: 16, 
          repeat: Infinity, 
          ease: "easeInOut",
          times: [0, 0.25, 0.5, 0.75, 1]
        }}
        className="relative z-10 text-3xl font-serif text-emerald-100 tracking-widest uppercase"
      >
        {phase}
      </motion.div>
    </div>
  );
}

function FocusActivity() {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-indigo-500/20 blur-xl"
          style={{
            width: Math.random() * 200 + 50,
            height: Math.random() * 200 + 50,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 200 - 100, 0],
            y: [0, Math.random() * 200 - 100, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 20 + Math.random() * 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
      <div className="absolute inset-0 flex items-center justify-center text-slate-500 font-light font-serif">
        Watch the shapes drift. No interaction required.
      </div>
    </div>
  );
}

function SootheHub() {
  const [playing, setPlaying] = useState<string | null>(null);
  
  return (
    <div className="grid grid-cols-2 gap-8 max-w-md">
      {['Rain', 'Forest', 'Ocean', 'Vinyl'].map(sound => (
        <button
          key={sound}
          onClick={() => setPlaying(playing === sound ? null : sound)}
          className={`h-32 w-32 rounded-full flex items-center justify-center transition-all duration-1000 font-serif text-lg ${
            playing === sound 
              ? 'bg-amber-900/40 text-amber-200 scale-110 shadow-[0_0_40px_rgba(251,191,36,0.1)] border border-amber-500/20' 
              : 'bg-white/5 text-slate-500 hover:bg-white/10 hover:text-slate-300 border border-white/5'
          }`}
        >
          {sound}
        </button>
      ))}
    </div>
  );
}
