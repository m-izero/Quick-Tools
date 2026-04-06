import React, { useState, useEffect } from 'react';
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

      {/* SEO Content Section */}
      <div className="mt-24 border-t border-zinc-100 pt-24 dark:border-zinc-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-6 uppercase tracking-tight">
                Free <span className="text-emerald-500">Password Strength</span> Meter & Generator
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                Ensure your online security with our advanced Password Strength Meter. Using the industry-standard zxcvbn algorithm, our tool provides a realistic estimation of how long it would take for a computer to crack your password. It goes beyond simple character counting by identifying common patterns, dictionary words, and keyboard sequences. Additionally, you can use our built-in secure password generator to create high-entropy, random passwords that are virtually impossible to guess.
              </p>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-widest">How to Use</h3>
              <div className="space-y-8">
                <div>
                  <h4 className="text-sm font-black text-emerald-500 uppercase tracking-widest mb-4">Testing Your Password</h4>
                  <ol className="space-y-3">
                    {[
                      "Type your password into the 'Enter Password' input field.",
                      "Observe the real-time strength indicator and score (0-4).",
                      "Review the 'Analysis & Suggestions' section for specific improvements.",
                      "Check the estimated crack time to understand your password's resilience."
                    ].map((step, i) => (
                      <li key={i} className="flex gap-3 items-start text-sm text-zinc-600 dark:text-zinc-400 font-medium">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-black text-white">{i + 1}</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
                <div>
                  <h4 className="text-sm font-black text-emerald-500 uppercase tracking-widest mb-4">Generating a Password</h4>
                  <ol className="space-y-3">
                    {[
                      "Click the 'Generate Secure Password' link above the input field.",
                      "A strong, 16-character random password will be created instantly.",
                      "Toggle the 'Eye' icon to view or hide the generated password.",
                      "Copy the password and use it for your online accounts."
                    ].map((step, i) => (
                      <li key={i} className="flex gap-3 items-start text-sm text-zinc-600 dark:text-zinc-400 font-medium">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-black text-white">{i + 1}</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-widest">Benefits</h3>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { title: "Advanced Estimation", desc: "Uses pattern matching and dictionary checks for a more accurate strength score." },
                  { title: "Secure Generation", desc: "Creates cryptographically secure random passwords directly in your browser." },
                  { title: "Privacy Guaranteed", desc: "Your passwords are never sent to a server. All analysis is performed locally." },
                  { title: "Actionable Feedback", desc: "Receive specific tips on how to make your passwords stronger and more unique." }
                ].map((benefit, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                    <h4 className="text-sm font-black text-zinc-900 dark:text-white mb-2 uppercase tracking-widest">{benefit.title}</h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">{benefit.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
