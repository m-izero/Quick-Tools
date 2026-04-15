import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Shield, 
  ShieldCheck, 
  ShieldAlert, 
  Eye, 
  EyeOff, 
  Info,
  CheckCircle2,
  AlertCircle,
  Lock,
  RefreshCw,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import zxcvbn from 'zxcvbn';
import { cn } from '@/utils/cn';
import { Link } from 'react-router-dom';
import { ToolAdBanner } from '@/components/ToolAdBanner';

export function PasswordStrengthMeter() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [result, setResult] = useState<zxcvbn.ZXCVBNResult | null>(null);

  useEffect(() => {
    if (password) {
      setResult(zxcvbn(password));
    } else {
      setResult(null);
    }
  }, [password]);

  const getStrengthInfo = (score: number) => {
    switch (score) {
      case 0:
        return { label: 'Very Weak', color: 'bg-red-500', text: 'text-red-500', icon: <ShieldAlert className="h-5 w-5" /> };
      case 1:
        return { label: 'Weak', color: 'bg-orange-500', text: 'text-orange-500', icon: <ShieldAlert className="h-5 w-5" /> };
      case 2:
        return { label: 'Fair', color: 'bg-yellow-500', text: 'text-yellow-500', icon: <Shield className="h-5 w-5" /> };
      case 3:
        return { label: 'Strong', color: 'bg-blue-500', text: 'text-blue-500', icon: <ShieldCheck className="h-5 w-5" /> };
      case 4:
        return { label: 'Very Strong', color: 'bg-emerald-500', text: 'text-emerald-500', icon: <ShieldCheck className="h-5 w-5" /> };
      default:
        return { label: 'None', color: 'bg-zinc-200', text: 'text-zinc-400', icon: <Shield className="h-5 w-5" /> };
    }
  };

  const strength = getStrengthInfo(result?.score ?? -1);

  const generateSecurePassword = () => {
    const length = 16;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let retVal = "";
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    for (let i = 0; i < length; ++i) {
      retVal += charset.charAt(array[i] % charset.length);
    }
    setPassword(retVal);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
      <Helmet>
        <title>Password Strength Checker - Secure Your Accounts | QuickTools Pro</title>
        <meta name="description" content="Check your password strength with our secure, local analyzer. Get instant feedback on complexity, crack time, and security improvements using the zxcvbn algorithm." />
        <meta name="keywords" content="password strength, password checker, secure password, zxcvbn, password security, online tool" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Password Strength Checker",
              "description": "Analyze password strength using the zxcvbn algorithm. 100% private and local processing.",
              "operatingSystem": "All",
              "applicationCategory": "SecurityApplication",
              "url": "https://quick-toolz.vercel.app/password-strength",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            }
          `}
        </script>
      </Helmet>
      <div className="mb-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 mb-4"
        >
          <Lock className="h-3 w-3" />
          SECURITY TOOL
        </motion.div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-white">
          Password <span className="text-emerald-500">Strength</span> Meter
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
          Analyze your password strength using the industry-standard zxcvbn estimation algorithm.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-3xl bg-white p-6 sm:p-8 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl">
            <div className="space-y-6">
              <div className="relative">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-black text-zinc-400 uppercase tracking-widest">
                    Enter Password
                  </label>
                  <button
                    onClick={generateSecurePassword}
                    className="flex items-center gap-1.5 text-xs font-bold text-emerald-500 hover:text-emerald-600 transition-colors"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    Generate Secure Password
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Type a password to analyze..."
                    className="w-full rounded-2xl bg-zinc-50 px-5 py-4 pr-12 text-lg font-medium text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-zinc-800 dark:text-white transition-all"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {password && result && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className={cn("flex items-center gap-2 text-sm font-black uppercase tracking-wider", strength.text)}>
                        {strength.icon}
                        {strength.label}
                      </div>
                      <span className="text-xs font-bold text-zinc-500">Score: {result.score}/4</span>
                    </div>
                    <div className="h-3 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${((result.score + 1) / 5) * 100}%` }}
                        className={cn("h-full transition-all duration-500", strength.color)}
                      />
                    </div>
                  </div>

                  {/* Feedback */}
                  {(result.feedback.warning || result.feedback.suggestions.length > 0) && (
                    <div className="rounded-2xl bg-zinc-50 p-6 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
                      <h4 className="flex items-center gap-2 text-sm font-black text-zinc-900 dark:text-white uppercase tracking-wider mb-4">
                        <Info className="h-4 w-4 text-emerald-500" />
                        Analysis & Suggestions
                      </h4>
                      <div className="space-y-4">
                        {result.feedback.warning && (
                          <div className="flex gap-3 text-sm text-amber-600 dark:text-amber-400 font-medium">
                            <AlertCircle className="h-5 w-5 shrink-0" />
                            <p>{result.feedback.warning}</p>
                          </div>
                        )}
                        {result.feedback.suggestions.map((suggestion, i) => (
                          <div key={i} className="flex gap-3 text-sm text-zinc-600 dark:text-zinc-400 font-medium">
                            <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
                            <p>{suggestion}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-zinc-100 p-4 dark:border-zinc-800">
                      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Crack Time (Offline)</p>
                      <p className="text-sm font-bold text-zinc-900 dark:text-white">
                        {result.crack_times_display.offline_slow_hashing_1e4_per_second}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-zinc-100 p-4 dark:border-zinc-800">
                      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Guesses Required</p>
                      <p className="text-sm font-bold text-zinc-900 dark:text-white">
                        {result.guesses.toExponential(2)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          <ToolAdBanner />
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-3xl bg-zinc-900 p-8 text-white shadow-xl">
            <h3 className="text-lg font-black mb-6 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-500" />
              Why zxcvbn?
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Unlike simple regex-based meters, zxcvbn uses a dictionary-based approach and pattern matching to detect common passwords, names, dates, and keyboard patterns.
            </p>
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3 text-xs font-bold text-zinc-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Dictionary matching
              </div>
              <div className="flex items-center gap-3 text-xs font-bold text-zinc-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Pattern recognition
              </div>
              <div className="flex items-center gap-3 text-xs font-bold text-zinc-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Entropy calculation
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rich Content Section */}
      <div className="mt-24 border-t border-zinc-100 pt-24 dark:border-zinc-800">
        <div className="max-w-3xl mx-auto space-y-16">
          {/* H1 & Intro */}
          <section>
            <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-6 uppercase tracking-tight">
              Password <span className="text-emerald-500">Strength Checker</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
              Our Password Strength Checker is a professional-grade security tool designed to help you evaluate the resilience of your passwords against modern hacking techniques. By utilizing the industry-standard zxcvbn algorithm, it provides a realistic estimation of how long it would take for a computer to crack your password. This tool is essential for anyone looking to bolster their online security and protect sensitive personal information from unauthorized access. It goes beyond simple character counting to identify complex patterns and dictionary-based vulnerabilities.
            </p>
          </section>

          {/* How to Use */}
          <section className="space-y-6">
            <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-widest">How to Use</h3>
            <ol className="space-y-4">
              {[
                "Enter the password you wish to test into the designated input field.",
                "Watch the real-time strength meter as it updates with every character you type.",
                "Review the numerical score (0 to 4) and the descriptive label (e.g., 'Strong' or 'Weak').",
                "Read the 'Analysis & Suggestions' section to see specific feedback on how to improve your password.",
                "Check the estimated crack time to understand how your password would fare against offline attacks.",
                "If your password is weak, use our 'Generate Secure Password' feature to create a high-entropy alternative."
              ].map((step, i) => (
                <li key={i} className="flex gap-4 items-start text-zinc-600 dark:text-zinc-400 font-medium">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-black text-white">{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </section>

          {/* Why Use This Tool? */}
          <section className="space-y-6">
            <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-widest">Why Use This Tool?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Advanced Pattern Recognition", desc: "Unlike basic meters, our tool detects common names, dates, and keyboard patterns that hackers easily exploit." },
                { title: "Realistic Crack Time Estimation", desc: "Get a clear understanding of your password's strength through estimated timeframes for various attack scenarios." },
                { title: "100% Client-Side Privacy", desc: "Your passwords are never sent to our servers; all analysis happens locally in your browser for maximum security." },
                { title: "Actionable Security Advice", desc: "Receive specific suggestions on how to make your passwords more unique and difficult to guess." }
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                  <h4 className="text-sm font-black text-zinc-900 dark:text-white mb-2 uppercase tracking-widest">{item.title}</h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Common Use Cases */}
          <section className="space-y-6">
            <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-widest">Common Use Cases</h3>
            <div className="space-y-4">
              {[
                { title: "Setting Up New Accounts", desc: "Verify that the password you've chosen for a new service meets high security standards before finalizing your registration." },
                { title: "Security Audits", desc: "Periodically check your existing passwords to ensure they are still considered strong by modern standards." },
                { title: "Educational Purposes", desc: "Learn about what makes a password strong or weak by experimenting with different character combinations and patterns." }
              ].map((useCase, i) => (
                <div key={i} className="flex gap-4 items-start p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 mt-2 shrink-0" />
                  <div>
                    <h4 className="text-sm font-black text-zinc-900 dark:text-white uppercase tracking-widest mb-1">{useCase.title}</h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">{useCase.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="space-y-6">
            <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-widest">Frequently Asked Questions</h3>
            <div className="space-y-8">
              {[
                { q: "How does the strength meter calculate the score?", a: "Our tool uses the zxcvbn algorithm, which simulates a realistic cracking attempt. It checks for common patterns, dictionary words, and keyboard sequences, assigning a score from 0 (very weak) to 4 (very strong) based on the estimated number of guesses required to crack it." },
                { q: "Is it safe to type my real password into this tool?", a: "Yes, it is completely safe. All processing is performed locally within your web browser using JavaScript. Your password is never transmitted over the internet or stored on our servers, ensuring total privacy." },
                { q: "What makes a password 'Strong' according to this tool?", a: "A strong password typically has high entropy, meaning it is long and lacks predictable patterns. Using a mix of uppercase letters, lowercase letters, numbers, and symbols while avoiding common words or sequences will result in a higher score." },
                { q: "Why does my long password still show as 'Weak'?", a: "Length is important, but randomness is equally critical. If your long password consists of common words (e.g., 'passwordpasswordpassword') or simple sequences (e.g., '12345678901234567890'), the algorithm will recognize these patterns and mark the password as weak." },
                { q: "How often should I change my passwords?", a: "While the old advice was to change passwords every 90 days, modern security experts suggest only changing them if you suspect a breach. However, it's vital to use unique, strong passwords for every account to prevent a single breach from compromising multiple services." },
                { q: "Can I use the generated password for my bank account?", a: "Absolutely. Our generator uses cryptographically secure random number generation to create high-entropy passwords that are ideal for sensitive accounts like banking, email, and social media." }
              ].map((faq, i) => (
                <div key={i} className="space-y-2">
                  <h4 className="text-sm font-black text-zinc-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                    <span className="text-emerald-500">Q:</span> {faq.q}
                  </h4>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed pl-6 border-l-2 border-emerald-500/20">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Why this tool was made? */}
          <section className="space-y-6">
            <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-widest">Why this tool was made?</h3>
            <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
              We introduced the Password Strength Meter to address the growing need for robust personal security in an increasingly digital world. Many users rely on simple, easily guessable passwords, unaware of how quickly modern hacking tools can compromise them. Our goal was to provide a transparent, easy-to-use utility that educates users on password complexity and encourages the adoption of stronger security practices, all while ensuring that sensitive data never leaves their local environment.
            </p>
          </section>

          {/* Related Tools */}
          <section className="space-y-6">
            <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-widest">Related Tools</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { name: "Hash Generator", path: "/hash-generator" },
                { name: "Random String Generator", path: "/random-string-generator" },
                { name: "Developer Tools", path: "/dev-tools" }
              ].map((tool, i) => (
                <Link
                  key={i}
                  to={tool.path}
                  className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 text-center text-sm font-black text-zinc-600 dark:text-zinc-400 hover:text-emerald-500 hover:border-emerald-500 transition-all uppercase tracking-widest"
                >
                  {tool.name}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
