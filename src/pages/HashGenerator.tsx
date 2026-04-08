import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Hash, 
  Copy, 
  Check, 
  Trash2, 
  ShieldCheck, 
  Zap,
  CheckCircle2,
  AlertCircle,
  Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import CryptoJS from 'crypto-js';
import { cn } from '@/utils/cn';
import { Link } from 'react-router-dom';

export function HashGenerator() {
  const [inputText, setInputText] = useState('');
  const [hashes, setHashes] = useState({
    sha256: '',
    md5: '',
    sha1: '',
    sha512: ''
  });
  const [copied, setCopied] = useState<string | null>(null);

  const generateHashes = useCallback(async (text: string) => {
    if (!text) {
      setHashes({ sha256: '', md5: '', sha1: '', sha512: '' });
      return;
    }

    // SHA-256 using native SubtleCrypto
    const msgBuffer = new TextEncoder().encode(text);
    const sha256Buffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const sha256Hex = Array.from(new Uint8Array(sha256Buffer)).map(b => b.toString(16).padStart(2, '0')).join('');

    // SHA-1 using native SubtleCrypto
    const sha1Buffer = await crypto.subtle.digest('SHA-1', msgBuffer);
    const sha1Hex = Array.from(new Uint8Array(sha1Buffer)).map(b => b.toString(16).padStart(2, '0')).join('');

    // SHA-512 using native SubtleCrypto
    const sha512Buffer = await crypto.subtle.digest('SHA-512', msgBuffer);
    const sha512Hex = Array.from(new Uint8Array(sha512Buffer)).map(b => b.toString(16).padStart(2, '0')).join('');

    // MD5 using CryptoJS
    const md5Hex = CryptoJS.MD5(text).toString();

    setHashes({
      sha256: sha256Hex,
      md5: md5Hex,
      sha1: sha1Hex,
      sha512: sha512Hex
    });
  }, []);

  useEffect(() => {
    generateHashes(inputText);
  }, [inputText, generateHashes]);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const clearInput = () => {
    setInputText('');
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
      <Helmet>
        <title>Online Hash Generator - SHA-256, SHA-1, SHA-512 | QuickTools Pro</title>
        <meta name="description" content="Generate secure cryptographic hashes instantly. Support for SHA-256, SHA-1, and SHA-512. 100% private, browser-based hashing for your sensitive data." />
        <meta name="keywords" content="hash generator, sha256, sha1, sha512, cryptographic hash, online hash, secure hashing" />
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
          Hash <span className="text-emerald-500">Generator</span>
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
          Generate secure cryptographic hashes for your text data instantly in your browser.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-6">
          {/* Input Section */}
          <div className="rounded-3xl bg-white p-6 sm:p-8 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <label className="text-xs font-black text-zinc-400 uppercase tracking-widest">
                Input Text
              </label>
              <button
                onClick={clearInput}
                className="flex items-center gap-1 text-xs font-bold text-red-500 hover:text-red-600 transition-colors"
                title="Clear input"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Clear
              </button>
            </div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter text to hash..."
              className="w-full min-h-[150px] rounded-2xl bg-zinc-50 px-5 py-4 text-lg font-medium text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-zinc-800 dark:text-white transition-all resize-none"
            />
          </div>

          {/* Output Section */}
          <div className="space-y-4">
            {[
              { label: 'SHA-256', value: hashes.sha256, type: 'sha256' },
              { label: 'SHA-512', value: hashes.sha512, type: 'sha512' },
              { label: 'SHA-1', value: hashes.sha1, type: 'sha1' },
              { label: 'MD5', value: hashes.md5, type: 'md5' }
            ].map((hash) => (
              <div key={hash.type} className="rounded-3xl bg-white p-6 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black text-zinc-400 uppercase tracking-widest">{hash.label}</span>
                  {hash.value && (
                    <button
                      onClick={() => copyToClipboard(hash.value, hash.type)}
                      className={cn(
                        "flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-bold transition-all",
                        copied === hash.type 
                          ? "bg-emerald-500 text-white" 
                          : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
                      )}
                    >
                      {copied === hash.type ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                      {copied === hash.type ? 'Copied!' : 'Copy'}
                    </button>
                  )}
                </div>
                <div className="relative">
                  <div className="w-full rounded-xl bg-zinc-50 px-4 py-3 font-mono text-xs sm:text-sm text-zinc-900 dark:bg-zinc-800 dark:text-white break-all min-h-[3rem] flex items-center">
                    {hash.value || <span className="text-zinc-400 italic">Waiting for input...</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-3xl bg-zinc-900 p-8 text-white shadow-xl">
            <h3 className="text-lg font-black mb-6 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-500" />
              Security First
            </h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">Local Processing</h4>
                  <p className="text-xs text-zinc-400 mt-1">Hashes are calculated entirely in your browser. Your data never leaves your device.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">One-Way Function</h4>
                  <p className="text-xs text-zinc-400 mt-1">Cryptographic hashes are designed to be impossible to reverse-engineer.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-zinc-50 p-8 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <h3 className="text-lg font-black text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
              <Zap className="h-5 w-5 text-amber-500" />
              Use Cases
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                Verifying data integrity during transmission.
              </li>
              <li className="flex items-start gap-3 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                Generating unique identifiers for content.
              </li>
              <li className="flex items-start gap-3 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                Comparing files without revealing their actual contents.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Rich Content Section */}
      <div className="mt-24 border-t border-zinc-100 pt-24 dark:border-zinc-800">
        <div className="max-w-3xl mx-auto space-y-16">
          {/* H1 & Intro */}
          <section>
            <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-6 uppercase tracking-tight">
              Hash <span className="text-emerald-500">Generator</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
              Our Hash Generator is a powerful, browser-based security tool that allows you to create cryptographic hashes from any text input instantly. Supporting industry-standard algorithms like MD5, SHA-1, SHA-256, and SHA-512, this tool is essential for developers, security professionals, and anyone needing to verify data integrity. Whether you're checking file checksums or preparing data for secure storage, our generator provides reliable results without ever sending your data to a server. It's a fast, free, and completely private solution for all your hashing requirements.
            </p>
          </section>

          {/* How to Use */}
          <section className="space-y-6">
            <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-widest">How to Use</h3>
            <ol className="space-y-4">
              {[
                "Enter or paste the text you want to hash into the 'Input Text' area.",
                "Select the desired hashing algorithm from the available options (MD5, SHA-256, etc.).",
                "Watch as the tool generates the unique hash string in real-time as you type.",
                "Review the hexadecimal output displayed in the corresponding result box.",
                "Click the 'Copy' button to save the generated hash to your clipboard for use elsewhere.",
                "Use the 'Clear' button to reset the input field and start a new hashing session."
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
                { title: "Multiple Algorithm Support", desc: "Generate hashes using MD5, SHA-1, SHA-256, and SHA-512 to meet various security and compatibility needs." },
                { title: "Instant Browser-Side Results", desc: "All calculations are performed locally in your browser, ensuring lightning-fast performance and total data privacy." },
                { title: "Data Integrity Verification", desc: "Easily verify if a file or message has been altered by comparing its hash to a known original value." },
                { title: "Developer-Friendly Interface", desc: "A clean, intuitive design makes it easy to generate and copy hashes for use in code, databases, or documentation." }
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
                { title: "File Verification", desc: "Compare the hash of a downloaded file with the one provided by the source to ensure the file hasn't been corrupted or tampered with." },
                { title: "Password Hashing (for testing)", desc: "Generate hashes of test passwords to see how they would be stored in a database using different algorithms." },
                { title: "Digital Signatures", desc: "Create unique fingerprints for digital documents to provide a basic level of authentication and integrity checking." }
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
                { q: "What is a cryptographic hash?", a: "A cryptographic hash is a mathematical algorithm that maps data of arbitrary size to a bit string of a fixed size (a hash). It is a one-way function, meaning it is practically impossible to invert or reverse the process to find the original input." },
                { q: "What is the difference between MD5 and SHA-256?", a: "MD5 is an older, faster algorithm that is now considered cryptographically broken for many uses due to collision vulnerabilities. SHA-256 is part of the SHA-2 family and is much more secure, making it the standard for modern security applications." },
                { q: "Is hashing the same as encryption?", a: "No. Hashing is a one-way process designed to verify data integrity, while encryption is a two-way process designed to hide data and allow it to be decrypted later using a key." },
                { q: "Can I reverse a hash to get the original text?", a: "No, cryptographic hashes are designed to be non-reversible. While 'rainbow tables' can sometimes find the input for very common or short strings, a strong hash cannot be mathematically reversed." },
                { q: "Why should I use SHA-512 over SHA-256?", a: "SHA-512 provides a larger hash value (512 bits vs 256 bits) and is generally considered more resistant to brute-force attacks. It is often used in high-security environments or where long-term data integrity is required." },
                { q: "Is my data safe when using this online generator?", a: "Yes. Our tool uses client-side JavaScript to perform all calculations. Your input text never leaves your computer and is never sent to our servers, ensuring 100% privacy and security." }
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
              The Hash Generator was created to provide a secure and accessible way for users to generate cryptographic signatures for their data without relying on server-side processing. In an era where data integrity is paramount, we wanted to empower developers and security-conscious individuals with a tool that can verify files, secure passwords (for testing), and create unique identifiers—all while maintaining absolute privacy by keeping the data entirely within the user's browser.
            </p>
          </section>

          {/* Related Tools */}
          <section className="space-y-6">
            <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-widest">Related Tools</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { name: "Password Strength Checker", path: "/password-strength" },
                { name: "Random String Generator", path: "/random-string-generator" },
                { name: "Base64 Tool", path: "/base64-tool" }
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
