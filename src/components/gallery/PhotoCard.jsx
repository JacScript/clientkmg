import React from 'react';
// import { Heart, Share2, Download } from 'lucide-react';
import { CiHeart } from "react-icons/ci";
import { LuShare2 } from "react-icons/lu";
import { IoDownloadOutline } from "react-icons/io5";

const PhotoCard  = ({ src, alt, title, description }) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] bg-white">
      <div className="relative overflow-hidden">
        <img
          src={src}
          alt={alt}
          className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Action buttons overlay */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors duration-200">
            <CiHeart className="w-4 h-4 text-gray-700 hover:text-red-500 transition-colors" />
          </button>
          <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors duration-200">
            <LuShare2 className="w-4 h-4 text-gray-700 hover:text-blue-500 transition-colors" />
          </button>
          <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors duration-200">
            <IoDownloadOutline className="w-4 h-4 text-gray-700 hover:text-green-500 transition-colors" />
          </button>
        </div>
      </div>
      
      {/* Content overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-xl font-bold mb-2 tracking-tight">{title}</h3>
          {description && (
            <p className="text-sm text-gray-200 opacity-90 leading-relaxed">{description}</p>
          )}
          <div className="flex items-center mt-4 pt-4 border-t border-white/20">
           
          
          </div>
        </div>
      </div>

      {/* Subtle border animation */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-purple-500/20 transition-all duration-300"></div>
    </div>
  );
};

export default PhotoCard;