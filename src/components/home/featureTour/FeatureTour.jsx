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
import pic1 from '../../../assets/images/louvre.jpg'; // Example image, replace with your own
import pic2 from '../../../assets/images/champagne.jpg';
import pic3 from '../../../assets/images/eiffel2.jpg';
import pic4 from '../../../assets/images/img12.jpg';

const FeatureTour = () => {
  const items = [
    {
      pic: pic1,
      title: "Louvre Museum"
    },
    {
      pic: pic2,
      title: "Champange Tasting"
    },
    {
      pic: pic3,
      title: "City Visiting"
    },
    {
      pic: pic4,
      title:"Mont Saint Micheal"
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
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 place-items-center">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="relative 
                  w-full max-w-sm sm:max-w-none
                  h-64 sm:h-72 md:h-80 lg:h-72 xl:h-96
                  sm:w-full
                  rounded-xl shadow-lg hover:shadow-2xl 
                  overflow-hidden bg-cover bg-center 
                  group cursor-pointer
                  transform transition-all duration-500 
                  hover:scale-105 hover:-translate-y-2"
                style={{ backgroundImage: `url(${item.pic})` }}
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>

                {/* Featured Badge */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                  <span className="text-white text-xs sm:text-sm font-bold bg-[#000080cc] backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-2 rounded-md opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 shadow-lg">
                    Featured
                  </span>
                </div>

                {/* Heart/Favorite Icon */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-100 hover:bg-white/30 cursor-pointer">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                  {/* Tour Info */}
                  <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 mb-4">
                    <h3 className="text-lg sm:text-xl font-bold mb-1">{item.title}</h3>
                    {/* <p className="text-sm sm:text-base text-gray-200 mb-2">3 Days • 2 Nights</p> */}
                    <div className="flex items-center justify-between">
                      {/* <span className="text-lg sm:text-xl font-bold">$299</span> */}
                      <div className="flex items-center text-yellow-400">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                        </svg>
                        <span className="ml-1 text-sm">4.8</span>
                      </div>
                    </div>
                  </div>

                  {/* Book Now Button */}
                  <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-200">
                    <Link
                      href="#"
                      className="block w-full px-4 py-2 sm:px-6 sm:py-3 text-center text-white text-sm sm:text-base font-bold rounded-lg bg-[#000080] hover:bg-[#000080d2] transition-all duration-300 transform hover:scale-105 shadow-lg backdrop-blur-sm"
                      
                    >Book Now</Link>
                  </div>
                </div>

                {/* Hover Overlay Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#000080]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>

          {/* View All Tours Button */}
          <div className="mt-8 sm:mt-12 lg:mt-16">
            <Link
              href="#"
              className="inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 text-[#000080] font-bold border-2 border-[#000080] rounded-lg hover:bg-[#000080] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
              // title="View All Tours →"
            >Book Now</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeatureTour