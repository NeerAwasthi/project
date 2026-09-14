import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { demoAnalysis } from "@/lib/demo-data";
import { env } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import type { AIAnalysisResult, RepositoryRecord } from "@/types/index";

export const aiAnalysisSchema = z.object({
  summary: z.string().min(20),
  strengths: z.array(z.string()).default([]),
  weaknesses: z.array(z.string()).default([]),
  architecture: z.string().min(20),
  codeQuality: z.number().int().min(0).max(100),
  maintainability: z.number().int().min(0).max(100),
  security: z.number().int().min(0).max(100),
  scalability: z.number().int().min(0).max(100),
  technologies: z.array(z.string()).default([]),
  recommendations: z.array(z.string()).default([]),
  learningRecommendations: z.array(z.string()).default([]),
});

export function getAiServiceStatus() {
  if (env.geminiApiKey && env.geminiApiKey.trim()) {
    return { available: true, mode: "configured", reason: "GEMINI_API_KEY is configured." };
  }

  if (env.demoMode) {
    return { available: true, mode: "demo", reason: "Demo mode is enabled." };
  }

  return {
    available: false,
    mode: "missing-config",
    reason: "GEMINI_API_KEY is not configured.",
  };
}

function normalizeGeminiAnalysis(raw: unknown): AIAnalysisResult {
  const obj = typeof raw === "object" && raw ? raw : {};
  const typed = obj as Record<string, unknown>;

  const recommendations = Array.isArray(typed.recommendations)
    ? typed.recommendations.filter((item): item is string => typeof item === "string")
    : Array.isArray(typed.improvements)
      ? typed.improvements.filter((item): item is string => typeof item === "string")
      : [];

  const learningRecommendations = Array.isArray(typed.learningRecommendations)
    ? typed.learningRecommendations.filter((item): item is string => typeof item === "string")
    : [];

  const normalized = aiAnalysisSchema.parse({
    summary: typeof typed.summary === "string" ? typed.summary : demoAnalysis.summary,
    strengths: Array.isArray(typed.strengths) ? typed.strengths.filter((item): item is string => typeof item === "string") : demoAnalysis.strengths,
    weaknesses: Array.isArray(typed.weaknesses) ? typed.weaknesses.filter((item): item is string => typeof item === "string") : demoAnalysis.weaknesses,
    architecture: typeof typed.architecture === "string" ? typed.architecture : demoAnalysis.architecture,
    codeQuality: Number(typed.codeQuality ?? typed.code_quality ?? demoAnalysis.codeQuality),
    maintainability: Number(typed.maintainability ?? typed.maintainabilityScore ?? demoAnalysis.maintainability),
    security: Number(typed.security ?? typed.securityScore ?? demoAnalysis.security),
    scalability: Number(typed.scalability ?? demoAnalysis.scalability),
    technologies: Array.isArray(typed.technologies) ? typed.technologies.filter((item): item is string => typeof item === "string") : demoAnalysis.technologies,
    recommendations,
    learningRecommendations,
  });

  return {
    ...normalized,
    improvements: recommendations,
  };
}

function sanitizeJsonPayload(rawText: string) {
  const trimmed = rawText.trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  if (fenced?.[1]) {
    return fenced[1].trim();
  }

  const start = trimmed.indexOf("{");
  const end = trimmed.lastIndexOf("}");
  if (start >= 0 && end > start) {
    return trimmed.slice(start, end + 1);
  }

  return trimmed;
}

function buildRepositoryPrompt(repository: RepositoryRecord, commitMessages: string[]) {
  const repoSummary = JSON.stringify({
    name: repository.name,
    fullName: repository.fullName,
    description: repository.description ?? "No description provided.",
    language: repository.language ?? "Unknown",
    visibility: repository.visibility,
    defaultBranch: repository.defaultBranch ?? "main",
    owner: repository.owner,
    stars: repository.stars,
    forks: repository.forks,
    watchers: repository.watchers,
    openIssues: repository.openIssues,
    createdAt: repository.createdAt ?? null,
    updatedAt: repository.updatedAt ?? null,
    pushedAt: repository.pushedAt ?? null,
    recentActivity: commitMessages.length ? commitMessages.slice(0, 5) : ["No commit history available."],
  }, null, 2);

  return `Review the following GitHub repository as a senior software engineer. Keep the assessment grounded in the repository metadata and recent activity only. Do not speculate beyond the provided evidence.

Repository data:
${repoSummary}

Return valid JSON only with the following keys and numeric values from 0 to 100:
{
  "summary": "...",
  "strengths": ["..."],
  "weaknesses": ["..."],
  "architecture": "...",
  "codeQuality": 0,
  "maintainability": 0,
  "security": 0,
  "scalability": 0,
  "technologies": ["..."],
  "recommendations": ["..."],
  "learningRecommendations": ["..."]
}

Be concise but useful. Avoid markdown fences.`;
}

async function getRecentCommitMessages(repositoryId: string) {
  try {
    const commits = await prisma.commit.findMany({
      where: { repositoryId },
      select: { message: true },
      orderBy: { createdAt: "desc" },
      take: 5,
    });

    return commits.map((commit) => commit.message).filter(Boolean);
  } catch {
    return [] as string[];
  }
}

export async function analyzeRepository(repository: RepositoryRecord): Promise<AIAnalysisResult> {
  if (env.demoMode) {
    return getAiFallbackAnalysis();
  }

  if (!env.geminiApiKey || !env.geminiApiKey.trim()) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }

  try {
    const ai = new GoogleGenAI({ apiKey: env.geminiApiKey });
    const commitMessages = await getRecentCommitMessages(repository.id);
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: buildRepositoryPrompt(repository, commitMessages),
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsedJson = JSON.parse(sanitizeJsonPayload(response.text ?? "{}"));
    return normalizeGeminiAnalysis(parsedJson);
  } catch (error) {
    console.error("Gemini repository analysis failed:", error);
    throw error;
  }
}

export async function saveAnalysisRecord(
  userId: string,
  repositoryId: string | null,
  analysis: AIAnalysisResult,
) {
  try {
    if (!process.env.DATABASE_URL) {
      return { saved: false, reason: "DATABASE_URL is not configured." };
    }

    await prisma.aIAnalysis.create({
      data: {
        userId,
        repositoryId,
        summary: analysis.summary,
        strengths: analysis.strengths,
        weaknesses: analysis.weaknesses,
        technologies: analysis.technologies,
        codeQuality: analysis.codeQuality,
        architectureScore: Number(analysis.architecture ? 80 : 0),
        securityScore: analysis.security,
        maintainabilityScore: analysis.maintainability,
        recommendations: analysis.recommendations,
      },
    });

    return { saved: true };
  } catch (error) {
    console.error("Failed to persist AI analysis:", error);
    return { saved: false, reason: "Database unavailable or schema mismatch." };
  }
}

export function getAiFallbackAnalysis() {
  return demoAnalysis as AIAnalysisResult;
}
