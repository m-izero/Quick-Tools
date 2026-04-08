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
  LayoutGrid,
  Heart
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
        <title>All Tools Directory | QuickTools Pro - Free Online Digital Toolkit</title>
        <meta name="description" content="Explore our complete directory of free, professional, and private online tools. From image compression and PDF manipulation to security utilities and developer tools—find everything you need in one place." />
        <meta name="keywords" content="all tools, tool directory, online utilities, free developer tools, image compressor, pdf tools, security tools, productivity tools" />
      </Helmet>

      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-black text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 mb-6 uppercase tracking-widest border border-emerald-100 dark:border-emerald-500/20"
        >
          <LayoutGrid className="h-3.5 w-3.5" />
          Comprehensive Tool Directory
        </motion.div>
        <h1 className="text-4xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-6xl">
          All <span className="text-emerald-500">Professional Tools</span>
        </h1>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400 font-medium max-w-3xl mx-auto text-lg leading-relaxed">
          Welcome to the complete QuickTools Pro directory. We've curated a suite of high-performance, browser-based utilities designed to streamline your workflow while maintaining 100% data privacy.
        </p>
      </div>

      {/* Why Use Our Tools Section */}
      <div className="mb-24 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: "100% Private",
            desc: "All processing happens locally in your browser. Your data never leaves your device.",
            icon: ShieldCheck,
            color: "text-emerald-500"
          },
          {
            title: "No Installation",
            desc: "Access professional-grade tools instantly without downloading any software or plugins.",
            icon: Zap,
            color: "text-amber-500"
          },
          {
            title: "Completely Free",
            desc: "No hidden fees, subscriptions, or registration required. Just pure utility for everyone.",
            icon: Heart,
            color: "text-rose-500"
          }
        ].map((item, i) => (
          <div key={i} className="p-8 rounded-[2rem] bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
            <item.icon className={cn("h-8 w-8 mb-4", item.color)} />
            <h3 className="text-lg font-black text-zinc-900 dark:text-white uppercase tracking-tight mb-2">{item.title}</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">{item.desc}</p>
          </div>
        ))}
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

      {/* SEO Content Depth Section */}
      <div className="mt-24 border-t border-zinc-100 pt-24 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto space-y-24">
          <section>
            <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-6 uppercase tracking-tight">
              Your All-in-One <span className="text-emerald-500">Digital Toolkit</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed text-lg">
              QuickTools Pro is more than just a collection of utilities; it's a comprehensive digital workspace designed for the modern web. We understand that productivity is often hindered by the need to navigate between dozens of specialized websites, many of which are cluttered with intrusive ads or require account registration. Our platform brings together the most essential tools for developers, designers, and everyday users into a single, high-performance environment. From advanced security utilities like our Password Strength Meter to essential productivity tools like our PDF and Image compressors, every tool is built with a focus on speed, accuracy, and uncompromising privacy.
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-widest">Privacy First Architecture</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                Unlike many online tools that upload your files or data to remote servers for processing, QuickTools Pro operates entirely within your browser. This "client-side" approach means your sensitive documents, passwords, and images never leave your device. We utilize modern web technologies like Web Crypto API and browser-based compression to ensure that your data remains 100% private and secure. This architecture not only protects your privacy but also ensures that you can work on sensitive projects without worrying about data breaches or unauthorized access.
              </p>
            </div>
            <div className="space-y-6">
              <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-widest">Built for Performance</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                Speed is at the core of everything we build. By eliminating server round-trips for data processing, our tools provide near-instant results. Whether you're converting thousands of units or compressing high-resolution images, you'll experience zero latency. Our interface is optimized for both desktop and mobile, ensuring you have access to professional tools wherever you are. We leverage the power of your own hardware to deliver a snappy, responsive experience that traditional server-side tools simply can't match.
              </p>
            </div>
          </section>

          <section className="space-y-8">
            <h3 className="text-2xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">Comprehensive Tool Categories</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                <h4 className="text-lg font-black text-emerald-500 mb-4 uppercase tracking-widest">Security & Privacy</h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                  In an age of increasing digital threats, our security tools provide a safe way to analyze passwords, generate cryptographic hashes, and create secure random strings. All processing is local, meaning your secrets stay secret.
                </p>
              </div>
              <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                <h4 className="text-lg font-black text-blue-500 mb-4 uppercase tracking-widest">Image & PDF</h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                  Optimize your digital assets with our high-performance compressors and PDF utilities. Reduce file sizes for faster web loading or merge multiple documents into a single professional file instantly.
                </p>
              </div>
              <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                <h4 className="text-lg font-black text-amber-500 mb-4 uppercase tracking-widest">Developer Utilities</h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                  Streamline your development workflow with JSON formatters, URL encoders, and Base64 tools. Designed for speed and accuracy, these utilities are essential for daily coding and debugging tasks.
                </p>
              </div>
              <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                <h4 className="text-lg font-black text-teal-500 mb-4 uppercase tracking-widest">Productivity</h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                  From QR code generation to unit conversion and quick memo taking, our productivity tools are designed to handle the small but frequent tasks that make up your digital day.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-widest">Why We Built QuickTools Pro</h3>
            <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
              The internet is full of "free" tools that come at the cost of your privacy or user experience. We wanted to change that. QuickTools Pro was introduced to provide a clean, professional, and ad-free alternative to the standard utility sites. We believe that essential digital tools should be accessible to everyone without barriers. Our mission is to continue expanding this directory with high-quality utilities that solve real-world problems while setting a new standard for web-based productivity. We are committed to keeping our tools free, private, and exceptionally fast for all our users worldwide.
            </p>
          </section>

          <section className="space-y-8">
            <h3 className="text-2xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">Frequently Asked Questions</h3>
            <div className="grid grid-cols-1 gap-6">
              {[
                { q: "Are these tools really free?", a: "Yes, every tool in our directory is 100% free to use. We don't have hidden fees, premium tiers, or subscription models." },
                { q: "Do I need to create an account?", a: "No. You can use all our tools immediately without providing an email address or creating a profile." },
                { q: "Is my data stored on your servers?", a: "Never. We use client-side processing, meaning all your data stays on your device and is never uploaded to any remote server." },
                { q: "Can I use these tools on my mobile device?", a: "Yes. QuickTools Pro is fully responsive and optimized for a seamless experience on smartphones, tablets, and desktops." }
              ].map((faq, i) => (
                <div key={i} className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                  <h4 className="text-sm font-black text-zinc-900 dark:text-white uppercase tracking-widest mb-2 flex items-center gap-2">
                    <span className="text-emerald-500">Q:</span> {faq.q}
                  </h4>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed pl-6 border-l-2 border-emerald-500/20">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
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
