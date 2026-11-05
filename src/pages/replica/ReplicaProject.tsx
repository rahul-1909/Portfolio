import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import { ReplicaHeader } from '../../components/replica/ReplicaHeader';
import { ReplicaDock } from '../../components/replica/ReplicaDock';
import { replicaProjects } from '../../data/replicaData';

export const ReplicaProject: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [showInfo, setShowInfo] = useState(false);

  const project = replicaProjects.find((p) => p.id === projectId);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="relative min-h-screen w-full bg-light-grey text-light-black pb-24">
      {/* Dynamic Header */}
      <ReplicaHeader
        title={project.title}
        subtitle={project.date}
        isProject={true}
      />

      {/* Main Content Area: Right-aligned media & sections layout */}
      <div className="w-full flex justify-end pt-28 px-8 max-phone:pt-[8rem] max-phone:px-4">
        <div className="w-[58rem] max-phone:w-full flex flex-col gap-12">
          {/* Hero Video / Image */}
          <div
            className="w-full h-[38rem] max-phone:h-[26rem] overflow-hidden bg-[#EAEAEA] shadow-md"
            style={{ borderRadius: 32 }}
          >
            {project.videoUrl ? (
              <video
                src={project.videoUrl}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
                style={{ borderRadius: 32 }}
              />
            ) : project.imageUrl ? (
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover"
                style={{ borderRadius: 32 }}
              />
            ) : (
              <div className="w-full h-full bg-[#EAEAEA]" />
            )}
          </div>

          {/* External Link */}
          {project.websiteUrl && (
            <div className="flex justify-end">
              <a
                href={project.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white text-light-black text-sm font-medium shadow-sm hover:scale-105 transition-transform"
              >
                <span>Visit Live Platform</span>
                <ArrowUpRight className="w-4 h-4 text-grey" />
              </a>
            </div>
          )}

          {/* Narrative Sections */}
          <div className="flex flex-col gap-10">
            {project.sections.map((section, idx) => (
              <section
                key={idx}
                className="p-8 rounded-[24px] bg-white/70 backdrop-blur-sm border border-border-light flex flex-col gap-4"
              >
                <h2 className="text-xl font-bold text-light-black">
                  {section.title || `Section 0${idx + 1}`}
                </h2>
                <p className="text-base text-grey leading-relaxed whitespace-pre-line">
                  {section.body}
                </p>

                {section.video && section.video !== project.videoUrl && (
                  <div className="mt-4 overflow-hidden rounded-[20px] h-[26rem] bg-[#EAEAEA]">
                    <video
                      src={section.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </section>
            ))}
          </div>
        </div>
      </div>

      {/* Slide-over Project Info Drawer */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ type: 'spring', stiffness: 240, damping: 24 }}
            className="fixed top-28 left-8 z-50 w-[32rem] p-6 rounded-[24px] bg-white shadow-2xl border border-border-light"
          >
            <div className="flex items-center justify-between pb-3 border-b border-border-light">
              <h3 className="font-bold text-lg text-light-black">Project Details</h3>
              <button
                onClick={() => setShowInfo(false)}
                className="p-1.5 rounded-full hover:bg-light-grey text-grey hover:text-light-black transition-colors"
                aria-label="Close project details"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col gap-4 py-4 text-sm">
              <div>
                <span className="text-xs uppercase tracking-wider text-grey block">Project</span>
                <span className="font-semibold text-light-black">{project.title}</span>
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-grey block">Category</span>
                <span className="font-medium text-light-black">{project.date}</span>
              </div>
              {project.websiteUrl && (
                <div>
                  <span className="text-xs uppercase tracking-wider text-grey block">Platform Link</span>
                  <a
                    href={project.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-light-black underline truncate block"
                  >
                    {project.websiteUrl}
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Floating Dock */}
      <ReplicaDock
        isProject={true}
        onToggleProjectInfo={() => setShowInfo(!showInfo)}
        isProjectInfoOpen={showInfo}
      />
    </main>
  );
};
