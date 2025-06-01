import React from "react";
import Carousel from "../components/Carousel";

import SendRequestForm from "../components/SendRequestForm";
import { IoLogoWhatsapp } from "react-icons/io";
import Discover from "../components/home/discovery/Discover";
import IntroText from "../components/home/IntroText";
import Hero from "../components/home/hero/Hero";
import SmallWord from "../components/home/smallTalk/SmallTalk";
import SmallTalk from "../components/home/smallTalk/SmallTalk";
import Why from "../components/home/why/Why";
import About from "../components/home/about/About";
import Testimonial from "../components/home/testimonial/Testimonial";
import ContactUs from "../components/contact/Contact";
import Footer from "../components/Footer";
import FeatureTour from "../components/home/featureTour/FeatureTour";
import CombineHomeAndDiscovery from "../components/CombinedHomeAndDiscoveryComponent"

const Home = () => {
  return (
    <main className="max-w-screen scrollbar-hide">
      {/* Hero Section */}

      {/* <Hero /> */}
      {/* <HeroWithCarousel/> */}
<CombineHomeAndDiscovery/>

      {/*Discovery section  */}
      {/* <Discover /> */}
      {/* WhatsApp button */}
      <div className="fixed z-60 bottom-[20px] right-0 mr-10 mb-10 bg-[#25D366] w-16 h-16 flex justify-center items-center rounded-full">
        <IoLogoWhatsapp className="text-white" size={40} />
      </div>

      {/* Small Talk */}
      {/* <SmallTalk /> */}

     

      {/* Why section */}
      <Why/>

      {/* About */}

      {/* <About/> */}

      <FeatureTour/>

      {/* Testimonial */}

      <Testimonial/>

      {/* contact */}
    <ContactUs/>

{/* <Footer/> */}
    </main>
  );
};

export default Home;
