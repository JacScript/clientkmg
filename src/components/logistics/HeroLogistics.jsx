


'use client'
import Reveal from "../Reveal";

// Removed unused 'useState' import for cleaner code
import Link from '../LinkComponent' // Assuming LinkComponent handles its internal responsiveness
import pic from '../../assets/images/container.png' // Ensure this path is correct and the image is optimized for web

export default function HeroLogistics() {
  return (
    <div
      className="relative w-full min-h-screen bg-cover bg-center flex items-center justify-center" // Removed 'py-16' here. The 'flex items-center justify-center' coupled with the inner div's padding will manage vertical centering more effectively.
      style={{
        backgroundImage: `url(${pic})`,
      }}
    >
      {/* Gradient Overlay for superior text readability */}
      {/* Increased opacity further to ensure strong contrast for text, especially on busy backgrounds */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/50 z-10" />

      {/* Main content container with horizontal padding and z-index to be above the overlay */}
      {/* Removed 'pt-14' as it was redundant with flex centering and inner padding */}
      <div className="relative isolate px-6 lg:px-8 z-20 w-full"> 

        {/* Top decorative blob - already responsive with existing Tailwind classes */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[72.1875rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b544] to-[#9189fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[180.1875rem]"
          />
        </div>

        {/* Content block: Heading, Paragraph, and Button */}
        {/* Adjusted vertical padding (py) for better responsiveness and to allow more space for full-height hero */}
        <div className="mx-auto max-w-4xl py-20 sm:py-24 md:py-32 lg:py-40 text-center"> 
          {/* Main Heading - Enhanced font weight and leading for impact and readability */}
          {/* Added drop-shadow for better legibility against varied background image */}
          <Reveal>

          <h1 className="text-2xl sm:text-5xl md:text-6xl lg:text-5xl font-bold tracking-tight text-[#000080] leading-tight sm:leading-snug md:leading-normal drop-shadow-md">
            Global logistics, perfected. Precision, speed, confidence.
          </h1>
          </Reveal>
          {/* Paragraph - Adjusted text color for better contrast and subtle text shadow */}
          <Reveal>
            
            
          <p className="mt-6 text-base sm:text-lg md:text-xl font-medium text-gray-100 leading-relaxed drop-shadow-sm">
            We offer comprehensive, tailored logistics solutions for timely, efficient global delivery. Gain precision, speed, and confidence with every shipment.
          </p>
            </Reveal>
          {/* Button Container */}
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="#"
              className="rounded-md hover:bg-[#000080] px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 
                         text-sm sm:text-base md:text-lg font-semibold text-[#000080] 
                         hover:text-white shadow-lg bg-transparent border-2 border-[#000080] 
                         transition ease-in duration-150 transform hover:scale-105 cursor-pointer" // Added transform and hover:scale-105 for subtle interactive effect
            >
              Get started
            </Link>
          </div>
        </div>

        {/* Bottom decorative blob - also inherently responsive */}
        {/* <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[72.1875rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[180.1875rem]"
          />
        </div> */}
      </div>
    </div>
  )
}