import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wind, Focus, Music, Hand } from 'lucide-react';

export function CopingHub() {
  const [activeTab, setActiveTab] = useState<'calm' | 'focus' | 'soothe'>('calm');

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-slate-900">Regulate</h2>
        <p className="text-slate-500">Tools to help your nervous system regulate. Zero scores. Zero judgment.</p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center p-1 bg-white rounded-xl shadow-sm border border-slate-200 w-fit mx-auto">
        <TabButton 
          active={activeTab === 'calm'} 
          onClick={() => setActiveTab('calm')} 
          icon={<Wind size={18} />} 
          label="Calm" 
        />
        <TabButton 
          active={activeTab === 'focus'} 
          onClick={() => setActiveTab('focus')} 
          icon={<Focus size={18} />} 
          label="Focus" 
        />
        <TabButton 
          active={activeTab === 'soothe'} 
          onClick={() => setActiveTab('soothe')} 
          icon={<Music size={18} />} 
          label="Soothe" 
        />
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 min-h-[500px] p-4 md:p-8 flex items-center justify-center relative overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === 'calm' && (
            <motion.div 
              key="calm"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="w-full"
            >
              <BreathingExercise />
            </motion.div>
          )}
          {activeTab === 'focus' && (
            <motion.div 
              key="focus"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="w-full h-96"
            >
              <FocusActivity />
            </motion.div>
          )}
          {activeTab === 'soothe' && (
            <motion.div 
              key="soothe"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="w-full"
            >
              <SootheHub />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
        active ? 'bg-indigo-100 text-indigo-800 shadow-sm' : 'text-slate-500 hover:text-slate-900'
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

  useEffect(() => {
    if (!isPlaying) {
      setText("Ready?");
      return;
    }
    
    let isMounted = true;
    const cycle = async () => {
      while (isMounted && isPlaying) {
        setText("Breathe In...");
        await new Promise(r => setTimeout(r, 4000));
        if (!isMounted || !isPlaying) break;
        setText("Hold...");
        await new Promise(r => setTimeout(r, 4000));
        if (!isMounted || !isPlaying) break;
        setText("Breathe Out...");
        await new Promise(r => setTimeout(r, 4000));
      }
    };
    cycle();
    return () => { isMounted = false; };
  }, [isPlaying]);

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="relative h-64 w-64 mb-12 flex items-center justify-center">
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
          className="absolute inset-0 bg-indigo-300 rounded-full blur-xl"
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
          className="relative z-10 w-48 h-48 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg"
        >
          {text}
        </motion.div>
      </div>
      
      <button 
        onClick={() => setIsPlaying(!isPlaying)}
        className="px-8 py-3 bg-slate-900 text-white rounded-full font-medium hover:bg-slate-800 transition-colors shadow-lg"
      >
        {isPlaying ? "Pause Exercise" : "Start Breathing"}
      </button>
    </div>
  );
}

function FocusActivity() {
  const [targets, setTargets] = useState<{id: number, x: number, y: number}[]>([]);

  const addTarget = () => {
    if (targets.length > 5) return;
    const newTarget = {
      id: Date.now(),
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10
    };
    setTargets(prev => [...prev, newTarget]);
  };

  const removeTarget = (id: number) => {
    setTargets(prev => prev.filter(t => t.id !== id));
    setTimeout(addTarget, 300);
  };

  useEffect(() => {
    addTarget();
    const interval = setInterval(() => {
        if(Math.random() > 0.6) addTarget();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full relative bg-slate-50 rounded-xl border border-slate-200 overflow-hidden cursor-crosshair">
       <div className="absolute top-4 left-4 right-4 text-center pointer-events-none z-10">
         <p className="text-slate-500 font-medium">Click the circles to reset your attention.</p>
         <p className="text-slate-400 text-xs mt-1">No timer. No score. Just focus.</p>
       </div>
       {targets.map(target => (
         <motion.button
           key={target.id}
           initial={{ scale: 0, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           exit={{ scale: 0, opacity: 0 }}
           onClick={() => removeTarget(target.id)}
           className="absolute w-12 h-12 rounded-full bg-indigo-400/80 hover:bg-indigo-600 transition-colors flex items-center justify-center shadow-sm"
           style={{ left: `${target.x}%`, top: `${target.y}%` }}
         >
         </motion.button>
       ))}
    </div>
  );
}

function SootheHub() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-800 flex items-center">
          <Music className="mr-2 text-indigo-500" /> Audio Landscapes
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {['Rain', 'Forest', 'Waves', 'Vinyl'].map(sound => (
            <button key={sound} className="p-4 bg-slate-50 hover:bg-indigo-50 rounded-lg text-sm font-medium text-slate-700 transition-colors border border-slate-100 hover:border-indigo-100">
              {sound}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-800 flex items-center">
          <Hand className="mr-2 text-indigo-500" /> Tactile Flow
        </h3>
        <div className="h-48 bg-slate-50 rounded-xl border border-slate-200 overflow-hidden relative cursor-move group">
          <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm pointer-events-none group-hover:opacity-0 transition-opacity">
            Drag to create ripples
          </div>
          <InteractiveParticles />
        </div>
      </div>
    </div>
  );
}

function InteractiveParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: {x: number, y: number, r: number, life: number}[] = [];
    let animationFrame: number;

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 300;
      canvas.height = canvas.parentElement?.clientHeight || 200;
    };
    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles = particles.filter(p => p.life > 0);
      particles.forEach(p => {
        p.life -= 0.02;
        p.r += 0.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${p.life * 0.3})`;
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(animate);
    };
    animate();

    const handleMove = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = ('touches' in e ? e.touches[0].clientX : e.clientX) - rect.left;
      const y = ('touches' in e ? e.touches[0].clientY : e.clientY) - rect.top;
      
      particles.push({ x, y, r: 2, life: 1 });
    };

    canvas.addEventListener('mousemove', handleMove);
    canvas.addEventListener('touchmove', handleMove);

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMove);
      canvas.removeEventListener('touchmove', handleMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}
