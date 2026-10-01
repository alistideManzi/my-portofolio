import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { ArrowRight, Terminal, Database, Sparkles, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const { profile, stats } = PORTFOLIO_DATA;

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 border-b border-slate-800/60 overflow-hidden">
      {/* Subtle background tech ambient grid */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]"
        aria-hidden="true" 
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Bold Typographic Pitch & Actions */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Clean Unboxed Metadata Kicker (Anti-Pill Rule Compliant) */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-cyan-400">
              <span className="flex items-center gap-1.5 font-medium">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Available for New Challenges
              </span>
              <span className="text-slate-600" aria-hidden="true">/</span>
              <span className="text-slate-400">Full-Stack &amp; Systems</span>
              <span className="text-slate-600" aria-hidden="true">/</span>
              <span className="text-slate-400">Node · React · MySQL</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15] text-balance">
              Architecting fast React interfaces, scalable Node services, and{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300">
                rock-solid MySQL databases.
              </span>
            </h1>

            {/* Sub-headline prose */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Hi, I&apos;m <strong className="text-white font-semibold">Aristide Manzi</strong>. I build high-availability web applications with an engineering focus on strict relational schema integrity, sub-50ms query indexing, and ergonomic frontend architectures.
            </p>

            {/* Clean Unboxed Tech Ribbon */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-slate-400 font-mono pt-1">
              <span className="text-slate-200 font-semibold">Primary Core:</span>
              <span>React 19</span>
              <span className="text-slate-600">·</span>
              <span>Node.js / Express</span>
              <span className="text-slate-600">·</span>
              <span>MySQL 8.0 (InnoDB)</span>
              <span className="text-slate-600">·</span>
              <span>TypeScript</span>
              <span className="text-slate-600">·</span>
              <span>Tailwind CSS</span>
              <span className="text-slate-600">·</span>
              <span>Docker &amp; Redis</span>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#0B0F17] bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-all shadow-sm hover:shadow-cyan-500/20"
              >
                <span>Explore Featured Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#interactive-lab"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-200 bg-slate-900 border border-slate-700/80 hover:border-cyan-500/50 hover:text-white rounded-lg transition-all"
              >
                <Database className="w-4 h-4 text-cyan-400" />
                <span>Launch SQL &amp; API Lab</span>
              </a>

              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-400 hover:text-slate-200 hover:underline transition-colors"
              >
                <span>View Full CV</span>
              </button>
            </div>

            {/* Claim-to-Proof Metric Ribbon (Adjacent proof) */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-2xl font-bold font-mono text-white tabular-nums">
                    {stat.value}
                  </div>
                  <div className="text-xs font-medium text-slate-400 leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Visual Anchor with Portrait & Architecture Telemetry Badge */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              
              {/* Subtle back ambient glow */}
              <div 
                className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-cyan-500/20 via-indigo-500/10 to-transparent blur-xl pointer-events-none" 
                aria-hidden="true" 
              />

              {/* Main Visual Card */}
              <div className="relative rounded-2xl border border-slate-800 bg-[#0E1524] p-5 shadow-2xl">
                
                {/* Visual Headshot */}
                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-800 mb-4">
                  <img
                    src={profile.avatar}
                    alt="Aristide Manzi - Software Engineer"
                    className="w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback container in case of error
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  
                  {/* Subtle bottom gradient for readability */}
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#0B0F17] via-[#0B0F17]/80 to-transparent">
                    <p className="text-white font-semibold text-sm">Aristide Manzi</p>
                    <p className="text-xs font-mono text-cyan-400">Software Engineer &amp; Database Architect</p>
                  </div>
                </div>

                {/* Quick Interactive Terminal Telemetry Card */}
                <div className="rounded-lg bg-[#070A10] border border-slate-800/80 p-3.5 space-y-2.5 font-mono text-xs">
                  <div className="flex items-center justify-between text-slate-500 text-[11px] pb-1 border-b border-slate-800/60">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-500/70" />
                      <span className="w-2 h-2 rounded-full bg-yellow-500/70" />
                      <span className="w-2 h-2 rounded-full bg-green-500/70" />
                      <span className="ml-1 text-slate-400">engineer-profile.json</span>
                    </div>
                    <span className="text-emerald-400 flex items-center gap-1 text-[10px]">
                      <CheckCircle2 className="w-3 h-3" /> verified
                    </span>
                  </div>

                  <div className="space-y-1 text-slate-300">
                    <div>
                      <span className="text-indigo-400">location</span>
                      <span className="text-slate-500">: </span>
                      <span className="text-cyan-300">&quot;{profile.location}&quot;</span>
                    </div>
                    <div>
                      <span className="text-indigo-400">email</span>
                      <span className="text-slate-500">: </span>
                      <a href={`mailto:${profile.email}`} className="text-cyan-300 hover:underline">
                        &quot;{profile.email}&quot;
                      </a>
                    </div>
                    <div>
                      <span className="text-indigo-400">specialization</span>
                      <span className="text-slate-500">: </span>
                      <span className="text-slate-200">&quot;Full-Stack Node/React &amp; MySQL Performance&quot;</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
