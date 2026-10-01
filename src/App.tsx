import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { InteractiveWorkbench } from './components/InteractiveWorkbench';
import { ArchitectureSection } from './components/ArchitectureSection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { CommandPalette } from './components/CommandPalette';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [labPresetId, setLabPresetId] = useState<string | undefined>(undefined);

  const handleOpenLab = (presetId?: string) => {
    if (presetId) {
      setLabPresetId(presetId);
    }
    const labElement = document.getElementById('interactive-lab');
    if (labElement) {
      labElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenContact = () => {
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Keyboard shortcut hook implementation
  useKeyboardShortcuts([
    {
      key: 'k',
      metaOrCtrl: true,
      allowInInputs: true,
      handler: () => {
        setIsCommandPaletteOpen((prev) => !prev);
      },
      description: 'Toggle Command Palette & Quick Navigation',
    },
    {
      key: 'Escape',
      allowInInputs: true,
      handler: () => {
        if (isCommandPaletteOpen) {
          setIsCommandPaletteOpen(false);
        } else if (isResumeOpen) {
          setIsResumeOpen(false);
        }
      },
      description: 'Close active modal or overlay',
    },
  ]);

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col selection:bg-cyan-500/20 selection:text-cyan-200">
      {/* Navigation Top Bar */}
      <Navbar 
        onOpenResume={() => setIsResumeOpen(true)} 
        onOpenContact={handleOpenContact}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Introduction & Proof */}
        <Hero onOpenResume={() => setIsResumeOpen(true)} />

        {/* Featured Production Systems Case Studies */}
        <ProjectsSection onOpenLab={handleOpenLab} />

        {/* Live Interactive SQL & Node.js Lab */}
        <InteractiveWorkbench initialPresetId={labPresetId} />

        {/* System Architecture Blueprint */}
        <ArchitectureSection />

        {/* Deep Technical Skills Matrix */}
        <SkillsSection />

        {/* Career Milestones & Experience Timeline */}
        <ExperienceSection />

        {/* Direct Contact Channel & Message Form */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenResume={() => setIsResumeOpen(true)} />

      {/* Full ATS Resume Modal */}
      <ResumeModal 
        isOpen={isResumeOpen} 
        onClose={() => setIsResumeOpen(false)} 
      />

      {/* Cmd+K / Ctrl+K Command Palette & Quick Shortcuts */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenContact={handleOpenContact}
        onOpenLab={handleOpenLab}
      />
    </div>
  );
}
