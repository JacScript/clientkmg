import React from 'react';
// Assuming your image path for the safari scene
import safariImage from '../../assets/images/uncharrted.jpeg'; // Adjust this path to your actual image

export default function UnchartedBoundlessSection() {
  return (
    <section className="relative py-16 sm:py-24 lg:py-32 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          
          {/* Left Side: Image with rounded top-right and bottom-right corners */}
          <div className="relative mb-12 lg:mb-0 lg:order-1"> {/* order-1 to place it on left on lg screens */}
            <div className="relative w-full overflow-hidden rounded-tl-[100px] rounded-br-[100px] sm:rounded-tl-[150px] sm:rounded-br-[150px] aspect-[4/3] lg:aspect-[3/4] xl:aspect-[4/3] shadow-xl">
              <img 
                src={safariImage} //
                alt="Safari vehicle with elephants in the distance"
                className="absolute inset-0 w-full h-full object-cover" 
              />
            </div>
            {/* Optional: Add a subtle overlay or border effect if desired, similar to the screenshot */}
          </div>

          {/* Right Side: Text Content */}
          <div className="text-center lg:text-left lg:order-2"> {/* order-2 to place it on right on lg screens */}
            {/* "Safari 360" Tag */}
            <div className="mb-4">
              <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold text-gray-700 bg-gray-100">
            KM Group
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6 leading-tight">
              Uncharted & Boundless
            </h2>

            {/* Description Paragraphs */}
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed max-w-xl lg:max-w-none mx-auto lg:mx-0">
              <p>
           KM Group extends its "Uncharted & Boundless" adventures beyond Tanzania to include experiences within the EU. These expertly planned tours offer a unique blend of travel and language acquisition, designed by specialists to facilitate rapid language learning. While specific itineraries for destinations like France, Berlin, Brussels, Germany, Belgium, and the Netherlands are not detailed, the program's core includes interactive lessons and personalized learning paths tailored to individual proficiency and goals. Such immersive experiences in these European countries would allow participants to learn directly from and network with native speakers, enhancing their cultural and linguistic journey. For example, exploring Paris or visiting Christmas markets in Strasbourg could become integrated into a comprehensive language and adventure package.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}