"use client";
import * as React from "react";
import Link from "next/link";
import { Search, MapPin, Clock, Building2, ArrowRight, Sparkles, ShieldCheck, FileCheck, SlidersHorizontal } from "lucide-react";
import { SiteHeader } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge, estadoConcursoVariant } from "@/components/ui/badge";
import { Input, Select } from "@/components/ui/input";
import { CONCURSOS, AREAS, MODALIDADES } from "@/lib/mock-data";
import { cuentaRegresiva, formatFecha } from "@/lib/utils";

export default function HomePage() {
  const [q, setQ] = React.useState("");
  const [area, setArea] = React.useState("");
  const [modalidad, setModalidad] = React.useState("");
  const [estado, setEstado] = React.useState("");

  const filtrados = CONCURSOS.filter((c) => {
    if (q && !(`${c.titulo} ${c.entidad}`.toLowerCase().includes(q.toLowerCase()))) return false;
    if (area && c.area !== area) return false;
    if (modalidad && c.modalidad !== modalidad) return false;
    if (estado && c.estado !== estado) return false;
    return true;
  });

  return (
    <div className="min-h-screen">
      <SiteHeader />

      {/* Hero */}
      <section className="border-b border-indigo-100 bg-gradient-to-b from-indigo-50 via-white to-slate-50 dark:from-indigo-950/40 dark:via-slate-950 dark:to-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
          <Badge variant="info" className="mb-4"><Sparkles className="h-3 w-3" /> Convocatorias 2026 · Datos de demostración</Badge>
          <h1 className="max-w-3xl text-3xl font-extrabold tracking-tight sm:text-5xl">
            Encuentra tu próximo <span className="text-indigo-600 dark:text-indigo-400">concurso laboral</span>
          </h1>
          <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-300">
            Portal único de empleo público: consulta bases, requisitos y cronogramas, y postula en minutos con tu biblioteca de documentos reutilizable.
          </p>

          {/* Buscador */}
          <Card className="mt-8 p-4 shadow-md">
            <div className="grid gap-3 md:grid-cols-[1.4fr_1fr_1fr_1fr_auto]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar por título o entidad…" className="pl-9" />
              </div>
              <Select value={area} onChange={(e) => setArea(e.target.value)}>
                <option value="">Área: todas</option>
                {AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
              </Select>
              <Select value={modalidad} onChange={(e) => setModalidad(e.target.value)}>
                <option value="">Modalidad: todas</option>
                {MODALIDADES.map((m) => <option key={m} value={m}>{m}</option>)}
              </Select>
              <Select value={estado} onChange={(e) => setEstado(e.target.value)}>
                <option value="">Estado: todos</option>
                <option>Abierto</option><option>Cierra pronto</option><option>Cerrado</option>
              </Select>
              <Button className="md:w-auto"><SlidersHorizontal className="h-4 w-4" /> Filtrar</Button>
            </div>
          </Card>
          <p className="mt-3 text-sm text-slate-500">{filtrados.length} concursos encontrados · Cierre, modalidad y área actualizados a diario</p>
        </div>
      </section>

      {/* Grid */}
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtrados.map((c) => (
            <Card key={c.id} className="flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
              <CardContent className="flex flex-1 flex-col gap-3 p-5">
                <div className="flex items-start justify-between gap-2">
                  <Badge variant={estadoConcursoVariant(c.estado)}>{c.estado}</Badge>
                  <span className="text-xs text-slate-500">{c.area} · {c.modalidad}</span>
                </div>
                <h2 className="text-lg font-bold leading-snug">{c.titulo}</h2>
                <p className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400"><Building2 className="h-4 w-4" /> {c.entidad}</p>
                <p className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400"><MapPin className="h-4 w-4" /> {c.ubicacion} · {c.vacantes} vacantes</p>
                <div className="mt-1 flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-sm dark:bg-slate-800">
                  <Clock className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  <span className="font-medium">Cierre: {formatFecha(c.fechaCierre)}</span>
                  <span className="text-slate-500">· {cuentaRegresiva(c.fechaCierre)}</span>
                </div>
                <div className="mt-auto flex gap-2 pt-3">
                  <Link href={`/concursos/${c.id}`} className="flex-1"><Button className="w-full" disabled={c.estado === "Cerrado"}>{c.estado === "Cerrado" ? "Ver resultados" : "Ver bases"} <ArrowRight className="h-4 w-4" /></Button></Link>
                  <Button variant="outline">{c.postulantes} <span className="hidden xl:inline">postul.</span></Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {filtrados.length === 0 && (
          <div className="mt-10 rounded-2xl border border-dashed p-10 text-center text-slate-500">Sin resultados. Prueba con otros filtros.</div>
        )}

        {/* Cómo funciona */}
        <section id="como-funciona" className="mt-16">
          <h2 className="text-2xl font-bold">Cómo funciona</h2>
          <p className="mt-1 text-slate-500">Tres pasos para postular y seguimiento transparente.</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              { icon: Search, t: "1. Explora y compara", d: "Filtra por área, modalidad y cierre. Descarga las bases en PDF antes de postular." },
              { icon: FileCheck, t: "2. Postula en 3 pasos", d: "Datos personales, documentos con drag & drop y revisión final. Reutiliza tu biblioteca." },
              { icon: ShieldCheck, t: "3. Sigue tu estado", d: "Timeline Enviada → En revisión → Preselección → Resolución, con avisos por correo." },
            ].map((s) => (
              <Card key={s.t}><CardContent className="p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"><s.icon className="h-5 w-5" /></span>
                <h3 className="mt-3 font-bold">{s.t}</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{s.d}</p>
              </CardContent></Card>
            ))}
          </div>
        </section>

        <footer className="mt-16 border-t border-slate-200 py-8 text-center text-sm text-slate-500 dark:border-slate-800">
          ConcurSOS · Mockup institucional sin backend · <Link href="/admin" className="text-indigo-600 hover:underline">Ir al panel de administración →</Link>
        </footer>
      </main>
    </div>
  );
}
