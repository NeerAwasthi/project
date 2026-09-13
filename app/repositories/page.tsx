import Link from "next/link";
import { ArrowUpRight, GitBranch, Star, Telescope } from "lucide-react";
import { demoRepositories } from "@/lib/demo-data";

export default function RepositoriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Repository explorer</p>
          <h1 className="text-3xl font-bold text-white">Repositories</h1>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {demoRepositories.map((repo) => (
          <div key={repo.id} className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-violet-300">{repo.visibility}</div>
                <h3 className="mt-2 text-xl font-semibold text-white">{repo.name}</h3>
              </div>
              <Link href={`/repositories/${repo.id}`} className="rounded-lg border border-white/10 bg-white/5 p-2 text-slate-200"><ArrowUpRight size={16} /></Link>
            </div>
            <p className="min-h-12 text-sm text-slate-300">{repo.description}</p>
            <div className="mt-5 flex flex-wrap gap-2 text-xs text-slate-300">
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1">{repo.language}</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1">{repo.defaultBranch}</span>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-2 text-sm text-slate-300">
              <div><span className="flex items-center gap-2"><Star size={14} className="text-yellow-300" /> {repo.stars}</span></div>
              <div><span className="flex items-center gap-2"><GitBranch size={14} className="text-cyan-300" /> {repo.forks}</span></div>
              <div><span className="flex items-center gap-2"><Telescope size={14} className="text-violet-300" /> {repo.watchers}</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
