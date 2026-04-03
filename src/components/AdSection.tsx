import React from 'react';

interface AdSectionProps {
  type: 'top' | 'middle' | 'sidebar';
  className?: string;
}

export function AdSection({ type, className }: AdSectionProps) {
  const styles = {
    top: "w-full h-24 bg-zinc-100 dark:bg-zinc-900 border border-dashed border-zinc-300 dark:border-zinc-700 flex items-center justify-center text-zinc-400 text-xs rounded-lg mb-8",
    middle: "w-full h-48 bg-zinc-100 dark:bg-zinc-900 border border-dashed border-zinc-300 dark:border-zinc-700 flex items-center justify-center text-zinc-400 text-xs rounded-lg my-8",
    sidebar: "w-full h-64 bg-zinc-100 dark:bg-zinc-900 border border-dashed border-zinc-300 dark:border-zinc-700 flex items-center justify-center text-zinc-400 text-xs rounded-lg"
  };

  return (
    <div className={className}>
      <div className={styles[type]}>
        <div className="text-center">
          <p className="font-medium uppercase tracking-widest">Advertisement</p>
          <p className="mt-1">Place your ad here</p>
        </div>
      </div>
    </div>
  );
}
