import React from "react";
import { motion } from "framer-motion";
import { useCart } from "../../context/CartContext";
import { formatTZS } from "../../utils/currency";

const capsuleBowlImage =
  "https://images.unsplash.com/photo-1514212586585-6a0e1838e7bf?auto=format&fit=crop&w=1200&q=80";

const MAX_INTENSITY = 13;

// Fallback content shown if no capsules are linked on the backend yet.
const DEFAULT_CAPSULES = [
  { _id: "capsule-ristretto", name: "Ristretto", intensity: 10, servings: ["Ristretto (25ml)", "Espresso (40ml)"], image: capsuleBowlImage, price: 38000 },
  { _id: "capsule-volluto", name: "Volluto", intensity: 4, servings: ["Espresso (40ml)"], image: capsuleBowlImage, price: 38000 },
];

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
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

const IntensityBars = ({ intensity, max = MAX_INTENSITY }) => (
  <div className="mt-2 flex items-center justify-center gap-2">
    <div className="flex items-end gap-[2px]">
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className={`w-[3px] rounded-sm ${
            i < intensity ? "bg-[#C9A24B]" : "bg-white/15"
          }`}
          style={{ height: `${6 + i * 0.8}px` }}
        />
      ))}
    </div>
    <span className="text-xs font-semibold text-gray-400">
      {intensity}/{max}
    </span>
  </div>
);

const NespressoCapsules = ({
  capsules = DEFAULT_CAPSULES,
  eyebrow = "Capsules",
  heading = "A world of coffee, one capsule at a time.",
  subheading = "From bold Ristretto to delicate Hawaii Kona, each blend is roasted and sealed at peak freshness, capturing the aroma of single-origin farms in every cup.",
}) => {
  const { addToCart } = useCart();

  if (!capsules.length) return null;

  return (
    <section id="capsules" className="bg-[#0F0C09] px-6 py-20 text-white lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.p
              variants={item}
              className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A24B]"
            >
              {eyebrow}
            </motion.p>
            <motion.h2 variants={item} className="text-3xl font-bold sm:text-4xl">
              {heading}
            </motion.h2>
            <motion.p variants={item} className="mt-4 max-w-md text-gray-400">
              {subheading}
            </motion.p>
          </motion.div>

          <motion.div
            className="overflow-hidden rounded-2xl"
            initial={{ opacity: 0, scale: 1.08 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <img
              src={capsuleBowlImage}
              alt="Assorted colorful coffee capsules"
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>

        <motion.div
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {capsules.map((capsule) => (
            <motion.div
              key={capsule._id}
              variants={item}
              whileHover={{ y: -6 }}
              className="overflow-hidden rounded-2xl bg-[#1B1410] text-center"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={capsule.image}
                  alt={`${capsule.name} capsule`}
                  className="h-full w-full object-fit transition duration-500 hover:scale-105"
                />
              </div>

              <div className="p-6">
                <h3 className="font-semibold">{capsule.name}</h3>

                <IntensityBars intensity={capsule.intensity} />

                <p className="mt-2 text-xs text-gray-400">
                  {(capsule.servings || []).join(" · ")}
                </p>

                <span className="mt-3 block text-sm font-bold text-[#C9A24B]">
                  {formatTZS(capsule.price)} / sleeve
                </span>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() =>
                    addToCart({
                      id: capsule._id,
                      name: capsule.name,
                      price: capsule.price,
                      image: capsule.image,
                    })
                  }
                  className="mt-4 w-full rounded-full border border-[#C9A24B] py-2 text-sm font-semibold text-[#C9A24B] transition hover:bg-[#C9A24B] hover:text-[#15110D]"
                >
                  Add to Cart
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default NespressoCapsules;