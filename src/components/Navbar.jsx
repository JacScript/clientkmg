// import React, { useState } from "react";
// import { IoMdMenu } from "react-icons/io";
// import { IoMdClose } from "react-icons/io";
// import Logo from "../assets/logo.png";

// const NavbarMenu = [
//   {
//     id: 1,
//     title: "Travel & Tours",
//     path: "#",
//   },
//   {
//     id: 2,
//     title: "Logistics",
//     link: "#",
//   },
//   {
//     id: 3,
//     title: "Linguistics",
//     link: "#",
//   },
//   {
//     id: 5,
//     title: "AirBnB",
//     link: "#",
//   },
//   {
//     id: 4,
//     title: "Gallery",
//     link: "#",
//     // path: "/gallery",
//   },
//   {
//     id: 6,
//     title: "Contact Us",
//     link: "#contact",
//   },
  
// ];

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <nav className="z-20 text-white sticky">
//       <div
//         // initial={{ opacity: 0, y: -90 }}
//         // animate={{ opacity: 1, y: 0 }}
//         className="container flex justify-between items-center"
//       >
//         {/* Logo section */}
//         <div
//         className="flex justify-center items-center">
//             <a href="#">

//           <img src={Logo} className="w-60 h-23 object-cover" alt="logo" />
//             </a>
//         </div>
//         {/* Desktop Menu */}
//         <div className="hidden lg:block">
//         <ul className="flex items-center text-[#000080] font-bold gap-3">
//   {NavbarMenu.map((menu) => (
//     <li key={menu.id}>
//       <a
//         href={menu.path || menu.link}
//         className="inline-block py-2 relative px-3 group rounded-lg overflow-hidden"
//       >
//         {/* Text content with z-index */}
//         <span className="relative z-10">{menu.title}</span>
        
//         {/* Animated border that stretches from center */}
//         <div
//           className="
//             absolute 
//             left-1/2
//             w-0
//             h-0.5
//             bg-[#000080]
//             transform
//             -translate-x-1/2
//             group-hover:w-full
//             transition-all
//             duration-300
//             ease-in-out
//           "
//         ></div>
        
        
//       </a>
//     </li>
//   ))}
// </ul>
  
//         </div>
//         {/* Mobile Hamburger menu */}
//         <div className="lg:hidden">
//           {isMenuOpen ? (
//             <IoMdClose className="text-4xl cursor-pointer" onClick={toggleMenu} />
//           ) : (
//             <IoMdMenu className="text-4xl cursor-pointer" onClick={toggleMenu} />
//           )}
//         </div>
//       </div>
//       {/* Mobile Menu */}
//       {isMenuOpen && (
//         <div className="lg:hidden bg-black text-white py-4 px-8">
//           <ul className="flex flex-col gap-4">
//             {NavbarMenu.map((menu) => (
//               <li key={menu.id}>
//                 <a
//                   href={menu.path || menu.link}
//                   className="block py-2 px-3 hover:text-secondary"
//                   onClick={toggleMenu} // Close menu on link click
//                 >
//                   {menu.title}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;




import React, { useState } from "react";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { NavLink } from "react-router-dom";
import Logo from "../assets/logo.png";

const NavbarMenu = [
  { id: 1, title: "Travel & Tours", path: "/" },
  { id: 2, title: "Logistics", path: "/logistics" },
  { id: 3, title: "Linguistics", path: "/linguistics" },
  { id: 4, title: "Gallery", path: "/gallery" },
  { id: 5, title: "AirBnB", path: "/airbnb" },
  { id: 6, title: "Contact Us", path: "/contact" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="z-20 text-white sticky">
      <div className="container mx-auto flex justify-between items-center px-4 py-2">
        {/* Logo */}
        <div className="flex justify-center items-center">
          <NavLink to="/">
            <img src={Logo} className="w-60 h-23 object-cover" alt="logo" />
          </NavLink>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:block">
          <ul className="flex items-center text-[#000080] font-bold gap-6">
            {NavbarMenu.map((menu) => (
              <li key={menu.id}>
                <NavLink
                  to={menu.path}
                  exact
                  className="inline-block py-2 relative px-3 group"
                  activeClassName="after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-full after:h-0.5 after:bg-[#000080]"
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
                  className="block py-2 px-3"
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
