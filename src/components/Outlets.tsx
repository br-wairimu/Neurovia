import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Wind, Zap, ArrowRight, MapPin } from 'lucide-react';

const VENUES = [
  {
    id: 1,
    name: "The Smash Room",
    type: "Wreck Room",
    description: "Safely release pent-up energy.",
    location: "Downtown",
    image: "https://images.unsplash.com/photo-1694405198073-7bd502a1f01e?auto=format&fit=crop&q=80&w=800&h=500",
    intent: "let-go"
  },
  {
    id: 2,
    name: "Zenith Yoga Studio",
    type: "Yoga",
    description: "Flow and ground yourself.",
    location: "River North",
    image: "https://images.unsplash.com/photo-1618425977996-bebc5afe88f9?auto=format&fit=crop&q=80&w=800&h=500",
    intent: "ground"
  },
  {
    id: 3,
    name: "Ironclad Axe Throwing",
    type: "Axe Throwing",
    description: "Focus and release.",
    location: "West End",
    image: "https://images.unsplash.com/photo-1761873763418-2c9596bc8c65?auto=format&fit=crop&q=80&w=800&h=500",
    intent: "let-go"
  },
  {
    id: 4,
    name: "Vitality Gym",
    type: "Fitness",
    description: "Move the energy through you.",
    location: "City Center",
    image: "https://images.unsplash.com/photo-1707365025743-23177fac01e2?auto=format&fit=crop&q=80&w=800&h=500",
    intent: "move"
  }
];

export function Outlets() {
  const [intent, setIntent] = useState<'move' | 'let-go' | 'ground' | 'rest' | null>(null);

  const filteredVenues = intent 
    ? VENUES.filter(v => (v.intent === intent) || (intent === 'rest' && v.intent === 'ground'))
    : [];

  return (
    <div className="min-h-full flex flex-col items-center py-12">
      <div className="w-full max-w-4xl space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-serif text-slate-800 tracking-tight">Release</h2>
          <motion.p 
            key={intent ? 'selected' : 'prompt'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-slate-500 text-lg font-light"
          >
            {intent ? "Here are some ways to honor that need." : "What does your body need today?"}
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <IntentOption 
            active={intent === 'move'}
            label="Move"
            onClick={() => setIntent('move')}
            icon={<Zap size={24} />}
          />
          <IntentOption 
            active={intent === 'let-go'}
            label="Let Go"
            onClick={() => setIntent('let-go')}
            icon={<Shield size={24} />}
          />
          <IntentOption 
            active={intent === 'ground'}
            label="Ground"
            onClick={() => setIntent('ground')}
            icon={<Wind size={24} />}
          />
          <IntentOption 
            active={intent === 'rest'}
            label="Rest"
            onClick={() => setIntent('rest')}
            icon={<div className="w-6 h-6 rounded-full border-2 border-current opacity-60" />}
          />
        </div>

        <AnimatePresence mode="wait">
          {intent && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12"
            >
              {filteredVenues.length > 0 ? filteredVenues.map((venue) => (
                <div key={venue.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-700 border border-slate-100">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={venue.image} 
                      alt={venue.name} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/60 to-transparent" />
                    <div className="absolute bottom-6 left-6 text-white">
                      <p className="text-xs font-bold tracking-widest uppercase opacity-80 mb-2">{venue.type}</p>
                      <h3 className="text-xl font-serif tracking-wide">{venue.name}</h3>
                    </div>
                  </div>
                  <div className="p-8 flex justify-between items-end">
                    <div className="space-y-2">
                      <p className="text-slate-600 font-light">{venue.description}</p>
                      <div className="flex items-center text-xs text-slate-400">
                        <MapPin size={12} className="mr-1" /> {venue.location}
                      </div>
                    </div>
                    <button className="p-3 rounded-full bg-slate-50 text-slate-900 hover:bg-[#0F172A] hover:text-white transition-colors duration-500">
                      <ArrowRight size={20} />
                    </button>
                  </div>
                </div>
              )) : (
                <div className="col-span-2 text-center py-12 text-slate-400 font-serif italic text-lg">
                  Sometimes the best action is simply to breathe. <br/>You can close this app and just be.
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function IntentOption({ active, label, onClick, icon }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-8 rounded-3xl transition-all duration-700 ${
        active 
          ? 'bg-[#0F172A] text-white shadow-xl scale-105' 
          : 'bg-white text-slate-400 hover:bg-slate-50 border border-slate-100'
      }`}
    >
      <div className="mb-4 opacity-80">{icon}</div>
      <span className="font-medium tracking-wide text-sm font-sans">{label}</span>
    </button>
  );
}
