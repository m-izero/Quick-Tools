import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Shield, Lock, Eye, Cookie, Mail, AlertCircle, ArrowRight, Globe, History } from 'lucide-react';

export function PrivacyPolicy() {
  const lastUpdated = "April 9, 2026";

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <Helmet>
        <title>Privacy Policy - QuickTools Pro | Data Protection & GDPR Compliance</title>
        <meta name="description" content="Read the QuickTools Pro Privacy Policy. We are committed to protecting your data with client-side processing and transparent advertising practices." />
      </Helmet>
      

      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-black text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 mb-6 uppercase tracking-widest border border-emerald-100 dark:border-emerald-500/20"
        >
          <Shield className="h-3.5 w-3.5" />
          Legal Compliance
        </motion.div>
        <h1 className="text-4xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-6xl">
          Privacy <span className="text-emerald-500">Policy</span>
        </h1>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400 font-medium">
          Last Updated: {lastUpdated}
        </p>
      </div>

      <div className="prose prose-zinc dark:prose-invert max-w-none space-y-12">
        {/* Introduction */}
        <section className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <Eye className="h-5 w-5 text-emerald-500" />
            </div>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white m-0">1. Introduction</h2>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Welcome to QuickTools Pro ("we," "our," or "us"). We are committed to protecting your personal privacy and ensuring that your experience on our website is secure and transparent. This Privacy Policy outlines the types of information we collect, how we use it, and the steps we take to safeguard your data in compliance with the General Data Protection Regulation (GDPR) and other applicable privacy laws.
          </p>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mt-4">
            By using QuickTools Pro, you consent to the data practices described in this policy. If you do not agree with any part of this Privacy Policy, please discontinue use of our services immediately. Our primary goal is to provide useful digital utilities while maintaining the highest standards of user confidentiality.
          </p>
        </section>

        {/* Data Collection */}
        <section className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Lock className="h-5 w-5 text-blue-500" />
            </div>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white m-0">2. Information We Collect</h2>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">A. Personal Information</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                QuickTools Pro does not require users to create an account or provide personal information to use our tools. We do not collect names, physical addresses, or phone numbers during your standard browsing session. The only personal information we receive is what you voluntarily provide when contacting us via our contact form or email (e.g., your name and email address).
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">B. Client-Side Processing</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                A core pillar of our platform is that all tool-related data processing happens locally in your browser. When you compress an image, generate a password, or manipulate a PDF, the data never leaves your device. We do not upload your files to our servers, and we do not have access to the content you process using our utilities.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">C. Automatically Collected Information</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Like most websites, we automatically collect certain technical information through third-party services. This includes your IP address, browser type, operating system, referring URLs, and interaction data. This information is used for site optimization, security, and analytical purposes.
              </p>
            </div>
          </div>
        </section>

        {/* Advertising & Cookies */}
        <section className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <Cookie className="h-5 w-5 text-amber-500" />
            </div>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white m-0">3. Advertising & Cookies</h2>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            We use third-party advertising networks to serve advertisements on our website. These networks may include Media.net, Ezoic, PropellerAds, and/or Google AdSense. Our advertising partners, as third-party vendors, use cookies to serve ads based on your prior visits to our website or other websites across the internet.
          </p>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mt-4">
            These advertising cookies enable our partners and their associated networks to serve ads to you based on your browsing activity. The data collected may include your IP address, browser type, pages visited, and time spent on pages — all used for the purpose of delivering relevant advertisements.
          </p>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mt-4">
            You may opt out of personalized advertising at any time by:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2 text-zinc-600 dark:text-zinc-400">
            <li>Visiting Google Ad Settings at <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:underline">google.com/settings/ads</a></li>
            <li>Visiting the NAI opt-out page at <a href="https://www.networkadvertising.org/choices" target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:underline">networkadvertising.org/choices</a></li>
            <li>Visiting <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:underline">www.aboutads.info</a></li>
            <li>Adjusting your browser's cookie settings directly</li>
          </ul>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mt-6 italic">
            Note: We do not control the cookies used by third-party advertisers. You should consult the respective privacy policies of these third-party ad servers for more detailed information on their practices. Opting out of personalized ads does not mean you will stop seeing advertisements — it means the ads shown will be less relevant to your interests.
          </p>
        </section>

        {/* Google Analytics */}
        <section className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <AlertCircle className="h-5 w-5 text-purple-500" />
            </div>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white m-0">4. Google Analytics</h2>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            We use Google Analytics to understand how visitors interact with our website. This service tracks information such as how many people visit our site, which pages they view, and how long they stay. This data is aggregated and anonymized; we do not use Google Analytics to track or collect personally identifiable information.
          </p>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mt-4">
            Google Analytics uses cookies to collect this data. You can prevent Google Analytics from using your information by installing the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:underline">Google Analytics Opt-out Browser Add-on</a>.
          </p>
        </section>

        {/* Third Party Services */}
        <section className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
              <Globe className="h-5 w-5 text-indigo-500" />
            </div>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white m-0">5. Third-Party Services</h2>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            QuickTools Pro may contain links to other websites or utilize third-party services (such as social media sharing buttons). We are not responsible for the privacy practices or content of these external sites. We encourage you to read the privacy statements of any third-party site you visit. This Privacy Policy applies solely to information collected by QuickTools Pro.
          </p>
        </section>

        {/* User Rights */}
        <section className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-rose-500/10 flex items-center justify-center">
              <Shield className="h-5 w-5 text-rose-500" />
            </div>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white m-0">6. Your Rights (GDPR)</h2>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
            Under the General Data Protection Regulation (GDPR), users within the European Economic Area (EEA) have specific rights regarding their personal data:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-zinc-600 dark:text-zinc-400">
            <li><strong>The Right to Access:</strong> You have the right to request copies of your personal data.</li>
            <li><strong>The Right to Rectification:</strong> You have the right to request that we correct any information you believe is inaccurate.</li>
            <li><strong>The Right to Erasure:</strong> You have the right to request that we erase your personal data, under certain conditions.</li>
            <li><strong>The Right to Restrict Processing:</strong> You have the right to request that we restrict the processing of your personal data.</li>
            <li><strong>The Right to Object:</strong> You have the right to object to our processing of your personal data.</li>
            <li><strong>The Right to Data Portability:</strong> You have the right to request that we transfer the data that we have collected to another organization.</li>
          </ul>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mt-6">
            If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us at our provided email address.
          </p>
        </section>

        {/* Data Retention */}
        <section className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
              <History className="h-5 w-5 text-cyan-500" />
            </div>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white m-0">7. Data Retention</h2>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Since we do not collect personal information through our tools, there is no data to retain from your usage of our utilities. For information provided via contact forms, we retain that data only as long as necessary to fulfill your request or comply with legal obligations. Analytical data collected by third parties is retained according to their respective retention policies.
          </p>
        </section>

        {/* Contact Information */}
        <section className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-red-500/10 flex items-center justify-center">
              <Mail className="h-5 w-5 text-red-500" />
            </div>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white m-0">8. Contact Information</h2>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this website, please contact us at:
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <div className="flex-1 p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700">
              <p className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-2">Email Support</p>
              <a href="mailto:support@quick-toolz.app" className="text-xl font-black text-emerald-500 hover:underline">
                support@quick-toolz.app
              </a>
            </div>
            <div className="flex-1 p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700">
              <p className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-2">Direct Message</p>
              <Link to="/contact" className="text-xl font-black text-emerald-500 hover:underline inline-flex items-center gap-2">
                Contact Form <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Footer Links */}
        <div className="flex flex-wrap justify-center gap-8 pt-12 border-t border-zinc-100 dark:border-zinc-800">
          <Link to="/" className="text-sm font-black text-zinc-500 hover:text-emerald-500 uppercase tracking-widest transition-colors">Back to Home</Link>
          <Link to="/all-tools" className="text-sm font-black text-zinc-500 hover:text-emerald-500 uppercase tracking-widest transition-colors">Explore Tools</Link>
          <Link to="/contact" className="text-sm font-black text-zinc-500 hover:text-emerald-500 uppercase tracking-widest transition-colors">Get Support</Link>
        </div>
      </div>
    </div>
  );
}
