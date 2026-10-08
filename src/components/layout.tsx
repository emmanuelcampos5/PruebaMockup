"use client";
import * as React from "react";
import { Moon, Sun, Menu, X, Briefcase, LayoutDashboard, FileText, Inbox, Send, Settings, LogOut, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const [dark, setDark] = React.useState(false);
  React.useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);
  const toggle = () => {
    const el = document.documentElement;
    el.classList.toggle("dark");
    setDark(el.classList.contains("dark"));
    try {
      localStorage.setItem("theme", el.classList.contains("dark") ? "dark" : "light");
    } catch {}
  };
  return (
    <Button variant="ghost" size="icon" onClick={toggle} aria-label="Cambiar tema">
      {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
}

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
        <Briefcase className="h-5 w-5" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[15px] font-bold tracking-tight">ConcurSOS</span>
        <span className="text-[11px] text-slate-500 dark:text-slate-400">Empleo público abierto</span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = React.useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link href="/" className="text-slate-700 hover:text-indigo-600 dark:text-slate-200">Concursos</Link>
          <Link href="/#como-funciona" className="text-slate-700 hover:text-indigo-600 dark:text-slate-200">Cómo funciona</Link>
          <Link href="/mis-postulaciones" className="text-slate-700 hover:text-indigo-600 dark:text-slate-200">Mis postulaciones</Link>
          <Link href="/admin" className="text-slate-700 hover:text-indigo-600 dark:text-slate-200">Administración</Link>
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Link href="/login"><Button variant="ghost">Iniciar sesión</Button></Link>
          <Link href="/registro"><Button>Registrarme</Button></Link>
        </div>
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
        </div>
      </div>
      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-950 md:hidden">
          <div className="flex flex-col gap-1 text-sm font-medium">
            <Link href="/" className="rounded-lg px-2 py-2 hover:bg-slate-100 dark:hover:bg-slate-800">Concursos</Link>
            <Link href="/#como-funciona" className="rounded-lg px-2 py-2 hover:bg-slate-100 dark:hover:bg-slate-800">Cómo funciona</Link>
            <Link href="/mis-postulaciones" className="rounded-lg px-2 py-2 hover:bg-slate-100 dark:hover:bg-slate-800">Mis postulaciones</Link>
            <Link href="/admin" className="rounded-lg px-2 py-2 hover:bg-slate-100 dark:hover:bg-slate-800">Administración</Link>
            <div className="mt-2 flex gap-2">
              <Link href="/login" className="flex-1"><Button variant="outline" className="w-full">Iniciar sesión</Button></Link>
              <Link href="/registro" className="flex-1"><Button className="w-full">Registrarme</Button></Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

const ADMIN_NAV = [
  { href: "/admin", label: "Resumen", icon: LayoutDashboard },
  { href: "/admin?tab=concursos", label: "Concursos", icon: FileText },
  { href: "/admin/concursos/1/postulaciones", label: "Postulaciones", icon: Inbox },
  { href: "/admin/mensajeria", label: "Mensajería", icon: Send },
  { href: "/admin?tab=config", label: "Configuración", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  const isActive = (href: string) => {
    const [path, query] = href.split("?");
    if (query?.startsWith("tab=")) {
      const wantTab = query.split("=")[1];
      return pathname === path && tab === wantTab;
    }
    if (href === "/admin") {
      return pathname === "/admin" && !tab;
    }
    return pathname === path || pathname.startsWith(path + "/");
  };

  // Versión móvil: misma lógica pero compacta
  const mobileActive = isActive;
  return (
    <>
      {/* Desktop */}
      <aside className="hidden w-64 shrink-0 flex-col gap-1 border-r border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 lg:flex">
        <Logo />
        <div className="mt-6 flex flex-col gap-1">
          {ADMIN_NAV.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                )}
              >
                <item.icon className="h-4.5 w-4.5 h-5 w-5" />
                {item.label}
                {active && <ChevronRight className="ml-auto h-4 w-4" />}
              </Link>
            );
          })}
        </div>
        <div className="mt-auto rounded-2xl bg-slate-50 p-4 text-xs dark:bg-slate-800">
          <p className="font-semibold">Rol: Evaluador</p>
          <p className="mt-1 text-slate-500 dark:text-slate-400">M. Delgado · RR. HH.</p>
          <Button variant="outline" size="sm" className="mt-3 w-full"><LogOut className="h-3.5 w-3.5" /> Salir</Button>
        </div>
      </aside>
      {/* Mobile top bar */}
      <div className="flex gap-2 overflow-x-auto border-b border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900 lg:hidden">
        {ADMIN_NAV.map((item) => (
          <Link key={item.label} href={item.href}>
            <Button variant={mobileActive(item.href) ? "default" : "secondary"} size="sm"><item.icon className="h-4 w-4" />{item.label}</Button>
          </Link>
        ))}
      </div>
    </>
  );
}
