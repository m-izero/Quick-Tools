import React from 'react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
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
  Hash,
  Menu,
  MessageSquare,
  Hammer,
  Shield,
  Mail,
  Heart,
  Search,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { blogPosts } from './Blog';

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
        title: "Base64 Tool",
        description: "Encode and decode text to Base64 format instantly with auto-detection.",
        icon: Binary,
        path: "/base64-tool",
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
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
      <Helmet>
        <title>QuickTools Pro - Your All-in-One Digital Toolkit | Free & Private</title>
        <meta name="description" content="Access a suite of free, professional, and private online tools. Image compression, PDF manipulation, password strength analysis, unit conversion, and more—all processed locally in your browser." />
        <meta name="keywords" content="online tools, developer tools, image compressor, pdf tools, password checker, unit converter, free utilities, private tools" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "QuickTools Pro",
              "url": "https://quick-toolz.vercel.app/",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://quick-toolz.vercel.app/all-tools?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }
          `}
        </script>
      </Helmet>
      
      {/* Hero Section */}
      <div className="text-center mb-32 pt-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-black text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 mb-6 uppercase tracking-widest border border-emerald-100 dark:border-emerald-500/20"
        >
          <Zap className="h-3.5 w-3.5" />
          Professional • Private • Free
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-7xl lg:text-8xl"
        >
          Your All-in-One <br />
          <span className="text-emerald-500">Digital Toolkit</span>.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-8 text-lg sm:text-xl leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto font-medium"
        >
          QuickTools Pro provides a suite of high-performance, browser-based utilities for developers, designers, and everyday users. Process files, secure data, and optimize your workflow—all 100% locally on your device.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          <Link 
            to="/all-tools" 
            className="px-10 py-5 rounded-2xl bg-emerald-500 text-white font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-2xl shadow-emerald-500/40 active:scale-95"
          >
            Explore Tools
          </Link>
          <Link 
            to="/blog" 
            className="px-10 py-5 rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-black uppercase tracking-widest hover:opacity-90 transition-all active:scale-95"
          >
            Read Our Blog
          </Link>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16 flex flex-wrap justify-center gap-8"
        >
          <div className="flex items-center gap-2 text-sm font-bold text-zinc-500">
            <ShieldCheck className="h-5 w-5 text-emerald-500" />
            No Data Uploads
          </div>
          <div className="flex items-center gap-2 text-sm font-bold text-zinc-500">
            <Zap className="h-5 w-5 text-amber-500" />
            Instant Processing
          </div>
          <div className="flex items-center gap-2 text-sm font-bold text-zinc-500">
            <Smartphone className="h-5 w-5 text-blue-500" />
            No Installation
          </div>
        </motion.div>
      </div>

      {/* Why Choose Quick Tools Pro? */}
      <div className="mb-48">
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">
            Why Choose <span className="text-emerald-500">QuickTools Pro</span>?
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 font-medium max-w-2xl mx-auto">
            We've built a platform that prioritizes your workflow and security above all else. Here is why thousands of users trust us every day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Heart,
              title: "Free Forever",
              desc: "QuickTools Pro is committed to remaining a free resource for the community. We believe that essential digital utilities should be accessible to everyone without paywalls, subscriptions, or hidden fees. Our platform is supported by non-intrusive advertising to ensure we can continue developing and maintaining these tools for you.",
              color: "text-rose-500",
              bg: "bg-rose-500/10"
            },
            {
              icon: Lock,
              title: "No Login Required",
              desc: "We value your time and your anonymity. You can start using any of our tools immediately without creating an account, providing an email address, or going through a tedious registration process. We don't track your identity or build user profiles; we simply provide the tools you need to get your work done efficiently.",
              color: "text-teal-500",
              bg: "bg-teal-500/10"
            },
            {
              icon: ShieldCheck,
              title: "Privacy Friendly",
              desc: "Your privacy is our foundation. Unlike traditional tools that process your data on remote servers, QuickTools Pro operates with a 'Privacy-First' architecture. This means your sensitive files, passwords, and personal information never leave your device. We use your browser's local processing power to ensure total data sovereignty.",
              color: "text-blue-500",
              bg: "bg-blue-500/10"
            },
            {
              icon: Globe,
              title: "Works in Browser",
              desc: "Enjoy a seamless experience across all your devices. Our tools are built using modern web standards like WebAssembly and Web Workers, allowing them to run directly in any modern browser. Whether you are on a high-end desktop or a budget smartphone, you get the same professional-grade performance without installing any software.",
              color: "text-emerald-500",
              bg: "bg-emerald-500/10"
            }
          ].map((feature, i) => (
            <div key={i} className="group p-8 rounded-[2.5rem] bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 transition-all hover:border-emerald-500/50 hover:shadow-xl">
              <div className={cn("h-16 w-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg transition-transform group-hover:scale-110", feature.bg)}>
                <feature.icon className={cn("h-8 w-8", feature.color)} />
              </div>
              <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-tight mb-4">{feature.title}</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="mb-48 py-24 bg-zinc-50 dark:bg-zinc-900/50 rounded-[4rem] border border-zinc-100 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto px-8">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">
              How It <span className="text-emerald-500">Works</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 font-medium">
              Three simple steps to professional results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Select a Tool",
                desc: "Browse our extensive library of specialized utilities across Security, Image, PDF, and Developer categories. Each tool is optimized for a specific task to ensure the best results.",
                icon: Search
              },
              {
                step: "02",
                title: "Input Your Data",
                desc: "Upload your files or enter your text directly into the tool interface. Remember, all processing happens locally in your browser, so your data never leaves your computer.",
                icon: FileText
              },
              {
                step: "03",
                title: "Get Results",
                desc: "Our high-performance algorithms process your input instantly. Download your optimized files or copy your generated data with a single click. Fast, secure, and reliable.",
                icon: CheckCircle2
              }
            ].map((item, i) => (
              <div key={i} className="relative space-y-6">
                <div className="text-6xl font-black text-emerald-500/10 absolute -top-10 -left-4 select-none">{item.step}</div>
                <div className="h-14 w-14 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg relative z-10">
                  <item.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">{item.title}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Tools Section */}
      <div className="mb-48">
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">
            Our <span className="text-emerald-500">Tools</span>
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 font-medium max-w-2xl mx-auto">
            Explore our comprehensive suite of digital utilities designed for speed and privacy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              name: "Security & Privacy Tools",
              desc: "Our Security and Privacy suite is designed to be your first line of defense in an increasingly complex digital world. We provide advanced utilities like our Password Strength Analyzer, which uses industry-leading algorithms to estimate the time it would take for a brute-force attack to succeed. Additionally, our Hash Generator allows you to create secure SHA-256 and MD5 checksums for verifying data integrity, while our Random String Generator is perfect for creating unhackable keys and tokens. All these tools run 100% locally, meaning your secrets stay secret.",
              icon: ShieldCheck,
              color: "text-blue-500",
              bg: "bg-blue-500/10"
            },
            {
              name: "Image & PDF Tools",
              desc: "Visual content and document management are at the heart of modern communication, and our Image & PDF tools are built to handle these tasks with precision. Our Image Compressor uses sophisticated lossy and lossless algorithms to significantly reduce file sizes while maintaining stunning visual clarity, perfect for web optimization. Our PDF utilities allow you to merge, split, and manage your documents with ease, all without ever uploading a single byte to a remote server. This ensures your private documents and creative assets remain entirely under your control.",
              icon: ImageIcon,
              color: "text-red-500",
              bg: "bg-red-500/10"
            },
            {
              name: "Developer & Design Tools",
              desc: "The Developer and Design section is a curated collection of utilities aimed at speeding up the technical workflow of engineers and creators. We offer powerful JSON formatters, URL encoders, and Base64 converters that are essential for daily debugging and data manipulation. For designers, our Color Tool provides a seamless way to pick, convert, and save palettes across various formats like HEX, RGB, and HSL. These tools are designed to be lightweight yet powerful, providing the exact functionality you need without any unnecessary bloat.",
              icon: Code2,
              color: "text-amber-500",
              bg: "bg-amber-500/10"
            },
            {
              name: "Utility & Productivity Tools",
              desc: "Productivity is about efficiency, and our Utility suite is built to save you time on everyday calculations and conversions. From a versatile Unit Converter that handles everything from length to data storage, to specialized Utility Calculators for age and discounts, we cover the essentials. Our QR Code tools allow for instant generation and scanning, while the MemoNote Pad provides a persistent, local space for your thoughts and snippets. These tools are the 'Swiss Army Knife' of the internet, ready whenever you need a quick answer or a place to jot something down.",
              icon: Calculator,
              color: "text-emerald-500",
              bg: "bg-emerald-500/10"
            }
          ].map((category, i) => (
            <div key={i} className="p-10 rounded-[3rem] bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all">
              <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center mb-8", category.bg)}>
                <category.icon className={cn("h-7 w-7", category.color)} />
              </div>
              <h3 className="text-2xl font-black text-zinc-900 dark:text-white uppercase tracking-tight mb-6">{category.name}</h3>
              <p className="text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">{category.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* About Quick Tools Pro Section */}
      <div className="mb-48 py-24 border-y border-zinc-100 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">
            About <span className="text-emerald-500">QuickTools Pro</span>
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
            QuickTools Pro was established with a singular vision: to provide a comprehensive, high-performance, and completely private digital toolkit for the modern internet user. In an era where data privacy is often compromised for convenience, we took a different approach. By leveraging the latest advancements in browser-based computing, including WebAssembly and the Web Workers API, we have built a platform where complex operations like image compression, PDF manipulation, and cryptographic hashing occur entirely within your local environment. This means your sensitive files and personal data never touch our servers, ensuring absolute confidentiality and security. Our team of dedicated developers and designers is committed to maintaining a free-to-use resource that empowers students, professionals, and creators to streamline their workflows without the burden of subscriptions or intrusive tracking. Whether you are optimizing assets for a website, securing your digital identity, or simply converting units for a project, QuickTools Pro is your reliable partner in the digital space. We believe that professional-grade utilities should be a right, not a luxury, and we continue to innovate and expand our suite of tools to meet the evolving needs of our global community.
          </p>
        </div>
      </div>

      {/* Latest Blog Posts */}
      <div className="mb-48">
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">
            Latest <span className="text-emerald-500">Blog Posts</span>
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 font-medium max-w-2xl mx-auto">
            Stay updated with the latest tips, tutorials, and digital insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.slice(0, 3).map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group flex flex-col h-full bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 overflow-hidden hover:shadow-2xl hover:shadow-emerald-500/10 transition-all"
            >
              <div className="p-8 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-6">
                  <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest border border-emerald-100 dark:border-emerald-500/20">
                    {post.category}
                  </span>
                </div>
                
                <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-4 group-hover:text-emerald-500 transition-colors leading-tight">
                  <Link to={`/blog/${post.id}`}>{post.title}</Link>
                </h3>
                
                <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium leading-relaxed mb-8 flex-grow">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between pt-6 border-t border-zinc-50 dark:border-zinc-800">
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{post.date}</span>
                  <Link 
                    to={`/blog/${post.id}`}
                    className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:scale-110 transition-transform"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-black text-emerald-500 uppercase tracking-widest hover:gap-3 transition-all">
            View All Posts <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Tools Grid - Categorized (Original Section kept but moved down) */}
      <div className="space-y-32">
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">
            Explore All <span className="text-emerald-500">Utilities</span>
          </h2>
        </div>
        {toolCategories.map((category, catIndex) => (
          <div key={category.name}>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-12">
              <h2 className="text-2xl font-black text-zinc-900 dark:text-white uppercase tracking-widest">
                {category.name}
              </h2>
              <div className="h-px flex-grow bg-zinc-200 dark:bg-zinc-800 hidden sm:block" />
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                {category.tools.length} Specialized Tools
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[280px]">
              {category.tools.map((tool, index) => (
                <motion.div
                  key={tool.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
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
                    <div className="flex-grow min-w-0">
                      <h3 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white truncate">{tool.title}</h3>
                      <p className="mt-4 text-sm font-medium leading-relaxed text-zinc-500 dark:text-zinc-400 line-clamp-2">
                        {tool.description}
                      </p>
                    </div>
                    <div className="mt-8 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-500">
                      Launch Tool <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
