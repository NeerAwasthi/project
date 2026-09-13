import Image from "next/image";
import { Activity, ArrowUpRight, BarChart3, CircleUserRound, GitBranch, Sparkles } from "lucide-react";
import Link from "next/link";
import { demoCommits, demoRepositories } from "@/lib/demo-data";

const stats = [
  { label: "Public Repositories", value: "18", icon: GitBranch },
  { label: "Total Stars", value: "1.2k", icon: Sparkles },
  { label: "Total Forks", value: "198", icon: CircleUserRound },
  { label: "Followers", value: "1.3k", icon: Activity },
  { label: "Following", value: "245", icon: BarChart3 },
  { label: "Languages Used", value: "7", icon: ArrowUpRight },
  { label: "Recent Commits", value: "48", icon: Activity },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-gradient-to-r from-violet-500/15 to-cyan-500/10 p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-violet-200">Welcome back</p>
          <h1 className="mt-2 text-3xl font-bold text-white">Alex Chen 👋</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/15 bg-slate-800">
            <Image src="https://avatars.githubusercontent.com/u/1?v=4" alt="Alex Chen" fill className="object-cover" />
          </div>
        </div>
      </div>

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
            {demoRepositories.map((repo) => (
              <div key={repo.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                <div>
                  <p className="font-medium text-white">{repo.name}</p>
                  <p className="mt-1 text-sm text-slate-400">{repo.language} • {repo.stars} stars</p>
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
            {demoCommits.map((commit) => (
              <div key={commit.id} className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium text-white">{commit.repository}</p>
                  <span className="rounded-full bg-violet-500/10 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-violet-200">Commit</span>
                </div>
                <p className="mt-2 text-sm text-slate-300">{commit.message}</p>
                <div className="mt-3 text-xs text-slate-400">{commit.author} • {new Date(commit.createdAt).toLocaleDateString()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
