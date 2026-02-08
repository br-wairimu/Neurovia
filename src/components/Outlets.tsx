import React from 'react';
import { MapPin, ArrowUpRight } from 'lucide-react';

const VENUES = [
  {
    id: 1,
    name: "The Smash Room",
    type: "Wreck Room",
    description: "Safely release pent-up energy by breaking inanimate objects.",
    location: "Downtown District",
    image: "https://images.unsplash.com/photo-1694405198073-7bd502a1f01e?auto=format&fit=crop&q=80&w=800&h=500",
    tags: ["High Intensity", "Stress Relief"]
  },
  {
    id: 2,
    name: "Zenith Yoga Studio",
    type: "Yoga & Meditation",
    description: "Guided meditation and flow yoga for all experience levels.",
    location: "River North",
    image: "https://images.unsplash.com/photo-1618425977996-bebc5afe88f9?auto=format&fit=crop&q=80&w=800&h=500",
    tags: ["Calming", "Low Intensity"]
  },
  {
    id: 3,
    name: "Ironclad Axe Throwing",
    type: "Axe Throwing",
    description: "Focus your mind and body with precision target practice.",
    location: "West End",
    image: "https://images.unsplash.com/photo-1761873763418-2c9596bc8c65?auto=format&fit=crop&q=80&w=800&h=500",
    tags: ["Moderate Intensity", "Focus"]
  },
  {
    id: 4,
    name: "Vitality Gym",
    type: "Gym & Fitness",
    description: "Full service gym with personal trainers specialized in mental health.",
    location: "City Center",
    image: "https://images.unsplash.com/photo-1707365025743-23177fac01e2?auto=format&fit=crop&q=80&w=800&h=500",
    tags: ["Physical Health", "Endorphins"]
  }
];

export function Outlets() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Physical Outlets & Activities</h2>
          <p className="text-slate-500">Channel your emotions through movement and action.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {VENUES.map((venue) => (
          <div key={venue.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden group hover:shadow-lg transition-all duration-300">
            <div className="relative h-48 overflow-hidden">
              <img 
                src={venue.image} 
                alt={venue.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-sm font-medium text-emerald-300 mb-1">{venue.type}</p>
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
                <button className="flex items-center text-emerald-600 font-bold text-sm hover:underline">
                  Book Session <ArrowUpRight size={16} className="ml-1" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
