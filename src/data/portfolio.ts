import { projectsData } from './projects';
import { profileData } from './profile';
import { experienceData } from './experience';
import { certificationsData } from './certifications';

export type DeckType = 'projects' | 'skills' | 'certifications';

export interface ProjectCardData {
  id: string;
  title: string;
  category: string;
  summary: string;
  oneLineOutcome: string;
  architectureDetails: string[];
  techStack: string[];
  threeTags: string[];
  githubUrl: string;
  liveUrl?: string;
  isLive: boolean;
  hasLiveScreenshot: boolean;
  imageUrl?: string;
  backgroundColor: string;
  stats?: { label: string; value: string }[];
}

export interface SkillCardData {
  id: string;
  title: string;
  category: string;
  mandate: string;
  skills: string[];
  threeTags: string[];
  backgroundColor: string;
}

export interface CertificationCardData {
  id: string;
  title: string;
  issuer: string;
  category: string;
  verificationUrl: string;
  skills: string[];
  threeTags: string[];
  backgroundColor: string;
}

export type DeckCardItem = ProjectCardData | SkillCardData | CertificationCardData;

// 1. Projects Deck (5 cards)
export const projectsDeck: ProjectCardData[] = [
  {
    id: "gold-lending-platform",
    title: "Gold Lending Platform",
    category: "Fintech",
    summary: projectsData.find(p => p.id === "gold-lending-platform")?.description || "",
    oneLineOutcome: "Automated digital bullion financing engine with live 75% LTV valuation and 15-minute instant disbursal.",
    architectureDetails: projectsData.find(p => p.id === "gold-lending-platform")?.architectureDetails || [],
    techStack: projectsData.find(p => p.id === "gold-lending-platform")?.techStack || [],
    threeTags: ["Spring Boot 3.5", "Angular 20", "MySQL 9"],
    githubUrl: "https://github.com/rahul-1909/gold-lending-platform",
    liveUrl: "https://starfinance-app.vercel.app/customer/dashboard",
    isLive: true,
    hasLiveScreenshot: true,
    imageUrl: "/assets/projects/gold-lending-platform.webp",
    backgroundColor: "#EBEAE5",
    stats: projectsData.find(p => p.id === "gold-lending-platform")?.stats,
  },
  {
    id: "multi-agent-autonomous-rag",
    title: "Multi-Agent Autonomous RAG Engine",
    category: "AI & LLM",
    summary: projectsData.find(p => p.id === "multi-agent-autonomous-rag")?.description || "",
    oneLineOutcome: "Autonomous multi-agent LangGraph state machine with self-correcting retrieval and anti-hallucination verification loops.",
    architectureDetails: projectsData.find(p => p.id === "multi-agent-autonomous-rag")?.architectureDetails || [],
    techStack: projectsData.find(p => p.id === "multi-agent-autonomous-rag")?.techStack || [],
    threeTags: ["LangGraph", "Qdrant", "FastAPI"],
    githubUrl: "https://github.com/rahul-1909/multi-agent-autonomous-rag-engine",
    liveUrl: "https://multi-agent-autonomous-rag-engine.onrender.com/",
    isLive: true,
    hasLiveScreenshot: true,
    imageUrl: "/assets/projects/multi-agent-autonomous-rag.webp",
    backgroundColor: "#E5E8EC",
    stats: projectsData.find(p => p.id === "multi-agent-autonomous-rag")?.stats,
  },
  {
    id: "nl-to-sql-converter",
    title: "Natural Language to SQL Analytics Copilot",
    category: "AI & LLM",
    summary: projectsData.find(p => p.id === "nl-to-sql-converter")?.description || "",
    oneLineOutcome: "Zero-injection voice dictation Text-to-SQL copilot generating real-time interactive Plotly dashboards.",
    architectureDetails: projectsData.find(p => p.id === "nl-to-sql-converter")?.architectureDetails || [],
    techStack: projectsData.find(p => p.id === "nl-to-sql-converter")?.techStack || [],
    threeTags: ["Groq Whisper", "FastAPI", "Plotly"],
    githubUrl: "https://github.com/rahul-1909/Natural-Language-to-SQL-Converter",
    liveUrl: "https://nl2sql-analytics.streamlit.app/",
    isLive: false,
    hasLiveScreenshot: false,
    imageUrl: undefined,
    backgroundColor: "#E4EAE8",
    stats: projectsData.find(p => p.id === "nl-to-sql-converter")?.stats,
  },
  {
    id: "linkedin-intelligence-api",
    title: "LinkedIn Profile Intelligence API",
    category: "Backend & APIs",
    summary: projectsData.find(p => p.id === "linkedin-intelligence-api")?.description || "",
    oneLineOutcome: "High-throughput asynchronous Voyager REST engine extracting verified career history into validated JSON schemas.",
    architectureDetails: projectsData.find(p => p.id === "linkedin-intelligence-api")?.architectureDetails || [],
    techStack: projectsData.find(p => p.id === "linkedin-intelligence-api")?.techStack || [],
    threeTags: ["FastAPI", "Voyager REST", "Pydantic"],
    githubUrl: "https://github.com/rahul-1909/LinkedIn-Profile-Intelligence-API",
    liveUrl: "https://linkedin-profile-intelligence-api.vercel.app/",
    isLive: true,
    hasLiveScreenshot: true,
    imageUrl: "/assets/projects/linkedin-intelligence-api.webp",
    backgroundColor: "#E4E6EA",
    stats: projectsData.find(p => p.id === "linkedin-intelligence-api")?.stats,
  },
  {
    id: "production-ai-customer-support-agent",
    title: "Production AI Support Agent (@AppleSupport)",
    category: "AI & LLM",
    summary: projectsData.find(p => p.id === "production-ai-customer-support-agent")?.description || "",
    oneLineOutcome: "Semantic intent classifier & ChromaDB vector retriever trained on 2.81M interactions with automated safety guardrails.",
    architectureDetails: projectsData.find(p => p.id === "production-ai-customer-support-agent")?.architectureDetails || [],
    techStack: projectsData.find(p => p.id === "production-ai-customer-support-agent")?.techStack || [],
    threeTags: ["Python", "ChromaDB", "all-MiniLM-L6-v2"],
    githubUrl: "https://github.com/rahul-1909/Hiver_Assignment",
    liveUrl: undefined,
    isLive: false,
    hasLiveScreenshot: false,
    imageUrl: undefined,
    backgroundColor: "#E8E8E8",
    stats: projectsData.find(p => p.id === "production-ai-customer-support-agent")?.stats,
  },
];

// 2. Skills Deck (4 cards: Software Engineering, AI/ML, Data, Cloud and Tools)
export const skillsDeck: SkillCardData[] = [
  {
    id: "software-engineering",
    title: "Software Engineering",
    category: "Core Stack",
    mandate: "Architecting high-throughput distributed APIs, concurrent services, and enterprise domain systems.",
    skills: ["Python", "Java", "Go Lang", "TypeScript", "JavaScript", "SQL", "Spring Boot 3.5", "FastAPI", "Node.js", "RESTful APIs", "JWT & RBAC"],
    threeTags: ["Python · Java · Go", "Spring Boot", "FastAPI"],
    backgroundColor: "#181A22",
  },
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    category: "Autonomous Systems",
    mandate: "Building multi-agent state machines, dense semantic vector retrieval, and deterministic safety guardrails.",
    skills: ["LangGraph", "LangChain", "Qdrant Vector DB", "ChromaDB", "RAG & Anti-Hallucination", "OpenAI / Mistral APIs", "Groq Whisper", "Prompt Engineering"],
    threeTags: ["LangGraph State", "Qdrant / Chroma", "Multi-Agent RAG"],
    backgroundColor: "#1E182A",
  },
  {
    id: "data",
    title: "Data & Storage",
    category: "Persistence & Analytics",
    mandate: "Engineering relational schema integrity, low-latency in-memory caching, and automated analytical telemetry.",
    skills: ["PostgreSQL", "MySQL 9", "MongoDB", "Redis Caching", "SQLite", "Plotly Analytics", "Streamlit"],
    threeTags: ["PostgreSQL", "MySQL 9", "Redis Cache"],
    backgroundColor: "#16201E",
  },
  {
    id: "cloud-and-tools",
    title: "Cloud and Tools",
    category: "DevOps & Delivery",
    mandate: "Deploying containerized microservices with automated CI/CD testing pipelines and high-availability cloud infrastructure.",
    skills: ["Amazon Web Services (AWS)", "Microsoft Azure", "Google Cloud (GCP)", "Docker", "GitHub Actions & CI/CD", "Linux", "Git", "Vercel & Render"],
    threeTags: ["AWS & Azure", "Docker", "CI/CD Pipelines"],
    backgroundColor: "#161E28",
  },
];

// 3. Certifications Deck (6 typographic cards)
export const certificationsDeck: CertificationCardData[] = [
  {
    id: "ms-mlops-engineer",
    title: "Machine Learning Operations Engineer Associate",
    issuer: "Microsoft Certified",
    category: "AI & MLOps",
    verificationUrl: "https://learn.microsoft.com/api/credentials/share/en-us/rahulteja-1992/351C672DE3DD3551?sharingId=20CEC5EF6DDD8E56",
    skills: ["MLOps Pipelines", "Azure ML", "Model Deployment", "CI/CD Monitoring"],
    threeTags: ["Microsoft", "MLOps Associate", "Azure ML"],
    backgroundColor: "#15222E",
  },
  {
    id: "ms-sql-ai-developer",
    title: "SQL AI Developer Associate",
    issuer: "Microsoft Certified",
    category: "Data & SQL AI",
    verificationUrl: "https://learn.microsoft.com/api/credentials/share/en-us/rahulteja-1992/B7191AAF49134FC8?sharingId=20CEC5EF6DDD8E56",
    skills: ["SQL AI", "Vector Search", "Data Pipelines", "Semantic Indexing"],
    threeTags: ["Microsoft", "SQL AI Developer", "Vector Search"],
    backgroundColor: "#16202A",
  },
  {
    id: "ms-azure-data-fundamentals",
    title: "Azure Data Fundamentals",
    issuer: "Microsoft Certified",
    category: "Cloud Data",
    verificationUrl: "https://learn.microsoft.com/api/credentials/share/en-us/rahulteja-1992/FEDB73DCFCA7E3E0?sharingId=20CEC5EF6DDD8E56",
    skills: ["Azure Data", "Relational SQL", "Cosmos DB", "ETL / ELT"],
    threeTags: ["Microsoft", "Azure Data", "Cloud DB"],
    backgroundColor: "#182028",
  },
  {
    id: "aws-cloud-practitioner",
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services (AWS)",
    category: "Cloud Architecture",
    verificationUrl: "https://www.certmetrics.com/amazon/public/verification.aspx",
    skills: ["AWS Cloud", "IAM & Security", "VPC & EC2", "High Availability"],
    threeTags: ["AWS", "Cloud Practitioner", "Infrastructure"],
    backgroundColor: "#261E14",
  },
  {
    id: "anthropic-claude-101",
    title: "Claude 101",
    issuer: "Anthropic",
    category: "LLM & Prompting",
    verificationUrl: "https://verify.skilljar.com/c/dsermfpyca5o",
    skills: ["Claude 3.5", "Prompt Engineering", "Context Windows", "Function Calling"],
    threeTags: ["Anthropic", "Claude 3.5", "Prompt Eng"],
    backgroundColor: "#241818",
  },
  {
    id: "anthropic-ai-fluency",
    title: "AI Fluency: Framework & Foundations",
    issuer: "Anthropic",
    category: "AI Strategy",
    verificationUrl: "https://verify.skilljar.com/",
    skills: ["AI Frameworks", "Multi-Modal Reasoning", "Safety Principles"],
    threeTags: ["Anthropic", "AI Fluency", "Foundations"],
    backgroundColor: "#1E221E",
  },
];

// Profile & Socials Data
export const personalInfo = {
  name: "Rahul Teja",
  role: "Software Engineer",
  headline: "Rahul Teja | Software Engineer - Backend, AI/ML & Data",
  metaDescription: "Portfolio of Rahul Teja, a Software Engineer focused on Backend Engineering, Scalable Distributed Systems, and AI/ML architectures in Hyderabad.",
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

// Experience
export const experience = experienceData;

// Certifications
export const certifications = certificationsData;

// Grouped Skills for About page
export const groupedSkills = [
  {
    name: "Software Engineering",
    skills: ["Python", "Java", "Go Lang", "JavaScript", "TypeScript", "SQL", "Spring Boot 3.5", "FastAPI", "Node.js", "REST APIs", "JWT & RBAC"],
  },
  {
    name: "AI & ML",
    skills: ["LangGraph", "LangChain", "Qdrant Vector DB", "ChromaDB", "RAG & Anti-Hallucination", "OpenAI / Mistral APIs", "Prompt Engineering", "Voice AI (Groq Whisper)"],
  },
  {
    name: "Data",
    skills: ["PostgreSQL", "MySQL 9", "MongoDB", "Redis", "SQLite", "Plotly", "Streamlit"],
  },
  {
    name: "Cloud and Tools",
    skills: ["Amazon Web Services (AWS)", "Microsoft Azure", "Google Cloud (GCP)", "Docker", "GitHub Actions & CI/CD", "Linux", "Git", "Vercel & Render"],
  },
];
