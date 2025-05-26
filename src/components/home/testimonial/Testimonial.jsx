import React from 'react'
import TestimonialCarousel from '../../TestimonialCarousel'

const Testimonial = () => {
  return (
    <div className="w-screen-lg mx-auto px-4 py-8 h-[550px]">
        {/* <p className='text-center'>Our Client Reviews</p> */}
        <p className="text-center text-5xl text-[#000080] font-extrabold  mb-12">What Our Clients Say</p>
        <>

        <TestimonialCarousel/>
        </>
    </div>
  )
}

export default Testimonial