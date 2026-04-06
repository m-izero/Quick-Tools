import React, { useState, useRef, useEffect } from 'react';
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

        {/* SEO Content Section */}
        <div className="mt-24 border-t border-zinc-100 pt-24 dark:border-zinc-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-6 uppercase tracking-tight">
                  Free <span className="text-emerald-500">QR Code Generator</span> & Scanner
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                  Generate and read QR codes instantly with our free online tool. Whether you need to create a QR code for a website URL, plain text, or contact information, our generator provides high-quality results in seconds. Additionally, our built-in scanner allows you to decode QR codes using your device's camera or by uploading an image file, all processed locally for your privacy.
                </p>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-widest">How to Use</h3>
                <div className="space-y-8">
                  <div>
                    <h4 className="text-sm font-black text-emerald-500 uppercase tracking-widest mb-4">Generating QR Codes</h4>
                    <ol className="space-y-3">
                      {[
                        "Select the 'Generator' tab at the top of the tool.",
                        "Enter the text or URL you want to encode into the input field.",
                        "Choose your preferred QR code size (Small, Medium, or Large).",
                        "Click 'Download PNG' to save your custom QR code to your device."
                      ].map((step, i) => (
                        <li key={i} className="flex gap-3 items-start text-sm text-zinc-600 dark:text-zinc-400 font-medium">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-black text-white">{i + 1}</span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-emerald-500 uppercase tracking-widest mb-4">Scanning QR Codes</h4>
                    <ol className="space-y-3">
                      {[
                        "Select the 'Scanner' tab and choose 'Upload Image' or 'Use Camera'.",
                        "If uploading, select a PNG, JPG, or WebP image containing a QR code.",
                        "If using the camera, point it at the QR code until it is recognized.",
                        "The decoded result will appear instantly with an option to copy it."
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
                    { title: "Instant Generation", desc: "Create high-quality QR codes in real-time as you type your content." },
                    { title: "Real-time Scanning", desc: "Use your smartphone or webcam to scan QR codes directly in the browser." },
                    { title: "Privacy Focused", desc: "All scanning and generation happen locally. Your data is never sent to our servers." },
                    { title: "No App Required", desc: "Works perfectly on mobile and desktop without installing any third-party software." }
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
    </div>
  );
}
