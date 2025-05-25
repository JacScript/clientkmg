// import { motion } from "framer-motion";
// import pic from '../../../assets/images/img2.jpg';
// import Reveal from "../../Reveal";
// import React from 'react';
// import { BsPatchCheckFill } from "react-icons/bs";

// const About = () => {
//   const infos = [
//     {
//       id: 1,
//       title: "Safety first always",
//       description: "Prioritizing your safety every step of the journey.",
//       icon: <BsPatchCheckFill />
//     },
//     {
//       id: 2,
//       title: "Low price & friendly",
//       description: "Offering low prices and friendly service for all your travel needs.",
//       icon: <BsPatchCheckFill />
//     },
//     {
//       id: 3,
//       title: "Trusted travel & tour guide",
//       description: "Your trusted travel & tour guide for unforgettable journeys.",
//       icon: <BsPatchCheckFill />
//     }
//   ];

//   // Animation variants
//   const imageVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeIn" } }
//   };

//   const floatingImageVariants = {
//     hidden: { opacity: 0, x: -30, y: 30 },
//     visible: {
//       opacity: 1,
//       x: 0,
//       y: 0,
//       transition: { delay: 0.3, duration: 1.2, ease: "easeIn" }
//     },
//     hover: {
//       scale: 1.05,
//       transition: { duration: 0.3 }
//     }
//   };

//   const floatingTextVariants = {
//     hidden: { opacity: 0, x: 30, y: 30 },
//     visible: {
//       opacity: 1,
//       x: 0,
//       y: 0,
//       transition: { delay: 0.6, duration: 0.8, ease: "easeIn" }
//     }
//   };

//   return (
//     <div className='h-[700px] max-w-screen bg-blue-100 py-10'>
//       <h1 className='text-5xl text-[#000080] font-extrabold text-center mb-12'>About Us</h1>
//       <div className='w-3/4 h-full flex items-center justify-center mx-auto'>

//         {/* LEFT IMAGE SIDE */}
//         <div className='w-1/2 h-full relative mx-8'>
//           <div className='w-[100%] relative'>

//             {/* Main Image */}
//             <motion.img
//               src={pic}
//               alt="About Us"
//               className='w-full h-full object-cover rounded-lg shadow-lg'
//               variants={imageVariants}
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true, amount: 0.5 }}
//             />

//             {/* Floating Image */}
//             <motion.div
//               className='absolute -left-20 -bottom-20 w-60 h-60 opacity-100'
//               variants={floatingImageVariants}
//               initial="hidden"
//               whileInView="visible"
//               whileHover="hover"
//               viewport={{ once: true, amount: 0.5 }}
//             >
//               <img
//                 src={pic}
//                 alt="About Us decoration"
//                 className='w-full h-full object-cover rounded-lg shadow-lg'
//               />
//             </motion.div>

//             {/* Floating Text Box */}
//             <motion.div
//               className='bg-white w-90 h-30 absolute -right-30 -bottom-10 opacity-100 flex items-center justify-center rounded-lg shadow'
//               variants={floatingTextVariants}
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true, amount: 0.5 }}
//             >
//               <div className='h-[80%] w-[90%] border-2 border-[#000080] mx-auto rounded-lg flex justify-center items-center'>
//                 <Reveal delay={0.4}>
//                   <h1 className='text-[#000080] ml-9 mr-10 text-7xl font-extrabold'>10+</h1>
//                 </Reveal>
//                 <Reveal delay={0.6}>
//                   <p className='text-2xl font-bold text-slate-600 z-40'>Years of experience</p>
//                 </Reveal>
//               </div>
//             </motion.div>
//           </div>
//         </div>

//         {/* RIGHT TEXT SIDE */}
//         <div className='w-1/2 h-full'>
//           <div className="px-6">
//             <h2 className="text-4xl font-bold text-[#000080]">Great opportunity for tour & travels</h2>
//             <ul className="mt-4 space-y-4 pl-4">
//               {infos.map((info, idx) => (
//                 <li key={idx} className="flex items-center mb-8 py-2">
//                   <span className="mx-6"><BsPatchCheckFill className="text-[#000080]" size={30} /></span>
//                   <div>
//                     <Reveal delay={0.4}>
//                       <p className="font-bold text-2xl">{info.title}</p>
//                     </Reveal>
//                     <Reveal delay={0.6}>
//                       <p className="text-lg text-slate-700">{info.description}</p>
//                     </Reveal>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default About;

import { BsPatchCheckFill } from "react-icons/bs";
import React from "react";
import pic from "../../../assets/images/img2.jpg";
import Reveal from "../../Reveal";
import FadeInImage from "../../FadeInImage";
import FloatingTextBox from "../../FloatingTextBox";

const About = () => {
  const infos = [
    {
      id: 1,
      title: "Safety first always",
      description: "Prioritizing your safety every step of the journey.",
    },
    {
      id: 2,
      title: "Low price & friendly",
      description:
        "Offering low prices and friendly service for all your travel needs.",
    },
    {
      id: 3,
      title: "Trusted travel & tour guide",
      description:
        "Your trusted travel & tour guide for unforgettable journeys.",
    },
  ];

  return (
    <div className="h-[700px] max-w-screen bg-blue-100 py-10">
      <Reveal>
        <h1 className="text-5xl text-[#000080] font-extrabold text-center mb-12">
          About Us
        </h1>
      </Reveal>
      <div className="w-3/4 h-full flex items-center justify-center mx-auto">
        {/* LEFT IMAGE SIDE */}
        <div className="w-1/2 h-full relative mx-8">
          <div className="w-[100%] relative">
            {/* Main Image */}
            <FadeInImage
              src={pic}
              alt="About Us"
              className="w-full h-full object-cover"
              delay={0.1}
              direction="up"
            />

            {/* Floating Image */}
            <div className="absolute -left-20 -bottom-20 w-60 h-60 opacity-100">
              <FadeInImage
                src={pic}
                alt="Floating Decoration"
                className="w-full h-full object-cover hover:scale-[1.05] transition-transform duration-300"
                delay={0.3}
                direction="left"
              />
            </div>

            {/* Floating Text Box */}
            <FloatingTextBox number="10+" text="Years of experience" />
          </div>
        </div>

        {/* RIGHT TEXT SIDE */}
        <div className="w-1/2 h-full">
          <div className="px-6">
            <h2 className="text-4xl font-bold text-[#000080]">
              Great opportunity for tour & travels
            </h2>
            <ul className="mt-4 space-y-4 pl-4">
              {infos.map((info, idx) => (
                <li key={idx} className="flex items-center mb-8 py-2">
                  <span className="mx-6">
                    <BsPatchCheckFill className="text-[#000080]" size={30} />
                  </span>
                  <div>
                    <Reveal delay={0.4}>
                      <p className="font-bold text-2xl">{info.title}</p>
                    </Reveal>
                    <Reveal delay={0.6}>
                      <p className="text-lg text-slate-700">
                        {info.description}
                      </p>
                    </Reveal>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
