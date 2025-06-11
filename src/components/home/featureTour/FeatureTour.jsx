// import React from 'react'
// import Link from '../../LinkComponent'
// import pic1 from '../../../assets/images/louvre.jpg'; // Example image, replace with your own
// import pic2 from '../../../assets/images/champagne.jpg';
// import pic3 from '../../../assets/images/eiffel2.jpg';
// import pic4 from '../../../assets/images/img12.jpg';


// const FeatureTour = () => {
 
//      const items = [
//        {
//          pic: pic1,
//        },

//        {
//          pic: pic2,
//        },

//        {
//          pic: pic3,
//        },

//        {
//          pic: pic4,
//        },
//      ];


//   return (
//     <section className='xl:h-dvh w-screen pt-20 flex items-center justify-center'>
//         <div className='xl:w-3/4 w-[95%] h-full flex flex-col items-center justify-center xl:p-6'>
//         <div className='w-full h-full '>

//             <div className='w-full mb-4  flex flex-col items-center'>
//                 <p className='px-4 py-2 bg-[#00008069] shadow rounded-lg w-40 font-bold text-[#000080] text-center mb-4'>Feature Tour</p>
//                 <h1 className='text-5xl text-[#000080] font-extrabold text-center mb-10'>Amazing Tour Places</h1>
//             </div>
 
//             {/* <div className="mt-4 max-md:w-full mb-6 grid grid-cols-1 md:grid-cols-2 md:px-2 py-4 space-y-4 items-center"> */}
//             <div className="mt-4 max-xl:w-full mb-6 grid grid-cols-1 md:grid-cols-2 md:px-2 py-4 space-y-4 place-items-center md:place-items-start xl:grid-cols-4">


//                 {/* < className="mt-4 mb-6 flex items-center justify-center space-x-4 px-2 py-4"> */}
//                 { items.map((item, idx) => {
//                     return (
//                         <div
//                         key={idx}
//                         className="relative  sm:h-[400px] sm:w-[300px] lg:h-[220px] lg:w-[320px] xl:h-[400px] xl:w-[300px] rounded-xl shadow-lg overflow-hidden bg-cover bg-center group"
//                         style={{ backgroundImage: `url(${item.pic})` }}
//                       >
//                         {/* Overlay to dim background on hover (optional) */}
//                         <div className="absolute inset-0  opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
//                         {/* Featured label appears on hover */}
//                         <h1 className="absolute top-4 left-4 text-white text-sm font-bold bg-[#000080cc] px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition duration-500 z-10">
//                           Featured
//                         </h1>
                
//                         {/* Centered Link button appears on hover */}
//                         <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500 z-10">
//                           <Link
//                             href="#"
//                             className="px-5 py-2 text-white text-lg font-bold rounded-lg bg-[#000080] hover:bg-[#000080d2] transition-all duration-500"
//                             title="Book Now"
//                           />
//                         </div>
//                       </div>
//                     )
//                 })}
     
//     </div>
//         </div>
//         </div>
//     </section>
//   )
// }

// export default FeatureTour


import React from 'react'
import Link from '../../LinkComponent'
import pic1 from '../../../assets/images/brussels.jpg'; // Example image, replace with your own
import pic2 from '../../../assets/images/Barcelona.jpg';
import pic3 from '../../../assets/images/Amsterdam.jpg';
import pic4 from '../../../assets/images/Rome.jpg';
import pic5 from '../../../assets/images/greece.jpg';
import pic6 from '../../../assets/images/Berlin.jpg';
import TestimonialCarousel from '../../TestimonialCarousel';
import FeatureCard from './FeatureCard';

const FeatureTour = () => {
  const data = [
    {
      pic: pic1,
      title: "Brussels"
    },
    {
      pic: pic2,
      title: "Barcelona"
    },
    {
      pic: pic3,
      title: "Amsterdam"
    },
    {
      pic: pic4,
      title:"Rome"
    },
    {
      pic: pic5,
      title: "greece"
    },
    {
      pic: pic6,
      title:"Berlin"
    },
    
  ];

  return (
    <section className="min-h-screen xl:h-dvh w-full py-12 sm:py-16 lg:py-20 flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="w-full h-full flex flex-col items-center justify-center">
          
          {/* Header Section */}
          <div className="w-full mb-8 sm:mb-12 lg:mb-16 flex flex-col items-center text-center">
            <div className="px-4 py-2 sm:px-6 sm:py-3 bg-[#00008069] shadow-md rounded-lg font-bold text-[#000080] text-sm sm:text-base mb-4 sm:mb-6">
              Feature Tour
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-[#000080] font-extrabold leading-tight mb-4 px-4">
              Amazing Tour Places
            </h1>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto px-4">
              Discover breathtaking destinations and create unforgettable memories with our curated tour experiences.
            </p>
          </div>

          {/* Tour Cards Grid */}
          <TestimonialCarousel component={FeatureCard} items={data} />
        

          {/* View All Tours Button
          <div className="mt-8 sm:mt-12 lg:mt-16">
             <Link
              href="/packages"
              className="inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 text-[#000080] font-bold border-2 border-[#000080] rounded-lg hover:bg-[#000080] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
              // title="View All Tours →"
            >View Packages</Link>
            <Link
              href="/gallery"
              className="inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 text-[#000080] font-bold border-2 border-[#000080] rounded-lg hover:bg-[#000080] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
              // title="View All Tours →"
            >View More</Link>
          </div> */}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 sm:mt-12 lg:mt-16 px-4">
      {/* View Packages Button */}
      <Link
        href="/packages"
        className="
          inline-flex items-center justify-center text-center
          px-5 py-2.5     // Default padding for small screens
          sm:px-6 sm:py-3 // Medium screens (sm)
          md:px-7 md:py-3.5 // Larger screens (md)
          lg:px-8 lg:py-4  // Even larger screens (lg)

          text-base sm:text-lg lg:text-xl font-bold // Responsive font sizes
          text-[#000080] border-2 border-[#000080] rounded-lg
          hover:bg-[#000080] hover:text-white
          transition-all duration-300 transform hover:scale-105
          shadow-md hover:shadow-lg
          w-full sm:w-auto // Make buttons full width on small screens, auto width on larger
        "
        title="View All Packages"
      >
        View Packages
      </Link>

      {/* View More (Gallery) Button */}
      <Link
        href="/gallery"
        className="
          inline-flex items-center justify-center text-center
          px-5 py-2.5     // Default padding for small screens
          sm:px-6 sm:py-3 // Medium screens (sm)
          md:px-7 md:py-3.5 // Larger screens (md)
          lg:px-8 lg:py-4  // Even larger screens (lg)

          text-base sm:text-lg lg:text-xl font-bold // Responsive font sizes
          text-[#000080] border-2 border-[#000080] rounded-lg
          hover:bg-[#000080] hover:text-white
          transition-all duration-300 transform hover:scale-105
          shadow-md hover:shadow-lg
          w-full sm:w-auto // Make buttons full width on small screens, auto width on larger
        "
        title="View More from our Gallery"
      >
        View More
      </Link>
    </div>
        </div>
      </div>
    </section>
  )
}

export default FeatureTour