import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin,
  Users,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Wifi,
  Snowflake,
  ChefHat,
  Waves,
  Mountain,
  Check,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { apartments } from "../../data/apartments";
import { formatTZS } from "../../utils/currency";

const WHATSAPP_LINK = "https://wa.me/33771948786";
const AUTOPLAY_MS = 5000;

// Maps known feature labels to an icon; anything unrecognized falls back to Check.
const FEATURE_ICONS = {
  "Free WiFi": Wifi,
  "Air Conditioning": Snowflake,
  Kitchen: ChefHat,
  "Swimming Pool": Waves,
  "Ocean View": Mountain,
};

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const ApartmentDetailPage = () => {
  const { slug } = useParams();
  const apartment = apartments.find((a) => a.slug === slug);

  const total = apartment?.images.length ?? 0;
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback(
    (index) => setCurrent(((index % total) + total) % total),
    [total]
  );

  useEffect(() => {
    if (!apartment || paused || total <= 1) return;
    const id = setInterval(() => goTo(current + 1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [apartment, current, paused, total, goTo]);

  if (!apartment) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-3xl px-6 py-32 text-center"
      >
        <h1 className="text-2xl font-bold text-gray-900">Apartment not found</h1>
        <p className="mt-3 text-gray-500">
          We couldn't find a listing at this address.
        </p>
        <Link to="/holiday-home" className="mt-6 inline-block font-semibold text-blue-600">
          ← Back to all apartments
        </Link>
      </motion.div>
    );
  }

  const { title, description, location, guests, images, features, availability, price } =
    apartment;

  return (
    <main className="relative top-44 bg-white">
      {/* Hero carousel */}
      <section
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="relative h-[70vh] min-h-[460px] w-full overflow-hidden text-white"
      >
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`${title} photo ${i + 1}`}
            className={
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-700 " +
              (i === current ? "opacity-100" : "opacity-0")
            }
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />

        <Link
          to="/holiday-home"
          className="absolute top-6 left-6 z-20 inline-flex items-center gap-1 rounded-full bg-black/40 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-black/60"
        >
          <ArrowLeft size={16} /> All apartments
        </Link>

        {total > 1 && (
          <>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => goTo(current - 1)}
              aria-label="Previous photo"
              className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-black/40 p-2 text-white hover:bg-black/60"
            >
              <ChevronLeft size={22} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => goTo(current + 1)}
              aria-label="Next photo"
              className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-black/40 p-2 text-white hover:bg-black/60"
            >
              <ChevronRight size={22} />
            </motion.button>

            <span className="absolute bottom-8 right-6 z-10 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold">
              {current + 1} / {total}
            </span>
          </>
        )}

        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="absolute inset-x-0 top-1/2 z-10 flex flex-col gap-5 px-6 pb-10 sm:px-10 sm:pb-12 mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-80"
        >
          <motion.p
            variants={item}
            className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-300"
          >
            Holiday Home
          </motion.p>
          <motion.h1
            variants={item}
            className="max-w-2xl text-3xl font-bold leading-tight sm:text-4xl md:text-5xl"
          >
            {title}
          </motion.h1>
          <motion.div
            variants={item}
            className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-200"
          >
            <span className="flex items-center gap-1">
              <MapPin size={15} /> {location}
            </span>
            <span className="flex items-center gap-1">
              <Users size={15} /> {guests} guests
            </span>
            <span
              className={
                "flex items-center gap-1 font-semibold " +
                (availability ? "text-emerald-300" : "text-red-300")
              }
            >
              {availability ? <CheckCircle2 size={15} /> : <XCircle size={15} />}
              {availability ? "Available now" : "Not available"}
            </span>
          </motion.div>
        </motion.div>
      </section>

      {/* Thumbnail strip */}
      {total > 1 && (
        <div className="mx-auto max-w-5xl px-6 pt-6 lg:px-12">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to photo ${i + 1}`}
                className={
                  "h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg border-2 transition " +
                  (i === current
                    ? "border-blue-600"
                    : "border-transparent opacity-70 hover:opacity-100")
                }
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mx-auto max-w-5xl px-6 pb-20 pt-4 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-3">
          <motion.div
            className="lg:col-span-2"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h2 variants={item} className="text-lg font-semibold text-gray-900">
              About this place
            </motion.h2>
            <motion.p variants={item} className="mt-3 leading-relaxed text-gray-600">
              {description}
            </motion.p>

            <motion.h2 variants={item} className="mt-10 text-lg font-semibold text-gray-900">
              What's included
            </motion.h2>
            <motion.div variants={item} className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {features.map((feature) => {
                const Icon = FEATURE_ICONS[feature] || Check;
                return (
                  <div
                    key={feature}
                    className="flex items-center gap-2 rounded-xl border border-gray-100 px-3 py-2.5 text-sm text-gray-700"
                  >
                    <Icon size={16} className="text-blue-600" />
                    {feature}
                  </div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Booking card */}
          <motion.div
            id="book"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="self-start rounded-2xl border border-gray-100 p-6 shadow-lg shadow-black/5 lg:sticky lg:top-32"
          >
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold text-gray-900">{formatTZS(price)}</span>
              <span className="text-sm text-gray-400">/ night</span>
            </div>

            <span
              className={
                "mt-3 flex items-center gap-1 text-sm font-semibold " +
                (availability ? "text-emerald-600" : "text-red-500")
              }
            >
              {availability ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
              {availability ? "Available now" : "Not available"}
            </span>

            <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
              <Users size={15} /> Up to {guests} guests
            </div>

            <motion.button
              whileHover={availability ? { scale: 1.02 } : {}}
              whileTap={availability ? { scale: 0.98 } : {}}
              disabled={!availability}
              className={
                "mt-6 w-full rounded-full px-6 py-3 text-sm font-semibold text-white transition " +
                (availability
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  : "cursor-not-allowed bg-gray-300 text-gray-500")
              }
            >
              {availability ? `Book ${title} Now` : "Not Available"}
            </motion.button>

            <p className="mt-3 text-center text-xs text-gray-400">
              You won't be charged yet
            </p>

            <div className="mt-5 flex items-center gap-2 border-t border-gray-100 pt-4 text-xs text-gray-500">
              <ShieldCheck size={15} className="text-blue-600" />
              Secure booking, handled directly by KM Group
            </div>

            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="mt-3 flex items-center justify-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              <MessageCircle size={16} />
              Questions? Message us
            </a>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default ApartmentDetailPage;