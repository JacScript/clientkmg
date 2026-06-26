import React, { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * VillaHero — full-screen listing hero with a photo carousel,
 * a heading, and a subheading. Pass your own `images` and copy
 * props to reuse it for any listing.
 */
export default function VillaHero({
  images = [
    {
      src: "https://res.cloudinary.com/dgpbjp2wz/image/upload/v1782476099/KMGROUP_Pics_29_rcemlz.jpg",
      alt: "Stone and wood exterior of the villa among palm trees",
      label: "Exterior",
    },
    {
      src: "https://res.cloudinary.com/dgpbjp2wz/image/upload/v1782476098/KMGROUP_Pics_16_kglfbq.jpg",
      alt: "Living room with fireplace and minimalist decor",
      label: "Living room",
    },
    {
      src: "https://res.cloudinary.com/dgpbjp2wz/image/upload/v1782476098/KMGROUP_Pics_9_wyifdb.jpg",
      alt: "Minimal bedroom with natural light",
      label: "Primary bedroom",
    },
    {
      src: "https://res.cloudinary.com/dgpbjp2wz/image/upload/v1782476098/KMGROUP_Pics_28_dwu3bo.jpg",
      alt: "Modern kitchen with wooden cabinets and island",
      label: "Kitchen",
    },
    {
      src: "https://res.cloudinary.com/dgpbjp2wz/image/upload/v1782476093/KMGROUP_Pics_8_me7zkx.jpg",
      alt: "Backyard pool at dusk",
      label: "Pool",
    }, {
      src: "https://res.cloudinary.com/dgpbjp2wz/image/upload/v1782476090/8a705856-31e6-4a5f-84d5-64a5b8b2fde9_dzvmzy.jpg",
      alt: "Backyard pool at dusk",
      label: "Pool",
    },
  
  ],
  eyebrow = "Entire villa · Studio · Private Room",
  title = "Bahari Breeze Villa Chez Kai",
  titleAccent = "by the sea",
  subheading = "Sun-bleached wood and stone walls open onto a private pool tucked behind the palms — five rooms, one unmistakable view of the coast.",
  autoplayMs = 5000,
}) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = images.length;
  const sectionRef = useRef(null);

  const goTo = useCallback(
    (index) => setCurrent(((index % total) + total) % total),
    [total]
  );
  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    if (paused || total <= 1) return;
    const id = setInterval(next, autoplayMs);
    return () => clearInterval(id);
  }, [paused, next, autoplayMs, total]);

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,600;1,9..144,500&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500;700&display=swap');
        .font-display { font-family: 'Fraunces', serif; }
        .font-tag { font-family: 'JetBrains Mono', monospace; }
        .font-body { font-family: 'Inter', sans-serif; }
      `}</style>

      <section
        ref={sectionRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        className="font-body relative h-[85vh] w-full overflow-hidden text-white outline-none top-44"
      >
        {images.map((img, i) => (
          <img
            key={img.src}
            src={img.src}
            alt={img.alt}
            className={
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-700 " +
              (i === current ? "opacity-100" : "opacity-0")
            }
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

        {/* <span className="font-tag absolute top-6 left-6 z-10 rounded-full border border-white/20 bg-slate-900/50 px-3 py-1.5 text-xs uppercase tracking-widest text-amber-300">
          {tag}
        </span> */}

        {/* <span className="font-tag absolute top-6 right-6 z-10 rounded-full border border-white/20 bg-slate-900/50 px-3 py-1.5 text-xs tracking-widest text-amber-300">
          {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span> */}

        <button
          type="button"
          onClick={prev}
          aria-label="Previous photo"
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-slate-900/40 p-2 text-white hover:bg-slate-900/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next photo"
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-slate-900/40 p-2 text-white hover:bg-slate-900/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
        >
          <ChevronRight size={22} />
        </button>

        <div className="absolute inset-x-0 top-1/2 z-10 flex flex-col gap-5 px-6 pb-10 sm:px-10 sm:pb-12 ml-20">
          <div className="max-w-3xl">
            <p className="font-tag mb-2 text-xs uppercase tracking-widest text-slate-300">
              {eyebrow}
            </p>
            <h1 className="font-display mb-3 text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl">
              {title}{" "}
              <em className="font-medium text-amber-300">{titleAccent}</em>
            </h1>
            <p className="max-w-prose text-sm leading-relaxed text-slate-300 sm:text-base">
              {subheading}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to photo: ${img.label || i + 1}`}
                aria-current={i === current}
                className={
                  "h-2 rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 " +
                  (i === current ? "w-6 bg-amber-300" : "w-2 bg-white/40 hover:bg-white/70")
                }
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}