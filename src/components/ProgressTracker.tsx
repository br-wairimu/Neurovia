import React from 'react';
import { motion } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Trophy, Calendar, CheckCircle, Star, ArrowRight, Medal, Crown } from 'lucide-react';

const MOOD_DATA = [
  { day: 'M', mood: 3 },
  { day: 'T', mood: 4 },
  { day: 'W', mood: 3 },
  { day: 'T', mood: 5 },
  { day: 'F', mood: 4 },
  { day: 'S', mood: 5 },
  { day: 'S', mood: 5 },
];

export function ProgressTracker() {
  return (
    <div className="py-8 max-w-5xl mx-auto space-y-16">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-serif text-slate-800 tracking-tight">Path</h2>
        <p className="text-slate-500 font-light text-lg">Your journey in waves, not lines.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Mood Graph */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-8">
             <h3 className="font-serif text-2xl text-slate-800">Rhythm</h3>
             <span className="text-xs font-medium tracking-widest uppercase text-slate-400">Weekly Flow</span>
          </div>
          
          <div className="h-64 w-full min-h-[250px]">
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={MOOD_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2DD4BF" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#2DD4BF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="day" 
                  stroke="#94a3b8" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  dy={10}
                />
                <YAxis hide domain={[0, 6]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    borderRadius: '12px', 
                    border: 'none',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                  cursor={{ stroke: '#cbd5e1', strokeDasharray: '4 4' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="mood" 
                  stroke="#2DD4BF" 
                  strokeWidth={2} 
                  fillOpacity={1} 
                  fill="url(#colorMood)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative py-4 pl-4">
           {/* Timeline Line */}
           <div className="absolute top-4 bottom-4 left-[27px] w-px bg-slate-200" />
           
           <div className="space-y-12">
              <TimelineItem 
                title="You showed up"
                date="Today"
                desc="Checked in with your feelings."
                active
              />
              <TimelineItem 
                title="You paused"
                date="Yesterday"
                desc="Completed 5 min breathing."
              />
              <TimelineItem 
                title="You connected"
                date="Feb 6"
                desc="Scheduled session with Dr. Chen."
              />
           </div>
        </div>
      </div>

      {/* Rewards & Achievements */}
      <div className="bg-[#0F172A] rounded-3xl p-8 md:p-12 text-slate-300 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h3 className="text-3xl font-serif text-white mb-2">Milestones</h3>
              <p className="text-slate-400 font-light">Small victories worth celebrating.</p>
            </div>
            <div className="text-amber-400 flex items-center gap-2 bg-amber-400/10 px-4 py-2 rounded-full border border-amber-400/20">
              <Crown size={16} />
              <span className="text-xs font-bold tracking-widest uppercase">Level 3</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <RewardCard 
              icon={<Star size={24} />}
              title="First Light"
              desc="Completed your first check-in."
              earned
            />
            <RewardCard 
              icon={<Medal size={24} />}
              title="Steady Heart"
              desc="3-day streak of calm."
              earned
            />
            <RewardCard 
              icon={<Trophy size={24} />}
              title="Explorer"
              desc="Tried all regulation tools."
              earned={false}
            />
          </div>
        </div>
      </div>
      
      <div className="text-center pt-8">
         <p className="text-slate-400 font-serif italic text-lg">"Progress is quiet."</p>
      </div>
    </div>
  );
}

function TimelineItem({ title, date, desc, active }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="relative flex items-start gap-6"
    >
      <div className={`relative z-10 w-14 h-14 rounded-full border-4 border-[#FDFBF7] flex items-center justify-center shadow-sm transition-colors duration-500 ${active ? 'bg-emerald-50 text-emerald-600' : 'bg-white text-slate-300'}`}>
        <CheckCircle size={20} />
      </div>
      <div className="pt-2">
        <span className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-1 block">{date}</span>
        <h4 className="text-lg font-serif text-slate-800">{title}</h4>
        <p className="text-slate-500 font-light text-sm">{desc}</p>
      </div>
    </motion.div>
  );
}

function RewardCard({ icon, title, desc, earned }: any) {
  return (
    <div className={`p-6 rounded-2xl border transition-all duration-500 ${earned ? 'bg-white/5 border-white/10' : 'bg-transparent border-white/5 opacity-50'}`}>
      <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${earned ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-800 text-slate-600'}`}>
        {icon}
      </div>
      <h4 className="text-white font-serif text-lg mb-1">{title}</h4>
      <p className="text-slate-400 text-sm font-light">{desc}</p>
      {earned && (
        <div className="mt-4 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-amber-400 w-full" />
        </div>
      )}
    </div>
  );
}
