import React, { useState } from "react";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { NavLink } from "react-router-dom";
import Logo from "../assets/logo3.png";

const NavbarMenu = [
  { id: 6, title: "About Us", path: "/about-us" },
  { id: 1, title: "Travel And Tours", path: "/" },
  { id: 2, title: "Logistics", path: "/logistics" },
  { id: 3, title: "Kiswahili", path: "/Kiswahili" },
  { id: 5, title: "Holiday Home", path: "/holiday-home" },
  // { id: 4, title: "Visa", path: "/visa" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="z-20  text-white sticky h-[95%]">
      <div className="container mx-auto flex justify-between items-center px-4 py-2 h-full">
        {/* Logo */}
        <div className="flex justify-center items-center h-full">
          <NavLink to="/">
            <img src={Logo} className="w-70 h-[106px]   object-contain" alt="logo" />
          </NavLink>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:block">
          <ul className="flex items-center text-[#000080]  font-bold gap-2">
            {NavbarMenu.map((menu) => (
              <li key={menu.id}>
                <NavLink
                  to={menu.path}
                  exact
                  className="inline-block py-2 relative px-3 group md:text-lg lg:text-sm xl:text-base "
                  // activeClassName="after:content-[''] after:absolute after:top-0 after:left-1/2 after:-translate-x-1/2 after:w-full after:h-0.5 after:bg-[#000080]"
                >
                  <span className="relative z-10">{menu.title}</span>
                  <div className="absolute left-1/2 w-0 h-0.5 bg-[#000080] transform -translate-x-1/2 group-hover:w-full transition-all duration-300 ease-in-out"></div>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden">
          {isMenuOpen ? (
            <IoMdClose className="text-4xl cursor-pointer text-[#000080]" onClick={toggleMenu} />
          ) : (
            <IoMdMenu className="text-4xl cursor-pointer text-[#000080]" onClick={toggleMenu} />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white text-[#000080] py-4 px-8">
          <ul className="flex flex-col gap-4 font-semibold">
            {NavbarMenu.map((menu) => (
              <li key={menu.id}>
                <NavLink
                  to={menu.path}
                  exact
                  activeClassName="underline text-[#000080]"
                  className=" py-2 px-3  flex items-center justify-center"
                  onClick={toggleMenu}
                >
                  {menu.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
