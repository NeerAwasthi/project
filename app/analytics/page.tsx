import { Activity, BarChart3, GitBranch, Star, Users } from "lucide-react";

const metrics = [
  { label: "Followers", value: "1.3K", icon: Users },
  { label: "Following", value: "245", icon: Users },
  { label: "Public Repositories", value: "18", icon: GitBranch },
  { label: "Total Stars", value: "1.2K", icon: Star },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-violet-300">Developer analytics</p>
        <h1 className="mt-2 text-3xl font-bold text-white">GitHub analytics</h1>
      </div>

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
          <div className="grid h-48 grid-cols-6 items-end gap-3">
            {[40, 58, 60, 72, 87, 96].map((height, index) => (
              <div key={index} className="flex h-full items-end justify-center rounded-t-2xl bg-gradient-to-t from-violet-500 to-cyan-400" style={{ height: `${height}%` }} />
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
          <div className="mb-6 flex items-center gap-2 text-white"><Activity size={18} /> Activity</div>
          <div className="space-y-4">
            {[
              ["techpulse-platform", 42],
              ["ui-system-kit", 34],
              ["edge-analytics", 28],
            ].map(([repo, count]) => (
              <div key={repo}>
                <div className="mb-2 flex items-center justify-between text-sm text-slate-300"><span>{repo}</span><span>{count} commits</span></div>
                <div className="h-2 rounded-full bg-white/5"><div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" style={{ width: `${count}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
