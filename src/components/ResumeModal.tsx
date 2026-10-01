import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { X, Printer, Copy, Check, Download, Mail, MapPin, Globe } from 'lucide-react';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const { profile, skills, experiences, education, certifications } = PORTFOLIO_DATA;

  useKeyboardShortcuts(
    [
      {
        key: 'Escape',
        allowInInputs: true,
        handler: () => onClose(),
        description: 'Close resume modal',
      },
    ],
    isOpen
  );

  if (!isOpen) return null;

  const markdownResume = `# ${profile.name}
**${profile.title}** | ${profile.specialty}
Email: ${profile.email} | Location: ${profile.location} | GitHub: ${profile.github} | LinkedIn: ${profile.linkedin}

---

## PROFESSIONAL SUMMARY
${profile.bio}

---

## CORE TECHNICAL COMPETENCIES
- **Frontend:** React 19, TypeScript, Tailwind CSS, Next.js, TanStack Query, Zustand, Responsive UI, Web Vitals
- **Backend & APIs:** Node.js, Express, RESTful API Design, JWT, OAuth2, Microservices, Worker Queues, WebSockets
- **Database & Persistence:** MySQL 8.0 (InnoDB), Indexing & B-Tree optimization, EXPLAIN ANALYZE, 3NF Normalization, ACID Transactions, Connection Pooling, Redis Caching
- **DevOps & Infrastructure:** Docker, Git, CI/CD Actions, Linux, Nginx, Jest, Supertest

---

## WORK EXPERIENCE
${experiences
  .map(
    (exp) => `### ${exp.role} — ${exp.company} (${exp.period})
*${exp.location}*
${exp.summary}
${exp.achievements.map((a) => `- ${a}`).join('\n')}
**Stack:** ${exp.stack.join(', ')}
`
  )
  .join('\n')}

---

## CERTIFICATIONS
${certifications.map((c) => `- **${c.name}** — ${c.issuer} (${c.year})`).join('\n')}

---

## EDUCATION
${education.map((e) => `- **${e.degree}** — ${e.institution} (${e.year})`).join('\n')}
`;

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(markdownResume);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    const blob = new Blob([markdownResume], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Aristide_Manzi_Software_Engineer_CV.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-title"
    >
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl border border-slate-700 bg-[#0E1524] shadow-2xl overflow-hidden text-slate-200">
        
        {/* Header with actions */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 bg-[#0B0F17]/90">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
              Curriculum Vitae
            </span>
            <span className="text-slate-600" aria-hidden="true">/</span>
            <span className="text-xs font-mono text-slate-400">Aristide Manzi</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyMarkdown}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-md transition-colors"
              title="Copy plain markdown resume"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied MD' : 'Copy MD'}</span>
            </button>

            <button
              onClick={handleDownloadTxt}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-md transition-colors"
              title="Download Markdown file"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>

            <button
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#0B0F17] bg-cyan-400 hover:bg-cyan-300 rounded-md transition-colors"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors ml-2"
              aria-label="Close resume modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable ATS Resume Body */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8 bg-[#0B0F17] font-sans print:p-0 print:bg-white print:text-black">
          
          {/* Header Section */}
          <div className="border-b border-slate-800 pb-6 space-y-2">
            <h1 id="resume-title" className="text-3xl font-extrabold text-white tracking-tight">
              {profile.name}
            </h1>
            <p className="text-sm font-semibold text-cyan-400 font-mono">
              {profile.title} · {profile.specialty}
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 pt-1 font-mono">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <a href={`mailto:${profile.email}`} className="text-cyan-300 hover:underline">{profile.email}</a>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>{profile.location}</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                <span>Available for Full-Time &amp; Remote Contracts</span>
              </span>
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
              Professional Summary
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {profile.bio} Proven track record designing high-availability web applications with Node.js and React, coupled with normalized MySQL 8.0 databases optimized via B-Tree composite indexing, query profiling, and ACID transaction isolation.
            </p>
          </div>

          {/* Technical Skills Summary */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
              Core Technical Competencies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg border border-slate-800/80 bg-[#0E1524]">
                <strong className="text-white block mb-1">Frontend Engineering:</strong>
                <span className="text-slate-400">React 19, TypeScript, Tailwind CSS, Next.js, TanStack Query, Zustand, Responsive UX, Web Vitals, WCAG AA.</span>
              </div>
              <div className="p-3 rounded-lg border border-slate-800/80 bg-[#0E1524]">
                <strong className="text-white block mb-1">Backend &amp; Node.js:</strong>
                <span className="text-slate-400">Node.js, Express, RESTful APIs, JWT Auth, OAuth2, Middleware pipelines, BullMQ, WebSockets, Zod validation.</span>
              </div>
              <div className="p-3 rounded-lg border border-slate-800/80 bg-[#0E1524]">
                <strong className="text-white block mb-1">MySQL &amp; Relational Persistence:</strong>
                <span className="text-slate-400">MySQL 8.0 (InnoDB), B-Tree Index Optimization, 3NF Normalization, ACID Transactions, Row-Level Locks, EXPLAIN ANALYZE, Redis.</span>
              </div>
              <div className="p-3 rounded-lg border border-slate-800/80 bg-[#0E1524]">
                <strong className="text-white block mb-1">DevOps &amp; Infrastructure:</strong>
                <span className="text-slate-400">Docker, Docker Compose, Git &amp; GitHub Actions, Linux/Bash, Nginx Reverse Proxy, Jest, Supertest.</span>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-6">
            <h2 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
              Engineering Experience
            </h2>
            <div className="space-y-6">
              {experiences.map((exp, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-sm">
                    <div>
                      <strong className="text-white font-bold">{exp.role}</strong>
                      <span className="text-slate-400"> — {exp.company}</span>
                    </div>
                    <span className="text-xs font-mono text-cyan-400 tabular-nums">{exp.period}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {exp.summary}
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-300 pl-4 list-disc marker:text-cyan-400">
                    {exp.achievements.map((ach, aIdx) => (
                      <li key={aIdx}>{ach}</li>
                    ))}
                  </ul>
                  <div className="text-[11px] font-mono text-slate-400 pt-1">
                    <strong>Technologies:</strong> {exp.stack.join(' · ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications & Education */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
            <div className="space-y-2">
              <h2 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                Certifications
              </h2>
              <div className="space-y-2 text-xs">
                {certifications.map((c, i) => (
                  <div key={i} className="text-slate-300">
                    <strong className="text-white">{c.name}</strong>
                    <div className="text-slate-400 font-mono">{c.issuer} ({c.year})</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                Education
              </h2>
              <div className="space-y-2 text-xs">
                {education.map((e, i) => (
                  <div key={i} className="text-slate-300">
                    <strong className="text-white">{e.degree}</strong>
                    <div className="text-cyan-400 font-mono">{e.institution}</div>
                    <p className="text-slate-400 mt-0.5">{e.details}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
