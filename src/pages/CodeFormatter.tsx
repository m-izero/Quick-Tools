import React, { useState, useEffect } from 'react';
import prettier from 'prettier/standalone';
import parserHtml from 'prettier/parser-html';
import parserCss from 'prettier/parser-postcss';
import parserBabel from 'prettier/parser-babel';
import parserTypescript from 'prettier/parser-typescript';
import parserMarkdown from 'prettier/parser-markdown';
import { 
  Code2, 
  Copy, 
  Check, 
  Trash2, 
  Loader2, 
  Settings2, 
  Download, 
  FileCode,
  Zap,
  RotateCcw,
  CheckCircle2,
  Share2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AdSection } from '@/components/AdSection';
import { cn } from '@/utils/cn';

type Language = 'javascript' | 'typescript' | 'html' | 'css' | 'json' | 'markdown';

interface FormatterSettings {
  tabWidth: number;
  useTabs: boolean;
  semi: boolean;
  singleQuote: boolean;
  printWidth: number;
}

export function CodeFormatter() {
  const [code, setCode] = useState('');
  const [formattedCode, setFormattedCode] = useState('');
  const [language, setLanguage] = useState<Language>('javascript');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<FormatterSettings>({
    tabWidth: 2,
    useTabs: false,
    semi: true,
    singleQuote: true,
    printWidth: 80,
  });

  const autoDetectLanguage = (input: string) => {
    if (!input.trim()) return;
    
    const trimmed = input.trim();
    if (trimmed.startsWith('<!DOCTYPE') || trimmed.startsWith('<html')) setLanguage('html');
    else if (trimmed.startsWith('{') || trimmed.startsWith('[')) setLanguage('json');
    else if (trimmed.startsWith('# ') || trimmed.startsWith('## ')) setLanguage('markdown');
    else if (trimmed.includes('interface ') || trimmed.includes('type ')) setLanguage('typescript');
    else if (trimmed.includes('{') && (trimmed.includes(':') || trimmed.includes(';')) && !trimmed.includes('function')) setLanguage('css');
    else setLanguage('javascript');
  };

  const formatCode = async () => {
    if (!code.trim()) return;
    setLoading(true);
    try {
      let parser = '';
      let plugins = [];

      switch (language) {
        case 'html':
          parser = 'html';
          plugins = [parserHtml];
          break;
        case 'css':
          parser = 'css';
          plugins = [parserCss];
          break;
        case 'javascript':
          parser = 'babel';
          plugins = [parserBabel];
          break;
        case 'typescript':
          parser = 'typescript';
          plugins = [parserTypescript];
          break;
        case 'json':
          parser = 'json-stringify';
          plugins = [parserBabel];
          break;
        case 'markdown':
          parser = 'markdown';
          plugins = [parserMarkdown];
          break;
      }

      const formatted = await prettier.format(code, {
        parser,
        plugins,
        ...settings,
      });
      setFormattedCode(formatted);
    } catch (error: any) {
      console.error(error);
      alert(`Formatting failed: ${error.message || "Check your syntax"}`);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formattedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadCode = () => {
    const extensions: Record<Language, string> = {
      javascript: 'js',
      typescript: 'ts',
      html: 'html',
      css: 'css',
      json: 'json',
      markdown: 'md'
    };
    const blob = new Blob([formattedCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `formatted-code.${extensions[language]}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const reset = () => {
    setCode('');
    setFormattedCode('');
  };

  const shareCode = async () => {
    if (!formattedCode) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Formatted Code from QuickTools',
          text: formattedCode,
          url: window.location.href
        });
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
      navigator.clipboard.writeText(formattedCode);
      alert('Code copied to clipboard!');
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <div className="mb-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 mb-4"
        >
          <Code2 className="h-3 w-3" />
          DEVELOPER TOOLS
        </motion.div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-white">
          Code <span className="text-blue-500">Formatter</span>
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
          Clean up and prettify your code instantly. Supports multiple languages and custom rules.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
        <div className="inline-flex p-1 bg-zinc-100 dark:bg-zinc-800 rounded-2xl w-full sm:w-auto overflow-x-auto no-scrollbar">
          {(['javascript', 'typescript', 'html', 'css', 'json', 'markdown'] as Language[]).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-bold transition-all uppercase whitespace-nowrap",
                language === lang 
                  ? "bg-white dark:bg-zinc-700 text-blue-600 dark:text-blue-400 shadow-sm" 
                  : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
              )}
            >
              {lang}
            </button>
          ))}
        </div>
        
        <button
          onClick={() => autoDetectLanguage(code)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all w-full sm:w-auto justify-center"
        >
          <Zap className="h-3 w-3" /> Auto-Detect
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <FileCode className="h-3 w-3 text-blue-500" />
                  </div>
                  <span className="text-sm font-bold text-zinc-900 dark:text-white">Input</span>
                </div>
                <button 
                  onClick={reset} 
                  className="text-xs font-bold text-zinc-400 hover:text-red-500 flex items-center gap-1 transition-colors"
                >
                  <RotateCcw className="h-3 w-3" /> Clear
                </button>
              </div>
              <div className="relative group">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder={`Paste your ${language} code here...`}
                  className="h-[500px] w-full rounded-2xl border border-zinc-200 bg-zinc-50 p-6 font-mono text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white transition-all resize-none"
                />
                <button
                  onClick={formatCode}
                  disabled={loading || !code.trim()}
                  className="mt-4 w-full rounded-xl bg-blue-500 py-3 font-bold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-600 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Zap className="h-4 w-4" />}
                  Format Code
                </button>
              </div>
            </div>

            {/* Output Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                    <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                  </div>
                  <span className="text-sm font-bold text-zinc-900 dark:text-white">Formatted</span>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={copyToClipboard} 
                    disabled={!formattedCode}
                    className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-blue-500 disabled:opacity-50 transition-all"
                    title="Copy to Clipboard"
                  >
                    {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                  </button>
                  <button 
                    onClick={downloadCode} 
                    disabled={!formattedCode}
                    className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-blue-500 disabled:opacity-50 transition-all"
                    title="Download File"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={shareCode} 
                    disabled={!formattedCode}
                    className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-blue-500 disabled:opacity-50 transition-all"
                    title="Share Code"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="relative h-[500px] w-full overflow-auto rounded-2xl border border-zinc-200 bg-zinc-50 p-6 font-mono text-sm text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white transition-all">
                {formattedCode ? (
                  <pre className="whitespace-pre">{formattedCode}</pre>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-zinc-400 italic space-y-2">
                    <Code2 className="h-8 w-8 opacity-20" />
                    <span>Formatted code will appear here...</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={formatCode}
            disabled={loading || !code.trim()}
            className="w-full rounded-2xl bg-blue-500 px-8 py-4 font-black text-white shadow-xl shadow-blue-500/20 hover:bg-blue-600 disabled:opacity-50 transition-all flex items-center justify-center gap-3"
          >
            {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : <Zap className="h-6 w-6" />}
            {loading ? 'Formatting...' : 'Prettify Code'}
          </button>

          <AdSection type="middle" />
        </div>

        {/* Sidebar Settings */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-3xl bg-zinc-900 p-8 text-white shadow-xl">
            <h3 className="text-lg font-black mb-6 flex items-center gap-2">
              <Settings2 className="h-5 w-5 text-blue-500" />
              Settings
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="text-xs font-bold text-zinc-500 mb-3 block uppercase tracking-wider">Tab Width: {settings.tabWidth}</label>
                <input 
                  type="range" 
                  min="2" 
                  max="8" 
                  step="2"
                  value={settings.tabWidth}
                  onChange={(e) => setSettings(s => ({ ...s, tabWidth: parseInt(e.target.value) }))}
                  className="w-full accent-blue-500"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-bold">Use Tabs</span>
                <button 
                  onClick={() => setSettings(s => ({ ...s, useTabs: !s.useTabs }))}
                  className={cn(
                    "w-12 h-6 rounded-full transition-all relative",
                    settings.useTabs ? "bg-blue-500" : "bg-zinc-700"
                  )}
                >
                  <div className={cn(
                    "absolute top-1 w-4 h-4 rounded-full bg-white transition-all",
                    settings.useTabs ? "left-7" : "left-1"
                  )} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-bold">Semicolons</span>
                <button 
                  onClick={() => setSettings(s => ({ ...s, semi: !s.semi }))}
                  className={cn(
                    "w-12 h-6 rounded-full transition-all relative",
                    settings.semi ? "bg-blue-500" : "bg-zinc-700"
                  )}
                >
                  <div className={cn(
                    "absolute top-1 w-4 h-4 rounded-full bg-white transition-all",
                    settings.semi ? "left-7" : "left-1"
                  )} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-bold">Single Quotes</span>
                <button 
                  onClick={() => setSettings(s => ({ ...s, singleQuote: !s.singleQuote }))}
                  className={cn(
                    "w-12 h-6 rounded-full transition-all relative",
                    settings.singleQuote ? "bg-blue-500" : "bg-zinc-700"
                  )}
                >
                  <div className={cn(
                    "absolute top-1 w-4 h-4 rounded-full bg-white transition-all",
                    settings.singleQuote ? "left-7" : "left-1"
                  )} />
                </button>
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-500 mb-3 block uppercase tracking-wider">Print Width: {settings.printWidth}</label>
                <input 
                  type="range" 
                  min="40" 
                  max="120" 
                  step="10"
                  value={settings.printWidth}
                  onChange={(e) => setSettings(s => ({ ...s, printWidth: parseInt(e.target.value) }))}
                  className="w-full accent-blue-500"
                />
              </div>
            </div>
          </div>

          <AdSection type="sidebar" />

          <div className="rounded-3xl bg-zinc-50 p-8 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <h3 className="text-lg font-black text-zinc-900 dark:text-white mb-4">Supported</h3>
            <div className="flex flex-wrap gap-2">
              {['JS', 'TS', 'HTML', 'CSS', 'JSON', 'MD'].map(l => (
                <span key={l} className="px-3 py-1 rounded-lg bg-zinc-200 dark:bg-zinc-800 text-[10px] font-black text-zinc-600 dark:text-zinc-400">
                  {l}
                </span>
              ))}
            </div>
            <p className="text-xs text-zinc-500 mt-4 leading-relaxed">
              We use Prettier, the industry standard for code formatting, to ensure your code follows best practices.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
