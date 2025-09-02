import React from 'react';
// Assuming your image path for the safari scene
// import safariImage from '../../assets/images/about.jpeg'; // Adjust this path to your actual image




const UnchartedBoundlessSection = ({data}) => {

  // console.log(data)
  return (
    <section className="relative py-16 sm:py-24 lg:py-32 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 ">
          
          {/* Left Side: Image with rounded top-right and bottom-right corners */}
          <div className="relative mb-12 lg:mb-0 lg:order-1"> {/* order-1 to place it on left on lg screens */}
            <div className="relative w-full overflow-hidden rounded-tl-[100px] rounded-br-[100px] sm:rounded-tl-[150px] sm:rounded-br-[150px] aspect-[4/3] lg:aspect-[3/4] xl:aspect-[4/3] shadow-xl">
              <img 
                src={ data?.image || "https://res.cloudinary.com/dwkivuqts/image/upload/v1750398324/about_n1mhi4.jpg" }//
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
            { data?.title || "KM Group"}
              </span>
            </div>

            {/* Main Headline */}
            {/* <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6 leading-tight">
              Uncharted & Boundless
            </h2> */}

            {/* Description Paragraphs */}
            <div className="space-y-6 text-xl text-gray-600 leading-relaxed max-w-xl lg:max-w-none mx-auto lg:mx-0">
              <p>
                {data?.description || 
          "KM Group is a French-Tanzanian enterprise founded by Kai Maembe, a Tanzanian entrepreneur based in France. The group bridges two worlds—bringing global standards and local insight together to deliver trusted, people-centered services across travel, logistics, education, and hospitality."}
<br/>
<br/>
{data?.subdescription||"With operations rooted in both Tanzania and Europe, KM Group is built on cross-cultural experience, integrity, and a commitment to quality."}
              </p>

                <div className="flex flex-col sm:flex-row items-center sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 pt-6">
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
              {/* <button className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#000080] to-orange-600 text-white font-semibold rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/25 transform hover:-translate-y-1">
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
              </button> */}
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


export default UnchartedBoundlessSection;