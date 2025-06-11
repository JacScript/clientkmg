// import React, { useState } from 'react';
// import { BsPatchCheckFill } from "react-icons/bs";
// import Reveal from '../Reveal';


// const SafariExperts = () => {
//   const [hoveredCard, setHoveredCard] = useState(null);

//   const infos = [
//     {
//       id: 1,
//       title: "KM Travel & Tours",
//       description: "Tailored travel experiences for Tanzanians exploring Europe, especially France and neighboring countries, with full support from visa to airport pick-up.",
//     },
//     {
//       id: 2,
//       title: "KM Logistics",
//       description:
//         "Reliable freight and cargo solutions connecting local and regional markets.",
//     },
//     {
//       id: 3,
//       title: "KM Kiswahili Institut ",
//       description:
//         "A center dedicated to promoting the Swahili language and Tanzanian culture to global learners and researchers.",
//     },
//      {
//       id: 4,
//       title: "KM Bahari Beach Holiday Home",
//       description:
//         "A tranquil coastal escape offering personalized accommodation on Tanzania’s beautiful shores.",
//     },
//   ];

//   const services = [
//     {
//       id: 1,
//       title: "Our Mission",
//       description: "To deliver reliable, inclusive, and forward-thinking services that connect people and create opportunity across Tanzania and France.",
//       icon: (
//         <svg className="w-12 h-12 text-[#000080]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
//         </svg>
//       ),
//       gradient: "from-amber-100 to-orange-100",
//       hoverGradient: "from-[#000080] to-emerald-200"
//     },
//     {
//       id: 2,
//       title: "Our Vision",
//       description: "To be a trusted cross-cultural brand known for excellence, impact, and connection—locally grounded, globally minded.",
//       icon: (
//         <svg className="w-12 h-12 text-[#000080]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//         </svg>
//       ),
//       gradient: "from-blue-100 to-cyan-100",
//       hoverGradient: "from-[#000080] to-emerald-200"
//     },
   
//   ];

//   return (
//     <section className="py-20 px-4 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
//       {/* Background Decorative Elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute top-20 right-10 w-64 h-64 bg-amber-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
//         <div className="absolute bottom-20 left-10 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
//         <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-green-100 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-pulse animation-delay-4000"></div>
//       </div>

//       <div className="max-w-7xl mx-auto relative z-10">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
//           {/* Left Side - Main Content */}
//           <div className="space-y-8">
//             {/* Who We Are Label */}
//             <div className="inline-block">
//               <span className="text-[#000080] font-medium text-lg tracking-wide bg-[#00008034] px-4 py-2 rounded-full border border-[#000080]">
//                 Who We Are
//               </span>
//             </div>

//             {/* Main Title */}
//             <div>
//               <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
//                We operate through
//                 <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#000080] via-orange-600 to-red-600">
//                   four key divisions:
//                 </span>
//               </h2>
//             </div>

//             {/* Description */}
//             <div className="space-y-6">
//               <ul className="space-y-6 sm:space-y-8">
//                              {infos.map((info, idx) => (
//                                <li key={idx} className="flex items-start gap-4 sm:gap-6">
//                                  <div className="flex-shrink-0 mt-1">
//                                    <BsPatchCheckFill className="text-[#000080] w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
//                                  </div>
//                                  <div className="flex-1">
//                                    <Reveal delay={0.4}>
//                                      <h3 className="font-bold text-lg sm:text-xl lg:text-2xl text-[#000080] mb-2">
//                                        {info.title}
//                                      </h3>
//                                    </Reveal>
//                                    <Reveal delay={0.6}>
//                                      <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
//                                        {info.description}
//                                      </p>
//                                    </Reveal>
//                                  </div>
//                                </li>
//                              ))}
//                            </ul>

//                            <p>
//          Our team works across continents to create value, build connections, and support community development through everything we do.
//               </p>
//             </div>

//             {/* Call to Action */}
          
//           </div>

//           {/* Right Side - Service Cards */}
//           <div className="space-y-6">
//             {services.map((service, index) => (
//               <div 
//                 key={service.id}
//                 className={`group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2 hover:scale-105 ${
//                   hoveredCard === service.id ? 'z-20' : 'z-10'
//                 }`}
//                 onMouseEnter={() => setHoveredCard(service.id)}
//                 onMouseLeave={() => setHoveredCard(null)}
//                 style={{
//                   animationDelay: `${index * 200}ms`
//                 }}
//               >
//                 {/* Gradient Background */}
//                 <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
//                 <div className={`absolute inset-0 bg-gradient-to-br ${service.hoverGradient} rounded-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-700 delay-200`}></div>
                
//                 {/* Content */}
//                 <div className="relative z-10">
//                   {/* Icon Container */}
//                   <div className="mb-6">
//                     <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-gray-100">
//                       {service.icon}
//                     </div>
//                   </div>

//                   {/* Title */}
//                   <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors duration-300">
//                     {service.title}
//                   </h3>

//                   {/* Description */}
//                   <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
//                     {service.description}
//                   </p>

//                   {/* Hover Arrow */}
//                   <div className="mt-6 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all duration-500 delay-200">
//                     <div className="inline-flex items-center text-amber-600 font-semibold">
//                       <span className="mr-2">Learn More</span>
//                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                       </svg>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Decorative Elements */}
//                 <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-700"></div>
//                 <div className="absolute bottom-4 left-4 w-8 h-8 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-700 delay-300"></div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Bottom Decorative Line */}
//         <div className="mt-20 flex justify-center">
//           <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#000080] to-transparent rounded-full"></div>
//         </div>
//       </div>

//       <style jsx>{`
//         .animation-delay-2000 { animation-delay: 2s; }
//         .animation-delay-4000 { animation-delay: 4s; }
//       `}</style>
//     </section>
//   );
// };

// export default SafariExperts;

import React, { useState, useEffect } from 'react';
import { BsPatchCheckFill } from "react-icons/bs";

const AmazingCompanySection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const infos = [
    {
      id: 1,
      title: "KM Travel & Tours",
      description: "Tailored travel experiences for Tanzanians exploring Europe, especially France and neighboring countries, with full support from visa to airport pick-up.",
      icon: "✈️"
    },
    {
      id: 2,
      title: "KM Logistics",
      description: "Reliable freight and cargo solutions connecting local and regional markets.",
      icon: "🚛"
    },
    {
      id: 3,
      title: "KM Kiswahili Institut",
      description: "A center dedicated to promoting the Swahili language and Tanzanian culture to global learners and researchers.",
      icon: "📚"
    },
    {
      id: 4,
      title: "KM Bahari Beach Holiday Home",
      description: "A tranquil coastal escape offering personalized accommodation on Tanzania's beautiful shores.",
      icon: "🏖️"
    },
  ];

  const services = [
    {
      id: 1,
      title: "Our Mission",
      description: "To deliver reliable, inclusive, and forward-thinking services that connect people and create opportunity across Tanzania and France.",
      icon: (
        <div className="relative">
          <div className="absolute inset-0 bg-blue-400 rounded-full blur-lg opacity-50 animate-pulse"></div>
          <svg className="relative w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
      )
    },
    {
      id: 2,
      title: "Our Vision",
      description: "To be a trusted cross-cultural brand known for excellence, impact, and connection—locally grounded, globally minded.",
      icon: (
        <div className="relative">
          <div className="absolute inset-0 bg-blue-400 rounded-full blur-lg opacity-50 animate-pulse"></div>
          <svg className="relative w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      )
    },
  ];

  return (
    <section className="relative min-h-screen py-20 px-4 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-gray-50">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Dynamic gradient background that follows mouse */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            background: `radial-gradient(800px circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, #60a5fa, transparent 50%)`
          }}
        ></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-blue-400/15 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/3 w-72 h-72 opacity-20 rounded-full blur-3xl animate-float-slow" style={{ backgroundColor: '#000080' }}></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,128,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,128,.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Side - Main Content */}
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
            {/* Who We Are Label */}
            <div className="inline-block group">
              <span className="relative text-blue-400 font-bold text-lg tracking-wide px-6 py-3 rounded-full border-2 border-blue-400/30 backdrop-blur-sm bg-blue-400/5 hover:bg-blue-400/10 transition-all duration-300 group-hover:scale-105 hover:border-blue-400/50">
                Who We Are
                <div className="absolute inset-0 rounded-full bg-blue-400/10 blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              </span>
            </div>

            {/* Main Title */}
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-6xl font-black leading-tight" style={{ color: '#000080' }}>
                We operate through
                <span className="block text-blue-400 animate-gradient-x">
                  four key divisions:
                </span>
              </h2>
            </div>

            {/* Description */}
            <div className="space-y-8">
              <div className="space-y-8">
                {infos.map((info, idx) => (
                  <div 
                    key={idx} 
                    className={`group flex items-start gap-6 p-6 rounded-2xl bg-blue-400/5 backdrop-blur-sm border border-blue-400/20 hover:bg-blue-400/10 hover:border-blue-400/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-400/20 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                    style={{ transitionDelay: `${idx * 150}ms` }}
                  >
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-400 to-blue-500 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-blue-400/25">
                        {info.icon}
                      </div>
                    </div>
                    <div className="flex-1 space-y-3">
                      <h3 className="font-bold text-xl lg:text-2xl group-hover:text-blue-400 transition-all duration-300" style={{ color: '#000080' }}>
                        {info.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                        {info.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="relative p-6 mt-12 text-center">
                <div className="absolute inset-0 bg-blue-400/10 rounded-2xl blur-xl"></div>
                <p className="relative text-lg text-gray-700 font-medium">
                  Our team works across continents to create value, build connections, and support community development through everything we do.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Mission & Vision Cards */}
          <div className={`space-y-8 transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
            {services.map((service, index) => (
              <div 
                key={service.id}
                className={`group relative overflow-hidden rounded-3xl transition-all duration-700 hover:scale-105 ${hoveredCard === service.id ? 'z-20' : 'z-10'}`}
                onMouseEnter={() => setHoveredCard(service.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Glowing border effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
                
                {/* Main card content */}
                <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 border border-blue-400/30 group-hover:border-transparent group-hover:shadow-2xl group-hover:shadow-blue-400/20 transition-all duration-500">
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-blue-400/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon Container */}
                    <div className="mb-8">
                      <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-400 to-blue-500 rounded-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg shadow-blue-400/30 group-hover:shadow-2xl group-hover:shadow-blue-400/50">
                        {service.icon}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-3xl font-black mb-6 group-hover:text-blue-400 transition-all duration-300" style={{ color: '#000080' }}>
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-lg leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                      {service.description}
                    </p>

                    {/* Animated CTA */}
                    <div className="mt-8 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-200">
                      <div className="inline-flex items-center text-blue-400 font-bold text-lg">
                        <span className="mr-3">Explore More</span>
                        <div className="w-8 h-8 bg-blue-400/20 rounded-full flex items-center justify-center group-hover:translate-x-2 transition-transform duration-300">
                          <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating decorative elements */}
                  <div className="absolute top-4 right-4 w-20 h-20 bg-blue-400/10 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 animate-pulse"></div>
                  <div className="absolute bottom-4 left-4 w-12 h-12 bg-blue-400/5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 delay-300 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Decorative Elements */}
        <div className="mt-20 flex justify-center space-x-4">
          <div className="w-40 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent rounded-full animate-pulse"></div>
          <div className="w-40 h-1 rounded-full animate-pulse delay-1000" style={{ background: `linear-gradient(to right, transparent, #000080, transparent)` }}></div>
          <div className="w-40 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent rounded-full animate-pulse delay-2000"></div>
        </div>
      </div>

      <style jsx>{`
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
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite 2s; }
        .animate-float-slow { animation: float-slow 10s ease-in-out infinite 4s; }
        .animate-gradient-x { animation: gradient-x 3s ease infinite; }
      `}</style>
    </section>
  );
};

export default AmazingCompanySection;