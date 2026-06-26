import React from "react";
import { motion } from "framer-motion";
import { useCart } from "../../context/CartContext";
import { formatTZS } from "../../utils/currency";

// import ristrettoImg from "../../assets/capsules/ristretto.png";
// import vollutoImg from "../../assets/capsules/volluto.png";
// import kazaarImg from "../../assets/capsules/kazaar.png";
// import napoliImg from "../../assets/capsules/napoli.png";
// import capriccioImg from "../../assets/capsules/capriccio.png";
// import stockholmLungoImg from "../../assets/capsules/stockholm-lungo.png";
// import indiaImg from "../../assets/capsules/india.png";
// import hawaiiKonaImg from "../../assets/capsules/hawaii-kona.png";

const capsuleBowlImage =
  "https://images.unsplash.com/photo-1514212586585-6a0e1838e7bf?auto=format&fit=crop&w=1200&q=80";

const MAX_INTENSITY = 13;

// Flavors, intensities, serving sizes, and retail prices (TZS) per KM Group's
// NESPRESSO Café Catalog and Price List, 13 May 2026.
const flavors = [
  {
    id: "capsule-ristretto",
    name: "Ristretto",
    intensity: 10,
    servings: ["Ristretto (25ml)", "Espresso (40ml)"],
    image: capsuleBowlImage,
    price: 38000,
  },
  {
    id: "capsule-volluto",
    name: "Volluto",
    intensity: 4,
    servings: ["Espresso (40ml)"],
    image: capsuleBowlImage,
    price: 38000,
  },
  {
    id: "capsule-kazaar",
    name: "Kazaar",
    intensity: 12,
    servings: ["Ristretto (25ml)", "Espresso (40ml)"],
    image: capsuleBowlImage,
    price: 38000,
  },
  {
    id: "capsule-napoli",
    name: "Napoli",
    intensity: 13,
    servings: ["Ristretto (25ml)", "Espresso (40ml)"],
    image: capsuleBowlImage,
    price: 38000,
  },
  {
    id: "capsule-capriccio",
    name: "Capriccio",
    intensity: 5,
    servings: ["Espresso (40ml)"],
    image: capsuleBowlImage,
    price: 38000,
  },
  {
    id: "capsule-stockholm-lungo",
    name: "Stockholm Lungo",
    intensity: 8,
    servings: ["Lungo (110ml)"],
    image: capsuleBowlImage,
    price: 45000,
  },
  {
    id: "capsule-india",
    name: "India",
    intensity: 11,
    servings: ["Espresso (40ml)", "Lungo (110ml)"],
    image: capsuleBowlImage,
    price: 45000,
  },
  {
    id: "capsule-hawaii-kona",
    name: "Hawaii Kona",
    intensity: 5,
    servings: ["Espresso (40ml)"],
    image: capsuleBowlImage,
    price: 45000,
  },
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

const NespressoCapsules = () => {
  const { addToCart } = useCart();

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
              Capsules
            </motion.p>
            <motion.h2 variants={item} className="text-3xl font-bold sm:text-4xl">
              A world of coffee, one capsule at a time.
            </motion.h2>
            <motion.p variants={item} className="mt-4 max-w-md text-gray-400">
              From bold Ristretto to delicate Hawaii Kona, each blend is
              roasted and sealed at peak freshness, capturing the aroma of
              single-origin farms in every cup.
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
          {flavors.map((flavor) => (
            <motion.div
              key={flavor.id}
              variants={item}
              whileHover={{ y: -6 }}
              className="flex flex-col items-center rounded-2xl bg-[#1B1410] p-6 text-center"
            >
              <div className="mb-4 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-[#F5EFE6]">
                <img
                  src={flavor.image}
                  alt={`${flavor.name} capsule`}
                  className="h-16 w-16 object-contain"
                />
              </div>

              <h3 className="font-semibold">{flavor.name}</h3>

              <IntensityBars intensity={flavor.intensity} />

              <p className="mt-2 text-xs text-gray-400">
                {flavor.servings.join(" · ")}
              </p>

              <span className="mt-3 text-sm font-bold text-[#C9A24B]">
                {formatTZS(flavor.price)} / sleeve
              </span>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                onClick={() =>
                  addToCart({
                    id: flavor.id,
                    name: flavor.name,
                    price: flavor.price,
                    image: flavor.image,
                  })
                }
                className="mt-4 w-full rounded-full border border-[#C9A24B] py-2 text-sm font-semibold text-[#C9A24B] transition hover:bg-[#C9A24B] hover:text-[#15110D]"
              >
                Add to Cart
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default NespressoCapsules;