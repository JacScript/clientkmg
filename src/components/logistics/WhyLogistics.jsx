import React from "react";
import Reveal from "../Reveal";
import Link from "../LinkComponent";
import img from "../../assets/images/container.png";
import TestimonialCarousel from "../TestimonialCarousel";
import LogisticsCard from "../LogisticsCard";
import { MdOutlineMuseum } from "react-icons/md";
import { GiModernCity, GiWineBottle } from "react-icons/gi";

const WhyLogistics = () => {
  const data = [
    {
      id: 1,
      name: "Retail & E-commerce",
      description:
        "We specialize in streamlined, end-to-end logistics solutions tailored specifically for the fast-paced demands of modern retail and online stores.",
      image: img,
      icon: GiModernCity,
    },
    {
      id: 2,
      name: "Manufacturing & Distribution",
      description:
        "Our logistics services are designed to optimize your supply chain, ensuring timely delivery of raw materials and finished goods.",
      image: img,
      icon: MdOutlineMuseum,
    },
    {
      id: 3,
      name: "Healthcare & Pharmaceuticals",
      description:
        "We provide specialized logistics solutions for the healthcare sector, ensuring the safe and timely delivery of critical medical supplies.",
      image: img,
      icon: GiWineBottle,
    },
    {
      id: 4,
      name: "Food & Beverage",
      description:
        "Our logistics services ensure the safe and efficient transportation of perishable goods, maintaining quality and freshness.",
      image: img,
      icon: GiModernCity,
    },
    {
      id: 4,
      name: "Food & Beverage",
      description:
        "Our logistics services ensure the safe and efficient transportation of perishable goods, maintaining quality and freshness.",
      image: img,
      icon: GiModernCity,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-start w-full min-h-screen py-16">
      {/* Heading & Description Section */}
      <div className="flex flex-col lg:flex-row w-11/12 lg:w-3/4 mx-auto mb-12">
        <div className="lg:w-2/3 mb-6 lg:mb-0 pr-0 lg:pr-24">
          <Reveal delay={0.3}>
            <p className="text-4xl lg:text-6xl text-[#000080] font-bold leading-tight">
              Tailored Logistics for Every Business
            </p>
          </Reveal>
        </div>

        <div className="lg:w-1/3 px-0 lg:px-4 pt-2">
          <Reveal delay={0.6}>
            <p className="text-sm font-extrabold text-[#000080] mb-4 leading-relaxed">
              We provide comprehensive logistics solutions tailored to your
              business needs, ensuring timely and efficient delivery of goods
              across the globe. With us, you get precision, speed, and
              confidence in every shipment.
            </p>
          </Reveal>
          <Link
            message="Hello, I would like to inquire about your logistics services."
            isWhatsApp={true}
            className="bg-[#000080] hover:bg-[#0000808f] text-white px-6 py-3 rounded-md shadow-lg"
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* Carousel */}

      <TestimonialCarousel component={LogisticsCard} items={data} />
    </div>
  );
};

export default WhyLogistics;
