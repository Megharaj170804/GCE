import React from 'react';
import { motion } from 'motion/react';
import { Brain, Rocket, Target, Users, Code, Cpu } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const roadmapSteps = [
  {
    year: '2025',
    title: 'Foundation & Core AI',
    description: 'Mastering Python, Statistics, and basic Neural Networks. Building the first intelligent agents.',
    icon: Brain,
    color: 'text-neon-cyan',
    glow: 'neon-glow-cyan',
  },
  {
    year: '2026',
    title: 'Advanced Deep Learning',
    description: 'Specializing in Computer Vision, NLP, and Generative AI models. Research-driven projects.',
    icon: Cpu,
    color: 'text-electric-purple',
    glow: 'neon-glow-purple',
  },
  {
    year: '2027',
    title: 'Industry Integration',
    description: 'Internships with top tech giants. Real-world AI deployment and MLOps mastery.',
    icon: Code,
    color: 'text-hot-pink',
    glow: 'neon-glow-pink',
  },
  {
    year: '2028',
    title: 'Innovation & Startups',
    description: 'Launching student-led AI startups. Contributing to global open-source AI frameworks.',
    icon: Rocket,
    color: 'text-yellow-400',
    glow: 'neon-glow-yellow',
  },
];

export const DepartmentRoadmap: React.FC = () => {
  return (
    <section id="roadmap" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-orbitron font-bold mb-4">
            Department <span className="text-hot-pink">Roadmap</span>
          </h2>
          <p className="text-xl font-rajdhani text-white/60 max-w-2xl mx-auto">
            Our strategic vision for the AI & Data Science department at Godavari College of Engineering.
          </p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-electric-purple via-neon-cyan to-hot-pink opacity-20 hidden md:block" />

          <div className="space-y-12 md:space-y-24">
            {roadmapSteps.map((step, i) => (
              <motion.div
                key={step.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className={cn(
                  "flex flex-col md:flex-row items-center gap-8 md:gap-0",
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                )}
              >
                {/* Content */}
                <div className="flex-1 w-full">
                  <div className={cn(
                    "glass p-8 rounded-3xl relative group hover:border-white/20 transition-all",
                    i % 2 === 0 ? "md:mr-12" : "md:ml-12"
                  )}>
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    <span className={cn("text-4xl font-orbitron font-black opacity-10 absolute top-4 right-8", step.color)}>
                      {step.year}
                    </span>
                    <h3 className="text-2xl font-orbitron font-bold mb-4 flex items-center gap-3">
                      <step.icon className={cn("w-6 h-6", step.color)} />
                      {step.title}
                    </h3>
                    <p className="text-lg font-rajdhani text-white/60 leading-relaxed">
                      {step.description}
                    </p>
                    
                    {/* Connector Dot for Desktop */}
                    <div className={cn(
                      "absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white z-10 hidden md:block",
                      i % 2 === 0 ? "-right-[58px]" : "-left-[58px]",
                      step.glow
                    )} />
                  </div>
                </div>

                {/* Spacer for Desktop */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
