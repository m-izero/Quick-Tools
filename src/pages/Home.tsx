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
        <title>QuickTools Pro - Free Online Digital Toolkit for Developers & Creators</title>
        <meta name="description" content="Access a suite of free, professional, and private online tools. Image compression, PDF manipulation, password strength analysis, unit conversion, and more—all processed locally in your browser." />
        <meta name="keywords" content="online tools, developer tools, image compressor, pdf tools, password checker, unit converter, free utilities, private tools" />
      </Helmet>
      
      {/* Hero Section */}
      <div className="text-center mb-32">
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
          className="mt-12 flex flex-wrap justify-center gap-8"
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

      {/* Mission Section */}
      <div className="mb-32 py-20 border-y border-zinc-100 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">
            Our <span className="text-emerald-500">Mission</span>
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
            At QuickTools Pro, we believe that powerful digital utilities should be accessible to everyone without compromising privacy or performance. Most online tools require you to upload sensitive files to a remote server, creating potential security risks and slow processing times. Our platform changes that by leveraging modern web technologies to perform all calculations and file manipulations directly in your browser. Your data never leaves your device, ensuring total security and lightning-fast results.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8">
            {[
              { label: "Tools Available", value: "12+" },
              { label: "Data Privacy", value: "100%" },
              { label: "Cost to Use", value: "$0" }
            ].map((stat, i) => (
              <div key={i} className="space-y-1">
                <div className="text-3xl font-black text-emerald-500">{stat.value}</div>
                <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why this platform was made? */}
      <div className="mb-32">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-white uppercase tracking-tight text-center">
            Why this platform <span className="text-emerald-500">was made?</span>
          </h2>
          <div className="p-8 sm:p-12 rounded-[3rem] bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
            <p className="text-lg text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
              QuickTools Pro was born out of a simple observation: the internet is saturated with utility websites that are either difficult to use, insecure, or hidden behind paywalls. We saw a need for a unified, professional-grade toolkit that respects user privacy by default. By utilizing the latest advancements in browser-based computing, we've created a platform where you can compress images, manage PDFs, and secure your data without ever needing to trust a third-party server with your files. Our goal is to provide a reliable, fast, and free resource that empowers users to handle their digital tasks with confidence and efficiency.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Guide Section */}
      <div className="mb-48 space-y-24">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">
            How to <span className="text-emerald-500">Navigate</span>
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 font-medium max-w-2xl mx-auto">
            Master QuickTools Pro in seconds. Here's a visual guide to getting the most out of our professional toolkit.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-32">
          {[
            {
              title: "1. Browse the Tool Dashboard",
              desc: "Our homepage is your command center. Tools are organized into logical categories like 'Security', 'Image & PDF', and 'Developer Utilities'. Simply scroll and click to launch any tool instantly.",
              image: "images/navbar.png",
              icon: Zap,
              tag: "Dashboard"
            },
            {
              title: "2. Seamless Tool Interaction",
              desc: "Every tool is designed with a consistent, high-performance interface. Drag and drop files, paste text, or use your camera for QR scanning. All processing happens locally—no waiting for uploads.",
              image: "images/drag&drop.png",
              icon: Code2,
              tag: "Workspace"
            },
            {
              title: "3. Quick Access Navigation",
              desc: "Use the global navigation bar to quickly switch between tools, visit our blog for tutorials, or access legal information. Everything you need is always just one click away.",
              image: "images/drag&drop2.png",
              icon: ArrowRight,
              tag: "Navigation"
            }
          ].map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className={cn(
                "flex flex-col gap-12 lg:items-center",
                i % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
              )}
            >
              <div className="flex-1 space-y-8">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  <step.icon className="h-5 w-5" />
                  <span className="text-xs font-black uppercase tracking-widest">{step.tag}</span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white uppercase tracking-tight leading-tight">
                  {step.title}
                </h3>
                <p className="text-lg text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                  {step.desc}
                </p>
                <div className="flex items-center gap-4 pt-4">
                  <div className="h-1 w-12 rounded-full bg-emerald-500" />
                  <span className="text-xs font-black text-zinc-400 uppercase tracking-[0.2em]">Step {i + 1} of 3</span>
                </div>
              </div>
              <div className="flex-1 w-full">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-emerald-500/20 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="relative overflow-hidden rounded-[2.5rem] border-4 border-zinc-100 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800 shadow-2xl transition-all duration-500 group-hover:scale-[1.02] group-hover:border-emerald-500/50">
                    <img 
                      src={step.image} 
                      alt={step.title}
                      className="w-full aspect-video object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                      <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                        <Zap className="h-6 w-6 fill-current" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tools Grid - Categorized */}
      <div className="space-y-32">
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
                    <div className="flex-grow min-w-0">
                      <h3 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white truncate">{tool.title}</h3>
                      <p className="mt-4 text-sm font-medium leading-relaxed text-zinc-500 dark:text-zinc-400 line-clamp-2">
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

      {/* Why Choose Us Section */}
      <div className="mt-48 space-y-24">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">
            Why Choose <span className="text-emerald-500">QuickTools Pro</span>?
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 font-medium max-w-2xl mx-auto">
            We've built a platform that prioritizes your workflow and security above all else. Here is why thousands of users trust us every day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {[
            {
              icon: ShieldCheck,
              title: "Privacy First Architecture",
              desc: "Your files never leave your device. We use cutting-edge client-side technology to ensure that all processing happens locally in your browser, providing maximum security and total peace of mind for sensitive data.",
              color: "text-blue-500",
              bg: "bg-blue-500/10"
            },
            {
              icon: Zap,
              title: "Lightning Fast Results",
              desc: "No server uploads means no waiting. Our tools are optimized for performance, leveraging your device's hardware to deliver instant results without the latency of traditional web applications.",
              color: "text-amber-500",
              bg: "bg-amber-500/10"
            },
            {
              icon: Smartphone,
              title: "Mobile Optimized Experience",
              desc: "Designed for the modern web. Whether you're on a smartphone, tablet, or desktop, our tools provide a seamless, responsive experience that adapts perfectly to your screen size and input method.",
              color: "text-emerald-500",
              bg: "bg-emerald-500/10"
            },
            {
              icon: Lock,
              title: "No Registration Required",
              desc: "Start using our tools immediately. We don't require accounts, emails, or subscriptions. Just visit the site and get your work done without any barriers, tracking, or data collection.",
              color: "text-teal-500",
              bg: "bg-teal-500/10"
            },
            {
              icon: Code2,
              title: "Developer Centric Utilities",
              desc: "Built by developers for developers. Our tools include advanced features like JSON formatting, Base64 encoding, and cryptographic hashing to streamline your daily development and debugging workflow.",
              color: "text-orange-500",
              bg: "bg-orange-500/10"
            },
            {
              icon: Zap,
              title: "Professional Grade Quality",
              desc: "High-quality outputs every time. From lossless image compression to secure password analysis, we provide professional-grade utilities that you can rely on for your most important personal and business tasks.",
              color: "text-cyan-500",
              bg: "bg-cyan-500/10"
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

      {/* FAQ Section */}
      <div className="mt-48 py-24 border-t border-zinc-100 dark:border-zinc-800">
        <div className="max-w-3xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">
              Frequently Asked <span className="text-emerald-500">Questions</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 font-medium">
              Everything you need to know about our platform.
            </p>
          </div>

          <div className="space-y-12">
            {[
              {
                q: "Are the tools really free to use?",
                a: "Yes, 100%. All tools on QuickTools Pro are completely free to use without any hidden costs, subscriptions, or registration requirements."
              },
              {
                q: "Is my data safe on your website?",
                a: "Absolutely. We use client-side processing, which means all calculations and file manipulations happen directly in your browser. Your data is never uploaded to our servers."
              },
              {
                q: "Do I need to install any software?",
                a: "No. All our tools work directly in your web browser. There is no need to download or install any third-party applications or plugins."
              },
              {
                q: "What browsers are supported?",
                a: "We support all modern web browsers, including Chrome, Firefox, Safari, and Edge, on both desktop and mobile devices."
              },
              {
                q: "Can I use these tools for commercial purposes?",
                a: "Yes. You are free to use any of our generated outputs (passwords, compressed images, PDFs, etc.) for both personal and commercial projects."
              },
              {
                q: "How do you make money if the tools are free?",
                a: "We support the maintenance and development of QuickTools Pro through non-intrusive advertisements. This allows us to keep the tools free for everyone."
              }
            ].map((faq, i) => (
              <div key={i} className="space-y-3">
                <h4 className="text-lg font-black text-zinc-900 dark:text-white uppercase tracking-tight flex items-center gap-3">
                  <span className="text-emerald-500">Q:</span> {faq.q}
                </h4>
                <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed pl-8 border-l-2 border-emerald-500/20">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-48 rounded-[3rem] bg-zinc-900 p-12 sm:p-24 text-center relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl sm:text-6xl font-black text-white mb-8 tracking-tight">Ready to boost your <br /><span className="text-emerald-500">productivity?</span></h2>
          <p className="text-zinc-400 text-lg sm:text-xl mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            Join thousands of users who trust QuickTools Pro for their daily digital tasks. No registration, no fees, just professional tools.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/all-tools" className="px-10 py-5 rounded-2xl bg-emerald-500 text-white font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-2xl shadow-emerald-500/40 active:scale-95">
              Get Started Now
            </Link>
            <Link to="/all-tools" className="px-10 py-5 rounded-2xl bg-white/10 text-white font-black uppercase tracking-widest hover:bg-white/20 transition-all backdrop-blur-sm active:scale-95">
              Explore All Tools
            </Link>
          </div>
        </div>
        
        {/* Decorative Background */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-emerald-500/20 rounded-full blur-[160px]" />
        </div>
      </div>
    </div>
  );
}
