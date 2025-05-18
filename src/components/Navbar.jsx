import { Facebook, Instagram, Mail, MapPin, Twitter } from "lucide-react";
import { FaXTwitter,FaWhatsapp } from "react-icons/fa6";
import React from "react";

const Navbar = () => {
  return (
    <div className="max-w-screen h-40">
      {/* Top of the nav bar */}
      <div className="w-full h-15 flex items-center">
        <div className="w-3/4 mx-auto bg-blue-400 h-full px-6 flex items-center justify-between">
          {/* left side of the top of the nav bar*/}
          <div className="flex text-white items-center">
            <div className="flex mr-2 items-center">
              <MapPin className="mr-2" size={18} />
              <h1>MailiMoja, 320 Ali hassan Road</h1>
            </div>
            <div className="flex ml-4 items-center">
              <Mail className="mr-2" size={18} />
              <a
                href="mailto:jacksonsylas59@gmail.com"
                className="cursor-pointer"
              >
                jacksonsylas59@gmail.com
              </a>
            </div>
          </div>

          {/* Right side of the top of the nav bar */}
          <div className="flex text-white items-center justify-center gap-4">
            <a href="#" className="cursor-pointer">
              <h1>Book Now</h1>
            </a>
            <div className="flex gap-2 text-white ">
              <Facebook className="" size={18} />
              <Instagram className="" size={18} />
              <FaXTwitter />
              <FaWhatsapp />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-25 bg-red-700">NavBAr2</div>
    </div>
  );
};

export default Navbar;
