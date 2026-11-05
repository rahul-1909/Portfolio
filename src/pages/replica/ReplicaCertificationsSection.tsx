import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReplicaHeader } from '../../components/replica/ReplicaHeader';
import { ReplicaDock } from '../../components/replica/ReplicaDock';
import { certificationsData } from '../../data/certifications';
import { useSEO } from '../../hooks/useSEO';

export const ReplicaCertificationsSection: React.FC = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Certifications | Rahul Teja - Software Engineer',
    description: 'Verified professional certifications from Microsoft, Amazon Web Services, and Anthropic.',
    url: 'https://www.nrahulteja.me/certifications',
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        navigate('/');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return (
    <main className="relative min-h-screen w-full bg-light-grey text-light-black overflow-x-hidden select-none">
      {/* 1. Left Column: Vertically Centered Title & Dock */}
      <div className="fixed top-0 left-[25.7rem] h-screen w-[42rem] flex flex-col justify-center items-start gap-[2.4rem] z-40 pointer-events-none max-phone:static max-phone:h-auto max-phone:w-full max-phone:px-6 max-phone:pt-10 max-phone:pb-6 max-phone:left-0 max-phone:items-center max-phone:text-center">
        <div className="pointer-events-auto">
          <ReplicaHeader
            title="Certifications"
            subtitle="Verified Credentials"
            isProject={true}
          />
        </div>

        <div className="pointer-events-auto">
          <ReplicaDock />
        </div>
      </div>

      {/* 2. Right Main Column: Scrolling Stack of 6 Certification Containers */}
      <div className="w-full flex justify-end pt-20 pb-24 pr-[25.7rem] max-phone:pt-4 max-phone:px-4 max-phone:pr-4">
        <div className="w-[53.6rem] max-phone:w-full flex flex-col gap-[2.6rem]">
          {certificationsData.map((cert, idx) => (
            <a
              key={cert.id}
              href={cert.verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Verify ${cert.title} in new tab`}
              className="w-full rounded-[32px] p-10 max-phone:p-6 bg-[#1A1E24] text-white shadow-sm hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 block cursor-pointer group border border-white/5"
            >
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-400 group-hover:scale-125 transition-transform" />
                  <span className="text-[1.2rem] font-mono uppercase tracking-widest text-white/70">
                    {cert.issuer}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[1.2rem] font-mono text-white/50 group-hover:text-white transition-colors">
                  <span>Verify</span>
                  <span className="text-[1.4rem]">↗</span>
                </div>
              </div>

              <div className="py-8">
                <span className="text-[1.1rem] font-mono uppercase tracking-wider text-white/40 block mb-2">
                  Credential 0{idx + 1} · {cert.category}
                </span>
                <h3 className="text-[2.4rem] max-phone:text-[1.8rem] font-bold text-white tracking-tight leading-tight group-hover:text-blue-200 transition-colors">
                  {cert.title}
                </h3>
                <p className="text-[1.3rem] text-white/70 pt-4 leading-relaxed font-normal">
                  {cert.description}
                </p>
              </div>

              {cert.skills && cert.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 pb-6">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full bg-white/10 text-[1.1rem] font-mono text-white/80 border border-white/10"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[1.1rem] font-mono text-white/40">
                <span>{cert.credentialId ? `ID: ${cert.credentialId.slice(0, 16)}...` : 'Official Certificate'}</span>
                <span>{cert.issueDate ? `Issued: ${cert.issueDate}` : 'Permanent Record'}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
};
