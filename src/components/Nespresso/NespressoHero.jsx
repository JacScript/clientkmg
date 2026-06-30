import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FALLBACK_SLIDES = [
  {
    src: "https://images.unsplash.com/photo-1637029967725-b64c1a7449ff?auto=format&fit=crop&w=2200&q=80",
    alt: "Espresso machine on a marble counter",
  },
  {
    src: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=2200&q=80",
    alt: "Barista pouring espresso shot",
  },
  {
    src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=2200&q=80",
    alt: "Coffee cup with latte art on a wooden table",
  },
  {
    src: "https://images.unsplash.com/photo-1610889556528-9a770e32642f?auto=format&fit=crop&w=2200&q=80",
    alt: "Nespresso capsules arranged by color",
  },
];

const INTERVAL = 5000;

// Normalise whatever shape backgroundImages arrives in into
// [{ src, alt }, ...] so the carousel always has a consistent array to work with.
function normaliseSlides(backgroundImages) {
  if (!backgroundImages) return FALLBACK_SLIDES;

  const arr = Array.isArray(backgroundImages)
    ? backgroundImages
    : [backgroundImages];

  if (arr.length === 0) return FALLBACK_SLIDES;

  return arr.map((img) => {
    // Already the right shape
    if (img && typeof img === "object" && img.src) return img;
    // Plain URL string
    if (typeof img === "string") return { src: img, alt: "" };
    // Mongoose/CMS doc with a url field instead of src
    if (img?.url) return { src: img.url, alt: img.alt ?? "" };
    return null;
  }).filter(Boolean);
}

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.25 },
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

const NespressoHero = ({
  eyebrow,
  title,
  subheading,
  backgroundImages,
}) => {
  const slides = normaliseSlides(backgroundImages);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);


  const advance = useCallback(
    (dir = 1) =>
      setCurrent((prev) => (prev + dir + slides.length) % slides.length),
    [slides.length]
  );

  useEffect(() => {
    // Reset to first slide if the images change (e.g. page data loads late)
    setCurrent(0);
  }, [backgroundImages]);

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    const id = setInterval(() => advance(1), INTERVAL);
    return () => clearInterval(id);
  }, [paused, advance, slides.length]);

  return (
    <section
      className="relative flex h-[90vh] min-h-[560px] w-full items-center overflow-hidden bg-[#15110D] text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Background carousel ── */}
      <AnimatePresence mode="sync">
        <motion.img
          key={current}
          src={slides[current].src}
          alt={slides[current].alt}
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 0.7, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* ── Gradient overlay ── */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#15110D] via-[#15110D]/70 to-transparent" />

      {/* ── Hero copy ── */}
      <motion.div
        className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-12"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {eyebrow && (
          <motion.p
            variants={item}
            className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A24B]"
          >
            {eyebrow}
          </motion.p>
        )}

        {title && (
          <motion.h1
            variants={item}
            className="max-w-xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl"
          >
            {title}
          </motion.h1>
        )}

        {subheading && (
          <motion.p
            variants={item}
            className="mt-5 max-w-md text-base text-gray-200 sm:text-lg"
          >
            {subheading}
          </motion.p>
        )}

        <motion.div variants={item} className="mt-8 flex flex-wrap gap-4">
          <motion.a
            href="#machines"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-full bg-[#C9A24B] px-7 py-3 font-semibold text-[#15110D] transition hover:bg-[#dab564]"
          >
            Shop Machines
          </motion.a>
          <motion.a
            href="#capsules"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-full border border-white/40 px-7 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            Explore Capsules
          </motion.a>
        </motion.div>
      </motion.div>

      {/* ── Prev / Next arrows (hidden when only one image) ── */}
      {slides.length > 1 && (
        <>
          <button
            onClick={() => advance(-1)}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/30 bg-black/30 p-2 text-white backdrop-blur-sm transition hover:bg-black/50"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => advance(1)}
            aria-label="Next image"
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/30 bg-black/30 p-2 text-white backdrop-blur-sm transition hover:bg-black/50"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* ── Dot indicators (hidden when only one image) ── */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === current ? "2rem" : "0.375rem",
                backgroundColor:
                  i === current ? "#C9A24B" : "rgba(255,255,255,0.4)",
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default NespressoHero;