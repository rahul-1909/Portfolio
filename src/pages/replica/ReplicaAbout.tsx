import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail } from 'lucide-react';
import { replicaAbout } from '../../data/replicaData';

export const ReplicaAbout: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main
      data-about-page=""
      className="relative min-h-screen w-full bg-light-grey text-light-black pb-[18rem] max-phone:pb-[12rem] select-none"
    >
      {/* Top Header & Navigation Section */}
      <div className="pt-[18rem] max-phone:pt-[6rem] pl-[25.7rem] pr-[25.7rem] max-phone:px-[4.4rem]">
        <div className="flex items-start justify-between max-phone:flex-col max-phone:items-center max-phone:gap-12">
          {/* Left: Brand Header + Back & Social Pills */}
          <div className="flex flex-col gap-6 max-phone:items-center max-phone:text-center">
            {/* Header Title */}
            <div>
              <h1 className="text-h1 max-phone:text-h1-mobile font-bold text-light-black tracking-normal leading-[1.08]">
                {replicaAbout.title}
              </h1>
              <p className="text-h1 max-phone:text-h1-mobile font-normal text-grey tracking-normal leading-[1.08] mt-1">
                {replicaAbout.role}
              </p>
            </div>

            {/* Navigation & Social Action Pills Row (Directly Below Title) */}
            <div className="flex items-center gap-[0.8rem] pt-2">
              {/* Back to Home Button (Black circular pill) */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/')}
                className="h-[5.4rem] w-[5.4rem] rounded-full bg-light-black text-white flex items-center justify-center shadow-md cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-black"
                aria-label="Back to Home"
              >
                <ArrowLeft className="w-[1.6rem] h-[1.6rem]" />
              </motion.button>

              {/* Email Pill */}
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={replicaAbout.socials.email}
                className="h-[5.4rem] w-[5.4rem] rounded-full bg-white text-light-black flex items-center justify-center shadow-sm hover:shadow transition-shadow cursor-pointer"
                aria-label="Send Email"
              >
                <Mail className="w-[1.6rem] h-[1.6rem]" />
              </motion.a>

              {/* X / Twitter Pill */}
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={replicaAbout.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="h-[5.4rem] w-[5.4rem] rounded-full bg-white text-light-black flex items-center justify-center shadow-sm hover:shadow transition-shadow font-bold text-base cursor-pointer"
                aria-label="Twitter / X"
              >
                <span>𝕏</span>
              </motion.a>

              {/* LinkedIn Pill */}
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={replicaAbout.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="h-[5.4rem] w-[5.4rem] rounded-full bg-white text-light-black flex items-center justify-center shadow-sm hover:shadow transition-shadow font-bold text-xs cursor-pointer"
                aria-label="LinkedIn"
              >
                <span>in</span>
              </motion.a>
            </div>
          </div>

          {/* Right: 3D Travel Globe Feature */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-[21.4rem] h-[21.4rem] overflow-hidden rounded-full cursor-pointer hover:scale-105 transition-transform duration-300">
              <img
                src="/images/about-globe.png"
                alt="Travel globe"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-xs text-grey tracking-wider font-medium">
              Click to travel
            </span>
          </div>
        </div>

        {/* Narrative & Recognitions Body */}
        <div className="w-[57.1rem] max-phone:w-full flex flex-col gap-16 mt-28 max-phone:mt-16">
          {/* Intro Paragraphs */}
          <section className="flex flex-col gap-8 text-[1.6rem] max-phone:text-[1.4rem] leading-[1.45] tracking-normal">
            <p className="font-normal text-grey">
              <span className="font-bold text-light-black">Award-winning UX Designer</span>, turning business goals, user needs, and messy problems into interfaces that feel obvious.
            </p>

            <p className="text-grey font-normal">
              After studying at <a href="https://www.gobelins-school.com/" target="_blank" rel="noopener noreferrer" className="font-bold text-light-black hover:opacity-75 transition-opacity">Gobelins</a>, I worked alongside sharp designers and developers at <a href="https://locomotive.ca/en" target="_blank" rel="noopener noreferrer" className="font-bold text-light-black hover:opacity-75 transition-opacity">Locomotive</a> &amp; <a href="https://immersive-g.com/" target="_blank" rel="noopener noreferrer" className="font-bold text-light-black hover:opacity-75 transition-opacity">Immersive Garden</a>, crafting impactful websites.
            </p>
          </section>

          {/* Recognitions & Awards */}
          <section className="flex flex-col gap-6 pt-6 border-t border-border-light">
            <h2 className="text-[1.8rem] font-bold text-light-black">
              {replicaAbout.recognitionsTitle}
            </h2>

            <div className="flex flex-col divide-y divide-border-light text-[1.4rem] max-phone:text-[1.2rem]">
              {replicaAbout.recognitions.map((item, idx) => (
                <div
                  key={idx}
                  className="py-4 flex items-center justify-between"
                >
                  <span className="font-bold text-light-black w-1/3">
                    {item.award}
                  </span>
                  <span className="text-grey w-1/2">
                    {item.work}
                  </span>
                  <span className="font-mono text-grey text-right w-1/6">
                    {item.year}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Credits / Colophon */}
          <section className="pt-6 border-t border-border-light text-[1.2rem] text-grey">
            <p>Design &amp; Development by Gabriel Beaugonin — Paris, FR</p>
          </section>
        </div>
      </div>
    </main>
  );
};
