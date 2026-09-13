import Image from "next/image";
import { GitBranch, LogOut, ShieldCheck } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-violet-300">Account</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Settings</h1>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="relative h-14 w-14 overflow-hidden rounded-full border border-white/10">
              <Image src="https://avatars.githubusercontent.com/u/1?v=4" alt="Profile" fill className="object-cover" />
            </div>
            <div>
              <div className="text-xl font-semibold text-white">Alex Chen</div>
              <div className="text-slate-400">@alex-chen</div>
            </div>
          </div>
          <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/10 p-4 text-sm text-emerald-100">
            <div className="mb-2 flex items-center gap-2 font-medium"><ShieldCheck size={16} /> GitHub connected</div>
            <div className="flex items-center gap-2 text-emerald-200"><GitBranch size={16} /> github.com/alex-chen</div>
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

      <button className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-200">
        <LogOut size={16} /> Logout
      </button>
    </div>
  );
}
