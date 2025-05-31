// import React from 'react'
// import Reveal from '../../Reveal'
// import pic1 from '../../../assets/images/img19.jpg';
// import FadeInImage from '../../FadeInImage';
// import Link from '../../LinkComponent';

// function Discover() {
//   return (
//     <section className='md:h-dvh w-screen max-sm:mt-12'>
//         <div className='xl:w-3/4 w-full  xl:mx-auto h-full px-6 flex max-lg:flex-col items-center'>

//         <div className='max-lg:h-[90%] lg:w-1/2 w-screen text-[#000080]  max-lg:px-12  items-center'>
//             <Reveal>

//            <p className='font-bold text-lg font-serif max-lg:py-5 w-full'>TIMELESS ADVENTURE</p>
//             </Reveal>

//             <Reveal delay={0.5}>
//            <p className='font-black max-lg:text-2xl text-[60px] font-roboto max-md:mb-6'>DISCOVER THE CITIES WITH KM TRAVEL & TOUR</p>
//             </Reveal>

//             <Reveal delay={1.3}>

//            <p className='text-lg font-serif'>Journey across continents, cultures, and landscapes – because every path leads to a new discovery.</p>
//             </Reveal>

//             <div className="flex justify-start mt-4">
//            <Link
//              href="#"
//              className="px-[20px] py-[10px] border-2 border-[#000080] rounded-lg shadow-lg text-[20px] font-extrabold text-white bg-[#000080] hover:bg-[#000080d2] transition-all ease-in-out duration-500"
//              title="Contact Us"
//            />
//          </div>
//         </div>
//         <div className='h-[90%] flex items-center lg:w-1/2 w-screen  max-md:mt-6 mt-8 '>
//            <FadeInImage src={pic1} alt="pic1" className='w-full h-[80%] object-cover' />
//         </div>
//         </div>
//     </section>
//   )
// }

// export default Discover


// import React from 'react'
// import Reveal from '../../Reveal'
// import pic1 from '../../../assets/images/img19.jpg';
// import FadeInImage from '../../FadeInImage';
// import Link from '../../LinkComponent';

// function Discover() {
//   return (
//     <section className="w-full px-4 sm:px-6 md:px-12 xl:px-0">
//       <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-20 py-12">
        
//         {/* Text */}
//         <div className="w-full lg:w-1/2 text-[#000080]">
//           <Reveal>
//             <p className="font-bold text-lg font-serif mb-4">TIMELESS ADVENTURE</p>
//           </Reveal>
//           <Reveal delay={0.5}>
//             <h2 className="font-black text-3xl sm:text-4xl md:text-5xl font-roboto mb-6 leading-tight">
//               DISCOVER THE CITIES WITH KM TRAVEL & TOUR
//             </h2>
//           </Reveal>
//           <Reveal delay={1.3}>
//             <p className="text-lg font-serif mb-6">
//               Journey across continents, cultures, and landscapes – because every path leads to a new discovery.
//             </p>
//           </Reveal>
//           <Link
//             href="#"
//             className="px-6 py-3 border-2 border-[#000080] rounded-lg shadow-lg text-lg font-bold text-white bg-[#000080] hover:bg-[#000080d2] transition-all duration-300"
//             title="Contact Us"
//           >
//             Contact Us
//           </Link>
//         </div>

//         {/* Image */}
//         <div className="w-full lg:w-1/2">
//           <FadeInImage
//             src={pic1}
//             alt="pic1"
//             className="w-full h-full max-h-[500px] object-cover rounded-lg"
//           />
//         </div>
//       </div>
//     </section>
//   )
// }

// export default Discover;
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
          <Reveal>
            <p className="text-base md:text-lg font-bold font-serif mb-3 tracking-wide">
              TIMELESS ADVENTURE
            </p>
          </Reveal>

          <Reveal delay={0.5}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black font-roboto leading-tight mb-6">
              DISCOVER THE CITIES WITH KM TRAVEL & TOUR
            </h2>
          </Reveal>

          <Reveal delay={1.3}>
            <p className="text-sm sm:text-base md:text-lg font-serif leading-relaxed mb-6 max-w-prose mx-auto lg:mx-0">
              Journey across continents, cultures, and landscapes – because every path leads to a new discovery.
            </p>
          </Reveal>

          <div className="flex justify-center lg:justify-start">
            <Link
              href="#"
              className="px-6 py-3 border-2 border-[#000080] rounded-lg shadow-lg text-base sm:text-lg font-bold text-white bg-[#000080] hover:bg-[#000080d2] transition-all duration-300"
              // title="Contact Us"
            >Contact Us</Link>
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
