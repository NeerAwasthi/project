"use client";

import Link from "next/link";
import { ArrowUpRight, GitBranch, Star, Telescope } from "lucide-react";
import { useEffect, useState } from "react";

type RepositoryItem = {
  id: string;
  name: string;
  fullName: string;
  description?: string | null;
  language?: string | null;
  stars: number;
  forks: number;
  watchers: number;
  visibility?: string;
  defaultBranch?: string | null;
};

export default function RepositoriesPage() {
  const [repositories, setRepositories] = useState<RepositoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch("/api/github/repositories");
        const payload = await response.json();
        if (!response.ok || !payload.success) {
          throw new Error(payload.error?.message || "Unable to load repositories.");
        }
        setRepositories(Array.isArray(payload.data) ? payload.data : []);
      } catch (requestError) {
        setError(requestError instanceof Error ? requestError.message : "Unable to load repositories.");
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Repository explorer</p>
          <h1 className="text-3xl font-bold text-white">Repositories</h1>
        </div>
      </div>

      {error ? <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-200">{error}</div> : null}

      {loading ? <div className="text-slate-400">Loading repositories…</div> : null}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {repositories.map((repo) => (
          <div key={repo.id} className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-violet-300">{repo.visibility ?? "public"}</div>
                <h3 className="mt-2 text-xl font-semibold text-white">{repo.name}</h3>
              </div>
              <Link href={`/repositories/${repo.id}`} className="rounded-lg border border-white/10 bg-white/5 p-2 text-slate-200"><ArrowUpRight size={16} /></Link>
            </div>
            <p className="min-h-12 text-sm text-slate-300">{repo.description || "No description provided."}</p>
            <div className="mt-5 flex flex-wrap gap-2 text-xs text-slate-300">
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1">{repo.language ?? "Unknown"}</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1">{repo.defaultBranch ?? "main"}</span>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-2 text-sm text-slate-300">
              <div><span className="flex items-center gap-2"><Star size={14} className="text-yellow-300" /> {repo.stars}</span></div>
              <div><span className="flex items-center gap-2"><GitBranch size={14} className="text-cyan-300" /> {repo.forks}</span></div>
              <div><span className="flex items-center gap-2"><Telescope size={14} className="text-violet-300" /> {repo.watchers}</span></div>
            </div>
          </div>
        ))}
      </div>

      {!loading && repositories.length === 0 && !error ? <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4 text-slate-400">No repositories available for this account.</div> : null}
    </div>
  );
}
