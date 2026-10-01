import React from 'react';
import { Project } from '../data/portfolioData';
import { X, ExternalLink, Github, Database, Cpu, CheckCircle, Code, Layers } from 'lucide-react';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenLab: (presetId?: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onOpenLab }) => {
  useKeyboardShortcuts(
    [
      {
        key: 'Escape',
        allowInInputs: true,
        handler: () => onClose(),
        description: 'Close project modal',
      },
    ],
    Boolean(project)
  );

  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl border border-slate-700 bg-[#0E1524] shadow-2xl overflow-hidden text-slate-200"
      >
        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 bg-[#0B0F17]/80">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
              Case Study
            </span>
            <span className="text-slate-600" aria-hidden="true">/</span>
            <span className="text-xs font-mono text-slate-400">{project.category}</span>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          
          {/* Title & Subtitle */}
          <div>
            <h2 id="modal-title" className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {project.title}
            </h2>
            <p className="mt-1 text-base text-cyan-300 font-medium">
              {project.subtitle}
            </p>

            {/* Unboxed tech stack line */}
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
              <span className="text-slate-200 font-semibold">Technologies:</span>
              {project.technologies.map((tech, idx) => (
                <React.Fragment key={tech}>
                  {idx > 0 && <span className="text-slate-600">·</span>}
                  <span>{tech}</span>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Banner Hero Image */}
          <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-slate-800 bg-slate-900">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Metrics Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl border border-slate-800/80 bg-[#070A10]">
            {project.metrics.map((metric, i) => (
              <div key={i} className="space-y-0.5">
                <div className="text-xl sm:text-2xl font-bold font-mono text-cyan-400 tabular-nums">
                  {metric.value}
                </div>
                <div className="text-xs text-slate-400">{metric.label}</div>
              </div>
            ))}
          </div>

          {/* Detailed Problem & Engineering Solution */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>Architectural Problem &amp; Engineering Solution</span>
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {project.longDescription}
            </p>
          </div>

          {/* System Architecture Overview */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>System Topology &amp; Flow</span>
            </h3>
            <div className="p-4 rounded-xl border border-slate-800 bg-[#0B0F17] text-sm text-slate-300 leading-relaxed font-sans">
              {project.architectureOverview}
            </div>
          </div>

          {/* Relational Schema Highlights */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Database className="w-4 h-4 text-cyan-400" />
              <span>MySQL Relational Schema &amp; Index Design</span>
            </h3>
            <ul className="space-y-2.5">
              {project.schemaHighlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Production Code Snippet */}
          {project.sampleCodeSnippet && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5 text-slate-300 font-semibold">
                  <Code className="w-4 h-4 text-cyan-400" />
                  {project.sampleCodeSnippet.filename}
                </span>
                <span>Language: {project.sampleCodeSnippet.language.toUpperCase()}</span>
              </div>
              <pre className="p-4 rounded-xl border border-slate-800 bg-[#06090E] overflow-x-auto text-xs font-mono text-slate-300 leading-relaxed">
                <code>{project.sampleCodeSnippet.code}</code>
              </pre>
            </div>
          )}

        </div>

        {/* Modal Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-800 px-6 py-4 bg-[#0B0F17]/90">
          <button
            onClick={() => {
              onClose();
              onOpenLab();
            }}
            className="inline-flex items-center gap-2 text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <Database className="w-3.5 h-3.5" />
            <span>Test related queries in Interactive Lab</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white rounded-lg border border-slate-800 hover:bg-slate-800 transition-colors"
            >
              Close
            </button>
            <a
              href={project.githubUrl || 'https://github.com'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#0B0F17] bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Inspect Code Repository</span>
              <ExternalLink className="w-3 h-3 ml-0.5" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
