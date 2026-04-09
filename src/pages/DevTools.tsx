import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Code2, 
  Braces, 
  Link as LinkIcon, 
  Binary, 
  Copy, 
  Check, 
  Trash2, 
  RefreshCcw,
  AlertCircle,
  FileJson,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/utils/cn';
import { Link } from 'react-router-dom';

type DevTool = 'json' | 'url' | 'base64';

export default function DevTools() {
  const [activeTool, setActiveTool] = useState<DevTool>('json');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleJsonFormat = () => {
    try {
      setError(null);
      if (!input.trim()) {
        setOutput('');
        return;
      }
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
    } catch (err) {
      setError('Invalid JSON format. Please check your input.');
      setOutput('');
    }
  };

  const handleUrlEncode = () => {
    try {
      setError(null);
      setOutput(encodeURIComponent(input));
    } catch (err) {
      setError('Encoding failed.');
    }
  };

  const handleUrlDecode = () => {
    try {
      setError(null);
      setOutput(decodeURIComponent(input));
    } catch (err) {
      setError('Decoding failed. Invalid URL encoding.');
    }
  };

  const handleBase64Encode = () => {
    try {
      setError(null);
      setOutput(btoa(input));
    } catch (err) {
      setError('Encoding failed. Ensure input is valid text.');
    }
  };

  const handleBase64Decode = () => {
    try {
      setError(null);
      setOutput(atob(input));
    } catch (err) {
      setError('Decoding failed. Invalid Base64 string.');
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Developer Tools - JSON Formatter, URL Encoder, Base64 | QuickTools Pro</title>
        <meta name="description" content="A comprehensive suite of developer utilities. Format JSON, encode/decode URLs, and handle Base64 data instantly. 100% private and browser-based processing." />
        <meta name="keywords" content="developer tools, json formatter, url encoder, url decoder, base64 encoder, base64 decoder, online dev tools, secure formatting" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Developer Tools",
              "description": "JSON formatter, URL encoder, and Base64 utilities for developers. 100% private and local processing.",
              "operatingSystem": "All",
              "applicationCategory": "DeveloperApplication",
              "url": "https://quick-toolz.vercel.app/dev-tools",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            }
          `}
        </script>
      </Helmet>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center justify-center p-3 bg-emerald-500/10 rounded-2xl mb-4"
          >
            <Code2 className="h-8 w-8 text-emerald-500" />
          </motion.div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white sm:text-4xl">
            Developer Tools
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Essential utilities for formatting, encoding, and decoding data.
          </p>
        </div>

        {/* Tool Tabs */}
        <div className="flex p-1 bg-zinc-200 dark:bg-zinc-900 rounded-2xl mb-8 overflow-x-auto no-scrollbar">
          {[
            { id: 'json', label: 'JSON Formatter', icon: FileJson },
            { id: 'url', label: 'URL Encoder', icon: Globe },
            { id: 'base64', label: 'Base64 Tool', icon: Binary },
          ].map((tool) => (
            <button
              key={tool.id}
              onClick={() => { setActiveTool(tool.id as DevTool); clearAll(); }}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-semibold rounded-xl transition-all whitespace-nowrap",
                activeTool === tool.id
                  ? "bg-white dark:bg-zinc-800 text-emerald-600 dark:text-emerald-400 shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
              )}
            >
              <tool.icon className="h-4 w-4" />
              {tool.label}
            </button>
          ))}
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          <div className="p-6 sm:p-8 space-y-6">
            {/* Input Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Input</label>
                <button
                  onClick={clearAll}
                  className="text-sm text-zinc-500 hover:text-red-500 transition-colors flex items-center gap-1"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear
                </button>
              </div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Paste your ${activeTool.toUpperCase()} here...`}
                className="w-full h-48 px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none font-mono text-sm text-zinc-900 dark:text-white"
              />
            </div>

            {/* Actions Section */}
            <div className="flex flex-wrap gap-4">
              {activeTool === 'json' && (
                <button
                  onClick={handleJsonFormat}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-2xl shadow-lg shadow-emerald-500/25 transition-all active:scale-95"
                >
                  <Braces className="h-5 w-5" />
                  Format JSON
                </button>
              )}
              {activeTool === 'url' && (
                <>
                  <button
                    onClick={handleUrlEncode}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-2xl shadow-lg shadow-emerald-500/25 transition-all active:scale-95"
                  >
                    <Globe className="h-5 w-5" />
                    Encode URL
                  </button>
                  <button
                    onClick={handleUrlDecode}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-semibold rounded-2xl hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all active:scale-95"
                  >
                    <RefreshCcw className="h-5 w-5" />
                    Decode URL
                  </button>
                </>
              )}
              {activeTool === 'base64' && (
                <>
                  <button
                    onClick={handleBase64Encode}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-2xl shadow-lg shadow-emerald-500/25 transition-all active:scale-95"
                  >
                    <Binary className="h-5 w-5" />
                    Encode Base64
                  </button>
                  <button
                    onClick={handleBase64Decode}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-semibold rounded-2xl hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all active:scale-95"
                  >
                    <RefreshCcw className="h-5 w-5" />
                    Decode Base64
                  </button>
                </>
              )}
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-2xl border border-red-100 dark:border-red-500/20"
                >
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  <p className="text-sm font-medium">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Output Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Output</label>
                {output && (
                  <button
                    onClick={copyToClipboard}
                    className="text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 font-semibold flex items-center gap-1"
                  >
                    {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {isCopied ? 'Copied!' : 'Copy Result'}
                  </button>
                )}
              </div>
              <textarea
                readOnly
                value={output}
                placeholder="Result will appear here..."
                className="w-full h-64 px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl font-mono text-sm text-zinc-900 dark:text-white resize-none"
              />
            </div>
          </div>
        </div>

        {/* Rich Content Section */}
        <div className="mt-24 border-t border-zinc-100 pt-24 dark:border-zinc-800">
          <div className="max-w-3xl mx-auto space-y-16">
            {/* H1 & Intro */}
            <section>
              <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-6 uppercase tracking-tight">
                Professional <span className="text-emerald-500">Developer Tools</span>
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                Our Developer Tools suite is an essential collection of utilities designed to streamline the daily workflow of web developers, software engineers, and data analysts. From formatting complex, minified JSON structures to encoding and decoding URLs and Base64 strings, these tools provide a fast, secure, and reliable way to handle data. Built with a focus on efficiency and privacy, all processing occurs entirely within your browser, ensuring that your sensitive code and data never leave your local environment. It's the perfect companion for debugging, API testing, and data transformation tasks.
              </p>
            </section>

            {/* How to Use */}
            <section className="space-y-6">
              <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-widest">How to Use</h3>
              <ol className="space-y-4">
                {[
                  "Select the specific utility you need from the tool tabs: JSON Formatter, URL Encoder, or Base64 Tool.",
                  "Paste your raw data into the 'Input' text area or type it directly.",
                  "Click the primary action button (e.g., 'Format JSON', 'Encode URL', or 'Encode Base64') to process your data.",
                  "If you need to reverse a process, use the 'Decode' buttons available for the URL and Base64 tools.",
                  "Review the results in the 'Output' section, which will display the formatted or transformed data instantly.",
                  "Click the 'Copy Result' button to save the output to your clipboard for use in your code or documentation."
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
                  { title: "Enhanced Code Readability", desc: "Quickly turn unreadable, minified JSON into a beautifully indented and structured format for easier debugging." },
                  { title: "Secure Data Handling", desc: "All transformations are performed client-side, meaning your sensitive data is never sent to a server." },
                  { title: "Real-Time Validation", desc: "Our JSON formatter automatically checks for syntax errors, helping you identify and fix malformed data instantly." },
                  { title: "Cross-Platform Compatibility", desc: "Access professional-grade developer utilities from any modern web browser on desktop or mobile devices." }
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
                  { title: "Debugging API Responses", desc: "Format messy JSON payloads from API calls to understand the data structure and identify potential issues." },
                  { title: "Preparing URL Parameters", desc: "Encode special characters in query strings to ensure they are transmitted correctly over the web." },
                  { title: "Handling Binary Data in Text", desc: "Use the Base64 tool to encode small images or binary files into a text format suitable for embedding in HTML or CSS." }
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
                  { q: "Is my data safe when using these online developer tools?", a: "Yes, absolutely. All processing is done locally in your browser. We do not store, log, or transmit any of the data you enter into the input fields." },
                  { q: "Can the JSON formatter handle very large files?", a: "Yes, it can handle most standard JSON files used in web development. However, extremely large files may experience slight performance lag depending on your device's processing power." },
                  { q: "What happens if my JSON is invalid?", a: "The tool will display a clear error message indicating that the JSON is malformed, allowing you to check your syntax and correct any missing commas or brackets." },
                  { q: "Does the URL encoder handle all special characters?", a: "Yes, our tool uses the standard encodeURIComponent function, which safely encodes all characters that have special meaning in a URL." },
                  { q: "What is Base64 encoding used for?", a: "Base64 is commonly used to represent binary data in an ASCII string format. This is useful for embedding data in environments that only support text, such as email or certain database fields." },
                  { q: "Are there any limits on how many times I can use these tools?", a: "No. Our Developer Tools are completely free and unlimited. You can use them as often as you need for your professional or personal projects." }
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
                The Developer Tools suite was built to provide a centralized, high-performance hub for the most common data transformation tasks in web development. We found that developers often have to jump between multiple websites to format JSON, encode URLs, or handle Base64 data—many of which are slow or cluttered with ads. Our mission was to create a clean, unified interface that handles these essential tasks instantly and securely in the browser, ensuring that your code and data remain private while you work.
              </p>
            </section>

            {/* Related Tools */}
            <section className="space-y-6">
              <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-widest">Related Tools</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { name: "Hash Generator", path: "/hash-generator" },
                  { name: "Random String Generator", path: "/random-string" },
                  { name: "Color Tool", path: "/color-tool" }
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
