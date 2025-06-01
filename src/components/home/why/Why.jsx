// import React from 'react'
// import Reveal from '../../Reveal'
// import pic1 from '../../../assets/images/img11.JPG';
// import FadeInImage from '../../FadeInImage';
// import Link from '../../LinkComponent';

// function Why() {
//   return (
//     <section className='h-dvh w-screen md:pt-20'>
//         <div className='xl:w-3/4 w-screen mx-auto h-full px-6  space-x-2 flex max-md:flex-col items-center justify-between '>

        
//         <div className='h-[50%] md:h-[80%] w-screen md:w-1/2'>
//            <FadeInImage src={pic1} alt="pic1" className='h-[90%] w-full object-cover' />
//         </div>

//         <div className='h-[50%] md:h-[80%] md:w-1/2 text-[#000080] flex flex-col px-12 md:pt-8'>
//             <Reveal>

//            <p className='font-bold md:text-lg font-serif max-lg:py-5 w-full text-medium'>TIMELESS ADVENTURE</p>
//             </Reveal>

//             <Reveal delay={0.5}>
//            <p className='font-black text-[40px] xl:text-[60px] font-roboto max-md:mb-6'>WHY 
//            CHOOSE   KM TRAVEL & TOUR </p>
//             </Reveal>

//             <Reveal delay={1.3}>

//            <p className='text-lg max-xl:text-xs'>We go beyond just trips — we create experiences. With expertly curated itineraries, local insights, and a passion for discovery, we ensure every journey is safe, seamless, and unforgettable — whether you're exploring the cultural gems of France or beyond.</p>
//             </Reveal>
//             <div className="flex justify-start mt-4">
//            <Link
//              href="#"
//              className="px-[20px] py-[10px] border-2 border-[#000080] rounded-lg shadow-lg text-[20px] font-extrabold text-white bg-[#000080] hover:bg-[#000080d2] transition-all ease-in-out duration-500"
//              title="Contact Us"
//            />
//          </div>
//         </div>
//         </div>
//     </section>
//   )
// }

// export default Why

import React from 'react';
import Reveal from '../../Reveal';
import pic1 from '../../../assets/images/img11.JPG';
import FadeInImage from '../../FadeInImage';
import Link from '../../LinkComponent';

function Why() {
  return (
    <section className="w-full py-12 md:py-20 bg-white text-[#000080]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse md:flex-row items-center gap-10">
        
 {/* Image */}
        <div className="w-full md:w-1/2">
          <FadeInImage
            src={pic1}
            alt="Travel Experience"
            className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Text Content */}
        <div className="w-full md:w-1/2 space-y-6 md:pr-8 text-center md:text-left">
          <Reveal>
            <p className="text-base md:text-lg font-bold font-serif tracking-wide">
              TIMELESS ADVENTURE
            </p>
          </Reveal>

          <Reveal delay={0.5}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[60px] font-black font-roboto leading-tight">
              WHY CHOOSE <br className="hidden md:block" /> KM TRAVEL & TOUR
            </h2>
          </Reveal>

          <Reveal delay={1.3}>
            <p className="text-sm sm:text-base md:text-lg leading-relaxed max-w-prose">
              We go beyond just trips — we create experiences. With expertly curated itineraries, local insights, and a passion for discovery, we ensure every journey is safe, seamless, and unforgettable — whether you're exploring the cultural gems of France or beyond.
            </p>
          </Reveal>

          <div className="mt-4 flex justify-center md:justify-start">
            <Link
              href="#"
              className="px-6 py-3 border-2 border-[#000080] rounded-lg shadow-lg text-base sm:text-lg font-bold text-white bg-[#000080] hover:bg-[#000080d2] transition-all duration-500"
              title="Contact Us"
            >Contact Us</Link>
          </div>
        </div>

       
      </div>
    </section>
  );
}

export default Why;
