import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Info, Users, Shield, Zap, Heart, Code2, GraduationCap, Globe } from 'lucide-react';

export function About() {
  const features = [
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your data stays in your browser. We don't upload your files to our servers for processing.",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Built with modern web technologies to ensure instant processing and a smooth experience.",
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      icon: Heart,
      title: "Free Forever",
      description: "No subscriptions, no hidden fees. QuickTools Pro is a gift to the developer community.",
      color: "text-rose-500",
      bg: "bg-rose-500/10"
    }
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <Helmet>
        <title>About QuickTools Pro - Our Story and Mission</title>
        <meta name="description" content="Learn about QuickTools Pro, our mission to provide free, secure, and private online tools for developers and creators worldwide." />
      </Helmet>
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-black text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 mb-6 uppercase tracking-widest border border-emerald-100 dark:border-emerald-500/20"
        >
          <Info className="h-3.5 w-3.5" />
          Our Story
        </motion.div>
        <h1 className="text-4xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-6xl">
          About <span className="text-emerald-500">QuickTools Pro</span>
        </h1>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400 font-medium max-w-2xl mx-auto">
          Empowering developers and students with a comprehensive site of fast, secure, and free online utilities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
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

      <div className="space-y-20 mb-20">
        <section className="bg-white dark:bg-zinc-900 p-10 rounded-[3rem] border border-zinc-100 dark:border-zinc-800 shadow-sm">
          <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-6 uppercase tracking-tight">Our <span className="text-emerald-500">Core Values</span></h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h4 className="text-lg font-black text-zinc-900 dark:text-white uppercase tracking-tight">User Empowerment</h4>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium leading-relaxed">
                We believe in giving users the tools they need to succeed without barriers. No paywalls, no registrations, just pure utility.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="text-lg font-black text-zinc-900 dark:text-white uppercase tracking-tight">Transparency</h4>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium leading-relaxed">
                We are open about how our tools work. All processing is client-side, and we never hide what happens to your data.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="text-lg font-black text-zinc-900 dark:text-white uppercase tracking-tight">Continuous Innovation</h4>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium leading-relaxed">
                The digital landscape changes daily. We are committed to updating our existing tools and adding new ones to meet evolving needs.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="text-lg font-black text-zinc-900 dark:text-white uppercase tracking-tight">Accessibility</h4>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium leading-relaxed">
                Our tools are designed to work on any device, from high-end workstations to budget smartphones, ensuring everyone has access to quality utilities.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-zinc-50 dark:bg-zinc-950 p-10 rounded-[3rem] border border-zinc-100 dark:border-zinc-900">
          <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-6 uppercase tracking-tight">How We Ensure <span className="text-emerald-500">Privacy</span></h2>
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
              Privacy isn't just a feature at QuickTools Pro; it's our foundation. Unlike many online tools that act as a middleman between you and a server, our platform uses the <strong>Web Workers API</strong> and <strong>Client-Side JavaScript</strong> to perform all operations locally.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 list-none p-0">
              <li className="flex items-start gap-3 p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                <Shield className="h-5 w-5 text-emerald-500 shrink-0 mt-1" />
                <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400"><strong>Zero Server Storage:</strong> We don't have a database for your files. Once you close the tab, the data is gone forever.</span>
              </li>
              <li className="flex items-start gap-3 p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                <Lock className="h-5 w-5 text-blue-500 shrink-0 mt-1" />
                <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400"><strong>End-to-End Local:</strong> Your sensitive information (like passwords or hashes) never travels over the network.</span>
              </li>
            </ul>
          </div>
        </section>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
        <div className="space-y-6">
          <h2 className="text-3xl font-black text-zinc-900 dark:text-white leading-tight">
            A Resource for the <span className="text-emerald-500">Next Generation</span> of Creators
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
            QuickTools Pro was born out of a simple observation: developers and students often need quick, reliable tools for everyday tasks—like compressing an image, generating secure hashes, or converting units—without the hassle of signing up or worrying about data privacy.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                <Code2 className="h-5 w-5 text-blue-500" />
              </div>
              <p className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Built by developers, for developers.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
                <GraduationCap className="h-5 w-5 text-purple-500" />
              </div>
              <p className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Supporting students worldwide in their learning journey.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0">
                <Globe className="h-5 w-5 text-orange-500" />
              </div>
              <p className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Accessible to everyone, everywhere, on any device.</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-emerald-500/20 blur-[100px] rounded-full" />
          <div className="relative bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-8 rounded-[3rem] shadow-2xl">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="h-32 bg-zinc-50 dark:bg-zinc-950 rounded-2xl animate-pulse" />
                <div className="h-48 bg-emerald-500/10 rounded-2xl flex items-center justify-center">
                  <Users className="h-12 w-12 text-emerald-500 opacity-20" />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="h-48 bg-blue-500/10 rounded-2xl flex items-center justify-center">
                  <Code2 className="h-12 w-12 text-blue-500 opacity-20" />
                </div>
                <div className="h-32 bg-zinc-50 dark:bg-zinc-950 rounded-2xl animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-zinc-900 dark:bg-emerald-500 p-12 rounded-[3rem] text-center text-white shadow-2xl shadow-emerald-500/20">
        <h2 className="text-3xl font-black mb-4">Join Our Community</h2>
        <p className="text-zinc-400 dark:text-emerald-50 mb-8 max-w-xl mx-auto font-medium">
          QuickTools Pro is constantly evolving. If you have suggestions for new tools or want to contribute, we'd love to hear from you.
        </p>
        <Link 
          to="/contact" 
          className="inline-flex items-center justify-center px-10 py-4 rounded-2xl bg-white text-zinc-900 font-black text-sm uppercase tracking-widest hover:scale-105 transition-all"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
