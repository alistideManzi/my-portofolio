import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  FileText, 
  Mail, 
  Database, 
  Layers, 
  Briefcase, 
  Code, 
  Copy, 
  Check, 
  X, 
  ArrowRight, 
  Terminal,
  ExternalLink
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { isMac } from '../hooks/useKeyboardShortcuts';

export interface CommandItem {
  id: string;
  title: string;
  category: string;
  shortcut?: string;
  icon: React.ReactNode;
  action: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
  onOpenContact: () => void;
  onOpenLab: (presetId?: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenResume,
  onOpenContact,
  onOpenLab,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const isApple = isMac();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.profile.email);
    setCopiedEmail(true);
    setTimeout(() => {
      setCopiedEmail(false);
      onClose();
    }, 1200);
  };

  const scrollToSection = (sectionId: string) => {
    onClose();
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const commands: CommandItem[] = [
    {
      id: 'resume',
      title: 'View Curriculum Vitae / Resume (Printable & Markdown)',
      category: 'Profile & Documents',
      shortcut: 'R',
      icon: <FileText className="w-4 h-4 text-cyan-400" />,
      action: () => {
        onClose();
        onOpenResume();
      },
    },
    {
      id: 'contact',
      title: 'Jump to Direct Contact Form & Availability',
      category: 'Inquiries',
      shortcut: 'C',
      icon: <Mail className="w-4 h-4 text-emerald-400" />,
      action: () => {
        scrollToSection('contact');
      },
    },
    {
      id: 'email-copy',
      title: `Copy Email to Clipboard (${PORTFOLIO_DATA.profile.email})`,
      category: 'Inquiries',
      shortcut: 'E',
      icon: copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />,
      action: handleCopyEmail,
    },
    {
      id: 'lab-sql',
      title: 'Launch Interactive MySQL Query Studio & EXPLAIN Plan',
      category: 'Engineering Verification',
      shortcut: 'L',
      icon: <Database className="w-4 h-4 text-cyan-400" />,
      action: () => {
        onClose();
        onOpenLab();
      },
    },
    {
      id: 'lab-tx',
      title: 'Simulate ACID Atomic Order Transaction in Lab',
      category: 'Engineering Verification',
      shortcut: 'T',
      icon: <Terminal className="w-4 h-4 text-indigo-400" />,
      action: () => {
        onClose();
        onOpenLab('atomic-transaction-simulation');
      },
    },
    {
      id: 'projects',
      title: 'Browse High-Throughput Production Case Studies',
      category: 'Navigation',
      shortcut: 'P',
      icon: <Briefcase className="w-4 h-4 text-amber-400" />,
      action: () => {
        scrollToSection('projects');
      },
    },
    {
      id: 'architecture',
      title: 'Inspect Production System Architecture Topology',
      category: 'Navigation',
      shortcut: 'A',
      icon: <Layers className="w-4 h-4 text-purple-400" />,
      action: () => {
        scrollToSection('architecture');
      },
    },
    {
      id: 'skills',
      title: 'Explore Specialized Engineering Capabilities Matrix',
      category: 'Navigation',
      shortcut: 'S',
      icon: <Code className="w-4 h-4 text-sky-400" />,
      action: () => {
        scrollToSection('skills');
      },
    },
    {
      id: 'github',
      title: 'Open GitHub Profile',
      category: 'External Links',
      shortcut: 'G',
      icon: <ExternalLink className="w-4 h-4 text-slate-400" />,
      action: () => {
        window.open(PORTFOLIO_DATA.profile.github, '_blank', 'noopener,noreferrer');
        onClose();
      },
    },
  ];

  // Filter commands by search query
  const filteredCommands = commands.filter((cmd) => {
    const text = `${cmd.title} ${cmd.category}`.toLowerCase();
    return text.includes(query.toLowerCase());
  });

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Handle arrow navigation and Enter/Escape
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl rounded-2xl border border-slate-700 bg-[#0E1524] shadow-2xl overflow-hidden text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-800 bg-[#0B0F17]/90">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a command or jump to section (e.g. 'resume', 'contact', 'lab')..."
            className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none font-sans"
            spellCheck={false}
          />
          <div className="flex items-center gap-1.5 shrink-0">
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-800 border border-slate-700 rounded">
              Esc
            </kbd>
            <button
              onClick={onClose}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Command list */}
        <div className="max-h-[60vh] overflow-y-auto p-2 space-y-1">
          {filteredCommands.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500 font-mono">
              No matching commands or destinations found for &quot;{query}&quot;
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={cmd.id}
                  onClick={() => cmd.action()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all text-xs ${
                    isSelected
                      ? 'bg-cyan-500/10 text-white border border-cyan-500/30'
                      : 'text-slate-300 hover:bg-slate-800/40 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <div className="p-2 rounded-lg bg-[#0A0F1A] border border-slate-800 shrink-0">
                      {cmd.icon}
                    </div>
                    <div className="truncate">
                      <div className="font-semibold text-white truncate">
                        {cmd.title}
                      </div>
                      <div className="text-[11px] font-mono text-slate-400">
                        {cmd.category}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    {cmd.shortcut && (
                      <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-[#0B0F17] border border-slate-800 rounded">
                        {cmd.shortcut}
                      </kbd>
                    )}
                    <ArrowRight className={`w-3.5 h-3.5 ${isSelected ? 'text-cyan-400' : 'text-slate-600'}`} />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer hints */}
        <div className="flex items-center justify-between px-4 py-2.5 border-t border-slate-800 bg-[#090D17] text-[11px] font-mono text-slate-500">
          <div className="flex items-center gap-3">
            <span><kbd className="text-slate-400">↑↓</kbd> Navigate</span>
            <span><kbd className="text-slate-400">↵</kbd> Select</span>
            <span><kbd className="text-slate-400">Esc</kbd> Close</span>
          </div>
          <div>
            <span>Press <kbd className="text-cyan-400">{isApple ? '⌘K' : 'Ctrl+K'}</kbd> anywhere</span>
          </div>
        </div>

      </div>
    </div>
  );
};
