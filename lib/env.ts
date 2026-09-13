export const env = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  demoMode: process.env.DEMO_MODE === "true",
  githubClientId: process.env.GITHUB_CLIENT_ID || "",
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET || "",
  githubRedirectUri: process.env.GITHUB_REDIRECT_URI || `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/github/callback`,
  geminiApiKey: process.env.GEMINI_API_KEY || "",
  newsApiKey: process.env.NEWS_API_KEY || "",
  databaseUrl: process.env.DATABASE_URL || "",
};
