// import React from 'react'
// import HeroLogistics from '../components/logistics/HeroLogistics'
// import WhyLogistics from '../components/logistics/WhyLogistics'
// import pic1 from "../assets/images/container.png"
// import LogisticsCard from '../components/LogisticsCard'


// const Logistics = () => {
//   const data = [
//     {
//       id: 1,
//       name: "Retail & E-commerce",
//       description: "We specialize in streamlined, end-to-end logistics solutions tailored specifically for the fast-paced demands of modern retail and online stores.",
//       image: pic1
//     },
//     {
//       id: 2,
//       name: "Manufacturing & Distribution",
//       description: "Our logistics services are designed to optimize your supply chain, ensuring timely delivery of raw materials and finished goods.",
//       image: pic1
//     },
//     {
//       id: 3,
//       name: "Healthcare & Pharmaceuticals",
//       description: "We provide specialized logistics solutions for the healthcare sector, ensuring the safe and timely delivery of critical medical supplies.",
//       image: pic1
//     },
//     {
//       id: 4,
//       name: "Food & Beverage",
//       description: "Our logistics services ensure the safe and efficient transportation of perishable goods, maintaining quality and freshness.",
//       image:pic1
//     }
//   ];
//   return (
//     <main className='max-w-screen scrollbar-hide"'>
//         {/* hero */}
//         <HeroLogistics/>

//         {/* why section */}
//         <WhyLogistics />
//     </main>
//   )
// }

// export default Logistics


// import React from 'react';
// import HeroLogistics from '../components/logistics/HeroLogistics';
// import WhyLogistics from '../components/logistics/WhyLogistics';
// import TestimonialCarousel from '../components/TestimonialCarousel';
// import LogisticsCard from '../components/LogisticsCard';
// import pic1 from "../assets/images/container.png";

// const Logistics = () => {
//   const data = [
//     {
//       id: 1,
//       name: "Retail & E-commerce",
//       description: "We specialize in streamlined, end-to-end logistics solutions tailored specifically for the fast-paced demands of modern retail and online stores.",
//       image: pic1
//     },
//     {
//       id: 2,
//       name: "Manufacturing & Distribution",
//       description: "Our logistics services are designed to optimize your supply chain, ensuring timely delivery of raw materials and finished goods.",
//       image: pic1
//     },
//     {
//       id: 3,
//       name: "Healthcare & Pharmaceuticals",
//       description: "We provide specialized logistics solutions for the healthcare sector, ensuring the safe and timely delivery of critical medical supplies.",
//       image: pic1
//     },
//     {
//       id: 4,
//       name: "Food & Beverage",
//       description: "Our logistics services ensure the safe and efficient transportation of perishable goods, maintaining quality and freshness.",
//       image: pic1
//     }
//   ];

//   return (
//     <main className="max-w-screen scrollbar-hide">
//       {/* Hero Section */}
//       <HeroLogistics />

//       {/* Why Logistics Section */}
//       <WhyLogistics />

//     </main>
//   );
// };

// export default Logistics;

import React from 'react';
import HeroLogistics from '../components/logistics/HeroLogistics';
import WhyLogistics from '../components/logistics/WhyLogistics';
import Solution from '../components/logistics/Solution';

const Logistics = () => {
  return (
    <main className="max-w-screen scrollbar-hide">
      <HeroLogistics />
      <WhyLogistics />
      <Solution/>
    </main>
  );
};

export default Logistics;

