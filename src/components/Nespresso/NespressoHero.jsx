import React from "react";
import { motion } from "framer-motion";

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

const NespressoHero = () => {
  return (
    <section className="relative flex h-[90vh] min-h-[560px] w-full items-center overflow-hidden bg-[#15110D] text-white">
      <motion.img
        src="https://images.unsplash.com/photo-1637029967725-b64c1a7449ff?auto=format&fit=crop&w=2200&q=80"
        alt="Espresso machine on a marble counter"
        className="absolute inset-0 h-full w-full object-cover"
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.7 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[#15110D] via-[#15110D]/70 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      />

      <motion.div
        className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-12"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={item}
          className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A24B]"
        >
          Nespresso
        </motion.p>

        <motion.h1
          variants={item}
          className="max-w-xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl"
        >
          Crafted for the ritual of coffee.
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-5 max-w-md text-base text-gray-200 sm:text-lg"
        >
          Discover machines engineered for precision and capsules sourced
          from the world's finest coffee farms.
        </motion.p>

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
    </section>
  );
};

export default NespressoHero;