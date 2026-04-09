import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowRightLeft, 
  Ruler, 
  Weight, 
  Thermometer, 
  Zap, 
  HardDrive, 
  RefreshCcw,
  Scale
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/utils/cn';
import { Link } from 'react-router-dom';

type Category = 'length' | 'weight' | 'temperature' | 'speed' | 'data';

interface Unit {
  label: string;
  value: string;
  factor?: number; // Base unit is the first one
}

const UNITS: Record<Category, { icon: any; units: Unit[] }> = {
  length: {
    icon: Ruler,
    units: [
      { label: 'Meters (m)', value: 'm', factor: 1 },
      { label: 'Kilometers (km)', value: 'km', factor: 1000 },
      { label: 'Centimeters (cm)', value: 'cm', factor: 0.01 },
      { label: 'Millimeters (mm)', value: 'mm', factor: 0.001 },
      { label: 'Inches (in)', value: 'in', factor: 0.0254 },
      { label: 'Feet (ft)', value: 'ft', factor: 0.3048 },
      { label: 'Miles (mi)', value: 'mi', factor: 1609.34 }
    ]
  },
  weight: {
    icon: Weight,
    units: [
      { label: 'Kilograms (kg)', value: 'kg', factor: 1 },
      { label: 'Grams (g)', value: 'g', factor: 0.001 },
      { label: 'Milligrams (mg)', value: 'mg', factor: 0.000001 },
      { label: 'Pounds (lb)', value: 'lb', factor: 0.453592 },
      { label: 'Ounces (oz)', value: 'oz', factor: 0.0283495 }
    ]
  },
  temperature: {
    icon: Thermometer,
    units: [
      { label: 'Celsius (°C)', value: 'c' },
      { label: 'Fahrenheit (°F)', value: 'f' },
      { label: 'Kelvin (K)', value: 'k' }
    ]
  },
  speed: {
    icon: Zap,
    units: [
      { label: 'm/s', value: 'ms', factor: 1 },
      { label: 'km/h', value: 'kmh', factor: 0.277778 },
      { label: 'mph', value: 'mph', factor: 0.44704 },
      { label: 'Knots', value: 'kn', factor: 0.514444 }
    ]
  },
  data: {
    icon: HardDrive,
    units: [
      { label: 'Bytes (B)', value: 'b', factor: 1 },
      { label: 'Kilobytes (KB)', value: 'kb', factor: 1024 },
      { label: 'Megabytes (MB)', value: 'mb', factor: 1024 * 1024 },
      { label: 'Gigabytes (GB)', value: 'gb', factor: 1024 * 1024 * 1024 },
      { label: 'Terabytes (TB)', value: 'tb', factor: 1024 * 1024 * 1024 * 1024 }
    ]
  }
};

export default function UnitConverter() {
  const [category, setCategory] = useState<Category>('length');
  const [fromUnit, setFromUnit] = useState(UNITS.length.units[0].value);
  const [toUnit, setToUnit] = useState(UNITS.length.units[1].value);
  const [fromValue, setFromValue] = useState<string>('1');
  const [toValue, setToValue] = useState<string>('');

  useEffect(() => {
    const units = UNITS[category].units;
    setFromUnit(units[0].value);
    setToUnit(units[1].value);
  }, [category]);

  useEffect(() => {
    convert();
  }, [fromValue, fromUnit, toUnit, category]);

  const convert = () => {
    if (fromValue === '' || isNaN(Number(fromValue))) {
      setToValue('');
      return;
    }

    const val = Number(fromValue);
    
    if (category === 'temperature') {
      let celsius = 0;
      if (fromUnit === 'c') celsius = val;
      else if (fromUnit === 'f') celsius = (val - 32) * 5/9;
      else if (fromUnit === 'k') celsius = val - 273.15;

      let result = 0;
      if (toUnit === 'c') result = celsius;
      else if (toUnit === 'f') result = (celsius * 9/5) + 32;
      else if (toUnit === 'k') result = celsius + 273.15;
      
      setToValue(result.toLocaleString(undefined, { maximumFractionDigits: 4 }));
    } else {
      const fromFactor = UNITS[category].units.find(u => u.value === fromUnit)?.factor || 1;
      const toFactor = UNITS[category].units.find(u => u.value === toUnit)?.factor || 1;
      const result = (val * fromFactor) / toFactor;
      setToValue(result.toLocaleString(undefined, { maximumFractionDigits: 6 }));
    }
  };

  const swapUnits = () => {
    const tempUnit = fromUnit;
    setFromUnit(toUnit);
    setToUnit(tempUnit);
    setFromValue(toValue.replace(/,/g, ''));
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Unit Converter - Length, Weight, Temperature, Data | QuickTools Pro</title>
        <meta name="description" content="Fast and accurate unit conversion for length, weight, temperature, speed, and data. Convert meters to kilometers, Celsius to Fahrenheit, and more instantly." />
        <meta name="keywords" content="unit converter, length converter, weight converter, temperature converter, data converter, metric conversion, online converter" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Unit Converter",
              "description": "Fast and accurate unit conversion for length, weight, temperature, speed, and data. 100% private and local processing.",
              "operatingSystem": "All",
              "applicationCategory": "UtilityApplication",
              "url": "https://quick-toolz.vercel.app/unit-converter",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            }
          `}
        </script>
      </Helmet>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center justify-center p-3 bg-emerald-500/10 rounded-2xl mb-4"
          >
            <Scale className="h-8 w-8 text-emerald-500" />
          </motion.div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white sm:text-4xl">
            Unit Converter
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Convert length, weight, temperature, and more instantly.
          </p>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-8">
          {(Object.keys(UNITS) as Category[]).map((cat) => {
            const Icon = UNITS[cat].icon;
            return (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  "flex flex-col items-center justify-center gap-2 p-4 rounded-2xl transition-all border",
                  category === cat
                    ? "bg-white dark:bg-zinc-800 border-emerald-500 text-emerald-600 dark:text-emerald-400 shadow-sm"
                    : "bg-zinc-100 dark:bg-zinc-900 border-transparent text-zinc-500 dark:text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                )}
              >
                <Icon className="h-6 w-6" />
                <span className="text-xs font-semibold uppercase tracking-wider">{cat}</span>
              </button>
            );
          })}
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 shadow-xl border border-zinc-200 dark:border-zinc-800">
          <div className="space-y-8">
            {/* From Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">From</label>
                <select
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                  className="bg-zinc-100 dark:bg-zinc-800 border-none rounded-xl px-4 py-2 text-sm font-medium text-zinc-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                >
                  {UNITS[category].units.map((u) => (
                    <option key={u.value} value={u.value}>{u.label}</option>
                  ))}
                </select>
              </div>
              <input
                type="number"
                value={fromValue}
                onChange={(e) => setFromValue(e.target.value)}
                className="w-full px-6 py-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-2xl font-bold text-zinc-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                placeholder="Enter value..."
              />
            </div>

            {/* Swap Button */}
            <div className="flex justify-center -my-4 relative z-10">
              <button
                onClick={swapUnits}
                className="p-4 bg-emerald-500 text-white rounded-2xl shadow-lg shadow-emerald-500/25 hover:bg-emerald-600 transition-all active:scale-95 group"
              >
                <ArrowRightLeft className="h-6 w-6 group-hover:rotate-180 transition-transform duration-500" />
              </button>
            </div>

            {/* To Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">To</label>
                <select
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                  className="bg-zinc-100 dark:bg-zinc-800 border-none rounded-xl px-4 py-2 text-sm font-medium text-zinc-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                >
                  {UNITS[category].units.map((u) => (
                    <option key={u.value} value={u.value}>{u.label}</option>
                  ))}
                </select>
              </div>
              <div className="w-full px-6 py-4 bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-100 dark:border-emerald-500/20 rounded-2xl min-h-[4.5rem] flex items-center">
                <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 break-all">
                  {toValue || '0'}
                </span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => { setFromValue('1'); convert(); }}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-semibold rounded-2xl hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all"
              >
                <RefreshCcw className="h-5 w-5" />
                Reset Values
              </button>
            </div>
          </div>
        </div>

        {/* Rich Content Section */}
        <div className="mt-24 border-t border-zinc-100 pt-24 dark:border-zinc-800">
          <div className="max-w-3xl mx-auto space-y-16">
            {/* H1 & Intro */}
            <section>
              <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-6 uppercase tracking-tight">
                Professional <span className="text-emerald-500">Unit Converter</span>
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                Our Unit Converter is a comprehensive, all-in-one online utility designed for students, professionals, and DIY enthusiasts who need to perform quick and accurate measurements transformations. Whether you're working on a complex engineering project, translating a recipe from metric to imperial, or calculating data storage requirements, our tool provides instant results across multiple categories. We support a wide range of units for length, weight, temperature, speed, and digital data, ensuring that you have the right conversion at your fingertips whenever you need it. Built with a focus on precision and ease of use, it's the ultimate companion for all your measurement needs.
              </p>
            </section>

            {/* How to Use */}
            <section className="space-y-6">
              <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-widest">How to Use</h3>
              <ol className="space-y-4">
                {[
                  "Select the measurement category you need from the top icons: Length, Weight, Temperature, Speed, or Data.",
                  "Choose your starting unit from the 'From' dropdown menu (e.g., Meters, Kilograms, or Celsius).",
                  "Select your target unit from the 'To' dropdown menu (e.g., Feet, Pounds, or Fahrenheit).",
                  "Enter the numeric value you wish to convert into the 'From' input field; the tool will process the conversion in real-time.",
                  "Review the result in the 'To' section, which displays the converted value with high mathematical precision.",
                  "Use the 'Swap' button (the double arrows) to quickly reverse the conversion direction between your selected units."
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
                  { title: "Instant Real-Time Results", desc: "Experience zero-wait conversions that update as you type, eliminating the need for a 'Calculate' button." },
                  { title: "Comprehensive Unit Support", desc: "Access a wide variety of units from both the Metric and Imperial systems, as well as specialized data measurements." },
                  { title: "High Mathematical Precision", desc: "Our converter performs calculations with high accuracy, providing up to six decimal places for technical work." },
                  { title: "Mobile-Optimized Interface", desc: "Perform complex unit conversions on the go with a fully responsive design that works on any device." }
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
                  { title: "Academic & Scientific Research", desc: "Quickly convert measurements between different systems for physics, chemistry, or mathematics assignments." },
                  { title: "International Travel & Cooking", desc: "Translate temperatures from Celsius to Fahrenheit or convert weights from grams to ounces for recipes." },
                  { title: "IT & Data Management", desc: "Calculate the conversion between Megabytes, Gigabytes, and Terabytes to better understand storage capacity." }
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
                  { q: "How accurate are the unit conversions?", a: "Our tool uses standard conversion factors and high-precision floating-point math to ensure results are accurate up to 6 decimal places for most units." },
                  { q: "Does this tool support both Metric and Imperial systems?", a: "Yes. We provide a wide range of units from both systems, including meters, kilometers, inches, feet, grams, pounds, and more." },
                  { q: "Can I use this tool offline?", a: "While the tool requires an initial internet connection to load, all conversion logic is performed in your browser, meaning it works instantly once the page is open." },
                  { q: "Why are there different factors for data storage (1000 vs 1024)?", a: "Our tool uses the standard binary prefix (1024) for data conversions (KB, MB, GB), which is the standard used by most operating systems for file sizes." },
                  { q: "How do I convert temperature?", a: "Simply select the 'Temperature' category and choose between Celsius, Fahrenheit, and Kelvin. Our tool handles the unique offset formulas automatically." },
                  { q: "Are there any hidden costs or limits?", a: "No. Our Unit Converter is 100% free and unlimited. You can perform as many conversions as you need without any subscriptions or fees." }
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
                We developed the Unit Converter to provide a fast, accurate, and ad-free alternative to the cluttered conversion websites that dominate the internet. Whether you're a student working on homework, a chef converting a recipe, or a developer calculating data sizes, we wanted to offer a tool that delivers instant results with high precision. Our focus was on creating a clean, responsive interface that handles the most common measurement systems without the need for page reloads or complex menus.
              </p>
            </section>

            {/* Related Tools */}
            <section className="space-y-6">
              <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-widest">Related Tools</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { name: "Utility Calculators", path: "/utility-tools" },
                  { name: "Developer Tools", path: "/dev-tools" },
                  { name: "Color Tool", path: "/color-tool" }
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
