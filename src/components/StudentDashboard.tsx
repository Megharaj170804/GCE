import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, BookOpen, Trophy, Calendar, TrendingUp, Bell, Settings, LogOut, Search, ChevronRight, Star, Clock } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface DashboardStat {
  label: string;
  value: string;
  icon: React.ElementType;
  color: string;
  trend: string;
}

const stats: DashboardStat[] = [
  { label: 'Courses Completed', value: '12', icon: BookOpen, color: 'text-electric-purple', trend: '+2 this month' },
  { label: 'Neural Points', value: '8,450', icon: Trophy, color: 'text-neon-cyan', trend: 'Top 5% in GCE' },
  { label: 'Study Hours', value: '142h', icon: Clock, color: 'text-hot-pink', trend: 'Avg 4.5h/day' },
  { label: 'Skill Level', value: 'Advanced', icon: TrendingUp, color: 'text-green-400', trend: 'NLP Specialist' },
];

const upcomingEvents = [
  { title: 'AI Ethics Seminar', time: 'Tomorrow, 10:00 AM', type: 'Workshop', color: 'bg-electric-purple' },
  { title: 'Data Viz Hackathon', time: 'Oct 15, 2025', type: 'Competition', color: 'bg-neon-cyan' },
  { title: 'Deep Learning Quiz', time: 'Oct 18, 2025', type: 'Exam', color: 'bg-hot-pink' },
];

export const StudentDashboard: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  if (!isLoggedIn) {
    return (
      <section id="dashboard" className="py-24 relative">
        <div className="max-w-4xl mx-auto px-6">
          <div className="glass rounded-3xl p-12 text-center space-y-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-electric-purple via-neon-cyan to-hot-pink" />
            <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6 relative">
              <User className="w-12 h-12 text-neon-cyan" />
              <div className="absolute inset-0 blur-xl bg-neon-cyan/20 animate-pulse" />
            </div>
            <h2 className="text-4xl font-orbitron font-bold">Student <span className="text-electric-purple">Portal</span></h2>
            <p className="text-xl font-rajdhani text-white/60 max-w-xl mx-auto">
              Access your personalized AI & Data Science learning dashboard. Track your progress, earn Neural Points, and stay ahead.
            </p>
            <button
              onClick={() => setIsLoggedIn(true)}
              className="px-12 py-4 bg-electric-purple rounded-full font-orbitron font-bold tracking-wider hover:neon-glow-purple transition-all transform hover:scale-105"
            >
              Sign In with Neural ID
            </button>
            <p className="text-sm font-fira text-white/20">
              * Neural ID is provided to all GCE AI & DS students upon enrollment.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="dashboard" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 space-y-6">
            <div className="glass rounded-2xl p-6 text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-electric-purple to-neon-cyan p-1 mx-auto mb-4">
                <div className="w-full h-full rounded-full bg-space-black flex items-center justify-center overflow-hidden">
                  <img src="https://picsum.photos/seed/student/200/200" alt="Student Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              </div>
              <h3 className="font-orbitron font-bold text-lg">Aryan Sharma</h3>
              <p className="text-xs font-rajdhani text-white/40 uppercase tracking-widest">Year 3 · AI & DS</p>
            </div>

            <nav className="space-y-2">
              {[
                { icon: TrendingUp, label: 'Overview', active: true },
                { icon: BookOpen, label: 'My Courses' },
                { icon: Trophy, label: 'Achievements' },
                { icon: Calendar, label: 'Schedule' },
                { icon: Settings, label: 'Settings' },
              ].map((item) => (
                <button
                  key={item.label}
                  className={cn(
                    "w-full flex items-center gap-4 px-6 py-4 rounded-xl font-rajdhani font-bold transition-all duration-300",
                    item.active ? "bg-electric-purple text-white neon-glow-purple" : "hover:bg-white/5 text-white/60"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => setIsLoggedIn(false)}
                className="w-full flex items-center gap-4 px-6 py-4 rounded-xl font-rajdhani font-bold text-hot-pink hover:bg-hot-pink/10 transition-all duration-300"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-3xl font-orbitron font-bold">Neural <span className="text-neon-cyan">Dashboard</span></h2>
                <p className="text-white/40 font-rajdhani">Welcome back, Aryan! You have 3 pending assignments.</p>
              </div>
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="text"
                    placeholder="Search resources..."
                    className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-12 pr-4 focus:outline-none focus:border-neon-cyan/50 transition-colors"
                  />
                </div>
                <button className="p-2 glass rounded-full relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-hot-pink rounded-full" />
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ y: -5 }}
                  className="glass rounded-2xl p-6 relative overflow-hidden group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={cn("p-3 rounded-xl bg-white/5", stat.color)}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">{stat.trend}</span>
                  </div>
                  <h4 className="text-sm font-rajdhani text-white/40 uppercase tracking-widest">{stat.label}</h4>
                  <p className="text-3xl font-orbitron font-bold mt-1">{stat.value}</p>
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-white/30 transition-all" />
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Learning Progress */}
              <div className="xl:col-span-2 glass rounded-3xl p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-orbitron font-bold text-xl">Learning Progress</h3>
                  <button className="text-xs font-orbitron text-neon-cyan hover:underline">View All</button>
                </div>
                <div className="space-y-6">
                  {[
                    { name: 'Computer Vision Specialization', progress: 75, color: 'bg-neon-cyan' },
                    { name: 'Advanced Neural Networks', progress: 45, color: 'bg-electric-purple' },
                    { name: 'Big Data Analytics', progress: 90, color: 'bg-hot-pink' },
                  ].map((course) => (
                    <div key={course.name} className="space-y-2">
                      <div className="flex items-center justify-between text-sm font-rajdhani font-bold">
                        <span>{course.name}</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${course.progress}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className={cn("h-full rounded-full", course.color)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Schedule */}
              <div className="glass rounded-3xl p-8 space-y-6">
                <h3 className="font-orbitron font-bold text-xl">Upcoming</h3>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.title} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors group cursor-pointer">
                      <div className={cn("w-1 h-10 rounded-full", event.color)} />
                      <div className="flex-1">
                        <h4 className="font-rajdhani font-bold text-sm group-hover:text-neon-cyan transition-colors">{event.title}</h4>
                        <p className="text-xs text-white/40">{event.time}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white transition-colors" />
                    </div>
                  ))}
                </div>
                <button className="w-full py-3 rounded-xl border border-white/10 font-orbitron text-xs hover:bg-white/5 transition-all">
                  Full Calendar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
