import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Image as ImageIcon, 
  FileText, 
  Binary, 
  Lock, 
  Code2, 
  StickyNote, 
  Settings,
  Github,
  Twitter,
  Linkedin,
  Mail,
  QrCode,
  Palette,
  Scale,
  Calculator,
  ShieldCheck,
  Hash
} from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const toolCategories = [
    {
      name: "Security Tools",
      links: [
        { name: 'Password Strength', path: '/password-strength', icon: ShieldCheck },
        { name: 'Hash Generator', path: '/hash-generator', icon: Hash },
        { name: 'Random String', path: '/random-string-generator', icon: Lock },
      ]
    },
    {
      name: "Image & PDF",
      links: [
        { name: 'Image Compressor', path: '/image-compressor', icon: ImageIcon },
        { name: 'PDF Tools', path: '/pdf-tools', icon: FileText },
      ]
    },
    {
      name: "Dev & Design",
      links: [
        { name: 'Developer Tools', path: '/dev-tools', icon: Code2 },
        { name: 'Color Tool', path: '/color-tool', icon: Palette },
        { name: 'Base64 Tool', path: '/base64-tool', icon: Binary },
      ]
    },
    {
      name: "Utility & Productivity",
      links: [
        { name: 'QR Code Tools', path: '/qr-code', icon: QrCode },
        { name: 'Unit Converter', path: '/unit-converter', icon: Scale },
        { name: 'Utility Calculators', path: '/utility-tools', icon: Calculator },
        { name: 'MemoNote Pad', path: '/memo-note-pad', icon: StickyNote },
      ]
    }
  ];

  return (
    <footer id="footer" className="bg-zinc-50 border-t border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Settings className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-black tracking-tight text-zinc-900 dark:text-white">
                QuickTools <span className="text-emerald-500">Pro</span>
              </span>
            </Link>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
              The ultimate collection of fast, secure, and free online tools for developers and creators. No login required.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-emerald-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-emerald-500 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-emerald-500 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="mailto:support@quick-toolz.app" className="text-zinc-400 hover:text-emerald-500 transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Tools Section */}
          <div className="col-span-1 md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {toolCategories.map((category) => (
              <div key={category.name}>
                <h3 className="text-sm font-black uppercase tracking-wider text-zinc-900 dark:text-white mb-6">
                  {category.name}
                </h3>
                <ul className="space-y-4">
                  {category.links.map((tool) => (
                    <li key={tool.path}>
                      <Link 
                        to={tool.path} 
                        className="group flex items-center gap-2 text-sm text-zinc-600 hover:text-emerald-500 dark:text-zinc-400 dark:hover:text-emerald-400 transition-colors"
                      >
                        <tool.icon className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                        {tool.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Resources & Legal */}
          <div className="col-span-1">
            <h3 className="text-sm font-black uppercase tracking-wider text-zinc-900 dark:text-white mb-6">
              Platform
            </h3>
            <ul className="space-y-4">
              <li><Link to="/" className="text-sm text-zinc-600 hover:text-emerald-500 dark:text-zinc-400 transition-colors">Home</Link></li>
              <li><Link to="/all-tools" className="text-sm font-black text-emerald-500 hover:underline uppercase tracking-widest">All Tools</Link></li>
              <li><Link to="/blog" className="text-sm text-zinc-600 hover:text-emerald-500 dark:text-zinc-400 transition-colors">Blog</Link></li>
              <li><Link to="/about" className="text-sm text-zinc-600 hover:text-emerald-500 dark:text-zinc-400 transition-colors">About</Link></li>
              <li><Link to="/contact" className="text-sm text-zinc-600 hover:text-emerald-500 dark:text-zinc-400 transition-colors">Contact</Link></li>
              <li>
                <Link 
                  to="/privacy-policy" 
                  aria-label="Privacy Policy"
                  className="text-sm text-zinc-600 hover:text-emerald-500 dark:text-zinc-400 transition-colors"
                   >Privacy Policy  
                </Link>
              </li>
              <li><Link to="/terms" className="text-sm text-zinc-600 hover:text-emerald-500 dark:text-zinc-400 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            &copy; {currentYear} QuickTools Pro. Built for speed and privacy.
          </p>
          <section className="text-center py-4">
  <p className="text-sm text-zinc-500 dark:text-zinc-400">
    Questions? Email us at{' '}
    <a 
      href="mailto:support@quick-toolz.app"
      className="text-emerald-500 hover:underline"
    >
      support@quick-toolz.app
    </a>
  </p>
  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
    <a 
      href="https://www.profitablecpmratenetwork.com/nk3i8j129w?key=10820a846ef7f76a48ca4a5a3c4da201"
      target="_blank"
      rel="noopener"
      className="hover:text-emerald-500 transition-colors"
    >
      Sponsored
    </a>
  </p>
</section>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-xs text-zinc-400">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              All Systems Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
