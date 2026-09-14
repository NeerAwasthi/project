import { NextResponse } from "next/server";
import { z } from "zod";
import { getSessionUser } from "@/lib/auth";
import { analyzeRepository, getAiFallbackAnalysis, saveAnalysisRecord } from "@/lib/ai";
import { demoRepositories } from "@/lib/demo-data";
import { env } from "@/lib/env";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  repositoryId: z.string().min(1),
});

async function resolveRepositoryForUser(userId: string, repositoryId: string) {
  const demoRepository = demoRepositories.find((repo) => repo.id === repositoryId);
  if (demoRepository) {
    if (userId === "demo-user" || env.demoMode) {
      return demoRepository;
    }
  }

  try {
    const stored = await prisma.repository.findFirst({
      where: {
        id: repositoryId,
        userId,
      },
    });

    if (stored) {
      return {
        id: stored.id,
        githubId: stored.githubId,
        name: stored.name,
        fullName: stored.fullName,
        description: stored.description,
        url: stored.url,
        language: stored.language,
        stars: stored.stars,
        forks: stored.forks,
        watchers: stored.watchers,
        openIssues: stored.openIssues,
        visibility: stored.visibility,
        defaultBranch: stored.defaultBranch,
        owner: stored.owner,
        createdAt: stored.createdAt,
        updatedAt: stored.updatedAt,
        pushedAt: stored.pushedAt,
      };
    }
  } catch {
    return null;
  }

  return null;
}

export async function POST(request: Request) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ success: false, error: { code: "UNAUTHORIZED", message: "Authentication required." } }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ success: false, error: { code: "INVALID_REQUEST", message: "Repository selection is required." } }, { status: 400 });
    }

    const repository = await resolveRepositoryForUser(user.id, parsed.data.repositoryId);
    if (!repository) {
      return NextResponse.json({ success: false, error: { code: "REPOSITORY_NOT_FOUND", message: "Repository not found or access denied." } }, { status: 404 });
    }

    if (env.demoMode) {
      return NextResponse.json({ success: true, data: getAiFallbackAnalysis(), meta: { mode: "demo" } });
    }

    const hasGeminiKey = Boolean(env.geminiApiKey && env.geminiApiKey.trim());
    if (!hasGeminiKey) {
      return NextResponse.json({
        success: false,
        error: { code: "AI_SERVICE_UNAVAILABLE", message: "GEMINI_API_KEY is not configured." },
      }, { status: 503 });
    }

    const analysis = await analyzeRepository(repository);

    if (repository.id) {
      await saveAnalysisRecord(user.id, repository.id, analysis);
    }

    return NextResponse.json({ success: true, data: analysis, meta: { mode: "gemini" } });
  } catch (error) {
    console.error("AI analysis route failed:", error);
    return NextResponse.json({
      success: false,
      error: {
        code: "AI_ANALYSIS_FAILED",
        message: error instanceof Error ? error.message : "Gemini AI analysis failed.",
      },
    }, { status: 500 });
  }
}
