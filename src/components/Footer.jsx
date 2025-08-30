import React from 'react'
import IconComponent from './IconComponent'
import { FaXTwitter,FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa6";


const Footer = () => {
  return (
    <footer className='w-full bg-[#068DDE] text-white py-4 flex justify-between items-center px-6'>
        <div className='flex items-center'>
        <p className='border-r-2 border-r-[#000080] flex items-center pr-4'> <span className='text-xl mr-2'> 	&copy; </span>2025 KM Group. All rights reserved.</p>
           
           <p className='ml-4 flex items-center max-lg:hidden'>Privacy Policy | Terms of Service</p>
        </div>
        <div className="flex  space-x-4 text-white max-lg:hidden">
             <IconComponent link="https://wa.me/33771948786?text=Hello" icon={FaWhatsapp}/>
              <IconComponent link="#" icon={FaXTwitter}/>
              <IconComponent className='cursor-pointer' link="http://instagram.com/kmgroup.travel_and_tours/" icon={FaInstagram}/>
                {/* <IconComponent href="#" icon={FaFacebook}/> */}
            </div>
    </footer>
  )
}

export default Footer