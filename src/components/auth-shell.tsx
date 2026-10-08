import * as React from "react";
import Link from "next/link";
import { Briefcase, ShieldCheck, FileCheck, Bell, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

function ThemeToggleMini() {
  const [dark, setDark] = React.useState(false);
  React.useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Cambiar tema"
      onClick={() => {
        document.documentElement.classList.toggle("dark");
        setDark(document.documentElement.classList.contains("dark"));
        try {
          localStorage.setItem("theme", document.documentElement.classList.contains("dark") ? "dark" : "light");
        } catch {}
      }}
    >
      {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
}

export function AuthShell({ children, titulo, subtitulo }: { children: React.ReactNode; titulo: string; subtitulo: string }) {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950">
      {/* Barra superior mínima */}
      <header className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
            <Briefcase className="h-5 w-5" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-[15px] font-bold tracking-tight">ConcurSOS</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Empleo público abierto</span>
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <Link href="/" className="hidden text-sm font-medium text-slate-500 hover:text-indigo-600 sm:block">
            ← Volver al portal
          </Link>
          <ThemeToggleMini />
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-6 px-4 pb-12 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:items-stretch">
        {/* Panel institucional */}
        <section className="relative hidden overflow-hidden rounded-3xl bg-indigo-700 p-8 text-white lg:flex lg:flex-col dark:bg-indigo-950">
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{ background: "radial-gradient(600px 300px at 20% 10%, #a5b4fc 0%, transparent 60%), radial-gradient(500px 300px at 90% 90%, #312e81 0%, transparent 60%)" }}
          />
          <div className="relative">
            <p className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
              <ShieldCheck className="h-3.5 w-3.5" /> Plataforma oficial · Datos de demostración
            </p>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight">{titulo}</h1>
            <p className="mt-2 max-w-md text-sm text-indigo-100">{subtitulo}</p>
          </div>
          <ul className="relative mt-8 space-y-4 text-sm">
            {[
              { icon: FileCheck, t: "Un solo perfil para todos los concursos", d: "Reutiliza tu biblioteca de documentos y evita resubir lo mismo." },
              { icon: Bell, t: "Avisos y seguimiento transparente", d: "Timeline Enviada → En revisión → Preselección → Resolución." },
              { icon: ShieldCheck, t: "Acceso seguro institucional", d: "Compatible con Cl@ve y certificado digital (mock, sin backend real)." },
            ].map((f) => (
              <li key={f.t} className="flex gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15">
                  <f.icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-bold">{f.t}</span>
                  <span className="text-indigo-100">{f.d}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="relative mt-auto pt-8 text-xs text-indigo-200">
            Mockup sin autenticación real. Ningún dato sale de tu navegador.
          </p>
        </section>

        {/* Formulario */}
        <section className="flex items-center justify-center">
          <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
            {children}
          </div>
        </section>
      </main>
    </div>
  );
}
