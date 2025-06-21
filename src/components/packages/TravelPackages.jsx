import React, { useState } from 'react';
import { FaAngleRight, FaRegClock, FaCheck, FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { FiUsers } from "react-icons/fi";

const TravelPackages = () => {
  const [hoveredPackage, setHoveredPackage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState({});

  const packages = [
     {
      id: 5,
      title: "SPECIAL PILGRIMAGE PACKAGE!",
      subtitle: "For a group of 10 or more",
      // duration: "10 Days",
      price: "2,900",
      priceNote: "/person",
      images: [
        "https://res.cloudinary.com/dwkivuqts/image/upload/v1750398579/img12_kaclmj.jpg",        
        "https://res.cloudinary.com/dwkivuqts/image/upload/v1750398579/img12_kaclmj.jpg",        
        "https://res.cloudinary.com/dwkivuqts/image/upload/v1750398579/img12_kaclmj.jpg",        
        "https://res.cloudinary.com/dwkivuqts/image/upload/v1750398579/img12_kaclmj.jpg",        
      ],
      description: "Jiunge nasi katika safari ya kipekee ya hija ya kidini, ambapo tutatembelea maeneo matakatifu na kuimarisha imani yetu.",
      longDescription: "Safari hii itahusisha kutembelea maeneo muhimu ya kidini, kujifunza kuhusu historia na tamaduni za dini mbalimbali, na kushiriki katika ibada maalum.",
      includes: [
        "Airfare",
        "Accommodation",
        "Guided Pilgrimage Tours",
        "Bed and breakfast",
        "Airport meet-and-greet services and transportation services",
      ],
      color: "from-red-500 to-orange-500",
      bgColor: "bg-red-50"
    },
    {
      id: 1,
      title: "PARIS,BRUSSELS & AMSTERDAM PACKAGE!",
      subtitle: "10 Days Tour (Paris, Brussels & Amsterdam)",
      duration: "10 Days",
      price: "4,000",
      priceNote: "/person",
      images: [
      "https://res.cloudinary.com/dwkivuqts/image/upload/v1750421429/barcelona_ncfpxj.jpg",
        "https://res.cloudinary.com/dwkivuqts/image/upload/v1750390239/brussels_nhf7b5.jpg",
        "https://res.cloudinary.com/dwkivuqts/image/upload/v1750389829/Rome_dxqkym.jpg",
        "https://res.cloudinary.com/dwkivuqts/image/upload/v1750389829/Rome_dxqkym.jpg"
      ],
      description: "The enchanting City of Light and Love, no matter the season—whether you're strolling vibrant streets during the bustling summer holidays or soaking in the magical charm of a Parisian Christmas will warm your spirits.",
      longDescription: "This package includes the journey through Paris' most iconic landmarks such as the grandeur of the Eiffel Tower, the artistic treasures of the Musée du Louvre, and the breathtaking beauty of Notre Dame and Montmartre's sacred basilica.",
      additionalInfo: "To complete your experience, we'll venture to the opulent Château de Versailles, where history comes alive.",
      includes: [
        "Include flights tickets",
        "3 Star Hotel Accommodation with Breakfast",
        "Airport meet-and-greet services and transportation services",
        // "Eiffel Tower 2nd Floor (lift)",
        // "Le Louvre, Montmarte, Notre Dame, Arc De Triomphe visits",
        // "Paris Red (TOOT) Bus + Boat Cruise"
      ],
      color: "from-red-500 to-orange-500",
      bgColor: "bg-red-50"
    },
     {
      id: 7,
      title: "PARIS,MONT ST-MICHEAL & CHAMPAGNE!",
      subtitle: "Visit Paris, Mont St-Micheal & Champagne",
      // duration: "10 Days",
      price: "2,800",
      priceNote: "/person",
      images: [
        "https://res.cloudinary.com/dwkivuqts/image/upload/v1750421121/rome2_st2ixd.jpg",
        "https://res.cloudinary.com/dwkivuqts/image/upload/v1750398576/img16_hzvqos.jpg",
        "https://res.cloudinary.com/dwkivuqts/image/upload/v1750398576/img16_hzvqos.jpg",
        "https://res.cloudinary.com/dwkivuqts/image/upload/v1750398576/img16_hzvqos.jpg",
        
      ],
      description: "The enchanting City of Light and Love, no matter the season—whether you're strolling vibrant streets during the bustling summer holidays or soaking in the magical charm of a Parisian Christmas will warm your spirits.",
      longDescription: "This package includes the journey through Paris' most iconic landmarks such as the grandeur of the Eiffel Tower, the artistic treasures of the Musée du Louvre, and the breathtaking beauty of Notre Dame and Montmartre's sacred basilica.",
      additionalInfo: "To complete your experience, we'll venture to the opulent Château de Versailles, where history comes alive.",
      includes: [
        "3 Star Hotel Accommodation with Breakfast",
        "Airport meet-and-greet services and transportation services",
        // "Eiffel Tower 2nd Floor (lift)",
        // "Le Louvre, Montmarte, Notre Dame, Arc De Triomphe visits",
        // "Paris Red (TOOT) Bus + Boat Cruise"
      ],
      color: "from-blue-500 to-orange-500",
      bgColor: "bg-blue-50"
    },
    {
      id: 2,
      title: "GROUP FRANCE TOUR PACKAGE!",
      subtitle: "Travel together and explore with  Kai",
      // duration: "10 Days",
      price: "4,500",
      priceNote: "/person",
      images: [
        "https://res.cloudinary.com/dwkivuqts/image/upload/v1750421313/eiffel2_jhfnxk.jpg",
        "https://res.cloudinary.com/dwkivuqts/image/upload/v1750421313/eiffel2_jhfnxk.jpg",
        "https://res.cloudinary.com/dwkivuqts/image/upload/v1750421313/eiffel2_jhfnxk.jpg",
        "https://res.cloudinary.com/dwkivuqts/image/upload/v1750421313/eiffel2_jhfnxk.jpg",
        
      ],
      description: "Paris - Rome - Barcelona OR",
      longDescription: "Paris - Brussels - Amsterdam",
      // additionalInfo: "Mont St. Michel is remarkable blend of history, beauty, and culture—a side of France you'll never forget.",
      includes: [
        "Airfare",
        "Accommodation",
        "Guided Pilgrimage Tours",
        "Bed and breakfast",
        "Airport meet-and-greet services and transportation services",
      ],
      color: "from-yellow-500 to-cyan-500",
      bgColor: "bg-yellow-50"
    },
    {
      id: 3,
      title: "CHAMPAGNE PACKAGE",
      subtitle: "12 Days Paris City Tour and Champagne Tasting & Vineyard Visit",
      duration: "12 Days",
      price: "2,500",
      priceNote: "/person",
      images: [
     "https://res.cloudinary.com/dwkivuqts/image/upload/v1750423439/img15_drg7n7.jpg",
     "https://res.cloudinary.com/dwkivuqts/image/upload/v1750423042/img13_trquev.jpg",
     "https://res.cloudinary.com/dwkivuqts/image/upload/v1750422197/france_c9vgbb.jpg",
     "https://res.cloudinary.com/dwkivuqts/image/upload/v1750388539/img19_peizvu.jpg",
       
      ],
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
    },
     {
      id: 4,
      title: "Visit Paris (Iconic Monuments in 4 hours",
      subtitle: "Paris Day City tour with Kai",
      duration: "4 Hours",
      price: "100",
      priceNote: "/person",
      images: [
     "https://res.cloudinary.com/dwkivuqts/image/upload/v1750388539/img19_peizvu.jpg",
     "https://res.cloudinary.com/dwkivuqts/image/upload/v1750389279/img11_rlgher.jpg",
     "https://res.cloudinary.com/dwkivuqts/image/upload/v1750513807/vatican_jeto1w.jpg",
     "https://res.cloudinary.com/dwkivuqts/image/upload/v1750424896/img17_rurknc.jpg",
       
      ],
     description: "There is more to France than Paris and the Eiffel Tower! Step off the beaten path and discover the enchanting Champagne region, the only place in the world where true Champagne is crafted.",
      longDescription: "Wander through lush vineyards, where the grapes that create this legendary drink are grown, and visit prestigious Champagne houses to learn the intricate process of production—from grape to glass.",
      additionalInfo: "Immerse yourself in the heritage of this sparkling masterpiece and savor tastings that bring the story of Champagne to life through every effervescent sip.",
      includes: [
        "Visa Assistance",
        "Personalized photo shoots",
      ],
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50"
    },
     {
      id: 6,
      title: "CHAMPAGNE PACKAGE",
      subtitle: "12 Days Paris City Tour and Champagne Tasting & Vineyard Visit",
      duration: "12 Days",
      price: "2,500",
      priceNote: "/person",
      images: [
     "https://res.cloudinary.com/dwkivuqts/image/upload/v1750423439/img15_drg7n7.jpg",
     "https://res.cloudinary.com/dwkivuqts/image/upload/v1750423042/img13_trquev.jpg",
     "https://res.cloudinary.com/dwkivuqts/image/upload/v1750513941/img18_gpl0c5.jpg",
     "https://res.cloudinary.com/dwkivuqts/image/upload/v1750513941/img18_gpl0c5.jpg"
        
      ],
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

  const nextImage = (packageId) => {
    const pkg = packages.find(p => p.id === packageId);
    setCurrentImageIndex(prev => ({
      ...prev,
      [packageId]: ((prev[packageId] || 0) + 1) % pkg.images.length
    }));
  };

  const prevImage = (packageId) => {
    const pkg = packages.find(p => p.id === packageId);
    setCurrentImageIndex(prev => ({
      ...prev,
      [packageId]: ((prev[packageId] || 0) - 1 + pkg.images.length) % pkg.images.length
    }));
  };

  const goToImage = (packageId, index) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [packageId]: index
    }));
  };

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
                          <span className="font-semibold">{pkg.duration || ""}</span>
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
                          €{pkg.price}
                        </span>
                        <span className="text-gray-500 ml-2">{pkg.priceNote}</span>
                      </div>
                       <a
                        href={`https://wa.me/33771948786?text=Hi! I'm interested in booking the ${pkg.title} - ${pkg.subtitle} (${pkg.duration}) for ${pkg.price}${pkg.priceNote}. Can you please provide more details?`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`bg-gradient-to-r ${pkg.color} text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2 text-center`}
                      >
                        Book Now
                        <FaAngleRight className="w-5 h-5" />
                      </a>
                      {/* <button className={`bg-gradient-to-r ${pkg.color} text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2`}>
                        Book Now
                        <FaAngleRight className="w-5 h-5" />
                      </button> */}
                    </div>
                  </div>

                  {/* Image Gallery Side */}
                  <div className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="relative overflow-hidden rounded-2xl shadow-xl">
                      {/* Main Image */}
                      <div className="relative h-80 lg:h-96 overflow-hidden">
                        <img
                          src={pkg.images[currentImageIndex[pkg.id] || 0]}
                          alt={`${pkg.title} - Image ${(currentImageIndex[pkg.id] || 0) + 1}`}
                          className={`w-full h-full object-cover transition-all duration-700 ${hoveredPackage === pkg.id ? 'scale-110' : 'scale-100'}`}
                        />
                        <div className={`absolute inset-0 opacity-10`} />
                        
                        {/* Navigation Arrows */}
                        <button
                          onClick={() => prevImage(pkg.id)}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full shadow-lg transition-all duration-300 z-10"
                        >
                          <FaChevronLeft className="w-4 h-4 text-gray-800" />
                        </button>
                        <button
                          onClick={() => nextImage(pkg.id)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full shadow-lg transition-all duration-300 z-10"
                        >
                          <FaChevronRight className="w-4 h-4 text-gray-800" />
                        </button>

                        {/* Floating Price Badge */}
                        <div className="absolute top-4 right-4 bg-white bg-opacity-95 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg z-10">
                          <div className="text-center">
                            <div className={`text-2xl font-bold bg-gradient-to-r ${pkg.color} bg-clip-text text-transparent`}>
                              {pkg.price}
                            </div>
                            <div className="text-xs text-gray-600">{pkg.priceNote}</div>
                          </div>
                        </div>

                        {/* Duration Badge */}
                        <div className="absolute bottom-4 left-4 bg-black bg-opacity-75 backdrop-blur-sm text-white px-4 py-2 rounded-lg z-10">
                          <span className="font-semibold">{pkg.duration}</span>
                        </div>

                        {/* Image Counter */}
                        <div className="absolute bottom-4 right-4 bg-black bg-opacity-75 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm z-10">
                          {(currentImageIndex[pkg.id] || 0) + 1} / {pkg.images.length}
                        </div>
                      </div>

                      {/* Image Dots */}
                      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                        {pkg.images.map((_, imgIdx) => (
                          <button
                            key={imgIdx}
                            onClick={() => goToImage(pkg.id, imgIdx)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                              (currentImageIndex[pkg.id] || 0) === imgIdx
                                ? 'bg-white scale-125'
                                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Thumbnail Strip */}
                    <div className="mt-4 grid grid-cols-4 gap-2">
                      {pkg.images.map((image, imgIdx) => (
                        <button
                          key={imgIdx}
                          onClick={() => goToImage(pkg.id, imgIdx)}
                          className={`relative overflow-hidden rounded-lg aspect-video transition-all duration-300 ${
                            (currentImageIndex[pkg.id] || 0) === imgIdx
                              ? 'ring-4 ring-opacity-75 scale-105'
                              : 'hover:scale-105 opacity-70 hover:opacity-100'
                          }`}
                          style={{ '--tw-ring-color': `rgb(${pkg.color.includes('red') ? '239 68 68' : pkg.color.includes('blue') ? '59 130 246' : '34 197 94'})` }}
                        >
                          <img
                            src={image}
                            alt={`${pkg.title} thumbnail ${imgIdx + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <div className={`absolute inset-0 bg-gradient-to-t ${pkg.color} opacity-20`} />
                        </button>
                      ))}
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