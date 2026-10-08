"use client";
import { cn } from "@/lib/utils";

export function Progress({ value, className, barClass }: { value: number; className?: string; barClass?: string }) {
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800", className)}>
      <div className={cn("h-full rounded-full bg-indigo-600 transition-all dark:bg-indigo-500", barClass)} style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  );
}

export function Steps({ steps, current }: { steps: string[]; current: number }) {
  return (
    <div className="flex items-center gap-2">
      {steps.map((s, i) => (
        <div key={s} className="flex flex-1 items-center gap-2">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold",
                i < current
                  ? "bg-indigo-600 text-white"
                  : i === current
                    ? "bg-indigo-600 text-white ring-4 ring-indigo-100 dark:ring-indigo-950"
                    : "bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-300"
              )}
            >
              {i + 1}
            </span>
            <span className={cn("hidden text-xs font-medium sm:block", i === current ? "text-indigo-700 dark:text-indigo-300" : "text-slate-500")}>{s}</span>
          </div>
          {i < steps.length - 1 && <div className={cn("h-px flex-1", i < current ? "bg-indigo-600" : "bg-slate-200 dark:bg-slate-700")} />}
        </div>
      ))}
    </div>
  );
}
