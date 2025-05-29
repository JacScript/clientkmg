import React from 'react'
import Link from '../../LinkComponent'
import pic1 from '../../../assets/images/louvre.jpg'; // Example image, replace with your own
import pic2 from '../../../assets/images/champagne.jpg';
import pic3 from '../../../assets/images/eiffel2.jpg';
import pic4 from '../../../assets/images/img12.jpg';


const FeatureTour = () => {
 
     const items = [
       {
         pic: pic1,
       },

       {
         pic: pic2,
       },

       {
         pic: pic3,
       },

       {
         pic: pic4,
       },
     ];


  return (
    <section className='xl:h-dvh w-screen pt-20 flex items-center justify-center'>
        <div className='xl:w-3/4 w-[95%] h-full flex flex-col items-center justify-center xl:p-6'>
        <div className='w-full h-full '>

            <div className='w-full mb-4  flex flex-col items-center'>
                <p className='px-4 py-2 bg-[#00008069] shadow rounded-lg w-40 font-bold text-[#000080] text-center mb-4'>Feature Tour</p>
                <h1 className='text-5xl text-[#000080] font-extrabold text-center mb-10'>Amazing Tour Places</h1>
            </div>
 
            {/* <div className="mt-4 max-md:w-full mb-6 grid grid-cols-1 md:grid-cols-2 md:px-2 py-4 space-y-4 items-center"> */}
            <div className="mt-4 max-xl:w-full mb-6 grid grid-cols-1 md:grid-cols-2 md:px-2 py-4 space-y-4 place-items-center md:place-items-start xl:grid-cols-4">


                {/* < className="mt-4 mb-6 flex items-center justify-center space-x-4 px-2 py-4"> */}
                { items.map((item, idx) => {
                    return (
                        <div
                        className="relative  sm:h-[400px] sm:w-[300px] lg:h-[220px] lg:w-[320px] xl:h-[400px] xl:w-[300px] rounded-xl shadow-lg overflow-hidden bg-cover bg-center group"
                        style={{ backgroundImage: `url(${item.pic})` }}
                      >
                        {/* Overlay to dim background on hover (optional) */}
                        <div className="absolute inset-0  opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                        {/* Featured label appears on hover */}
                        <h1 className="absolute top-4 left-4 text-white text-sm font-bold bg-[#000080cc] px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition duration-500 z-10">
                          Featured
                        </h1>
                
                        {/* Centered Link button appears on hover */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500 z-10">
                          <Link
                            href="#"
                            className="px-5 py-2 text-white text-lg font-bold rounded-lg bg-[#000080] hover:bg-[#000080d2] transition-all duration-500"
                            title="Book Now"
                          />
                        </div>
                      </div>
                    )
                })}
     
    </div>
        </div>
        </div>
    </section>
  )
}

export default FeatureTour