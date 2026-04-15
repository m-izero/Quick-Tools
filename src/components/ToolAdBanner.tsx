import React, { useEffect, useRef } from 'react';

export function ToolAdBanner() {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (adRef.current && !adRef.current.firstChild) {
      const script1 = document.createElement('script');
      script1.innerHTML = `
        atOptions = {
          'key' : 'b92d3538c0d79f6581c48fa934d73543',
          'format' : 'iframe',
          'height' : 250,
          'width' : 300,
          'params' : {}
        };
      `;
      adRef.current.appendChild(script1);

      const script2 = document.createElement('script');
      script2.src = 'https://www.highperformanceformat.com/b92d3538c0d79f6581c48fa934d73543/invoke.js';
      script2.async = true;
      adRef.current.appendChild(script2);
    }
  }, []);

  return (
    <div className="flex justify-center my-8">
      <div ref={adRef} className="min-h-[250px] min-w-[300px] bg-zinc-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center overflow-hidden border border-zinc-200 dark:border-zinc-800">
        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Advertisement</span>
      </div>
    </div>
  );
}
