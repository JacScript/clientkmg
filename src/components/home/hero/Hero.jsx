// import pic1 from "../../../assets/images/img1.jpg";
// import pic2 from "../../../assets/images/img2.jpg";
// import pic3 from "../../../assets/images/img3.jpg";
// import pic4 from "../../../assets/images/img4.jpg";
// import { useState, useEffect } from 'react';
// import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
// import Link from "../../LinkComponent";
// import Reveal from "../../Reveal";


// const data = [
//   { id: 1, image: pic4, title: "Slide 1", description: "Description for Slide 1" },
// ];

// export default function Hero() {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? data.length - 1 : prev - 1));
//   // const nextSlide = () => setCurrentIndex((prev) => (prev === data.length - 1 ? 0 : prev + 1));

//   // useEffect(() => {
//   //   const interval = setInterval(nextSlide, 5000);
//   //   return () => clearInterval(interval);
//   // }, []);

//   return (
//     <section className="relative w-full h-screen min-h-[600px] overflow-hidden group">
//       {/* Carousel Images */}
//       {/* <div
//         className="absolute inset-0 z-0 flex transition-transform duration-700 ease-out"
//         style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//       >
//         {data.map((slide, idx) => (
//           <div key={idx} className="flex-shrink-0 w-full h-full">
//             <img
//               src={slide.image}
//               alt={`Slide ${idx}`}
//               className="w-full h-full object-cover"
//             />
//           </div>
//         ))}
//       </div> */}
//       <div
//         className="absolute inset-0 z-0 flex transition-transform duration-700 ease-out"
//         style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//       >
//         {data.map((slide, idx) => (
//           <div key={idx} className="flex-shrink-0 w-full h-full">
//             <img
//               src={slide.image}
//               alt={`Slide ${idx}`}
//               className="w-full h-full object-cover"
//             />
//           </div>
//         ))}
//       </div>

//       {/* Gradient Overlay */}
//       <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60 z-10" />

//       {/* Hero Content */}
//       <div className="relative z-20 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
//         <div className="text-center max-w-4xl mx-auto flex flex-col items-center justify-center">
//           <Reveal delay={0.2}>
//             <h1 className="mt-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-8xl uppercase font-semibold font-roboto text-[#000080] leading-tight break-words">
//                from Tanzania to France 
//             </h1>
//           </Reveal>
//           <Reveal>
//             <p className="text-sm sm:text-base lg:text-lg font-bold text-gray-100 uppercase font-serif">
//               your personalized holiday from Tanzania to France organized by Kai’
//             </p>
//           </Reveal>
          
//           <div className="mt-6 sm:mt-8 flex justify-center">
//             <Link
//               href="#"
//               className="rounded-md hover:bg-[#000080] px-4 sm:px-6 py-2 sm:py-3 lg:py-4 text-sm sm:text-base lg:text-lg font-semibold text-white shadow-lg bg-transparent border-2 border-[#000080] transition ease-in duration-150 cursor-pointer"
//             >
//               Find out more
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Navigation Arrows */}
//       {/* <div className="absolute inset-0 z-30 hidden lg:flex items-center justify-between px-4">
//         <button
//           onClick={prevSlide}
//           className="text-white bg-[#00008094] hover:bg-[#000080] p-2 rounded-full transition-opacity opacity-0 group-hover:opacity-100"
//         >
//           <IoIosArrowBack size={30} />
//         </button>
//         <button
//           onClick={nextSlide}
//           className="text-white bg-[#00008094] hover:bg-[#000080] p-2 rounded-full transition-opacity opacity-0 group-hover:opacity-100"
//         >
//           <IoIosArrowForward size={30} />
//         </button>
//       </div> */}

//       {/* Mobile Dots */}
//       {/* <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 flex lg:hidden space-x-2">
//         {data.map((_, idx) => (
//           <button
//             key={idx}
//             onClick={() => setCurrentIndex(idx)}
//             className={`w-2 h-2 rounded-full transition-colors ${
//               idx === currentIndex ? 'bg-white' : 'bg-white/50'
//             }`}
//           />
//         ))}
//       </div> */}
//     </section>
//   );
// }


// import pic1 from "../../../assets/images/img1.jpg";
// import pic2 from "../../../assets/images/img2.jpg";
// import pic3 from "../../../assets/images/img3.jpg";
// import pic4 from "../../../assets/images/img4.jpg";
import { useState, useEffect } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import Link from "../../LinkComponent";
import Reveal from "../../Reveal";

const data = [
  { id: 1,
     image: "https://res.cloudinary.com/dwkivuqts/image/upload/v1750387303/img4_qxdha0.jpg", 
     title: "Slide 1", 
     description: "Description for Slide 1" },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden group">
      {/* Carousel Images */}
      <div
        className="absolute inset-0 z-0 flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {data.map((slide, idx) => (
          <div key={idx} className="flex-shrink-0 w-full h-full">
            <img
              src={slide.image}
              alt={`Slide ${idx}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60 z-10" />

     

      {/* Hero Content */}
      <div className="relative z-20 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto flex flex-col items-center justify-center">
           {/* Tour & Travel Badge */}
      <div className="z-30 left-4 sm:left-8 lg:left-12" style={{ top: '90%' }}>
        <div className="bg-orange-500 text-white px-4 py-2 rounded-lg shadow-lg transform -rotate-2 hover:rotate-0 transition-transform duration-300">
          <span className="text-sm sm:text-base lg:text-lg font-bold uppercase tracking-wide">
            Travel And Tour
          </span>
        </div>
      </div>
          <Reveal delay={0.2}>
            <h1 className="mt-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-8xl capitalize font-semibold font-roboto text-[#000080] leading-tight break-words">
               from Tanzania to France 
            </h1>
          </Reveal>
          <Reveal>
            <p className="text-sm sm:text-base lg:text-lg font-bold text-gray-100 capitalize font-serif">
              your personalized holiday from Tanzania to France organized by Kai'
            </p>
          </Reveal>
          
          <div className="mt-6 sm:mt-8 flex justify-center">
            <Link
              href="/about-us"
              className="rounded-md hover:bg-[#000080] px-4 sm:px-6 py-2 sm:py-3 lg:py-4 text-sm sm:text-base lg:text-lg font-semibold text-white shadow-lg bg-transparent border-2 border-[#000080] transition ease-in duration-150 cursor-pointer"
            >
              Find out more
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}