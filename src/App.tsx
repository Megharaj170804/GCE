import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Courses } from './components/Courses';
import { Resources } from './components/Resources';
import { Projects } from './components/Projects';
import { Events } from './components/Events';
import { Community } from './components/Community';
import { Faculty } from './components/Faculty';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { NeuralBackground } from './components/NeuralBackground';
import { NeuralAssistant } from './components/NeuralAssistant';
import { AIVisualizer } from './components/AIVisualizer';
import { NeuralLab } from './components/NeuralLab';
import { StudentDashboard } from './components/StudentDashboard';
import { DepartmentRoadmap } from './components/DepartmentRoadmap';
import { NeuralNetworkBuilder } from './components/NeuralNetworkBuilder';
import { ArrowUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const [showBackToTop, setShowBackToTop] = React.useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Scroll Reveal Animations - Simplified to ensure visibility
    const sections = document.querySelectorAll('section');
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: section,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }, []);

  return (
    <div className="relative min-h-screen bg-space-black text-white selection:bg-neon-cyan selection:text-space-black">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[200] pointer-events-none">
        <motion.div
          className="h-full bg-gradient-to-r from-electric-purple via-neon-cyan to-hot-pink neon-glow-cyan"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <NeuralBackground />
      <div className="relative z-10">
        <Navbar />
        
        <main>
          <Hero />
          <About />
          <Courses />
          <DepartmentRoadmap />
          <NeuralNetworkBuilder />
          <NeuralLab />
          <StudentDashboard />
          <Resources />
          <AIVisualizer />
          <Projects />
          <Events />
          <Community />
          <Faculty />
          <Contact />
        </main>

        <Footer />
        <NeuralAssistant />

        {/* Back to Top */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="fixed bottom-32 right-8 w-12 h-12 glass rounded-full flex items-center justify-center text-neon-cyan hover:neon-glow-cyan transition-all z-40"
            >
              <ArrowUp className="w-6 h-6" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
