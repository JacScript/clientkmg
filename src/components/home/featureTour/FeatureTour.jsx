

import React from 'react'
import Link from '../../LinkComponent'

import TestimonialCarousel from '../../TestimonialCarousel';
import FeatureCard from './FeatureCard';

const FeatureTour = () => {
  const data = [
    {
      pic: "https://res.cloudinary.com/dwkivuqts/image/upload/v1750390239/brussels_nhf7b5.jpg",
      title: "Brussels"
    },
    {
      pic: "https://res.cloudinary.com/dwkivuqts/image/upload/v1750390258/Barcelona_iatvqy.jpg",
      title: "Barcelona"
    },
    {
      pic: "https://res.cloudinary.com/dwkivuqts/image/upload/v1750390302/Amsterdam_wmh0so.jpg",
      title: "Amsterdam"
    },
    {
      pic: "https://res.cloudinary.com/dwkivuqts/image/upload/v1750389829/Rome_dxqkym.jpg",
      title:"Rome"
    },
    {
      pic: "https://res.cloudinary.com/dwkivuqts/image/upload/v1750391426/greece_gnihsm.jpg",
      title: "greece"
    },
    {
      pic: "https://res.cloudinary.com/dwkivuqts/image/upload/v1750389808/Berlin_bu6hcd.jpg",
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