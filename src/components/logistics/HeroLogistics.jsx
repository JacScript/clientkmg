import React from "react";
import Link from "../LinkComponent";
import Reveal from "../Reveal";
import pic4 from "../../assets/images/container.png"
import FadeInImage from '../../components/FadeInImage';


const HeroLogistics = () => {
  return (
    <div className="h-screen pt-12 mt-34">
      <div className="flex w-3/4 h-[190px] mx-auto">
        <div className="flex w-2/3 pr-60">
        <Reveal delay={0.3}>
            <p className="text-6xl text-[#000080] font-bold">Let's Move your Business Forward</p>
        </Reveal>
        </div>
        <div className="w-1/3 px-10 pt-2">
          <div className="mb-4">
            <Reveal delay={0.6}>
            <p className="text-sm font-extrabold text-[#000080]">
              We provide comprehensive logistics solutions tailored to your business needs, ensuring timely and efficient delivery of goods across the globe.With us . you get precision, speed and confidence in every shipment.
            </p>
            </Reveal>
            
          </div>
          <div className="mt-4 w-full">
            <Link
              href="#"
              className="px-[20px] py-[10px] border-2 border-[#000080] rounded-lg shadow-lg text-[20px] font-extrabold text-white bg-[#000080] hover:bg-[#000080d2] transition-all ease-in-out duration-500"
              title="Contact Us"
            />
          </div>
        </div>
      </div>
      <div className="w-full h-[720px] object-fit">
                   <FadeInImage src={pic4} alt="pic1" className='h-[90%] w-full object-cover' />
        
      </div>
    </div>
  );
};

export default HeroLogistics;
