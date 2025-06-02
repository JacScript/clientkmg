import React from 'react';

const AboutUsHeader = () => {
  return (
    <div className="relative w-full h-64 bg-gradient-to-r from-[#000080c5] to-[#000080] overflow-hidden mt-34">
      {/* Background Pattern/Overlay */}
      <div className="absolute inset-0 bg-blue-700/50">
        {/* Decorative geometric shapes */}
        <div className="absolute top-8 left-10 w-16 h-16 bg-blue-500/30 rounded-lg transform rotate-12"></div>
        <div className="absolute top-12 right-20 w-12 h-12 bg-blue-400/40 rounded-full"></div>
        <div className="absolute bottom-10 left-1/4 w-20 h-20 bg-blue-600/30 rounded-lg transform -rotate-45"></div>
        <div className="absolute bottom-16 right-1/3 w-14 h-14 bg-blue-500/35 rounded-full"></div>
        
        {/* Abstract book/learning elements */}
        <div className="absolute top-6 right-10 w-8 h-12 bg-white/20 rounded-sm transform rotate-12"></div>
        <div className="absolute top-8 right-8 w-8 h-12 bg-white/15 rounded-sm transform rotate-6"></div>
        <div className="absolute bottom-8 left-16 w-10 h-6 bg-white/25 rounded-sm"></div>
        
        {/* Additional decorative elements */}
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-blue-500/20 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-20 left-1/3 w-6 h-6 bg-orange-400/60 rounded-full"></div>
        <div className="absolute bottom-12 right-1/4 w-4 h-4 bg-yellow-400/50 rounded-full"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-center drop-shadow-lg">
          About Us
        </h1>
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-sm md:text-base">
          <a 
            href="/" 
            className="text-white/80 hover:text-white transition-colors duration-200 font-medium"
          >
            Home
          </a>
          <span className="text-white/60 mx-2">/</span>
          <a 
            href="/pages" 
            className="text-white/80 hover:text-white transition-colors duration-200 font-medium"
          >
            Pages
          </a>
          <span className="text-white/60 mx-2">/</span>
          <span className="text-orange-400 font-semibold">
            About
          </span>
        </nav>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg 
          className="w-full h-8 text-white/10" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
};

export default AboutUsHeader;