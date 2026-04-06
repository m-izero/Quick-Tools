import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Binary, 
  Copy, 
  Trash2, 
  ArrowRightLeft, 
  Check, 
  AlertCircle,
  Zap,
  ShieldCheck,
  Smartphone
} from 'lucide-react';
import { cn } from '@/utils/cn';

export function Base64Tool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [autoDetect, setAutoDetect] = useState(true);

  // Base64 detection regex
  const isBase64 = (str: string) => {
    if (str === '' || str.trim() === '') return false;
    try {
      return btoa(atob(str)) === str;
    } catch (err) {
      return false;
    }
  };

  const handleEncode = useCallback((text: string) => {
    try {
      const encoded = btoa(text);
      setOutput(encoded);
      setError('');
    } catch (err) {
      setError('Failed to encode. Ensure input is valid text.');
      setOutput('');
    }
  }, []);

  const handleDecode = useCallback((text: string) => {
    try {
      const decoded = atob(text);
      setOutput(decoded);
      setError('');
    } catch (err) {
      setError('Invalid Base64 input. Please check your data.');
      setOutput('');
    }
  }, []);

  // Auto-detect and real-time conversion
  useEffect(() => {
    if (!input) {
      setOutput('');
      setError('');
      return;
    }

    if (autoDetect) {
      const looksLikeBase64 = isBase64(input);
      const newMode = looksLikeBase64 ? 'decode' : 'encode';
      setMode(newMode);
      
      if (newMode === 'encode') {
        handleEncode(input);
      } else {
        handleDecode(input);
      }
    } else {
      if (mode === 'encode') {
        handleEncode(input);
      } else {
        handleDecode(input);
      }
    }
  }, [input, mode, autoDetect, handleEncode, handleDecode]);

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      

      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-black text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 mb-6 uppercase tracking-widest border border-emerald-100 dark:border-emerald-500/20"
        >
          <Binary className="h-3.5 w-3.5" />
          Developer Utility
        </motion.div>
        <h1 className="text-4xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-6xl">
          Base64 <span className="text-emerald-500">Tool</span>
        </h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 font-medium max-w-2xl mx-auto">
          Encode and decode text to Base64 format instantly. 100% client-side processing for maximum privacy.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Main Interface */}
        <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border-2 border-zinc-100 dark:border-zinc-800 p-6 sm:p-10 shadow-xl shadow-zinc-200/50 dark:shadow-none">
          
          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 p-1.5 rounded-2xl">
              <button
                onClick={() => { setMode('encode'); setAutoDetect(false); }}
                className={cn(
                  "px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                  mode === 'encode' && !autoDetect 
                    ? "bg-white dark:bg-zinc-700 text-emerald-500 shadow-sm" 
                    : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                )}
              >
                Encode
              </button>
              <button
                onClick={() => { setMode('decode'); setAutoDetect(false); }}
                className={cn(
                  "px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                  mode === 'decode' && !autoDetect 
                    ? "bg-white dark:bg-zinc-700 text-emerald-500 shadow-sm" 
                    : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                )}
              >
                Decode
              </button>
              <button
                onClick={() => setAutoDetect(true)}
                className={cn(
                  "px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                  autoDetect 
                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" 
                    : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                )}
              >
                Auto-Detect
              </button>
            </div>

            <button
              onClick={handleClear}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-[10px] font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10 transition-all"
            >
              <Trash2 className="h-4 w-4" /> Clear
            </button>
          </div>

          <div className="space-y-8">
            {/* Input Section */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4 ml-2">
                Input Text {autoDetect && <span className="text-emerald-500 ml-2">(Auto-detecting...)</span>}
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={mode === 'encode' ? "Enter text to encode..." : "Enter Base64 to decode..."}
                className="w-full h-48 p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-800/50 border-2 border-transparent focus:border-emerald-500 focus:bg-white dark:focus:bg-zinc-800 outline-none transition-all text-zinc-900 dark:text-white font-mono text-sm resize-none"
              />
            </div>

            {/* Action Indicator */}
            <div className="flex justify-center">
              <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                <ArrowRightLeft className={cn(
                  "h-6 w-6 text-emerald-500 transition-transform duration-500",
                  mode === 'decode' ? "rotate-180" : ""
                )} />
              </div>
            </div>

            {/* Output Section */}
            <div className="relative">
              <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4 ml-2">
                Result ({mode === 'encode' ? 'Base64' : 'Text'})
              </label>
              <div className="relative group">
                <textarea
                  value={output}
                  readOnly
                  placeholder="Result will appear here..."
                  className={cn(
                    "w-full h-48 p-6 rounded-3xl border-2 outline-none transition-all font-mono text-sm resize-none",
                    error 
                      ? "bg-red-50 dark:bg-red-500/5 border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400" 
                      : "bg-zinc-50 dark:bg-zinc-800/50 border-transparent text-zinc-900 dark:text-white"
                  )}
                />
                
                <AnimatePresence>
                  {output && !error && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      onClick={handleCopy}
                      className="absolute right-4 top-4 flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-zinc-700 shadow-lg border border-zinc-100 dark:border-zinc-600 text-[10px] font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-300 hover:text-emerald-500 transition-all"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3.5 w-3.5" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" /> Copy
                        </>
                      )}
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="mt-4 flex items-center gap-2 text-red-500 text-xs font-bold bg-red-50 dark:bg-red-500/10 p-4 rounded-2xl border border-red-100 dark:border-red-500/20"
                  >
                    <AlertCircle className="h-4 w-4" />
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800">
            <div className="h-12 w-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6">
              <ShieldCheck className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="text-lg font-black text-zinc-900 dark:text-white mb-2">Secure</h3>
            <p className="text-sm text-zinc-500 font-medium">Your data never leaves your browser. All encoding and decoding is done locally.</p>
          </div>
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800">
            <div className="h-12 w-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6">
              <Zap className="h-6 w-6 text-amber-500" />
            </div>
            <h3 className="text-lg font-black text-zinc-900 dark:text-white mb-2">Instant</h3>
            <p className="text-sm text-zinc-500 font-medium">Real-time conversion as you type. No loading bars, no delays, just speed.</p>
          </div>
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800">
            <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6">
              <Smartphone className="h-6 w-6 text-emerald-500" />
            </div>
            <h3 className="text-lg font-black text-zinc-900 dark:text-white mb-2">Responsive</h3>
            <p className="text-sm text-zinc-500 font-medium">Fully optimized for mobile devices. Large touch targets and clean layout.</p>
          </div>
        </div>

        {/* SEO Content Section */}
        <div className="mt-24 border-t border-zinc-100 pt-24 dark:border-zinc-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-6 uppercase tracking-tight">
                  Free <span className="text-emerald-500">Base64 Encoder</span> & Decoder
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                  Our Base64 Tool is a powerful, free online utility designed for developers and power users who need to quickly encode or decode text to and from Base64 format. Base64 encoding is essential for transmitting binary data over text-based protocols, such as embedding images in HTML or CSS, or handling data in APIs. This tool operates entirely within your web browser, ensuring that your sensitive data is never transmitted over the internet, providing a secure and private environment for all your data conversion needs.
                </p>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-widest">How to Use</h3>
                <div className="space-y-8">
                  <div>
                    <h4 className="text-sm font-black text-emerald-500 uppercase tracking-widest mb-4">Encoding Text</h4>
                    <ol className="space-y-3">
                      {[
                        "Ensure the 'Encode' mode is selected (or use 'Auto-Detect').",
                        "Type or paste your plain text into the 'Input Text' area.",
                        "The Base64 encoded result will appear instantly in the 'Result' box.",
                        "Click the 'Copy' button to save the encoded string to your clipboard."
                      ].map((step, i) => (
                        <li key={i} className="flex gap-3 items-start text-sm text-zinc-600 dark:text-zinc-400 font-medium">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-black text-white">{i + 1}</span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-emerald-500 uppercase tracking-widest mb-4">Decoding Base64</h4>
                    <ol className="space-y-3">
                      {[
                        "Ensure the 'Decode' mode is selected (or use 'Auto-Detect').",
                        "Paste your Base64 string into the 'Input Text' area.",
                        "The decoded plain text will be displayed immediately in the 'Result' box.",
                        "If the input is invalid Base64, an error message will guide you."
                      ].map((step, i) => (
                        <li key={i} className="flex gap-3 items-start text-sm text-zinc-600 dark:text-zinc-400 font-medium">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-black text-white">{i + 1}</span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-widest">Benefits</h3>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { title: "Privacy First", desc: "All conversions happen locally in your browser. Your data is never sent to any server." },
                    { title: "Auto-Detection", desc: "Smart detection automatically switches between encoding and decoding based on your input." },
                    { title: "Real-Time Results", desc: "See your results instantly as you type, saving you time and effort." },
                    { title: "Developer Friendly", desc: "Clean, monospaced output makes it easy to read and copy code-ready strings." }
                  ].map((benefit, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                      <h4 className="text-sm font-black text-zinc-900 dark:text-white mb-2 uppercase tracking-widest">{benefit.title}</h4>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">{benefit.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
