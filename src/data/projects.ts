export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  oneLineOutcome: string;
  architectureDetails: string[];
  techStack: string[];
  threeTags: string[];
  githubUrl: string;
  liveUrl?: string;
  isLive: boolean;
  isExternal?: boolean;
  coverImage: string;
  detailImages: string[];
  backgroundColor: string;
  featured?: boolean;
  stats?: { label: string; value: string }[];
}

export const projectsData: Project[] = [
  {
    id: "faultline-simulator",
    title: "Faultline Simulator",
    category: "Systems & Distributed Systems",
    description: "Deterministic discrete-event microservice failure simulation engine modeling cascading cascades and retry storms without physical infrastructure.",
    oneLineOutcome: "Deterministic virtual-time discrete-event simulator for microservice failure cascades, chaos injection, and distributed resilience modeling.",
    architectureDetails: [
      "Deterministic virtual-time event loop with microsecond resolution for reproducible failure cascades.",
      "Pluggable chaos injection engine: network latency jitter, asymmetric partitions, and packet drop distributions.",
      "Queue backpressure modeling with upstream gateway circuit-breaking and token-bucket rate limiting.",
      "Real-time topology dashboard visualizing service dependency graphs and tail latency distributions."
    ],
    techStack: ["C++17", "Go 1.23", "Python 3.12", "React 18", "Docker"],
    threeTags: ["C++17", "Go", "Distributed Systems"],
    githubUrl: "https://github.com/rahul-1909/faultline-simulator",
    liveUrl: "https://faultline-cvza.onrender.com/",
    isLive: true,
    coverImage: "/assets/projects/faultline-simulator-cover.webp",
    detailImages: [
      "/assets/projects/faultline-simulator-cover.webp",
      "/assets/projects/faultline-simulator-detail-1.webp"
    ],
    backgroundColor: "#E3E7EB", // slate
  },
  {
    id: "gold-lending-platform",
    title: "Star Finance - Gold Lending Platform",
    category: "Fintech & Enterprise Systems",
    description: "Full-stack fintech loan lifecycle platform with digital KYC, live 75% LTV bullion valuation, and multi-role disbursement.",
    oneLineOutcome: "Full-stack fintech loan lifecycle platform automating digital KYC onboarding, live 75% LTV bullion appraisal (8K-24K), and multi-role approval.",
    architectureDetails: [
      "Stateless Spring Security filter chain with role-based JWT access control across Customer, Appraiser, and Admin.",
      "Real-time bullion valuation engine calculating statutory 75% LTV across 8K–24K purity scales.",
      "Multi-stage loan origination workflow linking KYC document inspection to disbursement reconciliation.",
      "Relational database schema normalized with strict transactional integrity constraints in MySQL 9.1."
    ],
    techStack: ["Spring Boot 3.5", "Java 17", "Angular 20", "MySQL 9.1", "Tailwind CSS", "JWT RBAC"],
    threeTags: ["Spring Boot 3.5", "Angular 20", "MySQL 9.1"],
    githubUrl: "https://github.com/rahul-1909/gold-lending-platform",
    liveUrl: "https://starfinance-app.vercel.app/",
    isLive: true,
    coverImage: "/assets/projects/gold-lending-platform-cover.webp",
    detailImages: [
      "/assets/projects/gold-lending-platform-cover.webp",
      "/assets/projects/gold-lending-platform-detail-1.webp"
    ],
    backgroundColor: "#E9E8E3", // sand
  },
  {
    id: "nexusai",
    title: "NexusAI - Multi-Agent Autonomous RAG Engine",
    category: "AI & Retrieval Systems",
    description: "Enterprise Corrective RAG (CRAG) and Self-RAG state graph with dynamic document grading and self-correction loops.",
    oneLineOutcome: "Autonomous Corrective RAG (CRAG) state machine built with LangGraph, Qdrant vector search, and dynamic relevance grading loops.",
    architectureDetails: [
      "Stateful LangGraph DAG orchestrating Router, Retriever, Grader, and Generator agents.",
      "Dynamic document relevance grading filtering hallucinated or ungrounded context chunks.",
      "Iterative self-correction query reformulation loop triggering fallback web search when retrieval confidence drops.",
      "Asynchronous FastAPI endpoints streaming telemetry and token execution traces."
    ],
    techStack: ["LangGraph", "Qdrant Vector DB", "FastAPI", "Python 3.11", "FastEmbed", "Groq LPU"],
    threeTags: ["LangGraph", "Qdrant", "FastAPI"],
    githubUrl: "https://github.com/rahul-1909/NexusAI",
    liveUrl: "https://multi-agent-autonomous-rag-engine.onrender.com/",
    isLive: true,
    coverImage: "/assets/projects/nexusai-cover.webp",
    detailImages: [
      "/assets/projects/nexusai-cover.webp",
      "/assets/projects/nexusai-detail-1.webp"
    ],
    backgroundColor: "#E4E9E3", // sage
  },
  {
    id: "convolens-ai-qa",
    title: "ConvoLens - AI Agent Quality & Failure Taxonomy",
    category: "AI Systems & Observability",
    description: "Automated dialogue evaluation and 7-layer root-cause taxonomy platform for voice and chat AI agents.",
    oneLineOutcome: "Automated quality evaluation and root-cause failure taxonomy platform for enterprise conversational AI agents with zero-trust PII masking.",
    architectureDetails: [
      "Automated evaluation of 100% dialogue turns against enterprise rubric (compliance, hallucination, speech layer).",
      "Zero-trust PII redaction pipeline sanitizing customer financial data prior to LLM judge evaluation.",
      "HDBSCAN density-based clustering identifying recurring failure patterns across millions of conversation turns.",
      "7-layer root-cause attribution mapping conversation breakdowns to prompt, retrieval, model, or ASR layers."
    ],
    techStack: ["FastAPI", "Python 3.11", "Pydantic v2", "PostgreSQL", "pgvector", "Claude 3.5", "HDBSCAN"],
    threeTags: ["FastAPI", "PostgreSQL", "Claude 3.5"],
    githubUrl: "https://github.com/rahul-1909/convolens-ai-qa",
    liveUrl: "https://convolens-ai-qa-phi.vercel.app/",
    isLive: true,
    coverImage: "/assets/projects/convolens-ai-qa-cover.webp",
    detailImages: [
      "/assets/projects/convolens-ai-qa-cover.webp",
      "/assets/projects/convolens-ai-qa-detail-1.webp"
    ],
    backgroundColor: "#E7E5EC", // lilac
  },
  {
    id: "skillbridge-attendance-management-api",
    title: "SkillBridge - Attendance Management API",
    category: "Backend & Systems",
    description: "Multi-tenant educational cohort management API with server-authoritative IST active windows and dual-token security.",
    oneLineOutcome: "Multi-tenant vocational attendance and cohort tracking API engineered with strict IST time fences and dual-token security credentials.",
    architectureDetails: [
      "Cryptographically random single-use invite tokens preventing proxy attendance and link sharing.",
      "Server-authoritative Indian Standard Time (IST) active window verification eliminating client clock manipulation.",
      "Dual-token architecture: standard JWT user session + scoped read-only token for external compliance auditing.",
      "PostgreSQL schema optimized for multi-tenant batch and cohort aggregation queries."
    ],
    techStack: ["FastAPI", "SQLAlchemy 2.0", "Pydantic", "PostgreSQL", "Docker", "Multi-tenant RBAC"],
    threeTags: ["FastAPI", "SQLAlchemy", "PostgreSQL"],
    githubUrl: "https://github.com/rahul-1909/skillbridge-attendance-management-api",
    liveUrl: "https://skillbridge-attendance-management-api.onrender.com/",
    isLive: true,
    coverImage: "/assets/projects/skillbridge-attendance-management-api-cover.webp",
    detailImages: [
      "/assets/projects/skillbridge-attendance-management-api-cover.webp",
      "/assets/projects/skillbridge-attendance-management-api-detail-1.webp"
    ],
    backgroundColor: "#EDE7E2", // clay
  },
  {
    id: "explore-more-projects",
    title: "Explore More Projects",
    category: "Open Source Archive",
    description: "Explore all 22 public repositories spanning Backend Systems, AI/ML agentic pipelines, and full-stack platforms on GitHub.",
    oneLineOutcome: "Browse all 22 public repositories, microservices, and system experiments on GitHub.",
    architectureDetails: [
      "Full open-source catalogue of software engineering, distributed systems, and AI workflows.",
      "Regularly maintained repositories with automated CI test suites and live deployments."
    ],
    techStack: ["GitHub", "Open Source", "CI/CD", "22 Repositories"],
    threeTags: ["GitHub", "Open Source", "22 Repos"],
    githubUrl: "https://github.com/rahul-1909?tab=repositories",
    liveUrl: "https://github.com/rahul-1909?tab=repositories",
    isLive: true,
    isExternal: true,
    coverImage: "/assets/projects/explore-more-cover.webp",
    detailImages: [
      "/assets/projects/explore-more-cover.webp"
    ],
    backgroundColor: "#E3E7EB", // slate
  }
];
