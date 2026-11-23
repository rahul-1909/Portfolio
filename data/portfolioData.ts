// Generated portfolio data from Prismic live repository

export interface ProjectSection {
  section_title: string;
  subtitle?: string;
  body: string;
  image: string | null;
  video_url: string | null;
  mobile_video_url: string | null;
  live_url?: string | null;
  repo_url?: string | null;
  tech?: string;
  role?: string;
  timeline?: string;
  location?: string;
  badge?: string;
  responsibilities?: string[];
  stack?: string[];
}

export interface Project {
  id: string;
  title: string;
  date: string;
  websiteUrl: string | null;
  thumbnail: string;
  sections: ProjectSection[];
}

export interface DestinationPhoto {
  image: string;
  link?: any;
}

export interface Destination {
  id: string;
  airport_code: string;
  name: string;
  photos: DestinationPhoto[];
}

export interface AboutData {
  intro: string[];
  recognitionsTitle: string;
  recognitions: string[];
  final: string[];
  credits: string[];
}

export const projects: Project[] = [
  {
    id: "experience",
    title: "Experience",
    date: "Career & Roles",
    websiteUrl: null,
    thumbnail: "/images/projet01.f4282e02.png",
    sections: [
      {
        section_title: "Virtusa",
        subtitle: "Software Developer Intern",
        badge: "Mandate · Enterprise Software",
        role: "Software Developer Intern",
        timeline: "Aug 2025 – Jun 2026",
        location: "Chennai, India",
        body: "Contributed to backend and core software development at Virtusa as a Software Developer Intern, architecting scalable enterprise microservices, designing RESTful data contracts, and optimizing high-concurrency systems to ensure 99.9% operational reliability across production workflows.",
        responsibilities: [
          "Engineered high-throughput backend services and RESTful APIs using Python and TypeScript adhering to clean architecture, decoupled domain patterns, and OpenAPI contracts.",
          "Architected relational database schemas and optimized complex SQL queries in PostgreSQL, eliminating N+1 query bottlenecks and establishing strict transaction isolation.",
          "Integrated generative AI pipelines, LLM orchestration via LangChain, and RAG retrieval architectures to automate enterprise analytical workflows.",
          "Integrated CI/CD automated test workflows and Dockerized local development environments for predictable, zero-downtime production staging.",
          "Participated in active debugging, structured peer code reviews, defect triaging, and system performance profiling to maintain high software reliability."
        ],
        stack: [
          "Software Development",
          "Backend APIs",
          "Full-Stack",
          "Python",
          "TypeScript",
          "Databases & SQL",
          "Git / GitHub",
          "CI/CD",
          "Docker",
          "LLM Integration",
          "RAG Systems"
        ],
        image: null,
        video_url: null,
        mobile_video_url: null
      }
    ]
  },
  {
    id: "projects",
    title: "Projects",
    date: "Selected Works",
    websiteUrl: "https://multi-agent-autonomous-rag-engine.onrender.com/",
    thumbnail: "/images/projet01.f4282e02.png",
    sections: [
      {
        section_title: "NexusAI",
        subtitle: "Corrective Multi-Agent RAG Engine",
        tech: "LangGraph · Qdrant · FastAPI · Docker · Groq LPU",
        live_url: "https://multi-agent-autonomous-rag-engine.onrender.com/",
        repo_url: "https://github.com/rahul-1909/NexusAI",
        body: "An autonomous corrective multi-agent RAG engine that searches, evaluates document relevance, corrects hallucinations, and synthesizes grounded answers using dynamic LangGraph DAG workflows and hybrid vector search.\n\nKEY ARCHITECTURE & HIGHLIGHTS\n\n1. Autonomous multi-agent coordination with LangGraph DAG workflows and state persistence.\n2. Hybrid retrieval combining dense vector embeddings with sparse keyword search in Qdrant.\n3. Dynamic grading agents that evaluate retrieved document relevance before answering.\n4. Hallucination correction and fallback web search loop when knowledge confidence is low.\n5. Production-ready FastAPI microservice containerized with Docker and Groq LPU inference.",
        image: null,
        video_url: null,
        mobile_video_url: null
      },
      {
        section_title: "Faultline Simulator",
        subtitle: "Distributed Systems Chaos & Event Simulator",
        tech: "C++17 · Go · Python · React 18 · Redpanda / Kafka",
        live_url: "https://faultline-cvza.onrender.com/",
        repo_url: "https://github.com/rahul-1909/faultline-simulator",
        body: "High-performance distributed systems chaos and discrete-event simulation engine modeling network partitions, node crashes, split-brain scenarios, and consensus failover with real-time telemetry.\n\nKEY ARCHITECTURE & HIGHLIGHTS\n\n1. High-throughput discrete-event simulation engine engineered in C++17 and Go.\n2. Models real-world network partitions, asymmetric latency spikes, packet loss, and node jitter.\n3. Simulates distributed consensus algorithms (Raft, Paxos) under active Byzantine faults.\n4. Real-time telemetry streaming via Redpanda / Kafka event pipelines into a React 18 dashboard.\n5. Automated resilience scoring and post-mortem failure analytics reports.",
        image: null,
        video_url: null,
        mobile_video_url: null
      },
      {
        section_title: "QueryAI",
        subtitle: "Text-to-SQL Analytics Copilot",
        tech: "Python · LangChain · Streamlit · Plotly · MySQL",
        live_url: "https://nl2sql-analytics.streamlit.app/",
        repo_url: "https://github.com/rahul-1909/Natural-Language-to-SQL-Converter",
        body: "Enterprise-grade natural language analytics engine translating complex conversational queries and Groq Whisper voice dictation into optimized SQL with schema-aware validation and auto-generated Plotly visualizations.\n\nKEY ARCHITECTURE & HIGHLIGHTS\n\n1. Voice-enabled natural language to SQL translation powered by Groq Whisper and LLM reasoning.\n2. Dynamic schema introspection and foreign-key graph traversal for complex multi-table JOINs.\n3. Automated SQL security sandbox preventing destructive queries and enforcing injection guards.\n4. Interactive data visualization engine generating dynamic Plotly charts from query result sets.\n5. Conversational memory and interactive query refinement for iterative analytical exploration.",
        image: null,
        video_url: null,
        mobile_video_url: null
      },
      {
        section_title: "ConvoLens AI",
        subtitle: "Voice & Chat Agent QA & Root-Cause Discovery",
        tech: "Python 3.11 · FastAPI · Pydantic v2 · HDBSCAN · LLM-as-a-Judge",
        live_url: "https://convolens-ai-qa-phi.vercel.app/",
        repo_url: "https://github.com/rahul-1909/convolens-ai-qa",
        body: "Automated QA and observability platform for conversational AI. Evaluates thousands of transcripts with multi-dimensional rubrics, HDBSCAN topic clustering, and unsupervised root-cause failure discovery.\n\nKEY ARCHITECTURE & HIGHLIGHTS\n\n1. Multi-dimensional evaluation rubrics (coherence, politeness, goal completion, policy compliance).\n2. LLM-as-a-Judge scoring engine with structured Pydantic v2 validation and confidence scoring.\n3. HDBSCAN unsupervised clustering to automatically identify emerging failure topics across conversations.\n4. Automated Root Cause Analysis (RCA) generating actionable developer remediation summaries.\n5. High-concurrency FastAPI async processing pipeline with interactive analytics dashboards.",
        image: null,
        video_url: null,
        mobile_video_url: null
      },
      {
        section_title: "Radar-AI",
        subtitle: "Autonomous AI Quality & Release Intelligence Platform",
        tech: "Next.js 16 · Selenium Chromium · Newman · LangGraph",
        live_url: "https://github.com/rahul-1909/Radar-AI",
        repo_url: "https://github.com/rahul-1909/Radar-AI",
        body: "Autonomous AI testing platform orchestrating dynamic test plans across web, API, and UI layers with self-healing selectors, parallel test execution, and generative release risk analysis.\n\nKEY ARCHITECTURE & HIGHLIGHTS\n\n1. Autonomous test generation converting user stories and OpenAPI specs into executable test suites.\n2. Self-healing DOM selectors powered by AI vision and heuristic element matching.\n3. Distributed test runner orchestrating headless Chromium and Newman API collections in parallel.\n4. Predictive release risk scoring evaluating regression probability before production deployments.\n5. Comprehensive visual regression detection and automated flaky test quarantining.",
        image: null,
        video_url: null,
        mobile_video_url: null
      },
      {
        section_title: "Star Finance",
        subtitle: "Gold & Silver Loan Management System",
        tech: "Java 17 · Spring Boot 3.5 · Angular 20 · MySQL 9.1 · Tailwind CSS",
        live_url: "https://github.com/rahul-1909/gold-lending-platform",
        repo_url: "https://github.com/rahul-1909/gold-lending-platform",
        body: "Enterprise lending platform managing gold and silver collateralized loans, automated interest schedules, pledge inventory valuations, multi-factor authentication, and audited repayment tracking.\n\nKEY ARCHITECTURE & HIGHLIGHTS\n\n1. Robust domain-driven banking architecture built on Java 17 and Spring Boot 3.5.\n2. Real-time collateral appraisal engine computing LTV (Loan-to-Value) against live market bullion rates.\n3. Automated interest compounding, overdue grace periods, and amortization schedule calculators.\n4. Secure role-based access control (RBAC), multi-factor authentication, and immutable audit logs.\n5. Modern, responsive Angular 20 SPA styled with Tailwind CSS for high-volume cashier operations.",
        image: null,
        video_url: null,
        mobile_video_url: null
      },
      {
        section_title: "Explore All Repositories",
        subtitle: "22+ Open-Source Projects & Research Systems",
        tech: "GitHub · Open Source · CI/CD · Microservices",
        live_url: "https://github.com/rahul-1909?tab=repositories",
        repo_url: "https://github.com/rahul-1909?tab=repositories",
        body: "Explore Rahul Teja's complete open-source engineering portfolio across 22+ GitHub repositories, spanning generative AI multi-agent workflows, low-latency microservices, distributed consensus simulators, enterprise banking platforms, and autonomous test engines.\n\nFEATURED REPOSITORIES & SYSTEMS\n\n1. Multi-Agent AI & Corrective RAG Systems (LangGraph, Qdrant, Groq LPU).\n2. High-Performance Distributed Systems & Chaos Simulators (C++17, Go, Kafka).\n3. Enterprise Full-Stack Microservices (Java 17, Spring Boot, Angular, FastAPI).\n4. Voice Dictation & Text-to-SQL Copilots with Automated Sandboxing.\n5. Click anywhere on this card to open all repositories on GitHub.",
        image: null,
        video_url: null,
        mobile_video_url: null
      }
    ]
  },
  {
    id: "skills",
    title: "Skills",
    date: "Technical Expertise",
    websiteUrl: null,
    thumbnail: "/images/projet01.f4282e02.png",
    sections: [
      {
        section_title: "Core Languages & Systems",
        body: "Python, TypeScript, Java 17, Go Lang, SQL, Spring Boot 3.5, FastAPI, LangGraph, Qdrant, RAG, PostgreSQL, MySQL 9, Docker, AWS, Azure.",
        image: null,
        video_url: null,
        mobile_video_url: null
      },
      {
        section_title: "AI Architecture & Infrastructure",
        body: "PyTorch, LangChain, Redis, Kubernetes, Apache Kafka, C++ 17, Next.js, React, Linux, Git, Hugging Face, MongoDB, GraphQL, NGINX, GitHub Actions.",
        image: null,
        video_url: null,
        mobile_video_url: null
      },
      {
        section_title: "Data Engineering & Tooling",
        body: "Google Cloud, Ollama, Snowflake, Pinecone, Postman, Tailwind CSS, Vite.",
        image: null,
        video_url: null,
        mobile_video_url: null
      }
    ]
  },
  {
    id: "certifications",
    title: "Certifications",
    date: "Credentials & Honors",
    websiteUrl: "https://learn.microsoft.com/en-us/users/rahulteja-1992/credentials/351c672de3dd3551",
    thumbnail: "/images/projet01.f4282e02.png",
    sections: [
      {
        section_title: "Microsoft Certified: Machine Learning Operations Engineer Associate",
        subtitle: "Microsoft · AI / ML · Credential 01",
        badge: "Credential 01",
        role: "Microsoft",
        timeline: "Permanent Record",
        tech: "MLOps · Azure ML · Model Deployment · CI/CD Pipelines · Monitoring",
        live_url: "https://learn.microsoft.com/en-us/users/rahulteja-1992/credentials/351c672de3dd3551",
        repo_url: "https://learn.microsoft.com/en-us/users/rahulteja-1992/credentials/351c672de3dd3551",
        body: "Validates specialized capabilities in building, operating, and monitoring automated production ML pipelines, feature stores, and scalable model deployment architectures.\n\nVALIDATED CAPABILITIES\n\n1. End-to-end MLOps pipeline automation and lifecycle governance.\n2. Scalable feature store architectures and real-time model serving.\n3. Automated CI/CD integration with Azure Machine Learning workspaces.\n4. Production telemetry, model drift detection, and automated retraining triggers.",
        image: "/certificates/cert_ms_mlops_master.png",
        video_url: null,
        mobile_video_url: null
      },
      {
        section_title: "Microsoft Certified: SQL AI Developer Associate",
        subtitle: "Microsoft · Data & SQL · Credential 02",
        badge: "Credential 02",
        role: "Microsoft",
        timeline: "Permanent Record",
        tech: "SQL AI · Vector Search · Data Pipelines · T-SQL · Semantic Indexing",
        live_url: "https://learn.microsoft.com/en-us/users/rahulteja-1992/credentials/b7191aaf49134fc8",
        repo_url: "https://learn.microsoft.com/en-us/users/rahulteja-1992/credentials/b7191aaf49134fc8",
        body: "Demonstrates expertise in architecting intelligent data solutions, semantic search, vector embeddings, query optimization, and AI-augmented SQL databases.\n\nVALIDATED CAPABILITIES\n\n1. Semantic search implementation and dense vector embedding pipelines.\n2. AI-augmented T-SQL query generation, tuning, and indexing strategies.\n3. High-throughput data ingestion, transformation, and storage patterns.\n4. Integration of intelligent LLM reasoning layers with relational data stores.",
        image: "/certificates/cert_ms_sql_ai_master.png",
        video_url: null,
        mobile_video_url: null
      },
      {
        section_title: "Microsoft Certified: Azure Data Fundamentals",
        subtitle: "Microsoft · Cloud · Credential 03",
        badge: "Credential 03",
        role: "Microsoft",
        timeline: "Permanent Record",
        tech: "Azure Data · Cosmos DB · Relational SQL · Data Warehousing · ETL / ELT",
        live_url: "https://learn.microsoft.com/en-us/users/rahulteja-1992/credentials/fedb73dcfca7e3e0",
        repo_url: "https://learn.microsoft.com/en-us/users/rahulteja-1992/credentials/fedb73dcfca7e3e0",
        body: "Demonstrates foundational knowledge of core cloud data concepts, relational & non-relational database services, and enterprise analytical workloads on Azure.\n\nVALIDATED CAPABILITIES\n\n1. Relational database architectures and managed SQL instance administration.\n2. Non-relational NoSQL database modeling with Azure Cosmos DB.\n3. Enterprise analytical workloads, modern data warehousing, and lakehouses.\n4. Scalable batch and streaming ETL / ELT data movement pipelines.",
        image: "/certificates/cert_ms_azure_data_master.png",
        video_url: null,
        mobile_video_url: null
      },
      {
        section_title: "Microsoft Certified: Azure AI Fundamentals",
        subtitle: "Microsoft · AI & Cloud · Credential 04",
        badge: "Credential 04",
        role: "Microsoft",
        timeline: "Issued: July 27, 2024",
        tech: "Azure AI · Computer Vision · NLP · Conversational AI · Responsible AI",
        live_url: "https://verify.certiport.com",
        repo_url: "https://verify.certiport.com",
        body: "Validates foundational knowledge of artificial intelligence, machine learning concepts, and related Microsoft Azure services.\n\nVALIDATED CAPABILITIES\n\n1. Common AI workloads, fundamental machine learning principles, and ethical considerations.\n2. Computer vision workloads and cognitive service APIs on Azure.\n3. Natural Language Processing (NLP) and speech synthesis systems.\n4. Conversational AI architectures and Azure AI Bot Services.",
        image: "/certificates/cert_ms_azure_ai_master.png",
        video_url: null,
        mobile_video_url: null
      },
      {
        section_title: "AWS Certified Cloud Practitioner",
        subtitle: "Amazon Web Services (AWS) · Cloud · Credential 05",
        badge: "Credential 05",
        role: "Amazon Web Services (AWS)",
        timeline: "Issued: August 4, 2024",
        tech: "AWS Cloud · Core Services · IAM & Security · High Availability · Cloud Architecture",
        live_url: "https://aws.amazon.com/verification",
        repo_url: "https://aws.amazon.com/verification",
        body: "Validates overall understanding of AWS Cloud infrastructure, security architecture, core services (EC2, S3, IAM, VPC), and enterprise cloud migration strategies.\n\nVALIDATED CAPABILITIES\n\n1. Comprehensive mastery of AWS core computing, storage, and networking.\n2. Zero-trust security paradigms, IAM role policies, and encryption compliance.\n3. Fault-tolerant multi-AZ high availability and disaster recovery patterns.\n4. Well-Architected Framework design principles and cost optimization.",
        image: "/certificates/cert_aws_practitioner_master.png",
        video_url: null,
        mobile_video_url: null
      },
      {
        section_title: "Claude 101",
        subtitle: "Anthropic · LLM & Prompting · Credential 06",
        badge: "Credential 06",
        role: "Anthropic",
        timeline: "Permanent Record",
        tech: "Claude 3.5 · Prompt Engineering · Context Windows · Function Calling · LLM Reasoning",
        live_url: "https://verify.skilljar.com/c/dsermfpyca5o",
        repo_url: "https://verify.skilljar.com/c/dsermfpyca5o",
        body: "In-depth certification covering Claude model architecture, multi-modal reasoning, prompt engineering principles, long-context window optimization, and structured output generation.\n\nVALIDATED CAPABILITIES\n\n1. Advanced Claude 3.5 Sonnet / Opus reasoning patterns and system design.\n2. Chain-of-Thought (CoT) and few-shot prompt optimization methodologies.\n3. 200k+ token context window exploitation and needle-in-a-haystack retrieval.\n4. Strict structured JSON output schemas, tool use, and function calling.",
        image: "/certificates/cert_anthropic_claude_101.png",
        video_url: null,
        mobile_video_url: null
      },
      {
        section_title: "AI Fluency: Framework & Foundations",
        subtitle: "Anthropic · LLM & Prompting · Credential 07",
        badge: "Credential 07",
        role: "Anthropic",
        timeline: "Permanent Record",
        tech: "Frontier Models · Agentic Systems · AI Safety · Model Evaluation · Autonomous Workflows",
        live_url: "https://verify.skilljar.com/c/g59ydrrtrryt",
        repo_url: "https://verify.skilljar.com/c/g59ydrrtrryt",
        body: "Foundational mastery in frontier AI models, evaluation frameworks, autonomous agentic workflows, prompt alignment, and ethical AI deployment best practices.\n\nVALIDATED CAPABILITIES\n\n1. Frontier model paradigms, latent capabilities, and architectural limits.\n2. Autonomous agentic systems, tool loops, and human-in-the-loop controls.\n3. Rigorous model evaluation rubrics, benchmark interpretation, and QA.\n4. AI safety guardrails, red-teaming methodologies, and alignment protocols.",
        image: "/certificates/cert_anthropic_ai_fluency.png",
        video_url: null,
        mobile_video_url: null
      }
    ]
  }
];

export const aboutData: AboutData = {
  "intro": [
    "AI Engineer dedicated to architecting scalable foundation model systems, autonomous multi-agent frameworks, and high-performance inference engines.",
    "Driven by the intersection of rigorous machine learning theory, distributed systems engineering, and crafting software that thinks, reasons, and executes at scale."
  ],
  "recognitionsTitle": "Milestones & Achievements:",
  "recognitions": [
    "Production LLM Queries Handled (100M+)",
    "Open-Source GitHub Stars (5,000+)",
    "Inference Latency Reduction (-60%)",
    "GPU Compute Efficiency (94%)",
    "Published Research & Technical Papers (8)"
  ],
  "final": [
    "Available for high-impact AI engineering roles, technical advisory, and foundation model infrastructure initiatives worldwide."
  ],
  "credits": [
    "Designed and engineered for Rahul Teja."
  ]
};

export const destinations: Destination[] = [
  {
    "id": "jfk",
    "airport_code": "JFK",
    "name": "JFK",
    "photos": [
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai71RY1P9HI4UdcW_JFK1.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      },
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai71PY1P9HI4UdcR_JFK2.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      },
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai71QY1P9HI4UdcT_JFK3.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      },
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai71P41P9HI4UdcS_JFK4.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      },
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai71RI1P9HI4UdcV_JFK5.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      },
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai71R41P9HI4UdcY_JFK6.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      },
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai71Ro1P9HI4UdcX_JFK7.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      },
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai71PI1P9HI4UdcQ_JFK8.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      },
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai71Qo1P9HI4UdcU_JFK9.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      }
    ]
  },
  {
    "id": "pvg",
    "airport_code": "PVG",
    "name": "PVG",
    "photos": [
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai71Zo1P9HI4Udcj_PVG1.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      },
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai71YY1P9HI4Udce_PVG2.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      },
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai71W41P9HI4Udcb_PVG3.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      },
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai71XY1P9HI4Udcc_PVG4.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      },
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai71Yo1P9HI4Udcf_PVG5.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      },
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai71Y41P9HI4Udcg_PVG6.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      },
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai71X41P9HI4Udcd_PVG7.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      },
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai71ZY1P9HI4Udci_PVG8.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      },
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai71Wo1P9HI4Udca_PVG9.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      }
    ]
  },
  {
    "id": "tpe",
    "airport_code": "TPE",
    "name": "TPE",
    "photos": [
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai71AI1P9HI4UdcJ_TPE6.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      },
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai71CI1P9HI4UdcP_TPE7.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      },
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai71AY1P9HI4UdcK_TPE1.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      },
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai71B41P9HI4UdcO_TPE5.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      },
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai70_o1P9HI4UdcI_TPE8.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      },
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai71BI1P9HI4UdcM_TPE3.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      },
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai71A41P9HI4UdcL_TPE2.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      },
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai71Bo1P9HI4UdcN_TPE4.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      }
    ]
  },
  {
    "id": "ic",
    "airport_code": "ICN",
    "name": "ICN",
    "photos": [
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai7z2Y1P9HI4Udbr_ICN1.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      },
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai7z2o1P9HI4Udbs_ICN2.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      },
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai7z141P9HI4Udbq_ICN4.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      },
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai7z3Y1P9HI4Udbu_ICN5.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      },
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai7z3o1P9HI4Udbv_ICN6.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      },
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai7z4I1P9HI4Udbw_ICN7.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      }
    ]
  },
  {
    "id": "bkk",
    "airport_code": "BKK",
    "name": "BKK",
    "photos": [
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai7zK41P9HI4Uda0_BKK1.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      },
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai7zKY1P9HI4Udaz_BKK2.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      },
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai7zI41P9HI4Udaw_BKK3.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      },
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai7zKI1P9HI4Uday_BKK4.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      },
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai7zMI1P9HI4Uda3_BKK5.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      },
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai7zMo1P9HI4Uda4_BKK6.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      },
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai7zJo1P9HI4Udax_BKK7.jpeg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      },
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai7zM41P9HI4Uda5_BKK8.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      },
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai7zLY1P9HI4Uda1_BKK9.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      }
    ]
  },
  {
    "id": "yvr",
    "airport_code": "YVR",
    "name": "YVR",
    "photos": [
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai70a41P9HI4UdcF_YVR1.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      },
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai70ZY1P9HI4UdcE_YVR2.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      },
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai70Yo1P9HI4UdcD_YVR3.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      },
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai70X41P9HI4UdcC_YVR4.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      },
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai70XI1P9HI4UdcB_YVR5.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      },
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai70WY1P9HI4UdcA_YVR6.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      },
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai70V41P9HI4Udb__YVR7.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      },
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai70VI1P9HI4Udb-_YVR8.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      },
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai70Uo1P9HI4Udb9_YVR9.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      }
    ]
  },
  {
    "id": "nrt",
    "airport_code": "NRT",
    "name": "NRT",
    "photos": [
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai70II1P9HI4Udb5_NRT4.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      },
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai70HY1P9HI4Udb2_NRT9.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      },
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai70JI1P9HI4Udb8_NRT5.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      },
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai70I41P9HI4Udb7_NRT6.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      },
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai70Io1P9HI4Udb6_NRT2.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      },
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai70H41P9HI4Udb4_NRT3.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      },
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai70HI1P9HI4Udb1_NRT7.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      },
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai70Ho1P9HI4Udb3_NRT1.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      }
    ]
  },
  {
    "id": "dps",
    "airport_code": "DPS",
    "name": "DPS",
    "photos": [
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai7zbo1P9HI4UdbF_DPS3.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      },
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai7zXY1P9HI4Uda7_DPS5.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      },
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai7zdY1P9HI4UdbL_DPS7.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      },
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai7zco1P9HI4UdbJ_DPS2.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      },
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai7zaI1P9HI4UdbB_DPS6.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      },
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai7zYI1P9HI4Uda9_DPS8.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      },
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai7zcI1P9HI4UdbH_DPS1.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      },
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai7zd41P9HI4UdbN_DPS4.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      },
      {
        "image": "https://images.prismic.io/gabriel-beaugonin/ai7zbI1P9HI4UdbD_DPS9.jpg?auto=format,compress",
        "link": {
          "link_type": "Any"
        }
      }
    ]
  }
];
