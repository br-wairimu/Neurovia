import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Activity, Calendar, Award, Book } from 'lucide-react';
import { View } from '../types';

interface DashboardProps {
  onChangeView: (view: View) => void;
}

export function Dashboard({ onChangeView }: DashboardProps) {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white shadow-lg">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl font-bold mb-2">Good Morning, Alex</h1>
          <p className="text-emerald-100 text-lg mb-6">
            "The journey of a thousand miles begins with a single step." Take a moment for yourself today.
          </p>
          <div className="flex space-x-4">
            <button 
              onClick={() => onChangeView('therapists')}
              className="px-5 py-2.5 bg-white text-emerald-700 font-semibold rounded-lg shadow-sm hover:bg-emerald-50 transition-colors"
            >
              Find Support
            </button>
            <button 
              onClick={() => onChangeView('coping')}
              className="px-5 py-2.5 bg-emerald-700/50 text-white font-semibold rounded-lg backdrop-blur-sm hover:bg-emerald-700/70 transition-colors"
            >
              Quick Relief
            </button>
          </div>
        </div>
        
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-20 -mb-10 w-40 h-40 bg-teal-400/20 rounded-full blur-2xl"></div>
      </div>

      {/* Quick Stats/Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={<Activity className="text-rose-500" />}
          title="Mood Check-in"
          value="Stable"
          subtext="+2 days streak"
          color="bg-rose-50"
          onClick={() => onChangeView('progress')}
        />
        <StatCard 
          icon={<Calendar className="text-indigo-500" />}
          title="Next Session"
          value="Tomorrow, 2 PM"
          subtext="Dr. Sarah Chen"
          color="bg-indigo-50"
          onClick={() => onChangeView('therapists')}
        />
        <StatCard 
          icon={<Award className="text-amber-500" />}
          title="Goals Met"
          value="12/15"
          subtext="Keep it up!"
          color="bg-amber-50"
          onClick={() => onChangeView('learning')}
        />
        <StatCard 
          icon={<Book className="text-blue-500" />}
          title="Daily Read"
          value="Mindfulness"
          subtext="5 min read"
          color="bg-blue-50"
          onClick={() => onChangeView('learning')}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recommended Activities */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800">Recommended for You</h2>
            <button onClick={() => onChangeView('outlets')} className="text-emerald-600 text-sm font-medium hover:underline flex items-center">
              View all <ArrowRight size={16} className="ml-1" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ActivityCard 
              image="https://images.unsplash.com/photo-1618425977996-bebc5afe88f9?auto=format&fit=crop&q=80&w=600&h=400"
              title="Sunset Yoga"
              category="Meditation"
              duration="45 min"
              action="Book Session"
            />
            <ActivityCard 
              image="https://images.unsplash.com/photo-1761873763418-2c9596bc8c65?auto=format&fit=crop&q=80&w=600&h=400"
              title="Stress Relief Axe Throwing"
              category="Physical Outlet"
              duration="60 min"
              action="Reserve Spot"
            />
          </div>
        </div>

        {/* Daily Affirmation / Mini-game teaser */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-4">Daily Breath</h3>
            <p className="text-slate-600 mb-6">Take a moment to center yourself. Follow the circle.</p>
            <div className="flex justify-center py-8">
              <motion.div 
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-24 h-24 bg-emerald-400/30 rounded-full flex items-center justify-center backdrop-blur-sm"
              >
                <div className="w-12 h-12 bg-emerald-500 rounded-full shadow-lg"></div>
              </motion.div>
            </div>
          </div>
          <button 
            onClick={() => onChangeView('coping')}
            className="w-full py-2 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition-colors"
          >
            Start Exercise
          </button>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, subtext, color, onClick }: any) {
  return (
    <motion.button 
      whileHover={{ y: -2 }}
      onClick={onClick}
      className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-left w-full hover:shadow-md transition-all"
    >
      <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <p className="text-sm text-slate-500 font-medium mb-1">{title}</p>
      <h3 className="text-xl font-bold text-slate-900 mb-1">{value}</h3>
      <p className="text-xs text-emerald-600 font-medium">{subtext}</p>
    </motion.button>
  );
}

function ActivityCard({ image, title, category, duration, action }: any) {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-white shadow-sm border border-slate-200 hover:shadow-md transition-all">
      <div className="aspect-video w-full overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">{category}</span>
          <span className="text-xs text-slate-500 flex items-center"><Activity size={12} className="mr-1" /> {duration}</span>
        </div>
        <h3 className="font-bold text-slate-900 mb-1">{title}</h3>
        <button className="mt-3 w-full py-2 bg-slate-900 text-white text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
          {action}
        </button>
      </div>
    </div>
  );
}
