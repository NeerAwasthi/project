"use client";

import { BotMessageSquare, RefreshCcw, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { demoRepositories } from "@/lib/demo-data";
import type { AIAnalysisResult } from "@/types/index";

const defaultRepoId = demoRepositories[0]?.id ?? "";

export default function AIAnalysisPage() {
  const [selectedRepoId, setSelectedRepoId] = useState(() => {
    if (typeof window === "undefined") {
      return defaultRepoId;
    }

    const storedRepoId = window.localStorage.getItem("selected-ai-repo");
    return storedRepoId && demoRepositories.some((repo) => repo.id === storedRepoId)
      ? storedRepoId
      : defaultRepoId;
  });
  const [analysis, setAnalysis] = useState<AIAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedRepo = useMemo(
    () => demoRepositories.find((repo) => repo.id === selectedRepoId) ?? demoRepositories[0],
    [selectedRepoId],
  );

  const fetchAnalysis = useCallback(async () => {
    if (!selectedRepo) {
      setError("No repository selected.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/ai/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repositoryId: selectedRepo.id }),
      });

      const payload = (await response.json()) as { success?: boolean; data?: AIAnalysisResult; error?: { message?: string }; meta?: { mode?: string; warning?: string } };

      if (!response.ok || !payload.success || !payload.data) {
        throw new Error(payload.error?.message || payload.meta?.warning || "Unable to generate repository analysis.");
      }

      setAnalysis(payload.data);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to generate the analysis right now.");
    } finally {
      setLoading(false);
    }
  }, [selectedRepo]);

  const scoreCards = analysis
    ? [
        { label: "Code quality", value: analysis.codeQuality },
        { label: "Maintainability", value: analysis.maintainability },
        { label: "Security", value: analysis.security },
        { label: "Scalability", value: analysis.scalability },
      ]
    : [];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">AI project review</p>
        <h1 className="mt-2 text-3xl font-bold text-white">AI analysis</h1>
      </div>

      <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex-1">
            <label htmlFor="repository-select" className="mb-2 block text-sm text-slate-300">Repository</label>
            <select
              id="repository-select"
              value={selectedRepoId}
              onChange={(event) => setSelectedRepoId(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-3 text-white outline-none"
            >
              {demoRepositories.map((repo) => (
                <option key={repo.id} value={repo.id}>{repo.fullName}</option>
              ))}
            </select>
          </div>
          <button
            type="button"
            disabled={loading || !selectedRepo}
            onClick={() => void fetchAnalysis()}
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 px-4 py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Analyzing..." : "Analyze with Gemini"}
          </button>
        </div>
      </div>

      {loading && (
        <div className="rounded-3xl border border-dashed border-cyan-400/50 bg-slate-900/80 p-8 text-center text-slate-300">
          Running the repository review with Gemini...
        </div>
      )}

      {error && !loading && (
        <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-5 text-red-200">
          <div className="mb-2 font-medium">Analysis unavailable</div>
          <p className="mb-3 text-sm">{error}</p>
          <button type="button" onClick={() => void fetchAnalysis()} className="inline-flex items-center gap-2 rounded-lg border border-red-300/30 px-3 py-2 text-sm text-red-100">
            <RefreshCcw size={14} /> Retry
          </button>
        </div>
      )}

      {!loading && !error && !analysis && (
        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 text-slate-300">Select a repository and run the AI review to see insights.</div>
      )}

      {analysis && (
        <>
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
            <div className="mb-4 flex items-center gap-3 text-white"><BotMessageSquare size={18} /> AI Project Summary</div>
            <p className="text-slate-300">{analysis.summary}</p>
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
                {analysis.strengths.map((item) => <li key={item} className="rounded-xl border border-white/10 bg-slate-950/40 p-3">{item}</li>)}
              </ul>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
              <div className="mb-5 flex items-center gap-2 text-white"><ShieldCheck size={18} /> Weaknesses</div>
              <ul className="space-y-3 text-slate-300">
                {analysis.weaknesses.map((item) => <li key={item} className="rounded-xl border border-white/10 bg-slate-950/40 p-3">{item}</li>)}
              </ul>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
            <div className="mb-5 flex items-center gap-2 text-white"><TrendingUp size={18} /> Recommended improvements</div>
            <div className="space-y-3">
              {(analysis.recommendations ?? analysis.improvements ?? []).map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-slate-300">{item}</div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
