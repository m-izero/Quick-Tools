import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Shield, Lock, Eye, Cookie, Mail, AlertCircle } from 'lucide-react';

export function PrivacyPolicy() {
  const lastUpdated = "April 4, 2026";

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <Helmet>
        <title>Privacy Policy - QuickTools Pro</title>
        <meta name="description" content="Read our privacy policy to understand how we handle your data. QuickTools Pro is committed to privacy, with all processing happening locally in your browser." />
      </Helmet>
      

      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-black text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 mb-6 uppercase tracking-widest border border-emerald-100 dark:border-emerald-500/20"
        >
          <Shield className="h-3.5 w-3.5" />
          Legal Information
        </motion.div>
        <h1 className="text-4xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-6xl">
          Privacy <span className="text-emerald-500">Policy</span>
        </h1>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400 font-medium">
          Last Updated: {lastUpdated}
        </p>
      </div>

      <div className="prose prose-zinc dark:prose-invert max-w-none space-y-12">
        <section className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <Eye className="h-5 w-5 text-emerald-500" />
            </div>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white m-0">Information Collection</h2>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            At Quick tools, we prioritize your privacy. Most of our tools process data entirely within your browser (client-side). 
            This means your files, text, and personal data never leave your device and are not uploaded to our servers. 
            We do not collect personal information unless you voluntarily provide it through our contact form.
          </p>
        </section>

        <section className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Cookie className="h-5 w-5 text-blue-500" />
            </div>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white m-0">Cookies Usage</h2>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            We use cookies to enhance your experience, analyze site traffic, and serve personalized advertisements. 
            Cookies are small text files stored on your device. You can manage or disable cookies through your browser settings, 
            though some features of the site may not function properly without them.
          </p>
        </section>

        <section className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <AlertCircle className="h-5 w-5 text-amber-500" />
            </div>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white m-0">Google AdSense</h2>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            We use Google AdSense to serve ads when you visit our website. Google may use cookies to serve ads based on your visits to this and other websites on the Internet. You may opt out of personalized advertising by visiting: <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:underline">https://www.google.com/settings/ads</a>
          </p>
        </section>

        <section className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <Lock className="h-5 w-5 text-purple-500" />
            </div>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white m-0">Data Security</h2>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            We implement a variety of security measures to maintain the safety of your personal information. 
            However, no method of transmission over the Internet or electronic storage is 100% secure. 
            While we strive to use commercially acceptable means to protect your data, we cannot guarantee its absolute security.
          </p>
        </section>

        <section className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-red-500/10 flex items-center justify-center">
              <Mail className="h-5 w-5 text-red-500" />
            </div>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white m-0">Contact Us</h2>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            If you have any questions regarding this Privacy Policy, you may contact us using the information below:
          </p>
          <div className="mt-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 inline-block">
            <a href="mailto:mizerohirwaelyse@gmail.com" className="text-emerald-500 font-bold hover:underline">
              mizerohirwaelyse@gmail.com
            </a>
          </div>
        </section>
      </div>

      <div className="mt-12">
      </div>
    </div>
  );
}
