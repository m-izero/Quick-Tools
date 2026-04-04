import React, { useState, useRef, useEffect } from 'react';
import { 
  Video, 
  Upload, 
  Download, 
  Trash2, 
  Zap, 
  ShieldCheck, 
  FileVideo,
  Settings2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import { AdSection } from '@/components/AdSection';
import { useRecentFiles } from '@/hooks/useRecentFiles';
import { cn } from '@/utils/cn';

type CompressionLevel = 'low' | 'medium' | 'high';

interface VideoFile {
  file: File;
  preview: string;
  size: number;
  name: string;
}

export function VideoCompressor() {
  const [video, setVideo] = useState<VideoFile | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [compressionLevel, setCompressionLevel] = useState<CompressionLevel>('medium');
  const [result, setResult] = useState<{ url: string; size: number; name: string } | null>(null);
  const [ffmpegLoaded, setFfmpegLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const ffmpegRef = useRef(new FFmpeg());
  const { addRecentFile } = useRecentFiles();

  useEffect(() => {
    loadFFmpeg();
  }, []);

  const loadFFmpeg = async () => {
    try {
      const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
      const ffmpeg = ffmpegRef.current;
      
      ffmpeg.on('log', ({ message }) => {
        console.log(message);
      });

      ffmpeg.on('progress', ({ progress }) => {
        setProgress(Math.round(progress * 100));
      });

      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
      });
      
      setFfmpegLoaded(true);
    } catch (err) {
      console.error('Failed to load FFmpeg:', err);
      setError('Failed to load video processing engine. Please ensure your browser supports SharedArrayBuffer (COOP/COEP headers).');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('video/')) {
        setError('Please select a valid video file.');
        return;
      }
      
      const videoFile: VideoFile = {
        file,
        preview: URL.createObjectURL(file),
        size: file.size,
        name: file.name
      };
      setVideo(videoFile);
      setResult(null);
      setError(null);
      setProgress(0);
    }
  };

  const compressVideo = async () => {
    if (!video || !ffmpegLoaded) return;

    setIsCompressing(true);
    setProgress(0);
    setError(null);

    try {
      const ffmpeg = ffmpegRef.current;
      const inputName = 'input.mp4';
      const outputName = 'output.mp4';

      await ffmpeg.writeFile(inputName, await fetchFile(video.file));

      // Compression settings based on level
      // -crf: Constant Rate Factor (0-51, lower is better quality, 23 is default)
      // -preset: Compression speed (ultrafast, superfast, veryfast, faster, fast, medium, slow, slower, veryslow)
      let crf = '28';
      let preset = 'medium';

      if (compressionLevel === 'low') {
        crf = '32'; // Smaller size, lower quality
        preset = 'faster';
      } else if (compressionLevel === 'high') {
        crf = '23'; // Larger size, better quality
        preset = 'slow';
      }

      await ffmpeg.exec([
        '-i', inputName,
        '-vcodec', 'libx264',
        '-crf', crf,
        '-preset', preset,
        '-acodec', 'aac',
        outputName
      ]);

      const data = await ffmpeg.readFile(outputName);
      const blob = new Blob([data], { type: 'video/mp4' });
      const url = URL.createObjectURL(blob);
      
      const resultData = {
        url,
        size: blob.size,
        name: `compressed_${video.name.split('.')[0]}.mp4`
      };
      
      setResult(resultData);
      const resultFile = new File([data], resultData.name, { type: 'video/mp4' });
      addRecentFile(resultFile, 'Video Compressor', resultData.url);
    } catch (err) {
      console.error('Compression error:', err);
      setError('An error occurred during video compression. The file might be too large or incompatible.');
    } finally {
      setIsCompressing(false);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const clearVideo = () => {
    if (video?.preview) URL.revokeObjectURL(video.preview);
    if (result?.url) URL.revokeObjectURL(result.url);
    setVideo(null);
    setResult(null);
    setProgress(0);
    setError(null);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
      <AdSection type="top" />
      
      <div className="mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 mb-4 uppercase tracking-widest border border-blue-100 dark:border-blue-500/20"
        >
          <Video className="h-3 w-3" />
          Video Optimizer
        </motion.div>
        <h1 className="text-4xl font-black tracking-tight text-zinc-900 dark:text-white sm:text-6xl">
          Video <span className="text-blue-500">Compressor</span>
        </h1>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400 font-medium max-w-2xl mx-auto">
          Reduce video file size while maintaining great quality. Everything happens locally in your browser for total privacy.
        </p>
      </div>

      {!ffmpegLoaded && !error ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white dark:bg-zinc-900 rounded-[2.5rem] border-2 border-dashed border-zinc-200 dark:border-zinc-800">
          <Loader2 className="h-12 w-12 text-blue-500 animate-spin mb-4" />
          <p className="text-zinc-600 dark:text-zinc-400 font-bold">Loading video engine...</p>
          <p className="text-xs text-zinc-400 mt-2">This may take a few seconds on first load.</p>
        </div>
      ) : error ? (
        <div className="p-8 bg-red-50 dark:bg-red-500/10 rounded-[2.5rem] border-2 border-red-100 dark:border-red-500/20 text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-black text-red-900 dark:text-red-400 mb-2">Engine Error</h3>
          <p className="text-red-600 dark:text-red-300/80 font-medium max-w-md mx-auto">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-2 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-all"
          >
            Retry Loading
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {!video ? (
              <div className="relative group">
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileSelect}
                  className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                />
                <div className="flex flex-col items-center justify-center rounded-[3rem] border-4 border-dashed border-zinc-100 bg-white p-12 text-center transition-all group-hover:border-blue-500/50 dark:border-zinc-800 dark:bg-zinc-900 sm:p-20">
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-blue-500 transition-transform group-hover:scale-110 dark:bg-blue-500/10">
                    <Upload className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-black text-zinc-900 dark:text-white">Drop your video here</h3>
                  <p className="mt-3 text-zinc-500 dark:text-zinc-400 font-medium">
                    or click to browse from your device
                  </p>
                  <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <span className="rounded-full bg-zinc-100 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-zinc-500 dark:bg-zinc-800">MP4</span>
                    <span className="rounded-full bg-zinc-100 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-zinc-500 dark:bg-zinc-800">MOV</span>
                    <span className="rounded-full bg-zinc-100 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-zinc-500 dark:bg-zinc-800">WEBM</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 overflow-hidden shadow-xl">
                <div className="aspect-video bg-black relative group">
                  <video 
                    src={video.preview} 
                    controls 
                    className="w-full h-full object-contain"
                  />
                  <button
                    onClick={clearVideo}
                    className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-red-500 text-white rounded-full backdrop-blur-md transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
                <div className="p-6 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-950/50">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                      <FileVideo className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-zinc-900 dark:text-white truncate max-w-[200px]">{video.name}</p>
                      <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{formatSize(video.size)}</p>
                    </div>
                  </div>
                  {result && (
                    <div className="flex items-center gap-2 text-emerald-500 font-black text-xs uppercase tracking-widest">
                      <CheckCircle2 className="h-4 w-4" />
                      Compressed
                    </div>
                  )}
                </div>
              </div>
            )}

            {isCompressing && (
              <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
                    <span className="text-sm font-black text-zinc-900 dark:text-white uppercase tracking-widest">Compressing Video...</span>
                  </div>
                  <span className="text-sm font-black text-blue-500">{progress}%</span>
                </div>
                <div className="h-3 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-blue-500"
                  />
                </div>
                <p className="mt-4 text-xs text-zinc-400 font-medium text-center">
                  Please keep this tab open. Larger videos may take a few minutes.
                </p>
              </div>
            )}

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-emerald-500 p-8 rounded-[2.5rem] text-white shadow-xl shadow-emerald-500/20"
              >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-white/20 flex items-center justify-center">
                      <Download className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black">Compression Complete!</h3>
                      <p className="text-emerald-100 font-medium">
                        Reduced to {formatSize(result.size)} ({Math.round((1 - result.size / video!.size) * 100)}% smaller)
                      </p>
                    </div>
                  </div>
                  <a
                    href={result.url}
                    download={result.name}
                    className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white text-emerald-500 font-black uppercase tracking-widest hover:bg-emerald-50 transition-all text-center"
                  >
                    Download Video
                  </a>
                </div>
              </motion.div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <Settings2 className="h-5 w-5 text-blue-500" />
                </div>
                <h3 className="text-lg font-black text-zinc-900 dark:text-white uppercase tracking-widest">Settings</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-4 block">
                    Compression Level
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {(['low', 'medium', 'high'] as const).map((level) => (
                      <button
                        key={level}
                        onClick={() => setCompressionLevel(level)}
                        className={cn(
                          "flex items-center justify-between p-4 rounded-2xl border-2 transition-all text-left",
                          compressionLevel === level
                            ? "border-blue-500 bg-blue-50/50 dark:bg-blue-500/5"
                            : "border-zinc-100 dark:border-zinc-800 hover:border-zinc-200 dark:hover:border-zinc-700"
                        )}
                      >
                        <div>
                          <p className={cn(
                            "text-sm font-black uppercase tracking-widest",
                            compressionLevel === level ? "text-blue-600 dark:text-blue-400" : "text-zinc-900 dark:text-white"
                          )}>
                            {level === 'low' ? 'Small File' : level === 'medium' ? 'Balanced' : 'High Quality'}
                          </p>
                          <p className="text-[10px] text-zinc-500 font-bold mt-1">
                            {level === 'low' ? 'Maximum compression, lower quality' : 
                             level === 'medium' ? 'Good balance of size and quality' : 
                             'Minimum compression, best quality'}
                          </p>
                        </div>
                        {compressionLevel === level && (
                          <CheckCircle2 className="h-5 w-5 text-blue-500" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={compressVideo}
                  disabled={!video || isCompressing}
                  className="w-full flex items-center justify-center gap-3 py-5 rounded-2xl bg-blue-500 text-white font-black text-sm uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCompressing ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Compressing...
                    </>
                  ) : (
                    <>
                      <Zap className="h-5 w-5" />
                      Compress Video
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-[2rem] border border-zinc-100 dark:border-zinc-800">
              <div className="flex gap-3">
                <Info className="h-5 w-5 text-blue-500 shrink-0" />
                <div className="space-y-2">
                  <p className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-widest">Browser Processing</p>
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
                    This tool uses FFmpeg.wasm to process videos directly in your browser. 
                    Your video is never uploaded to any server, ensuring 100% privacy and security.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-20">
        <AdSection type="middle" />
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800">
          <div className="h-12 w-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6">
            <ShieldCheck className="h-6 w-6 text-blue-500" />
          </div>
          <h3 className="text-lg font-black text-zinc-900 dark:text-white mb-2">Private & Secure</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
            Your videos are processed locally. No one else can see your content.
          </p>
        </div>
        <div className="p-8 bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800">
          <div className="h-12 w-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6">
            <Zap className="h-6 w-6 text-amber-500" />
          </div>
          <h3 className="text-lg font-black text-zinc-900 dark:text-white mb-2">Fast Compression</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
            Optimized FFmpeg engine for the best performance in modern browsers.
          </p>
        </div>
        <div className="p-8 bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800">
          <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6">
            <Download className="h-6 w-6 text-emerald-500" />
          </div>
          <h3 className="text-lg font-black text-zinc-900 dark:text-white mb-2">High Quality</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
            Advanced H.264 encoding ensures your videos look great even at small sizes.
          </p>
        </div>
      </div>
    </div>
  );
}
