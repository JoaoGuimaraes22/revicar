"use client";

import { useEffect, useState } from "react";

interface QuoteBarDict {
  cta_quote: string;
  cta_call: string;
  phone: string;
}

export default function QuoteBar({ dict }: { dict: QuoteBarDict }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-2 inset-x-2 z-60 md:hidden transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-24"
      }`}
    >
      <div className="flex gap-2 rounded-2xl bg-zinc-900/95 p-2 shadow-2xl backdrop-blur-sm">
        <button
          onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          className="flex-1 cursor-pointer rounded-xl bg-[#dc2626] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#b91c1c]"
        >
          {dict.cta_quote}
        </button>
        <a
          href={`tel:${dict.phone}`}
          className="flex-1 cursor-pointer rounded-xl bg-[#1e3a5f] py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#2563eb]"
        >
          {dict.cta_call}
        </a>
      </div>
    </div>
  );
}
