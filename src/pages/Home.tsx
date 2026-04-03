import React from 'react';
import { motion } from 'motion/react';
import { 
  Image as ImageIcon, 
  FileText, 
  Binary, 
  Lock, 
  Code2, 
  ArrowRight,
  Zap,
  ShieldCheck,
  Smartphone,
  History,
  Trash2,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { AdSection } from '@/components/AdSection';
import { useRecentFiles } from '@/hooks/useRecentFiles';
import { cn } from '@/utils/cn';

const tools = [
  {
    title: "Image Compressor",
    description: "Reduce image file size without losing quality. Supports PNG, JPG, and WebP.",
    icon: ImageIcon,
    path: "/image-compressor",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    size: "lg" // Large card
  },
  {
    title: "PDF Tools",
    description: "Merge multiple PDFs into one or split a single PDF into multiple files.",
    icon: FileText,
    path: "/pdf-tools",
    color: "text-red-500",
    bg: "bg-red-500/10",
    size: "md"
  },
  {
    title: "Base64 Tool",
    description: "Encode and decode text to Base64 format instantly. 100% private and secure.",
    icon: Binary,
    path: "/base64-tool",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    size: "md"
  },
  {
    title: "Password Generator",
    description: "Create strong, secure, and random passwords to keep your accounts safe.",
    icon: Lock,
    path: "/password-generator",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    size: "md"
  },
  {
    title: "Code Formatter",
    description: "Prettify your HTML, CSS, and JavaScript code with one click.",
    icon: Code2,
    path: "/code-formatter",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    size: "md"
  },
  {
    title: "MemoNote Pad",
    description: "Quickly jot down notes and ideas. Saved locally in your browser.",
    icon: FileText,
    path: "/memo-note-pad",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    size: "lg"
  }
];

export function Home() {
  const { recentFiles, clearRecentFiles } = useRecentFiles();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <AdSection type="top" />
      
      {/* Hero Section */}
      <div className="text-center mb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-black text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 mb-6 uppercase tracking-widest border border-emerald-100 dark:border-emerald-500/20"
        >
          <Zap className="h-3.5 w-3.5" />
          Fast • Secure • Free
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-7xl lg:text-8xl"
        >
          Tools for the <br />
          <span className="text-emerald-500">Modern Web</span>.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-8 text-lg sm:text-xl leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto font-medium"
        >
          The ultimate utility belt for developers and creators. Process files, generate passwords, and encode text—all locally in your browser.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 flex flex-wrap justify-center gap-8"
        >
          <div className="flex items-center gap-2 text-sm font-bold text-zinc-500">
            <ShieldCheck className="h-5 w-5 text-emerald-500" />
            100% Private
          </div>
          <div className="flex items-center gap-2 text-sm font-bold text-zinc-500">
            <Zap className="h-5 w-5 text-amber-500" />
            Instant Results
          </div>
          <div className="flex items-center gap-2 text-sm font-bold text-zinc-500">
            <Smartphone className="h-5 w-5 text-blue-500" />
            Mobile Ready
          </div>
        </motion.div>
      </div>

      {/* Recent Files Section */}
      {recentFiles.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-zinc-900 dark:text-white flex items-center gap-2 uppercase tracking-widest">
              <History className="h-5 w-5 text-emerald-500" />
              Recent Activity
            </h2>
            <button 
              onClick={clearRecentFiles}
              className="text-xs font-black text-zinc-400 hover:text-red-500 transition-colors flex items-center gap-1 uppercase tracking-widest"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Clear History
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {recentFiles.map((file) => (
              <div 
                key={file.id}
                className="group relative bg-white dark:bg-zinc-900 rounded-2xl p-4 border border-zinc-100 dark:border-zinc-800 hover:border-emerald-500/50 transition-all shadow-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                    <FileText className="h-4 w-4 text-emerald-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-black text-zinc-900 dark:text-white truncate">{file.name}</p>
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{file.tool}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-[10px] font-bold text-zinc-400">{file.size}</span>
                  <a 
                    href={file.url} 
                    download={file.name}
                    className="p-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-800 text-zinc-400 hover:text-emerald-500 transition-all"
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Tools Grid - Bento Style */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[280px]">
        {tools.map((tool, index) => (
          <motion.div
            key={tool.title}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className={cn(
              "group relative",
              tool.size === 'lg' ? "sm:col-span-2" : "col-span-1"
            )}
          >
            <Link
              to={tool.path}
              className="flex flex-col h-full overflow-hidden rounded-[2.5rem] border-2 border-zinc-100 bg-white p-8 sm:p-10 transition-all hover:border-emerald-500 hover:shadow-2xl hover:shadow-emerald-500/10 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-emerald-500"
            >
              <div className={cn(
                "mb-8 flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg transition-transform group-hover:scale-110 duration-500",
                tool.bg
              )}>
                <tool.icon className={cn("h-7 w-7", tool.color)} />
              </div>
              <div className="flex-grow">
                <h3 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">{tool.title}</h3>
                <p className="mt-4 text-sm font-medium leading-relaxed text-zinc-500 dark:text-zinc-400 max-w-sm">
                  {tool.description}
                </p>
              </div>
              <div className="mt-8 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-500">
                Launch Tool <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
              </div>
              
              {/* Decorative Background Element */}
              <div className="absolute -right-4 -bottom-4 h-32 w-32 rounded-full bg-emerald-500/5 blur-3xl group-hover:bg-emerald-500/10 transition-all" />
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-20">
        <AdSection type="middle" />
      </div>

      {/* Features Grid */}
      <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="text-center">
          <div className="h-16 w-16 rounded-3xl bg-blue-500/10 flex items-center justify-center mx-auto mb-6">
            <Lock className="h-8 w-8 text-blue-500" />
          </div>
          <h3 className="text-xl font-black text-zinc-900 dark:text-white mb-3">Privacy First</h3>
          <p className="text-sm text-zinc-500 font-medium leading-relaxed">Your files never leave your device. All processing happens locally in your browser for maximum security.</p>
        </div>
        <div className="text-center">
          <div className="h-16 w-16 rounded-3xl bg-amber-500/10 flex items-center justify-center mx-auto mb-6">
            <Zap className="h-8 w-8 text-amber-500" />
          </div>
          <h3 className="text-xl font-black text-zinc-900 dark:text-white mb-3">Lightning Fast</h3>
          <p className="text-sm text-zinc-500 font-medium leading-relaxed">No server uploads means no waiting. Get your results instantly with our optimized browser-based engines.</p>
        </div>
        <div className="text-center">
          <div className="h-16 w-16 rounded-3xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
            <Smartphone className="h-8 w-8 text-emerald-500" />
          </div>
          <h3 className="text-xl font-black text-zinc-900 dark:text-white mb-3">Mobile Optimized</h3>
          <p className="text-sm text-zinc-500 font-medium leading-relaxed">Designed for the modern web. Use all our tools on your phone or tablet with a seamless, responsive experience.</p>
        </div>
      </div>

      <div className="mt-32 rounded-[3rem] bg-zinc-900 p-12 sm:p-20 text-center relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-6">Ready to get started?</h2>
          <p className="text-zinc-400 text-lg mb-10 max-w-xl mx-auto font-medium">Join thousands of users who trust Quick tools for their daily tasks. No registration, no fees, just tools.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/image-compressor" className="px-8 py-4 rounded-2xl bg-emerald-500 text-white font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20">
              Try Image Compressor
            </Link>
            <Link to="/pdf-tools" className="px-8 py-4 rounded-2xl bg-white/10 text-white font-black uppercase tracking-widest hover:bg-white/20 transition-all backdrop-blur-sm">
              Explore PDF Tools
            </Link>
          </div>
        </div>
        
        {/* Decorative Background */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/20 rounded-full blur-[120px]" />
        </div>
      </div>
    </div>
  );
}
