import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-indigo-600 text-white",
        abierto: "border-transparent bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
        pronto: "border-transparent bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
        cerrado: "border-transparent bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
        info: "border-transparent bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300",
        destructive: "border-transparent bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
        outline: "border-slate-200 text-slate-700 dark:border-slate-700 dark:text-slate-300",
        violet: "border-transparent bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export function estadoConcursoVariant(estado: string) {
  if (estado === "Abierto") return "abierto" as const;
  if (estado === "Cierra pronto") return "pronto" as const;
  return "cerrado" as const;
}
