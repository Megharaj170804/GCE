import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Download, Loader2, Image as ImageIcon, X } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { cn } from '@/src/lib/utils';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const AIVisualizer: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const generateImage = async () => {
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: {
          parts: [{ text: prompt }]
        },
        config: {
          imageConfig: {
            aspectRatio: '1:1',
            imageSize: size
          }
        }
      });

      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          setGeneratedImage(`data:image/png;base64,${part.inlineData.data}`);
          break;
        }
      }
    } catch (error) {
      console.error('Image generation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="glass p-12 md:p-20 rounded-[3rem] border-t border-white/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-cyan to-transparent" />
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-cyan/10 text-neon-cyan font-orbitron text-xs font-bold mb-6">
                <Sparkles className="w-4 h-4" /> AI Visualizer
              </div>
              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
                Visualize the <br />
                <span className="text-neon-cyan">Invisible</span>
              </h2>
              <p className="text-lg font-rajdhani text-white/60 mb-12">
                Use our integrated Gemini-powered image generator to visualize complex AI concepts, neural architectures, or futuristic college campuses.
              </p>

              <div className="space-y-6">
                <div className="relative">
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe your vision (e.g., 'A futuristic neural network floating in deep space with neon purple connections')..."
                    className="w-full px-8 py-6 glass rounded-3xl focus:neon-border-cyan outline-none transition-all font-rajdhani text-lg resize-none h-32"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex gap-2 p-1 glass rounded-2xl">
                    {(['1K', '2K', '4K'] as const).map((s) => (
                      <button
                        key={s}
                        onClick={() => setSize(s)}
                        className={cn(
                          "px-4 py-2 rounded-xl font-orbitron text-xs font-bold transition-all",
                          size === s ? "bg-neon-cyan text-space-black" : "hover:bg-white/5 text-white/50"
                        )}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={generateImage}
                    disabled={isLoading}
                    className="flex-1 px-8 py-4 bg-electric-purple rounded-2xl font-orbitron font-black text-lg hover:neon-glow-purple transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Sparkles className="w-6 h-6" />}
                    Generate Vision
                  </button>
                </div>
              </div>
            </div>

            <div className="relative aspect-square">
              <div className="absolute inset-0 glass rounded-[2.5rem] flex items-center justify-center overflow-hidden">
                {generatedImage ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full h-full relative group"
                  >
                    <img
                      src={generatedImage}
                      alt="AI Generated"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-space-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                      <button 
                        onClick={() => setIsOpen(true)}
                        className="p-4 rounded-full bg-white/10 hover:bg-neon-cyan hover:text-space-black transition-all"
                      >
                        <ImageIcon className="w-6 h-6" />
                      </button>
                      <a
                        href={generatedImage}
                        download="ai-vision.png"
                        className="p-4 rounded-full bg-white/10 hover:bg-hot-pink hover:text-white transition-all"
                      >
                        <Download className="w-6 h-6" />
                      </a>
                    </div>
                  </motion.div>
                ) : (
                  <div className="text-center p-12">
                    <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mx-auto mb-6">
                      <ImageIcon className="w-10 h-10 text-white/20" />
                    </div>
                    <p className="text-white/30 font-rajdhani italic">
                      Your neural visualization will appear here...
                    </p>
                  </div>
                )}
              </div>
              {/* Decorative Glow */}
              <div className="absolute -inset-4 bg-neon-cyan/10 blur-2xl -z-10 rounded-[3rem]" />
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && generatedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] glass flex items-center justify-center p-6"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="relative max-w-4xl w-full aspect-square glass rounded-[3rem] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={generatedImage} alt="Full Vision" className="w-full h-full object-contain" />
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-8 right-8 p-3 glass rounded-full hover:bg-white/10 transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
