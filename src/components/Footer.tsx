import React from 'react';
import { Github, Linkedin, Instagram, Youtube, Brain } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-20 relative overflow-hidden border-t border-white/10">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Brain className="w-8 h-8 text-neon-cyan" />
              <span className="font-orbitron font-bold text-2xl tracking-tighter">
                GCE <span className="text-electric-purple">·</span> AI & DS
              </span>
            </div>
            <p className="text-lg font-rajdhani text-white/50 max-w-md mb-8">
              Empowering the next generation of AI minds at Godavari College of Engineering. Building the future, one neuron at a time.
            </p>
            <div className="flex gap-6">
              {[Github, Linkedin, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-12 h-12 glass rounded-xl flex items-center justify-center hover:neon-glow-cyan hover:text-neon-cyan transition-all"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-orbitron font-bold text-lg mb-6 text-neon-cyan">Quick Links</h4>
            <ul className="space-y-4 font-rajdhani font-semibold text-white/60">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#courses" className="hover:text-white transition-colors">Courses</a></li>
              <li><a href="#projects" className="hover:text-white transition-colors">Projects</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-orbitron font-bold text-lg mb-6 text-hot-pink">Resources</h4>
            <ul className="space-y-4 font-rajdhani font-semibold text-white/60">
              <li><a href="#resources" className="hover:text-white transition-colors">Study Materials</a></li>
              <li><a href="#events" className="hover:text-white transition-colors">Events</a></li>
              <li><a href="#community" className="hover:text-white transition-colors">Community</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-rajdhani text-white/30 text-sm">
            © 2025 GCE AI & DS Hub — Godavari College of Engineering. All rights reserved.
          </p>
          <div className="flex gap-8 font-rajdhani text-white/30 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
