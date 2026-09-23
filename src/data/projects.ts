export interface Project {
  id: string;
  title: string;
  category: 'Backend & APIs' | 'AI & LLM' | 'Full Stack' | 'Fintech';
  description: string;
  architectureDetails: string[];
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  isLive: boolean;
  featured: boolean;
  stats?: { label: string; value: string }[];
}

export const projectsData: Project[] = [
  {
    id: "gold-lending-platform",
    title: "Gold Lending Platform",
    category: "Fintech",
    description: "Full-stack fintech loan lifecycle platform automating digital KYC onboarding, live 75% LTV bullion calculator (8K-24K), collateral valuation modals, multi-role approval & disbursement, and offer decisioning.",
    architectureDetails: [
      "Engineered with Spring Boot 3.5 (Java 17) and stateless JWT Role-Based Access Control (RBAC).",
      "Dynamic 75% Loan-to-Value (LTV) calculation engine supporting 8K to 24K gold bullion appraisal.",
      "Reactive multi-stage loan origination workflow connecting borrower, appraiser, and loan manager.",
      "Modular Angular 20 frontend with Tailwind CSS and Angular Material, backed by MySQL 9 persistence."
    ],
    techStack: ["Spring Boot 3.5", "Java 17", "Angular 20", "MySQL 9", "Tailwind CSS", "JWT RBAC"],
    githubUrl: "https://github.com/rahul-1909/gold-lending-platform",
    liveUrl: "https://starfinance-app.vercel.app/login",
    isLive: true,
    featured: true,
    stats: [
      { label: "LTV Engine", value: "75% LTV" },
      { label: "Architecture", value: "Stateless RBAC" }
    ]
  },
  {
    id: "multi-agent-autonomous-rag",
    title: "Multi-Agent Autonomous RAG Engine",
    category: "AI & LLM",
    description: "Autonomous multi-agent RAG workflow engine powered by LangGraph, Qdrant vector database, and FastAPI. Implements self-correcting retrieval, document relevance grading, and anti-hallucination verification loops.",
    architectureDetails: [
      "Stateful LangGraph state machine orchestrating Router, Retriever, Grader, and Generator agents.",
      "Iterative self-correction loop that rewrites non-relevant queries and triggers fallback web searches.",
      "Dense vector search indexed over high-performance Qdrant cluster with cosine similarity scoring.",
      "Built with asynchronous FastAPI endpoints streaming telemetry and token execution traces."
    ],
    techStack: ["LangGraph", "Qdrant", "FastAPI", "Python", "OpenAI / Mistral", "Vector Search"],
    githubUrl: "https://github.com/rahul-1909/multi-agent-autonomous-rag-engine",
    liveUrl: "https://multi-agent-autonomous-rag-engine.onrender.com/",
    isLive: true,
    featured: true,
    stats: [
      { label: "Workflow", value: "LangGraph State Machine" },
      { label: "Vector DB", value: "Qdrant HNSW" }
    ]
  },
  {
    id: "nl-to-sql-converter",
    title: "Natural Language to SQL Analytics Copilot",
    category: "AI & LLM",
    description: "Next-gen Text-to-SQL analytics copilot with real-time voice dictation via Groq Whisper, hybrid data ingestion (SQLite demo, CSV auto-mapping, MySQL), and dynamic interactive Plotly visualizations.",
    architectureDetails: [
      "Real-time voice-to-text pipeline utilizing ultra-low latency Groq Whisper inference.",
      "Dynamic SQL parser and validator safeguarding against destructive DDL/DML injections.",
      "Multi-format database adapter supporting on-the-fly CSV ingestion, SQLite, and external MySQL connections.",
      "Interactive analytics dashboard built with Streamlit and Plotly generating instant automated charts."
    ],
    techStack: ["Python", "Groq Whisper", "FastAPI / Streamlit", "Plotly", "MySQL", "SQLite", "LLMs"],
    githubUrl: "https://github.com/rahul-1909/Natural-Language-to-SQL-Converter",
    liveUrl: "https://nl2sql-analytics.streamlit.app/",
    isLive: true,
    featured: true,
    stats: [
      { label: "Audio Transcribe", value: "Groq Whisper" },
      { label: "Output", value: "Dynamic Visualizations" }
    ]
  },
  {
    id: "linkedin-intelligence-api",
    title: "LinkedIn Profile Intelligence API",
    category: "Backend & APIs",
    description: "High-performance LinkedIn Profile Intelligence API built with FastAPI & Voyager REST engine. Extracts verified work history, education, skills, certifications, and media in clean structured JSON with an Apple Liquid Glass dashboard.",
    architectureDetails: [
      "High-throughput asynchronous FastAPI service implementing the Voyager REST extraction engine.",
      "Comprehensive data serialization with strict Pydantic schemas validating experiences, skills, and honors.",
      "Automated rate-limiting, session pooling, and transient error retry policies.",
      "Apple Liquid Glass minimalist frontend dashboard for real-time visual inspection and testing."
    ],
    techStack: ["FastAPI", "Python", "Pydantic", "Voyager REST", "REST APIs", "Modern UI"],
    githubUrl: "https://github.com/rahul-1909/LinkedIn-Profile-Intelligence-API",
    liveUrl: "https://linkedin-profile-intelligence-api.vercel.app/",
    isLive: true,
    featured: true,
    stats: [
      { label: "Framework", value: "FastAPI ASGI" },
      { label: "Data Format", value: "Strict Pydantic JSON" }
    ]
  },
  {
    id: "production-ai-customer-support-agent",
    title: "Production AI Support Agent (@AppleSupport)",
    category: "AI & LLM",
    description: "Enterprise conversational support system built on 2.8M customer interactions from Twitter. Features zero-regex semantic vector intent routing, ChromaDB dense retrieval over 10K verified turns, and safety guardrails.",
    architectureDetails: [
      "Dense bi-encoder embedding (all-MiniLM-L6-v2) for 9-class intent categorization without fragile regex.",
      "ChromaDB HNSW cosine index retrieving verified historical troubleshooting pairs within milliseconds.",
      "Deterministic safety and uncertainty guardrail deciding AUTO_HANDLE vs. ESCALATE_TO_HUMAN.",
      "Rigorous automated evaluation harness with human-judge statistical correlation proof (Spearman rho & Cohen kappa)."
    ],
    techStack: ["Python", "ChromaDB", "all-MiniLM-L6-v2", "Evaluation Harness", "Safety Guardrails"],
    githubUrl: "https://github.com/rahul-1909/Hiver_Assignment",
    isLive: false,
    featured: true,
    stats: [
      { label: "Dataset Scale", value: "2.81M Interactions" },
      { label: "Vector Index", value: "10,000 Turns" }
    ]
  },
  {
    id: "skillbridge-attendance-api",
    title: "SkillBridge Attendance Management API",
    category: "Backend & APIs",
    description: "Production-ready, multi-tenant educational attendance and cohort management API. Manages batches, classroom sessions, single-use secure invite tokens, strict IST attendance active windows, and live telemetry.",
    architectureDetails: [
      "Engineered with FastAPI, SQLAlchemy ORM, and Pydantic with PostgreSQL / SQLite compatibility.",
      "Dual-token architecture: Standard 24h JWT session token + scoped telemetry monitoring token.",
      "Granular multi-tenant RBAC: Student, Trainer, Institution Admin, Project Manager, and Monitoring Officer.",
      "Time-fenced session check-ins strictly validated against Indian Standard Time (IST) active windows."
    ],
    techStack: ["FastAPI", "SQLAlchemy", "Pydantic", "Dual JWT", "RBAC", "PostgreSQL"],
    githubUrl: "https://github.com/rahul-1909/skillbridge-attendance-management-api",
    liveUrl: "https://skillbridge-attendance-management-api.onrender.com/",
    isLive: true,
    featured: true,
    stats: [
      { label: "Security", value: "Dual JWT + RBAC" },
      { label: "Time Fence", value: "Strict IST Active Window" }
    ]
  }
];
