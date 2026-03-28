import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, Zap, Terminal, Play, RefreshCcw, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface LabModel {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

const models: LabModel[] = [
  {
    id: 'sentiment',
    name: 'Sentiment Analyzer',
    description: 'Analyze the emotional tone of any text using NLP.',
    icon: Brain,
    color: 'text-neon-cyan',
  },
  {
    id: 'object',
    name: 'Object Detector',
    description: 'Identify objects within images using Computer Vision.',
    icon: Zap,
    color: 'text-hot-pink',
  },
  {
    id: 'predict',
    name: 'Predictive Engine',
    description: 'Forecast future trends based on historical data patterns.',
    icon: Terminal,
    color: 'text-electric-purple',
  },
];

export const NeuralLab: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<LabModel | null>(null);
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleRunModel = () => {
    if (!inputText.trim()) return;
    setIsProcessing(true);
    setResult(null);

    // Simulate AI processing
    setTimeout(() => {
      setIsProcessing(false);
      if (selectedModel?.id === 'sentiment') {
        const sentiments = ['Positive ✨', 'Negative 🌑', 'Neutral ⚖️', 'Excited 🔥'];
        setResult(`Analysis Complete: ${sentiments[Math.floor(Math.random() * sentiments.length)]}`);
      } else if (selectedModel?.id === 'object') {
        const objects = ['Human 👤', 'Robot 🤖', 'Data Stream 🌊', 'Neural Node 🧠'];
        setResult(`Detected: ${objects[Math.floor(Math.random() * objects.length)]} (Confidence: 98.4%)`);
      } else {
        setResult(`Prediction: Trend is UPWARDS 📈 (Accuracy: 94.2%)`);
      }
    }, 2000);
  };

  return (
    <section id="lab" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-orbitron font-bold mb-4 neon-text-purple">
            Neural <span className="text-neon-cyan">Lab</span>
          </h2>
          <p className="text-xl font-rajdhani text-white/60 max-w-2xl mx-auto">
            Experiment with our pre-trained AI models in real-time. Experience the power of Neural Networks.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Model Selection */}
          <div className="space-y-4">
            {models.map((model) => (
              <button
                key={model.id}
                onClick={() => {
                  setSelectedModel(model);
                  setResult(null);
                  setInputText('');
                }}
                className={cn(
                  "w-full p-6 rounded-2xl glass text-left transition-all duration-300 group relative overflow-hidden",
                  selectedModel?.id === model.id ? "neon-glow-cyan border-neon-cyan/50" : "hover:border-white/20"
                )}
              >
                <div className="flex items-center gap-4 relative z-10">
                  <div className={cn("p-3 rounded-xl bg-white/5", model.color)}>
                    <model.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-orbitron font-bold text-lg">{model.name}</h3>
                    <p className="text-sm font-rajdhani text-white/40">{model.description}</p>
                  </div>
                </div>
                {selectedModel?.id === model.id && (
                  <motion.div
                    layoutId="active-model"
                    className="absolute inset-0 bg-neon-cyan/5 -z-0"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Interactive Area */}
          <div className="lg:col-span-2">
            <div className="glass rounded-3xl p-8 h-full min-h-[400px] flex flex-col relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-electric-purple via-neon-cyan to-hot-pink" />
              
              {!selectedModel ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center animate-pulse">
                    <Brain className="w-10 h-10 text-white/20" />
                  </div>
                  <p className="font-orbitron text-white/40">Select a model to begin experimentation</p>
                </div>
              ) : (
                <div className="flex-1 flex flex-col space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <selectedModel.icon className={cn("w-6 h-6", selectedModel.color)} />
                      <h3 className="font-orbitron font-bold text-xl">{selectedModel.name}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-xs font-mono text-green-500 uppercase tracking-widest">Model Online</span>
                    </div>
                  </div>

                  <div className="relative flex-1">
                    <textarea
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder={
                        selectedModel.id === 'sentiment' 
                          ? "Enter text to analyze (e.g., 'I love learning AI!')" 
                          : selectedModel.id === 'object'
                          ? "Enter image description or URL..."
                          : "Enter parameters for prediction..."
                      }
                      className="w-full h-full min-h-[200px] bg-black/40 border border-white/10 rounded-2xl p-6 font-fira text-white focus:outline-none focus:border-neon-cyan/50 transition-colors resize-none"
                    />
                    
                    <AnimatePresence>
                      {isProcessing && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center space-y-4"
                        >
                          <RefreshCcw className="w-12 h-12 text-neon-cyan animate-spin" />
                          <p className="font-orbitron text-neon-cyan animate-pulse">Processing Neural Data...</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <button
                      onClick={handleRunModel}
                      disabled={isProcessing || !inputText.trim()}
                      className="w-full sm:w-auto px-8 py-4 bg-neon-cyan text-black font-orbitron font-bold rounded-xl hover:neon-glow-cyan transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Play className="w-5 h-5 fill-current" />
                      Run Inference
                    </button>
                    
                    {result && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex-1 p-4 rounded-xl bg-green-500/10 border border-green-500/30 flex items-center gap-3"
                      >
                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                        <span className="font-rajdhani font-bold text-green-500">{result}</span>
                      </motion.div>
                    )}
                  </div>

                  {/* Terminal Output Simulation */}
                  <div className="bg-black/80 rounded-xl p-4 font-fira text-xs text-white/40 space-y-1">
                    <p className="text-green-500/60">{`> Initializing ${selectedModel.id}_v2.4.0...`}</p>
                    <p>{`> Loading weights from neural_core_v8...`}</p>
                    <p>{`> GPU Acceleration: ENABLED (RTX 5090 Ti)`}</p>
                    {isProcessing && <p className="animate-pulse">{`> Processing input stream...`}</p>}
                    {result && <p className="text-neon-cyan">{`> Output generated successfully.`}</p>}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
