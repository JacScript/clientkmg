// import React from 'react'

// const Link = ({href="#", className="bg-[#000080] text-white", title="Button"}) => {
//   return (
//     // <div className='px-20 py-10 border-2 border-[#000080] bg-white rounded-lg shadow-lg'>
//       <a href={href} className={className} >
//         {title}
//       </a>
//     // </div>
//   )
// }

// export default Link


// import React from 'react';
// import { motion } from 'framer-motion';

// const Link = ({
//   href = "#",
//   className = "bg-[#000080] text-white px-6 py-3 rounded-md",
//   title = "Button"
// }) => {
//   return (
//     <motion.a
//       href={href}
//       className={className}
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, ease: 'easeOut' }}
//       whileHover={{
//         scale: 1.05,
//         boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)"
//       }}
//     >
//       {title}
//     </motion.a>
//   );
// };

// export default Link;


// import React from 'react';
// import { motion } from 'framer-motion';

// const Link = ({
//   href = "#",
//   className = "bg-[#000080] text-white px-6 py-3 rounded-md",
//   title = "Button"
// }) => {
//   return (
//     <motion.a
//       href={href}
//       className={className}
//       initial={{ opacity: 0, y: 40 }}       // Start hidden & below
//       whileInView={{ opacity: 1, y: 0 }}    // Animate into view
//       viewport={{ once: true }}             // Only animate once when in view
//       transition={{ duration: 1, ease: 'easeOut' }}
//       whileHover={{
//         scale: 1.05,
//         boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)"
//       }}
//     >
//       {title}
//     </motion.a>
//   );
// };

// export default Link;


{/* <div className="mt-8 flex justify-center">
            <a
              href="#"
              className="rounded-md bg-[#000080] px-5 py-3 text-sm font-semibold text-white shadow-lg hover:bg-indigo-500 transition"
            >
              Get Started
            </a>
          </div> */}


import React from 'react';
import { motion } from 'framer-motion';

const Link = ({
  href = "#",
  className = "bg-[#000080] text-white px-6 py-3 rounded-md",
  title = "",
  children = "Click Here", // fallback text
}) => {
  return (
    <motion.a
      href={href}
      title={title}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: 'easeOut' }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
      }}
    >
      {children}
    </motion.a>
  );
};

export default Link;
