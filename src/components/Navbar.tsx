import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, Hammer, ChevronDown } from 'lucide-react';
import { useDarkMode } from '@/hooks/useDarkMode';
import { cn } from '@/utils/cn';

export function Navbar() {
  const { isDark, toggle } = useDarkMode();
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const toolCategories = [
    {
      name: "Security Tools",
      tools: [
        { name: "Password Strength", path: "/password-strength" },
        { name: "Hash Generator", path: "/hash-generator" },
        { name: "Random String", path: "/random-string-generator" },
      ]
    },
    {
      name: "Image & PDF",
      tools: [
        { name: "Image Compressor", path: "/image-compressor" },
        { name: "PDF Tools", path: "/pdf-tools" },
      ]
    },
    {
      name: "Dev & Design",
      tools: [
        { name: "Developer Tools", path: "/dev-tools" },
        { name: "Color Tool", path: "/color-tool" },
        { name: "Base64 Tool", path: "/base64-tool" },
      ]
    },
    {
      name: "Utility & Productivity",
      tools: [
        { name: "QR Code Tools", path: "/qr-code" },
        { name: "Unit Converter", path: "/unit-converter" },
        { name: "Utility Calculators", path: "/utility-tools" },
        { name: "MemoNote Pad", path: "/memo-note-pad" },
      ]
    }
  ];

  const [isToolsOpen, setIsToolsOpen] = React.useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
              <Hammer className="h-6 w-6 text-emerald-500" />
              <span>QuickTools Pro</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-1 lg:ml-6 lg:space-x-2 xl:ml-10 xl:space-x-4">
              <Link
                to="/"
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  location.pathname === "/"
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                )}
              >
                Home
              </Link>

              <Link
                to="/blog"
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  location.pathname.startsWith("/blog")
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                )}
              >
                Blog
              </Link>

              <div>
                <button
                  onMouseEnter={() => setIsToolsOpen(true)}
                  onClick={() => setIsToolsOpen(!isToolsOpen)}
                  className={cn(
                    "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isToolsOpen || toolCategories.some(c => c.tools.some(t => t.path === location.pathname))
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                  )}
                >
                  Tools
                  <ChevronDown className={cn("h-4 w-4 transition-transform", isToolsOpen && "rotate-180")} />
                </button>

                {/* Dropdown Menu */}
                {isToolsOpen && (
                  <div 
                    onMouseLeave={() => setIsToolsOpen(false)}
                    className="absolute left-1/2 -translate-x-1/2 mt-2 w-[700px] origin-top rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900"
                  >
                    <div className="grid grid-cols-4 gap-8">
                      {toolCategories.map((category) => (
                        <div key={category.name} className="space-y-4">
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                            {category.name}
                          </h4>
                          <div className="flex flex-col gap-1">
                            {category.tools.map((tool) => (
                              <Link
                                key={tool.path}
                                to={tool.path}
                                onClick={() => setIsToolsOpen(false)}
                                className={cn(
                                  "rounded-lg px-3 py-2 text-sm font-medium transition-all",
                                  location.pathname === tool.path
                                    ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                                    : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
                                )}
                              >
                                {tool.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              className="rounded-full p-2 text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="rounded-md p-2 text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Nav */}
      {isOpen && (
        <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-6 space-y-8">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className={cn(
                "block text-lg font-black uppercase tracking-widest",
                location.pathname === "/" ? "text-emerald-500" : "text-zinc-900 dark:text-white"
              )}
            >
              Home
            </Link>
            <Link
              to="/blog"
              onClick={() => setIsOpen(false)}
              className={cn(
                "block text-lg font-black uppercase tracking-widest",
                location.pathname.startsWith("/blog") ? "text-emerald-500" : "text-zinc-900 dark:text-white"
              )}
            >
              Blog
            </Link>

            {toolCategories.map((category) => (
              <div key={category.name} className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                  {category.name}
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {category.tools.map((tool) => (
                    <Link
                      key={tool.path}
                      to={tool.path}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "block rounded-xl px-4 py-3 text-sm font-bold transition-all",
                        location.pathname === tool.path
                          ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                          : "bg-zinc-50 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400"
                      )}
                    >
                      {tool.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
