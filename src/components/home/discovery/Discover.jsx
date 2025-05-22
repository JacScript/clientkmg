import React from 'react'
import Reveal from '../../Reveal'
import pic1 from '../../../assets/images/img5.jpeg';

function Discover() {
  return (
    <main className='h-[600px] w-screen  py-20'>
        <div className='w-3/4 mx-auto h-full px-6 flex items-center justify-between '>

        <div className='h-full w-1/2 text-[#000080] flex flex-col pt-10 px-12'>
            <Reveal>

           <p className='font-bold text-lg'>TIMELESS ADVENTURE</p>
            </Reveal>

            <Reveal delay={0.5}>
           <p className='font-black text-[70px]'>DISCOVER THE CITIES WITH KM TRAVEL & TOUR</p>
            </Reveal>

            <Reveal delay={1.3}>

           <p className='text-lg'>Journey across continents, cultures, and landscapes – because every path leads to a new discovery.</p>
            </Reveal>
        </div>
        <div className='h-full w-1/2 bg-amber-600'>
           <img src={pic1} alt="pic1" className='h-full w-full object-cover' />
        </div>
        </div>
    </main>
  )
}

export default Discover