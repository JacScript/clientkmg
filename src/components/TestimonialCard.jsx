import React from 'react';
// ha;uiaha
const TestimonialCard = ({ data }) => {
  return (
    <div className="relative w-full max-w-sm mx-auto h-auto min-h-[320px] sm:min-h-[350px] lg:min-h-[380px]">
      {/* Floating comma - responsive positioning */}
      <div className="absolute -top-3 sm:-top-4 lg:-top-1 -right-2 sm:-right-3 lg:-right-4 text-[#000080] text-4xl sm:text-5xl lg:text-6xl z-20">
        ❞
      </div>

      {/* Card Content - responsive padding and spacing */}
      <div className="relative bg-blue-400 text-white h-full w-full rounded-lg p-4 sm:p-5 lg:p-6 overflow-hidden shadow-lg pt-40">
        {/* Header section with image and name */}
        <div className="flex items-center mb-4">
          <img
            src={data.image}
            alt={data.name}
            className="w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 rounded-full object-cover flex-shrink-0"
          />
          <div className="ml-3 sm:ml-4 space-y-1 sm:space-y-2 min-w-0 flex-1">
            <p className="text-lg sm:text-xl font-bold truncate">{data.name}</p>
            <p className="text-sm font-bold text-gray-200 truncate">{data.flag}</p>
          </div>
        </div>

        {/* Testimonial content */}
        <div className="flex-1">
          <p className="mb-4 text-sm sm:text-base leading-relaxed line-clamp-4 sm:line-clamp-5">
            {data.testimonial}
          </p>
          
          {/* Star rating */}
          <div className="flex justify-start">
            {[...Array(data.rating)].map((_, i) => (
              <div key={i} className="text-yellow-400 text-xl sm:text-2xl lg:text-3xl mr-1">
                ★
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Custom CSS for line clamping */}
      <style jsx>{`
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-5 {
          display: -webkit-box;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        @media (min-width: 640px) {
          .line-clamp-4 {
            -webkit-line-clamp: 5;
          }
        }
      `}</style>
    </div>
  );
};

export default TestimonialCard;