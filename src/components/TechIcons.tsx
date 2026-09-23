import React from 'react';
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiC,
  SiCplusplus,
  SiHtml5,
  SiCss,
  SiGnubash,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiDjango,
  SiFlask,
  SiFastapi,
  SiSpringboot,
  SiTensorflow,
  SiPytorch,
  SiScikitlearn,
  SiOpencv,
  SiNumpy,
  SiPandas,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiFirebase,
  SiRedis,
  SiDocker,
  SiGit,
  SiGithub,
  SiVercel,
  SiJupyter,
  SiPostman,
  SiStreamlit,
  SiHuggingface,
  SiLangchain,
  SiAnthropic,
  SiQdrant,
  SiFigma
} from 'react-icons/si';
import { FaJava, FaLinux, FaAws } from 'react-icons/fa';
import { VscAzure, VscVscode } from 'react-icons/vsc';
import { BiBarChartAlt2 } from 'react-icons/bi';

interface TechIconProps {
  name: string;
  className?: string;
}

export const TechIcon: React.FC<TechIconProps> = ({ name, className = "h-7 w-7 sm:h-8 sm:w-8" }) => {
  const norm = name.toLowerCase().trim();

  switch (norm) {
    case 'python':
      return <SiPython className={className} />;
    case 'javascript':
    case 'js':
      return <SiJavascript className={className} />;
    case 'typescript':
    case 'ts':
      return <SiTypescript className={className} />;
    case 'java':
      return <FaJava className={className} />;
    case 'c':
      return <SiC className={className} />;
    case 'c++':
    case 'cpp':
      return <SiCplusplus className={className} />;
    case 'html':
    case 'html5':
      return <SiHtml5 className={className} />;
    case 'css':
    case 'css3':
      return <SiCss className={className} />;
    case 'bash':
      return <SiGnubash className={className} />;
    case 'react':
      return <SiReact className={className} />;
    case 'next.js':
    case 'nextjs':
      return <SiNextdotjs className={className} />;
    case 'tailwind':
    case 'tailwindcss':
      return <SiTailwindcss className={className} />;
    case 'node.js':
    case 'nodejs':
      return <SiNodedotjs className={className} />;
    case 'django':
      return <SiDjango className={className} />;
    case 'flask':
      return <SiFlask className={className} />;
    case 'fastapi':
      return <SiFastapi className={className} />;
    case 'spring boot':
    case 'spring':
      return <SiSpringboot className={className} />;
    case 'tensorflow':
      return <SiTensorflow className={className} />;
    case 'pytorch':
      return <SiPytorch className={className} />;
    case 'scikit-learn':
      return <SiScikitlearn className={className} />;
    case 'opencv':
      return <SiOpencv className={className} />;
    case 'langchain':
      return <SiLangchain className={className} />;
    case 'langgraph':
      return <SiLangchain className={className} />;
    case 'qdrant':
      return <SiQdrant className={className} />;
    case 'numpy':
      return <SiNumpy className={className} />;
    case 'pandas':
      return <SiPandas className={className} />;
    case 'mysql':
      return <SiMysql className={className} />;
    case 'postgresql':
    case 'postgres':
      return <SiPostgresql className={className} />;
    case 'mongodb':
      return <SiMongodb className={className} />;
    case 'firebase':
      return <SiFirebase className={className} />;
    case 'redis':
      return <SiRedis className={className} />;
    case 'docker':
      return <SiDocker className={className} />;
    case 'azure':
      return <VscAzure className={className} />;
    case 'git':
      return <SiGit className={className} />;
    case 'github':
      return <SiGithub className={className} />;
    case 'linux':
      return <FaLinux className={className} />;
    case 'aws':
      return <FaAws className={className} />;
    case 'vs code':
    case 'vscode':
      return <VscVscode className={className} />;
    case 'vercel':
      return <SiVercel className={className} />;
    case 'jupyter':
      return <SiJupyter className={className} />;
    case 'postman':
      return <SiPostman className={className} />;
    case 'figma':
      return <SiFigma className={className} />;
    case 'power bi':
      return <BiBarChartAlt2 className={className} />;
    case 'streamlit':
      return <SiStreamlit className={className} />;
    case 'hugging face':
    case 'huggingface':
      return <SiHuggingface className={className} />;
    case 'claude ai':
    case 'anthropic':
      return <SiAnthropic className={className} />;
    default:
      return <SiPython className={className} />;
  }
};
