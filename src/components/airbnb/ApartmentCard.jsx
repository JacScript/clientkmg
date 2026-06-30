import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Users, CheckCircle2, XCircle, ArrowUpRight, CalendarClock } from "lucide-react";
import { formatTZS } from "../../utils/currency";

const AUTOPLAY_MS = 4500;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const ApartmentCard = ({ apartment }) => {
  const {
    slug,
    title,
    description,
    location,
    guests,
    availability,
    availableFrom,
    images,
    features,
    price,
  } = apartment;

  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = images.length;

  const goTo = useCallback(
    (index) => setCurrent(((index % total) + total) % total),
    [total]
  );

  useEffect(() => {
    if (paused || total <= 1) return;
    const id = setInterval(() => goTo(current + 1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [current, paused, total, goTo]);

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6 }}
      className="overflow-hidden rounded-3xl bg-white shadow-lg shadow-black/5 ring-1 ring-black/5"
    >
      {/* Photo carousel */}
      <div
        className="relative aspect-[4/3] overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`${title} photo ${i + 1}`}
            className={
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-700 " +
              (i === current ? "opacity-100" : "opacity-0")
            }
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

        {/* Invisible tap zones for prev/next */}
        {total > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous photo"
              onClick={() => goTo(current - 1)}
              className="absolute inset-y-0 left-0 z-10 w-1/3"
            />
            <button
              type="button"
              aria-label="Next photo"
              onClick={() => goTo(current + 1)}
              className="absolute inset-y-0 right-0 z-10 w-1/3"
            />
          </>
        )}

        {/* Corner link to the full apartment page */}
        <Link
          to={`/apartments/${slug}`}
          aria-label={`Open ${title} full page`}
          className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow-md transition hover:scale-105 hover:bg-white"
        >
          <ArrowUpRight size={18} />
        </Link>

        {/* Dots */}
        {total > 1 && (
          <div className="absolute inset-x-0 bottom-3 z-10 flex items-center justify-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to photo ${i + 1}`}
                onClick={() => goTo(i)}
                className={
                  "h-1.5 rounded-full transition-all " +
                  (i === current ? "w-4 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80")
                }
              />
            ))}
          </div>
        )}

        {/* Counter */}
        {total > 1 && (
          <span className="absolute bottom-3 right-3 z-10 rounded-full bg-black/60 px-2 py-0.5 text-xs font-medium text-white">
            {current + 1}/{total}
          </span>
        )}
      </div>

      {/* Details */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>

        <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <MapPin size={15} /> {location}
          </span>
          <span className="flex items-center gap-1">
            <Users size={15} /> {guests} guest{guests > 1 ? "s" : ""}
          </span>
        </div>

        {features?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {features.map((feature) => (
              <span
                key={feature}
                className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
              >
                {feature}
              </span>
            ))}
          </div>
        )}

        <p className="mt-4 text-sm leading-relaxed text-gray-600">{description}</p>

        {!availability && availableFrom && (
          <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-amber-600">
            <CalendarClock size={14} />
            Available starting from {availableFrom}
          </p>
        )}

        <div className="mt-5 flex items-center justify-between">
          {typeof price === "number" && (
            <span className="text-sm font-semibold text-gray-900">
              {formatTZS(price)} <span className="text-gray-400">/ night</span>
            </span>
          )}
          <span
            className={
              "flex items-center gap-1 text-xs font-semibold " +
              (availability ? "text-emerald-600" : "text-red-500")
            }
          >
            {availability ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
            {availability ? "Available" : "Not available"}
          </span>
        </div>

        {availability ? (
          <Link to={`/apartments/${slug}#book`} className="mt-4 block">
            <motion.span
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="block w-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-center text-sm font-semibold text-white transition hover:from-blue-700 hover:to-purple-700"
            >
              Book {title} Now
            </motion.span>
          </Link>
        ) : (
          <span className="mt-4 block w-full cursor-not-allowed rounded-full bg-gray-200 px-6 py-3 text-center text-sm font-semibold text-gray-500">
            Not Available
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default ApartmentCard;