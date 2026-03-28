import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Brain, Trophy, Users } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const About: React.FC = () => {
  const stats = [
    { icon: GraduationCap, value: '200+', label: 'Students', color: 'text-neon-cyan' },
    { icon: Brain, value: '15+', label: 'AI Courses', color: 'text-electric-purple' },
    { icon: Trophy, value: '30+', label: 'Projects', color: 'text-hot-pink' },
    { icon: Users, value: '10+', label: 'Expert Faculty', color: 'text-white' },
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side: Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square glass rounded-3xl overflow-hidden relative group">
              <img
                src="https://picsum.photos/seed/college/800/800"
                alt="Godavari College"
                className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-space-black via-transparent to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 border-4 border-neon-cyan/30 rounded-full animate-ping" />
                <Brain className="w-24 h-24 text-neon-cyan absolute neon-glow-cyan" />
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-electric-purple rounded-tl-3xl" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-4 border-r-4 border-hot-pink rounded-br-3xl" />
          </motion.div>

          {/* Right Side: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-8">
              Shaping the <span className="text-neon-cyan">Next Gen</span> of AI Innovators
            </h2>
            <p className="text-lg font-rajdhani text-white/70 leading-relaxed mb-12">
              The AI & Data Science department at Godavari College of Engineering is dedicated to shaping the next generation of AI innovators. Our students learn from industry-relevant curriculum, hands-on projects, and real-world datasets — preparing them for the careers of tomorrow.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass p-6 rounded-2xl border-l-4 border-l-neon-cyan hover:neon-glow-cyan transition-all group"
                >
                  <stat.icon className={cn("w-8 h-8 mb-4", stat.color)} />
                  <h3 className="text-3xl font-orbitron font-black mb-1 group-hover:scale-110 transition-transform origin-left">
                    {stat.value}
                  </h3>
                  <p className="text-sm font-rajdhani font-bold text-white/50 uppercase tracking-widest">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
