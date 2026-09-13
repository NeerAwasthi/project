import Link from "next/link";
import { GitBranch, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#07111f] px-6 py-10 text-slate-100">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-violet-900/20 backdrop-blur-xl">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 text-lg font-bold text-slate-950">T</div>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-violet-300">Developer intelligence</p>
            <h1 className="text-2xl font-bold text-white">TechPulse</h1>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-white">Welcome back</h2>
        <p className="mt-2 text-slate-300">Sign in to unlock GitHub insights, AI analysis, and personalized learning.</p>

        <div className="mt-8 space-y-4">
          <a href="/api/github/auth" className="flex w-full items-center justify-center gap-3 rounded-xl bg-white px-4 py-3 text-base font-semibold text-slate-900 transition hover:opacity-90">
            <GitBranch size={20} />
            Continue with GitHub
          </a>
          <Link href="/" className="flex w-full items-center justify-center rounded-xl border border-white/10 bg-slate-800 px-4 py-3 text-base text-slate-200 transition hover:bg-slate-700">
            Back to home
          </Link>
        </div>

        <div className="mt-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-200">
          <div className="mb-2 flex items-center gap-2 font-medium"><ShieldCheck size={16} /> Secure OAuth</div>
          <p>GitHub access is handled securely server-side and never exposed to the client.</p>
        </div>
      </div>
    </main>
  );
}
