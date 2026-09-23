export interface Skill {
  name: string;
  category: string;
  proficiency?: 'Core' | 'Advanced' | 'Working';
  iconKey?: string;
  tag?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    title: "Programming Languages",
    description: "Core languages used for backend services, algorithms, and system design.",
    skills: [
      { name: "Python", category: "languages", proficiency: "Core", tag: "Primary" },
      { name: "Java", category: "languages", proficiency: "Core", tag: "Enterprise" },
      { name: "JavaScript", category: "languages", proficiency: "Core" },
      { name: "TypeScript", category: "languages", proficiency: "Advanced" },
      { name: "SQL", category: "languages", proficiency: "Core", tag: "Complex Queries" },
      { name: "HTML5 & CSS3", category: "languages", proficiency: "Advanced" }
    ]
  },
  {
    id: "backend",
    title: "Backend & Systems",
    description: "Architecting high-throughput REST and ASGI microservices, security, and persistence.",
    skills: [
      { name: "FastAPI", category: "backend", proficiency: "Core", tag: "Async ASGI" },
      { name: "Spring Boot 3.5", category: "backend", proficiency: "Core", tag: "Java 17 / RBAC" },
      { name: "Node.js & Express", category: "backend", proficiency: "Advanced" },
      { name: "Django & Flask", category: "backend", proficiency: "Advanced" },
      { name: "RESTful API Design", category: "backend", proficiency: "Core" },
      { name: "Microservices Architecture", category: "backend", proficiency: "Advanced" },
      { name: "JWT & RBAC Security", category: "backend", proficiency: "Core" }
    ]
  },
  {
    id: "ai-ml",
    title: "AI, ML & Agentic Systems",
    description: "Building production RAG pipelines, multi-agent state machines, and vector search.",
    skills: [
      { name: "LangChain & LangGraph", category: "ai-ml", proficiency: "Core", tag: "Agentic Workflows" },
      { name: "Vector Databases (Qdrant, ChromaDB)", category: "ai-ml", proficiency: "Core", tag: "HNSW Dense" },
      { name: "RAG & Document Grading", category: "ai-ml", proficiency: "Core", tag: "Anti-Hallucination" },
      { name: "OpenAI & Mistral APIs", category: "ai-ml", proficiency: "Core" },
      { name: "Hugging Face & Transformers", category: "ai-ml", proficiency: "Advanced" },
      { name: "Prompt Engineering & Guardrails", category: "ai-ml", proficiency: "Core" },
      { name: "Voice AI (Groq Whisper)", category: "ai-ml", proficiency: "Advanced" }
    ]
  },
  {
    id: "frontend",
    title: "Frontend Engineering",
    description: "Crafting responsive, clean interfaces and administrative dashboards.",
    skills: [
      { name: "React", category: "frontend", proficiency: "Core" },
      { name: "Next.js", category: "frontend", proficiency: "Advanced" },
      { name: "Angular 20", category: "frontend", proficiency: "Advanced", tag: "Material Design" },
      { name: "Tailwind CSS", category: "frontend", proficiency: "Core", tag: "Design Systems" },
      { name: "Streamlit", category: "frontend", proficiency: "Core", tag: "AI Apps" }
    ]
  },
  {
    id: "databases",
    title: "Databases & Storage",
    description: "Relational, document, and in-memory caches for reliable data pipelines.",
    skills: [
      { name: "PostgreSQL", category: "databases", proficiency: "Core" },
      { name: "MySQL 9", category: "databases", proficiency: "Core" },
      { name: "MongoDB", category: "databases", proficiency: "Advanced" },
      { name: "Redis", category: "databases", proficiency: "Advanced", tag: "Caching / Locking" },
      { name: "SQLite", category: "databases", proficiency: "Core" }
    ]
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps",
    description: "Deploying containerized microservices and automated CI/CD workflows.",
    skills: [
      { name: "Amazon Web Services (AWS)", category: "cloud-devops", proficiency: "Advanced", tag: "Certified Cloud Practitioner" },
      { name: "Microsoft Azure", category: "cloud-devops", proficiency: "Advanced", tag: "Data Fundamentals" },
      { name: "Google Cloud (GCP)", category: "cloud-devops", proficiency: "Working" },
      { name: "Docker", category: "cloud-devops", proficiency: "Core", tag: "Containers" },
      { name: "GitHub Actions & CI/CD", category: "cloud-devops", proficiency: "Core" },
      { name: "Vercel & Render Deployment", category: "cloud-devops", proficiency: "Core" }
    ]
  },
  {
    id: "data-analytics",
    title: "Data & Analytics",
    description: "Big data transformations, tabular querying, and automated telemetry.",
    skills: [
      { name: "PySpark & Spark", category: "data-analytics", proficiency: "Advanced" },
      { name: "Databricks", category: "data-analytics", proficiency: "Working" },
      { name: "Snowflake & BigQuery", category: "data-analytics", proficiency: "Advanced" },
      { name: "dbt & Data Pipelines", category: "data-analytics", proficiency: "Working" },
      { name: "Plotly Data Viz", category: "data-analytics", proficiency: "Core" }
    ]
  },
  {
    id: "tools",
    title: "Engineering Tools",
    description: "Daily development workflow, testing, debugging, and productivity.",
    skills: [
      { name: "Git & GitHub", category: "tools", proficiency: "Core" },
      { name: "Postman", category: "tools", proficiency: "Core", tag: "API Testing" },
      { name: "VS Code", category: "tools", proficiency: "Core" },
      { name: "Power BI", category: "tools", proficiency: "Working" },
      { name: "Linux / Bash", category: "tools", proficiency: "Advanced" }
    ]
  }
];

// Flat list of key skills for the hero badge strip
export const heroTechSkills = [
  { name: "Python", color: "#3776AB" },
  { name: "Java", color: "#E76F00" },
  { name: "FastAPI", color: "#009688" },
  { name: "Spring Boot", color: "#6DB33F" },
  { name: "LangGraph / RAG", color: "#8B5CF6" },
  { name: "React", color: "#61DAFB" },
  { name: "AWS", color: "#FF9900" },
  { name: "Docker", color: "#2496ED" },
  { name: "PostgreSQL", color: "#4169E1" }
];
