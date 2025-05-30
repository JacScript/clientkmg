import React from 'react';
import { motion } from 'framer-motion';
import pic1 from '../../../assets/images/img12.jpg';
import Reveal from '../../Reveal';
import { GiModernCity, GiWineBottle } from "react-icons/gi";
import { MdOutlineMuseum } from "react-icons/md";
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
      icon: <GiModernCity className="text-4xl sm:text-5xl md:text-6xl" />,
      text: "City Visiting",
    },
    {
      icon: <MdOutlineMuseum className="text-4xl sm:text-5xl md:text-6xl" />,
      text: "Museum Tours",
    },
    {
      icon: <GiWineBottle className="text-4xl sm:text-5xl md:text-6xl" />,
      text: "Champagne Tasting",
      className: "md:col-start-2",
    }
  ];

  return (
    <section
      className="w-full min-h-screen bg-cover bg-center bg-no-repeat bg-fixed relative flex items-center text-serif justify-center text-white px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${pic1})`,
      }}
    >
      <div className="max-w-7xl w-full flex flex-col lg:flex-row justify-between items-center gap-12 py-12 lg:py-0">
        
        {/* Left text content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
          <Reveal delay={0.5}>
            <p className="text-lg  sm:text-xl md:text-4xl font-medium leading-relaxed">
              Explore the charming streets and museums of France. Whether you're chasing history or adventure, we've got you covered. Let's make memories together!
            </p>
          </Reveal>
          <div className="flex justify-center lg:justify-start">
            <Link 
              href="#"
              className="px-6 py-3 border-2 border-[#000080] rounded-lg shadow-lg text-base sm:text-lg font-bold text-white bg-[#000080] hover:bg-[#000080d2] transition-all duration-500"
              title="Contact Us"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Icon Grid */}
        <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {data.map((item, idx) => (
            <motion.div
              key={idx}
              initial="initial"
              whileInView="animate"
              whileHover="hover"
              viewport={{ once: true }}
              variants={iconVariants}
              className={`relative overflow-hidden rounded-lg border-2 border-white py-8 px-4 flex flex-col items-center text-center transition-colors duration-300 cursor-pointer bg-white/10 hover:bg-white/20 ${item.className || ''}`}
            >
              {/* Hover overlay */}
              <motion.div
                variants={{
                  hover: { y: 0, opacity: 1 },
                  initial: { y: "100%", opacity: 0 },
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute inset-0 bg-[#000080] z-0"
              />

              {/* Icon + Text */}
              <div className="relative z-10 flex flex-col items-center justify-center text-white lg:w-40 lg:h-40">
                {item.icon}
                <motion.p
                  className="mt-3 text-base sm:text-lg md:text-xl font-semibold text-white"
                  variants={textVariants}
                >
                  {item.text}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SmallTalk;
