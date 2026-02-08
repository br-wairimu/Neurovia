import React, { useState } from 'react';
import { Search, MapPin, Star, MessageCircle, Calendar, Filter } from 'lucide-react';
import { motion } from 'motion/react';

const THERAPISTS = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    role: "Clinical Psychologist",
    specialties: ["PTSD", "Anxiety", "Trauma"],
    rating: 4.9,
    reviews: 124,
    location: "New York, NY (Remote Available)",
    image: "https://images.unsplash.com/photo-1733685318562-c726472bc1db?auto=format&fit=crop&q=80&w=400&h=400",
    availability: "Available Today"
  },
  {
    id: 2,
    name: "Dr. James Wilson",
    role: "Licensed Therapist",
    specialties: ["Veterans", "Depression", "Men's Health"],
    rating: 4.8,
    reviews: 98,
    location: "Chicago, IL (Remote Available)",
    image: "https://images.unsplash.com/photo-1583525225141-1adb30017fd0?auto=format&fit=crop&q=80&w=400&h=400",
    availability: "Next Available: Tomorrow"
  },
  {
    id: 3,
    name: "Maya Patel",
    role: "Counselor",
    specialties: ["Bipolar Disorder", "Family Therapy"],
    rating: 5.0,
    reviews: 56,
    location: "London, UK (Remote Only)",
    image: "https://images.unsplash.com/photo-1733685318562-c726472bc1db?auto=format&fit=crop&q=80&w=400&h=400", 
    availability: "Available Today"
  },
  // Reusing first image as a placeholder for third since I only requested two distinct portraits
  {
    id: 4,
    name: "David Okonjo",
    role: "Psychiatrist",
    specialties: ["Suicide Prevention", "Crisis Management"],
    rating: 4.9,
    reviews: 210,
    location: "Toronto, Canada",
    image: "https://images.unsplash.com/photo-1583525225141-1adb30017fd0?auto=format&fit=crop&q=80&w=400&h=400",
    availability: "Urgent Care Available"
  }
];

const SPECIALTIES = ["All", "PTSD", "Veterans", "Bipolar", "Suicide Prevention", "Anxiety", "Depression"];

export function TherapistList() {
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTherapists = THERAPISTS.filter(therapist => {
    const matchesSpecialty = selectedSpecialty === "All" || therapist.specialties.includes(selectedSpecialty);
    const matchesSearch = therapist.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          therapist.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSpecialty && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Find a Professional</h2>
          <p className="text-slate-500">Connect with licensed therapists worldwide.</p>
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
            placeholder="Search by name or specialty..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          {SPECIALTIES.map(specialty => (
            <button
              key={specialty}
              onClick={() => setSelectedSpecialty(specialty)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedSpecialty === specialty 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {specialty}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTherapists.map(therapist => (
          <motion.div 
            key={therapist.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <img src={therapist.image} alt={therapist.name} className="w-16 h-16 rounded-full object-cover border-2 border-emerald-100" />
                  <div>
                    <h3 className="font-bold text-slate-900">{therapist.name}</h3>
                    <p className="text-sm text-slate-500">{therapist.role}</p>
                  </div>
                </div>
                <div className="flex items-center bg-amber-50 px-2 py-1 rounded text-xs font-bold text-amber-700">
                  <Star size={12} className="fill-amber-500 text-amber-500 mr-1" />
                  {therapist.rating}
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-slate-600">
                  <MapPin size={16} className="mr-2 text-slate-400" />
                  {therapist.location}
                </div>
                <div className="flex flex-wrap gap-2">
                  {therapist.specialties.map(s => (
                    <span key={s} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center">
                  <Calendar size={16} className="mr-2" /> Book
                </button>
                <button className="px-3 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600">
                  <MessageCircle size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
