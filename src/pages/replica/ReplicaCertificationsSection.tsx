import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ReplicaHeader } from '../../components/replica/ReplicaHeader';
import { ReplicaDock } from '../../components/replica/ReplicaDock';
import { certificationsData } from '../../data/certifications';
import { getPaletteColor } from '../../utils/palette';
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

      {/* 2. Right Main Column: Scrolling Stack of Soft-Tinted Certification Containers */}
      <div className="w-full flex justify-end pt-20 pb-24 pr-[25.7rem] max-phone:pt-4 max-phone:px-4 max-phone:pr-4">
        <div className="w-[53.6rem] max-phone:w-full flex flex-col gap-[2.6rem]">
          {certificationsData.map((cert, idx) => {
            const tint = getPaletteColor(idx);

            return (
              <motion.a
                key={cert.id}
                href={cert.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Verify ${cert.title} in new tab`}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="w-full rounded-[32px] p-10 max-phone:p-6 shadow-sm hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 block cursor-pointer group"
                style={{ backgroundColor: tint }}
              >
                {/* Header row: Issuer badge + Verify link */}
                <div className="flex items-center justify-between pb-6 border-b border-light-black/10">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-light-black/70 group-hover:scale-125 transition-transform" />
                    <span className="text-[1.2rem] font-mono uppercase tracking-widest text-[#555555]">
                      {cert.issuer}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[1.2rem] font-mono text-[#555555] group-hover:text-light-black transition-colors">
                    <span>Verify</span>
                    <span className="text-[1.4rem]">↗</span>
                  </div>
                </div>

                {/* Body: Title and Description */}
                <div className="py-8">
                  <span className="text-[1.1rem] font-mono uppercase tracking-wider text-[#777777] block mb-2">
                    Credential 0{idx + 1} · {cert.category}
                  </span>
                  <h3 className="text-[2.4rem] max-phone:text-[1.8rem] font-bold text-light-black tracking-tight leading-tight">
                    {cert.title}
                  </h3>
                  <p className="text-[1.35rem] text-[#555555] pt-4 leading-relaxed font-normal">
                    {cert.description}
                  </p>
                </div>

                {/* Skills Tags */}
                {cert.skills && cert.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 pb-6">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-full bg-white/70 text-[1.1rem] font-mono text-light-black shadow-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                {/* Footer row */}
                <div className="pt-4 border-t border-light-black/10 flex items-center justify-between text-[1.1rem] font-mono text-[#777777]">
                  <span>{cert.credentialId ? `ID: ${cert.credentialId.slice(0, 16)}...` : 'Official Certificate'}</span>
                  <span>{cert.issueDate ? `Issued: ${cert.issueDate}` : 'Permanent Record'}</span>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </main>
  );
};
