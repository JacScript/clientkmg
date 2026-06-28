

// import React from "react";
// import Hero from "../components/home/hero/Hero";
// import Discovery from "../components/home/discovery/Discover";
// import SendRequestForm from "./SendRequestForm";

// const CombineHomeAndDiscovery = ({data}) => {
//   return (
//     <div className="relative">
//       {/* Hero Section */}
//       <Hero res={data?.heroSection} />

//       {/* Floating Form */}
//       <div className="relative -mt-20 md:-mt-24 lg:-mt-60 z-20 px-4 sm:px-6 lg:px-8 lg:mb-44">
//         <div className="max-w-6xl mx-auto">
//           <SendRequestForm />
//         </div>
//       </div>

//       {/* Discovery Section */}
//       <div className="pt-16">
//         <Discovery res={data?.discoverSection} />
//       </div>
//     </div>
//   );
// };

// export default CombineHomeAndDiscovery;



import React from "react";
import Hero from "../components/home/hero/Hero";
import Discovery from "../components/home/discovery/Discover";
import SendRequestForm from "./SendRequestForm";

const CombineHomeAndDiscovery = ({data}) => {
  return (
    <div className="relative">
      {/* Hero Section */}
      <Hero res={data?.heroSection} />

      {/* Floating Form */}
      <div className="relative -mt-20 md:-mt-24 lg:-mt-60 z-20 px-4 sm:px-6 lg:px-8 lg:mb-44">
        <div className="max-w-6xl mx-auto">
          <SendRequestForm searchBar={data?.heroSection?.searchBar} />
        </div>
      </div>

      {/* Discovery Section */}
      <div className="pt-16">
        <Discovery res={data?.discoverSection} />
      </div>
    </div>
  );
};

export default CombineHomeAndDiscovery;