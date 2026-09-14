"use client";

import { Activity, BarChart3, GitBranch, Star, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type RepositoryStats = {
  id: string;
  name: string;
  stars: number;
  forks: number;
  watchers: number;
  language?: string | null;
};

export default function AnalyticsPage() {
  const [repos, setRepos] = useState<RepositoryStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch("/api/github/repositories");
        const payload = await response.json();
        if (!response.ok || !payload.success) {
          throw new Error(payload.error?.message || "Unable to load GitHub analytics.");
        }
        setRepos(Array.isArray(payload.data) ? payload.data : []);
      } catch (requestError) {
        setError(requestError instanceof Error ? requestError.message : "Unable to load analytics.");
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, []);

  const metrics = useMemo(() => [
    { label: "Followers", value: "—", icon: Users },
    { label: "Following", value: "—", icon: Users },
    { label: "Public Repositories", value: String(repos.length), icon: GitBranch },
    { label: "Total Stars", value: String(repos.reduce((sum, repo) => sum + (repo.stars ?? 0), 0)), icon: Star },
  ], [repos]);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-violet-300">Developer analytics</p>
        <h1 className="mt-2 text-3xl font-bold text-white">GitHub analytics</h1>
      </div>

      {error ? <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-200">{error}</div> : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400">{label}</p>
              <Icon size={16} className="text-cyan-300" />
            </div>
            <div className="mt-6 text-3xl font-bold text-white">{value}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
          <div className="mb-6 flex items-center gap-2 text-white"><BarChart3 size={18} /> Repository growth</div>
          {loading ? <div className="text-slate-400">Loading repository data…</div> : repos.length === 0 ? <div className="text-slate-400">No repository activity available.</div> : <div className="grid h-48 grid-cols-6 items-end gap-3">
            {repos.slice(0, 6).map((repo, index) => (
              <div key={repo.id} className="flex h-full items-end justify-center rounded-t-2xl bg-gradient-to-t from-violet-500 to-cyan-400" style={{ height: `${Math.min(100, 20 + (index + 1) * 12)}%` }} />
            ))}
          </div>}
        </div>
        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
          <div className="mb-6 flex items-center gap-2 text-white"><Activity size={18} /> Activity</div>
          {repos.length === 0 ? <div className="text-slate-400">No repository activity data available.</div> : <div className="space-y-4">
            {repos.slice(0, 4).map((repo) => (
              <div key={repo.id}>
                <div className="mb-2 flex items-center justify-between text-sm text-slate-300"><span>{repo.name}</span><span>{repo.stars} stars</span></div>
                <div className="h-2 rounded-full bg-white/5"><div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" style={{ width: `${Math.min(100, 25 + repo.stars / 10)}%` }} /></div>
              </div>
            ))}
          </div>}
        </div>
      </div>
    </div>
  );
}
