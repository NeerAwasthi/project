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

export async function fetchGitHubProfile(accessToken: string) {
  const response = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`GitHub profile fetch failed: ${response.status}`);
  }

  const data = (await response.json()) as {
    login: string;
    name?: string;
    email?: string;
    avatar_url?: string;
    bio?: string;
    html_url?: string;
    public_repos?: number;
    followers?: number;
    following?: number;
    id: number;
  };

  return {
    id: String(data.id),
    login: data.login,
    name: data.name || data.login,
    email: data.email,
    avatarUrl: data.avatar_url,
    bio: data.bio,
    githubUrl: data.html_url,
    publicRepos: data.public_repos ?? 0,
    followers: data.followers ?? 0,
    following: data.following ?? 0,
  };
}

export async function fetchGitHubRepositories(accessToken: string) {
  const response = await fetch("https://api.github.com/user/repos?sort=updated&per_page=100", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`GitHub repositories fetch failed: ${response.status}`);
  }

  const data = (await response.json()) as Array<{
    id: number;
    full_name: string;
    name: string;
    description?: string | null;
    html_url: string;
    language?: string | null;
    stargazers_count: number;
    forks_count: number;
    watchers_count: number;
    open_issues_count: number;
    visibility: string;
    default_branch: string;
    owner: { login: string };
    created_at?: string;
    updated_at?: string;
    pushed_at?: string;
    topics?: string[];
  }>;

  return data.map((repo) => ({
    id: String(repo.id),
    githubId: String(repo.id),
    name: repo.name,
    fullName: repo.full_name,
    description: repo.description,
    url: repo.html_url,
    language: repo.language,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    watchers: repo.watchers_count,
    openIssues: repo.open_issues_count,
    visibility: repo.visibility,
    defaultBranch: repo.default_branch,
    owner: repo.owner.login,
    createdAt: repo.created_at,
    updatedAt: repo.updated_at,
    pushedAt: repo.pushed_at,
    topics: repo.topics ?? [],
  }));
}

export async function fetchGitHubRepository(accessToken: string, repositoryId: string) {
  const response = await fetch(`https://api.github.com/repositories/${encodeURIComponent(repositoryId)}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`GitHub repository lookup failed: ${response.status}`);
  }

  const repo = (await response.json()) as {
    id: number;
    full_name: string;
    name: string;
    description?: string | null;
    html_url: string;
    language?: string | null;
    stargazers_count: number;
    forks_count: number;
    watchers_count: number;
    open_issues_count: number;
    visibility: string;
    default_branch: string;
    owner: { login: string };
    created_at?: string;
    updated_at?: string;
    pushed_at?: string;
    topics?: string[];
  };

  return {
    id: String(repo.id),
    githubId: String(repo.id),
    name: repo.name,
    fullName: repo.full_name,
    description: repo.description,
    url: repo.html_url,
    language: repo.language,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    watchers: repo.watchers_count,
    openIssues: repo.open_issues_count,
    visibility: repo.visibility,
    defaultBranch: repo.default_branch,
    owner: repo.owner.login,
    createdAt: repo.created_at,
    updatedAt: repo.updated_at,
    pushedAt: repo.pushed_at,
    topics: repo.topics ?? [],
  };
}

export async function fetchGitHubCommits(accessToken: string, repositoryFullName: string) {
  const response = await fetch(`https://api.github.com/repos/${encodeURIComponent(repositoryFullName)}/commits?per_page=5`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return [] as Array<{ message: string; sha: string; date?: string; author?: string | null }>;
  }

  const data = (await response.json()) as Array<{ sha: string; commit: { message: string; author?: { date?: string } }; author?: { login?: string } }>;

  return data.map((commit) => ({
    sha: commit.sha,
    message: commit.commit.message,
    date: commit.commit.author?.date,
    author: commit.author?.login ?? "unknown",
  }));
}
