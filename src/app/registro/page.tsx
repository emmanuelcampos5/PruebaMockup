"use client";
import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, CheckCircle2, User, Mail, IdCard, Phone } from "lucide-react";
import { AuthShell } from "@/components/auth-shell";
import { Button } from "@/components/ui/button";
import { Input, Label, Select } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

function fuerzaPassword(pw: string): { pct: number; etiqueta: string; color: string } {
  let pts = 0;
  if (pw.length >= 8) pts += 1;
  if (pw.length >= 12) pts += 1;
  if (/[A-ZÁÉÍÓÚ]/.test(pw) && /[a-záéíóú]/.test(pw)) pts += 1;
  if (/\d/.test(pw)) pts += 1;
  if (/[^A-Za-z0-9]/.test(pw)) pts += 1;
  const pct = Math.min(100, (pts / 5) * 100);
  if (pts <= 2) return { pct, etiqueta: "Débil", color: "bg-red-500" };
  if (pts <= 3) return { pct, etiqueta: "Aceptable", color: "bg-amber-500" };
  if (pts <= 4) return { pct, etiqueta: "Fuerte", color: "bg-emerald-500" };
  return { pct, etiqueta: "Muy fuerte", color: "bg-emerald-600" };
}

export default function RegistroPage() {
  const router = useRouter();
  const [nombre, setNombre] = React.useState("");
  const [apellidos, setApellidos] = React.useState("");
  const [tipoDoc, setTipoDoc] = React.useState("DNI");
  const [numDoc, setNumDoc] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [telefono, setTelefono] = React.useState("");
  const [pw, setPw] = React.useState("");
  const [pw2, setPw2] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [acepta, setAcepta] = React.useState(false);
  const [comunicaciones, setComunicaciones] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [ok, setOk] = React.useState(false);

  const fuerza = fuerzaPassword(pw);
  const coincide = pw.length > 0 && pw === pw2;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (nombre.trim().length < 2) return setError("Introduce tu nombre.");
    if (apellidos.trim().length < 2) return setError("Introduce tus apellidos.");
    if (numDoc.trim().length < 5) return setError("Introduce un documento válido (DNI/NIE/pasaporte).");
    if (!email.includes("@")) return setError("Introduce un correo electrónico válido.");
    if (pw.length < 8) return setError("La contraseña debe tener al menos 8 caracteres.");
    if (!coincide) return setError("Las contraseñas no coinciden.");
    if (!acepta) return setError("Debes aceptar las bases y la política de privacidad.");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOk(true);
    }, 1000);
  };

  if (ok) {
    return (
      <AuthShell titulo="Cuenta creada" subtitulo="Ya puedes postular a cualquier concurso abierto con tu nuevo perfil.">
        <div className="py-6 text-center">
          <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-500" />
          <h2 className="mt-4 text-2xl font-extrabold">¡Cuenta creada! (mock)</h2>
          <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500">
            Hola, {nombre || "candidata/o"}. Hemos creado tu perfil de demostración con <b>{email}</b>. Te hemos enviado un correo de verificación ficticio.
          </p>
          <div className="mx-auto mt-5 max-w-sm rounded-2xl bg-slate-50 p-4 text-left text-sm dark:bg-slate-800">
            <p className="font-bold">Próximos pasos sugeridos</p>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-slate-500">
              <li>Completa tu biblioteca de documentos</li>
              <li>Postula a un concurso abierto</li>
              <li>Activa los avisos de cierre</li>
            </ul>
          </div>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Button variant="outline" onClick={() => setOk(false)}>
              Revisar datos
            </Button>
            <Button size="lg" onClick={() => router.push("/mis-postulaciones")}>
              Ir a mis postulaciones
            </Button>
          </div>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      titulo="Crea tu cuenta de candidato"
      subtitulo="Un registro único para postular a todos los concursos, reutilizar documentos y recibir avisos de cierre y resolución."
    >
      <h2 className="text-2xl font-extrabold tracking-tight">Registrarme</h2>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        ¿Ya tienes cuenta?{" "}
        <Link href="/login" className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400">
          Inicia sesión
        </Link>
      </p>

      <form onSubmit={submit} className="mt-5 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="nombre">Nombre *</Label>
            <div className="relative mt-1">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input id="nombre" placeholder="Elena" value={nombre} onChange={(e) => setNombre(e.target.value)} className="pl-9" />
            </div>
          </div>
          <div>
            <Label htmlFor="apellidos">Apellidos *</Label>
            <Input id="apellidos" placeholder="Márquez Ruiz" value={apellidos} onChange={(e) => setApellidos(e.target.value)} />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-[130px_1fr]">
          <div>
            <Label htmlFor="tipoDoc">Tipo doc. *</Label>
            <Select id="tipoDoc" value={tipoDoc} onChange={(e) => setTipoDoc(e.target.value)} className="mt-1">
              <option>DNI</option>
              <option>NIE</option>
              <option>Pasaporte</option>
            </Select>
          </div>
          <div>
            <Label htmlFor="numDoc">Número de documento *</Label>
            <div className="relative mt-1">
              <IdCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input id="numDoc" placeholder="48291357K" value={numDoc} onChange={(e) => setNumDoc(e.target.value)} className="pl-9" />
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="email">Correo electrónico *</Label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input id="email" type="email" autoComplete="email" placeholder="elena@mail.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-9" />
            </div>
          </div>
          <div>
            <Label htmlFor="telefono">Teléfono (opcional)</Label>
            <div className="relative mt-1">
              <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input id="telefono" type="tel" autoComplete="tel" placeholder="+34 612 345 678" value={telefono} onChange={(e) => setTelefono(e.target.value)} className="pl-9" />
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="pw">Contraseña * (mín. 8)</Label>
            <div className="relative mt-1">
              <Input id="pw" type={show ? "text" : "password"} autoComplete="new-password" placeholder="••••••••" value={pw} onChange={(e) => setPw(e.target.value)} className="pr-10" />
              <button type="button" onClick={() => setShow(!show)} aria-label="Mostrar contraseña" className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400">
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {pw && (
              <div className="mt-2">
                <Progress value={fuerza.pct} barClass={cn(fuerza.color)} />
                <p className="mt-1 text-xs text-slate-500">
                  Fortaleza: <b>{fuerza.etiqueta}</b> · usa mayúsculas, números y símbolos
                </p>
              </div>
            )}
          </div>
          <div>
            <Label htmlFor="pw2">Repite la contraseña *</Label>
            <Input id="pw2" type={show ? "text" : "password"} autoComplete="new-password" placeholder="••••••••" value={pw2} onChange={(e) => setPw2(e.target.value)} className="mt-1" />
            {pw2 && (
              <p className={cn("mt-1 text-xs font-medium", coincide ? "text-emerald-600" : "text-red-600")}>
                {coincide ? "✓ Las contraseñas coinciden" : "✕ No coinciden todavía"}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2 rounded-2xl bg-slate-50 p-4 text-sm dark:bg-slate-800">
          <label className="flex cursor-pointer items-start gap-2">
            <input type="checkbox" checked={acepta} onChange={(e) => setAcepta(e.target.checked)} className="mt-1 h-4 w-4 accent-indigo-600" />
            <span>
              Acepto las <span className="font-semibold text-indigo-600">bases legales</span> y la <span className="font-semibold text-indigo-600">política de privacidad</span> del mockup. *
            </span>
          </label>
          <label className="flex cursor-pointer items-start gap-2 text-slate-500">
            <input type="checkbox" checked={comunicaciones} onChange={(e) => setComunicaciones(e.target.checked)} className="mt-1 h-4 w-4 accent-indigo-600" />
            <span>Quiero recibir avisos de nuevos concursos y cierres próximos.</span>
          </label>
        </div>

        {error && (
          <p role="alert" className="rounded-xl bg-red-50 px-3 py-2 text-sm font-medium text-red-700 dark:bg-red-950/50 dark:text-red-300">
            {error}
          </p>
        )}

        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Creando cuenta…
            </>
          ) : (
            "Crear cuenta"
          )}
        </Button>
      </form>

      <p className="mt-4 text-center text-xs text-slate-400">Registro ficticio: no se crea ningún usuario real ni se envía nada a un servidor.</p>
    </AuthShell>
  );
}
