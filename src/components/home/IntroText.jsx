import React from 'react'
import Reveal from '../Reveal'
import Link from '../LinkComponent'


const IntroText = () => {
  return (
 <div>
 
         <div className="flex justify-center">
           <Reveal delay={0.3}>
             <p className="text-center text-xl font-extrabold text-white">
               YOUR OFFICIAL TRAVEL AND TOUR GUIDE
             </p>
           </Reveal>
         </div>
 
         <div className="flex justify-center">
           <Reveal delay={1.3}>
             <p className="uppercase text-[#000080] text-center text-[200px] font-medium p-0">
               explore
             </p>
           </Reveal>
         </div>
 
         <div className="flex justify-center mt-4">
           <Link
             href="#"
             className="px-[20px] py-[10px] border-2 border-[#000080] rounded-lg shadow-lg text-[20px] font-extrabold text-[#000080] bg-transparent hover:text-white hover:bg-[#000080] transition-all ease-in-out duration-500"
             title="Find out More"
           />
         </div>
       </div>
  )
}

export default IntroText