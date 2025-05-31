import pic1 from "../../../assets/images/img1.jpg";
import pic2 from "../../../assets/images/img2.jpg";
import pic3 from "../../../assets/images/img3.jpg";
import pic4 from "../../../assets/images/img4.jpg";
import { useState, useEffect } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import Link from "../../LinkComponent";
import Reveal from "../../Reveal";


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
