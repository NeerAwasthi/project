"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, BookOpenText, BriefcaseBusiness, LayoutDashboard, Newspaper, Settings, Sparkles, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/repositories", label: "Repositories", icon: BriefcaseBusiness },
  { href: "/analytics", label: "GitHub Analytics", icon: BarChart3 },
  { href: "/ai-analysis", label: "AI Project Analysis", icon: Sparkles },
  { href: "/news", label: "Tech News", icon: Newspaper },
  { href: "/trending", label: "Trending", icon: TrendingUp },
  { href: "/learning", label: "Learning", icon: BookOpenText },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden min-h-screen w-72 border-r border-white/10 bg-slate-950/70 p-5 backdrop-blur-xl md:flex md:flex-col">
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 font-bold text-slate-950">T</div>
        <div>
          <div className="text-lg font-bold text-white">TechPulse</div>
        </div>
      </div>

      <nav className="space-y-2">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                active
                  ? "bg-gradient-to-r from-violet-500/20 to-cyan-500/10 text-white shadow-lg shadow-violet-500/10 ring-1 ring-violet-400/30"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-full bg-slate-700">
            <Image src="https://avatars.githubusercontent.com/u/1?v=4" alt="User avatar" fill className="object-cover" />
          </div>
          <div>
            <div className="font-semibold text-white">Alex Chen</div>
            <div className="text-xs text-slate-400">@alex-chen</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
