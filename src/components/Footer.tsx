import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenResume: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenResume }) => {
  const { profile } = PORTFOLIO_DATA;
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800/80 bg-[#090D15] text-slate-400 text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand info */}
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-white font-bold tracking-tight">
              <span className="font-mono text-cyan-400 font-semibold">&lt;AM/&gt;</span>
              <span>{profile.name}</span>
            </div>
            <p className="text-slate-400">
              Full-Stack Software Engineer · React · Node.js · MySQL Relational Architectures
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300">
            <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
            <a href="#interactive-lab" className="hover:text-cyan-400 transition-colors">Interactive Lab</a>
            <a href="#architecture" className="hover:text-cyan-400 transition-colors">Architecture</a>
            <a href="#skills" className="hover:text-cyan-400 transition-colors">Skills</a>
            <a href="#experience" className="hover:text-cyan-400 transition-colors">Experience</a>
            <button onClick={onOpenResume} className="hover:text-cyan-400 transition-colors">Resume</button>
            <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 p-2 rounded-lg border border-slate-800 hover:border-slate-700 hover:text-white transition-colors text-slate-400"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="w-4 h-4" />
            <span className="text-[11px] font-mono">Top</span>
          </button>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-8 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <div>
            © {currentYear} Aristide Manzi. Engineered with React, Node.js, and Tailwind CSS.
          </div>
          <div className="flex items-center gap-4">
            <a 
              href={`mailto:${profile.email}`} 
              className="hover:text-slate-300 transition-colors"
            >
              {profile.email}
            </a>
            <span>·</span>
            <a 
              href={profile.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-slate-300 transition-colors"
            >
              GitHub
            </a>
            <span>·</span>
            <a 
              href={profile.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-slate-300 transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
