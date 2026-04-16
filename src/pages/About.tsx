import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ToolAdBanner } from '@/components/ToolAdBanner';
import { Info, Users, Shield, Zap, Heart, Code2, GraduationCap, Globe, CheckCircle2, Target, Eye } from 'lucide-react';

export function About() {
  const features = [
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your data stays in your browser. We don't upload your files to our servers for processing. All tools run locally on your device.",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Built with modern web technologies to ensure instant processing and a smooth experience without server-side delays.",
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      icon: Heart,
      title: "Free Forever",
      description: "No subscriptions, no hidden fees. QuickTools Pro is a gift to the developer community, supported by non-intrusive ads.",
      color: "text-rose-500",
      bg: "bg-rose-500/10"
    }
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <Helmet>
        <title>About QuickTools Pro - Our Story, Mission, and Commitment to Privacy</title>
        <meta name="description" content="Learn about QuickTools Pro, our mission to provide free, secure, and private online tools for developers and creators worldwide. Discover our core values and privacy standards." />
      </Helmet>
      
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-black text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 mb-6 uppercase tracking-widest border border-emerald-100 dark:border-emerald-500/20"
        >
          <Info className="h-3.5 w-3.5" />
          Who We Are
        </motion.div>
        <h1 className="text-4xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-6xl">
          About <span className="text-emerald-500">QuickTools Pro</span>
        </h1>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400 font-medium max-w-2xl mx-auto">
          QuickTools Pro is a leading online platform dedicated to providing high-quality, secure, and accessible digital utilities for professionals, students, and creators across the globe.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all group"
          >
            <div className={`h-14 w-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <feature.icon className={`h-7 w-7 ${feature.color}`} />
            </div>
            <h3 className="text-xl font-black text-zinc-900 dark:text-white mb-3">{feature.title}</h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed font-medium">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="space-y-24 mb-24">
        {/* Mission & Vision */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="bg-white dark:bg-zinc-900 p-10 rounded-[3rem] border border-zinc-100 dark:border-zinc-800 shadow-sm h-full">
            <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6">
              <Target className="h-6 w-6 text-emerald-500" />
            </div>
            <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-6 uppercase tracking-tight">Our <span className="text-emerald-500">Mission</span></h2>
            <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
              Our mission is to democratize access to professional-grade digital tools. We believe that essential utilities like image compression, password generation, and data encoding should be free, fast, and—most importantly—private. We aim to remove the technical barriers that often slow down productivity, allowing you to focus on what truly matters: your work and your creativity.
            </p>
          </div>
          <div className="bg-white dark:bg-zinc-900 p-10 rounded-[3rem] border border-zinc-100 dark:border-zinc-800 shadow-sm h-full">
            <div className="h-12 w-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6">
              <Eye className="h-6 w-6 text-blue-500" />
            </div>
            <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-6 uppercase tracking-tight">Our <span className="text-blue-500">Vision</span></h2>
            <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
              We envision a web where privacy is the default, not an afterthought. QuickTools Pro strives to be the gold standard for browser-based utilities, constantly expanding our toolkit to meet the needs of a rapidly evolving digital landscape. We see a future where every creator has a reliable, secure "Swiss Army Knife" of tools at their fingertips, accessible from any device, anywhere in the world.
            </p>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-zinc-50 dark:bg-zinc-950 p-10 sm:p-16 rounded-[4rem] border border-zinc-100 dark:border-zinc-900">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white mb-6 uppercase tracking-tight">Why Choose <span className="text-emerald-500">QuickTools Pro</span>?</h2>
            <p className="text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
              In a sea of online tools, QuickTools Pro stands out by prioritizing the user experience and data integrity above all else.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              { title: "No Registration Required", desc: "Start using any tool immediately. We don't ask for your email, name, or any personal details." },
              { title: "Client-Side Processing", desc: "Your files never leave your computer. We use your browser's power to process data locally." },
              { title: "Clean & Ad-Light", desc: "We use minimal, non-intrusive advertising to keep the lights on without ruining your experience." },
              { title: "Cross-Platform Support", desc: "Whether you're on Windows, macOS, Linux, Android, or iOS, our tools work seamlessly." },
              { title: "Regular Updates", desc: "We constantly refine our algorithms and add new tools based on community feedback." },
              { title: "Educational Resource", desc: "Our blog provides deep dives into how these tools work, helping you learn while you work." }
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm">
                <CheckCircle2 className="h-6 w-6 text-emerald-500 shrink-0" />
                <div>
                  <h4 className="text-lg font-black text-zinc-900 dark:text-white mb-1 uppercase tracking-tight">{item.title}</h4>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* The Technology */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-black text-zinc-900 dark:text-white leading-tight uppercase tracking-tight">
              Powered by <span className="text-emerald-500">Modern Technology</span>
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
              QuickTools Pro leverages the latest browser capabilities to provide a desktop-class experience on the web. By utilizing technologies like <strong>WebAssembly</strong>, <strong>Web Workers</strong>, and <strong>Canvas API</strong>, we deliver high-performance tools that were previously only possible with installed software.
            </p>
            <div className="flex flex-wrap gap-4">
              {['React 18', 'TypeScript', 'Tailwind CSS', 'Vite', 'Web Workers', 'Lucide Icons'].map((tech) => (
                <span key={tech} className="px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs font-black uppercase tracking-widest border border-zinc-200 dark:border-zinc-700">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-emerald-500/20 blur-3xl rounded-full opacity-50" />
            <div className="relative bg-white dark:bg-zinc-900 p-8 rounded-[3rem] border border-zinc-100 dark:border-zinc-800 shadow-2xl">
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900">
                  <div className="h-10 w-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white">
                    <Code2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-zinc-900 dark:text-white uppercase tracking-tight">Optimized Code</h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Minified and efficient delivery.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900">
                  <div className="h-10 w-10 rounded-xl bg-blue-500 flex items-center justify-center text-white">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-zinc-900 dark:text-white uppercase tracking-tight">Instant Load</h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Lazy-loaded components for speed.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900">
                  <div className="h-10 w-10 rounded-xl bg-purple-500 flex items-center justify-center text-white">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-zinc-900 dark:text-white uppercase tracking-tight">Secure by Design</h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">No data ever leaves your browser.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* AdSense Compliance / Transparency Section */}
      <section className="bg-white dark:bg-zinc-900 p-10 sm:p-16 rounded-[4rem] border border-zinc-100 dark:border-zinc-800 shadow-sm mb-24">
        <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-8 text-center uppercase tracking-tight">Transparency & <span className="text-emerald-500">Compliance</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">How We Sustain the Platform</h3>
            <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
              QuickTools Pro is a free resource. To keep our services free for everyone, we display non-intrusive advertisements through Google AdSense. These ads help us cover the costs of hosting, development, and maintenance. We are committed to ensuring that ads do not interfere with your productivity or compromise your privacy.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">Our Content Standards</h3>
            <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
              All content on QuickTools Pro, including our blog posts and tool descriptions, is original and carefully curated by our team. we strictly adhere to Google AdSense Program Policies, ensuring a safe and high-quality environment for both our users and our advertisers.
            </p>
          </div>
        </div>
      </section>

      <div className="bg-zinc-900 dark:bg-emerald-500 p-12 rounded-[3rem] text-center text-white shadow-2xl shadow-emerald-500/20">
        <h2 className="text-3xl font-black mb-4 uppercase tracking-tight">Get in Touch</h2>
        <p className="text-zinc-400 dark:text-emerald-50 mb-8 max-w-xl mx-auto font-medium">
          Have questions about our mission, or want to suggest a new tool? We're always listening to our community.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/contact" 
            className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 rounded-2xl bg-white text-zinc-900 font-black text-sm uppercase tracking-widest hover:scale-105 transition-all"
          >
            Contact Us
          </Link>
          <Link 
            to="/privacy-policy" 
            className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 rounded-2xl bg-zinc-800 dark:bg-emerald-600 text-white font-black text-sm uppercase tracking-widest hover:scale-105 transition-all"
          >
            Privacy Policy
          </Link>
        </div>
      </div>

      <ToolAdBanner />
    </div>
  );
}
