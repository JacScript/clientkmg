import { useState, useEffect } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import Link from "../../LinkComponent";
import Reveal from "../../Reveal";

const data = [
  { 
    id: 1,
    image: "https://res.cloudinary.com/dwkivuqts/image/upload/v1750387303/img4_qxdha0.jpg", 
    title: "Slide 1", 
    description: "Description for Slide 1" 
  },
  { 
    id: 2,
    image: "https://res.cloudinary.com/dwkivuqts/image/upload/v1750398584/img1_hcxvl6.jpg", 
    title: "Slide 2", 
    description: "Description for Slide 2" 
  },
];

export default function Hero({res}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Handle next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === data.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Handle previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? data.length - 1 : prevIndex - 1
    );
  };

  // Auto-play functionality
  useEffect(() => {
    let slideInterval;
    
    if (isAutoPlay) {
      slideInterval = setInterval(() => {
        nextSlide();
      }, 259200000); // Change slide every 5 seconds
    }
    
    return () => {
      if (slideInterval) {
        clearInterval(slideInterval);
      }
    };
  }, [isAutoPlay, currentIndex]);

  // Go to specific slide
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section 
      className="relative w-full md:h-screen min-h-[600px] overflow-hidden group mt-30"
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
    >
      {/* Carousel Images */}
      <div
        className="absolute inset-0 z-0 flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {data.map((slide, idx) => (
          <div key={idx} className="flex-shrink-0 w-full h-full">
            <img
              src={slide.image}
              alt={`Slide ${idx + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60 z-10" />

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-300 group-hover:opacity-100 opacity-0 md:opacity-100"
        aria-label="Previous slide"
      >
        <IoIosArrowBack size={24} />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-300 group-hover:opacity-100 opacity-0 md:opacity-100"
        aria-label="Next slide"
      >
        <IoIosArrowForward size={24} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
        {res?.backgroundImage.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              idx === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

 

      {/* Hero Content */}
      <div className="relative z-20 h-full flex items-center lg:items-start pt-60 justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto flex flex-col items-center justify-center">

               {/* Tour & Travel Badge */}
      <div className="z-30 left-4 sm:left-8 lg:left-12" style={{ top: '90%' }}>
        <div className="bg-orange-500 text-white px-4 py-2 rounded-lg shadow-lg transform -rotate-2 hover:rotate-0 transition-transform duration-300">
          <span className="text-sm sm:text-base lg:text-lg font-bold uppercase tracking-wide">
            { res?.badge || "Travel And Tours"}
          </span>
        </div>
      </div>
          <Reveal delay={0.2}>
            <h1 className="mt-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-7xl capitalize font-semibold font-roboto text-white leading-tight break-words">
              {res?.heading || "from Tanzania to France"} 
            </h1>
          </Reveal>
          <Reveal>
            <p className="text-sm sm:text-base lg:text-lg font-medium text-white/90 capitalize font-serif">
            {res?.subheading || "your personalized holiday from Tanzania to France organized by Kai"}
              {/* your personalized holiday from Tanzania to France organized by Kai */}
            </p>
          </Reveal>
          
          <div className="mt-6 sm:mt-8 flex justify-center">
            <Link
              href={res?.buttonLink || "/about-us"}
              className="rounded-md bg-[#000080] px-4 sm:px-6 py-2 sm:py-3 lg:py-4 text-sm sm:text-base lg:text-lg font-semibold text-white hover:text-[#000080] hover:border-white shadow-lg hover:bg-white/80 border-2 border-[#000080] transition ease-in duration-150 cursor-pointer "
            >
              { res?.buttonText || "Find out more"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}