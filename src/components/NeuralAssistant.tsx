import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, X, Bot, User, Volume2, Loader2, Mic, Paperclip, Sparkles } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { cn } from '@/src/lib/utils';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const NeuralAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: 'Hello! I am your GCE AI & DS Hub assistant. How can I help you today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (customMsg?: string) => {
    const userMsg = customMsg || input.trim();
    if (!userMsg || isLoading) return;

    if (!customMsg) setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: 'You are a futuristic AI assistant for the Godavari College of Engineering AI & Data Science department. You are knowledgeable about the college, the AI & DS curriculum, and general AI/DS topics. Your tone is professional, futuristic, and helpful.',
        }
      });

      const response = await chat.sendMessage({ message: userMsg });
      setMessages(prev => [...prev, { role: 'assistant', content: response.text || 'I am sorry, I could not process that.' }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error connecting to the neural network. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceInput = () => {
    setIsListening(true);
    // Simulate voice recognition
    setTimeout(() => {
      setIsListening(false);
      const queries = [
        "What are the core subjects in AI & DS?",
        "Tell me about the Neural Lab.",
        "How do I join the AI community?",
        "Who are the top faculty members?"
      ];
      const randomQuery = queries[Math.floor(Math.random() * queries.length)];
      handleSend(randomQuery);
    }, 3000);
  };

  const handleFileUpload = () => {
    setMessages(prev => [...prev, { role: 'user', content: '📎 Uploaded: research_paper_v1.pdf' }]);
    setIsLoading(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: 'I have analyzed your document. It appears to be a research paper on Transformers in Computer Vision. Would you like a summary?' }]);
      setIsLoading(false);
    }, 1500);
  };

  const speak = async (text: string) => {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-preview-tts',
        contents: [{ parts: [{ text }] }],
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } }
          }
        }
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        const audio = new Audio(`data:audio/wav;base64,${base64Audio}`);
        audio.play();
      }
    } catch (error) {
      console.error('TTS error:', error);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-electric-purple rounded-full flex items-center justify-center neon-glow-purple z-40 hover:scale-110 transition-transform"
      >
        <MessageSquare className="w-8 h-8" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-28 right-8 w-[90vw] md:w-[400px] h-[600px] glass rounded-3xl z-50 flex flex-col overflow-hidden border-neon-cyan/30"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-neon-cyan/20 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-neon-cyan" />
                </div>
                <div>
                  <h3 className="font-orbitron font-bold text-sm">Neural Assistant</h3>
                  <span className="text-[10px] text-neon-cyan animate-pulse">Online</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
              {messages.map((msg, i) => (
                <div key={i} className={cn("flex gap-3", msg.role === 'user' ? "flex-row-reverse" : "flex-row")}>
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                    msg.role === 'user' ? "bg-hot-pink/20" : "bg-electric-purple/20"
                  )}>
                    {msg.role === 'user' ? <User className="w-4 h-4 text-hot-pink" /> : <Bot className="w-4 h-4 text-electric-purple" /> }
                  </div>
                  <div className={cn(
                    "p-4 rounded-2xl max-w-[80%] text-sm font-rajdhani relative group",
                    msg.role === 'user' ? "bg-hot-pink/10 rounded-tr-none" : "bg-white/5 rounded-tl-none"
                  )}>
                    {msg.content}
                    {msg.role === 'assistant' && (
                      <button 
                        onClick={() => speak(msg.content)}
                        className="absolute -right-8 top-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 text-white/30 hover:text-neon-cyan"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-electric-purple/20 flex items-center justify-center">
                    <Loader2 className="w-4 h-4 text-electric-purple animate-spin" />
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 rounded-tl-none">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 border-t border-white/10 bg-white/5 space-y-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleVoiceInput}
                  disabled={isLoading || isListening}
                  className={cn(
                    "flex-1 py-2 glass rounded-xl flex items-center justify-center gap-2 text-xs font-orbitron transition-all",
                    isListening ? "neon-glow-cyan text-neon-cyan animate-pulse" : "hover:bg-white/10"
                  )}
                >
                  <Mic className="w-4 h-4" />
                  {isListening ? 'Listening...' : 'Voice Input'}
                </button>
                <button
                  onClick={handleFileUpload}
                  disabled={isLoading}
                  className="flex-1 py-2 glass rounded-xl flex items-center justify-center gap-2 text-xs font-orbitron hover:bg-white/10 transition-all"
                >
                  <Paperclip className="w-4 h-4" />
                  Upload
                </button>
              </div>

              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask the neural network..."
                  className="w-full pl-6 pr-14 py-4 glass rounded-2xl focus:neon-border-cyan outline-none transition-all font-rajdhani"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-neon-cyan text-space-black rounded-xl flex items-center justify-center hover:neon-glow-cyan transition-all disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
