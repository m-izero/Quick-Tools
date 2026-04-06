import React, { useState, useEffect } from 'react';
import { 
  StickyNote, 
  Plus, 
  Trash2, 
  Save, 
  Download, 
  FileText, 
  Search, 
  Clock, 
  X, 
  ChevronLeft,
  Eraser,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/utils/cn';

interface Note {
  id: string;
  title: string;
  content: string;
  updatedAt: number;
}

export function MemoNotePad() {
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem('quicktools_notes');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSidebar, setShowSidebar] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('quicktools_notes', JSON.stringify(notes));
  }, [notes]);

  // Handle mobile view switching
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setShowSidebar(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const activeNote = notes.find(n => n.id === activeNoteId);

  const createNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'Untitled Note',
      content: '',
      updatedAt: Date.now(),
    };
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
    if (window.innerWidth < 1024) {
      setShowSidebar(false);
    }
  };

  const updateNote = (id: string, updates: Partial<Note>) => {
    setNotes(notes.map(n => n.id === id ? { ...n, ...updates, updatedAt: Date.now() } : n));
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(n => n.id !== id));
    if (activeNoteId === id) setActiveNoteId(null);
    setShowDeleteConfirm(null);
    if (window.innerWidth < 1024) {
      setShowSidebar(true);
    }
  };

  const clearContent = (id: string) => {
    if (window.confirm("Are you sure you want to clear all content in this note?")) {
      updateNote(id, { content: '' });
    }
  };

  const exportNote = (note: Note) => {
    const blob = new Blob([note.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${note.title.replace(/\s+/g, '_') || 'note'}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredNotes = notes.filter(n => 
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    n.content.toLowerCase().includes(searchQuery.toLowerCase())
  ).sort((a, b) => b.updatedAt - a.updatedAt);

  const formatDate = (timestamp: number) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(timestamp);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
      <div className="mb-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-600 dark:bg-amber-500/10 dark:text-amber-400 mb-4"
        >
          <StickyNote className="h-3 w-3" />
          LOCAL MEMO PAD
        </motion.div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-white">
          Memo<span className="text-amber-500">Note</span>
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
          Capture your thoughts instantly. Everything is saved locally in your browser.
        </p>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-4 gap-6 h-[700px] sm:h-[800px]">
        {/* Sidebar */}
        <div className={cn(
          "lg:col-span-1 flex flex-col rounded-3xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 overflow-hidden transition-all shadow-xl",
          !showSidebar && "hidden lg:flex"
        )}>
          <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 space-y-4">
            <button
              onClick={createNote}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-amber-500 px-4 py-3 text-sm font-black text-white hover:bg-amber-600 transition-all shadow-lg shadow-amber-500/20"
            >
              <Plus className="h-4 w-4" /> New Note
            </button>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-zinc-100 bg-zinc-50 pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white transition-all"
              />
            </div>
          </div>
          
          <div className="flex-grow overflow-y-auto p-3 space-y-2 custom-scrollbar">
            <AnimatePresence initial={false}>
              {filteredNotes.map((note) => (
                <motion.button
                  key={note.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  onClick={() => {
                    setActiveNoteId(note.id);
                    if (window.innerWidth < 1024) setShowSidebar(false);
                  }}
                  className={cn(
                    "w-full text-left p-4 rounded-2xl transition-all group border-2",
                    activeNoteId === note.id 
                      ? "bg-amber-50/50 dark:bg-amber-500/5 border-amber-500 shadow-sm" 
                      : "bg-white dark:bg-zinc-900 border-transparent hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                  )}
                >
                  <h3 className={cn(
                    "font-black text-sm truncate",
                    activeNoteId === note.id ? "text-amber-600 dark:text-amber-400" : "text-zinc-900 dark:text-white"
                  )}>
                    {note.title || 'Untitled Note'}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-1 font-medium">
                    {note.content || 'No content...'}
                  </p>
                  <div className="flex items-center gap-1 mt-3 text-[10px] text-zinc-400 uppercase tracking-widest font-black">
                    <Clock className="h-3 w-3" />
                    {formatDate(note.updatedAt)}
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
            {filteredNotes.length === 0 && (
              <div className="text-center py-12 px-4">
                <StickyNote className="h-12 w-12 text-zinc-200 dark:text-zinc-800 mx-auto mb-4" />
                <p className="text-sm font-bold text-zinc-400">No notes found</p>
              </div>
            )}
          </div>
        </div>

        {/* Editor */}
        <div className={cn(
          "lg:col-span-3 flex flex-col rounded-3xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 overflow-hidden transition-all shadow-xl",
          showSidebar && "hidden lg:flex"
        )}>
          {activeNote ? (
            <>
              <div className="p-4 sm:p-6 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/30 dark:bg-zinc-950/30">
                <div className="flex items-center gap-4 flex-grow min-w-0">
                  <button 
                    onClick={() => setShowSidebar(true)}
                    className="lg:hidden p-2 -ml-2 text-zinc-500 hover:text-amber-500 transition-colors"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <input
                    type="text"
                    value={activeNote.title}
                    onChange={(e) => updateNote(activeNote.id, { title: e.target.value })}
                    placeholder="Note Title"
                    className="bg-transparent text-xl font-black text-zinc-900 dark:text-white focus:outline-none w-full tracking-tight"
                  />
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <button
                    onClick={() => clearContent(activeNote.id)}
                    className="p-2.5 text-zinc-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 rounded-xl transition-all"
                    title="Clear Content"
                  >
                    <Eraser className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => exportNote(activeNote)}
                    className="p-2.5 text-zinc-400 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-xl transition-all"
                    title="Export as .txt"
                  >
                    <Download className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(activeNote.id)}
                    className="p-2.5 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all"
                    title="Delete Note"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <div className="relative flex-grow flex flex-col">
                <textarea
                  value={activeNote.content}
                  onChange={(e) => updateNote(activeNote.id, { content: e.target.value })}
                  placeholder="Start writing your thoughts..."
                  className="flex-grow p-8 sm:p-12 bg-transparent text-zinc-800 dark:text-zinc-200 focus:outline-none resize-none leading-relaxed text-lg font-medium"
                />
                
                <AnimatePresence>
                  {showDeleteConfirm && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="absolute inset-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm flex items-center justify-center p-6 z-10"
                    >
                      <div className="max-w-sm w-full bg-white dark:bg-zinc-800 p-8 rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-700 text-center">
                        <div className="h-16 w-16 rounded-2xl bg-red-50 dark:bg-red-500/10 flex items-center justify-center mx-auto mb-6">
                          <AlertCircle className="h-8 w-8 text-red-500" />
                        </div>
                        <h3 className="text-xl font-black text-zinc-900 dark:text-white mb-2">Delete Note?</h3>
                        <p className="text-sm text-zinc-500 mb-8">This action cannot be undone. Are you sure you want to delete this note?</p>
                        <div className="flex gap-3">
                          <button
                            onClick={() => setShowDeleteConfirm(null)}
                            className="flex-1 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-700 text-sm font-bold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 transition-all"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => deleteNote(showDeleteConfirm)}
                            className="flex-1 py-3 rounded-xl bg-red-500 text-sm font-bold text-white hover:bg-red-600 transition-all shadow-lg shadow-red-500/20"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="p-4 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/30 dark:bg-zinc-950/30 flex items-center justify-between text-[10px] text-zinc-400 uppercase tracking-widest font-black">
                <div className="flex items-center gap-4">
                  <span>{activeNote.content.length} characters</span>
                  <span>{activeNote.content.split(/\s+/).filter(Boolean).length} words</span>
                </div>
                <span className="flex items-center gap-1.5 text-emerald-500">
                  <CheckCircle2 className="h-3 w-3" /> Auto-saved
                </span>
              </div>
            </>
          ) : (
            <div className={cn(
              "flex-grow flex flex-col items-center justify-center text-center p-12",
              showSidebar && "hidden lg:flex"
            )}>
              <div className="lg:hidden absolute top-6 left-6">
                <button 
                  onClick={() => setShowSidebar(true)}
                  className="p-2 text-zinc-500 hover:text-amber-500"
                >
                  <ChevronLeft className="h-8 w-8" />
                </button>
              </div>
              <div className="h-24 w-24 rounded-3xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center mb-8">
                <StickyNote className="h-12 w-12 text-amber-500" />
              </div>
              <h2 className="text-2xl font-black text-zinc-900 dark:text-white">Select a note to view</h2>
              <p className="text-zinc-500 dark:text-zinc-400 mt-3 max-w-xs font-medium">
                Choose a note from the sidebar or create a new one to start writing.
              </p>
              <button
                onClick={createNote}
                className="mt-10 flex items-center gap-3 rounded-2xl bg-amber-500 px-8 py-4 font-black text-white hover:bg-amber-600 transition-all shadow-xl shadow-amber-500/20"
              >
                <Plus className="h-5 w-5" /> Create New Note
              </button>
            </div>
          )}
        </div>
      </div>

      {/* SEO Content Section */}
      <div className="mt-24 border-t border-zinc-100 pt-24 dark:border-zinc-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-6 uppercase tracking-tight">
                Free <span className="text-amber-500">Online Notepad</span> & Memo Pad
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                Capture your ideas, create to-do lists, or draft important documents with our free online notepad. MemoNote is designed for simplicity and speed, providing a clean, distraction-free environment for all your writing needs. Unlike other online editors, our notepad saves your work locally in your browser's storage, ensuring your notes are always available even after you close the tab. It's the perfect tool for quick memos, temporary storage, or organized drafting.
              </p>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-widest">How to Use</h3>
              <ol className="space-y-4">
                {[
                  "Click 'New Note' to create a fresh document instantly.",
                  "Enter a descriptive title and start typing your content in the main editor.",
                  "Your work is auto-saved locally as you type, so you never lose a word.",
                  "Use the 'Export' button to download your note as a .txt file for offline use.",
                  "Organize your notes using the sidebar and search functionality."
                ].map((step, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500 text-[10px] font-black text-white">
                      {i + 1}
                    </span>
                    <span className="text-sm text-zinc-600 dark:text-zinc-400 font-medium">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-widest">Benefits</h3>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { title: "Local Privacy", desc: "Your notes are stored only on your device. We never see or store your private thoughts." },
                  { title: "Auto-Save Feature", desc: "Never worry about losing work. Every keystroke is saved instantly in your browser." },
                  { title: "Clean Interface", desc: "A minimalist design focused on readability and ease of use across all devices." },
                  { title: "Offline Access", desc: "Export your notes as standard text files to keep them safe outside the browser." }
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
  );
}
