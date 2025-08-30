// import React from "react";
// import Hero from "../components/home/hero/Hero";
// import Discovery from "../components/home/discovery/Discover";
// import SendRequestForm from "./SendRequestForm";

// const CombineHomeAndDiscovery = () => {
//   return (

//        <div className="relative">
//       {/* Hero Section */}
//       <Hero />
      
//       {/* Floating Form - Properly Positioned */}
//       <div className="relative -mt-16 sm:-mt-20 md:-mt-24 lg:-bottom-10 z-50 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-6xl mx-auto">
//           <SendRequestForm />
//         </div>
//       </div>
      
//       {/* Discovery Section with proper spacing */}
//       <div className="pt-1 sm:pt-1 md:pt-16 lg:pt-20 bg-amber-400">
//         <Discovery />
//       </div>
//     </div>
   
//   );
// };

// export default CombineHomeAndDiscovery;


import React from "react";
import Hero from "../components/home/hero/Hero";
import Discovery from "../components/home/discovery/Discover";
import SendRequestForm from "./SendRequestForm";

const CombineHomeAndDiscovery = () => {
  return (
    <div className="relative">
      {/* Hero Section */}
      <Hero />

      {/* Floating Form */}
      <div className="relative -mt-20 md:-mt-24 lg:-mt-60 z-20 px-4 sm:px-6 lg:px-8 lg:mb-44">
        <div className="max-w-6xl mx-auto">
          <SendRequestForm />
        </div>
      </div>

      {/* Discovery Section */}
      <div className="pt-16">
        <Discovery />
      </div>
    </div>
  );
};

export default CombineHomeAndDiscovery;
