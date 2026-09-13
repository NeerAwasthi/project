export type RepositoryRecord = {
  id: string;
  githubId: string;
  name: string;
  fullName: string;
  description?: string | null;
  url: string;
  language?: string | null;
  stars: number;
  forks: number;
  watchers: number;
  openIssues: number;
  visibility: string;
  defaultBranch?: string | null;
  owner: string;
  createdAt?: Date | string | null;
  updatedAt?: Date | string | null;
  pushedAt?: Date | string | null;
};

export type UserProfile = {
  id: string;
  username: string;
  name?: string | null;
  email?: string | null;
  avatarUrl?: string | null;
  bio?: string | null;
  githubUrl?: string | null;
  publicRepos: number;
  followers: number;
  following: number;
  createdAt?: Date | string | null;
  updatedAt?: Date | string | null;
};

export type NewsItem = {
  title: string;
  description?: string;
  url: string;
  source: string;
  publishedAt?: string;
  category: string;
};

export type AIAnalysisResult = {
  summary: string;
  strengths: string[];
  weaknesses: string[];
  architecture: string;
  codeQuality: number;
  maintainability: number;
  security: number;
  scalability: number;
  technologies: string[];
  improvements: string[];
  learningRecommendations: string[];
};

export type LearningItem = {
  technology: string;
  reason: string;
  skillLevel: string;
  resources: string[];
  priority: string;
};
