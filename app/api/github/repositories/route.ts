import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { demoRepositories } from "@/lib/demo-data";
import { env } from "@/lib/env";
import { fetchGitHubRepositories } from "@/lib/github";

export async function GET() {
  const user = await getSessionUser();

  if (!user) {
    return NextResponse.json({ success: false, error: { code: "UNAUTHORIZED", message: "Authentication required." } }, { status: 401 });
  }

  if (env.demoMode) {
    return NextResponse.json({ success: true, data: demoRepositories });
  }

  if (!user.accessToken) {
    return NextResponse.json({ success: false, error: { code: "NO_GITHUB_TOKEN", message: "GitHub access token missing." } }, { status: 401 });
  }

  try {
    const repos = await fetchGitHubRepositories(user.accessToken);
    return NextResponse.json({ success: true, data: repos });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: {
        code: "GITHUB_REPOS_FAILED",
        message: error instanceof Error ? error.message : "Unable to load GitHub repositories.",
      },
    }, { status: 502 });
  }
}
