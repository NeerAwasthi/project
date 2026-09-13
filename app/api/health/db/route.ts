import { NextResponse } from "next/server";
import { env } from "@/lib/env";
import { prisma } from "@/lib/prisma";

export async function GET() {
  if (!env.databaseUrl) {
    return NextResponse.json(
      {
        success: false,
        database: "disconnected",
        error: { code: "DB_CONFIG_MISSING", message: "DATABASE_URL is not configured." },
      },
      { status: 503 },
    );
  }

  try {
    await prisma.$connect();
    const rows = await prisma.$queryRaw<Array<{ ok: number; database_name: string; user_name: string }>>`
      SELECT 1 AS ok, current_database() AS database_name, current_user AS user_name
    `;

    return NextResponse.json({
      success: true,
      database: "connected",
      data: {
        connected: true,
        databaseName: rows[0]?.database_name ?? "unknown",
        userName: rows[0]?.user_name ?? "unknown",
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        database: "disconnected",
        error: {
          code: "DB_CONNECTION_FAILED",
          message: error instanceof Error ? error.message : "Database connection failed.",
        },
      },
      { status: 503 },
    );
  } finally {
    await prisma.$disconnect().catch(() => undefined);
  }
}
