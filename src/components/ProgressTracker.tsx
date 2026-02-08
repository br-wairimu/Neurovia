import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Calendar, CheckCircle, Star, ArrowRight } from 'lucide-react';

export function ProgressTracker() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-slate-900">Path</h2>
        <p className="text-slate-500">Your journey isn't linear. Progress means simply showing up.</p>
      </div>

      {/* Path Visualization */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <h3 className="text-lg font-bold text-slate-800 mb-8 flex items-center">
          <Calendar className="mr-2 text-indigo-500" /> Recent Journey
        </h3>
        
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-100"></div>

          <div className="space-y-8 relative">
            <TimelineItem 
              date="Today"
              title="Daily Check-in"
              desc="You acknowledged your feelings."
              icon={<CheckCircle size={20} />}
              status="completed"
            />
            <TimelineItem 
              date="Yesterday"
              title="Therapy Session"
              desc="Attended session with Dr. Chen"
              icon={<Star size={20} />}
              status="completed"
            />
            <TimelineItem 
              date="Feb 6"
              title="Breathing Exercise"
              desc="Completed 5 min calm session"
              icon={<CheckCircle size={20} />}
              status="completed"
            />
            <TimelineItem 
              date="Feb 4"
              title="Wreck Room"
              desc="Release session"
              icon={<Star size={20} />}
              status="completed"
            />
          </div>
        </div>
      </div>

      {/* Achievements / Milestones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold flex items-center">
              <Trophy className="mr-2 text-yellow-400" /> Milestones
            </h3>
          </div>
          <div className="space-y-4">
            <Milestone title="First Step" desc="Completed your first check-in" progress={100} />
            <Milestone title="Consistent Care" desc="Logged in 3 days this week" progress={60} />
            <Milestone title="Explorer" desc="Tried 3 different coping tools" progress={33} />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-slate-200 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Next on Your Path</h3>
            <p className="text-slate-500 mb-6">Based on your recent check-ins, we recommend:</p>
            
            <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100 mb-4">
              <h4 className="font-bold text-indigo-900">Understanding Triggers</h4>
              <p className="text-sm text-indigo-700 mt-1">A short article on identifying what starts the cycle.</p>
            </div>
          </div>
          
          <button className="w-full py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors flex items-center justify-center">
            Start Learning <ArrowRight size={16} className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
}

function TimelineItem({ date, title, desc, icon, status }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-start pl-2"
    >
      <div className="flex flex-col items-center mr-6 z-10 bg-white">
        <div className={`w-12 h-12 rounded-full border-4 border-white shadow-sm flex items-center justify-center ${
          status === 'completed' ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-400'
        }`}>
          {icon}
        </div>
      </div>
      <div className="pt-2 pb-6">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">{date}</span>
        <h4 className="text-lg font-bold text-slate-900">{title}</h4>
        <p className="text-slate-500">{desc}</p>
      </div>
    </motion.div>
  );
}

function Milestone({ title, desc, progress }: any) {
  return (
    <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm border border-white/10">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-bold text-sm">{title}</h4>
        {progress === 100 && <CheckCircle size={16} className="text-emerald-400" />}
      </div>
      <p className="text-xs text-indigo-200 mb-3">{desc}</p>
      <div className="w-full bg-black/20 h-1.5 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-1000 ${progress === 100 ? 'bg-emerald-400' : 'bg-indigo-400'}`} 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}
