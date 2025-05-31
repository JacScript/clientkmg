// import React from 'react';
// import { MdOutlineMuseum } from "react-icons/md";

// const LogisticsCard = ({ data }) => {
//   return (

//     <div className='p-12 bg-white shadow rounded-lg'>


//     <div className="group relative w-[280px] h-[350px] rounded-xl overflow-hidden shadow-lg bg-cover bg-center"
//       style={{ backgroundImage: `url(${data.image})` }}>
      
//       {/* Hover Gradient */}
//       <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-500" />
      
//       {/* Floating Icon */}
//       <div className="absolute top-4 left-4 bg-[#000080] rounded-full h-12 w-12 flex items-center justify-center z-10 shadow-md">
//         <MdOutlineMuseum size={24} className="text-white" />
//       </div>

//       {/* Bottom Content */}
//       <div className="absolute bottom-0 w-full bg-opacity-90 text-white p-4">
//         <h1 className="text-lg font-bold mb-2">{data.name}</h1>
//         <p className="text-sm leading-snug">{data.description}</p>
//       </div>
//     </div>
//     </div>
//   );
// };

// // export default LogisticsCard;
// import React from 'react';



// const LogisticsCard = ({ data }) => {
//   console.log(data)
//   const Icon = data.icon;
//   return (
//     <div className='p-4 sm:p-6 md:p-8 lg:p-8 bg-white shadow rounded-lg'>
//       <div className="group relative w-full max-w-[280px] mx-auto h-[300px] sm:h-[320px] md:h-[350px] lg:h-[350px] rounded-xl overflow-hidden shadow-lg bg-cover bg-center"
//         style={{ backgroundImage: `url(${data.image})` }}>
        
//         {/* Hover Gradient */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-500" />
        
//         {/* Floating Icon */}
//         <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-[#000080] rounded-full h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center z-10 shadow-md">
//           <Icon size={20} className="text-white sm:hidden" />
//           <Icon size={24} className="text-white hidden sm:block" />
//         </div>

//         {/* Bottom Content */}
//         <div className="absolute bottom-0 w-full text-white p-3 sm:p-4">
//           <h1 className="text-base sm:text-lg font-bold mb-1 sm:mb-2 line-clamp-2">{data.name}</h1>
//           <p className="text-xs sm:text-sm leading-snug line-clamp-3">{data.description}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LogisticsCard;



import React from 'react';

const LogisticsCard = ({ data }) => {
  const Icon = data.icon;

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-8 bg-white shadow rounded-lg">
      <div
        className="group relative w-full max-w-[280px] mx-auto h-[300px] sm:h-[320px] md:h-[350px] lg:h-[350px] rounded-xl overflow-hidden shadow-lg bg-cover bg-center"
        style={{ backgroundImage: `url(${data.image})` }}
      >
        {/* Hover Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-500 z-10" />

        {/* Floating Icon */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-[#000080] rounded-full h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center z-20 shadow-md">
          <Icon className="text-white text-xl sm:text-2xl" />
        </div>

        {/* Bottom Content */}
        <div className="absolute bottom-0 w-full text-white p-3 sm:p-4 z-20">
          <h1 className="text-base sm:text-lg font-bold mb-1 sm:mb-2 line-clamp-2">{data.name}</h1>
          <p className="text-xs sm:text-sm leading-snug line-clamp-3">{data.description}</p>
        </div>
      </div>
    </div>
  );
};


export default LogisticsCard;
