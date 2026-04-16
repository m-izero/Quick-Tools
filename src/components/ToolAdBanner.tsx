import React, { useEffect, useRef, useState } from 'react';

export function ToolAdBanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || container.dataset.adLoaded) return;

    container.dataset.adLoaded = 'true';

    // Set atOptions BEFORE loading invoke.js
    const script1 = document.createElement('script');
    script1.innerHTML = `
      atOptions = {
        'key' : 'b92d3538c0d79f6581c48fa934d73543',
        'format' : 'iframe',
        'height' : 150,
        'width' : 350,
        'params' : {}
      };
    `;
    document.head.appendChild(script1);

    // Load invoke.js into the container
    const script2 = document.createElement('script');
    script2.src = 'https://www.highperformanceformat.com/b92d3538c0d79f6581c48fa934d73543/invoke.js';
    script2.async = true;
    script2.onload = () => setAdLoaded(true);
    container.appendChild(script2);

    return () => {
      // Cleanup on unmount
      if (document.head.contains(script1)) {
        document.head.removeChild(script1);
      }
    };
  }, []);

  return (
    <div className="flex justify-center my-8">
      <div
        ref={containerRef}
        style={{ width: '350px', minHeight: '150px' }}
        className="relative rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-700"
      >
        {/* Placeholder only shows while ad hasn't loaded */}
        {!adLoaded && (
          <div className="absolute inset-0 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
              Advertisement
            </span>
          </div>
        )}
      </div>
    </div>
  );
}