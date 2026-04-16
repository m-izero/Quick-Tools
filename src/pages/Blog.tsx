import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { BookOpen, ArrowRight, Clock, User } from 'lucide-react';
import { ToolAdBanner } from '@/components/ToolAdBanner';

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
  },
  {
    id: 'importance-of-https-ssl',
    title: "The Importance of HTTPS and SSL Certificates",
    excerpt: "Security is no longer optional. Learn why HTTPS is essential for every website and how SSL certificates protect your users.",
    date: "April 10, 2026",
    author: "QuickTools Team",
    readTime: "10 min read",
    category: "Security"
  },
  {
    id: 'mastering-pdf-manipulation',
    title: "Mastering PDF Manipulation: Merging, Splitting, and Beyond",
    excerpt: "PDFs are the standard for documents. Discover how to handle them like a pro with our comprehensive guide to PDF tools.",
    date: "April 9, 2026",
    author: "QuickTools Team",
    readTime: "9 min read",
    category: "Guides"
  },
  {
    id: 'unit-conversion-precision',
    title: "Unit Conversion: Why Precision Matters",
    excerpt: "From engineering to cooking, accurate unit conversion is vital. Explore the science of measurement and how to avoid costly errors.",
    date: "April 8, 2026",
    author: "QuickTools Team",
    readTime: "8 min read",
    category: "Education"
  },
  {
    id: 'color-theory-web-design',
    title: "The Art of Color Theory in Web Design",
    excerpt: "Colors evoke emotions and drive actions. Master the basics of color theory to create visually stunning and effective websites.",
    date: "April 7, 2026",
    author: "QuickTools Team",
    readTime: "11 min read",
    category: "Design"
  },
  {
    id: 'optimizing-web-performance-advanced',
    title: "Optimizing Web Performance: Beyond Images",
    excerpt: "Speed is a feature. Learn advanced techniques to optimize your website's performance, from minification to caching strategies.",
    date: "April 6, 2026",
    author: "QuickTools Team",
    readTime: "12 min read",
    category: "Performance"
  },
  {
    id: 'understanding-cryptographic-hashes',
    title: "Understanding Cryptographic Hashes",
    excerpt: "What are MD5, SHA-1, and SHA-256? Learn how cryptographic hashes work and why they are fundamental to digital security.",
    date: "April 5, 2026",
    author: "QuickTools Team",
    readTime: "9 min read",
    category: "Security"
  },
  {
    id: 'secure-memo-notepad-ideas',
    title: "Why You Need a Secure Memo Notepad",
    excerpt: "Your ideas are valuable. Discover the benefits of using a secure, browser-based notepad for capturing your thoughts on the go.",
    date: "April 4, 2026",
    author: "QuickTools Team",
    readTime: "7 min read",
    category: "Productivity"
  },
  {
    id: 'evolution-web-dev-tools',
    title: "The Evolution of Web Development Tools",
    excerpt: "From simple text editors to powerful IDEs and online utilities. Trace the history of the tools that shaped the modern web.",
    date: "April 3, 2026",
    author: "QuickTools Team",
    readTime: "10 min read",
    category: "Resources"
  },
  {
    id: 'productive-developer-workspace',
    title: "Building a Productive Developer Workspace",
    excerpt: "Your environment affects your output. Learn how to optimize your physical and digital workspace for maximum focus and efficiency.",
    date: "April 2, 2026",
    author: "QuickTools Team",
    readTime: "8 min read",
    category: "Productivity"
  },
  {
    id: 'ai-role-modern-software-dev',
    title: "The Role of AI in Modern Software Development",
    excerpt: "AI is changing how we code. Explore the impact of artificial intelligence on software engineering and what the future holds.",
    date: "April 1, 2026",
    author: "QuickTools Team",
    readTime: "11 min read",
    category: "Technology"
  },
  {
    id: 'mastering-regular-expressions',
    title: "Mastering Regular Expressions: A Developer's Guide",
    excerpt: "Regular expressions are a powerful tool for pattern matching and text manipulation. Learn how to master them and boost your coding efficiency.",
    date: "March 31, 2026",
    author: "QuickTools Team",
    readTime: "12 min read",
    category: "Developer Tools"
  },
  {
    id: 'the-future-of-web-security',
    title: "The Future of Web Security: Trends to Watch",
    excerpt: "From zero-trust architecture to quantum-resistant cryptography. Explore the emerging trends that will define the future of web security.",
    date: "March 30, 2026",
    author: "QuickTools Team",
    readTime: "11 min read",
    category: "Security"
  },
  {
    id: 'optimizing-images-for-seo',
    title: "Optimizing Images for SEO: A Comprehensive Guide",
    excerpt: "Images are vital for SEO. Learn how to optimize your images for search engines, from alt text to file names and structured data.",
    date: "March 29, 2026",
    author: "QuickTools Team",
    readTime: "10 min read",
    category: "SEO"
  },
  {
    id: 'the-impact-of-web-accessibility',
    title: "The Impact of Web Accessibility on User Experience",
    excerpt: "Accessibility is not just a legal requirement; it's a moral and business imperative. Discover how to build a more inclusive web for everyone.",
    date: "March 28, 2026",
    author: "QuickTools Team",
    readTime: "13 min read",
    category: "Design"
  },
  {
    id: 'modern-javascript-features',
    title: "Modern JavaScript Features You Should Be Using",
    excerpt: "JavaScript is evolving rapidly. Explore the latest features and syntax that will help you write cleaner, more efficient, and more maintainable code.",
    date: "March 27, 2026",
    author: "QuickTools Team",
    readTime: "12 min read",
    category: "Education"
  },
  {
    id: 'understanding-api-security',
    title: "Understanding API Security: Best Practices",
    excerpt: "APIs are the backbone of modern apps. Learn how to secure your interfaces and protect your data from common vulnerabilities.",
    date: "March 26, 2026",
    author: "QuickTools Team",
    readTime: "11 min read",
    category: "Security"
  },
  {
    id: 'the-rise-of-edge-computing',
    title: "The Rise of Edge Computing: What You Need to Know",
    excerpt: "Discover the benefits of moving processing closer to the source. Explore how edge computing is shaping the future of the web.",
    date: "March 25, 2026",
    author: "QuickTools Team",
    readTime: "10 min read",
    category: "Technology"
  },
  {
    id: 'mastering-css-grid-layout',
    title: "Mastering CSS Grid Layout: From Zero to Hero",
    excerpt: "CSS Grid is a revolutionary layout system. Learn how to build complex, responsive layouts with ease using this powerful tool.",
    date: "March 24, 2026",
    author: "QuickTools Team",
    readTime: "12 min read",
    category: "Design"
  },
  {
    id: 'the-importance-of-code-reviews',
    title: "The Importance of Code Reviews in Software Development",
    excerpt: "Code reviews are not just about finding bugs. Discover how they promote knowledge sharing and improve overall code quality.",
    date: "March 23, 2026",
    author: "QuickTools Team",
    readTime: "11 min read",
    category: "Developer Tools"
  },
  {
    id: 'building-scalable-web-apps',
    title: "Building Scalable Web Applications: A Guide",
    excerpt: "Learn the principles and patterns of building applications that can handle millions of users, from load balancing to microservices.",
    date: "March 22, 2026",
    author: "QuickTools Team",
    readTime: "13 min read",
    category: "Architecture"
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

      {/* Blog Intro Content */}
      <div className="mb-24 grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-3xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">
            Knowledge is <span className="text-emerald-500">Power</span>
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed text-lg">
            At QuickTools Pro, we don't just provide the tools; we provide the knowledge to use them effectively. Our blog is a curated resource for developers, designers, and digital creators who want to stay ahead of the curve. From understanding the nuances of image compression to mastering the latest security protocols, our articles are designed to be practical, informative, and easy to digest.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              to="/all-tools" 
              className="px-8 py-4 rounded-2xl bg-emerald-500 text-white font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
            >
              Explore All Tools
            </Link>
          </div>
        </div>
        <div className="relative group">
          <div className="absolute -inset-4 bg-emerald-500/20 rounded-[3rem] blur-2xl opacity-25 group-hover:opacity-40 transition-opacity" />
          <div className="relative rounded-[2.5rem] border-2 border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 shadow-xl">
            <h3 className="text-lg font-black text-zinc-900 dark:text-white mb-4 uppercase tracking-widest">Featured Topics</h3>
            <ul className="space-y-4">
              {[
                { label: "Web Performance", count: 12 },
                { label: "Cyber Security", count: 8 },
                { label: "Dev Productivity", count: 15 },
                { label: "Design Systems", count: 6 }
              ].map((topic, i) => (
                <li key={i} className="flex items-center justify-between text-sm font-bold text-zinc-500 hover:text-emerald-500 cursor-pointer transition-colors">
                  <span>{topic.label}</span>
                  <span className="px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-[10px]">{topic.count}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
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

      <div className="mt-16">
        <ToolAdBanner />
      </div>
    </div>
  );
}
