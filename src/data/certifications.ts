export interface Certification {
  id: string;
  title: string;
  issuer: 'Microsoft' | 'Amazon Web Services (AWS)' | 'Anthropic';
  category: 'AI / ML' | 'Cloud' | 'Data & SQL' | 'LLM & Prompting';
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

export const certificationsData: Certification[] = [
  {
    id: "ms-mlops-engineer",
    title: "Microsoft Certified: Machine Learning Operations Engineer Associate",
    issuer: "Microsoft",
    category: "AI / ML",
    verificationUrl: "https://learn.microsoft.com/api/credentials/share/en-us/rahulteja-1992/351C672DE3DD3551?sharingId=20CEC5EF6DDD8E56",
    badgeAccent: {
      bgLight: "bg-blue-50",
      bgDark: "dark:bg-blue-950/40",
      text: "text-blue-600 dark:text-blue-400",
      border: "border-blue-200 dark:border-blue-800/60"
    }
  },
  {
    id: "ms-sql-ai-developer",
    title: "Microsoft Certified: SQL AI Developer Associate",
    issuer: "Microsoft",
    category: "Data & SQL",
    verificationUrl: "https://learn.microsoft.com/api/credentials/share/en-us/rahulteja-1992/B7191AAF49134FC8?sharingId=20CEC5EF6DDD8E56",
    badgeAccent: {
      bgLight: "bg-sky-50",
      bgDark: "dark:bg-sky-950/40",
      text: "text-sky-600 dark:text-sky-400",
      border: "border-sky-200 dark:border-sky-800/60"
    }
  },
  {
    id: "ms-azure-data-fundamentals",
    title: "Microsoft Certified: Azure Data Fundamentals",
    issuer: "Microsoft",
    category: "Cloud",
    verificationUrl: "https://learn.microsoft.com/api/credentials/share/en-us/rahulteja-1992/FEDB73DCFCA7E3E0?sharingId=20CEC5EF6DDD8E56",
    badgeAccent: {
      bgLight: "bg-indigo-50",
      bgDark: "dark:bg-indigo-950/40",
      text: "text-indigo-600 dark:text-indigo-400",
      border: "border-indigo-200 dark:border-indigo-800/60"
    }
  },
  {
    id: "aws-cloud-practitioner",
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services (AWS)",
    category: "Cloud",
    issueDate: "August 4, 2024",
    expirationDate: "August 4, 2027",
    credentialId: "cae1d06cc0504851a742343167d386a3",
    verificationUrl: "https://aws.amazon.com/verification",
    badgeAccent: {
      bgLight: "bg-amber-50",
      bgDark: "dark:bg-amber-950/40",
      text: "text-amber-600 dark:text-amber-400",
      border: "border-amber-200 dark:border-amber-800/60"
    }
  },
  {
    id: "anthropic-claude-101",
    title: "Claude 101",
    issuer: "Anthropic",
    category: "LLM & Prompting",
    verificationUrl: "https://verify.skilljar.com/c/dsermfpyca5o",
    badgeAccent: {
      bgLight: "bg-orange-50",
      bgDark: "dark:bg-orange-950/40",
      text: "text-orange-600 dark:text-orange-400",
      border: "border-orange-200 dark:border-orange-800/60"
    }
  },
  {
    id: "anthropic-ai-fluency",
    title: "AI Fluency: Framework & Foundations",
    issuer: "Anthropic",
    category: "LLM & Prompting",
    verificationUrl: "https://verify.skilljar.com/c/g59ydrrtrryt",
    badgeAccent: {
      bgLight: "bg-purple-50",
      bgDark: "dark:bg-purple-950/40",
      text: "text-purple-600 dark:text-purple-400",
      border: "border-purple-200 dark:border-purple-800/60"
    }
  }
];
