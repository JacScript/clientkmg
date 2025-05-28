import React from 'react';
import { motion } from 'framer-motion';
import pic1 from '../../../assets/images/img12.jpg';
import Reveal from '../../Reveal';
import { GiModernCity } from "react-icons/gi";
import { MdOutlineMuseum } from "react-icons/md";
import { GiWineBottle } from "react-icons/gi";
import { TbBeach } from "react-icons/tb";
import Link from '../../LinkComponent';

const iconVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  hover: { backgroundColor: "#000080", transition: { duration: 0.4 } },
};

const textVariants = {
  hover: { color: "#ffffff" },
};

const SmallTalk = () => {
  const data = [
    {
      icon: <GiModernCity size={80} />,
      text: "City Visiting",
    },
    {
      icon: <MdOutlineMuseum size={80} />,
      text: "Museum Tours",
    },
    {
      icon: <GiWineBottle size={80} />,
      text: "Champagne Tasting",
      className: "md:col-start-2",
    }
  ];

  return (
    <div
      className="w-full h-dvh md:h-[700px] bg-cover bg-center bg-no-repeat bg-fixed relative flex items-center justify-center text-white"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${pic1})`,
      }}
    >
      <div className="w-full lg:w-3/4 h-full flex flex-col lg:flex-row justify-between items-center">
        {/* Left text content */}
        <div className=" text-2xl font-bold font-serif  lg:w-1/2 h-full flex flex-col mt-2 lg:mt-70 lg:mr-12 max-lg:px-12">
          <Reveal delay={0.5}>
            <p className="flex justify-center mb-2">
              Explore the charming streets and museums of France. Whether you're chasing history or adventure, we've got you covered. Let's make memories together!
            </p>
          </Reveal>
          <div>
            <Link 
              href="#"
              className="px-[20px] py-[10px] border-2 border-[#000080] rounded-lg shadow-lg text-[20px] font-extrabold text-white bg-[#000080] hover:bg-[#000080d2] transition-all ease-in-out duration-500"
              title="Contact Us"
            />
          </div>
        </div>

        {/* Animated icons */}
        <div className="w-full max-lg:pb-5 lg:w-1/2 grid grid-cols-1 max-md:px-12 max-md:space-y-4 max-md:mt-8 md:grid-cols-2 gap-2 lg:gap-6">
          {data.map((item, idx) => (
            <motion.div
              key={idx}
              initial="initial"
              whileInView="animate"
              whileHover="hover"
              viewport={{ once: true }}
              variants={iconVariants}
              className={`relative overflow-hidden rounded-lg border-2 py-10 px-6 flex flex-col items-center text-center transition-colors duration-300 cursor-pointer ${item.className || ''}`}
            >
              {/* Background hover fill */}
              <motion.div
                variants={{
                  hover: { y: 0, opacity: 1 },
                  initial: { y: "100%", opacity: 0 },
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute inset-0 bg-[#000080] z-0"
              />

              {/* Icon and Text */}
              <div className="relative z-10 flex justify-center items-center flex-col h-full">
                {item.icon}
                <motion.p
                  className="mt-2 font-semibold text-[#000080] text-serif"
                  variants={textVariants}
                >
                  {item.text}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SmallTalk;
