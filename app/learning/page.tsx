import { demoLearning } from "@/lib/demo-data";

export default function LearningPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-violet-300">Learning roadmap</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Personalized recommendations</h1>
      </div>

      <div className="space-y-4">
        {demoLearning.map((item) => (
          <div key={item.technology} className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-cyan-300">{item.priority}</div>
                <h2 className="mt-2 text-2xl font-semibold text-white">{item.technology}</h2>
              </div>
              <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-2 py-1 text-xs text-violet-100">{item.skillLevel}</span>
            </div>
            <p className="mt-4 text-slate-300">{item.reason}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {item.resources.map((resource) => (
                <span key={resource} className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">{resource}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
