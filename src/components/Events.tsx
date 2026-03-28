import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Trophy, Mic2, Target, GraduationCap, Clock } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const Events: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const targetDate = new Date('2025-10-24T00:00:00');
    const interval = setInterval(() => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();
      
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        mins: Math.floor((diff / 1000 / 60) % 60),
        secs: Math.floor((diff / 1000) % 60)
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const events = [
    {
      title: 'AI Hackathon 2025',
      date: 'Oct 24-25, 2025',
      icon: Trophy,
      desc: '24-hour inter-college hackathon to solve real-world problems.',
      color: 'text-neon-cyan'
    },
    {
      title: 'Guest Lecture Series',
      date: 'Monthly',
      icon: Mic2,
      desc: 'Industry AI experts share insights on the latest trends.',
      color: 'text-electric-purple'
    },
    {
      title: 'Kaggle Competition Club',
      date: 'Every Friday',
      icon: Target,
      desc: 'Weekly data challenges to sharpen your analytical skills.',
      color: 'text-hot-pink'
    },
    {
      title: 'Workshop: Prompt Engineering',
      date: 'Nov 12, 2025',
      icon: GraduationCap,
      desc: 'Master the art of communicating with LLMs effectively.',
      color: 'text-yellow-400'
    }
  ];

  return (
    <section id="events" className="py-24 relative bg-space-black/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8">
              Upcoming <br />
              <span className="text-neon-cyan">Neural Events</span>
            </h2>
            <p className="text-lg font-rajdhani text-white/60 mb-12">
              Stay updated with the latest hackathons, workshops, and guest lectures happening in our department.
            </p>

            <div className="glass p-8 rounded-3xl border-l-4 border-l-neon-cyan mb-12">
              <h3 className="text-xl font-orbitron font-bold mb-6 flex items-center gap-3">
                <Clock className="w-6 h-6 text-neon-cyan" /> Next Big Event Starts In:
              </h3>
              <div className="grid grid-cols-4 gap-4">
                {Object.entries(timeLeft).map(([label, value]) => (
                  <div key={label} className="text-center">
                    <div className="text-3xl md:text-4xl font-black text-white">{value}</div>
                    <div className="text-[10px] uppercase font-orbitron text-white/40">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {events.map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-6 rounded-2xl flex gap-6 group hover:neon-border-cyan transition-all"
              >
                <div className={cn("w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0", event.color)}>
                  <event.icon className="w-8 h-8" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-orbitron font-bold text-neon-cyan bg-neon-cyan/10 px-2 py-1 rounded">
                      {event.date}
                    </span>
                  </div>
                  <h4 className="text-xl font-bold mb-2 group-hover:text-neon-cyan transition-colors">{event.title}</h4>
                  <p className="text-sm font-rajdhani text-white/60">{event.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
