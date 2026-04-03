import React, { useRef, useState } from 'react';
import { Upload, Camera, Image as ImageIcon, X, AlertCircle, Loader2, RefreshCw } from 'lucide-react';
import { cn } from '@/utils/cn';

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxSizeMB?: number;
  className?: string;
  label?: string;
}

export function FileUpload({ 
  onFilesSelected, 
  accept = "*", 
  multiple = true, 
  maxSizeMB = 50,
  className,
  label = "Upload Files"
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const validateFiles = (files: File[]) => {
    const validFiles: File[] = [];
    let errorMessage = null;

    for (const file of files) {
      if (file.size > maxSizeMB * 1024 * 1024) {
        errorMessage = `File too large: ${file.name} (Max ${maxSizeMB}MB)`;
        continue;
      }
      
      // Basic type validation if accept is provided
      if (accept !== "*" && !accept.split(',').some(type => {
        const cleanType = type.trim();
        if (cleanType.startsWith('.')) return file.name.toLowerCase().endsWith(cleanType.toLowerCase());
        if (cleanType.includes('/*')) return file.type.startsWith(cleanType.replace('/*', ''));
        return file.type === cleanType;
      })) {
        errorMessage = `Unsupported format: ${file.name}`;
        continue;
      }

      validFiles.push(file);
    }

    if (errorMessage) setError(errorMessage);
    else setError(null);

    return validFiles;
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const validFiles = validateFiles(Array.from(files));
    if (validFiles.length > 0) {
      onFilesSelected(validFiles);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={cn(
          "relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 transition-all sm:p-12",
          isDragging 
            ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10" 
            : "border-zinc-200 dark:border-zinc-800 hover:border-emerald-400 dark:hover:border-emerald-500/50"
        )}
      >
        <Upload className="h-12 w-12 text-zinc-400 mb-4" />
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">{label}</h3>
        <p className="text-sm text-zinc-500 text-center mb-6">
          Drag and drop files here, or use the options below
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-2.5 text-sm font-bold text-white hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
          >
            <ImageIcon className="h-4 w-4" /> Choose from Gallery
          </button>
          
          <button
            onClick={() => cameraInputRef.current?.click()}
            className="flex items-center gap-2 rounded-xl bg-zinc-100 px-6 py-2.5 text-sm font-bold text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 transition-all"
          >
            <Camera className="h-4 w-4" /> Take Photo
          </button>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept={accept}
          multiple={multiple}
          onChange={(e) => handleFiles(e.target.files)}
        />
        
        <input
          type="file"
          ref={cameraInputRef}
          className="hidden"
          accept="image/*"
          capture="environment"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-xl bg-red-50 p-4 text-sm text-red-600 dark:bg-red-500/10 dark:text-red-400 border border-red-100 dark:border-red-500/20">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <p className="flex-grow">{error}</p>
          <button onClick={() => setError(null)} className="p-1 hover:bg-red-100 dark:hover:bg-red-500/20 rounded-lg">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
