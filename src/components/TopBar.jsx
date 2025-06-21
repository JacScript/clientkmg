import { FaXTwitter, FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa6";
import { MdLocationOn } from "react-icons/md";
import { CiMail } from "react-icons/ci";
import React, { useState, useEffect } from "react";
import IconComponent from "./IconComponent";
import DotGrid from "./DotGrid";
import logo from "../assets/logo.png";
import Navbar from "./Navbar";

const TopBar = () => {
  // Define your locations
  const locations = [
    "14 Nakwambela Street, Bahari Beach, Dar Es Salaam, Tanzania",
    "74 Rue Du Marechal Foch, 76350 Oissel, France" // Add your second location here
  ];

  const [currentLocationIndex, setCurrentLocationIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // Start flip animation
      setIsFlipping(true);
      
      setTimeout(() => {
        // Change location at the middle of the flip
        setCurrentLocationIndex((prevIndex) => 
          prevIndex === locations.length - 1 ? 0 : prevIndex + 1
        );
      }, 300); // Wait 300ms (half of flip duration) to change content
      
      setTimeout(() => {
        // End flip animation
        setIsFlipping(false);
      }, 600); // Complete flip takes 600ms
      
    }, 10000); // Change location every 10 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [locations.length]);

  return (
    <header className="w-full h-40 fixed top-0 left-0 right-0 z-90 bg-white">
      {/* Top of the nav bar */}
      <div className="w-full h-1/3 bg-blue-400 ">
        {/* Dot grid background */}
        <div className="absolute w-full h-full">
          <DotGrid />
        </div>
        <div className="lg:w-full xl:w-3/4 mx-auto opacity-100 h-full px-6 flex items-center justify-end md:justify-between">
          {/* left side of the top of the nav bar*/}
          <div className="hidden md:flex text-white items-center">
            <div className="mr-2 items-center hidden lg:flex">
              <MdLocationOn className="mr-2" size={18} />
              {/* Dynamic Location with flip transition */}
              <h1 
                className={`transition-transform duration-600 ease-in-out transform-gpu ${
                  isFlipping ? 'rotate-y-180' : 'rotate-y-0'
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                  transform: isFlipping ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  transition: 'transform 0.6s ease-in-out'
                }}
              >
                {locations[currentLocationIndex]}
              </h1>
            </div>
            <div className="flex ml-4 items-center">
              <CiMail className="mr-2" size={18} />
              <a
                href="mailto:jacksonsylas59@gmail.com"
                className="cursor-pointer"
              >
                kai@kaimaembe.com
              </a>
            </div>
          </div>

          {/* Right side of the top of the nav bar */}
          <div className="flex text-white items-center justify-center gap-4 z-40 ">
            <a
              href="#"
              className="cursor-pointer hover:text-[#000080] transition-colors duration-300 ease-in-out px-2 py-1 lg:px-4 lg:py-2 rounded-lg flex items-center"
            >
              <a 
  href="https://wa.me/33771948786?text=Good day, I am interested in booking travel arrangements and would like to inquire about your available tour packages." 
  target="_blank" 
  rel="noopener noreferrer"
  className="text-medium lg:text-base cursor-pointer transition-colors duration-300 ease-in-out"
>
  Book Now
</a>
              {/* <p className="text-medium lg:text-base cursor-pointer transition-colors duration-300 ease-in-out">
                Book Now
              </p> */}
            </a>

            <div className="flex space-x-4 text-white ">
              <IconComponent href="#" icon={FaWhatsapp}/>
              <IconComponent href="#" icon={FaXTwitter}/>
              <IconComponent href="#" icon={FaInstagram}/>
              <IconComponent href="#" icon={FaFacebook}/>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-2/3">
        <div className="lg-w-full xl:w-3/4 lg:mx-auto h-full lg:px-6">
          <Navbar/>
        </div>
        <nav></nav> 
      </div>
    </header>
  );
};

export default TopBar;