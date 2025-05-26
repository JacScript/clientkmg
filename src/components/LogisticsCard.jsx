import React from 'react';
import { MdOutlineMuseum } from "react-icons/md";

const LogisticsCard = ({ data }) => {
  return (

    <div className='p-12 bg-white shadow rounded-lg'>


    <div className="group relative w-[300px] h-[350px] rounded-xl overflow-hidden shadow-lg bg-cover bg-center"
      style={{ backgroundImage: `url(${data.image})` }}>
      
      {/* Hover Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-500" />
      
      {/* Floating Icon */}
      <div className="absolute top-4 left-4 bg-[#000080] rounded-full h-12 w-12 flex items-center justify-center z-10 shadow-md">
        <MdOutlineMuseum size={24} className="text-white" />
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-0 w-full bg-opacity-90 text-white p-4">
        <h1 className="text-lg font-bold mb-2">{data.name}</h1>
        <p className="text-sm leading-snug">{data.description}</p>
      </div>
    </div>
    </div>
  );
};

export default LogisticsCard;
