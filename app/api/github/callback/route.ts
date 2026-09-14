import { NextResponse } from "next/server";
import { env } from "@/lib/env";
import { clearOAuthState, getOAuthState, setSessionUser } from "@/lib/auth";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const savedState = await getOAuthState();

  if (!code || !state) {
    return NextResponse.redirect(new URL("/login?error=oauth_failed", env.appUrl));
  }

  if (!savedState || savedState !== state) {
    await clearOAuthState();
    return NextResponse.redirect(new URL("/login?error=oauth_state_invalid", env.appUrl));
  }

  if (env.demoMode) {
    await clearOAuthState();
    const demoUser = {
      id: "demo-user",
      username: "alex-chen",
      name: "Alex Chen",
      avatarUrl: "https://avatars.githubusercontent.com/u/1?v=4",
      email: "alex@techpulse.dev",
    };
    await setSessionUser(demoUser);
    return NextResponse.redirect(new URL("/dashboard", env.appUrl));
  }

  if (!env.githubClientId || !env.githubClientSecret) {
    await clearOAuthState();
    return NextResponse.redirect(new URL("/login?error=missing_credentials", env.appUrl));
  }

  try {
    const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: env.githubClientId,
        client_secret: env.githubClientSecret,
        code,
        redirect_uri: env.githubRedirectUri,
        state,
      }),
    });

    const tokenData = (await tokenResponse.json()) as { access_token?: string; token_type?: string; error?: string };

    if (!tokenData.access_token || tokenData.error) {
      await clearOAuthState();
      return NextResponse.redirect(new URL("/login?error=oauth_failed", env.appUrl));
    }

    const userResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        Accept: "application/vnd.github+json",
      },
    });

    if (!userResponse.ok) {
      await clearOAuthState();
      return NextResponse.redirect(new URL("/login?error=oauth_failed", env.appUrl));
    }

    const user = (await userResponse.json()) as {
      id: number;
      login: string;
      name?: string;
      email?: string;
      avatar_url?: string;
      html_url?: string;
      bio?: string;
      public_repos?: number;
      followers?: number;
      following?: number;
    };

    await setSessionUser({
      id: String(user.id),
      username: user.login,
      name: user.name || user.login,
      avatarUrl: user.avatar_url,
      email: user.email,
      accessToken: tokenData.access_token,
    });
    await clearOAuthState();

    return NextResponse.redirect(new URL("/dashboard", env.appUrl));
  } catch {
    await clearOAuthState();
    return NextResponse.redirect(new URL("/login?error=oauth_failed", env.appUrl));
  }
}
