import { getPaletteColor } from '../utils/palette';

export interface SkillWheelItem {
  id: string;
  name: string;
  title: string;
  category: string;
  subtitle: string;
  descriptor: string;
  backgroundColor: string;
  iconName: string;
}

export const skillsWheelData: SkillWheelItem[] = [
  {
    id: "python",
    name: "Python",
    title: "Python",
    category: "Software Engineering",
    subtitle: "Software Engineering",
    descriptor: "Primary language for distributed services, AI orchestration, and asyncio systems.",
    backgroundColor: getPaletteColor(0), // sand
    iconName: "python",
  },
  {
    id: "java",
    name: "Java 17",
    title: "Java 17",
    category: "Software Engineering",
    subtitle: "Software Engineering",
    descriptor: "Enterprise backend development with modern LTS syntax and concurrent multithreading.",
    backgroundColor: getPaletteColor(1), // slate
    iconName: "java",
  },
  {
    id: "spring-boot",
    name: "Spring Boot 3.5",
    title: "Spring Boot 3.5",
    category: "Software Engineering",
    subtitle: "Software Engineering",
    descriptor: "Stateless microservice architectures, Spring Security JWT RBAC, and JPA.",
    backgroundColor: getPaletteColor(2), // sage
    iconName: "springboot",
  },
  {
    id: "fastapi",
    name: "FastAPI",
    title: "FastAPI",
    category: "Software Engineering",
    subtitle: "Software Engineering",
    descriptor: "High-throughput asynchronous ASGI web services with Pydantic v2 contract enforcement.",
    backgroundColor: getPaletteColor(3), // clay
    iconName: "fastapi",
  },
  {
    id: "sql",
    name: "SQL",
    title: "SQL",
    category: "Data & Storage",
    subtitle: "Data & Storage",
    descriptor: "Advanced relational query optimization, windowing functions, and indexing strategies.",
    backgroundColor: getPaletteColor(4), // lilac
    iconName: "sql",
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    title: "PostgreSQL",
    category: "Data & Storage",
    subtitle: "Data & Storage",
    descriptor: "Relational persistence, pgvector dense embeddings, and robust ACID constraints.",
    backgroundColor: getPaletteColor(5), // sand
    iconName: "postgresql",
  },
  {
    id: "mysql",
    name: "MySQL 9",
    title: "MySQL 9",
    category: "Data & Storage",
    subtitle: "Data & Storage",
    descriptor: "Production transactional database design, schema normalization, and connection pooling.",
    backgroundColor: getPaletteColor(6), // slate
    iconName: "mysql",
  },
  {
    id: "langgraph",
    name: "LangGraph",
    title: "LangGraph",
    category: "AI & ML",
    subtitle: "AI & Machine Learning",
    descriptor: "Cyclic multi-agent state machines, self-correcting graphs, and deterministic checkpoints.",
    backgroundColor: getPaletteColor(7), // sage
    iconName: "langgraph",
  },
  {
    id: "rag",
    name: "RAG & Vector Search",
    title: "RAG & Vector Search",
    category: "AI & ML",
    subtitle: "AI & Machine Learning",
    descriptor: "Corrective RAG (CRAG), document relevance grading, and dense HNSW vector search.",
    backgroundColor: getPaletteColor(8), // clay
    iconName: "rag",
  },
  {
    id: "docker",
    name: "Docker",
    title: "Docker",
    category: "Cloud & Tools",
    subtitle: "Cloud & Tools",
    descriptor: "Reproducible multi-stage container builds, microservice isolation, and compose.",
    backgroundColor: getPaletteColor(9), // lilac
    iconName: "docker",
  },
  {
    id: "aws",
    name: "AWS",
    title: "Amazon Web Services",
    category: "Cloud & Tools",
    subtitle: "Cloud & Tools",
    descriptor: "Certified Cloud Practitioner · EC2, S3, IAM, VPC, and cloud architecture patterns.",
    backgroundColor: getPaletteColor(10), // sand
    iconName: "aws",
  },
  {
    id: "azure",
    name: "Microsoft Azure",
    title: "Microsoft Azure",
    category: "Cloud & Tools",
    subtitle: "Cloud & Tools",
    descriptor: "Certified Azure Data Fundamentals & Cloud Compute microservices deployment.",
    backgroundColor: getPaletteColor(11), // slate
    iconName: "azure",
  },
  {
    id: "git",
    name: "Git & CI/CD",
    title: "Git & CI/CD",
    category: "Cloud & Tools",
    subtitle: "Cloud & Tools",
    descriptor: "Branching workflows, semantic versioning, and automated GitHub Actions CI/CD pipelines.",
    backgroundColor: getPaletteColor(12), // sage
    iconName: "git",
  },
];
