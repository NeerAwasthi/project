import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { demoCommits } from "@/lib/demo-data";
import { env } from "@/lib/env";

export async function GET() {
  const user = await getSessionUser();

  if (!user) {
    return NextResponse.json({ success: false, error: { code: "UNAUTHORIZED", message: "Authentication required." } }, { status: 401 });
  }

  if (env.demoMode) {
    return NextResponse.json({ success: true, data: demoCommits });
  }

  return NextResponse.json({ success: true, data: [] });
}
