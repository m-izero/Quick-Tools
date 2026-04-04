import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Send, User, MessageSquare, CheckCircle2, AlertCircle } from 'lucide-react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Simulate form submission
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      

      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-black text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 mb-6 uppercase tracking-widest border border-emerald-100 dark:border-emerald-500/20"
        >
          <Mail className="h-3.5 w-3.5" />
          Get in Touch
        </motion.div>
        <h1 className="text-4xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-6xl">
          Contact <span className="text-emerald-500">Us</span>
        </h1>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400 font-medium max-w-2xl mx-auto">
          Have a question, feedback, or a tool suggestion? We'd love to hear from you. 
          Our team typically responds within 24-48 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Contact Info */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-sm">
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white mb-6">Contact Information</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <Mail className="h-6 w-6 text-emerald-500" />
                </div>
                <div>
                  <p className="text-sm font-black text-zinc-400 uppercase tracking-widest mb-1">Email Address</p>
                  <a href="mailto:mizerohirwaelyse@gmail.com" className="text-lg font-bold text-zinc-900 dark:text-white hover:text-emerald-500 transition-colors break-all">
                    mizerohirwaelyse@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-2xl bg-blue-500/10 flex items-center justify-center shrink-0">
                  <MessageSquare className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-black text-zinc-400 uppercase tracking-widest mb-1">Support Hours</p>
                  <p className="text-lg font-bold text-zinc-900 dark:text-white">
                    Monday - Friday <br />
                    9:00 AM - 6:00 PM (UTC)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-emerald-500 p-8 rounded-[2.5rem] text-white shadow-xl shadow-emerald-500/20">
            <h3 className="text-xl font-black mb-4">Why contact us?</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm font-medium">
                <CheckCircle2 className="h-4 w-4" /> Report a bug or issue
              </li>
              <li className="flex items-center gap-2 text-sm font-medium">
                <CheckCircle2 className="h-4 w-4" /> Suggest a new tool
              </li>
              <li className="flex items-center gap-2 text-sm font-medium">
                <CheckCircle2 className="h-4 w-4" /> Business inquiries
              </li>
              <li className="flex items-center gap-2 text-sm font-medium">
                <CheckCircle2 className="h-4 w-4" /> General feedback
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white dark:bg-zinc-900 p-8 sm:p-10 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-xl">
          {status === 'success' ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="h-20 w-20 bg-emerald-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="h-10 w-10 text-emerald-500" />
              </div>
              <h2 className="text-2xl font-black text-zinc-900 dark:text-white mb-2">Message Sent!</h2>
              <p className="text-zinc-500 dark:text-zinc-400 font-medium mb-8">
                Thank you for reaching out. We've received your message and will get back to you soon.
              </p>
              <button 
                onClick={() => setStatus('idle')}
                className="px-8 py-3 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-black text-xs uppercase tracking-widest hover:opacity-90 transition-all"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                  <User className="h-3 w-3" /> Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full px-5 py-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white transition-all font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                  <Mail className="h-3 w-3" /> Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                  className="w-full px-5 py-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white transition-all font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                  <MessageSquare className="h-3 w-3" /> Your Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we help you?"
                  className="w-full px-5 py-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white transition-all font-medium resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full flex items-center justify-center gap-3 py-5 rounded-2xl bg-emerald-500 text-white font-black text-sm uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? (
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Send Message
                  </>
                )}
              </button>
              
              <p className="text-[10px] text-zinc-400 text-center font-bold uppercase tracking-widest">
                By sending this message, you agree to our Privacy Policy.
              </p>
            </form>
          )}
        </div>
      </div>

      <div className="mt-20">
      </div>
    </div>
  );
}
