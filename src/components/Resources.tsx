import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, BookOpen, Video, Code2, Database, Wrench, FileText, ExternalLink } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const Resources: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { name: 'Study Materials', icon: BookOpen, color: 'text-neon-cyan' },
    { name: 'Video Lectures', icon: Video, color: 'text-electric-purple' },
    { name: 'Coding Practice', icon: Code2, color: 'text-hot-pink' },
    { name: 'Datasets', icon: Database, color: 'text-yellow-400' },
    { name: 'Tools & Setup', icon: Wrench, color: 'text-green-400' },
    { name: 'Research Papers', icon: FileText, color: 'text-blue-400' },
  ];

  const resources = [
    { title: 'ML Cheat Sheet', category: 'Study Materials', link: '#' },
    { title: 'Neural Networks 101', category: 'Video Lectures', link: '#' },
    { title: 'Kaggle Titanic Challenge', category: 'Coding Practice', link: '#' },
    { title: 'UCI Heart Disease Data', category: 'Datasets', link: '#' },
    { title: 'VS Code AI Setup', category: 'Tools & Setup', link: '#' },
    { title: 'Attention is All You Need', category: 'Research Papers', link: '#' },
  ];

  const filteredResources = resources.filter(r => 
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="resources" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              Neural <span className="text-hot-pink">Vault</span>
            </h2>
            <p className="text-lg font-rajdhani text-white/60">
              Access curated study materials, datasets, and tools to accelerate your AI journey.
            </p>
          </div>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-5 h-5" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 glass rounded-2xl focus:neon-border-cyan outline-none transition-all font-rajdhani text-lg"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 rounded-3xl border-t border-white/10"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className={cn("p-3 rounded-xl bg-white/5", cat.color)}>
                  <cat.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold">{cat.name}</h3>
              </div>

              <div className="space-y-4">
                {filteredResources.filter(r => r.category === cat.name).map((res, j) => (
                  <a
                    key={j}
                    href={res.link}
                    className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all group"
                  >
                    <span className="font-rajdhani font-semibold">{res.title}</span>
                    <ExternalLink className="w-4 h-4 text-white/30 group-hover:text-neon-cyan transition-colors" />
                  </a>
                ))}
                {filteredResources.filter(r => r.category === cat.name).length === 0 && (
                  <p className="text-sm text-white/30 italic">No resources found in this category.</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
