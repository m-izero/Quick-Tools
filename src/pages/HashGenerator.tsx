import React, { useState, useEffect, useCallback } from 'react';
import { 
  Hash, 
  Copy, 
  Check, 
  Trash2, 
  ShieldCheck, 
  Zap,
  CheckCircle2,
  AlertCircle,
  Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import CryptoJS from 'crypto-js';
import { cn } from '@/utils/cn';

export function HashGenerator() {
  const [inputText, setInputText] = useState('');
  const [hashes, setHashes] = useState({
    sha256: '',
    md5: ''
  });
  const [copied, setCopied] = useState<string | null>(null);

  const generateHashes = useCallback(async (text: string) => {
    if (!text) {
      setHashes({ sha256: '', md5: '' });
      return;
    }

    // SHA-256 using native SubtleCrypto
    const msgBuffer = new TextEncoder().encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const sha256Hex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    // MD5 using CryptoJS
    const md5Hex = CryptoJS.MD5(text).toString();

    setHashes({
      sha256: sha256Hex,
      md5: md5Hex
    });
  }, []);

  useEffect(() => {
    generateHashes(inputText);
  }, [inputText, generateHashes]);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const clearInput = () => {
    setInputText('');
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
      <div className="mb-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 mb-4"
        >
          <Lock className="h-3 w-3" />
          SECURITY TOOL
        </motion.div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-white">
          Hash <span className="text-emerald-500">Generator</span>
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
          Generate secure cryptographic hashes for your text data instantly in your browser.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-6">
          {/* Input Section */}
          <div className="rounded-3xl bg-white p-6 sm:p-8 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <label className="text-xs font-black text-zinc-400 uppercase tracking-widest">
                Input Text
              </label>
              <button
                onClick={clearInput}
                className="flex items-center gap-1 text-xs font-bold text-red-500 hover:text-red-600 transition-colors"
                title="Clear input"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Clear
              </button>
            </div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter text to hash..."
              className="w-full min-h-[150px] rounded-2xl bg-zinc-50 px-5 py-4 text-lg font-medium text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-zinc-800 dark:text-white transition-all resize-none"
            />
          </div>

          {/* Output Section */}
          <div className="space-y-4">
            {[
              { label: 'SHA-256', value: hashes.sha256, type: 'sha256' },
              { label: 'MD5', value: hashes.md5, type: 'md5' }
            ].map((hash) => (
              <div key={hash.type} className="rounded-3xl bg-white p-6 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black text-zinc-400 uppercase tracking-widest">{hash.label}</span>
                  {hash.value && (
                    <button
                      onClick={() => copyToClipboard(hash.value, hash.type)}
                      className={cn(
                        "flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-bold transition-all",
                        copied === hash.type 
                          ? "bg-emerald-500 text-white" 
                          : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
                      )}
                    >
                      {copied === hash.type ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                      {copied === hash.type ? 'Copied!' : 'Copy'}
                    </button>
                  )}
                </div>
                <div className="relative">
                  <div className="w-full rounded-xl bg-zinc-50 px-4 py-3 font-mono text-xs sm:text-sm text-zinc-900 dark:bg-zinc-800 dark:text-white break-all min-h-[3rem] flex items-center">
                    {hash.value || <span className="text-zinc-400 italic">Waiting for input...</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-3xl bg-zinc-900 p-8 text-white shadow-xl">
            <h3 className="text-lg font-black mb-6 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-500" />
              Security First
            </h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">Local Processing</h4>
                  <p className="text-xs text-zinc-400 mt-1">Hashes are calculated entirely in your browser. Your data never leaves your device.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">One-Way Function</h4>
                  <p className="text-xs text-zinc-400 mt-1">Cryptographic hashes are designed to be impossible to reverse-engineer.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-zinc-50 p-8 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <h3 className="text-lg font-black text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
              <Zap className="h-5 w-5 text-amber-500" />
              Use Cases
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                Verifying data integrity during transmission.
              </li>
              <li className="flex items-start gap-3 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                Generating unique identifiers for content.
              </li>
              <li className="flex items-start gap-3 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                Comparing files without revealing their actual contents.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* SEO Content Section */}
      <div className="mt-24 border-t border-zinc-100 pt-24 dark:border-zinc-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-6 uppercase tracking-tight">
                Free <span className="text-emerald-500">Hash Generator</span> Online (SHA-256 & MD5)
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                Generate secure cryptographic hashes for your text data instantly with our free online tool. Whether you need a SHA-256 hash for data integrity or an MD5 hash for legacy systems, our generator provides accurate results in real-time. This tool operates entirely within your web browser, ensuring that your sensitive information is never transmitted over the internet, providing a secure and private environment for all your hashing needs.
              </p>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-widest">How to Use</h3>
              <ol className="space-y-4">
                {[
                  "Type or paste the text you want to hash into the 'Input Text' area.",
                  "The SHA-256 and MD5 hashes will update automatically as you type.",
                  "Review the generated hexadecimal strings in the output boxes below.",
                  "Click the 'Copy' button next to any hash to save it to your clipboard."
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
                  { title: "Privacy Guaranteed", desc: "All hash calculations happen locally in your browser. Your data is never sent to any server." },
                  { title: "Real-Time Generation", desc: "See your results instantly as you type, saving you time and effort." },
                  { title: "Industry Standard", desc: "Uses standard SHA-256 and MD5 algorithms for reliable and compatible results." },
                  { title: "Completely Free", desc: "Generate as many hashes as you need without any cost, registration, or limitations." }
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
