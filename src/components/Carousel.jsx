// This component is a simple carousel that displays slides and has navigation buttons.
import React, { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Link from "./LinkComponent";
import Reveal from "./Reveal";
// import SendRequestForm from "./SendRequestForm";

const Carousel = ({
  children: slides,
  autoSlide = false,
  autoSlideInterval = 5000,
  component
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const Component = component;

  const prevSlide = () =>
    setCurrentIndex((currentIndex) =>
      currentIndex === 0 ? slides.length - 1 : currentIndex - 1
    );
  const nextSlide = () =>
    setCurrentIndex((currentIndex) =>
      currentIndex === slides.length - 1 ? 0 : currentIndex + 1
    );

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(nextSlide, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="overflow-hidden relative max-h-[700px] group">
      {/* Slides container */}
      <div
        className="flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides}
      </div>

      {/* Linear gradient overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.1) 70%, rgba(0,0,0,0.6) 100%)'
        }}
      />

      {/* Navigation buttons */}
      <div className="absolute inset-0 flex justify-between items-center px-4 py-2 z-10">
        <button
          onClick={prevSlide}
          className="bg-[#00008094] rounded-full p-1 text-white hover:bg-[#000080] opacity-0 scale-50 translate-y-4 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 
                           transition-all duration-500 ease-out transform"
        >
          <IoIosArrowBack size={40} />
        </button>
        <button
          onClick={nextSlide}
          className="bg-[#00008094] rounded-full p-1 text-white hover:bg-[#000080] opacity-0 scale-50 translate-y-4 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 
                           transition-all duration-500 ease-out transform"
        >
          <IoIosArrowForward size={40} />
        </button>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-20 left-0 right-0 z-10">
        <div className="flex items-center justify-center">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full mx-1 cursor-pointer ${
                index === currentIndex ? "bg-[#000080]" : "bg-gray-300"
              }`}
              onClick={() => setCurrentIndex(index)}
            ></div>
          ))}
        </div>
      </div>

      {/* Component overlay */}
      <div className="absolute w-3/4 inset-0 mx-auto h-80 mt-30 z-10">
        <Component />
      </div>
    </div>
  );
};

export default Carousel;