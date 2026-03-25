interface NavLink {
  id: string;
  label: string;
}

interface FooterDict {
  brand: string;
  tagline: string;
  address: string;
  hours: string;
  phone: string;
  facebook: string;
  whatsapp: string;
  copyright: string;
  quote_cta: string;
  explore_label: string;
  hours_label: string;
  find_us_label: string;
  made_in: string;
  nav_links: NavLink[];
}

export default function Footer({ dict }: { dict: FooterDict }) {
  return (
    <footer className="bg-zinc-950 px-6 pt-16 pb-8 md:px-8 xl:px-16">
      <div className="mx-auto max-w-6xl">

        {/* Top: brand + tagline + CTA */}
        <div className="mb-12 flex flex-col gap-4 border-b border-zinc-800 pb-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mb-4 block text-2xl font-bold text-white tracking-tight">
              {dict.brand}
            </span>
            <p className="max-w-xs text-sm leading-relaxed text-zinc-400">{dict.tagline}</p>
          </div>
          <a
            href="#contact"
            className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full bg-[#dc2626] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#b91c1c]"
          >
            {dict.quote_cta}
          </a>
        </div>

        {/* Middle: nav + hours + contact */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 mb-12">

          {/* Nav */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-500">
              {dict.explore_label}
            </p>
            <nav className="flex flex-col gap-2.5">
              {dict.nav_links.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className="cursor-pointer text-sm text-zinc-400 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Hours */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-500">
              {dict.hours_label}
            </p>
            <p className="text-sm text-zinc-400 leading-relaxed whitespace-pre-line">{dict.hours}</p>
          </div>

          {/* Contact */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-500">
              {dict.find_us_label}
            </p>
            <div className="flex flex-col gap-2 text-sm text-zinc-400">
              <span className="leading-relaxed">{dict.address}</span>
              <a href={`tel:${dict.phone}`} className="cursor-pointer transition-colors hover:text-white">
                {dict.phone}
              </a>
              <a
                href={dict.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer transition-colors hover:text-white"
              >
                Facebook
              </a>
              <a
                href={`https://wa.me/${dict.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer transition-colors hover:text-white"
              >
                WhatsApp
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-2 border-t border-zinc-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-zinc-600">{dict.copyright}</p>
          <p className="text-xs text-zinc-700">{dict.made_in}</p>
        </div>

      </div>
    </footer>
  );
}
