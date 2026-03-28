import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, MapPin, Mail, Globe, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { cn } from '@/src/lib/utils';

export const Contact: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#7c3aed', '#00f5ff', '#f72585']
    });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-black mb-8">
              Get in <span className="text-neon-cyan">Touch</span>
            </h2>
            <p className="text-lg font-rajdhani text-white/60 mb-12">
              Have questions about the department or want to collaborate? Send us a message and we'll get back to you soon.
            </p>

            <div className="space-y-8">
              {[
                { icon: MapPin, text: 'Godavari College of Engineering, Maharashtra', color: 'text-neon-cyan' },
                { icon: Mail, text: 'aidsclub@gce.edu.in', color: 'text-electric-purple' },
                { icon: Globe, text: 'gce.edu.in', color: 'text-hot-pink' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6 group">
                  <div className={cn("w-14 h-14 rounded-2xl glass flex items-center justify-center group-hover:neon-glow-cyan transition-all", item.color)}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <span className="font-rajdhani font-bold text-xl">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-8 md:p-12 rounded-[2.5rem] relative"
          >
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                <CheckCircle2 className="w-24 h-24 text-neon-cyan animate-bounce" />
                <h3 className="text-3xl font-orbitron font-bold">Message Sent!</h3>
                <p className="text-white/60">Thank you for reaching out. We'll be in touch shortly.</p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="text-neon-cyan font-bold hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-orbitron font-bold text-white/40 uppercase ml-2">Name</label>
                    <input
                      required
                      type="text"
                      className="w-full px-6 py-4 glass rounded-2xl focus:neon-border-cyan outline-none transition-all font-rajdhani"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-orbitron font-bold text-white/40 uppercase ml-2">Email</label>
                    <input
                      required
                      type="email"
                      className="w-full px-6 py-4 glass rounded-2xl focus:neon-border-cyan outline-none transition-all font-rajdhani"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-orbitron font-bold text-white/40 uppercase ml-2">Department / Year</label>
                  <input
                    required
                    type="text"
                    className="w-full px-6 py-4 glass rounded-2xl focus:neon-border-cyan outline-none transition-all font-rajdhani"
                    placeholder="AI & DS - 3rd Year"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-orbitron font-bold text-white/40 uppercase ml-2">Message</label>
                  <textarea
                    required
                    rows={4}
                    className="w-full px-6 py-4 glass rounded-2xl focus:neon-border-cyan outline-none transition-all font-rajdhani resize-none"
                    placeholder="How can we help you?"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-5 bg-electric-purple rounded-2xl font-orbitron font-black text-lg hover:neon-glow-purple transition-all flex items-center justify-center gap-3 group"
                >
                  <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  Send Message
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
