import { NextResponse } from "next/server";
import { getAiServiceStatus } from "@/lib/ai";
import { env } from "@/lib/env";
import { getGitHubServiceStatus } from "@/lib/github";
import { prisma } from "@/lib/prisma";

async function getDatabaseHealth() {
  if (!env.databaseUrl) {
    return {
      available: false,
      status: "missing-config",
      database: "disconnected",
      message: "DATABASE_URL is not configured.",
    };
  }

  try {
    await prisma.$connect();
    const rows = await prisma.$queryRaw<Array<{ ok: number; database_name: string; user_name: string }>>`
      SELECT 1 AS ok, current_database() AS database_name, current_user AS user_name
    `;

    return {
      available: true,
      status: "connected",
      database: "connected",
      message: "Database connection is live.",
      databaseName: rows[0]?.database_name ?? "unknown",
      userName: rows[0]?.user_name ?? "unknown",
    };
  } catch (error) {
    return {
      available: false,
      status: "unreachable",
      database: "disconnected",
      message: error instanceof Error ? error.message : "Database connection failed.",
    };
  } finally {
    await prisma.$disconnect().catch(() => undefined);
  }
}

export async function GET() {
  const dbStatus = await getDatabaseHealth();

  return NextResponse.json({
    success: true,
    services: {
      application: "ok",
      database: dbStatus.database,
      github: getGitHubServiceStatus().mode,
      gemini: getAiServiceStatus().mode,
    },
    data: {
      demoMode: env.demoMode,
      database: dbStatus,
      github: getGitHubServiceStatus(),
      ai: getAiServiceStatus(),
      timestamp: new Date().toISOString(),
    },
  });
}
