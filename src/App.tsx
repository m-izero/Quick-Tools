/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';

// Lazy load pages
const Home = lazy(() => import('@/pages/Home').then(m => ({ default: m.Home })));
const ImageCompressor = lazy(() => import('@/pages/ImageCompressor').then(m => ({ default: m.ImageCompressor })));
const PdfTools = lazy(() => import('@/pages/PdfTools').then(m => ({ default: m.PdfTools })));
const Base64Tool = lazy(() => import('@/pages/Base64Tool').then(m => ({ default: m.Base64Tool })));
const RandomStringGenerator = lazy(() => import('@/pages/RandomStringGenerator').then(m => ({ default: m.RandomStringGenerator })));
const PasswordStrengthMeter = lazy(() => import('@/pages/PasswordStrengthMeter').then(m => ({ default: m.PasswordStrengthMeter })));
const HashGenerator = lazy(() => import('@/pages/HashGenerator').then(m => ({ default: m.HashGenerator })));
const MemoNotePad = lazy(() => import('@/pages/MemoNotePad').then(m => ({ default: m.MemoNotePad })));
const AdminPanel = lazy(() => import('@/pages/AdminPanel').then(m => ({ default: m.AdminPanel })));
const QrCodeTool = lazy(() => import('@/pages/QrCodeTool'));
const ColorTool = lazy(() => import('@/pages/ColorTool'));
const UnitConverter = lazy(() => import('@/pages/UnitConverter'));
const DevTools = lazy(() => import('@/pages/DevTools'));
const UtilityTools = lazy(() => import('@/pages/UtilityTools'));
const PrivacyPolicy = lazy(() => import('@/pages/PrivacyPolicy').then(m => ({ default: m.PrivacyPolicy })));
const Terms = lazy(() => import('@/pages/Terms').then(m => ({ default: m.Terms })));
const Contact = lazy(() => import('@/pages/Contact').then(m => ({ default: m.Contact })));
const About = lazy(() => import('@/pages/About').then(m => ({ default: m.About })));
const AllTools = lazy(() => import('@/pages/AllTools').then(m => ({ default: m.AllTools })));
const Blog = lazy(() => import('./pages/Blog').then(m => ({ default: m.Blog })));
const BlogPost = lazy(() => import('./pages/BlogPost').then(m => ({ default: m.BlogPost })));

import { auth, signInWithGoogle } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { LogIn } from 'lucide-react';
import { useDarkMode } from '@/hooks/useDarkMode';
import { CookieConsent } from '@/components/CookieConsent';

const ADMIN_SECRET_PATH = "/admin-secure-9x7k2";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      setError('');
      await signInWithGoogle();
    } catch (err) {
      setError('Authentication failed. Please try again.');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl text-center">
          <div className="h-16 w-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <LogIn className="h-8 w-8 text-emerald-500" />
          </div>
          <h2 className="text-2xl font-black text-zinc-900 dark:text-white mb-2">Admin <span className="text-emerald-500">Access</span></h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-8 font-medium">Please sign in with your Google account to access the admin panel.</p>
          
          {error && <p className="text-xs font-bold text-red-500 mb-4">{error}</p>}
          
          <button 
            onClick={handleLogin}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-black text-[10px] uppercase tracking-widest hover:opacity-90 transition-all shadow-lg shadow-black/10"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="h-4 w-4" />
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export default function App() {
  useDarkMode(); // Initialize dark mode at root

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pb-20">
          <Suspense fallback={
            <div className="min-h-[60vh] flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
          }>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/image-compressor" element={<ImageCompressor />} />
              <Route path="/pdf-tools" element={<PdfTools />} />
              <Route path="/base64-tool" element={<Base64Tool />} />
              <Route path="/random-string-generator" element={<RandomStringGenerator />} />
              <Route path="/password-strength" element={<PasswordStrengthMeter />} />
              <Route path="/hash-generator" element={<HashGenerator />} />
              <Route path="/memo-note-pad" element={<MemoNotePad />} />
              <Route path="/qr-code" element={<QrCodeTool />} />
              <Route path="/color-tool" element={<ColorTool />} />
              <Route path="/unit-converter" element={<UnitConverter />} />
              <Route path="/dev-tools" element={<DevTools />} />
              <Route path="/utility-tools" element={<UtilityTools />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/all-tools" element={<AllTools />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              
              {/* Protected Admin Route with Secret URL */}
              <Route path={ADMIN_SECRET_PATH} element={
                <ProtectedRoute>
                  <AdminPanel />
                </ProtectedRoute>
              } />
              
              {/* Redirect old admin path to home */}
              <Route path="/admin" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>
        
        <Footer />
        <CookieConsent />
      </div>
    </Router>
  );
}
