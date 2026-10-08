import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatFecha(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function diasRestantes(fechaCierre: string): number {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const cierre = new Date(fechaCierre + "T23:59:59");
  return Math.ceil((cierre.getTime() - hoy.getTime()) / 86400000);
}

export function cuentaRegresiva(fechaCierre: string): string {
  const d = diasRestantes(fechaCierre);
  if (d < 0) return "Finalizado";
  if (d === 0) return "Cierra hoy";
  if (d === 1) return "Queda 1 día";
  return `Quedan ${d} días`;
}
