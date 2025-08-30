
// Testimonial.jsx
import React from 'react';
// import pic1 from "../../../assets/images/img5.jpeg"
import TestimonialCarousel from '../../TestimonialCarousel';
import TestimonialCard from '../../TestimonialCard';

const Testimonial = () => {
  const data = [
    {
      name: "John Doe",
      image: "https://res.cloudinary.com/dwkivuqts/image/upload/v1750398324/about_n1mhi4.jpg",
      testimonial: "Traveling was an unforgettable experience—every place I visited opened my eyes to new cultures, stunning landscapes, and amazing people. Traveling was an unforgettable experience—every place I visited opened my eyes to new cultures, stunning landscapes, and amazing people.",
      rating: 5,
      flag: '🇹🇿'
    },
    {
      name: "Jane Smith",
      image: "https://res.cloudinary.com/dwkivuqts/image/upload/v1750398324/about_n1mhi4.jpg",
      testimonial: "Traveling was an unforgettable experience—every place I visited opened my eyes to new cultures, stunning landscapes, and amazing people. Traveling was an unforgettable experience—every place I visited opened my eyes to new cultures, stunning landscapes, and amazing people.",
      rating: 4,
     flag: '🇹🇿'
    },
    {
      name: "Michael Brown",
      image: "https://res.cloudinary.com/dwkivuqts/image/upload/v1750398324/about_n1mhi4.jpg",
      testimonial: "Traveling was an unforgettable experience—every place I visited opened my eyes to new cultures, stunning landscapes, and amazing people. Traveling was an unforgettable experience—every place I visited opened my eyes to new cultures, stunning landscapes, and amazing people.",
      rating: 5,
     flag: '🇹🇿'
    },
    {
      name: "Alice Green",
      image: "https://res.cloudinary.com/dwkivuqts/image/upload/v1750398324/about_n1mhi4.jpg",
      testimonial: "Traveling was an unforgettable experience—every place I visited opened my eyes to new cultures, stunning landscapes, and amazing people. Traveling was an unforgettable experience—every place I visited opened my eyes to new cultures, stunning landscapes, and amazing people.",
      rating: 5,
      flag: '🇹🇿'
    },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 min-h-[400px] sm:min-h-[500px] lg:min-h-[550px]">
      <h2 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#000080] font-extrabold mb-8 sm:mb-10 lg:mb-12 px-4">
        What Our Clients Say
      </h2>
      <TestimonialCarousel component={TestimonialCard} items={data} />
    </section>
  );
};

export default Testimonial;