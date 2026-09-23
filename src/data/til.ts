export interface TILEntry {
  id: string;
  date: string;
  topic: string;
  summary: string;
  keyTakeaway: string;
  tags: string[];
  projectRef?: {
    name: string;
    url: string;
  };
}

export const tilEntries: TILEntry[] = [
  {
    id: "langgraph-cycles",
    date: "September 2026",
    topic: "Cyclic State Machines in LangGraph for Self-Correcting RAG",
    summary: "Standard linear RAG pipelines fail when retrieved chunks have low topical relevance or ambiguity. Implementing cyclic conditional edges in LangGraph allows an autonomous 'Grader' agent to inspect chunks before response synthesis. If irrelevant, the query is rewritten and routed to fallback search.",
    keyTakeaway: "Treating agentic workflows as state machines with validation cycles prevents over 85% of downstream hallucination.",
    tags: ["LangGraph", "RAG", "Agentic AI", "Python"],
    projectRef: {
      name: "Multi-Agent Autonomous RAG Engine",
      url: "https://github.com/rahul-1909/multi-agent-autonomous-rag-engine"
    }
  },
  {
    id: "biencoder-classification",
    date: "August 2026",
    topic: "Zero-Regex Semantic Intent Routing with Centroid Bi-Encoders",
    summary: "Keyword-based regex matching for enterprise customer support is brittle and breaks on colloquial phrasing. By computing dense vector embeddings (all-MiniLM-L6-v2) and measuring cosine similarity against precomputed class centroid vectors with temperature-scaled softmax, intent routing scales with sub-10ms latency.",
    keyTakeaway: "Precomputed cluster centroids deliver deep semantic classification speed comparable to static lookup tables.",
    tags: ["NLP", "Vector Search", "ChromaDB", "Python"],
    projectRef: {
      name: "Production AI Support Agent (@AppleSupport)",
      url: "https://github.com/rahul-1909/Hiver_Assignment"
    }
  },
  {
    id: "spring-boot-rbac",
    date: "July 2026",
    topic: "Stateless SecurityFilterChain & JWT RBAC in Spring Boot 3.5",
    summary: "Spring Security 6+ deprecates WebSecurityConfigurerAdapter in favor of functional SecurityFilterChain beans. Enforcing stateless session management alongside custom OncePerRequestFilter guarantees that roles (Borrower, Appraiser, Manager) are evaluated purely off cryptographic claims without server-side session overhead.",
    keyTakeaway: "Stateless JWT validation combined with method-level @PreAuthorize ensures deterministic role isolation for sensitive endpoints.",
    tags: ["Spring Boot 3.5", "Java 17", "RBAC", "Security"],
    projectRef: {
      name: "Gold Lending Platform",
      url: "https://github.com/rahul-1909/gold-lending-platform"
    }
  },
  {
    id: "text-to-sql-ast",
    date: "May 2026",
    topic: "AST-Level Validation Guardrails for Natural Language to SQL",
    summary: "LLMs generating raw SQL present serious prompt injection and destructive query risks (e.g. DROP, TRUNCATE, UPDATE). Validating generated queries using sqlglot AST parsing ensures that only read-only SELECT trees targeting permissible schema tables are allowed to execute.",
    keyTakeaway: "Never trust LLM SQL output directly; always validate queries into Abstract Syntax Trees before dispatching to connections.",
    tags: ["Text-to-SQL", "AST Parsing", "Database Security", "FastAPI"],
    projectRef: {
      name: "Natural Language to SQL Converter",
      url: "https://github.com/rahul-1909/Natural-Language-to-SQL-Converter"
    }
  },
  {
    id: "dual-token-telemetry",
    date: "March 2026",
    topic: "Dual-Token Architecture for Real-Time Telemetry Streaming",
    summary: "When monitoring officers need passive read-only attendance metrics without administrative impersonation powers, issuance of scoped telemetry tokens (`typ=monitoring`, `scope=read`) segregated from user authentication tokens avoids privilege escalation and isolates websocket/event bandwidth.",
    keyTakeaway: "Segregating operational telemetry tokens prevents security credential leakage during dashboard monitoring sessions.",
    tags: ["FastAPI", "JWT", "Telemetry", "Architecture"],
    projectRef: {
      name: "SkillBridge Attendance API",
      url: "https://github.com/rahul-1909/skillbridge-attendance-management-api"
    }
  }
];
