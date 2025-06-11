import React from 'react';
import Reveal from '../../Reveal';
import pic1 from '../../../assets/images/img11.JPG';
import FadeInImage from '../../FadeInImage';
import Link from '../../LinkComponent';

function Why() {
  return (
    <section className="w-full py-12 md:py-20 bg-white text-[#000080]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse md:flex-row items-center gap-10">
        
 {/* Image */}
        <div className="w-full md:w-1/2">
          <FadeInImage
            src={pic1}
            alt="Travel Experience"
            className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Text Content */}
        <div className="w-full md:w-1/2 space-y-6 md:pr-8 text-center md:text-left">
          <Reveal>
            <p className="text-base md:text-lg font-bold font-serif tracking-wide">
              TIMELESS ADVENTURE
            </p>
          </Reveal>

          <Reveal delay={0.5}>
            <h2 className="text-base sm:text-xl lg:text-xl xl:text-[40px] font-black font-roboto leading-tight">
              WHY CHOOSE <br className="hidden md:block" /> KM TRAVEL & TOUR
            </h2>
          </Reveal>

          <Reveal delay={1.3}>
            <p className="text-sm sm:text-base md:text-lg leading-relaxed max-w-prose">
            At KM Travel & Tours, you're not just booking a trip, your travel is being organised by someone who understands your journey. Kai Maembe, Tanzanian-born and raised, has lived in France for over 7 years and is an active member of the diaspora community in France. With firsthand experience living, working, and studying across France, Scandinavia, and other EU cities, Kai brings unmatched insight into what Tanzanian travelers truly need abroad.
<br/>
Fluent in Swahili, English, and French, Kai offers warm, personalized support from the moment you start your visa process to the day you land in Europe. Whether it’s your first international trip or your fifth, KM Travel & Tours makes you feel informed, prepared, and right at home anywhere in europe.
<br/>
From Tanzania to Europe—travel confidently, travel with Kai.
            </p>
          </Reveal>

          <div className="flex justify-center lg:justify-start">
            <Link 
  isWhatsApp={true} 
  className="bg-[#000080] hover:bg-[#000080] text-white px-6 py-3 rounded-md shadow-lg"
>
  Contact Us
</Link>
            
          </div>
        </div>

       
      </div>
    </section>
  );
}

export default Why;
