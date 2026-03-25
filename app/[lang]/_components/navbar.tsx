"use client";

import { useEffect, useState, useCallback } from "react";
import LocaleSwitcher from "./locale-switcher";

interface NavLink {
  id: string;
  label: string;
}

interface NavbarDict {
  brand: string;
  cta: string;
  phone: string;
  email: string;
  address: string;
  facebook: string;
  instagram: string;
  whatsapp: string;
  links: NavLink[];
}

interface NavbarProps {
  lang: string;
  dict: NavbarDict;
}

export default function Navbar({ lang, dict }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const check = () => setScrolled(window.scrollY > 60);
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  useEffect(() => {
    const ids = ["home", ...dict.links.map((l) => l.id)];
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [dict.links]);

  const scrollTo = useCallback((id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      {/* ── Top contact bar ────────────────────────────────────── */}
      <div
        className={`fixed inset-x-0 top-0 z-50 h-9 transition-all duration-300 ${
          scrolled
            ? "-translate-y-full opacity-0"
            : "translate-y-0 opacity-100"
        }`}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 md:px-8">
          {/* Contact info — left */}
          <div className="hidden items-center gap-5 text-xs text-white/70 md:flex">
            <a href={`tel:${dict.phone.replace(/\s/g, "")}`} className="flex items-center gap-1.5 transition-colors hover:text-white">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
              </svg>
              {dict.phone}
            </a>
            <a href={`mailto:${dict.email}`} className="flex items-center gap-1.5 transition-colors hover:text-white">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              {dict.email}
            </a>
            <span className="flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {dict.address}
            </span>
          </div>

          {/* Social icons — right */}
          <div className="ml-auto flex items-center gap-3">
            <a href={dict.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white/60 transition-colors hover:text-white">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073Z" />
              </svg>
            </a>
            <a href={dict.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white/60 transition-colors hover:text-white">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
              </svg>
            </a>
            <a href={dict.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-white/60 transition-colors hover:text-white">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* ── Main navbar ────────────────────────────────────────── */}
      <header
        className={`fixed inset-x-0 z-50 h-14 transition-all duration-300 ${
          scrolled
            ? "top-0 bg-zinc-950/95 shadow-md backdrop-blur-md"
            : "top-9 bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 md:px-8">
          <a
            href={`/${lang}#home`}
            className="shrink-0 text-xl font-bold tracking-tight text-white transition-colors duration-300"
          >
            {dict.brand}
          </a>

          <nav className="hidden items-center gap-6 md:flex">
            {dict.links.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`relative cursor-pointer text-sm font-medium transition-colors hover:opacity-70 ${
                  scrolled ? "text-zinc-200" : "text-white/80"
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <span className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#dc2626]" />
                )}
              </button>
            ))}
            <LocaleSwitcher />
            <button
              onClick={() => scrollTo("contact")}
              className="cursor-pointer rounded-lg bg-[#dc2626] px-4 py-1.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#b91c1c]"
            >
              {dict.cta}
            </button>
          </nav>

          <div className="flex items-center gap-3 md:hidden">
            <LocaleSwitcher />
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              className="text-white/80 transition-colors"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {menuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile menu ────────────────────────────────────────── */}
      <div
        className={`fixed inset-x-0 z-40 bg-zinc-950/95 shadow-md backdrop-blur-md transition-all duration-300 md:hidden ${
          scrolled ? "top-14" : "top-[calc(2.25rem+3.5rem)]"
        } ${
          menuOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-3 px-4 py-4">
          {dict.links.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`text-left text-sm font-medium transition-colors hover:text-[#dc2626] ${
                activeSection === link.id ? "text-[#dc2626]" : "text-zinc-200"
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("contact")}
            className="mt-1 rounded-lg bg-[#dc2626] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#b91c1c]"
          >
            {dict.cta}
          </button>
        </nav>
      </div>
    </>
  );
}
