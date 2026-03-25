"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";

interface ServiceItem {
  icon: string;
  title: string;
  description: string;
  image: string;
}

interface ServicesDict {
  title_line1: string;
  title_line2: string;
  items: ServiceItem[];
}

export default function Services({ dict }: { dict: ServicesDict }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="services"
      ref={ref}
      className="relative bg-[#0f1f35] px-6 py-20 md:px-8 md:py-28 xl:px-16 xl:py-36 overflow-hidden"
    >
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Section header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-red-500">
            {dict.title_line1}
          </p>
          <h2 className="mt-2 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            {dict.title_line2}
          </h2>
          <div className="mt-4 h-1 w-16 bg-red-600 rounded-full" />
        </motion.div>

        {/* Service cards grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {dict.items.map((item, i) => {
            const isHovered = hoveredIndex === i;

            return (
              <motion.div
                key={i}
                className="group relative overflow-hidden rounded-2xl bg-[#162a45] border border-white/5 shadow-lg cursor-default transition-all duration-500 hover:shadow-2xl hover:shadow-red-900/10 hover:border-white/10"
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.1 * i,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={`object-cover transition-transform duration-700 ${
                      isHovered ? "scale-105" : "scale-100"
                    }`}
                  />
                  {/* Gradient overlay on image */}
                  <div className="absolute inset-0 bg-linear-to-t from-[#162a45] via-[#162a45]/40 to-transparent" />

                  {/* Icon badge */}
                  <div className="absolute top-4 left-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#1e3a5f]/90 text-lg shadow-md backdrop-blur-sm ring-1 ring-white/10">
                    {item.icon}
                  </div>

                  {/* Red accent line on hover */}
                  <div
                    className={`absolute bottom-0 left-0 h-0.5 bg-red-600 transition-all duration-500 ${
                      isHovered ? "w-full" : "w-0"
                    }`}
                  />
                </div>

                {/* Content */}
                <div className="p-5 pt-3">
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-zinc-400">{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
