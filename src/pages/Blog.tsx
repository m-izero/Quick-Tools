import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { BookOpen, ArrowRight, Clock, User } from 'lucide-react';

export const blogPosts = [
  {
    id: 'compress-images-quality',
    title: "How to Compress Images Without Losing Quality",
    excerpt: "Learn the secrets of effective image compression. Balance file size and visual fidelity for a faster web experience.",
    date: "April 5, 2026",
    author: "QuickTools Team",
    readTime: "6 min read",
    category: "Guides"
  },
  {
    id: 'base64-encoding-explained',
    title: "What is Base64 Encoding? Explained Simply",
    excerpt: "Ever wondered what those long strings of random characters are? We break down Base64 encoding in plain English.",
    date: "April 4, 2026",
    author: "QuickTools Team",
    readTime: "5 min read",
    category: "Education"
  },
  {
    id: 'generate-strong-passwords',
    title: "How to Generate Strong Passwords",
    excerpt: "In an age of cyber threats, your password is your first line of defense. Discover how to create unhackable keys.",
    date: "April 3, 2026",
    author: "QuickTools Team",
    readTime: "7 min read",
    category: "Security"
  },
  {
    id: 'best-free-tools-developers',
    title: "Best Free Online Tools for Developers",
    excerpt: "Boost your productivity with our curated list of the most essential free utilities for modern web development.",
    date: "April 2, 2026",
    author: "QuickTools Team",
    readTime: "8 min read",
    category: "Resources"
  },
  {
    id: 'how-to-use-qr-generator',
    title: "How to Use a QR Code Generator",
    excerpt: "From marketing to menus, QR codes are everywhere. Learn how to create and optimize them for your needs.",
    date: "April 1, 2026",
    author: "QuickTools Team",
    readTime: "4 min read",
    category: "Tutorials"
  }
];

export function Blog() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Helmet>
        <title>QuickTools Blog - Tips, Tutorials, and Digital Insights</title>
        <meta name="description" content="Explore our blog for expert tips on image compression, security best practices, and how to make the most of our digital toolkit." />
        <meta name="keywords" content="blog, digital tools, tutorials, image compression tips, security guides, developer blog" />
      </Helmet>
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-black text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 mb-6 uppercase tracking-widest border border-emerald-100 dark:border-emerald-500/20"
        >
          <BookOpen className="h-3.5 w-3.5" />
          QuickTools Blog
        </motion.div>
        <h1 className="text-4xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-6xl">
          Guides & <span className="text-emerald-500">Articles</span>
        </h1>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400 font-medium max-w-2xl mx-auto">
          Deep dives into web technology, security best practices, and productivity tips to help you build better.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group flex flex-col h-full bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 overflow-hidden hover:shadow-2xl hover:shadow-emerald-500/10 transition-all"
          >
            <div className="p-8 flex flex-col h-full">
              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest border border-emerald-100 dark:border-emerald-500/20">
                  {post.category}
                </span>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                  <Clock className="h-3 w-3" />
                  {post.readTime}
                </div>
              </div>
              
              <h2 className="text-2xl font-black text-zinc-900 dark:text-white mb-4 group-hover:text-emerald-500 transition-colors leading-tight">
                <Link to={`/blog/${post.id}`}>{post.title}</Link>
              </h2>
              
              <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium leading-relaxed mb-8 flex-grow">
                {post.excerpt}
              </p>
              
              <div className="flex items-center justify-between pt-6 border-t border-zinc-50 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                    <User className="h-4 w-4 text-zinc-400" />
                  </div>
                  <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400">{post.author}</span>
                </div>
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
    </div>
  );
}
