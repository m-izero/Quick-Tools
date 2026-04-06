import React, { useState, useEffect, useCallback } from 'react';
import { 
  Lock, 
  Copy, 
  Check, 
  RefreshCw, 
  ShieldCheck, 
  Zap,
  CheckCircle2,
  AlertCircle,
  Hash
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/utils/cn';

export function RandomStringGenerator() {
  const [randomString, setRandomString] = useState('');
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [copied, setCopied] = useState(false);

  const generateRandomString = useCallback(() => {
    const charset = {
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-=',
    };

    let characters = '';
    if (options.uppercase) characters += charset.uppercase;
    if (options.lowercase) characters += charset.lowercase;
    if (options.numbers) characters += charset.numbers;
    if (options.symbols) characters += charset.symbols;

    if (!characters) return;

    let result = '';
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    
    for (let i = 0; i < length; i++) {
      result += characters.charAt(array[i] % characters.length);
    }
    setRandomString(result);
  }, [length, options]);

  useEffect(() => {
    generateRandomString();
  }, [generateRandomString]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(randomString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
      <div className="mb-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 mb-4"
        >
          <Hash className="h-3 w-3" />
          SECURITY TOOL
        </motion.div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-white">
          Random <span className="text-emerald-500">String</span> Generator
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
          Generate secure, random strings for passwords, tokens, or identifiers instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-6">
          {/* Display Box */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative flex flex-col items-center justify-center gap-6 rounded-3xl bg-white p-6 sm:p-12 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl">
              <div className="w-full text-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={randomString}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    className="font-mono text-xl sm:text-4xl md:text-5xl font-black text-zinc-900 dark:text-white break-all [overflow-wrap:anywhere] tracking-tight block"
                  >
                    {randomString}
                  </motion.span>
                </AnimatePresence>
              </div>

              <div className="flex flex-wrap justify-center gap-3 w-full">
                <button
                  onClick={copyToClipboard}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 rounded-2xl px-8 py-4 font-black transition-all shadow-xl",
                    copied 
                      ? "bg-emerald-500 text-white shadow-emerald-500/20" 
                      : "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 shadow-black/10"
                  )}
                >
                  {copied ? <CheckCircle2 className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                  {copied ? 'Copied!' : 'Copy String'}
                </button>
                <button
                  onClick={generateRandomString}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-zinc-100 px-6 py-4 font-black text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700 transition-all shadow-lg shadow-black/5"
                  title="Regenerate"
                >
                  <RefreshCw className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Settings Section */}
          <div className="rounded-3xl bg-white p-8 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl">
            <h3 className="text-xl font-black text-zinc-900 dark:text-white mb-8 flex items-center gap-2">
              <Zap className="h-5 w-5 text-emerald-500" />
              Customization
            </h3>

            <div className="space-y-10">
              <div>
                <div className="flex justify-between mb-4">
                  <label className="text-sm font-black text-zinc-900 dark:text-white uppercase tracking-wider">String Length</label>
                  <span className="text-lg font-black text-emerald-500">{length}</span>
                </div>
                <input 
                  type="range" 
                  min="8" 
                  max="64" 
                  value={length}
                  onChange={(e) => setLength(parseInt(e.target.value))}
                  className="w-full h-3 bg-zinc-100 dark:bg-zinc-800 rounded-full appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between mt-2 text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                  <span>8</span>
                  <span>64</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { id: 'uppercase', label: 'Uppercase Letters', desc: 'ABC...' },
                  { id: 'lowercase', label: 'Lowercase Letters', desc: 'abc...' },
                  { id: 'numbers', label: 'Numbers', desc: '123...' },
                  { id: 'symbols', label: 'Symbols', desc: '!@#...' },
                ].map((opt) => (
                  <label key={opt.id} className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 cursor-pointer hover:border-emerald-500/30 transition-all group">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-zinc-900 dark:text-white group-hover:text-emerald-500 transition-colors">{opt.label}</span>
                      <span className="text-[10px] font-medium text-zinc-500">{opt.desc}</span>
                    </div>
                    <div className="relative flex items-center">
                      <input 
                        type="checkbox" 
                        checked={options[opt.id as keyof typeof options]}
                        onChange={() => setOptions({...options, [opt.id]: !options[opt.id as keyof typeof options]})}
                        className="peer h-6 w-6 cursor-pointer appearance-none rounded-lg border-2 border-zinc-300 dark:border-zinc-700 checked:border-emerald-500 checked:bg-emerald-500 transition-all"
                      />
                      <Check className="absolute h-4 w-4 text-white opacity-0 peer-checked:opacity-100 left-1" />
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-3xl bg-zinc-900 p-8 text-white shadow-xl">
            <h3 className="text-lg font-black mb-6 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-500" />
              Security Audit
            </h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">Client-Side Only</h4>
                  <p className="text-xs text-zinc-400 mt-1">Strings are generated in your browser. No data is sent to any server.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">Cryptographically Secure</h4>
                  <p className="text-xs text-zinc-400 mt-1">We use the Web Crypto API for true randomness.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Content Section */}
      <div className="mt-24 border-t border-zinc-100 pt-24 dark:border-zinc-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-6 uppercase tracking-tight">
                Free <span className="text-emerald-500">Random String</span> Generator Online
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                Generate secure, random strings for any purpose with our free online tool. Whether you need a strong password, a unique API token, or a random identifier for development, our generator provides high-entropy strings instantly. Built with security in mind, this tool uses the browser's native Web Crypto API to ensure true randomness and maximum privacy, as all generation happens locally on your device.
              </p>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-widest">How to Use</h3>
              <ol className="space-y-4">
                {[
                  "Adjust the 'String Length' slider to your desired number of characters (8-64).",
                  "Toggle the character sets you want to include (Uppercase, Lowercase, Numbers, Symbols).",
                  "The random string will update automatically as you change the settings.",
                  "Click 'Copy String' to save the result or use the refresh button to generate a new one."
                ].map((step, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-black text-white">
                      {i + 1}
                    </span>
                    <span className="text-sm text-zinc-600 dark:text-zinc-400 font-medium">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-widest">Benefits</h3>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { title: "Cryptographically Secure", desc: "Uses the Web Crypto API for high-quality randomness suitable for security purposes." },
                  { title: "100% Local Processing", desc: "Your generated strings never leave your browser, ensuring complete privacy." },
                  { title: "Highly Customizable", desc: "Fine-tune the length and character types to meet specific requirements." },
                  { title: "Instant & Free", desc: "Generate as many strings as you need without any cost or registration." }
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
  );
}
