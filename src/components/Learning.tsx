import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const ARTICLES = [
  {
    id: 1,
    title: "The Art of Doing Nothing",
    subtitle: "Why rest is productive.",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1717964134799-a98f497172a5?auto=format&fit=crop&q=80&w=400&h=250"
  },
  {
    id: 2,
    title: "Befriending Your Anxiety",
    subtitle: "It's trying to protect you.",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1618425977996-bebc5afe88f9?auto=format&fit=crop&q=80&w=400&h=250"
  },
  {
    id: 3,
    title: "Grounding Techniques",
    subtitle: "For moments of overwhelm.",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1583525225141-1adb30017fd0?auto=format&fit=crop&q=80&w=400&h=250"
  }
];

export function Learning() {
  return (
    <div className="py-12 max-w-4xl mx-auto space-y-12">
      <div className="space-y-4">
        <h2 className="text-4xl font-serif text-slate-800 tracking-tight">Learn</h2>
        <p className="text-slate-500 font-light text-lg">Gentle knowledge to support your journey.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {ARTICLES.map((article, index) => (
          <motion.div 
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 1 }}
            className="group cursor-pointer"
          >
            <div className="overflow-hidden rounded-2xl mb-6 shadow-sm border border-slate-100">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-48 object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-100" 
              />
            </div>
            <div className="space-y-2">
              <span className="text-xs font-medium tracking-widest text-slate-400 uppercase font-sans">{article.readTime}</span>
              <h3 className="text-xl font-serif text-slate-800 group-hover:text-emerald-700 transition-colors duration-500">{article.title}</h3>
              <p className="text-slate-500 font-light">{article.subtitle}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="p-10 bg-white rounded-3xl border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div>
          <h3 className="text-2xl font-serif text-slate-800 mb-2">Daily Wisdom</h3>
          <p className="text-emerald-700/60 font-serif italic text-lg">"You are not your thoughts. You are the observer of your thoughts."</p>
        </div>
        <button className="flex items-center text-slate-800 hover:text-emerald-700 transition-colors duration-300 font-medium">
          Read more <ArrowRight size={18} className="ml-2" />
        </button>
      </div>
    </div>
  );
}
