import React from 'react';
import { motion } from 'motion/react';
import { Linkedin, Mail } from 'lucide-react';

export const Faculty: React.FC = () => {
  const faculty = [
    { name: 'Dr. A. R. Patil', role: 'HOD - AI & DS', spec: 'Machine Learning', img: 'https://picsum.photos/seed/fac1/200/200' },
    { name: 'Prof. S. V. Deshmukh', role: 'Assistant Professor', spec: 'Deep Learning', img: 'https://picsum.photos/seed/fac2/200/200' },
    { name: 'Prof. M. K. Joshi', role: 'Assistant Professor', spec: 'Computer Vision', img: 'https://picsum.photos/seed/fac3/200/200' },
    { name: 'Prof. P. B. Kulkarni', role: 'Assistant Professor', spec: 'NLP & LLMs', img: 'https://picsum.photos/seed/fac4/200/200' },
    { name: 'Prof. R. T. Shinde', role: 'Assistant Professor', spec: 'Data Analytics', img: 'https://picsum.photos/seed/fac5/200/200' },
    { name: 'Prof. V. G. More', role: 'Assistant Professor', spec: 'Cloud AI', img: 'https://picsum.photos/seed/fac6/200/200' },
  ];

  return (
    <section id="faculty" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Our <span className="text-hot-pink">Mentors</span>
          </h2>
          <p className="text-lg font-rajdhani text-white/60 max-w-2xl mx-auto">
            Learn from industry-leading experts who are passionate about teaching and research.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {faculty.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative"
            >
              <div className="relative mb-6">
                <div className="aspect-square rounded-full overflow-hidden border-2 border-white/10 group-hover:border-neon-cyan transition-all duration-500">
                  <img
                    src={f.img}
                    alt={f.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                {/* Hover Overlay */}
                <div className="absolute inset-0 rounded-full bg-space-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-neon-cyan hover:text-space-black transition-all">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-hot-pink hover:text-white transition-all">
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
              <div className="text-center">
                <h3 className="font-orbitron font-bold text-sm mb-1 group-hover:text-neon-cyan transition-colors">{f.name}</h3>
                <p className="text-[10px] font-rajdhani font-bold text-white/40 uppercase mb-2">{f.role}</p>
                <span className="text-[10px] font-fira text-neon-cyan bg-neon-cyan/10 px-2 py-0.5 rounded">
                  {f.spec}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
