import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Briefcase, Award, GraduationCap, CheckCircle } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const ExperienceSection: React.FC = () => {
  const { experiences, education, certifications } = PORTFOLIO_DATA;

  return (
    <section id="experience" className="py-20 md:py-28 border-b border-slate-800/80 bg-[#0B0F17]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal>
          <div className="space-y-3 max-w-2xl mb-12">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <span className="font-semibold uppercase tracking-wider">05. Track Record</span>
              <span className="text-slate-600" aria-hidden="true">/</span>
              <span className="text-slate-400">Engineering Milestones</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight text-balance">
              Work Experience &amp; Engineering Impact
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Hands-on history of shipping mission-critical features, eliminating bottlenecks, and maintaining high-availability database backends.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Experience Timeline (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {experiences.map((exp, idx) => (
              <ScrollReveal key={idx} delay={idx * 100}>
                <div 
                  className="relative pl-6 sm:pl-8 border-l border-slate-800 space-y-3 group"
                >
                  {/* Timeline Node Marker */}
                  <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-slate-700 border-2 border-[#0B0F17] group-hover:bg-cyan-400 transition-colors" />

                  {/* Role Header */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {exp.role}
                    </h3>
                    <span className="text-xs font-mono text-cyan-400 font-semibold">
                      {exp.period}
                    </span>
                  </div>

                  {/* Company & Location (Unboxed text) */}
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <span className="text-slate-200 font-semibold">{exp.company}</span>
                    <span className="text-slate-600" aria-hidden="true">·</span>
                    <span>{exp.location}</span>
                  </div>

                  {/* Summary */}
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {exp.summary}
                  </p>

                  {/* Quantifiable Achievements */}
                  <ul className="space-y-2 pt-1">
                    {exp.achievements.map((ach, aIdx) => (
                      <li key={aIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Unboxed Tech Stack Line */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-slate-400 pt-2">
                    <span className="text-slate-400 font-semibold">Stack:</span>
                    {exp.stack.map((item, sIdx) => (
                      <React.Fragment key={item}>
                        {sIdx > 0 && <span className="text-slate-600">·</span>}
                        <span>{item}</span>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Education & Certifications (4 cols) */}
          <div className="lg:col-span-4 space-y-8">
            <ScrollReveal delay={150}>
              {/* Certifications Card */}
              <div className="rounded-2xl border border-slate-800 bg-[#0E1524] p-6 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                  <Award className="w-4 h-4" />
                  <span>Industry Credentials</span>
                </div>

                <div className="space-y-3.5">
                  {certifications.map((cert, cIdx) => (
                    <div key={cIdx} className="space-y-1 border-b border-slate-800/80 pb-3 last:border-0 last:pb-0">
                      <div className="text-sm font-bold text-white">
                        {cert.name}
                      </div>
                      <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                        <span>{cert.issuer}</span>
                        <span className="text-slate-500 tabular-nums">{cert.year}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={250}>
              {/* Education Card */}
              <div className="rounded-2xl border border-slate-800 bg-[#0E1524] p-6 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                  <GraduationCap className="w-4 h-4" />
                  <span>Academic Foundation</span>
                </div>

                <div className="space-y-3">
                  {education.map((edu, eIdx) => (
                    <div key={eIdx} className="space-y-1.5">
                      <div className="text-sm font-bold text-white">
                        {edu.degree}
                      </div>
                      <div className="text-xs font-mono text-cyan-300">
                        {edu.institution}
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed font-sans">
                        {edu.details}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={350}>
              {/* Availability status */}
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-5 text-xs text-slate-300 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Current Status</span>
                </div>
                <p className="text-xs leading-relaxed">
                  Actively reviewing full-time Software Engineer positions, senior engineering opportunities, and technical contract projects worldwide.
                </p>
              </div>
            </ScrollReveal>

          </div>

        </div>

      </div>
    </section>
  );
};
