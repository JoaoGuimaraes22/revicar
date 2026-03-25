"use client";

import Image from "next/image";

interface GalleryImage {
  src: string;
  alt: string;
}

interface GalleryStripDict {
  images: GalleryImage[];
}

export default function GalleryStrip({ dict }: { dict: GalleryStripDict }) {
  const images = [...dict.images, ...dict.images];

  return (
    <section className="overflow-hidden bg-zinc-900 py-3">
      <div className="gallery-track flex" style={{ width: "max-content" }}>
        {images.map((img, i) => (
          <div
            key={i}
            className="relative mx-1.5 h-48 w-72 shrink-0 overflow-hidden rounded-lg sm:h-56 sm:w-80"
          >
            <Image src={img.src} alt={img.alt} fill sizes="(min-width: 640px) 320px, 288px" className="object-cover" loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  );
}
