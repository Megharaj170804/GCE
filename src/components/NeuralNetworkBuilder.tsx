import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, Plus, Minus, Play, RefreshCcw, Zap, Brain } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface Layer {
  id: number;
  nodes: number;
  type: 'input' | 'hidden' | 'output';
}

export const NeuralNetworkBuilder: React.FC = () => {
  const [layers, setLayers] = useState<Layer[]>([
    { id: 1, nodes: 4, type: 'input' },
    { id: 2, nodes: 6, type: 'hidden' },
    { id: 3, nodes: 2, type: 'output' },
  ]);
  const [isTraining, setIsTraining] = useState(false);
  const [accuracy, setAccuracy] = useState(0);

  const addLayer = () => {
    if (layers.length >= 6) return;
    const newLayers = [...layers];
    const outputLayer = newLayers.pop()!;
    newLayers.push({ id: Date.now(), nodes: 4, type: 'hidden' });
    newLayers.push(outputLayer);
    setLayers(newLayers);
  };

  const removeLayer = (id: number) => {
    if (layers.length <= 2) return;
    setLayers(layers.filter(l => l.id !== id || l.type !== 'hidden'));
  };

  const updateNodes = (id: number, delta: number) => {
    setLayers(layers.map(l => {
      if (l.id === id) {
        const newNodes = Math.max(1, Math.min(12, l.nodes + delta));
        return { ...l, nodes: newNodes };
      }
      return l;
    }));
  };

  const trainNetwork = () => {
    setIsTraining(true);
    setAccuracy(0);
    let currentAccuracy = 0;
    const interval = setInterval(() => {
      currentAccuracy += Math.random() * 5;
      if (currentAccuracy >= 95 + Math.random() * 4) {
        setAccuracy(currentAccuracy);
        setIsTraining(false);
        clearInterval(interval);
      } else {
        setAccuracy(currentAccuracy);
      }
    }, 100);
  };

  return (
    <section id="builder" className="py-24 relative overflow-hidden bg-space-black/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-orbitron font-bold mb-4">
            Neural <span className="text-electric-purple">Architect</span>
          </h2>
          <p className="text-xl font-rajdhani text-white/60 max-w-2xl mx-auto">
            Design and train your own neural network architecture. Real-time visualization of data flow.
          </p>
        </div>

        <div className="glass rounded-[3rem] p-8 md:p-12 relative overflow-hidden">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Controls */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="font-orbitron font-bold text-lg text-neon-cyan flex items-center gap-2">
                  <Layers className="w-5 h-5" /> Architecture
                </h3>
                <button
                  onClick={addLayer}
                  className="w-full py-3 glass rounded-xl font-orbitron text-xs hover:neon-glow-cyan transition-all flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Add Hidden Layer
                </button>
              </div>

              <div className="space-y-4">
                <h3 className="font-orbitron font-bold text-lg text-hot-pink flex items-center gap-2">
                  <Zap className="w-5 h-5" /> Training
                </h3>
                <div className="p-6 glass rounded-2xl space-y-4">
                  <div className="flex items-center justify-between text-sm font-rajdhani">
                    <span className="text-white/40">Accuracy</span>
                    <span className="text-neon-cyan font-bold">{accuracy.toFixed(1)}%</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      animate={{ width: `${accuracy}%` }}
                      className="h-full bg-neon-cyan neon-glow-cyan"
                    />
                  </div>
                  <button
                    onClick={trainNetwork}
                    disabled={isTraining}
                    className="w-full py-4 bg-electric-purple rounded-xl font-orbitron font-bold hover:neon-glow-purple transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isTraining ? <RefreshCcw className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5" />}
                    {isTraining ? 'Training...' : 'Start Training'}
                  </button>
                </div>
              </div>
            </div>

            {/* Visualizer */}
            <div className="lg:col-span-3 min-h-[500px] glass rounded-3xl p-8 relative flex items-center justify-center overflow-x-auto no-scrollbar">
              <div className="flex items-center justify-between gap-12 md:gap-24 min-w-max px-12">
                {layers.map((layer, i) => (
                  <div key={layer.id} className="relative flex flex-col items-center gap-4">
                    <div className="text-[10px] font-orbitron text-white/20 uppercase tracking-widest absolute -top-8">
                      {layer.type} Layer
                    </div>
                    
                    <div className="flex flex-col gap-3">
                      {Array.from({ length: layer.nodes }).map((_, j) => (
                        <motion.div
                          key={j}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className={cn(
                            "w-4 h-4 md:w-6 md:h-6 rounded-full relative group cursor-pointer",
                            layer.type === 'input' ? "bg-neon-cyan neon-glow-cyan" :
                            layer.type === 'output' ? "bg-hot-pink neon-glow-pink" :
                            "bg-electric-purple neon-glow-purple"
                          )}
                        >
                          {/* Connections Simulation */}
                          {i < layers.length - 1 && (
                            <div className="absolute left-full top-1/2 -translate-y-1/2 w-12 md:w-24 h-[1px] bg-white/10 -z-10 pointer-events-none" />
                          )}
                          
                          <div className="absolute inset-0 rounded-full animate-ping bg-current opacity-20 hidden group-hover:block" />
                        </motion.div>
                      ))}
                    </div>

                    {layer.type === 'hidden' && (
                      <div className="flex items-center gap-2 mt-4">
                        <button
                          onClick={() => updateNodes(layer.id, -1)}
                          className="p-1 glass rounded-md hover:text-hot-pink"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-fira">{layer.nodes}</span>
                        <button
                          onClick={() => updateNodes(layer.id, 1)}
                          className="p-1 glass rounded-md hover:text-neon-cyan"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => removeLayer(layer.id)}
                          className="p-1 glass rounded-md hover:text-red-500 ml-2"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Data Flow Animation */}
              <AnimatePresence>
                {isTraining && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 pointer-events-none"
                  >
                    {Array.from({ length: 20 }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ x: -100, y: Math.random() * 400, opacity: 0 }}
                        animate={{ 
                          x: 800, 
                          opacity: [0, 1, 0],
                          y: Math.random() * 400 
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity, 
                          delay: Math.random() * 2,
                          ease: "linear"
                        }}
                        className="absolute w-1 h-1 bg-neon-cyan rounded-full blur-[1px]"
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import { X } from 'lucide-react';
