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

        {/* SEO Content Section */}
        <div className="mt-24 border-t border-zinc-100 pt-24 dark:border-zinc-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-6 uppercase tracking-tight">
                  Essential <span className="text-emerald-500">Utility Calculators</span> Online
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                  Simplify your daily calculations with our site of free online utility tools. Whether you need to calculate your exact age, determine a percentage, or find out how much you'll save with a discount, our calculators provide fast and accurate results. Designed for ease of use, these tools help you make quick decisions without the need for complex formulas or manual math.
                </p>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-widest">Available Calculators</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-black text-emerald-500 uppercase tracking-widest mb-2">Age Calculator</h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                      Find out exactly how old you are in years, months, and days. Perfect for checking milestones or calculating time intervals between dates.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-emerald-500 uppercase tracking-widest mb-2">Percentage Calculator</h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                      Easily calculate the percentage of any total value. Useful for business, finance, and everyday math problems.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-emerald-500 uppercase tracking-widest mb-2">Discount Calculator</h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                      Determine the final price and total savings after applying a discount percentage. A must-have tool for smart shopping and budgeting.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-widest">Benefits</h3>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { title: "Instant Accuracy", desc: "Get precise results immediately without any manual calculations or errors." },
                    { title: "User-Friendly Interface", desc: "Simple inputs and clear results make these tools accessible to everyone." },
                    { title: "Mobile Optimized", desc: "Perform quick calculations on the go from any smartphone or tablet." },
                    { title: "Completely Free", desc: "Use all our utility calculators as much as you need without any cost or registration." }
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
    </div>
  );
}
