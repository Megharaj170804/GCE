import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Github, Globe, Plus } from 'lucide-react';

export const Projects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: containerRef });

  const projects = [
    {
      title: 'Disease Prediction using ML',
      stack: ['Python', 'Scikit-learn', 'Flask'],
      desc: 'Predicting multiple diseases based on symptoms with high accuracy.',
      image: 'https://picsum.photos/seed/med/600/400'
    },
    {
      title: 'Stock Price Forecasting',
      stack: ['LSTM', 'TensorFlow', 'Pandas'],
      desc: 'Time-series analysis for predicting market trends using deep learning.',
      image: 'https://picsum.photos/seed/stock/600/400'
    },
    {
      title: 'AI Chatbot',
      stack: ['NLP', 'HuggingFace', 'React'],
      desc: 'A conversational agent capable of understanding context and intent.',
      image: 'https://picsum.photos/seed/bot/600/400'
    },
    {
      title: 'Face Recognition Attendance',
      stack: ['OpenCV', 'DeepFace', 'Firebase'],
      desc: 'Automated attendance system using real-time facial recognition.',
      image: 'https://picsum.photos/seed/face/600/400'
    },
    {
      title: 'COVID-19 Data Dashboard',
      stack: ['Plotly', 'Dash', 'REST API'],
      desc: 'Interactive visualization of global pandemic statistics.',
      image: 'https://picsum.photos/seed/covid/600/400'
    }
  ];

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <h2 className="text-4xl md:text-6xl font-black mb-6">
          Innovation <span className="text-neon-cyan text-glow">Showcase</span>
        </h2>
        <p className="text-lg font-rajdhani text-white/60">
          Explore groundbreaking projects built by our talented AI & DS students.
        </p>
      </div>

      {/* Horizontal Scroll Container */}
      <div 
        ref={containerRef}
        className="flex gap-8 overflow-x-auto pb-12 px-6 no-scrollbar cursor-grab active:cursor-grabbing"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {projects.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex-shrink-0 w-[350px] md:w-[450px] glass rounded-3xl overflow-hidden group border border-white/10 hover:neon-border-cyan transition-all duration-500"
            style={{ scrollSnapAlign: 'center' }}
          >
            <div className="relative h-64 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-space-black to-transparent opacity-60" />
            </div>
            <div className="p-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {project.stack.map(s => (
                  <span key={s} className="px-3 py-1 rounded-full bg-electric-purple/20 text-electric-purple text-[10px] font-orbitron font-bold border border-electric-purple/30">
                    {s}
                  </span>
                ))}
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-neon-cyan transition-colors">{project.title}</h3>
              <p className="text-sm font-rajdhani text-white/60 mb-8 line-clamp-2">
                {project.desc}
              </p>
              <div className="flex gap-4">
                <button className="flex-1 py-3 glass rounded-xl flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
                  <Github className="w-4 h-4" /> Code
                </button>
                <button className="flex-1 py-3 bg-neon-cyan/20 text-neon-cyan rounded-xl flex items-center justify-center gap-2 hover:bg-neon-cyan hover:text-space-black transition-all font-bold">
                  <Globe className="w-4 h-4" /> Live Demo
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 text-center">
        <button className="px-12 py-4 glass rounded-full font-orbitron font-bold hover:neon-glow-cyan transition-all flex items-center gap-3 mx-auto group">
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          Submit Your Project
        </button>
      </div>
    </section>
  );
};
