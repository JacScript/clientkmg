import { BsPatchCheckFill } from "react-icons/bs";
import React from "react";
import pic from "../../../assets/images/img17.jpg";
import pic0 from "../../../assets/images/img16.jpg";
import Reveal from "../../Reveal";
import FadeInImage from "../../FadeInImage";
import FloatingTextBox from "../../FloatingTextBox";

const About = () => {
  const infos = [
    {
      id: 1,
      title: "Safety first always",
      description: "Prioritizing your safety every step of the journey.",
    },
    {
      id: 2,
      title: "Low price & friendly",
      description:
        "Offering low prices and friendly service for all your travel needs.",
    },
    {
      id: 3,
      title: "Trusted travel & tour guide",
      description:
        "Your trusted travel & tour guide for unforgettable journeys.",
    },
  ];

  return (
    <section className="lg:h-dvh max-w-screen bg-blue-100 py-10">
      {/* <Reveal> */}
        <h1 className=" text-2xl xl:text-5xl text-[#000080] font-extrabold text-center mb-10">
          About Us
        </h1>
      {/* </Reveal> */}
      <div className="w-screen xl:w-3/4 h-[80%] flex max-lg:flex-col items-center justify-center mx-auto">
        {/* LEFT IMAGE SIDE */}
        <div className="w-[80%] mx-auto lg:w-1/2 h-[500px] lg:h-full relative lg:mx-8">
          <div className="w-[100%] max-md:flex max-md:justify-center h-full relative">
            {/* Main Image */}
            <FadeInImage
              src={pic}
              alt="About Us"
              className="w-[70%] md:w-full h-[80%] object-cover"
              delay={0.1}
              direction="up"
            />

            {/* Floating Image */}
            <div className="absolute md:-left-20 md:-bottom-5 bottom-10 left-5 w-30 h-30 md:w-70 md:h-70 opacity-100">
              <FadeInImage
                src={pic0}
                alt="Floating Decoration"
                className="w-full h-full object-cover hover:scale-[1.05] transition-transform duration-300"
                delay={0.3}
                direction="left"
              />
            </div>

            {/* Floating Text Box */}
            <FloatingTextBox number="10+" text="Years of experience" />
          </div>
        </div>

        {/* RIGHT TEXT SIDE */}
        <div className="lg:w-1/2 h-full p-0 md:pt-10 lg:pt-0">
          <div className="px-6">
            <h2 className="text-4xl font-bold text-[#000080] mb-4">
              Great opportunity for tour & travels
            </h2>
            <ul className="mt-4 space-y-4 pl-4">
              {infos.map((info, idx) => (
                <li key={idx} className="flex items-center mb-8 py-2">
                  <span className="mx-6">
                    <BsPatchCheckFill className="text-[#000080]" size={30} />
                  </span>
                  <div>
                    <Reveal delay={0.4}>
                      <p className="font-bold text-2xl">{info.title}</p>
                    </Reveal>
                    <Reveal delay={0.6}>
                      <p className="text-lg text-slate-700">
                        {info.description}
                      </p>
                    </Reveal>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
