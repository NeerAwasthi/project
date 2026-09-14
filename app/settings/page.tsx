"use client";

import Image from "next/image";
import { GitBranch, LogOut, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SettingsPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<{ name?: string; username?: string; avatarUrl?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch("/api/github/profile");
        const payload = await response.json();
        if (!response.ok || !payload.success) {
          throw new Error(payload.error?.message || "Unable to load account settings.");
        }
        setProfile(payload.data ?? null);
      } catch (requestError) {
        setError(requestError instanceof Error ? requestError.message : "Unable to load account settings.");
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, []);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-violet-300">Account</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Settings</h1>
      </div>

      {error ? <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-200">{error}</div> : null}

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="relative h-14 w-14 overflow-hidden rounded-full border border-white/10">
              {profile?.avatarUrl ? <Image src={profile.avatarUrl} alt={profile.name || "Profile"} fill className="object-cover" /> : null}
            </div>
            <div>
              <div className="text-xl font-semibold text-white">{loading ? "Loading…" : profile?.name || "Unknown user"}</div>
              <div className="text-slate-400">{profile?.username ? `@${profile.username}` : "No GitHub profile loaded"}</div>
            </div>
          </div>
          <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/10 p-4 text-sm text-emerald-100">
            <div className="mb-2 flex items-center gap-2 font-medium"><ShieldCheck size={16} /> GitHub connected</div>
            <div className="flex items-center gap-2 text-emerald-200"><GitBranch size={16} /> {profile?.username ? `github.com/${profile.username}` : "Connected GitHub account"}</div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
          <h2 className="text-xl font-semibold text-white">Preferences</h2>
          <div className="mt-5 space-y-4 text-sm text-slate-300">
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/40 p-3"><span>Theme</span><span>Dark</span></div>
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/40 p-3"><span>Notifications</span><span>Enabled</span></div>
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/40 p-3"><span>Learning difficulty</span><span>Advanced</span></div>
          </div>
        </div>
      </div>

      <button type="button" onClick={() => void handleLogout()} className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-200">
        <LogOut size={16} /> Logout
      </button>
    </div>
  );
}
