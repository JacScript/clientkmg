import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.25,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function VillaHero({
  images = [
    {
      url: "https://res.cloudinary.com/dgpbjp2wz/image/upload/v1782476099/KMGROUP_Pics_29_rcemlz.jpg",
      alt: "Stone and wood exterior of the villa among palm trees",
      label: "Exterior",
    },
  ],
  eyebrow = "Entire villa · Studio · Private Room",
  title = "Bahari Breeze Villa Chez Kai",
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
    <section
      ref={sectionRef}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="font-body relative h-[100vh] w-full overflow-hidden text-white outline-none"
    >
      <motion.div
        className="absolute inset-0 -z-20"
        initial={{ scale: 1.12, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
      >
        {images.map((img, i) => (
          <img
            key={i}
            src={img.url}
            alt={img.alt}
            className={
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-700 " +
              (i === current ? "opacity-100" : "opacity-0")
            }
          />
        ))}
      </motion.div>

      <motion.div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      />

      <motion.button
        type="button"
        onClick={prev}
        aria-label="Previous photo"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-slate-900/40 p-2 text-white hover:bg-slate-900/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
      >
        <ChevronLeft size={22} />
      </motion.button>
      <motion.button
        type="button"
        onClick={next}
        aria-label="Next photo"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-slate-900/40 p-2 text-white hover:bg-slate-900/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
      >
        <ChevronRight size={22} />
      </motion.button>

      <motion.div
        className="absolute inset-x-0 top-1/3 -z-10 flex flex-col gap-5 px-6 pb-10 sm:px-10 sm:pb-12 mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-80"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-3xl">
          <motion.p variants={item} className="font-tag mb-2 text-xs uppercase tracking-widest text-amber-300 font-semibold">
            {eyebrow}
          </motion.p>
          <motion.h1 variants={item} className="font-display mb-3 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            {title}
          </motion.h1>
          <motion.p variants={item} className="max-w-prose text-sm leading-relaxed text-white sm:text-base">
            {subheading}
          </motion.p>
        </div>

        <motion.div variants={item} className="flex items-center gap-2">
          {images.map((img, i) => (
            <motion.button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to photo: ${img.label || i + 1}`}
              aria-current={i === current}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.85 }}
              className={
                "h-2 rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 " +
                (i === current ? "w-6 bg-amber-300" : "w-2 bg-white/40 hover:bg-white/70")
              }
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}