"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, BookText, Flame, GitBranch, Star, Telescope } from "lucide-react";
import { useEffect, useState } from "react";

type RepositoryItem = {
  id: string;
  githubId: string;
  name: string;
  fullName: string;
  description?: string | null;
  url: string;
  language?: string | null;
  stars: number;
  forks: number;
  watchers: number;
  openIssues: number;
  visibility: string;
  defaultBranch?: string | null;
  owner: string;
  createdAt?: string | null;
  updatedAt?: string | null;
  pushedAt?: string | null;
};

export default function RepositoryDetailsPage() {
  const params = useParams<{ id: string }>();
  const [repo, setRepo] = useState<RepositoryItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch("/api/github/repositories");
        const payload = await response.json();
        if (!response.ok || !payload.success) {
          throw new Error(payload.error?.message || "Unable to load repository details.");
        }

        const nextRepo = (Array.isArray(payload.data) ? payload.data : []).find((item: RepositoryItem) => item.id === params.id || item.githubId === params.id || item.fullName === params.id);
        setRepo(nextRepo ?? null);
      } catch (requestError) {
        setError(requestError instanceof Error ? requestError.message : "Unable to load repository details.");
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, [params.id]);

  if (loading) {
    return <div className="text-slate-400">Loading repository…</div>;
  }

  if (error) {
    return <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-200">{error}</div>;
  }

  if (!repo) {
    return <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4 text-slate-300">Repository not found.</div>;
  }

  return (
    <div className="space-y-6">
      <Link href="/repositories" className="inline-flex items-center gap-2 text-sm text-cyan-300"><ArrowLeft size={16} /> Back to repositories</Link>
      <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-violet-300">Repository</div>
            <h1 className="mt-2 text-3xl font-bold text-white">{repo.name}</h1>
            <p className="mt-3 text-slate-300">{repo.description || "No description provided."}</p>
          </div>
          <Link href="/ai-analysis" className="rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 px-4 py-2 font-medium text-white" onClick={() => window.localStorage.setItem("selected-ai-repo", repo.id)}>
            Analyze with Gemini
          </Link>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4"><div className="flex items-center gap-2 text-slate-400"><Star size={14} className="text-yellow-300" /> Stars</div><div className="mt-3 text-2xl font-bold text-white">{repo.stars}</div></div>
          <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4"><div className="flex items-center gap-2 text-slate-400"><GitBranch size={14} className="text-cyan-300" /> Forks</div><div className="mt-3 text-2xl font-bold text-white">{repo.forks}</div></div>
          <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4"><div className="flex items-center gap-2 text-slate-400"><Telescope size={14} className="text-violet-300" /> Watchers</div><div className="mt-3 text-2xl font-bold text-white">{repo.watchers}</div></div>
          <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4"><div className="flex items-center gap-2 text-slate-400"><Flame size={14} className="text-orange-300" /> Issues</div><div className="mt-3 text-2xl font-bold text-white">{repo.openIssues}</div></div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
          <div className="mb-5 flex items-center gap-2 text-white"><BookText size={18} /> Overview</div>
          <div className="space-y-4 text-sm text-slate-300">
            <p><span className="font-medium text-white">Owner:</span> {repo.owner}</p>
            <p><span className="font-medium text-white">Language:</span> {repo.language ?? "Unknown"}</p>
            <p><span className="font-medium text-white">Visibility:</span> {repo.visibility}</p>
            <p><span className="font-medium text-white">Default branch:</span> {repo.defaultBranch ?? "main"}</p>
            <p><span className="font-medium text-white">Repository URL:</span> <a href={repo.url} target="_blank" rel="noreferrer" className="text-cyan-300">{repo.url}</a></p>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
          <div className="mb-5 flex items-center gap-2 text-white"><GitBranch size={18} /> Activity</div>
          <div className="space-y-4">
            {repo.pushedAt ? <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-sm text-slate-300">Last push: {new Date(repo.pushedAt).toLocaleString()}</div> : null}
            <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-sm text-slate-300">Repository ID: {repo.githubId}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
