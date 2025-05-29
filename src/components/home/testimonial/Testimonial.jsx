// import React from 'react'
// import TestimonialCarousel from '../../TestimonialCarousel'
// import TestimonialCard from '../../TestimonialCard';



// const Testimonial = () => {

//     const data = [
//       {
//         name: "John Doe",
//         image: pic1,
//         testimonial:
//           "Traveling was an unforgettable experience—every place I visited opened my eyes to new cultures, stunning landscapes, and amazing people.Traveling was an unforgettable experience—every place I visited opened my eyes to new cultures, stunning landscapes, and amazing people.",
//         rating: 5,
//         country: "USA",
//       },
//       {
//         name: "Jane Smith",
//         image: pic1,
//         testimonial:
//           "Traveling was an unforgettable experience—every place I visited opened my eyes to new cultures, stunning landscapes, and amazing people.Traveling was an unforgettable experience—every place I visited opened my eyes to new cultures, stunning landscapes, and amazing people.",
//         rating: 4,
//         country: "Tanzania",
//       },
//       {
//         name: "Michael Brown",
//         image: pic1,
//         testimonial:
//           "Traveling was an unforgettable experience—every place I visited opened my eyes to new cultures, stunning landscapes, and amazing people.        Traveling was an unforgettable experience—every place I visited opened my eyes to new cultures, stunning landscapes, and amazing people.",
//         rating: 5,
//         country: "Kenya",
//       },
//       {
//         name: "Alice Green",
//         image: pic1,
//         testimonial:
//           "Traveling was an unforgettable experience—every place I visited opened my eyes to new cultures, stunning landscapes, and amazing people.Traveling was an unforgettable experience—every place I visited opened my eyes to new cultures, stunning landscapes, and amazing people.",
//         rating: 5,
//         country: "Uganda",
//       },
//     ];

//   return (
//     <div className="w-screen-lg mx-auto px-4 py-8 h-[550px]">
//         {/* <p className='text-center'>Our Client Reviews</p> */}
//         <p className="text-center text-5xl text-[#000080] font-extrabold  mb-12">What Our Clients Say</p>
//         <>

//         <TestimonialCarousel component={TestimonialCard} items={data}/>
//         </>
//     </div>
//   )
// }

// export default Testimonial


import React from 'react';
import pic1 from "../../../assets/images/img5.jpeg"
import TestimonialCarousel from '../../TestimonialCarousel';
import TestimonialCard from '../../TestimonialCard';

const Testimonial = () => {
  const data = [
    {
      name: "John Doe",
      image: pic1,
      testimonial: "Traveling was an unforgettable experience—every place I visited opened my eyes to new cultures, stunning landscapes, and amazing people.Traveling was an unforgettable experience—every place I visited opened my eyes to new cultures, stunning landscapes, and amazing people.",
      rating: 5,
      country: "USA",
    },
    {
      name: "Jane Smith",
      image: pic1,
      testimonial: "Traveling was an unforgettable experience—every place I visited opened my eyes to new cultures, stunning landscapes, and amazing people.Traveling was an unforgettable experience—every place I visited opened my eyes to new cultures, stunning landscapes, and amazing people.",
      rating: 4,
      country: "Tanzania",
    },
    {
      name: "Michael Brown",
      image: pic1,
      testimonial: "Traveling was an unforgettable experience—every place I visited opened my eyes to new cultures, stunning landscapes, and amazing people.Traveling was an unforgettable experience—every place I visited opened my eyes to new cultures, stunning landscapes, and amazing people.",
      rating: 5,
      country: "Kenya",
    },
    {
      name: "Alice Green",
      image: pic1,
      testimonial: "Traveling was an unforgettable experience—every place I visited opened my eyes to new cultures, stunning landscapes, and amazing people.Traveling was an unforgettable experience—every place I visited opened my eyes to new cultures, stunning landscapes, and amazing people.",
      rating: 5,
      country: "Uganda",
    },
  ];

  return (
    <section className="w-screen-lg mx-auto px-4 py-8 h-[550px]">
      <p className="text-center text-5xl text-[#000080] font-extrabold mb-12">
        What Our Clients Say
      </p>
      <TestimonialCarousel component={TestimonialCard} items={data} />
    </section>
  );
};

export default Testimonial;
