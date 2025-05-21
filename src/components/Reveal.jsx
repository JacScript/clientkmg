// import React, {useRef,useEffect} from "react";
// import { motion , useInView, useAnimation} from "framer-motion";

// const Reveal = ({ children, width = "fit-content", mainControlDuration }) => {
//     const ref = useRef(null);
//     const isInView = useInView(ref, {once: true});


//     const mainControls = useAnimation(); 
//     const slideControls = useAnimation(); 

//     useEffect(() => {
//        if(isInView){
//         //Fire the animation
//         mainControls.start("visible");
//         slideControls.start("visible");
//        }
//     },[isInView])

//   return (
//     <div ref={ref} style={{ 
//       position: "relative",
//        width, 
//        overflow: "hidden" ,
//       }}>
//       <motion.div
//         variants={{
//             hidden: { opacity: 0, y: 75 },
//             visible: { opacity: 1, y: 0 },
//         }}
//         initial="hidden"
//         animate={mainControls}
//         transition={{ duration: mainControlDuration, delay: 1}}
//       >{children}</motion.div>
//       <motion.div
//         variants={{
//             hidden: {left:0},
//             visible: {left: "100%"},
//         }}
//         initial="hidden"
//         animate={slideControls}
//         transition={{duration: 0.5,delay:0.2, ease: "easeIn"}}
//         style={{
//             position: "absolute",
//             top:0,
//             bottom:0,
//             left:0,
//             width: "100%", // Cover only text
//             right:0,
//             background: "#000080",
//             zIndex: 20,
//         }}
//       />
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
        position: "relative",
        width,
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.5, delay }}
        style={{ position: "relative", display: "inline-block" }}
      >
        {children}
        <motion.div
          variants={{
            hidden: { left: 0 },
            visible: { left: "100%" },
          }}
          initial="hidden"
          animate={slideControls}
          transition={{ duration: 0.75, delay: delay , ease: "easeIn" }} // starts earlier
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            width: "100%",
            background: "#000080",
            zIndex: 20,
          }}
        />
      </motion.div>
    </div>
  );
};

export default Reveal;
