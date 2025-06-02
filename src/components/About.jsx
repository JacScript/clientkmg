// import { BsPatchCheckFill } from "react-icons/bs";
// import React from "react";
// import pic from "../../../assets/images/img17.jpg";
// import pic0 from "../../../assets/images/img16.jpg";
// import Reveal from "../../Reveal";
// import FadeInImage from "../../FadeInImage";
// import FloatingTextBox from "../../FloatingTextBox";

// const About = () => {
//   const infos = [
//     {
//       id: 1,
//       title: "Safety first always",
//       description: "Prioritizing your safety every step of the journey.",
//     },
//     {
//       id: 2,
//       title: "Low price & friendly",
//       description:
//         "Offering low prices and friendly service for all your travel needs.",
//     },
//     {
//       id: 3,
//       title: "Trusted travel & tour guide",
//       description:
//         "Your trusted travel & tour guide for unforgettable journeys.",
//     },
//   ];

//   return (
//     <section className="lg:h-dvh max-w-screen bg-blue-100 py-10">
//       {/* <Reveal> */}
//         <h1 className=" text-2xl xl:text-5xl text-[#000080] font-extrabold text-center mb-10">
//           About Us
//         </h1>
//       {/* </Reveal> */}
//       <div className="w-screen xl:w-3/4 h-[80%] flex max-lg:flex-col items-center justify-center mx-auto">
//         {/* LEFT IMAGE SIDE */}
//         <div className="w-[80%] mx-auto lg:w-1/2 h-[500px] lg:h-full relative lg:mx-8">
//           <div className="w-[100%] max-md:flex max-md:justify-center h-full relative">
//             {/* Main Image */}
//             <FadeInImage
//               src={pic}
//               alt="About Us"
//               className="w-[70%] md:w-full h-[80%] object-cover"
//               delay={0.1}
//               direction="up"
//             />

//             {/* Floating Image */}
//             <div className="absolute md:-left-20 md:-bottom-5 bottom-10 left-5 w-30 h-30 md:w-70 md:h-70 opacity-100">
//               <FadeInImage
//                 src={pic0}
//                 alt="Floating Decoration"
//                 className="w-full h-full object-cover hover:scale-[1.05] transition-transform duration-300"
//                 delay={0.3}
//                 direction="left"
//               />
//             </div>

//             {/* Floating Text Box */}
//             <FloatingTextBox number="10+" text="Years of experience" />
//           </div>
//         </div>

//         {/* RIGHT TEXT SIDE */}
//         <div className="lg:w-1/2 h-full p-0 md:pt-10 lg:pt-0">
//           <div className="px-6">
//             <h2 className="text-4xl font-bold text-[#000080] mb-4">
//               Great opportunity for tour & travels
//             </h2>
//             <ul className="mt-4 space-y-4 pl-4">
//               {infos.map((info, idx) => (
//                 <li key={idx} className="flex items-center mb-8 py-2">
//                   <span className="mx-6">
//                     <BsPatchCheckFill className="text-[#000080]" size={30} />
//                   </span>
//                   <div>
//                     <Reveal delay={0.4}>
//                       <p className="font-bold text-2xl">{info.title}</p>
//                     </Reveal>
//                     <Reveal delay={0.6}>
//                       <p className="text-lg text-slate-700">
//                         {info.description}
//                       </p>
//                     </Reveal>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default About;


// import { BsPatchCheckFill } from "react-icons/bs";
// import React from "react";
// import pic from "../../../assets/images/img17.jpg";
// import pic0 from "../../../assets/images/img16.jpg";
// import Reveal from "../../Reveal";
// import FadeInImage from "../../FadeInImage";
// import FloatingTextBox from "../../FloatingTextBox";

// const About = () => {
//   const infos = [
//     {
//       id: 1,
//       title: "Safety first always",
//       description: "Prioritizing your safety every step of the journey.",
//     },
//     {
//       id: 2,
//       title: "Low price & friendly",
//       description:
//         "Offering low prices and friendly service for all your travel needs.",
//     },
//     {
//       id: 3,
//       title: "Trusted travel & tour guide",
//       description:
//         "Your trusted travel & tour guide for unforgettable journeys.",
//     },
//   ];

//   return (
//     <section className="bg-blue-100 py-12 px-4 sm:px-6 lg:px-12 xl:px-20">
//       <h1 className="text-3xl sm:text-4xl lg:text-5xl text-[#000080] font-extrabold text-center mb-12">
//         About Us
//       </h1>

//       <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
//         {/* LEFT IMAGE SIDE */}
//         <div className="w-full lg:w-1/2 relative">
//           <div className="relative w-full flex justify-center items-center">
//             <FadeInImage
//               src={pic}
//               alt="About Us"
//               className="w-full h-auto max-h-[500px] object-cover rounded-xl shadow"
//               delay={0.1}
//               direction="up"
//             />

//             {/* Floating Decoration Image */}
//             <div className="max-lg:hidden absolute bottom-4 left-4 md:-bottom-6 md:-left-10 w-32 h-32 md:w-40 md:h-40">
//               <FadeInImage
//                 src={pic0}
//                 alt="Floating Decoration"
//                 className="w-full h-full object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
//                 delay={0.3}
//                 direction="left"
//               />
//             </div>

//             {/* Floating Text Box */}
//             <FloatingTextBox number="10+" text="Years of experience" />
//           </div>
//         </div>

//         {/* RIGHT TEXT SIDE */}
//         <div className="w-full lg:w-1/2">
//           <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#000080] mb-6">
//             Great opportunity for tour & travels
//           </h2>

//           <ul className="space-y-6">
//             {infos.map((info, idx) => (
//               <li key={idx} className="flex items-start gap-4">
//                 <BsPatchCheckFill className="text-[#000080] min-w-[24px] mt-1" size={24} />
//                 <div>
//                   <Reveal delay={0.4}>
//                     <p className="font-semibold text-lg sm:text-xl">{info.title}</p>
//                   </Reveal>
//                   <Reveal delay={0.6}>
//                     <p className="text-base text-slate-700">{info.description}</p>
//                   </Reveal>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default About;
import { BsPatchCheckFill } from "react-icons/bs";
import React from "react";
import pic from "../assets/images/img17.jpg";
import pic0 from "../assets/images/img16.jpg";
import Reveal from "./Reveal";
import FadeInImage from "./FadeInImage";
import FloatingTextBox from "./FloatingTextBox";

const About = () => {
  const infos = [
    {
      id: 1,
      title: "Safety first always",
      description: "Prioritizing your safety every step of the journey.",
    },
    {
      id: 2,
      title: "Low price & friendly",
      description:
        "Offering low prices and friendly service for all your travel needs.",
    },
    {
      id: 3,
      title: "Trusted travel & tour guide",
      description:
        "Your trusted travel & tour guide for unforgettable journeys.",
    },
  ];

  return (
    <section className="min-h-screen lg:h-dvh w-full bg-blue-100 py-8 sm:py-12 lg:py-16">
      {/* <Reveal> */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl text-[#000080] font-extrabold text-center mb-8 sm:mb-10 lg:mb-12 px-4">
          About Us
        </h1>
      {/* </Reveal> */}
      
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 xl:gap-16">
          
          {/* LEFT IMAGE SIDE */}
          <div className="w-full lg:w-1/2 max-w-lg lg:max-w-none">
            <div className="relative h-[400px] sm:h-[450px] md:h-[500px] lg:h-[600px] w-full">
              {/* Main Image */}
              <div className="relative w-full h-full flex justify-center lg:justify-start">
                <FadeInImage
                  src={pic}
                  alt="About Us"
                  className="w-[85%] sm:w-[80%] lg:w-full h-[85%] object-cover rounded-lg shadow-lg"
                  delay={0.1}
                  direction="up"
                />
              </div>

              {/* Floating Image */}
              <div className="absolute bottom-4 left-2 sm:bottom-6 sm:left-4 lg:bottom-8 lg:-left-16 xl:-left-20 w-36 h-40 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-48 xl:h-48">
                <FadeInImage
                  src={pic0}
                  alt="Floating Decoration"
                  className="w-full h-full object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300 border-6 border-white"
                  delay={0.3}
                  direction="left"
                />
              </div>

              {/* Floating Text Box */}
              <FloatingTextBox number="10+" text="Years of experience" />
            </div>
          </div>

          {/* RIGHT TEXT SIDE */}
          <div className="w-full lg:w-1/2 max-w-lg lg:max-w-none lg:px-20 lg:pb-20">
            <div className="px-4 sm:px-6 lg:px-0">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#000080] mb-6 sm:mb-8 text-center lg:text-left leading-tight">
                Great opportunity for tour & travels
              </h2>
              
              <ul className="space-y-6 sm:space-y-8">
                {infos.map((info, idx) => (
                  <li key={idx} className="flex items-start gap-4 sm:gap-6">
                    <div className="flex-shrink-0 mt-1">
                      <BsPatchCheckFill className="text-[#000080] w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
                    </div>
                    <div className="flex-1">
                      <Reveal delay={0.4}>
                        <h3 className="font-bold text-lg sm:text-xl lg:text-2xl text-[#000080] mb-2">
                          {info.title}
                        </h3>
                      </Reveal>
                      <Reveal delay={0.6}>
                        <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                          {info.description}
                        </p>
                      </Reveal>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;