import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
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
import { Link } from 'react-router-dom';

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
      <Helmet>
        <title>Random String Generator - Secure Passwords & Tokens | QuickTools Pro</title>
        <meta name="description" content="Generate secure, random strings for passwords, API tokens, or identifiers. Fully customizable length and character sets. 100% private and browser-based." />
        <meta name="keywords" content="random string generator, password generator, token generator, secure string, random text, online tool" />
      </Helmet>
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

      {/* Rich Content Section */}
      <div className="mt-24 border-t border-zinc-100 pt-24 dark:border-zinc-800">
        <div className="max-w-3xl mx-auto space-y-16">
          {/* H1 & Intro */}
          <section>
            <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-6 uppercase tracking-tight">
              Random <span className="text-emerald-500">String Generator</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
              Our Random String Generator is a versatile and secure online tool designed to create high-entropy strings for a wide variety of applications. Whether you need a complex password, a unique API key, a secure token, or random test data for development, this tool provides instant results with full customization. By utilizing the browser's native Web Crypto API, we ensure that every string generated is cryptographically secure and completely private. It's the perfect solution for developers, system administrators, and security-conscious users who need reliable randomness without the risk of server-side data collection.
            </p>
          </section>

          {/* How to Use */}
          <section className="space-y-6">
            <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-widest">How to Use</h3>
            <ol className="space-y-4">
              {[
                "Use the 'String Length' slider to choose the desired number of characters for your random string (from 8 up to 64).",
                "Select the character sets you wish to include by toggling the checkboxes for Uppercase, Lowercase, Numbers, and Symbols.",
                "Observe the generated string in the main display box, which updates automatically as you adjust your preferences.",
                "Click the 'Copy String' button to save the current result to your clipboard for immediate use.",
                "If you need a different string with the same settings, click the 'Refresh' icon to regenerate a new random sequence.",
                "For maximum security, ensure you've selected a mix of all character types and a length of at least 16 characters."
              ].map((step, i) => (
                <li key={i} className="flex gap-4 items-start text-zinc-600 dark:text-zinc-400 font-medium">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-black text-white">{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </section>

          {/* Why Use This Tool? */}
          <section className="space-y-6">
            <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-widest">Why Use This Tool?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Cryptographically Secure", desc: "Uses the Web Crypto API for high-quality randomness suitable for security purposes." },
                { title: "Full Customization Options", desc: "Fine-tune your strings by including or excluding specific character sets to meet requirements." },
                { title: "No Server-Side Storage", desc: "All generation happens locally in your browser; your strings are never sent to our servers." },
                { title: "Developer-Centric Design", desc: "A clean, fast interface that allows for quick generation and copying, saving valuable time." }
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                  <h4 className="text-sm font-black text-zinc-900 dark:text-white mb-2 uppercase tracking-widest">{item.title}</h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Common Use Cases */}
          <section className="space-y-6">
            <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-widest">Common Use Cases</h3>
            <div className="space-y-4">
              {[
                { title: "API Key & Token Generation", desc: "Create unique, unpredictable keys for your web services and applications to ensure secure authentication." },
                { title: "Database Unique Identifiers", desc: "Generate random strings to use as primary keys or unique IDs in your database tables." },
                { title: "Mock Data for Testing", desc: "Quickly produce large amounts of random text data to populate your application during testing phases." }
              ].map((useCase, i) => (
                <div key={i} className="flex gap-4 items-start p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 mt-2 shrink-0" />
                  <div>
                    <h4 className="text-sm font-black text-zinc-900 dark:text-white uppercase tracking-widest mb-1">{useCase.title}</h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">{useCase.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="space-y-6">
            <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-widest">Frequently Asked Questions</h3>
            <div className="space-y-8">
              {[
                { q: "How random are the strings generated by this tool?", a: "The strings are generated using the Web Crypto API, which provides a cryptographically secure source of randomness. This is much more secure than standard pseudo-random number generators found in many programming languages." },
                { q: "What is the maximum length I can generate?", a: "Currently, our tool supports generating strings up to 64 characters in length, which provides more than enough entropy for even the most demanding security requirements." },
                { q: "Can I include custom characters in the generator?", a: "While we provide standard sets (Uppercase, Lowercase, Numbers, Symbols), we've selected these to cover the vast majority of use cases. If you need specific characters, you can generate a string and manually swap characters as needed." },
                { q: "Is it safe to use these strings for production passwords?", a: "Yes, absolutely. Because the generation is local and uses secure random number generation, the strings are ideal for production-level passwords and security tokens." },
                { q: "Does this tool store any of the strings I generate?", a: "No. We prioritize your privacy. The code runs entirely on your device, and we have no way of seeing or storing the strings you create." },
                { q: "Why should I use a random string instead of a word-based password?", a: "Random strings have much higher entropy per character than word-based passwords, making them significantly harder for hackers to crack using dictionary or brute-force attacks." }
              ].map((faq, i) => (
                <div key={i} className="space-y-2">
                  <h4 className="text-sm font-black text-zinc-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                    <span className="text-emerald-500">Q:</span> {faq.q}
                  </h4>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed pl-6 border-l-2 border-emerald-500/20">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Why this tool was made? */}
          <section className="space-y-6">
            <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-widest">Why this tool was made?</h3>
            <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
              The Random String Generator was developed to provide a reliable, cryptographically secure source of randomness for everyday digital tasks. We recognized that many online generators use insecure methods or collect user data. Our mission was to build a tool that leverages the Web Crypto API to ensure high-entropy results for passwords, tokens, and identifiers, all while maintaining a strict privacy-first approach where every string is generated locally on the user's device.
            </p>
          </section>

          {/* Related Tools */}
          <section className="space-y-6">
            <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-widest">Related Tools</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { name: "Password Strength Checker", path: "/password-strength" },
                { name: "Hash Generator", path: "/hash-generator" },
                { name: "Base64 Tool", path: "/base64-tool" }
              ].map((tool, i) => (
                <Link
                  key={i}
                  to={tool.path}
                  className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 text-center text-sm font-black text-zinc-600 dark:text-zinc-400 hover:text-emerald-500 hover:border-emerald-500 transition-all uppercase tracking-widest"
                >
                  {tool.name}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
