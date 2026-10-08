"use client";
import Link from "next/link";
import { ArrowLeft, FileText, History, Library, Download, Eye, Trash2 } from "lucide-react";
import { SiteHeader } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MIS_POSTULACIONES as MP } from "@/lib/mock-data";

function estadoBadge(e: string) {
  if (e === "Enviada") return <Badge variant="info">Enviada</Badge>;
  if (e === "En revisión") return <Badge variant="pronto">En revisión</Badge>;
  if (e === "Preseleccionada") return <Badge variant="abierto">Preseleccionada</Badge>;
  return <Badge variant="destructive">Rechazada</Badge>;
}

export default function MisPostulacionesPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-indigo-600"><ArrowLeft className="h-4 w-4" /> Volver al portal</Link>
        <h1 className="mt-2 text-2xl font-extrabold sm:text-3xl">Mis postulaciones</h1>
        <p className="text-slate-500">Hola, Elena · 4 postulaciones activas e históricas</p>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.7fr_1fr]">
          <Card>
            <CardHeader><CardTitle>Tabla de postulaciones</CardTitle><CardDescription>Estado, fecha y acciones por concurso.</CardDescription></CardHeader>
            <CardContent className="overflow-x-auto p-0">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-y border-slate-200 bg-slate-50 text-xs uppercase text-slate-500 dark:border-slate-800 dark:bg-slate-800/50">
                    <th className="px-5 py-3">Concurso</th><th className="px-3 py-3">Fecha</th><th className="px-3 py-3">Estado</th><th className="px-3 py-3">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {MP.map((p) => (
                    <tr key={p.id} className="border-b border-slate-100 last:border-0 dark:border-slate-800">
                      <td className="px-5 py-3"><p className="font-semibold">{p.concursoTitulo}</p><p className="text-xs text-slate-500">{p.entidad}</p></td>
                      <td className="px-3 py-3 text-slate-500">{p.fechaEnvio}</td>
                      <td className="px-3 py-3">{estadoBadge(p.estado)}</td>
                      <td className="px-3 py-3"><div className="flex gap-1.5">
                        <Link href={`/concursos/${p.concursoId}`}><Button size="sm" variant="outline"><Eye className="h-3.5 w-3.5" /> Ver</Button></Link>
                        <Button size="sm" variant="ghost"><Download className="h-3.5 w-3.5" /> Justificante</Button>
                      </div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><History className="h-5 w-5 text-indigo-600" /> Línea de tiempo</CardTitle><CardDescription>Selecciona una postulación para ver el detalle (ejemplo: primera).</CardDescription></CardHeader>
            <CardContent className="space-y-0">
              {MP[0].timeline.map((t, i) => (
                <div key={t.estado} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${t.actual ? "bg-indigo-600 text-white" : i < 1 ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-500"}`}>{i + 1}</span>
                    {i < MP[0].timeline.length - 1 && <span className="w-px flex-1 bg-slate-200 dark:bg-slate-700" />}
                  </div>
                  <div className="pb-5"><p className={`text-sm font-semibold ${t.actual ? "text-indigo-700 dark:text-indigo-300" : ""}`}>{t.estado} {t.actual && "· actual"}</p><p className="text-xs text-slate-500">{t.fecha}</p></div>
                </div>
              ))}
              <div className="rounded-xl bg-slate-50 p-3 text-xs dark:bg-slate-800">Tu candidatura está siendo baremada. Resultado estimado: 18 oct.</div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader><CardTitle className="flex items-center gap-2"><Library className="h-5 w-5 text-indigo-600" /> Biblioteca de documentos reutilizables</CardTitle><CardDescription>Sube una vez y reutiliza en todas tus postulaciones. Control de versiones incluido.</CardDescription></CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {BIBLIOTECA_DOCS_PLACEHOLDER.map((d) => (
              <div key={d.id} className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
                <FileText className="h-6 w-6 text-indigo-600" />
                <p className="mt-2 truncate text-sm font-semibold" title={d.nombre}>{d.nombre}</p>
                <p className="text-xs text-slate-500">{d.tipo} · v{d.version} · {d.tamano}</p>
                <p className="text-xs text-slate-400">{d.fecha}</p>
                <Progress value={100} className="my-2" barClass="bg-emerald-500" />
                <div className="flex gap-1.5">
                  <Button size="sm" variant="outline" className="flex-1">v{d.version - 0} → v{d.version + 1}</Button>
                  <Button size="sm" variant="ghost"><Trash2 className="h-3.5 w-3.5" /></Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

const BIBLIOTECA_DOCS_PLACEHOLDER = [
  { id: "b1", nombre: "CV_Elena_Marquez_2026.pdf", tipo: "CV", version: 3, fecha: "02 oct 2026", tamano: "1,2 MB" },
  { id: "b2", nombre: "Titulo_Ingenieria.pdf", tipo: "Título", version: 1, fecha: "12 ene 2026", tamano: "2,8 MB" },
  { id: "b3", nombre: "Certificacion_AWS_SAA.pdf", tipo: "Certificación", version: 2, fecha: "20 may 2026", tamano: "0,9 MB" },
  { id: "b4", nombre: "Carta_motivacion.pdf", tipo: "Otro", version: 2, fecha: "28 sep 2026", tamano: "0,4 MB" },
];
