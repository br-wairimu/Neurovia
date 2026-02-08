import React, { useState } from 'react';
import { MapPin, ArrowUpRight, Zap, Wind, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const VENUES = [
  {
    id: 1,
    name: "The Smash Room",
    type: "Wreck Room",
    description: "Safely release pent-up energy by breaking inanimate objects.",
    location: "Downtown District",
    image: "https://images.unsplash.com/photo-1694405198073-7bd502a1f01e?auto=format&fit=crop&q=80&w=800&h=500",
    tags: ["High Intensity", "Stress Relief"],
    intent: "anger"
  },
  {
    id: 2,
    name: "Zenith Yoga Studio",
    type: "Yoga & Meditation",
    description: "Guided meditation and flow yoga for all experience levels.",
    location: "River North",
    image: "https://images.unsplash.com/photo-1618425977996-bebc5afe88f9?auto=format&fit=crop&q=80&w=800&h=500",
    tags: ["Calming", "Low Intensity"],
    intent: "calm"
  },
  {
    id: 3,
    name: "Ironclad Axe Throwing",
    type: "Axe Throwing",
    description: "Focus your mind and body with precision target practice.",
    location: "West End",
    image: "https://images.unsplash.com/photo-1761873763418-2c9596bc8c65?auto=format&fit=crop&q=80&w=800&h=500",
    tags: ["Moderate Intensity", "Focus"],
    intent: "anger"
  },
  {
    id: 4,
    name: "Vitality Gym",
    type: "Gym & Fitness",
    description: "Full service gym with personal trainers specialized in mental health.",
    location: "City Center",
    image: "https://images.unsplash.com/photo-1707365025743-23177fac01e2?auto=format&fit=crop&q=80&w=800&h=500",
    tags: ["Physical Health", "Endorphins"],
    intent: "move"
  }
];

export function Outlets() {
  const [intent, setIntent] = useState<'anger' | 'move' | 'calm' | null>(null);

  const filteredVenues = intent 
    ? VENUES.filter(v => v.intent === intent)
    : VENUES;

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Release & Regulate</h2>
        <p className="text-slate-500 max-w-2xl">
          Channel your emotions into the body. This isn't just about activity—it's about finding a safe physical outlet for what you're feeling right now.
        </p>
      </div>

      {/* Emotional Intent Selector */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">How do you need to feel?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <IntentButton 
            active={intent === 'anger'}
            onClick={() => setIntent(intent === 'anger' ? null : 'anger')}
            icon={<Zap size={24} />}
            title="I need to let anger out"
            desc="Wreck rooms, Axe throwing"
            color="bg-rose-50 text-rose-700 hover:bg-rose-100 border-rose-100"
          />
          <IntentButton 
            active={intent === 'move'}
            onClick={() => setIntent(intent === 'move' ? null : 'move')}
            icon={<Shield size={24} />}
            title="I need to move"
            desc="Gym, High-intensity cardio"
            color="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-indigo-100"
          />
          <IntentButton 
            active={intent === 'calm'}
            onClick={() => setIntent(intent === 'calm' ? null : 'calm')}
            icon={<Wind size={24} />}
            title="I need calm strength"
            desc="Yoga, Meditation, Pilates"
            color="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-100"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence>
          {filteredVenues.map((venue) => (
            <motion.div 
              key={venue.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              layout
              className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden group hover:shadow-lg transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={venue.image} 
                  alt={venue.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-sm font-medium text-indigo-300 mb-1">{venue.type}</p>
                  <h3 className="text-xl font-bold">{venue.name}</h3>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-slate-600 mb-4">{venue.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {venue.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-500 text-xs rounded-md font-medium">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center text-slate-500 text-sm">
                    <MapPin size={16} className="mr-1" />
                    {venue.location}
                  </div>
                  <button className="flex items-center text-indigo-600 font-bold text-sm hover:underline">
                    Book Session <ArrowUpRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function IntentButton({ active, onClick, icon, title, desc, color }: any) {
  return (
    <button 
      onClick={onClick}
      className={`p-6 rounded-xl border text-left transition-all duration-200 ${
        active 
          ? `${color} border-current ring-2 ring-offset-2 ring-current` 
          : 'bg-white border-slate-200 hover:border-indigo-200 hover:bg-slate-50'
      }`}
    >
      <div className={`mb-3 ${active ? 'text-current' : 'text-slate-400'}`}>
        {icon}
      </div>
      <h4 className={`font-bold text-lg mb-1 ${active ? 'text-current' : 'text-slate-900'}`}>{title}</h4>
      <p className={`text-sm ${active ? 'text-current opacity-80' : 'text-slate-500'}`}>{desc}</p>
    </button>
  );
}
