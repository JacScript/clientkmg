import React from 'react';
import Link from '../../LinkComponent'; // Assuming LinkComponent is responsive internally

const FeatureCard = ({ data }) => {
  return (
    <div
      className="relative 
        w-full max-w-sm sm:max-w-none
        h-64 sm:h-72 md:h-80 lg:h-72 xl:h-96
        sm:w-full
        rounded-xl shadow-lg hover:shadow-2xl 
        overflow-hidden bg-cover bg-center 
        group cursor-pointer
        transform transition-all duration-500 
        hover:scale-105 hover:-translate-y-2"
      style={{ backgroundImage: `url(${data.pic})` }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>

      {/* Featured Badge */}
      {/* <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
        <span className="text-white text-xs sm:text-sm font-bold bg-[#000080cc] backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-2 rounded-md 
                           opacity-0 group-hover:opacity-100 
                           transition-all duration-500 delay-100 shadow-lg">
          Featured
        </span>
      </div> */}

      <div className="absolute top-3 left-3 sm:top-10 sm:left-4 z-20">
  <span className="text-white text-xs sm:text-sm font-bold bg-[#000080cc] backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-2 rounded-md 
                   opacity-0 group-hover:opacity-100 
                   transition-all duration-500 delay-100 shadow-lg">
    Featured
  </span>
</div>


      {/* Heart/Favorite Icon */}
      <div className="absolute top-3 right-3 sm:top-8 sm:right-4">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center 
                         opacity-0 group-hover:opacity-100 
                         transform translate-y-2 group-hover:translate-y-0 
                         transition-all duration-500 delay-100 hover:bg-white/30 cursor-pointer">
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white z-10">
        {/* Tour Info */}
        <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 mb-4">
          <h3 className="text-lg sm:text-xl font-bold mb-1">{data.title}</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-yellow-400">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
              </svg>
              <span className="ml-1 text-sm">4.8</span>
            </div>
          </div>
        </div>

        {/* Book Now Button */}
        <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-200">
              <Link 
            message="Hello, I would like to inquire about your tour services."
  isWhatsApp={true} 
  className="block w-full px-4 py-2 sm:px-6 sm:py-3 text-center text-white text-sm sm:text-base font-bold rounded-lg bg-[#000080] hover:bg-[#000080d2] transition-all duration-300 transform hover:scale-105 shadow-lg backdrop-blur-sm"
>
  Book Now
</Link>
          {/* <Link
            href="#"
            className="block w-full px-4 py-2 sm:px-6 sm:py-3 text-center text-white text-sm sm:text-base font-bold rounded-lg bg-[#000080] hover:bg-[#000080d2] transition-all duration-300 transform hover:scale-105 shadow-lg backdrop-blur-sm"
            title={data.title}
          >Book Now</Link> */}
        </div>
      </div>

      {/* Hover Overlay Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#000080]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
};

export default FeatureCard;
