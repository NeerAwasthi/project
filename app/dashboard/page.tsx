"use client";

import Image from "next/image";
import { Activity, ArrowUpRight, BarChart3, CircleUserRound, GitBranch, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type GithubProfile = {
  username: string;
  name: string;
  avatarUrl?: string;
  publicRepos?: number;
  followers?: number;
  following?: number;
};

type GithubRepo = {
  id: string;
  name: string;
  fullName: string;
  description?: string | null;
  language?: string | null;
  stars: number;
  forks: number;
  watchers: number;
  visibility?: string;
};

export default function DashboardPage() {
  const [profile, setProfile] = useState<GithubProfile | null>(null);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);

      try {
        const [profileResponse, reposResponse] = await Promise.all([
          fetch("/api/github/profile"),
          fetch("/api/github/repositories"),
        ]);

        if (!profileResponse.ok || !reposResponse.ok) {
          throw new Error("Unable to load account data.");
        }

        const profileData = await profileResponse.json();
        const reposData = await reposResponse.json();

        setProfile(profileData.data ?? null);
        setRepos(Array.isArray(reposData.data) ? reposData.data : []);
      } catch (requestError) {
        setError(requestError instanceof Error ? requestError.message : "Unable to load dashboard data.");
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, []);

  const stats = useMemo(() => {
    const totalStars = repos.reduce((sum, repo) => sum + (repo.stars ?? 0), 0);
    const totalForks = repos.reduce((sum, repo) => sum + (repo.forks ?? 0), 0);
    const uniqueLanguages = new Set(repos.map((repo) => repo.language).filter(Boolean)).size;

    return [
      { label: "Public Repositories", value: String(repos.length || profile?.publicRepos || 0), icon: GitBranch },
      { label: "Total Stars", value: totalStars ? totalStars.toLocaleString() : "0", icon: Sparkles },
      { label: "Total Forks", value: totalForks ? totalForks.toLocaleString() : "0", icon: CircleUserRound },
      { label: "Followers", value: String(profile?.followers ?? 0), icon: Activity },
      { label: "Following", value: String(profile?.following ?? 0), icon: BarChart3 },
      { label: "Languages Used", value: String(uniqueLanguages || 0), icon: ArrowUpRight },
      { label: "Recent Commits", value: "—", icon: Activity },
    ];
  }, [profile, repos]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-gradient-to-r from-violet-500/15 to-cyan-500/10 p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-violet-200">Welcome back</p>
          <h1 className="mt-2 text-3xl font-bold text-white">{profile?.name || "Developer"} 👋</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/15 bg-slate-800">
            {profile?.avatarUrl ? <Image src={profile.avatarUrl} alt={profile.name || "Profile"} fill className="object-cover" /> : null}
          </div>
        </div>
      </div>

      {error ? <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-200">{error}</div> : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">{label}</p>
              <div className="rounded-lg bg-violet-500/10 p-2 text-violet-200"><Icon size={16} /></div>
            </div>
            <p className="mt-6 text-3xl font-bold text-white">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Top repositories</h2>
            <Link href="/repositories" className="text-sm text-cyan-300">View all</Link>
          </div>
          <div className="space-y-4">
            {loading ? <div className="text-slate-400">Loading repositories…</div> : repos.length === 0 ? <div className="text-slate-400">No repositories available.</div> : repos.slice(0, 4).map((repo) => (
              <div key={repo.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                <div>
                  <p className="font-medium text-white">{repo.name}</p>
                  <p className="mt-1 text-sm text-slate-400">{repo.language ?? "Unknown"} • {repo.stars} stars</p>
                </div>
                <div className="text-right text-sm text-slate-300">
                  <div>{repo.forks} forks</div>
                  <div>{repo.watchers} watchers</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
          <h2 className="text-xl font-semibold text-white">Recent activity</h2>
          <div className="mt-6 space-y-4">
            {repos.length === 0 ? <div className="text-slate-400">No recent activity available.</div> : repos.slice(0, 3).map((repo) => (
              <div key={repo.id} className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium text-white">{repo.fullName}</p>
                  <span className="rounded-full bg-violet-500/10 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-violet-200">Repo</span>
                </div>
                <p className="mt-2 text-sm text-slate-300">{repo.description || "Repository description not provided."}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
