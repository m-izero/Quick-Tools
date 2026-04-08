import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
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
import { Link } from 'react-router-dom';

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
      <Helmet>
        <title>Utility Calculators - Age, Percentage, Discount | QuickTools Pro</title>
        <meta name="description" content="Free online utility calculators. Calculate your age, find percentages, and determine discount prices instantly. Simple, fast, and accurate tools for everyday use." />
        <meta name="keywords" content="age calculator, percentage calculator, discount calculator, online calculators, free utility tools, quick tools" />
      </Helmet>
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

        {/* Rich Content Section */}
        <div className="mt-24 border-t border-zinc-100 pt-24 dark:border-zinc-800">
          <div className="max-w-3xl mx-auto space-y-16">
            {/* H1 & Intro */}
            <section>
              <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-6 uppercase tracking-tight">
                Essential <span className="text-emerald-500">Utility Calculators</span>
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                Our Utility Calculators suite is a collection of essential, everyday math tools designed to simplify your life and provide instant, accurate results. Whether you're trying to calculate your exact age in years, months, and days, determine a percentage for a financial report, or find out exactly how much you'll save during a sale, our calculators have you covered. We've combined the most frequently used mathematical functions into a single, user-friendly interface that eliminates the need for complex manual calculations. It's the perfect resource for students, shoppers, and professionals who value precision and efficiency in their daily tasks.
              </p>
            </section>

            {/* How to Use */}
            <section className="space-y-6">
              <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-widest">How to Use</h3>
              <ol className="space-y-4">
                {[
                  "Choose the specific calculator you need from the top tabs: Age, Percentage, or Discount.",
                  "For the Age Calculator: Select your date of birth from the calendar picker and click 'Calculate Age' to see your exact age breakdown.",
                  "For the Percentage Calculator: Enter the percentage value and the total amount to instantly find the calculated result.",
                  "For the Discount Calculator: Input the original price of an item and the discount percentage to see your final price and total savings.",
                  "Review the results displayed in the highlighted boxes, which update instantly upon calculation.",
                  "Use the 'Reset' or 'Clear' functionality to start a new calculation with different values at any time."
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
                  { title: "All-In-One Convenience", desc: "Access three essential calculators in one place, saving you from navigating multiple websites or apps." },
                  { title: "Error-Free Accuracy", desc: "Eliminate the risk of manual calculation errors with our mathematically sound algorithms and precise logic." },
                  { title: "Clean & Intuitive Design", desc: "Enjoy a distraction-free interface that focuses on providing the answers you need without unnecessary complexity." },
                  { title: "Instant Financial Insights", desc: "Quickly understand your savings and percentages to make better-informed purchasing and budgeting decisions." }
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
                  { title: "Milestone Tracking", desc: "Calculate your exact age or the age of a loved one for birthdays, anniversaries, or legal documentation requirements." },
                  { title: "Smart Shopping", desc: "Use the discount calculator while at the store to instantly know the final price of items on sale and track your total savings." },
                  { title: "Business & Finance", desc: "Quickly determine percentages for tips, taxes, or commission rates during meetings or while reviewing financial statements." }
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
                  { q: "How accurate is the Age Calculator?", a: "Our tool calculates age based on the exact number of years, months, and days, accounting for leap years and varying month lengths for total precision." },
                  { q: "Can I calculate percentages for large numbers?", a: "Yes. Our percentage calculator can handle extremely large values, making it suitable for both personal and professional financial calculations." },
                  { q: "Does the Discount Calculator handle decimals?", a: "Absolutely. You can enter prices and discount percentages with decimal points (e.g., $19.99 at 12.5% off) for precise retail calculations." },
                  { q: "Is my data stored when I use these calculators?", a: "No. All calculations are performed locally in your browser. We do not store or track any of the numbers or dates you enter into the tools." },
                  { q: "Can I use these tools on my phone?", a: "Yes. The Utility Calculators are fully responsive and optimized for mobile browsers, making them perfect for use while shopping or on the go." },
                  { q: "Are there any limits on how many times I can use the tools?", a: "There are no limits. You can use all our calculators as many times as you need, completely free of charge and without registration." }
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

            {/* Related Tools */}
            <section className="space-y-6">
              <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-widest">Related Tools</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { name: "Unit Converter", path: "/unit-converter" },
                  { name: "Developer Tools", path: "/dev-tools" },
                  { name: "Random String Generator", path: "/random-string" }
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
