import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Image as ImageIcon, 
  FileText, 
  Lock, 
  Code2, 
  Zap, 
  ShieldCheck, 
  QrCode, 
  Scale, 
  Calculator, 
  Palette,
  Hash,
  ArrowRight,
  LayoutGrid
} from 'lucide-react';
import { cn } from '@/utils/cn';

const allTools = [
  {
    category: "Security & Privacy",
    tools: [
      { title: "Password Strength", path: "/password-strength", icon: ShieldCheck, desc: "Check how secure your passwords are." },
      { title: "Hash Generator", path: "/hash-generator", icon: Hash, desc: "Generate SHA-256 and MD5 hashes." },
      { title: "Random String", path: "/random-string-generator", icon: Lock, desc: "Create secure random strings." }
    ]
  },
  {
    category: "Image & PDF",
    tools: [
      { title: "Image Compressor", path: "/image-compressor", icon: ImageIcon, desc: "Compress images without quality loss." },
      { title: "PDF Tools", path: "/pdf-tools", icon: FileText, desc: "Merge and split PDF documents." }
    ]
  },
  {
    category: "Developer Utilities",
    tools: [
      { title: "Developer Tools", path: "/dev-tools", icon: Code2, desc: "JSON formatter and URL utilities." },
      { title: "Base64 Tool", path: "/base64-tool", icon: Code2, desc: "Encode and decode Base64 data." },
      { title: "Color Tool", path: "/color-tool", icon: Palette, desc: "Pick and convert colors." }
    ]
  },
  {
    category: "Productivity",
    tools: [
      { title: "QR Code Tools", path: "/qr-code", icon: QrCode, desc: "Generate and scan QR codes." },
      { title: "Unit Converter", path: "/unit-converter", icon: Scale, desc: "Convert between various units." },
      { title: "Utility Calculators", path: "/utility-tools", icon: Calculator, desc: "Age, percentage, and discount calculators." },
      { title: "MemoNote Pad", path: "/memo-note-pad", icon: FileText, desc: "Quick local browser notes." }
    ]
  }
];

export function AllTools() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Helmet>
        <title>All Tools - QuickTools Pro Sitemap</title>
        <meta name="description" content="Browse our complete directory of free online tools. From image compression to security utilities, find everything you need in one place." />
      </Helmet>

      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-black text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 mb-6 uppercase tracking-widest border border-emerald-100 dark:border-emerald-500/20"
        >
          <LayoutGrid className="h-3.5 w-3.5" />
          Tool Directory
        </motion.div>
        <h1 className="text-4xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-6xl">
          All <span className="text-emerald-500">Tools</span>
        </h1>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400 font-medium max-w-2xl mx-auto">
          A comprehensive list of every utility available on QuickTools Pro. Fast, free, and private.
        </p>
      </div>

      <div className="space-y-16">
        {allTools.map((cat, i) => (
          <section key={i}>
            <h2 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-widest mb-8 flex items-center gap-4">
              {cat.category}
              <div className="h-px flex-grow bg-zinc-100 dark:bg-zinc-800" />
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {cat.tools.map((tool, j) => (
                <Link
                  key={j}
                  to={tool.path}
                  className="group p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 hover:border-emerald-500 transition-all hover:shadow-xl"
                >
                  <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <tool.icon className="h-6 w-6 text-emerald-500" />
                  </div>
                  <h3 className="text-lg font-black text-zinc-900 dark:text-white mb-2">{tool.title}</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mb-4">{tool.desc}</p>
                  <div className="flex items-center gap-2 text-[10px] font-black text-emerald-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    Open Tool <ArrowRight className="h-3 w-3" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-24 p-12 rounded-[3rem] bg-zinc-900 text-center text-white">
        <h2 className="text-3xl font-black mb-4">Can't find what you need?</h2>
        <p className="text-zinc-400 mb-8 max-w-xl mx-auto font-medium">
          We are always adding new tools. Send us a suggestion and we might build it!
        </p>
        <Link 
          to="/contact" 
          className="inline-flex items-center justify-center px-10 py-4 rounded-2xl bg-emerald-500 text-white font-black text-sm uppercase tracking-widest hover:scale-105 transition-all"
        >
          Suggest a Tool
        </Link>
      </div>
    </div>
  );
}
