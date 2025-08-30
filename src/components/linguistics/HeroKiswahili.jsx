// import React, { useState, useRef } from 'react'
// import Reveal from '../Reveal' 
// import Link from '../LinkComponent'
// import { CiPlay1, CiPause1 } from "react-icons/ci";

// const HeroKiswahili = () => {
//   const [isPlaying, setIsPlaying] = useState(true)
//   const videoRef = useRef(null)

//   const toggleVideo = () => {
//     if (videoRef.current) {
//       if (isPlaying) {
//         videoRef.current.pause()
//       } else {
//         videoRef.current.play()
//       }
//       setIsPlaying(!isPlaying)
//     }
//   }

//   const handleVideoLoad = () => {
//     if (videoRef.current) {
//       videoRef.current.play().catch(console.error)
//     }
//   }

//   return (
//     <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
//       {/* Background Video */}
//       <video
//         ref={videoRef}
//         className="absolute inset-0 w-full h-full object-cover z-0"
//         autoPlay
//         muted
//         loop
//         playsInline
//         onLoadedData={handleVideoLoad}
//         poster="https://res.cloudinary.com/dwkivuqts/image/upload/v1750397822/kiswahili_pfyehb.avif"
//       >
//         {/* Add your Swahili/African culture video sources here */}
//         <source src="/swahili-culture-video.mp4" type="video/mp4" />
//         <source src="/swahili-culture-video.webm" type="video/webm" />
//         Your browser does not support the video tag.
//       </video>

//       {/* Video Control Button */}
//       <button
//         onClick={toggleVideo}
//         className="absolute top-6 right-6 z-30 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-all duration-300 hover:scale-110"
//         aria-label={isPlaying ? "Pause video" : "Play video"}
//       >
//         {isPlaying ? (
//           <CiPause1 className="w-6 h-6" />
//         ) : (
//           <CiPlay1 className="w-6 h-6 ml-0.5" />
//         )}
//       </button>

//       {/* Gradient Overlay for better text readability */}
//       <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/70 z-10" />

//       {/* Main content container */}
//       <div className="relative isolate px-6 lg:px-8 z-20 w-full"> 

//         {/* Top decorative blob with warmer colors for language learning */}
//         <div
//           aria-hidden="true"
//           className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
//         >
//           <div
//             style={{
//               clipPath:
//                 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
//             }}
//             className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[72.1875rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#000080] to-[#000080] opacity-40 sm:left-[calc(50%-30rem)] sm:w-[180.1875rem]"
//           />
//         </div>

//         {/* Content block: Heading, Paragraph, and Buttons */}
//         <div className="mx-auto max-w-4xl py-20 sm:py-24 md:py-32 lg:py-40 text-center"> 
          
//           {/* Language Badge */}
//           <Reveal>
//             <div className="inline-flex items-center mb-6">
//               <span className="bg-orange-500/20 text-orange-300 px-4 py-2 rounded-full text-sm font-semibold border border-orange-400/30 backdrop-blur-sm">
//                 🌍 Learn Swahili
//               </span>
//             </div>
//           </Reveal>

//           {/* Main Heading */}
//           <Reveal>
//             <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight sm:leading-snug md:leading-normal drop-shadow-2xl">
//               Karibu kwenye ulimwengu wa 
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400"> Kiswahili</span>
//             </h1>
//           </Reveal>
          
//           {/* Subtitle in English */}
//           <Reveal>
//             <h2 className="mt-4 text-lg sm:text-xl md:text-2xl font-medium text-orange-200 drop-shadow-lg">
//               Welcome to the world of Swahili
//             </h2>
//           </Reveal>
          
//           {/* Description Paragraph */}
//           <Reveal>
//             <p className="mt-8 text-base sm:text-lg md:text-xl font-medium text-gray-200 leading-relaxed drop-shadow-sm max-w-3xl mx-auto">
//               Embark on an incredible journey to master East Africa's most beautiful language. 
//               Our interactive lessons make learning Swahili engaging, practical, and fun.
//             </p>
//           </Reveal>
          
//           {/* Button Container */}
//           <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6">
//               <Link 
//             message="Hello, I would like to inquire about your Kiswahili services."
//   isWhatsApp={true} 
//   className="w-full sm:w-auto rounded-lg bg-gradient-to-r from-orange-500 to-yellow-500 
//                          px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold text-white 
//                          shadow-xl hover:shadow-2xl transition-all duration-300 ease-out
//                          transform hover:scale-105 hover:from-orange-600 hover:to-yellow-600
//                          border-2 border-transparent hover:border-white/20"
// >
//   Anza Kusoma - Start Learning
// </Link>
            
//           </div>

         
//         </div>

//         {/* Bottom decorative element */}
//         <div
//           aria-hidden="true"
//           className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
//         >
//           <div
//             style={{
//               clipPath:
//                 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
//             }}
//             className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[72.1875rem] -translate-x-1/2 bg-gradient-to-tr from-[#000080] to-[#000080] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[180.1875rem]"
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default HeroKiswahili





import React, { useState, useRef } from 'react'
import Reveal from '../Reveal' 
import Link from '../LinkComponent'
import { CiPlay1, CiPause1 } from "react-icons/ci";

const HeroKiswahili = () => {
  const [isPlaying, setIsPlaying] = useState(true)
  const videoRef = useRef(null)

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleVideoLoad = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(console.error)
    }
  }

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        muted
        loop
        playsInline
        onLoadedData={handleVideoLoad}
        poster="https://res.cloudinary.com/dtl9dvdc8/image/upload/v1753450041/WhatsApp_Image_2025-07-24_at_20.57.59_eyadam.jpg"
      >
        {/* Add your Swahili/African culture video sources here */}
        <source src="/swahili-culture-video.mp4" type="video/mp4" />
        <source src="/swahili-culture-video.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>

      {/* Video Control Button */}
      <button
        onClick={toggleVideo}
        className="absolute top-6 right-6 z-30 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-all duration-300 hover:scale-110"
        aria-label={isPlaying ? "Pause video" : "Play video"}
      >
        {isPlaying ? (
          <CiPause1 className="w-6 h-6" />
        ) : (
          <CiPlay1 className="w-6 h-6 ml-0.5" />
        )}
      </button>

      {/* Gradient Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/70 z-10" />

      {/* Main content container */}
      <div className="relative isolate px-6 lg:px-8 z-20 w-full"> 

        {/* Top decorative blob with warmer colors for language learning */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[72.1875rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#000080] to-[#000080] opacity-40 sm:left-[calc(50%-30rem)] sm:w-[180.1875rem]"
          />
        </div>

        {/* Content block: Heading, Paragraph, and Buttons */}
        <div className="mx-auto max-w-4xl py-20 sm:py-24 md:py-32 lg:py-40 text-center"> 
          
          {/* Language Badge */}
          <Reveal>
            <div className="inline-flex items-center mb-6">
              <span className="bg-orange-500/20 text-orange-300 px-4 py-2 rounded-full text-sm font-semibold border border-orange-400/30 backdrop-blur-sm">
                🌍 Learn Swahili
              </span>
            </div>
          </Reveal>

          {/* Main Heading */}
          <Reveal>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight sm:leading-snug md:leading-normal drop-shadow-2xl">
              Karibu kwenye ulimwengu wa 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400"> Kiswahili</span>
            </h1>
          </Reveal>
          
          {/* Subtitle in English */}
          <Reveal>
            <h2 className="mt-4 text-lg sm:text-xl md:text-2xl font-medium text-orange-200 drop-shadow-lg">
              Welcome to the world of Swahili
            </h2>
          </Reveal>
          
          {/* Description Paragraph */}
          <Reveal>
            <p className="mt-8 text-base sm:text-lg md:text-xl font-medium text-gray-200 leading-relaxed drop-shadow-sm max-w-3xl mx-auto">
              Embark on an incredible journey to master East Africa's most beautiful language. 
              Our interactive lessons make learning Swahili engaging, practical, and fun.
            </p>
          </Reveal>
          
          {/* Button Container */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6">
              <Link 
            message="Hello, I would like to inquire about your Kiswahili services."
  isWhatsApp={true} 
  className="w-full sm:w-auto rounded-lg bg-gradient-to-r from-orange-500 to-yellow-500 
                         px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold text-white 
                         shadow-xl hover:shadow-2xl transition-all duration-300 ease-out
                         transform hover:scale-105 hover:from-orange-600 hover:to-yellow-600
                         border-2 border-transparent hover:border-white/20"
>
  Anza Kusoma - Start Learning
</Link>
            
          </div>

         
        </div>

        {/* Bottom decorative element */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[72.1875rem] -translate-x-1/2 bg-gradient-to-tr from-[#000080] to-[#000080] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[180.1875rem]"
          />
        </div>
      </div>
    </div>
  )
}

export default HeroKiswahili