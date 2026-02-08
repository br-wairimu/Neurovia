import React from 'react';
import { BookOpen, Trophy, PlayCircle, Award, CheckCircle } from 'lucide-react';

const COURSES = [
  {
    id: 1,
    title: "Understanding Anxiety",
    author: "Dr. Sarah Chen",
    lessons: 12,
    progress: 45,
    image: "https://images.unsplash.com/photo-1717964134799-a98f497172a5?auto=format&fit=crop&q=80&w=400&h=250",
    tags: ["Anxiety", "Basics"]
  },
  {
    id: 2,
    title: "Sleep Hygiene Mastery",
    author: "Sleep Institute",
    lessons: 8,
    progress: 0,
    image: "https://images.unsplash.com/photo-1618425977996-bebc5afe88f9?auto=format&fit=crop&q=80&w=400&h=250",
    tags: ["Wellness", "Sleep"]
  },
  {
    id: 3,
    title: "PTSD Coping Strategies",
    author: "Veterans Support Group",
    lessons: 15,
    progress: 10,
    image: "https://images.unsplash.com/photo-1583525225141-1adb30017fd0?auto=format&fit=crop&q=80&w=400&h=250",
    tags: ["PTSD", "Advanced"]
  }
];

const REWARDS = [
  { name: "Early Riser", description: "Logged in 5 days in a row before 9AM", icon: "🌅", earned: true },
  { name: "Zen Master", description: "Completed 10 meditation sessions", icon: "🧘", earned: true },
  { name: "Social Butterfly", description: "Attended 3 group sessions", icon: "🦋", earned: false },
  { name: "Bookworm", description: "Read 5 articles this week", icon: "📚", earned: false },
];

export function Learning() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Learn & Grow</h2>
        <p className="text-slate-500">Curated courses and articles for your personal journey.</p>
      </div>

      {/* Continue Learning */}
      <section>
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
          <PlayCircle className="mr-2 text-indigo-600" /> Continue Learning
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COURSES.map(course => (
            <div key={course.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all">
              <div className="relative h-40">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                  {course.lessons} Lessons
                </div>
              </div>
              <div className="p-4">
                <h4 className="font-bold text-slate-900 mb-1">{course.title}</h4>
                <p className="text-sm text-slate-500 mb-3">By {course.author}</p>
                
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span>{course.progress}% Complete</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-4">
                  <div 
                    className="bg-indigo-500 h-full rounded-full transition-all duration-500" 
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>

                <button className="w-full py-2 border border-indigo-100 text-indigo-700 font-medium rounded-lg hover:bg-indigo-50 transition-colors text-sm">
                  {course.progress > 0 ? 'Resume' : 'Start Course'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Rewards */}
      <section className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold flex items-center">
            <Trophy className="mr-2 text-yellow-400" /> Your Achievements
          </h3>
          <span className="text-indigo-200 text-sm">View All</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {REWARDS.map((reward, i) => (
            <div 
              key={i} 
              className={`p-4 rounded-xl border ${
                reward.earned 
                  ? 'bg-white/10 border-white/20' 
                  : 'bg-transparent border-white/5 opacity-50'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-3xl">{reward.icon}</span>
                {reward.earned && <CheckCircle size={16} className="text-emerald-400" />}
              </div>
              <h4 className="font-bold text-sm mb-1">{reward.name}</h4>
              <p className="text-xs text-indigo-200">{reward.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
