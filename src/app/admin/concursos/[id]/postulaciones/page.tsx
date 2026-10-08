"use client";
import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Search, AlertTriangle, CheckCircle2, MinusCircle, XCircle, FileQuestion, Sparkles, Send, RefreshCw, Download, X, FileText, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input, Select } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { CANDIDATOS, CandidatoAdmin } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

function ResultadoIcon({ r }: { r: string }) {
  if (r === "Cumple") return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
  if (r === "Parcial") return <MinusCircle className="h-4 w-4 text-amber-500" />;
  if (r === "No cumple") return <XCircle className="h-4 w-4 text-red-500" />;
  return <FileQuestion className="h-4 w-4 text-slate-400" />;
}

function PuntajeColor(n: number) {
  if (n >= 80) return "text-emerald-600 dark:text-emerald-400";
  if (n >= 60) return "text-amber-600 dark:text-amber-400";
  return "text-red-600 dark:text-red-400";
}

export default function PostulacionesAdminPage() {
  const [sel, setSel] = React.useState<string[]>([]);
  const [fEstado, setFEstado] = React.useState("");
  const [fPuntaje, setFPuntaje] = React.useState("");
  const [soloCompletos, setSoloCompletos] = React.useState(false);
  const [q, setQ] = React.useState("");
  const [detalle, setDetalle] = React.useState<CandidatoAdmin | null>(null);
  const [docPage, setDocPage] = React.useState(1);
  const [comentario, setComentario] = React.useState("");
  const [decision, setDecision] = React.useState<string | null>(null);

  const filtrados = CANDIDATOS.filter((c) => {
    if (q && !c.nombre.toLowerCase().includes(q.toLowerCase())) return false;
    if (fEstado && c.estado !== fEstado) return false;
    if (fPuntaje === "80+" && c.puntajeIA < 80) return false;
    if (fPuntaje === "60-79" && (c.puntajeIA < 60 || c.puntajeIA >= 80)) return false;
    if (fPuntaje === "<60" && c.puntajeIA >= 60) return false;
    if (soloCompletos && c.cumplimiento < 100) return false;
    return true;
  });

  const toggle = (id: string) => setSel((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  const allSel = filtrados.length > 0 && filtrados.every((c) => sel.includes(c.id));

  return (
    <div>
      <Link href="/admin" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-indigo-600"><ArrowLeft className="h-4 w-4" /> Volver al resumen</Link>
      <div className="mt-2 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold">Postulaciones · Desarrollador Full-Stack Senior</h1>
          <p className="text-slate-500">214 candidaturas · 6 mostradas en el mockup</p>
        </div>
        <Badge variant="violet" className="px-3 py-1.5 text-xs"><Sparkles className="h-3.5 w-3.5" /> Pre-evaluación sugerida por IA. La decisión final es del evaluador.</Badge>
      </div>

      {/* Filtros */}
      <Card className="mt-4"><CardContent className="grid gap-3 p-4 md:grid-cols-[1.5fr_1fr_1fr_auto_auto]">
        <div className="relative"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar candidato…" className="pl-9" /></div>
        <Select value={fEstado} onChange={(e) => setFEstado(e.target.value)}><option value="">Estado: todos</option><option>Enviada</option><option>En revisión</option><option>Preseleccionada</option><option>Rechazada</option></Select>
        <Select value={fPuntaje} onChange={(e) => setFPuntaje(e.target.value)}><option value="">Puntaje: todos</option><option value="80+">80+ Alto</option><option value="60-79">60–79 Medio</option><option value="<60">&lt;60 Bajo</option></Select>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={soloCompletos} onChange={(e) => setSoloCompletos(e.target.checked)} className="h-4 w-4 accent-indigo-600" /> Solo 100% obligatorios</label>
        <Button variant="ghost" size="sm" onClick={() => { setQ(""); setFEstado(""); setFPuntaje(""); setSoloCompletos(false); }}><RefreshCw className="h-3.5 w-3.5" /> Limpiar</Button>
      </CardContent></Card>

      {/* Barra acciones masivas */}
      {sel.length > 0 && (
        <div className="sticky top-14 z-20 mt-3 flex flex-wrap items-center gap-2 rounded-2xl bg-slate-900 p-3 text-white shadow-lg dark:bg-indigo-600">
          <span className="text-sm font-semibold">{sel.length} seleccionados</span>
          <Button size="sm" variant="secondary"><Send className="h-3.5 w-3.5" /> Enviar mensaje</Button>
          <Button size="sm" variant="secondary"><RefreshCw className="h-3.5 w-3.5" /> Cambiar estado</Button>
          <Button size="sm" variant="secondary"><Download className="h-3.5 w-3.5" /> Exportar</Button>
          <button className="ml-auto text-xs underline" onClick={() => setSel([])}>Limpiar selección</button>
        </div>
      )}

      {/* Tabla */}
      <Card className="mt-3"><CardContent className="overflow-x-auto p-0">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead><tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500 dark:border-slate-800 dark:bg-slate-800/50">
            <th className="px-4 py-3"><input type="checkbox" checked={allSel} onChange={() => setSel(allSel ? [] : filtrados.map((c) => c.id))} className="h-4 w-4 accent-indigo-600" /></th>
            <th className="px-2 py-3">Candidato</th><th className="px-2 py-3">Estado</th><th className="px-2 py-3">Puntaje IA</th><th className="px-2 py-3">Cumplimiento</th><th className="px-2 py-3">Alertas</th>
          </tr></thead>
          <tbody>
            {filtrados.map((c) => (
              <tr key={c.id} onClick={() => { setDetalle(c); setDocPage(1); setDecision(null); setComentario(""); }} className={cn("cursor-pointer border-b border-slate-100 last:border-0 hover:bg-indigo-50/60 dark:border-slate-800 dark:hover:bg-indigo-950/30", sel.includes(c.id) && "bg-indigo-50 dark:bg-indigo-950/40")}>
                <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}><input type="checkbox" checked={sel.includes(c.id)} onChange={() => toggle(c.id)} className="h-4 w-4 accent-indigo-600" /></td>
                <td className="px-2 py-3"><p className="font-semibold">{c.nombre}</p><p className="text-xs text-slate-500">{c.email}</p></td>
                <td className="px-2 py-3"><Badge variant="outline">{c.estado}</Badge></td>
                <td className="px-2 py-3"><span className={cn("text-lg font-extrabold", PuntajeColor(c.puntajeIA))}>{c.puntajeIA}</span><span className="text-xs text-slate-400">/100</span></td>
                <td className="px-2 py-3"><div className="w-28"><Progress value={c.cumplimiento} barClass={c.cumplimiento === 100 ? "bg-emerald-500" : c.cumplimiento >= 50 ? "bg-amber-500" : "bg-red-500"} /><p className="mt-1 text-xs text-slate-500">{c.cumplimiento}%</p></div></td>
                <td className="px-2 py-3"><div className="flex max-w-[220px] flex-wrap gap-1">
                  {c.alertas.length === 0 ? <span className="inline-flex items-center gap-1 text-xs text-emerald-600"><CheckCircle2 className="h-3.5 w-3.5" /> Sin alertas</span> :
                    c.alertas.map((a, i) => <span key={i} className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-[11px] font-semibold text-red-700 dark:bg-red-950 dark:text-red-300"><AlertTriangle className="h-3 w-3" /> {a.texto}</span>)}
                </div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent></Card>

      {/* Sheet lateral */}
      {detalle && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40" onClick={() => setDetalle(null)}>
          <div className="flex h-full w-full max-w-5xl flex-col overflow-hidden bg-white shadow-2xl dark:bg-slate-900" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-slate-200 p-4 dark:border-slate-800">
              <div>
                <p className="text-lg font-bold">{detalle.nombre}</p>
                <p className="text-xs text-slate-500">{detalle.email} · Informe de IA · ID {detalle.id}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setDetalle(null)}><X /></Button>
            </div>
            <div className="grid flex-1 gap-0 overflow-y-auto md:grid-cols-[1.2fr_1fr]">
              {/* Informe IA */}
              <div className="space-y-4 border-r border-slate-200 p-5 dark:border-slate-800">
                <div className="rounded-2xl bg-violet-50 p-4 dark:bg-violet-950/30">
                  <p className="flex items-center gap-1.5 text-xs font-bold uppercase text-violet-700 dark:text-violet-300"><Sparkles className="h-3.5 w-3.5" /> Puntaje sugerido por IA</p>
                  <p className="mt-1 text-4xl font-extrabold text-violet-700 dark:text-violet-300">{detalle.puntajeIA}<span className="text-base font-medium">/100</span></p>
                  <p className="mt-2 text-sm">{detalle.resumenIA}</p>
                </div>
                <div>
                  <p className="text-sm font-bold">Requisitos · verificación IA</p>
                  <ul className="mt-2 space-y-2">
                    {detalle.requisitosIA.map((r, i) => (
                      <li key={i} className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
                        <p className="flex items-center gap-2 text-sm font-semibold"><ResultadoIcon r={r.resultado} /> {r.texto} <span className="ml-auto rounded-full bg-slate-100 px-2 py-0.5 text-[11px] dark:bg-slate-800">{r.resultado}</span></p>
                        <p className="mt-1 text-xs text-slate-500">{r.justificacion}</p>
                        <p className="mt-1 rounded-lg bg-slate-50 p-2 text-xs italic dark:bg-slate-800">“{r.cita}” {r.pagina > 0 && <button className="ml-1 font-semibold text-indigo-600 hover:underline" onClick={() => setDocPage(r.pagina)}>→ ver pág. {r.pagina} <ChevronRight className="inline h-3 w-3" /></button>}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
                  <p className="text-sm font-bold">Decisión del evaluador</p>
                  <p className="mb-2 text-xs text-amber-700 dark:text-amber-300">La IA sugiere; tú decides. Deja constancia del motivo.</p>
                  <textarea value={comentario} onChange={(e) => setComentario(e.target.value)} placeholder="Comentario del evaluador (visible en auditoría)…" className="min-h-[80px] w-full rounded-xl border border-slate-200 bg-white p-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
                  <div className="mt-2 flex gap-2">
                    <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700" onClick={() => setDecision("Aprobada")}><CheckCircle2 className="h-4 w-4" /> Aprobar</Button>
                    <Button variant="destructive" className="flex-1" onClick={() => setDecision("Rechazada")}><XCircle className="h-4 w-4" /> Rechazar</Button>
                  </div>
                  {decision && <p className="mt-2 rounded-xl bg-slate-100 p-2 text-center text-sm font-semibold dark:bg-slate-800">Decisión registrada (mock): {decision} ✓</p>}
                </div>
              </div>
              {/* Visor documentos */}
              <div className="flex flex-col bg-slate-50 p-5 dark:bg-slate-950">
                <p className="flex items-center gap-2 text-sm font-bold"><FileText className="h-4 w-4" /> Visor de documentos</p>
                <div className="mt-2 flex gap-2 overflow-x-auto">
                  {detalle.documentos.map((d, i) => (
                    <button key={d.nombre} onClick={() => setDocPage(i + 1)} className={cn("rounded-xl border px-3 py-2 text-left text-xs", docPage === i + 1 ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950" : "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900")}>
                      <span className="font-semibold">{d.nombre}</span><br /><span className="text-slate-500">{d.paginas} págs.</span>
                    </button>
                  ))}
                </div>
                <div className="mt-3 flex-1 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
                  <p className="text-xs uppercase text-slate-400">Página {docPage} · simulación de PDF</p>
                  <div className="mt-2 space-y-2">
                    <div className="h-3 w-3/4 rounded bg-slate-200 dark:bg-slate-700" />
                    <div className="h-3 w-full rounded bg-slate-100 dark:bg-slate-800" />
                    <div className="h-3 w-5/6 rounded bg-slate-100 dark:bg-slate-800" />
                    <p className="rounded-xl bg-amber-50 p-3 text-xs text-amber-800 dark:bg-amber-950/40 dark:text-amber-200">Cita IA resaltada: “{detalle.requisitosIA[Math.min(docPage - 1, detalle.requisitosIA.length - 1)]?.cita}”</p>
                    <div className="h-24 rounded-xl bg-slate-50 dark:bg-slate-800" />
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <Button variant="outline" size="sm" disabled={docPage <= 1} onClick={() => setDocPage(docPage - 1)}>← Anterior</Button>
                  <span className="text-xs text-slate-500">Pág. {docPage}</span>
                  <Button variant="outline" size="sm" onClick={() => setDocPage(docPage + 1)}>Siguiente →</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
