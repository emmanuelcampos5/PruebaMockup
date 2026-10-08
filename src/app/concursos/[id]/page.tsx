"use client";
import * as React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";import { ArrowLeft, Download, CalendarDays, CheckCircle2, Circle, UploadCloud, FileText, Link2, X, Loader2, ShieldCheck, AlertTriangle, Clock } from "lucide-react";
import { SiteHeader } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge, estadoConcursoVariant } from "@/components/ui/badge";
import { Input, Label, Textarea, Select } from "@/components/ui/input";
import { Progress, Steps } from "@/components/ui/progress";
import { CONCURSOS } from "@/lib/mock-data";
import { cuentaRegresiva, formatFecha, cn } from "@/lib/utils";

type FileState = "Subiendo" | "Escaneando" | "Listo" | "Error";
interface Upload { id: string; nombre: string; progreso: number; estado: FileState; }

function DropZone({ titulo, hint, uploads, onAdd, onRemove }: { titulo: string; hint: string; uploads: Upload[]; onAdd: (f: File) => void; onRemove: (id: string) => void }) {
  const [drag, setDrag] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  return (
    <div className={cn("rounded-2xl border-2 border-dashed p-4 transition-colors", drag ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30" : "border-slate-200 dark:border-slate-700")}
      onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => { e.preventDefault(); setDrag(false); const f = e.dataTransfer.files?.[0]; if (f) onAdd(f); }}>
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"><FileText className="h-5 w-5" /></span>
        <div className="flex-1">
          <p className="text-sm font-semibold">{titulo}</p>
          <p className="text-xs text-slate-500">{hint}</p>
          <div className="mt-2 flex gap-2">
            <Button size="sm" variant="outline" onClick={() => inputRef.current?.click()}><UploadCloud className="h-3.5 w-3.5" /> Seleccionar</Button>
            <input ref={inputRef} type="file" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) onAdd(f); }} />
            <span className="self-center text-[11px] text-slate-400">o arrastra aquí · PDF máx. 5 MB</span>
          </div>
        </div>
      </div>
      {uploads.length > 0 && (
        <div className="mt-3 space-y-2">
          {uploads.map((u) => (
            <div key={u.id} className="rounded-xl bg-slate-50 p-2.5 dark:bg-slate-800">
              <div className="flex items-center gap-2 text-xs">
                <span className="truncate font-medium">{u.nombre}</span>
                <button onClick={() => onRemove(u.id)} className="ml-auto text-slate-400 hover:text-red-500"><X className="h-4 w-4" /></button>
              </div>
              <Progress value={u.progreso} className="mt-2" barClass={u.estado === "Error" ? "bg-red-500" : u.estado === "Listo" ? "bg-emerald-500" : "bg-indigo-600"} />
              <div className="mt-1 flex items-center gap-1 text-[11px]">
                {u.estado === "Subiendo" && <><Loader2 className="h-3 w-3 animate-spin text-indigo-600" /> Subiendo… {u.progreso}%</>}
                {u.estado === "Escaneando" && <><ShieldCheck className="h-3 w-3 text-sky-600" /> Escaneando antivirus…</>}
                {u.estado === "Listo" && <span className="font-semibold text-emerald-600">✓ Listo · verificado</span>}
                {u.estado === "Error" && <span className="font-semibold text-red-600">⚠ Error: archivo ilegible, resubir</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ConcursoDetallePage() {
  return (
    <React.Suspense fallback={<div className="p-10 text-center text-sm text-slate-500">Cargando concurso…</div>}>
      <DetalleInner />
    </React.Suspense>
  );
}

function DetalleInner() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : Array.isArray(params.id) ? params.id[0] : "1";
  const concurso = CONCURSOS.find((c) => c.id === id) ?? CONCURSOS[0];
  const [wizardOpen, setWizardOpen] = React.useState(false);
  const [paso, setPaso] = React.useState(0);
  const [uploads, setUploads] = React.useState<Record<string, Upload[]>>({});
  const [enlaces, setEnlaces] = React.useState("");
  const [enviado, setEnviado] = React.useState(false);

  const addFile = (reqId: string, file: File) => {
    const id = Math.random().toString(36).slice(2);
    const up: Upload = { id, nombre: file.name, progreso: 5, estado: "Subiendo" };
    setUploads((p) => ({ ...p, [reqId]: [...(p[reqId] ?? []), up] }));
    // Simular progreso
    let prog = 5;
    const timer = setInterval(() => {
      prog += Math.random() * 22;
      if (prog >= 100) {
        clearInterval(timer);
        setUploads((p) => ({
          ...p,
          [reqId]: (p[reqId] ?? []).map((u) => (u.id === id ? { ...u, progreso: 100, estado: "Escaneando" as FileState } : u)),
        }));
        setTimeout(() => {
          const error = file.name.toLowerCase().includes("borroso") || Math.random() < 0.08;
          setUploads((p) => ({
            ...p,
            [reqId]: (p[reqId] ?? []).map((u) => (u.id === id ? { ...u, estado: error ? ("Error" as FileState) : ("Listo" as FileState) } : u)),
          }));
        }, 900);
      } else {
        const v = Math.round(prog);
        setUploads((p) => ({ ...p, [reqId]: (p[reqId] ?? []).map((u) => (u.id === id ? { ...u, progreso: v } : u)) }));
      }
    }, 320);
  };

  const todosReq = [...concurso.requisitosObligatorios.map((r) => ({ ...r, obligatorio: true })), ...concurso.requisitosDeseables.map((r) => ({ ...r, obligatorio: false }))];
  const cumplidos = todosReq.filter((r) => (uploads[r.id]?.some((u) => u.estado === "Listo")) || (r.tipo === "portafolio" && enlaces.trim().length > 10)).length;

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-indigo-600"><ArrowLeft className="h-4 w-4" /> Volver a concursos</Link>

        <div className="mt-4 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant={estadoConcursoVariant(concurso.estado)}>{concurso.estado}</Badge>
                  <Badge variant="outline">{concurso.area}</Badge>
                  <Badge variant="outline">{concurso.modalidad}</Badge>
                  <span className="ml-auto flex items-center gap-1 text-sm text-slate-500"><Clock className="h-4 w-4" /> {cuentaRegresiva(concurso.fechaCierre)}</span>
                </div>
                <h1 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">{concurso.titulo}</h1>
                <p className="mt-1 text-slate-500">{concurso.entidad} · {concurso.ubicacion} · {concurso.vacantes} vacantes · {concurso.salario}</p>
                <p className="mt-4 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">{concurso.descripcion}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Button variant="outline"><Download className="h-4 w-4" /> Bases (PDF)</Button>
                  <Button variant="outline"><Download className="h-4 w-4" /> Anexo baremo (PDF)</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Requisitos</CardTitle><CardDescription>Separa obligatorios y deseables. Los obligatorios son excluyentes.</CardDescription></CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-2">
                <div>
                  <p className="mb-2 text-sm font-bold uppercase tracking-wide text-red-600">Obligatorios</p>
                  <ul className="space-y-2">
                    {concurso.requisitosObligatorios.map((r) => (
                      <li key={r.id} className="flex gap-2 rounded-xl bg-red-50 p-3 text-sm dark:bg-red-950/30"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-red-500" /> {r.texto}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="mb-2 text-sm font-bold uppercase tracking-wide text-emerald-600">Deseables</p>
                  <ul className="space-y-2">
                    {concurso.requisitosDeseables.map((r) => (
                      <li key={r.id} className="flex gap-2 rounded-xl bg-emerald-50 p-3 text-sm dark:bg-emerald-950/30"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" /> {r.texto}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Criterios de evaluación</CardTitle><CardDescription>Peso sobre 100 puntos.</CardDescription></CardHeader>
              <CardContent className="space-y-3">
                {concurso.criterios.map((c) => (
                  <div key={c.nombre}>
                    <div className="flex justify-between text-sm"><span className="font-medium">{c.nombre}</span><span className="font-bold text-indigo-600">{c.peso}%</span></div>
                    <Progress value={c.peso} className="mt-1" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><CalendarDays className="h-5 w-5 text-indigo-600" /> Cronograma</CardTitle></CardHeader>
              <CardContent>
                <ol className="relative space-y-4 border-l-2 border-indigo-100 pl-5 dark:border-indigo-950">
                  {concurso.cronograma.map((h) => (
                    <li key={h.hito} className="relative">
                      <span className="absolute -left-[27px] top-1 h-3 w-3 rounded-full bg-indigo-600" />
                      <p className="text-sm font-semibold">{h.hito}</p>
                      <p className="text-xs text-slate-500">{formatFecha(h.fecha)}</p>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>

          {/* Lateral postular */}
          <div className="space-y-4">
            <Card className="border-indigo-200 shadow-md dark:border-indigo-900">
              <CardContent className="p-6 text-center">
                <p className="text-sm text-slate-500">Fecha límite</p>
                <p className="text-xl font-extrabold">{formatFecha(concurso.fechaCierre)}</p>
                <p className="text-sm font-medium text-indigo-600">{cuentaRegresiva(concurso.fechaCierre)}</p>
                <Button size="lg" className="mt-4 w-full" onClick={() => { setWizardOpen(true); setPaso(0); setEnviado(false); }} disabled={concurso.estado === "Cerrado"}>
                  Postularme
                </Button>
                <p className="mt-2 text-xs text-slate-400">Tardarás ~5 min · Puedes guardar y continuar</p>
              </CardContent>
            </Card>
            <Card><CardContent className="p-5 text-sm">
              <p className="font-bold">¿Necesitas ayuda?</p>
              <p className="mt-1 text-slate-500">Soporte de lunes a viernes 9–18h · soporte@concursos.gob</p>
            </CardContent></Card>
          </div>
        </div>

        {/* Wizard */}
        {wizardOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-6" onClick={() => setWizardOpen(false)}>
            <div className="max-h-[94vh] w-full max-w-4xl overflow-y-auto rounded-t-3xl bg-white p-6 dark:bg-slate-900 sm:rounded-3xl" onClick={(e) => e.stopPropagation()}>
              {!enviado ? (
                <>
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">Postulación · {concurso.titulo}</h2>
                    <Button variant="ghost" size="icon" onClick={() => setWizardOpen(false)}><X /></Button>
                  </div>
                  <div className="mt-4"><Steps steps={["Datos personales", "Documentos", "Revisión y envío"]} current={paso} /></div>

                  {paso === 0 && (
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <div><Label>Nombre</Label><Input defaultValue="Elena Márquez Ruiz" /></div>
                      <div><Label>DNI / NIE</Label><Input defaultValue="48291357K" /></div>
                      <div><Label>Email</Label><Input defaultValue="elena.marquez@mail.com" /></div>
                      <div><Label>Teléfono</Label><Input defaultValue="+34 612 345 678" /></div>
                      <div className="sm:col-span-2"><Label>Dirección</Label><Input defaultValue="C/ Mayor 12, 28013 Madrid" /></div>
                      <div><Label>Situación laboral</Label><Select><option>Desempleada/o</option><option>Empleada/o</option><option>Autónoma/o</option></Select></div>
                      <div><Label>Discapacidad ≥33% (cupo reserva)</Label><Select><option>No</option><option>Sí</option></Select></div>
                      <div className="mt-2 flex justify-end gap-2 sm:col-span-2">
                        <Button variant="outline" onClick={() => setWizardOpen(false)}>Guardar borrador</Button>
                        <Button onClick={() => setPaso(1)}>Continuar a documentos</Button>
                      </div>
                    </div>
                  )}

                  {paso === 1 && (
                    <div className="mt-6 grid gap-6 md:grid-cols-[1.5fr_1fr]">
                      <div className="space-y-4">
                        {concurso.requisitosObligatorios.map((r) => (
                          <DropZone key={r.id} titulo={`★ ${r.texto}`} hint="Obligatorio · PDF legible" uploads={uploads[r.id] ?? []} onAdd={(f) => addFile(r.id, f)} onRemove={(id) => setUploads((p) => ({ ...p, [r.id]: p[r.id].filter((u) => u.id !== id) }))} />
                        ))}
                        {concurso.requisitosDeseables.map((r) => (
                          r.tipo === "portafolio" ? (
                            <div key={r.id} className="rounded-2xl border-2 border-dashed border-slate-200 p-4 dark:border-slate-700">
                              <p className="flex items-center gap-2 text-sm font-semibold"><Link2 className="h-4 w-4" /> {r.texto}</p>
                              <Textarea className="mt-2" placeholder="Pega enlaces a portafolio o libros, uno por línea: https://…" value={enlaces} onChange={(e) => setEnlaces(e.target.value)} />
                            </div>
                          ) : (
                            <DropZone key={r.id} titulo={r.texto} hint="Deseable · suma puntos" uploads={uploads[r.id] ?? []} onAdd={(f) => addFile(r.id, f)} onRemove={(id) => setUploads((p) => ({ ...p, [r.id]: p[r.id].filter((u) => u.id !== id) }))} />
                          )
                        ))}
                        <div className="flex justify-between">
                          <Button variant="ghost" onClick={() => setPaso(0)}>← Atrás</Button>
                          <Button onClick={() => setPaso(2)}>Revisar y enviar</Button>
                        </div>
                      </div>
                      <aside className="h-fit rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
                        <p className="text-sm font-bold">Checklist de requisitos</p>
                        <p className="text-xs text-slate-500">{cumplidos}/{todosReq.length} cumplidos</p>
                        <Progress value={(cumplidos / todosReq.length) * 100} className="my-3" barClass="bg-emerald-500" />
                        <ul className="space-y-2 text-sm">
                          {todosReq.map((r) => {
                            const ok = (uploads[r.id]?.some((u) => u.estado === "Listo")) || (r.tipo === "portafolio" && enlaces.trim().length > 10);
                            return (
                              <li key={r.id} className="flex items-center gap-2">
                                {ok ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <Circle className="h-4 w-4 text-slate-300" />}
                                <span className={ok ? "text-slate-700 dark:text-slate-200" : "text-slate-400"}>{r.texto.slice(0, 48)}…</span>
                              </li>
                            );
                          })}
                        </ul>
                        <div className="mt-3 flex items-start gap-2 rounded-xl bg-amber-50 p-3 text-xs text-amber-800 dark:bg-amber-950/40 dark:text-amber-200">
                          <AlertTriangle className="h-4 w-4 shrink-0" /> Los archivos ilegibles o caducados generan alerta de subsanación.
                        </div>
                      </aside>
                    </div>
                  )}

                  {paso === 2 && (
                    <div className="mt-6 space-y-4">
                      <Card><CardContent className="p-4 text-sm">
                        <p className="font-bold">Resumen</p>
                        <p className="mt-1">Elena Márquez Ruiz · {concurso.titulo} · {cumplidos}/{todosReq.length} requisitos con evidencia · {Object.values(uploads).flat().length} archivos</p>
                      </CardContent></Card>
                      <label className="flex items-start gap-2 text-sm"><input type="checkbox" defaultChecked className="mt-1" /> Declaro que la información es veraz y acepto las bases del concurso.</label>
                      <div className="flex justify-between">
                        <Button variant="ghost" onClick={() => setPaso(1)}>← Atrás</Button>
                        <Button onClick={() => setEnviado(true)} className="bg-emerald-600 hover:bg-emerald-700">Confirmar y enviar postulación</Button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="py-10 text-center">
                  <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-500" />
                  <h2 className="mt-4 text-2xl font-bold">¡Postulación enviada!</h2>
                  <p className="mx-auto mt-2 max-w-md text-slate-500">Recibirás confirmación en tu correo. Puedes seguir el estado en <b>Mis postulaciones</b>.</p>
                  <div className="mt-6 flex justify-center gap-2">
                    <Button variant="outline" onClick={() => setWizardOpen(false)}>Cerrar</Button>
                    <Link href="/mis-postulaciones"><Button>Ir a mis postulaciones</Button></Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
