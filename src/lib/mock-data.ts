export type EstadoConcurso = "Abierto" | "Cierra pronto" | "Cerrado";
export type Modalidad = "Presencial" | "Remoto" | "Híbrido";
export type EstadoPostulacion = "Enviada" | "En revisión" | "Preseleccionada" | "Rechazada";

export interface Requisito {
  id: string;
  texto: string;
  peso?: number;
  tipo: "titulo" | "certificacion" | "cv" | "portafolio" | "otro";
}

export interface Criterio {
  nombre: string;
  peso: number;
  descripcion: string;
}

export interface CronogramaItem {
  hito: string;
  fecha: string;
}

export interface Concurso {
  id: string;
  titulo: string;
  entidad: string;
  area: string;
  modalidad: Modalidad;
  ubicacion: string;
  estado: EstadoConcurso;
  fechaCierre: string;
  fechaPublicacion: string;
  vacantes: number;
  salario: string;
  descripcion: string;
  requisitosObligatorios: Requisito[];
  requisitosDeseables: Requisito[];
  criterios: Criterio[];
  cronograma: CronogramaItem[];
  postulantes: number;
}

export const AREAS = ["Tecnología", "Salud", "Educación", "Administración", "Ingeniería", "Derecho"];
export const MODALIDADES: Modalidad[] = ["Presencial", "Remoto", "Híbrido"];

function fechaFutura(dias: number): string {
  const d = new Date();
  d.setDate(d.getDate() + dias);
  return d.toISOString().slice(0, 10);
}
function fechaPasada(dias: number): string {
  const d = new Date();
  d.setDate(d.getDate() - dias);
  return d.toISOString().slice(0, 10);
}

export const CONCURSOS: Concurso[] = [
  {
    id: "1",
    titulo: "Desarrollador Full-Stack Senior",
    entidad: "Ministerio de Innovación Digital",
    area: "Tecnología",
    modalidad: "Híbrido",
    ubicacion: "Madrid · Híbrido",
    estado: "Abierto",
    fechaCierre: fechaFutura(21),
    fechaPublicacion: fechaPasada(6),
    vacantes: 4,
    salario: "42.000 – 48.000 €/año",
    descripcion:
      "Buscamos perfiles senior para modernizar la plataforma de servicios digitales ciudadanos. Stack principal: Next.js, Node.js y PostgreSQL. Se valorará experiencia en accesibilidad y diseño institucional.",
    requisitosObligatorios: [
      { id: "r1", texto: "Título universitario en Informática, Ingeniería o afín", tipo: "titulo" },
      { id: "r2", texto: "5 años de experiencia en desarrollo web full-stack", tipo: "cv" },
      { id: "r3", texto: "Currículum vitae actualizado (PDF, máx. 5 MB)", tipo: "cv" },
      { id: "r4", texto: "Certificado de antecedentes (vigencia < 6 meses)", tipo: "certificacion" },
    ],
    requisitosDeseables: [
      { id: "d1", texto: "Certificación AWS o Azure", tipo: "certificacion" },
      { id: "d2", texto: "Portafolio o libros / publicaciones técnicas", tipo: "portafolio" },
      { id: "d3", texto: "Nivel B2 de inglés acreditado", tipo: "certificacion" },
    ],
    criterios: [
      { nombre: "Experiencia profesional", peso: 35, descripcion: "Años y relevancia de la experiencia." },
      { nombre: "Formación académica", peso: 25, descripcion: "Títulos y certificaciones." },
      { nombre: "Prueba técnica", peso: 25, descripcion: "Ejercicio práctico de código." },
      { nombre: "Entrevista", peso: 15, descripcion: "Competencias blandas y motivación." },
    ],
    cronograma: [
      { hito: "Publicación de bases", fecha: fechaPasada(6) },
      { hito: "Cierre de postulaciones", fecha: fechaFutura(21) },
      { hito: "Evaluación curricular", fecha: fechaFutura(28) },
      { hito: "Prueba técnica", fecha: fechaFutura(35) },
      { hito: "Resultados finales", fecha: fechaFutura(45) },
    ],
    postulantes: 214,
  },
  {
    id: "2",
    titulo: "Enfermera/o de Atención Primaria",
    entidad: "Servicio Regional de Salud",
    area: "Salud",
    modalidad: "Presencial",
    ubicacion: "Valencia · Presencial",
    estado: "Cierra pronto",
    fechaCierre: fechaFutura(2),
    fechaPublicacion: fechaPasada(20),
    vacantes: 12,
    salario: "30.000 – 34.000 €/año",
    descripcion:
      "Incorporación a centros de salud de atención primaria. Turno rotativo con guardias. Se requiere colegiación vigente y disponibilidad inmediata.",
    requisitosObligatorios: [
      { id: "r1", texto: "Grado en Enfermería + colegiación vigente", tipo: "titulo" },
      { id: "r2", texto: "CV actualizado", tipo: "cv" },
      { id: "r3", texto: "Certificado de delitos sexuales", tipo: "certificacion" },
    ],
    requisitosDeseables: [
      { id: "d1", texto: "Máster en urgencias o familiar y comunitaria", tipo: "certificacion" },
      { id: "d2", texto: "Experiencia previa en atención primaria (>1 año)", tipo: "cv" },
    ],
    criterios: [
      { nombre: "Méritos formativos", peso: 40, descripcion: "Formación y especialidad." },
      { nombre: "Experiencia", peso: 40, descripcion: "Tiempo en puestos similares." },
      { nombre: "Entrevista", peso: 20, descripcion: "Idoneidad al puesto." },
    ],
    cronograma: [
      { hito: "Publicación", fecha: fechaPasada(20) },
      { hito: "Cierre", fecha: fechaFutura(2) },
      { hito: "Baremación", fecha: fechaFutura(9) },
      { hito: "Adjudicación", fecha: fechaFutura(16) },
    ],
    postulantes: 486,
  },
  {
    id: "3",
    titulo: "Docente de Matemáticas Secundaria",
    entidad: "Consejería de Educación",
    area: "Educación",
    modalidad: "Presencial",
    ubicacion: "Sevilla · Presencial",
    estado: "Abierto",
    fechaCierre: fechaFutura(15),
    fechaPublicacion: fechaPasada(4),
    vacantes: 8,
    salario: "32.000 – 36.000 €/año",
    descripcion:
      "Plazas para institutos públicos. Jornada completa. Incluye programa de mentoría docente durante el primer año.",
    requisitosObligatorios: [
      { id: "r1", texto: "Grado en Matemáticas + Máster de profesorado (CAP)", tipo: "titulo" },
      { id: "r2", texto: "CV y expediente académico", tipo: "cv" },
    ],
    requisitosDeseables: [
      { id: "d1", texto: "Publicaciones o libros de didáctica", tipo: "portafolio" },
      { id: "d2", texto: "Certificación C1 inglés", tipo: "certificacion" },
    ],
    criterios: [
      { nombre: "Expediente y formación", peso: 30, descripcion: "" },
      { nombre: "Experiencia docente", peso: 30, descripcion: "" },
      { nombre: "Prueba didáctica", peso: 40, descripcion: "" },
    ],
    cronograma: [
      { hito: "Publicación", fecha: fechaPasada(4) },
      { hito: "Cierre", fecha: fechaFutura(15) },
      { hito: "Prueba", fecha: fechaFutura(25) },
      { hito: "Final", fecha: fechaFutura(38) },
    ],
    postulantes: 178,
  },
  {
    id: "4",
    titulo: "Analista Jurídico de Contratación Pública",
    entidad: "Ayuntamiento de Bilbao",
    area: "Derecho",
    modalidad: "Remoto",
    ubicacion: "Remoto",
    estado: "Abierto",
    fechaCierre: fechaFutura(30),
    fechaPublicacion: fechaPasada(2),
    vacantes: 2,
    salario: "38.000 – 44.000 €/año",
    descripcion:
      "Revisión de pliegos, licitaciones y recursos. Trabajo 100% remoto con 2 reuniones presenciales al trimestre.",
    requisitosObligatorios: [
      { id: "r1", texto: "Licenciatura/Grado en Derecho", tipo: "titulo" },
      { id: "r2", texto: "3 años en contratación pública", tipo: "cv" },
      { id: "r3", texto: "CV actualizado", tipo: "cv" },
    ],
    requisitosDeseables: [
      { id: "d1", texto: "Máster en derecho administrativo", tipo: "certificacion" },
      { id: "d2", texto: "Publicaciones jurídicas", tipo: "portafolio" },
    ],
    criterios: [
      { nombre: "Experiencia", peso: 45, descripcion: "" },
      { nombre: "Formación", peso: 30, descripcion: "" },
      { nombre: "Entrevista", peso: 25, descripcion: "" },
    ],
    cronograma: [
      { hito: "Publicación", fecha: fechaPasada(2) },
      { hito: "Cierre", fecha: fechaFutura(30) },
      { hito: "Evaluación", fecha: fechaFutura(40) },
      { hito: "Final", fecha: fechaFutura(52) },
    ],
    postulantes: 96,
  },
  {
    id: "5",
    titulo: "Ingeniera/o de Caminos – Proyectos Hidráulicos",
    entidad: "Agencia del Agua",
    area: "Ingeniería",
    modalidad: "Híbrido",
    ubicacion: "Zaragoza · Híbrido",
    estado: "Cerrado",
    fechaCierre: fechaPasada(5),
    fechaPublicacion: fechaPasada(40),
    vacantes: 3,
    salario: "40.000 – 46.000 €/año",
    descripcion: "Diseño y supervisión de infraestructuras hidráulicas. Convocatoria ya cerrada, en fase de evaluación.",
    requisitosObligatorios: [
      { id: "r1", texto: "Título de Ingeniería de Caminos", tipo: "titulo" },
      { id: "r2", texto: "CV + vida laboral", tipo: "cv" },
    ],
    requisitosDeseables: [{ id: "d1", texto: "Experiencia BIM", tipo: "certificacion" }],
    criterios: [
      { nombre: "Experiencia", peso: 50, descripcion: "" },
      { nombre: "Formación", peso: 30, descripcion: "" },
      { nombre: "Entrevista", peso: 20, descripcion: "" },
    ],
    cronograma: [
      { hito: "Publicación", fecha: fechaPasada(40) },
      { hito: "Cierre", fecha: fechaPasada(5) },
      { hito: "Evaluación", fecha: fechaFutura(7) },
      { hito: "Final", fecha: fechaFutura(20) },
    ],
    postulantes: 342,
  },
  {
    id: "6",
    titulo: "Técnico de Gestión Administrativa",
    entidad: "Universidad Pública del Sur",
    area: "Administración",
    modalidad: "Híbrido",
    ubicacion: "Málaga · Híbrido",
    estado: "Abierto",
    fechaCierre: fechaFutura(12),
    fechaPublicacion: fechaPasada(8),
    vacantes: 6,
    salario: "26.000 – 30.000 €/año",
    descripcion: "Gestión de expedientes, atención al estudiante y tramitación electrónica. Ideal perfiles junior con FP superior o grado.",
    requisitosObligatorios: [
      { id: "r1", texto: "FP Superior en Administración o Grado afín", tipo: "titulo" },
      { id: "r2", texto: "CV actualizado", tipo: "cv" },
    ],
    requisitosDeseables: [{ id: "d1", texto: "Conocimiento de administración electrónica", tipo: "certificacion" }],
    criterios: [
      { nombre: "Méritos", peso: 50, descripcion: "" },
      { nombre: "Prueba ofimática", peso: 30, descripcion: "" },
      { nombre: "Entrevista", peso: 20, descripcion: "" },
    ],
    cronograma: [
      { hito: "Publicación", fecha: fechaPasada(8) },
      { hito: "Cierre", fecha: fechaFutura(12) },
      { hito: "Prueba", fecha: fechaFutura(20) },
      { hito: "Final", fecha: fechaFutura(30) },
    ],
    postulantes: 529,
  },
];

export interface MiPostulacion {
  id: string;
  concursoId: string;
  concursoTitulo: string;
  entidad: string;
  fechaEnvio: string;
  estado: EstadoPostulacion;
  progreso: number;
  timeline: { estado: string; fecha: string; actual: boolean }[];
}

export const MIS_POSTULACIONES: MiPostulacion[] = [
  {
    id: "p1",
    concursoId: "1",
    concursoTitulo: "Desarrollador Full-Stack Senior",
    entidad: "Ministerio de Innovación Digital",
    fechaEnvio: "2026-09-28",
    estado: "En revisión",
    progreso: 60,
    timeline: [
      { estado: "Enviada", fecha: "28 sep", actual: false },
      { estado: "En revisión", fecha: "2 oct", actual: true },
      { estado: "Preselección", fecha: "pendiente", actual: false },
      { estado: "Resolución", fecha: "pendiente", actual: false },
    ],
  },
  {
    id: "p2",
    concursoId: "4",
    concursoTitulo: "Analista Jurídico de Contratación Pública",
    entidad: "Ayuntamiento de Bilbao",
    fechaEnvio: "2026-09-15",
    estado: "Preseleccionada",
    progreso: 85,
    timeline: [
      { estado: "Enviada", fecha: "15 sep", actual: false },
      { estado: "En revisión", fecha: "20 sep", actual: false },
      { estado: "Preselección", fecha: "5 oct", actual: true },
      { estado: "Resolución", fecha: "pendiente", actual: false },
    ],
  },
  {
    id: "p3",
    concursoId: "5",
    concursoTitulo: "Ingeniera/o de Caminos – Proyectos Hidráulicos",
    entidad: "Agencia del Agua",
    fechaEnvio: "2026-08-20",
    estado: "Rechazada",
    progreso: 100,
    timeline: [
      { estado: "Enviada", fecha: "20 ago", actual: false },
      { estado: "En revisión", fecha: "28 ago", actual: false },
      { estado: "Preselección", fecha: "—", actual: false },
      { estado: "Resolución", fecha: "30 sep", actual: true },
    ],
  },
  {
    id: "p4",
    concursoId: "6",
    concursoTitulo: "Técnico de Gestión Administrativa",
    entidad: "Universidad Pública del Sur",
    fechaEnvio: "2026-10-02",
    estado: "Enviada",
    progreso: 25,
    timeline: [
      { estado: "Enviada", fecha: "2 oct", actual: true },
      { estado: "En revisión", fecha: "pendiente", actual: false },
      { estado: "Preselección", fecha: "pendiente", actual: false },
      { estado: "Resolución", fecha: "pendiente", actual: false },
    ],
  },
];

export interface DocumentoBiblio {
  id: string;
  nombre: string;
  tipo: string;
  version: number;
  fecha: string;
  tamano: string;
}

export const BIBLIOTECA_DOCS: DocumentoBiblio[] = [
  { id: "b1", nombre: "CV_Elena_Marquez_2026.pdf", tipo: "CV", version: 3, fecha: "02 oct 2026", tamano: "1,2 MB" },
  { id: "b2", nombre: "Titulo_Ingenieria_Informatica.pdf", tipo: "Título", version: 1, fecha: "12 ene 2026", tamano: "2,8 MB" },
  { id: "b3", nombre: "Certificacion_AWS_SAA.pdf", tipo: "Certificación", version: 2, fecha: "20 may 2026", tamano: "0,9 MB" },
  { id: "b4", nombre: "Carta_motivacion_general.pdf", tipo: "Otro", version: 2, fecha: "28 sep 2026", tamano: "0,4 MB" },
];

export type Alerta = "ok" | "faltante" | "ilegible" | "parcial";

export interface CandidatoAdmin {
  id: string;
  nombre: string;
  email: string;
  estado: EstadoPostulacion | "Enviada";
  puntajeIA: number;
  cumplimiento: number;
  alertas: { tipo: Exclude<Alerta, "ok">; texto: string }[];
  resumenIA: string;
  requisitosIA: { texto: string; resultado: "Cumple" | "Parcial" | "No cumple" | "Sin evidencia"; justificacion: string; cita: string; pagina: number }[];
  documentos: { nombre: string; paginas: number }[];
}

export const CANDIDATOS: CandidatoAdmin[] = [
  {
    id: "c1",
    nombre: "Elena Márquez Ruiz",
    email: "elena.marquez@mail.com",
    estado: "En revisión",
    puntajeIA: 87,
    cumplimiento: 100,
    alertas: [],
    resumenIA:
      "Candidata sólida con 6 años de experiencia full-stack y título afín. Aporta certificación AWS vigente y portafolio relevante en sector público. Cumple todos los obligatorios.",
    requisitosIA: [
      { texto: "Título universitario afín", resultado: "Cumple", justificacion: "Aporta título de Ingeniería Informática, verificable y legible.", cita: "“Graduada en Ingeniería Informática, mención en Ingeniería del Software…”", pagina: 1 },
      { texto: "5 años experiencia full-stack", resultado: "Cumple", justificacion: "CV acredita 6 años con Next.js y Node en 3 empleadores.", cita: "“6 años desarrollando aplicaciones Next.js + PostgreSQL…”", pagina: 2 },
      { texto: "Certificado de antecedentes", resultado: "Cumple", justificacion: "Documento vigente emitido hace 2 meses.", cita: "“Certifica carencia de antecedentes, emitido 12/08/2026…”", pagina: 5 },
      { texto: "Certificación AWS (deseable)", resultado: "Cumple", justificacion: "Solutions Architect Associate vigente.", cita: "“AWS Certified Solutions Architect – Associate…”", pagina: 4 },
    ],
    documentos: [
      { nombre: "CV_Elena_Marquez.pdf", paginas: 4 },
      { nombre: "Titulo.pdf", paginas: 2 },
      { nombre: "AWS_SAA.pdf", paginas: 1 },
    ],
  },
  {
    id: "c2",
    nombre: "Javier Torres Gil",
    email: "j.torres@mail.com",
    estado: "Enviada",
    puntajeIA: 64,
    cumplimiento: 75,
    alertas: [{ tipo: "faltante", texto: "Falta certificado de antecedentes" }],
    resumenIA: "Perfil con buena experiencia (4,5 años) pero sin certificado de antecedentes y título parcialmente legible. Requiere subsanación.",
    requisitosIA: [
      { texto: "Título universitario afín", resultado: "Parcial", justificacion: "Escaneo borroso en sello; se sugiere resubir.", cita: "“[ilegible] Ingeniería …”", pagina: 1 },
      { texto: "5 años experiencia", resultado: "Parcial", justificacion: "Acredita 4,5 años; cerca del umbral.", cita: "“4,5 años como desarrollador…”", pagina: 2 },
      { texto: "Certificado de antecedentes", resultado: "Sin evidencia", justificacion: "No se encontró el documento.", cita: "Sin citas encontradas.", pagina: 0 },
      { texto: "Certificación AWS", resultado: "No cumple", justificacion: "No aporta certificación.", cita: "Sin citas encontradas.", pagina: 0 },
    ],
    documentos: [{ nombre: "CV_Javier_Torres.pdf", paginas: 3 }],
  },
  {
    id: "c3",
    nombre: "Lucía Fernández Sanz",
    email: "lucia.f@mail.com",
    estado: "Preseleccionada",
    puntajeIA: 92,
    cumplimiento: 100,
    alertas: [],
    resumenIA: "Candidata excelente: 8 años de experiencia, liderazgo técnico y publicaciones. Puntaje más alto del concurso.",
    requisitosIA: [
      { texto: "Título universitario afín", resultado: "Cumple", justificacion: "Doble titulación verificada.", cita: "“Doble Grado en Ingeniería Informática y Matemáticas…”", pagina: 1 },
      { texto: "5 años experiencia", resultado: "Cumple", justificacion: "8 años, 3 como tech lead.", cita: "“Tech Lead 2022-2026…”", pagina: 2 },
      { texto: "Antecedentes", resultado: "Cumple", justificacion: "Vigente y legible.", cita: "“Emitido 01/09/2026…”", pagina: 6 },
      { texto: "Portafolio / libros", resultado: "Cumple", justificacion: "2 libros técnicos y GitHub activo.", cita: "“github.com/luciaf – 1.2k stars…”", pagina: 3 },
    ],
    documentos: [
      { nombre: "CV_Lucia.pdf", paginas: 5 },
      { nombre: "Titulos.pdf", paginas: 3 },
    ],
  },
  {
    id: "c4",
    nombre: "Marco Aguilar Díaz",
    email: "marco.ag@mail.com",
    estado: "En revisión",
    puntajeIA: 48,
    cumplimiento: 50,
    alertas: [
      { tipo: "ilegible", texto: "Título ilegible (pág. 1)" },
      { tipo: "faltante", texto: "Falta CV en PDF" },
    ],
    resumenIA: "Documentación incompleta y de baja calidad de escaneo. No se puede verificar formación ni experiencia con fiabilidad.",
    requisitosIA: [
      { texto: "Título universitario", resultado: "No cumple", justificacion: "Escaneo ilegible, texto irreconocible.", cita: "“[no legible]…”", pagina: 1 },
      { texto: "CV", resultado: "Sin evidencia", justificacion: "Solo aporta enlace roto a portafolio.", cita: "Enlace caído (404).", pagina: 0 },
      { texto: "Antecedentes", resultado: "Parcial", justificacion: "Caducado (>6 meses).", cita: "“Emitido 02/01/2026…”", pagina: 2 },
    ],
    documentos: [{ nombre: "scan_bor-roso.pdf", paginas: 2 }],
  },
  {
    id: "c5",
    nombre: "Sara Núñez Vega",
    email: "sara.nv@mail.com",
    estado: "Enviada",
    puntajeIA: 73,
    cumplimiento: 100,
    alertas: [],
    resumenIA: "Cumple obligatorios con 5 años justos de experiencia. Sin certificaciones deseables pero con buena prueba técnica esperable.",
    requisitosIA: [
      { texto: "Título universitario", resultado: "Cumple", justificacion: "Grado en Ingeniería del Software.", cita: "“Grado en Ingeniería del Software…”", pagina: 1 },
      { texto: "5 años experiencia", resultado: "Cumple", justificacion: "5 años y 2 meses.", cita: "“2019-2024 desarrolladora full-stack…”", pagina: 2 },
      { texto: "Antecedentes", resultado: "Cumple", justificacion: "Vigente.", cita: "“Emitido 15/09/2026…”", pagina: 4 },
    ],
    documentos: [{ nombre: "CV_Sara.pdf", paginas: 3 }],
  },
  {
    id: "c6",
    nombre: "Diego Ramos Castro",
    email: "d.ramos@mail.com",
    estado: "Rechazada",
    puntajeIA: 35,
    cumplimiento: 25,
    alertas: [{ tipo: "faltante", texto: "Faltan 3 documentos obligatorios" }],
    resumenIA: "No cumple el perfil mínimo: sin título afín y experiencia no relacionada (soporte helpdesk).",
    requisitosIA: [
      { texto: "Título afín", resultado: "No cumple", justificacion: "Aporta FP en marketing.", cita: "“Técnico Superior en Marketing…”", pagina: 1 },
      { texto: "Experiencia", resultado: "No cumple", justificacion: "2 años en soporte, sin desarrollo.", cita: "“Helpdesk L1…”", pagina: 2 },
    ],
    documentos: [{ nombre: "CV_Diego.pdf", paginas: 2 }],
  },
];

export interface Campana {
  id: string;
  nombre: string;
  asunto: string;
  fecha: string;
  destinatarios: number;
  enviados: number;
  entregados: number;
  rebotados: number;
  estado: "Completada" | "En curso" | "Programada";
}

export const CAMPANAS: Campana[] = [
  { id: "m1", nombre: "Subsanación documentos – Full-Stack", asunto: "Subsaná tu postulación (48h)", fecha: "06 oct 2026", destinatarios: 34, enviados: 34, entregados: 32, rebotados: 2, estado: "Completada" },
  { id: "m2", nombre: "Recordatorio cierre – Enfermería", asunto: "Cierra en 48h: 12 plazas", fecha: "07 oct 2026", destinatarios: 486, enviados: 310, entregados: 295, rebotados: 5, estado: "En curso" },
  { id: "m3", nombre: "Preseleccionados – Jurídico", asunto: "¡Preseleccionada/o! Siguientes pasos", fecha: "10 oct 2026", destinatarios: 20, enviados: 0, entregados: 0, rebotados: 0, estado: "Programada" },
];

export const POSTULACIONES_POR_DIA = [
  { dia: "lun", n: 42 },
  { dia: "mar", n: 68 },
  { dia: "mié", n: 55 },
  { dia: "jue", n: 90 },
  { dia: "vie", n: 74 },
  { dia: "sáb", n: 28 },
  { dia: "dom", n: 19 },
];
