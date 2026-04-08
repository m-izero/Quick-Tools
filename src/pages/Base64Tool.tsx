import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
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
import { Link } from 'react-router-dom';

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
      <Helmet>
        <title>Base64 Encoder & Decoder - Secure Data Conversion | QuickTools Pro</title>
        <meta name="description" content="Encode and decode text to Base64 format instantly. Support for auto-detection and secure, local processing. 100% private and browser-based developer utility." />
        <meta name="keywords" content="base64 encoder, base64 decoder, base64 converter, online base64, secure encoding, developer tools" />
      </Helmet>
      

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

        {/* Rich Content Section */}
        <div className="mt-24 border-t border-zinc-100 pt-24 dark:border-zinc-800">
          <div className="max-w-3xl mx-auto space-y-16">
            {/* H1 & Intro */}
            <section>
              <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-6 uppercase tracking-tight">
                Professional <span className="text-emerald-500">Base64 Encoder</span> & Decoder
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                Our Base64 Encoder & Decoder is a high-performance online utility designed for developers, system administrators, and data analysts who need to quickly transform text into Base64 format or vice versa. Base64 encoding is a critical process for representing binary data in an ASCII string format, making it essential for embedding images in HTML/CSS, handling data in APIs, and transmitting information over text-based protocols. Built with a focus on speed and security, this tool performs all conversions locally in your browser, ensuring your sensitive data never leaves your device. Whether you're debugging a web application or preparing data for transmission, our tool provides instant, reliable results.
              </p>
            </section>

            {/* How to Use */}
            <section className="space-y-6">
              <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-widest">How to Use</h3>
              <ol className="space-y-4">
                {[
                  "Select your desired mode from the top controls: 'Encode' for plain text to Base64, or 'Decode' for Base64 to plain text.",
                  "Alternatively, keep 'Auto-Detect' enabled, and the tool will intelligently determine the correct operation based on your input.",
                  "Paste or type your data into the 'Input Text' area; the tool will begin processing your request in real-time.",
                  "Review the transformed data in the 'Result' section, which updates instantly as you make changes to the input.",
                  "If an error occurs (such as invalid Base64 characters during decoding), a helpful alert will appear to guide your corrections.",
                  "Click the 'Copy' button in the result area to save the output to your clipboard for immediate use in your project."
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
                  { title: "Uncompromising Privacy", desc: "All encoding and decoding operations are executed client-side, meaning your data is never sent to our servers." },
                  { title: "Smart Auto-Detection", desc: "Save time with our intelligent algorithm that automatically switches modes based on the input string." },
                  { title: "Real-Time Processing", desc: "Experience zero latency with instant results that appear as you type, perfect for quick data transformations." },
                  { title: "Developer-Optimized Interface", desc: "Our clean, monospaced output ensures that your converted strings are easy to read and ready for code integration." }
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
                  { title: "Embedding Assets in Code", desc: "Convert small icons or images into Base64 strings to include them directly in your HTML or CSS files." },
                  { title: "API Data Transmission", desc: "Encode complex data structures into a text format that can be safely sent through JSON-based API endpoints." },
                  { title: "Email Attachment Handling", desc: "Decode Base64-encoded email parts or prepare text for inclusion in MIME-formatted messages." }
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
                  { q: "What is Base64 encoding used for?", a: "Base64 is used to convert binary data into a text format that can be safely transmitted over protocols that only support text, such as SMTP (email) or HTTP." },
                  { q: "Is my data stored on your servers?", a: "No. This tool is 100% client-side. Your input and output stay entirely within your browser and are never uploaded to any external server." },
                  { q: "Can I encode images with this tool?", a: "This specific tool is optimized for text-to-Base64 conversion. For large binary files like images, we recommend using a dedicated file-to-Base64 converter." },
                  { q: "Why does my decoded text look like gibberish?", a: "This usually happens if the original data was binary (like an image) rather than plain text. Base64 can represent any data, but decoding it back to text only works if the source was text." },
                  { q: "Does the auto-detect feature always work?", a: "It is very accurate for standard Base64 strings. However, if your plain text happens to look exactly like valid Base64, you may need to manually select 'Encode' mode." },
                  { q: "Are there any character limits for the input?", a: "There are no hard limits imposed by our tool, but extremely large strings may be limited by your browser's memory or processing power." }
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

            {/* Related Tools */}
            <section className="space-y-6">
              <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-widest">Related Tools</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { name: "Hash Generator", path: "/hash-generator" },
                  { name: "Developer Tools", path: "/dev-tools" },
                  { name: "Random String Generator", path: "/random-string" }
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
    </div>
  );
}
