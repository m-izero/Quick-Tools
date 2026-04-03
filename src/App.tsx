/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Home } from '@/pages/Home';
import { ImageCompressor } from '@/pages/ImageCompressor';
import { PdfTools } from '@/pages/PdfTools';
import { Base64Tool } from '@/pages/Base64Tool';
import { PasswordGenerator } from '@/pages/PasswordGenerator';
import { CodeFormatter } from '@/pages/CodeFormatter';
import { MemoNotePad } from '@/pages/MemoNotePad';
import { AdminPanel } from '@/pages/AdminPanel';
import React, { useState, useEffect } from 'react';
import { auth, signInWithGoogle } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { LogIn } from 'lucide-react';

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
  return (
    <Router>
      <div className="min-h-screen bg-white transition-colors dark:bg-zinc-950 flex flex-col">
        <Navbar />
        <main className="flex-grow pb-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/image-compressor" element={<ImageCompressor />} />
            <Route path="/pdf-tools" element={<PdfTools />} />
            <Route path="/base64-tool" element={<Base64Tool />} />
            <Route path="/password-generator" element={<PasswordGenerator />} />
            <Route path="/code-formatter" element={<CodeFormatter />} />
            <Route path="/memo-note-pad" element={<MemoNotePad />} />
            
            {/* Protected Admin Route with Secret URL */}
            <Route path={ADMIN_SECRET_PATH} element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            } />
            
            {/* Redirect old admin path to home */}
            <Route path="/admin" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}
