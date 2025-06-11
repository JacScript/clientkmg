import React, { useState } from 'react';
// import { ChevronRight, Star, Clock, MapPin, Users, Check } from 'lucide-react';
import { FaAngleRight, FaRegClock, FaCheck } from "react-icons/fa6";
import { FiUsers } from "react-icons/fi";
import img1 from "../../assets/images/img1.jpg";
import img2 from "../../assets/images/img12.jpg";
import img3 from "../../assets/images/img16.jpg";


const TravelPackages = () => {
  const [hoveredPackage, setHoveredPackage] = useState(null);

  const packages = [
    {
      id: 1,
      title: "PARIS PACKAGE!",
      subtitle: "5 Days Paris City Tour",
      duration: "5 Days",
      price: "$3,000",
      priceNote: "/person",
      image: img1,
      description: "The enchanting City of Light and Love, no matter the season—whether you're strolling vibrant streets during the bustling summer holidays or soaking in the magical charm of a Parisian Christmas will warm your spirits.",
      longDescription: "This package includes the journey through Paris' most iconic landmarks such as the grandeur of the Eiffel Tower, the artistic treasures of the Musée du Louvre, and the breathtaking beauty of Notre Dame and Montmartre's sacred basilica.",
      additionalInfo: "To complete your experience, we'll venture to the opulent Château de Versailles, where history comes alive.",
      includes: [
        "4 Star Hotel Accommodation with Breakfast",
        "Airport transfers",
        "Eiffel Tower 2nd Floor (lift)",
        "Le Louvre, Montmarte, Notre Dame, Arc De Triomphe visits",
        "Paris Red (TOOT) Bus + Boat Cruise"
      ],
      color: "from-red-500 to-orange-500",
      bgColor: "bg-red-50"
    },
    {
      id: 2,
      title: "NORMANDY PACKAGE",
      subtitle: "10 Days Paris City Tour & Mont Saint Michel",
      duration: "10 Days",
      price: "$4,500",
      priceNote: "/person",
      image: img2,
      description: "Allow me to take you on an unforgettable journey beyond the bustling streets of Paris. In Normandy, you will escape the overcrowded tourist spots and discover the treasures of Normandy.",
      longDescription: "Walk along the historic beaches, where the echoes of World War II still resonate. Explore the breathtaking Mont Saint-Michel, France's 2nd most-visited landmark as you climb the ancient steps to the magnificent abbey.",
      additionalInfo: "Mont St. Michel is remarkable blend of history, beauty, and culture—a side of France you'll never forget.",
      includes: [
        "All in PARIS PACKAGE",
        "Transport to and from Paris",
        "Mont Saint Michel Museum ticket",
        "Late lunch and one night stay in a 4 Star Hotel in Caen",
        "Cultural experiences"
      ],
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50"
    },
    {
      id: 3,
      title: "CHAMPAGNE PACKAGE",
      subtitle: "12 Days Paris City Tour and Champagne Tasting & Vineyard Visit",
      duration: "12 Days",
      price: "$5,800",
      priceNote: "/person",
      image: img3,
      description: "There is more to France than Paris and the Eiffel Tower! Step off the beaten path and discover the enchanting Champagne region, the only place in the world where true Champagne is crafted.",
      longDescription: "Wander through lush vineyards, where the grapes that create this legendary drink are grown, and visit prestigious Champagne houses to learn the intricate process of production—from grape to glass.",
      additionalInfo: "Immerse yourself in the heritage of this sparkling masterpiece and savor tastings that bring the story of Champagne to life through every effervescent sip.",
      includes: [
        "All in PARIS PACKAGE",
        "Transport to and from Paris",
        "2 Nights Stay in a 4 Star hotel in Épernay",
        "5 Different Champagne Tasting",
        "Champagne Production English Guided Tour",
        "Vineyards visits",
        "Late lunch included"
      ],
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent text-4xl md:text-6xl font-bold italic transform -rotate-1">
              FRANCE Travel Packages
            </span>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover the magic of France with our carefully curated travel experiences. 
            From the romantic streets of Paris to the historic shores of Normandy and the sparkling vineyards of Champagne.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="space-y-12">
          {packages.map((pkg, index) => (
            <div
              key={pkg.id}
              className={`relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 ${pkg.bgColor}`}
              onMouseEnter={() => setHoveredPackage(pkg.id)}
              onMouseLeave={() => setHoveredPackage(null)}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${pkg.color} opacity-5`} />
              
              <div className="relative p-8 lg:p-12">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                  {/* Content Side */}
                  <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    {/* Package Badge */}
                    <div className="relative">
                      <div className={`inline-block bg-gradient-to-r ${pkg.color} text-white px-6 py-3 rounded-2xl shadow-lg transform -rotate-2 hover:rotate-0 transition-transform duration-300`}>
                        <span className="font-bold text-lg uppercase tracking-wide">
                          {pkg.title}
                        </span>
                      </div>
                    </div>

                    {/* Title and Duration */}
                    <div>
                      <h3 className="text-2xl lg:text-3xl font-bold text-blue-900 mb-2">
                        {pkg.subtitle}
                      </h3>
                      <div className="flex items-center gap-4 text-gray-600">
                        <div className="flex items-center gap-2">
                          <FaRegClock className="w-5 h-5" />
                          <span className="font-semibold">{pkg.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FiUsers className="w-5 h-5" />
                          <span>Per Person</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                      <p className="text-sm italic">{pkg.description}</p>
                      <p className="text-sm">{pkg.longDescription}</p>
                      <p className="text-sm font-medium text-gray-800">{pkg.additionalInfo}</p>
                    </div>

                    {/* Includes */}
                    <div className="space-y-3">
                      <h4 className="font-bold text-gray-900 text-lg">Including:</h4>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {pkg.includes.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <FaCheck className={`w-4 h-4 mt-0.5 text-green-600 flex-shrink-0`} />
                            <span className="text-sm text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                      <div>
                        <span className={`text-4xl font-bold bg-gradient-to-r ${pkg.color} bg-clip-text text-transparent`}>
                          {pkg.price}
                        </span>
                        <span className="text-gray-500 ml-2">{pkg.priceNote}</span>
                      </div>
                      <button className={`bg-gradient-to-r ${pkg.color} text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2`}>
                        Book Now
                        <FaAngleRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Image Side */}
                  <div className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="relative overflow-hidden rounded-2xl shadow-xl">
                      <img
                        src={pkg.image}
                        alt={pkg.title}
                        className={`w-full h-80 lg:h-96 object-cover transition-transform duration-700 ${hoveredPackage === pkg.id ? 'scale-110' : 'scale-100'}`}
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${pkg.color} opacity-20`} />
                      
                      {/* Floating Price Badge */}
                      <div className="absolute top-4 right-4 bg-white bg-opacity-95 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
                        <div className="text-center">
                          <div className={`text-2xl font-bold bg-gradient-to-r ${pkg.color} bg-clip-text text-transparent`}>
                            {pkg.price}
                          </div>
                          <div className="text-xs text-gray-600">{pkg.priceNote}</div>
                        </div>
                      </div>

                      {/* Duration Badge */}
                      <div className="absolute bottom-4 left-4 bg-black bg-opacity-75 backdrop-blur-sm text-white px-4 py-2 rounded-lg">
                        <span className="font-semibold">{pkg.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-3xl shadow-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready for Your French Adventure?
            </h3>
            <p className="text-gray-600 mb-6">
              Contact us today to customize your perfect French getaway or get more information about our packages.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                Get Custom Quote
              </button>
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300">
                View All Packages
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TravelPackages;