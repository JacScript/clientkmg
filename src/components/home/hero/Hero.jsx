// import React from 'react'
// import Carousel from '../../Carousel';
// import IntroText from '../IntroText';
// import SendRequestForm from '../../SendRequestForm';
import pic1 from "../../../assets/images/img1.jpg";
import pic2 from "../../../assets/images/img2.jpg";
import pic3 from "../../../assets/images/img3.jpg";
import pic4 from "../../../assets/images/img4.jpg";

const slides = [
  {
    id: 1,
    image: pic2,
    title: "Slide 1",
    description: "Description for Slide 1",
  },
  {
    id: 2,
    image: pic1,
    title: "Slide 2",
    description: "Description for Slide 2",
  },
  {
    id: 3,
    image: pic3,
    title: "Slide 3",
    description: "Description for Slide 3",
  },
  {
    id: 4,
    image: pic4,
    title: "Slide 4",
    description: "Description for Slide 4",
  },
];

// const Hero = () => {
//   return (
//     <section className="relative mt-34 z-50"
     
//     >
//         <Carousel className="" autoSlide={true} component={IntroText}>
//           {slides.map((s) => {
//             return <img className="" key={s.id} src={s.image} />;
//           })}
//         </Carousel>
//         <div className="md:absolute bottom-[-40px] bottom- left-0 right-0 mx-auto">
//           <SendRequestForm />
//         </div>
//       </section>
//   )
// }

// export default Hero


'use client'

// import { useState } from 'react'


// export default function Hero() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

//   return (
//     <div className="bg-white">
//       <div className="relative isolate px-6 pt-14 lg:px-8">
//         <div
//           aria-hidden="true"
//           className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
//         >
//           <div
//             style={{
//               clipPath:
//                 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
//             }}
//             className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
//           />
//         </div>
//         <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
//           <div className="hidden sm:mb-8 sm:flex sm:justify-center">
         
//           </div>
//           <div className="text-center bg-amber-700">
//              <p className="mt-8 max-md:font-medium text-pretty  sm:text-xl/8     
//                uppercase text-[#000080] text-4xl md:text-xl font-extrabold text-center font-roboto lg:font-bold p-0
//              ">
//              YOUR OFFICIAL FRANCE TRAVEL AND TOUR GUIDE
//             </p>
//             <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
//              explore france
//             </h1>
           
//             <div className="mt-10 flex items-center justify-center gap-x-6">
//               <a
//                 href="#"
//                 className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//               >
//                 Get started
//               </a>
            
//             </div>
//           </div>
//         </div>
//         <div
//           aria-hidden="true"
//           className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
//         >
//           <div
//             style={{
//               clipPath:
//                 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
//             }}
//             className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
//           />
//         </div>
//       </div>
//     </div>
//   )
// }




// import { useState, useEffect } from 'react';
// import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
// import Link from "../../LinkComponent";
// import Reveal from "../../Reveal";
// import SendRequestForm from '../../SendRequestForm';

//   const data = [
//   {
//     id: 1,
//     image: pic2,
//     title: "Slide 1",
//     description: "Description for Slide 1",
//   },
//   {
//     id: 2,
//     image: pic1,
//     title: "Slide 2",
//     description: "Description for Slide 2",
//   },
//   {
//     id: 3,
//     image: pic3,
//     title: "Slide 3",
//     description: "Description for Slide 3",
//   },
//   {
//     id: 4,
//     image: pic4,
//     title: "Slide 4",
//     description: "Description for Slide 4",
//   },
// ];


// export default function Hero() {
//  console.log(data)

//   const [currentIndex, setCurrentIndex] = useState(0);

//   const prevSlide = () =>
//     setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
//   const nextSlide = () =>
//     setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

//   useEffect(() => {
//     const interval = setInterval(nextSlide, 5000); // autoSlide every 5s
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section className="relative w-full h-dvh overflow-hidden bg-white">
//       {/* Carousel Images */}
//       <div className="absolute inset-0 z-0 flex transition-transform duration-700 ease-out"
//            style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
//         {slides.map((slide, idx) => (
//           <div key={idx} className="flex-shrink-0 w-full h-full">
//             <img
//               src={slide.image}
//               alt={`Slide ${idx}`}
//               className="w-full h-[500px] lg:h-full object-cover"
//             />
//           </div>
//         ))}
//       </div>

//       {/* Gradient Overlay */}
//       <div className="absolute h-[500px] lg:h-full  inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60 z-10" />

//       {/* Hero Content */}
//       <div className="relative z-20 px-6 pt-14  lg:px-8 max-md:mt-40 lg:h-full max-lg:mt-44 flex items-center justify-center">
//         <div className="text-center max-w-4xl mx-auto max-lg:flex max-lg:flex-col" >
//           <Reveal>
//  <p className="text-lg max-sm:text-xs font-bold text-gray-100 uppercase font-serif text-center mx-auto">
//           {/* <p className="text-lg font-bold text-gray-100 uppercase font-serif text-center whitespace-nowrap"> */}
//             Your Official France Travel and Tour Guide
//           </p>
//           </Reveal>
//           <Reveal delay={0.2}>
// <h1 className="mt-4 text-4xl sm:text-5xl lg:text-[100px] uppercase text-center font-semibold font-roboto text-[#000080] whitespace-nowrap">
//           {/* <h1 className="mt-4 text-4xl sm:text-5xl lg:text-[180px] uppercase text-center font-semibold font-roboto text-[#000080]"> */}
//             Explore France
//           </h1>
//           </Reveal>
//           <div className="mt-8 flex justify-center cursor-pointer">
//             <Link
//               href="#"
//               className="rounded-md hover:bg-[#000080] px-5 py-3 text-lg font-semibold text-white shadow-lg lg:py-4  bg-transparent border-2 border-[#000080] transition ease-in duration-150"
             
//             >
//               Find out more
//             </Link>
              
            
//           </div>
//         </div>
//       </div>

//       {/* Navigation Arrows */}
//       <div className="absolute inset-0 z-80 flex items-center justify-between px-4">
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
//       </div>


// <div className="absolute  sm:bottom-0 w-full px-2 sm:px-4 flex justify-center z-20 pointer-events-none">
//   <div className="pointer-events-auto w-full max-w-6xl">
//     <SendRequestForm />
//   </div>
// </div>

//       {/* <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 z-90 w-full max-w-7xl bg-amber-400 px-4">
//   <SendRequestForm />
// </div> */}

//     </section>
//   );
// }


// import { useState, useEffect } from 'react';
// import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
// import Link from "../../LinkComponent";
// import Reveal from "../../Reveal";
// import SendRequestForm from '../../SendRequestForm';

// const data = [
//   {
//     id: 1,
//     image: pic2,
//     title: "Slide 1",
//     description: "Description for Slide 1",
//   },
//   {
//     id: 2,
//     image: pic1,
//     title: "Slide 2",
//     description: "Description for Slide 2",
//   },
//   {
//     id: 3,
//     image: pic3,
//     title: "Slide 3",
//     description: "Description for Slide 3",
//   },
//   {
//     id: 4,
//     image: pic4,
//     title: "Slide 4",
//     description: "Description for Slide 4",
//   },
// ];

// export default function Hero() {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const prevSlide = () =>
//     setCurrentIndex((prev) => (prev === 0 ? data.length - 1 : prev - 1));
//   const nextSlide = () =>
//     setCurrentIndex((prev) => (prev === data.length - 1 ? 0 : prev + 1));

//   useEffect(() => {
//     const interval = setInterval(nextSlide, 5000); // autoSlide every 5s
//     return () => clearInterval(interval);
//   }, []);

//   return (

//         <section className="relative w-full h-screen min-h-[600px] overflow-hidden group">
//       {/* Carousel Images */}
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
//         <div className="text-center max-w-4xl mx-auto bg-amber-700 flex flex-col justify-center">
//           <Reveal>
//             <p className="text-sm sm:text-base lg:text-lg font-bold text-gray-100 uppercase font-serif">
//               Your Official France Travel and Tour Guide
//             </p>
//           </Reveal>
//           <Reveal delay={0.2}>
//             <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl uppercase font-semibold font-roboto text-[#000080] leading-tight break-words">
//               Explore France
//             </h1>
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

//       {/* Navigation Arrows - Desktop Only */}
//       <div className="absolute inset-0 z-30 hidden lg:flex items-center justify-between px-4">
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
//       </div>

//       {/* Mobile Navigation Dots */}
//       <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 flex lg:hidden space-x-2">
//         {data.map((_, idx) => (
//           <button
//             key={idx}
//             onClick={() => setCurrentIndex(idx)}
//             className={`w-2 h-2 rounded-full transition-colors ${
//               idx === currentIndex ? 'bg-white' : 'bg-white/50'
//             }`}
//           />
//         ))}
//       </div>
//     </section>
    // <section className="relative w-full max-sm:h-[700px] md:h-dvh overflow-hidden bg-yellow-200 group">
    //   {/* Carousel Images */}
    //   <div 
    //     className="absolute inset-0 z-0 flex transition-transform duration-700 ease-out"
    //     style={{ transform: `translateX(-${currentIndex * 100}%)` }}
    //   >
    //     {data.map((slide, idx) => (
    //       <div key={idx} className="flex-shrink-0 w-full h-full">
    //         <img
    //           src={slide.image}
    //           alt={`Slide ${idx}`}
    //           className="w-full h-[500px] lg:h-full object-cover"
    //         />
    //       </div>
    //     ))}
    //   </div>

    //   {/* Gradient Overlay */}
    //   <div className="absolute h-[500px] lg:h-full inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60 z-10" />

    //   {/* Hero Content */}
    //   <div className="relative z-20 px-6 pt-14 lg:px-8 max-md:mt-40 lg:h-full max-lg:mt-44 flex items-center justify-center">
    //     <div className="text-center max-w-4xl mx-auto max-lg:flex max-lg:flex-col z-30">
    //       <Reveal>
    //         <p className="text-lg max-sm:text-xs font-bold text-gray-100 uppercase font-serif text-center mx-auto">
    //           Your Official France Travel and Tour Guide
    //         </p>
    //       </Reveal>
    //       <Reveal delay={0.2}>
    //         <h1 className="mt-4 text-4xl sm:text-5xl lg:text-[100px] uppercase text-center font-semibold font-roboto text-[#000080] whitespace-nowrap">
    //           Explore France
    //         </h1>
    //       </Reveal>
    //       <div className="mt-8 flex justify-center z-40">
    //         <Link
    //           href="#"
    //           className="rounded-md hover:bg-[#000080] z-50 px-5 py-3 text-lg font-semibold text-white shadow-lg lg:py-4 bg-transparent border-2 border-[#000080] transition ease-in duration-150 cursor-pointer"
    //         >
    //           Find out more
    //         </Link>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Navigation Arrows */}
    //   <div className="absolute inset-0 z-30 flex max-lg:hidden items-center justify-between px-4">
    //     <button
    //       onClick={prevSlide}
    //       className="text-white bg-[#00008094] hover:bg-[#000080] p-2 rounded-full transition-opacity opacity-0 group-hover:opacity-100"
    //     >
    //       <IoIosArrowBack size={30} />
    //     </button>
    //     <button
    //       onClick={nextSlide}
    //       className="text-white bg-[#00008094] hover:bg-[#000080] p-2 rounded-full transition-opacity opacity-0 group-hover:opacity-100"
    //     >
    //       <IoIosArrowForward size={30} />
    //     </button>
    //   </div>

    //   {/* Floating Form */}
    //   {/* <div className="absolute bottom-0 w-full px-2 sm:px-4 flex justify-center z-60">
    //     <div className="w-full max-w-6xl">
    //       <SendRequestForm />
    //     </div>
    //   </div> */}
    // </section>
//   );
// }


// import { useState, useEffect } from 'react';
// import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
// import Link from "../../LinkComponent";
// import Reveal from "../../Reveal";
// import SendRequestForm from '../../SendRequestForm';

// const data = [
//   { id: 1, image: pic2, title: "Slide 1", description: "Description for Slide 1" },
//   { id: 2, image: pic1, title: "Slide 2", description: "Description for Slide 2" },
//   { id: 3, image: pic3, title: "Slide 3", description: "Description for Slide 3" },
//   { id: 4, image: pic4, title: "Slide 4", description: "Description for Slide 4" },
// ];

// export default function Hero() {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? data.length - 1 : prev - 1));
//   const nextSlide = () => setCurrentIndex((prev) => (prev === data.length - 1 ? 0 : prev + 1));

//   useEffect(() => {
//     const interval = setInterval(nextSlide, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section className="relative w-full h-screen min-h-[600px] overflow-hidden group">
//       {/* Carousel Images */}
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
//           <Reveal>
//             <p className="text-sm sm:text-base lg:text-lg font-bold text-gray-100 uppercase font-serif">
//               Your Official France Travel and Tour Guide
//             </p>
//           </Reveal>
//           <Reveal delay={0.2}>
//             <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl uppercase font-semibold font-roboto text-[#000080] leading-tight break-words">
//               Explore France
//             </h1>
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

//       {/* Desktop Navigation Arrows */}
//       <div className="absolute inset-0 z-30 hidden lg:flex items-center justify-between px-4">
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
//       </div>

//       {/* Mobile Navigation Dots */}
//       <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 flex lg:hidden space-x-2">
//         {data.map((_, idx) => (
//           <button
//             key={idx}
//             onClick={() => setCurrentIndex(idx)}
//             className={`w-2 h-2 rounded-full transition-colors ${
//               idx === currentIndex ? 'bg-white' : 'bg-white/50'
//             }`}
//           />
//         ))}
//       </div>
//     </section>
//   );
// }


// Make sure `pic1`, `pic2`, etc. are properly imported
import { useState, useEffect } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import Link from "../../LinkComponent";
import Reveal from "../../Reveal";
// import pic1 from '../../../assets/images/img1.jpg';
// import pic2 from '../../../assets/images/img2.jpg';
// import pic3 from '../../../assets/images/img3.jpg';
// import pic4 from '../../../assets/images/img4.jpg';

const data = [
  { id: 1, image: pic2, title: "Slide 1", description: "Description for Slide 1" },
  { id: 2, image: pic1, title: "Slide 2", description: "Description for Slide 2" },
  { id: 3, image: pic3, title: "Slide 3", description: "Description for Slide 3" },
  { id: 4, image: pic4, title: "Slide 4", description: "Description for Slide 4" },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? data.length - 1 : prev - 1));
  const nextSlide = () => setCurrentIndex((prev) => (prev === data.length - 1 ? 0 : prev + 1));

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

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
          <Reveal>
            <p className="text-sm sm:text-base lg:text-lg font-bold text-gray-100 uppercase font-serif">
              Your Official France Travel and Tour Guide
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl uppercase font-semibold font-roboto text-[#000080] leading-tight break-words">
              Explore France
            </h1>
          </Reveal>
          <div className="mt-6 sm:mt-8 flex justify-center">
            <Link
              href="#"
              className="rounded-md hover:bg-[#000080] px-4 sm:px-6 py-2 sm:py-3 lg:py-4 text-sm sm:text-base lg:text-lg font-semibold text-white shadow-lg bg-transparent border-2 border-[#000080] transition ease-in duration-150 cursor-pointer"
            >
              Find out more
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute inset-0 z-30 hidden lg:flex items-center justify-between px-4">
        <button
          onClick={prevSlide}
          className="text-white bg-[#00008094] hover:bg-[#000080] p-2 rounded-full transition-opacity opacity-0 group-hover:opacity-100"
        >
          <IoIosArrowBack size={30} />
        </button>
        <button
          onClick={nextSlide}
          className="text-white bg-[#00008094] hover:bg-[#000080] p-2 rounded-full transition-opacity opacity-0 group-hover:opacity-100"
        >
          <IoIosArrowForward size={30} />
        </button>
      </div>

      {/* Mobile Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 flex lg:hidden space-x-2">
        {data.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition-colors ${
              idx === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
