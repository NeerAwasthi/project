import { demoRepositories } from "@/lib/demo-data";

export default function TrendingPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Trending</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Trending technologies</h1>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {demoRepositories.map((repo, index) => (
          <div key={repo.id} className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="rounded-full bg-violet-500/10 px-2 py-1 text-xs uppercase tracking-[0.18em] text-violet-100">{repo.language}</span>
              <span className="text-xs text-slate-400">Live</span>
            </div>
            <h3 className="text-xl font-semibold text-white">#{index + 1} {repo.name}</h3>
            <p className="mt-3 text-sm text-slate-300">{repo.description}</p>
            <div className="mt-5 flex items-center justify-between text-sm text-slate-300">
              <span>{repo.stars} stars</span>
              <span>{repo.forks} forks</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
