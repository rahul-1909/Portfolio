export interface Certification {
  id: string;
  title: string;
  issuer: 'Microsoft' | 'Amazon Web Services (AWS)' | 'Anthropic';
  category: 'AI / ML' | 'Cloud' | 'Data & SQL' | 'LLM & Prompting';
  description: string;
  skills: string[];
  issueDate?: string;
  expirationDate?: string;
  credentialId?: string;
  verificationUrl: string;
  badgeAccent: {
    bgLight: string;
    bgDark: string;
    text: string;
    border: string;
  };
}

// Consistent brand color schemes for providers
export const PROVIDER_ACCENTS = {
  'Microsoft': {
    bgLight: 'bg-blue-500/10',
    bgDark: 'dark:bg-blue-500/15',
    text: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-500/30 dark:border-blue-500/35',
  },
  'Amazon Web Services (AWS)': {
    bgLight: 'bg-amber-500/10',
    bgDark: 'dark:bg-amber-500/15',
    text: 'text-amber-600 dark:text-amber-400',
    border: 'border-amber-500/30 dark:border-amber-500/35',
  },
  'Anthropic': {
    bgLight: 'bg-orange-500/10',
    bgDark: 'dark:bg-orange-500/15',
    text: 'text-orange-600 dark:text-orange-400',
    border: 'border-orange-500/30 dark:border-orange-500/35',
  },
} as const;

export const certificationsData: Certification[] = [
  {
    id: "ms-mlops-engineer",
    title: "Microsoft Certified: Machine Learning Operations Engineer Associate",
    issuer: "Microsoft",
    category: "AI / ML",
    description: "Validates specialized capabilities in building, operating, and monitoring automated production ML pipelines, feature stores, and scalable model deployment architectures.",
    skills: ["MLOps", "Azure ML", "Model Deployment", "CI/CD Pipelines", "Monitoring"],
    verificationUrl: "https://learn.microsoft.com/api/credentials/share/en-us/rahulteja-1992/351C672DE3DD3551?sharingId=20CEC5EF6DDD8E56",
    badgeAccent: PROVIDER_ACCENTS['Microsoft']
  },
  {
    id: "ms-sql-ai-developer",
    title: "Microsoft Certified: SQL AI Developer Associate",
    issuer: "Microsoft",
    category: "Data & SQL",
    description: "Demonstrates expertise in architecting intelligent data solutions, semantic search, vector embeddings, query optimization, and AI-augmented SQL databases.",
    skills: ["SQL AI", "Vector Search", "Data Pipelines", "T-SQL", "Semantic Indexing"],
    verificationUrl: "https://learn.microsoft.com/api/credentials/share/en-us/rahulteja-1992/B7191AAF49134FC8?sharingId=20CEC5EF6DDD8E56",
    badgeAccent: PROVIDER_ACCENTS['Microsoft']
  },
  {
    id: "ms-azure-data-fundamentals",
    title: "Microsoft Certified: Azure Data Fundamentals",
    issuer: "Microsoft",
    category: "Cloud",
    description: "Demonstrates foundational knowledge of core cloud data concepts, relational & non-relational database services, and enterprise analytical workloads on Azure.",
    skills: ["Azure Data", "Cosmos DB", "Relational SQL", "Data Warehousing", "ETL / ELT"],
    verificationUrl: "https://learn.microsoft.com/api/credentials/share/en-us/rahulteja-1992/FEDB73DCFCA7E3E0?sharingId=20CEC5EF6DDD8E56",
    badgeAccent: PROVIDER_ACCENTS['Microsoft']
  },
  {
    id: "aws-cloud-practitioner",
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services (AWS)",
    category: "Cloud",
    description: "Validates overall understanding of AWS Cloud infrastructure, security architecture, core services (EC2, S3, IAM, VPC), and enterprise cloud migration strategies.",
    skills: ["AWS Cloud", "Core Services", "IAM & Security", "High Availability", "Cloud Architecture"],
    issueDate: "August 4, 2024",
    expirationDate: "August 4, 2027",
    credentialId: "cae1d06cc0504851a742343167d386a3",
    verificationUrl: "https://www.certmetrics.com/amazon/public/verification.aspx",
    badgeAccent: PROVIDER_ACCENTS['Amazon Web Services (AWS)']
  },
  {
    id: "anthropic-claude-101",
    title: "Claude 101",
    issuer: "Anthropic",
    category: "LLM & Prompting",
    description: "In-depth certification covering Claude model architecture, multi-modal reasoning, prompt engineering principles, long-context window optimization, and structured output generation.",
    skills: ["Claude 3.5", "Prompt Engineering", "Context Windows", "Function Calling", "LLM Reasoning"],
    verificationUrl: "https://verify.skilljar.com/c/dsermfpyca5o",
    badgeAccent: PROVIDER_ACCENTS['Anthropic']
  },
  {
    id: "anthropic-ai-fluency",
    title: "AI Fluency: Framework & Foundations",
    issuer: "Anthropic",
    category: "LLM & Prompting",
    description: "Foundational mastery in frontier AI models, evaluation frameworks, autonomous agentic workflows, prompt alignment, and ethical AI deployment best practices.",
    skills: ["Frontier Models", "Agentic Systems", "AI Safety", "Model Evaluation", "Autonomous Workflows"],
    verificationUrl: "https://verify.skilljar.com/c/g59ydrrtrryt",
    badgeAccent: PROVIDER_ACCENTS['Anthropic']
  }
];
