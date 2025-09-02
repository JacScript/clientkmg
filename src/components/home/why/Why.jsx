import React, { useState } from 'react';
import Reveal from '../../Reveal';
// import pic1 from '../../../assets/images/img11.JPG';
import FadeInImage from '../../FadeInImage';
import Link from '../../LinkComponent';

function Why({data}) {
  
  const res = data?.whySection;
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const text = res?.heading;
  const extra = res?.subheading ||  "With firsthand experience living, working, and studying across France, Scandinavia, and other EU cities, Kai brings unmatched insight into what Tanzanian travelers truly need abroad.\n\nFluent in Swahili, English, and French, Kai offers warm, personalized support from the moment you start your visa process to the day you land in Europe. Whether it's your first international trip or your fifth, KM Travel & Tours makes you feel informed, prepared, and right at home anywhere in Europe.\n\nFrom Tanzania to Europe—travel confidently, travel with Kai.";
const [first, ...rest] = text.split("KM");


  return (
    <section className="w-full py-12 md:py-20 bg-white text-[#000080]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse md:flex-row items-center gap-10">
        
        {/* Image */}
        <div className="w-full md:w-1/2">
          <FadeInImage
            src={ res?.image ||  "https://res.cloudinary.com/dwkivuqts/image/upload/v1750389279/img11_rlgher.jpg"}
            alt="Travel Experience"
            className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Text Content */}
        <div className="w-full md:w-1/2 space-y-2 md:pr-8 text-center md:text-left">
          <Reveal>
            <p className="text-base md:text-lg font-bold font-serif tracking-wide">
              { res?.title || "TIMELESS ADVENTURE"}
            </p>
          </Reveal>

          <Reveal delay={0.5}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-black font-roboto leading-tight">
              {/* WHY CHOOSE <br className="hidden md:block" /> KM TRAVEL AND TOUR */}

                  {first}
    <br className="hidden md:block" />
    {"KM" + rest.join("KM")}

            </h2>
          </Reveal>

          <div className="py-8">
            <Reveal delay={1.3}>
              <div className="relative">
                <div
                  className={`
                    text-sm sm:text-base md:text-lg leading-relaxed text-gray-700
                    transition-all duration-500 ease-in-out overflow-hidden
                    ${isExpanded ? 'max-h-none' : 'max-h-[100px] sm:max-h-[120px] md:max-h-[140px]'}
                  `}
                >
                  <p>
  {text}
  {isExpanded && (
    <>
      {" "}{extra.split("\n\n").map((para, i) => (
        <React.Fragment key={i}>
          {para}
          <br/><br/>
        </React.Fragment>
      ))}
    </>
  )}
</p>
                  {/* <p>
                    At KM Travel & Tours, you're not just booking a trip, your travel is being organised by someone who understands your journey. Kai Maembe, Tanzanian-born and raised, has lived in France for over 7 years and is an active member of the diaspora community in France.
                    {isExpanded && (
                      <>
                        {' '}With firsthand experience living, working, and studying across France, Scandinavia, and other EU cities, Kai brings unmatched insight into what Tanzanian travelers truly need abroad.
                        <br/>
                        <br/>
                        Fluent in Swahili, English, and French, Kai offers warm, personalized support from the moment you start your visa process to the day you land in Europe. Whether it's your first international trip or your fifth, KM Travel & Tours makes you feel informed, prepared, and right at home anywhere in Europe.
                        <br/>
                        <br/>
                        From Tanzania to Europe—travel confidently, travel with Kai.
                      </>
                    )}
                  </p> */}
                </div>
                
                {/* Fade overlay when collapsed */}
                {!isExpanded && (
                  <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent"></div>
                )}
              </div>
            </Reveal>

            {/* Show More/Less Button */}
            <div className="flex justify-center md:justify-start mt-4 gap-4">
              <button
                onClick={toggleExpanded}
                className="
                   md:px-2 md:py-1
                  text-base sm:text-lg md:text-base font-bold
                  text-[#000080] border-1 border-[#000080] rounded-lg
                  hover:bg-[#000080] hover:text-white
                  transition-all duration-300 transform hover:scale-105
                  shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#000080] focus:ring-opacity-50
                "
              >
                {isExpanded ? 'Show Less' : 'Show More'}
              </button>
               <div className="flex justify-center md:justify-start">
            <Link 
                href='#homecontact'
  isWhatsApp={false} 
              className="bg-[#000080] hover:bg-[#000080] text-white px-6 py-3 rounded-md shadow-lg"
            >
              Contact Us
            </Link>
          </div>
            </div>
            
          </div>

         
        </div>
      </div>
    </section>
  );
}

export default Why;