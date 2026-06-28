import React from "react";
import { motion } from "framer-motion";
import ApartmentCard from "../../components/airbnb/ApartmentCard";

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

const ApartmentsSection = ({
  apartments = [],
  badge = "Holiday Home",
  heading = "Choose Your Perfect Stay",
  subheading = "Experience comfort and convenience in our beautiful house in Dar es Salaam. Whether you need a cozy room or the entire house, we have the perfect option for you.",
}) => {
  return (
    <section id="apartments" className="bg-[#F7F5F2] px-6 py-20 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-12 max-w-2xl"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.p
            variants={item}
            className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-blue-600"
          >
            {badge}
          </motion.p>
          <motion.h2 variants={item} className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {heading}
          </motion.h2>
          <motion.p variants={item} className="mt-4 text-gray-500">
            {subheading}
          </motion.p>
        </motion.div>

        {apartments.length === 0 ? (
          <p className="text-gray-500">No stays are linked to this page yet.</p>
        ) : (
          <motion.div
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {apartments.map((apartment) => (
              <ApartmentCard key={apartment._id} apartment={apartment} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ApartmentsSection;