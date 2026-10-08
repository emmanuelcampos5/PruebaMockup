"use client";
import * as React from "react";
import { Send, Eye, FlaskConical, CalendarClock, CheckCircle2, Truck, Inbox, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input, Label, Textarea, Select } from "@/components/ui/input";
import { Progress, Steps } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CAMPANAS } from "@/lib/mock-data";

const DESTINATARIOS = [
  { nombre: "Elena Márquez Ruiz", email: "elena.marquez@mail.com", estado: "Entregado" },
  { nombre: "Javier Torres Gil", email: "j.torres@mail.com", estado: "Enviado" },
  { nombre: "Lucía Fernández Sanz", email: "lucia.f@mail.com", estado: "Entregado" },
  { nombre: "Marco Aguilar Díaz", email: "marco.ag@mail.com", estado: "Rebotado" },
  { nombre: "Sara Núñez Vega", email: "sara.nv@mail.com", estado: "En cola" },
];

function estadoIcon(e: string) {
  if (e === "Entregado") return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
  if (e === "Enviado") return <Send className="h-4 w-4 text-sky-500" />;
  if (e === "En cola") return <Inbox className="h-4 w-4 text-slate-400" />;
  return <AlertTriangle className="h-4 w-4 text-red-500" />;
}

export default function MensajeriaPage() {
  const [paso, setPaso] = React.useState(0);
  const [asunto, setAsunto] = React.useState("Subsaná tu postulación (48h) · {{concurso}}");
  const [cuerpo, setCuerpo] = React.useState("Hola {{nombre}},\n\nHemos revisado tu postulación al concurso {{concurso}}. Te falta documentación por subsanar antes del {{cierre}}.\n\nAccede a Mis postulaciones para completarla.\n\nSaludos,\nEquipo de Selección");
  const [filtro] = React.useState("Concurso: Full-Stack · Con doc. pendiente · 34 personas");
  const [programar, setProgramar] = React.useState("2026-10-10T09:00");
  const [enviada, setEnviada] = React.useState(false);
  const [prueba, setPrueba] = React.useState<"idle" | "enviando" | "ok">("idle");

  const enviarPrueba = () => {
    if (prueba === "enviando") return;
    setPrueba("enviando");
    setTimeout(() => setPrueba("ok"), 900);
  };

  const preview = cuerpo.replaceAll("{{nombre}}", "Elena Márquez").replaceAll("{{concurso}}", "Desarrollador Full-Stack Senior").replaceAll("{{cierre}}", "29 oct 2026");
  const previewAsunto = asunto.replaceAll("{{concurso}}", "Desarrollador Full-Stack Senior").replaceAll("{{nombre}}", "Elena Márquez");

  return (
    <div>
      <h1 className="text-2xl font-extrabold">Mensajería masiva</h1>
      <p className="text-slate-500">Asistente en 3 pasos + seguimiento de campañas.</p>

      <Card className="mt-4">
        <CardContent className="p-5">
          <Steps steps={["Destinatarios", "Mensaje", "Programación"]} current={paso} />
          {paso === 0 && (
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <div><Label>Concurso</Label><Select><option>Desarrollador Full-Stack Senior</option><option>Enfermera/o Atención Primaria</option></Select></div>
                <div><Label>Segmento</Label><Select><option>Con documentación pendiente</option><option>Preseleccionados</option><option>Todos los postulantes</option><option>Puntaje IA &lt; 60</option></Select></div>
                <div className="rounded-2xl bg-indigo-50 p-4 text-sm dark:bg-indigo-950/40">
                  <p className="font-bold">Resumen del filtro aplicado</p>
                  <p className="mt-1">{filtro}</p>
                  <p className="mt-2 text-3xl font-extrabold text-indigo-700 dark:text-indigo-300">34 <span className="text-sm font-medium">personas alcanzadas</span></p>
                </div>
                <Button onClick={() => setPaso(1)}>Continuar al mensaje →</Button>
              </div>
              <div className="rounded-2xl border border-slate-200 p-4 text-sm dark:border-slate-700">
                <p className="font-bold">Vista previa del segmento (5 de 34)</p>
                <ul className="mt-2 space-y-1.5">{DESTINATARIOS.map((d) => <li key={d.email} className="flex justify-between gap-2"><span>{d.nombre}</span><span className="text-slate-400">{d.email}</span></li>)}</ul>
              </div>
            </div>
          )}
          {paso === 1 && (
            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              <div className="space-y-3">
                <div><Label>Asunto (usa variables)</Label><Input value={asunto} onChange={(e) => setAsunto(e.target.value)} /></div>
                <div className="flex flex-wrap gap-1.5 text-xs">
                  {(["{{nombre}}", "{{concurso}}", "{{cierre}}", "{{estado}}"] as string[]).map((v) => (
                    <button key={v} onClick={() => setCuerpo(cuerpo + " " + v)} className="rounded-full bg-slate-100 px-2.5 py-1 font-mono hover:bg-indigo-100 dark:bg-slate-800">{v}</button>
                  ))}
                </div>
                <div><Label>Mensaje</Label><Textarea rows={9} value={cuerpo} onChange={(e) => setCuerpo(e.target.value)} /></div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="ghost" onClick={() => { setPaso(0); setPrueba("idle"); }}>← Atrás</Button>
                  <Button variant="outline" onClick={enviarPrueba} disabled={prueba === "enviando"}>
                    <FlaskConical className="h-4 w-4" />
                    {prueba === "enviando" ? "Enviando…" : prueba === "ok" ? "¡Prueba enviada ✓!" : "Enviar prueba"}
                  </Button>
                  <Button onClick={() => setPaso(2)}>Continuar →</Button>
                </div>
                {prueba === "ok" && (
                  <p className="rounded-xl bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                    Prueba mock enviada a evaluadora@concursos.gob con los datos de “Elena Márquez”. Revisa asunto, variables y formato antes del envío masivo.
                  </p>
                )}
              </div>
              <div>
                <p className="flex items-center gap-1.5 text-sm font-bold"><Eye className="h-4 w-4" /> Vista previa (como la verá Elena)</p>
                <div className="mt-2 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700">
                  <div className="border-b border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800"><p className="text-sm font-bold">{previewAsunto}</p><p className="text-xs text-slate-500">De: seleccion@concursos.gob · Para: elena.marquez@mail.com</p></div>
                  <div className="whitespace-pre-line bg-white p-4 text-sm dark:bg-slate-900">{preview}</div>
                </div>
              </div>
            </div>
          )}
          {paso === 2 && (
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <div><Label><CalendarClock className="mr-1 inline h-4 w-4" /> Programar envío</Label><Input type="datetime-local" value={programar} onChange={(e) => setProgramar(e.target.value)} /></div>
                <div className="rounded-2xl bg-slate-50 p-4 text-sm dark:bg-slate-800">Se enviará a <b>34 personas</b> el <b>{programar.replace("T", " · ")}</b>. Podrás pausar la campaña hasta 10 min antes.</div>
                <div className="flex gap-2">
                  <Button variant="ghost" onClick={() => setPaso(1)}>← Atrás</Button>
                  <Button onClick={() => setEnviada(true)}><Truck className="h-4 w-4" /> {enviada ? "¡Campaña programada ✓!" : "Programar campaña"}</Button>
                </div>
              </div>
              <div className="rounded-2xl border border-dashed p-6 text-center text-sm text-slate-500">Gráfico de progreso del envío (mock): 0% → se actualizará en Seguimiento.</div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Seguimiento */}
      <h2 className="mt-8 text-lg font-bold">Seguimiento de campañas</h2>
      <div className="mt-3 grid gap-4 lg:grid-cols-3">
        {CAMPANAS.map((c) => {
          const pct = c.destinatarios ? Math.round((c.enviados / c.destinatarios) * 100) : 0;
          return (
            <Card key={c.id}><CardHeader><CardTitle className="text-base">{c.nombre}</CardTitle><CardDescription>{c.asunto} · {c.fecha}</CardDescription></CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm"><Badge variant={c.estado === "Completada" ? "abierto" : c.estado === "En curso" ? "pronto" : "outline"}>{c.estado}</Badge><span className="font-bold">{pct}% enviado</span></div>
                <Progress value={pct} className="my-2" />
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  <div className="rounded-lg bg-slate-50 p-2 dark:bg-slate-800"><p className="font-bold">{c.destinatarios - c.enviados}</p><p>En cola</p></div>
                  <div className="rounded-lg bg-sky-50 p-2 dark:bg-sky-950"><p className="font-bold">{c.enviados}</p><p>Enviados</p></div>
                  <div className="rounded-lg bg-emerald-50 p-2 dark:bg-emerald-950"><p className="font-bold">{c.entregados}</p><p>Entregados</p></div>
                  <div className="rounded-lg bg-red-50 p-2 dark:bg-red-950"><p className="font-bold">{c.rebotados}</p><p>Rebotados</p></div>
                </div>
              </CardContent></Card>
          );
        })}
      </div>

      <Card className="mt-4">
        <CardHeader><CardTitle className="text-base">Estado por destinatario · “Recordatorio cierre – Enfermería”</CardTitle></CardHeader>
        <CardContent className="overflow-x-auto p-0">
          <table className="w-full min-w-[560px] text-left text-sm">
            <tbody>{DESTINATARIOS.map((d) => (
              <tr key={d.email} className="border-t border-slate-100 dark:border-slate-800">
                <td className="px-5 py-2.5 font-medium">{d.nombre}<br /><span className="text-xs text-slate-400">{d.email}</span></td>
                <td className="px-3 py-2.5"><span className="inline-flex items-center gap-1.5 text-xs font-semibold">{estadoIcon(d.estado)} {d.estado}</span></td>
                <td className="px-3 py-2.5 text-right"><Button size="sm" variant="ghost">Reenviar</Button></td>
              </tr>
            ))}</tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
