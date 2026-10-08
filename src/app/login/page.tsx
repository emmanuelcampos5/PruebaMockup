"use client";
import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, Loader2, Fingerprint, Award } from "lucide-react";
import { AuthShell } from "@/components/auth-shell";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Rol = "candidato" | "admin";

export default function LoginPage() {
  const router = useRouter();
  const [rol, setRol] = React.useState<Rol>("candidato");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [recordar, setRecordar] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.includes("@")) return setError("Introduce un correo electrónico válido.");
    if (password.length < 6) return setError("La contraseña debe tener al menos 6 caracteres (mock).");
    setLoading(true);
    setTimeout(() => {
      router.push(rol === "admin" ? "/admin" : "/mis-postulaciones");
    }, 900);
  };

  const rellenarDemo = () => {
    setEmail(rol === "admin" ? "evaluadora@concursos.gob" : "elena.marquez@mail.com");
    setPassword("demo1234");
    setError(null);
  };

  return (
    <AuthShell
      titulo="Bienvenido de nuevo"
      subtitulo="Accede para postular, seguir tus candidaturas o evaluar como administración. Interfaz en español, clara y accesible."
    >
      <h2 className="text-2xl font-extrabold tracking-tight">Iniciar sesión</h2>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        ¿Aún no tienes cuenta?{" "}
        <Link href="/registro" className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400">
          Regístrate gratis
        </Link>
      </p>

      {/* Selector de rol (mock) */}
      <div className="mt-5 grid grid-cols-2 rounded-xl bg-slate-100 p-1 text-sm font-semibold dark:bg-slate-800">
        {(["candidato", "admin"] as Rol[]).map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRol(r)}
            className={cn(
              "rounded-lg px-3 py-2 transition-colors",
              rol === r ? "bg-white text-indigo-700 shadow dark:bg-slate-900 dark:text-indigo-300" : "text-slate-500 hover:text-slate-700 dark:text-slate-400"
            )}
          >
            {r === "candidato" ? "Soy candidato" : "Soy evaluador"}
          </button>
        ))}
      </div>

      <form onSubmit={submit} className="mt-5 space-y-4">
        <div>
          <Label htmlFor="email">Correo electrónico</Label>
          <div className="relative mt-1">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder={rol === "admin" ? "evaluadora@concursos.gob" : "elena.marquez@mail.com"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Contraseña</Label>
            <Link href="/login?recuperar=1" className="text-xs font-semibold text-indigo-600 hover:underline dark:text-indigo-400">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <div className="relative mt-1">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              id="password"
              type={show ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-9 pr-10"
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
          <input
            type="checkbox"
            checked={recordar}
            onChange={(e) => setRecordar(e.target.checked)}
            className="h-4 w-4 rounded accent-indigo-600"
          />
          Mantener la sesión iniciada en este equipo
        </label>

        {error && (
          <p role="alert" className="rounded-xl bg-red-50 px-3 py-2 text-sm font-medium text-red-700 dark:bg-red-950/50 dark:text-red-300">
            {error}
          </p>
        )}

        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Verificando…
            </>
          ) : (
            "Entrar"
          )}
        </Button>

        <button
          type="button"
          onClick={rellenarDemo}
          className="w-full rounded-xl border border-dashed border-slate-300 px-3 py-2 text-xs text-slate-500 hover:border-indigo-400 hover:text-indigo-600 dark:border-slate-700"
        >
          Usar credenciales de demostración (mock, sin backend)
        </button>
      </form>

      <div className="my-5 flex items-center gap-3 text-xs text-slate-400">
        <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800" /> o continúa con <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <Button variant="outline" type="button" onClick={rellenarDemo}>
          <Fingerprint className="h-4 w-4 text-indigo-600" /> Cl@ve (mock)
        </Button>
        <Button variant="outline" type="button" onClick={rellenarDemo}>
          <Award className="h-4 w-4 text-indigo-600" /> Certificado digital
        </Button>
      </div>

      <p className="mt-5 text-center text-xs leading-relaxed text-slate-400">
        Al entrar aceptas las bases legales del mockup. No se realiza autenticación real ni se envían datos a ningún servidor.
      </p>
    </AuthShell>
  );
}
