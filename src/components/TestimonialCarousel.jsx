// import React from "react";
// import pic1 from "../assets/images/img5.jpeg";
// import Slider from "react-slick";

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const TestimonialCarousel = () => {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     initialSlide: 0,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 3,
//           infinite: true,
//           dots: true,
//         },
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 2,
//           initialSlide: 2,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   };

//   const data = [
//     {
//       name: "John Doe",
//       image: pic1,
//       testimonial:
//         "Traveling was an unforgettable experience—every place I visited opened my eyes to new cultures, stunning landscapes, and amazing people.Traveling was an unforgettable experience—every place I visited opened my eyes to new cultures, stunning landscapes, and amazing people.",
//       rating: 5,
//       country: "USA",
//     },
//     {
//       name: "Jane Smith",
//       image: pic1,
//       testimonial:
//         "Traveling was an unforgettable experience—every place I visited opened my eyes to new cultures, stunning landscapes, and amazing people.Traveling was an unforgettable experience—every place I visited opened my eyes to new cultures, stunning landscapes, and amazing people.",
//       rating: 4,
//       country: "Tanzania",
//     },
//     {
//       name: "Michael Brown",
//       image: pic1,
//       testimonial:
//         "Traveling was an unforgettable experience—every place I visited opened my eyes to new cultures, stunning landscapes, and amazing people.        Traveling was an unforgettable experience—every place I visited opened my eyes to new cultures, stunning landscapes, and amazing people.",
//       rating: 5,
//       country: "Kenya",
//     },
//     {
//       name: "Alice Green",
//       image: pic1,
//       testimonial:
//         "Traveling was an unforgettable experience—every place I visited opened my eyes to new cultures, stunning landscapes, and amazing people.Traveling was an unforgettable experience—every place I visited opened my eyes to new cultures, stunning landscapes, and amazing people.",
//       rating: 5,
//       country: "Uganda",
//     },
//   ];

//   return (
//     <div className="w-3/4 mx-auto px-4">
//       <Slider {...settings}>
//         {data.map((d, idx) => (
//           <div key={idx} className="relative w-[400px] h-[350px]">
//             {/* Floating comma outside the card */}
//             <div className="absolute -top-5 -right-4 text-[#000080] text-6xl z-20">
//               ❞
//             </div>

//             {/* Testimonial Card */}
//             <div className="relative bg-[#8B2614] text-white h-full w-full rounded-lg p-4 overflow-hidden">
//               <div className="flex items-center">
//                 <img
//                   src={d.image}
//                   alt={d.name}
//                   className="w-20 h-20 rounded-full object-cover"
//                 />
//                 <div className="ml-4 space-y-2">
//                   <p className="text-xl font-bold">{d.name}</p>
//                   <p className="text-sm font-bold text-gray-200">{d.country}</p>
//                 </div>
//               </div>

//               <div className="mt-4">
//                 <p className="mb-4 text-base">{d.testimonial}</p>
//                 <div className="flex">
//                   {[...Array(d.rating)].map((_, i) => (
//                     <div key={i} className="text-yellow-500 text-3xl mr-1">
//                       &#9733;
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// };




  // <div key={idx} className="relative w-[400px] h-[350px]">
          //   {/* Floating comma outside the card */}
          //   <div className="absolute -top-5 -right-4 text-[#000080] text-6xl z-20">
          //     ❞
          //   </div>

          //   {/* Testimonial Card */}
          //   <div className="relative bg-[#8B2614] text-white h-full w-full rounded-lg p-4 overflow-hidden">
          //     <div className="flex items-center">
          //       <img
          //         src={d.image}
          //         alt={d.name}
          //         className="w-20 h-20 rounded-full object-cover"
          //       />
          //       <div className="ml-4 space-y-2">
          //         <p className="text-xl font-bold">{d.name}</p>
          //         <p className="text-sm font-bold text-gray-200">{d.country}</p>
          //       </div>
          //     </div>

          //     <div className="mt-4">
          //       <p className="mb-4 text-base">{d.testimonial}</p>
          //       <div className="flex">
          //         {[...Array(d.rating)].map((_, i) => (
          //           <div key={i} className="text-yellow-500 text-3xl mr-1">
          //             &#9733;
          //           </div>
          //         ))}
          //       </div>
          //     </div>
          //   </div>
          // </div>

// export default TestimonialCarousel;


// import React from "react";
// import pic1 from "../assets/images/img5.jpeg";
// import Slider from "react-slick";
// import { motion } from "framer-motion";

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import TestimonialCard from "./TestimonialCard";

// const TestimonialCarousel = ({component, items}) => {
//   const Component = component;
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     initialSlide: 0,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: { slidesToShow: 3, slidesToScroll: 3, infinite: true, dots: true },
//       },
//       {
//         breakpoint: 600,
//         settings: { slidesToShow: 2, slidesToScroll: 2, initialSlide: 2 },
//       },
//       {
//         breakpoint: 480,
//         settings: { slidesToShow: 1, slidesToScroll: 1 },
//       },
//     ],
//   };

//    const data = [
//     {
//       name: "John Doe",
//       image: pic1,
//       testimonial:
//         "Traveling was an unforgettable experience—every place I visited opened my eyes to new cultures, stunning landscapes, and amazing people.Traveling was an unforgettable experience—every place I visited opened my eyes to new cultures, stunning landscapes, and amazing people.",
//       rating: 5,
//       country: "USA",
//     },
//     {
//       name: "Jane Smith",
//       image: pic1,
//       testimonial:
//         "Traveling was an unforgettable experience—every place I visited opened my eyes to new cultures, stunning landscapes, and amazing people.Traveling was an unforgettable experience—every place I visited opened my eyes to new cultures, stunning landscapes, and amazing people.",
//       rating: 4,
//       country: "Tanzania",
//     },
//     {
//       name: "Michael Brown",
//       image: pic1,
//       testimonial:
//         "Traveling was an unforgettable experience—every place I visited opened my eyes to new cultures, stunning landscapes, and amazing people.        Traveling was an unforgettable experience—every place I visited opened my eyes to new cultures, stunning landscapes, and amazing people.",
//       rating: 5,
//       country: "Kenya",
//     },
//     {
//       name: "Alice Green",
//       image: pic1,
//       testimonial:
//         "Traveling was an unforgettable experience—every place I visited opened my eyes to new cultures, stunning landscapes, and amazing people.Traveling was an unforgettable experience—every place I visited opened my eyes to new cultures, stunning landscapes, and amazing people.",
//       rating: 5,
//       country: "Uganda",
//     },
//   ];

//   return (
//     <motion.div
//   className="w-3/4 mx-auto px-4"
//   initial={{ opacity: 0, scale: 0.5 }}
//   animate={{ opacity: 1, scale: 1 }}
//   transition={{
//     duration: 1,
//     delay: 0.2,
//     ease: "easeOut",
//   }}
// >
//       <Slider {...settings}>
//         {items.map((d, idx) => {
//               return (

//                 <Component key={idx} className={d.className} data={d}/>
                 
//               )
//         }

          
//         )}
//       </Slider>
//     </motion.div>
//   );
// };


import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TestimonialCarousel = ({ component: Component, items }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3, slidesToScroll: 3, infinite: true, dots: true },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2, slidesToScroll: 2, initialSlide: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <motion.div
      className="w-3/4 mx-auto px-4"
      initial={{ opacity: 0, scale: 0.5, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
    >
      <Slider {...settings}>
        {items.map((item, idx) => (
          <Component key={idx} data={item} />
        ))}
      </Slider>
    </motion.div>
  );
};

export default TestimonialCarousel;

