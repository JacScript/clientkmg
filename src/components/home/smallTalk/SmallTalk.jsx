// import React from 'react';
// import pic1 from '../../../assets/images/img5.jpeg';

// const SmallTalk = () => {
//   return (
//     <div
//       className="w-full max-h-[900px] bg-cover bg-center bg-no-repeat bg-fixed relative flex items-center justify-center text-white"
//       style={{
//         backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${pic1})`,
//       }}
//     >
//       <div className="text-4xl h-[900px] font-bold">Explore the charming streets and museums of France. Whether you're chasing history or adventure, we've got you covered. Let’s make memories together!</div>
//     </div>
//   );
// };

// export default SmallTalk;



import React from 'react';
import pic1 from '../../../assets/images/img5.jpeg';
import Reveal from '../../Reveal';

const SmallTalk = () => {
  return (
    <div
      className="w-full h-[600px] bg-cover bg-center bg-no-repeat bg-fixed relative flex items-center justify-center text-white"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${pic1})`,
      }}
    >
      <div className="text-6xl font-bold text-center w-3/4">
        <Reveal delay={0.5}>

       <p>
       Explore the charming streets and museums of France. Whether you're chasing history or adventure, we've got you covered. Let's make memories together!
        </p> 
        </Reveal>
      </div>
    </div>
  );
};

export default SmallTalk;