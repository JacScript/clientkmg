import { FaXTwitter,FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa6";
import { MdLocationOn } from "react-icons/md";
import { CiMail } from "react-icons/ci";
import React from "react";
import IconComponent from "./IconComponent";
import DotGrid from "./DotGrid";
import  logo from "../assets/logo.png";
import Navbar from "./Navbar";

const TopBar = () => {
  return (
    <header className="w-full h-40 fixed top-0 left-0 right-0 z-90 bg-white">
      {/* Top of the nav bar */}
      <div className="w-full h-1/3 bg-blue-400 ">
        {/* Dot grid background */}
        <div className="absolute w-full h-full">
          <DotGrid />
        </div>
        <div className="lg:w-full xl:w-3/4 mx-auto opacity-100 h-full px-6 flex items-center   justify-end md:justify-between">
          {/* left side of the top of the nav bar*/}
          <div className="hidden md:flex text-white items-center">
            <div className="mr-2 items-center hidden lg:flex">
              <MdLocationOn className="mr-2" size={18} />
              <h1>14 Nakwamba Street, Bahari Beach, Dar Es Salaam</h1>
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
            {/* <a href="#" className="cursor-pointer hover:text-[#000080] transition-colors  px-2 py-1 lg:px-4 lg:py-2 rounded-lg flex items-center">
              <p className="text-medium lg:text-base cursor-pointer">Book Now</p>
            </a> */}
            <a
  href="#"
  className="cursor-pointer hover:text-[#000080] transition-colors duration-300 ease-in-out px-2 py-1 lg:px-4 lg:py-2 rounded-lg flex items-center"
>
  <p className="text-medium lg:text-base cursor-pointer transition-colors duration-300 ease-in-out">
    Book Now
  </p>
</a>

            <div className="flex  space-x-4 text-white ">
                <IconComponent href="#" icon={FaWhatsapp}/>
                <IconComponent href="#" icon={FaXTwitter}/>
                <IconComponent href="#" icon={FaInstagram}/>
                <IconComponent href="#" icon={FaFacebook}/>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-2/3  ">
        <div className="lg-w-full xl:w-3/4 lg:mx-auto h-full lg:px-6">
        <Navbar/>
              {/* <div> 
                <a href="#" className="w-full"> 
                  <img src={logo} alt="Logo" className="h-23 cursor-pointer object-cover w-60" />
                </a>
              </div> */}
        </div>
       <nav></nav> 
      </div>
    </header>
  );
};

export default TopBar;
