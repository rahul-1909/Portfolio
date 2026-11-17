'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface SkillItem {
  id: string;
  name: string;
  category: string;
  icon: string;
  tagline: string;
  description: string;
  highlights: string[];
  productionUse: string;
}

export const skillsList: SkillItem[] = [
  // =========================================================================
  // CARD 1: CORE LANGUAGES, BACKEND & DATA SYSTEMS (15 Skills)
  // =========================================================================
  {
    id: 'python',
    name: 'Python',
    category: 'CORE LANGUAGE & AI',
    icon: '/icons/skills/python.svg',
    tagline: 'High-concurrency async services & Generative AI orchestration',
    description:
      'Primary language for foundational machine learning, agent orchestration, and asynchronous microservices. Deeply utilized with PyTorch, LangGraph, FastAPI, and scientific libraries for real-time model serving and telemetry pipelines.',
    highlights: ['AsyncIO & Concurrency', 'FastAPI Microservices', 'PyTorch / Transformers', 'LangChain & LangGraph'],
    productionUse: 'NexusAI RAG Engine & ConvoLens QA Platform',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'FULL-STACK & UI',
    icon: '/icons/skills/typescript.svg',
    tagline: 'Type-safe full-stack engineering & interactive web experiences',
    description:
      'Engineered scalable web applications and distributed client-server systems with strict compiler configs, advanced generics, React 19, Next.js App Router, and end-to-end type safety.',
    highlights: ['Strict Type System', 'Next.js 15/16 App Router', 'React 19 & Framer Motion', 'REST & Contract Validation'],
    productionUse: 'Radar-AI Dashboard & Interactive Portfolios',
  },
  {
    id: 'java',
    name: 'Java 17',
    category: 'ENTERPRISE BACKEND',
    icon: '/icons/skills/java.svg',
    tagline: 'Modern LTS enterprise services & resilient domain architectures',
    description:
      'Enterprise-grade software development utilizing modern Java 17 LTS capabilities: Records, Pattern Matching, Sealed Classes, and high-throughput virtual threads for resilient domain-driven architectures.',
    highlights: ['Modern Java 17 LTS', 'Object-Oriented Design', 'JVM Performance Tuning', 'Enterprise Banking Standards'],
    productionUse: 'Star Finance Gold & Silver Lending Platform',
  },
  {
    id: 'golang',
    name: 'Go Lang',
    category: 'SYSTEMS & DISTRIBUTED',
    icon: '/icons/skills/golang.svg',
    tagline: 'High-throughput concurrency & low-latency network systems',
    description:
      'High-performance systems programming and distributed architectures. Engineered low-latency discrete-event simulation engines, concurrent Goroutine pipelines, channels, and event streaming.',
    highlights: ['Goroutines & Channels', 'Distributed Consensus', 'Low-Latency Networking', 'High-Concurrency Engines'],
    productionUse: 'Faultline Distributed Chaos Simulator',
  },
  {
    id: 'sql',
    name: 'SQL',
    category: 'QUERY OPTIMIZATION',
    icon: '/icons/skills/sql.svg',
    tagline: 'Advanced relational modeling, execution plans & query tuning',
    description:
      'Advanced relational query architecture, schema normalization, execution plan analysis, window functions, and complex multi-table indexing for high-scale analytical and transactional engines.',
    highlights: ['Query Plan Optimization', 'Window Functions & CTEs', 'Index Tuning & Partitioning', 'Complex Schema Modeling'],
    productionUse: 'QueryAI Natural Language Text-to-SQL Engine',
  },
  {
    id: 'springboot',
    name: 'Spring Boot 3.5',
    category: 'ENTERPRISE MICROSERVICES',
    icon: '/icons/skills/springboot.svg',
    tagline: 'Production microservices, security & transaction management',
    description:
      'Building production microservices with Spring Boot 3.x, Spring Security, JPA/Hibernate, and RESTful APIs with automated transaction management, connection pooling, and multi-factor authorization.',
    highlights: ['Spring Security & RBAC', 'Spring Data JPA / Hibernate', 'REST APIs & Validation', 'Microservice Architecture'],
    productionUse: 'Star Finance Banking & Appraisal Backend',
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    category: 'ASYNC API & SERVING',
    icon: '/icons/skills/fastapi.svg',
    tagline: 'Ultra-low latency async ASGI serving & Pydantic validation',
    description:
      'High-throughput asynchronous Python web framework used for low-latency AI model serving, Pydantic v2 data validation, OpenAPI specification generation, and Dockerized inference endpoints.',
    highlights: ['Asynchronous ASGI Routing', 'Pydantic v2 Serialization', 'Real-Time Telemetry & Webhooks', 'Production Uvicorn Clustering'],
    productionUse: 'NexusAI API Gateway & ConvoLens Async Backend',
  },
  {
    id: 'langgraph',
    name: 'LangGraph',
    category: 'MULTI-AGENT ORCHESTRATION',
    icon: '/icons/skills/langgraph.svg',
    tagline: 'Stateful cyclic multi-agent DAGs & autonomous supervisor workflows',
    description:
      'Cyclic stateful multi-agent workflows, dynamic DAG execution, human-in-the-loop checkpoints, supervisor reflection loops, and persistent agent conversation graphs for autonomous reasoning.',
    highlights: ['Stateful Agent DAGs', 'Supervisor Delegation', 'Reflection & Grading Loops', 'Persistent Checkpointers'],
    productionUse: 'NexusAI Multi-Agent Corrective RAG Framework',
  },
  {
    id: 'qdrant',
    name: 'Qdrant',
    category: 'VECTOR DATABASE & RETRIEVAL',
    icon: '/icons/skills/qdrant.svg',
    tagline: 'Billion-scale HNSW vector indexing & hybrid semantic search',
    description:
      'Billion-scale vector search engine with HNSW indexing, sparse-dense hybrid retrieval, payload metadata filtering, and sub-10ms similarity search for production RAG pipelines.',
    highlights: ['HNSW Graph Indexing', 'Hybrid Vector & Keyword Search', 'Payload Metadata Filtering', 'High-Throughput Vector DB'],
    productionUse: 'NexusAI Enterprise Document Retrieval Engine',
  },
  {
    id: 'rag',
    name: 'RAG',
    category: 'KNOWLEDGE & RETRIEVAL',
    icon: '/icons/skills/rag.svg',
    tagline: 'Corrective & Graph RAG architectures with hallucination guardrails',
    description:
      'Corrective and Graph-based Retrieval-Augmented Generation architectures. Combines document chunking, semantic reranking (ColBERT / Cohere), dynamic relevance grading, and grounded synthesis.',
    highlights: ['Corrective RAG (CRAG)', 'Semantic Reranking', 'Hallucination Guardrails', 'Multi-Hop Query Synthesis'],
    productionUse: 'Production Autonomous Knowledge Retrieval',
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'RELATIONAL & PGVECTOR',
    icon: '/icons/skills/postgresql.svg',
    tagline: 'Enterprise relational reliability with pgvector semantic similarity',
    description:
      'Robust enterprise database with pgvector extensions, ACID transaction guarantees, JSONB document querying, foreign data wrappers, and complex relational constraints.',
    highlights: ['pgvector Similarity Search', 'ACID Transactions', 'Complex Joins & Triggers', 'JSONB Querying'],
    productionUse: 'Relational & Semantic Persistence Layer',
  },
  {
    id: 'mysql',
    name: 'MySQL 9',
    category: 'TRANSACTIONAL DATABASE',
    icon: '/icons/skills/mysql.svg',
    tagline: 'High-availability transactional storage & InnoDB query tuning',
    description:
      'High-availability relational database engineering, InnoDB engine tuning, connection pool management, master-replica replication, and strict integrity enforcement.',
    highlights: ['InnoDB Architecture', 'Replication & Clustering', 'Full-Text Indexing', 'Enterprise Collateral Systems'],
    productionUse: 'Star Finance & QueryAI Live Relational Backends',
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'CONTAINERIZATION & DEVOPS',
    icon: '/icons/skills/docker.svg',
    tagline: 'Multi-stage container packaging & reproducible deployment parity',
    description:
      'Containerizing microservices, AI inference runtimes, multi-stage Docker builds, compose topologies, and isolated development-to-production deployment parity.',
    highlights: ['Multi-Stage Optimized Builds', 'Docker Compose Networks', 'Environment Parity', 'Microservice Packaging'],
    productionUse: 'NexusAI & Distributed Systems Microservices',
  },
  {
    id: 'aws',
    name: 'AWS',
    category: 'CLOUD INFRASTRUCTURE',
    icon: '/icons/skills/aws.svg',
    tagline: 'Scalable cloud computing, serverless architectures & SageMaker',
    description:
      'Architecting cloud services on Amazon Web Services: EC2, S3, Lambda, ECS, SageMaker model deployments, IAM security policies, and scalable serverless backends.',
    highlights: ['Amazon EC2 & S3', 'ECS & Serverless Lambda', 'SageMaker AI Pipelines', 'VPC & IAM Security'],
    productionUse: 'Cloud Model Deployment & Storage Infrastructure',
  },
  {
    id: 'azure',
    name: 'Azure',
    category: 'CLOUD & ENTERPRISE',
    icon: '/icons/skills/azure.svg',
    tagline: 'Enterprise cloud services & Azure OpenAI infrastructure',
    description:
      'Deploying enterprise cloud applications on Microsoft Azure: Azure App Services, Azure Blob Storage, Azure OpenAI Service integrations, and role-based access management.',
    highlights: ['Azure OpenAI Service', 'App Service & Scale Sets', 'Blob Storage & Key Vault', 'Entra ID / RBAC Security'],
    productionUse: 'Enterprise Cloud & Managed AI Services',
  },

  // =========================================================================
  // CARD 2: ADVANCED AI, LLMs, DISTRIBUTED & INFRASTRUCTURE (15 Skills)
  // =========================================================================
  {
    id: 'pytorch',
    name: 'PyTorch',
    category: 'DEEP LEARNING & NEURAL NETS',
    icon: '/icons/skills/pytorch.svg',
    tagline: 'Tensor computations, deep neural networks & GPU acceleration',
    description:
      'Core deep learning framework used for custom neural network architectures, transformer fine-tuning (LoRA/QLoRA), gradient backpropagation, and tensor optimizations on CUDA hardware.',
    highlights: ['Tensor Autograd Engine', 'Transformer Fine-Tuning', 'CUDA GPU Acceleration', 'Model Serialization'],
    productionUse: 'NexusAI Embedding & Reranking Layers',
  },
  {
    id: 'langchain',
    name: 'LangChain',
    category: 'LLM APPLICATION FRAMEWORK',
    icon: '/icons/skills/langchain.svg',
    tagline: 'Composable LLM pipelines, prompt templates & agent toolchains',
    description:
      'Orchestrating foundational LLM pipelines, dynamic prompt management, structured output parsers, document loaders, and semantic retrieval chain integrations.',
    highlights: ['LCEL Composable Chains', 'Output Parsers & Schemas', 'Document Ingestion', 'Tool & Memory Binders'],
    productionUse: 'QueryAI Natural Language Interface',
  },
  {
    id: 'redis',
    name: 'Redis',
    category: 'IN-MEMORY DATA & CACHING',
    icon: '/icons/skills/redis.svg',
    tagline: 'Sub-millisecond caching, session stores & pub/sub streaming',
    description:
      'High-throughput in-memory data structures, distributed locks, low-latency API caching layers, session state persistence, and pub/sub message brokers.',
    highlights: ['Sub-Millisecond Caching', 'Distributed Locking', 'Pub/Sub Event Streaming', 'Rate-Limiting Queues'],
    productionUse: 'Distributed State & Token Caching',
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    category: 'CONTAINER ORCHESTRATION',
    icon: '/icons/skills/kubernetes.svg',
    tagline: 'Declarative container management, autoscaling & zero-downtime',
    description:
      'Deploying and managing containerized microservices at scale with declarative YAML manifests, Horizontal Pod Autoscaling (HPA), ingress controllers, and service meshes.',
    highlights: ['Declarative Deployments', 'Horizontal Pod Autoscaling', 'Ingress & Service Mesh', 'Cluster Health Monitoring'],
    productionUse: 'Microservice Cluster Management',
  },
  {
    id: 'kafka',
    name: 'Apache Kafka',
    category: 'DISTRIBUTED EVENT STREAMING',
    icon: '/icons/skills/kafka.svg',
    tagline: 'High-throughput distributed logs, event streaming & fault tolerance',
    description:
      'Architecting event-driven microservices with distributed partitioned logs, consumer group balancing, low-latency telemetry ingestion, and replayable event streams.',
    highlights: ['Partitioned Topic Routing', 'Consumer Group Balancing', 'Event-Driven Architectures', 'High-Throughput Ingestion'],
    productionUse: 'Faultline Telemetry & Event Streaming',
  },
  {
    id: 'cpp',
    name: 'C++ 17',
    category: 'SYSTEMS & PERFORMANCE',
    icon: '/icons/skills/cpp.svg',
    tagline: 'High-performance simulation engines, RAII & low-level memory',
    description:
      'Low-latency systems programming utilizing modern C++17 paradigms: move semantics, RAII memory safety, cache-conscious memory layouts, and multi-threaded simulation cores.',
    highlights: ['Modern C++17 Idioms', 'RAII & Smart Pointers', 'Low-Latency Multithreading', 'Hardware Cache Locality'],
    productionUse: 'Faultline Discrete-Event Simulator Core',
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'FULL-STACK REACT FRAMEWORK',
    icon: '/icons/skills/nextjs.svg',
    tagline: 'Server-Side Rendering, App Router & edge-optimized web apps',
    description:
      'Building production web applications using Next.js 14/15/16 App Router, React Server Components (RSC), server actions, dynamic route handlers, and edge caching.',
    highlights: ['React Server Components', 'Next.js App Router', 'Edge Route Handlers', 'Incremental Regeneration'],
    productionUse: 'Portfolio & Radar-AI Dashboard',
  },
  {
    id: 'react',
    name: 'React',
    category: 'FRONTEND ARCHITECTURE',
    icon: '/icons/skills/react.svg',
    tagline: 'Declarative UI engineering, custom hooks & reactive state',
    description:
      'Crafting fluid, high-performance client experiences with React 18/19, concurrent mode, custom state hooks, component decoupling, and smooth framer-motion animations.',
    highlights: ['Concurrent React 19', 'Custom State Hooks', 'Framer Motion Physics', 'Optimistic UI Updates'],
    productionUse: 'Interactive Frontend Applications',
  },
  {
    id: 'linux',
    name: 'Linux',
    category: 'KERNEL & OS ARCHITECTURE',
    icon: '/icons/skills/linux.svg',
    tagline: 'POSIX systems, shell scripting, systemd & performance tuning',
    description:
      'Production Linux systems administration, systemd service management, bash shell scripting, process signal handling, I/O multiplexing, and network socket tuning.',
    highlights: ['POSIX Process Model', 'Systemd Services & Logs', 'Bash Shell Automation', 'Network Socket Tuning'],
    productionUse: 'Production Host & Container Runtimes',
  },
  {
    id: 'git',
    name: 'Git',
    category: 'VERSION CONTROL & COLLAB',
    icon: '/icons/skills/git.svg',
    tagline: 'Distributed version control, branch workflows & merge strategies',
    description:
      'Mastery of distributed version control, atomic commit histories, trunk-based development, rebase workflows, conflict resolution, and collaborative code reviews.',
    highlights: ['Trunk-Based Development', 'Interactive Rebase & Merge', 'Submodules & Worktrees', 'Branch Protection Rules'],
    productionUse: 'All 22 Production Repositories',
  },
  {
    id: 'huggingface',
    name: 'Hugging Face',
    category: 'TRANSFORMERS & MODEL HUB',
    icon: '/icons/skills/huggingface.svg',
    tagline: 'Pretrained foundation models, tokenizers & inference pipelines',
    description:
      'Leveraging the Hugging Face ecosystem for state-of-the-art transformer tokenization, sentence-transformers embedding generation, model quantization, and evaluation benchmarks.',
    highlights: ['Transformer Tokenizers', 'Sentence Embeddings', 'Model Hub Integration', 'Quantization (bitsandbytes)'],
    productionUse: 'NexusAI & ConvoLens NLP Pipelines',
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'NOSQL DOCUMENT DATABASE',
    icon: '/icons/skills/mongodb.svg',
    tagline: 'Flexible JSON document storage, aggregation pipelines & sharding',
    description:
      'Scalable NoSQL document data modeling, aggregation pipelines, replica sets, compound indexing, and flexible schema iteration for semi-structured application data.',
    highlights: ['Document Data Modeling', 'Aggregation Pipeline Stages', 'Index Strategy & Sharding', 'Replica Set Failover'],
    productionUse: 'Dynamic Telemetry & Unstructured Logs',
  },
  {
    id: 'graphql',
    name: 'GraphQL',
    category: 'SCHEMA-DRIVEN APIS',
    icon: '/icons/skills/graphql.svg',
    tagline: 'Declarative schema queries, resolver optimizations & type safety',
    description:
      'Designing strongly-typed API contracts, graph resolvers, dataloader batching to eliminate N+1 queries, subscriptions, and federated graph architectures.',
    highlights: ['Strict Schema Definitions', 'DataLoader Batching', 'Over/Under-fetching Fix', 'Real-Time Subscriptions'],
    productionUse: 'Enterprise Graph Data Layer',
  },
  {
    id: 'nginx',
    name: 'NGINX',
    category: 'REVERSE PROXY & GATEWAY',
    icon: '/icons/skills/nginx.svg',
    tagline: 'High-concurrency reverse proxy, SSL termination & load balancing',
    description:
      'High-performance HTTP server configuration, upstream load balancing algorithms, SSL/TLS termination, rate limiting, and gzip/brotli static asset compression.',
    highlights: ['Upstream Load Balancing', 'SSL/TLS Termination', 'Rate-Limiting & Buffering', 'Static Asset Compression'],
    productionUse: 'Production Gateway & Reverse Proxy',
  },
  {
    id: 'githubactions',
    name: 'GitHub Actions',
    category: 'CI/CD AUTOMATION',
    icon: '/icons/skills/githubactions.svg',
    tagline: 'Automated testing pipelines, matrix builds & container delivery',
    description:
      'Authoring automated CI/CD workflows, unit/integration test matrices, linting checks, Docker image publishing to registries, and automated multi-environment deployments.',
    highlights: ['Multi-Platform Matrix Builds', 'Automated Test Runners', 'Docker Image Publishing', 'Secret Management & OIDC'],
    productionUse: 'Automated Pipeline & Release Engine',
  },

  // =========================================================================
  // CARD 3: SPECIALIZED ML, DATA & CLOUD PLATFORMS (7 Skills)
  // =========================================================================
  {
    id: 'gcp',
    name: 'Google Cloud',
    category: 'CLOUD COMPUTING & VERTEX AI',
    icon: '/icons/skills/gcp.svg',
    tagline: 'Scalable cloud infrastructure, Cloud Run & Vertex AI ML workflows',
    description:
      'Architecting Google Cloud Platform solutions: Cloud Run serverless containers, BigQuery analytical engines, GCS object storage, and Vertex AI model serving pipelines.',
    highlights: ['Cloud Run Containers', 'BigQuery Analytics', 'Vertex AI Model Serving', 'IAM & Cloud Armor'],
    productionUse: 'Cloud Infrastructure & Model Serving',
  },
  {
    id: 'ollama',
    name: 'Ollama',
    category: 'LOCAL & HIGH-SPEED SERVING',
    icon: '/icons/skills/ollama.svg',
    tagline: 'Low-latency local LLM serving, quantized weights & GGUF runtimes',
    description:
      'Running high-performance local foundation model runtimes with GGUF quantization (4-bit/8-bit), GPU offloading, streaming token responses, and custom system prompt templates.',
    highlights: ['GGUF Quantized Models', 'GPU Layer Offloading', 'Streaming Token APIs', 'Custom Modelfiles'],
    productionUse: 'Local Inference & Privacy Runtimes',
  },
  {
    id: 'snowflake',
    name: 'Snowflake',
    category: 'CLOUD DATA WAREHOUSING',
    icon: '/icons/skills/snowflake.svg',
    tagline: 'Elastic data warehousing, multi-cluster compute & analytics',
    description:
      'Designing analytical data warehouse schemas, virtual warehouse scaling, zero-copy cloning, time-travel recovery, and fast SQL aggregations on petabyte-scale datasets.',
    highlights: ['Decoupled Storage & Compute', 'Virtual Warehouse Scaling', 'Time-Travel & Cloning', 'Analytical SQL Optimization'],
    productionUse: 'Enterprise Analytical Data Tier',
  },
  {
    id: 'pinecone',
    name: 'Pinecone',
    category: 'MANAGED VECTOR DATABASE',
    icon: '/icons/skills/pinecone.svg',
    tagline: 'Serverless vector search, metadata filtering & fast similarity',
    description:
      'Managed cloud vector indexing with real-time vector upserts, cosine and dot-product similarity metrics, namespace isolation, and sub-50ms query latency for RAG retrieval.',
    highlights: ['Serverless Vector Indices', 'Metadata Payload Filtering', 'Cosine & Dot-Product Metric', 'Sub-50ms Query Latency'],
    productionUse: 'Managed Vector Retrieval Pipelines',
  },
  {
    id: 'postman',
    name: 'Postman',
    category: 'API CONTRACTS & TESTING',
    icon: '/icons/skills/postman.svg',
    tagline: 'REST API design, automated test collections & contract validation',
    description:
      'Designing and validating RESTful APIs, writing automated pre-request scripts and assertion suites, mock servers, environment variables, and Newman CLI test runs.',
    highlights: ['Automated Test Assertions', 'Newman CLI Integration', 'Mock Servers & Contracts', 'Environment Scoping'],
    productionUse: 'Radar-AI Automated API Testing',
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'MODERN UTILITY STYLING',
    icon: '/icons/skills/tailwind.svg',
    tagline: 'Atomic utility-first CSS, fluid responsive design & themes',
    description:
      'Engineering responsive, tokenized design systems with Tailwind CSS: JIT compiler optimizations, fluid viewport typography, dark mode tokens, and custom utility plugins.',
    highlights: ['Utility-First Architecture', 'Fluid Viewport Rem Scaling', 'JIT Engine Compilation', 'Component Design Systems'],
    productionUse: 'Modern Portfolio & SPA Dashboards',
  },
  {
    id: 'vite',
    name: 'Vite',
    category: 'LIGHTNING FRONTEND TOOLING',
    icon: '/icons/skills/vite.svg',
    tagline: 'Next-generation frontend tooling, instant HMR & Rollup builds',
    description:
      'Ultra-fast development server with native ES modules (ESM), instant Hot Module Replacement (HMR), optimized Rollup production bundling, and zero-config TypeScript support.',
    highlights: ['Native ESM Dev Server', 'Sub-Millisecond HMR', 'Optimized Rollup Bundling', 'TypeScript & Asset Pipeline'],
    productionUse: 'High-Speed Web Client Builds',
  },
];

export interface SkillsAppGridProps {
  cardIndex?: number;
}

export const SkillsAppGrid: React.FC<SkillsAppGridProps> = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <div className="w-full relative select-none py-[2rem]">
      {/* 3 Columns Grid with 3 Apps per row for all 37 skills */}
      <div className="grid grid-cols-3 gap-x-[5.2rem] gap-y-[5.2rem] max-phone:gap-x-[2.2rem] max-phone:gap-y-[3.6rem] items-center justify-items-center w-full">
        {skillsList.map((skill, idx) => {
          const isHovered = hoveredSkill === skill.id;
          const isAnyHovered = hoveredSkill !== null;
          const isDimmed = isAnyHovered && !isHovered;
          // Center the 37th item (Vite) in the middle column of row 13
          const isLastSkill = idx === skillsList.length - 1;

          return (
            <motion.div
              key={skill.id}
              onMouseEnter={() => setHoveredSkill(skill.id)}
              onMouseLeave={() => setHoveredSkill(null)}
              animate={{
                scale: isHovered ? 1.15 : 1,
                opacity: isDimmed ? 0.35 : 1,
                filter: isDimmed ? 'blur(1.5px)' : 'blur(0px)',
              }}
              transition={{
                type: 'spring',
                stiffness: 350,
                damping: 24,
                mass: 0.65,
              }}
              className={`flex flex-col items-center justify-center cursor-pointer relative group ${
                isLastSkill ? 'col-start-2' : ''
              }`}
              style={{ zIndex: isHovered ? 40 : 10 }}
            >
              {/* Clean App Icon — NO white background container, NO border */}
              <div className="w-[8.0rem] h-[8.0rem] max-phone:w-[6.0rem] max-phone:h-[6.0rem] flex items-center justify-center relative">
                <img
                  src={skill.icon}
                  alt={skill.name}
                  className="w-[7.0rem] h-[7.0rem] max-phone:w-[5.2rem] max-phone:h-[5.2rem] object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.06)] select-none pointer-events-none transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Title text appears below icon on hover — NO background container, NO pill box */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-[102%] left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none z-40"
                  >
                    <span className="text-[1.45rem] max-phone:text-[1.2rem] font-semibold text-light-black tracking-tight text-center block select-none">
                      {skill.name}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
