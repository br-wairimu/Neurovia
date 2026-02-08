import React, { useState } from 'react';
import { Search, MapPin, Star, Video, Mic, MessageSquare, Filter, Globe, Clock } from 'lucide-react';
import { motion } from 'motion/react';

const THERAPISTS = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    role: "Clinical Psychologist",
    specialties: ["PTSD", "Anxiety", "Trauma"],
    rating: 4.9,
    reviews: 124,
    location: "New York, USA",
    timezone: "EST (UTC-5)",
    languages: ["English", "Mandarin"],
    quote: "I help people who feel stuck in their own heads find a way out.",
    image: "https://images.unsplash.com/photo-1733685318562-c726472bc1db?auto=format&fit=crop&q=80&w=400&h=400",
    availability: "Available Today",
    types: ["video", "audio"]
  },
  {
    id: 2,
    name: "Dr. James Wilson",
    role: "Licensed Therapist",
    specialties: ["Veterans", "Depression", "Men's Health"],
    rating: 4.8,
    reviews: 98,
    location: "London, UK",
    timezone: "GMT (UTC+0)",
    languages: ["English"],
    quote: "Rebuilding strength isn't about ignoring pain, but understanding it.",
    image: "https://images.unsplash.com/photo-1583525225141-1adb30017fd0?auto=format&fit=crop&q=80&w=400&h=400",
    availability: "Next Available: Tomorrow",
    types: ["video", "chat"]
  },
  {
    id: 3,
    name: "Maya Patel",
    role: "Counselor",
    specialties: ["Bipolar Disorder", "Family Therapy"],
    rating: 5.0,
    reviews: 56,
    location: "Mumbai, India",
    timezone: "IST (UTC+5:30)",
    languages: ["English", "Hindi", "Gujarati"],
    quote: "Together we can navigate the highs and lows to find your balance.",
    image: "https://images.unsplash.com/photo-1733685318562-c726472bc1db?auto=format&fit=crop&q=80&w=400&h=400", 
    availability: "Available Today",
    types: ["audio", "chat"]
  },
  {
    id: 4,
    name: "David Okonjo",
    role: "Psychiatrist",
    specialties: ["Suicide Prevention", "Crisis Management"],
    rating: 4.9,
    reviews: 210,
    location: "Lagos, Nigeria",
    timezone: "WAT (UTC+1)",
    languages: ["English", "Yoruba"],
    quote: "In your darkest moments, I am here to hold the light with you.",
    image: "https://images.unsplash.com/photo-1583525225141-1adb30017fd0?auto=format&fit=crop&q=80&w=400&h=400",
    availability: "Urgent Care Available",
    types: ["video", "audio", "chat"]
  }
];

const SPECIALTIES = ["All", "PTSD", "Veterans", "Bipolar", "Suicide Prevention", "Anxiety", "Grief"];

export function TherapistList() {
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTherapists = THERAPISTS.filter(therapist => {
    const matchesSpecialty = selectedSpecialty === "All" || therapist.specialties.includes(selectedSpecialty);
    const matchesSearch = therapist.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          therapist.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          therapist.languages.some(l => l.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSpecialty && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Connect</h2>
          <p className="text-slate-500">Therapists without borders. Find the right human for you.</p>
        </div>
        
        <div className="flex gap-2">
          <button className="flex items-center px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50">
            <Filter size={16} className="mr-2" /> Filters
          </button>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by name, specialty, or language..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          {SPECIALTIES.map(specialty => (
            <button
              key={specialty}
              onClick={() => setSelectedSpecialty(specialty)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedSpecialty === specialty 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {specialty}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredTherapists.map(therapist => (
          <motion.div 
            key={therapist.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col md:flex-row"
          >
            <div className="p-6 flex-1">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <img src={therapist.image} alt={therapist.name} className="w-16 h-16 rounded-full object-cover border-2 border-indigo-100" />
                  <div>
                    <h3 className="font-bold text-slate-900">{therapist.name}</h3>
                    <div className="flex items-center text-xs text-slate-500 gap-2 mt-1">
                       <span className="flex items-center"><MapPin size={12} className="mr-1" /> {therapist.location}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center bg-amber-50 px-2 py-1 rounded text-xs font-bold text-amber-700">
                  <Star size={12} className="fill-amber-500 text-amber-500 mr-1" />
                  {therapist.rating}
                </div>
              </div>

              <blockquote className="text-slate-600 italic text-sm mb-4 border-l-2 border-indigo-200 pl-3">
                "{therapist.quote}"
              </blockquote>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center"><Globe size={12} className="mr-1" /> {therapist.languages.join(", ")}</span>
                    <span className="flex items-center"><Clock size={12} className="mr-1" /> {therapist.timezone}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {therapist.specialties.map(s => (
                    <span key={s} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                <div className="flex gap-2">
                    {therapist.types.includes('video') && <div className="p-2 bg-indigo-50 text-indigo-600 rounded-full" title="Video Session"><Video size={16} /></div>}
                    {therapist.types.includes('audio') && <div className="p-2 bg-indigo-50 text-indigo-600 rounded-full" title="Audio Session"><Mic size={16} /></div>}
                    {therapist.types.includes('chat') && <div className="p-2 bg-indigo-50 text-indigo-600 rounded-full" title="Chat Session"><MessageSquare size={16} /></div>}
                </div>
                <button className="px-6 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors text-sm">
                  Book Session
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
