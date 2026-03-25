"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

interface Stat {
  value: string;
  label: string;
}

interface TickerItem {
  text: string;
}

interface HeroDict {
  title_line1: string;
  title_line2: string;
  tagline: string;
  cta: string;
  cta_secondary: string;
  stats: Stat[];
  ticker: TickerItem[];
}

export default function Hero({ dict }: { dict: HeroDict }) {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedRaw = useReducedMotion();
  const prefersReduced = mounted ? (prefersReducedRaw ?? false) : false;

  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], [0, 280]);
  const contentOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const contentY = useTransform(scrollY, [0, 500], [0, -60]);
  const statsY = useTransform(scrollY, [0, 600], [0, -30]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      setVisible(true);
    }, 60);
    return () => clearTimeout(timer);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // Duplicate ticker items for seamless loop
  const tickerItems = [...dict.ticker, ...dict.ticker, ...dict.ticker, ...dict.ticker];

  return (
    <>
      <section
        id="home"
        ref={sectionRef}
        className="noise-texture relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-950"
      >
        {/* Parallax background image */}
        <motion.div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ y: bgY }}
        >
          <div
            className="absolute left-[-15%] right-[-15%] md:left-0 md:right-0"
            style={{
              top: "-20%",
              bottom: "-20%",
            }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source src="/hero/hero-video.mp4" type="video/mp4" />
            </video>
          </div>
        </motion.div>

        {/* Dark gradient overlay — navy to black */}
        <div className="absolute inset-0 pointer-events-none bg-linear-to-t from-[#111]/70 via-[#111]/20 to-[#111]/30" />

        {/* Subtle radial accent glow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(220,38,38,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Engine pulse — subtle background animation */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(17,17,17,0.3) 0%, transparent 60%)",
            animation: prefersReduced ? undefined : "engine-pulse 4s ease-in-out infinite",
          }}
        />

        {/* Main content */}
        <motion.div
          className="relative z-10 mx-auto max-w-5xl px-6 py-24 text-center"
          style={prefersReduced ? {} : { opacity: contentOpacity, y: contentY }}
        >
          {/* Title line 1 */}
          <h1 className="overflow-hidden">
            <span
              className="block text-6xl font-black tracking-tight text-white sm:text-7xl lg:text-8xl"
              style={
                visible
                  ? { animation: "cinematic-up 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s both" }
                  : { opacity: 0 }
              }
            >
              {dict.title_line1}
            </span>
            {/* Title line 2 — red accent */}
            <span
              className="block text-6xl font-black tracking-tight text-red-600 sm:text-7xl lg:text-8xl"
              style={
                visible
                  ? { animation: "cinematic-up 0.9s cubic-bezier(0.16,1,0.3,1) 0.25s both" }
                  : { opacity: 0 }
              }
            >
              {dict.title_line2}
            </span>
          </h1>

          {/* Divider line */}
          <div
            className="mx-auto mt-6 mb-6 h-0.5 w-24 bg-red-600"
            style={
              visible
                ? { animation: "scale-in 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s both" }
                : { opacity: 0 }
            }
          />

          {/* Tagline */}
          <p
            className="mx-auto mb-10 max-w-2xl text-base text-zinc-300 sm:text-lg md:text-xl leading-relaxed"
            style={
              visible
                ? { animation: "cinematic-up 0.9s cubic-bezier(0.16,1,0.3,1) 0.5s both" }
                : { opacity: 0 }
            }
          >
            {dict.tagline}
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            style={
              visible
                ? { animation: "cinematic-up 0.9s cubic-bezier(0.16,1,0.3,1) 0.65s both" }
                : { opacity: 0 }
            }
          >
            <button
              onClick={() => scrollTo("contact")}
              className="cursor-pointer rounded-lg bg-red-600 px-10 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-red-600/25 transition-all hover:bg-red-700 hover:shadow-red-600/40 hover:scale-[1.02] active:scale-[0.98]"
            >
              {dict.cta}
            </button>
            <button
              onClick={() => scrollTo("services")}
              className="cursor-pointer rounded-lg border-2 border-white/20 px-10 py-4 text-sm font-bold uppercase tracking-wider text-white/90 backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/5"
            >
              {dict.cta_secondary}
            </button>
          </div>

          {/* Stats row */}
          {dict.stats.length > 0 && (
            <motion.div
              className="mt-20 flex flex-col items-center justify-center gap-10 sm:flex-row sm:gap-16"
              style={prefersReduced ? {} : { y: statsY }}
            >
              {dict.stats.map((stat, i) => (
                <div
                  key={i}
                  className="text-center"
                  style={
                    visible
                      ? {
                          animation: `cinematic-up 0.9s cubic-bezier(0.16,1,0.3,1) ${0.8 + i * 0.1}s both`,
                        }
                      : { opacity: 0 }
                  }
                >
                  <div className="text-3xl font-black text-white sm:text-4xl">{stat.value}</div>
                  <div className="mt-1 text-xs font-semibold tracking-[0.2em] text-zinc-400 uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2"
          style={
            visible
              ? { animation: "cinematic-up 0.9s cubic-bezier(0.16,1,0.3,1) 1.1s both" }
              : { opacity: 0 }
          }
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500">Scroll</span>
          <div className="relative h-8 w-px overflow-hidden bg-white/20">
            <div
              className="absolute top-0 h-3 w-full bg-red-500/60"
              style={{ animation: "scrollPulse 2s ease-in-out infinite" }}
            />
          </div>
        </div>
      </section>

      {/* ── Services ticker bar ─────────────────────────────────── */}
      <div className="relative z-20 w-full overflow-hidden bg-zinc-900 py-4 border-y border-white/5">
        <div className="ticker-track flex w-max items-center gap-0">
          {tickerItems.map((item, i) => (
            <div key={i} className="flex items-center shrink-0">
              <span className="px-6 text-sm font-bold uppercase tracking-[0.25em] text-white/90 sm:px-10 sm:text-base">
                {item.text}
              </span>
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
