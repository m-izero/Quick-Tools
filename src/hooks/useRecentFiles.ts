import { useState, useEffect } from 'react';

export interface RecentFile {
  id: string;
  name: string;
  type: string;
  size: number;
  timestamp: number;
  toolUsed: string;
  url?: string; // Local blob URL for immediate preview
}

export function useRecentFiles() {
  const [recentFiles, setRecentFiles] = useState<RecentFile[]>(() => {
    const saved = localStorage.getItem('quicktools_recent_files');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('quicktools_recent_files', JSON.stringify(recentFiles));
  }, [recentFiles]);

  const addRecentFile = (file: File, toolUsed: string, url?: string) => {
    const newFile: RecentFile = {
      id: Date.now().toString(),
      name: file.name,
      type: file.type,
      size: file.size,
      timestamp: Date.now(),
      toolUsed,
      url,
    };

    setRecentFiles(prev => {
      const filtered = prev.filter(f => f.name !== file.name); // Avoid duplicates
      return [newFile, ...filtered].slice(0, 5); // Keep last 5
    });
  };

  const clearRecentFiles = () => {
    setRecentFiles([]);
  };

  return { recentFiles, addRecentFile, clearRecentFiles };
}
