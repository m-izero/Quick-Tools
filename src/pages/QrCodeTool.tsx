import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  QrCode, 
  Upload, 
  Camera, 
  Download, 
  Copy, 
  RefreshCcw, 
  Check, 
  AlertCircle,
  Maximize,
  Minimize,
  Type
} from 'lucide-react';
import QRCode from 'qrcode';
import jsQR from 'jsqr';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/utils/cn';
import { Link } from 'react-router-dom';
import { ToolAdBanner } from '@/components/ToolAdBanner';

export default function QrCodeTool() {
  const [activeTab, setActiveTab] = useState<'generate' | 'read'>('generate');
  
  // Generator State
  const [inputText, setInputText] = useState('');
  const [qrSize, setQrSize] = useState<number>(256);
  const [qrUrl, setQrUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Reader State
  const [readResult, setReadResult] = useState<string | null>(null);
  const [isReading, setIsReading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  // Generate QR Code
  useEffect(() => {
    if (activeTab === 'generate' && inputText.trim()) {
      generateQR();
    } else {
      setQrUrl('');
    }
  }, [inputText, qrSize, activeTab]);

  const generateQR = async () => {
    try {
      setIsGenerating(true);
      const url = await QRCode.toDataURL(inputText, {
        width: qrSize,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
      });
      setQrUrl(url);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadQR = () => {
    if (!qrUrl) return;
    const link = document.createElement('a');
    link.href = qrUrl;
    link.download = `qrcode-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Read QR Code from File
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setReadResult(null);
    setIsReading(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) return;

        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0, img.width, img.height);
        
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
          setReadResult(code.data);
        } else {
          setError('No QR code found in this image.');
        }
        setIsReading(false);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // Read QR Code from Camera
  const startCamera = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
        requestAnimationFrame(scanFrame);
      }
    } catch (err) {
      setError('Could not access camera. Please check permissions.');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraActive(false);
    }
  };

  const scanFrame = () => {
    if (!isCameraActive || !videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    if (videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);

      if (code) {
        setReadResult(code.data);
        stopCamera();
        return;
      }
    }
    requestAnimationFrame(scanFrame);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>QR Code Generator & Reader - Free Online Tool | QuickTools Pro</title>
        <meta name="description" content="Generate custom QR codes or scan existing ones instantly. Support for text, URLs, and more. Fast, secure, and browser-based QR code utility." />
        <meta name="keywords" content="qr code generator, qr code reader, scan qr code, create qr code, online qr tool, free qr code" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "QR Code Generator & Reader",
              "description": "Generate custom QR codes or scan existing ones instantly. 100% private and local processing.",
              "operatingSystem": "All",
              "applicationCategory": "UtilityApplication",
              "url": "https://quick-toolz.vercel.app/qr-code",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            }
          `}
        </script>
      </Helmet>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center justify-center p-3 bg-emerald-500/10 rounded-2xl mb-4"
          >
            <QrCode className="h-8 w-8 text-emerald-500" />
          </motion.div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white sm:text-4xl">
            QR Code Tools
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Generate and read QR codes instantly in your browser.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex p-1 bg-zinc-200 dark:bg-zinc-900 rounded-xl mb-8">
          <button
            onClick={() => { setActiveTab('generate'); stopCamera(); }}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all",
              activeTab === 'generate'
                ? "bg-white dark:bg-zinc-800 text-emerald-600 dark:text-emerald-400 shadow-sm"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
            )}
          >
            <QrCode className="h-4 w-4" />
            Generator
          </button>
          <button
            onClick={() => setActiveTab('read')}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all",
              activeTab === 'read'
                ? "bg-white dark:bg-zinc-800 text-emerald-600 dark:text-emerald-400 shadow-sm"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
            )}
          >
            <Maximize className="h-4 w-4" />
            Scanner
          </button>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          <AnimatePresence mode="wait">
            {activeTab === 'generate' ? (
              <motion.div
                key="generate"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="p-6 sm:p-8"
              >
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                      Enter Text or URL
                    </label>
                    <div className="relative">
                      <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="https://example.com or any text..."
                        className="w-full h-32 px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600"
                      />
                      <div className="absolute top-3 right-3">
                        <Type className="h-5 w-5 text-zinc-400" />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 items-center justify-between">
                    <div className="flex gap-2">
                      {[128, 256, 512].map((size) => (
                        <button
                          key={size}
                          onClick={() => setQrSize(size)}
                          className={cn(
                            "px-4 py-2 rounded-xl text-sm font-medium transition-all",
                            qrSize === size
                              ? "bg-emerald-500 text-white"
                              : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                          )}
                        >
                          {size === 128 ? 'Small' : size === 256 ? 'Medium' : 'Large'}
                        </button>
                      ))}
                    </div>
                    
                    <button
                      onClick={() => setInputText('')}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
                    >
                      <RefreshCcw className="h-4 w-4" />
                      Clear
                    </button>
                  </div>

                  <div className="flex flex-col items-center justify-center py-8 bg-zinc-50 dark:bg-zinc-950 rounded-2xl border-2 border-dashed border-zinc-200 dark:border-zinc-800">
                    {qrUrl ? (
                      <div className="space-y-6 text-center">
                        <motion.img
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          src={qrUrl}
                          alt="Generated QR Code"
                          className="mx-auto rounded-xl shadow-lg bg-white p-2"
                        />
                        <button
                          onClick={downloadQR}
                          className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-2xl shadow-lg shadow-emerald-500/25 transition-all active:scale-95"
                        >
                          <Download className="h-5 w-5" />
                          Download PNG
                        </button>
                      </div>
                    ) : (
                      <div className="text-center text-zinc-400 dark:text-zinc-600">
                        <QrCode className="h-16 w-16 mx-auto mb-4 opacity-20" />
                        <p>Your QR code will appear here</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="read"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-6 sm:p-8"
              >
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="flex flex-col items-center justify-center p-8 bg-zinc-50 dark:bg-zinc-950 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all group"
                    >
                      <div className="p-4 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm mb-4 group-hover:scale-110 transition-transform">
                        <Upload className="h-6 w-6 text-emerald-500" />
                      </div>
                      <span className="font-semibold text-zinc-900 dark:text-white">Upload Image</span>
                      <span className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">PNG, JPG, WEBP</span>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        accept="image/*"
                        className="hidden"
                      />
                    </button>

                    <button
                      onClick={isCameraActive ? stopCamera : startCamera}
                      className={cn(
                        "flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-3xl transition-all group",
                        isCameraActive 
                          ? "bg-red-500/5 border-red-500/50" 
                          : "bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/50 hover:bg-emerald-500/5"
                      )}
                    >
                      <div className={cn(
                        "p-4 rounded-2xl shadow-sm mb-4 group-hover:scale-110 transition-transform",
                        isCameraActive ? "bg-red-500 text-white" : "bg-white dark:bg-zinc-900 text-emerald-500"
                      )}>
                        <Camera className="h-6 w-6" />
                      </div>
                      <span className="font-semibold text-zinc-900 dark:text-white">
                        {isCameraActive ? 'Stop Camera' : 'Use Camera'}
                      </span>
                      <span className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Scan in real-time</span>
                    </button>
                  </div>

                  {isCameraActive && (
                    <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-xl">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="w-full h-full object-cover"
                      />
                      <canvas ref={canvasRef} className="hidden" />
                      <div className="absolute inset-0 border-2 border-emerald-500/50 pointer-events-none">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-48 h-48 border-2 border-emerald-500 rounded-3xl animate-pulse" />
                        </div>
                      </div>
                    </div>
                  )}

                  {error && (
                    <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-2xl border border-red-100 dark:border-red-500/20">
                      <AlertCircle className="h-5 w-5 shrink-0" />
                      <p className="text-sm font-medium">{error}</p>
                    </div>
                  )}

                  {readResult && (
                    <motion.div
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="p-6 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl border border-emerald-100 dark:border-emerald-500/20"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                          Scanned Result
                        </h3>
                        <button
                          onClick={() => copyToClipboard(readResult)}
                          className="p-2 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 rounded-lg transition-colors"
                        >
                          {isCopied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                        </button>
                      </div>
                      <p className="text-zinc-900 dark:text-white font-medium break-all whitespace-pre-wrap">
                        {readResult}
                      </p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-8">
          <ToolAdBanner />
        </div>

        {/* Rich Content Section */}
        <div className="mt-24 border-t border-zinc-100 pt-24 dark:border-zinc-800">
          <div className="max-w-3xl mx-auto space-y-16">
            {/* H1 & Intro */}
            <section>
              <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-6 uppercase tracking-tight">
                Professional <span className="text-emerald-500">QR Code Generator</span> & Scanner
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                Our QR Code Tools suite provides a comprehensive, all-in-one solution for both generating and reading QR codes directly in your web browser. Whether you need to create a high-quality QR code for a website URL, plain text, or contact information, our generator delivers instant results with customizable sizes. Additionally, our advanced scanner allows you to decode QR codes using your device's camera or by uploading an image file, all while maintaining your privacy through local processing. It's the perfect tool for marketers, developers, and everyday users who need a reliable way to bridge the gap between physical and digital information.
              </p>
            </section>

            {/* How to Use */}
            <section className="space-y-6">
              <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-widest">How to Use</h3>
              <ol className="space-y-4">
                {[
                  "To generate a code, select the 'Generator' tab and enter your text or URL into the input area.",
                  "Choose your preferred QR code size (Small, Medium, or Large) to ensure it fits your specific design or printing needs.",
                  "Once the QR code appears, click the 'Download PNG' button to save the high-resolution image to your device.",
                  "To scan a code, switch to the 'Scanner' tab and choose either 'Upload Image' or 'Use Camera' mode.",
                  "If using the camera, point it at the QR code until the scanning frame recognizes the data.",
                  "Review the decoded result in the 'Scanned Result' box and click the copy icon to save the information to your clipboard."
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
                  { title: "Dual Functionality", desc: "Seamlessly switch between generating new QR codes and scanning existing ones within a single interface." },
                  { title: "Privacy-First Processing", desc: "All scanning and generation operations are performed locally, ensuring your data is never sent to a server." },
                  { title: "Real-Time Camera Scanning", desc: "Use your smartphone or laptop's webcam to scan QR codes in real-time without installing any third-party apps." },
                  { title: "High-Resolution Downloads", desc: "Generate clean, high-quality PNG images that are ready for use in print materials or digital displays." }
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
                  { title: "Marketing & Promotions", desc: "Create QR codes for business cards, flyers, or posters to direct customers to your website or social media." },
                  { title: "Contactless Information Sharing", desc: "Generate QR codes for Wi-Fi passwords, digital menus, or event details to provide a touch-free experience." },
                  { title: "Inventory & Asset Tracking", desc: "Use the scanner to quickly read QR codes on products or equipment to access digital records." }
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
                  { q: "Is it safe to scan QR codes using this online tool?", a: "Yes. Our scanner processes the image locally on your device. We do not store or transmit the contents of the QR codes you scan or the images you upload." },
                  { q: "What types of data can I encode into a QR code?", a: "You can encode any text-based data, including website URLs, plain text, email addresses, phone numbers, and even small snippets of code." },
                  { q: "Do I need to install an app to use the camera scanner?", a: "No. Our scanner works directly in any modern web browser that has permission to access your device's camera." },
                  { q: "Why isn't my camera working with the scanner?", a: "Please ensure you have granted camera permissions to your browser. If you're on a mobile device, make sure no other app is currently using the camera." },
                  { q: "Can I customize the color of the generated QR code?", a: "Currently, our tool generates standard high-contrast black and white QR codes to ensure maximum compatibility with all scanning devices." },
                  { q: "Is there a limit to how much text I can put in a QR code?", a: "While QR codes can hold up to 4,296 alphanumeric characters, we recommend keeping your input concise to ensure the code remains easy to scan." }
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
                The QR Code Tools were created to provide a seamless, privacy-focused way to interact with QR codes without the need for specialized apps or ad-heavy websites. We noticed that many QR scanners and generators are either cluttered with intrusive ads or require unnecessary permissions. Our goal was to build a clean, browser-based utility that handles both generation and scanning locally, ensuring that your data—whether it's a private URL or a scanned code—never leaves your device.
              </p>
            </section>

            {/* Related Tools */}
            <section className="space-y-6">
              <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-widest">Related Tools</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { name: "Developer Tools", path: "/dev-tools" },
                  { name: "Base64 Tool", path: "/base64-tool" },
                  { name: "Random String Generator", path: "/random-string" }
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
    </div>
  );
}
