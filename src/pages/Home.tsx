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
  QrCode,
  Palette,
  Scale,
  Calculator,
  Globe,
  Braces,
  Hash
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';

const toolCategories = [
  {
    name: "Security & Privacy Tools",
    tools: [
      {
        title: "Password Strength",
        description: "Analyze your password strength using the industry-standard zxcvbn estimation algorithm.",
        icon: ShieldCheck,
        path: "/password-strength",
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
        size: "md"
      },
      {
        title: "Hash Generator",
        description: "Generate secure SHA-256 and MD5 cryptographic hashes for your text data instantly.",
        icon: Hash,
        path: "/hash-generator",
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        size: "md"
      },
      {
        title: "Random String",
        description: "Generate secure, random strings for passwords, tokens, or identifiers with custom options.",
        icon: Lock,
        path: "/random-string-generator",
        color: "text-teal-500",
        bg: "bg-teal-500/10",
        size: "md"
      }
    ]
  },
  {
    name: "Image & PDF Tools",
    tools: [
      {
        title: "Image Compressor",
        description: "Reduce image file size without losing quality. Supports PNG, JPG, and WebP.",
        icon: ImageIcon,
        path: "/image-compressor",
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        size: "lg"
      },
      {
        title: "PDF Tools",
        description: "Merge multiple PDFs into one or split a single PDF into multiple files.",
        icon: FileText,
        path: "/pdf-tools",
        color: "text-red-500",
        bg: "bg-red-500/10",
        size: "md"
      }
    ]
  },
  {
    name: "Developer & Design",
    tools: [
      {
        title: "Developer Tools",
        description: "JSON formatter, URL encoder, and Base64 utilities for developers.",
        icon: Code2,
        path: "/dev-tools",
        color: "text-amber-500",
        bg: "bg-amber-500/10",
        size: "md"
      },
      {
        title: "Color Tool",
        description: "Pick, convert, and save colors in HEX, RGB, and HSL formats.",
        icon: Palette,
        path: "/color-tool",
        color: "text-pink-500",
        bg: "bg-pink-500/10",
        size: "md"
      }
    ]
  },
  {
    name: "Utility & Productivity",
    tools: [
      {
        title: "QR Code Tools",
        description: "Generate QR codes from text/URLs or scan them using your camera.",
        icon: QrCode,
        path: "/qr-code",
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
        size: "lg"
      },
      {
        title: "Unit Converter",
        description: "Fast conversion for length, weight, temperature, speed, and data.",
        icon: Scale,
        path: "/unit-converter",
        color: "text-orange-500",
        bg: "bg-orange-500/10",
        size: "md"
      },
      {
        title: "Utility Calculators",
        description: "Calculate age, percentages, and discounts instantly.",
        icon: Calculator,
        path: "/utility-tools",
        color: "text-cyan-500",
        bg: "bg-cyan-500/10",
        size: "md"
      },
      {
        title: "MemoNote Pad",
        description: "Quickly jot down notes and ideas. Saved locally in your browser.",
        icon: FileText,
        path: "/memo-note-pad",
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
        size: "md"
      }
    ]
  }
];

export function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      
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

      {/* What We Offer Section */}
      <div className="mb-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-white mb-4 uppercase tracking-tight">
            What We <span className="text-emerald-500">Offer</span>
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 font-medium max-w-2xl mx-auto">
            Explore our comprehensive site of free online tools designed to simplify your digital life.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-8 rounded-[2.5rem] bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 hover:shadow-xl transition-all group">
            <div className="h-12 w-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ImageIcon className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="text-xl font-black text-zinc-900 dark:text-white mb-3 uppercase tracking-widest">Image Tools</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
              Professional-grade image optimization and conversion. Compress photos for the web, convert between formats, and resize images without losing quality.
            </p>
          </div>
          <div className="p-8 rounded-[2.5rem] bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 hover:shadow-xl transition-all group">
            <div className="h-12 w-12 rounded-2xl bg-red-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <FileText className="h-6 w-6 text-red-500" />
            </div>
            <h3 className="text-xl font-black text-zinc-900 dark:text-white mb-3 uppercase tracking-widest">PDF Tools</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
              Manage your PDF documents with ease. Merge multiple files, split pages, and optimize PDFs for sharing and storage, all within your browser.
            </p>
          </div>
          <div className="p-8 rounded-[2.5rem] bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 hover:shadow-xl transition-all group">
            <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck className="h-6 w-6 text-emerald-500" />
            </div>
            <h3 className="text-xl font-black text-zinc-900 dark:text-white mb-3 uppercase tracking-widest">Security Tools</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
              Protect your digital identity. Generate strong passwords, analyze password strength, and create secure cryptographic hashes for your data.
            </p>
          </div>
          <div className="p-8 rounded-[2.5rem] bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 hover:shadow-xl transition-all group">
            <div className="h-12 w-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Code2 className="h-6 w-6 text-amber-500" />
            </div>
            <h3 className="text-xl font-black text-zinc-900 dark:text-white mb-3 uppercase tracking-widest">Developer Tools</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
              Essential utilities for web developers. Format JSON, encode/decode Base64, pick colors, and convert units with precision and speed.
            </p>
          </div>
          <div className="p-8 rounded-[2.5rem] bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 hover:shadow-xl transition-all group">
            <div className="h-12 w-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Calculator className="h-6 w-6 text-cyan-500" />
            </div>
            <h3 className="text-xl font-black text-zinc-900 dark:text-white mb-3 uppercase tracking-widest">Utility Tools</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
              Everyday calculators and generators. Create QR codes, calculate percentages, convert units, and take quick notes in our local notepad.
            </p>
          </div>
          <div className="p-8 rounded-[2.5rem] bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 hover:shadow-xl transition-all group">
            <div className="h-12 w-12 rounded-2xl bg-zinc-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <History className="h-6 w-6 text-zinc-500" />
            </div>
            <h3 className="text-xl font-black text-zinc-900 dark:text-white mb-3 uppercase tracking-widest">Local Processing</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
              All our tools run 100% locally in your browser. Your data never touches our servers, ensuring total privacy and lightning-fast performance.
            </p>
          </div>
        </div>
      </div>

      {/* Tools Grid - Categorized */}
      <div className="space-y-24">
        {toolCategories.map((category, catIndex) => (
          <div key={category.name}>
            <div className="flex items-center gap-4 mb-10">
              <h2 className="text-2xl font-black text-zinc-900 dark:text-white uppercase tracking-widest">
                {category.name}
              </h2>
              <div className="h-px flex-grow bg-zinc-200 dark:bg-zinc-800" />
            </div>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[280px]">
              {category.tools.map((tool, index) => (
                <motion.div
                  key={tool.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (catIndex * 0.1) + (index * 0.05) }}
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
          </div>
        ))}
      </div>

      <div className="mt-20">
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
          <p className="text-zinc-400 text-lg mb-10 max-w-xl mx-auto font-medium">Join thousands of users who trust QuickTools Pro for their daily tasks. No registration, no fees, just tools.</p>
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
