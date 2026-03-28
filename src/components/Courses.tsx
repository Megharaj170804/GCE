import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, BrainCircuit, BarChart3, Eye, MessageSquare, Cloud, ChevronRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface Course {
  id: number;
  title: string;
  icon: any;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  tech: string[];
  color: string;
}

export const Courses: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced'>('All');

  const courses: Course[] = [
    {
      id: 1,
      title: 'Machine Learning Fundamentals',
      icon: Bot,
      difficulty: 'Beginner',
      description: 'Supervised, Unsupervised, Reinforcement Learning — Python, Scikit-learn',
      tech: ['Python', 'Scikit-learn', 'NumPy'],
      color: 'border-neon-cyan'
    },
    {
      id: 2,
      title: 'Deep Learning & Neural Networks',
      icon: BrainCircuit,
      difficulty: 'Intermediate',
      description: 'CNNs, RNNs, Transformers — TensorFlow, PyTorch',
      tech: ['TensorFlow', 'PyTorch', 'Keras'],
      color: 'border-electric-purple'
    },
    {
      id: 3,
      title: 'Data Science & Analytics',
      icon: BarChart3,
      difficulty: 'Beginner',
      description: 'EDA, Data Visualization, Statistics — Pandas, Matplotlib, Seaborn',
      tech: ['Pandas', 'Matplotlib', 'Seaborn'],
      color: 'border-hot-pink'
    },
    {
      id: 4,
      title: 'Computer Vision',
      icon: Eye,
      difficulty: 'Intermediate',
      description: 'Image Recognition, Object Detection — OpenCV, YOLO',
      tech: ['OpenCV', 'YOLO', 'MediaPipe'],
      color: 'border-yellow-400'
    },
    {
      id: 5,
      title: 'Natural Language Processing',
      icon: MessageSquare,
      difficulty: 'Advanced',
      description: 'Text Analysis, LLMs, Chatbots — HuggingFace, NLTK',
      tech: ['HuggingFace', 'NLTK', 'Spacy'],
      color: 'border-green-400'
    },
    {
      id: 6,
      title: 'AI on Cloud',
      icon: Cloud,
      difficulty: 'Advanced',
      description: 'Deploying ML Models — AWS, Google Cloud, Azure AI',
      tech: ['AWS', 'GCP', 'Azure'],
      color: 'border-blue-400'
    }
  ];

  const filteredCourses = filter === 'All' ? courses : courses.filter(c => c.difficulty === filter);

  return (
    <section id="courses" className="py-24 relative bg-space-black/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Master the <span className="text-electric-purple">Curriculum</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {['All', 'Beginner', 'Intermediate', 'Advanced'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={cn(
                  "px-6 py-2 rounded-full font-orbitron text-sm font-bold transition-all",
                  filter === f ? "bg-electric-purple text-white neon-glow-purple" : "glass text-white/50 hover:text-white"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode='popLayout'>
            {filteredCourses.map((course) => (
              <motion.div
                key={course.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -10 }}
                className="group perspective-1000"
              >
                <div className="relative h-[400px] w-full transition-all duration-500 preserve-3d group-hover:rotate-y-180">
                  {/* Front */}
                  <div className={cn(
                    "absolute inset-0 backface-hidden glass rounded-3xl p-8 flex flex-col items-center justify-center text-center border-t-4",
                    course.color
                  )}>
                    <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:neon-glow-cyan transition-all">
                      <course.icon className="w-10 h-10 text-neon-cyan" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{course.title}</h3>
                    <span className="px-4 py-1 rounded-full bg-white/10 text-xs font-orbitron text-white/70">
                      {course.difficulty}
                    </span>
                  </div>

                  {/* Back */}
                  <div className={cn(
                    "absolute inset-0 backface-hidden rotate-y-180 glass rounded-3xl p-8 flex flex-col justify-between border-b-4",
                    course.color
                  )}>
                    <div>
                      <h4 className="text-xl font-bold mb-4 text-neon-cyan">Course Overview</h4>
                      <p className="text-sm font-rajdhani text-white/80 mb-6">
                        {course.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {course.tech.map(t => (
                          <span key={t} className="text-[10px] font-fira bg-white/5 px-2 py-1 rounded border border-white/10">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button className="w-full py-3 bg-white/10 hover:bg-electric-purple rounded-xl font-orbitron font-bold transition-all flex items-center justify-center gap-2 group/btn">
                      Enroll Now <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
