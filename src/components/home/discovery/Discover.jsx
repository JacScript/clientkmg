import React from 'react'
import Reveal from '../../Reveal'
import pic1 from '../../../assets/images/img19.jpg';
import FadeInImage from '../../FadeInImage';
import Link from '../../LinkComponent';

function Discover() {
  return (
    <section className='h-dvh w-screen pt-20 '>
        <div className='xl:w-3/4 w-full  xl:mx-auto h-full px-6 flex max-lg:flex-col items-center'>

        <div className='max-lg:h-[90%] lg:w-1/2 w-screen text-[#000080]  max-lg:px-12  items-center'>
            <Reveal>

           <p className='font-bold text-lg font-serif max-lg:py-5 w-full'>TIMELESS ADVENTURE</p>
            </Reveal>

            <Reveal delay={0.5}>
           <p className='font-black max-lg:text-2xl text-[60px] font-roboto max-md:mb-6'>DISCOVER THE CITIES WITH KM TRAVEL & TOUR</p>
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
        <div className='h-[90%] flex items-center lg:w-1/2 w-screen  max-md:mt-6 mt-8 '>
           <FadeInImage src={pic1} alt="pic1" className='w-full h-[80%] object-cover' />
        </div>
        </div>
    </section>
  )
}

export default Discover