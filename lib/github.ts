import { env } from "@/lib/env";

export type GitHubServiceStatus = {
  available: boolean;
  mode: "demo" | "configured" | "missing-config";
  reason?: string;
};

export function getGitHubServiceStatus(): GitHubServiceStatus {
  if (env.demoMode) {
    return { available: true, mode: "demo", reason: "Demo mode is enabled." };
  }

  if (!env.githubClientId || !env.githubClientSecret) {
    return {
      available: false,
      mode: "missing-config",
      reason: "GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET are not configured.",
    };
  }

  return { available: true, mode: "configured" };
}

export async function exchangeGitHubCode(code: string, state: string, redirectUri: string) {
  const status = getGitHubServiceStatus();

  if (status.mode === "demo") {
    return { ok: true, demo: true, message: "Demo mode is active." };
  }

  if (!env.githubClientId || !env.githubClientSecret) {
    throw new Error("GitHub OAuth is not configured.");
  }

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
      redirect_uri: redirectUri,
      state,
    }),
  });

  const tokenData = (await tokenResponse.json()) as { access_token?: string; error?: string };

  if (!tokenData.access_token || tokenData.error) {
    throw new Error(tokenData.error || "Failed to exchange GitHub OAuth code.");
  }

  return { ok: true, demo: false, accessToken: tokenData.access_token };
}
