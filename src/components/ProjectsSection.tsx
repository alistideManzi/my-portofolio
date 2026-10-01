import React, { useState } from 'react';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';
import { ProjectModal } from './ProjectModal';
import { ScrollReveal } from './ScrollReveal';
import { ArrowUpRight, Database, Terminal, ArrowRight, Layers } from 'lucide-react';

interface ProjectsSectionProps {
  onOpenLab: (presetId?: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenLab }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);

  const categories = [
    { id: 'all', label: 'All Systems' },
    { id: 'Full-Stack', label: 'Full-Stack' },
    { id: 'Backend API', label: 'Backend API' },
    { id: 'Enterprise Application', label: 'Enterprise Apps' },
    { id: 'Developer Tools', label: 'Developer Tools' },
  ];

  const filteredProjects = selectedCategory === 'all'
    ? PORTFOLIO_DATA.projects
    : PORTFOLIO_DATA.projects.filter(p => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 md:py-28 border-b border-slate-800/80 bg-[#0B0F17]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <span className="font-semibold uppercase tracking-wider">01. Selected Works</span>
                <span className="text-slate-600" aria-hidden="true">/</span>
                <span className="text-slate-400">Production Systems</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight text-balance">
                Architectural Case Studies &amp; High-Throughput Engines
              </h2>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                Real full-stack applications solving distributed concurrency, normalized relational storage, and high-frequency API communication.
              </p>
            </div>

            {/* Interactive Filter Control (Segmented button bar) */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#121926] border border-slate-800 rounded-lg self-start md:self-auto">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                    selectedCategory === cat.id
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-slate-200 border border-transparent'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Projects Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => {
            const isFeatured = index === 0;

            return (
              <ScrollReveal
                key={project.id}
                delay={index * 120}
                className={isFeatured ? 'lg:col-span-2' : ''}
              >
                <div
                  className="group h-full flex flex-col justify-between rounded-2xl border border-slate-800/90 bg-[#0E1524] hover:border-slate-700 transition-all duration-200 overflow-hidden"
                >
                  {/* Visual Image Banner */}
                  <div className={`relative w-full overflow-hidden bg-slate-900 border-b border-slate-800 ${
                    isFeatured ? 'h-64 sm:h-80' : 'h-52'
                  }`}>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E1524] via-transparent to-transparent opacity-80" />
                    
                    {/* Clean unboxed category overlay */}
                    <div className="absolute top-4 left-4 flex items-center gap-2 text-xs font-mono text-cyan-300 bg-[#0B0F17]/85 backdrop-blur-sm px-2.5 py-1 rounded border border-slate-800">
                      <span>{project.category}</span>
                    </div>
                  </div>

                  {/* Content Body */}
                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                          {project.title}
                        </h3>
                        <button
                          onClick={() => setActiveProjectModal(project)}
                          className="text-slate-400 hover:text-white p-1 rounded-md"
                          aria-label={`View ${project.title} case study`}
                        >
                          <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </button>
                      </div>

                      <p className="text-xs sm:text-sm font-medium text-cyan-300">
                        {project.subtitle}
                      </p>

                      <p className="text-sm text-slate-300 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Unboxed Metadata Tech Stack (Anti-Pill compliant) */}
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-slate-400 pt-2">
                        <span className="text-slate-200 font-semibold">Stack:</span>
                        {project.technologies.map((tech, idx) => (
                          <React.Fragment key={tech}>
                            {idx > 0 && <span className="text-slate-600">·</span>}
                            <span>{tech}</span>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>

                    {/* Quantitative Metrics Bar */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl border border-slate-800/80 bg-[#090D16]">
                      {project.metrics.map((metric, i) => (
                        <div key={i} className="space-y-0.5">
                          <div className="text-base sm:text-lg font-bold font-mono text-white tabular-nums">
                            {metric.value}
                          </div>
                          <div className="text-[11px] text-slate-400 truncate">{metric.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Bottom Action Row */}
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/60">
                      <button
                        onClick={() => setActiveProjectModal(project)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 py-1 transition-colors"
                      >
                        <span>Read System Case Study &amp; DDL</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onOpenLab(project.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-700 rounded-md transition-colors"
                      >
                        <Database className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Test in Interactive Lab</span>
                      </button>
                    </div>

                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>

      {/* Deep-dive Project Modal */}
      <ProjectModal
        project={activeProjectModal}
        onClose={() => setActiveProjectModal(null)}
        onOpenLab={(presetId) => {
          setActiveProjectModal(null);
          onOpenLab(presetId);
        }}
      />
    </section>
  );
};
