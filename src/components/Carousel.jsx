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
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

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
      <div
        className="flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides}
      </div>

      {/*Button  */}
      <div className="absolute inset-0 flex justify-between items-center px-4 py-2">
        <button
          onClick={prevSlide}
          className="bg-[#00008094] rounded-full p-1 text-white hover:bg-[#000080]  opacity-0 scale-50 translate-y-4 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 
                           transition-all duration-500 ease-out transform"
        >
          <IoIosArrowBack size={40} />
        </button>
        <button
          onClick={nextSlide}
          className="bg-[#00008094] rounded-full p-1 text-white hover:bg-[#000080]     opacity-0 scale-50 translate-y-4 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 
                           transition-all duration-500 ease-out transform"
        >
          <IoIosArrowForward size={40} />
        </button>
      </div>

      {/*  */}
      <div className="absolute bottom-20 left-0 right-0">
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

      

<div className="absolute w-3/4 inset-0 mx-auto h-80 mt-30">
  <div className="flex justify-center">
    <Reveal delay={1.3}>
      <p className="text-center text-xl font-extrabold text-white">
        YOUR OFFICIAL TRAVEL AND TOUR GUIDE
      </p>
    </Reveal>
  </div>

  <div className="flex justify-center">
    <Reveal delay={2.3}> {/* start after first reveal is done */}
      <p className="uppercase text-[#000080] text-center text-[200px] font-medium p-0">
        explore
      </p>
    </Reveal>
  </div>

  <div className="flex justify-center mt-4">
    <Link
      href="#"
      className="px-[20px] py-[10px] border-2 border-[#000080] rounded-lg shadow-lg text-[20px] font-extrabold text-[#000080] bg-transparent hover:text-white hover:bg-[#000080] transition-all ease-in-out duration-500"
      title="Find out More"
    />
  </div>
</div>      
    </div>
  );
};

export default Carousel;
