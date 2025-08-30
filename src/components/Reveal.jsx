// import React, { useRef, useEffect } from "react";
// import { motion, useInView, useAnimation } from "framer-motion";

// const Reveal = ({ children, width = "fit-content", delay = 0 }) => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true });

//   const mainControls = useAnimation();
//   const slideControls = useAnimation();

//   useEffect(() => {
//     if (isInView) {
//       mainControls.start("visible");
//       slideControls.start("visible");
//     }
//   }, [isInView]);

//   return (
//     <div
//       ref={ref}
//       style={{
//         // position: "relative",
//         width,
//         overflow: "hidden",
//         display: "flex",
//         // justifyContent: "center",
//       }}
//     >
//       <motion.div
//         variants={{
//           hidden: { opacity: 0, y: 75 },
//           visible: { opacity: 1, y: 0 },
//         }}
//         initial="hidden"
//         animate={mainControls}
//         transition={{ duration: 0.5, delay }}
//         // style={{ position: "relative", display: "inline-block" }}
//       >
//         {children}
//         <motion.div
//           variants={{
//             hidden: { left: 0 },
//             visible: { left: "100%" },
//           }}
//           initial="hidden"
//           animate={slideControls}
//           transition={{ duration: 0.75, delay: delay , ease: "easeIn" }} // starts earlier
//           style={{
//             position: "absolute",
//             top: 0,
//             bottom: 0,
//             left: 0,
//             width: "100%",
//             background: "#000080",
//             zIndex: 20,
//           }}
//         />
//       </motion.div>
//     </div>
//   );
// };

// export default Reveal;


import React, { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

const Reveal = ({ children, width = "fit-content", delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const mainControls = useAnimation();
  const slideControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
      slideControls.start("visible");
    }
  }, [isInView]);

  return (
    <div
      ref={ref}
      style={{
        width,
        position: "relative", // required for absolute child
        overflow: "hidden",
        display: "inline-block", // so text size doesn’t collapse
      }}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 }, // smaller Y to avoid layout shift
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.6, delay }}
      >
        {children}
      </motion.div>

      <motion.div
        variants={{
          hidden: { left: 0 },
          visible: { left: "100%" },
        }}
        initial="hidden"
        animate={slideControls}
        transition={{ duration: 0.75, delay: delay + 0.1, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          width: "100%",
          background: "#000080",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

export default Reveal;
