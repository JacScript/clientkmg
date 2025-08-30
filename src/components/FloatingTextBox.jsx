// src/components/FloatingTextBox.jsx
// import React from "react";
// import { motion } from "framer-motion";

// const FloatingTextBox = ({ number, text, delay = 0.6 }) => {
//   const variants = {
//     hidden: { opacity: 0, x: 30, y: 30 },
//     visible: {
//       opacity: 1,
//       x: 0,
//       y: 0,
//       transition: { delay, duration: 0.8, ease: "easeIn" },
//     },
//   };

//   return (
//     <motion.div
//       className="bg-white w-60 h-15 md:w-90 md:h-30 absolute -right-5 md:-right-20 bottom-16 opacity-100 flex items-center justify-center rounded-lg shadow"
//       variants={variants}
//       initial="hidden"
//       whileInView="visible"
//       viewport={{ once: true, amount: 0.5 }}
//     >
//       <div className="h-[80%] w-[90%] border-2 border-[#000080] mx-auto rounded-lg flex justify-center items-center max-md:py-2">
//         <motion.h1
//           className="text-[#000080] ml-9 mr-5 text-2xl md:text-7xl font-extrabold"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.7 }}
//         >
//           {number}
//         </motion.h1>
//         <motion.p
//           className="text-sm md:text-2xl font-bold text-slate-600 z-40"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.9 }}
//         >
//           {text}
//         </motion.p>
//       </div>
//     </motion.div>
//   );
// };

// export default FloatingTextBox;


// import React from "react";
// import { motion } from "framer-motion";

// const FloatingTextBox = ({ number, text, delay = 0.6 }) => {
//   const variants = {
//     hidden: { opacity: 0, x: 30, y: 30 },
//     visible: {
//       opacity: 1,
//       x: 0,
//       y: 0,
//       transition: { delay, duration: 0.8, ease: "easeInOut" },
//     },
//   };

//   return (
//     <motion.div
//       className="absolute right-2 bottom-4 sm:right-6 sm:bottom-6 md:-right-16 md:bottom-12 bg-white rounded-xl shadow-lg w-52 h-20 sm:w-60 sm:h-24 flex items-center justify-center"
//       variants={variants}
//       initial="hidden"
//       whileInView="visible"
//       viewport={{ once: true, amount: 0.4 }}
//     >
//       <div className="flex items-center gap-4 px-4 py-2 border-2 border-[#000080] rounded-lg w-full h-full">
//         <motion.h1
//           className="text-2xl sm:text-4xl text-[#000080] font-extrabold"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.7 }}
//         >
//           {number}
//         </motion.h1>
//         <motion.p
//           className="text-sm sm:text-lg font-semibold text-slate-600"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.9 }}
//         >
//           {text}
//         </motion.p>
//       </div>
//     </motion.div>
//   );
// };

// export default FloatingTextBox;

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
      className="absolute 
        -right-2 bottom-12 
        sm:-right-4 sm:bottom-14 
        md:-right-6 md:bottom-16 
        lg:-right-12 lg:bottom-10 
        xl:-right-16 xl:bottom-5
        bg-white 
        w-32 h-12 
        sm:w-36 sm:h-14 
        md:w-44 md:h-16 
        lg:w-60 lg:h-20 
        xl:w-72 xl:h-32
        flex items-center justify-center 
        rounded-lg shadow-lg 
        opacity-100 z-10"
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      <div className="h-[85%] w-[92%] border-2 border-[#000080] rounded-lg flex justify-center items-center px-2 sm:px-3 md:px-4">
        <motion.h1
          className="text-[#000080] 
            text-lg font-extrabold mr-2
            sm:text-xl sm:mr-3
            md:text-2xl md:mr-4
            lg:text-4xl lg:mr-5
            xl:text-5xl xl:mr-6
            flex-shrink-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {number}
        </motion.h1>
        <motion.p
          className="text-slate-600 font-bold leading-tight
            text-xs
            sm:text-sm
            md:text-base
            lg:text-lg
            xl:text-xl
            flex-1 text-center"
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