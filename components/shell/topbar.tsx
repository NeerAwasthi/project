"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Menu, RefreshCcw, Search } from "lucide-react";

const labels: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/repositories": "Repositories",
  "/analytics": "GitHub Analytics",
  "/ai-analysis": "AI Project Analysis",
  "/news": "Tech News",
  "/trending": "Trending",
  "/learning": "Learning",
  "/settings": "Settings",
};

export function Topbar() {
  const pathname = usePathname();
  const title = labels[pathname] || "Dashboard";

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-6">
        <div className="flex items-center gap-3">
          <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 md:hidden" aria-label="Open menu">
            <Menu size={18} />
          </button>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Overview</p>
            <h1 className="text-xl font-semibold text-white">{title}</h1>
          </div>
        </div>

        <div className="hidden items-center gap-3 rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2 text-sm text-slate-300 md:flex">
          <Search size={15} />
          <input className="w-44 bg-transparent text-sm outline-none placeholder:text-slate-500" placeholder="Search" />
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200">
            <RefreshCcw size={15} />
            <span className="hidden sm:inline">Sync</span>
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200">
            <Bell size={16} />
          </button>
          <Link href="/settings" className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-slate-800">
            <Image src="https://avatars.githubusercontent.com/u/1?v=4" alt="User" fill className="object-cover" />
          </Link>
        </div>
      </div>
    </header>
  );
}
