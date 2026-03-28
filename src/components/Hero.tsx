import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Terminal, Cpu, Database, Layers, Code, Zap, Brain, Trophy } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const Hero: React.FC = () => {
  const [textIndex, setTextIndex] = useState(0);
  const texts = [
    "Learn Machine Learning 🤖",
    "Master Deep Learning 🧠",
    "Explore Data Science 📊",
    "Build AI-Powered Apps 🚀"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const floatingIcons = [
    { Icon: Cpu, color: 'text-electric-purple', delay: 0 },
    { Icon: Database, color: 'text-neon-cyan', delay: 1 },
    { Icon: Layers, color: 'text-hot-pink', delay: 2 },
    { Icon: Code, color: 'text-white', delay: 3 },
    { Icon: Zap, color: 'text-yellow-400', delay: 4 },
  ];

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
      {/* News Ticker */}
      <div className="absolute top-24 left-0 w-full bg-electric-purple/10 backdrop-blur-md border-y border-white/10 py-2 overflow-hidden z-20">
        <div className="flex whitespace-nowrap animate-marquee">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-8 px-4">
              <span className="text-xs font-orbitron font-bold text-neon-cyan flex items-center gap-2">
                <Zap className="w-3 h-3" /> ADMISSIONS OPEN FOR 2025-26
              </span>
              <span className="text-xs font-orbitron font-bold text-hot-pink flex items-center gap-2">
                <Brain className="w-3 h-3" /> NEW AI RESEARCH LAB INAUGURATED
              </span>
              <span className="text-xs font-orbitron font-bold text-white flex items-center gap-2">
                <Trophy className="w-3 h-3" /> GCE STUDENTS WIN NATIONAL HACKATHON
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center z-10 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black mb-6 leading-tight">
            Welcome to the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-purple via-neon-cyan to-hot-pink neon-text-cyan">
              Future of AI & Data Science
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-2xl font-rajdhani font-medium text-white/80 mb-8 max-w-3xl mx-auto px-4">
            Godavari College of Engineering — Empowering Students with Cutting-Edge Artificial Intelligence & Data Science Knowledge
          </p>

          <div className="h-16 mb-12 flex items-center justify-center">
            <motion.p
              key={textIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-xl sm:text-2xl md:text-3xl font-fira font-bold text-neon-cyan px-4"
            >
              {texts[textIndex]}
            </motion.p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
            <a
              href="#courses"
              className="w-full sm:w-auto px-8 py-4 bg-electric-purple rounded-full font-orbitron font-bold tracking-wider hover:neon-glow-purple transition-all transform hover:scale-105"
            >
              Explore Courses
            </a>
            <a
              href="#community"
              className="w-full sm:w-auto px-8 py-4 border-2 border-neon-cyan rounded-full font-orbitron font-bold tracking-wider hover:neon-glow-cyan transition-all transform hover:scale-105 text-neon-cyan"
            >
              Join Community
            </a>
          </div>
        </motion.div>
      </div>

      {/* Floating 3D-like icons - Hidden on very small screens for better performance */}
      <div className="absolute inset-0 pointer-events-none hidden sm:block">
        {floatingIcons.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              y: [0, -50, 0],
              x: [0, 30, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              delay: item.delay,
            }}
            className={cn(
              "absolute text-6xl opacity-20",
              i === 0 && "top-1/4 left-1/4",
              i === 1 && "top-1/3 right-1/4",
              i === 2 && "bottom-1/4 left-1/3",
              i === 3 && "bottom-1/3 right-1/3",
              i === 4 && "top-1/2 left-1/2",
              item.color
            )}
          >
            <item.Icon className="w-16 h-16" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};
