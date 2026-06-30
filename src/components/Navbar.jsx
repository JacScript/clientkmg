


import React, { useState } from "react";
import { IoMdMenu, IoMdClose, IoMdCart } from "react-icons/io";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../assets/kmnew.png";
import { useCart } from "../context/CartContext";
import CartDrawer from "./CartDrawer";

const NavbarMenu = [
  { id: 6, title: "About Us", path: "/about-us" },
  { id: 1, title: "Travel And Tours", path: "/" },
  { id: 3, title: "Kiswahili", path: "/kiswahili" },
  { id: 5, title: "Holiday Home", path: "/holiday-home" },
  { id: 7, title: "Nespresso", path: "/nespresso" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const location = useLocation();
  const isNespressoPage = location.pathname.startsWith("/nespresso");
  const { totalCount } = useCart();

  const CartButton = () => (
    <button
      onClick={() => setIsCartOpen(true)}
      aria-label="Open cart"
      className="relative text-[#000080]"
    >
      <IoMdCart className="text-3xl" />
      {totalCount > 0 && (
        <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#C9A24B] text-xs font-bold text-white">
          {totalCount}
        </span>
      )}
    </button>
  );

  return (
    <nav className="z-20 text-white sticky h-[95%]">
      <div className="container mx-auto flex justify-between items-center px-4 py-2 h-full">
        {/* Logo — h-auto with w-auto so the image scales naturally at each
            breakpoint instead of being forced into a fixed box; shrink-0
            keeps it from getting squashed when the nav links + cart icon
            crowd the row on medium-width screens. */}
        <div className="flex justify-center items-center h-full">
          <NavLink to="/">
            <img
              src={Logo}
              className="h-12 w-auto shrink-0 object-contain sm:h-14 md:h-16 lg:h-20 xl:h-[110px]"
              alt="logo"
            />
          </NavLink>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-4">
          <ul className="flex items-center text-[#000080] font-bold gap-2">
            {NavbarMenu.map((menu) => (
              <li key={menu.id}>
                <NavLink
                  to={menu.path}
                  exact
                  className="inline-block py-2 relative px-3 group md:text-lg lg:text-sm xl:text-base"
                >
                  <span className="relative z-10">{menu.title}</span>
                  <div className="absolute left-1/2 w-0 h-0.5 bg-[#000080] transform -translate-x-1/2 group-hover:w-full transition-all duration-300 ease-in-out"></div>
                </NavLink>
              </li>
            ))}
          </ul>

          {isNespressoPage && <CartButton />}
        </div>

        {/* Mobile Cart + Hamburger */}
        <div className="flex items-center gap-4 lg:hidden">
          {isNespressoPage && <CartButton />}

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
                  className="py-2 px-3 flex items-center justify-center"
                  onClick={toggleMenu}
                >
                  {menu.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </nav>
  );
};

export default Navbar;