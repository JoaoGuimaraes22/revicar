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
      <header
        className={`fixed inset-x-0 top-0 z-50 h-14 transition-colors duration-300 ${
          scrolled ? "bg-[#1e3a5f]/95 shadow-md backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 md:px-8">
          <a
            href={`/${lang}#home`}
            className={`shrink-0 text-xl font-bold tracking-tight transition-colors duration-300 ${
              scrolled ? "text-white" : "text-white"
            }`}
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
              className={`transition-colors ${scrolled ? "text-white" : "text-white/80"}`}
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

      <div
        className={`fixed inset-x-0 top-14 z-40 bg-[#1e3a5f]/95 shadow-md backdrop-blur-md transition-all duration-300 md:hidden ${
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
