// src/components/FloatingTextBox.jsx
import React from "react";
import { motion } from "framer-motion";

const FloatingTextBox = ({ number, text, delay = 0.6 }) => {
  const variants = {
    hidden: { opacity: 0, x: 30, y: 30 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { delay, duration: 0.8, ease: "easeIn" },
    },
  };

  return (
    <motion.div
      className="bg-white w-90 h-30 absolute -right-30 -bottom-10 opacity-100 flex items-center justify-center rounded-lg shadow"
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      <div className="h-[80%] w-[90%] border-2 border-[#000080] mx-auto rounded-lg flex justify-center items-center">
        <motion.h1
          className="text-[#000080] ml-9 mr-5 text-7xl font-extrabold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {number}
        </motion.h1>
        <motion.p
          className="text-2xl font-bold text-slate-600 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          {text}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default FloatingTextBox;
