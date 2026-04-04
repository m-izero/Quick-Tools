import React, { useState, useEffect } from 'react';
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
import { AdSection } from '@/components/AdSection';

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
      <div className="max-w-3xl mx-auto">
        <AdSection type="top" />
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
        <AdSection type="middle" className="mt-12" />
      </div>
    </div>
  );
}
