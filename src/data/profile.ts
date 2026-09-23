export interface Profile {
  name: string;
  role: string;
  subHeadline: string;
  location: string;
  timezone: string;
  email: string;
  bio: string;
  aboutHighlights: string[];
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
    email: string;
  };
  resumeUrl: string;
}

export const profileData: Profile = {
  name: "Rahul Teja",
  role: "Software Developer",
  subHeadline: "A Software Developer focused on Backend Engineering & AI/ML, who loves building intuitive, clean and modern technology.",
  location: "Hyderabad, Telangana, India",
  timezone: "Asia/Kolkata (IST, GMT+5:30)",
  email: "nrahulteja@outlook.com",
  bio: "I specialize in architecting distributed backend APIs, scalable microservices, and autonomous AI systems. Driven by clean software design, deterministic safety guardrails, and real-time inference, I build systems engineered for high reliability and throughput.",
  aboutHighlights: [
    "Targeting Backend Engineering, AI/ML, and Software Engineering opportunities.",
    "Hands-on expertise building production-ready REST & ASGI APIs with FastAPI and Spring Boot 3.5.",
    "Advanced experience in Agentic AI workflows, LangGraph multi-agent RAG, and vector search indices (Qdrant, ChromaDB).",
    "Committed to rigorous engineering practices: type safety, automated testing, containerization, and low-latency databases."
  ],
  socials: {
    github: "https://github.com/rahul-1909",
    linkedin: "https://www.linkedin.com/in/nallarahulteja/",
    twitter: "https://x.com/Knightswatch__",
    email: "mailto:nrahulteja@outlook.com",
  },
  resumeUrl: "#resume", // placeholder anchor/action that opens resume modal
};
