import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Cookie, X, ArrowRight } from 'lucide-react';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already given consent
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
        >
          <div className="mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-3xl bg-zinc-900/95 dark:bg-zinc-900/98 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50 p-6 md:p-8">
              {/* Background Glow */}
              <div className="absolute -top-24 -right-24 h-48 w-48 bg-emerald-500/10 blur-[80px] rounded-full" />
              <div className="absolute -bottom-24 -left-24 h-48 w-48 bg-emerald-500/10 blur-[80px] rounded-full" />

              <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-start gap-5">
                  <div className="hidden sm:flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                    <Cookie className="h-7 w-7 text-emerald-500" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-black text-white tracking-tight">Cookie Consent</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl font-medium">
                      We use cookies to improve your experience and serve ads via Google AdSense. 
                      By continuing to use our site, you accept our{' '}
                      <Link to="/privacy-policy" className="text-emerald-500 hover:underline font-bold">
                        Privacy Policy
                      </Link>.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                  <Link
                    to="/privacy-policy"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/5 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all border border-white/10"
                  >
                    Learn More
                  </Link>
                  <button
                    onClick={handleAccept}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20 group"
                  >
                    Accept All
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>

                {/* Close Button */}
                <button 
                  onClick={() => setIsVisible(false)}
                  className="absolute top-2 right-2 p-2 text-zinc-500 hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
