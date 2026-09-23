export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  current: boolean;
  type: string;
  summary: string;
  responsibilities: string[];
  technologies: string[];
}

export const experienceData: ExperienceItem[] = [
  {
    id: "virtusa-intern",
    role: "Software Intern / Full Stack Software Intern",
    company: "Virtusa",
    location: "Chennai, India",
    period: "August 2025 – June 2026",
    current: false,
    type: "Internship",
    summary: "Contributed to backend and full-stack software development, building and integrating RESTful APIs, optimizing relational databases, and supporting production-oriented engineering practices.",
    responsibilities: [
      "Engineered backend application services and API endpoints adhering to modern software design patterns and strict data contracts.",
      "Collaborated on database interactions, writing efficient SQL queries, optimizing schema constraints, and managing migrations.",
      "Assisted in full-stack feature development and API consumption, ensuring seamless state management and responsive client interactions.",
      "Integrated CI/CD automated testing workflows and Dockerized local development environments for predictable builds.",
      "Participated in active debugging, code reviews, and defect triaging to maintain software reliability."
    ],
    technologies: [
      "Software Development",
      "Backend APIs",
      "Full-Stack",
      "Python",
      "TypeScript",
      "Databases & SQL",
      "Git / GitHub",
      "CI/CD",
      "Docker"
    ]
  }
];
