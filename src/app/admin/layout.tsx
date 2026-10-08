import * as React from "react";
import { AdminSidebar, ThemeToggle } from "@/components/layout";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <React.Suspense fallback={<div className="w-64 shrink-0 p-4 text-sm text-slate-400">Cargando…</div>}>
        <AdminSidebar />
      </React.Suspense>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90 sm:px-6">
          <p className="text-sm font-semibold">Panel de administración <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-bold text-amber-800">MOCK · sin backend</span></p>
          <ThemeToggle />
        </header>
        <main className="mx-auto w-full max-w-7xl flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
