import React from "react";
import { motion } from "framer-motion";
import { useCart } from "../../context/CartContext";
import { formatTZS } from "../../utils/currency";

// Fallback content shown if no machines are linked on the backend yet.
const DEFAULT_MACHINES = [
  { _id: "machine-inissia", name: "Inissia", tagline: "Compact and effortless, the everyday espresso.", price: 550000, image: "https://images.unsplash.com/photo-1637029967725-b64c1a7449ff?auto=format&fit=crop&w=900&q=80" },
  { _id: "machine-essenza-mini", name: "Essenza Mini", tagline: "Nespresso's smallest machine, full-size flavor.", price: 550000, image: "https://images.unsplash.com/photo-1560885521-4e61e9bc1631?auto=format&fit=crop&w=900&q=80" },
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

const NespressoMachines = ({
  machines = DEFAULT_MACHINES,
  eyebrow = "Machines",
  heading = "Designed to fit your kitchen, built to fit your ritual.",
}) => {
  const { addToCart } = useCart();

  if (!machines.length) return null;

  return (
    <section id="machines" className="bg-[#1B1410] px-6 py-20 text-white lg:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-12 max-w-xl"
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
        </motion.div>

        <motion.div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {machines.map((machine) => (
            <motion.div
              key={machine._id}
              variants={item}
              whileHover={{ y: -6 }}
              className="group overflow-hidden rounded-2xl bg-[#241B14]"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={machine.image}
                  alt={machine.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold">{machine.name}</h3>
                <p className="mt-1 text-sm text-gray-400">{machine.tagline}</p>
                <div className="mt-5 flex items-center justify-between gap-3">
                  <span className="text-base font-bold text-[#C9A24B]">
                    {formatTZS(machine.price)}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() =>
                      addToCart({
                        id: machine._id,
                        name: machine.name,
                        price: machine.price,
                        image: machine.image,
                      })
                    }
                    className="shrink-0 rounded-full bg-[#C9A24B] px-5 py-2 text-sm font-semibold text-[#15110D] transition hover:bg-[#dab564]"
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default NespressoMachines;