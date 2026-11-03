import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  FileText, 
  ExternalLink, 
  ShieldCheck, 
  Award, 
  Copy, 
  Check 
} from 'lucide-react';
import { experienceData } from '../data/experience';
import { certificationsData } from '../data/certifications';

export const DoodleCredentialsWall: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const serviceLetterUrl = "https://drive.google.com/file/d/13vHdfLoxY705xedUs1SP6itxNkY2wXp-/view?usp=sharing";

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(code);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="credentials" className="py-24 bg-white text-black border-b-2 border-black relative notebook-paper">
      <div className="content-wrapper max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-100 border-2 border-black px-3 py-1 doodle-box-sm font-mono text-xs font-bold uppercase tracking-wider mb-3 shadow-[2px_2px_0px_0px_#000]">
            <Award className="h-3.5 w-3.5 text-emerald-800" />
            <span>COMMERCIAL TENURE & FORMAL CREDENTIALS</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-[1000] tracking-tight text-black uppercase leading-tight">
            Credentials Wall
          </h2>
          <p className="mt-3 text-base text-black/75 leading-relaxed font-medium">
            Commercial enterprise tenure at Virtusa Consulting Services Pvt. Ltd. alongside formal accreditations from Microsoft, AWS, and Anthropic.
          </p>
        </div>

        {/* Commercial Experience Card (Virtusa) */}
        <div className="mb-16">
          {experienceData.map((exp) => (
            <div
              key={exp.id}
              className="bg-white p-7 sm:p-10 doodle-box shadow-[6px_8px_0px_0px_#000] relative"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-black pb-6">
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-3xl font-[1000] text-black uppercase tracking-tight">
                      {exp.company}
                    </h3>
                    <span className="px-3 py-0.5 rounded-full border-2 border-black bg-emerald-100 font-mono text-xs font-bold text-black shadow-[2px_2px_0px_0px_#000]">
                      {exp.type}
                    </span>
                  </div>
                  <p className="text-lg font-bold text-black/80 mt-1">
                    {exp.role}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 font-mono text-xs font-bold text-black/70">
                  <span className="px-3 py-1 bg-neutral-100 border border-black rounded flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {exp.period}
                  </span>
                  <span className="px-3 py-1 bg-neutral-100 border border-black rounded flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    {exp.location}
                  </span>
                </div>
              </div>

              {/* Summary */}
              <p className="mt-6 text-base text-black/80 leading-relaxed font-medium">
                {exp.summary}
              </p>

              {/* Responsibilities */}
              <div className="mt-8 space-y-3">
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-black/60">
                  Key Engineering Contributions
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {exp.responsibilities.map((resp, idx) => (
                    <div 
                      key={idx}
                      className="p-3 bg-neutral-50 border border-black rounded-xl flex items-start gap-2.5 text-xs sm:text-sm font-medium text-black"
                    >
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Official Service Letter Card */}
              <div className="mt-8 p-5 bg-emerald-50 border-2 border-black doodle-box-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="h-6 w-6 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-sm text-black block">
                      Official Virtusa Service & Experience Letter
                    </span>
                    <p className="text-xs text-black/70 mt-0.5 font-medium">
                      Issued by Virtusa Consulting Services Pvt. Ltd. verifying tenure, designation, and project contributions.
                    </p>
                  </div>
                </div>

                <a
                  href={serviceLetterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-emerald-600 text-white font-mono text-xs font-bold doodle-btn shrink-0 flex items-center gap-1.5"
                >
                  <FileText className="h-3.5 w-3.5" />
                  <span>View Official Letter</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Verified Certifications Grid */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Award className="h-5 w-5 text-black" />
            <h3 className="text-2xl font-[1000] text-black uppercase tracking-tight">
              Verified Certifications Vault
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificationsData.map((cert) => (
              <div
                key={cert.id}
                className="bg-white p-6 doodle-box shadow-[4px_5px_0px_0px_#000] hover:shadow-[7px_8px_0px_0px_#000] hover:-translate-y-1 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 border border-black bg-neutral-100 font-mono text-xs font-bold text-black rounded">
                      {cert.issuer}
                    </span>
                    <span className="font-mono text-[11px] font-bold text-black/60">
                      {cert.category}
                    </span>
                  </div>

                  <h4 className="font-bold text-base text-black leading-snug">
                    {cert.title}
                  </h4>

                  <p className="mt-2 text-xs text-black/75 leading-relaxed font-medium">
                    {cert.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t-2 border-black space-y-2.5">
                  {cert.credentialId && (
                    <div className="flex items-center justify-between p-2 bg-neutral-50 border border-black rounded font-mono text-xs">
                      <span className="truncate max-w-[160px] text-black/70">
                        ID: {cert.credentialId}
                      </span>
                      <button
                        onClick={() => handleCopyCode(cert.credentialId!)}
                        className="font-bold text-black hover:opacity-75 flex items-center gap-1"
                      >
                        {copiedId === cert.credentialId ? (
                          <>
                            <Check className="h-3 w-3 text-emerald-600" />
                            <span className="text-emerald-600">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  <a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 bg-black text-white font-mono text-xs font-bold doodle-btn flex items-center justify-center gap-1.5"
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
