import React, { useState } from 'react';
import { Search, MapPin, Video, Mic, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';

const THERAPISTS = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    role: "Clinical Psychologist",
    location: "New York, USA",
    quote: "I help people who feel overwhelmed by their own thoughts.",
    image: "https://images.unsplash.com/photo-1733685318562-c726472bc1db?auto=format&fit=crop&q=80&w=400&h=400",
    types: ["video", "audio"]
  },
  {
    id: 2,
    name: "Dr. James Wilson",
    role: "Licensed Therapist",
    location: "London, UK",
    quote: "Rebuilding strength isn't about ignoring pain, but understanding it.",
    image: "https://images.unsplash.com/photo-1583525225141-1adb30017fd0?auto=format&fit=crop&q=80&w=400&h=400",
    types: ["video", "chat"]
  },
  {
    id: 3,
    name: "Maya Patel",
    role: "Counselor",
    location: "Mumbai, India",
    quote: "Together we can navigate the highs and lows to find your balance.",
    image: "https://images.unsplash.com/photo-1733685318562-c726472bc1db?auto=format&fit=crop&q=80&w=400&h=400", 
    types: ["audio", "chat"]
  },
  {
    id: 4,
    name: "David Okonjo",
    role: "Psychiatrist",
    location: "Lagos, Nigeria",
    quote: "In your darkest moments, I am here to hold the light with you.",
    image: "https://images.unsplash.com/photo-1583525225141-1adb30017fd0?auto=format&fit=crop&q=80&w=400&h=400",
    types: ["video", "audio", "chat"]
  }
];

export function TherapistList() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTherapists = THERAPISTS.filter(therapist => 
    therapist.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-12 max-w-4xl mx-auto py-8">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-serif text-slate-800 tracking-tight">Connect</h2>
        <p className="text-slate-500 font-light text-lg">Therapists without borders. Find the right human for you.</p>
      </div>

      <div className="relative max-w-lg mx-auto mb-16">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-300" size={20} />
        <input 
          type="text" 
          placeholder="Search by name..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-white/50 backdrop-blur-sm border border-slate-100 rounded-full text-slate-600 focus:outline-none focus:ring-1 focus:ring-emerald-100 transition-all duration-300 font-light"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredTherapists.map((therapist, index) => (
          <motion.div 
            key={therapist.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            className="group bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-lg hover:border-emerald-50 transition-all duration-700"
          >
            <div className="flex items-center gap-6 mb-6">
              <div className="relative">
                <img src={therapist.image} alt={therapist.name} className="w-20 h-20 rounded-2xl object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700" />
              </div>
              <div>
                <h3 className="font-serif text-xl text-slate-800 tracking-wide">{therapist.name}</h3>
                <p className="text-slate-400 text-sm mt-1 font-light">{therapist.role}</p>
                <div className="flex items-center text-xs text-slate-300 mt-2">
                  <MapPin size={12} className="mr-1" /> {therapist.location}
                </div>
              </div>
            </div>

            <blockquote className="text-emerald-900/60 font-serif italic text-lg leading-relaxed mb-8">
              "{therapist.quote}"
            </blockquote>

            <div className="flex items-center justify-between pt-6 border-t border-slate-50">
              <div className="flex gap-3">
                {therapist.types.includes('video') && <span className="text-slate-300"><Video size={18} /></span>}
                {therapist.types.includes('audio') && <span className="text-slate-300"><Mic size={18} /></span>}
                {therapist.types.includes('chat') && <span className="text-slate-300"><MessageSquare size={18} /></span>}
              </div>
              <button className="text-emerald-700 hover:text-emerald-800 font-medium text-sm tracking-wide transition-colors">
                Talk when ready
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
