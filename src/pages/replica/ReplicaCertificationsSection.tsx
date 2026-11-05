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

  const renderIssuerIcon = (issuer: string) => {
    if (issuer.includes('Microsoft')) {
      return (
        <div className="grid grid-cols-2 gap-0.5 w-4 h-4">
          <div className="w-1.5 h-1.5 bg-[#F25022] rounded-[1px]" />
          <div className="w-1.5 h-1.5 bg-[#7FBA00] rounded-[1px]" />
          <div className="w-1.5 h-1.5 bg-[#00A4EF] rounded-[1px]" />
          <div className="w-1.5 h-1.5 bg-[#FFB900] rounded-[1px]" />
        </div>
      );
    }
    if (issuer.includes('Amazon') || issuer.includes('AWS')) {
      return (
        <div className="w-4 h-4 rounded-full bg-[#FF9900] flex items-center justify-center text-[8px] font-bold text-white">
          A
        </div>
      );
    }
    return (
      <div className="w-4 h-4 rounded-full bg-[#1A1A1A] flex items-center justify-center text-[8px] font-bold text-white">
        ✦
      </div>
    );
  };

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

      {/* 2. Right Main Column: Upgraded Certification Containers */}
      <div className="w-full flex justify-end pt-20 pb-28 pr-[25.7rem] max-phone:pt-4 max-phone:px-4 max-phone:pr-4">
        <div className="w-[58rem] max-phone:w-full flex flex-col gap-[2.8rem]">
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
                className="w-full rounded-[36px] p-12 max-phone:p-7 shadow-sm hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 block cursor-pointer group"
                style={{ backgroundColor: tint }}
              >
                {/* Header Row: Issuer Badge with Brand Mark + Verify Pill */}
                <div className="flex items-center justify-between pb-6 border-b border-light-black/10">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-white/80 shadow-2xs flex items-center justify-center">
                      {renderIssuerIcon(cert.issuer)}
                    </div>
                    <div>
                      <span className="text-[1.25rem] font-mono uppercase tracking-widest text-light-black font-semibold block">
                        {cert.issuer}
                      </span>
                      <span className="text-[1.05rem] font-mono text-[#666666]">
                        {cert.category}
                      </span>
                    </div>
                  </div>

                  {/* Verify Action Pill */}
                  <div className="px-4 py-2 rounded-full bg-white shadow-xs group-hover:shadow-md flex items-center gap-2 text-[1.2rem] font-mono font-medium text-light-black group-hover:text-black transition-all">
                    <span>Verify</span>
                    <span className="text-[1.3rem] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
                  </div>
                </div>

                {/* Body: Title and Description */}
                <div className="py-8">
                  <span className="text-[1.1rem] font-mono uppercase tracking-wider text-[#666666] font-semibold block mb-2">
                    Credential 0{idx + 1}
                  </span>
                  <h3 className="text-[2.6rem] max-phone:text-[2.0rem] font-bold text-light-black tracking-tight leading-tight">
                    {cert.title}
                  </h3>
                  <p className="text-[1.4rem] max-phone:text-[1.2rem] text-[#444444] pt-4 leading-relaxed font-normal">
                    {cert.description}
                  </p>
                </div>

                {/* Skills Badges */}
                {cert.skills && cert.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2.5 pb-6">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3.5 py-1.5 rounded-full bg-white text-[1.15rem] max-phone:text-[1.05rem] font-mono text-light-black shadow-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                {/* Footer Metadata */}
                <div className="pt-5 border-t border-light-black/10 flex items-center justify-between text-[1.15rem] font-mono text-[#666666]">
                  <span>{cert.credentialId ? `ID: ${cert.credentialId.slice(0, 20)}...` : 'Official Certificate'}</span>
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
