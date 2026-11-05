import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReplicaHeader } from '../../components/replica/ReplicaHeader';
import { ReplicaDock } from '../../components/replica/ReplicaDock';
import { useSEO } from '../../hooks/useSEO';

interface SkillGroup {
  id: string;
  title: string;
  subtitle: string;
  bgColor: string;
  items: { name: string; role: string; tag?: string }[];
}

const skillGroups: SkillGroup[] = [
  {
    id: 'software-engineering',
    title: 'Software Engineering',
    subtitle: 'Languages, APIs & Microservices',
    bgColor: '#161A24',
    items: [
      { name: 'Python', role: 'Primary Language for Systems, ML & Automation', tag: 'Core' },
      { name: 'Java 17', role: 'Enterprise Services, Spring Boot 3.5 & Multithreading', tag: 'Core' },
      { name: 'Go Lang', role: 'Concurrent Microservices & Low-Latency Utilities', tag: 'Systems' },
      { name: 'TypeScript', role: 'Typed Full-Stack Applications & Contract Safety', tag: 'Advanced' },
      { name: 'SQL', role: 'Complex Analytical Queries, Windowing & Indexing', tag: 'Core' },
      { name: 'Spring Boot 3.5', role: 'Stateless JWT RBAC, Security & Production Microservices', tag: 'Enterprise' },
      { name: 'FastAPI', role: 'High-Throughput Asynchronous ASGI APIs & Pydantic Validation', tag: 'Async' },
      { name: 'Node.js & Express', role: 'Event-Driven Services & Middleware Pipelines', tag: 'Backend' },
    ],
  },
  {
    id: 'ai-ml',
    title: 'AI & ML',
    subtitle: 'Agentic Workflows & Retrieval Systems',
    bgColor: '#151F28',
    items: [
      { name: 'LangGraph & LangChain', role: 'Cyclic Multi-Agent State Machines & Tool Calling', tag: 'Agentic' },
      { name: 'Qdrant & ChromaDB', role: 'Dense HNSW Vector Search & High-Recall Retrieval', tag: 'Vector DB' },
      { name: 'RAG & Anti-Hallucination', role: 'Document Relevance Grading & Self-Correction Loops', tag: 'Architecture' },
      { name: 'OpenAI & Mistral APIs', role: 'Structured JSON Outputs, Tool Use & Model Routing', tag: 'LLM' },
      { name: 'Groq Whisper', role: 'Real-Time Low-Latency Voice Dictation Pipelines', tag: 'Voice AI' },
      { name: 'Transformers & HuggingFace', role: 'Bi-Encoder Embeddings & Intent Categorization', tag: 'NLP' },
    ],
  },
  {
    id: 'data',
    title: 'Data & Databases',
    subtitle: 'Storage, Querying & Visual Analytics',
    bgColor: '#181C26',
    items: [
      { name: 'PostgreSQL', role: 'Relational Schemas, Constraints & Complex Queries', tag: 'RDBMS' },
      { name: 'MySQL 9', role: 'Production Database Architecture & Normalization', tag: 'RDBMS' },
      { name: 'Redis', role: 'In-Memory Caching, Distributed Locking & Rate Limiting', tag: 'Cache' },
      { name: 'MongoDB', role: 'Document Collections, Flexible Schemas & Aggregations', tag: 'NoSQL' },
      { name: 'Plotly & Streamlit', role: 'Interactive Exploratory Dashboards & Visualizations', tag: 'Analytics' },
    ],
  },
  {
    id: 'cloud-tools',
    title: 'Cloud & Tools',
    subtitle: 'Infrastructure, Containers & DevOps',
    bgColor: '#1B1E22',
    items: [
      { name: 'Amazon Web Services (AWS)', role: 'Certified Cloud Practitioner · EC2, S3, IAM, VPC', tag: 'Certified' },
      { name: 'Microsoft Azure', role: 'Certified Azure Data Fundamentals & Cloud Compute', tag: 'Certified' },
      { name: 'Docker', role: 'Containerized Microservices & Predictable Reproducible Builds', tag: 'Containers' },
      { name: 'GitHub Actions & CI/CD', role: 'Automated Testing, Defect Triaging & Deployment Pipelines', tag: 'DevOps' },
      { name: 'Linux & Git', role: 'Shell Automation, Kernel Environment & Version Control', tag: 'Core' },
      { name: 'Vercel & Render', role: 'Edge Deployments, SPA Routing & Production Hosting', tag: 'Deploy' },
    ],
  },
];

export const ReplicaSkillsSection: React.FC = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Skills | Rahul Teja - Software Engineer',
    description: 'Technical competencies in Software Engineering, AI & ML, Data, and Cloud Infrastructure.',
    url: 'https://www.nrahulteja.me/skills',
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
            title="Skills"
            subtitle="Core Competencies"
            isProject={true}
          />
        </div>

        <div className="pointer-events-auto">
          <ReplicaDock />
        </div>
      </div>

      {/* 2. Right Main Column: Scrolling Stack of 4 Skill Category Containers */}
      <div className="w-full flex justify-end pt-20 pb-24 pr-[25.7rem] max-phone:pt-4 max-phone:px-4 max-phone:pr-4">
        <div className="w-[53.6rem] max-phone:w-full flex flex-col gap-[2.6rem]">
          {skillGroups.map((group, idx) => (
            <div
              key={group.id}
              className="w-full rounded-[32px] p-10 max-phone:p-6 text-white shadow-sm hover:shadow-lg transition-shadow flex flex-col justify-between"
              style={{ backgroundColor: group.bgColor }}
            >
              {/* Category Header */}
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div>
                  <span className="text-[1.1rem] font-mono tracking-widest uppercase text-white/50 block mb-1">
                    Category 0{idx + 1}
                  </span>
                  <h3 className="text-[2.6rem] max-phone:text-[2rem] font-bold text-white tracking-tight leading-tight">
                    {group.title}
                  </h3>
                  <p className="text-[1.3rem] text-white/70 pt-1 font-normal">
                    {group.subtitle}
                  </p>
                </div>
                <span className="text-[1.3rem] font-mono font-medium text-white/40">
                  {group.items.length} Skills
                </span>
              </div>

              {/* Skills List with Large Clean Typography */}
              <div className="py-6 flex flex-col gap-4">
                {group.items.map((item) => (
                  <div
                    key={item.name}
                    className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 flex items-center justify-between max-phone:flex-col max-phone:items-start max-phone:gap-1.5"
                  >
                    <div>
                      <div className="flex items-center gap-2.5">
                        <h4 className="text-[1.6rem] max-phone:text-[1.4rem] font-bold text-white">
                          {item.name}
                        </h4>
                        {item.tag && (
                          <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-[10px] font-mono text-white/80 border border-white/10">
                            {item.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-[1.2rem] text-white/60 font-normal pt-1">
                        {item.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[1.1rem] font-mono text-white/40">
                <span>Verified in Production & src/data</span>
                <span>Active</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
