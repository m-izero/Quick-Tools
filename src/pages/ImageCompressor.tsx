import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import imageCompression from 'browser-image-compression';
import JSZip from 'jszip';
import { 
  Download, 
  Image as ImageIcon, 
  Loader2, 
  Trash2, 
  Check, 
  FileArchive, 
  ArrowRight, 
  ZoomIn, 
  ZoomOut, 
  RefreshCw,
  Share2,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FileUpload } from '@/components/FileUpload';
import { cn } from '@/utils/cn';
import { Link } from 'react-router-dom';

interface CompressedImage {
  id: string;
  original: File;
  compressed: File | null;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
  originalUrl: string;
  compressedUrl: string | null;
  error?: string;
}

export function ImageCompressor() {
  const [images, setImages] = useState<CompressedImage[]>([]);
  const [quality, setQuality] = useState<'low' | 'medium' | 'high'>('medium');
  const [targetSizeMB, setTargetSizeMB] = useState<number>(0.5);
  const [previewSize, setPreviewSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [zoom, setZoom] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFilesSelected = (files: File[]) => {
    const newImages: CompressedImage[] = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      original: file,
      compressed: null,
      status: 'pending',
      progress: 0,
      originalUrl: URL.createObjectURL(file),
      compressedUrl: null,
    }));
    setImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (id: string) => {
    setImages(prev => {
      const image = prev.find(img => img.id === id);
      if (image) {
        URL.revokeObjectURL(image.originalUrl);
        if (image.compressedUrl) URL.revokeObjectURL(image.compressedUrl);
      }
      return prev.filter(img => img.id !== id);
    });
  };

  const compressImage = async (image: CompressedImage) => {
    const options = {
      maxSizeMB: targetSizeMB,
      maxWidthOrHeight: quality === 'low' ? 800 : quality === 'medium' ? 1920 : 3840,
      useWebWorker: true,
      onProgress: (p: number) => {
        setImages(prev => prev.map(img => 
          img.id === image.id ? { ...img, progress: p } : img
        ));
      }
    };

    try {
      // Basic validation before compression
      if (!image.original.type.startsWith('image/')) {
        throw new Error('Unsupported file format. Please upload an image.');
      }
      
      if (image.original.size > 50 * 1024 * 1024) {
        throw new Error('Exceeded max file size (50MB).');
      }

      setImages(prev => prev.map(img => 
        img.id === image.id ? { ...img, status: 'processing', error: undefined } : img
      ));
      
      const compressed = await imageCompression(image.original, options);
      const compressedUrl = URL.createObjectURL(compressed);
      
      setImages(prev => prev.map(img => 
        img.id === image.id ? { 
          ...img, 
          compressed, 
          compressedUrl, 
          status: 'completed',
          progress: 100 
        } : img
      ));
    } catch (error) {
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : 'Compression failed';
      setImages(prev => prev.map(img => 
        img.id === image.id ? { ...img, status: 'error', error: errorMessage } : img
      ));
    }
  };

  const compressAll = async () => {
    setIsProcessing(true);
    const pending = images.filter(img => img.status === 'pending');
    for (const img of pending) {
      await compressImage(img);
    }
    setIsProcessing(false);
  };

  const downloadAllAsZip = async () => {
    const zip = new JSZip();
    images.forEach(img => {
      if (img.compressed) {
        zip.file(`compressed-${img.original.name}`, img.compressed);
      }
    });
    const content = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(content);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'compressed-images.zip';
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadSingle = (image: CompressedImage) => {
    if (!image.compressed) return;
    const link = document.createElement('a');
    link.href = image.compressedUrl!;
    link.download = `compressed-${image.original.name}`;
    link.click();
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const resetAll = () => {
    images.forEach(img => {
      URL.revokeObjectURL(img.originalUrl);
      if (img.compressedUrl) URL.revokeObjectURL(img.compressedUrl);
    });
    setImages([]);
  };

  const shareFile = async (image: CompressedImage) => {
    if (!image.compressed) return;
    try {
      if (navigator.share) {
        await navigator.share({
          files: [new File([image.compressed], `compressed-${image.original.name}`, { type: image.compressed.type })],
          title: 'Compressed Image',
          text: 'Check out this compressed image from Quick tools!'
        });
      } else {
        navigator.clipboard.writeText(image.compressedUrl!);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Sharing failed', error);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <Helmet>
        <title>Online Image Compressor - Reduce File Size Fast | QuickTools Pro</title>
        <meta name="description" content="Compress your images without losing quality. Support for PNG, JPG, and WebP. Batch process multiple images instantly in your browser. 100% private and secure." />
        <meta name="keywords" content="image compressor, reduce image size, compress png, compress jpg, online image optimizer, batch image compression" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Image Compressor",
              "description": "Reduce image file size without losing quality. Support for PNG, JPG, and WebP. 100% private and local processing.",
              "operatingSystem": "All",
              "applicationCategory": "DesignApplication",
              "url": "https://quick-toolz.vercel.app/image-compressor",
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
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white sm:text-4xl">Image Compressor</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">Reduce image size without losing quality. Batch process multiple images at once.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <div className="lg:col-span-3 space-y-6">
          {images.length === 0 ? (
            <FileUpload 
              onFilesSelected={handleFilesSelected} 
              accept="image/*" 
              label="Upload Images"
              maxSizeMB={50}
            />
          ) : (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{images.length} Images Selected</span>
                  <button onClick={resetAll} className="text-xs text-red-500 hover:underline flex items-center gap-1">
                    <RefreshCw className="h-3 w-3" /> Reset All
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={compressAll}
                    disabled={isProcessing || images.every(img => img.status === 'completed')}
                    className="rounded-xl bg-emerald-500 px-6 py-2.5 text-sm font-bold text-white hover:bg-emerald-600 disabled:opacity-50 transition-all shadow-lg shadow-emerald-500/20"
                  >
                    {isProcessing ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Compress All'}
                  </button>
                  {images.some(img => img.status === 'completed') && (
                    <button
                      onClick={downloadAllAsZip}
                      className="rounded-xl bg-zinc-100 px-6 py-2.5 text-sm font-bold text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 transition-all"
                    >
                      <FileArchive className="h-4 w-4 mr-2 inline" /> ZIP
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <AnimatePresence initial={false}>
                  {images.map((image) => (
                    <motion.div
                      key={image.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950 overflow-hidden"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Before/After Preview */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Preview</span>
                            <div className="flex items-center gap-2">
                              <button onClick={() => setZoom(z => Math.max(0.5, z - 0.1))} className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded">
                                <ZoomOut className="h-3 w-3" />
                              </button>
                              <span className="text-[10px] font-mono">{Math.round(zoom * 100)}%</span>
                              <button onClick={() => setZoom(z => Math.min(3, z + 0.1))} className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded">
                                <ZoomIn className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                          
                          <div className={cn(
                            "relative overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900",
                            previewSize === 'small' ? 'h-32' : previewSize === 'medium' ? 'h-48' : 'h-72'
                          )}>
                            <div className="flex h-full w-full">
                              <div className="relative w-1/2 border-r border-white/20 overflow-hidden">
                                <img 
                                  src={image.originalUrl} 
                                  alt="Original" 
                                  className="h-full w-full object-cover origin-center"
                                  style={{ transform: `scale(${zoom})` }}
                                />
                                <div className="absolute bottom-2 left-2 rounded bg-black/50 px-1.5 py-0.5 text-[10px] text-white backdrop-blur-sm">
                                  Before: {formatSize(image.original.size)}
                                </div>
                              </div>
                              <div className="relative w-1/2 overflow-hidden">
                                {image.compressedUrl ? (
                                  <img 
                                    src={image.compressedUrl} 
                                    alt="Compressed" 
                                    className="h-full w-full object-cover origin-center"
                                    style={{ transform: `scale(${zoom})` }}
                                  />
                                ) : (
                                  <div className="flex h-full items-center justify-center text-zinc-500 text-[10px] italic">
                                    {image.status === 'processing' ? 'Processing...' : 'Ready to compress'}
                                  </div>
                                )}
                                {image.compressed && (
                                  <div className="absolute bottom-2 left-2 rounded bg-emerald-500/80 px-1.5 py-0.5 text-[10px] text-white backdrop-blur-sm">
                                    After: {formatSize(image.compressed.size)}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Info & Actions */}
                        <div className="flex flex-col justify-between">
                          <div className="space-y-4">
                            <div className="flex items-start justify-between">
                              <div className="min-w-0">
                                <h4 className="font-bold text-zinc-900 dark:text-white truncate">{image.original.name}</h4>
                                <p className="text-xs text-zinc-500">{image.original.type}</p>
                              </div>
                              <button 
                                onClick={() => removeImage(image.id)}
                                className="p-2 text-zinc-400 hover:text-red-500 transition-colors"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>

                            {image.status === 'processing' && (
                              <div className="space-y-1.5">
                                <div className="flex justify-between text-[10px] font-bold text-emerald-500">
                                  <span>Compressing...</span>
                                  <span>{Math.round(image.progress)}%</span>
                                </div>
                                <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                                  <motion.div 
                                    className="h-full bg-emerald-500"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${image.progress}%` }}
                                  />
                                </div>
                              </div>
                            )}

                            {image.status === 'error' && (
                              <div className="rounded-xl bg-red-50 p-3 dark:bg-red-500/5 border border-red-100 dark:border-red-500/20">
                                <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
                                  <RefreshCw className="h-4 w-4" />
                                  <span className="text-xs font-bold">{image.error || 'Compression failed'}</span>
                                  <button 
                                    onClick={() => compressImage(image)}
                                    className="ml-auto text-[10px] font-bold underline"
                                  >
                                    Retry
                                  </button>
                                </div>
                              </div>
                            )}

                            {image.status === 'completed' && (
                              <div className="rounded-xl bg-emerald-50 p-3 dark:bg-emerald-500/5 border border-emerald-100 dark:border-emerald-500/20">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                                    <Check className="h-4 w-4" />
                                    <span className="text-xs font-bold">Saved {Math.round((1 - image.compressed!.size / image.original.size) * 100)}%</span>
                                  </div>
                                  <div className="flex gap-2">
                                    <button onClick={() => shareFile(image)} className="p-1.5 text-emerald-600 hover:bg-emerald-100 dark:hover:bg-emerald-500/10 rounded">
                                      <Share2 className="h-3.5 w-3.5" />
                                    </button>
                                    <button 
                                      onClick={() => downloadSingle(image)}
                                      className="flex items-center gap-1 rounded bg-emerald-500 px-2 py-1 text-[10px] font-bold text-white hover:bg-emerald-600"
                                    >
                                      <Download className="h-3 w-3" /> Download
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}

                            {image.status === 'completed' && (images.length > 1 || image.original.name.toLowerCase().endsWith('.pdf')) && (
                              <div className="flex items-center gap-2 p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                                <span className="text-[10px] font-bold text-zinc-400 uppercase">Next Step:</span>
                                <button 
                                  onClick={() => window.location.href = '/pdf-tools'}
                                  className="flex items-center gap-1 text-[10px] font-bold text-emerald-500 hover:underline"
                                >
                                  Convert to PDF <ArrowRight className="h-2.5 w-2.5" />
                                </button>
                              </div>
                            )}
                          </div>

                          {image.status === 'pending' && (
                            <button
                              onClick={() => compressImage(image)}
                              className="w-full rounded-xl bg-emerald-500 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-600 transition-all"
                            >
                              Compress Now
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                <button
                  onClick={() => document.querySelector<HTMLInputElement>('input[type="file"]')?.click()}
                  className="w-full rounded-2xl border-2 border-dashed border-zinc-200 p-4 text-center text-sm font-medium text-zinc-500 hover:border-emerald-400 hover:text-emerald-500 dark:border-zinc-800 transition-all"
                >
                  + Add More Images
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950 sticky top-24">
            <h3 className="font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
              <ImageIcon className="h-4 w-4 text-emerald-500" /> Settings
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                  Quality: {quality}
                </label>
                <div className="flex gap-2">
                  {(['low', 'medium', 'high'] as const).map((q) => (
                    <button
                      key={q}
                      onClick={() => setQuality(q)}
                      className={cn(
                        "flex-1 rounded-lg py-2 text-[10px] font-bold uppercase transition-all",
                        quality === q 
                          ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" 
                          : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400"
                      )}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                  Target Size: {targetSizeMB}MB
                </label>
                <input 
                  type="range" 
                  min="0.1" 
                  max="5" 
                  step="0.1"
                  value={targetSizeMB}
                  onChange={(e) => setTargetSizeMB(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-zinc-100 rounded-lg appearance-none cursor-pointer dark:bg-zinc-800 accent-emerald-500"
                />
                <div className="flex justify-between mt-2 text-[10px] text-zinc-400">
                  <span>0.1MB</span>
                  <span>5MB</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                  Preview Size
                </label>
                <div className="flex gap-2">
                  {(['small', 'medium', 'large'] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setPreviewSize(s)}
                      className={cn(
                        "flex-1 rounded-lg py-2 text-[10px] font-bold uppercase transition-all",
                        previewSize === s 
                          ? "bg-emerald-500 text-white" 
                          : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400"
                      )}
                    >
                      {s.charAt(0)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <RefreshCw className="h-3 w-3" />
                  <span>Auto-naming enabled</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* Sticky Mobile Action Bar */}
      {images.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white/80 backdrop-blur-lg border-t border-zinc-200 p-4 dark:bg-zinc-950/80 dark:border-zinc-800">
          <div className="flex gap-3 max-w-md mx-auto">
            <button
              onClick={compressAll}
              disabled={isProcessing || images.every(img => img.status === 'completed')}
              className="flex-grow rounded-xl bg-emerald-500 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 disabled:opacity-50"
            >
              {isProcessing ? 'Processing...' : 'Compress All'}
            </button>
            {images.some(img => img.status === 'completed') && (
              <button
                onClick={downloadAllAsZip}
                className="rounded-xl bg-zinc-100 px-4 py-3 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
              >
                <FileArchive className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Rich Content Section */}
      <div className="mt-24 border-t border-zinc-100 pt-24 dark:border-zinc-800">
        <div className="max-w-3xl mx-auto space-y-16">
          {/* H1 & Intro */}
          <section>
            <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-6 uppercase tracking-tight">
              Image <span className="text-emerald-500">Compressor</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
              Our Image Compressor is a high-performance, browser-based tool designed to reduce the file size of your images without sacrificing visual quality. Supporting popular formats like JPEG, PNG, and WebP, it's the perfect solution for web developers, social media managers, and anyone looking to optimize their digital assets. By performing all compression locally on your device, we guarantee maximum privacy and lightning-fast results. This tool helps you save storage space, speed up website loading times, and make sharing large photos easier than ever.
            </p>
          </section>

          {/* How to Use */}
          <section className="space-y-6">
            <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-widest">How to Use</h3>
            <ol className="space-y-4">
              {[
                "Click the 'Upload Images' area or drag and drop your image files directly into the browser.",
                "Select your desired compression quality (Low, Medium, or High) from the settings sidebar.",
                "Use the 'Target Size' slider to specify a maximum file size if you have specific constraints.",
                "Click the 'Compress All' button to begin processing all uploaded images simultaneously.",
                "Use the 'Before/After' preview window to compare the original and compressed versions side-by-side.",
                "Download individual compressed images or click 'ZIP' to download all optimized files in a single archive."
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
                { title: "Lossy vs. Lossless Options", desc: "Choose the right balance between file size reduction and image fidelity to suit your specific needs." },
                { title: "Batch Processing Capabilities", desc: "Save time by uploading and compressing multiple images at once with our efficient batch engine." },
                { title: "Privacy-First Architecture", desc: "Your images are never uploaded to a server; all optimization happens locally in your web browser." },
                { title: "Website Performance Optimization", desc: "Smaller image files lead to faster page loads, improving user experience and SEO rankings for your site." }
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
                { title: "Website & Blog Optimization", desc: "Reduce the weight of your web pages by compressing high-resolution photos before uploading them to your CMS." },
                { title: "Email Attachments", desc: "Shrink large image files to stay within email provider size limits while maintaining clear, viewable quality." },
                { title: "Social Media Sharing", desc: "Quickly optimize photos for platforms like Instagram or Twitter to ensure fast uploads and consistent presentation." }
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
                { q: "What is the difference between lossy and lossless compression?", a: "Lossy compression significantly reduces file size by removing some non-essential data, which may slightly affect quality. Lossless compression reduces file size without any loss in visual quality but typically results in larger files than lossy methods." },
                { q: "Which image formats are supported by this compressor?", a: "Our tool supports the most common web formats, including JPEG, PNG, and WebP. It can also handle large high-resolution photos up to 50MB in size." },
                { q: "Will my images lose their transparency?", a: "No. If you upload a PNG with a transparent background, our compressor will maintain that transparency in the optimized version." },
                { q: "Is there a limit to how many images I can compress at once?", a: "There is no hard limit, but performance depends on your device's memory and processing power. We recommend batches of 10-20 images for the best experience." },
                { q: "How much file size can I expect to save?", a: "Depending on the original image and chosen settings, you can often see reductions of 50% to 90% in file size with minimal noticeable difference in quality." },
                { q: "Are my private photos safe using this online tool?", a: "Yes, 100%. Because the compression is performed entirely within your browser using JavaScript, your images are never sent to our servers. Your privacy is our top priority." }
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
              We built the Image Compressor to solve the common frustration of dealing with oversized image files that slow down websites and exceed email limits. While many online compressors exist, they often compromise user privacy by uploading images to remote servers. Our goal was to create a professional-grade optimization tool that runs entirely in the browser, giving users a fast, secure, and high-quality way to manage their visual assets without ever letting their private photos leave their device.
            </p>
          </section>

          {/* Related Tools */}
          <section className="space-y-6">
            <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-widest">Related Tools</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { name: "PDF Tools", path: "/pdf-tools" },
                { name: "QR Code Tools", path: "/qr-code-tool" },
                { name: "Unit Converter", path: "/unit-converter" }
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
