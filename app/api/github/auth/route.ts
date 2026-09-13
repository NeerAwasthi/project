import { NextResponse } from "next/server";
import { env } from "@/lib/env";
import { setOAuthState } from "@/lib/auth";

export async function GET() {
  if (!env.githubClientId || !env.githubClientSecret) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "GITHUB_OAUTH_NOT_CONFIGURED",
          message: "GitHub OAuth is not configured. Add GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET to .env.local.",
        },
      },
      { status: 503 },
    );
  }

  const redirectUri = encodeURIComponent(env.githubRedirectUri);
  const scope = encodeURIComponent("read:user,user:email");
  const state = crypto.randomUUID();
  await setOAuthState(state);

  const url = `https://github.com/login/oauth/authorize?client_id=${encodeURIComponent(env.githubClientId)}&redirect_uri=${redirectUri}&scope=${scope}&state=${encodeURIComponent(state)}`;

  return NextResponse.redirect(url);
}
