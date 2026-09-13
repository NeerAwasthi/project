import Link from "next/link";
import { ArrowRight, BarChart3, BrainCircuit, GitBranch, Sparkles, TrendingUp, Zap } from "lucide-react";

const features = [
  { icon: GitBranch, title: "GitHub Intelligence", description: "Turn repository activity into useful product insights and developer metrics." },
  { icon: BarChart3, title: "Repository Analytics", description: "Track stars, languages, activity, and growth with clear visual summaries." },
  { icon: BrainCircuit, title: "AI Project Analysis", description: "Evaluate architecture, code quality, maintainability, and recommended improvements." },
  { icon: Sparkles, title: "Personalized Learning", description: "Get recommendations tailored to your stack, profile, and project patterns." },
  { icon: TrendingUp, title: "Tech News", description: "Stay updated on AI, web, cloud, and open-source trends from multiple sources." },
  { icon: Zap, title: "Trending Technologies", description: "Find what is rising across the ecosystem and where to focus your next skill." },
];

const steps = ["Connect GitHub", "Analyze Developer Activity", "AI Generates Insights", "Improve Your Skills"];

export default function MarketingPage() {
  return (
    <main className="min-h-screen bg-[#07111f] text-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(76,98,255,0.2),_transparent_20%),radial-gradient(circle_at_bottom_right,_rgba(34,211,238,0.14),_transparent_25%)]" />
      <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-8">
        <header className="flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 font-bold text-slate-950">T</div>
            <span className="text-lg font-semibold">TechPulse</span>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            <Link href="#features">Features</Link>
            <Link href="#how-it-works">How it works</Link>
            <Link href="#cta">Demo</Link>
          </nav>
          <Link href="/login" className="rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-cyan-500/20 transition hover:opacity-90">
            Sign in
          </Link>
        </header>

        <section className="grid items-center gap-10 px-2 pb-20 pt-16 md:grid-cols-2 md:pt-24">
          <div>
            <div className="mb-5 inline-flex items-center rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-200">AI-powered intelligence for your developer journey</div>
            <h1 className="max-w-xl text-4xl font-black tracking-tight text-white md:text-6xl">
              TechPulse
            </h1>
            <p className="mt-5 max-w-lg text-lg text-slate-300">
              Transform your GitHub activity, project patterns, and learning momentum into a clear path for growth.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="/login" className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 px-6 py-3 font-medium text-white shadow-xl shadow-violet-500/25 transition hover:translate-y-[-1px]">
                GitHub Login <ArrowRight size={18} />
              </Link>
              <a href="#features" className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 font-medium text-slate-200 transition hover:bg-white/10">
                Explore Features
              </a>
            </div>
            <div className="mt-10 flex items-center gap-8 text-sm text-slate-300">
              <div><span className="block text-2xl font-bold text-white">18K+</span> developer signals</div>
              <div><span className="block text-2xl font-bold text-white">4.9/5</span> satisfaction</div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-4 shadow-2xl shadow-violet-500/10 backdrop-blur-xl">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400" />
                </div>
                <div className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-cyan-200">Live Dev Insights</div>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-violet-500/20 to-slate-900 p-4">
                  <div className="text-sm text-slate-300">Public Repositories</div>
                  <div className="mt-4 text-3xl font-bold text-white">18</div>
                  <div className="mt-4 h-2 rounded-full bg-white/10">
                    <div className="h-2 w-[72%] rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" />
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/20 to-slate-900 p-4">
                  <div className="text-sm text-slate-300">Weekly Activity</div>
                  <div className="mt-4 text-3xl font-bold text-white">82%</div>
                  <div className="mt-4 h-2 rounded-full bg-white/10">
                    <div className="h-2 w-[82%] rounded-full bg-gradient-to-r from-cyan-400 to-violet-500" />
                  </div>
                </div>
              </div>
              <div className="mt-4 rounded-2xl border border-white/10 bg-slate-900/80 p-4">
                <div className="mb-3 flex items-center justify-between text-sm text-slate-300">
                  <span>AI project assessment</span>
                  <span className="font-semibold text-cyan-300">88/100</span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-xs text-slate-400">
                  {[65, 80, 90, 78].map((val, index) => (
                    <div key={index} className="flex h-20 items-end justify-center rounded-xl bg-white/5 p-2">
                      <div className="w-full rounded-t-xl bg-gradient-to-t from-violet-500 to-cyan-400" style={{ height: `${val}%` }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-20">
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-violet-300">Features</p>
            <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">Everything you need to sharpen your developer edge.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {features.map(({ icon: Icon, title, description }) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:-translate-y-1 hover:border-violet-400/40 hover:bg-white/8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/30 to-cyan-500/30 text-violet-100">
                  <Icon size={22} />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-white">{title}</h3>
                <p className="text-slate-300">{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="how-it-works" className="py-20">
          <div className="mb-10 text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">How it works</p>
            <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">A clean path from activity to action.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step} className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 text-center">
                <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 font-bold text-white">{index + 1}</div>
                <p className="text-base font-medium text-slate-200">{step}</p>
                {index < steps.length - 1 && <div className="mt-4 text-cyan-300">↓</div>}
              </div>
            ))}
          </div>
        </section>

        <section id="cta" className="py-20">
          <div className="rounded-3xl border border-violet-500/20 bg-gradient-to-r from-violet-500/10 via-slate-900 to-cyan-500/10 p-8 text-center md:p-14">
            <h2 className="text-3xl font-bold text-white md:text-4xl">Turn your GitHub activity into actionable intelligence.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-300">See your repositories, patterns, and learning opportunities in one polished developer workspace built for real-world growth.</p>
            <Link href="/login" className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-slate-950 transition hover:opacity-90">
              Start with GitHub <ArrowRight size={18} />
            </Link>
          </div>
        </section>

        <footer className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 py-8 text-sm text-slate-400 md:flex-row">
          <div className="font-semibold text-white">TechPulse</div>
          <div className="flex gap-6">
            <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Project</a>
          </div>
        </footer>
      </div>
    </main>
  );
}
