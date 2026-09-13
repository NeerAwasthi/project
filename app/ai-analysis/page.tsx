import { BotMessageSquare, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import { demoAnalysis } from "@/lib/demo-data";

const scoreCards = [
  { label: "Code quality", value: demoAnalysis.codeQuality },
  { label: "Maintainability", value: demoAnalysis.maintainability },
  { label: "Security", value: demoAnalysis.security },
  { label: "Scalability", value: demoAnalysis.scalability },
];

export default function AIAnalysisPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">AI project review</p>
        <h1 className="mt-2 text-3xl font-bold text-white">AI analysis</h1>
      </div>

      <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
        <div className="mb-4 flex items-center gap-3 text-white"><BotMessageSquare size={18} /> AI Project Summary</div>
        <p className="text-slate-300">{demoAnalysis.summary}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {scoreCards.map(({ label, value }) => (
          <div key={label} className="rounded-2xl border border-white/10 bg-slate-900/80 p-5">
            <div className="mb-3 text-sm text-slate-400">{label}</div>
            <div className="mb-3 text-3xl font-bold text-white">{value}</div>
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" style={{ width: `${value}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
          <div className="mb-5 flex items-center gap-2 text-white"><Sparkles size={18} /> Strengths</div>
          <ul className="space-y-3 text-slate-300">
            {demoAnalysis.strengths.map((item) => <li key={item} className="rounded-xl border border-white/10 bg-slate-950/40 p-3">{item}</li>)}
          </ul>
        </div>
        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
          <div className="mb-5 flex items-center gap-2 text-white"><ShieldCheck size={18} /> Weaknesses</div>
          <ul className="space-y-3 text-slate-300">
            {demoAnalysis.weaknesses.map((item) => <li key={item} className="rounded-xl border border-white/10 bg-slate-950/40 p-3">{item}</li>)}
          </ul>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
        <div className="mb-5 flex items-center gap-2 text-white"><TrendingUp size={18} /> Recommended improvements</div>
        <div className="space-y-3">
          {demoAnalysis.improvements.map((item) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-slate-300">{item}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
