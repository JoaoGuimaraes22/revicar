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

/* ── Floating gear accent ─────────────────────────────────────── */
function FloatingGear({
  delay,
  duration,
  left,
  size,
  hidden,
}: {
  delay: number;
  duration: number;
  left: string;
  size: number;
  hidden?: boolean;
}) {
  if (hidden) return null;
  return (
    <div
      className="absolute pointer-events-none text-white/[0.07]"
      style={{
        left,
        bottom: "5%",
        animation: `float-gear ${duration}s ease-out ${delay}s infinite`,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M36 4h-8v6.1A18.1 18.1 0 0 0 20.5 14L15.7 9.3l-5.6 5.6 4.8 4.8A18.1 18.1 0 0 0 10.1 28H4v8h6.1a18.1 18.1 0 0 0 4.8 8.5l-4.8 4.8 5.6 5.6 4.8-4.8A18.1 18.1 0 0 0 28 53.9V60h8v-6.1a18.1 18.1 0 0 0 8.5-3.8l4.8 4.8 5.6-5.6-4.8-4.8A18.1 18.1 0 0 0 53.9 36H60v-8h-6.1a18.1 18.1 0 0 0-3.8-8.5l4.8-4.8-5.6-5.6-4.8 4.8A18.1 18.1 0 0 0 36 10.1V4ZM32 44a12 12 0 1 1 0-24 12 12 0 0 1 0 24Z" />
      </svg>
    </div>
  );
}

function FloatingWrench({
  delay,
  duration,
  left,
  size,
  hidden,
}: {
  delay: number;
  duration: number;
  left: string;
  size: number;
  hidden?: boolean;
}) {
  if (hidden) return null;
  return (
    <div
      className="absolute pointer-events-none text-white/[0.06]"
      style={{
        left,
        bottom: "8%",
        animation: `float-gear ${duration}s ease-out ${delay}s infinite`,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M54.5 9.5a16 16 0 0 0-20.3 1.8l-1.4 1.4L9.5 36l-3.5 3.5a8 8 0 0 0 11.3 11.3L21 47.1l23.3-23.3 1.4-1.4a16 16 0 0 0 1.8-20.3l-6.4 6.4-5.6-5.6 6.4-6.4ZM15.5 45.5a2 2 0 1 1-2.8-2.8 2 2 0 0 1 2.8 2.8Z" />
      </svg>
    </div>
  );
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
        className="noise-texture relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a1628]"
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
            <Image
              src="/hero.jpg"
              alt="Mechanic workshop with professional tools and lighting"
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

        {/* Dark gradient overlay — navy to black */}
        <div className="absolute inset-0 pointer-events-none bg-linear-to-t from-[#0a1628]/98 via-[#1e3a5f]/60 to-[#0a1628]/80" />

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
              "radial-gradient(circle at 50% 50%, rgba(30,58,95,0.3) 0%, transparent 60%)",
            animation: prefersReduced ? undefined : "engine-pulse 4s ease-in-out infinite",
          }}
        />

        {/* Floating gear/wrench accents */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <FloatingGear delay={0} duration={6} left="8%" size={48} hidden={prefersReduced} />
          <FloatingGear delay={2.5} duration={7} left="25%" size={32} hidden={prefersReduced} />
          <FloatingWrench delay={1} duration={5.5} left="75%" size={40} hidden={prefersReduced} />
          <FloatingGear delay={3.5} duration={6.5} left="88%" size={56} hidden={prefersReduced} />
          <FloatingWrench delay={4} duration={8} left="60%" size={28} hidden={prefersReduced} />
          <FloatingGear delay={1.8} duration={7.5} left="42%" size={36} hidden={prefersReduced} />
        </div>

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
      <div className="relative z-20 w-full overflow-hidden bg-[#142d4d] py-4 border-y border-white/5">
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
