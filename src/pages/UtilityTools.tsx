import React, { useState } from 'react';
import { 
  Calculator, 
  Calendar, 
  Percent, 
  Tag, 
  RefreshCcw,
  Clock,
  ArrowRight,
  TrendingDown,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/utils/cn';

type UtilityTool = 'age' | 'percentage' | 'discount';

export default function UtilityTools() {
  const [activeTool, setActiveTool] = useState<UtilityTool>('age');

  // Age Calculator State
  const [birthDate, setBirthDate] = useState('');
  const [ageResult, setAgeResult] = useState<{ years: number; months: number; days: number } | null>(null);

  // Percentage Calculator State
  const [percentValue, setPercentValue] = useState('');
  const [totalValue, setTotalValue] = useState('');
  const [percentResult, setPercentResult] = useState<number | null>(null);

  // Discount Calculator State
  const [originalPrice, setOriginalPrice] = useState('');
  const [discountPercent, setDiscountPercent] = useState('');
  const [discountResult, setDiscountResult] = useState<{ finalPrice: number; savings: number } | null>(null);

  const calculateAge = () => {
    if (!birthDate) return;
    const today = new Date();
    const birth = new Date(birthDate);
    
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (months < 0 || (months === 0 && days < 0)) {
      years--;
      months += 12;
    }
    if (days < 0) {
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
      months--;
    }

    setAgeResult({ years, months, days });
  };

  const calculatePercentage = () => {
    const p = parseFloat(percentValue);
    const t = parseFloat(totalValue);
    if (isNaN(p) || isNaN(t)) return;
    setPercentResult((p * t) / 100);
  };

  const calculateDiscount = () => {
    const p = parseFloat(originalPrice);
    const d = parseFloat(discountPercent);
    if (isNaN(p) || isNaN(d)) return;
    const savings = (p * d) / 100;
    setDiscountResult({ finalPrice: p - savings, savings });
  };

  const clearAll = () => {
    setBirthDate('');
    setAgeResult(null);
    setPercentValue('');
    setTotalValue('');
    setPercentResult(null);
    setOriginalPrice('');
    setDiscountPercent('');
    setDiscountResult(null);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center justify-center p-3 bg-emerald-500/10 rounded-2xl mb-4"
          >
            <Calculator className="h-8 w-8 text-emerald-500" />
          </motion.div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white sm:text-4xl">
            Utility Calculators
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Simple, fast, and accurate calculators for your everyday needs.
          </p>
        </div>

        {/* Tool Tabs */}
        <div className="flex p-1 bg-zinc-200 dark:bg-zinc-900 rounded-2xl mb-8">
          {[
            { id: 'age', label: 'Age', icon: Calendar },
            { id: 'percentage', label: 'Percentage', icon: Percent },
            { id: 'discount', label: 'Discount', icon: Tag },
          ].map((tool) => (
            <button
              key={tool.id}
              onClick={() => { setActiveTool(tool.id as UtilityTool); clearAll(); }}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold rounded-xl transition-all",
                activeTool === tool.id
                  ? "bg-white dark:bg-zinc-800 text-emerald-600 dark:text-emerald-400 shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
              )}
            >
              <tool.icon className="h-4 w-4" />
              {tool.label}
            </button>
          ))}
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          <div className="p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {activeTool === 'age' && (
                <motion.div
                  key="age"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      className="w-full px-6 py-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-xl font-bold text-zinc-900 dark:text-white focus:ring-2 focus:ring-emerald-500 transition-all"
                    />
                  </div>
                  <button
                    onClick={calculateAge}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-lg shadow-emerald-500/25 transition-all active:scale-95"
                  >
                    <Clock className="h-5 w-5" />
                    Calculate Age
                  </button>

                  {ageResult && (
                    <div className="grid grid-cols-3 gap-4 pt-4">
                      {[
                        { label: 'Years', value: ageResult.years },
                        { label: 'Months', value: ageResult.months },
                        { label: 'Days', value: ageResult.days },
                      ].map((item) => (
                        <div key={item.label} className="p-4 bg-emerald-50 dark:bg-emerald-500/5 rounded-2xl border border-emerald-100 dark:border-emerald-500/20 text-center">
                          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{item.value}</div>
                          <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mt-1">{item.label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {activeTool === 'percentage' && (
                <motion.div
                  key="percentage"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                        Percentage (%)
                      </label>
                      <input
                        type="number"
                        value={percentValue}
                        onChange={(e) => setPercentValue(e.target.value)}
                        placeholder="e.g. 20"
                        className="w-full px-6 py-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-xl font-bold text-zinc-900 dark:text-white focus:ring-2 focus:ring-emerald-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                        Total Value
                      </label>
                      <input
                        type="number"
                        value={totalValue}
                        onChange={(e) => setTotalValue(e.target.value)}
                        placeholder="e.g. 100"
                        className="w-full px-6 py-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-xl font-bold text-zinc-900 dark:text-white focus:ring-2 focus:ring-emerald-500 transition-all"
                      />
                    </div>
                  </div>
                  <button
                    onClick={calculatePercentage}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-lg shadow-emerald-500/25 transition-all active:scale-95"
                  >
                    <ArrowRight className="h-5 w-5" />
                    Calculate Result
                  </button>

                  {percentResult !== null && (
                    <div className="p-6 bg-emerald-50 dark:bg-emerald-500/5 rounded-2xl border border-emerald-100 dark:border-emerald-500/20 text-center">
                      <div className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
                        {percentValue}% of {totalValue} is
                      </div>
                      <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">
                        {percentResult.toLocaleString()}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTool === 'discount' && (
                <motion.div
                  key="discount"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                        Original Price
                      </label>
                      <input
                        type="number"
                        value={originalPrice}
                        onChange={(e) => setOriginalPrice(e.target.value)}
                        placeholder="e.g. 150"
                        className="w-full px-6 py-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-xl font-bold text-zinc-900 dark:text-white focus:ring-2 focus:ring-emerald-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                        Discount (%)
                      </label>
                      <input
                        type="number"
                        value={discountPercent}
                        onChange={(e) => setDiscountPercent(e.target.value)}
                        placeholder="e.g. 15"
                        className="w-full px-6 py-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-xl font-bold text-zinc-900 dark:text-white focus:ring-2 focus:ring-emerald-500 transition-all"
                      />
                    </div>
                  </div>
                  <button
                    onClick={calculateDiscount}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-lg shadow-emerald-500/25 transition-all active:scale-95"
                  >
                    <TrendingDown className="h-5 w-5" />
                    Calculate Discount
                  </button>

                  {discountResult && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                      <div className="p-6 bg-emerald-50 dark:bg-emerald-500/5 rounded-2xl border border-emerald-100 dark:border-emerald-500/20 text-center">
                        <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">Final Price</div>
                        <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                          ${discountResult.finalPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </div>
                      </div>
                      <div className="p-6 bg-emerald-50 dark:bg-emerald-500/5 rounded-2xl border border-emerald-100 dark:border-emerald-500/20 text-center">
                        <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1 flex items-center justify-center gap-1">
                          <Sparkles className="h-3 w-3" />
                          You Save
                        </div>
                        <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                          ${discountResult.savings.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
