import React from 'react';
import Reveal from '../../Reveal';
import pic1 from '../../../assets/images/img19.jpg';
import FadeInImage from '../../FadeInImage';
import Link from '../../LinkComponent';

function Discover() {
  return (
    <section className="w-full py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-white text-[#000080]">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-20">
        
        {/* Text Section */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          {/* <Reveal>
            <p className="text-base md:text-lg font-bold font-serif mb-3 tracking-wide">
              TIMELESS ADVENTURE
            </p>
          </Reveal> */}

          <Reveal delay={0.5}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl xl:text-5xl font-black font-roboto leading-tight mb-6">
              Explore Paris, and the neighbouring EU cities with Kai and KM travel and tours
            </h2>
          </Reveal>

          <Reveal delay={1.3}>
            <p className="text-sm sm:text-base md:text-lg font-serif leading-relaxed mb-6 max-w-prose mx-auto lg:mx-0">
              Kai specialises in guiding Tanzanians through unforgettable journeys across France and neighboring EU cities, offering full support from visa application to local experiences that feel like home never missing a spot.
            </p>
          </Reveal>

          <div className="flex justify-center lg:justify-start">
            <Link 
            href='#homecontact'
  isWhatsApp={false} 
  className="bg-[#000080] hover:bg-[#000080] text-white px-6 py-3 rounded-md shadow-lg"
>
  Contact Us
</Link>
            
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full lg:w-1/2">
          <FadeInImage
            src={pic1}
            alt="City Discovery"
            className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-md"
          />
        </div>
      </div>
    </section>
  );
}

export default Discover;
