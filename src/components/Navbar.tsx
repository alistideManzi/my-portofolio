import React, { useState } from 'react';
import { Menu, X, FileText, ArrowUpRight, Search } from 'lucide-react';
import { isMac } from '../hooks/useKeyboardShortcuts';

interface NavbarProps {
  onOpenResume: () => void;
  onOpenContact: () => void;
  onOpenCommandPalette: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenResume, 
  onOpenContact, 
  onOpenCommandPalette 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isApple = isMac();

  const navLinks = [
    { name: 'Projects', href: '#projects' },
    { name: 'Interactive Lab', href: '#interactive-lab' },
    { name: 'Architecture', href: '#architecture' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#0B0F17]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#" 
          className="group flex items-center gap-2 text-base font-bold tracking-tight text-white hover:text-cyan-400 transition-colors"
        >
          <span className="font-mono text-cyan-400 font-semibold">&lt;AM/&gt;</span>
          <span>Aristide Manzi</span>
          <span className="hidden sm:inline-block text-xs font-normal text-slate-500 font-mono">
            / Software Engineer
          </span>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-7 text-sm font-medium text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-cyan-400 transition-colors py-1 relative hover:underline decoration-cyan-400/50 underline-offset-8"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1-2 primary actions + Keyboard shortcut palette button */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* Quick command shortcut badge button */}
          <button
            onClick={onOpenCommandPalette}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono text-slate-400 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-slate-200 rounded-md transition-colors"
            title="Open command palette (Cmd+K or Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-[11px] text-cyan-400/90 font-medium">
              {isApple ? '⌘K' : 'Ctrl+K'}
            </span>
          </button>

          <button
            onClick={onOpenResume}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 border border-slate-700/80 rounded-md hover:bg-slate-800 hover:text-white transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-slate-400" />
            <span>Resume</span>
          </button>

          <a
            href="#contact"
            onClick={onOpenContact}
            className="inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-semibold text-[#0B0F17] bg-cyan-400 hover:bg-cyan-300 rounded-md transition-colors shadow-sm whitespace-nowrap"
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#0E1420] px-4 pt-3 pb-5 space-y-3">
          <nav className="flex flex-col space-y-2.5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-slate-300 hover:text-cyan-400 py-1"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCommandPalette();
              }}
              className="flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-cyan-400 border border-cyan-500/30 bg-cyan-500/10 rounded-md"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Command Palette ({isApple ? '⌘K' : 'Ctrl+K'})</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-slate-200 border border-slate-700 rounded-md hover:bg-slate-800"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>View Resume</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
