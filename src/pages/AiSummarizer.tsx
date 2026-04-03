import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Loader2, 
  Copy, 
  Check, 
  Trash2, 
  Zap, 
  FileText, 
  CheckCircle2,
  Share2,
  RotateCcw,
  History
} from 'lucide-react';
import { summarizeTextStream } from '@/services/ai';
import { motion, AnimatePresence } from 'motion/react';
import { AdSection } from '@/components/AdSection';
import { cn } from '@/utils/cn';

export function AiSummarizer() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [progress, setProgress] = useState(0);
  const [history, setHistory] = useState<{ text: string; summary: string; date: string }[]>([]);
  
  const summaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('summarizer_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const saveToHistory = (txt: string, sum: string) => {
    const newHistory = [{ text: txt, summary: sum, date: new Date().toISOString() }, ...history].slice(0, 5);
    setHistory(newHistory);
    localStorage.setItem('summarizer_history', JSON.stringify(newHistory));
  };

  const handleSummarize = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setSummary('');
    setProgress(0);
    
    try {
      const stream = summarizeTextStream(text);
      let fullSummary = '';
      
      for await (const chunk of stream) {
        fullSummary += chunk;
        setSummary(fullSummary);
        // Scroll to bottom as text appears
        if (summaryRef.current) {
          summaryRef.current.scrollTop = summaryRef.current.scrollHeight;
        }
      }
      
      saveToHistory(text, fullSummary);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to summarize");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setText('');
    setSummary('');
  };

  const shareSummary = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'AI Summary from QuickTools',
          text: summary,
          url: window.location.href
        });
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
      navigator.clipboard.writeText(summary);
      alert('Summary copied to clipboard!');
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
      <div className="mb-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full bg-purple-50 px-3 py-1 text-xs font-bold text-purple-600 dark:bg-purple-500/10 dark:text-purple-400 mb-4"
        >
          <Sparkles className="h-3 w-3" />
          AI POWERED INSIGHTS
        </motion.div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-white">
          AI <span className="text-purple-500">Summarizer</span>
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
          Distill complex information into clear, concise summaries using advanced AI.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-3xl bg-white p-6 sm:p-8 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <FileText className="h-4 w-4 text-purple-500" />
                </div>
                <span className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">Source Text</span>
              </div>
              <button 
                onClick={reset}
                className="text-xs font-bold text-zinc-400 hover:text-red-500 flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="h-3 w-3" /> Reset
              </button>
            </div>
            
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste long articles, essays, or notes here..."
              className="h-64 w-full rounded-2xl border border-zinc-200 bg-zinc-50 p-6 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-purple-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white transition-all resize-none"
            />
            
            <button
              onClick={handleSummarize}
              disabled={loading || !text.trim()}
              className="mt-6 w-full rounded-2xl bg-purple-500 px-8 py-4 font-black text-white shadow-xl shadow-purple-500/20 hover:bg-purple-600 disabled:opacity-50 transition-all flex items-center justify-center gap-3"
            >
              {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : <Zap className="h-6 w-6" />}
              {loading ? 'AI is thinking...' : 'Generate Summary'}
            </button>
          </div>

          <AnimatePresence>
            {summary && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="rounded-3xl bg-gradient-to-br from-purple-500 to-indigo-600 p-8 text-white shadow-2xl shadow-purple-500/30"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-black">AI Summary</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={copyToClipboard}
                      className="rounded-xl p-3 bg-white/10 hover:bg-white/20 transition-all"
                      title="Copy"
                    >
                      {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                    </button>
                    <button
                      onClick={shareSummary}
                      className="rounded-xl p-3 bg-white/10 hover:bg-white/20 transition-all"
                      title="Share"
                    >
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div 
                  ref={summaryRef}
                  className="max-h-[400px] overflow-auto pr-4 custom-scrollbar"
                >
                  <p className="text-sm sm:text-base leading-relaxed text-purple-50 whitespace-pre-wrap font-medium">
                    {summary}
                    {loading && <span className="inline-block w-2 h-4 bg-white/50 animate-pulse ml-1" />}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <AdSection type="middle" />
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-3xl bg-zinc-900 p-8 text-white shadow-xl">
            <h3 className="text-lg font-black mb-6 flex items-center gap-2">
              <History className="h-5 w-5 text-purple-500" />
              Recent
            </h3>
            {history.length > 0 ? (
              <div className="space-y-4">
                {history.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => { setText(item.text); setSummary(item.summary); }}
                    className="w-full text-left p-4 rounded-2xl bg-zinc-800 hover:bg-zinc-700 transition-all border border-zinc-700 group"
                  >
                    <p className="text-xs font-bold text-zinc-300 line-clamp-1 group-hover:text-white">{item.text}</p>
                    <p className="text-[10px] text-zinc-500 mt-1">{new Date(item.date).toLocaleDateString()}</p>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <History className="h-8 w-8 text-zinc-800 mx-auto mb-2" />
                <p className="text-xs text-zinc-500">No recent summaries</p>
              </div>
            )}
          </div>

          <AdSection type="sidebar" />

          <div className="rounded-3xl bg-zinc-50 p-8 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <h4 className="font-black text-zinc-900 dark:text-white mb-4 text-sm uppercase tracking-wider">How it works</h4>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="h-6 w-6 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0">
                  <span className="text-[10px] font-black text-purple-500">01</span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Paste your text or article into the input field above.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="h-6 w-6 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0">
                  <span className="text-[10px] font-black text-purple-500">02</span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Our AI analyzes the content to identify key themes and points.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="h-6 w-6 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0">
                  <span className="text-[10px] font-black text-purple-500">03</span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Receive a concise summary in real-time as the AI streams the result.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
