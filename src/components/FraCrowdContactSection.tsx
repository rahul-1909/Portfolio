import React, { useState } from 'react';
import { 
  Send, 
  Copy, 
  Check, 
  Clock, 
  MessageSquare,
  FileText,
  ArrowUp,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { profileData } from '../data/profile';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './SocialIcons';
import { CrowdCanvas } from './Skiper39';
import confetti from 'canvas-confetti';

interface FraCrowdContactSectionProps {
  onOpenResume: () => void;
}

export const FraCrowdContactSection: React.FC<FraCrowdContactSectionProps> = ({ onOpenResume }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(profileData.email);
    setCopiedEmail(true);
    
    // Launch celebratory confetti
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.85 },
        colors: ['#FFE600', '#000000', '#38BDF8'],
      });
    } catch {}

    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    
    // Open default mail client with prefilled body
    const mailto = `mailto:${profileData.email}?subject=${encodeURIComponent(
      `Portfolio Inquiry from ${formData.name || 'Visitor'}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailto;

    setFormSent(true);
    setTimeout(() => setFormSent(false), 5000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="contact" className="relative w-full bg-white text-black border-t-4 border-black overflow-hidden notebook-paper">
      
      {/* 1. Contact Station Hub */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-[#FFE600] border-2 border-black px-4 py-1.5 rounded-md font-mono text-xs font-bold uppercase tracking-wider mb-4 shadow-[3px_3px_0px_#000] -rotate-1">
            <Sparkles size={13} />
            <span>JOIN THE CROWD · PULL UP A CHAIR</span>
          </div>

          <h2 className="font-display text-5xl sm:text-7xl md:text-8xl tracking-tight text-black uppercase leading-[0.9]">
            LET'S TALK SHOP!
          </h2>

          <p className="mt-4 font-mono text-sm sm:text-base text-gray-700 max-w-lg mx-auto leading-relaxed">
            Whether you have a high-impact engineering role, an ambitious backend architecture to design, or want to discuss multi-agent AI systems.
          </p>
        </div>

        {/* Central Hand-Drawn Contact Station Card */}
        <div className="bg-white p-7 sm:p-10 rounded-3xl border-3 border-black shadow-[8px_8px_0px_0px_#000] mb-8">
          
          {/* Top Status Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-black">
            <div className="flex items-center gap-3">
              <span className="flex h-3.5 w-3.5 rounded-full bg-emerald-500 animate-pulse border-2 border-black" />
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-black block">
                  Available for Full-Time Roles & Contracts
                </span>
                <span className="font-mono text-[11px] text-gray-600 font-semibold">
                  Typical response latency &lt; 4 hours
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs font-bold text-black bg-neutral-100 px-3 py-1.5 rounded-lg border border-black/30">
              <Clock className="h-3.5 w-3.5" />
              <span>IST (UTC+5:30) · Hyderabad, India</span>
            </div>
          </div>

          {/* Email One-Click Copy Pill */}
          <div className="mt-6 p-5 sm:p-6 bg-[#FFFBEB] rounded-2xl border-2 border-black flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[4px_4px_0px_#000]">
            <div>
              <span className="font-mono text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                Direct Official Email
              </span>
              <a
                href={`mailto:${profileData.email}`}
                className="text-lg sm:text-2xl font-mono font-bold text-black hover:underline"
              >
                {profileData.email}
              </a>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyEmail}
                className="px-4 py-2.5 bg-white font-mono text-xs font-bold uppercase rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_#000] transition-all"
              >
                {copiedEmail ? (
                  <span className="text-emerald-700 flex items-center gap-1.5 font-bold">
                    <Check className="h-4 w-4" /> Copied to Clipboard! 🎉
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-black">
                    <Copy className="h-4 w-4" /> Copy Email
                  </span>
                )}
              </button>

              <a
                href={`mailto:${profileData.email}`}
                className="px-4 py-2.5 bg-black text-white font-mono text-xs font-bold uppercase rounded-xl border-2 border-black shadow-[3px_3px_0px_#FFE600] hover:bg-[#FFE600] hover:text-black hover:border-black transition-all flex items-center gap-1.5"
              >
                <span>Compose</span>
                <Send className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Quick Message Form */}
          <form onSubmit={handleFormSubmit} className="mt-8 pt-6 border-t-2 border-black space-y-4">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500 mb-2 flex items-center gap-2">
              <MessageSquare size={14} />
              <span>Send a Quick Note or Inquiry</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-white px-4 py-2.5 font-mono text-xs sm:text-sm text-black border-2 border-black rounded-xl shadow-[3px_3px_0px_#000] focus:outline-none focus:bg-yellow-50"
              />
              <input
                type="email"
                required
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-white px-4 py-2.5 font-mono text-xs sm:text-sm text-black border-2 border-black rounded-xl shadow-[3px_3px_0px_#000] focus:outline-none focus:bg-yellow-50"
              />
            </div>

            <textarea
              required
              rows={3}
              placeholder="Tell Rahul about your team, system bottleneck, or role..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-white px-4 py-2.5 font-mono text-xs sm:text-sm text-black border-2 border-black rounded-xl shadow-[3px_3px_0px_#000] focus:outline-none focus:bg-yellow-50 resize-none"
            />

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 bg-[#FFE600] text-black font-mono text-xs sm:text-sm font-bold uppercase rounded-xl border-2 border-black shadow-[4px_4px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#000] transition-all"
              >
                <Send size={14} />
                <span>Transmit Message</span>
              </button>

              {formSent && (
                <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-700 font-bold bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-400">
                  <CheckCircle2 size={14} />
                  <span>Client opened! Message ready to send.</span>
                </div>
              )}
            </div>
          </form>

          {/* Resume & Social Links */}
          <div className="mt-8 pt-6 border-t-2 border-black flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={onOpenResume}
              className="px-5 py-2.5 bg-[#FFE600] border-2 border-black font-mono text-xs font-bold uppercase rounded-xl shadow-[3px_3px_0px_#000] hover:bg-yellow-400 hover:shadow-[1px_1px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              <span>Verified Resume</span>
            </button>

            <div className="flex items-center gap-3">
              <a
                href={profileData.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-white rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] hover:bg-[#FFE600] transition-all hover:-translate-y-0.5"
                aria-label="GitHub"
              >
                <GithubIcon className="h-4 w-4" />
              </a>

              <a
                href={profileData.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-white rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] hover:bg-[#FFE600] transition-all hover:-translate-y-0.5"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>

              <a
                href={profileData.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-white rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] hover:bg-[#FFE600] transition-all hover:-translate-y-0.5"
                aria-label="Twitter / X"
              >
                <TwitterIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

        </div>

      </div>

      {/* 2. Full-Screen Edge-to-Edge Animated Skiper UI Crowd Canvas Walking at Footer */}
      <div className="relative w-full h-[360px] sm:h-[440px] md:h-[500px] pointer-events-none border-t-4 border-black select-none">
        <CrowdCanvas
          src="/images/peeps/all-peeps.png"
          rows={15}
          cols={7}
          className="w-full h-full block"
        />
      </div>

      {/* 3. Clean Minimal Bottom Footer Bar */}
      <div className="w-full bg-black text-white border-t-4 border-black py-6 px-4 sm:px-8 select-none relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-mono text-xs sm:text-sm text-gray-300 flex items-center gap-2">
            <span>© 2026 Rahul Teja · Handcrafted with logic & love.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-gray-400">
              Hyderabad, India
            </span>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FFE600] text-black font-mono text-xs font-bold border border-black hover:bg-yellow-300 transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp size={12} />
            </button>
          </div>
        </div>
      </div>

    </section>
  );
};
