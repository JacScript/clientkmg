import React from 'react'
import Reveal from '../Reveal'
import Link from '../LinkComponent'


const IntroText = () => {
  return (
 <div>
 
         <div className="flex justify-center">
           <Reveal delay={0.3}>
             <p className="text-center lg:text-xl text-sm font-serif font-extrabold text-white">
               YOUR OFFICIAL FRANCE TRAVEL AND TOUR GUIDE
             </p>
           </Reveal>
         </div>
 
         <div className="flex justify-center">
           <Reveal delay={1.3}>
             <p className="uppercase text-[#000080] text-4xl md:text-6xl font-extrabold text-center lg:text-[120px] font-roboto lg:font-bold p-0">
               explore france
             </p>
           </Reveal>
         </div>
 
         <div className="flex justify-center mt-4">
           <Link
             href="#"
             className="px-2 py-1 lg:px-[20px] lg:py-[10px] border-2 border-[#000080] rounded-lg shadow-lg text-[20px] font-extrabold text-[#000080] bg-transparent hover:text-white hover:bg-[#000080] transition-all ease-in-out duration-500"
             title="Find out More"
           />
         </div>
       </div>
  )
}

export default IntroText