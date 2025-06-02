import React, { useState } from 'react';

const SafariExperts = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const services = [
    {
      id: 1,
      title: "Explore the Charm of Europe’s Iconic Cities",
      description: "Europe’s cities blend culture, history, and modern energy—from Venice’s canals to Berlin’s nightlife and Lisbon’s coastal charm. Each destination offers unique experiences in art, cuisine, and architecture, making the EU a truly unforgettable journey.",
      icon: (
        <svg className="w-12 h-12 text-[#000080]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      gradient: "from-amber-100 to-orange-100",
      hoverGradient: "from-[#000080] to-emerald-200"
    },
    // {
    //   id: 2,
    //   title: "Beach Holidays",
    //   description: "Enjoy the greatest beaches in the coast. Get to visit Zanzibar the land full of great and old culture with community life.",
    //   icon: (
    //     <svg className="w-12 h-12 text-[#000080]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    //     </svg>
    //   ),
    //   gradient: "from-blue-100 to-cyan-100",
    //   hoverGradient: "from-[#000080] to-emerald-200"
    // },
    // {
    //   id: 3,
    //   title: "Mountain Trekking",
    //   description: "Trek with the experts who have the experience with the mountain, high summit success and great private services.",
    //   icon: (
    //     <svg className="w-12 h-12 text-[#000080]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3l14 9-9 3-3-9z" />
    //     </svg>
    //   ),
    //   gradient: "from-green-100 to-emerald-100",
    //   hoverGradient: "from-[#000080] to-emerald-200"
    // }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-64 h-64 bg-amber-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-green-100 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Side - Main Content */}
          <div className="space-y-8">
            {/* Who We Are Label */}
            <div className="inline-block">
              <span className="text-[#000080] font-medium text-lg tracking-wide bg-[#00008034] px-4 py-2 rounded-full border border-[#000080]">
                Who We Are
              </span>
            </div>

            {/* Main Title */}
            <div>
              <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Tour and Travel 
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#000080] via-orange-600 to-red-600">
                  Experts
                </span>
              </h2>
            </div>

            {/* Description */}
            <div className="space-y-6">
              <p className="text-gray-600 text-lg leading-relaxed">
             KM Group is a destination management company based in Tanzania and France. 
                We are a team of dedicated travel and tour specialists with a focus 
                on providing epic & unforgettable adventures. We specialize in well 
                planned, private and custom tours. Our trips will take you from 
                the endless adventure in UE.
              </p>
              
              <p className="text-gray-600 text-lg leading-relaxed">
                With exhilarating safari experiences and forages to the spice island with great beach 
                & cultural experiences KM Group makes your adventure planning a 
                breeze and ensures a seamless & amazing trip.
              </p>
            </div>

            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 pt-6">
              {/* Phone Number */}
              <div className="flex items-center space-x-3 bg-white rounded-2xl px-6 py-4 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="bg-[#000080] rounded-full p-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Call experts</p>
                  <p className="text-lg font-bold text-gray-900">+33 7 71 94 87 86</p>
                </div>
              </div>

              {/* Discover More Button */}
              <button className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#000080] to-orange-600 text-white font-semibold rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/25 transform hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-r from-[#000080] to-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                <span className="relative z-10 mr-2 group-hover:mr-4 transition-all duration-300">Discover More</span>
                <svg 
                  className="relative z-10 w-5 h-5 transform group-hover:translate-x-2 transition-all duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Side - Service Cards */}
          <div className="space-y-6">
            {services.map((service, index) => (
              <div 
                key={service.id}
                className={`group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2 hover:scale-105 ${
                  hoveredCard === service.id ? 'z-20' : 'z-10'
                }`}
                onMouseEnter={() => setHoveredCard(service.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  animationDelay: `${index * 200}ms`
                }}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                <div className={`absolute inset-0 bg-gradient-to-br ${service.hoverGradient} rounded-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-700 delay-200`}></div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon Container */}
                  <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-gray-100">
                      {service.icon}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {service.description}
                  </p>

                  {/* Hover Arrow */}
                  <div className="mt-6 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all duration-500 delay-200">
                    <div className="inline-flex items-center text-amber-600 font-semibold">
                      <span className="mr-2">Learn More</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-700"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-700 delay-300"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Decorative Line */}
        <div className="mt-20 flex justify-center">
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#000080] to-transparent rounded-full"></div>
        </div>
      </div>

      <style jsx>{`
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </section>
  );
};

export default SafariExperts;