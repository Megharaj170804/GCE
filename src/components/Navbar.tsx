import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Brain, Sun, Moon, Search, ChevronRight, Zap, Trophy } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Courses', href: '#courses' },
    { name: 'Roadmap', href: '#roadmap' },
    { name: 'Architect', href: '#builder' },
    { name: 'Lab', href: '#lab' },
    { name: 'Dashboard', href: '#dashboard' },
    { name: 'Resources', href: '#resources' },
    { name: 'Projects', href: '#projects' },
    { name: 'Events', href: '#events' },
    { name: 'Community', href: '#community' },
    { name: 'Contact', href: '#contact' },
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-[100] transition-all duration-300 px-4 md:px-6 py-4',
        isScrolled ? 'glass py-3' : 'bg-transparent'
      )}
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2 group shrink-0">
          <div className="relative">
            <Brain className="w-6 h-6 md:w-8 md:h-8 text-neon-cyan group-hover:text-hot-pink transition-colors duration-500" />
            <div className="absolute inset-0 blur-md bg-neon-cyan/50 group-hover:bg-hot-pink/50 transition-colors duration-500 -z-10" />
          </div>
          <span className="font-orbitron font-bold text-base sm:text-lg md:text-xl tracking-tighter">
            GCE <span className="text-electric-purple">·</span> AI & DS
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden xl:flex items-center gap-4 2xl:gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="font-rajdhani font-semibold text-sm 2xl:text-base tracking-wide hover:text-neon-cyan transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-cyan transition-all duration-300 group-hover:w-full neon-glow-cyan" />
            </a>
          ))}
          
          <div className="flex items-center gap-2 ml-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-full glass hover:neon-glow-cyan transition-all"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full glass hover:neon-glow-cyan transition-all"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile & Tablet Toggle */}
        <div className="xl:hidden flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 rounded-full glass"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full glass"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 glass rounded-lg relative z-[110]"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 p-4 glass border-t border-white/10 z-[90]"
          >
            <div className="max-w-3xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for courses, projects, or research..."
                className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-4 focus:outline-none focus:border-neon-cyan/50 transition-colors font-rajdhani text-lg"
                autoFocus
              />
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-orbitron text-white/40 hover:text-white"
              >
                ESC
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-space-black/95 backdrop-blur-md z-[105] xl:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-[400px] z-[110] xl:hidden glass flex flex-col p-8 pt-24 gap-4 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <Brain className="w-8 h-8 text-neon-cyan" />
                  <span className="font-orbitron font-bold text-xl">MENU</span>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 glass rounded-full"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-orbitron font-bold text-2xl hover:text-neon-cyan transition-all flex items-center justify-between group py-2 border-b border-white/5"
                >
                  <span className="group-hover:translate-x-2 transition-transform">{link.name}</span>
                  <ChevronRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-all text-neon-cyan" />
                </motion.a>
              ))}

              <div className="mt-auto pt-8 flex flex-col gap-4">
                <div className="flex items-center justify-center gap-6">
                  {/* Social Icons Mockup */}
                  <div className="w-10 h-10 rounded-full glass flex items-center justify-center hover:neon-glow-cyan transition-all cursor-pointer">
                    <Zap className="w-5 h-5 text-neon-cyan" />
                  </div>
                  <div className="w-10 h-10 rounded-full glass flex items-center justify-center hover:neon-glow-purple transition-all cursor-pointer">
                    <Brain className="w-5 h-5 text-electric-purple" />
                  </div>
                  <div className="w-10 h-10 rounded-full glass flex items-center justify-center hover:neon-glow-pink transition-all cursor-pointer">
                    <Trophy className="w-5 h-5 text-hot-pink" />
                  </div>
                </div>
                <p className="text-xs font-fira text-white/20 text-center uppercase tracking-widest">
                  NeuralHub v2.0 · GCE AI & DS
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </nav>
  );
};
