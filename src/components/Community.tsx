import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Bell, Users, Trophy, Send, ChevronDown, ChevronUp, Medal } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const Community: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const features = [
    { icon: MessageCircle, title: 'Discussion Forum', desc: 'Connect with peers and solve problems together.' },
    { icon: Bell, title: 'Announcements', desc: 'Never miss an update about the department.' },
    { icon: Users, title: 'Study Groups', desc: 'Collaborate on projects and exam prep.' },
    { icon: Trophy, title: 'Leaderboard', desc: 'Compete for the top spot in contributions.' },
  ];

  const leaderboard = [
    { name: 'Aditya Patil', points: 2450, rank: 1, avatar: 'AP' },
    { name: 'Sneha Joshi', points: 2100, rank: 2, avatar: 'SJ' },
    { name: 'Rahul Shinde', points: 1950, rank: 3, avatar: 'RS' },
    { name: 'Priya More', points: 1800, rank: 4, avatar: 'PM' },
  ];

  const faqs = [
    { q: "How can I join the AI & DS Club?", a: "You can join by clicking the 'Join Discord' button or visiting the department office to get added to the official WhatsApp group." },
    { q: "Are the resources free for all students?", a: "Yes, all study materials, datasets, and curated video lectures are completely free for GCE students." },
    { q: "Can I submit my own project to the showcase?", a: "Absolutely! Use the 'Submit Your Project' button in the Projects section to send your GitHub link and project details." },
    { q: "What are the eligibility criteria for Hackathons?", a: "Most hackathons are open to all engineering students, with special tracks for AI & DS enthusiasts." }
  ];

  return (
    <section id="community" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="glass p-8 md:p-20 rounded-[2rem] md:rounded-[3rem] relative overflow-hidden mb-16">
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-electric-purple/20 blur-[120px] -z-10" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-neon-cyan/20 blur-[120px] -z-10" />

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-6xl font-black mb-8 leading-tight">
                Join the <br />
                <span className="text-neon-cyan">GCE AI & DS</span> <br />
                Community
              </h2>
              <p className="text-base md:text-lg font-rajdhani text-white/60 mb-12">
                Be part of a thriving ecosystem of innovators. Share knowledge, build projects, and grow together.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                <button className="w-full sm:w-auto px-8 py-4 bg-neon-cyan text-space-black font-orbitron font-black rounded-full hover:neon-glow-cyan transition-all flex items-center justify-center gap-3">
                  <Send className="w-5 h-5" /> Join Discord
                </button>
                <button className="w-full sm:w-auto px-8 py-4 border-2 border-white/20 rounded-full font-orbitron font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                  <MessageCircle className="w-5 h-5" /> WhatsApp Group
                </button>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
                >
                  <f.icon className="w-8 h-8 md:w-10 md:h-10 text-neon-cyan mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg md:text-xl font-bold mb-2">{f.title}</h3>
                  <p className="text-sm font-rajdhani text-white/50">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Leaderboard */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-8 rounded-[2rem]"
          >
            <h3 className="text-2xl font-orbitron font-bold mb-8 flex items-center gap-3">
              <Medal className="w-6 h-6 text-yellow-400" /> Top Contributors
            </h3>
            <div className="space-y-4">
              {leaderboard.map((user) => (
                <div key={user.rank} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:neon-border-cyan transition-all">
                  <div className="flex items-center gap-4">
                    <span className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm",
                      user.rank === 1 ? "bg-yellow-400 text-black" : 
                      user.rank === 2 ? "bg-gray-300 text-black" : 
                      user.rank === 3 ? "bg-amber-600 text-white" : "bg-white/10"
                    )}>
                      {user.rank}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-electric-purple/20 flex items-center justify-center font-bold text-electric-purple">
                      {user.avatar}
                    </div>
                    <span className="font-rajdhani font-bold text-lg">{user.name}</span>
                  </div>
                  <span className="font-fira font-bold text-neon-cyan">{user.points} pts</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* FAQ Accordion */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-8 rounded-[2rem]"
          >
            <h3 className="text-2xl font-orbitron font-bold mb-8">Neural FAQ</h3>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="border-b border-white/10 pb-4">
                  <button
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="w-full flex items-center justify-between py-2 text-left hover:text-neon-cyan transition-colors"
                  >
                    <span className="font-rajdhani font-bold text-lg">{faq.q}</span>
                    {activeFaq === i ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                  <AnimatePresence>
                    {activeFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="py-4 text-white/60 font-rajdhani leading-relaxed">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
