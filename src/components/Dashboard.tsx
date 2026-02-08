import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Sparkles, Zap, Map } from 'lucide-react';
import { View } from '../types';

interface DashboardProps {
  onChangeView: (view: View) => void;
}

export function Dashboard({ onChangeView }: DashboardProps) {
  const [checkedIn, setCheckedIn] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] w-full max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        {!checkedIn ? (
          <CheckInScreen onComplete={() => setCheckedIn(true)} />
        ) : (
          <NeuralMap onChangeView={onChangeView} />
        )}
      </AnimatePresence>
    </div>
  );
}

function CheckInScreen({ onComplete }: { onComplete: () => void }) {
  const [dragY, setDragY] = useState(0);

  return (
    <motion.div
      key="check-in"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="flex flex-col items-center justify-center w-full space-y-16"
    >
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-4xl md:text-5xl font-serif text-slate-800 text-center tracking-tight"
      >
        How does your mind feel right now?
      </motion.h2>

      <div className="relative h-64 w-64 flex items-center justify-center">
        {/* Pulsing Core */}
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full bg-emerald-50/50 blur-2xl"
        />
        
        {/* Interactive Circle */}
        <motion.div
          drag="y"
          dragConstraints={{ top: -50, bottom: 50 }}
          dragElastic={0.2}
          onDrag={(_, info) => setDragY(info.offset.y)}
          onDragEnd={(_, info) => {
            if (Math.abs(info.offset.y) > 20) {
              setTimeout(onComplete, 800);
            }
          }}
          className="relative z-10 w-32 h-32 rounded-full bg-gradient-to-b from-white to-emerald-50/30 shadow-2xl shadow-emerald-900/5 flex items-center justify-center cursor-grab active:cursor-grabbing border border-white/80"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-800/20" />
        </motion.div>

        {/* Hints */}
        <motion.div 
          style={{ opacity: Math.max(0, 1 - Math.abs(dragY) / 30) }}
          className="absolute top-full mt-8 text-xs text-slate-400 tracking-widest uppercase font-sans"
        >
          Drag to respond
        </motion.div>
      </div>

      <AnimatePresence>
        {Math.abs(dragY) > 20 && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-emerald-700/80 font-serif italic text-lg"
          >
            Thank you for noticing.
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function NeuralMap({ onChangeView }: { onChangeView: (view: View) => void }) {
  return (
    <motion.div
      key="neural-map"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="w-full flex flex-col items-center justify-center space-y-12"
    >
      {/* Abstract Node Cluster */}
      <div className="relative w-full max-w-2xl aspect-square md:aspect-video flex items-center justify-center">
        <NeuralConnections />
        
        {/* Zone Nodes */}
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-8 md:gap-20 p-8 md:p-12">
          <ZoneNode 
            icon={<Users className="w-6 h-6" />}
            title="Connect"
            desc="Talk when ready"
            onClick={() => onChangeView('therapists')}
            delay={0.2}
            position="bottom-right"
          />
          <ZoneNode 
            icon={<Sparkles className="w-6 h-6" />}
            title="Regulate"
            desc="Breathe & rest"
            onClick={() => onChangeView('coping')}
            delay={0.4}
            position="bottom-left"
          />
          <ZoneNode 
            icon={<Zap className="w-6 h-6" />}
            title="Release"
            desc="Move & let go"
            onClick={() => onChangeView('outlets')}
            delay={0.6}
            position="top-right"
          />
          <ZoneNode 
            icon={<Map className="w-6 h-6" />}
            title="Path"
            desc="Your journey"
            onClick={() => onChangeView('progress')}
            delay={0.8}
            position="top-left"
          />
        </div>
      </div>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="text-slate-400 font-serif italic text-lg"
      >
        Nothing here is urgent.
      </motion.p>
    </motion.div>
  );
}

function ZoneNode({ icon, title, desc, onClick, delay }: any) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ delay, duration: 1, ease: "easeOut" }}
      onClick={onClick}
      className={`relative group flex flex-col items-center justify-center p-8 rounded-full bg-white/60 backdrop-blur-sm border border-slate-100 shadow-sm hover:shadow-xl hover:bg-white/80 transition-all duration-700 w-full h-full max-w-[180px] max-h-[180px] mx-auto aspect-square`}
    >
      <div className="text-slate-400 mb-3 opacity-70 group-hover:opacity-100 transition-opacity duration-500 group-hover:text-emerald-700/60">
        {icon}
      </div>
      <h3 className="text-xl font-serif text-slate-700 tracking-tight">{title}</h3>
      <p className="text-xs text-slate-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-light">
        {desc}
      </p>
      
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full bg-emerald-500/5 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-1000 -z-10" />
    </motion.button>
  );
}

function NeuralConnections() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-20">
      <svg className="w-full h-full">
        <motion.path 
          d="M 25% 25% Q 50% 50% 75% 75%" 
          stroke="currentColor" 
          strokeWidth="1" 
          className="text-slate-400"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />
        <motion.path 
          d="M 75% 25% Q 50% 50% 25% 75%" 
          stroke="currentColor" 
          strokeWidth="1" 
          className="text-slate-400"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, delay: 0.5, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}
