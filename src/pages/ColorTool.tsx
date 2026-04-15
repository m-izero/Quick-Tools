import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Palette, 
  Copy, 
  Check, 
  Heart, 
  Trash2, 
  RefreshCcw,
  Hash,
  Layers,
  SunMedium
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/utils/cn';
import { Link } from 'react-router-dom';
import { ToolAdBanner } from '@/components/ToolAdBanner';

type ColorFormat = 'hex' | 'rgb' | 'hsl';

interface SavedColor {
  id: string;
  hex: string;
  timestamp: number;
}

export default function ColorTool() {
  const [hex, setHex] = useState('#10b981');
  const [rgb, setRgb] = useState({ r: 16, g: 185, b: 129 });
  const [hsl, setHsl] = useState({ h: 160, s: 84, l: 39 });
  const [savedColors, setSavedColors] = useState<SavedColor[]>([]);
  const [copiedFormat, setCopiedFormat] = useState<ColorFormat | null>(null);

  // Load saved colors
  useEffect(() => {
    const saved = localStorage.getItem('quicktools_saved_colors');
    if (saved) {
      setSavedColors(JSON.parse(saved));
    }
  }, []);

  // Save colors to localStorage
  useEffect(() => {
    localStorage.setItem('quicktools_saved_colors', JSON.stringify(savedColors));
  }, [savedColors]);

  // Conversion Logic
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const hslToRgb = (h: number, s: number, l: number) => {
    s /= 100; l /= 100;
    const k = (n: number) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return {
      r: Math.round(255 * f(0)),
      g: Math.round(255 * f(8)),
      b: Math.round(255 * f(4))
    };
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
  };

  const handleHexChange = (newHex: string) => {
    if (!newHex.startsWith('#')) newHex = '#' + newHex;
    setHex(newHex);
    if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(newHex)) {
      const rgbVal = hexToRgb(newHex);
      if (rgbVal) {
        setRgb(rgbVal);
        setHsl(rgbToHsl(rgbVal.r, rgbVal.g, rgbVal.b));
      }
    }
  };

  const handleRgbChange = (part: 'r' | 'g' | 'b', val: number) => {
    const newRgb = { ...rgb, [part]: Math.min(255, Math.max(0, val)) };
    setRgb(newRgb);
    const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    setHex(newHex);
    setHsl(rgbToHsl(newRgb.r, newRgb.g, newRgb.b));
  };

  const handleHslChange = (part: 'h' | 's' | 'l', val: number) => {
    const max = part === 'h' ? 360 : 100;
    const newHsl = { ...hsl, [part]: Math.min(max, Math.max(0, val)) };
    setHsl(newHsl);
    const newRgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l);
    setRgb(newRgb);
    setHex(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
  };

  const saveColor = () => {
    if (savedColors.some(c => c.hex === hex)) return;
    const newColor: SavedColor = {
      id: Date.now().toString(),
      hex: hex,
      timestamp: Date.now()
    };
    setSavedColors([newColor, ...savedColors].slice(0, 20));
  };

  const deleteColor = (id: string) => {
    setSavedColors(savedColors.filter(c => c.id !== id));
  };

  const copyToClipboard = async (text: string, format: ColorFormat) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedFormat(format);
      setTimeout(() => setCopiedFormat(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Online Color Tool - HEX, RGB, HSL Converter | QuickTools Pro</title>
        <meta name="description" content="Pick, convert, and save colors for your design projects. Support for HEX, RGB, and HSL formats. Create beautiful palettes and manage your color library instantly." />
        <meta name="keywords" content="color tool, color picker, hex to rgb, rgb to hsl, color converter, online color palette, design tools" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Color Tool",
              "description": "Pick, convert, and save colors for your design projects. Support for HEX, RGB, and HSL formats. 100% private and local processing.",
              "operatingSystem": "All",
              "applicationCategory": "DesignApplication",
              "url": "https://quick-toolz.vercel.app/color-tool",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            }
          `}
        </script>
      </Helmet>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center justify-center p-3 bg-emerald-500/10 rounded-2xl mb-4"
          >
            <Palette className="h-8 w-8 text-emerald-500" />
          </motion.div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white sm:text-4xl">
            Color Picker & Converter
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Design with precision. Convert between HEX, RGB, and HSL instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Main Picker Section */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 shadow-xl border border-zinc-200 dark:border-zinc-800">
              <div 
                className="w-full aspect-video rounded-2xl shadow-inner mb-8 transition-colors duration-200 flex items-center justify-center"
                style={{ backgroundColor: hex }}
              >
                <span className={cn(
                  "text-2xl font-bold font-mono px-4 py-2 bg-white/20 backdrop-blur-md rounded-xl",
                  hsl.l > 60 ? "text-black/60" : "text-white/80"
                )}>
                  {hex}
                </span>
              </div>

              <div className="space-y-6">
                {/* HEX Input */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                    <Hash className="h-4 w-4" />
                    HEX Format
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={hex}
                      onChange={(e) => handleHexChange(e.target.value)}
                      className="flex-1 px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all font-mono text-zinc-900 dark:text-white"
                    />
                    <button
                      onClick={() => copyToClipboard(hex, 'hex')}
                      className="p-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-xl transition-all"
                    >
                      {copiedFormat === 'hex' ? <Check className="h-5 w-5 text-emerald-500" /> : <Copy className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {/* RGB Inputs */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                    <Layers className="h-4 w-4" />
                    RGB Format
                  </label>
                  <div className="flex gap-2">
                    <div className="grid grid-cols-3 gap-2 flex-1">
                      {(['r', 'g', 'b'] as const).map((part) => (
                        <input
                          key={part}
                          type="number"
                          value={rgb[part]}
                          onChange={(e) => handleRgbChange(part, parseInt(e.target.value))}
                          className="w-full px-3 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all font-mono text-zinc-900 dark:text-white text-center"
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, 'rgb')}
                      className="p-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-xl transition-all"
                    >
                      {copiedFormat === 'rgb' ? <Check className="h-5 w-5 text-emerald-500" /> : <Copy className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {/* HSL Inputs */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                    <SunMedium className="h-4 w-4" />
                    HSL Format
                  </label>
                  <div className="flex gap-2">
                    <div className="grid grid-cols-3 gap-2 flex-1">
                      {(['h', 's', 'l'] as const).map((part) => (
                        <input
                          key={part}
                          type="number"
                          value={hsl[part]}
                          onChange={(e) => handleHslChange(part, parseInt(e.target.value))}
                          className="w-full px-3 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all font-mono text-zinc-900 dark:text-white text-center"
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, 'hsl')}
                      className="p-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-xl transition-all"
                    >
                      {copiedFormat === 'hsl' ? <Check className="h-5 w-5 text-emerald-500" /> : <Copy className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="pt-4 flex gap-4">
                  <button
                    onClick={saveColor}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-2xl shadow-lg shadow-emerald-500/25 transition-all active:scale-95"
                  >
                    <Heart className="h-5 w-5" />
                    Save to Favorites
                  </button>
                  <input
                    type="color"
                    value={hex}
                    onChange={(e) => handleHexChange(e.target.value)}
                    className="w-14 h-14 p-1 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-2xl cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Favorites Section */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 shadow-xl border border-zinc-200 dark:border-zinc-800 h-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                  Favorite Colors
                </h2>
                {savedColors.length > 0 && (
                  <button
                    onClick={() => setSavedColors([])}
                    className="text-sm text-zinc-500 hover:text-red-500 transition-colors flex items-center gap-1"
                  >
                    <Trash2 className="h-4 w-4" />
                    Clear All
                  </button>
                )}
              </div>

              {savedColors.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <AnimatePresence mode="popLayout">
                    {savedColors.map((color) => (
                      <motion.div
                        key={color.id}
                        layout
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="group relative"
                      >
                        <button
                          onClick={() => handleHexChange(color.hex)}
                          className="w-full aspect-square rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 transition-transform hover:scale-105"
                          style={{ backgroundColor: color.hex }}
                        />
                        <div className="mt-2 flex items-center justify-between px-1">
                          <span className="text-xs font-mono font-medium text-zinc-500 dark:text-zinc-400">
                            {color.hex}
                          </span>
                          <button
                            onClick={() => deleteColor(color.id)}
                            className="p-1 text-zinc-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-zinc-400 dark:text-zinc-600">
                  <Palette className="h-12 w-12 mb-4 opacity-20" />
                  <p className="text-center">No favorite colors yet.<br/>Click "Save to Favorites" to start your collection.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <ToolAdBanner />
        </div>

        {/* Rich Content Section */}
        <div className="mt-24 border-t border-zinc-100 pt-24 dark:border-zinc-800">
          <div className="max-w-3xl mx-auto space-y-16">
            {/* H1 & Intro */}
            <section>
              <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-6 uppercase tracking-tight">
                Professional <span className="text-emerald-500">Color Picker</span> & Converter
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                Our Color Picker & Converter is a professional-grade online tool designed for web developers, graphic designers, and digital artists who require absolute precision in their color selection. Whether you're building a brand identity, styling a website, or creating digital illustrations, this tool provides a seamless way to select, convert, and save colors. We support all major web formats, including HEX, RGB, and HSL, allowing you to translate colors between different systems with mathematical accuracy. With a built-in favorites system and real-time previews, it's the ultimate utility for managing your digital color palettes.
              </p>
            </section>

            {/* How to Use */}
            <section className="space-y-6">
              <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-widest">How to Use</h3>
              <ol className="space-y-4">
                {[
                  "Use the visual color picker to browse through the spectrum or click the color input box to open your system's native color selector.",
                  "Manually enter a specific HEX, RGB, or HSL value into the corresponding input fields to see the color update instantly.",
                  "Observe the real-time conversion across all supported formats as you adjust the sliders or input values.",
                  "Click the 'Copy' icon next to any color format (HEX, RGB, or HSL) to save that specific value to your clipboard.",
                  "Click the 'Save to Favorites' button to store your current color in the sidebar for quick access during your design session.",
                  "To reuse a favorite color, simply click on its color swatch in the 'Favorite Colors' section to load it back into the main picker."
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
                  { title: "Instant Multi-Format Conversion", desc: "Automatically translate any color between HEX, RGB, and HSL formats without needing multiple tools." },
                  { title: "Local Favorites Storage", desc: "Save up to 20 of your most-used colors directly in your browser's local storage for future sessions." },
                  { title: "High-Contrast Previews", desc: "Our preview window automatically adjusts text color based on brightness, ensuring readability." },
                  { title: "Precision Component Control", desc: "Fine-tune individual Red, Green, Blue, or HSL values for pixel-perfect color matching." }
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
                  { title: "Web Development Styling", desc: "Quickly convert a designer's HEX codes into RGB or HSL values for use in CSS variables or modern frameworks." },
                  { title: "Brand Identity Consistency", desc: "Ensure that your brand colors are consistent across different digital platforms by verifying their exact values." },
                  { title: "UI/UX Design Mockups", desc: "Experiment with different color shades and saturations to find the perfect accent colors for your interface." }
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
                  { q: "What is the difference between HEX, RGB, and HSL?", a: "HEX is a hexadecimal representation of RGB values commonly used in HTML/CSS. RGB (Red, Green, Blue) defines colors based on light intensity. HSL (Hue, Saturation, Lightness) is a more intuitive way for humans to describe colors based on their vibrant qualities." },
                  { q: "Are my favorite colors saved if I close my browser?", a: "Yes. We use your browser's local storage to save your favorite colors, so they will still be there the next time you visit our site from the same device." },
                  { q: "Can I pick a color directly from my screen?", a: "While web browsers don't allow websites to 'see' outside the tab for security reasons, you can use your system's native color picker (by clicking the color box) which often includes an eyedropper tool." },
                  { q: "Does this tool support transparency (Alpha channel)?", a: "Currently, our tool focuses on solid colors (HEX, RGB, HSL). We are looking into adding RGBA and HSLA support in a future update." },
                  { q: "Is there a limit to how many colors I can save?", a: "To ensure the best performance, we limit the 'Favorite Colors' list to the 20 most recent colors you've saved." },
                  { q: "Is this tool free to use for commercial projects?", a: "Absolutely. Our Color Picker & Converter is 100% free for both personal and professional use." }
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
                We created the Color Picker & Converter to streamline the design-to-development workflow. We noticed that many color tools are either too simple or overly complex, often lacking a quick way to save and compare colors. Our goal was to build a professional utility that provides instant conversions between HEX, RGB, and HSL formats, while offering a convenient favorites system that lives right in your browser. It's designed to be the go-to tool for anyone who needs to manage digital colors with speed and mathematical precision.
              </p>
            </section>

            {/* Related Tools */}
            <section className="space-y-6">
              <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-widest">Related Tools</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { name: "Random String Generator", path: "/random-string" },
                  { name: "Image Compressor", path: "/image-compressor" },
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
    </div>
  );
}
