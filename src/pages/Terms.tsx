import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { FileText, CheckCircle, AlertTriangle, Scale, RefreshCcw, UserCheck } from 'lucide-react';

export function Terms() {
  const lastUpdated = "April 4, 2026";

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <Helmet>
        <title>Terms of Service - QuickTools Pro</title>
        <meta name="description" content="Review the terms and conditions for using QuickTools Pro. Understand your rights and our commitment to providing secure, browser-based tools." />
      </Helmet>
      

      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-black text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 mb-6 uppercase tracking-widest border border-emerald-100 dark:border-emerald-500/20"
        >
          <Scale className="h-3.5 w-3.5" />
          Terms of Service
        </motion.div>
        <h1 className="text-4xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-6xl">
          Terms & <span className="text-emerald-500">Conditions</span>
        </h1>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400 font-medium">
          Last Updated: {lastUpdated}
        </p>
      </div>

      <div className="prose prose-zinc dark:prose-invert max-w-none space-y-12">
        <section className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <UserCheck className="h-5 w-5 text-emerald-500" />
            </div>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white m-0">Acceptance of Terms</h2>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            By accessing and using Quick tools, you accept and agree to be bound by the terms and provision of this agreement. 
            In addition, when using these particular services, you shall be subject to any posted guidelines or rules 
            applicable to such services.
          </p>
        </section>

        <section className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-blue-500" />
            </div>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white m-0">Website Usage</h2>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            You agree to use the website only for lawful purposes and in a way that does not infringe the rights of, 
            restrict or inhibit anyone else's use and enjoyment of the website. Prohibited behavior includes 
            harassing or causing distress or inconvenience to any other user, transmitting obscene or offensive 
            content or disrupting the normal flow of dialogue within our website.
          </p>
        </section>

        <section className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
            </div>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white m-0">Disclaimer</h2>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            All tools and information on Quick tools are provided "as is" without any representations or warranties, 
            express or implied. We make no representations or warranties in relation to this website or the 
            information and materials provided on this website. While we strive for accuracy, we cannot guarantee 
            that all tools will work perfectly in all scenarios.
          </p>
        </section>

        <section className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-red-500/10 flex items-center justify-center">
              <Scale className="h-5 w-5 text-red-500" />
            </div>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white m-0">Limitation of Liability</h2>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Quick tools will not be liable to you (whether under the law of contact, the law of torts or otherwise) 
            in relation to the contents of, or use of, or otherwise in connection with, this website for any direct, 
            indirect, special or consequential loss.
          </p>
        </section>

        <section className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <RefreshCcw className="h-5 w-5 text-purple-500" />
            </div>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white m-0">Updates to Terms</h2>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            We reserve the right to change these terms from time to time at our sole discretion. All updates will be 
            posted on this page. Your continued use of the site after any change in these terms will constitute 
            your acceptance of such change.
          </p>
        </section>
      </div>

      <div className="mt-12">
      </div>
    </div>
  );
}
