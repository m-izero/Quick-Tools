import React, { useState } from 'react';
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
      </div>
    </div>
  );
}
