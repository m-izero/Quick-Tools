import React, { useState, useEffect, useCallback } from 'react';
import { 
  Lock, 
  Copy, 
  Check, 
  RefreshCw, 
  ShieldCheck, 
  ShieldAlert, 
  Shield, 
  Zap,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AdSection } from '@/components/AdSection';
import { cn } from '@/utils/cn';

export function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    excludeSimilar: false,
  });
  const [copied, setCopied] = useState(false);

  const generatePassword = useCallback(() => {
    const charset = {
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-=',
      similar: 'il1Lo0O',
    };

    let characters = '';
    if (options.uppercase) characters += charset.uppercase;
    if (options.lowercase) characters += charset.lowercase;
    if (options.numbers) characters += charset.numbers;
    if (options.symbols) characters += charset.symbols;

    if (options.excludeSimilar) {
      const similarRegex = new RegExp(`[${charset.similar}]`, 'g');
      characters = characters.replace(similarRegex, '');
    }

    if (!characters) return;

    let result = '';
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    
    for (let i = 0; i < length; i++) {
      result += characters.charAt(array[i] % characters.length);
    }
    setPassword(result);
  }, [length, options]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStrength = () => {
    let score = 0;
    if (length >= 12) score += 1;
    if (length >= 20) score += 1;
    if (options.uppercase && options.lowercase) score += 1;
    if (options.numbers) score += 1;
    if (options.symbols) score += 1;
    
    if (score <= 2) return { label: 'Weak', color: 'bg-red-500', icon: <ShieldAlert className="h-4 w-4" />, text: 'text-red-500' };
    if (score <= 4) return { label: 'Medium', color: 'bg-amber-500', icon: <Shield className="h-4 w-4" />, text: 'text-amber-500' };
    return { label: 'Strong', color: 'bg-emerald-500', icon: <ShieldCheck className="h-4 w-4" />, text: 'text-emerald-500' };
  };

  const strength = getStrength();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
      <div className="mb-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 mb-4"
        >
          <Lock className="h-3 w-3" />
          SECURE GENERATOR
        </motion.div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-white">
          Password <span className="text-emerald-500">Shield</span>
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
          Generate ultra-secure, random passwords that are impossible to crack.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-6">
          {/* Password Display Box */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative flex flex-col items-center justify-center gap-6 rounded-3xl bg-white p-6 sm:p-12 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl">
              <div className="w-full text-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={password}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    className="font-mono text-xl sm:text-4xl md:text-5xl font-black text-zinc-900 dark:text-white break-all [overflow-wrap:anywhere] tracking-tight block"
                  >
                    {password}
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
                  {copied ? 'Copied!' : 'Copy Password'}
                </button>
                <button
                  onClick={generatePassword}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-zinc-100 px-6 py-4 font-black text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700 transition-all shadow-lg shadow-black/5"
                  title="Generate New"
                >
                  <RefreshCw className="h-5 w-5" />
                </button>
              </div>

              {/* Strength Indicator */}
              <div className="w-full space-y-3">
                <div className="flex items-center justify-between">
                  <div className={cn("flex items-center gap-2 text-xs font-black uppercase tracking-widest", strength.text)}>
                    {strength.icon}
                    {strength.label} Strength
                  </div>
                  <span className="text-xs font-bold text-zinc-500">{length} Characters</span>
                </div>
                <div className="h-2 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(length / 32) * 100}%` }}
                    className={cn("h-full rounded-full transition-all duration-500", strength.color)}
                  />
                </div>
              </div>
            </div>
          </div>

          <AdSection type="middle" />

          {/* Settings Section */}
          <div className="rounded-3xl bg-white p-8 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl">
            <h3 className="text-xl font-black text-zinc-900 dark:text-white mb-8 flex items-center gap-2">
              <Zap className="h-5 w-5 text-emerald-500" />
              Customization
            </h3>

            <div className="space-y-10">
              <div>
                <div className="flex justify-between mb-4">
                  <label className="text-sm font-black text-zinc-900 dark:text-white uppercase tracking-wider">Password Length</label>
                  <span className="text-lg font-black text-emerald-500">{length}</span>
                </div>
                <input 
                  type="range" 
                  min="8" 
                  max="32" 
                  value={length}
                  onChange={(e) => setLength(parseInt(e.target.value))}
                  className="w-full h-3 bg-zinc-100 dark:bg-zinc-800 rounded-full appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between mt-2 text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                  <span>Weak (8)</span>
                  <span>Strong (32)</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { id: 'uppercase', label: 'Uppercase Letters', desc: 'ABC...' },
                  { id: 'lowercase', label: 'Lowercase Letters', desc: 'abc...' },
                  { id: 'numbers', label: 'Numbers', desc: '123...' },
                  { id: 'symbols', label: 'Symbols', desc: '!@#...' },
                  { id: 'excludeSimilar', label: 'Exclude Similar', desc: 'i, l, 1, L, o, 0, O' },
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

        {/* Sidebar */}
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
                  <p className="text-xs text-zinc-400 mt-1">Passwords are generated in your browser. No data is sent to any server.</p>
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

          <AdSection type="sidebar" />

          <div className="rounded-3xl bg-zinc-50 p-8 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <h3 className="text-lg font-black text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              Pro Tips
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                Use at least 16 characters for critical accounts like banking or email.
              </li>
              <li className="flex items-start gap-3 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                Exclude similar characters if you need to type the password manually.
              </li>
              <li className="flex items-start gap-3 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                Store your passwords in a trusted password manager.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
