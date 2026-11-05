import React, { useState } from 'react';
import { Layers, Award, ShieldCheck, ExternalLink, Copy, Check } from 'lucide-react';
import { skillCategories } from '../data/skills';
import { certificationsData } from '../data/certifications';
import { TechIcon } from './TechIcons';

export const DoodleToolChest: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Weapons' },
    { id: 'languages', label: 'Languages' },
    { id: 'backend', label: 'Backend & Systems' },
    { id: 'ai-ml', label: 'AI & Agents' },
    { id: 'databases', label: 'Databases' },
    { id: 'devops', label: 'Cloud & DevOps' },
  ];

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(code);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const allSkills = skillCategories.flatMap((cat) => cat.skills);

  const displayedSkills = activeCategory === 'all'
    ? allSkills
    : (skillCategories.find((cat) => cat.id === activeCategory)?.skills || []);

  return (
    <section id="stack" className="py-24 bg-white text-black border-b-2 border-black relative">
      <div className="content-wrapper max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 bg-black text-white px-3 py-1 rounded-md font-mono text-xs font-bold uppercase tracking-widest mb-3">
            <Layers className="h-3.5 w-3.5 text-amber-300" />
            <span>THE TOOL CHEST · WEAPONS OF CHOICE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-[1000] tracking-tight text-black uppercase leading-tight">
            Technical Arsenal
          </h2>
          <p className="mt-3 text-base text-black/75 leading-relaxed font-medium">
            Core languages, asynchronous microservices, vector search indices, and production deployment runtimes.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b-2 border-black">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl border-2 border-black font-mono text-xs font-bold transition-all ${
                activeCategory === cat.id
                  ? 'bg-black text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                  : 'bg-white text-black hover:bg-neutral-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-20">
          {displayedSkills.map((skill, idx) => (
            <div
              key={`${skill.name}-${idx}`}
              className="relative rounded-2xl border-2 border-black bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all"
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 border border-black/20 p-2 text-black">
                  <TechIcon name={skill.name.split(' ')[0]} className="h-5 w-5" />
                </div>
                {skill.proficiency && (
                  <span className="px-2 py-0.5 rounded bg-black text-white font-mono text-[9px] font-bold uppercase tracking-wider">
                    {skill.proficiency}
                  </span>
                )}
              </div>
              <h3 className="font-bold text-sm text-black leading-tight">{skill.name}</h3>
              {skill.tag && (
                <p className="mt-1 font-mono text-[10px] text-black/60 font-semibold truncate">
                  {skill.tag}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Certifications Vault */}
        <div className="pt-12 border-t-2 border-black">
          <div className="flex items-center gap-3 mb-8">
            <Award className="h-6 w-6 text-black" />
            <h3 className="text-2xl font-[1000] text-black uppercase tracking-tight">
              Formally Verified Credentials
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificationsData.map((cert) => (
              <div
                key={cert.id}
                className="flex flex-col justify-between rounded-2xl border-2 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-100 border border-black font-mono text-xs font-bold text-black">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      {cert.issuer === 'Amazon Web Services (AWS)' ? 'AWS' : cert.issuer}
                    </span>
                    <span className="font-mono text-[11px] font-bold text-black/60">{cert.category}</span>
                  </div>
                  <h4 className="font-bold text-base text-black leading-snug">{cert.title}</h4>
                  <p className="mt-2 text-xs text-black/75 leading-relaxed font-medium">{cert.description}</p>
                </div>

                <div className="mt-6 pt-4 border-t-2 border-black space-y-2.5">
                  {cert.credentialId && (
                    <div className="flex items-center justify-between rounded-lg bg-neutral-50 px-3 py-1.5 border border-black/30 font-mono text-xs">
                      <span className="truncate max-w-[170px] text-black/70">ID: {cert.credentialId}</span>
                      <button
                        onClick={() => handleCopyCode(cert.credentialId!)}
                        className="font-bold text-black hover:opacity-75 flex items-center gap-1"
                      >
                        {copiedId === cert.credentialId ? (
                          <><Check className="h-3 w-3 text-emerald-600" /><span className="text-emerald-600">Copied</span></>
                        ) : (
                          <><Copy className="h-3 w-3" /><span>Copy</span></>
                        )}
                      </button>
                    </div>
                  )}
                  <a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-1.5 py-2 rounded-xl bg-black text-white font-mono text-xs font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-neutral-800 transition"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
