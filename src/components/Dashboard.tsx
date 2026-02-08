import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Activity, Zap, Wind, BookOpen } from 'lucide-react';
import { View } from '../types';

interface DashboardProps {
  onChangeView: (view: View) => void;
}

export function Dashboard({ onChangeView }: DashboardProps) {
  const [mood, setMood] = useState<number | null>(null);

  return (
    <div className="space-y-12">
      {/* Neural Map Visualization & Check-in */}
      <div className="relative min-h-[400px] flex flex-col items-center justify-center py-12">
        {/* Background Neural Network Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          <NeuralNetworkAnimation />
        </div>

        <div className="relative z-10 w-full max-w-2xl text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-light text-slate-800 mb-2">How is your brain today?</h1>
            <p className="text-slate-500">No judgment. Just checking in.</p>
          </motion.div>

          <div className="space-y-6">
            <div className="flex justify-center gap-4">
              {[1, 2, 3, 4, 5].map((level) => (
                <button
                  key={level}
                  onClick={() => setMood(level)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 ${
                    mood === level
                      ? 'bg-indigo-600 text-white shadow-lg scale-110'
                      : 'bg-white text-slate-400 border border-slate-200 hover:border-indigo-300 hover:text-indigo-500'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
            <div className="flex justify-between w-full max-w-xs mx-auto text-xs text-slate-400 uppercase tracking-wider">
              <span>Overwhelmed</span>
              <span>Balanced</span>
            </div>
          </div>

          {mood !== null && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8 text-left"
            >
              <SuggestionCard
                icon={<Activity className="text-indigo-500" />}
                title="Talk to someone"
                desc="Connect with a therapist who understands."
                onClick={() => onChangeView('therapists')}
              />
              <SuggestionCard
                icon={<Zap className="text-amber-500" />}
                title="Release energy"
                desc="Physical outlets to channel emotions."
                onClick={() => onChangeView('outlets')}
              />
              <SuggestionCard
                icon={<Wind className="text-emerald-500" />}
                title="Ground your body"
                desc="Calming games and breathing."
                onClick={() => onChangeView('coping')}
              />
              <SuggestionCard
                icon={<BookOpen className="text-blue-500" />}
                title="Learn something"
                desc="Articles to support your journey."
                onClick={() => onChangeView('learning')}
              />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

function SuggestionCard({ icon, title, desc, onClick }: any) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="flex items-start p-4 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl hover:bg-white hover:shadow-md transition-all text-left"
    >
      <div className="p-2 bg-slate-50 rounded-lg mr-4">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-slate-800">{title}</h3>
        <p className="text-sm text-slate-500">{desc}</p>
      </div>
    </motion.button>
  );
}

function NeuralNetworkAnimation() {
  // Simple node visualization using SVG
  const nodes = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    r: Math.random() * 2 + 1,
  }));

  return (
    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      {nodes.map((node, i) => (
        <React.Fragment key={i}>
          <motion.circle
            cx={node.x}
            cy={node.y}
            r={node.r}
            className="fill-indigo-200"
            animate={{
              cx: [node.x, node.x + (Math.random() * 10 - 5), node.x],
              cy: [node.y, node.y + (Math.random() * 10 - 5), node.y],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          {nodes.slice(i + 1, i + 3).map((target, j) => (
             <motion.line
               key={j}
               x1={node.x}
               y1={node.y}
               x2={target.x}
               y2={target.y}
               stroke="currentColor"
               strokeWidth="0.1"
               className="text-indigo-100"
               animate={{
                 x1: [node.x, node.x + (Math.random() * 10 - 5), node.x],
                 y1: [node.y, node.y + (Math.random() * 10 - 5), node.y],
                 x2: [target.x, target.x + (Math.random() * 10 - 5), target.x],
                 y2: [target.y, target.y + (Math.random() * 10 - 5), target.y],
               }}
               transition={{
                 duration: 5 + Math.random() * 5,
                 repeat: Infinity,
                 ease: "easeInOut"
               }}
             />
          ))}
        </React.Fragment>
      ))}
    </svg>
  );
}
