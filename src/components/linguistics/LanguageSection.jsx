// import React from 'react';
// import flagTz from '../../assets/images/tzFlag.png'; // Example path, adjust as needed

// import globeIllustration from '../../assets/images/globeIllustration.png'; // Example path, adjust as needed
// import Link from '../LinkComponent';

// export default function LanguageHeroSection() {
//   const languages = [
//     { name: 'Kiswahili', flag: flagTz },
//   ];

//   const benefits = [
//     'Learn from native speakers',
//     'Network with native speakers',
//     'Personalized learning experience',
//   ];

//   return (
//     <section className="relative py-16 sm:py-24 lg:py-32 bg-white overflow-hidden">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">

//           {/* Left Side: Language Selection Cards and Globe */}
//           <div className="relative mb-12 lg:mb-0 flex flex-col items-center lg:items-start justify-center">
//             {/* Language Cards */}
//             <div className="space-y-4 w-full max-w-sm mx-auto lg:mx-0 z-10">
//               {languages.map((lang, index) => (
//                 <div
//                   key={index}
//                   className="bg-white p-4 rounded-xl shadow-md flex items-center
//                              hover:shadow-lg transition-shadow duration-300 cursor-pointer"
//                 >
//                   <img src={lang.flag} alt={`${lang.name} Flag`} className="h-6 w-6 mr-3 rounded-full" />
//                   <span className="text-lg font-medium text-gray-800">{lang.name}</span>
//                 </div>
//               ))}
//             </div>

//             {/* Globe Illustration - positioned absolutely for overlap effect */}
//             {/* Adjusted positioning for responsiveness */}
//             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
//                             lg:top-1/2 lg:left-1/2 lg:translate-x-[-15%] lg:translate-y-[-5%] 
//                             w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px]
//                             z-0 opacity-80" // Lower z-index so cards overlap it
//                  style={{ backgroundImage: `url(${globeIllustration})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}
//             >
//             </div>
//           </div>

//           {/* Right Side: Headline, Description, Benefits, and Call to Action */}
//           <div className="text-center lg:text-left z-10"> {/* Ensure text is above globe on smaller screens */}
//             <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#000080] mb-6 ">
//               Speak a Swahili in one month
//             </h1>
//             <p className="text-lg text-gray-700 mb-8 max-w-xl lg:max-w-none mx-auto lg:mx-0">
//               Designed by language experts and psychologists to help you learn a new language in the shortest time possible.
//             </p>

//             <ul className="space-y-3 mb-10 text-lg text-gray-700 max-w-xl lg:max-w-none mx-auto lg:mx-0">
//               {benefits.map((benefit, index) => (
//                 <li key={index} className="flex items-center lg:justify-start justify-center">
//                   <span className="h-2.5 w-2.5 bg-yellow-400 rounded-full mr-3 flex-shrink-0" />
//                   {benefit}
//                 </li>
//               ))}
//             </ul>

//                 {/* Button Container */}
//           <div className="mt-10 flex items-center justify-center gap-x-6">
//             <Link
//               href="#"
//               className="rounded-md hover:bg-[#000080] px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-2 
//                          text-sm sm:text-base md:text-lg font-semibold text-[#000080] 
//                          hover:text-white shadow-lg bg-transparent border-2 border-[#000080] 
//                          transition ease-in duration-150 transform hover:scale-105 cursor-pointer"
//             >
//               Get started
//             </Link>
//           </div>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }

import React, { useState, useEffect } from 'react';
// import { Globe, CheckCircle, Users, BookOpen, Zap } from 'lucide-react';
import { CiGlobe , CiUser} from "react-icons/ci";
import { FaRegCheckCircle } from "react-icons/fa";
import { SlBookOpen } from "react-icons/sl";
import { GoZap } from "react-icons/go";
import Link from '../LinkComponent';

export default function LanguageHeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const languages = [
    { name: 'Kiswahili', flag: '🇹🇿', learners: '', difficulty: 'Beginner' },
    { name: 'Kiswahili', flag: '🇹🇿', learners: '', difficulty: 'Intermediate' },
    { name: 'Kiswahili', flag: '🇹🇿', learners: '1.8k', difficulty: 'Advanced' },
  ];

  const benefits = [
    { icon: CiUser, text: 'Learn from native speakers', color: 'text-blue-500' },
    { icon: CiGlobe, text: 'Network with global speakers', color: 'text-green-500' },
    { icon: GoZap, text: 'Personalized learning experience', color: 'text-purple-500' },
    { icon: SlBookOpen, text: 'Interactive lessons & practice', color: 'text-orange-500' },
  ];

  const stats = [
    { value: '100', label: 'Active Learners' },
    { value: '95%', label: 'Success Rate' },
    { value: '30', label: 'Days Average' },
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-conic from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-2xl animate-spin" style={{animationDuration: '20s'}}></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          
          {/* Left Side: Interactive Language Cards */}
          <div className={`transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
            <div className="relative">
              {/* Main Globe Visualization */}
              <div className="relative w-80 h-80 mx-auto mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute inset-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-30 animate-pulse delay-500"></div>
                <div className="absolute inset-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-40 animate-pulse delay-1000"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <CiGlobe className="w-32 h-32 text-white/80 animate-spin" style={{animationDuration: '8s'}} />
                </div>
              </div>

              {/* Language Cards */}
              <div className="space-y-4">
                {languages.map((lang, index) => (
                  <div
                    key={index}
                    onClick={() => setActiveLanguage(index)}
                    className={`group relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-white/20 ${
                      activeLanguage === index ? 'ring-2 ring-blue-400 bg-white/20' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-3xl">{lang.flag}</div>
                        <div>
                          <h3 className="text-white font-semibold text-lg">{lang.name}</h3>
                          <p className="text-white/70 text-sm">{lang.difficulty} Level</p>
                        </div>
                      </div>
                      {/* <div className="text-right">
                        <p className="text-white/90 font-bold">{lang.learners}</p>
                        <p className="text-white/60 text-xs">learners</p>
                      </div> */}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Hero Content */}
          <div className={`text-center lg:text-left transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
            
            {/* Stats Bar */}
            <div className="flex justify-center lg:justify-start space-x-8 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-white/70 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Master
              </span>
              <br />
              <span className="text-white">
                Swahili in
              </span>
              <br />
              <span className="relative">
                <span className="text-yellow-400">30 days</span>
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"></div>
              </span>
            </h1>
            
            <p className="text-xl text-white/80 mb-8 leading-relaxed max-w-2xl">
              Revolutionary learning system designed by language experts and cognitive scientists. 
              Experience immersive, AI-powered lessons that adapt to your pace.
            </p>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {benefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className="flex items-center space-x-3 p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <benefit.icon className={`w-6 h-6 ${benefit.color}`} />
                  <span className="text-white/90">{benefit.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            {/* <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25">
                <span className="relative z-10">Start Learning Free</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              
            
            </div> */}

                  {/* Button Container */}
          <div className="mt-10 flex items-center justify-center gap-x-6">
               <Link 
            message="Hello, I would like to inquire about your linguistics services."
  isWhatsApp={true} 
  className="bg-[#000080] hover:bg-[#000080] text-white px-6 py-3 rounded-md shadow-lg"
>
  Get Started
</Link>
            {/* <Link
              href="#"
              className="rounded-md hover:bg-[#000080] px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-2 
                         text-sm sm:text-base md:text-lg font-semibold text-[#000080] 
                         hover:text-white shadow-lg bg-white border-2 border-[#000080] 
                         transition ease-in duration-150 transform hover:scale-105 cursor-pointer"
            >
              Get started
            </Link> */}
          </div>

            {/* Social Proof */}
            {/* <div className="mt-12 flex items-center justify-center lg:justify-start space-x-4">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full border-2 border-white/20"></div>
                ))}
              </div>
              <div className="text-white/80">
                <p className="font-semibold">Join 10,000+ learners</p>
                <p className="text-sm text-white/60">★★★★★ 4.9/5 rating</p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}