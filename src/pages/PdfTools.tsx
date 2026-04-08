import React, { useState, useCallback, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { PDFDocument } from 'pdf-lib';
import JSZip from 'jszip';
import { 
  FileText, 
  Download, 
  Loader2, 
  Trash2, 
  Plus, 
  Scissors, 
  GripVertical, 
  Settings2, 
  CheckCircle2,
  Share2,
  RotateCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { FileUpload } from '@/components/FileUpload';
import { cn } from '@/utils/cn';

interface SortableFileProps {
  id: string;
  file: File;
  onRemove: (id: string) => void;
  key?: string;
}

function SortableFileItem({ id, file, onRemove }: SortableFileProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center justify-between rounded-xl bg-white p-4 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm transition-all",
        isDragging && "opacity-50 scale-105 shadow-xl border-emerald-500/50"
      )}
    >
      <div className="flex items-center gap-3 min-w-0">
        <button 
          {...attributes} 
          {...listeners} 
          className="cursor-grab active:cursor-grabbing p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
        >
          <GripVertical className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-10 w-10 rounded-lg bg-red-50 dark:bg-red-500/10 flex items-center justify-center shrink-0">
            <FileText className="h-5 w-5 text-red-500" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold text-zinc-900 dark:text-white truncate">{file.name}</span>
            <span className="text-xs text-zinc-500">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
          </div>
        </div>
      </div>
      <button 
        onClick={() => onRemove(id)} 
        className="text-zinc-400 hover:text-red-500 p-2 transition-colors"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}

export function PdfTools() {
  const [files, setFiles] = useState<{ id: string; file: File }[]>([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mode, setMode] = useState<'merge' | 'split'>('merge');
  const [splitOption, setSplitOption] = useState<'individual' | 'range'>('individual');
  const [pageRange, setPageRange] = useState('1-2');
  const [processedFiles, setProcessedFiles] = useState<{ name: string; url: string }[]>([]);
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleFilesSelected = (newFiles: File[]) => {
    const pdfs = newFiles.filter(f => f.type === 'application/pdf');
    const mapped = pdfs.map(f => ({
      id: Math.random().toString(36).substr(2, 9),
      file: f
    }));
    setFiles(prev => [...prev, ...mapped]);
    setProcessedFiles([]);
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setFiles((items) => {
        const oldIndex = items.findIndex(i => i.id === active.id);
        const newIndex = items.findIndex(i => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const mergePdfs = async () => {
    if (files.length < 2) return;
    setLoading(true);
    setProgress(10);
    try {
      const mergedPdf = await PDFDocument.create();
      let currentProgress = 10;
      const step = 80 / files.length;

      for (const { file } of files) {
        const pdfBytes = await file.arrayBuffer();
        const pdf = await PDFDocument.load(pdfBytes);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
        currentProgress += step;
        setProgress(Math.min(90, currentProgress));
      }

      const pdfBytes = await mergedPdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const filename = 'merged-quicktools.pdf';
      
      setProcessedFiles([{ name: filename, url }]);
      setProgress(100);
    } catch (error) {
      console.error(error);
      alert("Failed to merge PDFs. Please ensure all files are valid PDF documents.");
    } finally {
      setLoading(false);
    }
  };

  const splitPdf = async () => {
    if (files.length === 0) return;
    setLoading(true);
    setProgress(10);
    const zip = new JSZip();
    let hasMultiplePages = false;

    try {
      for (const { file } of files) {
        const pdfBytes = await file.arrayBuffer();
        const pdf = await PDFDocument.load(pdfBytes);
        const pageCount = pdf.getPageCount();
        const baseName = file.name.replace(/\.pdf$/i, '');

        if (splitOption === 'individual') {
          for (let i = 0; i < pageCount; i++) {
            const newPdf = await PDFDocument.create();
            const [page] = await newPdf.copyPages(pdf, [i]);
            newPdf.addPage(page);
            const newPdfBytes = await newPdf.save();
            zip.file(`${baseName}_page_${i + 1}.pdf`, newPdfBytes);
            hasMultiplePages = true;
          }
        } else {
          // Range split logic
          const [start, end] = pageRange.split('-').map(n => parseInt(n.trim()));
          if (isNaN(start) || isNaN(end) || start < 1 || end > pageCount || start > end) {
            throw new Error(`Invalid range for ${file.name}. Max pages: ${pageCount}`);
          }
          
          const newPdf = await PDFDocument.create();
          const indices = Array.from({ length: end - start + 1 }, (_, i) => start - 1 + i);
          const copiedPages = await newPdf.copyPages(pdf, indices);
          copiedPages.forEach(p => newPdf.addPage(p));
          const newPdfBytes = await newPdf.save();
          
          if (files.length === 1) {
            const blob = new Blob([newPdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const name = `${baseName}_range_${start}-${end}.pdf`;
            setProcessedFiles([{ name, url }]);
            setProgress(100);
            setLoading(false);
            return;
          } else {
            zip.file(`${baseName}_range_${start}-${end}.pdf`, newPdfBytes);
            hasMultiplePages = true;
          }
        }
      }

      if (hasMultiplePages) {
        const zipContent = await zip.generateAsync({ type: 'blob' });
        const url = URL.createObjectURL(zipContent);
        const name = 'split-pages-quicktools.zip';
        setProcessedFiles([{ name, url }]);
      }
      setProgress(100);
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Failed to split PDF(s).");
    } finally {
      setLoading(false);
    }
  };

  const downloadFile = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const reset = () => {
    setFiles([]);
    setProcessedFiles([]);
    setProgress(0);
  };

  const shareFile = async (url: string, name: string) => {
    if (navigator.share) {
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        const file = new File([blob], name, { type: blob.type });
        await navigator.share({
          files: [file],
          title: 'Shared from Quick tools',
          text: `Check out this ${name} I processed with Quick tools!`
        });
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
      <Helmet>
        <title>Online PDF Tools - Merge & Split PDFs Fast | QuickTools Pro</title>
        <meta name="description" content="Manage your PDF documents with ease. Merge multiple PDF files into one or split pages into individual documents. Fast, secure, and 100% browser-based." />
        <meta name="keywords" content="pdf tools, merge pdf, split pdf, online pdf editor, pdf joiner, pdf splitter, secure pdf processing" />
      </Helmet>
      <div className="mb-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 mb-4"
        >
          <FileText className="h-3 w-3" />
          PROFESSIONAL PDF TOOLS
        </motion.div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-white">
          PDF <span className="text-emerald-500">Master</span>
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
          Merge multiple documents or split them into individual pages with precision.
        </p>
      </div>

      <div className="flex justify-center mb-8">
        <div className="inline-flex p-1 bg-zinc-100 dark:bg-zinc-800 rounded-2xl w-full max-w-md">
          <button
            onClick={() => { setMode('merge'); reset(); }}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all",
              mode === 'merge' 
                ? "bg-white dark:bg-zinc-700 text-emerald-600 dark:text-emerald-400 shadow-sm" 
                : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
            )}
          >
            <Plus className="h-4 w-4" /> Merge
          </button>
          <button
            onClick={() => { setMode('split'); reset(); }}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all",
              mode === 'split' 
                ? "bg-white dark:bg-zinc-700 text-emerald-600 dark:text-emerald-400 shadow-sm" 
                : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
            )}
          >
            <Scissors className="h-4 w-4" /> Split
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-6">
          <AnimatePresence mode="wait">
            {files.length === 0 ? (
              <motion.div
                key="upload"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <FileUpload 
                  onFilesSelected={handleFilesSelected}
                  accept=".pdf"
                  label={mode === 'merge' ? "Merge PDFs" : "Split PDF"}
                  className="h-full"
                />
              </motion.div>
            ) : (
              <motion.div
                key="files"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                    {files.length} Files Selected
                    <span className="text-xs font-normal text-zinc-500">
                      {mode === 'merge' ? '(Drag to reorder)' : ''}
                    </span>
                  </h3>
                  <button 
                    onClick={reset}
                    className="text-xs font-bold text-zinc-500 hover:text-red-500 flex items-center gap-1 transition-colors"
                  >
                    <RotateCcw className="h-3 w-3" /> Reset
                  </button>
                </div>

                {mode === 'merge' ? (
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext
                      items={files.map(f => f.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      <div className="space-y-3">
                        {files.map((f) => (
                          <SortableFileItem 
                            key={f.id} 
                            id={f.id} 
                            file={f.file} 
                            onRemove={removeFile} 
                          />
                        ))}
                      </div>
                    </SortableContext>
                  </DndContext>
                ) : (
                  <div className="space-y-3">
                    {files.map((f) => (
                      <div 
                        key={f.id}
                        className="flex items-center justify-between rounded-xl bg-white p-4 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="h-10 w-10 rounded-lg bg-red-50 dark:bg-red-500/10 flex items-center justify-center shrink-0">
                            <FileText className="h-5 w-5 text-red-500" />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-sm font-semibold text-zinc-900 dark:text-white truncate">{f.file.name}</span>
                            <span className="text-xs text-zinc-500">{(f.file.size / 1024 / 1024).toFixed(2)} MB</span>
                          </div>
                        </div>
                        <button 
                          onClick={() => removeFile(f.id)} 
                          className="text-zinc-400 hover:text-red-500 p-2 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {mode === 'split' && (
                  <div className="rounded-2xl bg-zinc-50 p-6 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center gap-2 mb-4">
                      <Settings2 className="h-4 w-4 text-emerald-500" />
                      <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Split Settings</h4>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <button
                        onClick={() => setSplitOption('individual')}
                        className={cn(
                          "flex flex-col items-start p-4 rounded-xl border-2 transition-all text-left",
                          splitOption === 'individual' 
                            ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-500/10" 
                            : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
                        )}
                      >
                        <span className="text-sm font-bold text-zinc-900 dark:text-white">Individual Pages</span>
                        <span className="text-xs text-zinc-500 mt-1">Extract every page as a separate PDF</span>
                      </button>
                      <button
                        onClick={() => setSplitOption('range')}
                        className={cn(
                          "flex flex-col items-start p-4 rounded-xl border-2 transition-all text-left",
                          splitOption === 'range' 
                            ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-500/10" 
                            : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
                        )}
                      >
                        <span className="text-sm font-bold text-zinc-900 dark:text-white">Page Range</span>
                        <span className="text-xs text-zinc-500 mt-1">Extract a specific range of pages</span>
                      </button>
                    </div>

                    {splitOption === 'range' && (
                      <div className="mt-4">
                        <label className="text-xs font-bold text-zinc-500 mb-1 block uppercase tracking-wider">Specify Range (e.g., 1-5)</label>
                        <input 
                          type="text"
                          value={pageRange}
                          onChange={(e) => setPageRange(e.target.value)}
                          placeholder="1-2"
                          className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
                        />
                      </div>
                    )}
                  </div>
                )}

                <div className="flex flex-col gap-3">
                  <button
                    onClick={mode === 'merge' ? mergePdfs : splitPdf}
                    disabled={loading || (mode === 'merge' && files.length < 2)}
                    className="relative w-full overflow-hidden rounded-2xl bg-emerald-500 px-8 py-4 font-black text-white shadow-xl shadow-emerald-500/20 hover:bg-emerald-600 disabled:opacity-50 transition-all flex items-center justify-center gap-3 group"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-6 w-6 animate-spin" />
                        <span>Processing {progress}%</span>
                      </>
                    ) : (
                      <>
                        {mode === 'merge' ? <Plus className="h-6 w-6" /> : <Scissors className="h-6 w-6" />}
                        <span>{mode === 'merge' ? 'Merge All PDFs' : 'Split PDF(s)'}</span>
                      </>
                    )}
                    {loading && (
                      <motion.div 
                        className="absolute bottom-0 left-0 h-1 bg-white/30"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                      />
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {processedFiles.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-3xl bg-emerald-500 p-8 text-white shadow-2xl shadow-emerald-500/40"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-xl font-black">Success!</h3>
                  <p className="text-emerald-100 text-sm">Your PDF is ready for download.</p>
                </div>
              </div>

              <div className="space-y-3">
                {processedFiles.map((file, i) => (
                  <div key={i} className="flex flex-col sm:flex-row items-center gap-3">
                    <button
                      onClick={() => downloadFile(file.url, file.name)}
                      className="flex-1 w-full flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 font-bold text-emerald-600 hover:bg-emerald-50 transition-all"
                    >
                      <Download className="h-5 w-5" />
                      Download {file.name.length > 20 ? 'File' : file.name}
                    </button>
                    <button
                      onClick={() => shareFile(file.url, file.name)}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-4 font-bold text-white hover:bg-emerald-700 transition-all border border-emerald-400/30"
                    >
                      <Share2 className="h-5 w-5" />
                      Share
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-3xl bg-zinc-900 p-8 text-white shadow-xl">
            <h3 className="text-lg font-black mb-4 flex items-center gap-2">
              <Settings2 className="h-5 w-5 text-emerald-500" />
              Tool Info
            </h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">100% Secure</h4>
                  <p className="text-xs text-zinc-400 mt-1">Files are processed in your browser and never uploaded to our servers.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">High Quality</h4>
                  <p className="text-xs text-zinc-400 mt-1">We use professional-grade PDF libraries to ensure zero quality loss.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-zinc-50 p-8 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <h3 className="text-lg font-black text-zinc-900 dark:text-white mb-4">Pro Tips</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                Drag files to reorder before merging.
              </li>
              <li className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                Use "Individual Pages" to extract every page as a separate file.
              </li>
              <li className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                Batch split multiple PDFs at once.
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
              Professional <span className="text-emerald-500">PDF Tools</span>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
              Our PDF Tools suite provides a professional-grade, browser-based solution for managing your digital documents with ease and precision. Whether you need to merge multiple PDF files into a single cohesive report or split a large document into individual pages or specific ranges, our tool offers a fast and reliable experience. Built with a focus on privacy, all processing occurs locally on your device, ensuring that your sensitive information never leaves your browser. It's the ultimate utility for students, professionals, and anyone who works with PDF documents regularly.
            </p>
          </section>

          {/* How to Use */}
          <section className="space-y-6">
            <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-widest">How to Use</h3>
            <ol className="space-y-4">
              {[
                "Choose between 'Merge' or 'Split' mode using the toggle switch at the top of the tool.",
                "Upload your PDF files by clicking the upload area or dragging and dropping them directly into the browser.",
                "If merging, drag and drop the file cards to reorder them exactly how you want them to appear in the final document.",
                "If splitting, select either 'Individual Pages' to extract every page or 'Page Range' to specify a custom start and end point.",
                "Click the 'Merge All PDFs' or 'Split PDF(s)' button to begin the local processing of your files.",
                "Once complete, click the 'Download' button to save your new PDF or ZIP archive to your computer."
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
                { title: "Zero Server-Side Uploads", desc: "Your privacy is guaranteed as all PDF manipulations happen entirely within your web browser." },
                { title: "Professional-Grade Fidelity", desc: "We use the pdf-lib library to ensure that your text, images, and formatting remain perfectly intact." },
                { title: "Intuitive Drag-and-Drop Interface", desc: "Easily organize and reorder your documents before merging with our user-friendly sorting system." },
                { title: "Versatile Splitting Options", desc: "Extract single pages, specific ranges, or batch split multiple documents simultaneously to save time." }
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
                { title: "Combining Reports & Receipts", desc: "Merge multiple scanned receipts or individual report chapters into a single, organized PDF file for easy sharing." },
                { title: "Extracting Specific Pages", desc: "Quickly pull out a single page from a large manual or textbook to send as a focused reference." },
                { title: "Organizing Digital Portfolios", desc: "Combine your resume, cover letter, and work samples into one professional document for job applications." }
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
                { q: "Is it safe to upload my sensitive PDFs to this website?", a: "Yes, because you aren't actually 'uploading' them in the traditional sense. Our tool uses client-side JavaScript to process the files locally in your browser. Your data never touches our servers." },
                { q: "What is the maximum file size I can process?", a: "While we don't set a hard limit, performance depends on your computer's RAM. Most standard documents up to 100MB should process smoothly." },
                { q: "Can I merge PDFs that have different page sizes?", a: "Yes. Our merging engine handles documents with varying dimensions and orientations, combining them into a single file while preserving their original layouts." },
                { q: "Will the links and bookmarks in my PDF still work after merging?", a: "In most cases, yes. Our tool aims to preserve the internal structure of the PDF, although complex interactive elements may sometimes require professional software for advanced editing." },
                { q: "Why did my split PDF download as a ZIP file?", a: "When you choose to split a document into 'Individual Pages,' we package all the resulting single-page PDFs into a ZIP archive to make it easier for you to download them all at once." },
                { q: "Do I need to install any software or plugins to use these tools?", a: "No. Our PDF Master works entirely within any modern web browser (Chrome, Firefox, Safari, Edge) without the need for additional software or extensions." }
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
              We introduced the PDF Master suite to provide a professional, cost-free alternative to expensive PDF editing software. Managing PDFs often involves sensitive documents like contracts, resumes, and financial reports, which users are understandably hesitant to upload to unknown servers. Our mission was to build a high-performance tool that handles complex PDF operations like merging and splitting entirely within the user's browser, ensuring that their most important documents remain private and secure at all times.
            </p>
          </section>

          {/* Related Tools */}
          <section className="space-y-6">
            <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-widest">Related Tools</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { name: "Image Compressor", path: "/image-compressor" },
                { name: "Random String Generator", path: "/random-string" },
                { name: "Hash Generator", path: "/hash-generator" }
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
