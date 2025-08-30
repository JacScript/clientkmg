import React, { useState, useEffect } from 'react';
import Link from '../LinkComponent';

const AmazingLogisticsHero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Auto-rotating features
  const features = [
    { icon: "🚚", text: "Fast Delivery" },
    { icon: "🌍", text: "Global Network" },
    { icon: "📦", text: "Secure Packaging" },
    { icon: "⚡", text: "Express Service" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleWhatsAppClick = () => {
    // IMPORTANT: Replace 'YOUR_PHONE_NUMBER' with your actual WhatsApp phone number
    const phoneNumber = '33771948786'; // Example number for Tanzania
    const message = encodeURIComponent("Hello, I would like to inquire about your logistics services.");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden mt-40" >
      {/* Background Image Container */}
      {/* Ensure your image path is correct, e.g., /public/images/logistics-hero-bg.jpg */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/images/logistics-hero-bg.jpg')` }}
      >
        {/* Linear Gradient Overlay */}
        {/* This creates a dark, semi-transparent overlay to make text more readable */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 opacity-90"></div>
      </div>

      {/* Dynamic Background Effects (placed above the base image but still behind content) */}
      <div className="absolute inset-0 z-10">
        {/* Mouse-following gradient */}
        <div
          className="absolute inset-0 opacity-20 transition-all duration-700"
          style={{
            background: `radial-gradient(800px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(96, 165, 250, 0.3), transparent 50%)`
          }}
        />

        {/* Animated geometric shapes - Adjust sizes and positions for smaller screens */}
        <div className="absolute top-10 right-5 w-32 h-32 md:w-64 md:h-64 bg-blue-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 left-5 w-48 h-48 md:w-80 md:h-80 opacity-10 rounded-full blur-3xl animate-float-delayed" style={{ backgroundColor: '#000080' }}></div>
        <div className="absolute top-1/2 left-1/4 w-40 h-40 md:w-72 md:h-72 bg-blue-400/15 rounded-full blur-3xl animate-float-slow"></div>

        {/* Container/truck pattern overlay - Adjust sizes and positions for smaller screens */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 text-4xl sm:text-6xl md:text-8xl text-blue-400 animate-pulse">🚛</div>
          <div className="absolute top-3/4 right-1/4 text-3xl sm:text-4xl md:text-6xl text-blue-400 animate-pulse delay-1000">📦</div>
          <div className="absolute top-1/2 right-1/3 text-2xl sm:text-3xl md:text-4xl text-blue-400 animate-pulse delay-2000">🌍</div>
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(96,165,250,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(96,165,250,.03)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
      </div>

      {/* Content Container (z-index 20 ensures it's above all background layers) */}
      <div className="relative z-20 px-4 sm:px-6 lg:px-8 min-h-screen flex justify-center py-16"> {/* Added py-16 for vertical spacing on smaller screens */}
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center space-y-8 md:space-y-8 lg:space-y-8"> {/* Responsive vertical spacing */}

            {/* Brand Badge */}
            <div className={`inline-block transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-r from-blue-400 to-blue-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300"> {/* Responsive padding */}
                  <div className="flex items-center space-x-2 sm:space-x-3"> {/* Responsive spacing */}
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center"> {/* Responsive size */}
                      <span className="text-base sm:text-lg">🚚</span> {/* Responsive font size */}
                    </div>
                    <span className="text-base sm:text-lg font-bold uppercase tracking-wider">KM Logistics</span> {/* Responsive font size */}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Heading */}
            <div className={`space-y-4 sm:space-y-6 transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}> {/* Responsive vertical spacing */}
              <h1 className="text-4xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white leading-tight sm:leading-tight md:leading-tight lg:leading-tight"> {/* Responsive font size and line height */}
               We provide reliable and cost-effective logistics services
              </h1>

              {/* Animated subtitle */}
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-blue-400 text-lg sm:text-xl font-semibold"> {/* Responsive flex and spacing */}
                <span>Between</span>
                <div className="flex items-center space-x-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-400/10 rounded-full border border-blue-400/30"> {/* Responsive padding */}
                  <span className="text-xl sm:text-2xl">🇫🇷</span> {/* Responsive font size */}
                  <span>France</span>
                </div>
                <div className="w-6 sm:w-8 h-0.5 bg-gradient-to-r from-blue-400 to-transparent"></div> {/* Responsive width */}
                <div className="flex items-center space-x-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-400/10 rounded-full border border-blue-400/30"> {/* Responsive padding */}
                  <span className="text-xl sm:text-2xl">🇹🇿</span> {/* Responsive font size */}
                  <span>Tanzania</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <p className="max-w-xs sm:max-w-xl md:max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed font-light px-4 sm:px-0"> {/* Responsive max-width, font-size, and padding */}
                 specializing in the transportation of personal items, business goods, and bulk cargo via air and sea freight. Whether you're sending packages to loved ones or importing goods for your business, KM Logistics ensures smooth, secure, and timely delivery every step of the way. Our France–Tanzania link makes us a trusted partner for Tanzania-France diaspora communities at competitive prices.
              </p>
            </div>

            {/* Rotating Features */}
            <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              {/* Added flex-wrap for small screens to prevent overflow */}
              <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 py-6"> {/* Responsive gap */}
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border transition-all duration-500 text-sm sm:text-base ${ /* Responsive padding and font size */
                      currentSlide === index
                        ? 'bg-blue-400 text-white border-blue-400 scale-105 sm:scale-110 shadow-lg shadow-blue-400/50' // Slightly smaller scale on small screens
                        : 'bg-white/5 text-gray-400 border-gray-600 hover:border-blue-400/50'
                    }`}
                  >
                    <span className="text-lg sm:text-xl">{feature.icon}</span> {/* Responsive font size */}
                    <span className="font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className={`transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"> {/* Responsive gap */}
                <button
                  onClick={handleWhatsAppClick}
                  className="group relative overflow-hidden px-8 py-4 sm:px-10 sm:py-5 rounded-2xl font-bold text-lg sm:text-xl transition-all duration-500 hover:scale-105 w-full sm:w-auto" 
                  style={{ backgroundColor: '#000080' }}
                >
                  <div className="absolute inset-0 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  <div className="relative flex items-center space-x-2 sm:space-x-3 text-white"> {/* Responsive spacing */}
                    <span>Get Started</span>
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:rotate-45 transition-transform duration-300"> {/* Responsive size */}
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> {/* Responsive icon size */}
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-2xl shadow-2xl group-hover:shadow-blue-400/50 transition-all duration-500" style={{ boxShadow: '0 0 0 0 #000080' }}></div>
                </button>

               
              </div>
            </div>

           
          </div>
        </div>
      </div>

      

      <style jsx>{`
        /* Keep your existing animations */
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }

        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-10deg); }
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }

        @keyframes gradient-x {
          0%, 100% { background-size: 200% 200%; background-position: left center; }
          50% { background-size: 200% 200%; background-position: right center; }
        }

        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite 2s; }
        .animate-float-slow { animation: float-slow 10s ease-in-out infinite 4s; }
        .animate-gradient-x { animation: gradient-x 4s ease infinite; }
      `}</style>
    </div>
  );
};

export default AmazingLogisticsHero;