"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { i18n, type Locale } from "@/i18n-config";

export default function LocaleSwitcher() {
  const pathname = usePathname();

  const redirectedPathname = (locale: Locale) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <div className="flex gap-2">
      {i18n.locales.map((locale) => (
        <Link
          key={locale}
          href={redirectedPathname(locale)}
          className="rounded-full border border-white/20 px-3 py-1 text-sm font-medium text-white transition-colors hover:bg-white/10"
        >
          {locale.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
