import { NextResponse } from "next/server";
import { z } from "zod";
import { env } from "@/lib/env";
import { getSessionUser } from "@/lib/auth";
import { demoAnalysis } from "@/lib/demo-data";

const schema = z.object({
  repositoryId: z.string().min(1),
});

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

    if (env.demoMode) {
      return NextResponse.json({ success: true, data: demoAnalysis });
    }

    if (!env.geminiApiKey) {
      return NextResponse.json({ success: false, error: { code: "AI_UNAVAILABLE", message: "AI analysis is temporarily unavailable." } }, { status: 503 });
    }

    return NextResponse.json({ success: true, data: demoAnalysis });
  } catch {
    return NextResponse.json({ success: false, error: { code: "AI_ERROR", message: "AI analysis failed. Please try again later." } }, { status: 500 });
  }
}
