import React from 'react';
import { 
  SiPython, 
  SiFastapi, 
  SiSpringboot, 
  SiTypescript, 
  SiReact, 
  SiNextdotjs, 
  SiTailwindcss, 
  SiDocker 
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';

export const TechStackStrip: React.FC = () => {
  const tools = [
    { name: 'Python', icon: SiPython, hoverColor: 'hover:text-[#3776AB]', title: 'Python' },
    { name: 'FastAPI', icon: SiFastapi, hoverColor: 'hover:text-[#009688]', title: 'FastAPI' },
    { name: 'Spring Boot', icon: SiSpringboot, hoverColor: 'hover:text-[#6DB33F]', title: 'Spring Boot' },
    { name: 'TypeScript', icon: SiTypescript, hoverColor: 'hover:text-[#3178C6]', title: 'TypeScript' },
    { name: 'React', icon: SiReact, hoverColor: 'hover:text-[#61DAFB]', title: 'React' },
    { name: 'Next.js', icon: SiNextdotjs, hoverColor: 'hover:text-black dark:hover:text-white', title: 'Next.js' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, hoverColor: 'hover:text-[#06B6D4]', title: 'Tailwind CSS' },
    { name: 'AWS', icon: FaAws, hoverColor: 'hover:text-[#FF9900]', title: 'Amazon Web Services' },
    { name: 'Docker', icon: SiDocker, hoverColor: 'hover:text-[#2496ED]', title: 'Docker' },
  ];

  return (
    <div className="mt-14 sm:mt-20">
      <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#38bdf8]">
        TECH STACK & TOOLS
      </p>
      
      <ul className="flex flex-wrap items-center gap-4 sm:gap-6 text-slate-400 dark:text-slate-500">
        {tools.map((tool, idx) => {
          const Icon = tool.icon;
          return (
            <React.Fragment key={tool.name}>
              {idx === 7 && (
                <li>
                  <div className="h-5 w-px bg-slate-300 dark:bg-slate-700" />
                </li>
              )}
              <li title={tool.title}>
                <div className={`transition-all duration-200 cursor-pointer hover:scale-125 ${tool.hoverColor}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </li>
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
};
