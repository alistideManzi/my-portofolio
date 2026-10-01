import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Mail, Send, CheckCircle2, Copy, Check, MessageSquare, Clock, MapPin, Github, Linkedin, ArrowUpRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const ContactSection: React.FC = () => {
  const { profile } = PORTFOLIO_DATA;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'Full-Time Engineering Role',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#070A11]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Info & Availability */}
          <div className="lg:col-span-5">
            <ScrollReveal>
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                    <span className="font-semibold uppercase tracking-wider">06. Direct Channel</span>
                    <span className="text-slate-600" aria-hidden="true">/</span>
                    <span className="text-slate-400">Get In Touch</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight text-balance">
                    Let&apos;s Build Resilient Systems Together
                  </h2>
                  <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                    Whether you need a senior engineer to lead a React &amp; Node rewrite, optimize a bottlenecked MySQL database, or scale a backend service, I&apos;m ready to contribute.
                  </p>
                </div>

                {/* Email Contact Card */}
                <div className="p-5 rounded-2xl border border-slate-800 bg-[#0E1524] space-y-3">
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                    Direct Email Inquiries
                  </div>
                  <div className="flex items-center justify-between gap-3 p-3 rounded-xl border border-slate-800/80 bg-[#090D17]">
                    <div className="flex items-center gap-2.5 truncate">
                      <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                      <a 
                        href={`mailto:${profile.email}`} 
                        className="text-xs sm:text-sm font-mono text-white hover:text-cyan-300 truncate"
                      >
                        {profile.email}
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="p-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors shrink-0"
                      title="Copy email to clipboard"
                    >
                      {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-cyan-400" />
                    <span>Typical response latency: &lt; 12 business hours</span>
                  </div>
                </div>

                {/* Availability details */}
                <div className="space-y-3 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-2 text-slate-300">
                    <MapPin className="w-4 h-4 text-cyan-400" />
                    <span>Location: {profile.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Notice Period: Immediate / 2 Weeks</span>
                  </div>
                </div>

                {/* External Links */}
                <div className="flex items-center gap-3 pt-2">
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-300 border border-slate-800 bg-[#0E1524] rounded-lg hover:border-slate-700 hover:text-white transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub Profile</span>
                    <ArrowUpRight className="w-3 h-3 text-slate-500" />
                  </a>

                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-300 border border-slate-800 bg-[#0E1524] rounded-lg hover:border-slate-700 hover:text-white transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-3 h-3 text-slate-500" />
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <ScrollReveal delay={150}>
              <div className="rounded-2xl border border-slate-800 bg-[#0E1524] p-6 sm:p-8 shadow-xl">
              
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="mx-auto w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Transmission Dispatched
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-white">{formData.name}</strong>. Your message has been received. I will review your requirements and follow up at <strong className="text-cyan-300">{formData.email}</strong> shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        inquiryType: 'Full-Time Engineering Role',
                        message: '',
                      });
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#0B0F17] bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors mt-4"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-slate-800/80 pb-3">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-cyan-400" />
                      <span>Direct Engineering Contact Form</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Send a message directly or email <a href={`mailto:${profile.email}`} className="text-cyan-400 hover:underline">{profile.email}</a>.
                    </p>
                  </div>

                  {/* Name and Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="contact-name" className="text-xs font-mono text-slate-300">
                        Your Name / Organization <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full rounded-lg border border-slate-700 bg-[#090D17] px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="contact-email" className="text-xs font-mono text-slate-300">
                        Email Address <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="s.jenkins@company.com"
                        className="w-full rounded-lg border border-slate-700 bg-[#090D17] px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Inquiry Type */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-type" className="text-xs font-mono text-slate-300">
                      Inquiry Scope
                    </label>
                    <select
                      id="contact-type"
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full rounded-lg border border-slate-700 bg-[#090D17] px-3.5 py-2.5 text-xs text-white focus:border-cyan-400 focus:outline-none"
                    >
                      <option value="Full-Time Engineering Role">Full-Time Engineering Role (Frontend / Backend / Full-Stack)</option>
                      <option value="High-Impact Contract">High-Impact Contract / System Delivery</option>
                      <option value="MySQL Query & Schema Optimization">MySQL Query &amp; Schema Optimization Audit</option>
                      <option value="Technical Consultation">Technical Consultation &amp; System Design</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-message" className="text-xs font-mono text-slate-300">
                      Project Details or Job Description <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Outline the role, tech stack requirements, timeline, or key technical challenges..."
                      className="w-full rounded-lg border border-slate-700 bg-[#090D17] px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none resize-none leading-relaxed"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold text-[#0B0F17] bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 rounded-lg transition-colors shadow-sm"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isSubmitting ? 'Transmitting Message...' : 'Send Message'}</span>
                    </button>
                  </div>
                </form>
              )}

            </div>
          </ScrollReveal>
        </div>

        </div>

      </div>
    </section>
  );
};
