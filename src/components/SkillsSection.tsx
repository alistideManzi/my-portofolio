import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { CheckCircle2, Code2, Database, Layout, Terminal } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const SkillsSection: React.FC = () => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const categories = PORTFOLIO_DATA.skills;
  const currentCategory = categories[activeCategoryIndex];

  return (
    <section id="skills" className="py-20 md:py-28 border-b border-slate-800/80 bg-[#070A11]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal>
          <div className="space-y-3 max-w-2xl mb-12">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <span className="font-semibold uppercase tracking-wider">04. Technical Capabilities</span>
              <span className="text-slate-600" aria-hidden="true">/</span>
              <span className="text-slate-400">Domain Proficiency</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight text-balance">
              Specialized Engineering Competencies
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Rigorous technical depth across modern React client engineering, Node.js server architectures, and relational MySQL database systems.
            </p>
          </div>
        </ScrollReveal>

        {/* Category Selector Tabs (Interactive filter buttons) */}
        <ScrollReveal delay={100}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {categories.map((cat, idx) => {
              const isSelected = activeCategoryIndex === idx;
              return (
                <button
                  key={cat.title}
                  onClick={() => setActiveCategoryIndex(idx)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'border-cyan-500/70 bg-[#121B2D] text-white shadow-sm'
                      : 'border-slate-800/80 bg-[#0E1524] text-slate-300 hover:border-slate-700 hover:bg-[#101828]'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    {idx === 0 && <Layout className="w-4 h-4 text-cyan-400" />}
                    {idx === 1 && <Terminal className="w-4 h-4 text-indigo-400" />}
                    {idx === 2 && <Database className="w-4 h-4 text-emerald-400" />}
                    {idx === 3 && <Code2 className="w-4 h-4 text-amber-400" />}
                    <span className="text-xs font-mono text-slate-400">0{idx + 1}.</span>
                  </div>
                  <div className="text-sm font-bold text-white truncate">
                    {cat.title}
                  </div>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Selected Category Skill Matrix */}
        <ScrollReveal delay={200}>
          <div className="rounded-2xl border border-slate-800 bg-[#0E1524] p-6 sm:p-8 space-y-6">
          
          <div className="border-b border-slate-800/80 pb-4">
            <h3 className="text-xl font-bold text-white">
              {currentCategory.title}
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              {currentCategory.description}
            </p>
          </div>

          <div className="space-y-4">
            {currentCategory.skills.map((skill) => (
              <div 
                key={skill.name}
                className="p-4 rounded-xl border border-slate-800/80 bg-[#0A0F1A] space-y-2 hover:border-slate-700/80 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">{skill.name}</span>
                    <span className="text-slate-600 font-mono" aria-hidden="true">·</span>
                    <span className="text-slate-400 font-mono">{skill.experience} practical experience</span>
                  </div>
                  <span className="font-mono text-cyan-400 tabular-nums font-semibold self-start sm:self-auto">
                    {skill.proficiency}% mastery
                  </span>
                </div>

                {/* Proficiency Gauge */}
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full transition-all duration-500"
                    style={{ width: `${skill.proficiency}%` }}
                  />
                </div>

                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  {skill.note}
                </p>
              </div>
            ))}
          </div>

          {/* Quick competency quote */}
          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500 border-t border-slate-800/60">
            <span>Production Tested</span>
            <span>·</span>
            <span>Zero Mock Implementations</span>
            <span>·</span>
            <span>ACID Transaction Isolation</span>
            <span>·</span>
            <span>Modern React 19 Concurrent Features</span>
          </div>
        </div>
      </ScrollReveal>

    </div>
  </section>
  );
};
