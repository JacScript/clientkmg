// import React from 'react'

// const TestimonialCard = ({key,className,data}) => {
//   return (
//     <div key={idx} className="relative w-[400px] h-[350px]">
//     {/* Floating comma outside the card */}
//     <div className="absolute -top-5 -right-4 text-[#000080] text-6xl z-20">
//       ❞
//     </div>

//     {/* Testimonial Card */}
//     <div className="relative bg-[#8B2614] text-white h-full w-full rounded-lg p-4 overflow-hidden">
//       <div className="flex items-center">
//         <img
//           src={d.image}
//           alt={d.name}
//           className="w-20 h-20 rounded-full object-cover"
//         />
//         <div className="ml-4 space-y-2">
//           <p className="text-xl font-bold">{d.name}</p>
//           <p className="text-sm font-bold text-gray-200">{d.country}</p>
//         </div>
//       </div>

//       <div className="mt-4">
//         <p className="mb-4 text-base">{d.testimonial}</p>
//         <div className="flex">
//           {[...Array(d.rating)].map((_, i) => (
//             <div key={i} className="text-yellow-500 text-3xl mr-1">
//               &#9733;
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   </div>
//   )
// }

// export default TestimonialCard

import React from 'react';

const TestimonialCard = ({ data }) => {
  return (
    <div className="relative w-[400px] h-[350px]">
      {/* Floating comma */}
      <div className="absolute -top-5 -right-4 text-[#000080] text-6xl z-20">
        ❞
      </div>

      {/* Card Content */}
      <div className="relative bg-[#8B2614] text-white h-full w-full rounded-lg p-4 overflow-hidden">
        <div className="flex items-center">
          <img
            src={data.image}
            alt={data.name}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div className="ml-4 space-y-2">
            <p className="text-xl font-bold">{data.name}</p>
            <p className="text-sm font-bold text-gray-200">{data.country}</p>
          </div>
        </div>

        <div className="mt-4">
          <p className="mb-4 text-base">{data.testimonial}</p>
          <div className="flex">
            {[...Array(data.rating)].map((_, i) => (
              <div key={i} className="text-yellow-500 text-3xl mr-1">
                &#9733;
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
