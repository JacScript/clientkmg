import React from 'react'
import Reveal from '../../Reveal'
import pic1 from '../../../assets/images/img5.jpeg';
import FadeInImage from '../../FadeInImage';
import Link from '../../LinkComponent';

function Why() {
  return (
    <main className='h-dvh w-screen  pt-20'>
        <div className='w-3/4 mx-auto h-full px-6 flex items-center justify-between '>

        
        <div className='h-[90%] w-1/2'>
           <FadeInImage src={pic1} alt="pic1" className='h-[90%] w-full object-cover' />
        </div>

        <div className='h-full w-1/2 text-[#000080] flex flex-col px-12'>
            <Reveal>

           <p className='font-bold text-lg'>TIMELESS ADVENTURE</p>
            </Reveal>

            <Reveal delay={0.5}>
           <p className='font-black text-[70px]'>WHY 
           CHOOSE   KM TRAVEL & TOUR </p>
            </Reveal>

            <Reveal delay={1.3}>

           <p className='text-lg'>We go beyond just trips — we create experiences. With expertly curated itineraries, local insights, and a passion for discovery, we ensure every journey is safe, seamless, and unforgettable — whether you're exploring the cultural gems of France or beyond.</p>
            </Reveal>
            <div className="flex justify-start mt-4">
           <Link
             href="#"
             className="px-[20px] py-[10px] border-2 border-[#000080] rounded-lg shadow-lg text-[20px] font-extrabold text-white bg-[#000080] hover:bg-[#000080d2] transition-all ease-in-out duration-500"
             title="Contact Us"
           />
         </div>
        </div>
        </div>
    </main>
  )
}

export default Why