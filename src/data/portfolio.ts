import { projectsData } from './projects';
import { profileData } from './profile';
import { experienceData } from './experience';
import { certificationsData } from './certifications';

export interface FormattedProject {
  id: string;
  title: string;
  category: string;
  summary: string;
  architectureDetails: string[];
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  isLive: boolean;
  hasLiveScreenshot: boolean;
  imageUrl?: string;
  stats?: { label: string; value: string }[];
}

// 5 Selected Projects with live screenshot or clean typographic card mapping
export const selectedProjects: FormattedProject[] = [
  {
    id: "gold-lending-platform",
    title: "Gold Lending Platform",
    category: "Fintech",
    summary: projectsData.find(p => p.id === "gold-lending-platform")?.description || "",
    architectureDetails: projectsData.find(p => p.id === "gold-lending-platform")?.architectureDetails || [],
    techStack: projectsData.find(p => p.id === "gold-lending-platform")?.techStack || [],
    githubUrl: "https://github.com/rahul-1909/gold-lending-platform",
    liveUrl: "https://starfinance-app.vercel.app/login",
    isLive: true,
    hasLiveScreenshot: true,
    imageUrl: "/assets/projects/gold-lending-platform.webp",
    stats: projectsData.find(p => p.id === "gold-lending-platform")?.stats,
  },
  {
    id: "multi-agent-autonomous-rag",
    title: "Multi-Agent Autonomous RAG Engine",
    category: "AI & LLM",
    summary: projectsData.find(p => p.id === "multi-agent-autonomous-rag")?.description || "",
    architectureDetails: projectsData.find(p => p.id === "multi-agent-autonomous-rag")?.architectureDetails || [],
    techStack: projectsData.find(p => p.id === "multi-agent-autonomous-rag")?.techStack || [],
    githubUrl: "https://github.com/rahul-1909/multi-agent-autonomous-rag-engine",
    liveUrl: "https://multi-agent-autonomous-rag-engine.onrender.com/",
    isLive: true,
    hasLiveScreenshot: true,
    imageUrl: "/assets/projects/multi-agent-autonomous-rag.webp",
    stats: projectsData.find(p => p.id === "multi-agent-autonomous-rag")?.stats,
  },
  {
    id: "nl-to-sql-converter",
    title: "Natural Language to SQL Analytics Copilot",
    category: "AI & LLM",
    summary: projectsData.find(p => p.id === "nl-to-sql-converter")?.description || "",
    architectureDetails: projectsData.find(p => p.id === "nl-to-sql-converter")?.architectureDetails || [],
    techStack: projectsData.find(p => p.id === "nl-to-sql-converter")?.techStack || [],
    githubUrl: "https://github.com/rahul-1909/Natural-Language-to-SQL-Converter",
    liveUrl: "https://nl2sql-analytics.streamlit.app/",
    isLive: false, // Streamlit live url returns 303 redirect loop; rendered as clean typographic card on #EAEAEA
    hasLiveScreenshot: false,
    imageUrl: undefined,
    stats: projectsData.find(p => p.id === "nl-to-sql-converter")?.stats,
  },
  {
    id: "linkedin-intelligence-api",
    title: "LinkedIn Profile Intelligence API",
    category: "Backend & APIs",
    summary: projectsData.find(p => p.id === "linkedin-intelligence-api")?.description || "",
    architectureDetails: projectsData.find(p => p.id === "linkedin-intelligence-api")?.architectureDetails || [],
    techStack: projectsData.find(p => p.id === "linkedin-intelligence-api")?.techStack || [],
    githubUrl: "https://github.com/rahul-1909/LinkedIn-Profile-Intelligence-API",
    liveUrl: "https://linkedin-profile-intelligence-api.vercel.app/",
    isLive: true,
    hasLiveScreenshot: true,
    imageUrl: "/assets/projects/linkedin-intelligence-api.webp",
    stats: projectsData.find(p => p.id === "linkedin-intelligence-api")?.stats,
  },
  {
    id: "production-ai-customer-support-agent",
    title: "Production AI Support Agent (@AppleSupport)",
    category: "AI & LLM",
    summary: projectsData.find(p => p.id === "production-ai-customer-support-agent")?.description || "",
    architectureDetails: projectsData.find(p => p.id === "production-ai-customer-support-agent")?.architectureDetails || [],
    techStack: projectsData.find(p => p.id === "production-ai-customer-support-agent")?.techStack || [],
    githubUrl: "https://github.com/rahul-1909/Hiver_Assignment",
    liveUrl: undefined,
    isLive: false, // No live URL; rendered as clean typographic card on #EAEAEA
    hasLiveScreenshot: false,
    imageUrl: undefined,
    stats: projectsData.find(p => p.id === "production-ai-customer-support-agent")?.stats,
  },
];

// Profile & Socials Data
export const personalInfo = {
  name: "Rahul Teja",
  role: "Software Developer",
  bio: profileData.bio,
  aboutHighlights: profileData.aboutHighlights,
  location: "Hyderabad, India",
  email: "nallarahulteja@gmail.com",
  // TODO: Replace with live resume PDF link when hosted
  resumeUrl: "#resume",
  socials: {
    linkedin: "https://www.linkedin.com/in/nallarahulteja/",
    twitter: "https://x.com/Knightswatch__",
    github: "https://github.com/rahul-1909",
    email: "mailto:nallarahulteja@gmail.com",
  },
};

// Virtusa Experience
export const experience = experienceData;

// Certifications
export const certifications = certificationsData;

// Skill categories grouped as: Languages, Backend, AI & ML, Databases, Cloud & Tools
export const groupedSkills = [
  {
    name: "Languages",
    skills: ["Python", "Java", "Go Lang", "JavaScript", "TypeScript", "SQL", "HTML5 & CSS3"],
  },
  {
    name: "Backend",
    skills: ["FastAPI", "Spring Boot 3.5", "Node.js & Express", "Django & Flask", "RESTful API Design", "Microservices", "JWT & RBAC"],
  },
  {
    name: "AI & ML",
    skills: ["LangChain & LangGraph", "Vector Databases (Qdrant, ChromaDB)", "RAG & Anti-Hallucination", "OpenAI & Mistral APIs", "Prompt Engineering", "Voice AI (Groq Whisper)"],
  },
  {
    name: "Databases",
    skills: ["PostgreSQL", "MySQL 9", "MongoDB", "Redis", "SQLite"],
  },
  {
    name: "Cloud & Tools",
    skills: ["Amazon Web Services (AWS)", "Microsoft Azure", "Google Cloud (GCP)", "Docker", "GitHub Actions & CI/CD", "Vercel & Render"],
  },
];
