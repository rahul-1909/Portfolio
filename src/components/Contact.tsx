import React, { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  Check, 
  Copy
} from 'lucide-react';
import { profileData } from '../data/profile';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './SocialIcons';

export const Contact: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSent, setIsSent] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    // Direct mailto trigger with pre-filled content
    const subject = encodeURIComponent(formState.subject || `Message from ${formState.name} via Portfolio`);
    const body = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`
    );
    window.location.href = `mailto:${profileData.email}?subject=${subject}&body=${body}`;
    setIsSent(true);
  };

  return (
    <section id="contact" className="py-20 border-t border-slate-200/60 dark:border-white/5 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent-500/10 px-3 py-1 text-xs font-semibold text-accent-600 dark:text-accent-400 mb-3">
            <Mail className="h-3.5 w-3.5" />
            <span>Direct Communication</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Get in touch with me anytime, through social media, e-mail
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Just a friendly reminder that the information provided here is for business and engineering discussions. If you have any inquiries regarding software development, backend engineering, or AI/ML roles, feel free to connect directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details Card (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl border border-slate-200/80 bg-white/70 p-6 sm:p-8 backdrop-blur-md dark:border-white/5 dark:bg-white/[0.02]">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
              Contact Channels
            </h3>

            {/* Email with copy */}
            <div className="mb-6 p-4 rounded-xl border border-slate-200/80 bg-slate-50/60 dark:border-white/5 dark:bg-white/[0.02]">
              <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">
                Direct Email
              </span>
              <div className="flex items-center justify-between gap-2">
                <a
                  href={`mailto:${profileData.email}`}
                  className="font-mono text-sm font-bold text-accent-600 dark:text-accent-400 hover:underline truncate"
                >
                  {profileData.email}
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:border-accent-500/50 hover:text-accent-600 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-300 dark:hover:text-accent-400 transition flex-shrink-0"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Location & Timezone */}
            <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300 mb-8">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900 dark:text-white block">Location</span>
                  <span>{profileData.location}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900 dark:text-white block">Timezone</span>
                  <span>{profileData.timezone}</span>
                </div>
              </div>
            </div>

            {/* Social Network Cards */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-3">
                Connect on Social Networks
              </span>
              <div className="grid grid-cols-3 gap-2">
                <a
                  href={profileData.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center rounded-xl border border-slate-200 p-3 text-slate-700 transition hover:border-blue-500/40 hover:bg-blue-50/50 hover:text-blue-600 dark:border-white/10 dark:text-slate-300 dark:hover:bg-blue-950/20 dark:hover:text-blue-400"
                >
                  <LinkedinIcon className="h-5 w-5 mb-1 text-blue-600" />
                  <span className="text-xs font-semibold">LinkedIn</span>
                </a>

                <a
                  href={profileData.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center rounded-xl border border-slate-200 p-3 text-slate-700 transition hover:border-slate-400 hover:bg-slate-100 hover:text-slate-900 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/[0.05] dark:hover:text-white"
                >
                  <GithubIcon className="h-5 w-5 mb-1" />
                  <span className="text-xs font-semibold">GitHub</span>
                </a>

                <a
                  href={profileData.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center rounded-xl border border-slate-200 p-3 text-slate-700 transition hover:border-slate-400 hover:bg-slate-100 hover:text-slate-900 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/[0.05] dark:hover:text-white"
                >
                  <TwitterIcon className="h-5 w-5 mb-1" />
                  <span className="text-xs font-semibold">X / Twitter</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-200/80 bg-white/70 p-6 sm:p-8 backdrop-blur-md dark:border-white/5 dark:bg-white/[0.02]">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Send a Direct Message
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6">
              Fill out this form to quickly open a pre-composed message in your email client.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="e.g. Jane Doe"
                    className="w-full rounded-xl border border-slate-200 bg-white/80 px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Your Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="jane@company.com"
                    className="w-full rounded-xl border border-slate-200 bg-white/80 px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  value={formState.subject}
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  placeholder="Software / Backend Engineering Opportunity"
                  className="w-full rounded-xl border border-slate-200 bg-white/80 px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Message *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Hi Rahul, we reviewed your projects and would love to discuss a potential opportunity..."
                  className="w-full rounded-xl border border-slate-200 bg-white/80 px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-white"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-xl bg-accent-600 px-6 py-3 text-xs font-bold text-white shadow-md shadow-accent-600/25 transition hover:bg-accent-700 active:scale-95"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Send Message via Email Client</span>
                </button>

                {isSent && (
                  <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <Check className="h-3.5 w-3.5" /> Email client triggered!
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
