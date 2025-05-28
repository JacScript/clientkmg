import React from 'react'
import Reveal from '../../Reveal'
import pic1 from '../../../assets/images/img19.jpg';
import FadeInImage from '../../FadeInImage';
import Link from '../../LinkComponent';

function Discover() {
  return (
    <main className='h-dvh w-screen  pt-20 '>
        <div className='w-3/4 mx-auto h-full px-6 flex items-center justify-between '>

        <div className='h-[90%] w-1/2 text-[#000080] flex flex-col px-12'>
            <Reveal>

           <p className='font-bold text-lg font-serif'>TIMELESS ADVENTURE</p>
            </Reveal>

            <Reveal delay={0.5}>
           <p className='font-black text-[70px] font-roboto'>DISCOVER THE CITIES WITH KM TRAVEL & TOUR</p>
            </Reveal>

            <Reveal delay={1.3}>

           <p className='text-lg font-serif'>Journey across continents, cultures, and landscapes – because every path leads to a new discovery.</p>
            </Reveal>

            <div className="flex justify-start mt-4">
           <Link
             href="#"
             className="px-[20px] py-[10px] border-2 border-[#000080] rounded-lg shadow-lg text-[20px] font-extrabold text-white bg-[#000080] hover:bg-[#000080d2] transition-all ease-in-out duration-500"
             title="Contact Us"
           />
         </div>
        </div>
        <div className='h-[90%] w-1/2'>
           <FadeInImage src={pic1} alt="pic1" className='w-full h-[90%] object-cover' />
        </div>
        </div>
    </main>
  )
}

export default Discover