"use client";
import * as React from "react";
import { useSearchParams } from "next/navigation";
import { Users, FileText, Hourglass, Mail, Save, Rocket, Plus, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { POSTULACIONES_POR_DIA, CONCURSOS } from "@/lib/mock-data";

function MiniBarChart() {
  const max = Math.max(...POSTULACIONES_POR_DIA.map((d) => d.n));
  return (
    <div className="flex h-44 items-end gap-2">
      {POSTULACIONES_POR_DIA.map((d) => (
        <div key={d.dia} className="flex flex-1 flex-col items-center gap-1">
          <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300">{d.n}</span>
          <div className="flex w-full items-end rounded-lg bg-slate-100 dark:bg-slate-800" style={{ height: 120 }}>
            <div className="w-full rounded-lg bg-indigo-600 dark:bg-indigo-500" style={{ height: `${(d.n / max) * 100}%` }} />
          </div>
          <span className="text-xs text-slate-500">{d.dia}</span>
        </div>
      ))}
    </div>
  );
}

export default function AdminPage() {
  return (
    <React.Suspense fallback={<div className="p-8 text-sm text-slate-500">Cargando panel…</div>}>
      <AdminInner />
    </React.Suspense>
  );
}

function AdminInner() {
  const searchParams = useSearchParams();
  const urlTab = searchParams.get("tab");
  const [tab, setTab] = React.useState<"resumen" | "editor">(
    urlTab === "concursos" || urlTab === "config" ? "editor" : "resumen"
  );
  const [reqs, setReqs] = React.useState([
    { texto: "Título universitario afín", peso: 30, tipo: "Obligatorio" },
    { texto: "5 años de experiencia", peso: 30, tipo: "Obligatorio" },
  ]);

  // Sincronizar pestaña cuando cambia ?tab= en la URL (navegación del sidebar).
  // Antes se leía window.location.search solo al montar, por eso al pasar
  // de Resumen a Concursos parecía que "no pasaba nada".
  React.useEffect(() => {
    if (urlTab === "concursos" || urlTab === "config") setTab("editor");
    else setTab("resumen");
  }, [urlTab]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold">Hola, Marta 👋</h1>
          <p className="text-slate-500">Resumen de actividad y editor de concursos.</p>
        </div>
        <div className="flex gap-2">
          <Button variant={tab === "resumen" ? "default" : "outline"} onClick={() => setTab("resumen")}>Resumen</Button>
          <Button variant={tab === "editor" ? "default" : "outline"} onClick={() => setTab("editor")}>Editor de concurso</Button>
        </div>
      </div>

      {tab === "resumen" && (
        <>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { icon: FileText, label: "Concursos activos", value: "5", sub: "+2 este mes", color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300" },
              { icon: Users, label: "Postulaciones totales", value: "1.834", sub: "+376 esta semana", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" },
              { icon: Hourglass, label: "Pendientes de revisión", value: "248", sub: "requieren evaluador", color: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300" },
              { icon: Mail, label: "Correos enviados", value: "3.412", sub: "98,2% entregados", color: "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300" },
            ].map((m) => (
              <Card key={m.label}><CardContent className="flex items-center gap-4 p-5">
                <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${m.color}`}><m.icon className="h-5 w-5" /></span>
                <div><p className="text-2xl font-extrabold">{m.value}</p><p className="text-sm font-medium">{m.label}</p><p className="text-xs text-slate-500">{m.sub}</p></div>
              </CardContent></Card>
            ))}
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
            <Card>
              <CardHeader><CardTitle>Postulaciones por día</CardTitle><CardDescription>Últimos 7 días · todos los concursos</CardDescription></CardHeader>
              <CardContent><MiniBarChart /></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Concursos recientes</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {CONCURSOS.slice(0, 4).map((c) => (
                  <div key={c.id} className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
                    <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{c.titulo}</p><p className="text-xs text-slate-500">{c.postulantes} postulaciones · cierra {c.fechaCierre}</p></div>
                    <Badge variant={c.estado === "Abierto" ? "abierto" : c.estado === "Cierra pronto" ? "pronto" : "cerrado"}>{c.estado}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {tab === "editor" && (
        <div className="mt-6 grid gap-4 lg:grid-cols-[1.7fr_1fr]">
          <div className="space-y-4">
            <Card><CardHeader><CardTitle>1 · Datos generales</CardTitle></CardHeader>
              <CardContent className="grid gap-3 sm:grid-cols-2">
                <div className="sm:col-span-2"><Label>Título del concurso</Label><Input defaultValue="Desarrollador Full-Stack Senior" /></div>
                <div><Label>Entidad</Label><Input defaultValue="Ministerio de Innovación Digital" /></div>
                <div><Label>Área</Label><Input defaultValue="Tecnología" /></div>
                <div><Label>Modalidad</Label><Input defaultValue="Híbrido" /></div>
                <div><Label>Vacantes</Label><Input defaultValue="4" type="number" /></div>
                <div className="sm:col-span-2"><Label>Descripción</Label><Textarea defaultValue="Modernizar la plataforma de servicios digitales…" /></div>
              </CardContent></Card>

            <Card><CardHeader><CardTitle>2 · Bases (PDF)</CardTitle><CardDescription>Arrastra o selecciona el documento oficial.</CardDescription></CardHeader>
              <CardContent><div className="rounded-2xl border-2 border-dashed border-slate-200 p-6 text-center text-sm text-slate-500 dark:border-slate-700">bases_fullstack_2026.pdf · 2,4 MB · <span className="font-semibold text-emerald-600">Listo</span></div></CardContent></Card>

            <Card><CardHeader><CardTitle>3 · Requisitos con peso</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {reqs.map((r, i) => (
                  <div key={i} className="grid grid-cols-[1fr_90px_130px_auto] items-center gap-2">
                    <Input value={r.texto} onChange={(e) => setReqs(reqs.map((x, j) => (j === i ? { ...x, texto: e.target.value } : x)))} />
                    <Input value={r.peso} type="number" onChange={(e) => setReqs(reqs.map((x, j) => (j === i ? { ...x, peso: Number(e.target.value) } : x)))} />
                    <Input value={r.tipo} onChange={(e) => setReqs(reqs.map((x, j) => (j === i ? { ...x, tipo: e.target.value } : x)))} />
                    <Button size="icon" variant="ghost" onClick={() => setReqs(reqs.filter((_, j) => j !== i))}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => setReqs([...reqs, { texto: "Nuevo requisito", peso: 10, tipo: "Deseable" }])}><Plus className="h-4 w-4" /> Añadir requisito</Button>
              </CardContent></Card>

            <Card><CardHeader><CardTitle>4 · Criterios y fechas</CardTitle></CardHeader>
              <CardContent className="grid gap-3 sm:grid-cols-2">
                <div><Label>Experiencia (%)</Label><Input defaultValue="35" type="number" /></div>
                <div><Label>Formación (%)</Label><Input defaultValue="25" type="number" /></div>
                <div><Label>Cierre postulaciones</Label><Input type="date" defaultValue="2026-10-29" /></div>
                <div><Label>Resolución</Label><Input type="date" defaultValue="2026-11-22" /></div>
              </CardContent></Card>
          </div>

          <div>
            <Card className="sticky top-20">
              <CardHeader><CardTitle>Publicación</CardTitle><CardDescription>Valida pesos (100%) y fechas antes de publicar.</CardDescription></CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="rounded-xl bg-emerald-50 p-3 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200">✓ Pesos suman 100% · Fechas coherentes</div>
                <Button variant="outline" className="w-full"><Save className="h-4 w-4" /> Guardar borrador</Button>
                <Button className="w-full"><Rocket className="h-4 w-4" /> Publicar concurso</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
